import { useId } from "react";
import { cn } from "@/lib/utils";

/** KAI's avatar: a single rose petal (the site's signature) with a small AI
    spark, inside a slowly turning wine ring. The petal sways at rest; while
    KAI is thinking the ring spins faster and the petal breathes. */
export function KaiOrb({ size = 40, active = false, className }: { size?: number; active?: boolean; className?: string }) {
  const id = useId().replace(/:/g, "");
  const ring =
    "bg-[conic-gradient(from_0deg,var(--color-primary),var(--color-rose),var(--color-champagne),var(--color-violet),var(--color-primary))]";
  const spin = active ? "animate-[spin_1.6s_linear_infinite]" : "animate-[spin_10s_linear_infinite]";

  return (
    <span aria-hidden className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      {/* soft halo: a gradient, not a blur filter, so it is cheap to spin */}
      <span className="absolute -inset-1.5 rounded-full bg-[radial-gradient(circle,rgba(200,71,92,0.45),transparent_70%)]" />
      <span className={cn("absolute inset-0 rounded-full", ring, spin)} />
      <span className="absolute inset-[2px] flex items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,#2a0d14,var(--color-surface)_70%)]">
        <svg
          viewBox="0 0 120 150"
          className={cn("h-[62%] w-[62%] animate-petal", active && "animate-pulse")}
          style={{ "--petal-rot": "-18deg", "--petal-duration": "6s", "--petal-x": "1px", "--petal-y": "-2px" } as React.CSSProperties}
        >
          <defs>
            <radialGradient id={`${id}-fill`} cx="38%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#d4566b" />
              <stop offset="45%" stopColor="#8e2236" />
              <stop offset="100%" stopColor="#3a0b16" />
            </radialGradient>
            <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f6c2bb" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#f6c2bb" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M60 146C26 132 4 98 8 62 12 28 36 4 62 4c28 0 52 26 50 60-2 38-22 70-52 82Z" fill={`url(#${id}-fill)`} />
          <path d="M62 4c28 0 52 26 50 60-1 14-5 28-12 40C108 70 96 26 62 4Z" fill={`url(#${id}-edge)`} />
          <path d="M60 140C52 110 50 70 58 30" stroke="#1a0408" strokeOpacity="0.4" strokeWidth="3" fill="none" />
          {/* the AI spark */}
          <path d="M88 22c1.6 8 5 11.4 13 13-8 1.6-11.4 5-13 13-1.6-8-5-11.4-13-13 8-1.6 11.4-5 13-13Z" fill="#f3dccb" />
        </svg>
      </span>
    </span>
  );
}
