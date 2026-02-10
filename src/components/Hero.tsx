"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Send, ShieldCheck, PieChart, Zap, Users, Sparkles, Calendar, ArrowRight, Award, Coffee } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";

const expertise = [
    {
        label: "B2G / Gov-Tech",
        icon: <ShieldCheck className="w-5 h-5" />,
        desc: "High-Security Infrastructure",
        color: "from-blue-50/80 to-transparent",
        border: "border-blue-200/50",
        hoverBorder: "hover:border-blue-500/70",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    {
        label: "FinOps / Fintech",
        icon: <PieChart className="w-5 h-5" />,
        desc: "Cost & Yield Optimization",
        color: "from-emerald-50/80 to-transparent",
        border: "border-emerald-200/50",
        hoverBorder: "hover:border-emerald-500/70",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600"
    },
    {
        label: "B2B Enterprise",
        icon: <Zap className="w-5 h-5" />,
        desc: "SaaS & Scalability",
        color: "from-amber-50/80 to-transparent",
        border: "border-amber-200/50",
        hoverBorder: "hover:border-amber-500/70",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600"
    },
    {
        label: "B2C Digital",
        icon: <Users className="w-5 h-5" />,
        desc: "Consumer Experience",
        color: "from-rose-50/80 to-transparent",
        border: "border-rose-200/50",
        hoverBorder: "hover:border-rose-500/70",
        iconBg: "bg-rose-50",
        iconColor: "text-rose-600"
    }
];

export default function Hero() {
    const [init, setInit] = useState(false);
    const [currentImg, setCurrentImg] = useState(0);
    const [tenure, setTenure] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const images = ["/krish.jpeg", "/krish1.jpg"];

    useEffect(() => {
        initParticlesEngine(async (engine) => {
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

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-indigo-50/30 pt-20">
            {/* Particles Background */}
            {init && (
                <Particles
                    id="tsparticles"
                    className="absolute inset-0 z-0"
                    options={{
                        fpsLimit: 60,
                        particles: {
                            color: { value: "#3730a3" },
                            links: {
                                color: "#3730a3",
                                distance: 150,
                                enable: true,
                                opacity: 0.08,
                                width: 1
                            },
                            move: { enable: true, speed: 0.5 },
                            number: { density: { enable: true }, value: 100 },
                            opacity: { value: 0.25 },
                            size: { value: 2 }
                        },
                    }}
                />
            )}

            {/* Decorative Gradient Orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Side: Professional Narrative */}
                    <div className={`lg:col-span-7 space-y-6 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                        {/* Role Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-indigo-200/60 text-indigo-700 text-[9px] font-extrabold uppercase tracking-[0.15em] shadow-lg shadow-indigo-100/50 backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            Full-Stack • AI-ML & MLOps • Cloud & DevOps • System Design
                        </div>

                        {/* Experience Badge */}
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-linear-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold uppercase tracking-wide shadow-xl shadow-indigo-300/40">
                            <Calendar className="w-4 h-4" />
                            {tenure} Active Engineering
                        </div>

                        {/* Name Headline */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter">
                            KRISHNENDU <br />
                            <span className="bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                GHOSAL
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                            Specialized engineer crafting <span className="text-slate-900 font-bold relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-200 after:-z-10">high-performance systems</span> with expertise in <span className="text-slate-900 font-bold">Full-Stack Development</span>, <span className="text-slate-900 font-bold">AI-ML & MLOps</span>, <span className="text-slate-900 font-bold">Cloud Infrastructure</span>, and <span className="text-slate-900 font-bold">Scalable System Design</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <a
                                href="#contact"
                                className="group px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105"
                            >
                                Contact Me
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* Buy Me a Coffee Button */}
                            <Link
                                href="/support"
                                className="group px-8 py-4 bg-linear-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-600/40 hover:scale-105"
                            >
                                Buy me a Coffee
                                <Coffee className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            </Link>

                            <div className="flex gap-3 justify-center lg:justify-start">
                                <a
                                    href="https://github.com/KriXsh"
                                    target="_blank"
                                    className="p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-500 hover:border-slate-900 hover:text-slate-900 hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/krish-me"
                                    target="_blank"
                                    className="p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-500 hover:border-indigo-600 hover:text-indigo-600 hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Profile Image */}
                    <div className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="relative w-72 h-80 md:w-96 md:h-112">
                            {/* Animated Background Ring - Simplified */}
                            <div className="absolute inset-0 rounded-[3rem] bg-linear-to-br from-indigo-400/15 to-blue-400/15 -rotate-6 scale-105 animate-pulse" />
                            <div className="absolute inset-0 border-2 border-indigo-200/30 rounded-[3rem] -rotate-3 scale-105" />

                            {/* Main Image Container */}
                            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-slate-900/10 bg-linear-to-br from-slate-50 to-white">
                                {images.map((img, idx) => (
                                    <img
                                        key={img}
                                        src={img}
                                        alt={`Krishnendu Ghosal ${idx + 1}`}
                                        className={`absolute inset-0 object-cover w-full h-full transition-all duration-1000 ease-in-out ${currentImg === idx
                                                ? "opacity-100 translate-y-0 scale-100"
                                                : "opacity-0 translate-y-8 scale-105"
                                            }`}
                                    />
                                ))}

                                {/* Subtle Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/5 via-transparent to-transparent" />

                                {/* Image Indicators */}
                                <div className="absolute bottom-6 right-6 flex gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                                    {images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${currentImg === idx
                                                    ? "w-8 bg-indigo-600"
                                                    : "w-1.5 bg-slate-300"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-indigo-600" />
                                    <span className="text-xs font-bold text-slate-900">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expertise Cards - Simplified Gradients */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {expertise.map((item, idx) => (
                        <div
                            key={idx}
                            className={`group relative p-6 rounded-3xl border ${item.border} ${item.hoverBorder} bg-linear-to-br ${item.color} backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 cursor-pointer overflow-hidden`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Subtle Hover Glow */}
                            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} shadow-sm flex items-center justify-center mb-4 ${item.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    {item.icon}
                                </div>

                                {/* Label */}
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1.5 flex items-center gap-2">
                                    {item.label}
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </h4>

                                {/* Description */}
                                <p className="text-xs text-slate-500 font-semibold leading-tight">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}