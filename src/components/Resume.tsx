"use client";

import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Magnetic } from "@/components/ui/magnetic";
import { RESUME_DOWNLOAD_URL, RESUME_PREVIEW_URL, RESUME_URL } from "@/lib/site";

const highlights = [
  { k: "5", v: "Companies" },
  { k: "4+", v: "Industry domains" },
  { k: "25+", v: "Technologies" },
];

/** The live PDF, embedded from Drive. The iframe ignores the pointer so the
    tilt still tracks it and a click opens the full resume in Drive. */
function PaperPreview() {
  return (
    <TiltCard max={12} glowColor="rgba(139,92,246,0.25)" className="mx-auto w-full max-w-sm rounded-[1.75rem] p-3">
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="Open resume" className="block">
        <div className="relative aspect-[1/1.3] overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
          <div className="absolute inset-0 flex items-center justify-center text-background/40">
            <FileText className="h-8 w-8" />
          </div>
          <iframe
            src={RESUME_PREVIEW_URL}
            title="Krishnendu Ghosal resume"
            loading="lazy"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-[#cbd5e1] to-transparent pt-16 pb-5 text-xs font-semibold text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Open full resume <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </a>
    </TiltCard>
  );
}

export default function Resume() {
  return (
    <div className="py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface">
        <div aria-hidden className="absolute -top-32 right-10 h-[26rem] w-[26rem] rounded-full bg-violet/20 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-40 -left-20 h-[24rem] w-[24rem] rounded-full bg-primary/15 blur-[120px]" />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />

        <div className="relative grid items-center gap-14 p-8 md:p-14 lg:grid-cols-2 lg:p-20">
          <div>
            <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              <span className="text-glow">08</span>
              <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
              Resume
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.25rem,4.2vw,4rem)] leading-[0.98] font-bold tracking-[-0.035em] text-foreground">
                The whole story,
                <br />
                <span className="text-gradient">on one page.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted-foreground md:text-lg">
                My up-to-date resume: roles, impact and the full stack across AI, cloud and full-stack engineering.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <dl className="mt-8 flex gap-10">
                {highlights.map((h) => (
                  <div key={h.v}>
                    <dt className="font-display text-3xl font-bold text-foreground">{h.k}</dt>
                    <dd className="mt-1 font-mono text-[10px] tracking-widest text-subtle uppercase">{h.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background"
                >
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-primary via-violet to-cyan transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                  <FileText className="relative h-4 w-4 transition-colors group-hover:text-white" />
                  <span className="relative transition-colors group-hover:text-white">View resume</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-all group-hover:rotate-45 group-hover:text-white" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={RESUME_DOWNLOAD_URL}
                  className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:border-ink/20"
                >
                  Download PDF
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <PaperPreview />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
