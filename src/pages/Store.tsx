import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Star, Sparkles, TrendingUp, ArrowRight, ExternalLink, ShoppingCart, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { products, categories, formatPrice, type ProductCategory, type Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import CheckoutModal from "@/components/CheckoutModal";
import { toast } from "sonner";

interface DbProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string | null;
  image_url: string | null;
  site_url: string | null;
  in_stock: boolean;
}

const Store = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory | string>("All");
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (data) setDbProducts(data as DbProduct[]);
    };
    load();
    const channel = supabase
      .channel("products-public")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const filteredStatic = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const filteredDb = useMemo(() => {
    return dbProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dbProducts, search, activeCategory]);

  const dbCategories = Array.from(new Set(dbProducts.map((p) => p.category)));
  const allCategories = ["All", ...categories, ...dbCategories.filter((c) => !categories.includes(c as any))];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribing(true);
    const { error } = await supabase
      .from("customers")
      .upsert(
        { email: newsletterEmail.trim().toLowerCase(), source: "newsletter" },
        { onConflict: "email" }
      );
    setSubscribing(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Subscribed! We'll keep you posted.");
      setNewsletterEmail("");
    }
  };

  const buyDbProduct = (p: DbProduct) => {
    setCheckoutProduct({
      id: p.id,
      name: p.name,
      shortDesc: p.description || "",
      description: p.description || "",
      category: p.category as ProductCategory,
      price: p.price,
      currency: "USD",
      image: p.image_url || "/placeholder.svg",
      features: [],
      techStack: [],
      demoUrl: p.site_url || "#",
    });
  };

  const totalCount = filteredStatic.length + filteredDb.length;

  return (
    <Layout>
      <SEOHead
        title="Digital Product Store"
        description="Browse premium ready-made websites, micro SaaS products, templates, UI kits, and design assets. Built by DE-LIGHT, ready for you."
        canonical="https://delightsoftwares.com/store"
      />
      <section className="hero-gradient py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Digital Marketplace</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Premium Digital Products
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Ready-made websites, micro SaaS tools, templates, and design assets — built by DE-LIGHT, ready for you.
            </p>
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card text-foreground border border-border focus:ring-2 focus:ring-accent focus:outline-none text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {totalCount === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="mx-auto text-muted-foreground mb-4" size={48} />
              <p className="text-muted-foreground text-lg">No products found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Admin-managed (DB) products */}
              {filteredDb.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingBag size={32} />
                      </div>
                    )}
                    {!p.in_stock && (
                      <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">Sold out</Badge>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{p.category}</p>
                    <h3 className="font-heading font-semibold text-foreground mb-1.5">{p.name}</h3>
                    {p.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                    )}
                    <div className="mt-auto space-y-3">
                      <div className="text-lg font-bold text-foreground">{formatPrice(p.price)}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => buyDbProduct(p)}
                          disabled={!p.in_stock}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg gold-gradient text-accent-foreground text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
                        >
                          <ShoppingCart size={14} /> Buy
                        </button>
                        {p.site_url && (
                          <a
                            href={p.site_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition"
                          >
                            <ExternalLink size={14} /> Visit
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Static catalogue products */}
              {filteredStatic.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/store/${product.id}`}
                    className="group block rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {product.isBestSeller && (
                          <Badge className="bg-accent text-accent-foreground text-xs gap-1">
                            <TrendingUp size={12} /> Best Seller
                          </Badge>
                        )}
                        {product.isPopular && (
                          <Badge className="bg-primary text-primary-foreground text-xs gap-1">
                            <Star size={12} /> Popular
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-green-600 text-primary-foreground text-xs gap-1">
                            <Sparkles size={12} /> New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="font-heading font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDesc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
                        <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <Mail className="mx-auto mb-3 text-primary" size={32} />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Stay in the loop</h2>
          <p className="text-muted-foreground mb-6">Get product updates, launches, and exclusive offers in your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary focus:outline-none text-sm"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {subscribing ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">Need Something Custom?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">Can't find exactly what you need? We'll build a custom version tailored to your business.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg gold-gradient text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Request Custom Version <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          open={!!checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </Layout>
  );
};

export default Store;
