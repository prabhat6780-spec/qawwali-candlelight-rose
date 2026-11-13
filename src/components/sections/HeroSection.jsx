import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import heroStage from "@/assets/hero-stage.jpg";
import { RingText } from "./RingText";
import { scrollToId } from "@/lib/smooth-scroll";

const ease = [0.22, 1, 0.36, 1];

function SplitWord({ word, delay, show }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%" }}
          animate={show ? { y: "0%" } : {}}
          transition={{ duration: 1.1, ease, delay: delay + i * 0.06 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection({ show }) {
  const section = useRef(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Stage spotlight that follows the pointer, and wanders on its own when idle.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let tx = 0.55;
    let ty = 0.38;
    let x = tx;
    let y = ty;
    let lastMove = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      lastMove = performance.now();
    };
    el.addEventListener("pointermove", onMove);
    let raf = 0;
    const loop = (t) => {
      if (t - lastMove > 2500) {
        tx = 0.55 + Math.sin(t / 2600) * 0.22;
        ty = 0.42 + Math.cos(t / 3100) * 0.14;
      }
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--sx", `${x * 100}%`);
      el.style.setProperty("--sy", `${y * 100}%`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      id="top"
      ref={section}
      className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-background"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        {/* Dark stage */}
        <img
          src={heroStage}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover brightness-[0.22] saturate-[0.6]"
        />
        {/* Lit stage, revealed by the spotlight */}
        <img
          src={heroStage}
          alt="Sagar Bhatia performing qawwali under a single spotlight before a crowd of phone lights"
          width={1920}
          height={1088}
          className="spotlight-mask absolute inset-0 size-full object-cover"
        />
      </motion.div>
      <div className="bg-fade-bottom absolute inset-0" />
      <div className="bg-vignette absolute inset-0 opacity-70" />

      {/* Urdu calligraphy ghost removed */}

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 md:pb-14"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="label-caps mb-4 flex items-center gap-4 text-gold"
        >
          <span className="h-px w-10 bg-gold" /> Sagar Wali Qawwali
        </motion.p>
        <h1 className="font-display leading-[0.82] tracking-tight text-foreground">
          <span className="block text-[23vw] italic md:text-[17vw]">
            <SplitWord word="Sagar" delay={0.3} show={show} />
          </span>
          <span className="-mt-[2vw] block pl-[12vw] text-[15vw] md:text-[11vw]">
            <span className="text-gold-foil">
              <SplitWord word="Bhatia" delay={0.55} show={show} />
            </span>
          </span>
        </h1>
        <div className="mt-6 flex flex-col gap-6 md:mt-2 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Qawwali, re-dressed for a new generation. Tabla, harmonium, a little rock — and the same
            old soul.
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="label-caps hidden text-muted-foreground md:block"
          >
            Move your cursor — you hold the spotlight
          </motion.span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 1, ease }}
        onClick={() => scrollToId("music")}
        className="absolute top-28 right-5 flex size-28 items-center justify-center md:top-auto md:right-10 md:bottom-44 md:size-36"
        aria-label="Listen to the music"
      >
        <RingText
          text="LISTEN NOW · LISTEN NOW · LISTEN NOW · "
          className="absolute inset-0 size-full"
        />
        <span className="flex size-12 items-center justify-center rounded-full bg-gold font-display text-xl text-primary-foreground italic shadow-glow md:size-14">
          ▶
        </span>
      </motion.button>
    </section>
  );
}
