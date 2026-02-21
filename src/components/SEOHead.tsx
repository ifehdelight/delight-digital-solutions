import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "DE-LIGHT Softwares";

const SEOHead = ({ title, description, canonical, ogType = "website", ogImage, jsonLd }: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    if (ogImage) setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // JSON-LD
    const existingLd = document.getElementById("seo-jsonld");
    if (existingLd) existingLd.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.getElementById("seo-jsonld");
      if (ld) ld.remove();
    };
  }, [title, description, canonical, ogType, ogImage, jsonLd]);

  return null;
};

export default SEOHead;
