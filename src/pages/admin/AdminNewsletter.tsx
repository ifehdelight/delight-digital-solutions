import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";

interface Campaign {
  id: string;
  subject: string;
  recipient_count: number;
  sent_at: string;
}

const AdminNewsletter = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [count, setCount] = useState(0);
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<Campaign[]>([]);

  useEffect(() => {
    (async () => {
      const { count: c } = await supabase.from("customers").select("*", { count: "exact", head: true });
      setCount(c || 0);
      const { data } = await supabase
        .from("newsletter_campaigns")
        .select("id, subject, recipient_count, sent_at")
        .order("sent_at", { ascending: false })
        .limit(20);
      setHistory((data as Campaign[]) || []);
    })();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return toast.error("Subject and body required");
    if (!confirm(`Send "${subject}" to ${count} customer(s)?`)) return;
    setSending(true);
    const { data, error } = await supabase.functions.invoke("send-newsletter", {
      body: { subject, body },
    });
    setSending(false);
    if (error || data?.error) {
      toast.error(error?.message || data?.error || "Send failed");
      return;
    }
    toast.success(`Sent to ${data.sent} recipient(s)`);
    setSubject(""); setBody("");
    const { data: refreshed } = await supabase
      .from("newsletter_campaigns")
      .select("id, subject, recipient_count, sent_at")
      .order("sent_at", { ascending: false })
      .limit(20);
    setHistory((refreshed as Campaign[]) || []);
  };

  return (
    <>
      <SEOHead title="Newsletter – Admin" description="Send newsletter" />
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-heading font-bold">Newsletter</h1>
          <p className="text-muted-foreground">Send updates to all {count} customers & subscribers.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail size={18} /> Compose</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Big update from DE-LIGHT…" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Message</Label>
                <Textarea
                  id="body"
                  rows={10}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your newsletter content here. Line breaks are preserved."
                  required
                />
              </div>
              <Button type="submit" disabled={sending || !count} className="w-full">
                <Send size={16} className="mr-2" />
                {sending ? "Sending…" : `Send to ${count} recipient(s)`}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent campaigns</CardTitle></CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">No campaigns sent yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {history.map((h) => (
                  <li key={h.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{h.subject}</p>
                      <p className="text-xs text-muted-foreground">{new Date(h.sent_at).toLocaleString()}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{h.recipient_count} sent</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminNewsletter;
