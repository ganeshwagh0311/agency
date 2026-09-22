import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import AboutUs  from "./components/AboutUs";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Map } from "./components/Map";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";

// Routing and SEO Imports
import { useRouter } from "./context/RouterContext";
import { SEO } from "./components/SEO";
import { ServicePage } from "./pages/ServicePage";
import { BlogPage } from "./pages/BlogPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import seoData from "./utils/seoData.json";

export default function App() {
  const [selectedService, setSelectedService] = useState<string>("digital");
  const { path } = useRouter();

  // Route routing logic
  const cleanPath = path.replace(/\/$/, ""); // Strip trailing slash for routing comparison

  const isHome = cleanPath === "" || cleanPath === "/index.html" || cleanPath.endsWith("index.html") || (typeof window !== "undefined" && window.location.protocol === "file:");
  
  // Handle legacy aliases for smooth client-side transition
  let targetPath = cleanPath;
  if (cleanPath === "/seo-agency-rahuri") targetPath = "/seo-services-rahuri";
  if (cleanPath === "/google-ads-agency-rahuri") targetPath = "/google-ads-rahuri";

  // Look up route in seoData to confirm if it's valid
  const routeRecord = seoData.find((p) => `/${p.slug}` === targetPath);

  const renderMainContent = () => {
    if (isHome) {
      return (
        <>
          <SEO
            title="Top Digital Marketing Agency in Rahuri | Drishak Agency"
            description="Drishak Agency is the leading digital marketing agency in Rahuri & Ahilyanagar. We offer premium SEO, Google Ads, social media marketing, web design, and printing services."
            canonicalUrl="https://www.drishak.in/"
            schema={{
              "@context": "https://schema.org",
              "@graph": [
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
              ]
            }}
          />
          <Hero />
          <Services selectedService={selectedService} setSelectedService={setSelectedService} />
          <Portfolio />
          <AboutUs />
          <Process />
          <Testimonials />
          <Contact selectedService={selectedService} />
          <FAQ />
          <Map />
        </>
      );
    }

    if (routeRecord) {
      if (routeRecord.pageType === "service") {
        return <ServicePage path={targetPath} />;
      }
      if (routeRecord.pageType === "blog" || routeRecord.pageType === "blog-list") {
        return <BlogPage path={targetPath} />;
      }
    }

    // Default 404 fallback
    return <NotFoundPage />;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-sans min-h-screen text-slate-900 dark:text-white select-none transition-colors duration-500">
      <Preloader />
      {/* Dynamic Smooth Background Lighting (static/ambient elements) */}
      <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 -z-50 transition-colors duration-500" />
      <div className="fixed top-[-20%] left-[-20%] w-[60rem] h-[60rem] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[200px] -z-50 pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="fixed bottom-[-20%] right-[-20%] w-[60rem] h-[60rem] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[200px] -z-50 pointer-events-none animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }} />

      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 z-[100] origin-left scale-x-0" id="scroll-progress" />

      {/* Components Layout */}
      <Navbar />
      <main>
        {renderMainContent()}
      </main>
      <Footer />
    </div>
  );
}
