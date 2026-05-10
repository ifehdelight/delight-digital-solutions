import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: "invalid email" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const payload: Record<string, unknown> = {
      email,
      source: body.source || "newsletter",
    };
    if (body.name) payload.name = String(body.name).trim();
    if (body.phone) payload.phone = String(body.phone).trim();
    if (body.last_purchase_product) payload.last_purchase_product = String(body.last_purchase_product);
    if (body.last_purchase_amount != null) payload.last_purchase_amount = Number(body.last_purchase_amount);
    payload.updated_at = new Date().toISOString();

    const { error } = await admin.from("customers").upsert(payload, { onConflict: "email" });
    if (error) throw error;

    // Optionally record an order if product info was provided
    if (body.product_id || body.last_purchase_product) {
      await admin.from("orders").insert({
        email,
        customer_name: payload.name ?? null,
        product_id: body.product_id ?? null,
        product_name: body.last_purchase_product ?? "Unknown",
        amount: Number(body.last_purchase_amount || 0),
        currency: body.currency || "NGN",
        status: "completed",
      });
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
