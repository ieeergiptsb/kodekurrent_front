import React, { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import RegistrationSuccess from "@/pages/registration-success";
import NotFound from "@/pages/not-found";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import TargetCursor from "@/components/ui/TargetCursor";
import SciFiBackground from "@/components/ui/SciFiBackground";
import RocketSplash from "@/components/ui/RocketSplash";
import HUDOverlay from "@/components/ui/HUDOverlay";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
function Router() {
  const [location] = useLocation();
  return <AnimatePresence mode="wait">
    <motion.div key={location} className="min-h-screen w-full flex flex-col" initial={{
      opacity: 0,
      scale: 0.98
    }} animate={{
      opacity: 1,
      scale: 1
    }} exit={{
      opacity: 0,
      scale: 1.02
    }} transition={{
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1]
    }}>
      <Switch location={location}>
        <Route path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/registration-success" component={RegistrationSuccess} />
        <Route component={NotFound} />
      </Switch>
    </motion.div>
  </AnimatePresence>;
}
function App() {
  const [showSplash, setShowSplash] = useState(true);

  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AnimatePresence mode="wait">
        {showSplash && <RocketSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Global Animated Target Cursor */}
          <TargetCursor targetSelector="a, button, input, select, textarea, img, svg, label, summary, .cursor-pointer, [role='button'], h1, h2, h3, h4, h5, h6, .interactive" />

          {/* Global 'Alive' 3D Sci-Fi Background */}
          <SciFiBackground />

          {/* Spaceship HUD Elements */}
          <HUDOverlay />

          <div className="scanline fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-50"></div>

          <Router />
          <Toaster />
          <SonnerToaster position="top-center" theme="dark" />
        </motion.div>
      )}
    </TooltipProvider>
  </QueryClientProvider>;
}
export default App;