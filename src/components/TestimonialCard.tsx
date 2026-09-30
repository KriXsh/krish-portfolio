"use client";

import { useState } from "react";
import { SiLinkedin } from "react-icons/si";
import type { Testimonial } from "@/content/testimonials";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** A recommendation laid out like LinkedIn's: author, headline, relationship,
    date, then the text with "see more". */
export function TestimonialCard({ t, clamp = true }: { t: Testimonial; clamp?: boolean }) {
  const [open, setOpen] = useState(!clamp);
  const long = t.text.length > 280;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6">
      <header className="flex items-start gap-3">
        {t.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote LinkedIn avatars, tiny
          <img src={t.avatar} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan font-display text-sm font-bold text-white">
            {initials(t.name)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {t.profileUrl ? (
            <a href={t.profileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline">
              {t.name}
            </a>
          ) : (
            <p className="font-semibold text-foreground">{t.name}</p>
          )}
          <p className="line-clamp-2 text-sm text-muted-foreground">{t.headline}</p>
          <p className="mt-0.5 text-xs text-subtle">
            {t.date} · {t.relationship}
          </p>
        </div>
        <SiLinkedin className="h-5 w-5 shrink-0 text-[#0a66c2]" aria-label="LinkedIn recommendation" />
      </header>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed whitespace-pre-line text-foreground/90">
        <span className={open || !long ? "" : "line-clamp-5"}>{t.text}</span>
      </blockquote>
      {long && clamp && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 self-start text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          {open ? "Show less" : "…see more"}
        </button>
      )}
    </article>
  );
}
