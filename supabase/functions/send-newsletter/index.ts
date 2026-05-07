// Admin-only newsletter sender. Uses Resend via Lovable connector gateway.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Missing auth" }, 401);

    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(url, anon, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(url, serviceKey);
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) return json({ error: "Forbidden" }, 403);

    const { subject, body, recipientEmails } = await req.json();
    if (!subject || !body) return json({ error: "subject and body required" }, 400);

    let recipients: string[] = recipientEmails ?? [];
    if (recipients.length === 0) {
      const { data: customers } = await admin.from("customers").select("email");
      recipients = (customers ?? []).map((c: any) => c.email).filter(Boolean);
    }
    if (recipients.length === 0) return json({ error: "No recipients" }, 400);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY missing" }, 500);
    if (!RESEND_API_KEY) return json({ error: "RESEND_API_KEY missing" }, 500);

    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;color:#222">${body.replace(/\n/g, "<br/>")}</div>`;

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "DE-LIGHT Softwares <onboarding@resend.dev>",
        to: recipients,
        subject,
        html,
      }),
    });
    const sendData = await res.json();
    if (!res.ok) {
      return json({ error: "Resend failed", details: sendData }, 500);
    }

    await admin.from("newsletter_campaigns").insert({
      subject,
      body,
      recipient_count: recipients.length,
      created_by: userData.user.id,
    });

    return json({ ok: true, sent: recipients.length, providerResponse: sendData });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }

  function json(o: unknown, status = 200) {
    return new Response(JSON.stringify(o), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
