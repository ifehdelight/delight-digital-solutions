import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { blogPosts, categories, categoryColors } from "@/data/blogPosts";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <SEOHead
        title="Blog — Insights & Resources"
        description="Tips, tutorials, and industry insights on web development, SaaS, branding, and digital marketing from DE-LIGHT Softwares."
        canonical="https://delightsoftwares.com/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "DE-LIGHT Softwares Blog",
          description: "Insights and resources on web development, SaaS, and digital marketing.",
          publisher: { "@type": "Organization", name: "DE-LIGHT Softwares" },
        }}
      />
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
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
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
