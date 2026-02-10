const jobs = [
  {
    title: "Full-stack Developer & AIML Engineer",
    company: "Ironbook AI",
    date: "Aug 2025 - Present",
    tenure: "7 mos",
    bullets: [
      "Engineered end-to-end solutions for AI-powered services, including full-stack integration and deployment of Speech-to-Text (STT) and voice-over capabilities.",
      "Developed full-stack features for Customer Data Platforms (CDP) and marketing technology systems using React.js, Next.js, Python, and Node.js.",
      "Led the design and development of high-performance landing pages and user interfaces for seamless UX.",
      "Implemented scalable, event-driven asynchronous systems using pub/sub architectures and Kafka for high-volume data streams.",
      "Architected large-scale data migration pipelines and automated workflows using ETL tools and Argo Workflows on Kubernetes.",
      "Managed AI agent lifecycles using AWS SageMaker and AWS Bedrock to build and deploy sophisticated models.",
      "Drove CI/CD pipeline development and production scaling on Kubernetes (K8s) using Docker and AWS ECR."
    ]
  },
  {
    title: "Full-stack Developer",
    company: "Aaizel International Technologies Pvt Ltd",
    date: "March 2025 - July 2025",
    tenure: "5 mos",
    bullets: [
      "Led end-to-end B2G solutions, including the Upper Atmosphere Sounding System (UASS), focusing on thermodynamic logic and atmospheric data models.",
      "Designed microservices architecture using Nginx routing and optimized database queries for high-throughput operations.",
      "Engineered scalable infrastructure using AWS Application Load Balancer (ALB) across multiple EC2 instances for fault tolerance.",
      "Developed intelligent web crawlers for 50+ Indian newspapers for real-time indexing and structured data extraction.",
      "Built a secure RBAC system integrated with AWS IAM policies across frontend, backend, and infrastructure layers.",
      "Oversaw the complete DevOps lifecycle, including CI/CD automation and production monitoring."
    ]
  },
  {
    title: "Full Stack Developer (Freelance)",
    company: "Floxify",
    date: "Jan 2025 - Feb 2025",
    tenure: "2 mos",
    bullets: [
      "Deployed Next.js apps on AWS EC2, ensuring high availability and performance.",
      "Optimized Nginx as a reverse proxy for subdomain management, HTTPS (SSL/TLS) enforcement, and DNS routing.",
      "Managed process clustering via PM2 for zero-downtime restarts and efficient resource utilization.",
      "Automated CI/CD pipelines using GitHub Actions and self-hosted runners to streamline version control.",
      "Implemented security best practices, including firewalls, IAM roles, and performance monitoring."
    ]
  },
  {
    title: "Invincible Ocean | InvincibleMeta.AI",
    company: "Software Developer & Associate",
    date: "June 2023 - Dec 2024",
    tenure: "1 yr 7 mos",
    roles: [
      {
        title: "Software Developer",
        date: "Apr 2024 - Dec 2024",
        tenure: "9 mos",
        bullets: [
          "Implemented secure private S3 bucket solutions using pre-signed URLs for controlled resource access.",
          "Automated CI/CD via Jenkins, streamlining deployments and development workflows.",
          "Orchestrated CronJobs, reducing downtime by 40% and improving server performance by 25%.",
          "Engineered an RBAC framework (Super Admin/Admin/User) with JWT authentication.",
          "Optimized MongoDB performance using Compass/Studio3T, achieving a 40% reduction in response times."
        ]
      },
      {
        title: "Associate Software Developer",
        date: "Jun 2023 - Mar 2024",
        tenure: "10 mos",
        bullets: [
          "Architected and developed 350+ public and in-house APIs, enhancing client interactions.",
          "Managed AWS EC2 instances and S3 storage while streamlining deployment pipelines.",
          "Conducted rigorous API testing using Postman to ensure reliability across diverse scenarios.",
          "Developed a customizable IP whitelist solution to enhance client security.",
          "Optimized API response times through Redis cache implementation."
        ]
      }
    ]
  },
  {
    title: "Cloud & DevOps Intern",
    company: "EPAM Systems",
    date: "Jan 2023 - May 2023",
    tenure: "5 mos",
    bullets: [
      "Managed AWS infrastructure including VPC, EC2, S3, Lambda, and IAM roles for robust cloud operations.",
      "Optimized ALB configurations, subnets, and security groups to enhance network efficiency and security.",
      "Integrated applications into Docker and Kubernetes environments, reducing deployment time by 40% through streamlined troubleshooting and documentation.",
      "Led performance monitoring initiatives, identifying bottlenecks to achieve a 40% improvement in system efficiency.",
      "Pioneered CI/CD pipeline setups using Jenkins and GitLab, accelerating software delivery by 40-50%."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-12">
      <h3 className="text-3xl font-black text-slate-900 mb-12">Experience 💼</h3>
      <div className="space-y-16">
        {jobs.map((job, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-slate-100">
            <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7.5px] top-2" />
            
            {!job.roles ? (
              <>
                <div className="flex flex-col md:flex-row md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{job.title}</h4>
                    <p className="text-indigo-600 font-medium">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 font-mono text-sm block">{job.date}</span>
                    <span className="text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider italic">
                      {job.tenure}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="text-slate-600 text-sm flex gap-2">
                      <span className="text-indigo-400">•</span> {bullet}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="space-y-10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 leading-tight">{job.title}</h4>
                    <p className="text-indigo-600 font-bold text-sm italic uppercase tracking-tighter">
                      Total Tenure: {job.tenure}
                    </p>
                  </div>
                </div>
                {job.roles.map((role, k) => (
                  <div key={k} className="relative pl-6 border-l border-slate-200">
                    <div className="absolute w-2 h-2 bg-slate-300 rounded-full -left-[4.5px] top-2" />
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h5 className="text-lg font-bold text-slate-800">{role.title}</h5>
                      <div className="text-right">
                        <span className="text-slate-400 font-mono text-xs block">{role.date}</span>
                        <span className="text-slate-400 font-mono text-[10px] italic">{role.tenure}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {role.bullets.map((b, m) => (
                        <li key={m} className="text-slate-600 text-sm flex gap-2">
                          <span className="text-indigo-300">-</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}