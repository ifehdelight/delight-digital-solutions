import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Layout from "@/components/Layout";

const blogPosts = [
  {
    id: "why-every-business-needs-website",
    title: "Why Every Nigerian Business Needs a Website in 2026",
    excerpt: "In today's digital age, having a professional website is no longer optional. Discover why your business needs an online presence to thrive.",
    category: "Business",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    author: "DE-LIGHT Team",
  },
  {
    id: "micro-saas-guide",
    title: "The Complete Guide to Micro SaaS: Build, Launch, Profit",
    excerpt: "Learn how to build small, focused software products that generate recurring revenue. From idea validation to your first paying customer.",
    category: "SaaS",
    date: "Feb 10, 2026",
    readTime: "8 min read",
    author: "DE-LIGHT Team",
  },
  {
    id: "web-design-trends-2026",
    title: "Top 10 Web Design Trends to Watch in 2026",
    excerpt: "From glassmorphism to AI-driven layouts, explore the design trends shaping the future of the web.",
    category: "Design",
    date: "Feb 5, 2026",
    readTime: "6 min read",
    author: "DE-LIGHT Team",
  },
  {
    id: "choosing-right-tech-stack",
    title: "How to Choose the Right Tech Stack for Your Startup",
    excerpt: "React, Next.js, or WordPress? We break down the pros and cons of popular tech stacks for startups and small businesses.",
    category: "Development",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    author: "DE-LIGHT Team",
  },
  {
    id: "branding-tips-startups",
    title: "5 Branding Tips That Will Make Your Startup Stand Out",
    excerpt: "Your brand is more than a logo. Learn how to create a memorable brand identity that resonates with your target audience.",
    category: "Branding",
    date: "Jan 20, 2026",
    readTime: "4 min read",
    author: "DE-LIGHT Team",
  },
  {
    id: "seo-basics-beginners",
    title: "SEO Basics: A Beginner's Guide to Ranking on Google",
    excerpt: "Demystifying search engine optimization. Simple, actionable steps to get your website found by more people.",
    category: "Marketing",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    author: "DE-LIGHT Team",
  },
];

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const categoryColors: Record<string, string> = {
  Business: "bg-primary/10 text-primary",
  SaaS: "bg-accent/10 text-accent-foreground",
  Design: "bg-gold/10 text-foreground",
  Development: "bg-navy-light/20 text-foreground",
  Branding: "bg-accent/10 text-accent-foreground",
  Marketing: "bg-primary/10 text-primary",
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="hero-gradient py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Our Blog</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Insights & Resources
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Tips, tutorials, and industry insights to help you grow your digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Colored header bar */}
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-lg mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
