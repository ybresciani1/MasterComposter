export const BASE = 'https://master-composter.vercel.app/assets';

export const backgroundMusic = `${BASE}/nastelbom-background-music-486996.mp3`;

// Replaces the theme music at Halloween and Día de los Muertos (see data/holidays.js). Loaded from the game's own
// public/assets (same origin) rather than BASE, so it plays in local dev too, before it's deployed.
export const spookyMusic = '/assets/Spooky Theme 1.mp3';

export const wowSound = `${BASE}/anime-wow-sound-effect.mp3`;

export const endCreditsVideo = `${BASE}/Compost Class Credits-compressed.mp4`;

export const pitchforkSound = `${BASE}/Pitchfork Sound Final.mp3`;

export const hammerSound = `${BASE}/Hammer Sound Final.mp3`;

export const patDirtSound = `${BASE}/Pat Dirt Final Sound.mp3`;

export const magicSound = `${BASE}/Magic Sound Final.mp3`;

export const wakeUpSound = `${BASE}/Wake up Sound Final.mp3`;

export const nightmareSound = `${BASE}/Nightmare sound.mp3`;

export const tossBinSound = `${BASE}/Toss Bin Final Sound.mp3`;

export const questSound = `${BASE}/Quest sound.mp3`;

export const introAnxietySound = `${BASE}/Intro anxiety.mp3`;

export const sakuraSound = `${BASE}/Master tap sakura flowers.mp3`;

export const woodliceSound = `${BASE}/Woodlice touch sound.mp3`;

export const beeTapSound = `${BASE}/bee tap.mp3`;

export const butterflyTapSound = `${BASE}/Butterfly tap.mp3`;

export const frogTapSound = `${BASE}/Frog tap.mp3`;

export const oiiaCatSound = `${BASE}/oiia-cat-remix TAP sound.mp3`;

export const wateringCanSound = `${BASE}/Watering Can.mp3`;

export const loseHeartSound = `${BASE}/Lose heart Sound.mp3`;

export const riotBeyonceTapSound = `${BASE}/RiotBeyonce Tap Sound.mp3`;

export const kittenTossSound = `${BASE}/Kitten toss sound.mp3`;

// Preloaded at startup. The intro music (introAnxietySound, ~1 MB) isn't: it loads when a new game starts.
export const SOUND_URLS = [
  pitchforkSound, hammerSound, patDirtSound, magicSound, wakeUpSound,
  nightmareSound, tossBinSound, questSound, sakuraSound,
  woodliceSound, beeTapSound, butterflyTapSound, frogTapSound, wateringCanSound,
  loseHeartSound, riotBeyonceTapSound, kittenTossSound,
];
