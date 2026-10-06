// What KAI, the chat assistant, knows about Krish beyond the structured content
// (experience, case studies, projects, blog, testimonials). Plain data only.
//
// Only put facts here you're happy to publish: KAI repeats them to anyone.
// Things deliberately left out (ask before adding): location, salary, notice
// period, personal details. KAI says "I don't know" for anything not written here.

import { LEETCODE_URL, RESUME_URL } from "@/lib/site";

export const PROFILE = {
  name: "Krishnendu Ghosal",
  nickname: "Krish",
  headline: "Software engineer: Full-Stack, AI/ML and Cloud & DevOps",
  summary:
    "Krish is a software engineer who architects AI-powered platforms, event-driven data pipelines and cloud infrastructure built to scale. He has delivered across gov-tech (B2G), fintech, B2B enterprise and B2C products, and has been working professionally since January 2023. He is currently a Full-stack Developer & AIML Engineer at Ironbook AI.",
  story:
    "His journey began with a curiosity about how systems work and grew into a passion for building them. He is driven by solving complex problems, optimising performance, and technology that genuinely improves people's lives.",
  quote: "Code is poetry, systems are symphonies, and great software is the intersection of engineering excellence and user delight.",
  values: ["Innovation", "Quality", "Scalability", "User-Centric"],
  strengths: [
    "Full-Stack Architect: end-to-end products from React/Next.js frontends to scalable Node.js and Python backends.",
    "AI/ML Engineer: intelligent systems with LLMs, RAG architectures, agents and ML pipelines on SageMaker & Bedrock.",
    "Cloud & DevOps: shipping on AWS, orchestrating with Kubernetes and automating CI/CD from commit to production.",
    "System Designer: high-throughput, fault-tolerant, event-driven systems built for enterprise scale.",
  ],
  availability:
    "Open to remote roles and new projects. For freelance work he takes project-based or part-time engagements of around 20 hours/week, from quick MVP launches to long-term engineering support, at competitive project rates. He is payroll ready.",
  contact: {
    email: "krishnendughosal999@gmail.com",
    linkedin: "https://linkedin.com/in/krish-me",
    github: "https://github.com/KriXsh",
    leetcode: LEETCODE_URL,
    resume: RESUME_URL,
    form: "/#contact",
  },
};

