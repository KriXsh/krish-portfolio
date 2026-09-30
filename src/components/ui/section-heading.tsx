import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-5 md:mb-20",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
        {index && <span className="text-glow">{index}</span>}
        <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
        {eyebrow}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-display-lg font-bold text-foreground">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className={cn("max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
