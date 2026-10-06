// KAI's knowledge base: every piece of site content, split into small,
// self-contained chunks that can be searched and handed to the model.
// Server-only in practice (imported by /api/chat), but has no Node APIs.

import { JOBS } from "@/content/experience";
import { CASE_STUDIES, DISCIPLINES, type Discipline } from "@/content/case-studies";
import { PROJECTS } from "@/content/projects";
import { TESTIMONIALS } from "@/content/testimonials";
import { POSTS } from "@/lib/blog";
import { CERTIFICATIONS, EDUCATION, FAQ, PROFILE, SERVICES, SKILLS } from "@/content/profile";

export type Chunk = {
  id: string;
  kind: "faq" | "profile" | "experience" | "case-study" | "project" | "blog" | "testimonial" | "skills" | "education" | "services";
  title: string;
  /** Where to read more on the site (or an external link). */
  href: string;
  text: string;
  /** Extra search terms that aren't in the text. */
  keywords?: string[];
  /** For FAQ chunks: the ready-made answer used in backup mode. */
  answer?: string;
};

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

function build(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    kind: "profile",
    title: `About ${PROFILE.nickname}`,
    href: "/#whoami",
    text: [
      `${PROFILE.name} ("${PROFILE.nickname}"), ${PROFILE.headline}.`,
      PROFILE.summary,
      PROFILE.story,
      `Strengths:\n${list(PROFILE.strengths)}`,
      `Values: ${PROFILE.values.join(", ")}. Motto: "${PROFILE.quote}"`,
      `Availability: ${PROFILE.availability}`,
      `Contact: contact form at ${PROFILE.contact.form}, email ${PROFILE.contact.email}, LinkedIn ${PROFILE.contact.linkedin}, GitHub ${PROFILE.contact.github}, LeetCode ${PROFILE.contact.leetcode}, resume ${PROFILE.contact.resume}.`,
    ].join("\n"),
    keywords: ["about", "who", "bio", "background", "contact", "available", "hire"],
  });

  for (const f of FAQ) {
    chunks.push({
      id: `faq:${f.q}`,
      kind: "faq",
      title: f.q,
      href: f.href ?? "/#contact",
      text: `Q: ${f.q}\nA: ${f.a}`,
      keywords: f.keywords,
      answer: f.a,
    });
  }

  // Answers built from the structured content, so they never go stale.
  chunks.push({
    id: "faq:companies",
    kind: "faq",
    title: "Where has Krish worked?",
    href: "/#experience",
    text: `Krish's work history, newest first:\n${list(JOBS.map((j) => `${j.company}: ${j.roles.map((r) => r.title).join(", then ")} (${j.date})`))}`,
    keywords: ["companies", "company", "employers", "career", "history", "previous", "jobs", "employer"],
    answer: `Krish has worked at ${JOBS.length} companies since January 2023:\n\n${list(JOBS.map((j) => `**${j.company}**: ${j.roles[0].title} (${j.date})`))}`,
  });
  // Worked out when the server starts, so it stays current without edits.
  const oldest = [...JOBS].sort((a, b) => a.start.localeCompare(b.start))[0];
  const current = JOBS.find((j) => !j.end) ?? JOBS[0];
  const first = oldest.start;
  const [fy, fm] = first.split("-").map(Number);
  const now = new Date();
  const months = (now.getFullYear() - fy) * 12 + now.getMonth() + 1 - fm;
  const years = Math.floor(months / 12);
  const span = months % 12 >= 6 ? `${years}.5+ years` : `${years}+ years`;
  chunks.push({
    id: "faq:years",
    kind: "faq",
    title: "How long has Krish been working?",
    href: "/#experience",
    text: `Krish has been working professionally since ${oldest.date.split(/\s+-\s+/)[0]} (about ${span}), across ${JOBS.length} companies.`,
    keywords: ["years", "year", "long", "senior", "seniority", "level", "yoe", "much"],
    answer: `Krish has about **${span}** of professional experience, starting as ${oldest.roles.at(-1)!.title} at ${oldest.company} (${oldest.date.split(/\s+-\s+/)[0]}) and now ${current.roles[0].title} at ${current.company}. Along the way he has worked across gov-tech, fintech, B2B and B2C products at ${JOBS.length} companies.`,
  });
  chunks.push({
    id: "faq:blog",
    kind: "faq",
    title: "Krish's blog",
    href: "/blog",
    text: `Blog posts:\n${list(POSTS.map((p) => p.title))}`,
    keywords: ["blog", "posts", "articles", "written", "writes", "writing", "wrote"],
    answer: `Krish writes about the engineering behind his work:\n\n${list(POSTS.map((p) => `[${p.title}](/blog/${p.slug})`))}`,
  });
  chunks.push({
    id: "faq:education",
    kind: "faq",
    title: "What did Krish study?",
    href: "/#education",
    text: EDUCATION.map((e) => `${e.degree}, ${e.institution} (${e.period}), ${e.grade}.`).join("\n"),
    keywords: ["study", "studied", "education", "degree", "college", "university", "graduate", "graduated", "btech", "qualification"],
    answer: `Krish has a **${EDUCATION[0].degree}** from ${EDUCATION[0].institution} (${EDUCATION[0].period}, ${EDUCATION[0].grade}). Before that he completed ${EDUCATION[1].degree} at ${EDUCATION[1].institution} (${EDUCATION[1].grade}).`,
  });

  const featured = [...CASE_STUDIES].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  chunks.push({
    id: "faq:case-studies",
    kind: "faq",
    title: "Krish's case studies",
    href: "/case-studies",
    text: `Case studies:\n${list(featured.map((c) => `${c.title} (${c.company}): ${c.summary}`))}`,
    keywords: ["case", "studies", "study", "best", "favourite", "favorite", "featured", "highlight", "proudest", "impressive"],
    answer: `Krish has written up ${CASE_STUDIES.length} case studies. A good place to start is **[${featured[0].title}](/case-studies/${featured[0].slug})**: ${featured[0].summary}\n\nOthers:\n${list(featured.slice(1, 5).map((c) => `[${c.title}](/case-studies/${c.slug})`))}`,
  });
  chunks.push({
    id: "faq:projects",
    kind: "faq",
    title: "Krish's projects",
    href: "/projects",
    text: `Personal projects:\n${list(PROJECTS.map((p) => `${p.title}: ${p.description}`))}`,
    keywords: ["projects", "project", "built", "build", "side", "demos", "portfolio", "apps", "made"],
    answer: `Some things Krish has built on his own:\n\n${list(PROJECTS.map((p) => `**${p.title}**: ${p.description.split(/(?<=\.)\s/)[0]}`))}\n\nThe projects page has every public repo and live demo.`,
  });

  // "Tell me about his AI work", "his Kafka work"… one answer per discipline.
  const AREA_WORDS: Record<Discipline, string[]> = {
    "full-stack": ["full-stack", "fullstack", "frontend", "backend", "web", "react", "next", "node", "api", "apis"],
    data: ["data", "pipeline", "pipelines", "etl", "crawler", "crawlers", "migration", "scraping"],
    "event-driven": ["event", "event-driven", "kafka", "streaming", "pubsub", "async", "queue", "realtime"],
    ai: ["ai", "ml", "llm", "llms", "genai", "agent", "agents", "machine", "learning", "rag", "voice", "speech"],
    devops: ["devops", "cloud", "aws", "kubernetes", "k8s", "docker", "cicd", "deployment", "infrastructure", "infra"],
  };
  for (const d of DISCIPLINES) {
    const cases = CASE_STUDIES.filter((c) => c.disciplines.includes(d.id));
    if (!cases.length) continue;
    chunks.push({
      id: `faq:area:${d.id}`,
      kind: "faq",
      title: `Krish's ${d.label} work`,
      href: `/case-studies/${cases[0].slug}`,
      text: `${d.label} work:\n${list(cases.map((c) => `${c.title} (${c.company}, ${c.period}): ${c.summary}`))}`,
      // Listed twice: these area words should beat a job that merely mentions them.
      keywords: ["work", ...AREA_WORDS[d.id], ...AREA_WORDS[d.id]],
      answer: `Here's Krish's ${d.label} work:\n\n${list(cases.map((c) => `**[${c.title}](/case-studies/${c.slug})** at ${c.company}: ${c.summary}`))}`,
    });
  }

  for (const job of JOBS) {
    chunks.push({
      id: `job:${job.id}`,
      kind: "experience",
      title: `${job.company} (${job.date})`,
      href: `/#${job.id}`,
      text: [
        `Company: ${job.company}. Dates: ${job.date} (${job.tenure === "Current" ? "current job" : job.tenure}).`,
        job.roles.length > 1 ? `Promoted: ${[...job.roles].reverse().map((r) => r.title).join(" → ")}. Roles below are newest first.` : "",
        ...job.roles.map((r) => `Role: ${r.title} (${r.date})\n${list(r.bullets)}`),
        job.metrics ? `Results: ${job.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join("; ")}.` : "",
        `Stack: ${job.stack.join(", ")}.`,
      ]
        .filter(Boolean)
        .join("\n"),
      keywords: ["experience", "work", "job", "role", "company", job.short, ...job.categories],
    });
  }

  for (const cs of CASE_STUDIES) {
    chunks.push({
      id: `case:${cs.slug}`,
      kind: "case-study",
      title: `Case study: ${cs.title}`,
      href: `/case-studies/${cs.slug}`,
      text: [
        `Case study "${cs.title}" at ${cs.company} (${cs.period}). Written by Krish in the first person.`,
        cs.summary,
        `Context: ${cs.context}`,
        `Challenge: ${cs.challenge}`,
        `Approach:\n${list(cs.approach.map((a) => `${a.title}: ${a.detail}`))}`,
        cs.metrics ? `Results: ${cs.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join("; ")}.` : "",
        `Highlights:\n${list(cs.highlights)}`,
        `Stack: ${cs.stack.join(", ")}.`,
      ]
        .filter(Boolean)
        .join("\n"),
      keywords: ["case", "project", "built", ...cs.disciplines],
    });
  }

  for (const p of PROJECTS) {
    chunks.push({
      id: `project:${p.title}`,
      kind: "project",
      title: `Project: ${p.title}`,
      href: "tryHref" in p && p.tryHref ? p.tryHref : p.link,
      text: `Personal project "${p.title}" (${p.date}). ${p.description}\nTech: ${p.tech.join(", ")}.\nLink: ${p.link}`,
      keywords: ["project", "side", "demo", "portfolio", "built"],
    });
  }

  chunks.push({
    id: "skills",
    kind: "skills",
    title: "Skills & tech stack",
    href: "/#skills",
    text: Object.entries(SKILLS)
      .map(([group, items]) => `${group}: ${items.join(", ")}.`)
      .join("\n"),
    keywords: ["skills", "stack", "tech", "technologies", "tools", "languages", "know", "frameworks"],
  });

  chunks.push({
    id: "education",
    kind: "education",
    title: "Education & certifications",
    href: "/#education",
    text: [
      ...EDUCATION.map((e) => `${e.degree}, ${e.institution} (${e.period}), ${e.grade}.`),
      `Certifications & awards:\n${list(CERTIFICATIONS)}`,
    ].join("\n"),
    keywords: ["education", "degree", "college", "university", "study", "studied", "school", "certification", "certified", "certificate", "award"],
  });

  chunks.push({
    id: "services",
    kind: "services",
    title: "Services",
    href: "/services",
    text: [
      "Freelance services Krish offers:",
      list(SERVICES.map((s) => `${s.title}: ${s.detail} (${s.stack.join(", ")})`)),
      PROFILE.availability,
    ].join("\n"),
    keywords: ["services", "freelance", "hire", "offer", "mvp", "consulting", "help", "engagement"],
  });

  for (const post of POSTS) {
    chunks.push({
      id: `blog:${post.slug}`,
      kind: "blog",
      title: `Blog: ${post.title}`,
      href: `/blog/${post.slug}`,
      text: `Blog post by Krish, "${post.title}" (${post.date}). ${post.description} Tags: ${post.tags.join(", ")}.`,
      keywords: ["blog", "article", "post", "wrote", "writing"],
    });
  }

  for (const t of TESTIMONIALS) {
    chunks.push({
      id: `testimonial:${t.name}`,
      kind: "testimonial",
      title: `Recommendation from ${t.name}`,
      href: "/testimonials",
      text: `LinkedIn recommendation from ${t.name} (${t.headline}), who ${t.relationship}, ${t.date}:\n"${t.text}"`,
      keywords: ["recommendation", "testimonial", "review", "feedback", "colleague", "say", "people"],
    });
  }

  return chunks;
}

export const CHUNKS = build();
export const PROFILE_CHUNK = CHUNKS.find((c) => c.id === "profile")!;
