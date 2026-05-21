import { motion } from "framer-motion";
import { Quote, Star, MessageSquare } from "lucide-react";
import { TiltCard } from "./TiltCard";
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
import img4 from '../img/img4.png';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  image: string;
  gradient: string;
}

export function Testimonials() {
  const reviews: TestimonialItem[] = [
    {
      id: "t1",
      name: "Vishra Projects",
      role: "Client",
      company: "Google Review",
      review: "The approach and result was better than thought.... Overall it was nicely handled looking forward to it for the same.. long to go , positive to suggest others for extraordinary work",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Vishra+Projects&background=0f172a&color=fff",
      gradient: "from-indigo-500 to-cyan-500",
    },
    {
      id: "t2",
      name: "Sandip Aghav",
      role: "Local Guide",
      company: "Google Review",
      review: "Great experience with agency best work in rahuri",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Sandip+Aghav&background=ea580c&color=fff",
      gradient: "from-indigo-500 to-cyan-500",
    },
    {
      id: "t3",
      name: "Keshav Shinde",
      role: "Client",
      company: "Google Review",
      review: "Excellent service! Thank you so much for the 5-star support. We truly appreciate the trust and the highly professional work.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Keshav+Shinde&background=78350f&color=fff",
      gradient: "from-indigo-500 to-cyan-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as any },
    },
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden border-b border-white/5">
      {/* Decorative background blur */}
      <div className="absolute top-[40%] right-[-10%] w-[35rem] h-[35rem] bg-purple-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-purple-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <MessageSquare className="w-4 h-4" />
            Client Validation
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
          >
            What Industry Leaders{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Say About Us
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-400 mt-4 max-w-2xl mx-auto font-light"
          >
            Don't just take our word for it. We are backed by a long track record of success with enterprise brands, agile startups, and meticulous creators.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {reviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants} className="group">
              <TiltCard className="h-full p-0.5">
                <div className="bg-slate-950/40 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
                  {/* Floating Giant Quote Icon */}
                  <Quote className="absolute -top-6 -right-6 w-32 h-32 text-white/[0.01] group-hover:text-white/[0.03] group-hover:rotate-12 transition-all duration-700 font-black pointer-events-none" />

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-slate-300 text-sm font-light leading-relaxed flex-1 relative z-10">
                    "{review.review}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/[0.05] relative z-10">
                    <div className="relative flex-shrink-0">
                      {/* Avatar Image */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 group-hover:border-white/40 transition-colors">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {/* Decorative glowing dot */}
                      <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center p-0.5`}>
                        <div className={`w-full h-full rounded-full bg-gradient-to-r ${review.gradient}`} />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-sans font-semibold text-white text-base">
                        {review.name}
                      </h4>
                      <p className="text-xs font-light text-indigo-400">
                        {review.role}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        {review.company}
                      </p>
                    </div>
                  </div>
                  
                  {/* Light Reflection Flare inside Card */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos Strip */}
        <div className="mt-24 border-t border-white/[0.05] pt-12 overflow-hidden relative w-full">
          {/* Fading edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex items-center gap-12 md:gap-24 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration:15,
            }}
          >
            {[img1, img2, img3, img4, img1, img2, img3, img4].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Client Logo"
                className="h-16 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-110 cursor-pointer"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
