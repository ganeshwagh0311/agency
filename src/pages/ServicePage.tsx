import React, { useState } from "react";
import seoData from "../utils/seoData.json";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../components/Link";
import { ChevronDown, ArrowRight, CheckCircle2, Shield, Zap, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "../components/TiltCard";

interface ServicePageProps {
  path: string;
}

export function ServicePage({ path }: ServicePageProps) {
  // Find current page data in the SEO source of truth
  const cleanPath = path.replace(/\/$/, ""); // Strip trailing slash for matching
  const pageData = seoData.find(
    (page) => `/${page.slug}` === cleanPath || (page.slug === "" && cleanPath === "")
  );

  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Service Not Found</h1>
          <p className="mt-2 text-slate-500">The requested service page does not exist.</p>
          <Link to="/" className="mt-4 inline-block text-cyan-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  // Generate dynamic JSON-LD schema for this Service Page
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://www.drishak.in/${pageData.slug}#webpage`,
        "url": `https://www.drishak.in/${pageData.slug}`,
        "name": pageData.title,
        "description": pageData.description,
        "breadcrumb": {
          "@id": `https://www.drishak.in/${pageData.slug}#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.drishak.in/${pageData.slug}#breadcrumb`,
        "itemListElement": pageData.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item
        }))
      },
      {
        "@type": "Service",
        "name": pageData.h1,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Drishak Agency",
          "image": "https://www.drishak.in/favicon.png",
          "telephone": "+919021889499",
          "email": "drishakagency@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Near Poonam furniture, Gokul colony",
            "addressLocality": "Rahuri",
            "addressRegion": "Maharashtra",
            "postalCode": "413705",
            "addressCountry": "IN"
          }
        },
        "description": pageData.description
      }
    ]
  };

  // Add FAQ Page schema if FAQs exist
  if (pageData.faqs && pageData.faqs.length > 0) {
    (jsonLdSchema["@graph"] as any).push({
      "@type": "FAQPage",
      "@id": `https://www.drishak.in/${pageData.slug}#faq`,
      "mainEntity": pageData.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // Get related internal links based on service routing structure
  const getRelatedServices = () => {
    if (pageData.slug.includes("clothing") || pageData.slug.includes("paper")) {
      return [
        { name: "Custom Clothing Printing", url: "/clothing-printing" },
        { name: "Paper Printing Services", url: "/paper-printing" },
        { name: "Custom Branding & Identity", url: "/branding" },
        { name: "Website Design & Development", url: "/website-design-development" }
      ];
    }
    if (pageData.slug.includes("branding") || pageData.slug.includes("website")) {
      return [
        { name: "Website Design Company", url: "/website-design-development" },
        { name: "Web Design in Rahuri", url: "/website-design-rahuri" },
        { name: "Custom Branding Services", url: "/branding" },
        { name: "Digital Marketing Services", url: "/digital-marketing" },
        { name: "Clothing & T-Shirt Printing", url: "/clothing-printing" }
      ];
    }
    if (pageData.slug.includes("seo")) {
      return [
        { name: "SEO Optimization Services", url: "/seo-services" },
        { name: "SEO Services in Rahuri", url: "/seo-services-rahuri" },
        { name: "Local Maps SEO", url: "/local-seo-rahuri" },
        { name: "Technical SEO Audit", url: "/technical-seo-audit" },
        { name: "On-Page SEO Services", url: "/on-page-seo-services" }
      ];
    }
    if (pageData.slug.includes("google-ads") || pageData.slug.includes("lead") || pageData.slug.includes("performance")) {
      return [
        { name: "Google Ads & PPC Management", url: "/google-ads" },
        { name: "Google Ads in Rahuri", url: "/google-ads-rahuri" },
        { name: "B2B Lead Generation", url: "/lead-generation" },
        { name: "Facebook & Instagram Ads", url: "/facebook-instagram-ads-rahuri" },
        { name: "Performance Marketing", url: "/performance-marketing-rahuri" }
      ];
    }
    return [
      { name: "Digital Marketing Services", url: "/digital-marketing" },
      { name: "Marketing Agency in Rahuri", url: "/digital-marketing-rahuri" },
      { name: "SEO Services in Rahuri", url: "/seo-services-rahuri" },
      { name: "Social Media Marketing", url: "/social-media-marketing" },
      { name: "Google Ads Agency", url: "/google-ads" }
    ];
  };

  const related = getRelatedServices().filter(r => r.url !== `/${pageData.slug}`);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      <SEO 
        title={pageData.title}
        description={pageData.description}
        canonicalUrl={`https://www.drishak.in/${pageData.slug}`}
        robots={pageData.robots}
        schema={jsonLdSchema}
      />

      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl pb-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={pageData.breadcrumbs} />

        {/* Hero Section */}
        <div className="mt-8 mb-12 text-left max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-medium text-xs tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Service Focus
          </div>
          <h1 className="font-sans font-extrabold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-slate-400">
            {pageData.h1}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-light mt-6 leading-relaxed">
            {pageData.intro}
          </p>
        </div>

        {/* Core Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {pageData.h2s.map((h2, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {h2.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light text-sm md:text-base">
                  {h2.content}
                </p>
              </div>
            ))}

            {/* FAQs Accordion */}
            {pageData.faqs && pageData.faqs.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {pageData.faqs.map((faq, index) => (
                    <TiltCard key={index} className="p-[1px] shadow-md">
                      <div className="bg-white/85 dark:bg-slate-900/80 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-200 dark:border-white/[0.05]">
                        <button
                          onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                          className="w-full flex items-center justify-between p-5 text-left focus:outline-none group hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors"
                        >
                          <span className="font-semibold text-sm md:text-base text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-white transition-colors">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-cyan-600 dark:text-cyan-400 flex-shrink-0 ml-4"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {activeFAQ === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-xs md:text-sm font-light border-t border-slate-200 dark:border-white/[0.05] leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA Box */}
            <div className="relative bg-gradient-to-br from-indigo-900/20 to-purple-900/20 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-md border border-indigo-500/20 dark:border-indigo-500/10 p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] -z-10" />
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                Need Expert Advice?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-light mb-6 leading-relaxed">
                Connect with the team at Drishak Agency for a details-focused review of your marketing goals. No rankings promises—just solid strategy.
              </p>
              <div className="space-y-4">
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  📍 Rahuri, Ahilyanagar, Maharashtra<br />
                  📞 +919021889499<br />
                  ✉️ drishakagency@gmail.com
                </p>
                <Link
                  to="#contact"
                  className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-98 transition-all w-full group overflow-hidden"
                >
                  <span className="relative z-10">Request a Free Quote</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>

            {/* Related Services Links */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Related Services</h3>
              <ul className="space-y-3">
                {related.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.url}
                      className="group flex items-center justify-between text-xs md:text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-1.5"
                    >
                      <span>{service.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-cyan-600 dark:text-cyan-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Guarantees Box */}
            <div className="bg-slate-100/50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/[0.03] p-4 rounded-xl text-[11px] text-slate-500 dark:text-slate-500 font-mono space-y-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> No ranking promises
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> SEO-friendly hybrid model
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
