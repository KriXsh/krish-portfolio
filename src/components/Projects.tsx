import { ExternalLink, Github, Code2, Globe, ArrowRight } from "lucide-react";

const projects = [
    {
        title: "Pathfinding Visualizer",
        date: "June 2022 - Dec 2022",
        description: "A dynamic visualization tool built to demonstrate Dijkstra's Algorithm. Features an interactive grid where users can set start/end points and draw walls to see real-time shortest-path calculations.",
        tech: ["React.js", "Algorithms", "CSS3"],
        link: "https://pathfinding-visualizer-chi-lyart.vercel.app/",
        type: "Live Demo"
    },
    {
        title: "Car Rental System",
        date: "Aug 2024",
        description: "A robust Java-based application designed to manage car inventories, customer records, and rental transactions. Handles core functionalities like booking, availability checks, and returns.",
        tech: ["Java", "OOPs", "Car Inventory Management"],
        link: "https://github.com/KriXsh/Car-rental-system-Java",
        type: "GitHub"
    },
    {
        title: "Sort-Fusion",
        date: "July 2024",
        description: "An interactive UI to explore and visualize various sorting data structures. Allows users to witness how different algorithms manipulate arrays in real-time.",
        tech: ["React.js", "Data Structures", "TailwindCSS"],
        link: "https://sort-fusion-ui-git-krish-krishs-projects-02e2b9ea.vercel.app/",
        type: "Live Demo"
    },
    {
        title: "Weather-App",
        date: "June 2022 - July 2022",
        description: "A full-stack weather forecasting tool providing real-time updates on temperature, precipitation, and wind speed. Features hourly and weekly forecasts via API integration.",
        tech: ["Node.js", "Express.js", "React.js", "HBS", "CSS"],
        link: "https://weather-app-krish.onrender.com/",
        type: "Live Demo"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-20">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-black text-white">Featured Projects🚀</h2>
                <div className="h-px flex-1 bg-slate-800"></div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="group relative bg-slate-900/50 border border-slate-800 rounded-4xl p-8 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:bg-slate-900/70"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:bg-indigo-500/10 transition-colors border border-slate-700/50">
                                <Code2 className="w-6 h-6 text-slate-500 group-hover:text-indigo-400" />
                            </div>
                            <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                                {project.date}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {project.description}
                        </p>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((t) => (
                                <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded-md bg-slate-900/30">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Project Link */}
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-indigo-400 transition-colors"
                        >
                            {project.type === "GitHub" ? <Github className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                            {project.type}
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                ))}
            </div>

            {/* GitHub Call to Action with Video Background */}
            <div className="relative bg-slate-950 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl border border-slate-800">
                {/* Cinematic Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover backdrop-blur-sm opacity-20"
                    >
                        <source src="https://ironbook-blogs.s3.ap-southeast-1.amazonaws.com/assests/website-assests/8084614-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                        Hungry for more <br className="hidden md:block" /> project stories?
                    </h3>
                    <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        I'm constantly building, experimenting, and breaking things.
                        Check out my public repositories on GitHub to see the full evolution of my code and latest experiments.
                    </p>
                    <a
                        href="https://github.com/KriXsh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 bg-white text-slate-950 hover:bg-indigo-500 hover:text-white px-10 py-5 rounded-2xl font-black transition-all duration-300 group shadow-xl"
                    >
                        <Github className="w-6 h-6" />
                        EXPLORE GITHUB REPOS
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}