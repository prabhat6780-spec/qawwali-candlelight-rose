// Background soundscape for Sagar Bhatia's mehfil.
// Plays "Sanson Ki Mala Pe (New Version)" (YouTube: yt2O7Gw_4gM) with graceful
// fallback to a synthesized tanpura drone if YouTube cannot be reached.

const YOUTUBE_VIDEO_ID = "yt2O7Gw_4gM";
const CONTAINER_ID = "sagar-yt-audio-container";

// Global singleton state so Vite HMR does not duplicate audio players
const state =
  typeof window !== "undefined"
    ? (window.__SAGAR_AUDIO_STATE__ ??= {
        ytPlayer: null,
        ytReady: false,
        isPlaying: false,
        fallbackActive: false,
        initStarted: false,
      })
    : {
        ytPlayer: null,
        ytReady: false,
        isPlaying: false,
        fallbackActive: false,
        initStarted: false,
      };

// -------------------------------------------------------------
// YouTube Audio Player
// -------------------------------------------------------------

function ensureContainer() {
  if (typeof document === "undefined") return null;
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.setAttribute("aria-hidden", "true");
    // Position offscreen with real dimensions so browsers don't suspend playback
    Object.assign(container.style, {
      position: "fixed",
      bottom: "-300px",
      right: "-300px",
      width: "200px",
      height: "200px",
      opacity: "0.001",
      pointerEvents: "none",
      zIndex: "-9999",
      overflow: "hidden",
    });
    const playerTarget = document.createElement("div");
    playerTarget.id = "sagar-yt-player-target";
    container.appendChild(playerTarget);
    document.body.appendChild(container);
  }
  return container;
}

function initYTPlayer() {
  if (typeof window === "undefined" || !window.YT || !window.YT.Player) return;
  if (state.ytPlayer) return;

  ensureContainer();
  const target = document.getElementById("sagar-yt-player-target");
  if (!target) return;

  try {
    state.ytPlayer = new window.YT.Player("sagar-yt-player-target", {
      height: "180",
      width: "180",
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID, // Required by YouTube for looping a single video
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event) => {
          state.ytReady = true;
          try {
            event.target.setVolume(65);
          } catch {}

          if (state.isPlaying) {
            try {
              event.target.playVideo();
            } catch (err) {
              console.warn("YouTube audio play onReady error:", err);
            }
          }
        },
        onStateChange: (event) => {
          // Loop when video ends (YT.PlayerState.ENDED = 0)
          if (event.data === 0 && state.isPlaying) {
            try {
              event.target.playVideo();
            } catch {}
          }
        },
        onError: (err) => {
          console.warn("YouTube audio player error, falling back to tanpura drone:", err);
          state.fallbackActive = true;
          if (state.isPlaying) {
            startSynthesizedDrone();
          }
        },
      },
    });
  } catch (err) {
    console.warn("Error creating YouTube player:", err);
    state.fallbackActive = true;
  }
}

export function initAudio() {
  if (typeof window === "undefined" || state.initStarted) return;
  state.initStarted = true;

  ensureContainer();

  if (window.YT && window.YT.Player) {
    initYTPlayer();
    return;
  }

  // Load YouTube IFrame API script
  if (!document.getElementById("sagar-yt-iframe-api")) {
    const tag = document.createElement("script");
    tag.id = "sagar-yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(tag, firstScript);
    } else {
      document.head.appendChild(tag);
    }
  }

  const prevHandler = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (typeof prevHandler === "function") {
      try {
        prevHandler();
      } catch {}
    }
    initYTPlayer();
  };
}

// Auto-initialize when running in the browser
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAudio, { once: true });
  } else {
    initAudio();
  }
}

// -------------------------------------------------------------
// Playback Control
// -------------------------------------------------------------

export function startDrone() {
  state.isPlaying = true;
  initAudio();

  if (state.ytPlayer && state.ytReady && !state.fallbackActive) {
    try {
      state.ytPlayer.playVideo();
      return;
    } catch (err) {
      console.warn("Failed to play YouTube audio:", err);
    }
  }

  // If YouTube is blocked, errored, or fallback is active
  if (state.fallbackActive) {
    startSynthesizedDrone();
  }
}

export function stopDrone() {
  state.isPlaying = false;

  if (state.ytPlayer && state.ytReady) {
    try {
      state.ytPlayer.pauseVideo();
    } catch (err) {
      console.warn("Failed to pause YouTube audio:", err);
    }
  }

  stopSynthesizedDrone();
}

