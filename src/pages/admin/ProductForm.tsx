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
import { Upload, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

interface Props {
  mode: "add" | "edit";
}

const ProductForm = ({ mode }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "general",
    description: "",
    image_url: "",
    site_url: "",
    in_stock: true,
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
          price: String(data.price),
          category: data.category,
          description: data.description || "",
          image_url: data.image_url || "",
          site_url: data.site_url || "",
          in_stock: data.in_stock,
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
      price: parseFloat(form.price),
      category: form.category.trim() || "general",
      description: form.description || null,
      image_url: form.image_url || null,
      site_url: form.site_url || null,
      in_stock: form.in_stock,
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
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
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
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

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <Label htmlFor="in_stock" className="text-base">In stock</Label>
                  <p className="text-sm text-muted-foreground">Show as available for purchase</p>
                </div>
                <Switch
                  id="in_stock"
                  checked={form.in_stock}
                  onCheckedChange={(v) => setForm({ ...form, in_stock: v })}
                />
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
