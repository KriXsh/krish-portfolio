import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ArchitectureFlow } from "@/components/case-studies/ArchitectureFlow";
import { DisciplineChip } from "@/components/case-studies/DisciplineChip";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CASE_STUDIES, CASE_STUDY_SLUGS, CONFIDENTIALITY_NOTE, getCaseStudy } from "@/content/case-studies";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.title} | Case Study`;
  return {
    title,
    description: cs.summary,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: { title, description: cs.summary, url: `/case-studies/${slug}`, type: "article" },
  };
}

function Section({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-border py-12 md:grid-cols-[12rem_1fr] md:gap-10 md:py-16">
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase md:flex-col md:items-start md:gap-2">
        <span className="text-glow">{index}</span>
        {label}
      </p>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const i = CASE_STUDIES.indexOf(cs);
  const prev = CASE_STUDIES[(i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  const next = CASE_STUDIES[(i + 1) % CASE_STUDIES.length];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] grid-lines mask-fade-b opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[150px]" />

      <article className="relative mx-auto max-w-5xl">
        <Link
          href="/case-studies"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All case studies
        </Link>

        <header className="mb-10">
          <Reveal>
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-subtle uppercase">
              {cs.company} · {cs.period}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-display-lg font-bold text-foreground">{cs.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-3xl text-muted-foreground md:text-lg">{cs.summary}</p>
          </Reveal>
          <Reveal delay={0.14} className="mt-6 flex flex-wrap gap-1.5">
            {cs.disciplines.map((d) => (
              <DisciplineChip key={d} id={d} />
            ))}
          </Reveal>
        </header>

        {cs.metrics && (
          <RevealGroup className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {cs.metrics.map((m) => (
              <RevealItem key={m.label} className="rounded-2xl border border-border bg-surface p-5">
                <p className="font-display text-3xl font-bold text-gradient md:text-4xl">{m.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{m.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        <Section index="01" label="Context">
          <p className="text-base leading-relaxed text-foreground/90 md:text-lg">{cs.context}</p>
        </Section>

        <Section index="02" label="Challenge">
          <p className="text-base leading-relaxed text-foreground/90 md:text-lg">{cs.challenge}</p>
        </Section>

        <Section index="03" label="Approach">
          <ol className="space-y-4">
            {cs.approach.map((step, n) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-glow">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section index="04" label="Architecture">
          <ArchitectureFlow stages={cs.architecture} />
          <p className="mt-3 text-xs text-subtle">Simplified view of how the pieces connect.</p>
        </Section>

        <Section index="05" label="Stack">
          <div className="flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <span key={s} className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section index="06" label="Outcomes">
          <ul className="space-y-3">
            {(cs.metrics ?? []).map((m) => (
              <li key={m.label} className="flex items-start gap-3 text-foreground/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span>
                  <span className="font-semibold text-foreground">{m.value}</span> · {m.label}
                </span>
              </li>
            ))}
            {cs.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-foreground/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-subtle">{CONFIDENTIALITY_NOTE}</p>
        </Section>

        {/* Prev / next */}
        <nav aria-label="More case studies" className="grid gap-3 border-t border-border pt-10 sm:grid-cols-2">
          <Link href={`/case-studies/${prev.slug}`} className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-subtle uppercase">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="mt-2 block font-display font-semibold text-foreground">{prev.title}</span>
            <span className="text-xs text-muted-foreground">{prev.company}</span>
          </Link>
          <Link
            href={`/case-studies/${next.slug}`}
            className="group rounded-2xl border border-border bg-surface p-5 text-right transition-colors hover:border-border-strong"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-[11px] tracking-wider text-subtle uppercase">
              Next <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block font-display font-semibold text-foreground">{next.title}</span>
            <span className="text-xs text-muted-foreground">{next.company}</span>
          </Link>
        </nav>

        {/* CTA */}
        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border bg-surface p-8 text-center md:p-12">
          <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]" />
          <div className="relative">
            <h2 className="font-display text-display-md font-bold text-foreground">
              Building something <span className="text-gradient">similar?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Tell me about it. I&apos;m happy to talk architecture, trade-offs and timelines.</p>
            <Link
              href="/#contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background"
            >
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
