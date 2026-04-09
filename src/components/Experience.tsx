import { ShieldCheck, PieChart, Zap, Users, Code, Briefcase, Calendar } from "lucide-react";
import AnimateOnView from "./AnimateOnView";

const categoryStyles = {
  "gov-tech": { icon: <ShieldCheck className="w-3 h-3" />, label: "B2G / Gov-Tech", cls: "bg-sky-50 border-sky-200 text-sky-700" },
  "fintech": { icon: <PieChart className="w-3 h-3" />, label: "FinOps / Fintech", cls: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  "b2b": { icon: <Zap className="w-3 h-3" />, label: "B2B Enterprise", cls: "bg-violet-50 border-violet-200 text-violet-700" },
  "b2c": { icon: <Users className="w-3 h-3" />, label: "B2C Digital", cls: "bg-pink-50 border-pink-200 text-pink-700" },
  "cloud-devops": { icon: <Code className="w-3 h-3" />, label: "Cloud & DevOps", cls: "bg-[rgba(32,76,229,0.07)] border-[rgba(32,76,229,0.2)] text-[#204ce5]" },
};

const jobs = [
  {
    title: "Full-stack Developer & AIML Engineer",
    company: "Ironbook AI",
    status: "Verified",
    date: "Aug 2025 – Present",
    tenure: "7 mos",
    tags: ["B2B_ENT", "B2C_CORE", "CLOUD_DEVOPS"],
    bullets: [
      "Engineered end-to-end solutions for AI-powered services, including full-stack integration and deployment of Speech-to-Text (STT) and voice-over capabilities.",
      "Developed full-stack features for Customer Data Platforms (CDP) and marketing technology systems using React.js, Next.js, Python, and Node.js.",
      "Led the design and development of high-performance landing pages and user interfaces for seamless UX.",
      "Implemented scalable, event-driven asynchronous systems using pub/sub architectures and Kafka.",
      "Architected large-scale data migration pipelines and automated workflows using ETL tools and Argo Workflows on Kubernetes.",
      "Managed AI agent lifecycles using AWS SageMaker and AWS Bedrock.",
      "Drove CI/CD pipeline development and production scaling on Kubernetes using Docker and AWS ECR.",
    ],
  },
  {
    title: "Full-stack Developer",
    company: "Aaizel International Technologies Pvt Ltd",
    date: "Mar 2025 – Jul 2025",
    tenure: "5 mos",
    tags: ["B2G_GOV", "B2C_CORE", "CLOUD_DEVOPS"],
    bullets: [
      "Led end-to-end B2G solutions, including the Upper Atmosphere Sounding System (UASS), focusing on thermodynamic logic and atmospheric data models.",
      "Designed microservices architecture using Nginx routing and optimized database queries.",
      "Engineered scalable infrastructure using AWS ALB across multiple EC2 instances for fault tolerance.",
      "Developed intelligent web crawlers for 50+ Indian newspapers for real-time indexing.",
      "Built a secure RBAC system integrated with AWS IAM policies across frontend, backend, and infra.",
      "Oversaw the complete DevOps lifecycle, including CI/CD automation and production monitoring.",
    ],
  },
  {
    title: "Full Stack Developer (Freelance)",
    company: "Floxify",
    status: "Verified",
    date: "Jan 2025 – Feb 2025",
    tenure: "2 mos",
    tags: ["B2B_ENT", "CLOUD_DEVOPS"],
    bullets: [
      "Deployed Next.js apps on AWS EC2, ensuring high availability and performance.",
      "Optimized Nginx as a reverse proxy for subdomain management and HTTPS enforcement.",
      "Managed process clustering via PM2 for zero-downtime restarts.",
      "Automated CI/CD pipelines using GitHub Actions and self-hosted runners.",
      "Implemented security best practices including firewalls, IAM roles, and performance monitoring.",
    ],
  },
  {
    title: "Invincible Ocean | InvincibleMeta.AI",
    company: "Software Developer & Associate",
    date: "Jun 2023 – Dec 2024",
    status: "Verified",
    tenure: "1 yr 7 mos",
    tags: ["B2B_ENT", "B2C_CORE", "CLOUD_DEVOPS","FINTECH"],
    roles: [
      {
        title: "Software Developer",
        date: "Apr 2024 – Dec 2024",
        tenure: "9 mos",
        bullets: [
          "Implemented secure private S3 bucket solutions using pre-signed URLs.",
          "Automated CI/CD via Jenkins, streamlining deployments and development workflows.",
          "Orchestrated CronJobs, reducing downtime by 40% and improving server performance by 25%.",
          "Engineered an RBAC framework (Super Admin / Admin / User) with JWT authentication.",
          "Optimized MongoDB performance, achieving a 40% reduction in response times.",
        ],
      },
      {
        title: "Associate Software Developer",
        date: "Jun 2023 – Mar 2024",
        tenure: "10 mos",
        bullets: [
          "Architected and developed 350+ public and in-house APIs.",
          "Managed AWS EC2 instances and S3 storage while streamlining deployment pipelines.",
          "Conducted rigorous API testing using Postman to ensure reliability.",
          "Developed a customizable IP whitelist solution to enhance client security.",
          "Optimized API response times through Redis cache implementation.",
        ],
      },
    ],
  },
  {
    title: "Cloud & DevOps Intern",
    company: "EPAM Systems",
    status: "Verified",
    tags: ["B2C_CORE", "CLOUD_DEVOPS"],
    date: "Jan 2023 – May 2023",
    tenure: "5 mos",
    bullets: [
      "Managed AWS infrastructure including VPC, EC2, S3, Lambda, and IAM roles.",
      "Optimized ALB configurations, subnets, and security groups for network efficiency.",
      "Integrated applications into Docker and Kubernetes, reducing deployment time by 40%.",
      "Led performance monitoring initiatives, achieving a 40% improvement in system efficiency.",
      "Pioneered CI/CD pipeline setups using Jenkins and GitLab, accelerating delivery by 40–50%.",
    ],
  },
];

function CategoryBadge({ cat }: { cat: string }) {
  const s = categoryStyles[cat as keyof typeof categoryStyles];
  return (
    <span className={`cbadge ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 dot-grid relative">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <AnimateOnView animation="fade-up">
            <span className="pill !border-red-600/20 !text-red-600 !bg-red-600/5">Work History</span>
          </AnimateOnView>
          <h2 className="mt-4 text-5xl font-black text-[#112337] dark:text-white uppercase tracking-tighter italic">
            Experience<span className="text-red-600">_</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line - Changed to Red gradient */}
          <div className="tl-line !bg-gradient-to-b !from-red-600 !to-red-600/10" />

          <div className="space-y-12">
            {jobs.map((job, i) => (
              <AnimateOnView key={i} animation="fade-up" delay={i * 100} className="relative pl-12">
                {/* Timeline Dot - Changed to Red */}
                <div className="tl-dot absolute left-[11.5px] top-2 !bg-red-600 !shadow-[0_0_0_4px_rgba(220,38,38,0.15)]" />

                <div className="flex flex-col gap-2 mb-4">
                  <span className="font-tech text-[10px] text-red-600 font-black tracking-[0.3em] uppercase">
                    Data_Log // 0{i + 1} — {job.status || "LOGGED"}
                  </span>
                </div>

                <div className="card p-6 md:p-8 hover:border-red-600/40 transition-all border-[rgba(17,35,55,0.1)] dark:border-white/10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-black text-[#112337] dark:text-white uppercase">
                        {job.title}
                      </h3>
                      <p className="text-red-600 font-bold text-sm tracking-wide">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#9aa3ad] font-tech text-xs">
                      <Calendar size={14} /> {job.tenure}
                    </div>
                  </div>

                  {/* Rendering Logic: Handle Bullets OR Nested Roles */}
                  <div className="space-y-6 mb-6">
                    {job.roles ? (
                      // If there are nested roles (like Invincible Ocean)
                      job.roles.map((role, idx) => (
                        <div key={idx} className="border-l-2 border-red-600/20 pl-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-black text-[#112337] dark:text-white uppercase">{role.title}</h4>
                            <span className="text-[10px] font-tech text-[#9aa3ad]">{role.date}</span>
                          </div>
                          <ul className="space-y-1">
                            {role.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="text-[#585e6a] dark:text-[#94a3b8] text-xs leading-relaxed">
                                • {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      // Standard display for jobs without nested roles
                      <ul className="space-y-2 border-l-2 border-red-600/20 pl-4">
                        {(job.bullets as string[]).map((bullet, bIdx) => (
                          <li key={bIdx} className="text-[#585e6a] dark:text-[#94a3b8] text-sm leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="cbadge !border-red-600/20 !text-red-600 !bg-red-600/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
