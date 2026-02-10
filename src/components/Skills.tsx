import {
    Cloud,
    Database,
    Terminal,
    Layout,
    BrainCircuit,
    Cpu
} from "lucide-react";
import {
    SiNextdotjs, SiReact, SiNodedotjs, SiExpress, SiSelenium, SiTailwindcss, SiBootstrap,
    SiAmazonwebservices, SiDocker, SiJenkins, SiGithubactions, SiGitlab, SiKubernetes, SiNginx,
    SiMongodb, SiRedis, SiPostgresql, SiElasticsearch,
    SiPython, SiJavascript, SiOpenjdk, SiUbuntu, SiApple,
    SiTypescript,
    SiOpenai,
    SiHuggingface,
    SiPytorch,
    SiTensorflow,
    SiPandas,
    SiLangchain,
    SiPm2
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";

const skillCategories = [
    {
        title: "Web Tech",
        icon: <Layout className="w-5 h-5 text-indigo-600" />,
        items: [
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "React.js", icon: <SiReact /> },
            { name: "Node.js", icon: <SiNodedotjs /> },
            { name: "Express.js", icon: <SiExpress /> },
            { name: "Selenium", icon: <SiSelenium /> },
            { name: "TailwindCSS", icon: <SiTailwindcss /> },
            { name: "Bootstrap", icon: <SiBootstrap /> },
            { name: "TypeScript", icon: <SiTypescript /> },
        ]
    },
    {
        title: "AI & ML (Generative & Applied)",
        icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />,
        items: [
            { name: "LLM (Gemini/GPT-4)", icon: <SiOpenai /> },
            { name: "Vector DBs (Pinecone/Milvus)", icon: <Database className="w-3.5 h-3.5" /> },
            { name: "LangChain & Agents", icon: <SiLangchain /> },
            { name: "Hugging Face", icon: <SiHuggingface /> },
            { name: "RAG Architecture", icon: <Cloud className="w-3.5 h-3.5" /> },
            { name: "PyTorch/TensorFlow", icon: <SiPytorch /> },
        ]
    },
    {
        title: "Cloud & DevOps",
        icon: <Cloud className="w-5 h-5 text-indigo-600" />,
        items: [
            { name: "AWS", icon: <SiAmazonwebservices /> },
            { name: "ElasticCloud", icon: <SiElasticsearch /> },
            { name: "Docker", icon: <SiDocker /> },
            { name: "Jenkins", icon: <SiJenkins /> },
            { name: "GitHub Actions", icon: <SiGithubactions /> },
            { name: "GitLab", icon: <SiGitlab /> },
            { name: "Kubernetes", icon: <SiKubernetes /> },
            { name: "Nginx", icon: <SiNginx /> },
            { name: "pm2", icon: <SiPm2 /> }
        ]
    },
    {
        title: "Databases",
        icon: <Database className="w-5 h-5 text-indigo-600" />,
        items: [
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "Redis", icon: <SiRedis /> },
            { name: "PostgreSQL", icon: <SiPostgresql /> },
            { name: "Elasticsearch", icon: <SiElasticsearch /> }
        ]
    },
    {
        title: "Languages & OS",
        icon: <Terminal className="w-5 h-5 text-indigo-600" />,
        items: [
            { name: "Python", icon: <SiPython /> },
            { name: "Bash", icon: <VscTerminalBash /> },
            { name: "JavaScript", icon: <SiJavascript /> },
            { name: "Java", icon: <SiOpenjdk /> },
            { name: "Ubuntu", icon: <SiUbuntu /> },
            { name: "macOS", icon: <SiApple /> }
        ]
    }
];

export default function Skills() {
    return (
        <section className="py-20">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.3em] mb-12">Technical Arsenal⚡</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {skillCategories.map((cat, i) => (
                    <div key={i} className="space-y-6">
                        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                            {cat.icon}
                            <h3 className="text-base font-bold text-slate-900 tracking-tight">{cat.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {cat.items.map(skill => (
                                <span
                                    key={skill.name}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-all hover:shadow-sm group cursor-default"
                                >
                                    <span className="text-[15px] text-slate-400 group-hover:text-indigo-500 transition-colors">
                                        {skill.icon}
                                    </span>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}