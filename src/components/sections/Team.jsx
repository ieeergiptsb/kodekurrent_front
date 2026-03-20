import { motion } from "framer-motion";
import ElectricBorder from "@/components/ui/ElectricBorder";
const organizers = [
  { name: "Member 1", role: "Organizer", image: "/organizers/member1.png" },
  { name: "Member 2", role: "Organizer", image: "/organizers/member2.png" },
  { name: "Member 3", role: "Organizer", image: "/organizers/member3.png" },
  { name: "Member 4", role: "Organizer", image: "/organizers/member4.png" },
  { name: "Member 5", role: "Organizer", image: "/organizers/member5.png" },
  { name: "Member 6", role: "Organizer", image: "/organizers/member6.png" },
  { name: "Member 7", role: "Organizer", image: "/organizers/member7.png" },
  { name: "Member 8", role: "Organizer", image: "/organizers/member8.png" },
  { name: "Member 9", role: "Organizer", image: "/organizers/member9.png" },
  { name: "Member 10", role: "Organizer", image: "/organizers/member10.png" },
  { name: "Member 11", role: "Organizer", image: "/organizers/member11.png" },
  { name: "Member 12", role: "Organizer", image: "/organizers/member12.png" },
  { name: "Member 13", role: "Organizer", image: "/organizers/member13.png" },
  { name: "Member 14", role: "Organizer", image: "/organizers/member14.png" },
  { name: "Member 15", role: "Organizer", image: "/organizers/member15.png" }
];

export function Team() {
  return (
    <section id="team" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-pixel text-center tracking-widest text-white">
          Organizers
        </h2>
      </div>

      <div className="max-w-6xl mx-auto console-screen group">
        <div className="console-header">
           <span>SYSTEM: CREW_MANIFEST</span>
           <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> AUTHORIZED</span>
        </div>
        <div className="console-content overflow-hidden">
          <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex gap-8 min-w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {/* Double the cards for seamless loop */}
          {[...organizers, ...organizers].map((person, index) => (
            <motion.div
              key={`${person.name}-${index}`}
              className="w-56 md:w-64 group relative overflow-hidden sci-fi-panel p-2 cursor-pointer"
              whileHover="hover"
              initial="initial"
            >
              <div className="relative overflow-hidden rounded-xl">
                <div className="aspect-square overflow-hidden">
                  <motion.img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale-0 transition-all duration-700"
                    variants={{
                      hover: { scale: 1.1 }
                    }}
                  />
                </div>

                {/* Refined Splash Info Overlay - Bottom Aligned & Non-Obscuring */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center justify-end pb-8 pointer-events-none"
                >
                  <motion.p
                    className="text-white font-pixel text-sm md:text-base mb-1 tracking-widest text-center drop-shadow-[0_0_15px_rgba(128,144,184,1)]"
                  >
                    {person.name}
                  </motion.p>
                  <p className="text-secondary font-mono text-[10px] uppercase tracking-[0.3em] font-bold opacity-100">
                    {person.role}
                  </p>
                </motion.div>

                {/* Scanline pattern overlay (static) */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />
              </div>
            </motion.div>
          ))}
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
