import { motion } from "framer-motion";
import { Megaphone, Shirt, Printer, ArrowUpRight, Shield, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { CreativesSlider } from "./CreativesSlider";

interface ServiceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  colorClass: string;
  glowClass: string;
}

export default function AboutUs() {

    const services: ServiceItem[] = [
    {
      id: "digital",
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Increase your online presence through our expert social media management and branding strategies.",
      features: [
        "Social Media Management",
        "Content Creation",
        "Advertising Campaigns",
        "Branding Strategy",
        "Promotional Strategies",
      ],
      colorClass: "from-indigo-500 to-purple-500 text-indigo-400",
      glowClass: "group-hover:shadow-indigo-500/20",
    },
    {
      id: "clothing",
      icon: Shirt,
      title: "Clothing Printing",
      description: "Premium clothing printing solutions from custom T-shirts to promotional merchandise.",
      features: [
        "Custom T-shirts",
        "Hoodies & Uniforms",
        "Corporate Wear",
        "Promotional Merchandise",
        "High-Quality Finishing",
      ],
      colorClass: "from-cyan-500 to-blue-500 text-cyan-400",
      glowClass: "group-hover:shadow-cyan-500/20",
    },
    {
      id: "paper",
      icon: Printer,
      title: "Paper Printing",
      description: "Professional paper printing services for all your marketing and branding materials.",
      features: [
        "Visiting Cards",
        "Brochures & Flyers",
        "Banners & Posters",
        "Catalogs & Stickers",
        "Other Branding Materials",
      ],
      colorClass: "from-fuchsia-500 to-pink-500 text-fuchsia-400",
      glowClass: "group-hover:shadow-fuchsia-500/20",
    },
  ];

  const reasons = [
    "2+ Years of Industry Experience",
    "Trusted by Multiple Satisfied Clients",
    "Complete Digital Marketing Solutions",
    "High-Quality Clothing Printing Services",
    "Professional Paper Printing Services",
    "Creative Design & Branding Support",
    "Affordable Pricing & Timely Delivery",
    "One Agency for All Your Business Needs"
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
    <section id="about-us" className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-fuchsia-500/5 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-purple-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-4 h-4" />
            About Us
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
          >
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Drishak Agency
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 mt-6 max-w-3xl mx-auto font-light space-y-4"
          >
            <p>
              At Drishak Agency, we are passionate about helping businesses grow through creative marketing and high-quality branding solutions. With over 2 years of experience and satisfied clients across various industries, we have built a reputation for delivering reliable, innovative, and result-driven services.
            </p>
            <p>
              We are a one-stop solution for all your marketing and printing needs. Our expert team specializes in Digital Marketing, helping businesses increase their online presence through social media management, content creation, advertising campaigns, branding, and promotional strategies.
            </p>
          </motion.div>
        </div>

        {/* Creatives Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <h3 className="font-sans font-bold text-2xl md:text-4xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Explore Our Recent Social Media Creatives
          </h3>
        </motion.div>
        {/* Creatives Slider */}
        <CreativesSlider />

        {/* Why Choose Us & Mission */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-12 lg:gap-16 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="space-y-8 w-full">
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                Why Choose Drishak Agency?
              </h3>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] p-4 rounded-lg hover:bg-white/[0.04] transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm md:text-base text-slate-300">{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="relative w-full max-w-4xl mx-auto">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 rounded-2xl blur-2xl -z-10" />
             <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl shadow-xl text-center">
                <div className="inline-flex items-center justify-center gap-2 mb-6">
                  <Shield className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-xl md:text-3xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-slate-300 leading-relaxed font-light text-lg md:text-xl">
                  Our mission is to help businesses build a strong brand identity, attract more customers, and achieve long-term growth through effective marketing and quality printing services. Whether you are a startup, small business, or established company, Drishak Agency is committed to delivering solutions that make your brand stand out.
                </p>
             </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}