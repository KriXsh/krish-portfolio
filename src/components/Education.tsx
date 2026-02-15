import { GraduationCap, School } from "lucide-react";

const educationData = [
    {
        institution: "Lovely Professional University",
        degree: "B.Tech in Computer Science & Engineering",
        date: "2019 - 2023",
        grade: "7.0 CGPA",
        label: "Cumulative Grade",
        icon: <GraduationCap className="w-6 h-6 text-indigo-400" />
    },
    {
        institution: "Kenduadihi Boys' High School",
        degree: "Higher Secondary (Science)",
        date: "2017 - 2019",
        grade: "78%",
        label: "Aggregate Percentage",
        icon: <School className="w-6 h-6 text-purple-400" />
    }
];

export default function Education() {
    return (
        <section>
            <h3 className="text-3xl font-black text-white mb-8">Education🎓</h3>
            <div className="space-y-6">
                {educationData.map((edu, index) => (
                    <div
                        key={index}
                        className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 transition-hover hover:border-indigo-500/50 hover:bg-slate-900/70 hover:shadow-xl hover:shadow-indigo-500/10 duration-300"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="p-4 bg-slate-800/50 rounded-2xl shadow-sm border border-slate-700/50">
                                {edu.icon}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white tracking-tight">
                                    {edu.institution}
                                </h4>
                                <p className="text-slate-400 font-medium">{edu.degree}</p>
                            </div>
                        </div>

                        {/* Right Side: Grade & Date */}
                        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8 flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                {edu.date}
                            </span>
                            <p className="text-indigo-400 font-mono text-3xl font-black leading-none">
                                {edu.grade}
                            </p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">
                                {edu.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}