"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Wraps a highlighted <pre> with a language label and a copy button. */
export function CodeBlock({ language, children }: { language?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="blog-code group relative my-7 overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-elevated px-4 py-2">
        <span className="font-mono text-[11px] tracking-wider text-subtle uppercase">{language ?? "code"}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-ink/5 hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={ref} tabIndex={0} className="overflow-x-auto bg-surface p-4 text-[13px] leading-relaxed" data-lenis-prevent>
        {children}
      </pre>
    </div>
  );
}
