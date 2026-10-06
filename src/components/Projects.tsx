"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Globe, Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import Image from "next/image";
import Link from "next/link";
import { FloatingCta } from "@/components/ui/floating-cta";
import { PROJECTS } from "@/content/projects";

type Project = (typeof PROJECTS)[number];

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
        index="04"
        eyebrow="Selected Work"
        title={
          <>
            Featured <span className="text-gradient">projects.</span>
          </>
        }
        description="A few favourites, from AI-powered products to algorithm visualizers. Everything else lives on the projects page."
      />

      <div ref={container} className="relative">
        {PROJECTS.map((p, i) => (
          <StackCard key={p.title} project={p} i={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>

      <FloatingCta
        className="mt-16"
        href="/projects"
        eyebrow="Every repo, demo & commit"
        title={<>Hungry for more <span className="text-gradient">project stories?</span></>}
        cta="See all projects & activity"
        chips={["Public repos", "Live demos", "Visualizers", "Commit history"]}
        aside={
          <a
            href="https://github.com/KriXsh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" /> github.com/KriXsh
          </a>
        }
      />
    </div>
  );
}
