"use client";

import { Rocket, Layers, Cpu, CloudCog, ArrowRight, CheckCircle2, Briefcase, ExternalLink } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

// Unified Solais Red theme for all services
const services = [
  {
    num: "01",
    title: "Full-Stack MVPs",
    desc: "Rapidly turning business ideas into scalable, production-ready 0-to-1 products.",
    icon: Rocket,
    features: ["Next.js / React", "Node.js / Python", "DB Architecture"],
    color: "text-red-600",
    bg: "bg-red-600/5",
    border: "border-red-600/20",
  },
  {
    num: "02",
    title: "AI Integration",
    desc: "Embedding LLMs, RAG, and autonomous agents into your existing business workflows.",
    icon: Cpu,
    features: ["AWS Bedrock", "LangChain", "Vector DBs"],
    color: "text-red-600",
    bg: "bg-red-600/5",
    border: "border-red-600/20",
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    desc: "Optimizing infrastructure for performance, security, and cost efficiency (FinOps).",
    icon: CloudCog,
    features: ["AWS / K8s", "CI/CD Setup", "System Scaling"],
    color: "text-red-600",
    bg: "bg-red-600/5",
    border: "border-red-600/20",
  },
  {
    num: "04",
    title: "System Design",
    desc: "Architecting secure, high-throughput backend systems for B2B and B2G domains.",
    icon: Layers,
    features: ["API Design", "Microservices", "Security Audit"],
    color: "text-red-600",
    bg: "bg-red-600/5",
    border: "border-red-600/20",
  },
];

export default function Freelance() {
  return (
    <section id="freelance" className="py-24 dot-grid relative overflow-hidden">

      <div className="text-center mb-16 relative z-10">
        <AnimateOnView animation="fade-up">
          <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Collaboration</span>
        </AnimateOnView>
        <AnimateOnView animation="fade-up" delay={80}>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-[#112337] dark:text-white uppercase italic">
            Need a Technical Partner<span className="text-red-600">?</span>
          </h2>
        </AnimateOnView>
        <AnimateOnView animation="fade-up" delay={140}>
          <p className="mt-3 text-[#585e6a] dark:text-[#94a3b8] max-w-xl mx-auto text-sm leading-relaxed">
            Part-time development and project-based services for businesses looking to scale with precision.
          </p>
        </AnimateOnView>
        
        <AnimateOnView animation="fade-up" delay={200}>
          <div className="flex items-center justify-center gap-3 mt-6">
            {/* Swapped Emerald for Red System Status */}
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-600/10 text-red-500 text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              Available
            </span>
            <a href="#experience"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[rgba(17,35,55,0.1)] dark:border-white/10 text-[#585e6a] dark:text-[#94a3b8] text-xs font-bold hover:!text-red-600 hover:!border-red-600/30 transition-colors uppercase tracking-wider">
              View Works <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </AnimateOnView>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 max-w-[90rem] mx-auto px-6 relative z-10">
        {services.map((s, i) => (
          <AnimateOnView key={i} animation="fade-up" delay={i * 80}>
            {/* Shining Glass Card with Red Hover Borders */}
            <div className="card solais-glass p-7 h-full flex flex-col group !border-red-600/10 hover:!border-red-600/50 transition-all duration-500">
              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl ${s.bg} border ${s.border} group-hover:scale-110 transition-transform`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                {/* Background Watermark Number */}
                <span className="font-mono text-3xl font-black text-[#112337]/5 dark:text-white/5 group-hover:text-red-600/10 transition-colors select-none">
                  {s.num}
                </span>
              </div>

              <h4 className="text-sm font-black text-[#112337] dark:text-white mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wide">
                {s.title}
              </h4>
              <p className="text-xs text-[#585e6a] dark:text-[#94a3b8] leading-relaxed mb-6 flex-1">{s.desc}</p>

              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#9aa3ad]">
                    <CheckCircle2 className="w-3 h-3 text-red-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnView>
        ))}
      </div>

      {/* Engagement Model Banner */}
      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        <AnimateOnView animation="fade-up" delay={80}>
          <div className="card solais-glass p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 !border-red-600/20 overflow-hidden relative">
            
            {/* Decorative background flare */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

            <div className="text-center lg:text-left relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Engagement Model</p>
              <h4 className="text-2xl font-black text-[#112337] dark:text-white mb-2 uppercase italic">Project-Based or Part-Time</h4>
              <p className="text-[#585e6a] dark:text-[#94a3b8] text-sm max-w-lg leading-relaxed">
                Available for <span className="text-red-600 font-bold">20 hours/week</span> engagements
                with competitive project rates. Looking for long-term engineering support or a quick MVP launch?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
              {/* Overriding standard btn-primary to ensure it is Red */}
              <a href="#contact" className="btn !bg-red-600 !text-white hover:!bg-red-700 !border-none shadow-[0_0_15px_rgba(220,38,38,0.3)] whitespace-nowrap">
                Hire for Project <ArrowRight className="w-4 h-4" />
              </a>
              {/* Overriding standard btn-outline to fit the Red glass theme */}
              <span className="btn !border-red-600/30 !text-red-500 hover:!bg-red-600/10 whitespace-nowrap cursor-default">
                <Briefcase className="w-4 h-4" /> Payroll Ready
              </span>
            </div>
          </div>
        </AnimateOnView>
      </div>

    </section>
  );
}