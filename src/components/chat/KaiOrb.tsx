import { cn } from "@/lib/utils";

/** KAI's avatar: a spinning aurora ring around a four-point spark.
    Spins faster while KAI is thinking. */
export function KaiOrb({ size = 40, active = false, className }: { size?: number; active?: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      <span
        className={cn(
          "absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,var(--color-primary),var(--color-violet),var(--color-cyan),var(--color-primary))] opacity-60 blur-md",
          active ? "animate-[spin_1.6s_linear_infinite]" : "animate-[spin_8s_linear_infinite]",
        )}
      />
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--color-primary),var(--color-violet),var(--color-cyan),var(--color-primary))]",
          active ? "animate-[spin_1.6s_linear_infinite]" : "animate-[spin_8s_linear_infinite]",
        )}
      />
      <span className="absolute inset-[2px] flex items-center justify-center rounded-full bg-surface">
        <svg viewBox="0 0 24 24" className={cn("h-1/2 w-1/2 text-foreground", active && "animate-pulse")} fill="currentColor">
          <path d="M12 2c.6 4.9 2.9 7.4 8 8-5.1.6-7.4 3.1-8 8-.6-4.9-2.9-7.4-8-8 5.1-.6 7.4-3.1 8-8Z" />
          <path d="M19 15.5c.25 1.9 1.1 2.75 3 3-1.9.25-2.75 1.1-3 3-.25-1.9-1.1-2.75-3-3 1.9-.25 2.75-1.1 3-3Z" opacity=".6" />
        </svg>
      </span>
    </span>
  );
}
