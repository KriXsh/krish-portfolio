"use client";

import { Cloud, Database, Terminal, Layout, BrainCircuit } from "lucide-react";
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiExpress, SiSelenium, SiTailwindcss, SiBootstrap,
  SiAmazonwebservices, SiDocker, SiJenkins, SiGithubactions, SiGitlab, SiKubernetes, SiNginx,
  SiMongodb, SiRedis, SiPostgresql, SiElasticsearch,
  SiPython, SiJavascript, SiOpenjdk, SiUbuntu, SiApple,
  SiTypescript, SiOpenai, SiHuggingface, SiPytorch, SiLangchain, SiPm2,
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import AnimateOnView from "./AnimateOnView";

// ALL DATA PRESERVED EXACTLY AS PROVIDED
const cats = [
  {
    title: "Web Tech",
    icon: <Layout className="w-4 h-4" />,
    items: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React.js", icon: <SiReact /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Selenium", icon: <SiSelenium /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
      { name: "TypeScript", icon: <SiTypescript /> },
    ],
  },
  {
    title: "AI & ML",
    icon: <BrainCircuit className="w-4 h-4" />,
    items: [
      { name: "LLM (Gemini/GPT-4)", icon: <SiOpenai /> },
      { name: "Vector DBs", icon: <Database className="w-3.5 h-3.5" /> },
      { name: "LangChain & Agents", icon: <SiLangchain /> },
      { name: "Hugging Face", icon: <SiHuggingface /> },
      { name: "RAG Architecture", icon: <Cloud className="w-3.5 h-3.5" /> },
      { name: "PyTorch / TensorFlow", icon: <SiPytorch /> },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-4 h-4" />,
    items: [
      { name: "AWS", icon: <SiAmazonwebservices /> },
      { name: "ElasticCloud", icon: <SiElasticsearch /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Jenkins", icon: <SiJenkins /> },
      { name: "GitHub Actions", icon: <SiGithubactions /> },
      { name: "GitLab", icon: <SiGitlab /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "Nginx", icon: <SiNginx /> },
      { name: "pm2", icon: <SiPm2 /> },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-4 h-4" />,
    items: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Elasticsearch", icon: <SiElasticsearch /> },
    ],
  },
  {
    title: "Languages & OS",
    icon: <Terminal className="w-4 h-4" />,
    items: [
      { name: "Python", icon: <SiPython /> },
      { name: "Bash", icon: <VscTerminalBash /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Java", icon: <SiOpenjdk /> },
      { name: "Ubuntu", icon: <SiUbuntu /> },
      { name: "macOS", icon: <SiApple /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 dot-grid relative overflow-hidden">

      <div className="text-center mb-16 relative z-10">
        <AnimateOnView animation="fade-up">
          {/* Forced Red Theme on Pill */}
          <span className="pill !text-red-600 !border-red-600/30 !bg-red-600/5">Technical Arsenal</span>
        </AnimateOnView>
        <AnimateOnView animation="fade-up" delay={80}>
          {/* Solais Styling for Header */}
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter text-[#112337] dark:text-white uppercase italic">
            Stack <span className="text-red-600">&</span> Tools
          </h2>
        </AnimateOnView>
        <AnimateOnView animation="fade-up" delay={140}>
          <p className="mt-3 text-[#585e6a] dark:text-[#94a3b8] max-w-xl mx-auto text-sm leading-relaxed">
            Technologies I use to build, scale, and ship production systems.
          </p>
        </AnimateOnView>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-[90rem] mx-auto px-6 relative z-10">
        {cats.map((cat, i) => (
          <AnimateOnView key={i} animation="fade-up" delay={i * 70}>
            {/* Shining Glass Card + Red Borders */}
            <div className="card solais-glass p-6 h-full !border-red-600/10 group hover:!border-red-600/50 transition-all duration-500">

              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-red-600/10">
                {/* Red Icon Box */}
                <div className="p-1.5 rounded-lg bg-red-600/5 text-red-600 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                {/* Uppercase Tech Header */}
                <h3 className="text-[11px] font-black text-[#112337] dark:text-white uppercase tracking-widest">{cat.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="stag !text-red-600 !border-red-600/10 !bg-red-600/5 hover:!border-red-600/40 hover:!bg-red-600/10 transition-colors"
                  >
                    {/* Removed the original gray text color on the icon so it inherits the red */}
                    <span className="text-[14px]">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>

            </div>
          </AnimateOnView>
        ))}
      </div>
    </section>
  );
}