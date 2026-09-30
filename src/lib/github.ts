// Server-side GitHub data for /projects. Every fetch is cached and revalidated
// hourly (ISR), so visitors never hit GitHub directly and the page stays fast.
// Each fetcher returns null / [] on failure so the page degrades instead of breaking.

export const GITHUB_USER = "KriXsh";
const REVALIDATE = 3600;

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

export type Profile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  createdAt: string;
};

export type Repo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  topics: string[];
};

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { totals: Record<string, number>; days: ContributionDay[] };

async function getJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, { ...init, next: { revalidate: REVALIDATE } });
    if (!res.ok) {
      console.error(`GitHub fetch ${res.status}: ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`GitHub fetch failed: ${url}`, err);
    return null;
  }
}

export async function getProfile(): Promise<Profile | null> {
  const u = await getJson<Record<string, unknown>>(`https://api.github.com/users/${GITHUB_USER}`, { headers });
  if (!u) return null;
  return {
    login: String(u.login),
    name: (u.name as string) ?? null,
    bio: ((u.bio as string) ?? "").trim() || null,
    avatarUrl: String(u.avatar_url),
    htmlUrl: String(u.html_url),
    publicRepos: Number(u.public_repos ?? 0),
    followers: Number(u.followers ?? 0),
    createdAt: String(u.created_at),
  };
}

/** Public, non-fork repos, most recently pushed first. */
export async function getRepos(): Promise<Repo[]> {
  const raw = await getJson<Record<string, unknown>[]>(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
    { headers },
  );
  if (!raw) return [];
  return raw
    .filter((r) => !r.fork && !r.archived && r.name !== GITHUB_USER)
    .map((r) => ({
      name: String(r.name),
      description: ((r.description as string) ?? "").trim() || null,
      htmlUrl: String(r.html_url),
      homepage: ((r.homepage as string) ?? "").trim() || null,
      language: (r.language as string) ?? null,
      stars: Number(r.stargazers_count ?? 0),
      forks: Number(r.forks_count ?? 0),
      pushedAt: String(r.pushed_at),
      topics: (r.topics as string[]) ?? [],
    }));
}

/** Daily contribution counts for every year on the profile. GitHub's REST API
    doesn't expose the calendar, so this uses the public mirror of the profile
    graph (github-contributions-api.jogruber.de). */
export async function getContributions(): Promise<Contributions | null> {
  const data = await getJson<{ total: Record<string, number>; contributions: ContributionDay[] }>(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=all`,
  );
  if (!data) return null;
  return { totals: data.total ?? {}, days: data.contributions ?? [] };
}
