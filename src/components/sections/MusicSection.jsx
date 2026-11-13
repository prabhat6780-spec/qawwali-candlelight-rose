import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import harmonium from "@/assets/harmonium.jpg";
import { LINKS, TRACKS } from "@/data/siteData";
import { cn } from "@/lib/utils";

export function MusicSection() {
  const [active, setActive] = useState(0);
  const track = TRACKS[active] ?? TRACKS[0];

  return (
    <section id="music" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex items-end justify-between gap-6">
        <h2 className="font-display text-6xl leading-[0.9] md:text-[9rem]">
          The <span className="italic text-gold">kalaam</span>
        </h2>
        <span className="label-caps hidden text-muted-foreground md:block">( Music · 02 )</span>
      </div>

      <div className="grid items-start gap-14 md:grid-cols-12">
        {/* Record player */}
        <div className="md:sticky md:top-24 md:col-span-5">
          <div className="relative aspect-square">
            <img
              src={harmonium}
              alt="An old harmonium surrounded by rose petals and marigolds"
              width={1200}
              height={1504}
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-40"
            />
            <div className="bg-vignette absolute inset-0" />
            <AnimatePresence mode="wait">
              <motion.div
                key={track.no}
                initial={{ x: "-30%", rotate: -60, opacity: 0 }}
                animate={{ x: "0%", rotate: 0, opacity: 1 }}
                exit={{ x: "30%", rotate: 60, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-[10%]"
              >
                <div className="vinyl animate-spin-record relative size-full rounded-full">
                  <div className="vinyl-sheen absolute inset-0 rounded-full" />
                  <div
                    className={cn(
                      "absolute inset-[33%] flex flex-col items-center justify-center rounded-full text-center",
                      track.hue,
                    )}
                  >
                    <span className="font-display text-xs text-primary-foreground italic md:text-base">
                      {track.title}
                    </span>
                    <span className="label-caps mt-1 !text-[0.45rem] text-primary-foreground/70">
                      Sagar Bhatia
                    </span>
                  </div>
                  <div className="absolute inset-[48.5%] rounded-full bg-background" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="label-caps text-muted-foreground">Now spinning — {track.no}/07</p>
            <a
              href={LINKS.spotify}
              target="_blank"
              rel="noreferrer"
              className="label-caps text-gold underline-offset-8 hover:underline"
            >
              All music ↗
            </a>
          </div>
        </div>

        {/* Tracklist */}
        <ul className="md:col-span-7">
          {TRACKS.map((t, i) => (
            <li key={t.no}>
              <a
                href={`https://open.spotify.com/search/${encodeURIComponent(`${t.title} Sagar Bhatia`)}`}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex items-center gap-6 overflow-hidden border-b border-border py-7 md:py-9"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-secondary transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <span className="label-caps relative w-8 text-muted-foreground">{t.no}</span>
                <span className="relative flex-1">
                  <span
                    className={cn(
                      "block font-display text-4xl transition-all duration-500 md:text-6xl",
                      active === i ? "translate-x-3 text-gold italic" : "text-foreground",
                    )}
                  >
                    {t.title}
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground">{t.note}</span>
                </span>
                <span className="label-caps relative hidden text-muted-foreground sm:block">
                  {t.year}
                </span>
                <span className="relative flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
