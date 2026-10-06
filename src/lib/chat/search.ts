// Small BM25 keyword search over KAI's knowledge chunks. Picks the context sent
// to the model, and on its own powers backup mode (no AI) when Groq is off.

import { CHUNKS, PROFILE_CHUNK, type Chunk } from "./knowledge";
import { JOBS } from "@/content/experience";
import { CASE_STUDIES } from "@/content/case-studies";
import { PITCH, SKILLS } from "@/content/profile";

const STOPWORDS = new Set(
  "a an the and or but if of to in on at for from by with about as is are was were be been being do does did have has had i me my you your he him his she her it its we our they them their this that these those what which who whom whose when where why how can could would should will shall may might must tell know give show any some all more most much many very just also than then there here into over under out up down so not no yes please hi hello hey krish krishnendu ghosal kai work worked working doing done up to".split(" "),
);

// Visitors' words → words the content actually uses.
const SYNONYMS: Record<string, string[]> = {
  job: ["experience", "role"],
  company: ["experience"],
  companies: ["experience"],
  career: ["experience"],
  ai: ["llm", "ml", "agent", "rag"],
  genai: ["llm", "rag", "agent"],
  llm: ["ai", "rag", "bedrock"],
  ml: ["ai", "sagemaker"],
  devops: ["kubernetes", "ci", "cd", "docker", "jenkins"],
  cloud: ["aws", "kubernetes"],
  k8s: ["kubernetes"],
  hire: ["available", "freelance", "services"],
  cv: ["resume"],
  college: ["education", "university"],
  degree: ["education"],
  voice: ["speech", "stt", "tts"],
  fintech: ["fintech", "api"],
  government: ["gov", "ministries", "b2g"],
  frontend: ["react", "next"],
  backend: ["node", "python", "api"],
};

function stem(w: string) {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9+#.]+/)
    .map((w) => w.replace(/^\.+|\.+$/g, ""))
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
    .map(stem);
}

type Doc = { chunk: Chunk; tf: Map<string, number>; len: number };

// Title and keywords count extra so "Kafka" finds the Kafka case study first.
// The "Case study:"/"Blog:" prefix is left out, or "study" would match every case study.
const docs: Doc[] = CHUNKS.map((chunk) => {
  const title = chunk.title.replace(/^(Case study|Project|Blog|Recommendation from):?\s*/i, "");
  const tokens = [
    ...tokenize(chunk.text),
    ...Array(3).fill(tokenize(title)).flat(),
    ...Array(2).fill(tokenize((chunk.keywords ?? []).join(" "))).flat(),
  ];
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  return { chunk, tf, len: tokens.length };
});
const avgLen = docs.reduce((s, d) => s + d.len, 0) / docs.length;
const df = new Map<string, number>();
for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
const idf = (t: string) => Math.log(1 + (docs.length - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));

function expand(query: string): string[] {
  const base = tokenize(query);
  const extra = base.flatMap((t) => (SYNONYMS[t] ?? []).map(stem));
  return [...new Set([...base, ...extra])];
}

export type Hit = { chunk: Chunk; score: number };

// Direct answers and case studies are the best reads; blog posts and long
// recommendations only win when they're clearly the better match.
const BOOST: Partial<Record<Chunk["kind"], number>> = { faq: 1.3, "case-study": 1.15, blog: 0.8, testimonial: 0.7 };

export function search(query: string, limit = 5): Hit[] {
  const terms = expand(query);
  if (!terms.length) return [];
  const k1 = 1.4;
  const b = 0.5; // gentle length penalty: list answers are long but often the best match
  return docs
    .map((d) => {
      let score = 0;
      for (const t of terms) {
        const f = d.tf.get(t);
        if (!f) continue;
        score += idf(t) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)));
      }
      return { chunk: d.chunk, score: score * (BOOST[d.chunk.kind] ?? 1) };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Context for the model: the profile, plus the best matches for the question.
    `history` (earlier user turns) helps with follow-ups like "tell me more". */
export function retrieve(question: string, history: string[] = [], limit = 5): Chunk[] {
  const hits = search(question, limit);
  // A vague follow-up ("what stack did you use there?") borrows the previous question's topic.
  if (hits.length < 2 && history.length) {
    for (const h of search(`${history.at(-1)} ${question}`, limit)) {
      if (!hits.some((x) => x.chunk.id === h.chunk.id)) hits.push(h);
    }
  }
  const chunks = hits.slice(0, limit).map((h) => h.chunk);
  return chunks.some((c) => c.id === PROFILE_CHUNK.id) ? chunks : [PROFILE_CHUNK, ...chunks];
}

