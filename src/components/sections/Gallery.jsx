import { motion } from "framer-motion";
import img3 from "/img_3_1771105052445.png";
import img4 from "/img_4_1771105052445.png";
import img5 from "/img_5_1771105052446.png";
import img6 from "/img_6_1771105052446.png";
import img7 from "/img_7_1771105052447.png";
import img8 from "/img_8_1771105052447.png";

const galleryImages = [img3, img4, img5, img6, img7, img8];

export function Gallery() {
  return <section id="gallery" className="py-20 overflow-hidden">
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-3xl md:text-5xl font-pixel text-center tracking-widest text-white">
        Event <span className="text-secondary">Gallery</span>
      </h2>
    </div>

    <div className="flex flex-col gap-8">
      {/* Row 1: Right to Left */}
      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex gap-6 min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...galleryImages, ...galleryImages].map((src, index) => (
            <div key={`row1-${index}`} className="w-80 md:w-96 group relative overflow-hidden sci-fi-panel p-2 aspect-video hover:border-primary transition-colors cursor-pointer flex-shrink-0 cursor-target">
              <img src={src} alt={`Gallery 1-${index}`} className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
      </div>


      {/* Row 3: Left to Right */}
      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex gap-6 min-w-max"
          initial={{ x: "-50%" }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {[...galleryImages, ...galleryImages].reverse().map((src, index) => (
            <div key={`row3-${index}`} className="w-80 md:w-96 group relative overflow-hidden sci-fi-panel p-2 aspect-video hover:border-primary transition-colors cursor-pointer flex-shrink-0 cursor-target">
              <img src={src} alt={`Gallery 3-${index}`} className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>;
}