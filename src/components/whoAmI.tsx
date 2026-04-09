"use client";

import { Code2, Rocket, Sparkles, Terminal, TrendingUp, Target, Award } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

const stats = [
  { value: "3+",  label: "Years Experience",  icon: TrendingUp, color: "text-red-600"   },
  { value: "50+", label: "Projects Delivered", icon: Target,     color: "text-red-600" },
  { value: "25+", label: "Technologies",       icon: Code2,      color: "text-red-600"  },
  { value: "5+",  label: "Certifications",     icon: Award,      color: "text-red-600"   },
];

const highlights = [
  {
    title: "Full-Stack Architect",
    desc:  "End-to-end solutions from React frontends to scalable Node.js backends",
    icon:  Code2,
    color: "text-red-600",
    bg:    "bg-red-600/5",
    border:"border-red-600/20",
  },
  {
    title: "AI / ML Engineer",
    desc:  "Intelligent systems with LLMs, RAG architectures, and ML pipelines",
    icon:  Sparkles,
    color: "text-red-600",
    bg:    "bg-red-600/5",
    border:"border-red-600/20",
  },
  {
    title: "Cloud & DevOps",
    desc:  "Deploying on AWS, orchestrating with K8s, automating CI/CD workflows",
    icon:  Rocket,
    color: "text-red-600",
    bg:    "bg-red-600/5",
    border:"border-red-600/20",
  },
  {
    title: "System Designer",
    desc:  "High-throughput, fault-tolerant systems for enterprise scale",
    icon:  Terminal,
    color: "text-red-600",
    bg:    "bg-red-600/5",
    border:"border-red-600/20",
  },
];

export default function WhoAmI() {
  return (
    <section id="whoami" className="py-24 relative solais-noise">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <AnimateOnView animation="fade-up">
            {/* Forced Red Pill */}
            <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Introduction</span>
          </AnimateOnView>
          <AnimateOnView animation="fade-up" delay={80}>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-[#112337] dark:text-white uppercase italic">
              Who Am I<span className="text-red-600">?</span>
            </h2>
          </AnimateOnView>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          
          {/* Story card with Shining Glass Effect */}
          <AnimateOnView animation="fade-right" delay={0}>
            <div className="card solais-glass h-full p-8 !border-red-600/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-red-600/10 border border-red-600/20">
                  <Sparkles className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-black text-[#112337] dark:text-white uppercase">My Journey</h3>
              </div>

              <div className="space-y-4 text-[#585e6a] dark:text-[#94a3b8] leading-relaxed text-sm">
                <p>
                  I&apos;m <span className="text-red-600 font-bold uppercase">Krishnendu Ghosal</span>, a software engineer
                  at <span className="text-red-600 font-bold">Ironbook AI</span>, where
                  I architect AI-powered solutions that process millions of data points daily.
                </p>
                <p>
                  My journey began with curiosity about how systems work. From <span className="text-red-600 font-medium">government tech infrastructure</span> to{" "}
                  <span className="text-red-600 font-medium">fintech platforms</span>, I&apos;ve delivered high-throughput solutions.
                </p>
                <p>
                  What drives me? The thrill of <span className="text-red-600 font-medium">solving complex problems</span> and the impact of creating technology that genuinely improves lives.
                </p>
              </div>

              <div className="mt-7 pt-6 border-t border-red-600/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-600/60 mb-3">Core Values</p>
                <div className="flex flex-wrap gap-2">
                  {["Innovation", "Quality", "Scalability", "User-Centric"].map((v) => (
                    <span key={v} className="stag !text-red-600 !border-red-600/20 !bg-red-600/5">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnView>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <AnimateOnView key={i} animation="scale-up" delay={i * 70}>
                  <div className="card solais-glass p-6 !border-red-600/10 hover:!border-red-600/40 transition-all">
                    <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
                    <p className="text-4xl font-black text-[#112337] dark:text-white mb-1">{s.value}</p>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{s.label}</p>
                  </div>
                </AnimateOnView>
              ))}
            </div>

            {/* Philosophy Card - Fixed Colors */}
            <AnimateOnView animation="fade-up" delay={200}>
              <div className="card p-7 bg-gradient-to-br from-red-600/10 to-transparent !border-red-600/20 relative overflow-hidden">
                <div className="absolute top-3 left-5 text-red-600/5 text-7xl font-black leading-none select-none">&ldquo;</div>
                <p className="relative z-10 text-base text-[#112337] dark:text-white font-medium italic mb-4">
                  Code is poetry, systems are symphonies, and great software is the intersection
                  of engineering excellence and user delight.
                </p>
                <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
                  — SYSTEM PHILOSOPHY
                </p>
              </div>
            </AnimateOnView>
          </div>
        </div>

        {/* Bottom Section */}
        <AnimateOnView animation="fade-up" delay={100}>
          <h3 className="text-xl font-black text-[#112337] dark:text-white mb-5 uppercase tracking-tighter">What I Bring to the Table</h3>
        </AnimateOnView>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <AnimateOnView key={i} animation="fade-up" delay={i * 80}>
              <div className="card solais-glass p-6 h-full !border-red-600/10 group hover:!border-red-600/50">
                <div className={`p-2.5 rounded-xl ${h.bg} border ${h.border} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <h.icon className={`w-5 h-5 ${h.color}`} />
                </div>
                <h4 className="text-xs font-black text-[#112337] dark:text-white mb-2 uppercase tracking-wide">{h.title}</h4>
                <p className="text-[11px] text-[#585e6a] dark:text-[#94a3b8] leading-relaxed">{h.desc}</p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}