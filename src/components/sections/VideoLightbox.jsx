import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/logo.png";
import { smooth } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

export function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    smooth.lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      smooth.lenis?.start();
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key={video.id}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-6 bg-background/95 px-5 backdrop-blur-md"
          onClick={onClose}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-[10vw] left-[4vw] text-[30vw] leading-[1.6] text-gold opacity-[0.06] select-none"
          ></span>
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <img
              src={logo}
              alt="Sagar Bhatia"
              width={118}
              height={101}
              className="h-8 w-auto object-contain opacity-80"
            />
          </div>
          <button
            onClick={onClose}
            className="label-caps absolute top-6 right-6 flex items-center gap-3 text-muted-foreground transition-colors hover:text-gold"
            aria-label="Close video"
          >
            Close <span className="text-xl leading-none">×</span>
          </button>

          <motion.div
            initial={{ y: 60, scale: 0.92, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative border border-gold/40 bg-card p-2 shadow-glow",
              video.vertical
                ? "aspect-[9/16] h-[78svh] max-w-[88vw]"
                : "aspect-video w-[min(92vw,1200px)]",
            )}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="size-full"
            />
          </motion.div>

          <div
            className="relative flex flex-col items-center gap-2 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-2xl italic md:text-3xl">{video.title}</p>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
              className="label-caps text-gold underline-offset-8 hover:underline"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
