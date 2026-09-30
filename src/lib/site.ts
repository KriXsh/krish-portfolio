const RESUME_ID = "17IshLoqvq43ccBGErfJb_26s0oQ0feUK";

export const RESUME_URL = `https://drive.google.com/file/d/${RESUME_ID}/view?usp=sharing`;
export const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_ID}`;
export const LEETCODE_URL = "https://leetcode.com/u/KriXsh999/";

/** Canonical site origin. Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every
    build; NEXT_PUBLIC_SITE_URL overrides it (e.g. once a custom domain is live). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://krish-portfolio-six.vercel.app")
).replace(/\/$/, "");

export const SITE_NAME = "Krishnendu Ghosal";
export const SITE_TITLE = "Krishnendu Ghosal | Full-Stack, AI/ML & Cloud Engineer";
export const SITE_DESCRIPTION =
  "Software engineer building AI-powered platforms, event-driven data pipelines and cloud infrastructure. Full-stack, AI/ML, Kafka, Kubernetes and AWS.";
