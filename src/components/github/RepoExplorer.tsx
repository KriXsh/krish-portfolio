"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookMarked, GitFork, Globe, Search, Star } from "lucide-react";
import type { Repo } from "@/lib/github";
import { languageColor } from "@/lib/showcase";
import { cn } from "@/lib/utils";

type Sort = "updated" | "stars" | "name";
const PAGE = 12;

function timeAgo(iso: string, now: number) {
  const days = Math.floor((now - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

/** GitHub-style repository list with search, language filter, sort and a
    "live demos only" toggle. */
export function RepoExplorer({ repos, now }: { repos: Repo[]; now: number }) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("updated");
  const [liveOnly, setLiveOnly] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = repos.filter(
      (r) =>
        (!lang || r.language === lang) &&
        (!liveOnly || r.homepage) &&
        (!q || r.name.toLowerCase().includes(q) || (r.description ?? "").toLowerCase().includes(q)),
    );
    return list.sort((a, b) =>
      sort === "stars" ? b.stars - a.stars : sort === "name" ? a.name.localeCompare(b.name) : b.pushedAt.localeCompare(a.pushedAt),
    );
  }, [repos, query, lang, sort, liveOnly]);

  const reset = () => setShown(PAGE);

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 focus-within:border-gh-accent/60">
          <Search className="h-4 w-4 text-subtle" />
          <span className="sr-only">Find a repository</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            placeholder={`Find a repository… (${repos.length})`}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
          />
        </label>
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort repositories"
            className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none"
          >
            <option value="updated">Recently updated</option>
            <option value="stars">Most stars</option>
            <option value="name">Name</option>
          </select>
          <button
            type="button"
            onClick={() => {
              setLiveOnly((v) => !v);
              reset();
            }}
            aria-pressed={liveOnly}
            className={cn(
              "flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm whitespace-nowrap transition-colors",
              liveOnly ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300" : "border-border bg-surface text-muted-foreground",
            )}
          >
            <Globe className="h-4 w-4" /> Live demos
          </button>
        </div>
      </div>

      <div className="-mx-6 mb-8 overflow-x-auto px-6 md:mx-0 md:px-0" data-lenis-prevent>
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {[[null, repos.length] as const, ...languages].map(([l, n]) => (
            <button
              key={l ?? "all"}
              type="button"
              onClick={() => {
                setLang(l);
                reset();
              }}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
                lang === l ? "border-ink/25 bg-ink/[0.07] text-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {l && <span className="h-2 w-2 rounded-full" style={{ background: languageColor(l) }} />}
              {l ?? "All"} <span className="text-subtle">{n}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.slice(0, shown).map((r) => (
            <motion.article
              key={r.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="group relative flex flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gh-accent/40"
            >
              <div className="flex items-start gap-2.5">
                <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
                <a
                  href={r.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 font-mono text-sm font-semibold break-words text-[#0969da] dark:text-[#58a6ff] after:absolute after:inset-0 hover:underline"
                >
                  {r.name}
                </a>
                <span className="ml-auto shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-subtle">Public</span>
              </div>
              <div className="mt-3 flex-1">
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {r.description ?? <span className="italic text-subtle">No description</span>}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                {r.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: languageColor(r.language) }} />
                    {r.language}
                  </span>
                )}
                {r.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" /> {r.stars}
                  </span>
                )}
                {r.forks > 0 && (
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" /> {r.forks}
                  </span>
                )}
                <span>Updated {timeAgo(r.pushedAt, now)}</span>
                {r.homepage && (
                  <a
                    href={r.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 font-medium text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-400/30 transition-colors hover:bg-emerald-400/20"
                  >
                    Live <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {!filtered.length && <p className="py-16 text-center text-muted-foreground">No repositories match that search.</p>}

      {filtered.length > shown && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + PAGE)}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-ink/25"
          >
            Show more ({filtered.length - shown} left)
          </button>
        </div>
      )}
    </div>
  );
}
