import { useEffect, useRef } from "react";

// A small glowing diya-like cursor that trails the pointer (desktop only).
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let hx = x;
    let hy = y;
    let big = false;
    let s = 1;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      big = !!t?.closest("a,button,[data-cursor]");
    };
    window.addEventListener("pointermove", move);
    let raf = 0;
    const loop = () => {
      hx += (x - hx) * 0.14;
      hy += (y - hy) * 0.14;
      s += ((big ? 2.2 : 1) - s) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      if (halo.current)
        halo.current.style.transform = `translate(${hx}px, ${hy}px) translate(-50%,-50%) scale(${s})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add("cursor-none");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden md:block" aria-hidden>
      <div ref={dot} className="absolute top-0 left-0 size-1.5 rounded-full bg-gold" />
      <div
        ref={halo}
        className="absolute top-0 left-0 size-9 rounded-full border border-gold/50"
      />
    </div>
  );
}
