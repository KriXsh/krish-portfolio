import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Lock, Play, Star } from "lucide-react";
import type { LiveProject } from "@/lib/showcase";
import { languageColor } from "@/lib/showcase";
import { cn } from "@/lib/utils";

/** A browser window showing a screenshot of the live project. The whole frame
    links to the real site in a new tab - no embedded iframe, so the page stays
    light and fast on phones. */
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
  const host = project.url.replace(/^https?:\/\//, "");

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-border bg-surface transition-colors duration-500 hover:border-rose/40">
      <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live site`} className="block">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-elevated px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3 shrink-0 text-champagne" />
            <span className="truncate">{host}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-transform duration-300 group-hover:rotate-45 group-hover:text-rose" />
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden bg-background">
          <Image
            src={`/projects/live-${project.repo.toLowerCase()}.webp`}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1280px) 24rem, (min-width: 768px) 45vw, 92vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0a1222]/85 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8fb3e8]/30 bg-[#0c1730]/70 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur">
              Open live site <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
      </a>

      {/* Details */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-medium text-foreground">{project.title}</h3>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-champagne/30 bg-champagne/10 px-2.5 py-0.5 font-mono text-[10px] text-champagne uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" /> Live
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
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary via-rose to-primary px-4 py-2 text-xs font-semibold text-white shadow-[0_0_24px_-8px_rgba(42,79,143,0.8)]"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-rose/50"
            >
              <Github className="h-3.5 w-3.5" /> Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
