import { NextResponse } from "next/server";
import { POST_SLUGS } from "@/lib/blog";
import { getCounts, likesEnabled } from "@/lib/likes-store";

export const dynamic = "force-dynamic";

/** All posts' like counts in one call, for the blog index cards. */
export async function GET() {
  if (!likesEnabled) return NextResponse.json({ enabled: false, counts: {} });
  try {
    const counts = await getCounts(POST_SLUGS);
    return NextResponse.json({ enabled: true, counts }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } });
  } catch (err) {
    console.error("likes index failed", err);
    return NextResponse.json({ enabled: false, counts: {} }, { status: 503 });
  }
}
