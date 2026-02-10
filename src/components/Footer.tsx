"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp, Code2, Sparkles, ExternalLink } from "lucide-react";

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Freelance", href: "#freelance" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Support", href: "#support" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative bg-linear-to-b from-slate-900 via-slate-950 to-black text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <Link href="/" className="text-4xl font-black tracking-tighter hover:opacity-80 transition-opacity">
                KRISH<span className="text-indigo-500">.</span>
              </Link>
              <div className="h-1 w-12 bg-indigo-500 mt-2 rounded-full" />
            </div>
            
            <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-sm">
              Crafting high-performance applications with a focus on clean code and 
              exceptional user experiences.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/KriXsh" },
                { icon: Linkedin, href: "https://linkedin.com/in/krish-me" },
                { icon: Mail, href: "mailto:your-email@example.com" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300 shadow-2xl"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-5">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400 mb-10">Directory</h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-slate-400 hover:text-indigo-400 text-base font-bold transition-all flex items-center gap-3 group"
                >
                  <span className="w-2 h-[2px] bg-slate-700 group-hover:w-4 group-hover:bg-indigo-500 transition-all" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Status Column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 mb-10">Live Status</h4>
            <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-indigo-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-slate-900 border border-white/10 p-8 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-4">
                    <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-white font-black text-xs uppercase tracking-widest">Available for Hire</span>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Currently seeking innovative projects and full-time opportunities.
                </p>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-slate-500 text-sm font-bold">
            <span className="text-white">© {currentYear} Krishnendu Ghosal</span>
            <span className="hidden md:inline text-slate-800">/</span>
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-indigo-500" />
              <span>Engineered with Next.js</span>
            </div>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-4 px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-xl active:scale-95"
          >
            Back to top
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}