import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Editorial section header: a tracked small-caps label with a ✦ mark, a hairline,
    and a large serif title. Titles can italicise or tint a word with `text-gradient`. */
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
        "mb-14 flex flex-col gap-6 md:mb-20",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal
        className={cn(
          "flex w-full items-center gap-4 eyebrow text-muted-foreground",
          align === "center" && "justify-center",
        )}
      >
        {index && <span className="font-display text-base tracking-normal text-champagne">{index}</span>}
        <span>{eyebrow}</span>
        <span className="text-rose">✦</span>
        {align === "left" && <span className="h-px flex-1 bg-gradient-to-r from-border-strong to-transparent" />}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-display-lg font-normal text-foreground">{title}</h2>
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
