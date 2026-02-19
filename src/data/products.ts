import productSaasDashboard from "@/assets/product-saas-dashboard.jpg";
import productLandingPage from "@/assets/product-landing-page.jpg";
import productPortfolioTemplate from "@/assets/product-portfolio-template.jpg";
import productBlogPlatform from "@/assets/product-blog-platform.jpg";
import productEcommerce from "@/assets/product-ecommerce.jpg";
import productUiKit from "@/assets/product-ui-kit.jpg";
import productRestaurantApp from "@/assets/product-restaurant-app.jpg";
import productRealestate from "@/assets/product-realestate.jpg";

export type ProductCategory =
  | "Ready-Made Website"
  | "Micro SaaS"
  | "Landing Page Template"
  | "Portfolio Template"
  | "Blog Platform"
  | "UI Kit & Design Asset";

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDesc: string;
  category: ProductCategory;
  price: number;
  currency: string;
  image: string;
  features: string[];
  techStack: string[];
  demoUrl: string;
  isBestSeller?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}

export const categories: ProductCategory[] = [
  "Ready-Made Website",
  "Micro SaaS",
  "Landing Page Template",
  "Portfolio Template",
  "Blog Platform",
  "UI Kit & Design Asset",
];

export const products: Product[] = [
  {
    id: "saas-analytics-dashboard",
    name: "SaaS Analytics Dashboard",
    shortDesc: "Complete analytics dashboard with charts, tables, and real-time data views.",
    description:
      "A production-ready SaaS analytics dashboard featuring interactive charts, data tables, user management, and a responsive sidebar layout. Built with React and Tailwind CSS, it's designed for startups that need a polished admin panel out of the box.",
    category: "Micro SaaS",
    price: 150000,
    currency: "NGN",
    image: productSaasDashboard,
    features: [
      "Interactive charts & graphs",
      "Data table with search & filters",
      "User management panel",
      "Responsive sidebar navigation",
      "Light & dark mode",
      "Export to CSV",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Shadcn UI"],
    demoUrl: "#",
    isBestSeller: true,
  },
  {
    id: "startup-landing-page",
    name: "Startup Landing Page",
    shortDesc: "High-converting landing page with hero, features, pricing, and CTA sections.",
    description:
      "A beautifully designed startup landing page built for conversion. Includes hero section with gradient background, feature highlights, pricing tiers, testimonials carousel, and a lead-capture form. Mobile responsive and SEO optimized.",
    category: "Landing Page Template",
    price: 50000,
    currency: "NGN",
    image: productLandingPage,
    features: [
      "Hero with animated gradient",
      "Feature & pricing sections",
      "Testimonials carousel",
      "Lead capture form",
      "SEO optimized",
      "Mobile responsive",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    isPopular: true,
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio Template",
    shortDesc: "Dark-themed portfolio with masonry gallery, smooth animations, and contact form.",
    description:
      "Showcase your work with this stunning dark-themed portfolio. Features a masonry-style image gallery with lightbox, animated page transitions, an about section, and integrated contact form. Perfect for photographers, designers, and creatives.",
    category: "Portfolio Template",
    price: 70000,
    currency: "NGN",
    image: productPortfolioTemplate,
    features: [
      "Masonry image gallery",
      "Lightbox image viewer",
      "Smooth page transitions",
      "Contact form",
      "Dark & light themes",
      "Responsive design",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    isNew: true,
  },
  {
    id: "blog-starter-platform",
    name: "Blog Starter Platform",
    shortDesc: "Full blog layout with categories, author profiles, and reading time estimates.",
    description:
      "A clean, modern blog platform ready for content creators. Includes article listing with category filters, individual post pages, author bios, reading time estimates, and share buttons. SEO optimized with structured data.",
    category: "Blog Platform",
    price: 60000,
    currency: "NGN",
    image: productBlogPlatform,
    features: [
      "Category-based filtering",
      "Author profile cards",
      "Reading time estimates",
      "Social share buttons",
      "SEO structured data",
      "Responsive typography",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Markdown"],
    demoUrl: "#",
  },
  {
    id: "ecommerce-storefront",
    name: "E-Commerce Storefront",
    shortDesc: "Complete online store with product grid, cart, and checkout flow.",
    description:
      "A full e-commerce storefront template with product listing, search, shopping cart, and a multi-step checkout flow. Designed for Nigerian businesses looking to sell online quickly. Supports product categories and featured items.",
    category: "Ready-Made Website",
    price: 200000,
    currency: "NGN",
    image: productEcommerce,
    features: [
      "Product grid with filters",
      "Shopping cart system",
      "Multi-step checkout",
      "Search functionality",
      "Featured products section",
      "Mobile-first design",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    demoUrl: "#",
    isBestSeller: true,
  },
  {
    id: "delight-ui-kit",
    name: "DE-LIGHT UI Kit",
    shortDesc: "50+ premium UI components with variants, dark mode, and design tokens.",
    description:
      "A comprehensive UI component library with 50+ production-ready components. Includes buttons, cards, modals, forms, tables, charts, and navigation elements. Fully themed with design tokens for easy customization. Light and dark mode included.",
    category: "UI Kit & Design Asset",
    price: 40000,
    currency: "NGN",
    image: productUiKit,
    features: [
      "50+ components",
      "Light & dark mode",
      "Design token system",
      "Copy-paste ready",
      "Accessible (WCAG 2.1)",
      "Figma file included",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    demoUrl: "#",
    isPopular: true,
  },
  {
    id: "restaurant-ordering-app",
    name: "Restaurant Ordering App",
    shortDesc: "Digital menu with ordering system, cart, and order tracking.",
    description:
      "A complete restaurant ordering web application. Features a digital menu with categories, item customization, cart, and order placement. Includes an admin view for managing menu items and tracking orders. Perfect for restaurants going digital.",
    category: "Ready-Made Website",
    price: 180000,
    currency: "NGN",
    image: productRestaurantApp,
    features: [
      "Digital menu with categories",
      "Item customization options",
      "Cart & order placement",
      "Order tracking",
      "Admin panel",
      "Mobile optimized",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    demoUrl: "#",
    isNew: true,
  },
  {
    id: "realestate-listing-site",
    name: "Real Estate Listing Site",
    shortDesc: "Property listing platform with search, filters, and agent profiles.",
    description:
      "A professional real estate listing website with property search, advanced filters (price, location, type), detailed property pages with image galleries, and agent contact forms. Designed for Nigerian real estate businesses.",
    category: "Ready-Made Website",
    price: 250000,
    currency: "NGN",
    image: productRealestate,
    features: [
      "Property search & filters",
      "Image gallery per listing",
      "Agent profile pages",
      "Contact form per property",
      "Map integration ready",
      "Responsive design",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "React Router"],
    demoUrl: "#",
  },
];

export const formatPrice = (price: number, currency: string = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
};
