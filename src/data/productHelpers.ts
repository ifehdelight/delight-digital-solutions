// Shared product helpers (DB-backed)

export const PRODUCT_CATEGORIES = [
  "Ready-Made Website",
  "Micro SaaS",
  "Landing Page Template",
  "Portfolio Template",
  "Blog Platform",
  "UI Kit & Design Asset",
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number] | string;

export interface DbProduct {
  id: string;
  slug: string | null;
  name: string;
  short_desc: string | null;
  description: string | null;
  category: string;
  price: number;
  currency: string;
  image_url: string | null;
  site_url: string | null;
  demo_url: string | null;
  features: string[];
  tech_stack: string[];
  in_stock: boolean;
  is_best_seller: boolean;
  is_popular: boolean;
  is_new: boolean;
}

export const formatPrice = (price: number, currency: string = "NGN") => {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${price.toLocaleString()}`;
  }
};
