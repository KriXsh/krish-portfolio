"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Heart, PartyPopper, Smartphone } from "lucide-react";
import { CoffeeCup } from "./CoffeeCup";
import { MAX_CUSTOM, MENU, MIN_CUSTOM, QR_IMAGE, UPI_IDS, fillFor, upiLink } from "@/lib/coffee";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const NOTE_MAX = 40;

export function CoffeeBar({ initialItem }: { initialItem?: string }) {
  const [itemId, setItemId] = useState<string>(
    MENU.some((m) => m.id === initialItem) ? (initialItem as string) : "cappuccino",
  );
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [thanked, setThanked] = useState(false);

  const isCustom = itemId === "custom";
  const item = MENU.find((m) => m.id === itemId);
  const customAmount = Math.round(Number(custom));
  const customValid = Number.isFinite(customAmount) && customAmount >= MIN_CUSTOM && customAmount <= MAX_CUSTOM;
  const amount = isCustom ? (customValid ? customAmount : 0) : (item?.price ?? 0) * qty;
  const level = isCustom ? (customValid ? fillFor(customAmount) : 0.08) : Math.min(1, (item?.fill ?? 0) + (qty - 1) * 0.12);
  // The printed QR pays the first ID, so the phone button pays the same one.
  const vpa = UPI_IDS[0].vpa;
  const link = amount ? upiLink(vpa, amount, note) : "";
  const lineLabel = isCustom ? "Custom pour" : `${item?.name} × ${qty}`;

  const copy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked: the ID is visible to copy by hand */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Menu + cup */}
      <div className="glass relative overflow-hidden rounded-[2rem] p-6 md:p-8 lg:col-span-7">
        <div aria-hidden className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#c08457]/15 blur-[90px]" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-subtle uppercase">Menu</p>
            <ul className="mt-5 space-y-2" role="radiogroup" aria-label="Choose a coffee">
              {[...MENU, { id: "custom", name: "Custom pour", price: 0, blurb: "Pick your own amount.", fill: 0 }].map((m) => {
                const selected = m.id === itemId;
                return (
                  <li key={m.id} role="none">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setItemId(m.id);
                        setThanked(false);
                      }}
                      className={cn(
                        "relative flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors",
                        selected ? "text-foreground" : "text-muted-foreground hover:bg-ink/[0.03] hover:text-foreground",
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="coffee-pick"
                          className="absolute inset-0 -z-0 rounded-2xl bg-ink/[0.06] ring-1 ring-[#c08457]/50"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative min-w-0 flex-1">
                        <span className="block font-display text-base font-semibold">{m.name}</span>
                        <span className="block text-xs text-subtle">{m.blurb}</span>
                      </span>
                      <span className="relative font-mono text-sm">{m.id === "custom" ? "₹ ?" : `₹${m.price}`}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <AnimatePresence mode="wait" initial={false}>
              {isCustom ? (
                <motion.label
                  key="custom"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 block overflow-hidden"
                >
                  <span className="sr-only">Custom amount in rupees</span>
                  <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/50 px-4 py-3 focus-within:border-[#c08457]/70">
                    <span className="font-mono text-muted-foreground">₹</span>
                    <input
                      inputMode="numeric"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
                      placeholder={`${MIN_CUSTOM} – ${MAX_CUSTOM}`}
                      className="w-full bg-transparent font-mono text-foreground outline-none placeholder:text-subtle"
                    />
                  </div>
                  {custom && !customValid && (
                    <p className="mt-1.5 pl-1 text-xs text-rose-600 dark:text-rose-300">
                      Between ₹{MIN_CUSTOM} and ₹{MAX_CUSTOM}, please.
                    </p>
                  )}
                </motion.label>
              ) : (
                <motion.div
                  key="qty"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-background/40 px-4 py-2.5"
                >
                  <span className="text-sm text-muted-foreground">How many?</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setQty(n)}
                        className={cn(
                          "h-9 w-9 rounded-full font-mono text-sm transition-colors",
                          qty === n ? "bg-foreground text-background" : "text-muted-foreground hover:bg-ink/[0.06]",
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="mt-3 block">
              <span className="sr-only">Note for Krish</span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
                placeholder="Add a note (shows up in the payment)"
                className="w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none placeholder:text-subtle focus:border-[#c08457]/70"
              />
            </label>
          </div>

          <div className="mx-auto w-48 md:w-56">
            <CoffeeCup level={level} className="w-full drop-shadow-[0_20px_40px_rgba(192,132,87,0.25)]" />
            <p className="mt-2 text-center font-mono text-[11px] tracking-widest text-subtle uppercase">
              {Math.round(level * 100)}% full
            </p>
          </div>
        </div>
      </div>

      {/* Receipt */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${itemId}-${qty}-${thanked}`}
            initial={{ clipPath: "inset(0 0 100% 0)", y: -12 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative rounded-t-2xl bg-[#f5efe6] px-6 pt-7 pb-10 font-mono text-[13px] text-[#2a1a10] shadow-[0_30px_80px_-30px_var(--color-shadow)] [mask-image:linear-gradient(#000,#000),radial-gradient(circle_at_8px_100%,transparent_7px,#000_7.5px)] [mask-size:100%_calc(100%-8px),16px_8px] [mask-position:top,bottom] [mask-repeat:no-repeat,repeat-x]"
          >
            {thanked ? (
              <div className="py-10 text-center">
                <PartyPopper className="mx-auto h-10 w-10 text-[#b45309]" />
                <p className="mt-4 font-display text-2xl font-bold">Thank you!</p>
                <p className="mt-2 text-[#6b4f3a]">Your coffee keeps the commits coming. It means a lot.</p>
                <button
                  type="button"
                  onClick={() => setThanked(false)}
                  className="mt-6 text-xs underline underline-offset-4"
                >
                  Buy another
                </button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <p className="font-display text-lg font-bold tracking-tight">KRISH&apos;S COFFEE BAR</p>
                  <p className="text-[11px] text-[#6b4f3a]">Brewed with code · Paid with UPI</p>
                </div>
                <div className="my-4 border-t border-dashed border-[#2a1a10]/30" />
                <div className="flex justify-between">
                  <span>{lineLabel}</span>
                  <span>₹{amount || "--"}</span>
                </div>
                {note && <p className="mt-1 truncate text-[11px] text-[#6b4f3a]">&ldquo;{note}&rdquo;</p>}
                <div className="mt-2 flex justify-between text-[11px] text-[#6b4f3a]">
                  <span>Tax</span>
                  <span>₹0 (good vibes only)</span>
                </div>
                <div className="my-4 border-t border-dashed border-[#2a1a10]/30" />
                <div className="flex justify-between text-base font-bold">
                  <span>TOTAL</span>
                  <span>₹{amount || "--"}</span>
                </div>

                <div className="mt-6 flex flex-col items-center">
                  {/* The printed code is light-on-dark; inverted here to dark-on-light,
                      which every scanner reads. */}
                  <div className="rounded-xl bg-white p-2 shadow-[0_8px_24px_-12px_rgba(42,26,16,0.5)]">
                    <Image
                      src={QR_IMAGE}
                      alt={`UPI QR code for ${UPI_IDS[0].vpa}`}
                      width={176}
                      height={176}
                      className="h-44 w-44 rounded-lg [filter:invert(1)_contrast(1.15)]"
                    />
                  </div>
                  <p className="mt-3 text-center text-[12px] font-semibold">
                    {amount ? <>Scan &amp; enter ₹{amount}</> : "Scan with any UPI app"}
                  </p>
                  <p className="mt-0.5 text-center text-[11px] text-[#6b4f3a]">GPay · PhonePe · Paytm · any UPI app</p>
                </div>

                {/* Phones can skip the QR and open their UPI app with the amount filled in. */}
                {link && (
                  <a
                    href={link}
                    className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#2a1a10] py-3.5 font-sans text-sm font-semibold text-[#f5efe6] md:hidden"
                  >
                    <Smartphone className="h-4 w-4" /> Pay ₹{amount} in UPI app
                  </a>
                )}

                <ul className="mt-5 divide-y divide-[#2a1a10]/10 rounded-xl bg-[#2a1a10]/[0.06] px-3">
                  {UPI_IDS.map((u, i) => (
                    <li key={u.vpa} className="flex items-center justify-between gap-2 py-2">
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#6b4f3a] uppercase">
                          {u.label}
                          {i === 0 && " · this QR"}
                        </p>
                        <p className="truncate text-xs">{u.vpa}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copy(u.vpa)}
                        aria-label={`Copy ${u.label} UPI ID`}
                        className="flex shrink-0 items-center gap-1 rounded-full border border-[#2a1a10]/20 px-3 py-1.5 text-[11px]"
                      >
                        {copied === u.vpa ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied === u.vpa ? "Copied" : "Copy"}
                      </button>
                    </li>
                  ))}
                </ul>

                {link && (
                  <button
                    type="button"
                    onClick={() => setThanked(true)}
                    className="mt-4 flex w-full items-center justify-center gap-1.5 text-[11px] text-[#6b4f3a] underline-offset-4 hover:underline"
                  >
                    <Heart className="h-3 w-3" /> I&apos;ve paid
                  </button>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
