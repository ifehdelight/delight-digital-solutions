import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe, Layout as LayoutIcon, FileText, Boxes,
  Briefcase, Smartphone, Palette, Layers, ArrowRight
} from "lucide-react";
import Layout from "@/components/Layout";

const readyMade = [
  { icon: LayoutIcon, title: "Landing Pages", desc: "High-converting landing pages designed to capture leads and drive action.", price: "From ₦50,000" },
  { icon: Globe, title: "Portfolio Sites", desc: "Showcase your work with a beautiful, responsive portfolio website.", price: "From ₦70,000" },
  { icon: FileText, title: "Blog Platforms", desc: "Content-ready blog sites with modern layouts and SEO optimization.", price: "From ₦60,000" },
  { icon: Boxes, title: "Micro SaaS Templates", desc: "Ready-to-launch SaaS templates with modern UI and scalable architecture.", price: "From ₦150,000" },
];

const custom = [
  { icon: Briefcase, title: "Business Websites", desc: "Professional websites tailored to your brand, industry, and goals.", price: "From ₦100,000" },
  { icon: Smartphone, title: "Web Applications", desc: "Custom web apps with rich functionality, dashboards, and integrations.", price: "From ₦200,000" },
  { icon: Palette, title: "Branding & Logo Design", desc: "Complete brand identity including logo, colors, typography, and guidelines.", price: "From ₦30,000" },
  { icon: Layers, title: "UI/UX Design", desc: "User-centered design that delights and converts visitors into customers.", price: "From ₦80,000" },
];

const ServiceCard = ({ icon: Icon, title, desc, price, i }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon className="text-primary" size={24} />
    </div>
    <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{desc}</p>
    <p className="text-sm font-semibold text-accent mb-4">{price}</p>
    <Link
      to="/contact"
      className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
    >
      Request Quote <ArrowRight size={14} />
    </Link>
  </motion.div>
);

const Services = () => (
  <Layout>
    {/* Header */}
    <section className="hero-gradient py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Our Services</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Digital Solutions for Every Need
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            From ready-made templates to fully custom builds, we deliver quality solutions that drive your business forward.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Ready-Made */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Quick Launch</p>
          <h2 className="text-3xl font-heading font-bold text-foreground">Ready-Made Solutions</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {readyMade.map((s, i) => (
            <ServiceCard key={s.title} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Custom */}
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Tailored For You</p>
          <h2 className="text-3xl font-heading font-bold text-foreground">Custom Solutions</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {custom.map((s, i) => (
            <ServiceCard key={s.title} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Not Sure What You Need?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            No worries! Reach out and we'll help you figure out the best solution for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Let's Talk <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Services;
