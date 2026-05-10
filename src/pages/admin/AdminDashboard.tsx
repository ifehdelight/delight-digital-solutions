import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle2, XCircle, PlusCircle, Users, Mail, DollarSign, Eye, TrendingUp, ShoppingCart } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { formatPrice } from "@/data/productHelpers";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Stats {
  total: number;
  inStock: number;
  outOfStock: number;
  customers: number;
  leads: number;
  clients: number;
  revenue: number;
  visits7d: number;
  visitsPrev7d: number;
}

interface DayPoint { date: string; revenue: number; orders: number; visits: number; }
interface PathPoint { path: string; visits: number; }

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const fmtDay = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    total: 0, inStock: 0, outOfStock: 0,
    customers: 0, leads: 0, clients: 0,
    revenue: 0, visits7d: 0, visitsPrev7d: 0,
  });
  const [series, setSeries] = useState<DayPoint[]>([]);
  const [topPages, setTopPages] = useState<PathPoint[]>([]);
  const [sourceMix, setSourceMix] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    (async () => {
      const now = new Date();
      const start30 = new Date(now); start30.setDate(now.getDate() - 29); start30.setHours(0, 0, 0, 0);
      const start7 = new Date(now); start7.setDate(now.getDate() - 6); start7.setHours(0, 0, 0, 0);
      const startPrev7 = new Date(now); startPrev7.setDate(now.getDate() - 13); startPrev7.setHours(0, 0, 0, 0);

      const [{ data: products }, { data: customers }, { data: orders }, { data: views }] = await Promise.all([
        supabase.from("products").select("in_stock"),
        supabase.from("customers").select("source, last_purchase_amount"),
        supabase.from("orders").select("amount, currency, created_at, product_name").gte("created_at", start30.toISOString()),
        supabase.from("page_views").select("path, created_at").gte("created_at", start30.toISOString()),
      ]);

      const inStock = (products || []).filter((p: any) => p.in_stock).length;
      const total = products?.length || 0;

      const customerList = customers || [];
      const leads = customerList.filter((c: any) => !c.last_purchase_amount).length;
      const clients = customerList.filter((c: any) => c.last_purchase_amount).length;
      const revenue = (orders || []).reduce((s: number, o: any) => s + Number(o.amount || 0), 0);

      // Build daily series for last 30 days
      const days: DayPoint[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now); d.setDate(now.getDate() - i); d.setHours(0, 0, 0, 0);
        days.push({ date: fmtDay(d), revenue: 0, orders: 0, visits: 0 });
      }
      const dayIndex = (iso: string) => {
        const d = new Date(iso); d.setHours(0, 0, 0, 0);
        const diff = Math.round((d.getTime() - start30.getTime()) / 86400000);
        return diff >= 0 && diff < 30 ? diff : -1;
      };
      (orders || []).forEach((o: any) => {
        const i = dayIndex(o.created_at);
        if (i >= 0) { days[i].revenue += Number(o.amount || 0); days[i].orders += 1; }
      });
      (views || []).forEach((v: any) => {
        const i = dayIndex(v.created_at);
        if (i >= 0) days[i].visits += 1;
      });

      const visits7d = (views || []).filter((v: any) => new Date(v.created_at) >= start7).length;
      const visitsPrev7d = (views || []).filter((v: any) => {
        const d = new Date(v.created_at);
        return d >= startPrev7 && d < start7;
      }).length;

      // Top pages
      const pageMap = new Map<string, number>();
      (views || []).forEach((v: any) => pageMap.set(v.path, (pageMap.get(v.path) || 0) + 1));
      const top = Array.from(pageMap.entries())
        .map(([path, visits]) => ({ path, visits }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 6);

      // Customer source mix
      const srcMap = new Map<string, number>();
      customerList.forEach((c: any) => srcMap.set(c.source || "unknown", (srcMap.get(c.source || "unknown") || 0) + 1));
      const mix = Array.from(srcMap.entries()).map(([name, value]) => ({ name, value }));

      setStats({
        total, inStock, outOfStock: total - inStock,
        customers: customerList.length, leads, clients, revenue,
        visits7d, visitsPrev7d,
      });
      setSeries(days);
      setTopPages(top);
      setSourceMix(mix);
    })();
  }, []);

  const growth = stats.visitsPrev7d
    ? Math.round(((stats.visits7d - stats.visitsPrev7d) / stats.visitsPrev7d) * 100)
    : stats.visits7d > 0 ? 100 : 0;

  const cards = [
    { label: "Revenue (30d)", value: formatPrice(stats.revenue, "NGN"), icon: DollarSign, color: "text-green-500" },
    { label: "Clients", value: stats.clients, icon: ShoppingCart, color: "text-primary" },
    { label: "Leads", value: stats.leads, icon: Users, color: "text-accent" },
    { label: "Visits (7d)", value: stats.visits7d, icon: Eye, color: "text-blue-500" },
    { label: "Growth (vs prev 7d)", value: `${growth >= 0 ? "+" : ""}${growth}%`, icon: TrendingUp, color: growth >= 0 ? "text-green-500" : "text-destructive" },
    { label: "Total Products", value: stats.total, icon: Package, color: "text-foreground" },
    { label: "In Stock", value: stats.inStock, icon: CheckCircle2, color: "text-green-500" },
    { label: "Out of Stock", value: stats.outOfStock, icon: XCircle, color: "text-destructive" },
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
            <Link to="/admin/add" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
              <PlusCircle size={18} /> Add Product
            </Link>
            <Link to="/admin/newsletter" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted text-sm">
              <Mail size={16} /> Send Newsletter
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">{c.label}</CardTitle>
                <c.icon className={c.color} size={18} />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Revenue – last 30 days</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#rev)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Visits & Orders – last 30 days</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend />
                  <Bar dataKey="visits" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Top pages (30d)</CardTitle></CardHeader>
            <CardContent className="h-72">
              {topPages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No traffic recorded yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPages} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis type="category" dataKey="path" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Customers by source</CardTitle></CardHeader>
            <CardContent className="h-72">
              {sourceMix.length === 0 ? (
                <p className="text-sm text-muted-foreground">No customers yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sourceMix} dataKey="value" nameKey="name" outerRadius={90} label>
                      {sourceMix.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
