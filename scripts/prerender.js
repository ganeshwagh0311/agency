const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");

// Ensure vite build completed first
if (!fs.existsSync(templatePath)) {
  console.error("Error: dist/index.html template not found. Please run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");

// Load seoData.json
const seoDataPath = path.resolve(__dirname, "../src/utils/seoData.json");
const seoData = JSON.parse(fs.readFileSync(seoDataPath, "utf8"));

console.log(`Starting SEO pre-rendering for ${seoData.length} pages...`);

// Helper to escape HTML characters
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Generate sitemap.xml content dynamically
function generateSitemap(pages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  const today = new Date().toISOString().split('T')[0];
  pages.forEach(page => {
    // Only index pages that do not have noindex robots rules
    if (page.robots && page.robots.includes("noindex")) {
      return;
    }
    const cleanUrl = page.slug === "" ? "https://www.drishak.in/" : page.canonical.replace(/\/$/, "");
    xml += '  <url>\n';
    xml += `    <loc>${cleanUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.slug === "" ? "daily" : "weekly"}</changefreq>\n`;
    xml += `    <priority>${page.slug === "" ? "1.0" : (page.pageType === "service" ? "0.8" : "0.6")}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  return xml;
}

// Store results for validation checks
const processedPages = [];

// Main pre-rendering loop
seoData.forEach((page) => {
  const isHomepage = page.slug === "";
  const pageUrl = isHomepage ? "https://www.drishak.in/" : `https://www.drishak.in/${page.slug}`.replace(/\/$/, "");
  
  // 1. Build semantic crawlable HTML content for <div id="root">
  let semanticHtml = "";
  
  // Header Nav Links
  semanticHtml += "<header>\n";
  semanticHtml += '  <nav aria-label="Main Navigation">\n';
  semanticHtml += '    <a href="https://www.drishak.in/">Drishak Agency Home</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/digital-marketing">Digital Marketing</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/seo-services">SEO Services</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/google-ads">Google Ads</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/lead-generation">Lead Generation</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/social-media-marketing">Social Media Marketing</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/branding">Branding</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/website-design-development">Website Design</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/clothing-printing">Clothing Printing</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/paper-printing">Paper Printing</a>\n';
  semanticHtml += '    <a href="https://www.drishak.in/blog">Blog</a>\n';
  semanticHtml += '  </nav>\n';
  semanticHtml += "</header>\n";

  semanticHtml += "<main>\n";

  // Breadcrumbs
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    semanticHtml += '  <nav aria-label="Breadcrumbs">\n';
    semanticHtml += "    <ol>\n";
    page.breadcrumbs.forEach((crumb, i) => {
      semanticHtml += `      <li><a href="${crumb.item}">${escapeHtml(crumb.name)}</a>${i < page.breadcrumbs.length - 1 ? " &gt; " : ""}</li>\n`;
    });
    semanticHtml += "    </ol>\n";
    semanticHtml += "  </nav>\n";
  }

  // H1 Heading
  semanticHtml += `  <h1>${escapeHtml(page.h1)}</h1>\n`;
  
  // Intro Copy
  semanticHtml += `  <p>${escapeHtml(page.intro)}</p>\n`;

  // H2 Sections
  page.h2s.forEach(h2 => {
    semanticHtml += `  <section>\n`;
    semanticHtml += `    <h2>${escapeHtml(h2.title)}</h2>\n`;
    semanticHtml += `    <p>${escapeHtml(h2.content)}</p>\n`;
    semanticHtml += `  </section>\n`;
  });

  // FAQs
  if (page.faqs && page.faqs.length > 0) {
    semanticHtml += "  <section aria-label=\"Frequently Asked Questions\">\n";
    semanticHtml += "    <h2>Frequently Asked Questions</h2>\n";
    page.faqs.forEach(faq => {
      semanticHtml += "    <details>\n";
      semanticHtml += `      <summary><strong>${escapeHtml(faq.question)}</strong></summary>\n`;
      semanticHtml += `      <p>${escapeHtml(faq.answer)}</p>\n`;
      semanticHtml += "    </details>\n";
    });
    semanticHtml += "  </section>\n";
  }

  // Business NAP Details & CTA
  semanticHtml += "  <section aria-label=\"Contact Information\">\n";
  semanticHtml += "    <h2>Contact Drishak Agency</h2>\n";
  semanticHtml += "    <p>Get in touch for an SEO-friendly, performance-oriented review of your digital marketing requirements. We design solutions for organic relevance, search engine indexing, and lead growth without short-term ranking guarantees.</p>\n";
  semanticHtml += "    <address>\n";
  semanticHtml += "      <strong>Drishak Agency</strong><br />\n";
  semanticHtml += "      Near Poonam furniture, Gokul colony, Rahuri, Ahilyanagar, Maharashtra, 413705, India<br />\n";
  semanticHtml += '      Phone: <a href="tel:+919021889499">+91 9021889499</a> / <a href="tel:+918459656685">+91 8459656685</a><br />\n';
  semanticHtml += '      Email: <a href="mailto:sales@drishak.in">sales@drishak.in</a>\n';
  semanticHtml += "    </address>\n";
  semanticHtml += '    <p><a href="https://www.drishak.in/#contact"><strong>Request a Free Strategy Quote</strong></a></p>\n';
  semanticHtml += "  </section>\n";

  semanticHtml += "</main>\n";

  // Footer
  semanticHtml += "<footer>\n";
  semanticHtml += "  <nav aria-label=\"Footer Regional Links\">\n";
  semanticHtml += '    <a href="https://www.drishak.in/digital-marketing-rahuri">Digital Marketing Agency in Rahuri</a> | \n';
  semanticHtml += '    <a href="https://www.drishak.in/seo-services-rahuri">SEO Services in Rahuri</a> | \n';
  semanticHtml += '    <a href="https://www.drishak.in/google-ads-rahuri">Google Ads Agency Rahuri</a> | \n';
  semanticHtml += '    <a href="https://www.drishak.in/website-design-rahuri">Website Design Rahuri</a> | \n';
  semanticHtml += '    <a href="https://www.drishak.in/digital-marketing-ahilyanagar">Digital Marketing Ahilyanagar</a> | \n';
  semanticHtml += '    <a href="https://www.drishak.in/sitemap.xml">XML Sitemap</a>\n';
  semanticHtml += "  </nav>\n";
  semanticHtml += `  <p>&copy; ${new Date().getFullYear()} DRISHAK AGENCY. ALL RIGHTS RESERVED.</p>\n`;
  semanticHtml += "  <p>Rahuri, Ahilyanagar, Ahmednagar, Maharashtra, India</p>\n";
  semanticHtml += "</footer>\n";

  // 2. Build Head Meta Injection
  let pageHtml = template;

  // Remove existing template static schema and social meta tags to avoid duplication
  pageHtml = pageHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");
  pageHtml = pageHtml.replace(/<meta property="og:[^"]+" content="[^"]*"\s*\/?>\s*/g, "");
  pageHtml = pageHtml.replace(/<meta name="twitter:[^"]+" content="[^"]*"\s*\/?>\s*/g, "");

  // Title replacement
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);

  // Description meta replacement or addition
  const metaDescTag = `<meta name="description" content="${escapeHtml(page.description)}" />`;
  if (pageHtml.includes('name="description"')) {
    pageHtml = pageHtml.replace(/<meta name="description" content=".*?"\s*\/?>/, metaDescTag);
  } else {
    pageHtml = pageHtml.replace("</head>", `  ${metaDescTag}\n</head>`);
  }

  // Robots meta replacement or addition
  const robotsTag = `<meta name="robots" content="${escapeHtml(page.robots)}" />`;
  if (pageHtml.includes('name="robots"')) {
    pageHtml = pageHtml.replace(/<meta name="robots" content=".*?"\s*\/?>/, robotsTag);
  } else {
    pageHtml = pageHtml.replace("</head>", `  ${robotsTag}\n</head>`);
  }

  // Canonical link tag replacement or addition
  const canonicalTag = `<link rel="canonical" href="${pageUrl}" />`;
  if (pageHtml.includes('rel="canonical"')) {
    pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?"\s*\/?>/, canonicalTag);
  } else {
    pageHtml = pageHtml.replace("</head>", `  ${canonicalTag}\n</head>`);
  }

  // Inject dynamic JSON-LD schema script
  const jsonLdGraph = [];
  
  if (page.pageType === "home") {
    jsonLdGraph.push(
      {
        "@type": "Organization",
        "@id": "https://www.drishak.in/#organization",
        "name": "Drishak Agency",
        "url": "https://www.drishak.in/",
        "logo": "https://www.drishak.in/favicon.png",
        "sameAs": [
          "https://www.instagram.com/drishakagency",
          "https://www.facebook.com/share/1BDA2naTXi/",
          "https://www.linkedin.com/company/drishak-agency/",
          "https://x.com/drishakagency"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.drishak.in/#website",
        "url": "https://www.drishak.in/",
        "name": "Drishak Agency",
        "description": "Top Digital Marketing Agency in Rahuri, Ahilyanagar"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.drishak.in/#localbusiness",
        "name": "Drishak Agency",
        "image": "https://www.drishak.in/favicon.png",
        "url": "https://www.drishak.in/",
        "telephone": "+919021889499",
        "email": "sales@drishak.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Poonam furniture, Gokul colony",
          "addressLocality": "Rahuri",
          "addressRegion": "Maharashtra",
          "postalCode": "413705",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 19.3892,
          "longitude": 74.6468
        },
        "areaServed": ["Rahuri", "Ahilyanagar", "Ahmednagar", "Maharashtra"],
        "description": "Drishak Agency is the leading digital marketing agency in Rahuri & Ahilyanagar, offering premium SEO, PPC, social media services, branding, web design, and commercial printing.",
        "priceRange": "$$"
      }
    );
  } else if (page.pageType === "service") {
    jsonLdGraph.push(
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": page.title,
        "description": page.description,
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": page.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item
        }))
      },
      {
        "@type": "Service",
        "name": page.h1,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Drishak Agency",
          "image": "https://www.drishak.in/favicon.png",
          "telephone": "+919021889499",
          "email": "sales@drishak.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Near Poonam furniture, Gokul colony",
            "addressLocality": "Rahuri",
            "addressRegion": "Maharashtra",
            "postalCode": "413705",
            "addressCountry": "IN"
          }
        },
        "description": page.description
      }
    );
  } else if (page.pageType === "blog") {
    jsonLdGraph.push(
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        "url": pageUrl,
        "mainEntityOfPage": pageUrl,
        "headline": page.h1,
        "description": page.description,
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
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": page.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item
        }))
      }
    );
  } else if (page.pageType === "blog-list") {
    jsonLdGraph.push(
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": page.title,
        "description": page.description
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": page.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item
        }))
      }
    );
  }

  // Inject FAQPage structured data if page has visible FAQs
  if (page.faqs && page.faqs.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": page.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  const schemaTag = `\n  <script type="application/ld+json" class="dynamic-schema">\n  ${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLdGraph }, null, 2)}\n  </script>\n`;
  pageHtml = pageHtml.replace("</head>", `${schemaTag}</head>`);

  // Open Graph Social Media Tags
  const ogTags = `
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="${page.pageType === "blog" ? "article" : "website"}" />
  <meta property="og:image" content="https://www.drishak.in/favicon.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(page.title)}" />
  <meta name="twitter:description" content="${escapeHtml(page.description)}" />
  <meta name="twitter:image" content="https://www.drishak.in/favicon.png" />
  `;
  pageHtml = pageHtml.replace("</head>", `${ogTags}</head>`);

  // Replace <div id="root"></div> with pre-rendered content for crawler access
  const rootDivSearch = /<div id="root">\s*<\/div>/;
  if (rootDivSearch.test(pageHtml)) {
    pageHtml = pageHtml.replace(rootDivSearch, `<div id="root">\n${semanticHtml}\n</div>`);
  } else {
    // Attempt general fallback
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">\n${semanticHtml}\n</div>`);
  }

  // 3. Write file output
  let outFilePath = "";
  if (isHomepage) {
    outFilePath = path.join(distDir, "index.html");
  } else {
    // Generate folder-based layout dist/[slug]/index.html
    const subFolder = path.join(distDir, page.slug);
    if (!fs.existsSync(subFolder)) {
      fs.mkdirSync(subFolder, { recursive: true });
    }
    outFilePath = path.join(subFolder, "index.html");
  }

  fs.writeFileSync(outFilePath, pageHtml, "utf8");
  console.log(`- Pre-rendered file written: ${path.relative(distDir, outFilePath)}`);

  // Save parsed properties for validation checks
  processedPages.push({
    file: outFilePath,
    relativePath: isHomepage ? "index.html" : `${page.slug}/index.html`,
    slug: page.slug,
    pageType: page.pageType,
    title: page.title,
    description: page.description,
    canonical: pageUrl,
    h1: page.h1,
    robots: page.robots,
    schemaLength: jsonLdGraph.length
  });
});

