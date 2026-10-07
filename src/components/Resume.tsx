"use client";

import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Magnetic } from "@/components/ui/magnetic";
import { Petals } from "@/components/ui/petals";
import { Vine } from "@/components/ui/vine";
import { WaxSeal } from "@/components/ui/wax-seal";
import { RESUME_DOWNLOAD_URL, RESUME_PREVIEW_URL, RESUME_URL } from "@/lib/site";

/** The live PDF, embedded from Drive. The iframe ignores the pointer so the
    tilt still tracks it and a click opens the full resume in Drive. A rose wax
    seal stamps onto the corner when it scrolls in. */
function PaperPreview() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <TiltCard max={12} glowColor="rgba(122,31,47,0.25)" className="w-full rounded-[1.75rem] p-3">
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
      <WaxSeal label="VERIFIED" className="pointer-events-none absolute -right-5 -bottom-6 z-10 w-24 md:-right-8 md:w-28" />
    </div>
  );
}

export default function Resume() {
  return (
    <div className="py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface">
        {/* Same atmosphere as the footer: wine light as gradients (cheap on phones), grain, petals. */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_85%_0%,rgba(94,20,34,0.4),transparent_70%),radial-gradient(ellipse_50%_55%_at_0%_100%,rgba(163,41,61,0.22),transparent_70%)]" />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />
        <div aria-hidden className="absolute inset-0 grain opacity-[0.05] mix-blend-overlay" />
        <Petals
          name="resume"
          scroll
          petals={[
            { className: "-left-6 top-[8%] h-20 w-16 md:h-28 md:w-24", rotate: 140, duration: 14, fall: 200 },
            { className: "right-[46%] -bottom-6 hidden h-14 w-12 lg:block", rotate: -30, duration: 12, blur: true, fall: 160 },
          ]}
        />

        <div className="relative grid items-center gap-14 p-8 md:p-14 lg:grid-cols-2 lg:p-20">
          <div>
            <Reveal className="mb-6 flex items-center gap-3 eyebrow text-muted-foreground uppercase">
              <span className="text-glow">07</span>
              <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
              Resume
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.25rem,4.2vw,4rem)] leading-[0.98] font-bold tracking-[-0.035em] text-foreground">
                The whole story,
                <br />
                <span className="text-gradient italic">on one page.</span>
              </h2>
              <p className="mt-3 font-script text-4xl text-rose">signed, Krish</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted-foreground md:text-lg">
                My up-to-date resume: roles, impact and the full stack across AI, cloud and full-stack engineering.
              </p>
            </Reveal>
            <Vine className="mt-8 max-w-md" />
            <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background"
                >
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-primary via-rose to-violet transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
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
