// Case studies. Every fact here comes from the experience bullets in
// src/components/Experience.tsx: no invented metrics, clients or numbers.
// Approach steps describe the work in general engineering terms, and
// employer/client specifics are generalised on purpose (see CONFIDENTIALITY_NOTE).

export type Discipline = "full-stack" | "data" | "event-driven" | "ai" | "devops";

export const DISCIPLINES: { id: Discipline; label: string; rgb: string }[] = [
  { id: "full-stack", label: "Full-stack", rgb: "200 71 92" },
  { id: "data", label: "Data engineering", rgb: "217 167 127" },
  { id: "event-driven", label: "Event-driven", rgb: "192 112 72" },
  { id: "ai", label: "AI", rgb: "232 140 160" },
  { id: "devops", label: "Deployment & DevOps", rgb: "170 96 140" },
];

export const disciplineMeta = (id: Discipline) => DISCIPLINES.find((d) => d.id === id)!;

/** One column of the architecture diagram: a stage and the pieces inside it. */
export type FlowStage = { label: string; nodes: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  period: string;
  disciplines: Discipline[];
  summary: string;
  context: string;
  challenge: string;
  approach: { title: string; detail: string }[];
  /** Rendered left to right (top to bottom on mobile), each stage feeding the next. */
  architecture: FlowStage[];
  stack: string[];
  /** Real metrics only. Cases without numbers show `highlights` instead. */
  metrics?: { value: string; label: string }[];
  highlights: string[];
  featured?: boolean;
};

