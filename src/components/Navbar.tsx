"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About",        href: "#whoami"       },
  { name: "Experience",   href: "#experience"   },
  { name: "Skills",       href: "#skills"        },
  { name: "Projects",     href: "#projects"      },
  { name: "Freelance",    href: "#freelance"     },
  { name: "Education",    href: "#education"     },
  { name: "Achievements", href: "#achievements"  },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[#f2f2f2]/95 dark:bg-[#0b0202]/95 backdrop-blur-xl border-b border-red-900/10 shadow-lg py-3"
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="font-heading text-xl md:text-2xl font-bold tracking-widest text-[#1a0505] dark:text-[#f4e8e8] uppercase flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-800 dark:text-red-600">
            <path d="M4 6h4v12H4zm8 0h4v12h-4zm8 0h4v12h-4z" fill="currentColor" transform="skewX(-20)"/>
          </svg>
          KRISH
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-1 font-tech uppercase text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#1a0505] dark:text-[#f4e8e8]">
          {navLinks.map((l, i) => (
            <div key={l.name} className="flex items-center">
              <a href={l.href} className="px-3 py-2 hover:text-red-700 dark:hover:text-red-500 transition-colors">
                {l.name}
              </a>
              {i < navLinks.length - 1 && <span className="text-red-900/30 dark:text-red-500/30">/</span>}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <button className="lg:hidden p-2 text-[#1a0505] dark:text-[#f4e8e8] transition-colors"
          onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#f2f2f2] dark:bg-[#0b0202] border-b border-red-900/10 shadow-lg p-6 flex flex-col gap-2 font-tech uppercase text-xs tracking-widest font-bold">
          {navLinks.map(l => (
            <a key={l.name} href={l.href} onClick={() => setOpen(false)}
              className="py-3 text-[#1a0505] dark:text-[#f4e8e8] hover:text-red-700 dark:hover:text-red-500 transition-all border-b border-red-900/5">
              // {l.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
