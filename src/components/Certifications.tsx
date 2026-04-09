import { Award, ExternalLink, ShieldCheck, Cpu, Code2, Trophy } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

const achievements = [
  {
    title: "Jumpstart - Competitive Coding",
    org: "PublicSapients",
    icon: Trophy,
    link: "https://drive.google.com/file/d/1Z0v9-NOUBZaz982hYjLJ35cZU8XnXMJd/view",
    type: "Award",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    title: "Java Foundations",
    org: "HackerRank",
    icon: Code2,
    link: "https://www.hackerrank.com/certificates/a9ef7324ba06",
    type: "Certification",
    color: "text-[#204ce5]",
    bg: "bg-[rgba(32,76,229,0.07)]",
    border: "border-[rgba(32,76,229,0.2)]",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    org: "Invincible Ocean",
    icon: Cpu,
    link: "https://drive.google.com/file/d/1ESxV2paQckfDhXPmNI0_eVNQRX27XQ_E/view",
    type: "Certification",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    title: "OOP Using Python",
    org: "E-Box",
    icon: Code2,
    link: "https://drive.google.com/file/d/14qmR5CtTvig-TS3PkIbMimDUwG7vw-xp/view",
    type: "Certification",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    title: "Website Hacking / Penetration Testing",
    org: "Udemy",
    icon: ShieldCheck,
    link: "https://drive.google.com/file/d/1q7Yk9bujRJzulgYD7LiLQiV74T5hzcOH/view",
    type: "Professional Training",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
];
export default function Certifications() {
  return (
    <section id="achievements" className="py-24 dot-grid">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <AnimateOnView animation="fade-up">
            <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Recognition</span>
          </AnimateOnView>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-[#112337] dark:text-white uppercase italic">
            Certifications <span className="text-red-600">&</span> Awards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <AnimateOnView key={i} animation="fade-up" delay={i * 70}>
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="card solais-glass p-7 block group h-full !border-red-600/10 hover:!border-red-600/50 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/20 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="stag !text-red-600 !border-red-600/10 !bg-red-600/5 uppercase !text-[9px]">
                    <Award className="w-2.5 h-2.5" /> {item.type}
                  </span>
                </div>

                <h4 className="text-sm font-black text-[#112337] dark:text-white mb-1 group-hover:text-red-600 transition-colors uppercase tracking-wide leading-snug">
                  {item.title}
                </h4>
                <p className="text-[10px] font-tech text-[#9aa3ad] mb-6 uppercase tracking-widest">{item.org}</p>

                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Verify Credentials <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}