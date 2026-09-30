"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Hand, Lock, Play, RotateCw, Star } from "lucide-react";
import type { LiveProject } from "@/lib/showcase";
import { languageColor } from "@/lib/showcase";
import { cn } from "@/lib/utils";

/** A browser window with the real site running inside it. The iframe renders at
    2x and is scaled down, so the page lays out like a laptop screen. It's
    view-only until "Interact" is pressed, so scrolling the page never gets
    trapped inside a demo. */
export function LivePreview({
  project,
  stars,
  language,
  repoUrl,
}: {
  project: LiveProject;
  stars?: number;
  language?: string | null;
  repoUrl?: string;
}) {
  const [interactive, setInteractive] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const host = project.url.replace(/^https?:\/\//, "");

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-border bg-surface">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-elevated px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3 shrink-0 text-emerald-400" />
          <span className="truncate">{host}</span>
        </div>
        <button
          type="button"
          aria-label="Reload preview"
          onClick={() => {
            setLoaded(false);
            setReloadKey((k) => k + 1);
          }}
          className="rounded-full p-1.5 text-subtle transition-colors hover:text-foreground"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Live site */}
      <div className="relative aspect-[16/10] overflow-hidden bg-background">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex items-center gap-2 font-mono text-xs text-subtle">
              <span className="h-2 w-2 animate-ping rounded-full bg-gh-accent" /> Loading live site…
            </div>
          </div>
        )}
        <iframe
          key={reloadKey}
          src={project.url}
          title={`${project.title} live preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            !interactive && "pointer-events-none",
          )}
        />
        {!interactive && (
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100">
            <button
              type="button"
              onClick={() => setInteractive(true)}
              className="glass inline-flex items-center gap-2 rounded-full bg-background/60 px-4 py-2 text-xs font-semibold text-foreground"
            >
              <Hand className="h-3.5 w-3.5" /> Interact with the live demo
            </button>
          </div>
        )}
        {interactive && (
          <button
            type="button"
            onClick={() => setInteractive(false)}
            className="absolute top-3 right-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium text-foreground backdrop-blur"
          >
            Done
          </button>
        )}
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-foreground">{project.title}</h3>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-700 dark:text-emerald-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {language && (
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: languageColor(language) }} />
              {language}
            </span>
          )}
          {typeof stars === "number" && (
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> {stars}
            </span>
          )}
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px]">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tryHref && (
            <Link
              href={project.tryHref}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary via-violet to-cyan px-4 py-2 text-xs font-semibold text-white shadow-[0_0_24px_-8px_rgba(99,102,241,0.8)]"
            >
              <Play className="h-3.5 w-3.5 fill-current" /> Try it out
            </Link>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold",
              project.tryHref ? "border border-border text-foreground" : "bg-foreground text-background",
            )}
          >
            Live demo <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-ink/20"
            >
              <Github className="h-3.5 w-3.5" /> Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
