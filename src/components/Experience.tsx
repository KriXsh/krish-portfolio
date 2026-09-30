"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { ArrowUpRight, Code, PieChart, ShieldCheck, Users, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useClientValue } from "@/lib/use-client-value";
import { cn } from "@/lib/utils";

const categoryStyles = {
  "gov-tech": { icon: ShieldCheck, label: "B2G / Gov-Tech", color: "96,165,250" },
  fintech: { icon: PieChart, label: "FinOps / Fintech", color: "52,211,153" },
  b2b: { icon: Zap, label: "B2B Enterprise", color: "251,191,36" },
  b2c: { icon: Users, label: "B2C Digital", color: "251,113,133" },
  "cloud-devops": { icon: Code, label: "Cloud & DevOps", color: "129,140,248" },
} as const;

type Category = keyof typeof categoryStyles;

type Role = { title: string; date: string; tenure: string; bullets: string[] };

type Job = {
  company: string;
  short: string;
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

const jobs: Job[] = [
  {
    company: "Ironbook AI",
    short: "Ironbook AI",
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

/** Oldest first: the journey reads left to right, ending at "Now". */
const journey = [...jobs].reverse();

const EASE = [0.16, 1, 0.3, 1] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Months since Jan 2023, the start of the axis. */
const toMonth = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return (y - 2023) * 12 + (m - 1);
};
const monthLabel = (month: number) => `${MONTHS[((month % 12) + 12) % 12]} ${2023 + Math.floor(month / 12)}`;

// "Now" is only known in the browser; the server renders a fixed stand-in.
const readNow = () => {
  const d = new Date();
  return (d.getFullYear() - 2023) * 12 + d.getMonth();
};

function JobDetails({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="grid gap-10 lg:grid-cols-12"
    >
      {/* Meta column */}
      <div className="space-y-7 lg:col-span-4">
        <div>
          <p className="font-mono text-xs tracking-widest text-subtle uppercase">
            {String(index + 1).padStart(2, "0")} / {String(journey.length).padStart(2, "0")} · {job.date}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight font-bold text-balance text-foreground md:text-4xl">{job.company}</h3>
          <p className="mt-2 text-sm font-medium text-glow">{job.tenure === "Current" ? "Current role" : `Tenure · ${job.tenure}`}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.categories.map((c) => {
            const { icon: Icon, label, color } = categoryStyles[c];
            return (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ color: `color-mix(in oklab, rgb(${color}) 55%, var(--color-foreground))`, background: `rgba(${color},0.08)`, boxShadow: `inset 0 0 0 1px rgba(${color},0.25)` }}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            );
          })}
        </div>

        {job.metrics && (
          <div className="grid grid-cols-2 gap-3">
            {job.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl p-4">
                <p className="font-display text-2xl font-bold text-gradient">{m.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <p className="mb-3 font-mono text-[11px] tracking-widest text-subtle uppercase">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {job.stack.map((s) => (
              <span key={s} className="rounded-md border border-border bg-ink/[0.02] px-2 py-1 font-mono text-[11px] text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className="space-y-6 lg:col-span-8">
        {job.roles.map((role) => (
          <div key={role.title} className="glass rounded-3xl p-6 md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-2 border-b border-border pb-5 md:flex-row md:items-end">
              <h4 className="font-display text-xl font-semibold text-foreground md:text-2xl">{role.title}</h4>
              {job.roles.length > 1 && (
                <span className="font-mono text-xs text-subtle">
                  {role.date} · {role.tenure}
                </span>
              )}
            </div>
            <ul className="space-y-4">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-cyan" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const INDUSTRIES: Category[] = ["gov-tech", "fintech", "b2b", "b2c"];

/** Which industries were delivered where. Rows are industries, columns are
    companies in journey order; Cloud & DevOps sits underneath as the practice
    that runs through all of them. */
function DomainMap({ onJump }: { onJump: (index: number) => void }) {
  const [row, setRow] = useState<Category | null>(null);
  const [col, setCol] = useState<number | null>(null);
  const rows: Category[] = [...INDUSTRIES, "cloud-devops"];
  const lit = (c: Category, i: number) => journey[i].categories.includes(c);

  return (
    <Reveal id="domains" className="mb-16 scroll-mt-28">
      <div className="rounded-[2rem] border border-border bg-surface/70 p-5 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] text-subtle uppercase">Domain map</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
              4 industries, <span className="text-gradient">5 teams.</span>
            </h3>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Where each domain was delivered.{" "}
            <span className="hidden md:inline">Hover to trace it, click a company to jump to the work.</span>
            <span className="md:hidden">Tap a company to jump to the work.</span>
          </p>
        </div>

        {/* Desktop: matrix */}
        <div className="hidden md:block" onPointerLeave={() => { setRow(null); setCol(null); }}>
          <div className="grid grid-cols-[minmax(11rem,1.2fr)_repeat(5,minmax(0,1fr))_4rem] items-center">
            <span />
            {journey.map((j, i) => (
              <button
                key={j.short}
                type="button"
                onClick={() => onJump(i)}
                onPointerEnter={() => { setCol(i); setRow(null); }}
                className={cn(
                  "rounded-xl px-2 py-3 text-center transition-colors",
                  col === i ? "bg-ink/[0.05] text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="block font-display text-sm font-semibold leading-tight">{j.short}</span>
                <span className="mt-1 block font-mono text-[10px] text-subtle">
                  {j.start.slice(0, 4)}
                  {j.end ? (j.end.slice(0, 4) !== j.start.slice(0, 4) ? `–${j.end.slice(2, 4)}` : "") : "–now"}
                </span>
              </button>
            ))}
            <span className="text-right font-mono text-[10px] text-subtle uppercase">Teams</span>

            {rows.map((c) => {
              const { icon: Icon, label, color } = categoryStyles[c];
              const count = journey.filter((_, i) => lit(c, i)).length;
              const practice = c === "cloud-devops";
              return (
                <div
                  key={c}
                  onPointerEnter={() => { setRow(c); setCol(null); }}
                  className={cn(
                    "col-span-7 grid grid-cols-subgrid items-center rounded-2xl transition-colors",
                    practice && "mt-3 border-t border-dashed border-border pt-3",
                    row === c && "bg-ink/[0.03]",
                  )}
                >
                  <span className="flex items-center gap-3 px-3 py-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ color: `color-mix(in oklab, rgb(${color}) 55%, var(--color-foreground))`, background: `rgba(${color},0.1)`, boxShadow: `inset 0 0 0 1px rgba(${color},0.25)` }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{label}</span>
                      {practice && <span className="block text-[11px] text-subtle">Practice across every team</span>}
                    </span>
                  </span>
                  {journey.map((j, i) => {
                    const on = lit(c, i);
                    const focus = (row === c || col === i) && on;
                    const dim = (row !== null && row !== c) || (col !== null && col !== i);
                    return (
                      <button
                        key={j.short}
                        type="button"
                        disabled={!on}
                        onClick={() => onJump(i)}
                        aria-label={on ? `${label} at ${j.company}` : `${j.company}: not ${label}`}
                        className="flex h-full items-center justify-center py-3 disabled:cursor-default"
                      >
                        {on ? (
                          <motion.span
                            animate={{ scale: focus ? 1.35 : 1, opacity: dim ? 0.35 : 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 22 }}
                            className="h-3.5 w-3.5 rounded-full"
                            style={{
                              background: `rgb(${color})`,
                              boxShadow: focus ? `0 0 18px 4px rgba(${color},0.55)` : `0 0 8px rgba(${color},0.35)`,
                            }}
                          />
                        ) : (
                          <span className={cn("h-px w-3 bg-ink/10 transition-opacity", dim && "opacity-40")} />
                        )}
                      </button>
                    );
                  })}
                  <span className="pr-3 text-right font-mono text-sm text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: one card per industry */}
        <div className="grid gap-3 md:hidden">
          {rows.map((c) => {
            const { icon: Icon, label, color } = categoryStyles[c];
            return (
              <div key={c} className="rounded-2xl border border-border bg-background/40 p-4">
                <div className="mb-3 flex items-center gap-2.5">
                  <Icon className="h-4 w-4" style={{ color: `color-mix(in oklab, rgb(${color}) 55%, var(--color-foreground))` }} />
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                  {c === "cloud-devops" && <span className="text-[11px] text-subtle">· every team</span>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {journey.map((j, i) =>
                    lit(c, i) ? (
                      <button
                        key={j.short}
                        type="button"
                        onClick={() => onJump(i)}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ color: `color-mix(in oklab, rgb(${color}) 55%, var(--color-foreground))`, background: `rgba(${color},0.08)`, boxShadow: `inset 0 0 0 1px rgba(${color},0.25)` }}
                      >
                        {j.short}
                      </button>
                    ) : null,
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const lenis = useLenis();
  const container = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLElement | null)[]>([]);
  const now = useClientValue(readNow, toMonth("2026-09"));
  const [stops, setStops] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const [month, setMonth] = useState(0);

  // Where each entry starts, as a fraction of the list's height. Scroll progress
  // is mapped through these so the marker is on a job's dates exactly while
  // that job is being read, however long its entry is.
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight || 1;
      setStops(entryRefs.current.map((n) => (n ? n.offsetTop / h : 0)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: container, offset: ["start 55%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });

  const input = stops.length ? [...stops, 1] : [0, 1];
  const output = stops.length
    ? [...journey.map((j) => toMonth(j.start)), now]
    : [0, now];
  const monthMV = useTransform(smooth, input, output, { clamp: true });
  const fill = useTransform(monthMV, (m) => `${(m / now) * 100}%`);

  useMotionValueEvent(monthMV, "change", (m) => {
    const whole = Math.floor(m);
    setMonth((prev) => (prev === whole ? prev : whole));
    let idx = 0;
    journey.forEach((j, i) => {
      if (m >= toMonth(j.start) - 0.001) idx = i;
    });
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const pct = (m: number) => `${(m / now) * 100}%`;
  const years = [2023, 2024, 2025, 2026].filter((y) => (y - 2023) * 12 <= now);
  const current = journey[active];

  const jumpTo = (i: number) => {
    const el = entryRefs.current[i];
    if (!el) return;
    // Lenis honours the entry's scroll-margin (scroll-mt-60), which clears the sticky bar.
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="py-28 md:py-36">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve <span className="text-gradient">built things.</span>
          </>
        }
        description="From a cloud internship in 2023 to building AI platforms today. Scroll to travel the journey."
      />

      <Link
        href="/case-studies"
        className="group -mt-8 mb-14 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong md:-mt-12"
      >
        Read the case studies: how the work actually got done
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      <DomainMap onJump={jumpTo} />

      {/* Sticky journey bar */}
      <div className="sticky top-20 z-30 mb-14 md:top-24">
        <div className="rounded-3xl border border-border bg-surface/95 px-5 backdrop-blur-xl pt-4 pb-3 shadow-[0_20px_60px_-24px_var(--color-shadow)] md:px-7 md:pt-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              <div className="relative h-6 min-w-0 flex-1 overflow-hidden">
                <motion.p
                  key={current.short}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="truncate font-display text-base font-semibold text-foreground md:text-lg"
                >
                  {current.short}
                  <span className="ml-2 hidden font-sans text-sm font-normal text-muted-foreground sm:inline">
                    {current.roles[0].title}
                  </span>
                </motion.p>
              </div>
            </div>
            <p className="shrink-0 font-mono text-xs tracking-widest text-glow uppercase tabular-nums">
              {month >= now - 0.5 ? "Now" : monthLabel(month)}
            </p>
          </div>

          {/* Track */}
          <div className="relative h-8">
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink/[0.06]" />
            {journey.map((j, i) => {
              const s = toMonth(j.start);
              const e = j.end ? toMonth(j.end) + 1 : now;
              return (
                <button
                  key={j.short}
                  type="button"
                  aria-label={`Jump to ${j.company}`}
                  onClick={() => jumpTo(i)}
                  className="group absolute top-1/2 h-6 -translate-y-1/2 cursor-pointer"
                  style={{ left: pct(s), width: pct(e - s) }}
                >
                  <span
                    className={cn(
                      "absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full transition-all duration-500",
                      i === active ? "h-1.5 bg-ink/25" : "bg-ink/10 group-hover:bg-ink/20",
                    )}
                  />
                </button>
              );
            })}
            <motion.div
              style={{ width: fill }}
              className="pointer-events-none absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary via-violet to-cyan shadow-[0_0_16px_rgba(99,102,241,0.7)]"
            />
            {journey.map((j, i) => (
              <span
                key={`${j.short}-node`}
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500",
                  i <= active ? "border-ink/80 bg-violet" : "border-ink/25 bg-surface",
                )}
                style={{ left: pct(toMonth(j.start)) }}
              />
            ))}
            <motion.div style={{ left: fill }} className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="block h-4 w-4 rounded-full border-2 border-white bg-cyan shadow-[0_0_20px_4px_rgba(6,182,212,0.6)]" />
            </motion.div>
          </div>

          {/* Year ticks */}
          <div className="relative mt-1 h-5 font-mono text-[10px] text-subtle">
            {years.map((y) => (
              <span key={y} className="absolute -translate-x-1/2 first:translate-x-0" style={{ left: pct((y - 2023) * 12) }}>
                {y}
              </span>
            ))}
            <span className="absolute right-0 text-glow">Now</span>
          </div>
        </div>
      </div>

      {/* The journey itself */}
      <div ref={container} className="relative">
        <div aria-hidden className="absolute top-0 bottom-0 left-[7px] hidden w-px bg-border md:block" />
        <motion.div
          aria-hidden
          style={{ scaleY: smooth }}
          className="absolute top-0 bottom-0 left-[7px] hidden w-px origin-top bg-gradient-to-b from-primary via-violet to-cyan md:block"
        />
        {journey.map((job, i) => (
          <section
            key={job.company}
            ref={(n) => {
              entryRefs.current[i] = n;
            }}
            className="relative scroll-mt-60 pb-24 last:pb-0 md:pl-14"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-2 left-0 hidden h-[15px] w-[15px] rounded-full border-2 transition-all duration-500 md:block",
                i <= active ? "border-cyan bg-cyan shadow-[0_0_14px_3px_rgba(6,182,212,0.5)]" : "border-border-strong bg-background",
              )}
            />
            <Reveal>
              <p
                aria-hidden
                className={cn(
                  "mb-6 font-display text-5xl font-bold tracking-tight transition-colors duration-500 md:text-7xl",
                  // Outlined, not faded fill: decorative, and never a low-contrast block of text.
                  "text-transparent",
                  i === active
                    ? "[-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--color-glow)_55%,transparent)]"
                    : "[-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--color-ink)_16%,transparent)]",
                )}
              >
                {job.start.slice(0, 4)}
                {job.end && job.end.slice(0, 4) !== job.start.slice(0, 4) ? ` — ${job.end.slice(0, 4)}` : ""}
                {!job.end ? " — Now" : ""}
              </p>
              <JobDetails job={job} index={i} />
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  );
}
