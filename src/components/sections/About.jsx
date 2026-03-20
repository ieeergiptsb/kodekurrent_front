import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-20 relative px-4 text-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center sci-fi-panel p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative Corner accents for spaceship console feel */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 m-4 rounded-tl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 m-4 rounded-br-lg"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-pixel mb-8 text-white">
              About <span className="text-primary">IEEE SB RGIPT</span>
            </h2>

            <div className="space-y-6 text-muted-foreground font-mono text-lg leading-relaxed text-justify">
              <p>
                IEEE Student Branch RGIPT is a dynamic community of passionate engineers, innovators, and researchers dedicated to advancing technology for humanity. Affiliated with IEEE, the world’s largest technical professional organization, our student branch aims to foster technical excellence, research culture, and professional development among students of Rajiv Gandhi Institute of Petroleum Technology.
              </p>
              <p>
                We organize workshops, seminars, hackathons, technical competitions, and industry interactions to enhance practical knowledge and bridge the gap between academics and real-world applications. Our mission is to empower students with technical skills, leadership qualities, and global exposure through active participation in IEEE initiatives.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="terminal-panel text-center cursor-default"
              >
                <h3 className="text-4xl md:text-5xl font-pixel text-white mb-1">300+</h3>
                <p className="text-sm font-mono text-primary opacity-80 uppercase tracking-widest">Members</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="terminal-panel text-center cursor-default border-secondary/50 text-secondary shadow-[inset_0_0_15px_rgba(148,163,184,0.3)]"
              >
                <h3 className="text-4xl md:text-5xl font-pixel text-white mb-1">75+</h3>
                <p className="text-sm font-mono text-secondary opacity-80 uppercase tracking-widest">Events</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
