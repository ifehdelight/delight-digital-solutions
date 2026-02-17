import { Link } from "react-router-dom";
import { MessageCircle, Mail, Phone } from "lucide-react";
import logo from "@/assets/delight-logo.png";

const Footer = () => (
  <footer className="hero-gradient text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img src={logo} alt="DE-LIGHT Softwares" className="h-10 mb-4 brightness-0 invert" />
          <p className="text-sm opacity-80 leading-relaxed">
            Your trusted digital solutions partner. We build stunning websites, micro SaaS products, and creative designs.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
            <Link to="/portfolio" className="hover:opacity-100 transition-opacity">Portfolio</Link>
            <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span>Ready-Made Websites</span>
            <span>Micro SaaS Templates</span>
            <span>Custom Web Apps</span>
            <span>Branding & Logo Design</span>
            <span>UI/UX Design</span>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <a
              href="https://wa.me/2347041598822"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-100 transition-opacity"
            >
              <MessageCircle size={16} /> +234 704 159 8822
            </a>
            <a href="mailto:info@delightsoftwares.com" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <Mail size={16} /> info@delightsoftwares.com
            </a>
            <a href="tel:+2347041598822" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <Phone size={16} /> +234 704 159 8822
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} DE-LIGHT Softwares. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
