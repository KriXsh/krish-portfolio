import type { Cover } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Generated cover art: a gradient field plus an SVG motif for the post's
    topic. No external images, so it's instant and identical everywhere. */
export function CoverArt({
  cover,
  palette,
  className,
  label,
}: {
  cover: Cover;
  palette: [string, string];
  className?: string;
  label?: string;
}) {
  const [a, b] = palette;
  const id = `cv-${cover}`;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `radial-gradient(120% 120% at 0% 0%, ${a}, transparent 60%), radial-gradient(120% 120% at 100% 100%, ${b}, transparent 60%), #080d17` }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.06)" />
          </pattern>
        </defs>
        <rect width="400" height="240" fill={`url(#${id}-grid)`} />
        <g stroke="rgba(255,255,255,0.85)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {motif(cover)}
        </g>
      </svg>
    </div>
  );
}

function motif(cover: Cover) {
  switch (cover) {
    case "rag": {
      // documents flowing into a context window
      return (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={70 + i * 14} y={70 + i * 14} width="70" height="90" rx="8" fill="rgba(255,255,255,0.08)" />
          ))}
          <path d="M175 125h60" strokeDasharray="6 6" />
          <path d="M228 117l8 8-8 8" />
          <rect x="250" y="70" width="90" height="110" rx="12" fill="rgba(255,255,255,0.1)" />
          {[88, 104, 120, 136, 152].map((y, i) => (
            <path key={y} d={`M264 ${y}h${[60, 44, 56, 36, 50][i]}`} strokeWidth="3" opacity="0.7" />
          ))}
        </>
      );
    }
    case "kafka": {
      // partitions as parallel logs
      return (
        <>
          {[80, 120, 160].map((y, row) => (
            <g key={y}>
              <path d={`M40 ${y}h320`} opacity="0.35" />
              {Array.from({ length: 6 - row }).map((_, i) => (
                <rect key={i} x={60 + i * 42 + row * 12} y={y - 11} width="30" height="22" rx="5" fill="rgba(255,255,255,0.14)" />
              ))}
            </g>
          ))}
          <circle cx="352" cy="120" r="10" fill="rgba(255,255,255,0.9)" stroke="none" />
        </>
      );
    }
    case "argo": {
      // a DAG fan-out / fan-in
      const nodes: [number, number][] = [[70, 120], [170, 60], [170, 120], [170, 180], [280, 120], [340, 120]];
      return (
        <>
          <path d="M70 120L170 60M70 120L170 120M70 120L170 180M170 60L280 120M170 120L280 120M170 180L280 120M280 120L340 120" opacity="0.6" />
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="14" fill="rgba(255,255,255,0.16)" />
          ))}
        </>
      );
    }
    case "voice": {
      // a waveform
      const bars = [18, 34, 56, 80, 64, 40, 92, 70, 44, 28, 60, 84, 52, 30, 20];
      return (
        <>
          {bars.map((h, i) => (
            <path key={i} d={`M${70 + i * 18} ${120 - h / 2}v${h}`} strokeWidth="8" opacity={0.5 + (h / 92) * 0.5} />
          ))}
        </>
      );
    }
    case "rbac": {
      // a shield over a permission grid
      return (
        <>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect key={`${r}-${c}`} x={70 + c * 22} y={70 + r * 26} width="14" height="14" rx="3" fill={(r + c) % 3 === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.12)"} stroke="none" />
            )),
          )}
          <path d="M280 60l50 18v40c0 32-22 52-50 62-28-10-50-30-50-62V78z" fill="rgba(255,255,255,0.1)" />
          <path d="M262 122l12 12 26-28" strokeWidth="4" />
        </>
      );
    }
    case "redis": {
      // stacked cache layers with a hit arrow
      return (
        <>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M110 ${90 + i * 30}l90-24 90 24-90 24z`} fill={`rgba(255,255,255,${0.08 + i * 0.05})`} />
          ))}
          <path d="M320 70v100" strokeDasharray="4 6" opacity="0.6" />
          <path d="M60 150c40 0 40-60 80-60" opacity="0.7" />
        </>
      );
    }
    case "deploy": {
      // blue/green blocks and a traffic switch
      return (
        <>
          <rect x="70" y="70" width="100" height="100" rx="14" fill="rgba(255,255,255,0.08)" />
          <rect x="230" y="70" width="100" height="100" rx="14" fill="rgba(255,255,255,0.18)" />
          <path d="M120 40v30M120 40h160v30" />
          <path d="M272 62l8 8 8-8" />
          <circle cx="280" cy="120" r="10" fill="rgba(255,255,255,0.9)" stroke="none" />
          <circle cx="120" cy="120" r="10" opacity="0.4" />
        </>
      );
    }
    case "evals": {
      // a rising chart with checkpoints
      return (
        <>
          <path d="M60 190h290M60 190V50" opacity="0.4" />
          <path d="M70 170l50-30 45 18 55-60 45 22 55-50" strokeWidth="3" />
          {[[120, 140], [165, 158], [220, 98], [265, 120], [320, 70]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="6" fill="rgba(255,255,255,0.9)" stroke="none" />
          ))}
        </>
      );
    }
  }
}
