import { buildSystemPrompt } from "@/lib/chat/prompt";
import { localAnswer, retrieve } from "@/lib/chat/search";
import { visitorId } from "@/lib/likes-store";
import { redis } from "@/lib/redis";

// KAI, the portfolio chat assistant.
//
// Env (see .env.example):
//   GROQ_API_KEY   AI answers via Groq (free tier: https://console.groq.com/keys).
//                  Without it KAI runs in backup mode: it searches the site
//                  content and answers with the best match, no AI involved.
//   GROQ_MODEL     optional, defaults to openai/gpt-oss-120b. Models available to
//                  your key: https://console.groq.com/docs/models
//   CHAT_MODE      optional. "search" forces backup mode even with a key set.
//   UPSTASH_REDIS_REST_URL / _TOKEN (or Vercel's KV_REST_API_URL / _TOKEN)
//                  optional, enables per-visitor rate limits.
//
// The instructions live in src/lib/chat/prompt.ts. Only the few chunks of site
// content that match the question are sent with them (src/lib/chat/search.ts),
// which keeps each request well inside Groq's free-tier token limits.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/** Read per request, so changing the env (or adding a key) needs no restart. */
function groqConfig() {
  const key = process.env.GROQ_API_KEY;
  if (!key || process.env.CHAT_MODE === "search") return null;
  return { key, model: process.env.GROQ_MODEL || "openai/gpt-oss-120b" };
}

const MAX_TURNS = 8;
const MAX_CHARS = 600;
const LIMIT_PER_HOUR = 30;

type Turn = { role: "user" | "assistant"; content: string };

function textStream(text: string, mode: "ai" | "search") {
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8", "x-kai-mode": mode, "cache-control": "no-store" } });
}

async function rateLimited(req: Request) {
  if (!redis) return false;
  try {
    const key = `kai:rl:${visitorId(req)}:${Math.floor(Date.now() / 3_600_000)}`;
    const n = await redis.incr(key);
    if (n === 1) await redis.expire(key, 3600);
    return n > LIMIT_PER_HOUR;
  } catch {
    return false; // Redis trouble shouldn't take the chat down.
  }
}

/** Turns Groq's server-sent events into a plain text stream of the answer. */
function relay(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(bytes, controller) {
        buffer += decoder.decode(bytes, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.trim();
          if (!data.startsWith("data:")) continue;
          const payload = data.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            // Partial or keep-alive line; ignore.
          }
        }
      },
    }),
  );
}

export async function POST(req: Request) {
  let turns: Turn[];
  try {
    const body = await req.json();
    turns = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Turn) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
      .slice(-MAX_TURNS)
      .map((m: Turn) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? MAX_CHARS : 2000) }));
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const last = turns.at(-1);
  if (!last || last.role !== "user" || !last.content.trim()) {
    return Response.json({ error: "Ask me something about Krish" }, { status: 400 });
  }
  if (await rateLimited(req)) {
    return Response.json({ error: "You're asking faster than I can think! Try again in a little while." }, { status: 429 });
  }

  const question = last.content.trim();
  const earlier = turns.slice(0, -1).filter((t) => t.role === "user").map((t) => t.content);

  const groq = groqConfig();
  if (!groq) return textStream(localAnswer(question, earlier), "search");

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${groq.key}` },
      body: JSON.stringify({
        model: groq.model,
        stream: true,
        temperature: 0.3,
        // gpt-oss models think before answering; that thinking counts towards
        // max_tokens, so leave room for it and keep it short.
        max_tokens: 1200,
        ...(groq.model.startsWith("openai/gpt-oss") && { reasoning_effort: "low" }),
        messages: [
          { role: "system", content: buildSystemPrompt(retrieve(question, earlier)) },
          ...turns,
        ],
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok || !res.body) {
      // Out of free quota (429), bad key, model retired… fall back instead of failing.
      console.error(`KAI: Groq returned ${res.status}, answering in backup mode`);
      return textStream(localAnswer(question, earlier), "search");
    }
    return new Response(relay(res.body), {
      headers: { "content-type": "text/plain; charset=utf-8", "x-kai-mode": "ai", "cache-control": "no-store" },
    });
  } catch (err) {
    console.error("KAI: Groq request failed, answering in backup mode", err);
    return textStream(localAnswer(question, earlier), "search");
  }
}
