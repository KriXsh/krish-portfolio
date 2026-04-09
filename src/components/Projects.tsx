"use client";

import { ExternalLink, Github, Globe, ArrowRight, Code2 } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

const projects = [
  {
    title: "Pathfinding Visualizer",
    date: "Jun 2022 – Dec 2022",
    description: "A dynamic visualization tool demonstrating Dijkstra's Algorithm. Features an interactive grid where users set start/end points and draw walls to see real-time shortest-path calculations.",
    tech: ["React.js", "Algorithms", "CSS3"],
    link: "https://pathfinding-visualizer-chi-lyart.vercel.app/",
    type: "Live Demo",
  },
  {
    title: "Stock X AI",
    date: "Jan 2026 – Feb 2026",
    description: "An SSR-powered financial visualization tool that applies graph algorithms to stock market data. Features an interactive Next.js interface for real-time pathfinding and trend analysis with instantaneous server-side data fetching.",
    tech: ["Next.js", "SSR", "Algorithms", "Tailwind CSS"],
    link: "https://stock-x-ai.vercel.app/",
    type: "Live Demo",
  },
  {
    title: "Car Rental System",
    date: "Aug 2024",
    description: "A robust Java-based application to manage car inventories, customer records, and rental transactions. Handles booking, availability checks, and returns.",
    tech: ["Java", "OOPs", "Inventory Management"],
    link: "https://github.com/KriXsh/Car-rental-system-Java",
    type: "GitHub",
  },
  {
    title: "Sort-Fusion",
    date: "Jul 2024",
    description: "An interactive UI to explore and visualize various sorting data structures. Users witness how different algorithms manipulate arrays in real-time.",
    tech: ["React.js", "Data Structures", "TailwindCSS"],
    link: "https://sort-fusion-ui-git-krish-krishs-projects-02e2b9ea.vercel.app/",
    type: "Live Demo",
  },
  {
    title: "Weather-App",
    date: "Jun 2022 – Jul 2022",
    description: "A full-stack weather forecasting tool providing real-time updates on temperature, precipitation, and wind speed. Features hourly and weekly forecasts via API integration.",
    tech: ["Node.js", "Express.js", "React.js", "HBS", "CSS"],
    link: "https://weather-app-krish.onrender.com/",
    type: "Live Demo",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 dot-grid relative overflow-hidden">

      <div className="text-center mb-16 relative z-10">
        <AnimateOnView animation="fade-up">
          {/* Forced Red Pill */}
          <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Projects</span>
        </AnimateOnView>
        <AnimateOnView animation="fade-up" delay={80}>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-[#112337] dark:text-white uppercase italic">
            Featured <span className="text-red-600">Work</span>
          </h2>
        </AnimateOnView>
        <AnimateOnView animation="fade-up" delay={140}>
          <p className="mt-3 text-[#585e6a] dark:text-[#94a3b8] max-w-xl mx-auto text-sm leading-relaxed">
            A selection of side projects and experiments that showcase my engineering approach.
          </p>
        </AnimateOnView>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 max-w-[90rem] mx-auto px-6 relative z-10">
        {projects.map((p, i) => (
          <AnimateOnView key={i} animation="fade-up" delay={i * 80}>
            {/* Shining Glass Card */}
            <div className="card solais-glass p-7 h-full flex flex-col group !border-red-600/10 hover:!border-red-600/50 transition-all duration-500 relative">

              <div className="flex justify-between items-start mb-5">
                <div className="p-2.5 rounded-xl bg-red-600/5 border border-red-600/20 text-red-600 group-hover:bg-red-600/10 group-hover:scale-110 transition-all">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-tech font-black text-red-600/60 bg-red-600/5 border border-red-600/10 px-3 py-1 rounded-none uppercase tracking-widest">
                  DATA_LOG // {p.date}
                </span>
              </div>

              <h3 className="text-lg font-black text-[#112337] dark:text-white mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wider">
                {p.title}
              </h3>
              <p className="text-sm text-[#585e6a] dark:text-[#94a3b8] leading-relaxed mb-5 flex-1">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.tech.map((t) => (
                  <span key={t} className="stag !text-red-600 !border-red-600/10 !bg-red-600/5 hover:!border-red-600/40">
                    {t}
                  </span>
                ))}
              </div>

              {/* FIX: relative, z-20, and block added to ensure it traps clicks properly */}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-flex items-center gap-2 text-xs font-bold text-red-600/60 hover:text-red-500 transition-colors group/link cursor-pointer w-fit"
              >
                {p.type === "GitHub" ? <Github className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                <span className="uppercase tracking-widest">{p.type}</span>
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </AnimateOnView>
        ))}
      </div>

      {/* GitHub CTA Section */}
      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        <AnimateOnView animation="fade-up" delay={100}>
          <div className="card solais-glass relative rounded-none overflow-hidden !border-red-600/20 bg-gradient-to-br from-red-600/5 to-transparent">
            {/* Decorative background grid inside CTA */}
            <div className="absolute inset-0 bg-solais-grid opacity-50 pointer-events-none" />

            <div className="relative z-10 px-10 py-16 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-[#112337] dark:text-white mb-4 tracking-tighter uppercase italic">
                Hungry for more project stories<span className="text-red-600">?</span>
              </h3>
              <p className="text-[#585e6a] dark:text-[#94a3b8] mb-8 max-w-lg mx-auto text-sm leading-relaxed">
                I&apos;m constantly building, experimenting, and breaking things.
                Check out my public repos for the full evolution of my code.
              </p>

              {/* Forced Red CTA Button */}
              <a
                href="https://github.com/KriXsh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn relative z-20 !bg-red-600 !text-white hover:!bg-red-700 !border-none shadow-[0_0_15px_rgba(220,38,38,0.3)] inline-flex items-center justify-center cursor-pointer uppercase tracking-widest text-xs"
              >
                <Github className="w-4 h-4" />
                Explore Repos
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
}