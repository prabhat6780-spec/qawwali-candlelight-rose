import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { IntroGate } from "@/components/mehfil/IntroGate";
import { Nav } from "@/components/mehfil/Nav";
import { Hero } from "@/components/mehfil/Hero";
import { Marquee } from "@/components/mehfil/Marquee";
import { Quote } from "@/components/mehfil/Quote";
import { Story } from "@/components/mehfil/Story";
import { Music } from "@/components/mehfil/Music";
import { Taali } from "@/components/mehfil/Taali";
import { Shows } from "@/components/mehfil/Shows";
import { Footer } from "@/components/mehfil/Footer";
import { Petals } from "@/components/mehfil/Petals";
import { Cursor } from "@/components/mehfil/Cursor";
import { Film } from "@/components/mehfil/Film";
import { Mala } from "@/components/mehfil/Mala";
import { VideoLightbox, type VideoPick } from "@/components/mehfil/VideoLightbox";
import { smooth } from "@/lib/smooth-scroll";
import { startDrone, stopDrone } from "@/lib/mehfil-audio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sagar Bhatia — Sagar Wali Qawwali | Official Site" },
      {
        name: "description",
        content:
          "Step into the mehfil. Sagar Bhatia's qawwali, Sufi songs like Khudaya and Raazdaariyan, his story, YouTube films and live shows.",
      },
      { property: "og:title", content: "Sagar Bhatia — Sagar Wali Qawwali" },
      {
        property: "og:description",
        content: "Qawwali, re-dressed for a new generation. Enter the mehfil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [gate, setGate] = useState(true);
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [video, setVideo] = useState<VideoPick | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    smooth.lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      smooth.lenis = null;
      stopDrone();
    };
  }, []);

  useEffect(() => {
    const l = smooth.lenis;
    if (!l) return;
    if (gate) {
      window.scrollTo(0, 0);
      l.stop();
    } else l.start();
  }, [gate]);

  const handleEnter = (withSound: boolean) => {
    setEntered(true);
    if (withSound) {
      startDrone();
      setSoundOn(true);
    }
  };

  const toggleSound = () => {
    if (soundOn) stopDrone();
    else startDrone();
    setSoundOn(!soundOn);
  };

  // The background drone pauses while a video plays, and resumes after.
  const playVideo = (v: VideoPick) => {
    if (soundOn) stopDrone();
    setVideo(v);
  };
  const closeVideo = useCallback(() => {
    setVideo(null);
    if (soundOn) startDrone();
  }, [soundOn]);

  return (
    <main className="relative bg-background text-foreground">
      {gate && <IntroGate onEnter={handleEnter} onDone={() => setGate(false)} />}
      <Cursor />
      <Petals />
      <Nav visible={entered} soundOn={soundOn} onToggleSound={toggleSound} />
      <Hero show={entered} />
      <Marquee />
      <Quote />
      <Story />
      <Marquee reverse />
      <Music />
      <Film onPlay={playVideo} />
      <Mala onPlay={playVideo} />
      <Taali />
      <Shows />
      <Footer />
      <VideoLightbox video={video} onClose={closeVideo} />
    </main>
  );
}
