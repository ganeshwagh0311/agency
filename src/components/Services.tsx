import { motion } from "framer-motion";
import { Megaphone, Shirt, Printer, ArrowUpRight, Shield, Zap, Sparkles } from "lucide-react";
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

interface ServicesProps {
  selectedService?: string;
  setSelectedService?: (service: string) => void;
}

interface ServiceStyle {
  iconBgNormal: string;
  iconTextNormal: string;
  arrowTextNormal: string;
  arrowBorderNormal: string;
  borderHover: string;
  glowHover: string;
  arrowHover: string;
  bgActive: string;
  borderActive: string;
  glowActive: string;
  bulletBgNormal: string;
  bulletBgActive: string;
}

const serviceStyles: Record<string, ServiceStyle> = {
  digital: {
    iconBgNormal: "bg-indigo-500/10 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    iconTextNormal: "text-indigo-600 dark:text-indigo-400",
    arrowTextNormal: "text-slate-500 dark:text-slate-400",
    arrowBorderNormal: "border-slate-900/[0.05] dark:border-white/[0.05]",
    borderHover: "",
    glowHover: "",
    arrowHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:border-indigo-500/30",
    bgActive: "bg-slate-50/80 dark:bg-slate-950/40",
    borderActive: "border-slate-200/50 dark:border-white/10",
    glowActive: "",
    bulletBgNormal: "from-indigo-500 to-purple-500",
    bulletBgActive: "from-indigo-500 to-purple-500",
  },
  clothing: {
    iconBgNormal: "bg-cyan-500/10 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    iconTextNormal: "text-cyan-600 dark:text-cyan-400",
    arrowTextNormal: "text-slate-500 dark:text-slate-400",
    arrowBorderNormal: "border-slate-900/[0.05] dark:border-white/[0.05]",
    borderHover: "",
    glowHover: "",
    arrowHover: "group-hover:text-[#00D4FF] group-hover:border-[#00B8E6]/50",
    bgActive: "bg-slate-50/80 dark:bg-slate-950/40",
    borderActive: "border-slate-200/50 dark:border-white/10",
    glowActive: "",
    bulletBgNormal: "from-cyan-500 to-blue-500",
    bulletBgActive: "from-cyan-500 to-blue-500",
  },
  paper: {
    iconBgNormal: "bg-fuchsia-500/10 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
    iconTextNormal: "text-fuchsia-600 dark:text-fuchsia-400",
    arrowTextNormal: "text-slate-500 dark:text-slate-400",
    arrowBorderNormal: "border-slate-900/[0.05] dark:border-white/[0.05]",
    borderHover: "",
    glowHover: "",
    arrowHover: "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 group-hover:border-fuchsia-500/30",
    bgActive: "bg-slate-50/80 dark:bg-slate-950/40",
    borderActive: "border-slate-200/50 dark:border-white/10",
    glowActive: "",
    bulletBgNormal: "from-fuchsia-500 to-pink-500",
    bulletBgActive: "from-fuchsia-500 to-pink-500",
  },
};

export function Services({ selectedService, setSelectedService }: ServicesProps) {
  const services: ServiceItem[] = [
    {
      id: "digital",
      icon: Megaphone,
      title: "Digital Marketing ",
      description: "We orchestrate data-driven multi-channel digital campaigns. As a premier Meta Ads Agency Rahuri and an expert online marketing agency Rahuri, we capture attention, engage local audiences, and drive measurable ROI.",
      features: [
        "Affordable SEO services in Rahuri",
        "Social Media marketing agency in Rahuri Maharashtra",
        "Google Ads management services in Rahuri",
        "Google Business Profile Optimization Rahuri",
        "PPC Services Rahuri & CRO",
      ],
      colorClass: "from-indigo-500 to-purple-500 text-indigo-400",
      glowClass: "group-hover:shadow-indigo-500/20",
    },
    {
      id: "clothing",
      icon: Shirt,
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
        staggerChildren: 0.08,
      },
    },
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 130,
        damping: 16,
        mass: 0.8
      },
    },
  };

  const middleItemVariants = {
    hidden: { opacity: 0, y: 200 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 130,
        damping: 16,
        mass: 0.8
      },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 130,
        damping: 16,
        mass: 0.8
      },
    },
  };

  return (
    <section id="services" className="relative py-6 md:py-12 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-fuchsia-500/5 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 text-purple-600 dark:text-purple-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Our Core Expertise
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400"
          >
            Comprehensive Marketing & Print{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Services in Rahuri
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto font-light"
          >
            We eliminate vendor fragmentation by providing local business marketing services in Rahuri under one roof. Our integrated digital and print solutions are designed for speed, scale, and uncompromising quality.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {services.map((service, index) => {
            const isActive = selectedService === service.id;
            const styles = serviceStyles[service.id];

            // Select variant based on the position of the card
            let cardVariants = leftItemVariants;
            if (index === 1) {
              cardVariants = middleItemVariants;
            } else if (index === 2) {
              cardVariants = rightItemVariants;
            }

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group cursor-pointer"
                onClick={() => {
                  if (setSelectedService) {
                    setSelectedService(service.id);
                  }
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <TiltCard
                  className="h-full p-1 shadow-lg transition-all duration-500 border-slate-200/50 dark:border-white/10"
                >
                  <div
                    className="rounded-xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden transition-all duration-500 bg-slate-50/80 dark:bg-slate-950/40"
                  >
                    {/* Subtle card grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />

                    {/* Card Glow Corner */}
                    <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${service.colorClass} opacity-10 blur-xl group-hover:opacity-30 group-hover:scale-150 transition-all duration-500 rounded-full`} />

                    {/* Header: Icon + Arrow */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div
                        className={`p-4 rounded-xl border transition-all duration-500 ${styles.iconBgNormal}`}
                      >
                        <service.icon className="w-6 h-6" />
                      </div>
                      
                      <div
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${styles.arrowBorderNormal} ${styles.arrowTextNormal} ${styles.arrowHover} group-hover:bg-slate-900/[0.1] dark:group-hover:bg-white/[0.1] hover:scale-110`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="relative z-10 flex-1">
                      <h3
                        className="font-sans font-semibold text-xl transition-all text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:via-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:via-white dark:group-hover:to-slate-300"
                      >
                        {service.title}
                      </h3>
                      <p
                        className="text-sm mt-3 font-light leading-relaxed transition-all text-slate-600 dark:text-slate-400"
                      >
                        {service.description}
                      </p>

                      {/* Features List */}
                      <ul className="mt-6 flex flex-col gap-2.5">
                        {service.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs font-light transition-all text-slate-700 dark:text-slate-300"
                          >
                            <span
                              className={`mt-0.5 rounded-full p-0.5 bg-gradient-to-br flex-shrink-0 ${styles.bulletBgNormal}`}
                            >
                              <div className="rounded-full p-0.5 bg-slate-50 dark:bg-slate-950">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${styles.bulletBgNormal}`}
                                />
                              </div>
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Floating glass overlay at bottom */}
                    <div
                      className="mt-8 pt-4 border-t flex items-center justify-between text-xs transition-all border-slate-900/[0.04] dark:border-white/[0.04] text-slate-500 dark:text-slate-400"
                    >
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

