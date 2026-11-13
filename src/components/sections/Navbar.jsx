import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { scrollToId, smooth } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const items = [];

export function Navbar({ visible, soundOn, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (smooth.lenis) {
        setScrolled(smooth.lenis.instanceScroll > 100);
      }
    };

    const lenis = smooth.lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
      return () => lenis.off("scroll", handleScroll);
    }
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10"
    >
      <button
        onClick={() => scrollToId("top")}
        className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
        aria-label="Sagar Bhatia — Back to top"
      >
        <motion.img
          src={logo}
          alt="Sagar Bhatia"
          width={118}
          height={101}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 md:h-20"
        />
      </button>

      <nav className="hidden items-center gap-8 md:flex">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => scrollToId(it.id)}
            className="label-caps group relative text-foreground"
          >
            {it.label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
          </button>
        ))}
      </nav>

      <button
        onClick={onToggleSound}
        className="label-caps flex items-center gap-3 text-foreground"
        aria-pressed={soundOn}
        aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
      >
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "block h-full w-[2px] origin-bottom bg-foreground",
                soundOn ? "animate-eq" : "scale-y-[0.25]",
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
        <span className="hidden sm:inline">{soundOn ? "Sound on" : "Sound off"}</span>
      </button>
    </motion.header>
  );
}
