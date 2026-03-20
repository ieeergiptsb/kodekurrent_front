import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { RegistrationModal } from "@/pages/RegistrationModal";
import Shuffle from "@/components/ui/Shuffle";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      const checkRegistration = async () => {
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
          const res = await fetch(`${baseUrl}/registration/status`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
          });
          const data = await res.json();
          if (res.ok) setIsRegistered(data.isRegistered);
        } catch (e) {
          console.error("Failed to check registration status", e);
        }
      };
      checkRegistration();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    // Target date: April 12, 2026
    const targetDate = new Date("2026-04-12T09:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(distance % (1000 * 60) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px]" />
    </div>

    {/* Bottom gradient fade removed to prevent horizontal black stripes */}

    <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center">
      <motion.div initial={{
        opacity: 0,
        x: -50
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.8
      }} className="text-center">

        {/* Unified Title without effect */}
        <h1 className="text-center leading-normal md:leading-tight mb-8 md:mb-12 text-[#8090B8] w-full px-4 break-words relative z-20 uppercase tracking-wide"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)', fontFamily: 'Impact, "Bebas Neue", "Arial Black", sans-serif' }}>
          KODEKURRENT 2.0
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-mono mb-10 max-w-lg mx-auto">
          Enter the labyrinth of code.
          <br />
          <span className="text-accent mt-2 block">April 12th, 2026</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {isRegistered ? (
            <Button disabled size="lg" className="font-pixel text-xl tracking-widest h-14 bg-secondary text-[#030712] shadow-[0_0_20px_rgba(46,213,115,0.5)] border-2 border-secondary cursor-not-allowed opacity-90 transition-transform">
              REGISTERED
            </Button>
          ) : (
            <RegistrationModal>
              <Button size="lg" className="font-pixel text-xl tracking-widest h-14 bg-primary hover:bg-primary/80 text-black shadow-[0_0_20px_rgba(128,144,184,0.5)] border-2 border-primary hover:scale-105 transition-transform">
                REGISTER
              </Button>
            </RegistrationModal>
          )}
        </div>


      </motion.div>
    </div>
  </header>;
}