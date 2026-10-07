"use client";

import { useRef, type ComponentType } from "react";
import { ArrowUpRight, BadgeCheck, Code2, Cpu, GraduationCap, ShieldCheck, Trophy, X } from "lucide-react";
import { SiClaude } from "react-icons/si";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { RoseCorner } from "@/components/ui/rose-corner";
import { Vine } from "@/components/ui/vine";
import { WaxSeal } from "@/components/ui/wax-seal";

type Achievement = {
  title: string;
  org: string;
  icon: ComponentType<{ className?: string }>;
  link: string;
  type: string;
  /** A second place the credential can be checked, e.g. a Credly badge.
      Without a link the badge still shows, just not as a link. */
  verify?: { label: string; link?: string };
  featured?: boolean;
  /** Only listed in the "View all" popup, not on the page. */
  more?: boolean;
};

const achievements: Achievement[] = [
  {
    title: "Claude Certified Developer - Foundations",
    org: "Anthropic",
    icon: SiClaude,
    link: "https://drive.google.com/file/d/1Dqg8pcfCLSiwoBrOsk82gu8Op_jLdvJS/view",
    type: "Certification",
    // TODO: paste the public Credly badge URL here to make the badge clickable.
    verify: { label: "Credly verified" },
    featured: true,
  },
  {
    title: "Claude Certified Associate - Foundations",
    org: "Anthropic",
    icon: SiClaude,
    link: "https://drive.google.com/file/d/1-dOU4aXuG12L0TeGrvpKNHI_dLPIBVlO/view?usp=sharing",
    type: "Certification",
    verify: { label: "Verify on Credly", link: "https://www.credly.com/badges/cd067e9d-a3b6-4224-a063-086cdfdcc67b/public_url" },
    featured: true,
  },
  {
    title: "Jumpstart - Competitive Coding",
    org: "PublicSapients",
    icon: Trophy,
    link: "https://drive.google.com/file/d/1Z0v9-NOUBZaz982hYjLJ35cZU8XnXMJd/view",
    type: "Award",
  },
  {
    title: "Java Foundations",
    org: "HackerRank",
    icon: Code2,
    link: "https://www.hackerrank.com/certificates/a9ef7324ba06",
    type: "Certification",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    org: "Invincible Ocean",
    icon: Cpu,
    link: "https://drive.google.com/file/d/1ESxV2paQckfDhXPmNI0_eVNQRX27XQ_E/view",
    type: "Certification",
    more: true,
  },
  {
    title: "OOP Using Python",
    org: "E-Box",
    icon: Code2,
    link: "https://drive.google.com/file/d/14qmR5CtTvig-TS3PkIbMimDUwG7vw-xp/view",
    type: "Certification",
    more: true,
  },
  {
    title: "Website Hacking / Penetration Testing",
    org: "Udemy",
    icon: ShieldCheck,
    link: "https://drive.google.com/file/d/1q7Yk9bujRJzulgYD7LiLQiV74T5hzcOH/view",
    type: "Professional Training",
    more: true,
  },
];

const badgeClass =
  "relative z-[2] inline-flex items-center gap-1.5 rounded-full border border-champagne/30 bg-champagne/10 px-2.5 py-0.5 text-xs font-medium text-champagne transition-colors";

function VerifyBadge({ verify }: { verify: NonNullable<Achievement["verify"]> }) {
  const body = (
    <>
      <BadgeCheck className="h-3.5 w-3.5" />
      {verify.label}
    </>
  );
  return verify.link ? (
    <a href={verify.link} target="_blank" rel="noopener noreferrer" className={`${badgeClass} hover:bg-champagne/20`}>
      {body}
    </a>
  ) : (
    <span className={badgeClass}>{body}</span>
  );
}

/** Credentials: the two Anthropic certifications sealed in wine wax, two
    supporting ones as hover-rose cards, the rest behind "View all", and the
    degree as a closing line
    (it keeps the #education anchor that KAI and old links point to). */
/** Every credential in one list, in a native <dialog>: Esc, focus trapping and
    the backdrop come from the browser. */
