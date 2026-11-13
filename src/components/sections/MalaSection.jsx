import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { LINKS, REELS, ytThumb } from "@/data/siteData";
import { RingText } from "./RingText";

// Each short hangs like a bead on a sagging garland thread; scrolling slides the mala sideways.
function Bead({ x, layout, index, children }) {
  const d = useTransform(x, (v) => {
    const c = layout.centers[index] ?? 0;
    const half = layout.vw / 2 || 1;
    return Math.max(-1.4, Math.min(1.4, (c + v - half) / half));
  });
  const y = useTransform(d, (n) => layout.sag * (1 - n * n));
  const rotate = useTransform(d, (n) => n * 5);
  const opacity = useTransform(d, (n) => 1 - Math.min(1, Math.abs(n)) * 0.45);
  const scale = useTransform(d, (n) => 1 - Math.min(1, Math.abs(n)) * 0.1);

  return (
    <motion.div
      style={{ y, rotate, opacity, scale }}
      className="relative flex shrink-0 origin-top flex-col items-center"
    >
      <span className="relative z-10 size-3 rounded-full bg-gold shadow-glow" />
      <span className="h-7 w-px bg-gold/60" />
      {children}
    </motion.div>
  );
}

export function MalaSection({ onPlay }) {
  const ref = useRef(null);
  const track = useRef(null);
  const dist = useMotionValue(0);
  const [height, setHeight] = useState(0);
  const [layout, setLayout] = useState({ vw: 1280, centers: [], sag: 110 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const vw = window.innerWidth;
      const d = Math.max(0, el.scrollWidth - vw);
      const centers = Array.from(el.children).map((c) => {
        return c.offsetLeft + c.offsetWidth / 2;
      });
      dist.set(d);
      setHeight(d);
      setLayout({ vw, centers, sag: vw < 768 ? 56 : 110 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [dist]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, dist], ([p, d]) => -p * d);
  const beadsOffset = useTransform(x, (v) => -v);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(x, "change", (v) => {
    const mid = layout.vw / 2 - v;
    let best = 0;
    layout.centers.forEach((c, i) => {
      if (Math.abs(c - mid) < Math.abs((layout.centers[best] ?? 0) - mid)) best = i;
    });
    setActive(Math.min(best, REELS.length - 1));
  });

  const { vw, sag } = layout;

  return (
    <section
      id="mala"
      ref={ref}
      className="relative"
      style={{ height: `calc(100svh + ${height}px)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="flex items-end justify-between gap-6 px-5 pt-20 md:px-10 md:pt-24">
          <div>
            <p className="label-caps text-gold">( Shorts · 04 )</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.9] md:text-7xl">
              Sanson ki <span className="italic text-gold">mala</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground md:block">
            A garland of moments strung from Sagar’s YouTube — every bead a kalaam. Keep scrolling
            to turn the mala; tap a bead to listen.
          </p>
        </div>

        <div className="absolute inset-x-0 top-[27svh]">
          {/* The garland thread, sagging toward the centre of the screen */}
          <svg
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 overflow-visible"
            width={vw}
            height={sag + 12}
            viewBox={`0 0 ${vw} ${sag + 12}`}
          >
            <path
              d={`M0,6 Q${vw / 2},${6 + sag * 2} ${vw},6`}
              fill="none"
              className="stroke-gold/40"
              strokeWidth={1}
            />
            <motion.path
              d={`M0,6 Q${vw / 2},${6 + sag * 2} ${vw},6`}
              fill="none"
              className="stroke-gold-soft"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="0 18"
              style={{ strokeDashoffset: beadsOffset }}
            />
          </svg>

          <motion.div
            ref={track}
            style={{ x }}
            className="relative flex w-max items-start gap-10 px-[38vw] md:gap-16 md:px-[42vw]"
          >
            {REELS.map((r, i) => (
              <Bead key={r.id} x={x} layout={layout} index={i}>
                <button
                  onClick={() => onPlay({ id: r.id, title: r.title, vertical: true })}
                  data-cursor
                  aria-label={`Play ${r.title}`}
                  className="group relative aspect-[9/16] h-[40svh] overflow-hidden rounded-t-full border border-gold/30 bg-card"
                >
                  <img
                    src={ytThumb(r.id, "vertical")}
                    alt={`Sagar Bhatia performing ${r.title}`}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="bg-fade-bottom absolute inset-0 opacity-80" />
                  <span className="absolute inset-[5px] rounded-[inherit] border border-gold/20" />
                  <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-gold font-display text-lg text-primary-foreground italic opacity-0 shadow-glow transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    ▶
                  </span>
                  <span className="label-caps absolute bottom-4 left-0 w-full text-center text-gold">
                    Moti {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
                <p className="mt-4 font-display text-xl italic md:text-2xl">{r.title}</p>
                <p className="font-hindi text-sm text-gold-soft">{r.hindi}</p>
              </Bead>
            ))}
            <Bead x={x} layout={layout} index={REELS.length}>
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noreferrer"
                className="group relative flex aspect-[9/16] h-[40svh] items-center justify-center overflow-hidden rounded-t-full border border-gold/40 transition-colors duration-500 hover:bg-secondary"
              >
                <RingText
                  text="SUBSCRIBE · MORE KALAAM · "
                  className="absolute top-1/2 left-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2"
                />
                <span className="font-display text-3xl italic text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
              <p className="mt-4 font-display text-xl italic md:text-2xl">More on YouTube</p>
              <p className="font-hindi text-sm text-gold-soft">और भी</p>
            </Bead>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex items-center gap-6 px-5 md:px-10">
          <span className="label-caps tabular-nums text-muted-foreground">
            {String(active + 1).padStart(2, "0")} / {String(REELS.length).padStart(2, "0")}
          </span>
          <span className="relative h-px flex-1 bg-border">
            <motion.span
              style={{ width: progress }}
              className="absolute inset-y-0 left-0 bg-gold"
            />
          </span>
          <span className="label-caps hidden text-muted-foreground md:block">
            Scroll to turn the mala
          </span>
        </div>
      </div>
    </section>
  );
}
