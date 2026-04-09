"use client";

import { useEffect, useState, useRef } from "react";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Smooth cyclic animation
    const int = setInterval(() => {
      setStep(s => (s + 1) % 3);
    }, 6000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(int);
    };
  }, []);

  const pX = mousePos.x * 20;
  const pY = mousePos.y * 20;

  return (
    <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center pt-20">
      
      {/* Floating coordinates / Tech UI */}
      <div className="absolute top-[25%] left-[10%] font-tech text-[10px] text-red-900/60 dark:text-red-400/60 tracking-widest hidden md:block"
        style={{ transform: `translate(${pX * 0.5}px, ${pY * 0.5}px)` }}>
        // SYSTEM CORE<br/>
        NODE: KRISH_01<br/>
        [{ (mousePos.x * 100).toFixed(2) }, { (mousePos.y * 100).toFixed(2) }, 0.99]
      </div>

      <div className="absolute bottom-[25%] right-[10%] font-tech text-[10px] text-red-900/60 dark:text-red-400/60 tracking-widest hidden md:block"
        style={{ transform: `translate(${pX * -0.5}px, ${pY * -0.5}px)` }}>
        // KNOWLEDGE_BASE<br/>
        [AI, CLOUD, SYSTEM_DESIGN]<br/>
        LATENCY: {(Math.abs(mousePos.x) * 10).toFixed(1)}ms
      </div>

      {/* Center Main Stage */}
      <div className="relative z-20 flex flex-col items-center w-full px-6 max-w-5xl mx-auto">
        
        {/* Step 0: Engineer Excellence */}
        <div className={`transition-all duration-1000 ease-in-out absolute top-10 flex flex-col items-center text-center ${step === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
          <span className="font-tech text-xs bg-red-900/5 text-red-800 dark:text-red-400 px-3 py-1 border border-red-900/10 mb-6">
            <span className="opacity-50">01</span> ENGINEER
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-[#1a0505] dark:text-white uppercase leading-[0.9]">
            Build Systems
            <br />
            <span className="text-red-800 dark:text-red-600">— That Scale</span>
          </h1>
        </div>

        {/* Step 1: Your Advantage */}
        <div className={`transition-all duration-1000 ease-in-out absolute top-10 flex flex-col items-center text-center ${step === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
          <span className="font-tech text-xs bg-red-900/5 text-red-800 dark:text-red-400 px-3 py-1 border border-red-900/10 mb-6 uppercase">
            Your Advantage
          </span>
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tight text-[#1a0505] dark:text-white uppercase leading-[0.9]">
            Full-Stack
            <br />
            <span className="text-red-800 dark:text-red-600">— Mastery</span>
          </h1>
        </div>
        
        {/* Step 2: The Data */}
        <div className={`transition-all duration-1000 ease-in-out absolute top-10 flex flex-col items-center text-center ${step === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
          <span className="font-tech text-xs bg-red-900/5 text-red-800 dark:text-red-400 px-3 py-1 border border-red-900/10 mb-6 uppercase">
            Performance
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-[#1a0505] dark:text-white uppercase leading-[0.9]">
            Actionable
            <br />
            <span className="text-red-800 dark:text-red-600">— Architectures</span>
          </h1>
        </div>

        {/* Unique Floating Image Node */}
        <div className="relative mt-64 mb-24 w-72 h-72 flex items-center justify-center transition-transform duration-1000"
             style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(${step === 1 ? 1.05 : 1})` }}>
          
          {/* Orbital Rings */}
          <div className="absolute inset-0 border-[1px] border-red-900/20 rounded-full animate-spin-slow">
             <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-4 left-10 w-1 h-3 bg-red-400/50 rounded-full rotate-45"></div>
          </div>
          <div className="absolute -inset-8 border-[1px] border-black/5 dark:border-white/5 rounded-full" style={{ animation: 'spin-slow 20s linear infinite reverse' }}>
             <div className="absolute bottom-0 left-1/2 font-tech text-[8px] text-red-800/40 tracking-widest -translate-x-1/2 translate-y-2 rotate-180">SCANNING...</div>
          </div>
          <div className="absolute -inset-16 border-[1px] border-red-900/10 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}>
             <div className="absolute top-1/2 -left-1.5 w-3 h-1 bg-red-600 rounded-sm -translate-y-1/2"></div>
             <div className="absolute top-1/2 -right-1.5 w-3 h-1 bg-red-600 rounded-sm -translate-y-1/2"></div>
          </div>

          {/* Central Glass Image Container */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden p-1 bg-gradient-to-br from-red-200/50 to-transparent shadow-[0_20px_50px_rgba(150,0,0,0.15)] backdrop-blur-md border border-white/60">
             <div className="w-full h-full rounded-full overflow-hidden bg-white/50 relative">
                {/* Tech Scan Line Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent h-1.5 w-full animate-[fade-in-up_3s_ease-in-out_infinite]" />
                <img src="/krish.jpeg" alt="Krishnendu" className="w-full h-full object-cover filter contrast-[1.05] saturate-0 sepia-[.2] hue-rotate-[-50deg] opacity-90 transition-all duration-1000 hover:saturate-100 hover:sepia-0" />
             </div>
          </div>

          {/* Crosshairs & target lines linking outwards */}
          <div className={`absolute left-full top-1/2 w-32 md:w-48 h-[1px] bg-red-900/20 origin-left transition-all duration-1000 ${step === 2 ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
            <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-red-600 rounded-full -translate-y-1/2"></div>
            
            {/* Context Box floating on the line end */}
            <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2 w-48 text-left border-l-[2px] border-red-600 pl-4 py-1">
               <h3 className="font-tech text-[10px] font-bold text-red-800 uppercase tracking-widest mb-1">DATA INSIGHT</h3>
               <p className="font-tech text-[9px] text-[#1a0505]/70 dark:text-white/60 leading-relaxed">
                 Deep architectural understanding mapped directly to real-world performance metrics.
               </p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom left corner: What is Krish? */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-tech text-[10px] bg-red-900/5 text-red-800 dark:text-red-400 px-2 py-0.5 border-l-2 border-red-800 tracking-widest">
            UNDERSTANDING
          </span>
        </div>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#1a0505] dark:text-white uppercase leading-none">
          Who is
          <br />
          <span className="text-red-800 dark:text-red-600 opacity-90">— Krish?</span>
        </h2>
      </div>

      {/* Action links */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 flex gap-4">
        <a href="https://github.com/KriXsh" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[2px] border border-red-900/20 bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-center text-red-900 hover:bg-red-800 hover:text-white transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href="https://linkedin.com/in/krish-me" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[2px] border border-red-900/20 bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-center text-red-900 hover:bg-red-800 hover:text-white transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
      </div>

    </section>
  );
}
