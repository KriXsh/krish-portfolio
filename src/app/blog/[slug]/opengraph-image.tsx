import { ImageResponse } from "next/og";
import { AUTHOR, POSTS, getPostMeta } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post by Krishnendu Ghosal";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostMeta(slug);
  const [a, b] = post?.palette ?? ["#2a4f8f", "#d9a77f"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0b1020",
          backgroundImage: `radial-gradient(circle at 0% 0%, ${a} 0%, transparent 55%), radial-gradient(circle at 100% 100%, ${b} 0%, transparent 55%)`,
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {(post?.tags ?? ["Blog"]).slice(0, 3).map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.08)",
                fontSize: 24,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 1000 }}>
          {post?.title ?? "Blog"}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: "rgba(248,250,252,0.8)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 999,
                background: `linear-gradient(135deg, ${a}, ${b})`,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              KG
            </div>
            {AUTHOR.name}
          </div>
          <div style={{ display: "flex" }}>{AUTHOR.role}</div>
        </div>
      </div>
    ),
    size,
  );
}
