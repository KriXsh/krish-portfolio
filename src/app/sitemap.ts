import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CASE_STUDY_SLUGS } from "@/content/case-studies";
import { TESTIMONIALS } from "@/content/testimonials";
import { blogSitemapEntries } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
    { path: "/projects/pathfinding", priority: 0.7, changeFrequency: "monthly" },
    { path: "/projects/pathfinding", priority: 0.7, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.9, changeFrequency: "monthly" },
    ...CASE_STUDY_SLUGS.map((slug) => ({ path: `/case-studies/${slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...(TESTIMONIALS.length ? [{ path: "/testimonials", priority: 0.6, changeFrequency: "monthly" as const }] : []),
    { path: "/support", priority: 0.5, changeFrequency: "monthly" },
  ];
  const blog = blogSitemapEntries().map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified: e.lastModified,
    changeFrequency: "monthly" as const,
    priority: e.path === "/blog" ? 0.8 : 0.7,
  }));
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...blog,
  ];
}
