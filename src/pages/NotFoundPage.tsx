import React from "react";
import { Link } from "../components/Link";
import { ArrowRight, AlertTriangle, Home } from "lucide-react";
import { SEO } from "../components/SEO";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center pt-24 px-4 transition-colors duration-500">
      <SEO 
        title="404 Page Not Found | Drishak Agency"
        description="The requested page could not be found. Return to Drishak Agency's home page for digital marketing, SEO, Google Ads, and local business services in Rahuri."
        canonicalUrl="https://www.drishak.in/404"
        robots="noindex, follow"
      />

      {/* Background orbs */}
      <div className="absolute w-80 h-80 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/10 text-red-500 mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light mb-8 leading-relaxed">
          The link you followed may be broken, or the page has been moved. We return a 404 status code where possible on our servers to ensure search engines clean their index.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-98 transition-all w-full group overflow-hidden"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <div className="text-xs text-slate-400 dark:text-slate-600 font-mono py-2 border-t border-slate-200 dark:border-white/[0.05] mt-6">
            Error Code: 404 HTTP STATUS
          </div>
        </div>
      </div>
    </div>
  );
}
