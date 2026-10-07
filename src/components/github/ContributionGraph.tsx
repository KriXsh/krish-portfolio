"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

// Contribution levels 0 through 4, grown as a rose garden (light and dark palettes live in globals.css).
const LEVELS = [0, 1, 2, 3, 4].map((l) => `var(--color-gh-${l})`);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Cell = ContributionDay | null;

function buildYear(days: ContributionDay[], year: string) {
  const inYear = days.filter((d) => d.date.startsWith(year));
  // Pad the first week so columns line up Sunday -> Saturday, like GitHub.
  const firstWeekday = inYear.length ? new Date(`${inYear[0].date}T00:00:00Z`).getUTCDay() : 0;
  const cells: Cell[] = [...Array(firstWeekday).fill(null), ...inYear];
  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Month label goes over the first week that contains the 1st of that month.
  const monthCols: { col: number; label: string }[] = [];
  weeks.forEach((w, col) => {
    const first = w.find((d) => d && d.date.endsWith("-01"));
    if (first) monthCols.push({ col, label: MONTHS[Number(first.date.slice(5, 7)) - 1] });
  });

  let longest = 0;
  let run = 0;
  let best: ContributionDay | null = null;
  const byWeekday = Array(7).fill(0);
  for (const d of inYear) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (!best || d.count > best.count) best = d;
    byWeekday[new Date(`${d.date}T00:00:00Z`).getUTCDay()] += d.count;
  }
  const topWeekday = byWeekday.indexOf(Math.max(...byWeekday));
  const activeDays = inYear.filter((d) => d.count > 0).length;

  return { weeks, monthCols, longest, best, topWeekday, activeDays };
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function ContributionGraph({ days, totals }: { days: ContributionDay[]; totals: Record<string, number> }) {
  const years = useMemo(
    () => Object.keys(totals).filter((y) => days.some((d) => d.date.startsWith(y))).sort((a, b) => Number(b) - Number(a)),
    [totals, days],
  );
  // Open on the busiest year; every year stays one click away and is labelled with its total.
  const busiest = useMemo(() => years.reduce((a, b) => ((totals[b] ?? 0) > (totals[a] ?? 0) ? b : a), years[0]), [years, totals]);
  const [year, setYear] = useState(busiest);
  const [hover, setHover] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const data = useMemo(() => buildYear(days, year), [days, year]);
  const allTime = Object.values(totals).reduce((a, b) => a + b, 0);

  if (!years.length) return null;

  return (
    <div className="rounded-[2rem] border border-border bg-surface/80 p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-subtle uppercase">Contribution graph</p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            {(totals[year] ?? 0).toLocaleString()}
            <span className="ml-3 font-sans text-base font-normal text-muted-foreground">contributions in {year}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Year">
          {years.map((y) => (
            <button
              key={y}
              role="tab"
              aria-selected={y === year}
              onClick={() => setYear(y)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors",
                y === year ? "text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {y === year && (
                <motion.span layoutId="year-pill" className="absolute inset-0 rounded-full bg-gh-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">
                {y} · {(totals[y] ?? 0).toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div
        className="relative -mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
        data-lenis-prevent
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Contribution heatmap for ${year}: ${(totals[year] ?? 0).toLocaleString()} contributions over ${data.activeDays} active days, longest streak ${data.longest} days.`}
      >
        <div className="relative w-max">
          <div className="relative mb-2 ml-8 h-4 font-mono text-[10px] text-subtle">
            {data.monthCols.map((m) => (
              <span key={m.label} className="absolute" style={{ left: m.col * 15 }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="mr-1 flex w-7 flex-col gap-[3px] font-mono text-[9px] text-subtle">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <span key={i} className="flex h-3 items-center">{d}</span>
              ))}
            </div>
            {data.weeks.map((week, col) => (
              <motion.div
                key={`${year}-${col}`}
                className="flex flex-col gap-[3px]"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: col * 0.012 }}
              >
                {week.map((day, row) =>
                  day ? (
                    <span
                      key={day.date}
                      onPointerEnter={(e) => {
                        const box = e.currentTarget.getBoundingClientRect();
                        const parent = e.currentTarget.closest(".w-max")!.getBoundingClientRect();
                        setHover({ day, x: box.left - parent.left + 6, y: box.top - parent.top });
                      }}
                      className="h-3 w-3 rounded-[3px] transition-transform duration-150 hover:scale-150"
                      style={{
                        background: LEVELS[day.level],
                        boxShadow: day.level >= 3 ? `0 0 ${day.level === 4 ? 10 : 6}px rgba(232,169,161,${day.level === 4 ? 0.55 : 0.3})` : undefined,
                      }}
                    />
                  ) : (
                    <span key={`pad-${row}`} className="h-3 w-3" />
                  ),
                )}
              </motion.div>
            ))}
          </div>

          {hover && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs whitespace-nowrap text-foreground shadow-xl"
              style={{ left: hover.x, top: hover.y - 6 }}
            >
              <span className="font-semibold">{hover.day.count || "No"} contribution{hover.day.count === 1 ? "" : "s"}</span>
              <span className="text-muted-foreground"> on {fmtDate(hover.day.date)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-subtle">
          Less
          {LEVELS.map((c) => (
            <span key={c} className="h-3 w-3 rounded-[3px]" style={{ background: c }} />
          ))}
          More
        </div>
        <p className="text-xs text-subtle">{allTime.toLocaleString()} contributions all-time on public repos</p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6 md:grid-cols-4">
        {[
          { k: data.activeDays, v: "Active days" },
          { k: `${data.longest} day${data.longest === 1 ? "" : "s"}`, v: "Longest streak" },
          { k: data.best?.count ?? 0, v: data.best?.count ? `Best day · ${fmtDate(data.best.date)}` : "Best day" },
          { k: WEEKDAYS[data.topWeekday].slice(0, 3), v: "Most active weekday" },
        ].map((s) => (
          <div key={s.v}>
            <dt className="font-display text-2xl font-bold text-gh-accent">{s.k}</dt>
            <dd className="mt-1 font-mono text-[10px] tracking-wider text-subtle uppercase">{s.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
