import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Cursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const moveCursor = e => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return <>
      {/* Center Dot */}
      <motion.div className="fixed top-0 left-0 w-2 h-2 bg-pink-500 rounded-full pointer-events-none z-[9999]" animate={{
      x: position.x - 4,
      y: position.y - 4
    }} transition={{
      type: "spring",
      stiffness: 600,
      damping: 30
    }} />

      {/* Rotating Square Ring */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 border border-purple-400 pointer-events-none z-[9998]" animate={{
      x: position.x - 16,
      y: position.y - 16,
      rotate: 360,
      scale: clicked ? 0.8 : 1
    }} transition={{
      rotate: {
        repeat: Infinity,
        duration: 4,
        ease: "linear"
      },
      type: "spring",
      stiffness: 300,
      damping: 20
    }} style={{
      boxShadow: "0 0 20px #a855f7"
    }} />
    </>;
}