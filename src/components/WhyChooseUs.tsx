import { motion } from "framer-motion";
import { Award, Zap, ShieldCheck, Cpu, Check } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface PillarItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  glow: string;
  delay: number;
}

export function WhyChooseUs() {
  const pillars: PillarItem[] = [
    {
      icon: Award,
      title: "Uncompromising Quality",
      description: "We achieve sub-atomic precision in color matching across digital and print mediums, guaranteeing brand consistency.",
      color: "from-amber-500 to-orange-500 text-amber-400",
      glow: "shadow-amber-500/10",
      delay: 0.1,
    },
    {
      icon: Zap,
      title: "Ultra-Fast Speed",
      description: "Automated cloud preflight checking engines and 24/7 continuous production queues ensure blazing fast delivery.",
      color: "from-cyan-500 to-blue-500 text-cyan-400",
      glow: "shadow-cyan-500/10",
      delay: 0.2,
    },
    {
      icon: ShieldCheck,
      title: "Bulletproof Reliability",
      description: "Fully redundant server infrastructure and guaranteed service level agreements (SLAs) back every project.",
      color: "from-emerald-500 to-teal-500 text-emerald-400",
      glow: "shadow-emerald-500/10",
      delay: 0.3,
    },
    {
      icon: Cpu,
      title: "Future-Ready Innovation",
      description: "Seamless REST APIs for automated print ordering and advanced campaign analytics keep your business ahead.",
      color: "from-purple-500 to-indigo-500 text-purple-400",
      glow: "shadow-purple-500/10",
      delay: 0.4,
    },
  ];

  return (
    <section id="why-choose-us" className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden border-b border-white/5">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-indigo-500/5 rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side: Text and checklist */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 font-medium text-xs tracking-wider uppercase mb-4"
            >
              <ShieldCheck className="w-4 h-4" />
              The Nexus Edge
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
            >
              Engineered for Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                Unfair Advantage
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 mt-6 font-light leading-relaxed text-base md:text-lg"
            >
              We don't just execute services; we design integrated solutions. Our hybrid model blends data-driven digital capabilities with physical print manufacturing, delivering a seamless brand experience that converts.
            </motion.p>

            {/* Micro Checklists */}
            <ul className="mt-8 flex flex-col gap-4 w-full">
              {[
                "Unified dashboard for marketing and print workflows",
                "ISO-certified color accuracy and premium print stocks",
                "Automated API-driven orders with zero manual friction",
                "Direct dedicated account strategist for every client",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Side: Floating Glass Icons Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {/* Center decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />

            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pillar.delay }}
                className="group"
              >
                <TiltCard className={`p-0.5 h-full transition-shadow duration-300 hover:shadow-xl ${pillar.glow}`}>
                  <div className="p-6 md:p-8 rounded-2xl bg-slate-950/40 border border-white/[0.01] backdrop-blur-md flex flex-col items-start h-full relative overflow-hidden">
                    {/* Floating Glass Icon Wrapper */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 3 + pillar.delay * 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: pillar.delay,
                      }}
                      className="mb-5 relative"
                    >
                      {/* Frosted Glass Background for Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] flex items-center justify-center shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] relative z-10 group-hover:scale-110 group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all">
                        <pillar.icon className={`w-6 h-6 bg-gradient-to-br ${pillar.color} bg-clip-text text-transparent`} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                      </div>
                      
                      {/* Independent floating glow underneath icon */}
                      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-gradient-to-r ${pillar.color} opacity-30 blur-md rounded-full -z-10`} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed font-light">
                      {pillar.description}
                    </p>

                    {/* Futuristic indicator dots */}
                    <div className="flex gap-1 mt-6">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${pillar.color}`} />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    
  );
}
