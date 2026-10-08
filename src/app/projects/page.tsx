import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, BookMarked, Github, GitCommitHorizontal, Star, Users } from "lucide-react";
import { ContributionGraph } from "@/components/github/ContributionGraph";
import { LivePreview } from "@/components/github/LivePreview";
import { RepoExplorer } from "@/components/github/RepoExplorer";
import { GITHUB_USER, getContributions, getProfile, getRepos } from "@/lib/github";
import { LIVE_PROJECTS, languageColor } from "@/lib/showcase";
import { CoffeeButton } from "@/components/coffee/CoffeeButton";
import { Petals } from "@/components/ui/petals";
import { Vine } from "@/components/ui/vine";
import { RoseCorner } from "@/components/ui/rose-corner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects & GitHub | Krishnendu Ghosal",
  description: "Live demos, open-source repositories and GitHub activity from Krishnendu Ghosal.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: "Projects & GitHub | Krishnendu Ghosal" },
};

function SectionTitle({ index, eyebrow, title }: { index: string; eyebrow: string; title: React.ReactNode }) {
  return (
    <div className="mb-8 md:mb-10">
      <Vine className="mb-12 md:mb-16" />
      <p className="mb-3 flex items-center gap-3 eyebrow text-muted-foreground uppercase">
        <span className="font-display text-base text-champagne normal-case">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-rose to-transparent" />
        {eyebrow}
        <span className="text-rose">✦</span>
      </p>
      <h2 className="font-display text-display-md font-normal text-foreground">{title}</h2>
    </div>
  );
}

