import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  schema?: any;
  ogType?: string;
  ogImage?: string;
}

export function SEO({
  title,
  description,
  canonicalUrl,
  robots = "index, follow",
  schema,
  ogType = "website",
  ogImage = "https://www.drishak.in/favicon.png"
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", robots);

    // 4. Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // 5. Open Graph Meta Tags
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", ogImage);

    // Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 6. Structured Schema Data (JSON-LD)
    // Remove previous dynamic schemas to avoid duplication
    const oldSchemas = document.querySelectorAll('script[type="application/ld+json"].dynamic-schema');
    oldSchemas.forEach((tag) => tag.remove());

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.className = "dynamic-schema";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalUrl, robots, schema, ogType, ogImage]);

  return null;
}
