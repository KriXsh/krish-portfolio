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
import { JOBS, type Category, type Job } from "@/content/experience";

const categoryStyles = {
  "gov-tech": { icon: ShieldCheck, label: "B2G / Gov-Tech", color: "214,164,120" },
  fintech: { icon: PieChart, label: "FinOps / Fintech", color: "168,186,150" },
  b2b: { icon: Zap, label: "B2B Enterprise", color: "232,190,120" },
  b2c: { icon: Users, label: "B2C Digital", color: "232,140,150" },
  "cloud-devops": { icon: Code, label: "Cloud & DevOps", color: "200,150,190" },
} as const satisfies Record<Category, unknown>;

/** Oldest first: the journey reads left to right, ending at "Now". */
const journey = [...JOBS].reverse();

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
          <h3 className="mt-3 font-display text-3xl leading-tight font-normal text-balance text-foreground md:text-4xl">{job.company}</h3>
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
                <p className="font-display text-2xl font-normal text-gradient">{m.value}</p>
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
              <h4 className="font-display text-xl font-medium text-foreground md:text-2xl">{role.title}</h4>
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
        index="02"
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

      {/* Sticky journey bar */}
      <div className="sticky top-20 z-30 mb-14 md:top-24">
        <div className="rounded-3xl border border-border bg-surface/95 px-5 pt-4 pb-3 shadow-[0_20px_60px_-24px_var(--color-shadow)] md:px-7 md:pt-5">
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
                  className="truncate font-display text-base font-medium text-foreground md:text-lg"
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
              className="pointer-events-none absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary via-violet to-cyan shadow-[0_0_16px_rgba(42,79,143,0.7)]"
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
              <span className="block h-4 w-4 rounded-full border-2 border-white bg-cyan shadow-[0_0_20px_4px_rgba(217,167,127,0.6)]" />
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
            id={job.id}
            ref={(n) => {
              entryRefs.current[i] = n;
            }}
            className="relative scroll-mt-60 pb-24 last:pb-0 md:pl-14"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-2 left-0 hidden h-[15px] w-[15px] rounded-full border-2 transition-all duration-500 md:block",
                i <= active ? "border-cyan bg-cyan shadow-[0_0_14px_3px_rgba(217,167,127,0.5)]" : "border-border-strong bg-background",
              )}
            />
            <Reveal>
              <p
                aria-hidden
                className={cn(
                  "mb-6 font-display text-5xl font-normal tracking-tight transition-colors duration-500 md:text-7xl",
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
