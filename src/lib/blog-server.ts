import fs from "node:fs";
import path from "node:path";
import { POSTS, type PostMeta, type TocItem, slugifyHeading } from "./blog";

export type { TocItem };

// Build-time only: blog pages are statically generated, so these reads happen
// during `next build`, never on a live request.

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export type Post = PostMeta & {
  body: string;
  readingMinutes: number;
  words: number;
  toc: TocItem[];
};

function stripCode(md: string) {
  return md.replace(/```[\s\S]*?```/g, "");
}

function buildToc(md: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of stripCode(md).split("\n")) {
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, "");
    items.push({ id: slugifyHeading(text), text, depth: m[1].length === 2 ? 2 : 3 });
  }
  return items;
}

export function getPost(slug: string): Post | null {
  const meta = POSTS.find((p) => p.slug === slug);
  if (!meta) return null;
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const body = fs.readFileSync(file, "utf8");
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    ...meta,
    body,
    words,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    toc: buildToc(body),
  };
}

export function getAllPosts(): Post[] {
  return POSTS.map((p) => getPost(p.slug)).filter((p): p is Post => p !== null);
}
