import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import SortingVisualizer from "@/components/sorting/SortingVisualizer";
import { GITHUB_USER } from "@/lib/github";

export const metadata: Metadata = {
  title: "SortFusion: Sorting Visualizer | Krishnendu Ghosal",
  description: "Watch Quick, Merge, Heap, Shell, Insertion, Selection, Bubble and Cocktail sort run step by step. Scrub the timeline, follow the pseudocode or sort your own numbers.",
  alternates: { canonical: "/projects/sorting" },
  openGraph: { url: "/projects/sorting", title: "SortFusion: Sorting Visualizer | Krishnendu Ghosal" },
};

export default function SortingPage() {
  return (
    <main id="main" className="relative min-h-screen overflow-x-clip bg-background px-4 pt-28 pb-24 sm:px-6 md:px-10 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] grid-lines mask-fade-b opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute top-60 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1440px]">
        <header className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/projects"
              className="group mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Projects
            </Link>
            <p className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              <span className="text-glow">Lab</span>
              <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
              Sorting algorithms
            </p>
            <h1 className="font-display text-display-md font-normal text-foreground">
              Sort<span className="text-gradient">Fusion</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Watch eight sorting algorithms compare, swap and merge their way to order. Pause at any step, scrub the
              timeline, follow the pseudocode, or drop in your own numbers.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}/SortFusion-UI`}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary md:self-auto"
          >
            <Github aria-hidden className="size-4" />
            Source
          </a>
        </header>

        <SortingVisualizer />
      </div>
    </main>
  );
}
