"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, COMPANIES, DISCIPLINES, type CaseStudy, type Discipline } from "@/content/case-studies";
import { DisciplineChip } from "./DisciplineChip";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function Outcome({ cs }: { cs: CaseStudy }) {
  const m = cs.metrics?.[0];
  return m ? (
    <p className="flex items-baseline gap-2">
      <span className="font-display text-2xl font-bold text-gradient">{m.value}</span>
      <span className="text-xs text-muted-foreground">{m.label}</span>
    </p>
  ) : (
    <p className="text-xs text-muted-foreground">{cs.highlights[0]}</p>
  );
}

function Card({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_60px_-30px_rgb(99_102_241/0.45)]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate font-mono text-[11px] tracking-wider text-subtle uppercase">{cs.company}</p>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="font-display text-xl leading-snug font-semibold text-foreground">{cs.title}</h3>
      <p className="mt-1 font-mono text-[11px] text-subtle">{cs.period}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{cs.summary}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {cs.disciplines.map((d) => (
          <DisciplineChip key={d} id={d} />
        ))}
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <Outcome cs={cs} />
      </div>
    </Link>
  );
}

function Featured({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group relative block overflow-hidden rounded-[2rem] border border-border bg-surface p-7 transition-colors hover:border-border-strong md:p-10"
    >
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-50 mask-fade-b" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-glow">Featured</span>
            {cs.company} · {cs.period}
          </p>
          <h2 className="font-display text-display-md font-bold text-foreground">{cs.title}</h2>
          <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">{cs.summary}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {cs.disciplines.map((d) => (
              <DisciplineChip key={d} id={d} />
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">
            Read the case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>
        {cs.metrics && (
          <dl className="grid grid-cols-2 gap-3">
            {cs.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl p-4">
                <dt className="font-display text-3xl font-bold text-gradient">{m.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Link>
  );
}

/** Case study index with discipline tabs and company filter chips. */
export function CaseStudyIndex() {
  const [discipline, setDiscipline] = useState<Discipline | "all">("all");
  const [company, setCompany] = useState<string | null>(null);

  const featured = CASE_STUDIES.find((c) => c.featured);
  const filtered = useMemo(
    () =>
      CASE_STUDIES.filter(
        (c) => (discipline === "all" || c.disciplines.includes(discipline)) && (!company || c.company === company),
      ),
    [discipline, company],
  );
  const unfiltered = discipline === "all" && !company;
  const grid = unfiltered && featured ? filtered.filter((c) => c !== featured) : filtered;
  const count = (d: Discipline | "all") =>
    CASE_STUDIES.filter((c) => (d === "all" || c.disciplines.includes(d)) && (!company || c.company === company)).length;

  const tabs: { id: Discipline | "all"; label: string }[] = [{ id: "all", label: "All" }, ...DISCIPLINES];

  return (
    <div>
      {/* Discipline tabs */}
      <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0" data-lenis-prevent>
        <div role="tablist" aria-label="Discipline" className="flex w-max gap-1 rounded-full border border-border bg-surface p-1 md:w-auto md:flex-wrap">
          {tabs.map((t) => {
            const active = discipline === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setDiscipline(t.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="case-tab"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {t.label} <span className="font-mono text-[11px] opacity-60">{count(t.id)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Company chips */}
      <div className="mt-4 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0" data-lenis-prevent>
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {[null, ...COMPANIES].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              onClick={() => setCompany(c)}
              aria-pressed={company === c}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                company === c
                  ? "border-border-strong bg-ink/[0.06] text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c ?? "All companies"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <AnimatePresence initial={false}>
          {unfiltered && featured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Featured cs={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {grid.map((cs) => (
              <motion.div
                key={cs.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <Card cs={cs} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!filtered.length && (
          <p className="rounded-3xl border border-border bg-surface p-10 text-center text-muted-foreground">
            No case studies match that combination yet.
          </p>
        )}
      </div>
    </div>
  );
}
