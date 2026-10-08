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
const STEP_MS = 7000;
const SPOTLIGHT = TESTIMONIALS.filter((t) => t.highlight);

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#4a74c4,#13264a)] text-[#f6e3d6] ring-1 ring-[#8fb3e8]/40",
        size === "md" ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs",
      )}
    >
      {initials(name)}
    </span>
  );
}

/** Homepage recommendations as "spotlight + live stack": the strongest line of
    one person, large, on the left; everyone who vouched as a stack of cards on
    the right. The stack pops in card by card; the highlight slides to whoever is
    in the spotlight, with a progress line, and any card can be picked. Every
    highlight is quoted word for word from their LinkedIn recommendation; the
    full texts live on /testimonials. */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduced = useReducedMotion();
  const count = SPOTLIGHT.length;

  useEffect(() => {
    if (paused || !inView || reduced || count < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), STEP_MS);
    return () => clearInterval(t);
  }, [paused, inView, reduced, count, active]);

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
        petals={[{ className: "-left-14 top-[62%] h-24 w-20 md:-left-24 md:h-32 md:w-28", rotate: 150, duration: 15, fall: 200 }]}
      />
      <SectionHeading
        index="04"
        eyebrow="Recommendations"
        title={
          <>
            What people <span className="text-gradient italic">say.</span>
          </>
        }
        description="In their own words, from LinkedIn recommendations by teammates and seniors."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        {/* ---- spotlight ---- */}
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-2 font-serif text-[12rem] leading-none text-rose/20 select-none md:-top-24 md:-left-6 md:text-[16rem]"
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
                  <blockquote className="font-display text-[clamp(1.45rem,2.7vw,2.4rem)] leading-[1.25] text-foreground">
                    {t.highlight}
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-4">
                    <Avatar name={t.name} />
                    <span className="min-w-0">
                      {t.profileUrl ? (
                        <a
                          href={t.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={on ? 0 : -1}
                          className="eyebrow text-[0.72rem] text-foreground transition-colors hover:text-rose"
                        >
                          {t.name}
                        </a>
                      ) : (
                        <span className="eyebrow block text-[0.72rem] text-foreground">{t.name}</span>
                      )}
                      <span className="mt-1 block truncate text-sm text-muted-foreground">{t.headline}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-4">
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

        {/* ---- live stack: one card per person, pops in one by one ---- */}
        <div
          role="tablist"
          aria-label="Recommendations"
          className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {SPOTLIGHT.map((t, i) => {
            const on = i === active;
            return (
              <motion.button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={`Recommendation from ${t.name}`}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                initial={reduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ type: "spring", stiffness: 170, damping: 18, delay: 0.1 + i * 0.13 }}
                className={cn(
                  "relative w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-500 sm:w-[46%] lg:w-full",
                  on ? "border-champagne/40" : "border-border hover:border-ink/20",
                )}
              >
                {/* the highlight slides from card to card */}
                {on && (
                  <motion.span
                    layoutId="testimonial-active"
                    aria-hidden
                    className="absolute inset-0 -z-0 bg-[linear-gradient(120deg,rgba(42,79,143,0.35),rgba(19,38,74,0.15))]"
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-3">
                  <Avatar name={t.name} size="sm" />
                  <span className="min-w-0">
                    <span className={cn("block text-sm transition-colors", on ? "text-foreground" : "text-muted-foreground")}>{t.name}</span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] tracking-wide text-subtle uppercase">{t.relationship}</span>
                  </span>
                </span>
                <span
                  className={cn(
                    "relative mt-3 line-clamp-2 text-[13px] leading-snug transition-colors duration-500",
                    on ? "text-champagne" : "text-subtle",
                  )}
                >
                  &ldquo;{t.highlight}&rdquo;
                </span>
                {/* progress while this one is in the spotlight */}
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/10">
                  {on && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="block h-full bg-champagne"
                      initial={{ width: paused || reduced ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduced ? 0 : STEP_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Link
          href="/testimonials"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-rose to-primary bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(42,79,143,0.8)] transition-[background-position] duration-700 hover:bg-[position:100%_center]"
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
