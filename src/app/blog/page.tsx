import type { Metadata } from "next";
import { BlogIndex, type PostCard } from "@/components/blog/BlogIndex";
import { ALL_TAGS } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-server";

export const metadata: Metadata = {
  title: "Blog | Krishnendu Ghosal",
  description:
    "Notes on AI engineering, event-driven systems, data engineering and cloud infrastructure: RAG, Kafka, Argo Workflows, Redis, RBAC and zero-downtime deploys.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Krishnendu Ghosal",
    description: "Notes on AI engineering, event-driven systems, data engineering and cloud infrastructure.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts: PostCard[] = getAllPosts().map(({ slug, title, description, date, tags, cover, palette, readingMinutes }) => ({
    slug,
    title,
    description,
    date,
    tags,
    cover,
    palette,
    readingMinutes,
  }));

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] grid-lines mask-fade-b opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute top-20 -right-20 h-[26rem] w-[26rem] rounded-full bg-cyan/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            <span className="text-glow">Writing</span>
            <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
            {posts.length} posts
          </p>
          <h1 className="font-display text-display-lg font-bold text-foreground">
            Notes from the <span className="text-gradient">engine room.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Practical write-ups on AI engineering, event-driven systems, data pipelines and shipping to production:
            the trade-offs, the failure modes and the code.
          </p>
        </header>

        <BlogIndex posts={posts} tags={ALL_TAGS} />
      </div>
    </main>
  );
}