// 4. Generate XML sitemap in dist/sitemap.xml
const sitemapXml = generateSitemap(seoData);
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.resolve(__dirname, "../public/sitemap.xml"), sitemapXml, "utf8");
console.log("- Dynamic sitemap.xml generated and synced to dist & public.");

// 5. Copy robots.txt to dist/robots.txt to ensure it is served directly
const srcRobots = path.resolve(__dirname, "../public/robots.txt");
const destRobots = path.join(distDir, "robots.txt");
if (fs.existsSync(srcRobots)) {
  fs.copyFileSync(srcRobots, destRobots);
  console.log("- Robots.txt copied to dist.");
}

// ==========================================
// 6. PRODUCTION SEO VALIDATION TEST SUITE
// ==========================================
console.log("\nRunning Production SEO Validation Check...");
let validationErrors = 0;

processedPages.forEach(p => {
  const content = fs.readFileSync(p.file, "utf8");
  
  // Validation Check A: Exactly one title tag
  const titleCount = (content.match(/<title>/g) || []).length;
  if (titleCount !== 1) {
    console.error(`[ERROR] Page ${p.relativePath} contains ${titleCount} <title> tags. Exactly 1 required.`);
    validationErrors++;
  }
  if (!p.title || p.title.trim() === "") {
    console.error(`[ERROR] Page ${p.relativePath} has an empty Title.`);
    validationErrors++;
  }

  // Validation Check B: Exactly one meta description tag
  const descCount = (content.match(/name="description"/g) || []).length;
  if (descCount !== 1) {
    console.error(`[ERROR] Page ${p.relativePath} contains ${descCount} description tags. Exactly 1 required.`);
    validationErrors++;
  }
  if (!p.description || p.description.trim() === "") {
    console.error(`[ERROR] Page ${p.relativePath} has an empty description.`);
    validationErrors++;
  }

  // Validation Check C: Exactly one canonical link tag
  const canonicalCount = (content.match(/rel="canonical"/g) || []).length;
  if (canonicalCount !== 1) {
    console.error(`[ERROR] Page ${p.relativePath} contains ${canonicalCount} canonical tags. Exactly 1 required.`);
    validationErrors++;
  }
  
  // Validation Check D: Canonical matches expected public URL format (HTTPS, non-www/www canonicalized)
  const canonicalHrefSearch = content.match(/<link rel="canonical" href="(.*?)"/);
  const canonicalHref = canonicalHrefSearch ? canonicalHrefSearch[1] : "";
  if (canonicalHref !== p.canonical) {
    console.error(`[ERROR] Page ${p.relativePath} canonical mismatch. Found: ${canonicalHref}, Expected: ${p.canonical}`);
    validationErrors++;
  }

  // Validation Check E: Exactly one H1 tag in body
  const h1OpenCount = (content.match(/<h1>/g) || []).length;
  const h1CloseCount = (content.match(/<\/h1>/g) || []).length;
  if (h1OpenCount !== 1 || h1CloseCount !== 1) {
    console.error(`[ERROR] Page ${p.relativePath} contains ${h1OpenCount} H1 open tags and ${h1CloseCount} H1 close tags. Exactly 1 of each required.`);
    validationErrors++;
  }
  if (!p.h1 || p.h1.trim() === "") {
    console.error(`[ERROR] Page ${p.relativePath} has an empty H1.`);
    validationErrors++;
  }

  // Validation Check F: JSON-LD schemas exist and validate
  const schemaCount = (content.match(/type="application\/ld\+json"/g) || []).length;
  if (schemaCount < 1) {
    console.error(`[ERROR] Page ${p.relativePath} is missing application/ld+json schemas.`);
    validationErrors++;
  }
  
  // Try parsing the injected JSON-LD schema
  const schemaMatch = content.match(/<script type="application\/ld\+json" class="dynamic-schema">([\s\S]*?)<\/script>/);
  if (schemaMatch && schemaMatch[1]) {
    try {
      const parsed = JSON.parse(schemaMatch[1]);
      if (!parsed["@context"] || !parsed["@graph"]) {
        console.error(`[ERROR] Page ${p.relativePath} schema graph structure is invalid.`);
        validationErrors++;
      }
    } catch (e) {
      console.error(`[ERROR] Page ${p.relativePath} contains invalid malformed JSON-LD: ${e.message}`);
      validationErrors++;
    }
  }

  // Validation Check G: Content exists inside root div
  const rootDivMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/);
  const innerContent = rootDivMatch ? rootDivMatch[1].trim() : "";
  if (innerContent.length < 200) {
    console.error(`[ERROR] Page ${p.relativePath} contains thin static content inside #root (Length: ${innerContent.length} chars). Genuinely unique copy required.`);
    validationErrors++;
  }
});

