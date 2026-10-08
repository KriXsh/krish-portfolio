"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Globe, Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { cn } from "@/lib/utils";

type Project = (typeof PROJECTS)[number];

/** The home page shows a short list. Weather-App stays on /projects only: its demo
    sits on a free host that cold-starts slowly, so it made a poor first click here. */
const HOME_HIDDEN = new Set(["Weather-App"]);
const HOME_PROJECTS = PROJECTS.filter((p) => !HOME_HIDDEN.has(p.title));

const ease = [0.16, 1, 0.3, 1] as const;
const SPIRAL = "M0 -4c4-2 8 1.4 6 5.4-2 4.6-9.4 4.6-11.4-.6-2.6-6 3.4-12 10-10.6 8 1.4 12 10 8 17.4-4.6 8-16.6 9.4-23.4 2.6";

/** The bud on the stem: a closed rose that spirals open and blushes the first
    time its project scrolls into view. */
function Bud({ className = "h-10 w-10 md:h-14 md:w-14" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });
  const reduced = useReducedMotion();
  const open = reduced || inView;

  return (
    <svg ref={ref} viewBox="-30 -30 60 60" aria-hidden className={cn("overflow-visible", className)}>
      <defs>
        <radialGradient id="bud-fill" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#4a74c4" />
          <stop offset="60%" stopColor="#1d3766" />
          <stop offset="100%" stopColor="#0a1428" />
        </radialGradient>
      </defs>
      <motion.circle
        r="22"
        fill="rgba(74,116,196,0.18)"
        initial={false}
        animate={{ scale: open ? 1.25 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 1.2, ease }}
      />
      <motion.circle
        r="15"
        fill="url(#bud-fill)"
        stroke="#8fb3e8"
        strokeOpacity="0.6"
        initial={false}
        animate={{ scale: open ? 1 : 0.45 }}
        transition={{ duration: 0.9, ease }}
      />
      <motion.path
        d={SPIRAL}
        stroke="#c4d5ef"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: open ? 1 : 0, rotate: open ? 0 : -120 }}
        transition={{ duration: 1.1, ease, delay: 0.15 }}
      />
    </svg>
  );
}

/** Screenshot in an arched window, drifting a little slower than the page,
    toned navy until hovered. */
