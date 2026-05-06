import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Upload, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { TiltCard } from "./TiltCard";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "digital",
    message: "",
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", service: "digital", message: "" });
      setFile(null);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const waNumber = "1234567890"; // Sample WhatsApp number
  const waText = encodeURIComponent("Hello NexusPrime! I would like to get a quote for my project.");
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-[30%] left-[-10%] w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-cyan-300 font-medium text-xs tracking-wider uppercase mb-4"
          >
            <Mail className="w-4 h-4" />
            Connect With Us
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
          >
            Let's Shape Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Next Reality
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-start gap-4"
            >
              <h3 className="font-sans font-bold text-2xl text-white">Start a Conversation</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Have a complex printing requirement or a digital campaign that needs scaling? Reach out to us. Our enterprise strategists respond within 2 hours.
              </p>
            </motion.div>

            {/* Contact details list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              {[
                { icon: Mail, label: "Email Us", value: "solutions@nexusprime.io", href: "mailto:solutions@nexusprime.io" },
                { icon: Phone, label: "Call Directly", value: "+1 (888) NEXUS-01", href: "tel:+18886398701" },
                { icon: MapPin, label: "HQ Innovation Lab", value: "700 Glassmorphism Way, Suite 101, Silicon Valley, CA 94025", href: "#" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono uppercase">{item.label}</p>
                    {item.href !== "#" ? (
                      <a href={item.href} className="text-slate-200 font-medium text-base hover:text-cyan-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-200 font-medium text-base leading-relaxed">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* WhatsApp Integration Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-[#25D366] font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25D366]/5 hover:shadow-[#25D366]/15 transition-all group"
              >
                <div className="p-1 bg-[#25D366] rounded-lg text-slate-900 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <span>Chat via WhatsApp</span>
              </a>
              <p className="text-[10px] font-mono text-slate-500 text-center mt-2">
                Available Mon-Fri 8:00 AM - 10:00 PM EST. Instant routing.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Glass Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Form border glowing highlights */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-md -z-10" />

              <TiltCard className="p-0.5" tiltMaxAngleX={5} tiltMaxAngleY={5}>
                <div className="p-6 md:p-10 rounded-2xl bg-slate-950/40 backdrop-blur-xl relative overflow-hidden">
                  
                  {isSubmitted ? (
                    /* Success Message */
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center text-center py-16"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-bold text-white">Pipeline Initiated!</h4>
                      <p className="text-slate-400 font-light max-w-sm mt-2">
                        Thank you! Your project data and files have been securely encrypted and uploaded. A solutions strategist will contact you within 2 hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] transition-all text-sm font-medium"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    /* The Form */
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.04] transition-all"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.04] transition-all"
                          />
                        </div>
                      </div>

                      {/* Service Dropdown */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="service" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          Service Pipeline Required
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="p-3 bg-slate-900 border border-white/10 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-800 transition-all cursor-pointer"
                        >
                          <option value="digital">Digital Marketing Campaign</option>
                          <option value="cloud">Cloud-Based Printing Integration</option>
                          <option value="paper">Paper Printing & Packaging</option>
                          <option value="multi">Multi-Service / Integrated Suite</option>
                        </select>
                      </div>

                      {/* Message Input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          Project Brief & Requirements
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your objectives, timelines, and scale..."
                          className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.04] transition-all resize-none"
                        />
                      </div>

                      {/* File Upload Option (for printing jobs) */}
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Attach Assets / Artwork (Optional)</span>
                          <span className="text-[10px] lowercase text-slate-500">PDF, AI, ZIP (Max 50MB)</span>
                        </span>

                        <label
                          htmlFor="file-upload"
                          className={`relative flex flex-col items-center justify-center border border-dashed rounded-xl p-6 cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-400/50 transition-all text-center ${
                            file ? "border-cyan-400 bg-cyan-400/[0.02]" : "border-white/20"
                          }`}
                        >
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.ai,.psd,.zip,.jpg,.png"
                          />

                          {file ? (
                            /* File Selected View */
                            <motion.div
                              initial={{ scale: 0.95 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-4 text-left w-full"
                            >
                              <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                                <Upload className="w-5 h-5 animate-bounce" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold text-white truncate">{file.name}</p>
                                <p className="text-xs text-slate-400 font-mono mt-0.5">
                                  {formatFileSize(file.size)} • File Ready
                                </p>
                              </div>
                              <div className="text-[10px] font-mono text-cyan-400 border border-cyan-400/30 px-2 py-0.5 rounded-md bg-cyan-400/10 flex-shrink-0">
                                Selected
                              </div>
                            </motion.div>
                          ) : (
                            /* Default Upload View */
                            <>
                              <Upload className="w-6 h-6 text-slate-500 mb-2 group-hover:text-cyan-400" />
                              <span className="text-sm font-medium text-slate-300">Drag & drop or click to browse</span>
                              <span className="text-xs text-slate-500 mt-1">Upload artwork, guidelines, or data sheets</span>
                            </>
                          )}
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative inline-flex items-center justify-center gap-2 px-8 py-4 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all overflow-hidden group disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {isSubmitting ? (
                          <>
                            {/* Loading Spinner */}
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="relative z-10 font-mono">Encrypting & Sending...</span>
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Send Pipeline Request</span>
                            <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                  
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
