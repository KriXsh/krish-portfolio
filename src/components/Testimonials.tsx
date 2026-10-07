"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { SectionHeading } from "@/components/ui/section-heading";
import { Petals } from "@/components/ui/petals";
import { LINKEDIN_RECOMMENDATIONS_URL, TESTIMONIALS } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const SPOTLIGHT = TESTIMONIALS.filter((t) => t.highlight);

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

/** Homepage recommendations as a spotlight: one person's strongest line at a
    time, large, with a petal pager. Every highlight is quoted word for word
    from their LinkedIn recommendation; the full texts live on /testimonials. */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduced = useReducedMotion();
  const count = SPOTLIGHT.length;

  useEffect(() => {
    if (paused || !inView || reduced || count < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [paused, inView, reduced, count]);

  if (!count) return null;
  const go = (d: number) => setActive((i) => (i + d + count) % count);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative isolate py-28 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Petals
        name="testimonials"
        scroll
        className="-z-10 overflow-visible"
        petals={[{ className: "-right-14 top-[30%] h-24 w-20 md:-right-20 md:h-36 md:w-28", rotate: 30, duration: 15, fall: 200 }]}
      />
      <SectionHeading
        index="05"
        eyebrow="Recommendations"
        title={
          <>
            What people <span className="text-gradient italic">say.</span>
          </>
        }
        description="In their own words, from LinkedIn recommendations by teammates and seniors."
      />

      <div className="relative">
        {/* the giant wine quotation mark behind the words */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-2 font-display text-[12rem] leading-none text-rose/20 select-none md:-top-24 md:-left-6 md:text-[18rem]"
        >
          &ldquo;
        </span>

        {/* All quotes share one grid cell, so the block is as tall as the
            longest one and nothing jumps when they change. */}
        <div className="relative grid grid-cols-1" aria-live={paused ? "polite" : "off"}>
          {SPOTLIGHT.map((t, i) => {
            const on = i === active;
            return (
              <motion.figure
                key={t.name}
                aria-hidden={!on}
                initial={false}
                animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }}
                transition={{ duration: 0.7, ease }}
                className={cn("min-w-0 [grid-area:1/1]", !on && "pointer-events-none")}
              >
                <blockquote className="max-w-4xl font-display text-[clamp(1.55rem,3.4vw,2.75rem)] leading-[1.25] text-foreground">
                  {t.highlight}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c8475c,#5e1422)] font-display text-sm text-[#f6e3d6] ring-1 ring-[#e8a9a1]/40">
                    {initials(t.name)}
                  </span>
                  <span className="min-w-0">
                    {t.profileUrl ? (
                      <a
                        href={t.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={on ? 0 : -1}
                        className="eyebrow text-[0.75rem] text-foreground transition-colors hover:text-rose"
                      >
                        {t.name}
                      </a>
                    ) : (
                      <span className="eyebrow block text-[0.75rem] text-foreground">{t.name}</span>
                    )}
                    <span className="mt-1 block truncate text-sm text-muted-foreground">{t.headline}</span>
                    <span className="mt-0.5 block font-script text-xl text-rose">{t.relationship}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        {/* petal pager + arrows */}
        <div className="mt-12 flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2" role="tablist" aria-label="Recommendations">
            {SPOTLIGHT.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Recommendation from ${t.name}`}
                onClick={() => setActive(i)}
                className="group flex h-10 w-8 items-center justify-center"
              >
                <svg viewBox="0 0 120 150" aria-hidden className="h-6 w-5 transition-transform duration-500 group-hover:scale-110">
                  <path
                    d="M60 146C26 132 4 98 8 62 12 28 36 4 62 4c28 0 52 26 50 60-2 38-22 70-52 82Z"
                    className={cn("transition-all duration-500", i === active ? "fill-rose stroke-[#e8a9a1]" : "fill-transparent stroke-champagne/50")}
                    strokeWidth="8"
                  />
                </svg>
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-subtle">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {[
              { d: -1, icon: ArrowLeft, label: "Previous recommendation" },
              { d: 1, icon: ArrowRight, label: "Next recommendation" },
            ].map(({ d, icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => go(d)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-rose/50 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/testimonials"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-rose to-primary bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(163,41,61,0.8)] transition-[background-position] duration-700 hover:bg-[position:100%_center]"
        >
          Read all {TESTIMONIALS.length} recommendations
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </Link>
        <a
          href={LINKEDIN_RECOMMENDATIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-rose/50"
        >
          <SiLinkedin className="h-4 w-4 text-champagne" /> View on LinkedIn
        </a>
      </div>
    </section>
  );
}
