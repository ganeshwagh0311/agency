import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/creatives/01ashadi.jpg",
  "/creatives/powder_bag_post_2_4x5.jpg",
  "/creatives/sm_4.jpg",
  "/creatives/Untitled-15.jpg",
  "/creatives/sm_3.jpg",
  "/creatives/SM-9.jpg",
  "/creatives/sm-24.jpg",
  "/creatives/Untitled-12.jpg",
  "/creatives/sm_4_1.jpg",
  "/creatives/SM-12.jpg",
  "/creatives/sm_12.jpg",
  "/creatives/Untitled-2.jpg",
  "/creatives/sm_9.jpg",
  "/creatives/hiring_post.jpg"
];

export function CreativesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Optional: Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[550px] flex items-center justify-center overflow-hidden mb-20 md:mb-32">
      <div className="absolute w-full h-full flex items-center justify-center">
        {images.map((img, index) => {
          let offset = index - currentIndex;
          // Normalize offset to handle loop perfectly
          if (offset < -Math.floor(images.length / 2)) offset += images.length;
          if (offset > Math.floor(images.length / 2)) offset -= images.length;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;
          
          let zIndex = 10 - Math.abs(offset);
          let scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.55;
          let opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.7 : Math.abs(offset) === 2 ? 0.4 : 0;
          
          if (Math.abs(offset) > 2) opacity = 0;
          
          let x = `${offset * 60}%`; // Adjusted spacing to fit more images

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x,
                scale,
                opacity,
                zIndex,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute w-[60%] sm:w-[45%] md:w-[35%] lg:w-[25%] max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden ${isVisible ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}`}
              style={{
                 boxShadow: isCenter ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.2)" : "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => {
                if (offset < 0) prevSlide();
                if (offset > 0) nextSlide();
              }}
            >
              <img 
                src={img} 
                alt={`Creative ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
            </motion.div>
          );
        })}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-8 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-slate-900/60 border border-white/20 text-white backdrop-blur hover:bg-indigo-500/80 hover:scale-110 transition-all shadow-xl"
      >
        <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-8 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-slate-900/60 border border-white/20 text-white backdrop-blur hover:bg-fuchsia-500/80 hover:scale-110 transition-all shadow-xl"
      >
        <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
      </button>
    </div>
  );
}
