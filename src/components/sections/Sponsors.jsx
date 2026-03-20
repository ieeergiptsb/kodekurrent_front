import { motion } from "framer-motion";

const sponsors = [{
  name: "Coca Cola",
  logo: "/sponser 1.jpg"
}, {
  name: "GrabOn",
  logo: "/sponser 2.png"
}, {
  name: "Rabbitt AI",
  logo: "/sponsor 3.jpg"
}, {
  name: "Prodigal.ai",
  logo: "/sponser 4.png"
}, {
  name: "Roostoo",
  logo: "/sponser 5.png"
}];

export function Sponsors() {
  return (
    <section id="sponsors" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-pixel text-center text-white uppercase tracking-widest transform-z-0">
          PAST <span className="text-primary">SPONSORS</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto console-screen group">
        <div className="console-header">
           <span>SYSTEM: SPONSORS_MANIFEST</span>
           <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> AUTHORIZED</span>
        </div>
        <div className="console-content overflow-hidden relative py-10">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20 z-0" />
          
          <div className="relative z-10 flex w-full overflow-hidden">
            <motion.div
              className="flex gap-16 md:gap-24 whitespace-nowrap min-w-max px-8 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                <div key={`${sponsor.name}-${index}`} className="flex flex-col items-center flex-shrink-0 group">
                  <div className="w-[150px] h-[80px] md:w-[250px] md:h-[120px] flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}