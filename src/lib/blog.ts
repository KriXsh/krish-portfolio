// Blog index. Metadata lives here (not in the markdown files) so API routes,
// OG images and the sitemap can use it without touching the filesystem at
// runtime. Post bodies live in src/content/blog/<slug>.md and are read at
// build time by src/lib/blog-server.ts.

export type Cover = "rag" | "kafka" | "argo" | "voice" | "rbac" | "redis" | "deploy" | "evals";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  tags: string[];
  cover: Cover;
  /** Two colours for the generated cover art. */
  palette: [string, string];
};

export const AUTHOR = {
  name: "Krishnendu Ghosal",
  role: "Full-Stack · AI/ML · Cloud Engineer",
  linkedin: "https://linkedin.com/in/krish-me",
  github: "https://github.com/KriXsh",
  email: "krishnendughosal999@gmail.com",
};

export const POSTS: PostMeta[] = [
  {
    slug: "rag-vs-ragless",
    title: "RAG vs RAG-less: when long context beats a vector pipeline (and when it doesn't)",
    description:
      "Million-token context windows and agentic search changed the retrieval trade-offs. A practical framework for choosing between classic RAG, long-context prompting and agentic retrieval.",
    date: "2026-09-30",
    tags: ["AI Engineering", "RAG", "LLMs"],
    cover: "rag",
    palette: ["#2a4f8f", "#d9a77f"],
  },
  {
    slug: "kafka-event-driven-architecture",
    title: "Event-driven architecture with Kafka: the parts that actually bite you",
    description:
      "Topics, partitions, consumer groups, ordering, idempotency and dead-letter queues: the Kafka concepts that decide whether an event-driven system stays correct under load.",
    date: "2026-09-30",
    tags: ["Kafka", "Event-Driven", "Backend"],
    cover: "kafka",
    palette: ["#8fb3e8", "#13264a"],
  },
  {
    slug: "data-migrations-argo-workflows",
    title: "Large data migrations on Kubernetes with Argo Workflows",
    description:
      "Modelling a migration as a DAG: chunking, retries with backoff, checkpoints, idempotent writes, backfills and verification, all running as Argo Workflows on Kubernetes.",
    date: "2026-09-30",
    tags: ["Data Engineering", "Kubernetes", "Argo"],
    cover: "argo",
    palette: ["#4a74c4", "#0a1428"],
  },
  {
    slug: "low-latency-voice-ai-pipeline",
    title: "Building a low-latency voice AI pipeline: STT → LLM → TTS",
    description:
      "Where the milliseconds go in a voice agent, and how streaming, voice activity detection, barge-in and a latency budget make a conversation feel natural.",
    date: "2026-09-30",
    tags: ["AI Engineering", "Voice AI", "Streaming"],
    cover: "voice",
    palette: ["#1e3a6e", "#e4cfa8"],
  },
  {
    slug: "rbac-done-right",
    title: "RBAC done right: roles, permissions, JWTs and least privilege",
    description:
      "Designing role-based access control that survives growth: permissions over roles, short-lived JWTs with refresh-token rotation, and mapping app roles to cloud IAM.",
    date: "2026-09-30",
    tags: ["Security", "Auth", "Backend"],
    cover: "rbac",
    palette: ["#2f5aa8", "#c08457"],
  },
  {
    slug: "redis-caching-patterns",
    title: "Caching with Redis: patterns, TTLs and the stampede problem",
    description:
      "Cache-aside, write-through and TTL strategy, plus the failure modes that hurt in production: stampedes, stale data and invalidation, with code.",
    date: "2026-09-30",
    tags: ["Redis", "Performance", "Backend"],
    cover: "redis",
    palette: ["#4a6a9e", "#8fb3e8"],
  },
  {
    slug: "zero-downtime-deploys",
    title: "Zero-downtime deploys: from a single VM to Kubernetes",
    description:
      "Rolling updates, blue-green and canary releases, readiness probes and graceful shutdown on Kubernetes, and how to get the same guarantees on one VM with PM2 and Nginx.",
    date: "2026-09-30",
    tags: ["DevOps", "Kubernetes", "CI/CD"],
    cover: "deploy",
    palette: ["#16305c", "#d9a77f"],
  },
  {
    slug: "evaluating-llm-features",
    title: "Evaluating LLM features in production without fooling yourself",
    description:
      "Golden sets, offline evals, LLM-as-judge and its pitfalls, and the online signals that tell you whether an AI feature actually got better.",
    date: "2026-09-30",
    tags: ["AI Engineering", "LLMs", "Evals"],
    cover: "evals",
    palette: ["#c08457", "#1d3766"],
  },
];

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export const POST_SLUGS = POSTS.map((p) => p.slug);

export function getPostMeta(slug: string): PostMeta | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** For the sitemap: every post URL path with its date. */
export function blogSitemapEntries(): { path: string; lastModified: string }[] {
  return [
    { path: "/blog", lastModified: POSTS.map((p) => p.date).sort().at(-1) ?? "2026-09-30" },
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, lastModified: p.date })),
  ];
}

export const ALL_TAGS = [...new Set(POSTS.flatMap((p) => p.tags))];

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Same slugs for heading ids and table-of-contents links. */
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
