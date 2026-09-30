import type { Metadata } from "next";
import { CaseStudyIndex } from "@/components/case-studies/CaseStudyIndex";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDIES, CONFIDENTIALITY_NOTE, DISCIPLINES } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | Krishnendu Ghosal",
  description:
    "How the work got done: fintech APIs, B2G systems, voice AI, event-driven data platforms, data migrations and cloud delivery.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Krishnendu Ghosal",
    description: "Full-stack, data engineering, event-driven, AI and DevOps work, explained.",
    url: "/case-studies",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  const companies = new Set(CASE_STUDIES.map((c) => c.company)).size;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] grid-lines mask-fade-b opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl">
          <Reveal>
            <p className="mb-4 font-mono text-xs tracking-[0.25em] text-glow uppercase">Case studies</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-display-lg font-bold text-foreground">
              How the work <span className="text-gradient">actually got done.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted-foreground md:text-lg">
              {CASE_STUDIES.length} stories from {companies} teams: the problem, the approach, the architecture and the
              result. Filter by {DISCIPLINES.map((d) => d.label.toLowerCase()).join(", ")}.
            </p>
          </Reveal>
        </header>

        <CaseStudyIndex />

        <p className="mt-12 text-center text-xs text-subtle">{CONFIDENTIALITY_NOTE}</p>
      </div>
    </main>
  );
}
