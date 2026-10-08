import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Github, Linkedin } from "lucide-react";
import { CoverArt } from "@/components/blog/CoverArt";
import { PostBody } from "@/components/blog/PostBody";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { LikeButton } from "@/components/blog/LikeButton";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Comments } from "@/components/blog/Comments";
import { AUTHOR, POSTS, formatPostDate, getPostMeta } from "@/lib/blog";
import { getPost } from "@/lib/blog-server";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} | Krishnendu Ghosal`,
    description: meta.description,
    keywords: meta.tags,
    authors: [{ name: AUTHOR.name, url: AUTHOR.linkedin }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: `/blog/${slug}`,
      publishedTime: meta.date,
      authors: [AUTHOR.name],
      tags: meta.tags,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = POSTS.findIndex((p) => p.slug === slug);
  const prev = POSTS[index - 1];
  const next = POSTS[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    wordCount: post.words,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.linkedin },
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] grid-lines mask-fade-b opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All posts
        </Link>

        {/* Header */}
        <header className="mx-auto mb-12 max-w-3xl lg:mx-0">
          <div className="mb-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] font-normal tracking-[-0.03em] text-balance text-foreground">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan font-display text-sm font-normal text-white">
                KG
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{AUTHOR.name}</p>
                <p className="flex items-center gap-2 font-mono text-[11px] text-subtle">
                  {formatPostDate(post.date)} · <Clock className="h-3 w-3" /> {post.readingMinutes} min read
                </p>
              </div>
            </div>
            <LikeButton slug={post.slug} />
          </div>
        </header>

        <CoverArt cover={post.cover} palette={post.palette} label={`Cover art for ${post.title}`} className="mb-14 aspect-[21/9] rounded-[2rem]" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="min-w-0 max-w-3xl">
            <PostBody markdown={post.body} />

            {/* Footer: like + share */}
            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-border py-6">
              <div className="flex items-center gap-3">
                <LikeButton slug={post.slug} />
                <span className="text-sm text-muted-foreground">Found this useful?</span>
              </div>
              <ShareLinks title={post.title} path={`/blog/${post.slug}`} />
            </div>

            {/* Author */}
            <div className="mt-10 flex flex-col gap-5 rounded-[1.75rem] border border-border bg-surface p-6 sm:flex-row sm:items-center md:p-8">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan font-display text-lg font-normal text-white">
                KG
              </span>
              <div className="flex-1">
                <p className="font-display text-lg font-medium text-foreground">{AUTHOR.name}</p>
                <p className="text-sm text-muted-foreground">
                  {AUTHOR.role}. I write about the systems I build: AI features, event-driven backends, data pipelines and the
                  infrastructure under them.
                </p>
              </div>
              <div className="flex gap-2">
                <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            <Comments title={post.title} />

            {/* Prev / next */}
            <nav aria-label="More posts" className="mt-16 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-subtle">
                    <ArrowLeft className="h-3 w-3" /> Previous
                  </span>
                  <span className="mt-2 block font-display font-medium text-foreground group-hover:text-glow">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={`/blog/${next.slug}`} className="group rounded-2xl border border-border bg-surface p-5 text-right transition-colors hover:border-border-strong">
                  <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-subtle">
                    Next <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="mt-2 block font-display font-medium text-foreground group-hover:text-glow">{next.title}</span>
                </Link>
              )}
            </nav>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents items={post.toc} />
              <ShareLinks title={post.title} path={`/blog/${post.slug}`} className="mt-8" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
