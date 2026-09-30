"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Globe, Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";

// Homepage showcase, hand-picked. Everything else is on /projects.
const projects = [
  {
    title: "StockX AI Portal",
    date: "Live",
    description:
      "A professional stock research platform with live pricing, AI-generated market recaps, news with AI sentiment, advanced charting, earnings analysis and watchlists, all in one unified portal.",
    tech: ["Next.js", "AI Recaps", "AI Sentiment", "Live Market Data", "Vercel"],
    link: "https://stock-x-ai.vercel.app/",
    type: "Live Demo",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80&auto=format&fit=crop",
    tint: "from-emerald-400/40",
  },
  {
    title: "LMS Portal",
    date: "Live",
    description:
      "A hybrid online-learning portal: a production-level EdTech platform for courses and learners, built on the modern Next.js stack with TypeScript, Tailwind CSS and MongoDB.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "MongoDB"],
    link: "https://lms-ed-teach-eight.vercel.app/",
    type: "Live Demo",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&auto=format&fit=crop",
    tint: "from-cyan/40",
  },
  {
    title: "Pathfinding Visualizer",
    date: "June 2022 - Dec 2022",
    description:
      "An interactive visualizer for Dijkstra, A*, BFS and DFS. Draw walls and weighted terrain, generate mazes, and watch each search explore the grid node by node, then drag the start or target to re-route live.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://pathfinding-visualizer-theta-puce.vercel.app/",
    type: "Live Demo",
    // Native, on-site version of the visualizer.
    tryHref: "/projects/pathfinding",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1400&q=80&auto=format&fit=crop",
    tint: "from-primary/40",
  },
  {
    title: "SortFusion",
    date: "Live",
    description:
      "An interactive visualizer for eight sorting algorithms, from Bubble to Quick, Merge and Heap sort. Step through every compare and swap, scrub the timeline, follow the highlighted pseudocode, or sort your own numbers.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://sort-fusion-ui.vercel.app/",
    type: "Live Demo",
    // Native, on-site version of the visualizer.
    tryHref: "/projects/sorting",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
    tint: "from-violet/40",
  },
  {
    title: "Weather-App",
    date: "June 2022 - July 2022",
    description:
      "A full-stack weather forecasting tool providing real-time updates on temperature, precipitation, and wind speed. Features hourly and weekly forecasts via API integration.",
    tech: ["Node.js", "Express.js", "React.js", "HBS", "CSS"],
    link: "https://weather-app-krish.onrender.com/",
    type: "Live Demo",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1400&q=80&auto=format&fit=crop",
    tint: "from-sky-400/40",
  },
  {
    title: "Car Rental System",
    date: "Aug 2024",
    description:
      "A robust Java-based application designed to manage car inventories, customer records, and rental transactions. Handles core functionalities like booking, availability checks, and returns.",
    tech: ["Java", "OOPs", "Car Inventory Management"],
    link: "https://github.com/KriXsh/Car-rental-system-Java",
    type: "GitHub",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80&auto=format&fit=crop",
    tint: "from-violet/40",
  },
];

type Project = (typeof projects)[number];

/** One card in the sticky stack. As the cards after it slide over, it recedes:
    scales down, tips back in 3D and dims. */
function StackCard({
  project,
  i,
  total,
  progress,
}: {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = i / total;
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const rotateX = useTransform(progress, [start, 1], [0, i === total - 1 ? 0 : 8]);
  const dim = useTransform(progress, [start, 1], [0, i === total - 1 ? 0 : 0.55]);

  return (
    <div className="pointer-events-none sticky top-0 flex h-screen items-start justify-center [perspective:1400px]">
      <motion.article
        style={{ scale, rotateX, top: `calc(10vh + ${i * 24}px)`, transformOrigin: "top center" }}
        className="group pointer-events-auto relative w-full overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_40px_120px_-40px_var(--color-shadow)]"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative flex flex-col p-8 md:p-12">
            <div className="mb-10 flex items-center justify-between font-mono text-xs text-subtle">
              <span>
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span>{project.date}</span>
            </div>
            <h3 className="font-display text-display-md font-bold text-foreground">{project.title}</h3>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3 md:mt-auto md:pt-10">
              {project.tryHref && (
                <Link
                  href={project.tryHref}
                  className="group/try relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-violet to-cyan px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(99,102,241,0.8)] transition-transform hover:scale-[1.03]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Try it out
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/try:translate-x-0.5" />
                </Link>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  project.tryHref
                    ? "inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
                    : "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                }
              >
                {project.type === "GitHub" ? <Github className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                {project.type}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="relative hidden min-h-[420px] overflow-hidden md:block"
          >
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-tr ${project.tint} via-transparent to-transparent mix-blend-overlay`} />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/20 to-transparent" />
          </a>
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-background" />
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <div className="pt-28 md:pt-36">
      <SectionHeading
        index="05"
        eyebrow="Selected Work"
        title={
          <>
            Featured <span className="text-gradient">projects.</span>
          </>
        }
        description="A few favourites, from AI-powered products to algorithm visualizers. Everything else lives on the projects page."
      />

      <div ref={container} className="relative">
        {projects.map((p, i) => (
          <StackCard key={p.title} project={p} i={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 py-16 text-center md:py-24">
          <div aria-hidden className="absolute inset-0 grid-lines opacity-60 mask-fade-b" />
          <div aria-hidden className="absolute top-full left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative">
            <h3 className="font-display text-display-md font-bold text-foreground">
              Hungry for more <span className="text-gradient">project stories?</span>
            </h3>
            <p className="mx-auto mt-5 mb-10 max-w-2xl text-muted-foreground md:text-lg">
              I&apos;m constantly building, experimenting, and breaking things. See every public repo, live demos you can
              try in the browser, and my GitHub contribution history in one place.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background"
                >
                  See all projects &amp; activity
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <a
                href="https://github.com/KriXsh"
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-foreground"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
