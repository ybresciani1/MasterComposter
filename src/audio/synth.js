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

// Sleigh-bell jingle as a Christmas tree's lights come on
export const playJingle = (volume) => play(volume, (ac, t, out) => {
  [1568, 2093, 1760, 2349, 2093].forEach((freq, i) => {
    const start = t + i * 0.06;
    const bell = ac.createOscillator();
    bell.type = 'triangle';
    bell.frequency.value = freq;
    const shimmer = ac.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = freq * 2.76; // a bell's inharmonic overtone
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.exponentialRampToValueAtTime(0.2, start + 0.005);
    env.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
    bell.connect(env); shimmer.connect(env); env.connect(out);
    bell.start(start); shimmer.start(start);
    bell.stop(start + 0.4); shimmer.stop(start + 0.4);
  });
});

// A springy rising "bloop" as a seedling shoots up into a flower
export const playGrow = (volume) => play(volume, (ac, t, out) => {
  const tone = ac.createOscillator();
  tone.type = 'triangle';
  tone.frequency.setValueAtTime(330, t);
  tone.frequency.exponentialRampToValueAtTime(990, t + 0.18);
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.35, t + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  tone.connect(env).connect(out);
  tone.start(t);
  tone.stop(t + 0.32);
});

// A tiny party-horn toot for a worm popping out of its hole
export const playPartyHorn = (volume) => play(volume, (ac, t, out) => {
  const horn = ac.createOscillator();
  horn.type = 'sawtooth';
  horn.frequency.setValueAtTime(520, t);
  horn.frequency.linearRampToValueAtTime(700, t + 0.08);
  horn.frequency.setValueAtTime(700, t + 0.25);
  const kazoo = ac.createBiquadFilter();
  kazoo.type = 'bandpass';
  kazoo.frequency.value = 1200;
  kazoo.Q.value = 2;
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.4, t + 0.03);
  env.gain.setValueAtTime(0.4, t + 0.22);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
  horn.connect(kazoo).connect(env).connect(out);
  horn.start(t);
  horn.stop(t + 0.34);
});

// A ghostly "wooOOooo" as a ghost floats out of a jack-o'-lantern
export const playGhost = (volume) => play(volume, (ac, t, out) => {
  const voice = ac.createOscillator();
  voice.type = 'sine';
  voice.frequency.setValueAtTime(380, t);
  voice.frequency.linearRampToValueAtTime(620, t + 0.45);
  voice.frequency.linearRampToValueAtTime(330, t + 1.1);
  const wobble = ac.createOscillator();
  wobble.frequency.value = 5;
  const wobbleDepth = ac.createGain();
  wobbleDepth.gain.value = 18;
  wobble.connect(wobbleDepth).connect(voice.frequency);
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.3, t + 0.2);
  env.gain.setValueAtTime(0.3, t + 0.8);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 1.15);
  voice.connect(env).connect(out);
  voice.start(t); wobble.start(t);
  voice.stop(t + 1.2); wobble.stop(t + 1.2);
});

// Bones clattering, xylophone style, when a dancing skeleton is tapped
export const playBoneRattle = (volume) => play(volume, (ac, t, out) => {
  [1047, 784, 1319, 988, 1175, 880].forEach((freq, i) => {
    const start = t + i * 0.055;
    const knock = ac.createOscillator();
    knock.type = 'square';
    knock.frequency.value = freq;
    const tone = ac.createBiquadFilter();
    tone.type = 'bandpass';
    tone.frequency.value = freq * 1.5;
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.exponentialRampToValueAtTime(0.3, start + 0.004);
    env.gain.exponentialRampToValueAtTime(0.0001, start + 0.08);
    knock.connect(tone).connect(env).connect(out);
    knock.start(start);
    knock.stop(start + 0.1);
  });
});

// A big spooky "BOOOO!" when a ghost is tapped: a low, wobbly voice through a vowel-shaped filter, falling in pitch
export const playBoo = (volume) => play(volume, (ac, t, out) => {
  const voice = ac.createOscillator();
  voice.type = 'sawtooth';
  voice.frequency.setValueAtTime(240, t);
  voice.frequency.linearRampToValueAtTime(280, t + 0.15);
  voice.frequency.exponentialRampToValueAtTime(120, t + 0.9);
  const wobble = ac.createOscillator();
  wobble.frequency.value = 6;
  const wobbleDepth = ac.createGain();
  wobbleDepth.gain.value = 10;
  wobble.connect(wobbleDepth).connect(voice.frequency);
  // an "oo" vowel: a low resonance, with the rest rolled off
  const vowel = ac.createBiquadFilter();
  vowel.type = 'bandpass';
  vowel.frequency.value = 420;
  vowel.Q.value = 3;
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.9, t + 0.06);
  env.gain.setValueAtTime(0.9, t + 0.6);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 1.0);
  voice.connect(vowel).connect(env).connect(out);
  voice.start(t); wobble.start(t);
  voice.stop(t + 1.05); wobble.stop(t + 1.05);
});

// --- Día de los Muertos title sounds ---

