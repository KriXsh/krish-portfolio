import { useId } from "react";
import { cn } from "@/lib/utils";

const LEAF = "M50 118C30 104 6 84 4 54 2 26 22 8 40 10c7 1 10 6 10 12 0-6 3-11 10-12 18-2 38 16 36 44-2 30-26 50-46 64Z";

/** KAI's avatar: a tiny five-leaf clover (the site's signature) with a gold AI
    spark at its heart, inside a slowly turning navy ring. The clover turns
    slowly at rest; while KAI is thinking it spins fast and breathes. */
export function KaiOrb({ size = 40, active = false, className }: { size?: number; active?: boolean; className?: string }) {
  const id = useId().replace(/:/g, "");
  const ring =
    "bg-[conic-gradient(from_0deg,var(--color-primary),var(--color-rose),var(--color-champagne),var(--color-violet),var(--color-primary))]";
  const spin = active ? "animate-[spin_1.6s_linear_infinite]" : "animate-[spin_10s_linear_infinite]";

  return (
    <span aria-hidden className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      {/* soft halo: a gradient, not a blur filter, so it is cheap to spin */}
      <span className="absolute -inset-1.5 rounded-full bg-[radial-gradient(circle,rgba(74,116,196,0.45),transparent_70%)]" />
      <span className={cn("absolute inset-0 rounded-full", ring, spin)} />
      <span className="absolute inset-[2px] flex items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,#0c1730,var(--color-surface)_70%)]">
        <span className={cn("relative h-[76%] w-[76%]", active && "animate-pulse")}>
          <svg
            viewBox="-62 -62 124 124"
            className={cn("absolute inset-0 h-full w-full", active ? "animate-[spin_1.8s_linear_infinite]" : "animate-[spin_16s_linear_infinite]")}
          >
            <defs>
              <linearGradient id={`${id}-fill`} x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#b9cdec" />
                <stop offset="50%" stopColor="#5b86d6" />
                <stop offset="100%" stopColor="#2a4f8f" />
              </linearGradient>
            </defs>
            {[0, 72, 144, 216, 288].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path
                  d={LEAF}
                  transform="translate(-22 -52) scale(0.44)"
                  fill={`url(#${id}-fill)`}
                  stroke="#e4cfa8"
                  strokeOpacity="0.85"
                  strokeWidth="4"
                />
              </g>
            ))}
          </svg>
          {/* the AI spark at the heart of the clover */}
          <svg viewBox="-62 -62 124 124" className="absolute inset-0 h-full w-full">
            <path d="M0-15c1.8 9 5.4 12.6 14.4 14.4-9 1.8-12.6 5.4-14.4 14.4-1.8-9-5.4-12.6-14.4-14.4 9-1.8 12.6-5.4 14.4-14.4Z" fill="#e4cfa8" />
          </svg>
        </span>
      </span>
    </span>
  );
}
