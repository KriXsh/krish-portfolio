"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { Reveal } from "@/components/ui/reveal";
import { LEETCODE_URL } from "@/lib/site";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "That email doesn't look right.";
  if (values.message.trim().length < 10) errors.message = "A few more words, at least 10 characters.";
  return errors;
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 flex items-center gap-1.5 overflow-hidden pl-1 text-xs text-rose-600 dark:text-rose-300"
        >
          <AlertCircle className="h-3 w-3" /> {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  // Honeypot: hidden from people, so anything typed here came from a bot.
  const [company, setCompany] = useState("");
  const errors = validate(values);

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (status !== "idle" && status !== "loading") setStatus("idle");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...values, botcheck: company }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        setValues({ name: "", email: "", message: "" });
        setTouched({});
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const input = (field: Field) =>
    cn(
      "peer w-full rounded-2xl border bg-background/50 px-4 pt-6 pb-2.5 text-foreground outline-none transition-all placeholder-transparent",
      touched[field] && errors[field]
        ? "border-rose-400/50 focus:border-rose-400"
        : touched[field] && !errors[field]
          ? "border-emerald-400/30 focus:border-emerald-400/60"
          : "border-border focus:border-primary/70",
      "focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]",
    );

  const label =
    "pointer-events-none absolute top-2 left-4 text-[11px] font-medium tracking-wide text-subtle transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-glow";

  return (
    <div className="py-28 md:py-36">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface">
        <div aria-hidden className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[120px]" />
        <div aria-hidden className="absolute -right-40 -bottom-40 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-[120px]" />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />

        <div className="relative grid gap-14 p-5 sm:p-8 md:p-14 lg:grid-cols-2 lg:p-20 [&>*]:min-w-0">
          <div>
            <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              <span className="text-glow">09</span>
              <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
              Contact
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.25rem,4.2vw,4rem)] leading-[0.98] font-bold tracking-[-0.035em] text-foreground">
                Ready to build
                <br />
                <span className="text-gradient">the future?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted-foreground md:text-lg">
                Currently open to roles in Singapore, Thailand, UK, USA, India, Germany or Remote that push the
                boundaries of Full-stack, AI and Cloud Computing.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 space-y-6">
              {/* A friendly face next to the form: people reach out to a person, not a page. */}
              <div className="glass grid max-w-md grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 rounded-3xl p-4 sm:gap-x-5 sm:gap-y-1 sm:pr-6">
                <div className="relative shrink-0 sm:row-span-2">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-ink/10 sm:h-20 sm:w-20">
                    <Image
                      src="/Krish1.jpg"
                      alt="Krishnendu Ghosal smiling"
                      fill
                      sizes="80px"
                      className="origin-[51%_40%] scale-[1.75] object-cover object-[50%_30%]"
                    />
                  </div>
                  <span className="absolute right-0.5 bottom-0.5 h-4 w-4 rounded-full border-[3px] border-surface bg-emerald-400" />
                </div>
                <div className="min-w-0 self-end">
                  <p className="font-display text-lg font-semibold text-foreground">Hi, I&apos;m Krish 👋</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Available for new projects</p>
                </div>
                <a
                  href="mailto:krishnendughosal999@gmail.com"
                  className="group col-span-2 inline-flex min-w-0 items-center gap-2 border-t border-border pt-3 text-[13px] text-muted-foreground sm:text-sm transition-colors hover:text-foreground sm:col-span-1 sm:col-start-2 sm:self-start sm:border-0 sm:pt-0"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="relative truncate">
                    krishnendughosal999@gmail.com
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                </a>
              </div>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/KriXsh", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/krish-me", label: "LinkedIn" },
                  { icon: SiLeetcode, href: LEETCODE_URL, label: "LeetCode" },
                ].map(({ icon: Icon, href, label }) => (
                  <Magnetic key={label} strength={0.5}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="glass flex h-14 w-14 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="glass space-y-4 rounded-[2rem] p-6 md:p-8">
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                {/* Honeypot. Deliberately not called "company"/"website"/etc: Chrome
                    autofills those from the visitor's profile despite autoComplete="off",
                    which silently dropped real messages. */}
                <label htmlFor="hp-botcheck">Leave this field empty</label>
                <input
                  id="hp-botcheck"
                  name="hp-botcheck"
                  type="text"
                  tabIndex={-1}
                  autoComplete="new-password"
                  data-1p-ignore
                  data-lpignore="true"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={update("name")}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    className={input("name")}
                    aria-invalid={!!(touched.name && errors.name)}
                  />
                  <label htmlFor="name" className={label}>Name</label>
                </div>
                <FieldError message={touched.name ? errors.name : undefined} />
              </div>
              <div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={values.email}
                    onChange={update("email")}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className={input("email")}
                    aria-invalid={!!(touched.email && errors.email)}
                  />
                  <label htmlFor="email" className={label}>Email</label>
                </div>
                <FieldError message={touched.email ? errors.email : undefined} />
              </div>
              <div>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="How can I help?"
                    value={values.message}
                    onChange={update("message")}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    className={cn(input("message"), "resize-none")}
                    aria-invalid={!!(touched.message && errors.message)}
                  />
                  <label htmlFor="message" className={label}>Message</label>
                </div>
                <FieldError message={touched.message ? errors.message : undefined} />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-sm font-semibold transition-all disabled:opacity-70",
                  status === "success" ? "bg-emerald-500 text-white" : "bg-foreground text-background",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={status}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2"
                  >
                    {status === "loading" && (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>)}
                    {status === "success" && (<><CheckCircle2 className="h-4 w-4" /> Message sent!</>)}
                    {(status === "idle" || status === "error") && (
                      <>
                        Send message
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-xs text-rose-600 dark:text-rose-300"
                  >
                    Something went wrong, the mail service may be unavailable right now. Please email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
