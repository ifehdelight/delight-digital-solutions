import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ExternalLink, ShoppingCart, CheckCircle, Shield, Clock, Zap,
  Star, MessageCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { products, formatPrice } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import CheckoutModal from "@/components/CheckoutModal";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/store" className="text-primary font-medium hover:underline">
            ← Back to Store
          </Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <Layout>
      <SEOHead
        title={product.name}
        description={product.shortDesc}
        canonical={`https://delightsoftwares.com/store/${product.id}`}
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency,
            availability: "https://schema.org/InStock",
          },
        }}
      />
      {/* Back */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl overflow-hidden border border-border">
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{product.category}</Badge>
                {product.isBestSeller && <Badge className="bg-accent text-accent-foreground">Best Seller</Badge>}
                {product.isPopular && <Badge className="bg-primary text-primary-foreground">Popular</Badge>}
                {product.isNew && <Badge className="bg-green-600 text-primary-foreground">New</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="text-3xl font-bold text-foreground mb-6">
                {formatPrice(product.price)}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="px-8 py-3.5 rounded-lg gold-gradient text-accent-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <ShoppingCart size={18} /> Buy Now
                </button>
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
                <a
                  href={`https://wa.me/2347041598822?text=${encodeURIComponent(`Hi, I'm interested in "${product.name}". Can I get more info?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={18} /> Ask on WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Shield, label: "Secure Payment" },
                  { icon: Zap, label: "Instant Delivery" },
                  { icon: Clock, label: "Lifetime Access" },
                  { icon: Star, label: "Premium Quality" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <badge.icon size={16} className="text-primary" />
                    {badge.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Tech */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Features */}
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-5">Features Included</h2>
              <ul className="space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-5">Built With</h2>
              <div className="flex flex-wrap gap-2">
                {product.techStack.map((t) => (
                  <Badge key={t} variant="outline" className="text-sm py-1.5 px-3">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {related.map((p) => (
                <Link key={p.id} to={`/store/${p.id}`} className="group rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden">
                  <div className="overflow-hidden aspect-[4/3]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{p.name}</h3>
                    <p className="text-sm font-bold text-foreground">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CheckoutModal product={product} open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </Layout>
  );
};

export default ProductDetails;
