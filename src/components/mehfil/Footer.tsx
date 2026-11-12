import { motion } from "motion/react";
import { LINKS } from "./data";

const socials = [
  { label: "Instagram", sub: "@sagarthesoul", href: LINKS.instagram },
  { label: "Instagram", sub: "@sagarkigehrai_", href: LINKS.instagramQawwali },
  { label: "YouTube", sub: "SagarBhatiaOfficial", href: LINKS.youtube },
  { label: "Spotify", sub: "Sagar Bhatia", href: LINKS.spotify },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-border px-5 pt-24 pb-8 md:px-10">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="label-caps text-gold">( Shukriya · 05 )</p>
          <p className="mt-6 max-w-md font-display text-3xl leading-snug italic md:text-4xl">
            Come for the music, stay for the sukoon.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-px bg-border">
          {socials.map((s) => (
            <li key={s.sub} className="bg-background">
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors duration-500 hover:bg-secondary"
              >
                <span className="label-caps text-muted-foreground">{s.label}</span>
                <span className="flex items-end justify-between">
                  <span className="font-display text-xl">{s.sub}</span>
                  <span className="text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-20 flex items-end justify-between"
      >
        <span className="font-display text-[19vw] leading-[0.8] italic text-gold-foil">Shukriya</span>
        <span className="font-urdu animate-flicker hidden text-[7vw] leading-[1.8] text-rose md:block">
          شکریہ
        </span>
      </motion.div>

      <div className="label-caps mt-10 flex flex-col justify-between gap-3 text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Sagar Bhatia · Sagar Wali Qawwali</span>
        <span>Made with ishq</span>
      </div>
    </footer>
  );
}