// Validation Check H: Duplicate canonical URLs across pages
const canonicalsList = processedPages.map(p => p.canonical);
const uniqueCanonicals = new Set(canonicalsList);
if (canonicalsList.length !== uniqueCanonicals.size) {
  console.error(`[ERROR] Duplicate canonical URLs detected across generated files.`);
  validationErrors++;
}

// Validation Check I: Sitemap existence and count verification
const sitemapContent = fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8");
const locMatches = (sitemapContent.match(/<loc>/g) || []).length;
const indexablePagesCount = seoData.filter(p => !p.robots.includes("noindex")).length;
if (locMatches !== indexablePagesCount) {
  console.error(`[ERROR] Sitemap contains ${locMatches} URLs, but database has ${indexablePagesCount} indexable pages.`);
  validationErrors++;
}

// Validation Check J: Robots.txt existence and verification
if (!fs.existsSync(destRobots)) {
  console.error("[ERROR] robots.txt not found in build directory.");
  validationErrors++;
} else {
  const robotsTxtContent = fs.readFileSync(destRobots, "utf8");
  if (!robotsTxtContent.includes("Sitemap: https://www.drishak.in/sitemap.xml")) {
    console.error("[ERROR] robots.txt is missing reference to sitemap.xml.");
    validationErrors++;
  }
}

if (validationErrors > 0) {
  console.error(`\nValidation FAILED with ${validationErrors} errors. Production build aborted.`);
  process.exit(1);
} else {
  console.log("\n[SUCCESS] Production SEO validation passed! All checks are green.\n");
}
