import { useEffect, useState } from "react";
import { motion } from "motion/react";
import logo from "@/assets/logo.png";
import { RingText } from "./RingText";

const ease = [0.76, 0, 0.24, 1];

export function IntroGate({ onEnter, onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 2400;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const enter = (sound) => {
    if (leaving) return;
    setLeaving(true);
    onEnter(sound);
    setTimeout(onDone, 1500);
  };

  const ready = progress >= 100;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-label="Enter the site">
      {/* Curtain halves */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-background"
        animate={leaving ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.3, ease, delay: 0.15 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
        animate={leaving ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.3, ease, delay: 0.15 }}
      />
      <motion.div
        className="grain absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-4"
        animate={leaving ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
      >
        <div className="relative flex size-56 items-center justify-center md:size-72">
          <RingText
            text="SAGAR WALI QAWWALI · ISHQ · SUKOON · DUA · "
            className="absolute inset-0 size-full"
          />
          <span className="absolute inset-10 rounded-full border border-gold/20" />

          {/* Logo centered in circle */}
          <motion.img
            src={logo}
            alt="Sagar Bhatia"
            width={118}
            height={101}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-20 w-auto object-contain md:h-28"
            style={{
              filter:
                "brightness(1.2) saturate(1.5) hue-rotate(45deg) drop-shadow(0 0 25px rgba(230,181,93,0.5))",
            }}
          />
        </div>

        <p className="label-caps mt-10 text-muted-foreground">An evening with Sagar Bhatia</p>

        <div className="mt-10 h-24">
          {ready ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4"
            >
              <button
                onClick={() => enter(true)}
                className="group relative overflow-hidden border border-gold px-10 py-4 font-display text-lg italic text-gold transition-colors duration-500 hover:text-primary-foreground"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" />
                <span className="relative">Enter the Mehfil</span>
              </button>
              <button
                onClick={() => enter(false)}
                className="label-caps text-muted-foreground underline-offset-8 transition-colors hover:text-foreground hover:underline"
              >
                Enter in silence
              </button>
            </motion.div>
          ) : (
            <div className="h-px w-48 overflow-hidden bg-border">
              <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        <span className="absolute bottom-6 left-6 font-display text-7xl tabular-nums text-outline md:text-9xl">
          {String(progress).padStart(3, "0")}
        </span>
        <span className="label-caps absolute right-6 bottom-8 hidden text-muted-foreground md:block">
          Sound on for the full experience
        </span>
      </motion.div>
    </div>
  );
}
