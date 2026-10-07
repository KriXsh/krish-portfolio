import type { Metadata } from "next";
import { CaseStudyIndex } from "@/components/case-studies/CaseStudyIndex";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDIES, CONFIDENTIALITY_NOTE, DISCIPLINES } from "@/content/case-studies";
import { Petals } from "@/components/ui/petals";
import { Vine } from "@/components/ui/vine";

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
    <main className="relative isolate min-h-screen overflow-x-clip bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <Petals
        name="case-studies-page"
        scroll
        className="-z-10"
        petals={[
          { className: "-right-6 top-24 h-24 w-20 md:right-[4%] md:top-32 md:h-36 md:w-28", rotate: 25, duration: 15 },
          { className: "-left-8 top-[34rem] hidden h-16 w-14 md:block", rotate: -120, duration: 12, blur: true },
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] grid-lines mask-fade-b opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(ellipse_50%_55%_at_35%_0%,rgba(163,41,61,0.24),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] grain opacity-[0.05] mix-blend-overlay" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl">
          <Reveal>
            <p className="mb-4 eyebrow text-champagne uppercase"><span className="text-rose">✦</span> Case studies</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-display-lg font-bold text-foreground">
              How the work <span className="text-gradient italic">actually got done.</span>
            </h1>
            <p className="mt-2 font-script text-3xl text-rose md:text-4xl">the stories behind the systems</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted-foreground md:text-lg">
              {CASE_STUDIES.length} stories from {companies} teams: the problem, the approach, the architecture and the
              result. Filter by {DISCIPLINES.map((d) => d.label.toLowerCase()).join(", ")}.
            </p>
          </Reveal>
          <Vine className="mt-10 max-w-xl" />
        </header>

        <CaseStudyIndex />

        <p className="mt-12 text-center text-xs text-subtle">{CONFIDENTIALITY_NOTE}</p>
      </div>
    </main>
  );
}
