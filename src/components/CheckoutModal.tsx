import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Shield, Mail, User, Phone } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";
import { formatPrice } from "@/data/productHelpers";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CheckoutProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  currency?: string;
  image: string;
}

interface Props {
  product: CheckoutProduct;
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "success";

const CheckoutModal = ({ product, open, onClose }: Props) => {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("customers").upsert(
      {
        email: email.trim().toLowerCase(),
        name: name.trim() || null,
        phone: phone.trim() || null,
        source: "checkout",
        last_purchase_product: product.name,
        last_purchase_amount: product.price,
      },
      { onConflict: "email" }
    );
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    trackEvent("checkout_complete", { productId: product.id, productName: product.name, price: product.price });
    setStep("success");
  };

  const handleClose = () => {
    setStep("form");
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl z-10 overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-20"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {step === "form" && (
            <div className="p-6">
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Checkout</h2>
              <p className="text-sm text-muted-foreground mb-6">Complete your purchase to get instant access.</p>

              {/* Product summary */}
              <div className="flex gap-4 p-4 rounded-xl bg-muted mb-6">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <p className="text-lg font-bold text-foreground mt-1">{formatPrice(product.price)}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone (optional)</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234…"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-lg gold-gradient text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {saving ? "Processing…" : `Pay ${formatPrice(product.price)}`}
                </button>
              </form>

              {/* Trust */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Shield size={14} />
                Secure checkout · Instant delivery · Lifetime access
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="text-green-600" size={32} />
              </motion.div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">Payment Successful!</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Thank you, <strong>{name}</strong>!
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Your access details for <strong>{product.name}</strong> have been sent to <strong>{email}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-muted text-left mb-6">
                <p className="text-sm font-medium text-foreground mb-2">What's next?</p>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>✅ Check your email for download link</li>
                  <li>✅ Access your product dashboard</li>
                  <li>✅ Reach out on WhatsApp for support</li>
                </ul>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
