"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import type { TocItem } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Sticky contents list that highlights the section being read. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const lenis = useLenis();

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 eyebrow text-subtle uppercase">On this page</p>
      <ol className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                const el = document.getElementById(item.id);
                if (el && lenis) {
                  e.preventDefault();
                  lenis.scrollTo(el, { duration: 1.1 });
                  history.replaceState(null, "", `#${item.id}`);
                }
              }}
              className={cn(
                "-ml-px block border-l py-1.5 text-sm leading-snug transition-colors",
                item.depth === 3 ? "pl-7" : "pl-4",
                active === item.id
                  ? "border-glow font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
