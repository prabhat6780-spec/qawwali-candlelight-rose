import { useEffect, useRef } from "react";

// Rose petals and marigold flecks drifting down the whole page.
export function Petals({ count = 22 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const styles = getComputedStyle(document.documentElement);
    const colors = [
      styles.getPropertyValue("--rose").trim(),
      styles.getPropertyValue("--rose").trim(),
      styles.getPropertyValue("--marigold").trim(),
      styles.getPropertyValue("--gold").trim(),
    ];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const n = window.innerWidth < 768 ? Math.round(count / 2) : count;
    const petals = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 4 + Math.random() * 7,
      vy: 0.25 + Math.random() * 0.6,
      sway: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)] ?? "red",
      alpha: 0.35 + Math.random() * 0.45,
    }));

    let raf = 0;
    let last = window.scrollY;
    const draw = () => {
      const scroll = window.scrollY;
      const dv = (scroll - last) * 0.15;
      last = scroll;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.sway += 0.012;
        p.y += p.vy + dv;
        p.x += Math.sin(p.sway) * 0.5;
        p.rot += p.vr;
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        if (p.y < -30) p.y = h + 10;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, Math.abs(Math.cos(p.sway)) * 0.6 + 0.4);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.r);
        ctx.bezierCurveTo(p.r, -p.r, p.r, p.r * 0.6, 0, p.r);
        ctx.bezierCurveTo(-p.r, p.r * 0.6, -p.r, -p.r, 0, -p.r);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-40" aria-hidden />;
}