function AllCredentials({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const close = () => dialogRef.current?.close();
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="all-credentials-title"
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto w-[min(40rem,calc(100vw-2rem))] max-h-[85svh] overflow-hidden rounded-[2rem] border border-border bg-surface p-0 text-foreground shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop:bg-[#0b0708]/80 backdrop:backdrop-blur-sm open:animate-[hero-rise_0.5s_var(--ease-out-expo)]"
    >
      <div className="relative isolate flex max-h-[85svh] flex-col">
        <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_100%_0%,rgba(163,41,61,0.25),transparent_70%)]" />
        <div className="flex items-start justify-between gap-4 p-6 pb-4 md:p-8 md:pb-5">
          <div>
            <p className="eyebrow text-champagne">
              <span className="text-rose">✦</span> {achievements.length} credentials
            </p>
            <h3 id="all-credentials-title" className="mt-2 font-display text-3xl text-foreground">
              All <span className="text-gradient italic">certifications.</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-rose/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul data-lenis-prevent className="divide-y divide-border overflow-y-auto border-t border-border px-3 pb-3 md:px-4">
          {achievements.map(({ title, org, icon: Icon, link, type }) => (
            <li key={title}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-rose/[0.07]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.04] ring-1 ring-ink/10">
                  <Icon className="h-[18px] w-[18px] text-glow" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg leading-snug text-foreground">{title}</span>
                  <span className="block text-sm text-muted-foreground">
                    {org} · <span className="text-subtle">{type}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:rotate-45 group-hover:text-rose" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

export default function Certifications() {
  const featured = achievements.filter((a) => a.featured);
  const rest = achievements.filter((a) => !a.featured && !a.more);
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <div className="pb-28 md:pb-36">
      <SectionHeading
        index="06"
        eyebrow="Credentials"
        title={
          <>
            Certified, <span className="text-gradient italic">sealed.</span>
          </>
        }
        description="The certifications that matter most to the work I do now, plus where it all began."
      />

      <RevealGroup className="grid gap-5 md:grid-cols-2" stagger={0.1}>
        {featured.map(({ title, org, icon: Icon, link, type, verify }) => (
          <RevealItem key={title}>
            <div className="group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface p-7 transition-colors duration-500 hover:border-rose/40 md:p-9">
              <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`${title} - ${org}`} className="absolute inset-0 z-[1]" />
              <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(163,41,61,0.22),transparent_70%)]" />
              <span aria-hidden className="absolute inset-0 -z-10 grain opacity-[0.05] mix-blend-overlay" />
              <WaxSeal label={org.toUpperCase()} className="pointer-events-none absolute top-5 right-5 w-20 md:top-7 md:right-7 md:w-24" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/30 to-rose/5 ring-1 ring-rose/40">
                <Icon className="h-7 w-7 text-[#f0a6a0] transition-transform duration-700 ease-out-expo group-hover:rotate-[60deg]" />
              </span>
              <p className="relative mt-8 eyebrow text-[0.62rem] text-subtle">{type}</p>
              <h3 className="relative mt-2 pr-16 font-display text-2xl leading-tight text-foreground md:pr-0 md:text-[2rem]">{title}</h3>
              <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="eyebrow text-[0.65rem] text-muted-foreground">{org}</p>
                  {verify && <VerifyBadge verify={verify} />}
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-rose group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <RevealGroup className="mt-5 grid gap-5 md:grid-cols-2" stagger={0.08}>
        {rest.map(({ title, org, icon: Icon, link, type }) => (
          <RevealItem key={title}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate flex items-center gap-5 overflow-hidden rounded-3xl border border-border bg-surface p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-rose/40 md:p-6"
            >
              <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_0%_100%,rgba(163,41,61,0.2),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/[0.04] ring-1 ring-ink/10">
                <Icon className="h-5 w-5 text-glow" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl text-foreground">{title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {org} · <span className="text-subtle">{type}</span>
                </span>
              </span>
              <RoseCorner className="shrink-0" />
            </a>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-6 flex justify-center md:justify-start">
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-rose/50"
        >
          View all {achievements.length} certifications
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </button>
      </div>
      <AllCredentials dialogRef={dialog} />

      {/* Where it began: the degree, as one closing line instead of a section. */}
      <Vine className="mt-14 md:mt-16" />
      <Reveal>
        <div id="education" className="mt-8 flex scroll-mt-28 flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c8475c,#5e1422)] ring-1 ring-[#e8a9a1]/40">
              <GraduationCap className="h-5 w-5 text-[#f6e3d6]" />
            </span>
            <div>
              <p className="font-display text-xl text-foreground md:text-2xl">B.Tech in Computer Science &amp; Engineering</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Lovely Professional University · 2019 – 2023</p>
            </div>
          </div>
          <p className="font-script text-3xl text-rose">where it all began</p>
        </div>
      </Reveal>
    </div>
  );
}
