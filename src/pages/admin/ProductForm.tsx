import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { PRODUCT_CATEGORIES } from "@/data/productHelpers";

interface Props {
  mode: "add" | "edit";
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const ProductForm = ({ mode }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    currency: "NGN",
    category: PRODUCT_CATEGORIES[0] as string,
    short_desc: "",
    description: "",
    image_url: "",
    site_url: "",
    demo_url: "",
    features: "",
    tech_stack: "",
    in_stock: true,
    is_best_seller: false,
    is_popular: false,
    is_new: false,
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      (async () => {
        const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
        if (error || !data) {
          toast.error("Product not found");
          navigate("/admin/products");
          return;
        }
        setForm({
          name: data.name,
          slug: data.slug || "",
          price: String(data.price),
          currency: data.currency || "NGN",
          category: data.category,
          short_desc: data.short_desc || "",
          description: data.description || "",
          image_url: data.image_url || "",
          site_url: data.site_url || "",
          demo_url: data.demo_url || "",
          features: (data.features || []).join("\n"),
          tech_stack: (data.tech_stack || []).join(", "),
          in_stock: data.in_stock,
          is_best_seller: data.is_best_seller || false,
          is_popular: data.is_popular || false,
          is_new: data.is_new || false,
        });
      })();
    }
  }, [mode, id, navigate]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) {
      toast.error(error.message);
    } else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Image uploaded");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    setLoading(true);
    const payload = {
      name: form.name.trim(),
      slug: (form.slug || slugify(form.name)).trim(),
      price: parseFloat(form.price),
      currency: form.currency.trim() || "NGN",
      category: form.category.trim() || "general",
      short_desc: form.short_desc || null,
      description: form.description || null,
      image_url: form.image_url || null,
      site_url: form.site_url || null,
      demo_url: form.demo_url || null,
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      tech_stack: form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
      in_stock: form.in_stock,
      is_best_seller: form.is_best_seller,
      is_popular: form.is_popular,
      is_new: form.is_new,
    };
    const { error } =
      mode === "add"
        ? await supabase.from("products").insert(payload)
        : await supabase.from("products").update(payload).eq("id", id!);
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success(mode === "add" ? "Product created" : "Product updated");
      navigate("/admin/products");
    }
  };

  return (
    <>
      <SEOHead
        title={`${mode === "add" ? "Add" : "Edit"} Product – Admin`}
        description="Product form"
      />
      <div className="max-w-2xl space-y-6">
        <Link to="/admin/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back to products
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold">
            {mode === "add" ? "Add Product" : "Edit Product"}
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Product details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL slug</Label>
                <Input
                  id="slug"
                  placeholder={form.name ? slugify(form.name) : "auto-generated"}
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Used in /store/{form.slug || slugify(form.name) || "your-product"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_desc">Short description</Label>
                <Input
                  id="short_desc"
                  placeholder="One-line summary shown on cards"
                  value={form.short_desc}
                  onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  rows={5}
                  placeholder={"Mobile-first design\nMulti-step checkout\n..."}
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tech_stack">Tech stack (comma separated)</Label>
                <Input
                  id="tech_stack"
                  placeholder="React, TypeScript, Tailwind CSS"
                  value={form.tech_stack}
                  onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    type="url"
                    placeholder="https://…"
                    value={form.demo_url}
                    onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_url">Site URL</Label>
                  <Input
                    id="site_url"
                    type="url"
                    placeholder="https://…"
                    value={form.site_url}
                    onChange={(e) => setForm({ ...form, site_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product image</Label>
                {form.image_url && (
                  <img src={form.image_url} alt="preview" className="h-32 w-32 rounded-lg object-cover border border-border" />
                )}
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor="img"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted hover:bg-muted/70 cursor-pointer text-sm font-medium"
                  >
                    <Upload size={16} /> {uploading ? "Uploading…" : "Upload image"}
                  </Label>
                  <input id="img" type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                </div>
                <Input
                  placeholder="Or paste image URL"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                />
              </div>

              <div className="space-y-3 rounded-lg border border-border p-4">
                <p className="text-sm font-medium">Tags & status</p>
                {[
                  { key: "in_stock", label: "In stock", desc: "Show as available for purchase" },
                  { key: "is_best_seller", label: "Best Seller", desc: "Highlight as a bestseller" },
                  { key: "is_popular", label: "Popular", desc: "Mark as popular pick" },
                  { key: "is_new", label: "New", desc: "Show a New badge" },
                ].map((t) => (
                  <div key={t.key} className="flex items-center justify-between">
                    <div>
                      <Label htmlFor={t.key}>{t.label}</Label>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                    </div>
                    <Switch
                      id={t.key}
                      checked={(form as any)[t.key]}
                      onCheckedChange={(v) => setForm({ ...form, [t.key]: v } as any)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Saving…" : mode === "add" ? "Create Product" : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductForm;
