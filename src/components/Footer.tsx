"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp, Code2, Terminal, Cpu } from "lucide-react";

const navLinks = [
  { name: "Experience",   href: "#experience"   },
  { name: "Skills",       href: "#skills"        },
  { name: "Projects",     href: "#projects"      },
  { name: "Freelance",    href: "#freelance"     },
  { name: "Education",    href: "#education"     },
  { name: "Achievements", href: "#achievements"  },
  { name: "Support",      href: "#support"       },
  { name: "Contact",      href: "#contact"       },
];

const socials = [
  { icon: Github,   href: "https://github.com/KriXsh",            label: "GitHub"   },
  { icon: Linkedin, href: "https://linkedin.com/in/krish-me",     label: "LinkedIn" },
  { icon: Mail,     href: "mailto:krishnendughosal999@gmail.com",  label: "Email"    },
];

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="w-full bg-[#050505] border-t border-red-900/20 pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Decorative Grid (Matches Hero) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Top Scanner Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white">
              <Terminal size={24} className="text-red-600" />
              KRISH<span className="text-red-600">_</span>
            </Link>
            <p className="font-tech text-xs text-zinc-500 uppercase leading-relaxed max-w-xs tracking-wider">
              Architecting high-availability systems & AI interfaces. 
              Built for performance. Optimized for scale. 
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" aria-label={s.label}
                  className="p-3 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-600/50 hover:bg-red-600/5 transition-all duration-300">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap (The "Nav Matrix") */}
          <div className="md:col-span-5">
            <p className="font-tech text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              Directory Matrix
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}
                  className="font-tech text-[11px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest group flex items-center gap-2">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-red-600 transition-all duration-300" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Operational Status */}
          <div className="md:col-span-3">
            <p className="font-tech text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-8">System Status</p>
            <div className="p-6 border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm relative group overflow-hidden">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-600" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-600" />
              
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-red-600" />
                </div>
                <span className="font-tech text-[10px] font-black uppercase tracking-widest text-white">Liaison Active</span>
              </div>
              <p className="font-tech text-[10px] text-zinc-500 leading-relaxed uppercase">
                Currently processing remote opportunities & collaborative engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-px w-full bg-zinc-900 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="font-tech text-[10px] text-zinc-600 tracking-widest uppercase">
              © {year} KRISHNENDU GHOSAL // PRX-001
            </span>
            <div className="flex items-center gap-2 px-4 py-1.5 border border-zinc-800 bg-black">
              <Cpu size={12} className="text-red-600" />
              <span className="font-tech text-[9px] text-zinc-400 uppercase tracking-tighter">
                Kernel: Next.js + Tailwind + SSR
              </span>
            </div>
          </div>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 font-tech text-[10px] text-zinc-500 hover:text-red-500 uppercase tracking-[0.3em] transition-all"
          >
            Terminal Return
            <div className="p-2 border border-zinc-800 group-hover:border-red-600 transition-colors">
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}