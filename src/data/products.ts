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
  // ── Ready-Made Websites ──────────────────────────────
  {
    id: "ecommerce-storefront",
    name: "E-Commerce Storefront",
    shortDesc: "Complete online store with product grid, cart, and checkout flow.",
    description:
      "A full e-commerce storefront template with product listing, search, shopping cart, and a multi-step checkout flow. Designed for Nigerian businesses looking to sell online quickly.",
    category: "Ready-Made Website",
    price: 200000,
    currency: "NGN",
    image: productEcommerce,
    features: ["Product grid with filters", "Shopping cart system", "Multi-step checkout", "Search functionality", "Featured products section", "Mobile-first design"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    demoUrl: "#",
    isBestSeller: true,
  },
  {
    id: "restaurant-ordering-app",
    name: "Restaurant Ordering App",
    shortDesc: "Digital menu with ordering system, cart, and order tracking.",
    description:
      "A complete restaurant ordering web application. Features a digital menu with categories, item customization, cart, and order placement. Includes an admin view for managing menu items.",
    category: "Ready-Made Website",
    price: 180000,
    currency: "NGN",
    image: productRestaurantApp,
    features: ["Digital menu with categories", "Item customization options", "Cart & order placement", "Order tracking", "Admin panel", "Mobile optimized"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    demoUrl: "#",
    isNew: true,
  },
  {
    id: "realestate-listing-site",
    name: "Real Estate Listing Site",
    shortDesc: "Property listing platform with search, filters, and agent profiles.",
    description:
      "A professional real estate listing website with property search, advanced filters (price, location, type), detailed property pages with image galleries, and agent contact forms.",
    category: "Ready-Made Website",
    price: 250000,
    currency: "NGN",
    image: productRealestate,
    features: ["Property search & filters", "Image gallery per listing", "Agent profile pages", "Contact form per property", "Map integration ready", "Responsive design"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "React Router"],
    demoUrl: "#",
  },
  {
    id: "school-management-portal",
    name: "School Management Portal",
    shortDesc: "Student records, attendance tracking, and parent dashboard.",
    description:
      "A comprehensive school management system with student enrollment, grade management, attendance tracking, timetable builder, and a parent-facing dashboard for monitoring progress.",
    category: "Ready-Made Website",
    price: 300000,
    currency: "NGN",
    image: productSaasDashboard,
    features: ["Student enrollment & records", "Grade management system", "Attendance tracking", "Timetable builder", "Parent dashboard", "Report card generation"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    demoUrl: "#",
    isNew: true,
  },
  {
    id: "fitness-gym-website",
    name: "Fitness & Gym Website",
    shortDesc: "Class booking, trainer profiles, and membership plans.",
    description:
      "A modern fitness website with class schedules, trainer profiles, membership plan comparison, and a booking system. Great for gyms, yoga studios, and personal trainers.",
    category: "Ready-Made Website",
    price: 120000,
    currency: "NGN",
    image: productLandingPage,
    features: ["Class schedule & booking", "Trainer profile pages", "Membership plan tiers", "Gallery section", "Contact & inquiry form", "Mobile responsive"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
  },

  // ── Micro SaaS ────────────────────────────────────────
  {
    id: "saas-analytics-dashboard",
    name: "SaaS Analytics Dashboard",
    shortDesc: "Complete analytics dashboard with charts, tables, and real-time data views.",
    description:
      "A production-ready SaaS analytics dashboard featuring interactive charts, data tables, user management, and a responsive sidebar layout. Built for startups that need a polished admin panel.",
    category: "Micro SaaS",
    price: 150000,
    currency: "NGN",
    image: productSaasDashboard,
    features: ["Interactive charts & graphs", "Data table with search & filters", "User management panel", "Responsive sidebar navigation", "Light & dark mode", "Export to CSV"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Shadcn UI"],
    demoUrl: "#",
    isBestSeller: true,
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator Pro",
    shortDesc: "Create, send, and track professional invoices in minutes.",
    description:
      "A complete invoicing micro SaaS that lets freelancers and small businesses create branded invoices, track payment status, send reminders, and export PDFs. Clean dashboard with analytics.",
    category: "Micro SaaS",
    price: 180000,
    currency: "NGN",
    image: productSaasDashboard,
    features: ["Invoice creation & templates", "Payment status tracking", "Client management", "PDF export", "Dashboard analytics", "Email reminders"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "jsPDF", "Supabase"],
    demoUrl: "#",
    isPopular: true,
  },
  {
    id: "appointment-scheduler",
    name: "Appointment Scheduler",
    shortDesc: "Booking system with calendar view, reminders, and client management.",
    description:
      "A scheduling micro SaaS for service businesses. Clients can book available time slots, receive email confirmations, and get reminders. Admin dashboard for managing bookings and availability.",
    category: "Micro SaaS",
    price: 160000,
    currency: "NGN",
    image: productSaasDashboard,
    features: ["Calendar booking view", "Automated reminders", "Client database", "Availability management", "Multi-service support", "Mobile responsive"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "date-fns", "Supabase"],
    demoUrl: "#",
    isNew: true,
  },

  // ── Landing Page Templates ────────────────────────────
  {
    id: "startup-landing-page",
    name: "Startup Landing Page",
    shortDesc: "High-converting landing page with hero, features, pricing, and CTA sections.",
    description:
      "A beautifully designed startup landing page built for conversion. Includes hero with gradient background, feature highlights, pricing tiers, testimonials, and a lead-capture form.",
    category: "Landing Page Template",
    price: 50000,
    currency: "NGN",
    image: productLandingPage,
    features: ["Hero with animated gradient", "Feature & pricing sections", "Testimonials carousel", "Lead capture form", "SEO optimized", "Mobile responsive"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    isPopular: true,
  },
  {
    id: "product-launch-page",
    name: "Product Launch Page",
    shortDesc: "Countdown timer, email capture, and social proof for product launches.",
    description:
      "Build hype for your next product with this launch landing page. Features a countdown timer, email waitlist capture, social proof counters, feature previews, and sharing buttons.",
    category: "Landing Page Template",
    price: 45000,
    currency: "NGN",
    image: productLandingPage,
    features: ["Countdown timer", "Email waitlist capture", "Social proof counters", "Feature preview sections", "Share buttons", "Animated transitions"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    isNew: true,
  },
  {
    id: "agency-landing-page",
    name: "Agency Landing Page",
    shortDesc: "Modern agency website with portfolio showcase and contact form.",
    description:
      "A sleek agency landing page with service highlights, team section, portfolio carousel, client logos, and a professional contact form. Perfect for digital agencies and consultancies.",
    category: "Landing Page Template",
    price: 55000,
    currency: "NGN",
    image: productLandingPage,
    features: ["Service highlights", "Team member cards", "Portfolio carousel", "Client logo bar", "Contact form", "Smooth scroll navigation"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
  },

  // ── Portfolio Templates ───────────────────────────────
  {
    id: "creative-portfolio",
    name: "Creative Portfolio Template",
    shortDesc: "Dark-themed portfolio with masonry gallery, smooth animations, and contact form.",
    description:
      "Showcase your work with this stunning dark-themed portfolio. Features a masonry-style image gallery with lightbox, animated page transitions, and integrated contact form.",
    category: "Portfolio Template",
    price: 70000,
    currency: "NGN",
    image: productPortfolioTemplate,
    features: ["Masonry image gallery", "Lightbox image viewer", "Smooth page transitions", "Contact form", "Dark & light themes", "Responsive design"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    isNew: true,
  },
  {
    id: "developer-portfolio",
    name: "Developer Portfolio",
    shortDesc: "Terminal-inspired portfolio with project showcase and GitHub integration.",
    description:
      "A unique developer portfolio with a terminal/code-inspired aesthetic. Features a project showcase with tech tags, GitHub contribution graph, skills chart, and a blog section.",
    category: "Portfolio Template",
    price: 65000,
    currency: "NGN",
    image: productPortfolioTemplate,
    features: ["Terminal-inspired design", "Project showcase cards", "GitHub integration ready", "Skills visualization", "Blog section", "Dark mode default"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    isPopular: true,
  },
  {
    id: "photographer-portfolio",
    name: "Photographer Portfolio",
    shortDesc: "Full-screen galleries, lightbox viewer, and booking contact form.",
    description:
      "A visually stunning portfolio designed for photographers. Full-screen image galleries, category-based albums, client proofing layout, and a booking inquiry form.",
    category: "Portfolio Template",
    price: 60000,
    currency: "NGN",
    image: productPortfolioTemplate,
    features: ["Full-screen image galleries", "Category-based albums", "Lightbox with zoom", "Booking inquiry form", "Client testimonials", "Fast image loading"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
  },

  // ── Blog Platforms ────────────────────────────────────
  {
    id: "blog-starter-platform",
    name: "Blog Starter Platform",
    shortDesc: "Full blog layout with categories, author profiles, and reading time estimates.",
    description:
      "A clean, modern blog platform ready for content creators. Includes article listing with category filters, individual post pages, author bios, and share buttons.",
    category: "Blog Platform",
    price: 60000,
    currency: "NGN",
    image: productBlogPlatform,
    features: ["Category-based filtering", "Author profile cards", "Reading time estimates", "Social share buttons", "SEO structured data", "Responsive typography"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Markdown"],
    demoUrl: "#",
  },
  {
    id: "newsletter-blog",
    name: "Newsletter Blog Platform",
    shortDesc: "Blog with built-in newsletter subscription and email capture.",
    description:
      "A blog platform optimized for newsletter-driven content. Features email subscription forms, subscriber management, featured article highlights, and clean reading experience.",
    category: "Blog Platform",
    price: 75000,
    currency: "NGN",
    image: productBlogPlatform,
    features: ["Email subscription forms", "Featured articles section", "Newsletter archive", "Reading progress bar", "Social sharing", "RSS feed ready"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    demoUrl: "#",
    isPopular: true,
  },

  // ── UI Kits & Design Assets ───────────────────────────
  {
    id: "delight-ui-kit",
    name: "DE-LIGHT UI Kit",
    shortDesc: "50+ premium UI components with variants, dark mode, and design tokens.",
    description:
      "A comprehensive UI component library with 50+ production-ready components. Includes buttons, cards, modals, forms, tables, charts, and navigation elements.",
    category: "UI Kit & Design Asset",
    price: 40000,
    currency: "NGN",
    image: productUiKit,
    features: ["50+ components", "Light & dark mode", "Design token system", "Copy-paste ready", "Accessible (WCAG 2.1)", "Figma file included"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    demoUrl: "#",
    isPopular: true,
  },
  {
    id: "dashboard-ui-kit",
    name: "Dashboard UI Kit",
    shortDesc: "30+ dashboard-specific components: charts, tables, stats, and sidebars.",
    description:
      "A specialized UI kit for building admin dashboards. Includes chart components, data tables with sorting/pagination, stat cards, sidebar navigation, and notification panels.",
    category: "UI Kit & Design Asset",
    price: 35000,
    currency: "NGN",
    image: productUiKit,
    features: ["Chart components (bar, line, pie)", "Data table with pagination", "Stat & metric cards", "Sidebar navigation", "Notification panel", "Theming support"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    demoUrl: "#",
    isNew: true,
  },
  {
    id: "icon-illustration-pack",
    name: "Icon & Illustration Pack",
    shortDesc: "200+ custom icons and 50 illustrations in SVG format.",
    description:
      "A curated set of 200+ line icons and 50 vector illustrations designed for SaaS and startup websites. Available in SVG, PNG, and Figma. Consistent style, multiple sizes.",
    category: "UI Kit & Design Asset",
    price: 25000,
    currency: "NGN",
    image: productUiKit,
    features: ["200+ line icons", "50 vector illustrations", "SVG & PNG formats", "Figma source file", "Multiple sizes", "Commercial license"],
    techStack: ["SVG", "Figma", "Illustrator"],
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
