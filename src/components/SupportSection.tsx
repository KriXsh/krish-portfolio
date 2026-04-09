"use client";

import Link from "next/link";
import { Heart, Coffee } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

const projects = [
  { name: "catoff-reclaim-integration", link: "https://github.com/KriXsh/catoff-reclaim-integration-proposal" },
  { name: "bridge-backend",             link: "https://github.com/KriXsh/bridge-backend"                     },
];

export default function SupportSection() {
  return (
    <section id="support" className="py-24 dot-grid relative">
      <div className="text-center mb-16 relative z-10">
        <AnimateOnView animation="fade-up">
          <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Open Source</span>
        </AnimateOnView>
        <AnimateOnView animation="fade-up" delay={80}>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-[#112337] dark:text-white uppercase italic">
            Fuel The <span className="text-red-600">Journey</span>
          </h2>
        </AnimateOnView>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6 relative z-10">
        <AnimateOnView animation="fade-right" delay={0}>
          <div className="card solais-glass p-8 flex flex-col group !border-red-600/20">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/20 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="text-xl font-black text-[#112337] dark:text-white uppercase">GitHub Sponsors</h4>
            </div>
            <p className="text-sm text-[#585e6a] dark:text-[#94a3b8] mb-6 flex-1 font-tech">
              Support my open-source contributions and help me maintain long-term industrial projects.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {projects.map((p) => (
                <Link key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
                  className="stag !text-red-600 !border-red-600/10 !bg-red-600/5 hover:!border-red-600/40">
                  {p.name}
                </Link>
              ))}
            </div>
            <Link href="https://github.com/sponsors/KriXsh" target="_blank" rel="noopener noreferrer"
              className="btn !bg-red-600 !text-white hover:!bg-red-700 !border-none shadow-[0_0_15px_rgba(220,38,38,0.3)] justify-center uppercase tracking-widest text-xs font-black">
              SPONSOR ON GITHUB
            </Link>
          </div>
        </AnimateOnView>

        <AnimateOnView animation="fade-left" delay={80}>
          <div className="card solais-glass p-8 flex flex-col group !border-red-600/20">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/20 group-hover:scale-110 transition-transform">
                <Coffee className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="text-xl font-black text-[#112337] dark:text-white uppercase">Quick Tip</h4>
            </div>
            <p className="text-sm text-[#585e6a] dark:text-[#94a3b8] mb-6 flex-1 font-tech">
              A one-time support via UPI — perfect for saying thanks for a specific repository or system help!
            </p>
            <div className="flex items-center gap-3 p-4 border border-red-600/10 bg-red-600/5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-600 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
              </span>
              <span className="text-[10px] font-tech text-red-600 uppercase tracking-widest font-black">UPI Payments Enabled</span>
            </div>
            <Link href="/support" className="btn !border-red-600/30 !text-red-500 hover:!bg-red-600/10 justify-center uppercase tracking-widest text-xs font-black">
              SUPPORT VIA UPI
            </Link>
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
}