import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const QUOTE = "The soul of the music remains the same — it’s just dressed differently.";

function Word({ word, i, n, p }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.12, 1]);
  const y = useTransform(p, [i / n, (i + 1) / n], [12, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export function QuoteSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = QUOTE.split(" ");
  return (
    <section className="relative px-5 py-32 md:px-10 md:py-48">
      <div ref={ref} className="mx-auto max-w-6xl text-center">
        <span className="font-display text-8xl leading-none text-rose">“</span>
        <p className="font-display text-4xl leading-[1.15] text-foreground italic md:text-7xl">
          {words.map((w, i) => (
            <Word key={i} word={w} i={i} n={words.length} p={scrollYProgress} />
          ))}
        </p>
        <p className="label-caps mt-10 text-gold">— Sagar Bhatia</p>
      </div>
    </section>
  );
}
