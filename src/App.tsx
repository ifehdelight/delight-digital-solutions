import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import { usePageView } from "@/hooks/useAnalytics";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Store = lazy(() => import("./pages/Store"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  usePageView();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsProvider>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
