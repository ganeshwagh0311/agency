import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Cloud, ScrollText, CheckCircle2 } from "lucide-react";
import { ThreeHeroBg } from "./ThreeHeroBg";
import { TiltCard } from "./TiltCard";
import { Shirt } from "lucide-react";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import img4 from "../img/img4.png";
export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-slate-950 text-white flex items-center overflow-hidden pt-24 md:pt-16">
      {/* Three.js Liquid Background */}
      <ThreeHeroBg />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-purple-500/5 rounded-full blur-[180px] -z-10 pointer-events-none" />

      {/* Grid Pattern Overlay for Futuristic Look */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 md:py-24">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-cyan-300 font-medium text-xs tracking-wider uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            Next-Gen Digital & Print Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-extrabold text-4xl md:text-5xl xl:text-6xl tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400"
          >
            We Turn Ideas Into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Digital & Print
            </span>{" "}
            Reality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-light"
          >
            Drishak is a leading digital marketing, clothing printing, and print solution company in Maharashtra, India. We provide SEO, social media marketing, branding, custom t-shirt printing, and high-quality paper printing services. With a focus on creativity, fast delivery, and results-driven strategies, Drishak helps businesses grow their brand online and offline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-semibold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Get Instant Quote</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-white font-semibold text-base hover:bg-white/[0.08] hover:border-white/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="flex items-center gap-6 mt-6 border-t border-white/10 pt-6 w-full"
>
  <div className="flex -space-x-3">
    {[img1, img2, img3, img4].map((image, i) => (
      <div
        key={i}
        className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden"
      >
        <img
          src={image}
          alt={`Client avatar ${i + 1}`}
          className="w-8 h-8 object-contain"
          loading="lazy"
        />
      </div>
    ))}
  </div>

  <div>
    <p className="text-sm font-semibold text-white">
      Trusted by 500+ Businesses
    </p>
    <p className="text-xs text-slate-400">
      99% Client Satisfaction across all services
    </p>
  </div>
</motion.div> 
        </div>

        {/* Right Column: Animated Glass Card */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          {/* Circular light beam behind card */}
          <div className="absolute w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[80px] -z-10 animate-pulse" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg"
          >
            <TiltCard className="p-1 pb-2">
              <div className="rounded-xl overflow-hidden bg-slate-950/40 p-5 md:p-6 flex flex-col gap-6">
                {/* Glass Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-2">drishak_dashboard_v2.0</span>
                  </div>
                  <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
                    Live System
                  </span>
                </div>

                {/* Service Highlights inside Glass */}
                <div className="flex flex-col gap-4">
                  {/* Digital Marketing Panel */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group/panel"
                  >
                    <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover/panel:scale-110 transition-transform">
                      <BarChart3 className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-white">Digital Marketing</h4>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          +142.8%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">ROI-focused campaigns, SEO & Social growth.</p>
                      
                      {/* Mini Bar Chart */}
                      <div className="flex items-end gap-1 h-8 mt-3">
                        {[40, 25, 55, 70, 45, 85, 100].map((h, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-t-sm"
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{
                              duration: 0.8,
                              delay: 0.5 + i * 0.05,
                              repeat: Infinity,
                              repeatType: "reverse",
                              repeatDelay: 2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Cloud Printing Panel */}
                 <motion.div
  initial={{ x: 20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.5 }}
  className="flex gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group/panel"
>
  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover/panel:scale-110 transition-transform">
    <Shirt className="w-5 h-5" />
  </div>
  <div className="flex-1">
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-sm text-white">Clothing Printing</h4>
      <span className="text-xs font-mono text-cyan-400">89.4% Complete</span>
    </div>
    <p className="text-xs text-slate-400 mt-1">
      Custom apparel printing with high-quality fabric and design precision.
    </p>
    
    {/* Progress Bar */}
    <div className="w-full h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "89.4%" }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
    </div>
    <p className="text-[10px] font-mono text-slate-500 mt-1 flex justify-between">
      <span>tshirt_design_final.png (8.7 MB)</span>
      <span className="animate-pulse">Printing...</span>
    </p>
  </div>
</motion.div>

                  {/* Paper Printing Panel */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group/panel"
                  >
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover/panel:scale-110 transition-transform">
                      <ScrollText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-white">Paper Printing</h4>
                        <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Ready
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Premium paper, offset & digital, 2400 DPI.</p>
                      
                      {/* CMYK color bars */}
                      <div className="flex gap-1.5 mt-3">
                        {["bg-[#00ffff] text-black", "bg-[#ff00ff] text-white", "bg-[#ffff00] text-black", "bg-[#000000] border border-white/10 text-white"].map((color, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-5 rounded ${color} flex items-center justify-center text-[10px] font-bold font-mono`}
                          >
                            {["C", "M", "Y", "K"][i]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Floating extra glass element */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-2xl z-20 flex items-center gap-3 hidden md:flex"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Order Synced</p>
              <p className="text-[10px] text-slate-400">Print queues optimized</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
        onClick={() => {
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