export function isDroneOn() {
  return state.isPlaying;
}

// Aliases for modern naming
export const playSong = startDrone;
export const pauseSong = stopDrone;
export const isSongPlaying = isDroneOn;

// -------------------------------------------------------------
// Synthesized Tanpura Fallback (Web Audio API)
// -------------------------------------------------------------

let ctx = null;
let master = null;
let droneTimer = null;
let padNodes = [];
let padGain = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

const SA = 138.59;
const CYCLE = [SA * 1.5, SA * 2, SA * 2, SA];

function pluck(freq, when) {
  const c = getCtx();
  if (!c || !master) return;
  const osc = c.createOscillator();
  const osc2 = c.createOscillator();
  const filter = c.createBiquadFilter();
  const g = c.createGain();
  osc.type = "sawtooth";
  osc2.type = "sawtooth";
  osc.frequency.value = freq;
  osc2.frequency.value = freq * 1.003;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2400, when);
  filter.frequency.exponentialRampToValueAtTime(500, when + 3);
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(0.05, when + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, when + 4.2);
  osc.connect(filter);
  osc2.connect(filter);
  filter.connect(g);
  g.connect(master);
  osc.start(when);
  osc2.start(when);
  osc.stop(when + 4.4);
  osc2.stop(when + 4.4);
}

function startSynthesizedDrone() {
  const c = getCtx();
  if (!c || !master || droneTimer) return;
  padGain = c.createGain();
  padGain.gain.setValueAtTime(0.0001, c.currentTime);
  padGain.gain.exponentialRampToValueAtTime(0.025, c.currentTime + 2.5);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 420;
  lp.connect(padGain);
  padGain.connect(master);
  padNodes = [SA / 2, SA, SA * 1.5].map((f) => {
    const o = c.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    o.connect(lp);
    o.start();
    return o;
  });

  let i = 0;
  const step = () => {
    const now = getCtx()?.currentTime ?? 0;
    pluck(CYCLE[i % CYCLE.length] ?? SA, now + 0.02);
    i++;
  };
  step();
  droneTimer = setInterval(step, 1150);
}

function stopSynthesizedDrone() {
  if (droneTimer) clearInterval(droneTimer);
  droneTimer = null;
  const c = ctx;
  if (c && padGain) {
    padGain.gain.cancelScheduledValues(c.currentTime);
    padGain.gain.setValueAtTime(padGain.gain.value, c.currentTime);
    padGain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 1);
    const nodes = padNodes;
    setTimeout(() => nodes.forEach((n) => n.stop()), 1100);
  }
  padNodes = [];
  padGain = null;
}

let noiseBuffer = null;

/** A hand clap (taali) layered with a soft dholak thump. */
export function taali() {
  const c = getCtx();
  if (!c || !master) return;
  if (!noiseBuffer) {
    noiseBuffer = c.createBuffer(1, c.sampleRate * 0.3, c.sampleRate);
    const d = noiseBuffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const now = c.currentTime;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1300 + Math.random() * 400;
  bp.Q.value = 0.9;
  const g = c.createGain();
  bp.connect(g);
  g.connect(master);
  [0, 0.012, 0.024].forEach((t, idx) => {
    const src = c.createBufferSource();
    src.buffer = noiseBuffer;
    const eg = c.createGain();
    const peak = idx === 2 ? 0.9 : 0.5;
    eg.gain.setValueAtTime(0.0001, now + t);
    eg.gain.exponentialRampToValueAtTime(peak, now + t + 0.002);
    eg.gain.exponentialRampToValueAtTime(0.0001, now + t + (idx === 2 ? 0.18 : 0.02));
    src.connect(eg);
    eg.connect(bp);
    src.start(now + t);
    src.stop(now + t + 0.25);
  });

  const thump = c.createOscillator();
  const tg = c.createGain();
  thump.type = "sine";
  thump.frequency.setValueAtTime(140, now);
  thump.frequency.exponentialRampToValueAtTime(55, now + 0.25);
  tg.gain.setValueAtTime(0.0001, now);
  tg.gain.exponentialRampToValueAtTime(0.5, now + 0.005);
  tg.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
  thump.connect(tg);
  tg.connect(master);
  thump.start(now);
  thump.stop(now + 0.32);
}
