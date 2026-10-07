import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, Home, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | Krishnendu Ghosal",
  robots: { index: false },
};

// A tiny graph with no path between the two highlighted nodes - the page you
// wanted isn't reachable from here.
const NODES = [
  { x: 40, y: 60 }, { x: 120, y: 30 }, { x: 200, y: 70 }, { x: 90, y: 130 },
  { x: 170, y: 150 }, { x: 260, y: 120 }, { x: 320, y: 50 }, { x: 330, y: 160 },
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [5, 6], [5, 7], [6, 7]];

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[calc(100svh-2rem)] items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines mask-fade-b opacity-70" />
      <div aria-hidden className="pointer-events-none absolute top-1/4 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="relative w-full max-w-2xl text-center">
        <svg viewBox="0 0 370 200" className="mx-auto mb-10 w-full max-w-sm text-ink" aria-hidden>
          {EDGES.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="currentColor" strokeOpacity={0.18} strokeWidth={1.5} />
          ))}
          {/* the missing bridge */}
          <line x1={NODES[4].x} y1={NODES[4].y} x2={NODES[5].x} y2={NODES[5].y} stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="4 6" />
          {NODES.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={i === 0 || i === 7 ? 9 : 5}
              fill={i === 0 ? "#a3293d" : i === 7 ? "#d9a77f" : "currentColor"}
              fillOpacity={i === 0 || i === 7 ? 1 : 0.35}
            />
          ))}
        </svg>

        <p className="eyebrow text-subtle uppercase">Error 404 · route not found</p>
        <h1 className="mt-4 font-display text-display-lg font-bold text-foreground">
          No path to <span className="text-gradient">this page.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground md:text-lg">
          Even Dijkstra couldn&apos;t route you here. The page may have moved, or the link has a typo.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/projects" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground">
            <FolderGit2 className="h-4 w-4" /> Browse projects
          </Link>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <Mail className="h-4 w-4" /> Report a broken link <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
