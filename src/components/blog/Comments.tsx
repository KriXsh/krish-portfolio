"use client";

import Giscus from "@giscus/react";
import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { AUTHOR } from "@/lib/blog";

const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` | undefined;
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

/** Real comments via Giscus (GitHub Discussions). Until it's configured, a
    card points readers to LinkedIn and email instead. */
export function Comments({ title }: { title: string }) {
  const configured = REPO && REPO_ID && CATEGORY && CATEGORY_ID;

  return (
    <section aria-labelledby="discussion" className="mt-16">
      <h2 id="discussion" className="mb-6 flex items-center gap-3 font-display text-2xl font-normal text-foreground">
        <MessageCircle className="h-5 w-5 text-glow" /> Discussion
      </h2>
      {configured ? (
        <div className="rounded-2xl border border-border bg-surface p-4 md:p-6">
          <Giscus
            repo={REPO}
            repoId={REPO_ID}
            category={CATEGORY}
            categoryId={CATEGORY_ID}
            mapping="pathname"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            lang="en"
            loading="lazy"
            theme="transparent_dark"
          />
        </div>
      ) : (
        <div className="glass rounded-2xl p-6 md:p-8">
          <p className="font-display text-lg font-medium text-foreground">Join the discussion</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Questions, corrections or a different take on &ldquo;{title}&rdquo;? I&apos;d love to hear it.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={AUTHOR.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
            >
              <Linkedin className="h-4 w-4" /> Discuss on LinkedIn
            </a>
            <a
              href={`mailto:${AUTHOR.email}?subject=${encodeURIComponent(`Re: ${title}`)}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
            >
              <Mail className="h-4 w-4" /> Email me
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
