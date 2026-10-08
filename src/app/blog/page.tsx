import type { Metadata } from "next";
import { BlogIndex, type PostCard } from "@/components/blog/BlogIndex";
import { ALL_TAGS } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-server";
import { Petals } from "@/components/ui/petals";
import { Vine } from "@/components/ui/vine";

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
    <main className="relative isolate min-h-screen overflow-x-clip bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <Petals
        name="blog-page"
        scroll
        className="-z-10"
        petals={[
          { className: "-right-6 top-24 h-24 w-20 md:right-[4%] md:top-32 md:h-36 md:w-28", rotate: -20, duration: 14 },
          { className: "-left-8 top-[32rem] hidden h-16 w-14 md:block", rotate: 160, duration: 12, blur: true },
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] grid-lines mask-fade-b opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(ellipse_50%_55%_at_35%_0%,rgba(42,79,143,0.24),transparent_70%),radial-gradient(ellipse_40%_45%_at_100%_15%,rgba(192,132,87,0.12),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] grain opacity-[0.05] mix-blend-overlay" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl">
          <p className="mb-4 flex items-center gap-3 eyebrow text-muted-foreground uppercase">
            <span className="text-champagne"><span className="text-rose">✦</span> Writing</span>
            <span className="h-px w-10 bg-gradient-to-r from-rose to-transparent" />
            {posts.length} posts
          </p>
          <h1 className="font-display text-display-lg font-normal text-foreground">
            Notes from the <span className="text-gradient italic">engine room.</span>
          </h1>
          <p className="mt-2 font-script text-3xl text-rose md:text-4xl">scribbled between deploys</p>
          <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Practical write-ups on AI engineering, event-driven systems, data pipelines and shipping to production:
            the trade-offs, the failure modes and the code.
          </p>
          <Vine className="mt-10 max-w-xl" />
        </header>

        <BlogIndex posts={posts} tags={ALL_TAGS} />
      </div>
    </main>
  );
}
