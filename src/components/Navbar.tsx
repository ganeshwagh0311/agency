import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import logo from "../img/DRISHAK LOGO.png";
import { useTheme } from "../context/ThemeContext";
import { Link } from "./Link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "AboutUs", href: "#about-us" },
    { name: "FAQ", href: "#faq" },
    { name: "Process", href: "#process" },
    { name: "Blog", href: "/blog" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/70 dark:bg-slate-950/40 backdrop-blur-lg border-b border-slate-200 dark:border-white/10"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group" aria-label="Drishak Agency Home">
          <img 
            src={logo}
            alt="Drishak Agency Logo"
            className="h-5 md:h-5 w-auto object-contain transition-transform group-hover:scale-105 dark:invert-0 invert"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200 dark:border-white/[0.05] rounded-full px-6 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200/50 dark:hover:text-white dark:hover:bg-white/[0.05] transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <Link
            to="#contact"
            className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all group overflow-hidden"
          >
            <span className="relative z-10">Get Quote</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-base font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-indigo-600/30 transition-all"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="w-full h-px bg-slate-200 dark:bg-white/10 my-2"></div>

              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
