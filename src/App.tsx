import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { WhyChooseUs } from "./components/WhyChooseUs";
import AboutUs  from "./components/aboutUs";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-slate-950 font-sans min-h-screen text-white select-none">
      {/* Dynamic Smooth Background Lighting (static/ambient elements) */}
      <div className="fixed inset-0 bg-slate-950 -z-50" />
      <div className="fixed top-[-20%] left-[-20%] w-[60rem] h-[60rem] bg-indigo-500/10 rounded-full blur-[200px] -z-50 pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="fixed bottom-[-20%] right-[-20%] w-[60rem] h-[60rem] bg-cyan-500/10 rounded-full blur-[200px] -z-50 pointer-events-none animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }} />

      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 z-[100] origin-left scale-x-0" id="scroll-progress" />

      {/* Components Layout */}
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <AboutUs/>
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
