import React from "react";
import seoData from "../utils/seoData.json";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../components/Link";
import { ArrowRight, BookOpen, Clock, Calendar, Share2, Sparkles } from "lucide-react";
import { TiltCard } from "../components/TiltCard";

interface BlogPageProps {
  path: string;
}

export function BlogPage({ path }: BlogPageProps) {
  const cleanPath = path.replace(/\/$/, "");
  const post = seoData.find((page) => `/${page.slug}` === cleanPath);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="mt-2 text-slate-500">The requested page could not be found.</p>
          <Link to="/" className="mt-4 inline-block text-cyan-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  // --- BLOG LISTING RENDERING ---
  if (post.pageType === "blog-list") {
    // Get all articles (items starting with 'blog/')
    const articles = seoData.filter((p) => p.pageType === "blog");

    // Blog Listing JSON-LD Schema
    const listSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.drishak.in/blog#webpage",
          "url": "https://www.drishak.in/blog",
          "name": post.title,
          "description": post.description
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.drishak.in/blog#breadcrumb",
          "itemListElement": post.breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.name,
            "item": crumb.item
          }))
        }
      ]
    };

    return (
      <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
        <SEO 
          title={post.title}
          description={post.description}
          canonicalUrl="https://www.drishak.in/blog"
          robots={post.robots}
          schema={listSchema}
        />

        {/* Background flares */}
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl pb-16">
          <Breadcrumbs items={post.breadcrumbs} />

          <div className="mt-8 mb-16 text-left max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-medium text-xs tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Resources & Insights
            </div>
            <h1 className="font-sans font-extrabold text-3xl md:text-5xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-slate-400">
              {post.h1}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-light mt-6 leading-relaxed">
              {post.intro}
            </p>
          </div>

          {/* Grid of articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => {
              // Determine category tags based on topic/titles
              let category = "SEO Insights";
              if (art.slug.includes("google-ads") || art.slug.includes("ppc")) category = "Google Ads";
              if (art.slug.includes("facebook") || art.slug.includes("lead-generation")) category = "Paid Social";
              if (art.slug.includes("social-media")) category = "Social Media";

              return (
                <TiltCard key={art.slug} className="p-[1px] shadow-lg h-full">
                  <div className="bg-white/80 dark:bg-slate-900/40 rounded-xl p-6 flex flex-col h-full relative overflow-hidden backdrop-blur-sm border border-slate-200 dark:border-white/10 group">
                    <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-3 block">
                      {category}
                    </span>
                    <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-3">
                      {art.h1}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                      {art.intro}
                    </p>
                    <div className="flex items-center justify-between mt-auto border-t border-slate-200 dark:border-white/[0.05] pt-4 text-xs font-mono text-slate-400">
                      <span>Aug 30, 2026</span>
                      <Link 
                        to={`/${art.slug}`} 
                        className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold group-hover:underline"
                      >
                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- INDIVIDUAL BLOG ARTICLE RENDERING ---
  const otherPosts = seoData
    .filter((p) => p.pageType === "blog" && p.slug !== post.slug)
    .slice(0, 4);

  // Map blog post slugs to their most relevant target service URLs
  const getServiceLink = (slug: string) => {
    if (slug.includes("seo-cost") || slug.includes("choosing-seo") || slug.includes("best-digital")) {
      return { name: "SEO Agency Services", url: "/seo-agency-rahuri" };
    }
    if (slug.includes("local-seo") || slug.includes("rank-business")) {
      return { name: "Local SEO Services", url: "/local-seo-rahuri" };
    }
    if (slug.includes("google-ads-budget") || slug.includes("google-ads-vs-seo")) {
      return { name: "Google Ads PPC Agency", url: "/google-ads-agency-rahuri" };
    }
    if (slug.includes("facebook-instagram") || slug.includes("lead-generation")) {
      return { name: "Facebook Ads Management", url: "/facebook-instagram-ads-rahuri" };
    }
    if (slug.includes("social-media")) {
      return { name: "Social Media Agency", url: "/social-media-marketing-rahuri" };
    }
    if (slug.includes("mistakes")) {
      return { name: "Technical SEO Audit", url: "/technical-seo-audit" };
    }
    return { name: "Digital Marketing Services", url: "/" };
  };

  const targetService = getServiceLink(post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://www.drishak.in/${post.slug}#article`,
        "url": `https://www.drishak.in/${post.slug}`,
        "mainEntityOfPage": `https://www.drishak.in/${post.slug}`,
        "headline": post.h1,
        "description": post.description,
        "datePublished": "2026-08-30T10:00:00+05:30",
        "dateModified": "2026-08-30T10:00:00+05:30",
        "author": {
          "@type": "Person",
          "name": "Drishak Agency Editor"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Drishak Agency",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.drishak.in/favicon.png"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.drishak.in/${post.slug}#breadcrumb`,
        "itemListElement": post.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item
        }))
      }
    ]
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      <SEO 
        title={post.title}
        description={post.description}
        canonicalUrl={`https://www.drishak.in/${post.slug}`}
        robots={post.robots}
        schema={articleSchema}
        ogType="article"
      />

      <div className="absolute top-[10%] right-[10%] w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[35rem] h-[35rem] bg-cyan-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl pb-16">
        <Breadcrumbs items={post.breadcrumbs} />

        <header className="mt-8 mb-12 text-left max-w-4xl border-b border-slate-200 dark:border-white/10 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 text-indigo-600 dark:text-indigo-300 font-medium text-xs tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Insights & Guides
          </div>
          
          <h1 className="font-sans font-extrabold text-2xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-slate-900 dark:text-white">
            {post.h1}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-500" />
              <span>Aug 30, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-500" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span>Marketing Insights</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <article className="lg:col-span-8 space-y-8 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light first-letter:text-3xl first-letter:font-bold first-letter:text-cyan-500">
              {post.intro}
            </p>

            {post.h2s.map((h2, idx) => (
              <div key={idx} className="space-y-4 pt-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  {h2.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light text-sm md:text-base">
                  {h2.content}
                </p>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="p-5 rounded-xl bg-slate-100/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">How can we help?</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-light mt-1">
                    Read more about this topic on our dedicated service page.
                  </p>
                </div>
                <Link
                  to={targetService.url}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group"
                >
                  <span>Explore {targetService.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <Share2 className="w-4 h-4 text-cyan-500" /> Share This Article
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mb-4">
                Share this valuable optimization guide with your local business network.
              </p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.03] text-xs font-mono text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                Copy Page Link
              </button>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Other Marketing Insights</h3>
              <ul className="space-y-4">
                {otherPosts.map((other, idx) => (
                  <li key={idx} className="border-b border-slate-200 dark:border-white/[0.05] pb-3 last:border-0 last:pb-0">
                    <Link
                      to={`/${other.slug}`}
                      className="group block text-xs md:text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors leading-snug"
                    >
                      <span className="font-semibold block text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1 truncate">
                        {other.h1}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">Aug 30, 2026</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-md border border-indigo-500/20 dark:border-indigo-500/10 p-6 rounded-2xl shadow-xl text-center">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Want to Optimize Your Business?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light mb-4">
                Contact Drishak Agency for an SEO-friendly technical review.
              </p>
              <Link
                to="#contact"
                className="inline-flex items-center gap-1.5 justify-center py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-xs shadow-md hover:bg-indigo-700 transition-colors w-full group"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
