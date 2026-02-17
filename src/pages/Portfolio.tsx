import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";

const projects = [
  {
    title: "TechHub Lagos",
    category: "Business Website",
    desc: "A modern corporate website for a Lagos-based tech incubator with event management and member portal.",
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "StyleBox E-Commerce",
    category: "Web Application",
    desc: "Full-featured e-commerce platform with cart, payments, and inventory management for a fashion brand.",
    color: "from-accent/20 to-gold-light/20",
  },
  {
    title: "HealthPlus Clinic",
    category: "Landing Page",
    desc: "A clean, conversion-focused landing page for a healthcare startup with appointment booking.",
    color: "from-navy-light/20 to-primary/20",
  },
  {
    title: "EduTrack SaaS",
    category: "Micro SaaS",
    desc: "Student management platform with dashboards, analytics, and automated reporting for schools.",
    color: "from-primary/20 to-navy-light/20",
  },
  {
    title: "CreativeStudio Portfolio",
    category: "Portfolio Site",
    desc: "Stunning portfolio showcasing a photographer's work with lightbox gallery and smooth animations.",
    color: "from-accent/20 to-primary/20",
  },
  {
    title: "FoodieNg Blog",
    category: "Blog Platform",
    desc: "Content-rich food blog with recipe categories, newsletter signup, and social media integration.",
    color: "from-gold-light/20 to-accent/20",
  },
];

const Portfolio = () => (
  <Layout>
    <section className="hero-gradient py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Featured Projects
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            A showcase of digital products and websites we've crafted for our clients.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                <span className="text-4xl font-heading font-bold text-foreground/20 group-hover:text-foreground/30 transition-colors">
                  {p.title.charAt(0)}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{p.category}</span>
                <h3 className="font-heading font-semibold text-foreground text-lg mt-1 mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <button className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
                  View Live <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Portfolio;
