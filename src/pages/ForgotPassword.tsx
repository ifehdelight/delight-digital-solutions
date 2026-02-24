import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <Layout>
      <SEOHead title="Reset Password – DE-LIGHT Softwares" description="Reset your password." />
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">Reset Password</CardTitle>
            <CardDescription>
              {sent ? "Check your email for a reset link." : "Enter your email to receive a reset link."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending…" : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                We sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
              </p>
            )}
            <Link to="/login" className="mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:underline">
              <ArrowLeft className="h-3 w-3" /> Back to Login
            </Link>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