export const CONFIDENTIALITY_NOTE =
  "Details are generalised to respect employer and client confidentiality. Numbers shown are the ones I can share.";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "invincible-ocean-api-platform",
    title: "A secure, fast API platform for fintech products",
    company: "Invincible Ocean Pvt Ltd",
    period: "Jun 2023 – Dec 2024",
    disciplines: ["full-stack", "devops"],
    featured: true,
    summary:
      "Built and hardened the API layer behind fintech products: 350+ APIs, tiered access control, protected storage and a much faster data layer.",
    context:
      "Invincible Ocean builds fintech products for B2B and B2C users. Over 19 months I grew from Associate Software Developer to Software Developer, working on the backend that its client-facing products depend on.",
    challenge:
      "The products needed a large and reliable API surface for clients and internal tools, access control that separated admins from users, file storage that was never publicly exposed, and response times that held up as usage grew.",
    approach: [
      {
        title: "Build the API surface",
        detail:
          "Architected and developed 350+ public and in-house APIs, and tested them across edge cases with Postman before they reached clients.",
      },
      {
        title: "Lock down access",
        detail:
          "Engineered role-based access control with three tiers (Super Admin, Admin, User) on top of JWT authentication, plus a customisable IP whitelist so clients could restrict where calls come from.",
      },
      {
        title: "Keep files private",
        detail:
          "Moved storage to private S3 buckets. Files are served through short-lived pre-signed URLs, so nothing is publicly addressable.",
      },
      {
        title: "Make it fast",
        detail:
          "Added Redis caching in front of hot API responses and optimised MongoDB queries and indexes using Compass and Studio3T.",
      },
      {
        title: "Automate operations",
        detail:
          "Set up Jenkins CI/CD for repeatable deployments, orchestrated scheduled CronJobs, and managed the EC2 and S3 infrastructure behind it all.",
      },
    ],
    architecture: [
      { label: "Consumers", nodes: ["Client apps", "In-house tools"] },
      { label: "Gatekeeping", nodes: ["IP whitelist", "JWT auth", "RBAC · 3 tiers"] },
      { label: "API layer", nodes: ["350+ REST APIs", "Scheduled CronJobs"] },
      { label: "Data", nodes: ["Redis cache", "MongoDB", "S3 · pre-signed URLs"] },
    ],
    stack: ["REST APIs", "JWT", "RBAC", "Redis", "MongoDB", "AWS S3", "AWS EC2", "Jenkins", "CronJobs", "Postman", "Studio3T"],
    metrics: [
      { value: "350+", label: "Public & in-house APIs architected" },
      { value: "40%", label: "Faster MongoDB response times" },
      { value: "40%", label: "Less downtime from CronJob orchestration" },
      { value: "25%", label: "Better server performance" },
    ],
    highlights: [
      "Three-tier RBAC with JWT across the platform",
      "Private S3 storage served only through pre-signed URLs",
      "Client-configurable IP whitelisting",
    ],
  },
  {
    slug: "aaizel-news-crawlers",
    title: "Real-time media monitoring for 60 government ministries",
    company: "Aaizel International Technologies",
    period: "Mar 2025 – Jul 2025",
    disciplines: ["data", "ai"],
    summary:
      "Built the crawlers, data pipelines and AI layer behind a media-monitoring platform for 60 ministries of the Government of India: 200+ newspapers, YouTube, Twitter/X and more, with speech-to-text, text-to-speech and prompt-engineered AI.",
    context:
      "At Aaizel I built the data and AI side of a media-monitoring platform used by 60 ministries of the Government of India, tracking coverage across print, video and social media.",
    challenge:
      "Every source publishes differently. Getting timely, searchable information meant collecting from hundreds of newspapers plus video and social platforms, each with its own format, and turning free-form content into consistent, structured records.",
    approach: [
      {
        title: "Crawl at scale",
        detail: "Developed intelligent crawlers covering 200+ Indian newspapers, YouTube videos, Twitter/X and other social platforms.",
      },
      {
        title: "Extract structure",
        detail: "Pulled structured data out of each article, video and post, so different sources land in one consistent shape.",
      },
      {
        title: "Pipeline every source",
        detail:
          "Built the data pipelines that carry output from all the crawlers through processing and into the platform, so every source flows through one consistent path.",
      },
      {
        title: "Add speech and AI",
        detail:
          "Built speech-to-text and text-to-speech APIs, and did the prompt engineering for the platform's AI features.",
      },
      {
        title: "Index in real time",
        detail: "Indexed new content as it was collected, making the latest coverage searchable straight away.",
      },
    ],
    architecture: [
      { label: "Sources", nodes: ["200+ newspapers", "YouTube", "Twitter / X", "Social platforms"] },
      { label: "Collection", nodes: ["Intelligent crawlers"] },
      { label: "Processing", nodes: ["Data pipelines", "Structured extraction"] },
      { label: "AI", nodes: ["Speech-to-Text", "Text-to-Speech", "Prompt engineering"] },
      { label: "Output", nodes: ["Real-time index"] },
    ],
    stack: [
      "Web crawlers",
      "Data pipelines",
      "Data extraction",
      "Speech-to-Text",
      "Text-to-Speech",
      "Prompt engineering",
      "Real-time indexing",
    ],
    metrics: [
      { value: "200+", label: "Newspapers monitored, plus video & social" },
      { value: "60", label: "Government ministries served" },
    ],
    highlights: [
      "Print, video and social sources normalised into one structured record format",
      "One pipeline layer shared by every crawler",
      "Speech-to-text and text-to-speech APIs, plus prompt engineering for the AI features",
      "New coverage indexed in real time",
    ],
  },
  {
    slug: "ironbook-voice-ai",
    title: "Voice AI: speech in, speech out",
    company: "Ironbook AI",
    period: "Aug 2025 – Present",
    disciplines: ["ai", "full-stack"],
    summary:
      "Engineered end-to-end voice capabilities, Speech-to-Text and voice-over, and managed the AI agent lifecycle on AWS SageMaker and Bedrock.",
    context:
      "Ironbook AI builds AI-powered products. As a full-stack developer and AIML engineer, I work across the whole path, from models to the interface users touch.",
    challenge:
      "Adding voice to an AI product means much more than calling a model. Speech has to become text, the AI has to respond, the response has to become natural speech again, and all of it has to be integrated, deployed and kept running.",
    approach: [
      {
        title: "Speech-to-Text",
        detail: "Integrated and deployed STT so spoken input becomes text the AI services can work with.",
      },
      {
        title: "Agent lifecycle",
        detail: "Managed AI agent lifecycles with AWS SageMaker and AWS Bedrock to build and deploy the models behind the experience.",
      },
      {
        title: "Voice-over",
        detail: "Delivered voice-over capabilities so responses can be played back as speech.",
      },
      {
        title: "End to end",
        detail: "Owned the full-stack integration and deployment, so the feature works as one product rather than disconnected parts.",
      },
    ],
    architecture: [
      { label: "Input", nodes: ["User speech"] },
      { label: "Understand", nodes: ["Speech-to-Text"] },
      { label: "Reason", nodes: ["AI agents", "SageMaker · Bedrock"] },
      { label: "Respond", nodes: ["Voice-over", "App UI"] },
    ],
    stack: ["Speech-to-Text", "Voice-over", "AWS SageMaker", "AWS Bedrock"],
    highlights: [
      "STT and voice-over shipped end to end, from integration to deployment",
      "AI agent lifecycle managed on SageMaker and Bedrock",
    ],
  },
  {
    slug: "ironbook-event-driven-cdp",
    title: "Event-driven customer data & martech platform",
    company: "Ironbook AI",
    period: "Aug 2025 – Present",
    disciplines: ["event-driven", "full-stack"],
    summary:
      "Built full-stack features for a Customer Data Platform and martech systems on an asynchronous pub/sub backbone with Kafka.",
    context:
      "Ironbook AI's products include Customer Data Platforms (CDP) and marketing-technology systems. I build features across the stack with React.js, Next.js, Python and Node.js, plus the high-performance landing pages in front of them.",
    challenge:
      "Customer and marketing data arrives in high volume. Handling it synchronously would couple services together and slow everything down, so the platform needed to absorb bursts and let consumers work independently.",
    approach: [
      {
        title: "Go asynchronous",
        detail: "Implemented scalable, event-driven systems using pub/sub architectures, so producers never wait on consumers.",
      },
      {
        title: "Kafka for volume",
        detail: "Used Kafka to carry high-volume data streams between services.",
      },
      {
        title: "Full-stack features",
        detail: "Built the CDP and martech features on top, with React.js and Next.js in front and Python and Node.js services behind.",
      },
      {
        title: "Fast front doors",
        detail: "Led the design and development of high-performance landing pages and interfaces for a seamless UX.",
      },
    ],
    architecture: [
      { label: "Producers", nodes: ["Product events", "Marketing touchpoints"] },
      { label: "Backbone", nodes: ["Kafka topics", "Pub/sub"] },
      { label: "Consumers", nodes: ["Python services", "Node.js services"] },
      { label: "Experience", nodes: ["CDP features", "Next.js UI"] },
    ],
    stack: ["Kafka", "Pub/sub", "React.js", "Next.js", "Python", "Node.js"],
    highlights: [
      "High-volume streams decoupled through Kafka pub/sub",
      "CDP and martech features built across the full stack",
      "High-performance landing pages and interfaces",
    ],
  },
  {
    slug: "ironbook-data-migration",
    title: "Large-scale data migration products",
    company: "Ironbook AI",
    period: "Aug 2025 – Present",
    disciplines: ["data", "devops"],
    summary:
      "Architected large-scale migration pipelines and automated workflows with ETL tooling and Argo Workflows on Kubernetes.",
    context:
      "Moving customer data between systems is a product in its own right at Ironbook AI. I architect the pipelines that do it.",
    challenge:
      "Large migrations are long-running, multi-step and failure-prone. They have to be repeatable, observable and automated rather than run by hand.",
    approach: [
      {
        title: "Pipelines, not scripts",
        detail: "Architected large-scale migration pipelines using ETL tools: extract from the source, transform, load into the target.",
      },
      {
        title: "Orchestrate on Kubernetes",
        detail: "Automated the workflows with Argo Workflows on Kubernetes, so each migration runs as a defined, repeatable sequence of steps.",
      },
    ],
    architecture: [
      { label: "Source", nodes: ["Source systems"] },
      { label: "Orchestration", nodes: ["Argo Workflows", "Kubernetes"] },
      { label: "ETL", nodes: ["Extract", "Transform", "Load"] },
      { label: "Destination", nodes: ["Target platform"] },
    ],
    stack: ["ETL", "Argo Workflows", "Kubernetes"],
    highlights: [
      "Migrations run as automated, repeatable workflows",
      "Orchestrated with Argo Workflows on Kubernetes",
    ],
  },
  // A "wedding ops" product case study belongs here once its details are provided.
  {
    slug: "ironbook-kubernetes-delivery",
    title: "CI/CD and production scaling on Kubernetes",
    company: "Ironbook AI",
    period: "Aug 2025 – Present",
    disciplines: ["devops"],
    summary: "Drove CI/CD pipeline development and production scaling on Kubernetes with Docker and AWS ECR.",
    context: "Ironbook AI's services, from AI agents to data pipelines, ship to Kubernetes. I drive how code gets there.",
    challenge: "Shipping AI and data services quickly and safely means every change has to follow the same path from commit to production, and scale once it's there.",
    approach: [
      {
        title: "Containerise",
        detail: "Packaged services as Docker images and stored them in AWS ECR.",
      },
      {
        title: "Automate delivery",
        detail: "Developed CI/CD pipelines so builds and releases happen the same way every time.",
      },
      {
        title: "Scale in production",
        detail: "Ran and scaled the services on Kubernetes in production.",
      },
    ],
    architecture: [
      { label: "Code", nodes: ["Git commit"] },
      { label: "Pipeline", nodes: ["CI/CD build"] },
      { label: "Registry", nodes: ["Docker image", "AWS ECR"] },
      { label: "Runtime", nodes: ["Kubernetes", "Production scaling"] },
    ],
    stack: ["Kubernetes", "Docker", "AWS ECR", "CI/CD"],
    highlights: ["One automated path from commit to production", "Production workloads scaled on Kubernetes"],
  },
  {
    slug: "floxify-zero-downtime-hosting",
    title: "Zero-downtime Next.js hosting on AWS",
    company: "Floxify (freelance)",
    period: "Jan 2025 – Feb 2025",
    disciplines: ["devops", "full-stack"],
    summary:
      "Deployed Next.js apps on AWS EC2 with Nginx, HTTPS, PM2 clustering and GitHub Actions for high availability and zero-downtime restarts.",
    context: "A freelance engagement to take Floxify's Next.js applications to production on AWS.",
    challenge:
      "The apps needed to be highly available, served securely across subdomains, and updated without taking the site down on every release.",
    approach: [
      {
        title: "Host on EC2",
        detail: "Deployed the Next.js apps on AWS EC2 with high availability and performance in mind.",
      },
      {
        title: "Nginx at the edge",
        detail: "Configured Nginx as a reverse proxy for subdomain management, HTTPS (SSL/TLS) enforcement and DNS routing.",
      },
      {
        title: "Zero-downtime restarts",
        detail: "Used PM2 process clustering for zero-downtime restarts and efficient resource use.",
      },
      {
        title: "Automate releases",
        detail: "Automated CI/CD with GitHub Actions and self-hosted runners.",
      },
      {
        title: "Harden",
        detail: "Applied security best practices: firewalls, IAM roles and performance monitoring.",
      },
    ],
    architecture: [
      { label: "Visitors", nodes: ["Browsers"] },
      { label: "Routing", nodes: ["DNS", "Nginx · SSL/TLS", "Subdomains"] },
      { label: "App", nodes: ["PM2 cluster", "Next.js on EC2"] },
      { label: "Delivery", nodes: ["GitHub Actions", "Self-hosted runner"] },
    ],
    stack: ["Next.js", "AWS EC2", "Nginx", "SSL/TLS", "PM2", "GitHub Actions", "IAM"],
    highlights: [
      "Zero-downtime restarts with PM2 clustering",
      "HTTPS enforced across subdomains via Nginx",
      "Automated deploys through GitHub Actions",
    ],
  },
  {
    slug: "epam-cloud-devops",
    title: "Cloud infrastructure & delivery pipelines",
    company: "EPAM Systems",
    period: "Jan 2023 – May 2023",
    disciplines: ["devops"],
    summary:
      "Managed AWS infrastructure, containerised applications onto Docker and Kubernetes, and set up Jenkins and GitLab pipelines that sped up delivery.",
    context: "My first engineering role: a Cloud & DevOps internship at EPAM Systems.",
    challenge: "Applications needed reliable, secure AWS infrastructure, faster deployments and pipelines that let teams ship without manual steps.",
    approach: [
      {
        title: "Run the AWS estate",
        detail: "Managed VPC, EC2, S3, Lambda and IAM roles for day-to-day cloud operations.",
      },
      {
        title: "Tune the network",
        detail: "Optimised ALB configurations, subnets and security groups for efficiency and security.",
      },
      {
        title: "Containerise",
        detail: "Integrated applications into Docker and Kubernetes environments, with troubleshooting and documentation to match.",
      },
      {
        title: "Measure",
        detail: "Led performance monitoring initiatives to find bottlenecks.",
      },
      {
        title: "Pipeline everything",
        detail: "Set up CI/CD pipelines with Jenkins and GitLab.",
      },
    ],
    architecture: [
      { label: "Source", nodes: ["GitLab"] },
      { label: "Delivery", nodes: ["Jenkins CI/CD"] },
      { label: "Runtime", nodes: ["Docker", "Kubernetes"] },
      { label: "AWS", nodes: ["VPC · subnets", "ALB · EC2", "S3 · Lambda · IAM"] },
    ],
    stack: ["AWS VPC", "EC2", "S3", "Lambda", "IAM", "ALB", "Docker", "Kubernetes", "Jenkins", "GitLab"],
    metrics: [
      { value: "40%", label: "Faster deployments after containerisation" },
      { value: "40%", label: "Better system efficiency from monitoring" },
      { value: "40–50%", label: "Faster software delivery with CI/CD" },
    ],
    highlights: ["Secured and optimised AWS networking", "Moved applications onto Docker and Kubernetes"],
  },
];

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((c) => c.slug);

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

export const getAllCaseStudies = () => CASE_STUDIES;

export const COMPANIES = [...new Set(CASE_STUDIES.map((c) => c.company))];
