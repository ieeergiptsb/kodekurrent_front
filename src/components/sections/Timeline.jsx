import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const timelineEvents = [{
  date: "02 March 2026",
  title: "REGISTRATION",
  subtitle: "PORTAL OPENS",
  icon: "",
  color: "border-primary",
  text: "text-primary"
}, {
  date: "10 March 2026",
  title: "HACKATHON",
  subtitle: "48HR CODING BEGINS",
  icon: "",
  color: "border-primary",
  text: "text-primary"
}, {
  date: "14 March 2026",
  title: "RESULT",
  subtitle: "WINNERS ANNOUNCED",
  icon: "",
  color: "border-primary",
  text: "text-primary"
}];

export function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return <section id="timeline" ref={containerRef} className="py-20 relative">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-pixel text-center mb-16 text-white uppercase translate-z-0">
        TIME <span className="text-primary">LINE</span>
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Static Background Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

        {/* Animated Progress Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-primary via-secondary to-primary origin-top -translate-x-1/2 shadow-[0_0_15px_rgba(128,144,184,0.5)] z-0"
        />

        {timelineEvents.map((event, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 50,
          scale: 0.9,
          x: index % 2 === 0 ? 50 : -50
        }} whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          type: "spring",
          stiffness: 50,
          damping: 12,
          delay: index * 0.1
        }} className={cn("relative flex flex-col md:flex-row gap-8 mb-24 last:mb-0", index % 2 === 0 ? "md:flex-row-reverse" : "")}>
          {/* Spacer for alternating layout */}
          <div className="hidden md:block w-1/2" />

          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-background border-2 border-primary z-10 grid place-items-center shadow-[0_0_15px_rgba(128,144,184,0.6)]" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 bg-[#8090B8] shadow-[0_0_12px_#8090B8]"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            />
          </div>

          {/* Content Card */}
          <div className={cn("ml-12 md:ml-0 md:w-1/2 pl-4 md:pl-0", index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left")}>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              className={cn("sci-fi-panel p-6 hover:shadow-[0_0_25px_rgba(128,144,184,0.5)] transition-all duration-300", event.color)}
            >
              <h3 className="text-xl md:text-3xl font-pixel text-white mb-2 tracking-widest">{event.title}</h3>
              <p className={cn("font-mono font-black text-lg md:text-xl mb-2", event.text)}>{event.subtitle}</p>
              <p className="font-pixel text-sm text-[#8090B8]/60 tracking-widest">{event.date}</p>
            </motion.div>
          </div>
        </motion.div>)}
      </div>
    </div>
  </section>;
}