export const SKILLS: Record<string, string[]> = {
  "Web": ["Next.js", "React.js", "TypeScript", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap", "Selenium"],
  "AI & ML": ["LLMs (Gemini, GPT-4)", "Vector databases", "LangChain & agents", "Hugging Face", "RAG architecture", "PyTorch / TensorFlow", "AWS SageMaker", "AWS Bedrock"],
  "Cloud & DevOps": ["AWS", "Kubernetes", "Docker", "Jenkins", "GitHub Actions", "GitLab CI", "Nginx", "Elastic Cloud", "PM2", "Argo Workflows", "Kafka"],
  "Databases": ["MongoDB", "Redis", "PostgreSQL", "Elasticsearch"],
  "Languages & OS": ["Python", "JavaScript", "TypeScript", "Java", "Bash", "Ubuntu", "macOS"],
};

export const EDUCATION = [
  { institution: "Lovely Professional University", degree: "B.Tech in Computer Science & Engineering", period: "2019 – 2023", grade: "7.0 CGPA" },
  { institution: "Kenduadihi Boys' High School", degree: "Higher Secondary (Science)", period: "2017 – 2019", grade: "78%" },
];

export const CERTIFICATIONS = [
  "Claude Certified Associate – Foundations (Anthropic), verifiable on Credly",
  "Jumpstart – Competitive Coding award (PublicSapients)",
  "Java Foundations (HackerRank)",
  "Artificial Intelligence Fundamentals (Invincible Ocean)",
  "OOP Using Python (E-Box)",
  "Website Hacking / Penetration Testing (Udemy)",
];

export const SERVICES = [
  { title: "Full-Stack MVPs", detail: "Rapidly turning business ideas into scalable, production-ready 0-to-1 products.", stack: ["Next.js/React", "Node.js/Python", "DB architecture"] },
  { title: "AI Integration", detail: "Embedding LLMs, RAG and autonomous agents into existing business workflows.", stack: ["AWS Bedrock", "LangChain", "Vector DBs"] },
  { title: "Cloud & DevOps", detail: "Optimising infrastructure for performance, security and cost efficiency (FinOps).", stack: ["AWS/K8s", "CI/CD setup", "System scaling"] },
  { title: "System Design", detail: "Architecting secure, high-throughput backend systems for B2B and B2G domains.", stack: ["API design", "Microservices", "Security audit"] },
];

/** The case for hiring Krish, built only from facts on the site. */
export const PITCH =
  "Krish brings a rare full-stack, AI and DevOps mix to one role: he has shipped production systems end to end across gov-tech, fintech, B2B and B2C. Highlights: **350+ APIs** and a **40% faster** data layer for fintech products at Invincible Ocean, crawlers and AI pipelines monitoring **200+ newspapers for 60 government ministries** at Aaizel, and voice AI, Kafka-based event-driven systems and Kubernetes delivery at Ironbook AI. He owns problems from architecture through CI/CD and production, and colleagues' LinkedIn recommendations highlight his performance work and reliability.";

/** Direct answers. Also the backup mode's best matches, so write them in full sentences. */
export const FAQ: { q: string; a: string; keywords?: string[]; href?: string }[] = [
  {
    q: "Why should I hire Krish?",
    a: PITCH,
    keywords: ["stand", "unique", "different", "choose", "pick", "strengths", "value", "best", "convince", "advantage"],
    href: "/case-studies",
  },
  {
    q: "Who is Krish?",
    a: "Krish (Krishnendu Ghosal) is a software engineer working across full-stack, AI/ML and cloud & DevOps. He builds AI-powered platforms, event-driven data pipelines and cloud infrastructure, and is currently a Full-stack Developer & AIML Engineer at Ironbook AI.",
    keywords: ["about", "introduce", "yourself", "krishnendu", "summary", "who"],
    href: "/#whoami",
  },
  {
    q: "Is Krish available for work?",
    a: "Yes. Krish is open to remote roles and new projects. For freelance work he takes project-based or part-time engagements (around 20 hours/week), from a quick MVP to long-term engineering support. The services page has the details, or you can reach him through the contact form.",
    keywords: ["available", "availability", "hire", "hiring", "freelance", "open", "remote", "job", "role", "opportunity", "contract", "part-time"],
    href: "/services",
  },
  {
    q: "How can I contact Krish?",
    a: "The quickest way is the contact form at the bottom of the home page. You can also email krishnendughosal999@gmail.com or message him on LinkedIn (linkedin.com/in/krish-me).",
    keywords: ["contact", "email", "reach", "message", "talk", "connect", "linkedin", "call"],
    href: "/#contact",
  },
  {
    q: "Where can I see Krish's resume?",
    a: `You can view his resume here: ${RESUME_URL}. There's also a preview in the Resume section of the home page.`,
    keywords: ["resume", "cv", "download"],
    href: "/#resume",
  },
  {
    q: "What does Krish charge?",
    a: "Rates depend on the scope and the type of engagement. He offers competitive project rates. Share a few details about your project through the contact form and he'll get back to you.",
    keywords: ["rate", "rates", "price", "pricing", "cost", "charge", "budget", "fee", "hourly"],
    href: "/#contact",
  },
  {
    q: "What does Krish specialise in?",
    a: "Four areas: full-stack products (React/Next.js with Node.js and Python backends), AI/ML (LLMs, RAG, agents, SageMaker and Bedrock), cloud & DevOps (AWS, Kubernetes, CI/CD) and system design for high-throughput, event-driven systems.",
    keywords: ["specialise", "specialize", "expertise", "good", "strengths", "focus", "do"],
    href: "/#skills",
  },
  {
    q: "Where does Krish work now?",
    a: "Since August 2025 he has been a Full-stack Developer & AIML Engineer at Ironbook AI, working on voice AI (speech-to-text and voice-over), an event-driven customer data platform on Kafka, large data migrations with Argo Workflows, and CI/CD and scaling on Kubernetes.",
    keywords: ["current", "currently", "now", "ironbook", "company", "employer"],
    href: "/#experience",
  },
];
