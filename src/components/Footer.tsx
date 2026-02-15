"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp, Code2, Sparkles } from "lucide-react";

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
    const [year, setYear] = useState<number>(2026);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full relative bg-slate-950 text-white pt-24 pb-12 overflow-hidden border-t border-slate-800">
            {/* 1. Deep Gradient Background Layer */}
            <div className="absolute inset-0 bg-linear-to-b from-indigo-950/20 via-slate-950 to-black pointer-events-none" />

            {/* 2. High-Contrast Glowing Orbs */}
            <div className="absolute top-0 right-0 w-120 h-120 bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-purple-600/10 rounded-full blur-[100px] -ml-40 -mb-40" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <Link href="/" className="text-4xl font-black tracking-tighter flex items-center gap-2">
                                KRISH<span className="text-indigo-400">.</span>
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                            </Link>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium">
                                Building the future of open-source. Focused on performance,
                                scalability, and beautiful interfaces.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {[
                                { icon: Github, href: "https://github.com/KriXsh" },
                                { icon: Linkedin, href: "https://linkedin.com/in/krish-me" },
                                { icon: Mail, href: "mailto:krishnendughosal999@gmail.com" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300 shadow-xl"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Column - Bold Contrast */}
                    <div className="md:col-span-5">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-10">Sitemap</h4>
                        <div className="grid grid-cols-2 gap-y-5 gap-x-12">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-400 hover:text-white text-base font-bold transition-all flex items-center gap-3 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Hire Status Card */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-10">Status</h4>
                        <div className="bg-linear-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-500/20 ring-1 ring-white/20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                                    <span className="relative h-3 w-3 rounded-full bg-emerald-400"></span>
                                </div>
                                <span className="text-white font-black text-xs uppercase tracking-widest">Available Now</span>
                            </div>
                            <p className="text-indigo-50 font-medium text-sm leading-relaxed">
                                I am currently looking for new projects and remote roles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-slate-500 text-sm font-bold">
                        <span className="text-slate-400">© {year} Krishnendu Ghosal</span>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900/50 rounded-full border border-slate-800">
                            <Code2 size={14} className="text-indigo-400" />
                            <span className="text-xs tracking-tight">Built with Next.js & Tailwind</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-xl active:scale-95"
                    >
                        Top
                        <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}