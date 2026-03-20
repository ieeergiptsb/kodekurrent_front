import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ieeeLogo from "/img_1_1771105052443.png";
import { RegistrationModal } from "@/pages/RegistrationModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");
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

  const navLinks = [{
    name: "Home",
    href: "#home"
  }, {
    name: "About",
    href: "#about"
  }, {
    name: "Schedule",
    href: "#timeline"
  }, {
    name: "Prizes",
    href: "#prizes"
  }, {
    name: "Sponsors",
    href: "#sponsors"
  }, {
    name: "FAQs",
    href: "#faq"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  return <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] lg:w-[90vw] transition-all duration-300">
    <div className="flex justify-between items-center rounded-full border border-primary/50 bg-[#060608]/80 backdrop-blur-md px-4 md:px-8 py-3 shadow-[0_0_15px_rgba(128,144,184,0.3)]">
      <div className="flex items-center">
        {/* Img 1 Replacement: IEEE Logo */}
        <a href="https://www.ieeergipt.in/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
          <img src={ieeeLogo} alt="IEEE SB RGIPT" className="h-8 md:h-10 w-auto object-contain" />
        </a>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-4 xl:gap-8 mx-auto">
        {navLinks.map(link => <a key={link.name} href={link.href} className="text-base xl:text-lg tracking-widest font-pixel uppercase hover:text-white text-white/80 transition-colors drop-shadow-md">
          {link.name}
        </a>)}
      </div>

      <div className="flex items-center">
        <div className="hidden lg:flex items-center gap-3 relative z-10">
          {!isAuthenticated ? (
            <Link href="/signin">
              <Button variant="outline" className="font-pixel tracking-widest text-sm xl:text-base text-primary border-primary/50 hover:bg-primary/10 rounded-full px-6 h-10 transition-all">
                SIGN IN
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 pl-2 pr-4 py-1.5 rounded-full border border-primary/30 transition-all">
                  <Avatar className="h-8 w-8 border border-primary/50">
                    <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.username || 'kode'}`} />
                    <AvatarFallback className="bg-[#030712] text-primary font-pixel text-xs">{user?.username?.substring(0, 2).toUpperCase() || 'US'}</AvatarFallback>
                  </Avatar>
                  <span className="font-pixel text-base xl:text-lg text-white/90 hidden sm:inline-block max-w-[200px] truncate">{user?.username}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#060608]/95 backdrop-blur-md border-primary/40 text-white font-mono w-48 mt-2">
                <DropdownMenuLabel className="font-pixel text-lg text-primary truncate">{user?.username || 'User'}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/20" />
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/20 focus:bg-primary/20 hover:text-white transition-colors">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.reload(); }} className="cursor-pointer text-destructive hover:bg-destructive/20 focus:bg-destructive/20 focus:text-destructive transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isRegistered ? (
            <Button disabled className="font-pixel tracking-widest text-sm xl:text-base bg-secondary text-[#030712] rounded-full px-6 h-10 shadow-[0_0_15px_rgba(46,213,115,0.4)] cursor-not-allowed opacity-90 transition-all border-none">
              REGISTERED
            </Button>
          ) : (
            <RegistrationModal>
              <Button className="font-pixel tracking-widest text-sm xl:text-base bg-primary hover:bg-primary/80 text-black rounded-full px-6 h-10 border border-white/20 active:translate-y-1 transition-all">
                REGISTER
              </Button>
            </RegistrationModal>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <button className="lg:hidden text-white hover:text-primary transition-colors ml-4" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>

    {/* Mobile Nav Menu */}
    {isOpen && <div className="lg:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-[#060608]/95 backdrop-blur-lg border border-primary/40 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
      {navLinks.map(link => <a key={link.name} href={link.href} className="text-xl tracking-widest font-pixel uppercase text-white/90 hover:text-primary text-center" onClick={() => setIsOpen(false)}>
        {link.name}
      </a>)}
      <div className="flex flex-col gap-4 mt-2">
        {!isAuthenticated ? (
          <Link href="/signin">
            <Button variant="outline" className="font-pixel tracking-widest text-lg w-full text-primary border-primary/50 hover:bg-primary/10 rounded-full h-10 transition-all" onClick={() => setIsOpen(false)}>
              SIGN IN
            </Button>
          </Link>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5">
              <Avatar className="h-10 w-10 border border-primary/50">
                <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.username || 'kode'}`} />
                <AvatarFallback className="bg-[#030712] text-primary font-pixel">{user?.username?.substring(0, 2).toUpperCase() || 'US'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 truncate">
                <span className="font-pixel text-primary text-base truncate">{user?.username}</span>
                <span className="font-mono text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="font-pixel tracking-widest text-xs border-primary/50 hover:bg-primary/10 text-primary">
                <UserIcon className="mr-2 h-3 w-3" /> PROFILE
              </Button>
              <Button variant="outline" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.reload(); }} className="font-pixel tracking-widest text-xs text-destructive border-destructive/50 hover:bg-destructive/10">
                <LogOut className="mr-2 h-3 w-3" /> SIGN OUT
              </Button>
            </div>
          </div>
        )}

        {isRegistered ? (
          <Button disabled className="font-pixel tracking-widest text-lg w-full bg-secondary text-[#030712] rounded-full h-10 shadow-[0_0_15px_rgba(46,213,115,0.4)] cursor-not-allowed opacity-90 transition-all border-none">
            REGISTERED
          </Button>
        ) : (
          <RegistrationModal>
            <Button className="font-pixel tracking-widest text-lg w-full bg-primary hover:bg-primary/80 text-black rounded-full h-10 border border-white/20">
              REGISTER
            </Button>
          </RegistrationModal>
        )}
      </div>
    </div>}
  </nav>;
}