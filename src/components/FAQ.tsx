import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Why do I need local SEO services in Rahuri , Ahilyanagar?",
      answer: "Local SEO ensures your business ranks high when customers in Rahuri and Ahilyanagar search for your products or services. As the best SEO company in Rahuri, we optimize your Google Business Profile and local keywords to drive foot traffic, effectively providing lead generation services for businesses in Rahuri to boost online inquiries directly to you."
    },
    {
      question: "What makes Drishak the best digital marketing agency in Rahuri ,Ahilyanagar for small businesses?",
      answer: "We offer an integrated ecosystem combining digital marketing, branding, and printing. Our affordable SEO services in Rahuri, combined with our ROI-focused approach, allow small businesses to scale effectively without dealing with multiple vendors."
    },
    {
      question: "Do you provide website development services in Rahuri , Ahilyanagar?",
      answer: "Yes! We are a leading website design company in Rahuri. We build premium, high-performance websites optimized for SEO and conversion. Whether you need an e-commerce platform or a corporate site, our web development team delivers."
    },
    {
      question: "How does your Google Ads management work?",
      answer: "Our Google Ads agency in Rahuri focuses on high-intent keywords to minimize wasted ad spend. We create targeted PPC campaigns, optimize landing pages, and continuously monitor performance to guarantee the highest return on investment for our clients."
    },
    {
      question: "Can you manage our social media presence?",
      answer: "Absolutely. As an expert social media marketing agency in Rahuri Maharashtra, we handle content creation, community management, and paid social campaigns across platforms like Instagram, Facebook, and LinkedIn to build your brand and engage your audience."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-6 md:py-12 bg-slate-950 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-cyan-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Common Questions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
          >
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <TiltCard key={index} className="p-[1px] shadow-lg">
              <div className="bg-slate-900/80 rounded-xl overflow-hidden backdrop-blur-sm border border-white/[0.05]">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group hover:bg-white/[0.02] transition-colors"
                >
                  <h3 className="font-semibold text-base md:text-lg text-slate-200 group-hover:text-white transition-colors pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-cyan-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 md:p-6 pt-0 text-slate-400 text-sm md:text-base font-light border-t border-white/[0.05]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
