import { motion } from "framer-motion";
import { Megaphone, Cloud, Printer, ArrowUpRight, Shield, Zap, Sparkles } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface ServiceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  colorClass: string;
  glowClass: string;
}

export function Services() {
  const services: ServiceItem[] = [
    {
      id: "digital",
      icon: Megaphone,
      title: "Digital Marketing",
      description: "We orchestrate data-driven multi-channel digital campaigns that capture attention, engage audiences, and drive measurable ROI.",
      features: [
        "SEO & SEM Optimization",
        "Social Media Management",
        "PPC & Paid Advertising",
        "Content & Brand Strategy",
        "Conversion Rate Optimization (CRO)",
      ],
      colorClass: "from-indigo-500 to-purple-500 text-indigo-400",
      glowClass: "group-hover:shadow-indigo-500/20",
    },
    {
  id: "clothing",
  icon: Cloud,
  title: "Clothing Printing",
  description: "Create and customize high-quality apparel with precision printing. From bulk orders to personalized designs, our workflow ensures premium results.",
  features: [
    "Custom T-Shirt & Apparel Printing",
    "High-Quality Fabric & Ink Finishing",
    "Bulk & On-Demand Production",
    "Design Upload & Preview System",
    "Fast Delivery & Order Tracking",
  ],
  colorClass: "from-cyan-500 to-blue-500 text-cyan-400",
  glowClass: "group-hover:shadow-cyan-500/20",
},
    {
      id: "paper",
      icon: Printer,
      title: "Paper Printing",
      description: "Experience tangible perfection. We combine traditional offset craftsmanship with advanced digital press technologies for premium print products.",
      features: [
        "Premium Commercial Offset",
        "High-Speed Variable Digital Press",
        "Luxury Packaging & Boxes",
        "Specialty Finishes (Foil, Spot UV)",
        "Certified Eco-Friendly Materials",
      ],
      colorClass: "from-fuchsia-500 to-pink-500 text-fuchsia-400",
      glowClass: "group-hover:shadow-fuchsia-500/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-fuchsia-500/5 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-purple-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Our Core Expertise
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
          >
            A Unified Ecosystem for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Brand Growth
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 mt-4 max-w-2xl mx-auto font-light"
          >
            We eliminate vendor fragmentation by offering fully integrated marketing and print services under one roof, designed for speed, scale, and uncompromising quality.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="group">
              <TiltCard className={`h-full p-1 shadow-lg transition-shadow duration-500 ${service.glowClass}`}>
                <div className="bg-slate-950/40 rounded-xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden">
                  {/* Subtle card grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />

                  {/* Card Glow Corner */}
                  <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${service.colorClass} opacity-10 blur-xl group-hover:opacity-30 group-hover:scale-150 transition-all duration-500 rounded-full`} />

                  {/* Header: Icon + Arrow */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`p-4 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] ${service.colorClass} shadow-inner`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    
                    <a
                      href="#contact"
                      className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/[0.1] group-hover:border-white/20 hover:scale-110 transition-all duration-300"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10 flex-1">
                    <h3 className="font-sans font-semibold text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-white group-hover:to-slate-300 transition-all">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-3 font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="mt-6 flex flex-col gap-2.5">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                          <span className={`mt-0.5 rounded-full p-0.5 bg-gradient-to-br ${service.colorClass} flex-shrink-0`}>
                            <div className="bg-slate-950 rounded-full p-0.5">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.colorClass}`} />
                            </div>
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Floating glass overlay at bottom */}
                  <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-slate-400 relative z-10">
                    <span className="font-mono flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" /> SLA Guaranteed
                    </span>
                    <span className="font-mono flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Ultra-Fast
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