// Small talk gets a friendly reply instead of a search result.
const END = String.raw`[\s!.?,]*(kai|bot|buddy|there)?[\s!.?]*$`;
const SMALL_TALK: [RegExp, string][] = [
  [new RegExp(String.raw`^\s*(hi+|hello|hey+|yo|hola|namaste|sup|what'?s up|good (morning|afternoon|evening))` + END, "i"),
    "Hi! I'm KAI, Krish's assistant. Ask me about his experience, case studies, projects, skills or availability."],
  [new RegExp(String.raw`^\s*(how are (you|u)|how'?s it going|how do you do|how are things)` + END, "i"),
    "I'm doing great, thanks for asking! I'm here to tell you about Krish's work. What would you like to know: his experience, a case study, or whether he's available?"],
  [new RegExp(String.raw`^\s*(who|what) (are|r) (you|u)` + END, "i"),
    "I'm KAI, short for Krish's AI. I answer questions about Krish using the content of this portfolio: his experience, case studies, projects, skills and how to work with him."],
  [new RegExp(String.raw`^\s*(thanks|thank (you|u)|thx|ty|great|cool|awesome|nice|perfect|ok(ay)?|got it)` + END, "i"),
    "Happy to help! Anything else you'd like to know about Krish?"],
  [/\b(where (does|do|is) (he|krish|you)\b.*\b(live|based|located|from|stay)|location|which city|relocat)/i,
    "Krish's location isn't listed on this site. He's open to remote work; to ask about location or relocation, reach him through the [contact form](/#contact)."],
  [/\b(why (should|would|do) (i|we|you)\b.*\b(hire|choose|pick|work with)|why (hire|choose|pick) (him|krish)|what makes (him|krish)|stand(s)? out|convince me|sell me)/i,
    `${PITCH}\n\n[See the case studies →](/case-studies)`],
  [new RegExp(String.raw`^\s*(bye|goodbye|see (you|ya)|cya)` + END, "i"),
    "Thanks for stopping by! If you'd like to work with Krish, the [contact form](/#contact) is the quickest way to reach him."],
];

// Questions about Krish himself ("what does he do?") vs. filler with no topic.
const ABOUT_KRISH = /\b(krish|krishnendu|he|him|his)\b/i;

const ALL_SKILLS = Object.entries(SKILLS).flatMap(([group, items]) => items.map((name) => ({ name, group })));
const SKILL_QUESTION = /\b(know|knows|use|used|uses|using|familiar|experience|experienced|skill|skilled|proficient|good at|work(ed)? with|worked on)\b/i;
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const mentions = (haystack: string, word: string) => new RegExp(`(^|[^a-z0-9])${escape(word.toLowerCase())}([^a-z0-9]|$)`).test(haystack.toLowerCase());

const andList = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}`);

/** "Does he know Kubernetes?" → yes/no from the skills list, plus where he used it. */
function skillAnswer(question: string): string | null {
  if (!SKILL_QUESTION.test(question)) return null;
  const skill = ALL_SKILLS.find(({ name }) =>
    name
      .split(/[\s/(),&]+/)
      .filter((w) => w.length > 1 && !["and", "js"].includes(w.toLowerCase()))
      .some((w) => mentions(question, w.replace(/\.js$/i, ""))),
  );
  if (!skill) return null;
  const word = skill.name.split(/[\s/(]/)[0].replace(/\.js$/i, "");
  const jobs = JOBS.filter((j) => [...j.stack, ...j.roles.flatMap((r) => r.bullets)].some((t) => mentions(t, word)));
  const cases = CASE_STUDIES.filter((c) => [...c.stack, c.summary, ...c.approach.map((a) => a.detail)].some((t) => mentions(t, word)));
  let text = `Yes. **${skill.name}** is part of Krish's ${skill.group} toolkit.`;
  if (jobs.length) text += ` He has used it at ${andList(jobs.map((j) => j.company))}.`;
  if (cases.length) text += `\n\nSee it in action: ${cases.slice(0, 3).map((c) => `[${c.title}](/case-studies/${c.slug})`).join(" · ")}`;
  return `${text}\n\n[All skills →](/#skills)`;
}

/** Backup mode: answer from the content directly, no model involved. */
export function localAnswer(question: string, history: string[] = []): string {
  for (const [pattern, reply] of SMALL_TALK) if (pattern.test(question)) return reply;

  const skill = skillAnswer(question);
  if (skill) return skill;

  // A question made only of filler words: "What does Krish do?" gets the
  // introduction; anything else gets a nudge towards what KAI can answer.
  if (!tokenize(question).length) {
    const intro = CHUNKS.find((c) => c.id === "faq:Who is Krish?");
    if (ABOUT_KRISH.test(question) && intro?.answer) return `${intro.answer}\n\n[Read more →](${intro.href})`;
    return "I'm best at questions about Krish. Try asking about his experience, a case study, his skills, or whether he's available for work.";
  }

  let hits = search(question, 4);
  if (!hits.length && history.length) hits = search(`${history.at(-1)} ${question}`, 4);
  if (!hits.length || hits[0].score < 1.5) {
    return "I'm not sure about that one. Try asking about Krish's experience, case studies, projects or skills, or [ask him directly](/#contact).";
  }

  const [top, ...rest] = hits;
  const related = rest.filter((h) => h.score > top.score * 0.5 && h.chunk.id !== top.chunk.id).slice(0, 2);
  const more = related.length ? `\n\n**Related:** ${related.map((h) => `[${h.chunk.title}](${h.chunk.href})`).join(" · ")}` : "";

  if (top.chunk.answer) return `${top.chunk.answer}\n\n[Read more →](${top.chunk.href})${more}`;

  // Trim long chunks (testimonials, jobs) to a readable size.
  const body = top.chunk.text.length > 600 ? `${top.chunk.text.slice(0, 600).replace(/\s+\S*$/, "")}…` : top.chunk.text;
  return `Here's what I found in **${top.chunk.title}**:\n\n${body}\n\n[Read more →](${top.chunk.href})${more}`;
}
