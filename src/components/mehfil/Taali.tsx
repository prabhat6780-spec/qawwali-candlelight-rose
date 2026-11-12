import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import crowd from "@/assets/crowd.jpg";
import { taali } from "@/lib/mehfil-audio";

const CHEERS = ["Wah!", "Subhan Allah", "Irshaad", "Kya baat!", "Mashallah", "Wah wah!", "Ishq!"];

type Burst = { id: number; word: string; x: number; r: number };
type Spark = { id: number; angle: number; dist: number };

export function Taali() {
  const [count, setCount] = useState(0);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [pulse, setPulse] = useState(0);
  const idRef = useRef(0);

  const clap = () => {
    taali();
    setCount((c) => c + 1);
    setPulse((p) => p + 1);
    const id = ++idRef.current;
    const word = CHEERS[Math.floor(Math.random() * CHEERS.length)] ?? "Wah!";
    setBursts((b) => [...b.slice(-6), { id, word, x: (Math.random() - 0.5) * 70, r: (Math.random() - 0.5) * 20 }]);
    const newSparks = Array.from({ length: 10 }, (_, k) => ({
      id: id * 100 + k,
      angle: (Math.PI * 2 * k) / 10 + Math.random() * 0.4,
      dist: 120 + Math.random() * 90,
    }));
    setSparks((s) => [...s.slice(-30), ...newSparks]);
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
      setSparks((s) => s.filter((x) => Math.floor(x.id / 100) !== id));
    }, 1600);
  };

  const level = count >= 50 ? "Full trance" : count >= 20 ? "Mehfil is alive" : count >= 5 ? "Getting warm" : "Join in";

  return (
    <section id="taali" className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <img
        src={crowd}
        alt="Thousands of phone lights glowing in a concert crowd"
        width={1920}
        height={1088}
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-50"
      />
      <div className="bg-vignette absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative flex flex-col items-center px-5 text-center">
        <p className="label-caps text-gold">( Interactive · 05 )</p>
        <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-8xl">
          A qawwali needs <span className="italic text-gold">your taali</span>
        </h2>
        <p className="mt-6 max-w-md text-muted-foreground">
          Every mehfil runs on the crowd’s claps. Give yours — tap the button, or tap along to the
          beat.
        </p>

        <div className="relative mt-28 flex size-56 items-center justify-center md:size-64">
          <span className="animate-pulse-ring absolute inset-0 rounded-full border border-gold/60" />
          <span className="animate-pulse-ring absolute inset-0 rounded-full border border-rose/60 [animation-delay:1.2s]" />

          {sparks.map((s) => (
            <motion.span
              key={s.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(s.angle) * s.dist, y: Math.sin(s.angle) * s.dist, opacity: 0, scale: 0.3 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute size-2.5 rounded-full bg-marigold"
            />
          ))}

          <AnimatePresence>
            {bursts.map((b) => (
              <motion.span
                key={b.id}
                initial={{ opacity: 0, y: 0, x: b.x, scale: 0.6, rotate: b.r }}
                animate={{ opacity: [0, 1, 1, 0], y: -150, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute font-display text-3xl whitespace-nowrap text-gold italic md:text-4xl"
              >
                {b.word}
              </motion.span>
            ))}
          </AnimatePresence>

          <motion.button
            key={pulse}
            onClick={clap}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 12 }}
            className="relative flex size-40 flex-col items-center justify-center rounded-full bg-gold text-primary-foreground shadow-glow md:size-48"
            aria-label="Give a taali (clap)"
          >
            <span className="font-urdu text-4xl leading-[1.8] md:text-5xl" aria-hidden>
              واہ
            </span>
            <span className="font-display text-2xl italic">Taali</span>
            <span className="label-caps mt-1 !text-[0.55rem] opacity-70">Tap to clap</span>
          </motion.button>
        </div>

        <div className="mt-12 flex items-baseline gap-4">
          <span className="font-display text-6xl tabular-nums text-foreground">{count}</span>
          <span className="label-caps text-muted-foreground">{level}</span>
        </div>
      </div>
    </section>
  );
}
