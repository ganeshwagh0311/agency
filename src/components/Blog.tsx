import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { TiltCard } from "./TiltCard";

export function Blog() {
  const posts = [
    {
      id: 1,
      title: "Grow Smarter. Reach Further. Convert Better.",
      excerpt: "Digital marketing is more than just online promotion—it's about creating meaningful connections with your audience. Our data-driven strategies help brands increase visibility, attract customers, and maximize ROI in an ever-evolving digital landscape.",
      date: "Oct 12, 2026",
      category: "Digital Marketing",
      image: "/creatives/card1.jpg",
    },
    {
      id: 2,
      title: "Wear Your Brand with Confidence",
      excerpt: "Custom apparel is more than clothing—it's a powerful marketing tool. High-quality clothing printing helps businesses build brand recognition, strengthen team identity, and create memorable customer experiences through stylish and professionally printed garments.",
      date: "Oct 05, 2026",
      category: "Clothing Printing",
      image: "/creatives/card2.jpg",
    },
    {
      id: 3,
      title: "Professional Paper Printing Solutions for Every Business",
      excerpt: "High-quality printed materials remain one of the most effective ways to communicate your brand message. From business cards and brochures to flyers, catalogs, and corporate stationery, professional paper printing helps businesses create a strong and lasting impression. With sharp details, vibrant colors, and premium paper options, every print reflects the quality and professionalism of your brand.",
      date: "Sep 28, 2026",
      category: "Paper Printing",
      image: "/creatives/card3.jpg",
    }
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="blog" className="relative py-24 bg-slate-900 text-white overflow-hidden border-t border-white/[0.05]">
      {/* Decorative background blur */}
      <div className="absolute bottom-[20%] right-[-10%] w-[30rem] h-[30rem] bg-fuchsia-500/5 rounded-full blur-[140px] -z-10" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-purple-300 font-medium text-xs tracking-wider uppercase mb-4"
            >
              <BookOpen className="w-4 h-4" />
              Latest Insights
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
            >
              Marketing <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">Knowledge Hub</span>
            </motion.h2>
          </div>
          
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#contact"
            className="group flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.article key={post.id} variants={itemVariants as any} className="group cursor-pointer">
              <TiltCard className="h-full p-1 shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-500">
                <div className="bg-slate-950/40 rounded-xl flex flex-col h-full overflow-hidden border border-white/[0.05]">
                  {/* Image Placeholder */}
                  <div className="h-48 w-full bg-slate-800 relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-sm rounded-full text-[10px] font-mono tracking-wider text-white border border-white/10 uppercase z-10">
                      {post.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs text-slate-400 font-mono mb-3">{post.date}</span>
                    <h3 className="font-semibold text-lg md:text-xl text-white mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-light line-clamp-3 mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors mt-auto">
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
