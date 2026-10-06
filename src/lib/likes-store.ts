import { createHash } from "node:crypto";
import { redis } from "@/lib/redis";

// Real like counts for blog posts, stored in Upstash Redis.
// Env: UPSTASH_REDIS_REST_URL/_TOKEN or KV_REST_API_URL/_TOKEN (see .env.example).
// Without them, likes are disabled server-side and the UI falls back to a
// private, local-only like with no public count.

export const likesEnabled = Boolean(redis);

const countKey = (slug: string) => `blog:likes:${slug}`;
const voterKey = (slug: string, voter: string) => `blog:liked:${slug}:${voter}`;
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Anonymous, non-reversible visitor id: hash of IP + user agent. */
export function visitorId(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const ua = req.headers.get("user-agent") ?? "";
  return createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 32);
}

export async function getCount(slug: string): Promise<number> {
  if (!redis) return 0;
  return (await redis.get<number>(countKey(slug))) ?? 0;
}

export async function getCounts(slugs: string[]): Promise<Record<string, number>> {
  if (!redis || !slugs.length) return {};
  const values = await redis.mget<(number | null)[]>(...slugs.map(countKey));
  return Object.fromEntries(slugs.map((s, i) => [s, values[i] ?? 0]));
}

export async function hasLiked(slug: string, voter: string): Promise<boolean> {
  if (!redis) return false;
  return (await redis.exists(voterKey(slug, voter))) === 1;
}

/** One like per visitor: the voter marker is set with NX, so repeats don't count. */
export async function like(slug: string, voter: string): Promise<number> {
  if (!redis) return 0;
  const first = await redis.set(voterKey(slug, voter), 1, { nx: true, ex: ONE_YEAR });
  if (first === "OK") return redis.incr(countKey(slug));
  return getCount(slug);
}

export async function unlike(slug: string, voter: string): Promise<number> {
  if (!redis) return 0;
  const removed = await redis.del(voterKey(slug, voter));
  if (removed === 1) {
    const next = await redis.decr(countKey(slug));
    if (next < 0) {
      await redis.set(countKey(slug), 0);
      return 0;
    }
    return next;
  }
  return getCount(slug);
}
