import { motion } from "framer-motion";
import { Trophy, Star, Gift } from "lucide-react";
export function Prizes() {
  return <section id="prizes" className="py-20 relative overflow-hidden">
    <div className="container mx-auto px-4 text-center">
      <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-3xl md:text-5xl font-pixel mb-16 tracking-widest text-white text-center">
        Bounties & <span className="text-secondary">Directives</span>
      </motion.h2>

      <div className="max-w-4xl mx-auto console-screen group">
        <div className="console-header">
           <span>SYSTEM: REWARDS_MODULE</span>
           <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> ONLINE</span>
        </div>
        <div className="console-content">
          <div className="absolute inset-0 bg-[#8090B8]/5 group-hover:bg-[#8090B8]/10 transition-colors duration-500" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          <motion.div animate={{
            rotate: [0, 10, -10, 0]
          }} transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }} className="w-32 h-32 md:w-48 md:h-48 mb-4">
            <img src="/images/trophy.png" alt="Trophy" className="w-full h-full object-contain" />
          </motion.div>

          <h3 className="text-4xl md:text-6xl font-pixel text-white glitch-text" data-text="COMING SOON">
            COMING SOON
          </h3>

          <p className="text-[#8090B8] font-mono text-center max-w-xl leading-relaxed">
            System update in progress. Calculating new bounty payouts, escalating directive difficulty, and securing enhanced supply caches. Stand by for transmission.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "inset 0 0 20px rgba(234,179,8,0.2)" }}
              className="flex flex-col items-center gap-2 p-6 bg-[#030712]/90 border border-yellow-500/30 w-32 md:w-40 cursor-default transition-all hover:border-yellow-500/80 sci-fi-panel"
            >
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-xs font-pixel tracking-widest mt-2 text-yellow-500/90 text-center">COMMANDER</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "inset 0 0 20px rgba(156,163,175,0.2)" }}
              className="flex flex-col items-center gap-2 p-6 bg-[#030712]/90 border border-gray-400/30 w-32 md:w-40 cursor-default transition-all hover:border-gray-400/80 sci-fi-panel"
            >
              <Star className="w-8 h-8 text-gray-400" />
              <span className="text-xs font-pixel tracking-widest mt-2 text-gray-400/90 text-center">1ST OFFICER</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "inset 0 0 20px rgba(249,115,22,0.2)" }}
              className="flex flex-col items-center gap-2 p-6 bg-[#030712]/90 border border-orange-500/30 w-32 md:w-40 cursor-default transition-all hover:border-orange-500/80 sci-fi-panel"
            >
              <Gift className="w-8 h-8 text-orange-500" />
              <span className="text-xs font-pixel tracking-widest mt-2 text-orange-500/90 text-center">RATIONS</span>
            </motion.div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>;
}