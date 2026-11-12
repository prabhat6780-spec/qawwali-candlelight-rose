import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import portrait from "@/assets/portrait.jpg";
import { TIMELINE } from "./data";

const STATS = [
  { k: "5000+", v: "Live shows" },
  { k: "2007", v: "First gig" },
  { k: "∞", v: "Taalis" },
];

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const line = useTransform(scrollYProgress, [0.15, 0.75], ["0%", "100%"]);

  return (
    <section id="story" ref={ref} className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex items-end justify-between gap-6 md:mb-24">
        <h2 className="font-display text-6xl leading-[0.9] md:text-[9rem]">
          From <span className="italic text-gold">jagrans</span>
          <br /> to arenas
        </h2>
        <span className="label-caps hidden text-muted-foreground md:block">( The story · 01 )</span>
      </div>

      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <div className="relative aspect-[3/4] overflow-hidden">
              <motion.img
                style={{ y: imgY, scale: 1.18 }}
                src={portrait}
                alt="Sagar Bhatia singing with eyes closed, guitar in hand"
                width={1088}
                height={1440}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-border ring-inset" />
              <span className="label-caps absolute bottom-4 left-4 text-foreground">
                Delhi · Mumbai · Dubai
              </span>
            </div>
            <div className="mt-6 grid grid-cols-3 border-t border-border pt-6">
              {STATS.map((s) => (
                <div key={s.v}>
                  <p className="font-display text-3xl text-gold md:text-4xl">{s.k}</p>
                  <p className="label-caps mt-2 text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-border">
            <motion.div style={{ height: line }} className="w-full bg-gold" />
          </div>
          <ol className="space-y-20 md:space-y-28">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12"
              >
                <span className="absolute top-3 left-0 size-[15px] rounded-full border border-gold bg-background">
                  <span className="absolute inset-[3px] rounded-full bg-gold" />
                </span>
                <p className="font-display text-7xl leading-none text-outline md:text-8xl">
                  {t.year}
                </p>
                <h3 className="mt-4 font-display text-3xl italic md:text-4xl">{t.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{t.text}</p>
                <span className="label-caps absolute top-4 right-0 text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
