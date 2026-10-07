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
    <article className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-7 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-rose/40">
      <div className="flex items-start justify-between">
        <span aria-hidden className="font-display text-6xl leading-[0.6] text-rose">&ldquo;</span>
        <SiLinkedin
          className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-[#0a66c2]"
          aria-label="LinkedIn recommendation"
        />
      </div>
      <blockquote className="mt-5 flex-1 font-display text-[16.5px] leading-relaxed whitespace-pre-line text-foreground/90">
        <span className={open || !long ? "" : "line-clamp-5"}>{t.text}</span>
      </blockquote>
      {long && clamp && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 self-start eyebrow text-[0.62rem] text-glow hover:text-foreground"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
      <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {t.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote LinkedIn avatars, tiny
          <img src={t.avatar} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet font-display text-sm text-champagne ring-1 ring-champagne/30">
            {initials(t.name)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {t.profileUrl ? (
            <a href={t.profileUrl} target="_blank" rel="noopener noreferrer" className="eyebrow text-[0.7rem] text-foreground hover:text-glow">
              {t.name}
            </a>
          ) : (
            <p className="eyebrow text-[0.7rem] text-foreground">{t.name}</p>
          )}
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{t.headline}</p>
          <p className="mt-0.5 text-[11px] text-subtle">
            {t.date} · {t.relationship}
          </p>
        </div>
      </footer>
    </article>
  );
}
