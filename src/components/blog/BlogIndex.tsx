"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Heart, Search } from "lucide-react";
import { RoseCorner } from "@/components/ui/rose-corner";
import { WaxSeal } from "@/components/ui/wax-seal";
import { formatPostDate, type Cover } from "@/lib/blog";
import { CoverArt } from "./CoverArt";
import { cn } from "@/lib/utils";

export type PostCard = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: Cover;
  palette: [string, string];
  readingMinutes: number;
};

function Meta({ post, likes }: { post: PostCard; likes?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-subtle">
      <span>{formatPostDate(post.date)}</span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" /> {post.readingMinutes} min read
      </span>
      {typeof likes === "number" && (
        <span className="flex items-center gap-1">
          <Heart className="h-3 w-3" /> {likes}
        </span>
      )}
    </div>
  );
}

export function BlogIndex({ posts, tags }: { posts: PostCard[]; tags: string[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number> | null>(null);

  // Real counts only; if likes aren't configured nothing is shown.
  useEffect(() => {
    fetch("/api/likes")
      .then((r) => r.json())
      .then((d: { enabled?: boolean; counts?: Record<string, number> }) => d.enabled && setLikes(d.counts ?? {}))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))),
    );
  }, [posts, query, tag]);

  const browsing = !query && !tag;
  const [featured, ...rest] = browsing ? filtered : [undefined, ...filtered];

  return (
    <div>
      {/* Controls */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 focus-within:border-glow/60">
          <Search className="h-4 w-4 text-subtle" />
          <span className="sr-only">Search posts</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, e.g. Kafka, RAG, Redis…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
          />
        </label>
      </div>
      <div className="-mx-6 mb-12 overflow-x-auto px-6 md:mx-0 md:px-0" data-lenis-prevent>
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="group" aria-label="Filter by tag">
          {[null, ...tags].map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                tag === t ? "border-transparent bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t ?? "All posts"}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-10 grid overflow-hidden rounded-[2rem] border border-border bg-surface transition-colors duration-500 hover:border-rose/40 md:grid-cols-2"
          >
            <div className="relative">
              <CoverArt cover={featured.cover} palette={featured.palette} className="aspect-[16/10] h-full md:aspect-auto md:min-h-[340px]" />
              <WaxSeal label="LATEST" className="pointer-events-none absolute right-4 bottom-4 w-20 md:w-24" />
            </div>
            <div className="flex flex-col p-7 md:p-10">
              <span className="mb-3 font-script text-3xl text-rose">fresh off the press</span>
              <h2 className="font-display text-2xl leading-tight font-normal text-foreground transition-colors group-hover:text-glow md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{featured.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {featured.tags.map((t) => (
                  <span key={t} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-8">
                <Meta post={featured} likes={likes?.[featured.slug]} />
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {rest.filter((p): p is PostCard => Boolean(p)).map((post) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative isolate flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-[0_24px_60px_-30px_rgba(42,79,143,0.55)]"
              >
                <CoverArt cover={post.cover} palette={post.palette} className="aspect-[16/9]" />
                <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_110%,rgba(42,79,143,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <RoseCorner className="absolute right-4 bottom-4" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-md bg-ink/[0.05] px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg leading-snug font-medium text-foreground transition-colors group-hover:text-glow">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                  <div className="mt-auto pt-6">
                    <Meta post={post} likes={likes?.[post.slug]} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {!filtered.length && <p className="py-16 text-center text-muted-foreground">No posts match that search.</p>}
    </div>
  );
}
