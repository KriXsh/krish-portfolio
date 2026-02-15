"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Send, ShieldCheck, PieChart, Zap, Users, Sparkles, Calendar, ArrowRight, Award, Coffee, ExternalLink, Heart, Star, Code } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import Link from "next/link";

const expertise = [
    {
        id: "gov-tech",
        label: "B2G / Gov-Tech",
        icon: <ShieldCheck className="w-5 h-5" />,
        desc: "High-Security Infrastructure",
        gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
        border: "border-blue-500/30",
        hoverBorder: "hover:border-blue-400/70",
        iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
        iconColor: "text-blue-400",
        glowColor: "shadow-blue-500/20 hover:shadow-blue-500/40",
        href: "#experience"
    },
    {
        id: "fintech",
        label: "FinOps / Fintech",
        icon: <PieChart className="w-5 h-5" />,
        desc: "Cost & Yield Optimization",
        gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
        border: "border-emerald-500/30",
        hoverBorder: "hover:border-emerald-400/70",
        iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-600/10",
        iconColor: "text-emerald-400",
        glowColor: "shadow-emerald-500/20 hover:shadow-emerald-500/40",
        href: "#experience"
    },
    {
        id: "b2b",
        label: "B2B Enterprise",
        icon: <Zap className="w-5 h-5" />,
        desc: "SaaS & Scalability",
        gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
        border: "border-amber-500/30",
        hoverBorder: "hover:border-amber-400/70",
        iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-600/10",
        iconColor: "text-amber-400",
        glowColor: "shadow-amber-500/20 hover:shadow-amber-500/40",
        href: "#experience"
    },
    {
        id: "b2c",
        label: "B2C Digital",
        icon: <Users className="w-5 h-5" />,
        desc: "Consumer Experience",
        gradient: "from-rose-500/20 via-rose-500/10 to-transparent",
        border: "border-rose-500/30",
        hoverBorder: "hover:border-rose-400/70",
        iconBg: "bg-gradient-to-br from-rose-500/20 to-rose-600/10",
        iconColor: "text-rose-400",
        glowColor: "shadow-rose-500/20 hover:shadow-rose-500/40",
        href: "#experience"
    }
];

