import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Link2 } from "lucide-react";
import { slugifyHeading } from "@/lib/blog";
import { CodeBlock } from "./CodeBlock";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

function Heading({ level, children }: { level: 2 | 3; children: ReactNode }) {
  const id = slugifyHeading(textOf(children));
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      id={id}
      className={
        level === 2
          ? "group mt-14 mb-5 scroll-mt-28 font-display text-2xl leading-tight font-normal text-foreground md:text-3xl"
          : "group mt-10 mb-4 scroll-mt-28 font-display text-xl font-medium text-foreground"
      }
    >
      <a href={`#${id}`} className="inline-flex items-center gap-2 no-underline">
        {children}
        <Link2 aria-hidden className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-50" />
      </a>
    </Tag>
  );
}

const components: Components = {
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  p: ({ children }) => <p className="my-5 leading-[1.8] text-foreground/85">{children}</p>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-glow underline decoration-glow/40 underline-offset-4 transition-colors hover:decoration-glow"
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  ul: ({ children, className }) => (
    <ul className={className?.includes("contains-task-list") ? "my-5 space-y-2" : "my-5 list-disc space-y-2 pl-6 marker:text-glow"}>{children}</ul>
  ),
  ol: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6 marker:font-mono marker:text-subtle">{children}</ol>,
  li: ({ children, className }) => (
    <li className={className?.includes("task-list-item") ? "flex items-start gap-3 leading-relaxed text-foreground/85" : "pl-1 leading-relaxed text-foreground/85"}>{children}</li>
  ),
  input: ({ checked }) => (
    <span
      aria-hidden
      className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked ? "border-emerald-500 bg-emerald-500" : "border-border-strong"}`}
    />
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-violet/5 to-transparent px-6 py-1 [&_p]:text-foreground">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-border" />,
  table: ({ children }) => (
    <div className="my-7 overflow-x-auto rounded-2xl border border-border" data-lenis-prevent>
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-elevated">{children}</thead>,
  th: ({ children }) => <th className="border-b border-border px-4 py-3 font-semibold text-foreground">{children}</th>,
  td: ({ children }) => <td className="border-b border-border px-4 py-3 text-foreground/85">{children}</td>,
  code: ({ className, children }) => {
    // Fenced blocks arrive with a language-* / hljs class and are wrapped by <pre> below.
    if (className) return <code className={className}>{children}</code>;
    return <code className="rounded-md bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.88em] text-foreground">{children}</code>;
  },
  pre: ({ children }) => {
    const child = Children.toArray(children)[0];
    const cls = isValidElement<{ className?: string }>(child) ? (child.props.className ?? "") : "";
    const language = /language-([\w-]+)/.exec(cls)?.[1];
    return <CodeBlock language={language}>{children}</CodeBlock>;
  },
};

export function PostBody({ markdown }: { markdown: string }) {
  return (
    <div className="blog-prose text-[17px]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeHighlight, { detect: false, plainText: ["text", "nginx"] }]]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
