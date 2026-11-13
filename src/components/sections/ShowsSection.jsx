import { motion } from "motion/react";
import logo from "@/assets/logo.png";
import { LINKS, SHOWS } from "@/data/siteData";

export function ShowsSection() {
  return (
    <section id="mehfil" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex items-end justify-between gap-6">
        <h2 className="font-display text-6xl leading-[0.9] md:text-[9rem]">
          Mehfil <span className="italic text-gold">passes</span>
        </h2>
        <span className="label-caps hidden text-muted-foreground md:block">( Live · 05 )</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {SHOWS.map((s, i) => (
          <motion.a
            key={s.city}
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            className="group relative flex overflow-hidden rounded-sm border border-border bg-card"
          >
            {/* Stub */}
            <div className="flex w-28 shrink-0 flex-col items-center justify-center border-r border-dashed border-gold/40 bg-secondary py-8">
              <span className="font-display text-5xl text-gold">{s.day}</span>
              <span className="label-caps mt-1 text-foreground">{s.month}</span>
              <span className="label-caps mt-1 text-muted-foreground">{s.year}</span>
            </div>
            {/* Notches */}
            <span className="absolute -top-3 left-[6.25rem] size-6 rounded-full border border-border bg-background" />
            <span className="absolute -bottom-3 left-[6.25rem] size-6 rounded-full border border-border bg-background" />

            <div className="relative flex flex-1 flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <span className="label-caps text-muted-foreground">
                  Admit one · No. {String(i + 1).padStart(3, "0")}
                </span>
              </div>
              <div>
                <p className="font-display text-4xl italic">{s.city}</p>
                <p className="label-caps mt-1 text-muted-foreground">{s.country} · Venue soon</p>
              </div>
              <span className="label-caps mt-4 inline-flex items-center gap-2 text-gold">
                Get notified
                <span className="transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </span>
              <img
                src={logo}
                alt=""
                aria-hidden
                width={118}
                height={101}
                className="pointer-events-none absolute right-3 bottom-2 h-20 w-auto object-contain opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.18]"
              />
            </div>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </motion.a>
        ))}

        <div className="flex flex-col justify-center rounded-sm border border-dashed border-border p-8">
          <p className="font-display text-3xl italic">Want a mehfil in your city?</p>
          <p className="mt-3 text-muted-foreground">
            For private mehfils, weddings and festivals, reach the team on Instagram.
          </p>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="label-caps mt-6 text-gold underline-offset-8 hover:underline"
          >
            Book a show ↗
          </a>
        </div>
      </div>
    </section>
  );
}
