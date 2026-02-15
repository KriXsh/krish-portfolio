import { Award, ExternalLink, ShieldCheck, Cpu, Code2, Trophy } from "lucide-react";

const achievements = [
    {
        title: "Jumpstart - Competitive Coding",
        org: "PublicSapients",
        icon: <Trophy className="w-5 h-5" />,
        link: "https://drive.google.com/file/d/1Z0v9-NOUBZaz982hYjLJ35cZU8XnXMJd/view",
        type: "Award"
    },
    {
        title: "Java Foundations",
        org: "HackerRank",
        icon: <Code2 className="w-5 h-5" />,
        link: "https://www.hackerrank.com/certificates/a9ef7324ba06",
        type: "Certification"
    },
    {
        title: "Artificial Intelligence Fundamentals",
        org: "Invincible Ocean",
        icon: <Cpu className="w-5 h-5" />,
        link: "https://drive.google.com/file/d/1ESxV2paQckfDhXPmNI0_eVNQRX27XQ_E/view",
        type: "Certification"
    },
    {
        title: "OOP Using Python",
        org: "E-Box",
        icon: <Code2 className="w-5 h-5" />,
        link: "https://drive.google.com/file/d/14qmR5CtTvig-TS3PkIbMimDUwG7vw-xp/view",
        type: "Certification"
    },
    {
        title: "Website Hacking / Penetration Testing",
        org: "Udemy",
        icon: <ShieldCheck className="w-5 h-5" />,
        link: "https://drive.google.com/file/d/1q7Yk9bujRJzulgYD7LiLQiV74T5hzcOH/view",
        type: "Professional Training"
    }
];

export default function Certifications() {
    return (
        <section id="achievements" className="py-12">
            <div className="flex items-center gap-4 mb-10">
                <h3 className="text-3xl font-black text-white">Certifications & Achievements🏆</h3>
                <div className="h-px flex-1 bg-slate-800"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-6 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 hover:bg-slate-900/70 transition-all duration-300 overflow-hidden"
                    >
                        {/* Subtle Gradient Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-slate-800/50 rounded-2xl text-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-all duration-300 border border-slate-700/50">
                                    {item.icon}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-700/50">
                                    <Award className="w-3 h-3" />
                                    {item.type}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-slate-500 font-medium mb-4">{item.org}</p>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                Verify Credentials <ExternalLink className="w-3 h-3" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}