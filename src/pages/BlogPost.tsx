import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { blogPosts, categoryColors } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);
  const currentIndex = blogPosts.findIndex((p) => p.id === id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const renderContent = (block: string) => {
    if (block.startsWith("## ")) {
      return (
        <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }
    // Handle bold text and line breaks within paragraphs
    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i} className="text-foreground font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  };

  return (
    <Layout>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`https://delightsoftwares.com/blog/${post.id}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: "DE-LIGHT Softwares" },
        }}
      />

      {/* Hero */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose-custom"
          >
            {post.content.map((block, i) => (
              <div key={i}>{renderContent(block)}</div>
            ))}
          </motion.div>

          {/* Divider */}
          <hr className="my-12 border-border" />

          {/* Prev / Next navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prevPost ? (
              <button
                onClick={() => navigate(`/blog/${prevPost.id}`)}
                className="flex-1 text-left p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all group"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <ArrowLeft size={12} /> Previous
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </button>
            ) : <div className="flex-1" />}
            {nextPost ? (
              <button
                onClick={() => navigate(`/blog/${nextPost.id}`)}
                className="flex-1 text-right p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all group"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end mb-1">
                  Next <ArrowRight size={12} />
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {nextPost.title}
                </span>
              </button>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
