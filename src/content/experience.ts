// Work history. Rendered by src/components/Experience.tsx and read by the KAI
// chat assistant (src/lib/chat), so keep it plain data with no React imports.

export type Category = "gov-tech" | "fintech" | "b2b" | "b2c" | "cloud-devops";

export type Role = { title: string; date: string; tenure: string; bullets: string[] };

export type Job = {
  company: string;
  short: string;
  /** Anchor id of the entry, linked from the hero's domain marquee. */
  id: string;
  /** "YYYY-MM"; `end` omitted means present. */
  start: string;
  end?: string;
  date: string;
  tenure: string;
  categories: Category[];
  stack: string[];
  metrics?: { value: string; label: string }[];
  roles: Role[];
};

export const JOBS: Job[] = [
  {
    company: "Ironbook AI",
    short: "Ironbook AI",
    id: "exp-ironbook",
    start: "2025-08",
    date: "Aug 2025 - Present",
    tenure: "Current",
    categories: ["b2b", "b2c", "cloud-devops"],
    stack: ["React.js", "Next.js", "Python", "Node.js", "Kafka", "Argo Workflows", "Kubernetes", "SageMaker", "Bedrock", "Docker", "AWS ECR"],
    roles: [
      {
        title: "Full-stack Developer & AIML Engineer",
        date: "Aug 2025 - Present",
        tenure: "Current",
        bullets: [
          "Engineered end-to-end solutions for AI-powered services, including full-stack integration and deployment of Speech-to-Text (STT) and voice-over capabilities.",
          "Developed full-stack features for Customer Data Platforms (CDP) and marketing technology systems using React.js, Next.js, Python, and Node.js.",
          "Led the design and development of high-performance landing pages and user interfaces for seamless UX.",
          "Implemented scalable, event-driven asynchronous systems using pub/sub architectures and Kafka for high-volume data streams.",
          "Architected large-scale data migration pipelines and automated workflows using ETL tools and Argo Workflows on Kubernetes.",
          "Managed AI agent lifecycles using AWS SageMaker and AWS Bedrock to build and deploy sophisticated models.",
          "Drove CI/CD pipeline development and production scaling on Kubernetes (K8s) using Docker and AWS ECR.",
        ],
      },
    ],
  },
  {
    company: "Aaizel International Technologies Pvt Ltd",
    short: "Aaizel Tech",
    id: "exp-aaizel",
    start: "2025-03",
    end: "2025-07",
    date: "March 2025 - July 2025",
    tenure: "5 mos",
    categories: ["gov-tech", "b2c", "cloud-devops"],
    stack: ["Microservices", "Nginx", "AWS ALB", "EC2", "AWS IAM", "RBAC", "Web Crawlers", "Data Pipelines", "STT / TTS", "Prompt Engineering", "CI/CD"],
    metrics: [
      { value: "200+", label: "Newspapers monitored in real time" },
      { value: "60", label: "Government ministries served" },
    ],
    roles: [
      {
        title: "Full-stack Developer",
        date: "March 2025 - July 2025",
        tenure: "5 mos",
        bullets: [
          "Led end-to-end B2G solutions for government clients, from domain modelling through to production.",
          "Designed microservices architecture using Nginx routing and optimized database queries for high-throughput operations.",
          "Engineered scalable infrastructure using AWS Application Load Balancer (ALB) across multiple EC2 instances for fault tolerance.",
          "Built the crawlers behind a media-monitoring platform for 60 Indian government ministries, covering 200+ newspapers, YouTube, Twitter/X and more with real-time indexing and structured extraction.",
          "Engineered the data pipelines for all crawlers, built speech-to-text and text-to-speech APIs, and led prompt engineering for the platform's AI features.",
          "Built a secure RBAC system integrated with AWS IAM policies across frontend, backend, and infrastructure layers.",
          "Oversaw the complete DevOps lifecycle, including CI/CD automation and production monitoring.",
        ],
      },
    ],
  },
  {
    company: "Floxify",
    short: "Floxify",
    id: "exp-floxify",
    start: "2025-01",
    end: "2025-02",
    date: "Jan 2025 - Feb 2025",
    tenure: "2 mos",
    categories: ["b2b", "cloud-devops"],
    stack: ["Next.js", "AWS EC2", "Nginx", "SSL/TLS", "PM2", "GitHub Actions"],
    roles: [
      {
        title: "Full Stack Developer (Freelance)",
        date: "Jan 2025 - Feb 2025",
        tenure: "2 mos",
        bullets: [
          "Deployed Next.js apps on AWS EC2, ensuring high availability and performance.",
          "Optimized Nginx as a reverse proxy for subdomain management, HTTPS (SSL/TLS) enforcement, and DNS routing.",
          "Managed process clustering via PM2 for zero-downtime restarts and efficient resource utilization.",
          "Automated CI/CD pipelines using GitHub Actions and self-hosted runners to streamline version control.",
          "Implemented security best practices, including firewalls, IAM roles, and performance monitoring.",
        ],
      },
    ],
  },
  {
    company: "Invincible Ocean Pvt Ltd",
    short: "Invincible Ocean",
    id: "exp-invincible-ocean",
    start: "2023-06",
    end: "2024-12",
    date: "June 2023 - Dec 2024",
    tenure: "1 yr 7 mos",
    categories: ["fintech", "b2b", "b2c", "cloud-devops"],
    stack: ["Node.js", "AWS S3", "EC2", "Jenkins", "JWT", "MongoDB", "Redis", "Postman"],
    metrics: [
      { value: "25%", label: "Server performance gain" },
      { value: "40%", label: "Faster MongoDB responses" },
      { value: "40%", label: "Less downtime via CronJobs" },
    ],
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
          "Optimized MongoDB performance using Compass/Studio3T, achieving a 40% reduction in response times.",
        ],
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
          "Optimized API response times through Redis cache implementation.",
        ],
      },
    ],
  },
  {
    company: "EPAM Systems",
    short: "EPAM Systems",
    id: "exp-epam",
    start: "2023-01",
    end: "2023-05",
    date: "Jan 2023 - May 2023",
    tenure: "5 mos",
    categories: ["cloud-devops"],
    stack: ["AWS VPC", "EC2", "S3", "Lambda", "IAM", "Docker", "Kubernetes", "Jenkins", "GitLab"],
    metrics: [
      { value: "40%", label: "Faster deployments" },
      { value: "40-50%", label: "Faster software delivery" },
    ],
    roles: [
      {
        title: "Cloud & DevOps Intern",
        date: "Jan 2023 - May 2023",
        tenure: "5 mos",
        bullets: [
          "Managed AWS infrastructure including VPC, EC2, S3, Lambda, and IAM roles for robust cloud operations.",
          "Optimized ALB configurations, subnets, and security groups to enhance network efficiency and security.",
          "Integrated applications into Docker and Kubernetes environments, reducing deployment time by 40% through streamlined troubleshooting and documentation.",
          "Led performance monitoring initiatives, identifying bottlenecks to achieve a 40% improvement in system efficiency.",
          "Pioneered CI/CD pipeline setups using Jenkins and GitLab, accelerating software delivery by 40-50%.",
        ],
      },
    ],
  },
];
