import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <Layout>
      <SEOHead title="Dashboard – DE-LIGHT Softwares" description="Your personal dashboard." />
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-8">Dashboard</h1>
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Welcome!</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Account created</p>
                <p className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Email verified</p>
                <p className="font-medium">{user?.email_confirmed_at ? "Yes ✓" : "Not yet"}</p>
              </div>
              <Button variant="outline" onClick={handleSignOut} className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
