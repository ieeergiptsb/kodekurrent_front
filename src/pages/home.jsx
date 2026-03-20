import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Prizes } from "@/components/sections/Prizes";
import { Gallery } from "@/components/sections/Gallery";
import { Team } from "@/components/sections/Team";
import { Sponsors } from "@/components/sections/Sponsors";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { motion } from "framer-motion";
import { Gamepad2, Rocket, Cpu, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return <div className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
    <Navbar />

    <main>
      <section id="home" className="section-blend">
        <Hero />
      </section>

      <div id="about" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <About />
        </motion.div>
      </div>

      <div id="timeline" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Timeline />
        </motion.div>
      </div>

      <div id="sponsors" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Sponsors />
        </motion.div>
      </div>

      <div id="prizes" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Prizes />
        </motion.div>
      </div>

      <div id="gallery" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Gallery />
        </motion.div>
      </div>

      <div id="team" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Team />
        </motion.div>
      </div>

      <div id="faq" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <FAQ />
        </motion.div>
      </div>

      <div id="contact" className="section-blend">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Contact />
        </motion.div>
      </div>
    </main>

    <footer className="relative py-20 bg-[#060608] border-t border-primary/20 overflow-hidden">
      {/* Decorative Graphics */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }} className="absolute -top-20 -left-20 text-primary">
          <Cpu size={150} />
        </motion.div>
        <motion.div animate={{
          y: [0, -20, 0]
        }} transition={{
          duration: 5,
          repeat: Infinity
        }} className="absolute top-40 right-10 text-secondary">
          <Rocket size={100} />
        </motion.div>
        <div className="absolute bottom-10 left-1/4 text-accent opacity-30">
          <Gamepad2 size={120} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="flex flex-col items-start gap-4">
          <a href="https://www.ieeergipt.in/" target="_blank" rel="noopener noreferrer" className="group block">
            <h2 className="text-5xl md:text-6xl font-pixel text-white tracking-widest font-bold group-hover:text-primary transition-colors">
              IEEE
            </h2>
            <div className="flex flex-col gap-2 mt-2">
              <p className="font-mono text-xl md:text-2xl text-foreground max-w-sm group-hover:text-primary/80 transition-colors">
                Student Branch
              </p>
              <p className="font-mono text-sm md:text-base text-muted-foreground max-w-md">
                Rajiv Gandhi Institute of Petroleum Technology
              </p>
            </div>
          </a>
          
          <div className="flex gap-4 mt-6">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/ieeergipt/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#030712]/80 backdrop-blur-md border border-primary/30 rounded-xl hover:border-primary/80 hover:shadow-[0_0_15px_rgba(128,144,184,0.3)] transition-all text-muted-foreground hover:text-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/ieee_rgipt/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#030712]/80 backdrop-blur-md border border-primary/30 rounded-xl hover:border-primary/80 hover:shadow-[0_0_15px_rgba(128,144,184,0.3)] transition-all text-muted-foreground hover:text-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            {/* Location */}
            <a href="https://www.google.com/maps/place/Rajiv+Gandhi+Institute+of+Petroleum+Technology+(RGIPT)/@26.2733824,81.5104,7146m/data=!3m1!1e3!4m6!3m5!1s0x399ba1580bf13c33:0x32df0c8e914ab52e!8m2!3d26.2649711!4d81.5066796!16s%2Fm%2F03d7rbq?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#030712]/80 backdrop-blur-md border border-primary/30 rounded-xl hover:border-primary/80 hover:shadow-[0_0_15px_rgba(128,144,184,0.3)] transition-all text-muted-foreground hover:text-white flex items-center justify-center">
              <MapPin size={24} strokeWidth={2} />
            </a>
          </div>
          
          <a href="/creators/index.html">
            <button className="mt-8 px-6 py-3 rounded-lg font-mono text-white font-medium tracking-widest bg-[#030712]/80 backdrop-blur-md border border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(128,144,184,0.4)] transition-all uppercase text-sm cursor-pointer">
              Created by
            </button>
          </a>
        </div>
        
        {/* Additional right-side content can go here if needed in the future */}
      </div>

      <div className="container mx-auto px-4 mt-20 relative z-10 text-center">
        <p className="font-pixel text-sm md:text-base text-muted-foreground/50 tracking-widest">
          © 2026 KodeKurrent. Powered by Innovation.
        </p>
      </div>
    </footer>
  </div>;
}