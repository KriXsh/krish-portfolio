"use client";

import { useState } from "react";
import { Check, Link2, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** LinkedIn, X and copy-link. Uses the live URL so it's right on any domain. */
export function ShareLinks({ title, path, className }: { title: string; path: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => (typeof window !== "undefined" ? `${window.location.origin}${path}` : path);

  const btn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="mr-1 font-mono text-[11px] tracking-widest text-subtle uppercase">Share</span>
      <button
        type="button"
        aria-label="Share on LinkedIn"
        className={btn}
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`, "_blank", "noopener,noreferrer")}
      >
        <Linkedin className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Share on X"
        className={btn}
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url())}`,
            "_blank",
            "noopener,noreferrer",
          )
        }
      >
        <XLogo className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        aria-label={copied ? "Link copied" : "Copy link"}
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url());
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            /* clipboard blocked */
          }
        }}
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
