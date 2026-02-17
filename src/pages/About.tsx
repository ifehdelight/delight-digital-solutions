import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import Layout from "@/components/Layout";

const About = () => (
  <Layout>
    <section className="hero-gradient py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">About Us</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            The Story Behind DE-LIGHT
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We're passionate about building digital solutions that empower businesses across Africa.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                DE-LIGHT Softwares was born from a simple belief: every business deserves a powerful digital presence, regardless of size or budget. Founded with a passion for technology and design, we set out to bridge the gap between high-quality digital solutions and affordability.
              </p>
              <p>
                Today, we serve startups, small businesses, and growing enterprises with everything from ready-made website templates to fully custom web applications. Our team combines technical expertise with creative vision to deliver results that truly delight our clients.
              </p>
              <p>
                Based in Nigeria and serving clients across Africa, we understand the unique challenges and opportunities of the African digital landscape. We're not just building websites — we're building the digital future of African businesses.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission, Vision, Values */}
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Target, title: "Our Mission", desc: "To empower businesses with affordable, high-quality digital solutions that drive growth and create lasting impact." },
            { icon: Eye, title: "Our Vision", desc: "To become Africa's most trusted digital solutions partner, known for quality, innovation, and client satisfaction." },
            { icon: Heart, title: "Our Values", desc: "Quality craftsmanship, transparent communication, timely delivery, and genuine care for every client's success." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-xl bg-card border border-border text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
