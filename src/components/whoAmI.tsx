"use client";

import { useEffect, useState } from "react";
import { Code2, Rocket, Sparkles, Zap, ChevronDown, Terminal, Award, TrendingUp, Target } from "lucide-react";

const stats = [
    { label: "Years Experience", value: "3+", icon: <TrendingUp className="w-5 h-5" />, color: "text-indigo-400" },
    { label: "Projects Delivered", value: "50+", icon: <Target className="w-5 h-5" />, color: "text-emerald-400" },
    { label: "Technologies", value: "25+", icon: <Code2 className="w-5 h-5" />, color: "text-amber-400" },
    { label: "Certifications", value: "5+", icon: <Award className="w-5 h-5" />, color: "text-rose-400" },
];

const highlights = [
    {
        title: "Full-Stack Architect",
        description: "Crafting end-to-end solutions from React frontends to scalable Node.js backends",
        icon: <Code2 className="w-6 h-6" />,
        gradient: "from-blue-500/20 to-indigo-500/20",
        border: "border-blue-500/30"
    },
    {
        title: "AI/ML Engineer",
        description: "Building intelligent systems with LLMs, RAG architectures, and ML pipelines",
        icon: <Sparkles className="w-6 h-6" />,
        gradient: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/30"
    },
    {
        title: "Cloud & DevOps",
        description: "Deploying on AWS, orchestrating with K8s, and automating CI/CD workflows",
        icon: <Rocket className="w-6 h-6" />,
        gradient: "from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/30"
    },
    {
        title: "System Designer",
        description: "Architecting high-throughput, fault-tolerant systems for enterprise scale",
        icon: <Terminal className="w-6 h-6" />,
        gradient: "from-amber-500/20 to-orange-500/20",
        border: "border-amber-500/30"
    }
];

export default function WhoAmI() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative py-24 overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-wider mb-6">
                        <Zap className="w-4 h-4" />
                        Introduction
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                        Who Am I<span className="text-indigo-400">?</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        A passionate engineer who transforms complex problems into elegant solutions,
                        bridging the gap between <span className="text-white font-bold">cutting-edge technology</span> and
                        <span className="text-white font-bold"> real-world impact</span>.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: Story */}
                    <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="relative p-8 rounded-[2.5rem] bg-slate-900/50 backdrop-blur-xl border border-slate-800 overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                                        <Sparkles className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white">My Journey</h3>
                                </div>

                                <div className="space-y-4 text-slate-300 leading-relaxed">
                                    <p>
                                        I'm <span className="text-white font-bold">Krishnendu Ghosal</span>, a software engineer
                                        currently working at <span className="text-indigo-400 font-bold">Ironbook AI</span>, where
                                        I architect AI-powered solutions that process millions of data points daily.
                                    </p>
                                    <p>
                                        My journey began with a curiosity about how systems work, which evolved into a passion for
                                        building them. From <span className="text-emerald-400 font-semibold">government tech infrastructure</span> to
                                        <span className="text-purple-400 font-semibold"> fintech platforms</span>, I've delivered solutions
                                        across diverse domains.
                                    </p>
                                    <p>
                                        What drives me? The thrill of <span className="text-amber-400 font-semibold">solving complex problems</span>,
                                        the satisfaction of <span className="text-rose-400 font-semibold">optimizing performance</span>, and
                                        the impact of creating technology that genuinely improves people's lives.
                                    </p>
                                </div>

                                {/* Key Values */}
                                <div className="mt-8 pt-8 border-t border-slate-800">
                                    <p className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">Core Values</p>
                                    <div className="flex flex-wrap gap-3">
                                        {["Innovation", "Quality", "Scalability", "User-Centric"].map((value) => (
                                            <span
                                                key={value}
                                                className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-sm font-bold text-slate-300 hover:border-indigo-500/50 hover:text-white transition-all cursor-default"
                                            >
                                                {value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Stats */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="relative p-6 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 overflow-hidden group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Gradient background on hover */}
                                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative z-10">
                                        <div className={`mb-3 ${stat.color}`}>
                                            {stat.icon}
                                        </div>
                                        <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                                        <p className="text-sm font-bold text-slate-400">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Philosophy Quote */}
                        <div className="relative p-8 rounded-[2.5rem] bg-linear-to-br from-indigo-950/50 to-purple-950/50 backdrop-blur-xl border border-indigo-500/30 overflow-hidden">
                            <div className="absolute top-4 left-4 text-indigo-500/20 text-6xl font-black">"</div>
                            <div className="absolute bottom-4 right-4 text-indigo-500/20 text-6xl font-black rotate-180">"</div>

                            <div className="relative z-10">
                                <p className="text-lg text-white font-medium leading-relaxed mb-4 italic">
                                    Code is poetry, systems are symphonies, and great software is the intersection
                                    of engineering excellence and user delight.
                                </p>
                                <p className="text-sm font-bold text-indigo-400">— My Engineering Philosophy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expertise Highlights */}
                <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h3 className="text-3xl font-black text-white text-center mb-8">What I Bring to the Table</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((highlight, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setActiveCard(idx)}
                                onMouseLeave={() => setActiveCard(null)}
                                className={`relative p-6 rounded-3xl bg-linear-to-br ${highlight.gradient} backdrop-blur-xl border ${highlight.border} overflow-hidden cursor-pointer transition-all duration-300 ${activeCard === idx ? 'scale-105 shadow-2xl shadow-indigo-500/20' : 'hover:scale-[1.02]'
                                    }`}
                            >
                                {/* Shine effect */}
                                <div className={`absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ${activeCard === idx ? 'translate-x-full' : '-translate-x-full'
                                    }`} />

                                <div className="relative z-10">
                                    <div className="mb-4 text-indigo-400">
                                        {highlight.icon}
                                    </div>
                                    <h4 className="text-lg font-black text-white mb-2">{highlight.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{highlight.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className={`flex justify-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer group">
                        <p className="text-sm font-bold uppercase tracking-wider">Explore More</p>
                        <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-indigo-400" />
                    </div>
                </div>
            </div>
        </section>
    );
}