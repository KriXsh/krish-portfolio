import { cn } from "@/lib/utils";

/** A tiny line-drawn rose that draws itself when its card (a `group`) is
    hovered or focused. Pure CSS stroke-dashoffset, so dozens cost nothing. */
export function RoseCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      aria-hidden
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none h-10 w-9 [&_path]:[stroke-dasharray:120] [&_path]:[stroke-dashoffset:120] [&_path]:transition-[stroke-dashoffset] [&_path]:duration-[1.1s] [&_path]:ease-out-expo group-hover:[&_path]:[stroke-dashoffset:0] group-focus-visible:[&_path]:[stroke-dashoffset:0]",
        className,
      )}
    >
      <path d="M20 14c2.5-1.2 5 .8 3.8 3.3-1.2 2.9-5.8 2.9-7-.4-1.6-3.7 2-7.4 6.2-6.6 5 .8 7.4 6.2 5 10.7-2.9 5-10.3 5.8-14.5 1.6" stroke="var(--color-rose)" strokeWidth="1.4" />
      <path d="M20 26v18M20 36c-4-.6-7-3-8-6 3.6 0 6.4 2.6 8 6Z" stroke="var(--color-champagne)" strokeWidth="1.1" className="[transition-delay:0.2s]" />
    </svg>
  );
}
