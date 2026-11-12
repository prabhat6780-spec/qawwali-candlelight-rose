// Tiny synthesized "mehfil" soundscape: a tanpura-style drone and a taali (clap).
// Everything is generated with Web Audio, so no audio files are shipped.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let droneTimer: ReturnType<typeof setInterval> | null = null;
let padNodes: OscillatorNode[] = [];
let padGain: GainNode | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// Sa = C#3, tanpura cycle: Pa · Sa' · Sa' · Sa
const SA = 138.59;
const CYCLE = [SA * 1.5, SA * 2, SA * 2, SA];

function pluck(freq: number, when: number) {
  const c = getCtx();
  if (!c || !master) return;
  const osc = c.createOscillator();
  const osc2 = c.createOscillator();
  const filter = c.createBiquadFilter();
  const g = c.createGain();
  osc.type = "sawtooth";
  osc2.type = "sawtooth";
  osc.frequency.value = freq;
  osc2.frequency.value = freq * 1.003; // jawari-like shimmer
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

export function startDrone() {
  const c = getCtx();
  if (!c || !master || droneTimer) return;
  // soft continuous pad underneath
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

export function stopDrone() {
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

export function isDroneOn() {
  return droneTimer !== null;
}

let noiseBuffer: AudioBuffer | null = null;

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