export default function Hero() {
    const [init, setInit] = useState(false);
    const [currentImg, setCurrentImg] = useState(0);
    const [tenure, setTenure] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const images = ["/krish.jpeg", "/krish.jpeg"];

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));

        // Entrance animation
        setTimeout(() => setIsVisible(true), 100);

        const timer = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % images.length);
        }, 4000);

        // Experience Calculation Logic
        const calculateExperience = () => {
            const startDate = new Date("2023-01-01");
            const today = new Date();
            let years = today.getFullYear() - startDate.getFullYear();
            let months = today.getMonth() - startDate.getMonth();
            if (months < 0) {
                years--;
                months += 12;
            }
            setTenure(`${years}y ${months}m+`);
        };
        calculateExperience();

        return () => clearInterval(timer);
    }, []);

    const particlesOptions: ISourceOptions = {
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: {
                    enable: true
                }
            },
            modes: {
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4"]
            },
            links: {
                color: "#6366f1",
                distance: 150,
                enable: true,
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "bounce"
                }
            },
            number: {
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080
                },
                value: 80
            },
            opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 3 }
            }
        },
        detectRetina: true
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20 pb-24">
            {/* Interactive Particles Background */}
            {init && (
                <Particles
                    id="tsparticles"
                    className="absolute inset-0 z-0"
                    options={particlesOptions}
                />
            )}

            {/* Layered Gradient Background - Extended and Smoothed */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-br from-indigo-950/20 via-transparent to-slate-950 pointer-events-none" />

            {/* Animated Glowing Orbs - Repositioned for better coverage */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-pink-600/8 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Side: Professional Narrative */}
                    <div className={`lg:col-span-7 space-y-6 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                        {/* Role Badge - Enhanced with Better Gradient */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 text-indigo-400 text-[9px] font-extrabold uppercase tracking-[0.15em] shadow-lg shadow-indigo-500/20 ring-1 ring-white/5">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            Full-Stack • AI-ML & MLOps • Cloud & DevOps • System Design
                        </div>

                        {/* Experience Badge - Matching Footer Gradient Style */}
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wide shadow-xl shadow-indigo-500/40 ring-1 ring-white/20">
                            <Calendar className="w-4 h-4" />
                            {tenure} Active Engineering
                        </div>

                        {/* Name Headline - Enhanced Text Effects */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                            KRISHNENDU <br />
                            <span className="relative inline-block">
                                <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                                    GHOSAL
                                </span>
                                {/* Glow effect under text */}
                                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 blur-xl" />
                            </span>
                        </h1>

                        {/* Description - Enhanced Typography */}
                        <p className="text-base md:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                            Specialized engineer crafting <span className="relative inline-block text-white font-bold">
                                high-performance systems
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500/50 to-purple-500/50 blur-sm" />
                            </span> with expertise in <span className="text-indigo-400 font-bold">Full-Stack Development</span>, <span className="text-purple-400 font-bold">AI-ML & MLOps</span>, <span className="text-pink-400 font-bold">Cloud Infrastructure</span>, and <span className="text-cyan-400 font-bold">Scalable System Design</span>.
                        </p>

                        {/* CTA Buttons - Enhanced with Better Shadows and Hover Effects */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <a
                                href="#contact"
                                className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
                            >
                                {/* Animated gradient overlay on hover */}
                                <span className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 group-hover:text-white transition-colors">Contact Me</span>
                                <Send className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </a>

                            {/* Buy Me a Coffee Button - Enhanced Gradient */}
                            <Link
                                href="/support"
                                className="group relative px-8 py-4 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-purple-600/50 hover:scale-105 ring-1 ring-white/20"
                            >
                                {/* Animated shine effect */}
                                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="relative z-10">Buy me a Coffee</span>
                                <Coffee className="relative z-10 w-4 h-4 group-hover:rotate-12 transition-transform" />
                            </Link>

                            {/* Social Icons - Fixed color mismatch */}
                            <div className="flex gap-3 justify-center lg:justify-start">
                                <a
                                    href="https://github.com/KriXsh"
                                    target="_blank"
                                    className="group p-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl text-slate-400 hover:border-slate-700 hover:text-white hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-slate-800/50 hover:scale-110"
                                >
                                    <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/krish-me"
                                    target="_blank"
                                    className="group p-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl text-slate-400 hover:border-indigo-600 hover:text-indigo-400 hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-110"
                                >
                                    <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Profile Image - Enhanced with Better Effects */}
                    <div className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="relative w-72 h-80 md:w-96 md:h-112">
                            {/* Multi-layered Animated Background Rings */}
                            <div className="absolute inset-0 rounded-[3rem] bg-linear-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 -rotate-6 scale-105 animate-pulse" />
                            <div className="absolute inset-0 border-2 border-indigo-500/40 rounded-[3rem] -rotate-3 scale-105 shadow-lg shadow-indigo-500/30" />
                            <div className="absolute inset-0 border border-purple-500/30 rounded-[3rem] rotate-3 scale-105" />

                            {/* Main Image Container - Enhanced with Better Border */}
                            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-8 border-slate-900 shadow-2xl shadow-indigo-500/30 bg-linear-to-br from-slate-800 to-slate-900 ring-1 ring-white/10">
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Krishnendu Ghosal ${idx + 1}`}
                                        className={`absolute inset-0 object-cover w-full h-full transition-all duration-1000 ease-in-out ${currentImg === idx
                                            ? "opacity-100 translate-y-0 scale-100"
                                            : "opacity-0 translate-y-8 scale-105"
                                            }`}
                                    />
                                ))}

                                {/* Enhanced Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-r from-slate-900/40 via-transparent to-transparent" />

                                {/* Image Indicators - Enhanced Design */}
                                <div className="absolute bottom-6 right-6 flex gap-2 bg-slate-950/95 backdrop-blur-xl px-3 py-2 rounded-full shadow-lg border border-slate-800 ring-1 ring-white/5">
                                    {images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${currentImg === idx
                                                ? "w-8 bg-linear-to-r from-indigo-500 to-purple-500"
                                                : "w-1.5 bg-slate-700"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Floating Badge - Enhanced with Gradient */}
                                <div className="absolute top-6 left-6 bg-linear-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-xl px-4 py-2 rounded-xl shadow-xl border border-slate-800 ring-1 ring-white/5 flex items-center gap-2">
                                    <div className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-300 opacity-75" />
                                        <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                                    </div>
                                    <span className="text-xs font-bold text-white">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expertise Cards - Enhanced with matching background */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {expertise.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className={`group relative p-6 rounded-3xl border ${item.border} ${item.hoverBorder} bg-linear-to-br ${item.gradient} backdrop-blur-xl transition-all duration-300 hover:shadow-2xl ${item.glowColor} hover:-translate-y-2 cursor-pointer overflow-hidden ring-1 ring-white/5 block`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Animated gradient overlay on hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            <div className="relative z-10">
                                {/* Icon - Enhanced with Better Gradient Background */}
                                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} shadow-lg flex items-center justify-center mb-4 ${item.iconColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-current/20 backdrop-blur-sm`}>
                                    {item.icon}
                                </div>

                                {/* Label with External Link Icon */}
                                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1.5 flex items-center justify-between gap-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text transition-all">
                                    <span>{item.label}</span>
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </h4>

                                {/* Description */}
                                <p className="text-xs text-slate-400 font-semibold leading-tight group-hover:text-slate-300 transition-colors">
                                    {item.desc}
                                </p>

                                {/* Click indicator */}
                                <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-slate-500 group-hover:text-white transition-colors">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">View Experience</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Open Source CTA Button - Fixed background extension */}
                <div className={`mt-16 flex justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <a
                        href="https://github.com/sponsors/KriXsh/dashboard/profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full max-w-4xl px-10 py-6 bg-slate-900/90 backdrop-blur-xl border-2 border-pink-500/30 rounded-4xl overflow-hidden transition-all duration-500 hover:border-pink-500/60 hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-[1.02]"
                    >
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-linear-to-r from-pink-600/0 via-pink-600/10 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Floating particles effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                            <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
                        </div>

                        {/* Shine sweep effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                {/* Animated icon container */}
                                <div className="relative shrink-0">
                                    <div className="p-4 bg-linear-to-br from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30 group-hover:border-pink-500/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <Heart className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors" />
                                    </div>
                                    {/* Pulsing glow */}
                                    <div className="absolute inset-0 bg-pink-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                                </div>

                                {/* Text content */}
                                <div className="text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Code className="w-4 h-4 text-indigo-400" />
                                        <span className="text-xs font-black uppercase tracking-wider text-indigo-400">Open Source</span>
                                        <Star className="w-3 h-3 text-amber-400 animate-pulse" />
                                    </div>
                                    <h3 className="text-xl font-black text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-pink-300 group-hover:via-purple-300 group-hover:to-indigo-300 group-hover:bg-clip-text transition-all mb-1">
                                        Explore My Open Source Projects
                                    </h3>
                                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors font-medium">
                                        View my GitHub sponsors dashboard & contributions
                                    </p>
                                </div>
                            </div>

                            {/* Arrow indicator */}
                            <div className="shrink-0">
                                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 group-hover:border-pink-500/50 transition-all group-hover:bg-pink-500/10">
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* Bottom decorative line */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </a>
                </div>
            </div>

            {/* Bottom fade to ensure smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent pointer-events-none z-20" />
        </section>
    );
}