import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle2, XCircle, PlusCircle, Users, Mail } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, inStock: 0, outOfStock: 0, customers: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("products").select("in_stock");
      const { count: customers } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true });
      if (data) {
        const inStock = data.filter((p) => p.in_stock).length;
        setStats({
          total: data.length,
          inStock,
          outOfStock: data.length - inStock,
          customers: customers || 0,
        });
      } else {
        setStats((s) => ({ ...s, customers: customers || 0 }));
      }
    })();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.total, icon: Package, color: "text-primary" },
    { label: "In Stock", value: stats.inStock, icon: CheckCircle2, color: "text-green-500" },
    { label: "Out of Stock", value: stats.outOfStock, icon: XCircle, color: "text-destructive" },
    { label: "Customers", value: stats.customers, icon: Users, color: "text-accent" },
  ];

  return (
    <>
      <SEOHead title="Admin Dashboard – DE-LIGHT" description="Admin dashboard" />
      <div className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, admin.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/admin/add"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
            >
              <PlusCircle size={18} /> Add Product
            </Link>
            <Link
              to="/admin/newsletter"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted text-sm"
            >
              <Mail size={16} /> Send Newsletter
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                <c.icon className={c.color} size={20} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

