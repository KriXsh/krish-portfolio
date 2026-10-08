import type { Metadata } from "next";
import { ArrowUpRight, Check, Github, Landmark, Mail, ShieldCheck } from "lucide-react";
import { CoffeeBar } from "@/components/coffee/CoffeeBar";
import { BANK_REQUEST_MAILTO, SPONSORS_URL, USD_BANK } from "@/lib/coffee";
import { Petals } from "@/components/ui/petals";

export const metadata: Metadata = {
  title: "Buy me a coffee | Krishnendu Ghosal",
  description: "Fuel the open-source work with a coffee, paid instantly over UPI.",
  alternates: { canonical: "/support" },
  openGraph: { url: "/support", title: "Buy me a coffee | Krishnendu Ghosal" },
};

export default async function SupportPage({ searchParams }: { searchParams: Promise<{ item?: string }> }) {
  const { item } = await searchParams;

  return (
    <main id="main" className="relative isolate min-h-screen overflow-hidden bg-background px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <Petals
        name="support-page"
        scroll
        className="-z-10"
        petals={[
          { className: "-right-6 top-24 h-24 w-20 md:right-[6%] md:top-32 md:h-36 md:w-28", rotate: 35, duration: 15 },
          { className: "-left-8 top-[30rem] hidden h-16 w-14 md:block", rotate: -140, duration: 12, blur: true },
        ]}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines mask-fade-b opacity-50" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-[34rem] w-[34rem] rounded-full bg-primary/25 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-champagne/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">

        <div className="mb-12 max-w-4xl">
          <p className="mb-4 eyebrow text-champagne uppercase">Open · Brewing daily</p>
          <h1 className="font-display text-display-lg font-normal text-foreground">
            Krish&apos;s{" "}
            <span className="bg-gradient-to-r from-[#f1e3c6] via-[#d4b07f] to-[#e4cfa8] bg-clip-text text-transparent">
              Coffee Bar
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Pick a drink, watch it pour, and pay straight from your UPI app. Every cup keeps the servers running and
            the open-source repos shipping.
          </p>
        </div>

        <CoffeeBar initialItem={item} />

        {/* Paying in USD */}
        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-champagne uppercase">Outside India</p>
              <h2 className="mt-2 font-display text-3xl font-normal text-foreground md:text-4xl">Pay in USD</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">Cards through GitHub, or a US bank transfer for larger payments and invoices.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Card */}
            <div className="flex flex-col rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.05] ring-1 ring-ink/10">
                  <Github className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-medium text-foreground">GitHub Sponsors</p>
                  <p className="text-sm text-muted-foreground">Any card · one-time or monthly</p>
                </div>
              </div>
              <ul className="mb-8 space-y-2.5 text-sm text-muted-foreground">
                {["Best for tips of any size", "Pay from anywhere in the world", "Recurring support for open source"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-glow" /> {t}
                  </li>
                ))}
              </ul>
              <a
                href={SPONSORS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background"
              >
                Sponsor on GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* US bank transfer */}
            <div className="flex flex-col rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.05] ring-1 ring-ink/10">
                  <Landmark className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-medium text-foreground">US bank transfer</p>
                  <p className="text-sm text-muted-foreground">From a US bank account · USD</p>
                </div>
              </div>
              <dl className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-background/40 p-4">
                  <dt className="font-mono text-[10px] tracking-widest text-subtle uppercase">ACH</dt>
                  <dd className="mt-1 font-display text-lg font-medium text-foreground">${USD_BANK.achMin}+</dd>
                  <dd className="text-xs text-muted-foreground">{USD_BANK.achDays}</dd>
                </div>
                <div className="rounded-2xl border border-border bg-background/40 p-4">
                  <dt className="font-mono text-[10px] tracking-widest text-subtle uppercase">Wire</dt>
                  <dd className="mt-1 font-display text-lg font-medium text-foreground">${USD_BANK.wireMin.toLocaleString()}+</dd>
                  <dd className="text-xs text-muted-foreground">{USD_BANK.wireDays} · invoices</dd>
                </div>
              </dl>
              <p className="mb-8 flex items-start gap-2.5 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
                Account details are shared privately by email, never posted here. Wires under ${USD_BANK.wireMin.toLocaleString()} can&apos;t be accepted, so use ACH for smaller amounts.
              </p>
              <a
                href={BANK_REQUEST_MAILTO}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-ink/25"
              >
                <Mail className="h-4 w-4" /> Request bank details
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