// Short burst of filtered noise: the building block for rattles, rustles and wing beats
const noiseBurst = (ac, out, start, length, { type = 'highpass', freq = 3000, peak = 0.4 } = {}) => {
  const buffer = ac.createBuffer(1, Math.ceil(ac.sampleRate * length), ac.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.01, length / 4));
  env.gain.exponentialRampToValueAtTime(0.0001, start + length);
  src.connect(filter).connect(env).connect(out);
  src.start(start);
  src.stop(start + length);
};

// A soft bell as an ofrenda candle's flame catches
export const playChime = (volume) => play(volume, (ac, t, out) => {
  [[1318, 0.2], [2637, 0.08]].forEach(([freq, peak]) => {
    const bell = ac.createOscillator();
    bell.type = 'sine';
    bell.frequency.value = freq;
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, t + 0.05);
    env.gain.exponentialRampToValueAtTime(peak, t + 0.06);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
    bell.connect(env).connect(out);
    bell.start(t + 0.05);
    bell.stop(t + 1.35);
  });
});

// Wings beating and a sparkly shimmer as monarchs flutter out of a marigold
export const playFlutter = (volume) => play(volume, (ac, t, out) => {
  for (let i = 0; i < 7; i++) noiseBurst(ac, out, t + i * 0.05, 0.04, { type: 'bandpass', freq: 1800, peak: 0.25 });
  [1568, 2093, 2637, 3136].forEach((freq, i) => {
    const sparkle = ac.createOscillator();
    sparkle.type = 'sine';
    sparkle.frequency.value = freq;
    const env = ac.createGain();
    const start = t + 0.1 + i * 0.06;
    env.gain.setValueAtTime(0.0001, start);
    env.gain.exponentialRampToValueAtTime(0.08, start + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
    sparkle.connect(env).connect(out);
    sparkle.start(start);
    sparkle.stop(start + 0.32);
  });
});

// "Chk-chk-chk": a maraca shake for a wiggling sugar skull
export const playMaraca = (volume) => play(volume, (ac, t, out) => {
  [0, 0.12, 0.2, 0.32].forEach((offset, i) => noiseBurst(ac, out, t + offset, i % 2 ? 0.05 : 0.08, { freq: 5000, peak: 0.5 }));
});

// A marimba run for a hopping alebrije: cats climb up, dogs bounce
const MARIMBA_RUNS = { cat: [523, 659, 784, 1047], dog: [392, 523, 392, 659] };
export const playMarimba = (volume, kind = 'cat') => play(volume, (ac, t, out) => {
  (MARIMBA_RUNS[kind] ?? MARIMBA_RUNS.cat).forEach((freq, i) => {
    const start = t + i * 0.09;
    [[freq, 0.35], [freq * 4, 0.06]].forEach(([f, peak]) => {
      const bar = ac.createOscillator();
      bar.type = 'sine';
      bar.frequency.value = f;
      const env = ac.createGain();
      env.gain.setValueAtTime(0.0001, start);
      env.gain.exponentialRampToValueAtTime(peak, start + 0.005);
      env.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
      bar.connect(env).connect(out);
      bar.start(start);
      bar.stop(start + 0.4);
    });
  });
});

// A strummed G-major chord for the guitar-playing mariachi
export const playGuitarStrum = (volume) => play(volume, (ac, t, out) => {
  [196, 247, 294, 392, 494, 784].forEach((freq, i) => {
    const start = t + i * 0.018;
    const string = ac.createOscillator();
    string.type = 'sawtooth';
    string.frequency.value = freq;
    const body = ac.createBiquadFilter();
    body.type = 'lowpass';
    body.frequency.setValueAtTime(2500, start);
    body.frequency.exponentialRampToValueAtTime(400, start + 0.8);
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.exponentialRampToValueAtTime(0.12, start + 0.005);
    env.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
    string.connect(body).connect(env).connect(out);
    string.start(start);
    string.stop(start + 1.25);
  });
});

// A bright little fanfare for the trumpet-playing mariachi
export const playTrumpet = (volume) => play(volume, (ac, t, out) => {
  [[523, 0, 0.12], [659, 0.13, 0.12], [784, 0.26, 0.12], [1047, 0.39, 0.45]].forEach(([freq, offset, length]) => {
    const start = t + offset;
    const horn = ac.createOscillator();
    horn.type = 'sawtooth';
    horn.frequency.value = freq;
    const vibrato = ac.createOscillator();
    vibrato.frequency.value = 6;
    const vibratoDepth = ac.createGain();
    vibratoDepth.gain.value = length > 0.2 ? 6 : 0;
    vibrato.connect(vibratoDepth).connect(horn.frequency);
    const bell = ac.createBiquadFilter();
    bell.type = 'lowpass';
    bell.frequency.value = 2200;
    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
    env.gain.setValueAtTime(0.22, start + length - 0.03);
    env.gain.exponentialRampToValueAtTime(0.0001, start + length);
    horn.connect(bell).connect(env).connect(out);
    horn.start(start); vibrato.start(start);
    horn.stop(start + length + 0.02); vibrato.stop(start + length + 0.02);
  });
});

// Papery rustle as the papel picado flutters
export const playRustle = (volume) => play(volume, (ac, t, out) => {
  for (let i = 0; i < 6; i++) noiseBurst(ac, out, t + i * 0.07 + Math.random() * 0.03, 0.09, { freq: 2500, peak: 0.18 });
});