function ArchImage({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
      className="group/img relative block aspect-[16/11] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] border border-border md:aspect-[4/5]"
    >
      <motion.div style={reduced ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 768px) 38vw, 85vw"
          className="object-cover brightness-90 contrast-[1.08] grayscale transition-[transform,filter] duration-[1.2s] ease-out-expo group-hover/img:scale-105 group-hover/img:brightness-100 group-hover/img:grayscale-0"
        />
      </motion.div>
      {/* Wine duotone: stock photos take on the site's colours, then bloom
          back to full colour on hover. */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#4a74c4,#13264a)] mix-blend-color transition-opacity duration-[1.2s] group-hover/img:opacity-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,18,34,0.85),rgba(19,38,74,0.25)_45%,transparent_75%)]" />
      <span className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5 text-xs tracking-[0.2em] text-champagne uppercase opacity-0 transition-opacity duration-500 group-hover/img:opacity-100">
        Visit <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </a>
  );
}

/** One project on the stem: the bud on the line, the story on one side and the
    arched screenshot on the other (alternating on desktop, stacked on phones). */
function ProjectBloom({ project, i, total }: { project: Project; i: number; total: number }) {
  const flip = i % 2 === 1;
  const reduced = useReducedMotion();
  const enter = (dx: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x: dx, y: 24 },
          whileInView: { opacity: 1, x: 0, y: 0 },
          viewport: { once: true, margin: "0px 0px -20% 0px" },
          transition: { duration: 1, ease },
        };

  const story = (
    <motion.div {...enter(flip ? 40 : -40)} className={cn("flex flex-col", flip ? "md:pl-4" : "md:pr-4 md:text-right md:items-end")}>
      <p className="flex items-baseline gap-3 font-mono text-xs text-subtle">
        <span className="font-script text-3xl text-rose normal-case">No. {String(i + 1).padStart(2, "0")}</span>
        <span>/ {String(total).padStart(2, "0")}</span>
        <span className="text-champagne/70">· {project.date}</span>
      </p>
      <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1] text-foreground">{project.title}</h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{project.description}</p>
      <div className={cn("mt-6 flex flex-wrap gap-2", !flip && "md:justify-end")}>
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      <div className={cn("mt-8 flex flex-wrap gap-3", !flip && "md:justify-end")}>
        {project.tryHref && (
          <Link
            href={project.tryHref}
            className="group/try relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-rose to-primary bg-[length:200%_auto] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(42,79,143,0.8)] transition-[background-position,transform] duration-700 hover:scale-[1.03] hover:bg-[position:100%_center]"
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
              ? "inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-rose/50"
              : "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          }
        >
          {project.type === "GitHub" ? <Github className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
          {project.type}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );

  const image = (
    <motion.div {...enter(flip ? -40 : 40)} className="mx-auto w-full max-w-md md:max-w-sm">
      <ArchImage project={project} />
    </motion.div>
  );

  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-8 md:grid-cols-[1fr_5rem_1fr] md:items-center md:gap-x-6">
      <div className="col-start-1 row-span-2 flex justify-center pt-1 md:col-start-2 md:row-span-1 md:row-start-1 md:pt-0">
        <Bud />
      </div>
      <div className={cn("col-start-2 md:row-start-1", flip ? "md:col-start-3" : "md:col-start-1")}>{story}</div>
      <div className={cn("col-start-2 md:row-start-1", flip ? "md:col-start-1" : "md:col-start-3")}>{image}</div>
    </li>
  );
}

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start 75%", "end 60%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="pt-28 md:pt-36">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title={
          <>
            Featured <span className="text-gradient">projects.</span>
          </>
        }
        description="A few favourites, from AI-powered products to algorithm visualizers. Everything else lives on the projects page."
      />

      <div ref={container} className="relative">
        {/* The stem: grows down the page as you scroll, buds open as you reach them. */}
        <svg
          viewBox="0 0 40 1000"
          preserveAspectRatio="none"
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-0 h-full w-10 md:left-1/2 md:w-20 md:-translate-x-1/2"
        >
          <path d="M20 0C26 80 14 160 20 250S26 420 20 500 14 660 20 750 26 920 20 1000" stroke="var(--color-border-strong)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          <motion.path
            d="M20 0C26 80 14 160 20 250S26 420 20 500 14 660 20 750 26 920 20 1000"
            stroke="url(#stem-grad)"
            strokeWidth="1.6"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={reduced ? undefined : { pathLength: grow }}
          />
          <defs>
            <linearGradient id="stem-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-champagne)" />
              <stop offset="100%" stopColor="var(--color-rose)" />
            </linearGradient>
          </defs>
        </svg>

        <ol className="relative space-y-24 md:space-y-32">
          {HOME_PROJECTS.map((p, i) => (
            <ProjectBloom key={p.title} project={p} i={i} total={HOME_PROJECTS.length} />
          ))}
        </ol>

        {/* The stem ends in one last, larger bloom. */}
        <div className="relative mt-24 grid grid-cols-[2.5rem_1fr] gap-x-4 md:mt-32 md:grid-cols-[1fr_5rem_1fr] md:gap-x-6">
          <div className="col-start-1 flex justify-center md:col-start-2">
            <Bud className="h-14 w-14 md:h-24 md:w-24" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease }}
        className="mt-8 flex flex-col items-start gap-4 pl-14 md:items-center md:pl-0 md:text-center"
      >
        <p className="font-script text-3xl text-rose md:text-5xl">…and the garden keeps growing</p>
        <p className="max-w-md text-muted-foreground">
          Every repo, live demo and commit, plus the visualizers you can play with right here.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3 md:justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-rose to-primary bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(42,79,143,0.8)] transition-[background-position] duration-700 hover:bg-[position:100%_center]"
          >
            See every repo, demo &amp; commit
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
          <a
            href="https://github.com/KriXsh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-rose/50 hover:text-foreground"
          >
            <Github className="h-4 w-4" /> github.com/KriXsh
          </a>
        </div>
      </motion.div>
    </div>
  );
}
