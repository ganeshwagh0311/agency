import { Layers } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    {
      name: "Twitter",
      href: "#",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      name: "Linkedin",
      href: "#",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      name: "Instagram",
      href: "#",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.224 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      name: "Facebook",
      href: "#",
      path: "M24 12.073c0-6.627-5.373-12.073-12-12.073s-12 5.373-12 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "Github",
      href: "#",
      path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-white/[0.05] text-slate-400 font-light overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute bottom-0 right-0 w-[40rem] h-[20rem] bg-indigo-500/5 rounded-t-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/[0.05]">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg">
                <Layers className="text-white w-4 h-4" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 blur-sm -z-10 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-sans font-bold text-xl tracking-wider text-white">
                NEXUS<span className="text-cyan-400 font-light">PRIME</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mt-2">
              A unified ecosystem for futuristic digital marketing campaigns, cloud-based print integrations, and high-end paper manufacturing.
            </p>
            <div className="flex gap-4 mt-2">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  title={social.name}
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 hover:scale-110 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Digital Marketing</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Cloud Printing</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Paper Printing</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">Priority Press API</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-300 transition-colors">Bespoke Projects</a></li>
            </ul>
          </div>

          {/* About Links */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#why-choose-us" className="hover:text-cyan-300 transition-colors">Why Choose Us</a></li>
              <li><a href="#process" className="hover:text-cyan-300 transition-colors">Our Process</a></li>
              <li><a href="#testimonials" className="hover:text-cyan-300 transition-colors">Client Reviews</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Terms & Privacy</a></li>
            </ul>
          </div>

          {/* Newsletter / Glass CTA */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <h4 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-2">
              Subscribe to Nexus Insights
            </h4>
            <p className="text-xs leading-relaxed max-w-xs">
              Receive monthly updates on web-to-print technologies, campaign strategy, and material innovations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-xs flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md focus-within:border-cyan-400/50 focus-within:bg-white/[0.04] transition-all">
              <input
                type="email"
                placeholder="newsletter@company.com"
                required
                className="bg-transparent flex-1 px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Join
              </button>
            </form>
            <span className="text-[10px] font-mono text-slate-600 uppercase">
              Secure transmission • Opt-out anytime
            </span>
          </div>
        </div>

        {/* Bottom copyright and compliance */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-slate-500">
          <p>© {currentYear} NEXUSPRIME INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-slate-400 transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-slate-400 transition-colors">SECURITY SLA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
