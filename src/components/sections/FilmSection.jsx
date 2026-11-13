import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FEATURED_FILM, ytThumb } from "@/data/siteData";
import { RingText } from "./RingText";
import { useIsMobile } from "@/hooks/use-mobile";

// A mihrab-shaped window that opens into a full-screen film as you scroll.
export function FilmSection({ onPlay }) {
  const ref = useRef(null);
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const width = useTransform(scrollYProgress, [0, 0.65], [mobile ? "64%" : "30%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.65], [mobile ? "50%" : "64%", "100%"]);
  const arch = useTransform(scrollYProgress, [0, 0.65], ["50% 30%", "0% 0%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  // Start framed on Sagar, arms open; drift to the full crowd as the window widens.
  const focus = useTransform(scrollYProgress, [0, 0.65], ["14% 62%", "50% 50%"]);
  const shade = useTransform(scrollYProgress, [0, 0.65, 1], [0.1, 0.35, 0.55]);
  const leftX = useTransform(scrollYProgress, [0, 0.6], ["0vw", "-30vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ["0vw", "30vw"]);
  const wordsOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);

  const play = () =>
    onPlay({ id: FEATURED_FILM.id, title: `Sagar Wali Qawwali — ${FEATURED_FILM.title}` });

  return (
    <section id="film" ref={ref} className="relative h-[320vh]">
      <div className="grain sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-20 flex justify-between px-5 pt-24 md:px-10">
          <span className="label-caps text-gold">( Film · 03 )</span>
          <span className="label-caps text-muted-foreground">{FEATURED_FILM.title}</span>
        </div>

        {/* Words that part like curtains as the window opens */}
        <motion.div
          aria-hidden
          style={{ opacity: wordsOpacity }}
          className="pointer-events-none absolute inset-0 font-display leading-[0.9]"
        >
          <motion.span
            style={{ x: leftX }}
            className="absolute top-[17svh] inset-x-0 text-center text-[12vw] italic md:inset-x-auto md:top-1/2 md:right-[calc(50%+17vw)] md:-translate-y-1/2 md:text-right md:text-[6.5vw]"
          >
            Saat
            <br className="hidden md:block" /> <span className="text-gold-foil">Samundar</span>
          </motion.span>
          <motion.span
            style={{ x: rightX }}
            className="absolute bottom-[12svh] inset-x-0 text-center text-[12vw] italic md:inset-x-auto md:bottom-auto md:top-1/2 md:left-[calc(50%+17vw)] md:-translate-y-1/2 md:text-left md:text-[6.5vw]"
          >
            Paar
            <span className="label-caps mt-4 block not-italic text-muted-foreground">
              Across seven seas
            </span>
          </motion.span>
        </motion.div>

        <motion.button
          onClick={play}
          data-cursor
          aria-label={`Play the film: ${FEATURED_FILM.title}`}
          style={{ width, height, borderTopLeftRadius: arch, borderTopRightRadius: arch }}
          className="group relative z-10 overflow-hidden"
        >
          <motion.img
            src={ytThumb(FEATURED_FILM.id)}
            alt="Sagar Bhatia on stage, arms open to a Canadian crowd under falling confetti"
            loading="lazy"
            style={{ scale: imgScale, objectPosition: focus }}
            className="absolute inset-0 size-full object-cover"
          />
          <motion.span style={{ opacity: shade }} className="absolute inset-0 bg-background" />
          <span className="absolute inset-0 rounded-[inherit] border border-gold/50" />
          <span className="absolute inset-[6px] rounded-[inherit] border border-gold/20" />

          <span className="absolute top-1/2 left-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:size-40">
            <RingText
              text="PLAY THE FILM · SAAT SAMUNDAR PAAR · "
              className="absolute inset-0 size-full"
            />
            <span className="flex size-14 items-center justify-center rounded-full bg-gold font-display text-xl text-primary-foreground italic shadow-glow transition-transform duration-500 group-hover:scale-125">
              ▶
            </span>
          </span>

          <motion.span
            style={{ opacity: captionOpacity, y: captionY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 px-5 pb-10 text-left md:flex-row md:items-end md:justify-between md:px-10 md:pb-14"
          >
            <span>
              <span className="label-caps block text-gold">
                Sagar Wali Qawwali · {FEATURED_FILM.title}
              </span>
              <span className="mt-3 block max-w-3xl font-display text-5xl leading-[0.95] italic md:text-7xl">
                {FEATURED_FILM.caption}
              </span>
            </span>
            <span className="label-caps text-muted-foreground">Tap to watch on the big screen</span>
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
