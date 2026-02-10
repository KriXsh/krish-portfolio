"use client";

import Link from "next/link";

export default function SupportSection() {
  const projects = [
    { name: "catoff-reclaim-integration", link: "https://github.com/KriXsh/catoff-reclaim-integration-proposal" },
    { name: "bridge-backend", link: "https://github.com/KriXsh/bridge-backend" },
  ];

  return (
    <section id="support" className="py-20 px-4">
      <div className="max-w-6xl mx-auto bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-[3.5rem] p-8 md:p-16 border border-white/5 relative overflow-hidden group">
        
        {/* Advanced Background Effects */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-600/10 rounded-full blur-[100px] -ml-48 -mb-48" style={{ animation: 'pulse 8s infinite' }} />

        <div className="relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Fuel the <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Open Source</span> Journey
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              My work on projects like <span className="text-indigo-300 font-mono italic">bridge-backend</span> is fueled by the community. 
              Whether it's a star or a coffee, every bit counts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* GitHub Sponsors Card */}
            <div className="flex flex-col p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500 group/card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/30 group-hover/card:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <h4 className="text-2xl font-bold text-white">GitHub Sponsors</h4>
              </div>
              
              <p className="text-slate-400 mb-8 grow">
                Support my open-source contributions and help me maintain long-term projects.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {projects.map((project) => (
                  <Link 
                    key={project.name} 
                    href={project.link}
                    className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors"
                  >
                    {project.name}
                  </Link>
                ))}
              </div>

              <Link
                href="https://github.com/sponsors/KriXsh"
                target="_blank"
                className="w-full py-4 px-6 rounded-2xl bg-white text-slate-950 font-black text-center hover:bg-pink-500 hover:text-white transition-all duration-300 transform active:scale-95"
              >
                SPONSOR ON GITHUB
              </Link>
            </div>

            {/* One-time Support Card */}
            <div className="flex flex-col p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-md hover:border-indigo-500/40 transition-all duration-500 group/card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 group-hover/card:scale-110 transition-transform">
                  <span className="text-2xl">☕</span>
                </div>
                <h4 className="text-2xl font-bold text-white">Quick Tip</h4>
              </div>

              <p className="text-slate-400 mb-8 grow">
                A quick one-time support via UPI. Perfect for saying thanks for a specific repo or help!
              </p>

              <div className="bg-slate-950/50 rounded-2xl p-4 mb-8 border border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    <span className="text-xs font-mono text-slate-300 tracking-widest uppercase">UPI Payments Enabled</span>
                </div>
              </div>

              <Link
                href="/support"
                className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-indigo-600 to-blue-600 text-white font-black text-center shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all transform active:scale-95"
              >
                SUPPORT VIA UPI
              </Link>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}