import { cn } from "@/lib/utils";

const WORDS = [
  { t: "Ishq", c: "font-display italic" },
  { t: "इश्क़", c: "font-hindi" },
  { t: "Sukoon", c: "font-display italic" },
  { t: "सुकून", c: "font-hindi" },
  { t: "Khudaya", c: "font-display" },
  { t: "Mehfil", c: "font-display italic" },
];

export function MarqueeSection({ reverse = false, className }) {
  const row = [...WORDS, ...WORDS];
  return (
    <div className={cn("relative overflow-hidden border-y border-border py-6", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-12 whitespace-nowrap",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span
              className={cn(
                "text-5xl leading-[1.5] md:text-7xl",
                w.c,
                i % 3 === 1 ? "text-outline" : "text-foreground",
              )}
            >
              {w.t}
            </span>
            <span className="text-2xl text-rose">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
