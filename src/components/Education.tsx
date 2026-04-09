"use client";

import { GraduationCap, School } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

const educationData = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech in Computer Science & Engineering",
    date: "2019 – 2023",
    grade: "7.0 CGPA",
    label: "Cumulative Grade",
    icon: GraduationCap,
  },
  {
    institution: "Kenduadihi Boys' High School",
    degree: "Higher Secondary (Science)",
    date: "2017 – 2019",
    grade: "78%",
    label: "Aggregate Percentage",
    icon: School,
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 dot-grid">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <AnimateOnView animation="fade-up">
            <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Academic Background</span>
          </AnimateOnView>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-[#112337] dark:text-white uppercase italic">
            Education <span className="text-red-600">//</span> History
          </h2>
        </div>

        <div className="space-y-6">
          {educationData.map((edu, i) => (
            <AnimateOnView key={i} animation="fade-up" delay={i * 80}>
              <div className="card solais-glass p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 group !border-red-600/10 hover:!border-red-600/40">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-red-600/10 border border-red-600/20 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <edu.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#112337] dark:text-white uppercase">{edu.institution}</h4>
                    <p className="text-sm text-red-600 font-bold uppercase tracking-widest mt-1">{edu.degree}</p>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0 pl-0 md:pl-10 border-t md:border-t-0 md:border-l border-red-600/10 pt-6 md:pt-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9aa3ad] mb-2 font-tech">{edu.date}</p>
                  <p className="text-4xl font-black font-mono text-white italic">{edu.grade}</p>
                  <p className="text-[10px] text-red-600 uppercase tracking-widest font-black mt-1">{edu.label}</p>
                </div>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}