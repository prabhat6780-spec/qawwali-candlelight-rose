import { useId } from "react";
import { cn } from "@/lib/utils";

export function RingText({ text, className, textClassName }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className={cn("animate-spin-slow", className)} aria-hidden>
      <defs>
        <path id={`ring-${id}`} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <text className={cn("fill-gold", textClassName)} fontSize="11.5" letterSpacing="4.2">
        <textPath href={`#ring-${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}
