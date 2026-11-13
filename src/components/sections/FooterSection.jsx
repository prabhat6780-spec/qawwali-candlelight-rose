import { motion } from "motion/react";
import logo from "@/assets/logo.png";
import { LINKS } from "@/data/siteData";

const socials = [
  { label: "Instagram", sub: "@sagarthesoul", href: LINKS.instagram },
  { label: "YouTube", sub: "Sagar Bhatia", href: LINKS.youtube },
];

export function FooterSection() {
  return (
    <footer className="grain relative overflow-hidden border-t border-border px-5 pt-24 pb-8 md:px-10">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <img
            src={logo}
            alt="Sagar Bhatia Logo"
            width={118}
            height={101}
            className="mb-8 h-16 w-auto object-contain opacity-90 transition-all duration-500 hover:opacity-100 hover:drop-shadow-[0_0_20px_rgba(230,181,93,0.35)] md:h-20"
          />
          <p className="label-caps text-gold">( Shukriya · 06 )</p>
          <p className="mt-6 max-w-md font-display text-3xl leading-snug italic md:text-4xl">
            Come for the music, stay for the sukoon.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-px bg-border">
          {socials.map((s) => (
            <li key={s.href} className="bg-background">
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
        <span className="font-display text-[19vw] leading-[0.8] italic text-gold-foil">
          Shukriya
        </span>
      </motion.div>

      <div className="label-caps mt-10 flex flex-col justify-between gap-3 text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Sagar Bhatia · Sagar Wali Qawwali</span>
        <span>Made with ishq</span>
      </div>
    </footer>
  );
}
