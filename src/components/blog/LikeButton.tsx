"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type State = { enabled: boolean; count: number; liked: boolean; ready: boolean };

const storageKey = (slug: string) => `blog:liked:${slug}`;
// A post shows the button twice (header and footer); this keeps them in sync.
const SYNC_EVENT = "blog-like-sync";
type SyncDetail = { slug: string; liked: boolean; count: number };

function readLocal(slug: string) {
  try {
    return localStorage.getItem(storageKey(slug)) === "1";
  } catch {
    return false;
  }
}

function writeLocal(slug: string, liked: boolean) {
  try {
    if (liked) localStorage.setItem(storageKey(slug), "1");
    else localStorage.removeItem(storageKey(slug));
  } catch {
    /* private mode */
  }
}

/** Real likes: counts come from /api/likes when Upstash is configured. Without
    it the button still works, but only remembers this visitor's own like and
    shows no public number. */
export function LikeButton({ slug, className }: { slug: string; className?: string }) {
  const [state, setState] = useState<State>({ enabled: false, count: 0, liked: false, ready: false });
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d: { enabled?: boolean; count?: number; liked?: boolean }) => {
        if (cancelled) return;
        const liked = d.enabled ? Boolean(d.liked) || readLocal(slug) : readLocal(slug);
        setState({ enabled: Boolean(d.enabled), count: d.count ?? 0, liked, ready: true });
      })
      .catch(() => !cancelled && setState((s) => ({ ...s, liked: readLocal(slug), ready: true })));
    const onSync = (e: Event) => {
      const d = (e as CustomEvent<SyncDetail>).detail;
      if (d.slug === slug) setState((s) => ({ ...s, liked: d.liked, count: d.count }));
    };
    window.addEventListener(SYNC_EVENT, onSync);
    return () => {
      cancelled = true;
      window.removeEventListener(SYNC_EVENT, onSync);
    };
  }, [slug]);

  const broadcast = (liked: boolean, count: number) =>
    window.dispatchEvent(new CustomEvent<SyncDetail>(SYNC_EVENT, { detail: { slug, liked, count } }));

  const toggle = async () => {
    const liked = !state.liked;
    writeLocal(slug, liked);
    if (liked) setBurst((b) => b + 1);
    // Optimistic update; the server's answer wins when it arrives.
    const optimistic = state.enabled ? Math.max(0, state.count + (liked ? 1 : -1)) : state.count;
    broadcast(liked, optimistic);
    if (!state.enabled) return;
    try {
      const r = await fetch(`/api/likes/${slug}`, { method: liked ? "POST" : "DELETE" });
      const d = (await r.json()) as { count?: number; enabled?: boolean };
      if (d.enabled && typeof d.count === "number") broadcast(liked, d.count);
    } catch {
      /* keep the optimistic state */
    }
  };

  const label = state.liked ? "Unlike this post" : "Like this post";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={state.liked}
      aria-label={label}
      title={label}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        state.liked
          ? "border-rose-400/40 bg-rose-500/10 text-rose-600 dark:text-rose-300"
          : "border-border bg-surface text-muted-foreground hover:border-rose-400/40 hover:text-rose-600 dark:hover:text-rose-300",
        className,
      )}
    >
      <span className="relative">
        <motion.span
          key={`${state.liked}`}
          initial={{ scale: state.liked ? 0.4 : 1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}
          className="block"
        >
          <Heart className={cn("h-4 w-4", state.liked && "fill-current")} />
        </motion.span>
        <AnimatePresence>
          {burst > 0 && state.liked && (
            <motion.span
              key={burst}
              aria-hidden
              initial={{ scale: 0.6, opacity: 0.7 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-rose-400"
            />
          )}
        </AnimatePresence>
      </span>
      {state.enabled ? (
        <span className="tabular-nums">{state.ready ? state.count : "·"}</span>
      ) : (
        <span>{state.liked ? "Liked" : "Like"}</span>
      )}
    </button>
  );
}
