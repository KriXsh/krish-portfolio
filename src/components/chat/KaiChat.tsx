"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp, RotateCcw, Square, X } from "lucide-react";
import { KaiOrb } from "./KaiOrb";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string; error?: boolean };

const SUGGESTIONS = [
  "What does Krish do?",
  "Tell me about his AI work",
  "Which companies has he worked at?",
  "Show me his best case study",
  "Is he available for freelance?",
  "How can I contact him?",
];

const EASE = [0.16, 1, 0.3, 1] as const;
const TEASER_KEY = "kai:teaser-seen";

/** Links in answers: site pages navigate in place (and close the panel on
    mobile, where it covers the page); everything else opens a new tab. */
function MdLink({ href = "", children, onNavigate }: { href?: string; children: React.ReactNode; onNavigate: () => void }) {
  const cls = "font-medium text-glow underline decoration-glow/30 underline-offset-4 transition-colors hover:decoration-glow";
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onNavigate} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

function Typing() {
  return (
    <span className="inline-flex items-center gap-1 py-1.5" aria-label="KAI is thinking">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export default function KaiChat() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // A one-time hello bubble a few seconds into the first visit.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 7000);
    return () => clearTimeout(t);
  }, []);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    try {
      localStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  // While open: Escape closes, the input gets focus, and on phones (where the
  // panel is full screen) the page behind stops scrolling.
  useEffect(() => {
    if (!open) return;
    dismissTeaser();
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const phone = window.matchMedia("(max-width: 639px)").matches;
    if (phone) lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      if (phone) lenis?.start();
    };
  }, [open, lenis, close, dismissTeaser]);

  // Follow the answer as it streams in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: busy ? "auto" : "smooth" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    const history: Message[] = [...messages.filter((m) => !m.error), { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;

    const update = (content: string, error = false) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content, error }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        update(data?.error ?? "Something went wrong on my side. Please try again.", true);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        update(answer);
      }
      if (!answer.trim()) update("I couldn't come up with an answer. Try rephrasing, or ask Krish via the [contact form](/#contact).", true);
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setMessages((prev) => {
          const lastMsg = prev.at(-1);
          return lastMsg && !lastMsg.content ? prev.slice(0, -1) : prev;
        });
      } else {
        update("I can't reach the server right now. Check your connection and try again.", true);
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    inputRef.current?.focus();
  };

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content));
  const quickReplies = SUGGESTIONS.filter((s) => !asked.has(s)).slice(0, 3);
  const onNavigate = () => {
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  };

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
          >
            <AnimatePresence>
              {teaser && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="glass relative max-w-[16rem] rounded-2xl rounded-br-md bg-surface/90 p-4 pr-9 text-sm shadow-[0_20px_50px_-20px_var(--color-shadow)]"
                >
                  <button onClick={dismissTeaser} aria-label="Dismiss" className="absolute top-2.5 right-2.5 rounded-full p-1 text-subtle hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <p className="font-semibold text-foreground">Hi, I&apos;m KAI.</p>
                  <p className="mt-1 text-muted-foreground">Krish&apos;s AI assistant. Ask me anything about his work.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              ref={launcherRef}
              onClick={() => setOpen(true)}
              aria-label="Chat with KAI, Krish's AI assistant"
              aria-haspopup="dialog"
              className="group glass flex items-center gap-3 rounded-full bg-surface/80 p-1.5 shadow-[0_18px_50px_-15px_rgba(99,102,241,0.6)] transition-transform duration-300 hover:-translate-y-0.5 sm:pr-5"
            >
              <KaiOrb size={44} />
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-semibold text-foreground">Ask KAI</span>
                <span className="block font-mono text-[10px] tracking-widest text-subtle uppercase">Krish&apos;s AI</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="false"
            aria-label="KAI, Krish's AI assistant"
            initial={{ opacity: 0, scale: 0.92, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 24, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-surface sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(640px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-[1.75rem] sm:border sm:border-border sm:bg-surface/95 sm:shadow-[0_40px_120px_-30px_var(--color-shadow)] sm:backdrop-blur-xl"
          >
            {/* Aurora */}
            <div aria-hidden className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-primary/25 blur-[80px]" />
            <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-48 w-48 rounded-full bg-cyan/15 blur-[80px]" />

            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-border px-4 py-3.5">
              <KaiOrb size={38} active={busy} />
              <div className="min-w-0 flex-1">
                <p className="font-display text-base leading-tight font-bold text-foreground">
                  KAI <span className="text-gradient">· Krish&apos;s AI</span>
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {busy ? "Thinking…" : "Answers from Krish's portfolio"}
                </p>
              </div>
              {messages.length > 0 && (
                <button onClick={reset} aria-label="Start a new chat" title="New chat" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-ink/5 hover:text-foreground">
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button onClick={close} aria-label="Close chat" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-ink/5 hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conversation */}
            <div ref={scrollRef} data-lenis-prevent className="relative flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col justify-end">
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}>
                    <KaiOrb size={56} />
                    <h2 className="mt-5 font-display text-2xl font-bold text-foreground">
                      Hi, I&apos;m <span className="text-gradient">KAI.</span>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Krish&apos;s AI assistant. Ask me about his experience, case studies, projects, or how to work with him.
                    </p>
                  </motion.div>
                  <div className="mt-6 grid gap-2">
                    {SUGGESTIONS.map((s, i) => (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.05 }}
                        onClick={() => send(s)}
                        className="group flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                      >
                        {s}
                        <ArrowUp className="h-3.5 w-3.5 rotate-45 text-subtle transition-transform group-hover:rotate-90 group-hover:text-glow" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {messages.map((m, i) =>
                    m.role === "user" ? (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-4 py-2.5 text-sm whitespace-pre-wrap text-background"
                      >
                        {m.content}
                      </motion.div>
                    ) : (
                      <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
                        <KaiOrb size={26} active={busy && i === messages.length - 1} className="mt-0.5" />
                        <div
                          className={cn(
                            "min-w-0 flex-1 text-sm leading-relaxed text-foreground/90",
                            "[&_li]:mt-1 [&_ol]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li::marker]:text-glow",
                            m.error && "text-rose-600 dark:text-rose-300",
                          )}
                        >
                          {m.content ? (
                            <>
                              <ReactMarkdown
                                components={{
                                  a: ({ href, children }) => (
                                    <MdLink href={href} onNavigate={onNavigate}>
                                      {children}
                                    </MdLink>
                                  ),
                                }}
                              >
                                {m.content}
                              </ReactMarkdown>
                              {busy && i === messages.length - 1 && (
                                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-glow" />
                              )}
                            </>
                          ) : (
                            <Typing />
                          )}
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="relative border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              {messages.length > 0 && !busy && quickReplies.length > 0 && (
                <div data-lenis-prevent className="mb-2.5 flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]">
                  {quickReplies.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2 rounded-2xl border border-border bg-background/60 p-1.5 pl-4 transition-colors focus-within:border-primary/50"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 600))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask about Krish…"
                  aria-label="Your question"
                  className="max-h-28 min-h-[2.25rem] flex-1 resize-none bg-transparent py-2 text-base text-foreground outline-none placeholder:text-subtle [field-sizing:content] sm:text-sm"
                />
                {busy ? (
                  <button
                    type="button"
                    onClick={() => abortRef.current?.abort()}
                    aria-label="Stop answering"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/10 text-foreground"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    aria-label="Send"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-violet to-cyan text-white transition-opacity disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                )}
              </form>
              <p className="mt-2 text-center text-[11px] text-subtle">KAI answers from Krish&apos;s portfolio and can make mistakes.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
