import { type Discipline, disciplineMeta } from "@/content/case-studies";
import { cn } from "@/lib/utils";

/** A discipline tag in its colour. The text is mixed toward the foreground so
    it stays readable on both the light and the dark theme. */
export function DisciplineChip({ id, className }: { id: Discipline; className?: string }) {
  const { label, rgb } = disciplineMeta(id);
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", className)}
      style={{
        color: `color-mix(in oklab, rgb(${rgb}) 55%, var(--color-foreground))`,
        background: `rgb(${rgb} / 0.1)`,
        boxShadow: `inset 0 0 0 1px rgb(${rgb} / 0.28)`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${rgb})` }} />
      {label}
    </span>
  );
}
