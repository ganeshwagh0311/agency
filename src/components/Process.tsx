import { motion } from "framer-motion";
import { Lightbulb, PenTool, ThumbsUp, Truck, Terminal, ArrowRight } from "lucide-react";

const CustomPenToolIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="pen-mask">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <circle cx="50" cy="58" r="3.5" fill="black" />
        <line x1="50" y1="58" x2="50" y2="33" stroke="black" strokeWidth="2" />
        <line x1="43" y1="33" x2="57" y2="33" stroke="black" strokeWidth="3" />
      </mask>
    </defs>

    {/* Tangent line with circle handles */}
    <line x1="15" y1="38" x2="68" y2="18" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="15" cy="38" r="3.5" fill="currentColor" />
    <circle cx="68" cy="18" r="3.5" fill="currentColor" />

    {/* Bezier curve */}
    <path d="M 22 75 C 20 10, 90 20, 85 50" stroke="currentColor" strokeWidth="2.5" fill="none" />
    
    {/* Square anchors */}
    <rect x="18" y="71" width="8" height="8" fill="currentColor" transform="rotate(-15 22 75)" />
    <rect x="81" y="46" width="8" height="8" fill="currentColor" transform="rotate(25 85 50)" />
    <rect x="37" y="24" width="10" height="10" fill="currentColor" transform="rotate(-20 42 28)" />

    {/* Pen nib pointing down with mask */}
    <path d="M 43 35 L 57 35 L 68 60 L 50 80 L 32 60 Z" fill="currentColor" mask="url(#pen-mask)" />
    
    {/* Cap underneath */}
    <path d="M 36 84 L 64 84 L 60 92 L 40 92 Z" fill="currentColor" />
  </svg>
);
import { TiltCard } from "./TiltCard";
import requirementProcessImg from "../img/requirement_process.jpg";
import designProcessImg from "../img/icom_design.jpg";
import approvalProcessImg from "../img/approval_process.jpg";
import deliveryProcessImg from "../img/delivery_process.jpg";

interface StepItem {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  phase: string;
  description: string;
  color: string;
  glow: string;
  image?: string;
  imageClass?: string;
}

export function Process() {
  const steps: StepItem[] = [
    {
      number: "01",
      icon: Lightbulb,
      title: "Requirement",
      phase: "Discovery & Strategy",
      description: "We dive deep into your brand's DNA, extracting goals, audience data, and exact technical specifications for the job.",
      color: "from-cyan-400 to-blue-500 text-cyan-400",
      glow: "group-hover:shadow-cyan-500/10",
      image: requirementProcessImg,
      imageClass: "object-contain bg-[#d5effc] p-2",
    },
    {
      number: "02",
      icon: CustomPenToolIcon,
      title: "Design",
      phase: "Creation & Preflight",
      description: "Our engineers craft bespoke digital campaigns or pixel-perfect print layouts, passing through automated preflight checks.",
      color: "from-indigo-500 to-purple-500 text-indigo-400",
      glow: "group-hover:shadow-indigo-500/10",
      image: designProcessImg,
      imageClass: "object-contain bg-white p-2",
    },
    {
      number: "03",
      icon: ThumbsUp,
      title: "Approval",
      phase: "Calibration & Review",
      description: "Inspect high-fidelity digital mockups or physical press proofs via our cloud portal. We calibrate until perfection is achieved.",
      color: "from-purple-500 to-pink-500 text-purple-400",
      glow: "group-hover:shadow-purple-500/10",
      image: approvalProcessImg,
      imageClass: "object-contain bg-white p-4",
    },
    {
      number: "04",
      icon: Truck,
      title: "Delivery",
      phase: "Go-Live & Fulfillment",
      description: "Digital campaigns are deployed instantly with live tracking, while print products roll out via localized automated press hubs.",
      color: "from-pink-500 to-rose-500 text-pink-400",
      glow: "group-hover:shadow-rose-500/10",
      image: deliveryProcessImg,
      imageClass: "object-contain bg-white p-4",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as any },
    },
  };

  return (
    <section id="process" className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[30%] left-[-10%] w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30rem] h-[30rem] bg-cyan-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-cyan-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <Terminal className="w-4 h-4" />
            Execution Pipeline
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
          >
            A Seamless, Automated{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
              Flow To Completion
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 mt-4 max-w-2xl mx-auto font-light"
          >
            Our operational framework is engineered to eliminate delays, minimize manual error, and provide complete transparency over your projects from inception to delivery.
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-6xl mx-auto mt-16">
          {/* Animated Connecting Line - Desktop */}
          <div className="hidden" />
          
          {/* Animated Connecting Line Fill - Desktop */}
          <div className="hidden" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6 relative"
          >
            {steps.map((step, index) => (
              <motion.div key={step.number} variants={itemVariants} className="group relative">
                {/* Mobile timeline line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[2.75rem] top-20 bottom-[-3rem] w-1 bg-gradient-to-b from-indigo-500 to-cyan-500 lg:hidden opacity-20" />
                )}

                <TiltCard className={`p-0.5 h-full transition-shadow duration-300 ${step.glow}`}>
                  <div className="bg-slate-950/40 rounded-2xl p-6 md:p-8 flex flex-col h-full items-center text-center relative overflow-hidden">
                    {/* Background number */}
                    <div className="absolute -bottom-6 -right-6 text-8xl font-sans font-black text-white/[0.02] tracking-tighter group-hover:text-white/[0.04] transition-colors">
                      {step.number}
                    </div>

                    {/* Step Icon / Image Circle & Floating Glow */}
                    <div className="relative mb-6 z-10">
                      {/* Step Circle Counter */}
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-xs font-bold text-white font-mono z-20 shadow-md">
                        {step.number}
                      </div>

                      <div className="w-28 h-28 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] flex items-center justify-center text-white relative z-10 group-hover:scale-110 transition-transform overflow-hidden">
                        {step.image ? (
                          <img 
                            src={step.image} 
                            alt={step.title} 
                            className={`w-full h-full ${step.imageClass || 'object-cover'} rounded-full`}
                          />
                        ) : (
                          <step.icon className={`w-10 h-10 ${step.color}`} />
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-full`} />
                      </div>
                      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-gradient-to-r ${step.color} opacity-30 blur-md rounded-full -z-10`} />
                    </div>


                    {/* Title & Description */}
                    <div className="flex-1 relative z-10">
                      <h4 className="text-xs font-mono font-semibold tracking-wider bg-white/[0.05] border border-white/[0.05] text-slate-300 px-3 py-1 rounded-full uppercase inline-block mb-3">
                        {step.phase}
                      </h4>
                      <h3 className="font-sans font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-3 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Next arrow inside cards on desktop */}
                    {index < steps.length - 1 && (
                      <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10 hidden lg:block group-hover:text-white/30 group-hover:translate-x-2 transition-all w-6 h-6 z-20 pointer-events-none" />
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA within Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-16 md:mt-24"
        >
          <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left max-w-2xl shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-shrink-0 items-center justify-center text-indigo-400 font-mono text-xl font-bold">
              ?
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Need an expedited pipeline?</p>
              <p className="text-xs text-slate-400 leading-relaxed mt-0.5">We offer "Priority Press" routes for campaigns or prints that need deployment within 12 to 24 hours. Contact our strategists directly.</p>
            </div>
            <a
              href="#contact"
              className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium text-xs whitespace-nowrap hover:bg-white/[0.1] hover:border-white/20 transition-all"
            >
              Consult Strategist
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