export default async function ProjectsPage() {
  const [profile, repos, contributions] = await Promise.all([getProfile(), getRepos(), getContributions()]);
  // eslint-disable-next-line react-hooks/purity -- server render, refreshed with the page every hour
  const now = Date.now();

  const byName = new Map(repos.map((r) => [r.name, r]));
  const totalStars = repos.reduce((s, r) => s + r.stars, 0);
  const liveCount = repos.filter((r) => r.homepage).length;
  const allTime = contributions ? Object.values(contributions.totals).reduce((a, b) => a + b, 0) : 0;

  const langCounts = new Map<string, number>();
  repos.forEach((r) => r.language && langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1));
  const langs = [...langCounts.entries()].sort((a, b) => b[1] - a[1]);
  const langTotal = langs.reduce((s, [, n]) => s + n, 0) || 1;
  const recent = repos.slice(0, 6);

  const stats = [
    { icon: BookMarked, k: repos.length, v: "Repositories" },
    { icon: GitCommitHorizontal, k: allTime.toLocaleString(), v: "Contributions" },
    { icon: Star, k: totalStars, v: "Stars earned" },
    { icon: Users, k: profile?.followers ?? 0, v: "Followers" },
  ];

  return (
    <main id="main" className="relative isolate min-h-screen overflow-x-clip bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <Petals
        name="projects-page"
        scroll
        className="-z-10"
        petals={[
          { className: "-right-6 top-24 h-24 w-20 md:right-[3%] md:top-28 md:h-32 md:w-28", rotate: -40, duration: 15 },
          { className: "-left-8 top-[40rem] hidden h-20 w-16 md:block", rotate: 130, duration: 13, blur: true },
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] grid-lines mask-fade-b opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-[radial-gradient(ellipse_50%_55%_at_25%_0%,rgba(42,79,143,0.22),transparent_70%),radial-gradient(ellipse_40%_45%_at_95%_20%,rgba(192,132,87,0.12),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] grain opacity-[0.05] mix-blend-overlay" />

      <div className="relative mx-auto max-w-6xl">

        {/* Profile header */}
        <header className="mb-20 grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          {profile && (
            <div className="relative mx-auto h-36 w-36 lg:mx-0 lg:h-44 lg:w-44">
              <div aria-hidden className="absolute -inset-2 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-primary),var(--color-rose),var(--color-champagne),var(--color-violet),var(--color-primary))]" />
              <Image
                src={profile.avatarUrl}
                alt={`${GITHUB_USER} on GitHub`}
                width={176}
                height={176}
                className="relative h-full w-full rounded-full border-4 border-background object-cover"
              />
            </div>
          )}
          <div className="text-center lg:text-left">
            <p className="mb-3 eyebrow text-champagne uppercase"><span className="text-rose">✦</span> Projects · Open source</p>
            <h1 className="font-display text-display-lg font-normal text-foreground">
              Everything I&apos;ve <span className="text-gradient italic">shipped.</span>
            </h1>
            <p className="mt-2 font-script text-3xl text-rose md:text-4xl">a garden of things I&apos;ve grown</p>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg lg:mx-0">
              Live demos, {repos.length} public repositories, and the contribution history behind them.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href={profile?.htmlUrl ?? `https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
              >
                <Github className="h-4 w-4" /> @{profile?.login ?? GITHUB_USER} <ArrowUpRight className="h-4 w-4" />
              </a>
              <CoffeeButton />
              <span className="w-full font-mono text-xs text-subtle lg:w-auto">{liveCount} projects with live demos</span>
            </div>
          </div>
        </header>

        <dl className="mb-20 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ icon: Icon, k, v }) => (
            <div key={v} className="group relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-5 transition-colors duration-500 hover:border-rose/40">
              <RoseCorner className="absolute top-3 right-3" />
              <Icon className="mb-4 h-4 w-4 text-gh-accent" />
              <dt className="font-display text-3xl font-normal text-foreground">{k}</dt>
              <dd className="mt-1 font-mono text-[10px] tracking-widest text-subtle uppercase">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Live demos */}
        <section className="mb-24">
          <SectionTitle
            index="01"
            eyebrow="Live demos"
            title={
              <>
                See them <span className="text-gradient italic">live.</span>
              </>
            }
          />
          <div className="grid gap-6 md:grid-cols-2">
            {LIVE_PROJECTS.map((p) => {
              const repo = byName.get(p.repo);
              return <LivePreview key={p.repo} project={p} stars={repo?.stars} language={repo?.language} repoUrl={repo?.htmlUrl} />;
            })}
          </div>
        </section>

        {/* Activity */}
        <section className="mb-24">
          <SectionTitle index="02" eyebrow="GitHub activity" title={<>Commit <span className="text-gradient italic">garden.</span></>} />
          {contributions ? (
            <ContributionGraph days={contributions.days} totals={contributions.totals} />
          ) : (
            <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted-foreground">
              Contribution data is unavailable right now.{" "}
              <a href={`https://github.com/${GITHUB_USER}`} className="text-foreground underline">See it on GitHub</a>.
            </p>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Languages */}
            <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
              <p className="mb-5 eyebrow text-subtle uppercase">Languages across repos</p>
              <div className="mb-6 flex h-3 overflow-hidden rounded-full">
                {langs.map(([l, n]) => (
                  <span key={l} title={`${l}: ${n}`} style={{ width: `${(n / langTotal) * 100}%`, background: languageColor(l) }} />
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {langs.map(([l, n]) => (
                  <li key={l} className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: languageColor(l) }} />
                    <span className="text-foreground">{l}</span>
                    <span className="ml-auto font-mono text-xs text-subtle">{Math.round((n / langTotal) * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recently pushed */}
            <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
              <p className="mb-5 eyebrow text-subtle uppercase">Recently pushed</p>
              <ol className="relative space-y-4 border-l border-border pl-5">
                {recent.map((r) => (
                  <li key={r.name} className="relative">
                    <span className="absolute top-1.5 -left-[25px] h-2.5 w-2.5 rounded-full border-2 border-surface bg-gh-accent" />
                    <a href={r.htmlUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-champagne hover:underline">
                      {r.name}
                    </a>
                    <p className="font-mono text-[11px] text-subtle">
                      {new Date(r.pushedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {r.language ? ` · ${r.language}` : ""}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* All repos */}
        <section>
          <SectionTitle
            index="03"
            eyebrow="Repositories"
            title={
              <>
                All the <span className="text-gradient italic">work.</span>
              </>
            }
          />
          {repos.length ? (
            <RepoExplorer repos={repos} now={now} />
          ) : (
            <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted-foreground">
              Couldn&apos;t reach GitHub just now.{" "}
              <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} className="text-foreground underline">Browse the repos on GitHub</a>.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
