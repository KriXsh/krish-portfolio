"use client";

import { 
  Rocket, 
  Layers, 
  Cpu, 
  CloudCog, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase 
} from "lucide-react";

const services = [
  {
    title: "Full-Stack MVPs",
    desc: "Rapidly turning business ideas into scalable, production-ready 0-to-1 products.",
    icon: <Rocket className="w-6 h-6" />,
    features: ["Next.js/React", "Node.js/Python", "DB Architecture"]
  },
  {
    title: "AI Integration",
    desc: "Embedding LLMs, RAG, and autonomous agents into your existing business workflows.",
    icon: <Cpu className="w-6 h-6" />,
    features: ["AWS Bedrock", "LangChain", "Vector DBs"]
  },
  {
    title: "Cloud & DevOps",
    desc: "Optimizing infrastructure for performance, security, and cost efficiency (FinOps).",
    icon: <CloudCog className="w-6 h-6" />,
    features: ["AWS/K8s", "CI/CD Setup", "System Scaling"]
  },
  {
    title: "System Design",
    desc: "Architecting secure, high-throughput backend systems for B2B and B2G domains.",
    icon: <Layers className="w-6 h-6" />,
    features: ["API Design", "Microservices", "Security Audit"]
  }
];

export default function Freelance() {
  return (
    <section id="hire" className="py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold text-indigo-700 uppercase tracking-[0.3em] mb-4">
            Collaboration 🤝
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Need a Technical <span className="text-indigo-700 italic">Partner?</span>
          </h3>
          <p className="mt-4 text-slate-500 font-medium text-lg">
            I offer part-time development and project-based services for businesses looking to scale with precision.
          </p>
        </div>
        
        <div className="hidden lg:block pb-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-widest animate-pulse">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Available for Projects
            </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {services.map((service, idx) => (
          <div 
            key={idx} 
            className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-indigo-700/30 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-700 mb-6 group-hover:bg-indigo-700 group-hover:text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
                {service.title}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
                {service.desc}
              </p>
            </div>

            <ul className="space-y-2">
              {service.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* The "Hire Me" CTA Card */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-800 shadow-2xl">
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform group-hover:scale-110" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left space-y-4">
            <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Project-Based or Part-Time Payroll 💼
            </h4>
            <p className="text-slate-400 max-w-xl font-medium">
              Looking for long-term engineering support or a quick MVP launch? I am available for <span className="text-indigo-400">20 hours/week</span> engagements with competitive project rates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <a 
              href="#contact"
              className="w-full sm:w-auto px-10 py-5 bg-indigo-700 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-700/20 flex items-center justify-center gap-3 group"
            >
              HIRE FOR PROJECT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-3 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                Payroll Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}