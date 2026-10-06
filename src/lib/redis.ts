import { Redis } from "@upstash/redis";

// One shared Upstash Redis client (blog likes, KAI rate limits), or null when
// it isn't configured. Accepts both naming schemes: UPSTASH_REDIS_REST_* from
// the Upstash console, and KV_REST_API_* from Vercel's Marketplace integration.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;
