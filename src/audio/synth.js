// Little sound effects made on the fly with Web Audio, for easter eggs that have no recorded sound.
// The context is created on the first user gesture (unlockSynth) so browsers let it play later from timers.
let ctx = null;

export const unlockSynth = () => {
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  } catch { ctx = null; }
};

// Runs build(ctx, now, out) with `out` a gain node at the given volume; does nothing if audio is unavailable
const play = (volume, build) => {
  unlockSynth();
  if (!ctx || volume <= 0) return;
  try {
    const out = ctx.createGain();
    out.gain.value = volume;
    out.connect(ctx.destination);
    build(ctx, ctx.currentTime, out);
  } catch { /* audio unavailable */ }
};

// A tiny goat scream: a buzzy, warbling "AAAAH" that rises then trails off
export const playGoatScream = (volume) => play(volume, (ac, t, out) => {
  const voice = ac.createOscillator();
  voice.type = 'sawtooth';
  voice.frequency.setValueAtTime(480, t);
  voice.frequency.linearRampToValueAtTime(780, t + 0.12);
  voice.frequency.linearRampToValueAtTime(720, t + 0.65);
  voice.frequency.linearRampToValueAtTime(400, t + 1.0);
  // the bleat: fast wobble on the pitch
  const wobble = ac.createOscillator();
  wobble.frequency.value = 26;
  const wobbleDepth = ac.createGain();
  wobbleDepth.gain.value = 50;
  wobble.connect(wobbleDepth).connect(voice.frequency);
  const mouth = ac.createBiquadFilter();
  mouth.type = 'bandpass';
  mouth.frequency.value = 1500;
  mouth.Q.value = 1.1;
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.5, t + 0.05);
  env.gain.setValueAtTime(0.5, t + 0.7);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 1.05);
  voice.connect(mouth).connect(env).connect(out);
  voice.start(t); wobble.start(t);
  voice.stop(t + 1.1); wobble.stop(t + 1.1);
});

// Slide whistle swooping down, for slipping on a banana peel
export const playSlip = (volume) => play(volume, (ac, t, out) => {
  const whistle = ac.createOscillator();
  whistle.type = 'sine';
  whistle.frequency.setValueAtTime(1500, t);
  whistle.frequency.exponentialRampToValueAtTime(260, t + 0.55);
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.4, t + 0.03);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  whistle.connect(env).connect(out);
  whistle.start(t);
  whistle.stop(t + 0.65);
});

// A bright three-note chime for an achievement
export const playAchievement = (volume) => play(volume, (ac, t, out) => {
  [784, 988, 1319].forEach((freq, i) => {
    const start = t + i * 0.09;
    const note = ac.createOscillator();
    note.type = 'square';
    note.frequency.value = freq;
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.exponentialRampToValueAtTime(0.18, start + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, start + (i === 2 ? 0.5 : 0.15));
    note.connect(env).connect(out);
    note.start(start);
    note.stop(start + 0.55);
  });
});

// A soft "fwoomp" as a candle catches inside a jack-o'-lantern
export const playIgnite = (volume) => play(volume, (ac, t, out) => {
  const length = 0.5;
  const noise = ac.createBuffer(1, Math.ceil(ac.sampleRate * length), ac.sampleRate);
  const samples = noise.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
  const flame = ac.createBufferSource();
  flame.buffer = noise;
  const tone = ac.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.setValueAtTime(250, t);
  tone.frequency.exponentialRampToValueAtTime(1800, t + 0.12);
  tone.frequency.exponentialRampToValueAtTime(500, t + length);
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.6, t + 0.06);
  env.gain.exponentialRampToValueAtTime(0.0001, t + length);
  flame.connect(tone).connect(env).connect(out);
  flame.start(t);
  flame.stop(t + length);
});
