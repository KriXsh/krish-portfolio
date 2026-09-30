import { NextResponse } from "next/server";
import { POST_SLUGS } from "@/lib/blog";
import { getCount, hasLiked, like, likesEnabled, unlike, visitorId } from "@/lib/likes-store";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

async function resolve(ctx: Ctx) {
  const { slug } = await ctx.params;
  return POST_SLUGS.includes(slug) ? slug : null;
}

export async function GET(req: Request, ctx: Ctx) {
  const slug = await resolve(ctx);
  if (!slug) return NextResponse.json({ error: "Unknown post" }, { status: 404 });
  if (!likesEnabled) return NextResponse.json({ enabled: false });
  try {
    const [count, liked] = await Promise.all([getCount(slug), hasLiked(slug, visitorId(req))]);
    return NextResponse.json({ enabled: true, count, liked }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("likes GET failed", err);
    return NextResponse.json({ enabled: false }, { status: 503 });
  }
}

export async function POST(req: Request, ctx: Ctx) {
  const slug = await resolve(ctx);
  if (!slug) return NextResponse.json({ error: "Unknown post" }, { status: 404 });
  if (!likesEnabled) return NextResponse.json({ enabled: false });
  try {
    const count = await like(slug, visitorId(req));
    return NextResponse.json({ enabled: true, count, liked: true });
  } catch (err) {
    console.error("likes POST failed", err);
    return NextResponse.json({ error: "Could not save like" }, { status: 503 });
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  const slug = await resolve(ctx);
  if (!slug) return NextResponse.json({ error: "Unknown post" }, { status: 404 });
  if (!likesEnabled) return NextResponse.json({ enabled: false });
  try {
    const count = await unlike(slug, visitorId(req));
    return NextResponse.json({ enabled: true, count, liked: false });
  } catch (err) {
    console.error("likes DELETE failed", err);
    return NextResponse.json({ error: "Could not remove like" }, { status: 503 });
  }
}
