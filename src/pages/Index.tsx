import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Globe, Zap, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const services = [
  { icon: Globe, title: "Ready-Made Websites", desc: "Launch quickly with professionally designed templates" },
  { icon: Code, title: "Custom Web Apps", desc: "Tailored solutions built for your unique needs" },
  { icon: Palette, title: "Branding & Design", desc: "Stunning logos and visual identities that stand out" },
  { icon: Zap, title: "Micro SaaS", desc: "Scalable software products ready for the market" },
];

const testimonials = [
  { name: "Adebayo O.", role: "CEO, TechHub Lagos", text: "DE-LIGHT Softwares transformed our online presence. The website is sleek, fast, and our customers love it!" },
  { name: "Chioma N.", role: "Founder, StyleBox", text: "Professional, creative, and delivered on time. They truly understand what Nigerian businesses need." },
  { name: "Emeka A.", role: "Director, EduTrack", text: "The SaaS dashboard they built is incredibly intuitive. Our teachers and parents find it easy to use." },
  { name: "Funke T.", role: "CEO, HealthPlus", text: "Our landing page conversion rate jumped by 40% after DE-LIGHT redesigned it. Highly recommended!" },
  { name: "Ibrahim K.", role: "Photographer", text: "My portfolio website is stunning. The animations and gallery are exactly what I envisioned. Great work!" },
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} custom={0} className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
              Your Digital Solutions Partner
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              We Build <span className="text-accent">Digital Experiences</span> That Delight
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
              Empowering businesses with cutting-edge websites, micro SaaS solutions, and creative designs that drive growth.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/store" className="px-8 py-3.5 rounded-lg gold-gradient text-accent-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                Browse Store <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="px-8 py-3.5 rounded-lg border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
                Get Custom Build
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
      </section>

      {/* Services Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Services That <span className="text-gradient">Drive Growth</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Why DE-LIGHT</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Why Businesses Trust Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Quality First", desc: "Every project is crafted with attention to detail and modern best practices." },
              { title: "Fast Delivery", desc: "We respect your time. Projects are delivered on schedule without compromising quality." },
              { title: "Affordable Pricing", desc: "Premium quality at prices that work for startups and growing businesses." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">What Our Clients Say</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto relative">
            <div className="overflow-hidden">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-xl bg-card border border-border text-center"
              >
                <div className="flex gap-1 justify-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={18} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <p className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentTestimonial ? "bg-primary w-6" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Let's turn your vision into a stunning digital reality. Get in touch today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-3.5 rounded-lg gold-gradient text-accent-foreground font-semibold hover:opacity-90 transition-opacity">
                Start Your Project
              </Link>
              <a href="https://wa.me/2347041598822" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-lg border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
