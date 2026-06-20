import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Briefcase, ChevronRight } from "lucide-react";
import { TiltCard } from "./TiltCard";
import socialMediaMixedImg from "../img/social_media_mixed.png";
import drishakShirtImg from "../img/drishak_shirt.png";

interface ProjectItem {
  id: string;
  title: string;
  category: "digital" | "cloud" | "paper";
  categoryName: string;
  client: string;
  description: string;
  image: string;
  link?: string;
  links?: { label: string; url: string }[];
}

export function Portfolio() {
  const [filter, setFilter] = useState<"all" | "digital" | "cloud" | "paper">("all");

  const categories = [
    { id: "all", name: "All Work" },
    { id: "digital", name: "Digital Marketing" },
    { id: "cloud", name: "Clothing Printing" },
    { id: "paper", name: "Paper Printing" },
  ] as const;

  const projects: ProjectItem[] = [
    {
      id: "p1",
      title: "Social Media Creative Post",
      category: "digital",
      categoryName: "Social Media Creative Post",
      client: "Creative Brand",
      description: "Engaging and viral social media creative posts designed to boost brand awareness and audience engagement.",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
      link: "/sm-post-vishal.pdf",
    },
    {
      id: "p2",
      title: "Website Development",
      category: "digital",
      categoryName: "Website Development",
      client: "Tech Solutions",
      description: "Custom-built, high-performance website with modern glassmorphism design and seamless user experience.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      link: "https://ganeshwagh0311.github.io/portfolio/",
    },
    {
      id: "p3",
      title: "Social Media Page Handling",
      category: "digital",
      categoryName: "Social Media Handling",
      client: "Global Brand",
      description: "End-to-end social media page management, content scheduling, and community engagement strategies.",
      image: socialMediaMixedImg,
      links: [
        { label: "Cafe Delight", url: "https://www.instagram.com/cafe_delight_official?igsh=emI5cGZqaDR5M2Q5" },
        { label: "Daivatam Dairy", url: "https://www.instagram.com/daivatamdairy?igsh=MzIzZHhhcHdzaWJ5" },
        { label: "Janseva Motors", url: "https://www.instagram.com/jansevamotors?igsh=MzF5ZmhudjFqeG8y" },
        { label: "Keshav Shinde", url: "https://www.instagram.com/keshav.shinde.1414?igsh=N2MwNDRsczR3bW1p" },
        { label: "Drishak Agency", url: "https://www.instagram.com/drishakagency?igsh=MWJhM3lyczF3YXkybQ==" }
      ]
    },
    {
      id: "p4",
      title: "Digital Growth",
      category: "digital",
      categoryName: "Digital Marketing",
      client: "Online Marketing",
      description: "Viral social media campaign and micro-influencer outreach that generated 50k+ signups in 30 days.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      link: "https://www.instagram.com/drishakagency?igsh=MXdua2VuM3NpMjF6Yg==",
    },
    {
      id: "p5",
      title: "Custom Apparel Collection",
      category: "cloud",
      categoryName: "Clothing Printing",
      client: "Brand Apparel",
      description: "High-quality, durable custom t-shirt printing with vibrant colors and premium fabric finishing.",
      image: drishakShirtImg,
      link: "/clothing-catalog.pdf",
    },
    {
      id: "p6",
      title: "Print Media",
      category: "paper",
      categoryName: "Paper Printing",
      client: "Print Production",
      description: "High-quality, bulk offset printing for premium corporate brochures, flyers, and marketing materials.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop",
      link: "/mockup.pdf",
    },
  ];

  const filteredProjects = filter === "all"
    ? projects
    : filter === "digital"
      ? [
          projects.find((p) => p.id === "p4")!,
          projects.find((p) => p.id === "p3")!,
        ].filter(Boolean)
      : projects.filter((p) => p.category === filter);


  return (
    <section id="portfolio" className="relative py-6 md:py-12 bg-slate-950 text-white overflow-hidden border-b border-white/5">
      {/* Decorative background blur */}
      <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-500/5 rounded-full blur-[140px] -z-10" />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)] -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16 gap-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-cyan-300 font-medium text-xs tracking-wider uppercase mb-4"
            >
              <Briefcase className="w-4 h-4" />
              Featured Projects
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
            >
              Comprehensive Marketing & Print{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                Services in Rahuri
              </span>
            </motion.h2>
          </div>

          {/* Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-white/10 p-1 rounded-2xl w-full sm:w-auto overflow-x-auto justify-start sm:justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === cat.id ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {filter === cat.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-cyan-500/80 rounded-xl -z-10 shadow-lg shadow-indigo-500/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group ${project.link ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (project.link) {
                    if (project.link.startsWith("http")) {
                      window.open(project.link, "_blank");
                    } else {
                      const link = document.createElement("a");
                      link.href = project.link;
                      link.download = project.link.split('/').pop() || "download";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }
                }}
              >
                <TiltCard className="p-0 h-full">
                  <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-slate-950/20">
                    {/* Project Image */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Image Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      
                      {/* Category Pill on Image */}
                      <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider bg-slate-950/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-cyan-300">
                        {project.categoryName}
                      </div>

                      {/* View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-indigo-950/30">
                        <div className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 flex flex-col flex-1 border-t border-white/[0.05] relative bg-slate-900/30 backdrop-blur-md">
                      {/* Sub-header */}
                      <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                        {project.client}
                      </span>
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      {/* Description */}
                      <p className="text-slate-400 text-sm mt-2 font-light leading-relaxed flex-1">
                        {project.description}
                      </p>
                      
                      {/* Bottom action link */}
                      {project.links ? (
                        <div className="mt-4 pt-4 border-t border-white/[0.04] flex flex-col gap-2">
                          <span className="text-xs text-white/50 font-medium">View Pages:</span>
                          <div className="flex flex-wrap gap-2">
                            {project.links.map((l, i) => (
                              <a
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 bg-white/5 hover:bg-indigo-500/20 rounded-lg border border-white/10 text-cyan-300 hover:text-white transition-all text-[11px] font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {l.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-1.5 text-xs text-white/50 font-medium group-hover:text-white transition-colors cursor-pointer">
                          <span>View Case Study</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
