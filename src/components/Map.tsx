import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function Map() {
  return (
    <section id="location" className="relative py-24 bg-slate-950 text-white overflow-hidden border-t border-white/[0.05]">
      {/* Background Blurs */}
      <div className="absolute top-[30%] left-[20%] w-[35rem] h-[35rem] bg-cyan-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-cyan-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <MapPin className="w-4 h-4" />
            Our Location
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight"
          >
            Locate Drishak <span className="text-cyan-400">Here</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10 h-[400px] md:h-[500px]"
        >
          {/* Google Maps Embed iframe */}
          <iframe
            src="https://maps.google.com/maps?q=Drishak+agency&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
