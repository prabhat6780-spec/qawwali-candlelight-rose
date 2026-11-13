import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { IntroGate } from "@/components/sections/IntroGate";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { StorySection } from "@/components/sections/StorySection";
import { MusicSection } from "@/components/sections/MusicSection";
import { FilmSection } from "@/components/sections/FilmSection";
import { MalaSection } from "@/components/sections/MalaSection";
import { ShowsSection } from "@/components/sections/ShowsSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { PetalsOverlay } from "@/components/sections/PetalsOverlay";
import { CustomCursor } from "@/components/sections/CustomCursor";
import { VideoLightbox } from "@/components/sections/VideoLightbox";
import { smooth } from "@/lib/smooth-scroll";
import { startDrone, stopDrone } from "@/lib/audio";

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
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    smooth.lenis = lenis;
    let raf = 0;
    const loop = (t) => {
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

  const handleEnter = (withSound) => {
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
  const playVideo = (v) => {
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
      <CustomCursor />
      <PetalsOverlay />
      <Navbar visible={entered} soundOn={soundOn} onToggleSound={toggleSound} />
      <HeroSection show={entered} />
      <MarqueeSection />
      <QuoteSection />
      <StorySection />
      <MarqueeSection reverse />
      <MusicSection />
      <FilmSection onPlay={playVideo} />
      <MalaSection onPlay={playVideo} />
      <ShowsSection />
      <FooterSection />
      <VideoLightbox video={video} onClose={closeVideo} />
    </main>
  );
}
