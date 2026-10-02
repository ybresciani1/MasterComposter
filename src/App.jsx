import React, { useState, useEffect, useRef } from 'react';
const BASE = 'https://master-composter.vercel.app/assets';
const backgroundMusic = `${BASE}/nastelbom-background-music-486996.mp3`;
const wowSound = `${BASE}/anime-wow-sound-effect.mp3`;
const endCreditsVideo = `${BASE}/Compost Class Credits-compressed.mp4`;
const pitchforkSound = `${BASE}/Pitchfork Sound Final.mp3`;
const hammerSound = `${BASE}/Hammer Sound Final.mp3`;
const patDirtSound = `${BASE}/Pat Dirt Final Sound.mp3`;
const magicSound = `${BASE}/Magic Sound Final.mp3`;
const wakeUpSound = `${BASE}/Wake up Sound Final.mp3`;
const nightmareSound = `${BASE}/Nightmare sound.mp3`;
const tossBinSound = `${BASE}/Toss Bin Final Sound.mp3`;
const questSound = `${BASE}/Quest sound.mp3`;
const introAnxietySound = `${BASE}/Intro anxiety.mp3`;
const sakuraSound = `${BASE}/Master tap sakura flowers.mp3`;
const woodliceSound = `${BASE}/Woodlice touch sound.mp3`;
const beeTapSound = `${BASE}/bee tap.mp3`;
const butterflyTapSound = `${BASE}/Butterfly tap.mp3`;
const frogTapSound = `${BASE}/Frog tap.mp3`;
const oiiaCatSound = `${BASE}/oiia-cat-remix TAP sound.mp3`;
const wateringCanSound = `${BASE}/Watering Can.mp3`;
const loseHeartSound = `${BASE}/Lose heart Sound.mp3`;
const riotBeyonceTapSound = `${BASE}/RiotBeyonce Tap Sound.mp3`;
const kittenTossSound = `${BASE}/Kitten toss sound.mp3`;

const SOUND_URLS = [
  pitchforkSound, hammerSound, patDirtSound, magicSound, wakeUpSound,
  nightmareSound, tossBinSound, questSound, introAnxietySound, sakuraSound,
  woodliceSound, beeTapSound, butterflyTapSound, frogTapSound, wateringCanSound,
  loseHeartSound, riotBeyonceTapSound, kittenTossSound,
];

// --- GAME DATA ---
const SOIL_COMPONENTS = ['🌿 Organic Materials', '🪨 Minerals', '💧 Water', '💨 Air'];
const FALSE_COMPONENTS = ['🥤 Plastic', '✨ Magic', '🐱 Kittens'];

const EXAMPLE_ITEMS = [
  { id: 'ex_n1', name: 'Grass Clippings', sprite: '🥬', comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_n2', name: 'Vegetable Scraps', sprite: '🥦', comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_n3', name: 'Coffee Grounds', sprite: '☕', comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_c1', name: 'Dry Leaves', sprite: '🍂', comp: '🍂 Carbon (Browns)' },
  { id: 'ex_c2', name: 'Cardboard', sprite: '📦', comp: '🍂 Carbon (Browns)' },
  { id: 'ex_c3', name: 'Twigs', sprite: '🪵', comp: '🍂 Carbon (Browns)' },
  { id: 'ex_w', name: 'Watering Can', type: 'tool', sprite: '🚿', comp: '💧 Water' },
  { id: 'ex_a', name: 'Pitchfork', type: 'tool', sprite: '', comp: '💨 Air' }
];

const EXAMPLE_BINS = [
  { id: 'bin_n', x: 20, y: 15, comp: '🍃 Nitrogen (Greens)', color: 'bg-green-700', label: 'Greens Bin' },
  { id: 'bin_c', x: 240, y: 15, comp: '🍂 Carbon (Browns)', color: 'bg-[#8d6e63]', label: 'Browns Bin' },
];

const SOIL_PROBLEMS = [
  {
    id: 'compaction',
    name: "Compacted Plot",
    x: 30, y: 50,
    description: "The soil is packed too tightly, suffocating roots and blocking water.",
    hint: "Yikes, that dirt is hard as a rock! We need to poke some holes to let air in and mix in some compost.",
    options: [
      { text: "Aerate with Pitchfork & add Organic Matter", correct: true },
      { text: "Flood it with water until it's mud", correct: false },
      { text: "Roll over it with heavy machinery", correct: false }
    ]
  },
  {
    id: 'erosion',
    name: "Eroding Plot",
    x: 135, y: 50,
    description: "Wind and rain are washing the precious topsoil away!",
    hint: "The wind and rain are stealing our soil! We should cover it up and give it some roots to hold onto.",
    options: [
      { text: "Remove all plants to clear the area", correct: false },
      { text: "Plant Cover Crops & apply Mulch", correct: true },
      { text: "Spray it down with a high-pressure hose", correct: false }
    ]
  },
  {
    id: 'drainage',
    name: "Flooded Plot",
    x: 240, y: 50,
    description: "Water pools on the surface. The roots are drowning!",
    hint: "That's a swamp, not a garden! We need to raise the beds so the water can flow away.",
    options: [
      { text: "Pave over it with concrete", correct: false },
      { text: "Build Raised Beds & improve grading", correct: true },
      { text: "Dig a deep hole and wait", correct: false }
    ]
  }
];

const PLANTS = [
  { id: 'tomato', name: 'Tomatoes', sprite: '🍅', soil: 'Loamy, well-draining, nutrient-rich soil' },
  { id: 'succulent', name: 'Succulents', sprite: '🌵', soil: 'Sandy, highly porous, fast-draining soil' },
  { id: 'blueberry', name: 'Blueberries', sprite: '🫐', soil: 'Acidic, well-draining loamy soil' },
  { id: 'fern', name: 'Ferns', sprite: '🌿', soil: 'Moist, shady soil rich in organic matter' },
];

// --- REUSABLE UI COMPONENTS ---
const FarmerSprite = React.memo(() => (
  <svg viewBox="0 0 24 27" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hat & flower */}
    <path d="M9,0 h6 v1 h-6 z M8,1 h1 v1 h-1 z M11,1 h5 v1 h-5 z M10,2 h6 v1 h-6 z M4,4 h16 v1 h-16 z" fill="#f48fb1" />
    <path d="M9,1 h2 v1 h-2 z M9,2 h1 v1 h-1 z" fill="#f8bbd0" />
    <path d="M4,5 h16 v1 h-16 z" fill="#ec407a" />
    <path d="M8,3 h8 v1 h-8 z" fill="#d81b60" />
    <path d="M7,1 h1 v1 h-1 z M6,2 h1 v1 h-1 z M8,2 h1 v1 h-1 z M7,3 h1 v1 h-1 z" fill="#ff4081" />
    <path d="M7,2 h1 v1 h-1 z" fill="#fdd835" />
    {/* Hair & braids */}
    <path d="M7,6 h10 v1 h-10 z M6,7 h1 v1 h-1 z M17,7 h1 v1 h-1 z M7,8 h1 v1 h-1 z M16,8 h1 v1 h-1 z M6,9 h1 v1 h-1 z M17,9 h1 v1 h-1 z M7,10 h1 v1 h-1 z M16,10 h1 v1 h-1 z M6,11 h1 v1 h-1 z M17,11 h1 v1 h-1 z M7,12 h1 v1 h-1 z M16,12 h1 v1 h-1 z M6,13 h1 v1 h-1 z M17,13 h1 v1 h-1 z M7,14 h1 v1 h-1 z M16,14 h1 v1 h-1 z M6,15 h1 v1 h-1 z M17,15 h1 v1 h-1 z M7,16 h1 v1 h-1 z M16,16 h1 v1 h-1 z M7,18 h1 v2 h-1 z M16,18 h1 v2 h-1 z" fill="#d84315" />
    <path d="M6,6 h1 v1 h-1 z M17,6 h1 v1 h-1 z M7,7 h1 v1 h-1 z M16,7 h1 v1 h-1 z M6,8 h1 v1 h-1 z M17,8 h1 v1 h-1 z M7,9 h1 v1 h-1 z M16,9 h1 v1 h-1 z M6,10 h1 v1 h-1 z M17,10 h1 v1 h-1 z M7,11 h1 v1 h-1 z M16,11 h1 v1 h-1 z M6,12 h1 v1 h-1 z M17,12 h1 v1 h-1 z M7,13 h1 v1 h-1 z M16,13 h1 v1 h-1 z M6,14 h1 v1 h-1 z M17,14 h1 v1 h-1 z M7,15 h1 v1 h-1 z M16,15 h1 v1 h-1 z M6,16 h1 v1 h-1 z M17,16 h1 v1 h-1 z M6,18 h1 v1 h-1 z M17,18 h1 v1 h-1 z" fill="#bf360c" />
    <path d="M6,17 h2 v1 h-2 z M16,17 h2 v1 h-2 z" fill="#4caf50" />
    {/* Face & hands */}
    <path d="M8,7 h8 v1 h-8 z M8,8 h1 v3 h-1 z M11,8 h2 v2 h-2 z M15,8 h1 v3 h-1 z M10,10 h4 v1 h-4 z M8,11 h3 v1 h-3 z M13,11 h3 v1 h-3 z M4,17 h2 v1 h-2 z M18,17 h2 v1 h-2 z M5,18 h1 v1 h-1 z M18,18 h1 v1 h-1 z" fill="#ffccaa" />
    <path d="M11,12 h2 v1 h-2 z M4,18 h1 v1 h-1 z M19,18 h1 v1 h-1 z" fill="#eeb38f" />
    <path d="M9,10 h1 v1 h-1 z M14,10 h1 v1 h-1 z" fill="#ff8a80" />
    <path d="M11,11 h2 v1 h-2 z" fill="#c2705a" />
    <path d="M9,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M10,8 h1 v1 h-1 z M14,8 h1 v1 h-1 z M9,9 h2 v1 h-2 z M13,9 h2 v1 h-2 z" fill="#3e2723" />
    {/* Shirt & overalls */}
    <path d="M4,12 h2 v4 h-2 z M8,12 h1 v6 h-1 z M10,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z M15,12 h1 v6 h-1 z M18,12 h2 v4 h-2 z" fill="#e53935" />
    <path d="M4,16 h2 v1 h-2 z M18,16 h2 v1 h-2 z" fill="#c62828" />
    <path d="M10,13 h4 v2 h-4 z M9,15 h2 v2 h-2 z M13,15 h2 v2 h-2 z M9,17 h6 v1 h-6 z M8,18 h8 v2 h-8 z M8,20 h3 v4 h-3 z M13,20 h3 v4 h-3 z" fill="#1e88e5" />
    <path d="M9,12 h1 v2 h-1 z M14,12 h1 v2 h-1 z M11,15 h2 v2 h-2 z M7,20 h1 v4 h-1 z M16,20 h1 v4 h-1 z" fill="#1565c0" />
    <path d="M9,14 h1 v1 h-1 z M14,14 h1 v1 h-1 z" fill="#fdd835" />
    {/* Boots */}
    <path d="M7,24 h4 v1 h-4 z M13,24 h4 v1 h-4 z M6,25 h5 v1 h-5 z M13,25 h5 v1 h-5 z" fill="#8b5a2b" />
    <path d="M6,24 h1 v1 h-1 z M17,24 h1 v1 h-1 z" fill="#a1887f" />
    <path d="M6,26 h5 v1 h-5 z M13,26 h5 v1 h-5 z" fill="#5d4037" />
  </svg>
));

const WormSprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,11 h3 v-3 h3 v3 h3 v-4 h3 v5 h-14 z" fill="#f48fb1" />
    <path d="M4,9 h1 v2 h-1 z M7,11 h1 v1 h-1 z M10,8 h1 v3 h-1 z M13,9 h1 v1 h-1 z" fill="#d81b60" />
    <path d="M12,6 h4 v4 h-4 z" fill="#f48fb1" />
    <path d="M13,7 h1 v1 h-1 z M15,7 h1 v1 h-1 z" fill="#3e2723" />
  </svg>
));

const WallaceFollowerSprite = React.memo(() => (
  <svg viewBox="0 0 16 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M12,6 h4 v4 h-4 z" fill="#c8960c" />
    <path d="M12,9 h4 v1 h-4 z" fill="#5d4037" />
    <path d="M10,10 h6 v1 h-6 z" fill="#e8c44a" />
    <path d="M12,10 h4 v4 h-4 z" fill="#f48fb1" />
    <path d="M12,11 h2 v2 h-2 z M14,11 h2 v2 h-2 z" fill="white" />
    <path d="M12,11 h1 v1 h-1 z M14,11 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M2,15 h3 v-3 h3 v3 h3 v-4 h3 v5 h-14 z" fill="#f48fb1" />
    <path d="M4,13 h1 v2 h-1 z M7,15 h1 v1 h-1 z M10,12 h1 v3 h-1 z M13,13 h1 v1 h-1 z" fill="#d81b60" />
  </svg>
));

const SakuraSprite = React.memo(() => (
  <svg viewBox="0 0 10 10" className="w-full h-full drop-shadow-sm opacity-90" shapeRendering="geometricPrecision">
    <path d="M5,0 C8,0 10,4 5,10 C0,4 2,0 5,0 Z" fill="#f8bbd0" />
    <path d="M5,2 C7,2 8,4 5,8 C2,4 3,2 5,2 Z" fill="#f48fb1" />
  </svg>
));

const MonarchSprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M7,3 h2 v10 h-2 z" fill="#212121" />
    <path d="M1,2 h6 v6 h-6 z M9,2 h6 v6 h-6 z" fill="#ff9800" />
    <path d="M2,8 h5 v6 h-5 z M9,8 h5 v6 h-5 z" fill="#e65100" />
    <path d="M1,2 h6 v1 h-6 z M9,2 h6 v1 h-6 z M1,2 h1 v6 h-1 z M14,2 h1 v6 h-1 z M2,13 h5 v1 h-5 z M9,13 h5 v1 h-5 z M2,8 h1 v6 h-1 z M13,8 h1 v6 h-1 z" fill="#212121" />
    <path d="M1,3 h1 v1 h-1 z M14,3 h1 v1 h-1 z M2,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

const PaintedLadySprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M7,4 h2 v8 h-2 z" fill="#3e2723" />
    <path d="M2,3 h5 v5 h-5 z M9,3 h5 v5 h-5 z" fill="#ffb74d" />
    <path d="M3,8 h4 v5 h-4 z M9,8 h4 v5 h-4 z" fill="#fb8c00" />
    <path d="M2,3 h2 v2 h-2 z M12,3 h2 v2 h-2 z" fill="#000000" />
    <path d="M2,4 h1 v1 h-1 z M13,4 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M4,5 h2 v1 h-2 z M10,5 h2 v1 h-2 z" fill="#000000" opacity="0.6"/>
    <path d="M4,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M5,12 h1 v1 h-1 z M10,12 h1 v1 h-1 z" fill="#000000" opacity="0.8"/>
  </svg>
));

const DogfaceSprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M7,5 h2 v6 h-2 z" fill="#4e342e" />
    <path d="M2,3 h5 v5 h-5 z M9,3 h5 v5 h-5 z" fill="#ffeb3b" />
    <path d="M4,8 h3 v4 h-3 z M9,8 h3 v4 h-3 z" fill="#fdd835" />
    <path d="M2,3 h3 v2 h-3 z M11,3 h3 v2 h-3 z M2,5 h1 v2 h-1 z M13,5 h1 v2 h-1 z" fill="#000000" />
    <path d="M4,4 h1 v1 h-1 z M11,4 h1 v1 h-1 z" fill="#ec407a" />
  </svg>
));

const WoodlouseSprite = React.memo(() => (
  <svg viewBox="0 0 10 8" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M2,2 h6 v4 h-6 z" fill="#d1c4e9" />
    <path d="M3,1 h4 v1 h-4 z M3,6 h4 v1 h-4 z" fill="#b39ddb" />
    <path d="M4,2 h1 v4 h-1 z M6,2 h1 v4 h-1 z" fill="#9575cd" />
    <path d="M2,6 h1 v1 h-1 z M4,6 h1 v1 h-1 z M6,6 h1 v1 h-1 z M8,6 h1 v1 h-1 z" fill="#512da8" />
    <path d="M1,3 h1 v2 h-1 z M8,3 h1 v2 h-1 z" fill="#b39ddb" />
  </svg>
));

const RolledWoodlouseSprite = React.memo(() => (
  <svg viewBox="0 0 8 8" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M2,1 h4 v6 h-4 z" fill="#d1c4e9" />
    <path d="M1,2 h6 v4 h-6 z" fill="#d1c4e9" />
    <path d="M3,1 h2 v6 h-2 z" fill="#b39ddb" />
    <path d="M2,3 h4 v1 h-4 z M2,5 h4 v1 h-4 z" fill="#9575cd" />
  </svg>
));

const LightningSprite = React.memo(({ color = "#ab47bc" }) => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" shapeRendering="crispEdges">
    {/* Bolt */}
    <path d="M18,0 h6 v1 h-6 z M17,1 h3 v2 h-3 z M22,1 h2 v2 h-2 z M16,3 h3 v1 h-3 z M21,3 h2 v1 h-2 z M16,4 h2 v1 h-2 z M20,4 h3 v1 h-3 z M15,5 h2 v2 h-2 z M19,5 h3 v1 h-3 z M19,6 h2 v1 h-2 z M14,7 h2 v2 h-2 z M18,7 h2 v2 h-2 z M13,9 h2 v1 h-2 z M17,9 h7 v1 h-7 z M13,10 h3 v1 h-3 z M20,10 h4 v1 h-4 z M13,11 h7 v1 h-7 z M22,11 h2 v1 h-2 z M18,12 h3 v1 h-3 z M23,12 h2 v1 h-2 z M18,13 h2 v1 h-2 z M22,13 h3 v1 h-3 z M17,14 h2 v2 h-2 z M21,14 h3 v1 h-3 z M21,15 h2 v1 h-2 z M16,16 h2 v2 h-2 z M20,16 h2 v2 h-2 z M15,18 h2 v2 h-2 z M19,18 h2 v2 h-2 z M14,20 h2 v2 h-2 z M18,20 h2 v1 h-2 z M18,21 h1 v1 h-1 z M13,22 h2 v2 h-2 z M17,22 h1 v1 h-1 z M16,23 h1 v1 h-1 z M12,24 h2 v1 h-2 z M15,24 h1 v1 h-1 z M12,25 h3 v1 h-3 z M11,26 h3 v1 h-3 z M11,27 h2 v1 h-2 z M10,28 h2 v1 h-2 z M10,29 h1 v1 h-1 z M9,30 h1 v1 h-1 z" fill={color} />
    {/* Core */}
    <path d="M20,1 h2 v2 h-2 z M19,3 h2 v1 h-2 z M18,4 h2 v1 h-2 z M17,5 h2 v2 h-2 z M16,7 h2 v2 h-2 z M15,9 h2 v1 h-2 z M16,10 h4 v1 h-4 z M20,11 h2 v1 h-2 z M21,12 h2 v1 h-2 z M20,13 h2 v1 h-2 z M19,14 h2 v2 h-2 z M18,16 h2 v2 h-2 z M17,18 h2 v2 h-2 z M16,20 h2 v2 h-2 z M15,22 h2 v1 h-2 z M15,23 h1 v1 h-1 z M14,24 h1 v1 h-1 z" fill="#ffffff" opacity="0.85" />
  </svg>
));

const TumbleweedSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Tumbleweed */}
    <path d="M12,3 h1 v1 h-1 z M11,4 h1 v1 h-1 z M13,4 h5 v1 h-5 z M7,5 h1 v1 h-1 z M9,5 h6 v1 h-6 z M16,5 h1 v1 h-1 z M20,5 h1 v1 h-1 z M8,6 h4 v1 h-4 z M13,6 h3 v1 h-3 z M24,6 h1 v1 h-1 z M7,7 h4 v1 h-4 z M12,7 h4 v1 h-4 z M6,8 h8 v1 h-8 z M19,8 h1 v1 h-1 z M6,9 h7 v1 h-7 z M23,9 h1 v1 h-1 z M6,10 h6 v1 h-6 z M14,10 h1 v1 h-1 z M27,10 h1 v1 h-1 z M4,11 h7 v1 h-7 z M18,11 h1 v1 h-1 z M5,12 h1 v1 h-1 z M7,12 h1 v1 h-1 z M9,12 h1 v1 h-1 z M22,12 h1 v1 h-1 z M4,13 h3 v3 h-3 z M8,13 h1 v1 h-1 z M13,13 h1 v1 h-1 z M26,13 h1 v1 h-1 z M17,14 h1 v1 h-1 z M8,15 h1 v1 h-1 z M21,15 h1 v1 h-1 z M4,16 h2 v1 h-2 z M12,16 h1 v1 h-1 z M25,16 h1 v1 h-1 z M3,17 h2 v1 h-2 z M16,17 h1 v1 h-1 z M29,17 h1 v1 h-1 z M7,18 h1 v1 h-1 z M20,18 h1 v1 h-1 z M11,19 h1 v1 h-1 z M24,19 h1 v1 h-1 z M15,20 h1 v1 h-1 z M28,20 h1 v1 h-1 z M6,21 h1 v1 h-1 z M19,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M23,22 h1 v1 h-1 z M14,23 h1 v1 h-1 z M27,23 h1 v1 h-1 z M5,24 h1 v1 h-1 z M18,24 h1 v1 h-1 z M9,25 h1 v1 h-1 z M22,25 h1 v1 h-1 z M13,26 h1 v1 h-1 z M17,27 h1 v1 h-1 z M21,28 h1 v1 h-1 z M12,29 h1 v1 h-1 z" fill="#bcaaa4" />
    <path d="M19,4 h2 v1 h-2 z M17,5 h3 v1 h-3 z M21,5 h2 v1 h-2 z M16,6 h2 v1 h-2 z M20,6 h4 v1 h-4 z M16,7 h5 v1 h-5 z M22,7 h3 v1 h-3 z M14,8 h4 v1 h-4 z M21,8 h3 v1 h-3 z M25,8 h1 v1 h-1 z M13,9 h10 v1 h-10 z M24,9 h3 v1 h-3 z M12,10 h2 v1 h-2 z M15,10 h6 v1 h-6 z M23,10 h1 v1 h-1 z M25,10 h2 v1 h-2 z M12,11 h3 v1 h-3 z M16,11 h2 v1 h-2 z M19,11 h9 v1 h-9 z M10,12 h12 v1 h-12 z M23,12 h5 v1 h-5 z M9,13 h4 v1 h-4 z M14,13 h3 v1 h-3 z M18,13 h8 v1 h-8 z M27,13 h1 v2 h-1 z M8,14 h2 v1 h-2 z M11,14 h6 v1 h-6 z M18,14 h5 v1 h-5 z M24,14 h2 v1 h-2 z M7,15 h1 v1 h-1 z M9,15 h4 v1 h-4 z M14,15 h5 v1 h-5 z M20,15 h1 v1 h-1 z M22,15 h1 v1 h-1 z M24,15 h4 v1 h-4 z M6,16 h2 v1 h-2 z M9,16 h1 v1 h-1 z M11,16 h1 v1 h-1 z M13,16 h3 v1 h-3 z M17,16 h7 v1 h-7 z M26,16 h2 v1 h-2 z M6,17 h10 v1 h-10 z M17,17 h2 v1 h-2 z M20,17 h8 v1 h-8 z M4,18 h3 v1 h-3 z M8,18 h1 v1 h-1 z M10,18 h6 v1 h-6 z M17,18 h3 v1 h-3 z M21,18 h1 v1 h-1 z M23,18 h2 v1 h-2 z M26,18 h2 v2 h-2 z M4,19 h7 v1 h-7 z M12,19 h11 v1 h-11 z M4,20 h6 v1 h-6 z M11,20 h4 v1 h-4 z M17,20 h5 v1 h-5 z M23,20 h3 v1 h-3 z M27,20 h1 v1 h-1 z M5,21 h1 v1 h-1 z M7,21 h2 v1 h-2 z M10,21 h9 v1 h-9 z M20,21 h7 v1 h-7 z M5,22 h5 v1 h-5 z M12,22 h11 v1 h-11 z M24,22 h3 v1 h-3 z M6,23 h8 v1 h-8 z M16,23 h10 v1 h-10 z M7,24 h1 v1 h-1 z M9,24 h3 v1 h-3 z M13,24 h5 v1 h-5 z M19,24 h1 v1 h-1 z M21,24 h4 v1 h-4 z M8,25 h1 v1 h-1 z M10,25 h1 v1 h-1 z M12,25 h1 v1 h-1 z M14,25 h7 v1 h-7 z M23,25 h1 v1 h-1 z M9,26 h4 v1 h-4 z M15,26 h8 v1 h-8 z M11,27 h6 v1 h-6 z M18,27 h3 v1 h-3 z" fill="#a1887f" />
    <path d="M12,2 h8 v1 h-8 z M10,3 h2 v1 h-2 z M13,3 h9 v1 h-9 z M8,4 h3 v1 h-3 z M12,4 h1 v1 h-1 z M18,4 h1 v1 h-1 z M21,4 h3 v1 h-3 z M8,5 h1 v1 h-1 z M15,5 h1 v1 h-1 z M23,5 h2 v1 h-2 z M6,6 h2 v1 h-2 z M19,6 h1 v1 h-1 z M25,6 h1 v1 h-1 z M5,7 h2 v1 h-2 z M21,7 h1 v1 h-1 z M25,7 h2 v1 h-2 z M5,8 h1 v1 h-1 z M18,8 h1 v1 h-1 z M20,8 h1 v1 h-1 z M24,8 h1 v1 h-1 z M26,8 h2 v1 h-2 z M4,9 h2 v1 h-2 z M3,10 h2 v1 h-2 z M21,10 h2 v1 h-2 z M24,10 h1 v1 h-1 z M28,10 h1 v2 h-1 z M3,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M15,11 h1 v1 h-1 z M2,12 h3 v1 h-3 z M8,12 h1 v1 h-1 z M28,12 h2 v5 h-2 z M2,13 h2 v4 h-2 z M7,13 h1 v1 h-1 z M23,14 h1 v2 h-1 z M26,14 h1 v1 h-1 z M13,15 h1 v1 h-1 z M19,15 h1 v1 h-1 z M10,16 h1 v1 h-1 z M16,16 h1 v1 h-1 z M24,16 h1 v1 h-1 z M2,17 h1 v1 h-1 z M5,17 h1 v1 h-1 z M28,17 h1 v1 h-1 z M2,18 h2 v2 h-2 z M16,18 h1 v1 h-1 z M22,18 h1 v1 h-1 z M25,18 h1 v2 h-1 z M28,18 h2 v2 h-2 z M3,20 h1 v1 h-1 z M26,20 h1 v1 h-1 z M3,21 h2 v1 h-2 z M27,21 h2 v1 h-2 z M4,22 h1 v1 h-1 z M27,22 h1 v1 h-1 z M4,23 h2 v1 h-2 z M15,23 h1 v1 h-1 z M26,23 h1 v1 h-1 z M6,24 h1 v1 h-1 z M8,24 h1 v1 h-1 z M20,24 h1 v1 h-1 z M25,24 h2 v1 h-2 z M6,25 h2 v1 h-2 z M13,25 h1 v1 h-1 z M21,25 h1 v1 h-1 z M24,25 h2 v1 h-2 z M7,26 h2 v1 h-2 z M14,26 h1 v1 h-1 z M23,26 h2 v1 h-2 z M8,27 h3 v1 h-3 z M21,27 h3 v1 h-3 z M10,28 h4 v1 h-4 z M15,28 h5 v1 h-5 z M13,29 h7 v1 h-7 z" fill="#5d4037" />
    <path d="M12,6 h1 v1 h-1 z M18,6 h1 v1 h-1 z M11,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M27,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M6,12 h1 v1 h-1 z M17,13 h1 v1 h-1 z M7,14 h1 v1 h-1 z M10,14 h1 v1 h-1 z M8,16 h1 v1 h-1 z M19,17 h1 v1 h-1 z M9,18 h1 v1 h-1 z M23,19 h1 v1 h-1 z M10,20 h1 v1 h-1 z M16,20 h1 v1 h-1 z M22,20 h1 v1 h-1 z M9,21 h1 v1 h-1 z M11,22 h1 v1 h-1 z M12,24 h1 v1 h-1 z M11,25 h1 v1 h-1 z M14,28 h1 v1 h-1 z M20,28 h1 v1 h-1 z" fill="#3e2723" />
  </svg>
));

const FireSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Logs */}
    <path d="M4,26 h24 v1 h-24 z M4,27 h6 v1 h-6 z M12,27 h16 v1 h-16 z M3,28 h26 v1 h-26 z" fill="#795548" />
    <path d="M6,25 h20 v1 h-20 z M2,28 h1 v1 h-1 z M29,28 h1 v1 h-1 z M2,29 h18 v1 h-18 z M22,29 h8 v1 h-8 z M2,30 h28 v1 h-28 z" fill="#4e342e" />
    <path d="M10,27 h2 v1 h-2 z M20,29 h2 v1 h-2 z" fill="#3e2723" />
    {/* Flames */}
    <path d="M15,6 h1 v1 h-1 z M23,6 h1 v1 h-1 z M11,7 h5 v1 h-5 z M22,7 h1 v1 h-1 z M8,8 h1 v1 h-1 z M10,8 h7 v1 h-7 z M9,9 h1 v1 h-1 z M11,9 h7 v1 h-7 z M11,10 h4 v1 h-4 z M16,10 h3 v1 h-3 z M13,11 h2 v1 h-2 z M19,11 h3 v1 h-3 z M12,12 h3 v1 h-3 z M21,12 h3 v1 h-3 z M11,13 h5 v1 h-5 z M22,13 h3 v1 h-3 z M11,14 h4 v1 h-4 z M21,14 h4 v1 h-4 z M10,15 h4 v1 h-4 z M21,15 h3 v3 h-3 z M9,16 h3 v1 h-3 z M7,17 h3 v1 h-3 z M5,18 h3 v1 h-3 z M20,18 h4 v1 h-4 z M5,19 h4 v1 h-4 z M20,19 h5 v1 h-5 z M6,20 h4 v1 h-4 z M21,20 h4 v1 h-4 z M7,21 h3 v2 h-3 z M23,21 h3 v1 h-3 z M25,22 h2 v1 h-2 z M6,23 h3 v1 h-3 z M25,23 h3 v1 h-3 z M5,24 h4 v1 h-4 z M25,24 h4 v1 h-4 z M5,25 h1 v1 h-1 z M26,25 h3 v1 h-3 z" fill="#d32f2f" />
    <path d="M15,10 h1 v1 h-1 z M19,10 h1 v1 h-1 z M12,11 h1 v1 h-1 z M15,11 h4 v1 h-4 z M15,12 h6 v1 h-6 z M16,13 h6 v1 h-6 z M15,14 h6 v1 h-6 z M14,15 h3 v1 h-3 z M18,15 h3 v2 h-3 z M12,16 h3 v1 h-3 z M10,17 h2 v1 h-2 z M17,17 h4 v1 h-4 z M8,18 h4 v1 h-4 z M17,18 h3 v2 h-3 z M9,19 h3 v1 h-3 z M10,20 h3 v3 h-3 z M18,20 h3 v1 h-3 z M19,21 h4 v1 h-4 z M21,22 h4 v1 h-4 z M9,23 h4 v2 h-4 z M22,23 h3 v2 h-3 z" fill="#f57c00" />
    <path d="M17,15 h1 v1 h-1 z M15,16 h3 v1 h-3 z M12,17 h5 v3 h-5 z M13,20 h1 v1 h-1 z M15,20 h3 v1 h-3 z M13,21 h3 v4 h-3 z M17,21 h2 v1 h-2 z M19,22 h2 v1 h-2 z M20,23 h2 v2 h-2 z" fill="#fbc02d" />
    <path d="M14,20 h1 v1 h-1 z M16,21 h1 v1 h-1 z M16,22 h3 v1 h-3 z M16,23 h4 v2 h-4 z" fill="#fff176" />
  </svg>
));

const PitchforkSprite = React.memo(() => (
  <svg viewBox="0 0 22 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Handle */}
    <path d="M8,0 h1 v22 h-1 z" fill="#a1887f" />
    <path d="M9,0 h4 v22 h-4 z" fill="#8b5a2b" />
    <path d="M13,0 h1 v22 h-1 z" fill="#5d4037" />
    {/* Tines */}
    <path d="M4,22 h14 v1 h-14 z M4,26 h1 v4 h-1 z M10,26 h1 v4 h-1 z M16,26 h1 v4 h-1 z" fill="#bdbdbd" />
    <path d="M4,23 h14 v2 h-14 z M5,26 h1 v5 h-1 z M11,26 h1 v5 h-1 z M17,26 h1 v5 h-1 z" fill="#9e9e9e" />
    <path d="M4,25 h14 v1 h-14 z M4,30 h1 v1 h-1 z M10,30 h1 v1 h-1 z M16,30 h1 v1 h-1 z M5,31 h1 v1 h-1 z M11,31 h1 v1 h-1 z M17,31 h1 v1 h-1 z" fill="#757575" />
  </svg>
));

const WateringCanSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Can */}
    <path d="M9,8 h9 v12 h-9 z M26,8 h1 v1 h-1 z M25,9 h2 v1 h-2 z M24,10 h2 v1 h-2 z M23,11 h2 v1 h-2 z M19,12 h4 v1 h-4 z M20,13 h2 v1 h-2 z M8,20 h10 v1 h-10 z" fill="#0288d1" />
    <path d="M7,7 h12 v1 h-12 z M26,7 h1 v1 h-1 z M7,8 h2 v12 h-2 z M25,8 h1 v1 h-1 z M24,9 h1 v1 h-1 z M23,10 h1 v1 h-1 z M21,11 h2 v1 h-2 z M7,20 h1 v1 h-1 z" fill="#4fc3f7" />
    <path d="M8,1 h10 v1 h-10 z M8,2 h2 v4 h-2 z M16,2 h2 v4 h-2 z M27,4 h5 v1 h-5 z M27,5 h1 v5 h-1 z M31,5 h1 v5 h-1 z M6,6 h14 v1 h-14 z M6,7 h1 v14 h-1 z M19,7 h1 v1 h-1 z M18,8 h2 v4 h-2 z M26,10 h6 v1 h-6 z M25,11 h1 v1 h-1 z M18,12 h1 v1 h-1 z M23,12 h2 v1 h-2 z M18,13 h2 v1 h-2 z M22,13 h2 v1 h-2 z M18,14 h4 v1 h-4 z M18,15 h2 v6 h-2 z M6,21 h14 v1 h-14 z" fill="#01579b" />
    <path d="M28,5 h3 v5 h-3 z" fill="#b3e5fc" />
  </svg>
));

const CompostBagSprite = React.memo(() => (
  <svg viewBox="0 0 20 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bag */}
    <path d="M8,0 h4 v1 h-4 z M7,1 h6 v1 h-6 z M8,2 h4 v1 h-4 z M5,4 h1 v1 h-1 z M4,5 h1 v16 h-1 z" fill="#a1887f" />
    <path d="M7,2 h1 v1 h-1 z M12,2 h1 v1 h-1 z M4,21 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M6,4 h8 v1 h-8 z M5,5 h10 v2 h-10 z M5,7 h1 v5 h-1 z M13,7 h2 v1 h-2 z M14,8 h1 v3 h-1 z M13,11 h2 v1 h-2 z M5,12 h10 v9 h-10 z M5,21 h9 v1 h-9 z" fill="#795548" />
    <path d="M14,4 h1 v1 h-1 z M15,5 h1 v16 h-1 z M14,21 h2 v1 h-2 z M4,22 h12 v1 h-12 z" fill="#5d4037" />
    <path d="M6,3 h8 v1 h-8 z M5,23 h10 v1 h-10 z" fill="#3e2723" />
    {/* Label */}
    <path d="M6,7 h7 v1 h-7 z M6,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z M11,8 h3 v1 h-3 z M6,9 h3 v1 h-3 z M12,9 h2 v1 h-2 z M6,10 h1 v1 h-1 z M13,10 h1 v1 h-1 z M6,11 h7 v1 h-7 z" fill="#efe6d5" />
    <path d="M7,8 h2 v1 h-2 z M7,10 h3 v1 h-3 z M11,10 h2 v1 h-2 z" fill="#8d6e63" />
    <path d="M10,8 h1 v1 h-1 z M9,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M10,9 h1 v2 h-1 z" fill="#388e3c" />
  </svg>
));

const MulchSprite = React.memo(() => (
  <svg viewBox="0 0 24 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Wood chips */}
    <path d="M10,0 h1 v1 h-1 z M9,1 h3 v1 h-3 z M8,2 h3 v1 h-3 z M9,3 h4 v1 h-4 z M7,4 h1 v1 h-1 z M9,4 h2 v1 h-2 z M6,5 h4 v1 h-4 z M13,5 h1 v2 h-1 z M6,6 h2 v1 h-2 z M11,6 h1 v1 h-1 z M6,7 h3 v1 h-3 z M14,7 h2 v1 h-2 z M4,8 h1 v1 h-1 z M6,8 h1 v1 h-1 z M8,8 h2 v1 h-2 z M13,8 h1 v1 h-1 z M3,9 h2 v1 h-2 z M7,9 h1 v1 h-1 z M11,9 h2 v1 h-2 z M16,9 h1 v2 h-1 z M2,10 h5 v1 h-5 z M10,10 h1 v1 h-1 z M14,10 h1 v1 h-1 z M2,11 h1 v1 h-1 z M4,11 h2 v1 h-2 z M9,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M17,11 h2 v1 h-2 z M1,12 h1 v1 h-1 z M3,12 h1 v1 h-1 z M5,12 h1 v1 h-1 z M11,12 h2 v1 h-2 z M16,12 h1 v1 h-1 z M0,13 h2 v1 h-2 z M5,13 h2 v1 h-2 z M10,13 h1 v1 h-1 z M14,13 h2 v1 h-2 z M19,13 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M13,0 h1 v1 h-1 z M12,1 h1 v1 h-1 z M11,2 h2 v1 h-2 z M14,2 h2 v1 h-2 z M13,3 h1 v1 h-1 z M15,3 h1 v1 h-1 z M11,4 h3 v1 h-3 z M16,4 h1 v1 h-1 z M10,5 h1 v1 h-1 z M12,5 h1 v2 h-1 z M14,5 h2 v2 h-2 z M8,6 h2 v1 h-2 z M17,6 h2 v1 h-2 z M9,7 h2 v1 h-2 z M12,7 h2 v1 h-2 z M16,7 h1 v1 h-1 z M18,7 h1 v1 h-1 z M7,8 h1 v1 h-1 z M10,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M14,8 h3 v1 h-3 z M19,8 h1 v1 h-1 z M6,9 h1 v1 h-1 z M8,9 h3 v1 h-3 z M13,9 h1 v1 h-1 z M15,9 h1 v2 h-1 z M17,9 h2 v2 h-2 z M7,10 h1 v1 h-1 z M9,10 h1 v1 h-1 z M11,10 h2 v1 h-2 z M20,10 h2 v1 h-2 z M6,11 h2 v2 h-2 z M10,11 h1 v1 h-1 z M12,11 h2 v1 h-2 z M15,11 h2 v1 h-2 z M19,11 h1 v1 h-1 z M21,11 h1 v1 h-1 z M4,12 h1 v1 h-1 z M9,12 h2 v1 h-2 z M13,12 h1 v1 h-1 z M15,12 h1 v1 h-1 z M17,12 h3 v1 h-3 z M22,12 h1 v1 h-1 z M3,13 h2 v1 h-2 z M7,13 h1 v1 h-1 z M9,13 h1 v1 h-1 z M11,13 h3 v1 h-3 z M16,13 h1 v1 h-1 z M18,13 h1 v1 h-1 z M20,13 h2 v1 h-2 z" fill="#795548" />
    <path d="M11,0 h2 v1 h-2 z M13,1 h2 v1 h-2 z M13,2 h1 v1 h-1 z M8,3 h1 v2 h-1 z M14,3 h1 v1 h-1 z M14,4 h2 v1 h-2 z M11,5 h1 v1 h-1 z M16,5 h2 v1 h-2 z M5,6 h1 v4 h-1 z M10,6 h1 v1 h-1 z M16,6 h1 v1 h-1 z M11,7 h1 v2 h-1 z M17,7 h1 v1 h-1 z M17,8 h2 v1 h-2 z M14,9 h1 v1 h-1 z M19,9 h2 v1 h-2 z M8,10 h1 v4 h-1 z M13,10 h1 v1 h-1 z M19,10 h1 v1 h-1 z M3,11 h1 v1 h-1 z M14,11 h1 v2 h-1 z M20,11 h1 v1 h-1 z M2,12 h1 v3 h-1 z M20,12 h2 v1 h-2 z M17,13 h1 v1 h-1 z M22,13 h2 v1 h-2 z M4,14 h1 v1 h-1 z M6,14 h3 v1 h-3 z M11,14 h1 v1 h-1 z M13,14 h1 v1 h-1 z M15,14 h2 v1 h-2 z M19,14 h1 v1 h-1 z M21,14 h2 v1 h-2 z M1,15 h3 v1 h-3 z M6,15 h1 v1 h-1 z M8,15 h1 v1 h-1 z M10,15 h2 v1 h-2 z M14,15 h1 v1 h-1 z M16,15 h2 v1 h-2 z M19,15 h2 v1 h-2 z M23,15 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M0,14 h2 v1 h-2 z M3,14 h1 v1 h-1 z M5,14 h1 v1 h-1 z M9,14 h2 v1 h-2 z M12,14 h1 v1 h-1 z M14,14 h1 v1 h-1 z M17,14 h2 v1 h-2 z M20,14 h1 v1 h-1 z M23,14 h1 v1 h-1 z M0,15 h1 v1 h-1 z M4,15 h2 v1 h-2 z M7,15 h1 v1 h-1 z M9,15 h1 v1 h-1 z M12,15 h2 v1 h-2 z M15,15 h1 v1 h-1 z M18,15 h1 v1 h-1 z M21,15 h2 v1 h-2 z" fill="#3e2723" />
  </svg>
));

const HammerSprite = React.memo(() => (
  <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Head */}
    <path d="M6,0 h14 v1 h-14 z M6,1 h1 v4 h-1 z M19,1 h1 v5 h-1 z" fill="#bdbdbd" />
    <path d="M7,1 h12 v4 h-12 z M6,5 h13 v1 h-13 z M6,6 h14 v1 h-14 z" fill="#9e9e9e" />
    <path d="M6,7 h14 v1 h-14 z" fill="#757575" />
    <path d="M4,2 h2 v6 h-2 z M3,8 h1 v2 h-1 z M5,8 h1 v3 h-1 z M2,10 h1 v1 h-1 z" fill="#424242" />
    <path d="M4,0 h2 v2 h-2 z" fill="#616161" />
    {/* Handle */}
    <path d="M9,10 h1 v12 h-1 z" fill="#a1887f" />
    <path d="M10,10 h2 v12 h-2 z" fill="#8d6e63" />
    <path d="M12,10 h1 v12 h-1 z M9,22 h4 v2 h-4 z" fill="#6d4c41" />
  </svg>
));

const CrowSprite = React.memo(({ hasHeart = true }) => (
  <svg viewBox="0 0 64 40" className="w-full h-full drop-shadow-lg" shapeRendering="crispEdges">
    {/* Wing (matches body color, scaleY flap around SVG center) */}
    <g className="animate-crow-flap" style={{ transformOrigin: '28px 20px' }}>
      {/* Wing */}
      <path d="M28,0 h2 v1 h-2 z M27,1 h4 v1 h-4 z M26,2 h6 v1 h-6 z M25,3 h8 v1 h-8 z M24,4 h9 v1 h-9 z M23,5 h10 v1 h-10 z M22,6 h12 v1 h-12 z M22,7 h13 v1 h-13 z M21,8 h14 v1 h-14 z M21,9 h15 v1 h-15 z M20,10 h17 v1 h-17 z M20,11 h18 v1 h-18 z M20,12 h19 v1 h-19 z M20,13 h20 v1 h-20 z M21,14 h20 v1 h-20 z M22,15 h18 v1 h-18 z" fill="#0c0e14" />
      <path d="M33,4 h1 v1 h-1 z M33,5 h2 v1 h-2 z M34,6 h1 v1 h-1 z M35,7 h1 v1 h-1 z M35,8 h2 v1 h-2 z M36,9 h2 v1 h-2 z M37,10 h1 v1 h-1 z M38,11 h1 v1 h-1 z M39,12 h1 v1 h-1 z" fill="#1a3040" />
    </g>
    {/* Body, tail & head */}
    <path d="M40,13 h5 v1 h-5 z M38,14 h12 v1 h-12 z M10,15 h5 v1 h-5 z M36,15 h17 v1 h-17 z M8,16 h8 v1 h-8 z M20,16 h37 v1 h-37 z M8,17 h45 v1 h-45 z M8,18 h41 v1 h-41 z M8,19 h3 v1 h-3 z M13,19 h36 v1 h-36 z M8,20 h4 v1 h-4 z M14,20 h40 v1 h-40 z M8,21 h47 v1 h-47 z M8,22 h48 v1 h-48 z M9,23 h43 v1 h-43 z M10,24 h38 v1 h-38 z M12,25 h28 v1 h-28 z M14,26 h12 v1 h-12 z" fill="#0c0e14" />
    <path d="M53,17 h6 v1 h-6 z M49,18 h11 v1 h-11 z M49,19 h13 v1 h-13 z M54,20 h9 v1 h-9 z M55,21 h6 v1 h-6 z" fill="#1a3040" />
    {/* Beak, eye & legs */}
    <path d="M4,18 h4 v1 h-4 z M5,19 h3 v1 h-3 z M6,20 h2 v1 h-2 z M30,26 h2 v1 h-2 z M36,26 h2 v1 h-2 z M31,27 h2 v1 h-2 z M37,27 h2 v1 h-2 z M32,28 h3 v1 h-3 z M38,28 h3 v1 h-3 z" fill="#e8b820" />
    <path d="M11,19 h2 v1 h-2 z M12,20 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M13,20 h1 v1 h-1 z" fill="#000000" />
    {/* Heart in beak */}
    {hasHeart && <>
      {/* Heart */}
      <path d="M0,14 h2 v1 h-2 z M3,14 h2 v1 h-2 z M0,15 h1 v1 h-1 z M2,15 h4 v1 h-4 z M0,16 h6 v1 h-6 z M1,17 h4 v1 h-4 z M2,18 h2 v1 h-2 z" fill="#e53935" />
      <path d="M1,15 h1 v1 h-1 z" fill="#ffcdd2" />
    </>}
  </svg>
));

const CrowOverlay = ({ crow }) => {
  const [pos, setPos] = React.useState({ left: window.innerWidth + 50, top: crow.targetY });
  const [transition, setTransition] = React.useState('none');
  const [hasHeart, setHasHeart] = React.useState(false);

  React.useEffect(() => {
    // Next frame: trigger approach transition toward the heart
    const approachFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransition('left 1.4s cubic-bezier(0.25,0.1,0.25,1), top 1.0s cubic-bezier(0.25,0.1,0.25,1)');
        setPos({ left: crow.targetX, top: crow.targetY });
      });
    });

    // After arriving, grab the heart and escape left
    const escapeTimer = setTimeout(() => {
      setHasHeart(true);
      setTransition('left 1.6s cubic-bezier(0.4,0,0.6,1), top 1.2s ease-in');
      setPos({ left: -150, top: crow.targetY - 60 });
    }, 1700);

    return () => {
      cancelAnimationFrame(approachFrame);
      clearTimeout(escapeTimer);
    };
  }, []);

  return (
    <div className="fixed z-[300] pointer-events-none drop-shadow-2xl"
         style={{ width: '80px', height: '80px', left: pos.left, top: pos.top, transition }}>
      <div className="relative w-full h-full">
        <CrowSprite hasHeart={hasHeart} />
      </div>
    </div>
  );
};

const InstructorSprite = React.memo(() => (
  <svg viewBox="0 0 48 52" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Floor shadow */}
    <path d="M5,51 h20 v1 h-20 z" fill="#000000" opacity="0.2" />
    {/* Pointer */}
    <path d="M46,0 h1 v1 h-1 z M45,1 h2 v1 h-2 z M44,2 h2 v1 h-2 z M43,3 h2 v1 h-2 z M42,4 h2 v1 h-2 z M41,5 h2 v1 h-2 z M40,6 h2 v1 h-2 z M39,7 h2 v1 h-2 z M38,8 h2 v1 h-2 z M37,9 h2 v1 h-2 z M36,10 h2 v1 h-2 z M35,11 h2 v1 h-2 z M34,12 h2 v1 h-2 z M33,13 h2 v1 h-2 z M33,14 h1 v1 h-1 z" fill="#e0c9a6" />
    <path d="M47,0 h1 v1 h-1 z" fill="#e53935" />
    {/* Shaggy hair */}
    <path d="M9,4 h2 v1 h-2 z M13,4 h3 v1 h-3 z M18,4 h2 v1 h-2 z M8,5 h14 v1 h-14 z M7,6 h2 v1 h-2 z M10,6 h6 v1 h-6 z M17,6 h6 v1 h-6 z M6,7 h4 v1 h-4 z M11,7 h7 v1 h-7 z M19,7 h5 v1 h-5 z M6,8 h18 v1 h-18 z M6,9 h2 v1 h-2 z M9,9 h2 v1 h-2 z M19,9 h2 v1 h-2 z M22,9 h2 v1 h-2 z M6,10 h3 v1 h-3 z M21,10 h3 v1 h-3 z M6,11 h1 v1 h-1 z M8,11 h1 v1 h-1 z M21,11 h1 v1 h-1 z M23,11 h1 v1 h-1 z M6,12 h3 v1 h-3 z M21,12 h3 v1 h-3 z M7,13 h2 v2 h-2 z M21,13 h2 v2 h-2 z M8,15 h1 v1 h-1 z M21,15 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M8,9 h1 v1 h-1 z M21,9 h1 v1 h-1 z M9,10 h1 v1 h-1 z M20,10 h1 v1 h-1 z M7,11 h1 v1 h-1 z M22,11 h1 v1 h-1 z M6,13 h1 v2 h-1 z M23,13 h1 v2 h-1 z M7,15 h1 v1 h-1 z M22,15 h1 v1 h-1 z M8,16 h1 v1 h-1 z M21,16 h1 v1 h-1 z" fill="#4e342e" />
    <path d="M9,6 h1 v1 h-1 z M16,6 h1 v1 h-1 z M10,7 h1 v1 h-1 z M18,7 h1 v1 h-1 z" fill="#a1887f" />
    {/* Face & hands */}
    <path d="M11,9 h8 v1 h-8 z M10,10 h10 v1 h-10 z M9,11 h1 v1 h-1 z M13,11 h4 v1 h-4 z M20,11 h1 v1 h-1 z M14,13 h2 v1 h-2 z M9,14 h1 v2 h-1 z M13,14 h1 v1 h-1 z M16,14 h1 v1 h-1 z M20,14 h1 v2 h-1 z M30,14 h3 v2 h-3 z M11,15 h8 v1 h-8 z M9,16 h3 v1 h-3 z M13,16 h4 v1 h-4 z M18,16 h3 v1 h-3 z M9,17 h4 v1 h-4 z M17,17 h4 v1 h-4 z M11,18 h8 v1 h-8 z M5,35 h4 v1 h-4 z M6,36 h3 v1 h-3 z" fill="#ffccaa" />
    <path d="M14,14 h2 v1 h-2 z M10,18 h1 v1 h-1 z M19,18 h1 v1 h-1 z M12,19 h6 v1 h-6 z" fill="#e6a57e" />
    <path d="M10,15 h1 v1 h-1 z M19,15 h1 v1 h-1 z" fill="#ffab91" />
    <path d="M12,16 h1 v1 h-1 z M17,16 h1 v1 h-1 z M13,17 h4 v1 h-4 z" fill="#8e2c2c" />
    {/* Glasses */}
    <path d="M10,11 h3 v1 h-3 z M17,11 h3 v1 h-3 z M9,12 h1 v2 h-1 z M13,12 h4 v1 h-4 z M20,12 h1 v2 h-1 z M13,13 h1 v1 h-1 z M16,13 h1 v1 h-1 z M10,14 h3 v1 h-3 z M17,14 h3 v1 h-3 z" fill="#3e2723" />
    <path d="M10,12 h1 v2 h-1 z M12,12 h1 v2 h-1 z M17,12 h1 v2 h-1 z M19,12 h1 v2 h-1 z" fill="#d6ecf7" />
    <path d="M11,12 h1 v2 h-1 z M18,12 h1 v2 h-1 z" fill="#212121" />
    {/* Tweed jacket */}
    <path d="M28,17 h4 v1 h-4 z M27,18 h1 v1 h-1 z M29,18 h2 v1 h-2 z M26,19 h4 v1 h-4 z M9,20 h3 v1 h-3 z M18,20 h3 v1 h-3 z M25,20 h4 v1 h-4 z M6,21 h5 v1 h-5 z M19,21 h9 v1 h-9 z M5,22 h6 v1 h-6 z M19,22 h7 v1 h-7 z M5,23 h2 v1 h-2 z M8,23 h4 v1 h-4 z M18,23 h6 v1 h-6 z M5,24 h4 v4 h-4 z M10,24 h3 v1 h-3 z M17,24 h4 v1 h-4 z M10,25 h4 v1 h-4 z M16,25 h5 v1 h-5 z M10,26 h2 v1 h-2 z M13,26 h2 v1 h-2 z M16,26 h2 v1 h-2 z M19,26 h2 v1 h-2 z M10,27 h5 v3 h-5 z M16,27 h5 v3 h-5 z M5,28 h1 v1 h-1 z M7,28 h2 v1 h-2 z M5,29 h4 v5 h-4 z M10,30 h2 v1 h-2 z M13,30 h2 v1 h-2 z M16,30 h3 v1 h-3 z M20,30 h1 v1 h-1 z M10,31 h5 v2 h-5 z M16,31 h5 v2 h-5 z" fill="#795548" />
    <path d="M28,18 h1 v1 h-1 z M11,21 h1 v1 h-1 z M18,21 h1 v1 h-1 z M11,22 h2 v1 h-2 z M17,22 h2 v1 h-2 z M12,23 h2 v1 h-2 z M16,23 h2 v1 h-2 z M9,24 h1 v9 h-1 z M13,24 h1 v1 h-1 z M16,24 h1 v1 h-1 z M15,26 h1 v2 h-1 z M15,29 h1 v1 h-1 z M15,31 h1 v2 h-1 z M9,33 h12 v1 h-12 z" fill="#5d4037" />
    <path d="M7,23 h1 v1 h-1 z M12,26 h1 v1 h-1 z M18,26 h1 v1 h-1 z M6,28 h1 v1 h-1 z M12,30 h1 v1 h-1 z M19,30 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M15,28 h1 v1 h-1 z M15,30 h1 v1 h-1 z" fill="#3e2723" />
    {/* Shirt & tie */}
    <path d="M29,16 h3 v1 h-3 z M12,20 h2 v2 h-2 z M16,20 h2 v2 h-2 z M13,22 h1 v1 h-1 z M16,22 h1 v1 h-1 z M5,34 h4 v1 h-4 z" fill="#efe6d5" />
    <path d="M14,20 h2 v5 h-2 z" fill="#2e7d32" />
    <path d="M14,25 h2 v1 h-2 z" fill="#1b5e20" />
    {/* Trousers & shoes */}
    <path d="M9,34 h12 v2 h-12 z M9,36 h5 v12 h-5 z M16,36 h5 v12 h-5 z" fill="#455a64" />
    <path d="M14,36 h2 v2 h-2 z M9,48 h5 v1 h-5 z M16,48 h5 v1 h-5 z" fill="#37474f" />
    <path d="M8,49 h6 v1 h-6 z M16,49 h6 v1 h-6 z M7,50 h7 v1 h-7 z M16,50 h7 v1 h-7 z" fill="#3e2723" />
  </svg>
));

const InstructorPortrait = () => (
  <img src={`${BASE}/Teacher new puppet 300.png`} alt="Instructor" className="w-full h-full object-cover" />
);

const StudentBlondeSprite = React.memo(() => (
  <svg viewBox="0 0 40 26" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hair */}
    <path d="M15,0 h10 v1 h-10 z M13,1 h3 v1 h-3 z M20,1 h7 v1 h-7 z M12,2 h2 v2 h-2 z M17,2 h10 v1 h-10 z M15,3 h12 v1 h-12 z M12,4 h15 v1 h-15 z M12,5 h2 v3 h-2 z M16,5 h2 v1 h-2 z M26,5 h1 v1 h-1 z M26,7 h1 v2 h-1 z M13,8 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M27,2 h1 v4 h-1 z M14,5 h2 v1 h-2 z M18,5 h1 v1 h-1 z M24,5 h2 v1 h-2 z M14,6 h1 v1 h-1 z M26,6 h2 v1 h-2 z M27,7 h1 v2 h-1 z M12,8 h1 v1 h-1 z M13,9 h1 v1 h-1 z M26,9 h1 v1 h-1 z" fill="#fbc02d" />
    <path d="M16,1 h4 v1 h-4 z M14,2 h3 v1 h-3 z M14,3 h1 v1 h-1 z" fill="#fff59d" />
    {/* Face & arms */}
    <path d="M19,5 h5 v1 h-5 z M15,6 h11 v1 h-11 z M14,7 h2 v2 h-2 z M18,7 h4 v2 h-4 z M24,7 h2 v2 h-2 z M14,9 h1 v1 h-1 z M16,9 h8 v1 h-8 z M25,9 h1 v1 h-1 z M14,10 h5 v1 h-5 z M21,10 h5 v1 h-5 z M16,11 h8 v1 h-8 z M10,19 h3 v2 h-3 z M27,19 h3 v2 h-3 z M10,21 h2 v2 h-2 z M28,21 h2 v2 h-2 z M10,23 h3 v1 h-3 z M27,23 h3 v1 h-3 z M11,24 h3 v1 h-3 z M26,24 h3 v1 h-3 z M12,25 h2 v1 h-2 z M26,25 h2 v1 h-2 z" fill="#ffccaa" />
    <path d="M15,11 h1 v1 h-1 z M24,11 h1 v1 h-1 z M17,12 h6 v1 h-6 z M18,13 h4 v1 h-4 z M20,14 h1 v1 h-1 z M12,21 h1 v2 h-1 z M27,21 h1 v2 h-1 z M11,25 h1 v1 h-1 z M28,25 h1 v1 h-1 z" fill="#eeb38f" />
    <path d="M15,9 h1 v1 h-1 z M24,9 h1 v1 h-1 z" fill="#ffab91" />
    <path d="M19,10 h2 v1 h-2 z" fill="#c2705a" />
    {/* Eyes */}
    <path d="M16,7 h1 v1 h-1 z M22,7 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M17,7 h1 v1 h-1 z M23,7 h1 v1 h-1 z M16,8 h2 v1 h-2 z M22,8 h2 v1 h-2 z" fill="#3e2723" />
    {/* T-shirt */}
    <path d="M14,13 h2 v1 h-2 z M24,13 h2 v1 h-2 z M12,14 h6 v1 h-6 z M23,14 h5 v1 h-5 z M11,15 h18 v1 h-18 z M10,16 h20 v1 h-20 z M10,17 h3 v1 h-3 z M14,17 h12 v1 h-12 z M27,17 h3 v1 h-3 z M13,18 h14 v1 h-14 z M14,19 h12 v3 h-12 z" fill="#4caf50" />
    <path d="M13,17 h1 v1 h-1 z M26,17 h1 v1 h-1 z M10,18 h3 v1 h-3 z M27,18 h3 v1 h-3 z M13,19 h1 v3 h-1 z M26,19 h1 v3 h-1 z" fill="#388e3c" />
    <path d="M16,13 h2 v1 h-2 z M22,13 h2 v1 h-2 z M18,14 h2 v1 h-2 z M21,14 h2 v1 h-2 z" fill="#81c784" />
  </svg>
));

const StudentBrownHairSprite = React.memo(() => (
  <svg viewBox="0 0 40 26" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Long hair */}
    <path d="M15,0 h10 v1 h-10 z M13,1 h4 v1 h-4 z M20,1 h7 v1 h-7 z M12,2 h3 v1 h-3 z M17,2 h11 v1 h-11 z M12,3 h16 v1 h-16 z M12,4 h8 v1 h-8 z M21,4 h7 v1 h-7 z M12,5 h5 v1 h-5 z M23,5 h5 v1 h-5 z M12,6 h3 v1 h-3 z M25,6 h3 v1 h-3 z M12,7 h2 v4 h-2 z M26,7 h2 v4 h-2 z M12,11 h3 v1 h-3 z M25,11 h3 v1 h-3 z M11,12 h5 v1 h-5 z M24,12 h5 v1 h-5 z M10,13 h6 v1 h-6 z M24,13 h6 v1 h-6 z M10,14 h5 v1 h-5 z M25,14 h5 v1 h-5 z M10,15 h4 v1 h-4 z M26,15 h4 v1 h-4 z M10,16 h3 v1 h-3 z M27,16 h3 v1 h-3 z M11,17 h2 v1 h-2 z M27,17 h2 v1 h-2 z M12,18 h1 v1 h-1 z M27,18 h1 v1 h-1 z M13,19 h1 v1 h-1 z M26,19 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M20,4 h1 v1 h-1 z M17,5 h1 v1 h-1 z M22,5 h1 v1 h-1 z M15,6 h1 v1 h-1 z M24,6 h1 v1 h-1 z M14,7 h1 v4 h-1 z M25,7 h1 v4 h-1 z M15,11 h1 v1 h-1 z M24,11 h1 v1 h-1 z M16,12 h1 v1 h-1 z M23,12 h1 v1 h-1 z M14,15 h1 v1 h-1 z M25,15 h1 v1 h-1 z M13,16 h1 v3 h-1 z M26,16 h1 v3 h-1 z M12,19 h1 v1 h-1 z M27,19 h1 v1 h-1 z M13,20 h1 v1 h-1 z M26,20 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M17,1 h3 v1 h-3 z M15,2 h2 v1 h-2 z" fill="#8d6e63" />
    {/* Face & hands */}
    <path d="M18,5 h4 v1 h-4 z M16,6 h8 v1 h-8 z M15,7 h1 v2 h-1 z M18,7 h4 v2 h-4 z M24,7 h1 v2 h-1 z M16,9 h8 v1 h-8 z M15,10 h4 v1 h-4 z M21,10 h4 v1 h-4 z M16,11 h8 v1 h-8 z M11,24 h3 v1 h-3 z M26,24 h3 v1 h-3 z M12,25 h2 v1 h-2 z M26,25 h2 v1 h-2 z" fill="#ffb74d" />
    <path d="M17,12 h6 v1 h-6 z M18,13 h4 v1 h-4 z M11,25 h1 v1 h-1 z M28,25 h1 v1 h-1 z" fill="#f09a3a" />
    <path d="M15,9 h1 v1 h-1 z M24,9 h1 v1 h-1 z" fill="#ff8a65" />
    <path d="M19,10 h2 v1 h-2 z" fill="#b5533c" />
    {/* Eyes */}
    <path d="M16,7 h1 v1 h-1 z M22,7 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M17,7 h1 v1 h-1 z M23,7 h1 v1 h-1 z M16,8 h2 v1 h-2 z M22,8 h2 v1 h-2 z" fill="#4e342e" />
    {/* Sweater */}
    <path d="M16,13 h1 v1 h-1 z M23,13 h1 v1 h-1 z M15,14 h3 v1 h-3 z M22,14 h3 v1 h-3 z M15,15 h10 v1 h-10 z M14,16 h12 v3 h-12 z M10,18 h1 v1 h-1 z M29,18 h1 v1 h-1 z M10,19 h2 v2 h-2 z M15,19 h10 v2 h-10 z M28,19 h2 v2 h-2 z M10,21 h3 v1 h-3 z M14,21 h12 v1 h-12 z M27,21 h3 v1 h-3 z M11,22 h3 v1 h-3 z M26,22 h3 v1 h-3 z" fill="#ab47bc" />
    <path d="M10,17 h1 v1 h-1 z M29,17 h1 v1 h-1 z M11,18 h1 v1 h-1 z M28,18 h1 v1 h-1 z M14,19 h1 v2 h-1 z M25,19 h1 v2 h-1 z M12,20 h1 v1 h-1 z M27,20 h1 v1 h-1 z M13,21 h1 v1 h-1 z M26,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M29,22 h1 v1 h-1 z" fill="#8e24aa" />
    <path d="M17,13 h1 v1 h-1 z M22,13 h1 v1 h-1 z M18,14 h4 v1 h-4 z M11,23 h3 v1 h-3 z M26,23 h3 v1 h-3 z" fill="#ce93d8" />
  </svg>
));

const StudentPonytailSprite = React.memo(() => (
  <svg viewBox="0 0 40 26" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hair & ponytail */}
    <path d="M15,0 h10 v1 h-10 z M13,1 h3 v1 h-3 z M20,1 h7 v1 h-7 z M12,2 h2 v2 h-2 z M17,2 h11 v1 h-11 z M15,3 h13 v1 h-13 z M30,3 h2 v1 h-2 z M12,4 h16 v1 h-16 z M29,4 h1 v1 h-1 z M31,4 h2 v1 h-2 z M12,5 h3 v1 h-3 z M16,5 h3 v1 h-3 z M20,5 h3 v1 h-3 z M24,5 h4 v1 h-4 z M30,5 h1 v1 h-1 z M32,5 h2 v1 h-2 z M12,6 h2 v2 h-2 z M26,6 h2 v2 h-2 z M31,6 h1 v2 h-1 z M33,6 h1 v2 h-1 z M13,8 h1 v2 h-1 z M26,8 h1 v2 h-1 z M31,8 h3 v2 h-3 z M32,10 h2 v1 h-2 z M32,11 h1 v1 h-1 z" fill="#212121" />
    <path d="M12,8 h1 v1 h-1 z M27,8 h1 v1 h-1 z M33,11 h1 v2 h-1 z" fill="#000000" />
    <path d="M16,1 h4 v1 h-4 z M14,2 h3 v1 h-3 z M14,3 h1 v1 h-1 z M30,4 h1 v1 h-1 z M15,5 h1 v1 h-1 z M19,5 h1 v1 h-1 z M23,5 h1 v1 h-1 z M31,5 h1 v1 h-1 z M32,6 h1 v2 h-1 z" fill="#455a64" />
    {/* Scrunchie */}
    <path d="M28,2 h2 v1 h-2 z M29,3 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M28,3 h1 v1 h-1 z" fill="#f9a825" />
    {/* Face & hands */}
    <path d="M14,6 h2 v3 h-2 z M18,6 h4 v3 h-4 z M24,6 h2 v3 h-2 z M14,9 h1 v1 h-1 z M16,9 h8 v1 h-8 z M25,9 h1 v1 h-1 z M14,10 h5 v1 h-5 z M21,10 h5 v1 h-5 z M16,11 h8 v1 h-8 z M11,24 h3 v1 h-3 z M26,24 h3 v1 h-3 z M12,25 h2 v1 h-2 z M26,25 h2 v1 h-2 z" fill="#ffe0b2" />
    <path d="M15,11 h1 v1 h-1 z M24,11 h1 v1 h-1 z M17,12 h6 v1 h-6 z M18,13 h4 v1 h-4 z M20,14 h1 v1 h-1 z M11,25 h1 v1 h-1 z M28,25 h1 v1 h-1 z" fill="#f0c48a" />
    <path d="M15,9 h1 v1 h-1 z M24,9 h1 v1 h-1 z" fill="#ffab91" />
    <path d="M19,10 h2 v1 h-2 z" fill="#d2706a" />
    {/* Eyes */}
    <path d="M16,6 h2 v1 h-2 z M22,6 h2 v1 h-2 z" fill="#ffffff" />
    <path d="M16,7 h1 v1 h-1 z M23,7 h1 v1 h-1 z M16,8 h2 v1 h-2 z M22,8 h2 v1 h-2 z" fill="#81d4fa" />
    <path d="M17,7 h1 v1 h-1 z M22,7 h1 v1 h-1 z" fill="#01579b" />
    {/* Sweater */}
    <path d="M14,13 h2 v1 h-2 z M24,13 h2 v1 h-2 z M12,14 h6 v1 h-6 z M23,14 h5 v1 h-5 z M11,15 h18 v1 h-18 z M10,16 h20 v1 h-20 z M10,17 h3 v5 h-3 z M14,17 h12 v5 h-12 z M27,17 h3 v5 h-3 z M11,22 h3 v1 h-3 z M26,22 h3 v1 h-3 z" fill="#ff4081" />
    <path d="M13,17 h1 v5 h-1 z M26,17 h1 v5 h-1 z M10,22 h1 v1 h-1 z M29,22 h1 v1 h-1 z" fill="#d81b60" />
    <path d="M16,13 h2 v1 h-2 z M22,13 h2 v1 h-2 z M18,14 h2 v1 h-2 z M21,14 h2 v1 h-2 z M11,23 h3 v1 h-3 z M26,23 h3 v1 h-3 z" fill="#ff80ab" />
  </svg>
));

const SeatedFarmerSprite = React.memo(({ eyes = 'open' }) => (
  <svg viewBox="0 0 40 38" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hat & flower */}
    <path d="M15,0 h10 v1 h-10 z M14,1 h1 v1 h-1 z M17,1 h9 v1 h-9 z M13,2 h1 v2 h-1 z M16,2 h11 v1 h-11 z M15,3 h1 v1 h-1 z M17,3 h10 v1 h-10 z M8,6 h24 v1 h-24 z M9,7 h24 v1 h-24 z" fill="#f48fb1" />
    <path d="M15,1 h2 v1 h-2 z M14,2 h2 v1 h-2 z M14,3 h1 v1 h-1 z M7,7 h2 v1 h-2 z" fill="#f8bbd0" />
    <path d="M8,8 h24 v1 h-24 z" fill="#ec407a" />
    <path d="M13,4 h2 v1 h-2 z M18,4 h9 v1 h-9 z M13,5 h3 v1 h-3 z M17,5 h10 v1 h-10 z" fill="#d81b60" />
    <path d="M16,3 h1 v1 h-1 z M15,4 h1 v1 h-1 z M17,4 h1 v1 h-1 z M16,5 h1 v1 h-1 z" fill="#ff4081" />
    <path d="M16,4 h1 v1 h-1 z" fill="#fdd835" />
    {/* Hair & braids */}
    <path d="M13,9 h14 v1 h-14 z M13,10 h2 v1 h-2 z M17,10 h1 v1 h-1 z M22,10 h1 v1 h-1 z M25,10 h2 v1 h-2 z M13,11 h1 v4 h-1 z M26,11 h1 v4 h-1 z M12,15 h1 v1 h-1 z M14,15 h1 v1 h-1 z M25,15 h1 v1 h-1 z M27,15 h1 v1 h-1 z M13,16 h1 v2 h-1 z M26,16 h1 v2 h-1 z M15,17 h1 v1 h-1 z M24,17 h1 v1 h-1 z M14,18 h1 v1 h-1 z M25,18 h1 v1 h-1 z M13,19 h1 v1 h-1 z M15,19 h1 v1 h-1 z M24,19 h1 v1 h-1 z M26,19 h1 v1 h-1 z M14,20 h1 v1 h-1 z M25,20 h1 v1 h-1 z M13,21 h1 v1 h-1 z M15,21 h1 v1 h-1 z M24,21 h1 v1 h-1 z M26,21 h1 v1 h-1 z M14,22 h1 v1 h-1 z M25,22 h1 v1 h-1 z M14,24 h1 v2 h-1 z M25,24 h1 v2 h-1 z" fill="#d84315" />
    <path d="M12,9 h1 v6 h-1 z M27,9 h1 v6 h-1 z M14,14 h1 v1 h-1 z M25,14 h1 v1 h-1 z M13,15 h1 v1 h-1 z M26,15 h1 v1 h-1 z M12,16 h1 v1 h-1 z M14,16 h1 v2 h-1 z M25,16 h1 v2 h-1 z M27,16 h1 v1 h-1 z M13,18 h1 v1 h-1 z M15,18 h1 v1 h-1 z M24,18 h1 v1 h-1 z M26,18 h1 v1 h-1 z M14,19 h1 v1 h-1 z M25,19 h1 v1 h-1 z M13,20 h1 v1 h-1 z M15,20 h1 v1 h-1 z M24,20 h1 v1 h-1 z M26,20 h1 v1 h-1 z M14,21 h1 v1 h-1 z M25,21 h1 v1 h-1 z M13,22 h1 v1 h-1 z M15,22 h1 v1 h-1 z M24,22 h1 v1 h-1 z M26,22 h1 v1 h-1 z M13,24 h1 v1 h-1 z M15,24 h1 v1 h-1 z M24,24 h1 v1 h-1 z M26,24 h1 v1 h-1 z" fill="#bf360c" />
    <path d="M13,23 h3 v1 h-3 z M24,23 h3 v1 h-3 z" fill="#4caf50" />
    {/* Face */}
    <path d="M15,10 h2 v1 h-2 z M18,10 h4 v1 h-4 z M23,10 h2 v1 h-2 z M14,11 h12 v2 h-12 z M14,13 h1 v1 h-1 z M16,13 h8 v1 h-8 z M25,13 h1 v1 h-1 z M15,14 h4 v1 h-4 z M21,14 h4 v1 h-4 z M16,15 h8 v1 h-8 z" fill="#ffccaa" />
    <path d="M18,16 h4 v2 h-4 z" fill="#eeb38f" />
    <path d="M15,13 h1 v1 h-1 z M24,13 h1 v1 h-1 z" fill="#ff8a80" />
    <path d="M19,14 h2 v1 h-2 z" fill="#c2705a" />
    {/* Shirt & overalls */}
    <path d="M11,17 h2 v8 h-2 z M17,17 h1 v1 h-1 z M22,17 h1 v1 h-1 z M27,17 h2 v8 h-2 z M11,25 h3 v1 h-3 z M15,25 h1 v1 h-1 z M24,25 h1 v1 h-1 z M26,25 h3 v1 h-3 z M11,26 h5 v12 h-5 z M24,26 h5 v12 h-5 z" fill="#e53935" />
    <path d="M17,18 h6 v2 h-6 z M16,20 h8 v1 h-8 z M16,21 h2 v3 h-2 z M22,21 h2 v3 h-2 z M19,22 h2 v1 h-2 z M16,24 h8 v14 h-8 z" fill="#1e88e5" />
    <path d="M16,17 h1 v2 h-1 z M23,17 h1 v2 h-1 z M18,21 h4 v1 h-4 z M18,22 h1 v1 h-1 z M21,22 h1 v1 h-1 z M18,23 h4 v1 h-4 z" fill="#1565c0" />
    <path d="M16,19 h1 v1 h-1 z M23,19 h1 v1 h-1 z" fill="#fdd835" />
    {/* Eyes droop as she dozes off */}
    {eyes === 'open' && <>
      <path d="M16,11 h1 v1 h-1 z M22,11 h1 v1 h-1 z" fill="#ffffff" />
      <path d="M17,11 h1 v1 h-1 z M16,12 h2 v1 h-2 z M23,11 h1 v1 h-1 z M22,12 h2 v1 h-2 z" fill="#3e2723" />
    </>}
    {eyes === 'heavy' && <>
      <path d="M16,11 h2 v1 h-2 z M22,11 h2 v1 h-2 z" fill="#eeb38f" />
      <path d="M16,12 h2 v1 h-2 z M22,12 h2 v1 h-2 z" fill="#3e2723" />
    </>}
    {eyes === 'closed' && <path d="M15,12 h3 v1 h-3 z M22,12 h3 v1 h-3 z" fill="#3e2723" />}
  </svg>
));

const ClassDeskSprite = React.memo(({ paper = "#ffffff" }) => (
  <svg viewBox="0 0 40 18" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Floor shadow */}
    <path d="M3,14 h34 v4 h-34 z M0,17 h1 v1 h-1 z M39,17 h1 v1 h-1 z" fill="#000000" opacity="0.25" />
    {/* Desk top */}
    <path d="M1,0 h38 v1 h-38 z M0,1 h14 v4 h-14 z M25,1 h15 v1 h-15 z M25,2 h6 v1 h-6 z M36,2 h4 v1 h-4 z M25,3 h5 v1 h-5 z M32,3 h8 v1 h-8 z M25,4 h15 v1 h-15 z" fill="#795548" />
    <path d="M0,5 h40 v1 h-40 z" fill="#6d4c41" />
    {/* Notebook */}
    <path d="M15,1 h10 v1 h-10 z M15,2 h1 v1 h-1 z M23,2 h2 v1 h-2 z M15,3 h10 v1 h-10 z M15,4 h1 v1 h-1 z M23,4 h2 v1 h-2 z" fill={paper} />
    <path d="M16,2 h7 v1 h-7 z M16,4 h7 v1 h-7 z" fill="#b0bec5" />
    <path d="M14,1 h1 v4 h-1 z" fill="#78909c" />
    {/* Pencil */}
    <path d="M31,2 h4 v1 h-4 z M31,3 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M35,2 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M30,3 h1 v1 h-1 z" fill="#3e2723" />
    {/* Front panel & legs */}
    <path d="M0,6 h40 v1 h-40 z" fill="#a1887f" />
    <path d="M0,7 h40 v1 h-40 z M2,9 h36 v1 h-36 z M2,10 h1 v2 h-1 z M37,10 h1 v2 h-1 z M2,12 h36 v1 h-36 z M1,14 h2 v4 h-2 z M37,14 h2 v4 h-2 z" fill="#3e2723" />
    <path d="M1,8 h38 v1 h-38 z M1,9 h1 v4 h-1 z M38,9 h1 v4 h-1 z M1,13 h38 v1 h-38 z" fill="#4e342e" />
    <path d="M3,10 h34 v2 h-34 z" fill="#5d4037" />
  </svg>
));

const ClassroomBackdropSprite = React.memo(() => (
  <svg viewBox="0 0 242 167" className="w-full h-full" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
    {/* Wall */}
    <path d="M0,0 h242 v97 h-242 z" fill="#d7ccc8" />
    <path d="M0,0 h242 v3 h-242 z" fill="#bcaaa4" />
    <path d="M0,3 h242 v1 h-242 z" fill="#a1887f" />
    <path d="M0,4 h242 v1 h-242 z" fill="#e4dbd7" />
    <path d="M0,72 h242 v21 h-242 z" fill="#cbbeb8" />
    <path d="M0,72 h242 v1 h-242 z" fill="#efe7e3" />
    <path d="M0,73 h242 v1 h-242 z" fill="#a1887f" />
    <path d="M9,75 h1 v17 h-1 z M25,75 h1 v17 h-1 z M41,75 h1 v17 h-1 z M57,75 h1 v17 h-1 z M73,75 h1 v17 h-1 z M89,75 h1 v17 h-1 z M105,75 h1 v17 h-1 z M121,75 h1 v17 h-1 z M137,75 h1 v17 h-1 z M153,75 h1 v17 h-1 z M169,75 h1 v17 h-1 z M185,75 h1 v17 h-1 z M201,75 h1 v17 h-1 z M217,75 h1 v17 h-1 z M233,75 h1 v17 h-1 z" fill="#b9aaa3" />
    <path d="M0,93 h242 v4 h-242 z" fill="#6d4c41" />
    <path d="M0,93 h242 v1 h-242 z" fill="#8d6e63" />
    <path d="M0,96 h242 v1 h-242 z" fill="#4e342e" />
    {/* Floor */}
    <path d="M0,97 h242 v70 h-242 z" fill="#8d6e63" />
    <path d="M0,97 h242 v2 h-242 z M0,108 h242 v1 h-242 z M0,118 h242 v1 h-242 z M0,128 h242 v1 h-242 z M0,138 h242 v1 h-242 z M0,148 h242 v1 h-242 z M0,158 h242 v1 h-242 z M22,99 h1 v9 h-1 z M102,99 h1 v9 h-1 z M182,99 h1 v9 h-1 z M62,109 h1 v9 h-1 z M142,109 h1 v9 h-1 z M222,109 h1 v9 h-1 z M22,119 h1 v9 h-1 z M102,119 h1 v9 h-1 z M182,119 h1 v9 h-1 z M62,129 h1 v9 h-1 z M142,129 h1 v9 h-1 z M222,129 h1 v9 h-1 z M22,139 h1 v9 h-1 z M102,139 h1 v9 h-1 z M182,139 h1 v9 h-1 z M62,149 h1 v9 h-1 z M142,149 h1 v9 h-1 z M222,149 h1 v9 h-1 z M22,159 h1 v8 h-1 z M102,159 h1 v8 h-1 z M182,159 h1 v8 h-1 z" fill="#7b5e54" />
    <path d="M8,103 h7 v1 h-7 z M48,113 h9 v1 h-9 z M96,102 h6 v1 h-6 z M150,104 h8 v1 h-8 z M206,112 h7 v1 h-7 z M30,124 h8 v1 h-8 z M120,123 h6 v1 h-6 z M184,133 h9 v1 h-9 z M70,143 h7 v1 h-7 z M226,144 h6 v1 h-6 z M14,153 h8 v1 h-8 z M140,154 h7 v1 h-7 z M100,163 h9 v1 h-9 z M196,162 h6 v1 h-6 z" fill="#997a6e" />
    {/* Window */}
    <path d="M5,12 h31 v47 h-31 z" fill="#f5efe6" />
    <path d="M7,14 h27 v14 h-27 z" fill="#90caf9" />
    <path d="M7,28 h27 v14 h-27 z" fill="#bbdefb" />
    <path d="M7,42 h27 v9 h-27 z" fill="#e3f2fd" />
    <path d="M11,46 h3 v1 h-3 z M24,46 h2 v1 h-2 z M10,47 h2 v1 h-2 z M13,47 h2 v1 h-2 z M22,47 h2 v1 h-2 z M26,47 h1 v1 h-1 z M31,47 h2 v1 h-2 z M9,48 h2 v1 h-2 z M14,48 h2 v1 h-2 z M21,48 h1 v1 h-1 z M26,48 h2 v1 h-2 z M30,48 h1 v1 h-1 z M33,48 h1 v1 h-1 z M8,49 h2 v1 h-2 z M15,49 h3 v1 h-3 z M20,49 h2 v1 h-2 z M27,49 h4 v1 h-4 z M7,50 h3 v1 h-3 z M16,50 h5 v1 h-5 z M29,50 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M12,47 h1 v1 h-1 z M24,47 h2 v1 h-2 z M11,48 h3 v1 h-3 z M22,48 h4 v1 h-4 z M31,48 h2 v1 h-2 z M10,49 h5 v1 h-5 z M22,49 h5 v1 h-5 z M31,49 h3 v1 h-3 z M10,50 h6 v1 h-6 z M21,50 h8 v1 h-8 z M30,50 h4 v1 h-4 z" fill="#43a047" />
    <path d="M7,51 h27 v6 h-27 z" fill="#81c784" />
    <path d="M11,18 h3 v1 h-3 z M10,19 h5 v1 h-5 z M16,19 h1 v1 h-1 z M9,20 h9 v1 h-9 z M10,21 h7 v1 h-7 z M26,30 h3 v1 h-3 z M25,31 h5 v1 h-5 z" fill="#ffffff" />
    <path d="M13,23 h1 v1 h-1 z M12,24 h1 v1 h-1 z M11,25 h1 v1 h-1 z M10,26 h1 v1 h-1 z M9,27 h1 v1 h-1 z M30,38 h1 v1 h-1 z M29,39 h1 v1 h-1 z M28,40 h1 v1 h-1 z M27,41 h1 v1 h-1 z" fill="#ffffff" opacity="0.55" />
    <path d="M20,14 h1 v43 h-1 z M7,35 h27 v1 h-27 z M3,59 h35 v2 h-35 z" fill="#f5efe6" />
    <path d="M35,12 h1 v47 h-1 z M33,14 h1 v43 h-1 z M7,56 h27 v1 h-27 z" fill="#cfc4bd" />
    <path d="M12,51 h1 v1 h-1 z M14,51 h1 v1 h-1 z M11,52 h2 v1 h-2 z M14,52 h2 v1 h-2 z M12,53 h3 v1 h-3 z M13,54 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M10,55 h7 v1 h-7 z M24,55 h7 v1 h-7 z" fill="#d9825b" />
    <path d="M11,56 h5 v2 h-5 z M25,56 h5 v2 h-5 z" fill="#c2693f" />
    <path d="M12,58 h3 v1 h-3 z M26,58 h3 v1 h-3 z" fill="#a85a36" />
    <path d="M27,49 h1 v3 h-1 z M25,50 h1 v2 h-1 z M30,51 h1 v2 h-1 z M25,52 h3 v1 h-3 z M27,53 h1 v2 h-1 z M29,53 h2 v1 h-2 z" fill="#66bb6a" />
    <path d="M28,50 h1 v5 h-1 z" fill="#388e3c" />
    <path d="M3,61 h35 v1 h-35 z" fill="#bcaaa4" />
    <path d="M4,62 h33 v1 h-33 z" fill="#c5b8b2" />
    {/* Chalkboard */}
    <path d="M58,10 h134 v54 h-134 z M56,65 h138 v2 h-138 z" fill="#5d4037" />
    <path d="M58,10 h134 v1 h-134 z M58,10 h1 v54 h-1 z" fill="#795548" />
    <path d="M58,63 h134 v1 h-134 z M191,10 h1 v54 h-1 z" fill="#3e2723" />
    <path d="M61,13 h128 v48 h-128 z" fill="#1b5e20" />
    <path d="M61,13 h128 v1 h-128 z M61,13 h1 v48 h-1 z" fill="#174f1b" />
    <path d="M56,64 h138 v1 h-138 z M168,62 h8 v1 h-8 z" fill="#a1887f" />
    <path d="M57,67 h136 v1 h-136 z" fill="#c5b8b2" />
    <path d="M96,63 h5 v1 h-5 z" fill="#ffffff" />
    <path d="M104,63 h4 v1 h-4 z" fill="#fff59d" />
    <path d="M111,63 h3 v1 h-3 z" fill="#f8bbd0" />
    <path d="M168,63 h8 v1 h-8 z" fill="#424242" />
    {/* Chalk: COMPOST = greens + browns + water + air */}
    <path d="M75,17 h3 v1 h-3 z M81,17 h3 v1 h-3 z M86,17 h1 v1 h-1 z M90,17 h1 v1 h-1 z M92,17 h4 v1 h-4 z M99,17 h3 v1 h-3 z M105,17 h4 v1 h-4 z M110,17 h5 v1 h-5 z M74,18 h1 v5 h-1 z M78,18 h1 v1 h-1 z M80,18 h1 v5 h-1 z M84,18 h1 v5 h-1 z M86,18 h2 v1 h-2 z M89,18 h2 v1 h-2 z M92,18 h1 v2 h-1 z M96,18 h1 v2 h-1 z M98,18 h1 v5 h-1 z M102,18 h1 v5 h-1 z M104,18 h1 v2 h-1 z M112,18 h1 v6 h-1 z M86,19 h1 v5 h-1 z M88,19 h1 v2 h-1 z M90,19 h1 v5 h-1 z M92,20 h4 v1 h-4 z M105,20 h3 v1 h-3 z M92,21 h1 v3 h-1 z M108,21 h1 v2 h-1 z M78,22 h1 v1 h-1 z M75,23 h3 v1 h-3 z M81,23 h3 v1 h-3 z M99,23 h3 v1 h-3 z M104,23 h4 v1 h-4 z M119,19 h5 v1 h-5 z M119,22 h5 v1 h-5 z" fill="#f5f5f5" />
    <path d="M132,17 h2 v1 h-2 z M130,18 h4 v1 h-4 z M129,19 h5 v1 h-5 z M129,20 h4 v1 h-4 z M128,21 h4 v1 h-4 z M129,22 h2 v1 h-2 z M128,23 h1 v1 h-1 z" fill="#a5d6a7" />
    <path d="M138,19 h1 v1 h-1 z M137,20 h3 v1 h-3 z M138,21 h1 v1 h-1 z M152,19 h1 v1 h-1 z M151,20 h3 v1 h-3 z M152,21 h1 v1 h-1 z M166,19 h1 v1 h-1 z M165,20 h3 v1 h-3 z M166,21 h1 v1 h-1 z M173,17 h2 v1 h-2 z M175,18 h1 v1 h-1 z M170,19 h5 v1 h-5 z M170,21 h6 v1 h-6 z M176,22 h1 v1 h-1 z M174,23 h2 v1 h-2 z" fill="#f5f5f5" />
    <path d="M146,17 h2 v1 h-2 z M144,18 h4 v1 h-4 z M143,19 h5 v1 h-5 z M143,20 h4 v1 h-4 z M142,21 h4 v1 h-4 z M143,22 h2 v1 h-2 z M142,23 h1 v1 h-1 z" fill="#e6a15c" />
    <path d="M159,17 h1 v2 h-1 z M158,19 h3 v1 h-3 z M157,20 h5 v3 h-5 z M158,23 h3 v1 h-3 z" fill="#90caf9" />
    <path d="M74,27 h101 v1 h-101 z" fill="#f5f5f5" opacity="0.5" />
    {/* Chalk: soil layers diagram */}
    <path d="M84,31 h1 v1 h-1 z M86,31 h1 v1 h-1 z M85,32 h1 v2 h-1 z" fill="#a5d6a7" />
    <path d="M73,34 h26 v4 h-26 z" fill="#6d4c41" />
    <path d="M73,38 h26 v6 h-26 z" fill="#a1887f" />
    <path d="M73,44 h26 v6 h-26 z" fill="#e6a15c" />
    <path d="M73,50 h26 v7 h-26 z" fill="#bdbdbd" />
    <path d="M85,34 h1 v6 h-1 z M83,37 h2 v1 h-2 z M86,38 h2 v1 h-2 z" fill="#f5f5f5" opacity="0.7" />
    <path d="M91,39 h2 v1 h-2 z M90,40 h1 v1 h-1 z M93,40 h1 v1 h-1 z M95,40 h1 v1 h-1 z M94,41 h1 v1 h-1 z" fill="#f8bbd0" />
    <path d="M77,52 h2 v1 h-2 z M83,52 h2 v1 h-2 z M90,52 h1 v1 h-1 z M76,53 h3 v1 h-3 z M82,53 h3 v1 h-3 z M87,53 h1 v2 h-1 z M89,53 h3 v1 h-3 z M77,54 h1 v1 h-1 z M90,54 h1 v1 h-1 z" fill="#757575" />
    <path d="M72,33 h28 v1 h-28 z M72,57 h28 v1 h-28 z M72,33 h1 v25 h-1 z M99,33 h1 v25 h-1 z M68,33 h1 v1 h-1 z M67,34 h1 v3 h-1 z M69,34 h1 v3 h-1 z M68,37 h1 v1 h-1 z M68,39 h1 v1 h-1 z M67,40 h1 v1 h-1 z M69,40 h1 v1 h-1 z M67,41 h3 v1 h-3 z M67,42 h1 v2 h-1 z M69,42 h1 v2 h-1 z M67,45 h2 v1 h-2 z M67,46 h1 v1 h-1 z M69,46 h1 v1 h-1 z M67,47 h2 v1 h-2 z M67,48 h1 v1 h-1 z M69,48 h1 v1 h-1 z M67,49 h2 v1 h-2 z M68,52 h2 v1 h-2 z M67,53 h1 v3 h-1 z M68,56 h2 v1 h-2 z" fill="#f5f5f5" />
    <path d="M105,34 h2 v1 h-2 z M109,34 h1 v1 h-1 z M112,34 h3 v1 h-3 z M116,34 h1 v4 h-1 z M104,35 h1 v1 h-1 z M108,35 h1 v3 h-1 z M110,35 h1 v3 h-1 z M113,35 h1 v3 h-1 z M105,36 h1 v1 h-1 z M106,37 h1 v1 h-1 z M104,38 h2 v1 h-2 z M109,38 h1 v1 h-1 z M112,38 h3 v1 h-3 z M116,38 h3 v1 h-3 z M104,41 h1 v4 h-1 z M109,41 h1 v1 h-1 z M112,41 h1 v2 h-1 z M114,41 h1 v2 h-1 z M116,41 h3 v1 h-3 z M120,41 h2 v1 h-2 z M125,41 h2 v1 h-2 z M108,42 h1 v1 h-1 z M110,42 h1 v1 h-1 z M116,42 h1 v1 h-1 z M120,42 h1 v1 h-1 z M122,42 h1 v1 h-1 z M124,42 h1 v1 h-1 z M108,43 h3 v1 h-3 z M113,43 h1 v3 h-1 z M116,43 h2 v1 h-2 z M120,43 h2 v1 h-2 z M125,43 h1 v1 h-1 z M108,44 h1 v2 h-1 z M110,44 h1 v2 h-1 z M116,44 h1 v1 h-1 z M120,44 h1 v2 h-1 z M122,44 h1 v2 h-1 z M126,44 h1 v1 h-1 z M104,45 h3 v1 h-3 z M116,45 h3 v1 h-3 z M124,45 h2 v1 h-2 z" fill="#fff59d" />
    {/* Chalk: ingredient list */}
    <path d="M138,33 h2 v2 h-2 z M144,32 h2 v1 h-2 z M147,32 h2 v1 h-2 z M151,32 h3 v1 h-3 z M155,32 h3 v1 h-3 z M159,32 h2 v1 h-2 z M164,32 h2 v1 h-2 z M143,33 h1 v3 h-1 z M147,33 h1 v1 h-1 z M149,33 h1 v1 h-1 z M151,33 h1 v1 h-1 z M155,33 h1 v1 h-1 z M159,33 h1 v4 h-1 z M161,33 h1 v4 h-1 z M163,33 h1 v1 h-1 z M145,34 h1 v2 h-1 z M147,34 h2 v1 h-2 z M151,34 h2 v1 h-2 z M155,34 h2 v1 h-2 z M164,34 h1 v1 h-1 z M147,35 h1 v2 h-1 z M149,35 h1 v2 h-1 z M151,35 h1 v1 h-1 z M155,35 h1 v1 h-1 z M165,35 h1 v1 h-1 z M144,36 h2 v1 h-2 z M151,36 h3 v1 h-3 z M155,36 h3 v1 h-3 z M163,36 h2 v1 h-2 z" fill="#a5d6a7" />
    <path d="M138,40 h2 v2 h-2 z M143,39 h2 v1 h-2 z M147,39 h2 v1 h-2 z M152,39 h1 v1 h-1 z M155,39 h1 v2 h-1 z M157,39 h1 v2 h-1 z M159,39 h2 v1 h-2 z M164,39 h2 v1 h-2 z M143,40 h1 v1 h-1 z M145,40 h1 v1 h-1 z M147,40 h1 v1 h-1 z M149,40 h1 v1 h-1 z M151,40 h1 v3 h-1 z M153,40 h1 v3 h-1 z M159,40 h1 v4 h-1 z M161,40 h1 v4 h-1 z M163,40 h1 v1 h-1 z M143,41 h2 v1 h-2 z M147,41 h2 v1 h-2 z M155,41 h3 v2 h-3 z M164,41 h1 v1 h-1 z M143,42 h1 v1 h-1 z M145,42 h1 v1 h-1 z M147,42 h1 v2 h-1 z M149,42 h1 v2 h-1 z M165,42 h1 v1 h-1 z M143,43 h2 v1 h-2 z M152,43 h1 v1 h-1 z M155,43 h1 v1 h-1 z M157,43 h1 v1 h-1 z M163,43 h2 v1 h-2 z" fill="#e6a15c" />
    <path d="M138,47 h2 v2 h-2 z M143,46 h1 v2 h-1 z M145,46 h1 v2 h-1 z M148,46 h1 v1 h-1 z M151,46 h3 v1 h-3 z M155,46 h3 v1 h-3 z M159,46 h2 v1 h-2 z M147,47 h1 v1 h-1 z M149,47 h1 v1 h-1 z M152,47 h1 v4 h-1 z M155,47 h1 v1 h-1 z M159,47 h1 v1 h-1 z M161,47 h1 v1 h-1 z M143,48 h3 v2 h-3 z M147,48 h3 v1 h-3 z M155,48 h2 v1 h-2 z M159,48 h2 v1 h-2 z M147,49 h1 v2 h-1 z M149,49 h1 v2 h-1 z M155,49 h1 v1 h-1 z M159,49 h1 v2 h-1 z M161,49 h1 v2 h-1 z M143,50 h1 v1 h-1 z M145,50 h1 v1 h-1 z M155,50 h3 v1 h-3 z" fill="#90caf9" />
    <path d="M138,54 h2 v2 h-2 z M144,53 h1 v1 h-1 z M147,53 h3 v1 h-3 z M151,53 h2 v1 h-2 z M143,54 h1 v1 h-1 z M145,54 h1 v1 h-1 z M148,54 h1 v3 h-1 z M151,54 h1 v1 h-1 z M153,54 h1 v1 h-1 z M143,55 h3 v1 h-3 z M151,55 h2 v1 h-2 z M143,56 h1 v2 h-1 z M145,56 h1 v2 h-1 z M151,56 h1 v2 h-1 z M153,56 h1 v2 h-1 z M147,57 h3 v1 h-3 z" fill="#f5f5f5" />
    {/* Clock (10:00) */}
    <path d="M201,7 h5 v1 h-5 z M199,8 h2 v1 h-2 z M206,8 h2 v1 h-2 z M198,9 h1 v2 h-1 z M208,9 h1 v2 h-1 z M197,11 h1 v5 h-1 z M209,11 h1 v5 h-1 z M198,16 h1 v2 h-1 z M208,16 h1 v2 h-1 z M199,18 h2 v1 h-2 z M206,18 h2 v1 h-2 z M201,19 h5 v1 h-5 z" fill="#5d4037" />
    <path d="M201,8 h5 v1 h-5 z M199,9 h4 v2 h-4 z M204,9 h4 v2 h-4 z M198,11 h5 v1 h-5 z M204,11 h5 v2 h-5 z M198,12 h2 v1 h-2 z M201,12 h2 v1 h-2 z M199,13 h2 v1 h-2 z M204,13 h4 v1 h-4 z M198,14 h11 v2 h-11 z M199,16 h9 v1 h-9 z M199,17 h4 v1 h-4 z M204,17 h4 v1 h-4 z M201,18 h5 v1 h-5 z" fill="#fffdf2" />
    <path d="M203,9 h1 v1 h-1 z M198,13 h1 v1 h-1 z M208,13 h1 v1 h-1 z M203,17 h1 v1 h-1 z" fill="#9e9e9e" />
    <path d="M203,10 h1 v3 h-1 z M200,12 h1 v1 h-1 z M201,13 h2 v1 h-2 z" fill="#3e2723" />
    <path d="M203,13 h1 v1 h-1 z" fill="#e53935" />
    {/* Worm poster */}
    <path d="M214,6 h22 v28 h-22 z" fill="#d7c9a8" />
    <path d="M215,7 h20 v26 h-20 z" fill="#fff8e1" />
    <path d="M224,5 h2 v2 h-2 z M230,16 h1 v1 h-1 z M232,16 h1 v1 h-1 z M229,17 h5 v1 h-5 z M230,18 h3 v1 h-3 z M231,19 h1 v1 h-1 z" fill="#e53935" />
    <path d="M216,9 h1 v2 h-1 z M218,9 h1 v2 h-1 z M221,9 h1 v1 h-1 z M224,9 h2 v1 h-2 z M228,9 h1 v1 h-1 z M230,9 h1 v1 h-1 z M233,9 h2 v1 h-2 z M220,10 h1 v3 h-1 z M222,10 h1 v3 h-1 z M224,10 h1 v1 h-1 z M226,10 h1 v1 h-1 z M228,10 h3 v2 h-3 z M232,10 h1 v1 h-1 z M216,11 h3 v2 h-3 z M224,11 h2 v1 h-2 z M233,11 h1 v1 h-1 z M224,12 h1 v2 h-1 z M226,12 h1 v2 h-1 z M228,12 h1 v2 h-1 z M230,12 h1 v2 h-1 z M234,12 h1 v1 h-1 z M216,13 h1 v1 h-1 z M218,13 h1 v1 h-1 z M221,13 h1 v1 h-1 z M232,13 h2 v1 h-2 z" fill="#5d4037" />
    <path d="M221,15 h4 v1 h-4 z M220,16 h6 v1 h-6 z M220,17 h1 v1 h-1 z M222,17 h2 v1 h-2 z M225,17 h1 v1 h-1 z M220,18 h2 v1 h-2 z M224,18 h2 v1 h-2 z M221,19 h4 v1 h-4 z M223,21 h4 v1 h-4 z M224,22 h4 v1 h-4 z M223,24 h4 v1 h-4 z M222,25 h4 v1 h-4 z M221,27 h4 v1 h-4 z" fill="#f48fb1" />
    <path d="M222,18 h2 v1 h-2 z M222,20 h4 v1 h-4 z M224,23 h4 v1 h-4 z M221,26 h4 v1 h-4 z" fill="#d81b60" />
    <path d="M221,17 h1 v1 h-1 z M224,17 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M231,24 h1 v1 h-1 z M233,24 h1 v1 h-1 z M232,25 h1 v2 h-1 z" fill="#66bb6a" />
    <path d="M215,27 h6 v1 h-6 z M225,27 h10 v1 h-10 z M215,28 h12 v1 h-12 z M228,28 h7 v1 h-7 z M215,29 h2 v1 h-2 z M218,29 h13 v1 h-13 z M232,29 h3 v1 h-3 z M215,30 h7 v1 h-7 z M223,30 h12 v1 h-12 z" fill="#8d6e63" />
    <path d="M217,26 h2 v1 h-2 z M227,26 h2 v1 h-2 z M227,28 h1 v1 h-1 z M217,29 h1 v1 h-1 z M231,29 h1 v1 h-1 z M222,30 h1 v1 h-1 z M215,31 h20 v1 h-20 z" fill="#6d4c41" />
    {/* Bookshelf */}
    <path d="M198,48 h40 v49 h-40 z" fill="#6d4c41" />
    <path d="M200,50 h36 v43 h-36 z" fill="#3e2723" />
    <path d="M198,48 h1 v49 h-1 z M198,48 h40 v1 h-40 z M200,63 h36 v1 h-36 z M200,78 h36 v1 h-36 z M200,93 h36 v1 h-36 z M227,67 h3 v11 h-3 z" fill="#8d6e63" />
    <path d="M237,48 h1 v49 h-1 z M200,64 h36 v1 h-36 z M200,79 h36 v1 h-36 z" fill="#5d4037" />
    <path d="M198,95 h40 v2 h-40 z M203,72 h4 v5 h-4 z" fill="#4e342e" />
    <path d="M201,52 h3 v11 h-3 z M225,59 h9 v2 h-9 z M230,66 h2 v12 h-2 z" fill="#c62828" />
    <path d="M201,54 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M204,53 h2 v10 h-2 z M229,82 h3 v11 h-3 z" fill="#ef6c00" />
    <path d="M206,51 h3 v12 h-3 z M224,61 h10 v2 h-10 z M232,68 h3 v10 h-3 z" fill="#1565c0" />
    <path d="M206,53 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M209,54 h2 v9 h-2 z M224,57 h9 v2 h-9 z" fill="#f9a825" />
    <path d="M211,52 h3 v11 h-3 z M224,66 h3 v12 h-3 z" fill="#2e7d32" />
    <path d="M211,54 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M214,51 h2 v12 h-2 z M232,81 h3 v12 h-3 z" fill="#6a1b9a" />
    <path d="M217,53 h3 v10 h-3 z" fill="#00838f" />
    <path d="M217,55 h3 v1 h-3 z M224,68 h3 v1 h-3 z M230,68 h2 v1 h-2 z" fill="#fff8e1" />
    <path d="M220,52 h2 v11 h-2 z" fill="#ad1457" />
    <path d="M203,70 h4 v1 h-4 z M210,70 h4 v1 h-4 z M217,70 h4 v1 h-4 z" fill="#9e9e9e" />
    <path d="M202,71 h6 v1 h-6 z M202,72 h1 v5 h-1 z M207,72 h1 v5 h-1 z M202,77 h6 v1 h-6 z M209,71 h6 v1 h-6 z M209,72 h1 v5 h-1 z M214,72 h1 v5 h-1 z M209,77 h6 v1 h-6 z M216,71 h6 v1 h-6 z M216,72 h1 v5 h-1 z M221,72 h1 v5 h-1 z M216,77 h6 v1 h-6 z" fill="#cfd8dc" />
    <path d="M210,72 h4 v5 h-4 z" fill="#d7b98a" />
    <path d="M217,72 h4 v5 h-4 z" fill="#b5651d" />
    <path d="M202,84 h16 v9 h-16 z" fill="#c49a6c" />
    <path d="M202,84 h16 v1 h-16 z" fill="#ddb98b" />
    <path d="M202,88 h16 v1 h-16 z" fill="#a67c52" />
    <path d="M208,85 h4 v2 h-4 z M204,47 h6 v1 h-6 z" fill="#5d4037" />
    <path d="M221,81 h4 v12 h-4 z" fill="#455a64" />
    <path d="M221,83 h4 v1 h-4 z" fill="#fff8e1" />
    <path d="M225,81 h4 v12 h-4 z" fill="#37474f" />
    <path d="M225,83 h4 v1 h-4 z M232,83 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M205,37 h4 v1 h-4 z M204,38 h1 v1 h-1 z M207,38 h3 v1 h-3 z M203,39 h1 v1 h-1 z M207,39 h4 v1 h-4 z M203,40 h2 v1 h-2 z M206,40 h2 v1 h-2 z M210,40 h1 v2 h-1 z M203,41 h4 v1 h-4 z M203,42 h1 v1 h-1 z M205,42 h3 v1 h-3 z M209,42 h2 v1 h-2 z M204,43 h1 v1 h-1 z M206,43 h4 v1 h-4 z M205,44 h4 v1 h-4 z" fill="#42a5f5" />
    <path d="M205,38 h2 v1 h-2 z M204,39 h3 v1 h-3 z M205,40 h1 v1 h-1 z M208,40 h2 v1 h-2 z M207,41 h3 v1 h-3 z M204,42 h1 v1 h-1 z M208,42 h1 v1 h-1 z M205,43 h1 v1 h-1 z M229,38 h1 v2 h-1 z M227,39 h1 v1 h-1 z M232,39 h1 v1 h-1 z M226,40 h1 v2 h-1 z M228,40 h2 v1 h-2 z M231,40 h1 v1 h-1 z M229,41 h1 v1 h-1 z M232,41 h1 v1 h-1 z M234,41 h1 v1 h-1 z M227,42 h1 v1 h-1 z M232,42 h2 v1 h-2 z M228,43 h1 v1 h-1 z M232,43 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M206,45 h2 v2 h-2 z" fill="#c9a227" />
    <path d="M230,38 h1 v3 h-1 z M227,40 h1 v1 h-1 z M232,40 h1 v1 h-1 z M227,41 h2 v1 h-2 z M230,41 h2 v1 h-2 z M228,42 h4 v1 h-4 z M234,42 h1 v1 h-1 z M229,43 h3 v1 h-3 z" fill="#388e3c" />
    <path d="M226,44 h8 v1 h-8 z" fill="#d9825b" />
    <path d="M227,45 h6 v2 h-6 z M228,47 h4 v1 h-4 z" fill="#c2693f" />
    {/* Compost bin */}
    <path d="M15,68 h2 v1 h-2 z M23,68 h1 v1 h-1 z M12,69 h3 v1 h-3 z M16,69 h4 v1 h-4 z M21,69 h5 v1 h-5 z M9,70 h4 v1 h-4 z M14,70 h6 v1 h-6 z M21,70 h3 v1 h-3 z M25,70 h4 v1 h-4 z M7,71 h2 v1 h-2 z M10,71 h5 v1 h-5 z M16,71 h4 v1 h-4 z M21,71 h7 v1 h-7 z M29,71 h3 v1 h-3 z M5,72 h5 v1 h-5 z M11,72 h7 v1 h-7 z M19,72 h5 v1 h-5 z M25,72 h5 v1 h-5 z M31,72 h4 v1 h-4 z M4,73 h2 v1 h-2 z M7,73 h7 v1 h-7 z M15,73 h5 v1 h-5 z M21,73 h8 v1 h-8 z M30,73 h6 v1 h-6 z" fill="#4e342e" />
    <path d="M13,70 h1 v1 h-1 z M20,71 h1 v1 h-1 z M10,72 h1 v1 h-1 z M30,72 h1 v1 h-1 z M14,73 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M15,69 h1 v1 h-1 z M24,70 h1 v1 h-1 z M15,71 h1 v1 h-1 z M24,72 h1 v1 h-1 z M6,73 h1 v1 h-1 z M29,73 h1 v1 h-1 z" fill="#7cb342" />
    <path d="M20,69 h1 v1 h-1 z M9,71 h1 v1 h-1 z M28,71 h1 v1 h-1 z M20,73 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M20,70 h1 v1 h-1 z M18,72 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M3,74 h34 v1 h-34 z" fill="#66bb6a" />
    <path d="M3,75 h34 v1 h-34 z" fill="#388e3c" />
    <path d="M3,76 h34 v1 h-34 z M33,77 h3 v25 h-3 z M5,102 h30 v1 h-30 z" fill="#1b5e20" />
    <path d="M4,77 h2 v25 h-2 z" fill="#43a047" />
    <path d="M6,77 h27 v25 h-27 z" fill="#2e7d32" />
    <path d="M4,78 h32 v1 h-32 z" fill="#1b5e20" />
    <path d="M6,81 h29 v7 h-29 z" fill="#f5ecd7" />
    <path d="M8,82 h2 v1 h-2 z M12,82 h1 v1 h-1 z M15,82 h1 v1 h-1 z M17,82 h1 v1 h-1 z M19,82 h2 v1 h-2 z M24,82 h1 v1 h-1 z M28,82 h2 v1 h-2 z M31,82 h3 v1 h-3 z M7,83 h1 v3 h-1 z M11,83 h1 v3 h-1 z M13,83 h1 v3 h-1 z M15,83 h3 v2 h-3 z M19,83 h1 v1 h-1 z M21,83 h1 v1 h-1 z M23,83 h1 v3 h-1 z M25,83 h1 v3 h-1 z M27,83 h1 v1 h-1 z M32,83 h1 v4 h-1 z M19,84 h2 v1 h-2 z M28,84 h1 v1 h-1 z M15,85 h1 v2 h-1 z M17,85 h1 v2 h-1 z M19,85 h1 v2 h-1 z M29,85 h1 v1 h-1 z M8,86 h2 v1 h-2 z M12,86 h1 v1 h-1 z M24,86 h1 v1 h-1 z M27,86 h2 v1 h-2 z M4,100 h32 v1 h-32 z" fill="#1b5e20" />
    <path d="M21,91 h2 v1 h-2 z M19,92 h4 v1 h-4 z M18,93 h5 v1 h-5 z M18,94 h4 v1 h-4 z M17,95 h4 v1 h-4 z M18,96 h2 v1 h-2 z M17,97 h1 v1 h-1 z" fill="#a5d6a7" />
    <path d="M3,103 h34 v1 h-34 z" fill="#000000" opacity="0.2" />
  </svg>
));

const StudentPortrait = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const urls = [
    `${BASE}/farmgirl pupper 300.png`,
    `${BASE}/hero.png`
  ];
  
  return (
    <img 
      src={urls[imgIdx]} 
      alt="Student" 
      className="w-full h-full object-cover" 
      onError={() => { if(imgIdx < urls.length - 1) setImgIdx(imgIdx + 1); }} 
    />
  );
};

const PolishHenSprite = React.memo(({ name }) => {
  const isRiot = name === 'Riot';
  
  // Riot is a Buff Laced Polish (Gold/Buff body, White lacing)
  // Beyonce is a Golden Laced Polish (Black body, Copper/Gold lacing)
  const baseColor = isRiot ? "#fbc02d" : "#1a1a1a"; 
  const laceColor1 = isRiot ? "#ffffff" : "#d84315"; 
  const laceColor2 = isRiot ? "#fff9c4" : "#ff9800"; 
  const legColor = "#78909c"; 
  const beakColor = isRiot ? "#d7ccc8" : "#90a4ae";

  return (
    <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
      {/* Legs */}
      <path d="M6,13 h1 v3 h-1 z M10,13 h1 v3 h-1 z M5,15 h2 v1 h-2 z M9,15 h2 v1 h-2 z" fill={legColor} />
      
      {/* Tail Base */}
      <path d="M1,2 h4 v8 h-4 z M0,3 h2 v6 h-2 z M4,1 h2 v4 h-2 z" fill={baseColor} />
      {/* Tail Lacing */}
      <path d="M2,3 h1 v6 h-1 z M4,3 h1 v5 h-1 z M1,4 h1 v4 h-1 z M5,2 h1 v3 h-1 z" fill={laceColor1} />
      
      {/* Body Base */}
      <path d="M3,8 h9 v5 h-9 z M4,13 h7 v1 h-7 z M10,7 h2 v2 h-2 z" fill={baseColor} />
      {/* Body Feathers / Lacing */}
      <path d="M4,9 h1 v1 h-1 z M6,9 h1 v1 h-1 z M8,9 h1 v1 h-1 z M10,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M7,10 h1 v1 h-1 z M9,10 h1 v1 h-1 z M11,10 h1 v1 h-1 z M4,11 h1 v1 h-1 z M6,11 h1 v1 h-1 z M8,11 h1 v1 h-1 z M10,11 h1 v1 h-1 z M5,12 h1 v1 h-1 z M7,12 h1 v1 h-1 z M9,12 h1 v1 h-1 z" fill={laceColor1} />
      
      {/* Neck */}
      <path d="M8,5 h4 v4 h-4 z" fill={baseColor} />
      
      {/* Beak & Wattle */}
      <path d="M13,6 h2 v1 h-2 z M14,7 h1 v1 h-1 z" fill={beakColor} />
      <path d="M12,7 h1 v1 h-1 z" fill="#d32f2f" />
      
      {/* Giant Crest (Poof) Base */}
      <path d="M7,1 h6 v5 h-6 z M8,0 h4 v1 h-4 z M6,2 h2 v4 h-2 z M13,2 h2 v3 h-2 z M12,1 h2 v1 h-2 z" fill={baseColor} />
      {/* Giant Crest Lacing/Feather Details */}
      <path d="M9,1 h1 v1 h-1 z M11,1 h1 v1 h-1 z M8,2 h1 v1 h-1 z M10,2 h1 v1 h-1 z M12,2 h1 v1 h-1 z M7,3 h1 v1 h-1 z M9,3 h1 v1 h-1 z M11,3 h1 v1 h-1 z M13,3 h1 v1 h-1 z M8,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z M12,4 h1 v1 h-1 z M14,4 h1 v1 h-1 z M7,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z M11,5 h1 v1 h-1 z M6,4 h1 v1 h-1 z" fill={laceColor2} />
      <path d="M10,0 h1 v1 h-1 z M8,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z M11,2 h1 v1 h-1 z M13,2 h1 v1 h-1 z M10,3 h1 v1 h-1 z M12,3 h1 v1 h-1 z M9,4 h1 v1 h-1 z M11,4 h1 v1 h-1 z M8,5 h1 v1 h-1 z M10,5 h1 v1 h-1 z" fill={laceColor1} />

      {/* Eye */}
      <path d="M12,5 h1 v1 h-1 z" fill="#000000" />
    </svg>
  );
});

const PixelHeartSprite = React.memo(() => (
  <svg viewBox="0 0 7 6" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M1,0 h2 v1 h1 v-1 h2 v1 h1 v2 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-2 z" fill="#e53935" />
    <path d="M1,1 h1 v1 h-1 z M2,2 h1 v1 h-1 z" fill="#ffcdd2" opacity="0.6" />
  </svg>
));

const CornSprite = React.memo(() => (
  <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Silk */}
    <path d="M10,0 h1 v1 h-1 z M12,0 h1 v1 h-1 z M9,1 h1 v1 h-1 z M11,1 h3 v1 h-3 z M9,2 h2 v1 h-2 z M13,2 h2 v1 h-2 z" fill="#ffe082" />
    <path d="M11,0 h1 v1 h-1 z M10,1 h1 v1 h-1 z" fill="#fff8e1" />
    {/* Kernels */}
    <path d="M11,2 h2 v1 h-2 z M8,3 h2 v1 h-2 z M11,3 h1 v2 h-1 z M13,3 h1 v1 h-1 z M9,4 h1 v1 h-1 z M13,4 h2 v1 h-2 z M10,5 h1 v2 h-1 z M12,5 h1 v2 h-1 z M14,5 h1 v2 h-1 z M8,6 h1 v1 h-1 z M9,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M8,8 h1 v1 h-1 z M10,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M9,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z M13,9 h1 v1 h-1 z M8,10 h1 v1 h-1 z M10,10 h1 v1 h-1 z M12,10 h1 v1 h-1 z M9,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z M8,12 h1 v1 h-1 z M10,12 h1 v1 h-1 z M12,12 h1 v1 h-1 z M9,13 h1 v1 h-1 z M11,13 h1 v1 h-1 z M13,13 h1 v1 h-1 z M8,14 h1 v1 h-1 z M10,14 h1 v1 h-1 z M12,14 h1 v1 h-1 z M9,15 h1 v1 h-1 z M11,15 h1 v1 h-1 z M13,15 h1 v1 h-1 z M10,16 h1 v1 h-1 z M12,16 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M10,3 h1 v2 h-1 z M12,3 h1 v2 h-1 z M9,5 h1 v2 h-1 z M11,5 h1 v2 h-1 z M13,5 h1 v2 h-1 z M8,7 h1 v1 h-1 z M10,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M9,8 h1 v1 h-1 z M11,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z M8,9 h1 v1 h-1 z M10,9 h1 v1 h-1 z M12,9 h1 v1 h-1 z M9,10 h1 v1 h-1 z M11,10 h1 v1 h-1 z M13,10 h1 v1 h-1 z M8,11 h1 v1 h-1 z M10,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M9,12 h1 v1 h-1 z M11,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z M8,13 h1 v1 h-1 z M10,13 h1 v1 h-1 z M12,13 h1 v1 h-1 z M9,14 h1 v1 h-1 z M11,14 h1 v1 h-1 z M13,14 h1 v1 h-1 z M10,15 h1 v1 h-1 z M12,15 h1 v1 h-1 z M11,16 h1 v1 h-1 z" fill="#f9a825" />
    <path d="M8,4 h1 v2 h-1 z" fill="#fff176" />
    {/* Husk & stalk */}
    <path d="M7,5 h1 v1 h-1 z M15,5 h1 v1 h-1 z M6,6 h2 v1 h-2 z M16,6 h1 v1 h-1 z M5,7 h1 v2 h-1 z M7,7 h1 v6 h-1 z M4,9 h2 v1 h-2 z M4,10 h1 v7 h-1 z M5,17 h1 v2 h-1 z M6,19 h1 v2 h-1 z M7,21 h1 v1 h-1 z M8,22 h1 v1 h-1 z M10,22 h1 v1 h-1 z M9,23 h1 v1 h-1 z M11,23 h1 v1 h-1 z M10,24 h1 v8 h-1 z" fill="#66bb6a" />
    <path d="M15,6 h1 v1 h-1 z M6,7 h1 v3 h-1 z M14,7 h2 v4 h-2 z M5,10 h2 v3 h-2 z M14,11 h1 v3 h-1 z M5,13 h3 v2 h-3 z M5,15 h4 v1 h-4 z M5,16 h5 v1 h-5 z M13,16 h1 v1 h-1 z M6,17 h8 v2 h-8 z M7,19 h6 v1 h-6 z M7,20 h5 v1 h-5 z M8,21 h4 v1 h-4 z M9,22 h1 v1 h-1 z M11,22 h1 v1 h-1 z M10,23 h1 v1 h-1 z M11,24 h1 v8 h-1 z" fill="#4caf50" />
    <path d="M16,7 h1 v2 h-1 z M16,9 h2 v8 h-2 z M16,17 h1 v2 h-1 z M15,19 h1 v2 h-1 z M14,21 h1 v1 h-1 z M13,22 h1 v1 h-1 z M12,24 h1 v8 h-1 z" fill="#388e3c" />
    <path d="M15,11 h1 v3 h-1 z M14,14 h2 v5 h-2 z M13,19 h2 v1 h-2 z M12,20 h3 v1 h-3 z M12,21 h2 v1 h-2 z M12,22 h1 v2 h-1 z" fill="#2e7d32" />
  </svg>
));

const CarrotSprite = React.memo(() => (
  <svg viewBox="0 0 20 28" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Leaves */}
    <path d="M7,0 h1 v1 h-1 z M11,0 h1 v1 h-1 z M6,1 h1 v1 h-1 z M9,1 h1 v2 h-1 z M13,1 h1 v1 h-1 z M5,2 h1 v2 h-1 z M14,2 h1 v1 h-1 z M7,3 h1 v1 h-1 z M10,3 h1 v2 h-1 z M12,3 h1 v2 h-1 z M4,4 h1 v1 h-1 z M6,4 h2 v1 h-2 z M7,5 h1 v1 h-1 z M10,5 h2 v1 h-2 z M8,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M7,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z M6,2 h1 v2 h-1 z M13,2 h1 v3 h-1 z M9,3 h1 v4 h-1 z M5,4 h1 v1 h-1 z M6,5 h1 v1 h-1 z M12,5 h1 v1 h-1 z M7,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z M9,7 h4 v1 h-4 z" fill="#4caf50" />
    <path d="M8,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z" fill="#388e3c" />
    {/* Carrot */}
    <path d="M8,8 h5 v1 h-5 z M8,9 h6 v1 h-6 z M8,10 h7 v2 h-7 z M8,13 h7 v3 h-7 z M8,17 h6 v1 h-6 z M9,18 h4 v2 h-4 z M9,21 h3 v1 h-3 z M10,22 h2 v2 h-2 z M9,25 h2 v1 h-2 z M10,26 h1 v1 h-1 z" fill="#ff9800" />
    <path d="M6,8 h2 v4 h-2 z M6,12 h1 v1 h-1 z M6,13 h2 v1 h-2 z M7,14 h1 v4 h-1 z M8,18 h1 v4 h-1 z M9,22 h1 v3 h-1 z" fill="#ffb74d" />
    <path d="M13,8 h1 v1 h-1 z M14,9 h1 v1 h-1 z M15,10 h1 v6 h-1 z M14,16 h1 v2 h-1 z M13,18 h2 v2 h-2 z M13,20 h1 v1 h-1 z M12,21 h2 v3 h-2 z M12,24 h1 v1 h-1 z M11,25 h2 v2 h-2 z M10,27 h2 v1 h-2 z" fill="#ef6c00" />
    <path d="M7,12 h8 v1 h-8 z M8,16 h6 v1 h-6 z M9,20 h4 v1 h-4 z M10,24 h2 v1 h-2 z" fill="#e65100" />
  </svg>
));

const MelonSprite = React.memo(() => (
  <svg viewBox="0 0 28 28" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Stem & leaf */}
    <path d="M12,0 h1 v2 h-1 z M11,2 h2 v1 h-2 z" fill="#8b5a2b" />
    <path d="M13,0 h1 v4 h-1 z" fill="#6d4c41" />
    <path d="M14,1 h2 v1 h-2 z M14,2 h4 v1 h-4 z" fill="#66bb6a" />
    {/* Melon */}
    <path d="M4,7 h1 v2 h-1 z M3,9 h1 v2 h-1 z M2,11 h1 v5 h-1 z" fill="#81c784" />
    <path d="M9,3 h4 v1 h-4 z M14,3 h5 v1 h-5 z M7,4 h2 v1 h-2 z M10,4 h4 v1 h-4 z M15,4 h4 v1 h-4 z M7,5 h1 v3 h-1 z M9,5 h4 v1 h-4 z M15,5 h3 v2 h-3 z M9,6 h5 v1 h-5 z M10,7 h3 v1 h-3 z M14,7 h4 v1 h-4 z M6,8 h2 v1 h-2 z M10,8 h7 v2 h-7 z M5,9 h2 v2 h-2 z M10,10 h6 v1 h-6 z M4,11 h3 v1 h-3 z M10,11 h5 v1 h-5 z M3,12 h5 v2 h-5 z M11,12 h4 v7 h-4 z M3,14 h4 v2 h-4 z M2,16 h4 v2 h-4 z M3,18 h3 v2 h-3 z M12,19 h3 v1 h-3 z M4,20 h2 v1 h-2 z M13,20 h3 v1 h-3 z M4,21 h1 v1 h-1 z M14,21 h2 v1 h-2 z M15,22 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M19,4 h1 v1 h-1 z M18,5 h2 v2 h-2 z M18,7 h1 v1 h-1 z M17,8 h2 v1 h-2 z M17,9 h1 v2 h-1 z M7,14 h1 v2 h-1 z M6,16 h2 v3 h-2 z M6,19 h3 v1 h-3 z M6,20 h4 v1 h-4 z M5,21 h6 v1 h-6 z M5,22 h7 v1 h-7 z M6,23 h7 v1 h-7 z M7,24 h8 v1 h-8 z M9,25 h9 v1 h-9 z M11,26 h6 v1 h-6 z" fill="#43a047" />
    <path d="M9,4 h1 v1 h-1 z M20,4 h1 v1 h-1 z M8,5 h1 v3 h-1 z M20,5 h2 v1 h-2 z M20,6 h3 v1 h-3 z M19,7 h4 v1 h-4 z M9,8 h1 v4 h-1 z M19,8 h2 v1 h-2 z M7,9 h1 v3 h-1 z M18,9 h1 v2 h-1 z M20,9 h2 v1 h-2 z M16,10 h1 v1 h-1 z M20,10 h1 v1 h-1 z M15,11 h1 v9 h-1 z M17,11 h1 v14 h-1 z M19,11 h1 v8 h-1 z M8,12 h1 v7 h-1 z M10,12 h1 v7 h-1 z M9,19 h1 v1 h-1 z M11,19 h1 v1 h-1 z M10,20 h1 v1 h-1 z M12,20 h1 v1 h-1 z M11,21 h1 v1 h-1 z M13,21 h1 v1 h-1 z M12,22 h1 v1 h-1 z M14,22 h1 v1 h-1 z M13,23 h1 v1 h-1 z M15,23 h1 v2 h-1 z" fill="#2e7d32" />
    <path d="M23,6 h1 v2 h-1 z M9,7 h1 v1 h-1 z M8,8 h1 v4 h-1 z M21,8 h3 v1 h-3 z M19,9 h1 v2 h-1 z M22,9 h3 v1 h-3 z M21,10 h4 v1 h-4 z M16,11 h1 v14 h-1 z M18,11 h1 v8 h-1 z M20,11 h6 v7 h-6 z M9,12 h1 v7 h-1 z M20,18 h5 v1 h-5 z M10,19 h1 v1 h-1 z M18,19 h7 v1 h-7 z M11,20 h1 v1 h-1 z M18,20 h6 v2 h-6 z M12,21 h1 v1 h-1 z M13,22 h1 v1 h-1 z M18,22 h5 v1 h-5 z M14,23 h1 v1 h-1 z M18,23 h4 v1 h-4 z M18,24 h3 v1 h-3 z M18,25 h1 v1 h-1 z" fill="#1b5e20" />
    <path d="M14,4 h1 v1 h-1 z M6,5 h1 v1 h-1 z M13,5 h2 v1 h-2 z M5,6 h2 v2 h-2 z M14,6 h1 v1 h-1 z M13,7 h1 v1 h-1 z M5,8 h1 v1 h-1 z M4,9 h1 v2 h-1 z M3,11 h1 v1 h-1 z" fill="#a5d6a7" />
  </svg>
));

const TreeSprite = React.memo(() => (
  <svg viewBox="0 0 32 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Foliage */}
    <path d="M12,4 h1 v1 h-1 z M11,5 h1 v1 h-1 z M10,6 h1 v1 h-1 z M9,11 h1 v1 h-1 z M7,12 h1 v1 h-1 z M6,13 h1 v1 h-1 z M6,18 h1 v1 h-1 z M5,19 h1 v1 h-1 z M3,20 h1 v1 h-1 z M4,25 h1 v1 h-1 z M3,26 h1 v1 h-1 z M2,27 h1 v1 h-1 z M0,28 h1 v1 h-1 z" fill="#43a047" />
    <path d="M15,0 h1 v1 h-1 z M14,1 h1 v2 h-1 z M13,3 h2 v1 h-2 z M13,4 h1 v1 h-1 z M12,5 h1 v1 h-1 z M11,6 h2 v1 h-2 z M11,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M12,8 h2 v1 h-2 z M11,9 h2 v1 h-2 z M10,10 h3 v1 h-3 z M10,11 h2 v1 h-2 z M8,12 h3 v1 h-3 z M7,13 h3 v1 h-3 z M7,14 h1 v1 h-1 z M11,14 h2 v1 h-2 z M10,15 h3 v1 h-3 z M9,16 h3 v1 h-3 z M7,17 h4 v2 h-4 z M6,19 h4 v1 h-4 z M4,20 h5 v1 h-5 z M4,21 h1 v1 h-1 z M8,21 h4 v2 h-4 z M7,23 h4 v1 h-4 z M5,24 h5 v1 h-5 z M5,25 h4 v1 h-4 z M4,26 h5 v1 h-5 z M3,27 h5 v1 h-5 z M1,28 h6 v1 h-6 z M1,29 h1 v1 h-1 z M5,29 h1 v1 h-1 z M9,29 h1 v1 h-1 z" fill="#388e3c" />
    <path d="M15,1 h2 v1 h-2 z M15,2 h3 v1 h-3 z M15,3 h4 v1 h-4 z M14,4 h5 v1 h-5 z M13,5 h6 v1 h-6 z M13,6 h7 v1 h-7 z M12,7 h1 v1 h-1 z M14,7 h4 v2 h-4 z M13,9 h7 v2 h-7 z M12,11 h9 v1 h-9 z M11,12 h10 v1 h-10 z M10,13 h12 v1 h-12 z M8,14 h1 v1 h-1 z M13,14 h6 v1 h-6 z M13,15 h7 v1 h-7 z M12,16 h9 v1 h-9 z M11,17 h10 v1 h-10 z M11,18 h12 v1 h-12 z M10,19 h13 v1 h-13 z M9,20 h15 v1 h-15 z M5,21 h1 v1 h-1 z M12,21 h8 v1 h-8 z M12,22 h10 v1 h-10 z M11,23 h11 v1 h-11 z M10,24 h13 v1 h-13 z M9,25 h14 v1 h-14 z M9,26 h16 v1 h-16 z M8,27 h17 v1 h-17 z M7,28 h19 v1 h-19 z M2,29 h1 v1 h-1 z M6,29 h1 v1 h-1 z M10,29 h1 v1 h-1 z" fill="#2e7d32" />
    <path d="M16,0 h1 v1 h-1 z M17,1 h1 v1 h-1 z M18,2 h1 v1 h-1 z M19,3 h1 v1 h-1 z M19,4 h2 v2 h-2 z M20,6 h2 v1 h-2 z M18,7 h3 v1 h-3 z M18,8 h2 v1 h-2 z M20,9 h2 v1 h-2 z M20,10 h3 v1 h-3 z M21,11 h3 v1 h-3 z M21,12 h4 v1 h-4 z M22,13 h4 v1 h-4 z M19,14 h2 v1 h-2 z M23,14 h2 v1 h-2 z M20,15 h3 v1 h-3 z M21,16 h3 v1 h-3 z M21,17 h4 v1 h-4 z M23,18 h4 v1 h-4 z M23,19 h5 v1 h-5 z M24,20 h5 v1 h-5 z M20,21 h3 v1 h-3 z M24,21 h2 v1 h-2 z M22,22 h3 v1 h-3 z M22,23 h4 v1 h-4 z M23,24 h4 v1 h-4 z M23,25 h5 v1 h-5 z M25,26 h5 v1 h-5 z M25,27 h6 v1 h-6 z M26,28 h6 v1 h-6 z M21,29 h2 v1 h-2 z M25,29 h2 v1 h-2 z M29,29 h2 v1 h-2 z" fill="#1b5e20" />
    {/* Trunk */}
    <path d="M13,29 h1 v11 h-1 z" fill="#795548" />
    <path d="M14,29 h3 v11 h-3 z" fill="#5d4037" />
    <path d="M17,29 h2 v11 h-2 z" fill="#3e2723" />
  </svg>
));

const CowSprite = React.memo(() => (
  <svg viewBox="0 0 48 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hide */}
    <path d="M5,4 h1 v1 h-1 z M2,5 h4 v1 h-4 z M9,5 h3 v1 h-3 z M2,6 h10 v1 h-10 z M2,7 h2 v1 h-2 z M5,7 h4 v1 h-4 z M10,7 h2 v2 h-2 z M14,7 h29 v1 h-29 z M2,8 h1 v1 h-1 z M5,8 h3 v1 h-3 z M14,8 h3 v1 h-3 z M23,8 h21 v1 h-21 z M2,9 h10 v1 h-10 z M14,9 h2 v1 h-2 z M24,9 h20 v1 h-20 z M2,10 h14 v2 h-14 z M24,10 h8 v1 h-8 z M39,10 h5 v1 h-5 z M24,11 h7 v2 h-7 z M40,11 h4 v7 h-4 z M12,12 h4 v2 h-4 z M27,13 h4 v5 h-4 z M12,14 h6 v2 h-6 z M6,16 h12 v2 h-12 z M6,18 h5 v1 h-5 z M14,18 h4 v1 h-4 z M27,18 h7 v1 h-7 z M39,18 h5 v3 h-5 z M6,19 h4 v2 h-4 z M14,19 h5 v1 h-5 z M26,19 h8 v1 h-8 z M13,20 h21 v1 h-21 z M8,24 h3 v6 h-3 z M16,24 h3 v6 h-3 z M32,24 h3 v6 h-3 z M40,24 h3 v6 h-3 z" fill="#ffffff" />
    <path d="M0,7 h2 v3 h-2 z M12,7 h2 v3 h-2 z M44,10 h2 v11 h-2 z M6,21 h40 v1 h-40 z M6,22 h38 v1 h-38 z M6,23 h20 v1 h-20 z M33,23 h11 v1 h-11 z M11,24 h1 v6 h-1 z M19,24 h1 v6 h-1 z M35,24 h1 v6 h-1 z M43,24 h1 v6 h-1 z" fill="#e0e0e0" />
    <path d="M6,4 h3 v2 h-3 z M4,7 h1 v1 h-1 z M9,7 h1 v1 h-1 z M3,8 h2 v1 h-2 z M8,8 h2 v1 h-2 z M17,8 h6 v1 h-6 z M16,9 h8 v4 h-8 z M32,10 h7 v1 h-7 z M31,11 h9 v7 h-9 z M16,13 h11 v1 h-11 z M18,14 h9 v5 h-9 z M11,18 h3 v1 h-3 z M34,18 h5 v3 h-5 z M10,19 h4 v1 h-4 z M19,19 h7 v1 h-7 z M10,20 h3 v1 h-3 z M44,22 h3 v3 h-3 z M8,30 h4 v2 h-4 z M16,30 h4 v2 h-4 z M32,30 h4 v2 h-4 z M40,30 h4 v2 h-4 z" fill="#212121" />
    {/* Muzzle & udder */}
    <path d="M2,12 h10 v1 h-10 z M2,13 h2 v1 h-2 z M5,13 h4 v1 h-4 z M10,13 h2 v1 h-2 z M2,14 h10 v1 h-10 z M26,23 h7 v1 h-7 z M26,24 h6 v2 h-6 z M27,26 h1 v1 h-1 z M31,26 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M4,13 h1 v1 h-1 z M9,13 h1 v1 h-1 z M2,15 h10 v1 h-10 z" fill="#ec407a" />
    {/* Horns */}
    <path d="M4,2 h1 v1 h-1 z M9,2 h1 v1 h-1 z M3,3 h2 v2 h-2 z M9,3 h2 v2 h-2 z" fill="#bdbdbd" />
    <path d="M3,2 h1 v1 h-1 z M10,2 h1 v1 h-1 z" fill="#9e9e9e" />
  </svg>
));

const PigSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Body */}
    <path d="M3,8 h20 v3 h-20 z" fill="#f8bbd0" />
    <path d="M25,5 h3 v1 h-3 z M30,5 h1 v1 h-1 z M23,6 h9 v1 h-9 z M3,7 h29 v1 h-29 z M2,8 h1 v3 h-1 z M23,8 h2 v2 h-2 z M27,8 h5 v2 h-5 z M23,10 h5 v1 h-5 z M2,11 h26 v3 h-26 z M2,14 h30 v1 h-30 z M2,15 h21 v1 h-21 z M2,16 h24 v1 h-24 z" fill="#f48fb1" />
    <path d="M24,2 h1 v1 h-1 z M29,2 h1 v1 h-1 z M23,3 h2 v3 h-2 z M28,3 h2 v3 h-2 z M0,8 h1 v1 h-1 z M1,9 h1 v1 h-1 z M0,10 h1 v1 h-1 z M1,11 h1 v1 h-1 z M23,15 h9 v1 h-9 z M2,17 h24 v3 h-24 z M4,20 h4 v3 h-4 z M10,20 h4 v3 h-4 z M18,20 h4 v3 h-4 z M24,20 h4 v3 h-4 z" fill="#f06292" />
    <path d="M29,11 h1 v1 h-1 z M31,11 h1 v1 h-1 z M28,13 h4 v1 h-4 z M4,23 h4 v1 h-4 z M10,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M24,23 h4 v1 h-4 z" fill="#ad1457" />
    {/* Snout */}
    <path d="M28,10 h4 v1 h-4 z M28,11 h1 v1 h-1 z M30,11 h1 v1 h-1 z M28,12 h4 v1 h-4 z" fill="#ec407a" />
    {/* Eye */}
    <path d="M26,8 h1 v1 h-1 z M25,9 h2 v1 h-2 z" fill="#212121" />
    <path d="M25,8 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

const SunflowerSprite = React.memo(() => (
  <svg viewBox="0 0 24 48" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Stem & leaves */}
    <path d="M11,24 h1 v24 h-1 z M8,29 h1 v1 h-1 z M6,30 h3 v1 h-3 z M8,31 h1 v1 h-1 z M15,35 h1 v1 h-1 z M14,36 h3 v1 h-3 z M16,37 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M12,24 h1 v24 h-1 z M9,28 h2 v4 h-2 z M7,29 h1 v1 h-1 z M5,30 h1 v1 h-1 z M6,31 h2 v1 h-2 z M8,32 h2 v1 h-2 z M13,34 h2 v2 h-2 z M16,35 h1 v1 h-1 z M13,36 h1 v1 h-1 z M17,36 h2 v2 h-2 z M14,37 h2 v1 h-2 z M15,38 h2 v1 h-2 z" fill="#388e3c" />
    {/* Petals */}
    <path d="M13,0 h1 v1 h-1 z M12,1 h3 v1 h-3 z M16,1 h2 v1 h-2 z M11,2 h8 v1 h-8 z M10,3 h9 v1 h-9 z M9,4 h11 v1 h-11 z M8,5 h14 v1 h-14 z M7,6 h16 v1 h-16 z M6,7 h3 v1 h-3 z M10,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M15,7 h8 v1 h-8 z M5,8 h3 v1 h-3 z M15,8 h7 v1 h-7 z M4,9 h3 v1 h-3 z M17,9 h4 v1 h-4 z M3,10 h5 v1 h-5 z M16,10 h4 v1 h-4 z M2,11 h5 v1 h-5 z M17,11 h2 v1 h-2 z M1,12 h6 v1 h-6 z M17,12 h1 v1 h-1 z M0,13 h8 v1 h-8 z M16,13 h1 v1 h-1 z M1,14 h6 v1 h-6 z M2,15 h7 v1 h-7 z M1,16 h8 v1 h-8 z M10,16 h1 v1 h-1 z M13,16 h1 v1 h-1 z M1,17 h12 v1 h-12 z M2,18 h10 v1 h-10 z M4,19 h7 v1 h-7 z M5,20 h5 v1 h-5 z M5,21 h4 v1 h-4 z M6,22 h2 v1 h-2 z" fill="#ffeb3b" />
    <path d="M21,9 h2 v1 h-2 z M20,10 h4 v1 h-4 z M19,11 h5 v1 h-5 z M18,12 h6 v1 h-6 z M17,13 h7 v1 h-7 z M17,14 h6 v1 h-6 z M15,15 h7 v1 h-7 z M15,16 h8 v1 h-8 z M13,17 h10 v1 h-10 z M12,18 h10 v1 h-10 z M11,19 h9 v1 h-9 z M10,20 h9 v1 h-9 z M9,21 h10 v1 h-10 z M9,22 h6 v1 h-6 z M16,22 h2 v1 h-2 z M10,23 h4 v1 h-4 z" fill="#fbc02d" />
    <path d="M10,0 h3 v1 h-3 z M6,1 h2 v1 h-2 z M9,1 h3 v1 h-3 z M5,2 h6 v1 h-6 z M5,3 h5 v1 h-5 z M4,4 h5 v1 h-5 z M2,5 h6 v1 h-6 z M1,6 h6 v1 h-6 z M1,7 h5 v1 h-5 z M2,8 h3 v1 h-3 z M1,9 h3 v1 h-3 z M0,10 h3 v1 h-3 z M0,11 h2 v1 h-2 z M0,12 h1 v1 h-1 z" fill="#fff176" />
    {/* Seed head */}
    <path d="M9,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M10,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M14,8 h1 v1 h-1 z M7,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z M13,9 h1 v1 h-1 z M15,9 h1 v1 h-1 z M8,10 h1 v1 h-1 z M10,10 h1 v1 h-1 z M12,10 h1 v1 h-1 z M14,10 h1 v1 h-1 z M7,11 h1 v1 h-1 z M9,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z M15,11 h1 v1 h-1 z M8,12 h1 v1 h-1 z M10,12 h1 v1 h-1 z M12,12 h1 v1 h-1 z M14,12 h1 v1 h-1 z M16,12 h1 v1 h-1 z M9,13 h1 v1 h-1 z M11,13 h1 v1 h-1 z M13,13 h1 v1 h-1 z M15,13 h1 v1 h-1 z M8,14 h1 v1 h-1 z M10,14 h1 v1 h-1 z M12,14 h1 v1 h-1 z M14,14 h1 v1 h-1 z M16,14 h1 v1 h-1 z M9,15 h1 v1 h-1 z M11,15 h1 v1 h-1 z M13,15 h1 v1 h-1 z M12,16 h1 v1 h-1 z M14,16 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M12,7 h1 v1 h-1 z M14,7 h1 v1 h-1 z M11,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z M10,9 h1 v1 h-1 z M12,9 h1 v1 h-1 z M14,9 h1 v1 h-1 z M16,9 h1 v1 h-1 z M9,10 h1 v1 h-1 z M11,10 h1 v1 h-1 z M13,10 h1 v1 h-1 z M15,10 h1 v1 h-1 z M8,11 h1 v1 h-1 z M10,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M14,11 h1 v1 h-1 z M16,11 h1 v1 h-1 z M7,12 h1 v1 h-1 z M9,12 h1 v1 h-1 z M11,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z M15,12 h1 v1 h-1 z M8,13 h1 v1 h-1 z M10,13 h1 v1 h-1 z M12,13 h1 v1 h-1 z M14,13 h1 v1 h-1 z M7,14 h1 v1 h-1 z M9,14 h1 v1 h-1 z M11,14 h1 v1 h-1 z M13,14 h1 v1 h-1 z M15,14 h1 v1 h-1 z M10,15 h1 v1 h-1 z M12,15 h1 v1 h-1 z M14,15 h1 v1 h-1 z M9,16 h1 v1 h-1 z M11,16 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M8,8 h2 v2 h-2 z" fill="#6d4c41" />
  </svg>
));

const ZinniaSprite = React.memo(() => (
  <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Stem & leaves */}
    <path d="M11,17 h1 v15 h-1 z M8,20 h1 v1 h-1 z M6,21 h3 v1 h-3 z M8,22 h1 v1 h-1 z M15,25 h1 v1 h-1 z M14,26 h3 v1 h-3 z M16,27 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M12,17 h1 v15 h-1 z M9,19 h2 v4 h-2 z M7,20 h1 v1 h-1 z M5,21 h1 v1 h-1 z M6,22 h2 v1 h-2 z M8,23 h2 v1 h-2 z M13,24 h2 v2 h-2 z M16,25 h1 v1 h-1 z M13,26 h1 v1 h-1 z M17,26 h2 v2 h-2 z M14,27 h2 v1 h-2 z M15,28 h2 v1 h-2 z" fill="#388e3c" />
    {/* Petals */}
    <path d="M12,0 h2 v1 h-2 z M11,1 h4 v1 h-4 z M16,1 h2 v1 h-2 z M10,2 h1 v1 h-1 z M13,2 h6 v2 h-6 z M9,3 h2 v1 h-2 z M16,4 h2 v1 h-2 z M7,5 h1 v1 h-1 z M16,5 h3 v1 h-3 z M6,6 h2 v1 h-2 z M16,6 h2 v1 h-2 z M5,7 h1 v1 h-1 z M4,8 h2 v1 h-2 z M4,9 h4 v1 h-4 z M5,10 h3 v1 h-3 z M6,11 h2 v1 h-2 z M5,12 h6 v2 h-6 z M6,14 h2 v1 h-2 z M9,14 h1 v1 h-1 z" fill="#e91e63" />
    <path d="M18,6 h2 v1 h-2 z M18,7 h3 v2 h-3 z M16,9 h4 v1 h-4 z M16,10 h3 v1 h-3 z M16,11 h2 v1 h-2 z M13,12 h6 v2 h-6 z M10,14 h5 v1 h-5 z M16,14 h2 v1 h-2 z M10,15 h4 v1 h-4 z M11,16 h2 v1 h-2 z" fill="#c2185b" />
    <path d="M10,0 h2 v1 h-2 z M6,1 h2 v1 h-2 z M9,1 h2 v1 h-2 z M5,2 h5 v1 h-5 z M5,3 h4 v1 h-4 z M6,4 h2 v1 h-2 z M5,5 h2 v1 h-2 z M4,6 h2 v1 h-2 z M3,7 h2 v1 h-2 z M3,8 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M11,2 h2 v2 h-2 z M8,4 h8 v2 h-8 z M8,6 h2 v1 h-2 z M14,6 h2 v1 h-2 z M6,7 h4 v2 h-4 z M14,7 h4 v2 h-4 z M8,9 h2 v1 h-2 z M14,9 h2 v1 h-2 z M8,10 h8 v2 h-8 z M11,12 h2 v2 h-2 z" fill="#f06292" />
    {/* Center */}
    <path d="M10,6 h1 v1 h-1 z M12,6 h1 v1 h-1 z M11,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M10,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M11,9 h1 v1 h-1 z M13,9 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M11,6 h1 v1 h-1 z M13,6 h1 v1 h-1 z M10,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M11,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z M10,9 h1 v1 h-1 z M12,9 h1 v1 h-1 z" fill="#fbc02d" />
  </svg>
));

const MarigoldSprite = React.memo(() => (
  <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Stem & leaves */}
    <path d="M11,15 h1 v17 h-1 z M8,21 h1 v1 h-1 z M6,22 h3 v1 h-3 z M8,23 h1 v1 h-1 z M15,25 h1 v1 h-1 z M14,26 h3 v1 h-3 z M16,27 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M12,15 h1 v17 h-1 z M9,20 h2 v4 h-2 z M7,21 h1 v1 h-1 z M5,22 h1 v1 h-1 z M6,23 h2 v1 h-2 z M8,24 h2 v1 h-2 z M13,24 h2 v2 h-2 z M16,25 h1 v1 h-1 z M13,26 h1 v1 h-1 z M17,26 h2 v2 h-2 z M14,27 h2 v1 h-2 z M15,28 h2 v1 h-2 z" fill="#388e3c" />
    {/* Petals */}
    <path d="M14,0 h1 v1 h-1 z M13,1 h2 v1 h-2 z M11,2 h5 v1 h-5 z M11,3 h2 v1 h-2 z M14,3 h5 v2 h-5 z M9,4 h1 v1 h-1 z M17,5 h2 v1 h-2 z M7,6 h1 v1 h-1 z M16,6 h2 v1 h-2 z M6,7 h2 v1 h-2 z M16,7 h1 v1 h-1 z M5,8 h1 v1 h-1 z M4,9 h4 v1 h-4 z M5,10 h3 v1 h-3 z M5,11 h2 v1 h-2 z M5,12 h5 v2 h-5 z M8,14 h2 v1 h-2 z" fill="#ff9800" />
    <path d="M11,6 h1 v1 h-1 z M18,6 h1 v1 h-1 z M10,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M17,7 h3 v1 h-3 z M9,8 h1 v1 h-1 z M11,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z M18,8 h2 v1 h-2 z M10,9 h1 v1 h-1 z M12,9 h1 v1 h-1 z M16,9 h4 v1 h-4 z M11,10 h1 v1 h-1 z M16,10 h3 v1 h-3 z M17,11 h2 v1 h-2 z M14,12 h5 v2 h-5 z M11,13 h2 v1 h-2 z M10,14 h6 v1 h-6 z M9,15 h2 v1 h-2 z M13,15 h2 v1 h-2 z M9,16 h1 v1 h-1 z M14,16 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M9,0 h1 v1 h-1 z M9,1 h2 v1 h-2 z M8,2 h3 v1 h-3 z M5,3 h5 v1 h-5 z M5,4 h4 v1 h-4 z M5,5 h2 v2 h-2 z M4,7 h2 v1 h-2 z M4,8 h1 v1 h-1 z" fill="#ffb74d" />
    <path d="M10,3 h1 v1 h-1 z M13,3 h1 v1 h-1 z M10,4 h4 v1 h-4 z M7,5 h10 v1 h-10 z M8,6 h3 v1 h-3 z M13,6 h3 v1 h-3 z M8,7 h2 v1 h-2 z M14,7 h2 v1 h-2 z M6,8 h3 v1 h-3 z M15,8 h3 v1 h-3 z M8,9 h2 v1 h-2 z M14,9 h2 v1 h-2 z M8,10 h3 v1 h-3 z M13,10 h3 v1 h-3 z M7,11 h10 v1 h-10 z M10,12 h4 v1 h-4 z M10,13 h1 v1 h-1 z M13,13 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M12,6 h1 v1 h-1 z M11,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M10,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M14,8 h1 v1 h-1 z M11,9 h1 v1 h-1 z M13,9 h1 v1 h-1 z M12,10 h1 v1 h-1 z" fill="#ffeb3b" />
  </svg>
));

const LavenderSprite = React.memo(() => (
  <svg viewBox="0 0 20 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Stem & leaves */}
    <path d="M9,19 h1 v21 h-1 z" fill="#4caf50" />
    <path d="M10,18 h1 v22 h-1 z M7,24 h1 v1 h-1 z M6,25 h2 v1 h-2 z M5,26 h2 v1 h-2 z M5,27 h1 v1 h-1 z M12,29 h1 v1 h-1 z M12,30 h2 v1 h-2 z M13,31 h2 v1 h-2 z M14,32 h1 v1 h-1 z" fill="#388e3c" />
    {/* Flower spike */}
    <path d="M9,0 h1 v2 h-1 z M8,2 h1 v2 h-1 z M10,2 h1 v2 h-1 z M7,4 h1 v2 h-1 z M9,4 h1 v2 h-1 z M11,4 h1 v2 h-1 z M6,6 h1 v1 h-1 z M8,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z M12,6 h1 v1 h-1 z M7,7 h1 v1 h-1 z M9,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M6,8 h1 v1 h-1 z M8,8 h1 v1 h-1 z M10,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M5,9 h1 v1 h-1 z M7,9 h1 v1 h-1 z M9,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z M13,9 h1 v1 h-1 z M6,10 h1 v3 h-1 z M8,10 h1 v3 h-1 z M10,10 h1 v3 h-1 z M12,10 h1 v3 h-1 z M7,13 h1 v3 h-1 z M9,13 h1 v3 h-1 z M11,13 h1 v3 h-1 z M8,16 h1 v2 h-1 z M10,16 h1 v2 h-1 z" fill="#ab47bc" />
    <path d="M10,1 h1 v1 h-1 z M9,2 h1 v2 h-1 z M11,3 h1 v1 h-1 z M8,4 h1 v2 h-1 z M10,4 h1 v2 h-1 z M12,5 h1 v1 h-1 z M7,6 h1 v1 h-1 z M9,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z M6,7 h1 v1 h-1 z M8,7 h1 v1 h-1 z M10,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M7,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z M11,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z M6,9 h1 v1 h-1 z M8,9 h1 v1 h-1 z M10,9 h1 v1 h-1 z M12,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M7,10 h1 v3 h-1 z M9,10 h1 v3 h-1 z M11,10 h1 v3 h-1 z M13,10 h1 v2 h-1 z M6,13 h1 v1 h-1 z M8,13 h1 v3 h-1 z M10,13 h1 v3 h-1 z M12,13 h1 v2 h-1 z M7,16 h1 v1 h-1 z M9,16 h1 v3 h-1 z M11,16 h1 v1 h-1 z" fill="#8e24aa" />
    <path d="M8,1 h1 v1 h-1 z M7,3 h1 v1 h-1 z M6,5 h1 v1 h-1 z M5,8 h1 v1 h-1 z M5,11 h1 v1 h-1 z M6,14 h1 v1 h-1 z" fill="#ce93d8" />
  </svg>
));

const GrassSprite = React.memo(() => (
  <svg viewBox="0 0 20 16" className="w-full h-full opacity-60 drop-shadow-sm" shapeRendering="crispEdges">
    {/* Blades */}
    <path d="M3,0 h1 v1 h-1 z M14,0 h1 v1 h-1 z M8,1 h1 v1 h-1 z M11,2 h1 v1 h-1 z M5,4 h1 v1 h-1 z M18,5 h1 v1 h-1 z" fill="#81c784" />
    <path d="M3,1 h1 v1 h-1 z M14,1 h1 v1 h-1 z M2,2 h1 v3 h-1 z M8,2 h1 v5 h-1 z M15,2 h1 v2 h-1 z M11,3 h1 v3 h-1 z M16,4 h1 v4 h-1 z M1,5 h1 v4 h-1 z M5,5 h1 v5 h-1 z M12,6 h1 v6 h-1 z M18,6 h1 v3 h-1 z M9,7 h1 v8 h-1 z M15,8 h1 v4 h-1 z M2,9 h1 v3 h-1 z M17,9 h1 v3 h-1 z M6,10 h1 v4 h-1 z M3,12 h1 v2 h-1 z M13,12 h2 v2 h-2 z M16,12 h1 v2 h-1 z M4,14 h2 v1 h-2 z M7,14 h1 v1 h-1 z M13,14 h1 v1 h-1 z M15,14 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M4,15 h12 v1 h-12 z" fill="#43a047" />
  </svg>
));

const ChickenSprite = React.memo(() => (
  <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Feathers */}
    <path d="M14,2 h5 v1 h-5 z M13,3 h6 v1 h-6 z M13,4 h3 v1 h-3 z M17,4 h2 v1 h-2 z M13,5 h6 v2 h-6 z M2,6 h1 v1 h-1 z M1,7 h2 v1 h-2 z M7,7 h12 v1 h-12 z M1,8 h17 v1 h-17 z M2,9 h14 v1 h-14 z M17,9 h1 v1 h-1 z M3,10 h7 v2 h-7 z M11,10 h4 v2 h-4 z M16,10 h1 v3 h-1 z M4,12 h7 v1 h-7 z M4,13 h13 v1 h-13 z" fill="#ffffff" />
    <path d="M16,9 h1 v1 h-1 z M10,10 h1 v2 h-1 z M15,10 h1 v2 h-1 z M11,12 h5 v1 h-5 z M5,14 h11 v1 h-11 z M6,15 h9 v1 h-9 z" fill="#e0e0e0" />
    {/* Comb, wattle, beak & legs */}
    <path d="M15,0 h2 v1 h-2 z M14,1 h4 v1 h-4 z M18,8 h1 v2 h-1 z" fill="#e53935" />
    <path d="M19,4 h1 v2 h-1 z M7,16 h2 v3 h-2 z M12,16 h2 v3 h-2 z M6,19 h4 v1 h-4 z M11,19 h4 v1 h-4 z" fill="#fbc02d" />
    {/* Eye */}
    <path d="M16,4 h1 v1 h-1 z" fill="#212121" />
  </svg>
));

const RoosterSprite = React.memo(() => (
  <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Body */}
    <path d="M6,13 h10 v1 h-10 z M20,13 h1 v1 h-1 z M6,14 h16 v1 h-16 z M6,15 h3 v2 h-3 z M15,15 h7 v1 h-7 z M10,16 h5 v1 h-5 z M16,16 h6 v1 h-6 z M7,17 h3 v1 h-3 z M11,17 h5 v1 h-5 z M17,17 h5 v2 h-5 z M7,18 h4 v1 h-4 z M8,19 h13 v1 h-13 z" fill="#8d6e63" />
    <path d="M16,3 h6 v2 h-6 z M16,5 h2 v2 h-2 z M20,5 h2 v2 h-2 z M16,7 h6 v1 h-6 z M16,8 h5 v1 h-5 z M16,9 h4 v1 h-4 z M16,10 h3 v1 h-3 z M16,11 h2 v1 h-2 z M7,12 h5 v1 h-5 z M17,12 h2 v1 h-2 z" fill="#a1887f" />
    <path d="M9,15 h6 v1 h-6 z M9,16 h1 v1 h-1 z M15,16 h1 v1 h-1 z M10,17 h1 v1 h-1 z M16,17 h1 v1 h-1 z M11,18 h6 v1 h-6 z M21,19 h1 v1 h-1 z M9,20 h12 v1 h-12 z" fill="#6d4c41" />
    {/* Hackles */}
    <path d="M15,8 h1 v1 h-1 z M14,9 h2 v1 h-2 z M13,10 h3 v1 h-3 z M12,11 h4 v1 h-4 z M12,12 h5 v1 h-5 z M16,13 h4 v1 h-4 z" fill="#f9a825" />
    {/* Comb, wattle & beak */}
    <path d="M18,0 h1 v1 h-1 z M20,0 h1 v1 h-1 z M17,1 h5 v2 h-5 z M19,10 h1 v1 h-1 z M19,11 h2 v1 h-2 z M20,12 h1 v1 h-1 z" fill="#e53935" />
    {/* Tail */}
    <path d="M2,0 h1 v1 h-1 z M1,1 h2 v1 h-2 z M0,2 h3 v1 h-3 z M5,2 h1 v1 h-1 z M0,3 h1 v2 h-1 z M2,3 h1 v1 h-1 z M4,3 h2 v1 h-2 z M2,4 h4 v1 h-4 z M1,5 h4 v2 h-4 z M6,5 h2 v1 h-2 z M7,6 h2 v1 h-2 z M2,7 h4 v2 h-4 z M8,7 h2 v4 h-2 z M3,9 h3 v1 h-3 z M4,10 h3 v1 h-3 z M5,11 h3 v1 h-3 z M9,11 h2 v1 h-2 z" fill="#1e88e5" />
    <path d="M1,3 h1 v2 h-1 z M0,5 h1 v2 h-1 z M1,7 h1 v2 h-1 z M6,8 h1 v2 h-1 z M2,9 h1 v1 h-1 z M2,10 h2 v1 h-2 z M7,10 h1 v1 h-1 z M3,11 h2 v1 h-2 z M8,11 h1 v1 h-1 z M4,12 h3 v1 h-3 z M5,13 h1 v1 h-1 z" fill="#1565c0" />
    <path d="M5,5 h1 v1 h-1 z M5,6 h2 v1 h-2 z M6,7 h2 v1 h-2 z M7,8 h1 v2 h-1 z" fill="#43a047" />
    {/* Legs */}
    <path d="M22,5 h1 v1 h-1 z M22,6 h2 v1 h-2 z M10,21 h2 v2 h-2 z M15,21 h2 v2 h-2 z M9,23 h4 v1 h-4 z M14,23 h4 v1 h-4 z" fill="#fbc02d" />
    {/* Eye */}
    <path d="M19,5 h1 v1 h-1 z M18,6 h2 v1 h-2 z" fill="#212121" />
    <path d="M18,5 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

const ChickSprite = React.memo(() => (
  <svg viewBox="0 0 12 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fluff */}
    <path d="M4,1 h1 v1 h-1 z M3,2 h1 v1 h-1 z M2,3 h1 v1 h-1 z" fill="#fff59d" />
    <path d="M5,0 h4 v1 h-4 z M5,1 h5 v1 h-5 z M4,2 h7 v1 h-7 z M3,3 h4 v1 h-4 z M8,3 h2 v1 h-2 z M2,4 h9 v2 h-9 z M2,6 h2 v2 h-2 z M7,6 h4 v1 h-4 z M5,7 h2 v1 h-2 z M8,7 h2 v1 h-2 z M3,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M4,6 h3 v1 h-3 z M4,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M10,7 h1 v2 h-1 z M4,8 h5 v1 h-5 z M4,9 h6 v1 h-6 z" fill="#fdd835" />
    {/* Beak & legs */}
    <path d="M10,3 h1 v1 h-1 z M11,4 h1 v1 h-1 z M5,10 h1 v1 h-1 z M8,10 h1 v1 h-1 z M4,11 h2 v1 h-2 z M7,11 h2 v1 h-2 z" fill="#f57f17" />
    {/* Eye */}
    <path d="M7,3 h1 v1 h-1 z" fill="#212121" />
  </svg>
));

const BeeSprite = React.memo(() => (
  <svg viewBox="0 0 8 8" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M2,4 h4 v2 h-4 z" fill="#ffeb3b" />
    <path d="M3,4 h1 v2 h-1 z M5,4 h1 v2 h-1 z" fill="#212121" />
    <path d="M3,2 h2 v2 h-2 z" fill="#ffffff" opacity="0.8"/> 
  </svg>
));

const SheepSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fleece */}
    <path d="M26,3 h4 v1 h-4 z M25,4 h6 v1 h-6 z M11,5 h7 v1 h-7 z M26,5 h4 v1 h-4 z M10,6 h9 v1 h-9 z M8,7 h13 v1 h-13 z M5,8 h17 v1 h-17 z M4,9 h20 v1 h-20 z M4,10 h7 v1 h-7 z M12,10 h12 v1 h-12 z M3,11 h21 v1 h-21 z M4,12 h13 v1 h-13 z M18,12 h6 v1 h-6 z M3,13 h21 v1 h-21 z M3,14 h5 v1 h-5 z M9,14 h12 v1 h-12 z M22,14 h2 v1 h-2 z M2,15 h26 v1 h-26 z M3,16 h11 v1 h-11 z M15,16 h12 v1 h-12 z M3,17 h1 v1 h-1 z M26,17 h1 v1 h-1 z" fill="#f5f5f5" />
    <path d="M11,10 h1 v1 h-1 z M17,12 h1 v1 h-1 z M8,14 h1 v1 h-1 z M21,14 h1 v1 h-1 z M14,16 h1 v1 h-1 z M4,17 h22 v2 h-22 z M4,19 h3 v1 h-3 z M10,19 h2 v1 h-2 z M15,19 h4 v1 h-4 z M22,19 h2 v1 h-2 z" fill="#e0e0e0" />
    {/* Face & legs */}
    <path d="M25,5 h1 v1 h-1 z M24,6 h7 v1 h-7 z M25,7 h6 v1 h-6 z M25,8 h2 v1 h-2 z M29,8 h2 v1 h-2 z M24,9 h3 v1 h-3 z M28,9 h4 v1 h-4 z M24,10 h8 v3 h-8 z M7,19 h2 v5 h-2 z M12,19 h2 v5 h-2 z M19,19 h2 v5 h-2 z M24,19 h2 v5 h-2 z" fill="#212121" />
    <path d="M22,7 h3 v2 h-3 z M24,13 h7 v2 h-7 z M9,19 h1 v5 h-1 z M14,19 h1 v5 h-1 z M21,19 h1 v5 h-1 z M26,19 h1 v5 h-1 z" fill="#424242" />
    <path d="M27,8 h2 v1 h-2 z M27,9 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

const GoatSprite = React.memo(() => (
  <svg viewBox="0 0 32 28" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Coat */}
    <path d="M5,7 h16 v2 h-16 z M5,9 h17 v1 h-17 z" fill="#f5f5f5" />
    <path d="M23,5 h1 v1 h-1 z M26,5 h2 v1 h-2 z M22,6 h8 v1 h-8 z M2,7 h1 v1 h-1 z M23,7 h7 v1 h-7 z M3,8 h2 v2 h-2 z M23,8 h2 v1 h-2 z M27,8 h3 v2 h-3 z M22,9 h3 v1 h-3 z M4,10 h23 v4 h-23 z M4,14 h26 v1 h-26 z M4,15 h20 v2 h-20 z" fill="#e0e0e0" />
    <path d="M21,7 h2 v2 h-2 z M27,10 h5 v1 h-5 z M27,11 h4 v1 h-4 z M27,12 h5 v2 h-5 z M26,15 h2 v3 h-2 z M4,17 h20 v3 h-20 z M27,18 h1 v1 h-1 z M6,20 h3 v6 h-3 z M11,20 h3 v6 h-3 z M17,20 h3 v6 h-3 z M22,20 h3 v6 h-3 z" fill="#bdbdbd" />
    {/* Horns & hooves */}
    <path d="M25,2 h1 v1 h-1 z M28,2 h1 v1 h-1 z M24,3 h2 v3 h-2 z M28,3 h2 v3 h-2 z M31,11 h1 v1 h-1 z M6,26 h3 v2 h-3 z M11,26 h3 v2 h-3 z M17,26 h3 v2 h-3 z M22,26 h3 v2 h-3 z" fill="#9e9e9e" />
    {/* Eye */}
    <path d="M26,8 h1 v1 h-1 z M25,9 h2 v1 h-2 z" fill="#212121" />
    <path d="M25,8 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

const PondSprite = React.memo(() => (
  <svg viewBox="0 0 80 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Water */}
    <path d="M31,3 h18 v1 h-18 z M25,4 h1 v1 h-1 z M54,4 h1 v1 h-1 z M21,5 h1 v1 h-1 z M58,5 h1 v1 h-1 z M18,6 h1 v1 h-1 z M61,6 h1 v1 h-1 z M16,7 h1 v1 h-1 z M63,7 h1 v1 h-1 z M13,8 h1 v1 h-1 z M66,8 h1 v1 h-1 z M12,9 h1 v1 h-1 z M67,9 h1 v1 h-1 z M10,10 h1 v1 h-1 z M9,11 h1 v1 h-1 z M8,12 h1 v1 h-1 z M71,12 h1 v1 h-1 z M7,13 h1 v1 h-1 z M72,13 h1 v1 h-1 z M6,14 h1 v1 h-1 z M5,15 h1 v2 h-1 z M4,17 h1 v6 h-1 z M75,18 h1 v5 h-1 z M5,23 h1 v2 h-1 z M6,25 h1 v1 h-1 z M73,25 h1 v1 h-1 z M7,26 h1 v1 h-1 z M72,26 h1 v1 h-1 z M8,27 h1 v1 h-1 z M71,27 h1 v1 h-1 z M9,28 h1 v1 h-1 z M10,29 h1 v1 h-1 z M69,29 h1 v1 h-1 z M12,30 h1 v1 h-1 z M67,30 h1 v1 h-1 z M13,31 h1 v1 h-1 z M16,32 h1 v1 h-1 z M63,32 h1 v1 h-1 z M18,33 h1 v1 h-1 z M61,33 h1 v1 h-1 z M21,34 h1 v1 h-1 z M58,34 h1 v1 h-1 z M25,35 h1 v1 h-1 z M54,35 h1 v1 h-1 z M31,36 h18 v1 h-18 z" fill="#0288d1" />
    <path d="M26,4 h28 v1 h-28 z M22,5 h36 v1 h-36 z M19,6 h2 v1 h-2 z M43,6 h18 v1 h-18 z M17,7 h2 v1 h-2 z M37,7 h26 v1 h-26 z M14,8 h2 v1 h-2 z M30,8 h36 v1 h-36 z M13,9 h2 v1 h-2 z M25,9 h41 v1 h-41 z M11,10 h54 v1 h-54 z M68,10 h1 v2 h-1 z M10,11 h55 v1 h-55 z M9,12 h56 v1 h-56 z M68,12 h2 v3 h-2 z M8,13 h57 v1 h-57 z M71,13 h1 v1 h-1 z M7,14 h23 v1 h-23 z M40,14 h25 v1 h-25 z M71,14 h2 v4 h-2 z M6,15 h60 v2 h-60 z M67,15 h3 v5 h-3 z M5,17 h15 v1 h-15 z M21,17 h45 v1 h-45 z M5,18 h14 v1 h-14 z M22,18 h44 v1 h-44 z M71,18 h3 v7 h-3 z M5,19 h15 v1 h-15 z M21,19 h45 v1 h-45 z M5,20 h8 v3 h-8 z M68,20 h2 v3 h-2 z M6,23 h8 v2 h-8 z M67,23 h3 v6 h-3 z M7,25 h8 v1 h-8 z M71,25 h2 v1 h-2 z M8,26 h8 v1 h-8 z M65,26 h1 v1 h-1 z M71,26 h1 v1 h-1 z M9,27 h8 v1 h-8 z M64,27 h2 v1 h-2 z M10,28 h8 v1 h-8 z M63,28 h3 v1 h-3 z M11,29 h8 v1 h-8 z M62,29 h4 v1 h-4 z M67,29 h2 v1 h-2 z M13,30 h8 v1 h-8 z M60,30 h6 v1 h-6 z M14,31 h8 v1 h-8 z M59,31 h7 v1 h-7 z M17,32 h8 v1 h-8 z M56,32 h7 v1 h-7 z M19,33 h8 v1 h-8 z M54,33 h7 v1 h-7 z M22,34 h36 v1 h-36 z M26,35 h28 v1 h-28 z" fill="#4fc3f7" />
    <path d="M13,20 h5 v1 h-5 z M22,20 h28 v1 h-28 z M55,20 h11 v1 h-11 z M67,20 h1 v3 h-1 z M13,21 h4 v2 h-4 z M23,21 h26 v2 h-26 z M56,21 h10 v3 h-10 z M20,22 h1 v1 h-1 z M14,23 h4 v1 h-4 z M23,23 h27 v1 h-27 z M53,23 h1 v1 h-1 z M14,24 h37 v1 h-37 z M54,24 h12 v1 h-12 z M15,25 h51 v1 h-51 z M16,26 h49 v1 h-49 z M17,27 h47 v1 h-47 z M18,28 h45 v1 h-45 z M19,29 h43 v1 h-43 z M21,30 h31 v1 h-31 z M59,30 h1 v1 h-1 z M22,31 h37 v1 h-37 z M25,32 h31 v1 h-31 z M27,33 h27 v1 h-27 z" fill="#29b6f6" />
    <path d="M21,6 h22 v1 h-22 z M19,7 h18 v1 h-18 z M16,8 h14 v1 h-14 z M15,9 h10 v1 h-10 z" fill="#81d4fa" />
    <path d="M30,14 h10 v1 h-10 z M52,30 h7 v1 h-7 z" fill="#e1f5fe" />
    {/* Lily pads & cattails */}
    <path d="M18,20 h4 v1 h-4 z M50,20 h5 v1 h-5 z M17,21 h1 v1 h-1 z M19,21 h4 v1 h-4 z M49,21 h1 v1 h-1 z M51,21 h5 v1 h-5 z M17,22 h3 v1 h-3 z M21,22 h2 v1 h-2 z M49,22 h5 v1 h-5 z M55,22 h1 v1 h-1 z M18,23 h5 v1 h-5 z M50,23 h3 v1 h-3 z M54,23 h2 v1 h-2 z M51,24 h3 v1 h-3 z" fill="#4caf50" />
    <path d="M18,21 h1 v1 h-1 z M50,21 h1 v1 h-1 z M54,22 h1 v1 h-1 z" fill="#81c784" />
    <path d="M20,17 h1 v1 h-1 z M19,18 h1 v1 h-1 z M21,18 h1 v1 h-1 z M20,19 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M20,18 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M70,6 h1 v1 h-1 z M66,9 h1 v1 h-1 z M70,12 h1 v23 h-1 z M74,12 h1 v1 h-1 z M66,15 h1 v20 h-1 z M74,18 h1 v17 h-1 z" fill="#558b2f" />
    <path d="M69,7 h3 v5 h-3 z M65,10 h3 v5 h-3 z M73,13 h3 v5 h-3 z" fill="#5d4037" />
    {/* Ripples */}
    <g className="animate-pond-ripple-1">
      <path d="M42,24 h4 v1 h-4 z M41,25 h1 v1 h-1 z M46,25 h1 v1 h-1 z M42,26 h4 v1 h-4 z" fill="#e1f5fe" opacity="0.7" />
    </g>
    <g className="animate-pond-ripple-2">
      <path d="M58,11 h4 v1 h-4 z M57,12 h1 v1 h-1 z M62,12 h1 v1 h-1 z M58,13 h4 v1 h-4 z" fill="#e1f5fe" opacity="0.7" />
    </g>
    <g className="animate-pond-ripple-3">
      <path d="M16,30 h4 v1 h-4 z M15,31 h1 v1 h-1 z M20,31 h1 v1 h-1 z M16,32 h4 v1 h-4 z" fill="#e1f5fe" opacity="0.7" />
    </g>
  </svg>
));

const FrogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <g className="frog-sit">
      {/* Frog */}
      <path d="M9,12 h14 v2 h-14 z" fill="#66bb6a" />
      <path d="M10,8 h4 v1 h-4 z M18,8 h4 v1 h-4 z M10,9 h1 v2 h-1 z M13,9 h1 v2 h-1 z M18,9 h1 v2 h-1 z M21,9 h1 v2 h-1 z M9,11 h14 v1 h-14 z M8,12 h1 v2 h-1 z M23,12 h1 v2 h-1 z M8,14 h6 v1 h-6 z M15,14 h9 v1 h-9 z M8,15 h10 v1 h-10 z M19,15 h5 v1 h-5 z M9,16 h3 v1 h-3 z M20,16 h3 v1 h-3 z M9,17 h1 v3 h-1 z M22,17 h1 v3 h-1 z" fill="#4caf50" />
      <path d="M14,14 h1 v1 h-1 z M18,15 h1 v1 h-1 z M5,16 h4 v3 h-4 z M12,16 h8 v1 h-8 z M23,16 h4 v3 h-4 z" fill="#388e3c" />
      <path d="M3,19 h6 v1 h-6 z M23,19 h6 v1 h-6 z" fill="#2e7d32" />
      <path d="M10,17 h12 v3 h-12 z" fill="#c5e1a5" />
      <path d="M11,9 h2 v1 h-2 z M19,9 h2 v1 h-2 z M11,10 h1 v1 h-1 z M20,10 h1 v1 h-1 z" fill="#ffffff" />
      <path d="M12,10 h1 v1 h-1 z M19,10 h1 v1 h-1 z" fill="#212121" />
    </g>
    <g className="frog-leap">
      {/* Frog */}
      <path d="M9,8 h14 v2 h-14 z" fill="#66bb6a" />
      <path d="M9,4 h4 v1 h-4 z M17,4 h4 v1 h-4 z M9,5 h1 v2 h-1 z M12,5 h1 v2 h-1 z M17,5 h1 v2 h-1 z M20,5 h1 v2 h-1 z M9,7 h14 v1 h-14 z M8,8 h1 v2 h-1 z M23,8 h1 v2 h-1 z M8,10 h16 v2 h-16 z M9,12 h3 v1 h-3 z M20,12 h4 v1 h-4 z M9,13 h1 v1 h-1 z M22,13 h2 v3 h-2 z M8,14 h2 v2 h-2 z" fill="#4caf50" />
      <path d="M7,12 h2 v1 h-2 z M12,12 h8 v1 h-8 z M6,13 h3 v1 h-3 z M24,13 h2 v1 h-2 z M5,14 h3 v1 h-3 z M24,14 h3 v1 h-3 z M4,15 h3 v1 h-3 z M25,15 h3 v1 h-3 z M3,16 h3 v1 h-3 z M26,16 h3 v1 h-3 z M4,17 h1 v1 h-1 z M27,17 h3 v1 h-3 z" fill="#388e3c" />
      <path d="M0,17 h4 v2 h-4 z M28,18 h4 v2 h-4 z" fill="#2e7d32" />
      <path d="M10,13 h12 v3 h-12 z" fill="#c5e1a5" />
      <path d="M10,5 h2 v1 h-2 z M18,5 h2 v1 h-2 z M10,6 h1 v1 h-1 z M19,6 h1 v1 h-1 z" fill="#ffffff" />
      <path d="M11,6 h1 v1 h-1 z M18,6 h1 v1 h-1 z" fill="#212121" />
    </g>
  </svg>
));

const RabbitSprite = React.memo(() => (
  <svg viewBox="0 0 40 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fur */}
    <path d="M24,2 h1 v1 h-1 z M24,9 h7 v1 h-7 z M7,13 h13 v1 h-13 z M7,14 h15 v2 h-15 z" fill="#bdbdbd" />
    <path d="M25,2 h3 v1 h-3 z M24,3 h1 v6 h-1 z M27,3 h1 v6 h-1 z M20,4 h1 v1 h-1 z M24,10 h8 v2 h-8 z M24,12 h4 v2 h-4 z M30,12 h2 v2 h-2 z M6,14 h1 v2 h-1 z M22,14 h2 v2 h-2 z M6,16 h18 v3 h-18 z M6,19 h2 v5 h-2 z M22,19 h2 v3 h-2 z M7,24 h1 v2 h-1 z M22,26 h4 v4 h-4 z" fill="#9e9e9e" />
    <path d="M21,4 h3 v1 h-3 z M20,5 h1 v7 h-1 z M23,5 h1 v7 h-1 z M20,12 h4 v2 h-4 z M3,24 h4 v3 h-4 z M8,26 h4 v4 h-4 z M5,27 h2 v1 h-2 z" fill="#757575" />
    <path d="M28,12 h1 v1 h-1 z M24,14 h8 v1 h-8 z M24,15 h7 v1 h-7 z M3,16 h3 v1 h-3 z M24,16 h8 v6 h-8 z M2,17 h4 v1 h-4 z M1,18 h5 v4 h-5 z M8,19 h14 v3 h-14 z M2,22 h4 v1 h-4 z M8,22 h18 v4 h-18 z M3,23 h1 v1 h-1 z M5,23 h1 v1 h-1 z M2,27 h3 v2 h-3 z M8,30 h5 v2 h-5 z M22,30 h5 v2 h-5 z" fill="#ffffff" />
    <path d="M4,23 h1 v1 h-1 z" fill="#e0e0e0" />
    {/* Ears & nose */}
    <path d="M25,3 h2 v6 h-2 z M21,5 h2 v7 h-2 z M31,15 h1 v1 h-1 z M32,16 h2 v1 h-2 z" fill="#f48fb1" />
    {/* Eye */}
    <path d="M29,12 h1 v1 h-1 z M28,13 h2 v1 h-2 z" fill="#212121" />
  </svg>
));

const CatSprite = React.memo(() => (
  <svg viewBox="0 0 28 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fur */}
    <path d="M1,3 h2 v1 h-2 z M22,4 h4 v1 h-4 z M20,5 h3 v2 h-3 z M25,5 h3 v2 h-3 z M20,7 h2 v2 h-2 z M24,7 h2 v2 h-2 z M5,9 h3 v1 h-3 z M10,9 h3 v4 h-3 z M15,9 h3 v4 h-3 z M20,9 h8 v1 h-8 z M4,10 h4 v3 h-4 z M20,10 h4 v3 h-4 z M4,13 h24 v1 h-24 z M4,14 h18 v2 h-18 z M4,16 h2 v2 h-2 z M20,16 h2 v2 h-2 z M6,18 h3 v5 h-3 z M11,18 h3 v5 h-3 z M17,18 h3 v5 h-3 z M21,18 h3 v5 h-3 z" fill="#ffb74d" />
    <path d="M20,1 h1 v1 h-1 z M27,1 h1 v1 h-1 z M20,2 h2 v1 h-2 z M26,2 h2 v1 h-2 z M20,3 h1 v1 h-1 z M27,3 h1 v1 h-1 z M1,4 h1 v3 h-1 z M20,4 h2 v1 h-2 z M26,4 h2 v1 h-2 z M23,5 h2 v2 h-2 z M2,7 h1 v3 h-1 z M8,9 h2 v4 h-2 z M13,9 h2 v4 h-2 z M18,9 h2 v4 h-2 z M3,10 h1 v2 h-1 z" fill="#fb8c00" />
    <path d="M24,10 h1 v1 h-1 z M26,10 h2 v1 h-2 z M24,11 h4 v2 h-4 z M6,16 h14 v2 h-14 z M6,23 h3 v1 h-3 z M11,23 h3 v1 h-3 z M17,23 h3 v1 h-3 z M21,23 h3 v1 h-3 z" fill="#ffe0b2" />
    {/* Ears & nose */}
    <path d="M21,3 h1 v1 h-1 z M26,3 h1 v1 h-1 z M25,10 h1 v1 h-1 z" fill="#f48fb1" />
    {/* Eyes */}
    <path d="M22,7 h2 v1 h-2 z M26,7 h2 v1 h-2 z M22,8 h1 v1 h-1 z M26,8 h1 v1 h-1 z" fill="#43a047" />
    <path d="M23,8 h1 v1 h-1 z M27,8 h1 v1 h-1 z" fill="#212121" />
  </svg>
));

const DogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fur */}
    <path d="M5,8 h17 v1 h-17 z M27,8 h3 v2 h-3 z M5,9 h16 v1 h-16 z M27,10 h5 v2 h-5 z M27,12 h1 v1 h-1 z M31,12 h1 v1 h-1 z" fill="#a1887f" />
    <path d="M23,2 h8 v1 h-8 z M22,3 h10 v1 h-10 z M25,4 h7 v1 h-7 z M25,5 h1 v2 h-1 z M28,5 h4 v2 h-4 z M5,7 h17 v1 h-17 z M25,7 h7 v1 h-7 z M4,8 h1 v2 h-1 z M25,8 h2 v4 h-2 z M4,10 h17 v6 h-17 z M22,12 h1 v1 h-1 z M24,12 h3 v1 h-3 z M22,13 h7 v1 h-7 z M30,13 h2 v1 h-2 z M6,18 h4 v5 h-4 z M12,18 h4 v5 h-4 z M18,18 h4 v5 h-4 z M23,18 h4 v5 h-4 z" fill="#8d6e63" />
    <path d="M1,4 h2 v2 h-2 z M22,4 h3 v8 h-3 z M2,6 h1 v3 h-1 z M3,9 h1 v2 h-1 z M23,12 h1 v1 h-1 z M28,12 h3 v1 h-3 z M4,16 h17 v1 h-17 z M4,17 h20 v1 h-20 z M6,23 h4 v1 h-4 z M12,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M23,23 h4 v1 h-4 z" fill="#5d4037" />
    {/* Collar */}
    <path d="M21,9 h1 v5 h-1 z M21,14 h3 v3 h-3 z" fill="#e53935" />
    {/* Face */}
    <path d="M27,5 h1 v1 h-1 z M26,6 h2 v1 h-2 z M30,8 h2 v2 h-2 z" fill="#212121" />
    <path d="M26,5 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M29,13 h1 v1 h-1 z" fill="#f48fb1" />
  </svg>
));

const SkeletonCowSprite = React.memo(() => (
  <svg viewBox="0 0 48 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M3,4 h8 v1 h-8 z M2,5 h10 v2 h-10 z M2,7 h2 v2 h-2 z M6,7 h2 v2 h-2 z M10,7 h2 v1 h-2 z M10,8 h34 v1 h-34 z M2,9 h10 v2 h-10 z M15,10 h1 v9 h-1 z M19,10 h1 v9 h-1 z M23,10 h1 v9 h-1 z M27,10 h1 v9 h-1 z M31,10 h1 v9 h-1 z M35,10 h1 v9 h-1 z M38,10 h6 v4 h-6 z M2,11 h5 v1 h-5 z M8,11 h4 v1 h-4 z M2,12 h10 v2 h-10 z M2,14 h1 v1 h-1 z M4,14 h1 v1 h-1 z M6,14 h1 v1 h-1 z M8,14 h1 v1 h-1 z M10,14 h2 v1 h-2 z M9,23 h1 v8 h-1 z M17,23 h1 v8 h-1 z M33,23 h1 v8 h-1 z M41,23 h1 v8 h-1 z" fill="#ffffff" />
    <path d="M12,9 h32 v1 h-32 z M44,10 h1 v1 h-1 z M45,12 h1 v1 h-1 z M3,14 h1 v1 h-1 z M5,14 h1 v1 h-1 z M7,14 h1 v1 h-1 z M9,14 h1 v1 h-1 z M38,14 h6 v1 h-6 z M45,14 h1 v1 h-1 z M2,15 h10 v1 h-10 z M46,16 h1 v1 h-1 z M46,18 h1 v1 h-1 z M16,19 h1 v1 h-1 z M20,19 h1 v1 h-1 z M24,19 h1 v1 h-1 z M28,19 h1 v1 h-1 z M32,19 h1 v1 h-1 z M36,19 h1 v1 h-1 z M12,20 h32 v1 h-32 z M8,22 h4 v1 h-4 z M16,22 h4 v1 h-4 z M32,22 h4 v1 h-4 z M40,22 h4 v1 h-4 z M10,23 h1 v8 h-1 z M18,23 h1 v8 h-1 z M34,23 h1 v8 h-1 z M42,23 h1 v8 h-1 z M8,31 h4 v1 h-4 z M16,31 h4 v1 h-4 z M32,31 h4 v1 h-4 z M40,31 h4 v1 h-4 z" fill="#e0e0e0" />
    <path d="M3,2 h2 v2 h-2 z M9,2 h2 v2 h-2 z" fill="#9e9e9e" />
    {/* Eye sockets */}
    <path d="M4,7 h2 v2 h-2 z M8,7 h2 v2 h-2 z M7,11 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

const SkeletonPigSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M24,6 h7 v1 h-7 z M23,7 h9 v1 h-9 z M4,8 h21 v1 h-21 z M27,8 h2 v2 h-2 z M31,8 h1 v2 h-1 z M23,9 h2 v1 h-2 z M6,10 h1 v6 h-1 z M9,10 h1 v6 h-1 z M12,10 h1 v6 h-1 z M15,10 h1 v6 h-1 z M18,10 h1 v6 h-1 z M21,10 h1 v6 h-1 z M23,10 h9 v2 h-9 z M23,12 h7 v1 h-7 z M31,12 h1 v1 h-1 z M23,13 h9 v1 h-9 z M23,14 h1 v1 h-1 z M25,14 h1 v1 h-1 z M27,14 h1 v1 h-1 z M29,14 h3 v1 h-3 z M5,18 h1 v5 h-1 z M11,18 h1 v5 h-1 z M19,18 h1 v5 h-1 z M25,18 h1 v5 h-1 z" fill="#ffffff" />
    <path d="M2,9 h1 v1 h-1 z M4,9 h19 v1 h-19 z M1,10 h1 v1 h-1 z M2,11 h1 v1 h-1 z M24,14 h1 v1 h-1 z M26,14 h1 v1 h-1 z M28,14 h1 v1 h-1 z M23,15 h9 v1 h-9 z M4,16 h22 v1 h-22 z M4,17 h4 v1 h-4 z M10,17 h4 v1 h-4 z M18,17 h4 v1 h-4 z M24,17 h4 v1 h-4 z M6,18 h1 v5 h-1 z M12,18 h1 v5 h-1 z M20,18 h1 v5 h-1 z M26,18 h1 v5 h-1 z M4,23 h4 v1 h-4 z M10,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M24,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M25,8 h2 v2 h-2 z M29,8 h2 v2 h-2 z M30,12 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

const SkeletonSheepSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M25,5 h6 v1 h-6 z M24,6 h8 v1 h-8 z M5,7 h21 v1 h-21 z M28,7 h4 v1 h-4 z M24,8 h2 v1 h-2 z M28,8 h1 v1 h-1 z M31,8 h1 v2 h-1 z M7,9 h1 v6 h-1 z M10,9 h1 v6 h-1 z M13,9 h1 v6 h-1 z M16,9 h1 v6 h-1 z M19,9 h1 v6 h-1 z M22,9 h1 v6 h-1 z M24,9 h5 v1 h-5 z M24,10 h8 v2 h-8 z M24,12 h6 v1 h-6 z M31,12 h1 v1 h-1 z M24,13 h8 v1 h-8 z M7,17 h1 v6 h-1 z M12,17 h1 v6 h-1 z M19,17 h1 v6 h-1 z M24,17 h1 v6 h-1 z" fill="#ffffff" />
    <path d="M3,8 h1 v1 h-1 z M5,8 h19 v1 h-19 z M2,10 h1 v1 h-1 z M24,14 h8 v1 h-8 z M5,15 h22 v1 h-22 z M6,16 h4 v1 h-4 z M11,16 h4 v1 h-4 z M18,16 h4 v1 h-4 z M23,16 h4 v1 h-4 z M8,17 h1 v6 h-1 z M13,17 h1 v6 h-1 z M20,17 h1 v6 h-1 z M25,17 h1 v6 h-1 z M6,23 h4 v1 h-4 z M11,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M23,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M26,7 h2 v2 h-2 z M29,8 h2 v2 h-2 z M30,12 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

const SkeletonGoatSprite = React.memo(() => (
  <svg viewBox="0 0 32 28" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M23,6 h8 v1 h-8 z M22,7 h10 v1 h-10 z M5,8 h20 v1 h-20 z M27,8 h5 v1 h-5 z M22,9 h3 v1 h-3 z M27,9 h2 v1 h-2 z M31,9 h1 v2 h-1 z M7,10 h1 v7 h-1 z M10,10 h1 v7 h-1 z M13,10 h1 v7 h-1 z M16,10 h1 v7 h-1 z M19,10 h1 v7 h-1 z M22,10 h7 v1 h-7 z M22,11 h10 v1 h-10 z M22,12 h8 v1 h-8 z M31,12 h1 v1 h-1 z M22,13 h10 v1 h-10 z M6,19 h1 v8 h-1 z M11,19 h1 v8 h-1 z M17,19 h1 v8 h-1 z M22,19 h1 v8 h-1 z" fill="#ffffff" />
    <path d="M2,7 h1 v1 h-1 z M3,8 h1 v1 h-1 z M5,9 h17 v1 h-17 z M22,14 h10 v1 h-10 z M26,15 h2 v3 h-2 z M5,17 h20 v1 h-20 z M5,18 h4 v1 h-4 z M10,18 h4 v1 h-4 z M16,18 h4 v1 h-4 z M21,18 h4 v1 h-4 z M7,19 h1 v8 h-1 z M12,19 h1 v8 h-1 z M18,19 h1 v8 h-1 z M23,19 h1 v8 h-1 z M5,27 h4 v1 h-4 z M10,27 h4 v1 h-4 z M16,27 h4 v1 h-4 z M21,27 h4 v1 h-4 z" fill="#e0e0e0" />
    <path d="M24,2 h2 v4 h-2 z M28,2 h2 v4 h-2 z" fill="#9e9e9e" />
    {/* Eye sockets */}
    <path d="M25,8 h2 v2 h-2 z M29,9 h2 v2 h-2 z M30,12 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

const SkeletonChickenSprite = React.memo(() => (
  <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M14,3 h4 v1 h-4 z M13,4 h6 v1 h-6 z M13,5 h2 v2 h-2 z M17,5 h2 v2 h-2 z M13,7 h6 v1 h-6 z M4,9 h10 v1 h-10 z M6,11 h1 v3 h-1 z M9,11 h1 v3 h-1 z M12,11 h1 v3 h-1 z M7,16 h1 v3 h-1 z M12,16 h1 v3 h-1 z" fill="#ffffff" />
    <path d="M1,6 h1 v1 h-1 z M19,6 h1 v1 h-1 z M2,7 h1 v1 h-1 z M13,8 h6 v1 h-6 z M2,9 h1 v1 h-1 z M4,10 h10 v1 h-10 z M4,14 h10 v1 h-10 z M6,15 h4 v1 h-4 z M11,15 h4 v1 h-4 z M8,16 h1 v3 h-1 z M13,16 h1 v3 h-1 z M6,19 h4 v1 h-4 z M11,19 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M15,5 h2 v2 h-2 z" fill="#000000" />
  </svg>
));

const SkeletonRoosterSprite = React.memo(() => (
  <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M17,6 h5 v1 h-5 z M16,7 h7 v1 h-7 z M16,8 h2 v2 h-2 z M20,8 h3 v2 h-3 z M16,10 h7 v2 h-7 z M6,12 h10 v1 h-10 z M8,14 h1 v4 h-1 z M11,14 h1 v4 h-1 z M14,14 h1 v4 h-1 z M10,20 h1 v3 h-1 z M15,20 h1 v3 h-1 z" fill="#ffffff" />
    <path d="M17,3 h4 v2 h-4 z M2,4 h1 v1 h-1 z M1,5 h1 v1 h-1 z M3,6 h1 v1 h-1 z M2,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M3,9 h1 v1 h-1 z M23,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M4,11 h1 v1 h-1 z M16,12 h7 v1 h-7 z M6,13 h11 v1 h-11 z M6,18 h10 v1 h-10 z M9,19 h4 v1 h-4 z M14,19 h4 v1 h-4 z M11,20 h1 v3 h-1 z M16,20 h1 v3 h-1 z M9,23 h4 v1 h-4 z M14,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M18,8 h2 v2 h-2 z" fill="#000000" />
  </svg>
));

const SkeletonChickSprite = React.memo(() => (
  <svg viewBox="0 0 12 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M4,3 h5 v1 h-5 z M3,4 h7 v1 h-7 z M3,5 h4 v2 h-4 z M9,5 h1 v2 h-1 z M3,7 h7 v1 h-7 z" fill="#ffffff" />
    <path d="M10,6 h1 v1 h-1 z M3,8 h7 v1 h-7 z M3,9 h2 v1 h-2 z M3,10 h7 v2 h-7 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M7,5 h2 v2 h-2 z" fill="#000000" />
  </svg>
));

const SkeletonCatSprite = React.memo(() => (
  <svg viewBox="0 0 28 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M20,2 h2 v3 h-2 z M26,2 h2 v3 h-2 z M21,5 h6 v1 h-6 z M20,6 h8 v1 h-8 z M20,7 h2 v2 h-2 z M24,7 h2 v2 h-2 z M4,9 h24 v1 h-24 z M20,10 h5 v1 h-5 z M26,10 h2 v1 h-2 z M6,11 h1 v4 h-1 z M9,11 h1 v4 h-1 z M12,11 h1 v4 h-1 z M15,11 h1 v4 h-1 z M18,11 h1 v4 h-1 z M20,11 h8 v1 h-8 z M7,17 h1 v6 h-1 z M12,17 h1 v6 h-1 z M18,17 h1 v6 h-1 z M22,17 h1 v6 h-1 z" fill="#ffffff" />
    <path d="M1,4 h1 v1 h-1 z M2,6 h1 v1 h-1 z M2,8 h1 v1 h-1 z M3,10 h17 v1 h-17 z M20,12 h8 v1 h-8 z M4,15 h18 v1 h-18 z M6,16 h9 v1 h-9 z M16,16 h9 v1 h-9 z M8,17 h1 v6 h-1 z M13,17 h1 v6 h-1 z M19,17 h1 v6 h-1 z M23,17 h1 v6 h-1 z M6,23 h4 v1 h-4 z M11,23 h4 v1 h-4 z M17,23 h8 v1 h-8 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M22,7 h2 v2 h-2 z M26,7 h2 v2 h-2 z M25,10 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

const SkeletonDogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M23,3 h8 v1 h-8 z M24,4 h8 v1 h-8 z M24,5 h1 v2 h-1 z M27,5 h5 v1 h-5 z M27,6 h2 v1 h-2 z M31,6 h1 v2 h-1 z M24,7 h5 v1 h-5 z M4,8 h18 v1 h-18 z M24,8 h8 v1 h-8 z M24,9 h6 v1 h-6 z M31,9 h1 v1 h-1 z M6,10 h1 v5 h-1 z M9,10 h1 v5 h-1 z M12,10 h1 v5 h-1 z M15,10 h1 v5 h-1 z M18,10 h1 v5 h-1 z M21,10 h1 v1 h-1 z M24,10 h8 v1 h-8 z M21,11 h11 v1 h-11 z M21,12 h1 v3 h-1 z M7,17 h1 v6 h-1 z M13,17 h1 v6 h-1 z M19,17 h1 v6 h-1 z M24,17 h1 v6 h-1 z" fill="#ffffff" />
    <path d="M1,4 h1 v1 h-1 z M22,4 h2 v5 h-2 z M2,5 h1 v1 h-1 z M2,7 h1 v1 h-1 z M3,9 h21 v1 h-21 z M22,10 h2 v1 h-2 z M22,12 h10 v1 h-10 z M4,15 h20 v1 h-20 z M6,16 h5 v1 h-5 z M12,16 h5 v1 h-5 z M18,16 h9 v1 h-9 z M8,17 h1 v6 h-1 z M14,17 h1 v6 h-1 z M20,17 h1 v6 h-1 z M25,17 h1 v6 h-1 z M6,23 h4 v1 h-4 z M12,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M23,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M25,5 h2 v2 h-2 z M29,6 h2 v2 h-2 z M30,9 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

const SkeletonFrogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <g className="frog-sit">
      {/* Bones */}
      <path d="M10,8 h4 v1 h-4 z M18,8 h4 v1 h-4 z M10,9 h1 v2 h-1 z M13,9 h1 v2 h-1 z M18,9 h1 v2 h-1 z M21,9 h1 v2 h-1 z M10,11 h4 v1 h-4 z M18,11 h4 v1 h-4 z M8,12 h16 v1 h-16 z M10,14 h1 v4 h-1 z M13,14 h1 v4 h-1 z M16,14 h1 v4 h-1 z M19,14 h1 v4 h-1 z M22,14 h1 v2 h-1 z M5,16 h4 v2 h-4 z M22,16 h5 v2 h-5 z" fill="#ffffff" />
      <path d="M8,13 h16 v1 h-16 z M11,18 h1 v1 h-1 z M14,18 h1 v1 h-1 z M17,18 h1 v1 h-1 z M20,18 h1 v1 h-1 z M23,18 h1 v1 h-1 z M3,19 h6 v1 h-6 z M23,19 h6 v1 h-6 z" fill="#e0e0e0" />
      {/* Eye sockets */}
      <path d="M11,9 h2 v2 h-2 z M19,9 h2 v2 h-2 z" fill="#000000" />
    </g>
    <g className="frog-leap">
      {/* Bones */}
      <path d="M10,4 h4 v1 h-4 z M18,4 h4 v1 h-4 z M10,5 h1 v2 h-1 z M13,5 h1 v2 h-1 z M18,5 h1 v2 h-1 z M21,5 h1 v2 h-1 z M10,7 h4 v1 h-4 z M18,7 h4 v1 h-4 z M8,8 h16 v1 h-16 z M10,10 h1 v4 h-1 z M13,10 h1 v4 h-1 z M16,10 h1 v4 h-1 z M19,10 h1 v4 h-1 z M22,10 h1 v4 h-1 z M7,12 h2 v1 h-2 z M6,13 h2 v1 h-2 z M24,13 h2 v1 h-2 z M5,14 h2 v1 h-2 z M25,14 h2 v1 h-2 z M4,15 h2 v1 h-2 z M26,15 h2 v1 h-2 z M3,16 h2 v1 h-2 z M27,16 h2 v1 h-2 z M28,17 h2 v1 h-2 z" fill="#ffffff" />
      <path d="M8,9 h16 v1 h-16 z M11,14 h1 v1 h-1 z M14,14 h1 v1 h-1 z M17,14 h1 v1 h-1 z M20,14 h1 v1 h-1 z M23,14 h1 v1 h-1 z M0,17 h4 v1 h-4 z M28,18 h4 v1 h-4 z" fill="#e0e0e0" />
      {/* Eye sockets */}
      <path d="M11,5 h2 v2 h-2 z M19,5 h2 v2 h-2 z" fill="#000000" />
    </g>
  </svg>
));

const LocustSprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Wing */}
    <path d="M4,0 h4 v1 h-4 z M3,1 h6 v1 h-6 z M2,2 h9 v1 h-9 z M2,3 h11 v1 h-11 z M3,4 h11 v1 h-11 z" fill="#d7ccc8" opacity="0.8" />
    {/* Body & legs */}
    <path d="M2,5 h10 v1 h-10 z M1,6 h13 v1 h-13 z M1,7 h14 v1 h-14 z M4,8 h10 v1 h-10 z" fill="#5d4037" />
    <path d="M12,5 h2 v1 h-2 z M1,8 h3 v1 h-3 z M14,8 h1 v1 h-1 z M4,9 h1 v1 h-1 z M7,9 h1 v2 h-1 z M10,9 h1 v3 h-1 z M13,9 h1 v1 h-1 z M3,10 h1 v2 h-1 z M14,10 h1 v2 h-1 z M6,11 h1 v1 h-1 z M2,12 h1 v1 h-1 z M6,12 h2 v1 h-2 z M11,12 h1 v1 h-1 z M15,12 h1 v1 h-1 z" fill="#4e342e" />
    <path d="M1,5 h1 v1 h-1 z M0,6 h1 v2 h-1 z" fill="#8d6e63" />
    <path d="M14,6 h1 v1 h-1 z" fill="#d84315" />
  </svg>
));

const BareTreeSprite = React.memo(() => (
  <svg viewBox="0 0 32 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead tree */}
    <path d="M14,17 h1 v2 h-1 z M13,19 h1 v6 h-1 z M12,25 h1 v10 h-1 z M11,35 h1 v1 h-1 z M10,36 h1 v1 h-1 z M9,37 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M18,0 h1 v2 h-1 z M10,1 h1 v1 h-1 z M11,2 h1 v2 h-1 z M17,2 h1 v4 h-1 z M28,2 h1 v2 h-1 z M12,4 h1 v2 h-1 z M27,4 h1 v2 h-1 z M22,5 h1 v2 h-1 z M13,6 h1 v2 h-1 z M16,6 h2 v3 h-2 z M26,6 h1 v2 h-1 z M23,7 h1 v2 h-1 z M14,8 h1 v1 h-1 z M25,8 h2 v1 h-2 z M14,9 h4 v1 h-4 z M24,9 h2 v2 h-2 z M15,10 h3 v3 h-3 z M24,11 h1 v1 h-1 z M23,12 h2 v1 h-2 z M14,13 h4 v4 h-4 z M22,13 h2 v1 h-2 z M4,14 h1 v2 h-1 z M21,14 h2 v1 h-2 z M8,15 h1 v2 h-1 z M20,15 h2 v1 h-2 z M5,16 h1 v2 h-1 z M19,16 h3 v1 h-3 z M7,17 h1 v1 h-1 z M15,17 h3 v2 h-3 z M19,17 h2 v2 h-2 z M6,18 h2 v2 h-2 z M14,19 h4 v6 h-4 z M19,19 h1 v1 h-1 z M7,20 h2 v1 h-2 z M8,21 h2 v1 h-2 z M9,22 h2 v1 h-2 z M10,23 h3 v1 h-3 z M11,24 h2 v1 h-2 z M13,25 h5 v10 h-5 z M12,35 h6 v1 h-6 z M11,36 h7 v1 h-7 z M10,37 h8 v1 h-8 z" fill="#4e342e" />
    <path d="M18,17 h1 v21 h-1 z M8,38 h11 v1 h-11 z" fill="#3e2723" />
  </svg>
));

const WiltedSunflowerSprite = React.memo(() => (
  <svg viewBox="0 0 24 48" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M12,18 h2 v3 h-2 z M11,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M9,23 h1 v1 h-1 z M8,24 h1 v1 h-1 z M7,25 h1 v2 h-1 z M8,27 h1 v2 h-1 z M9,29 h1 v2 h-1 z M10,31 h1 v2 h-1 z M11,33 h1 v15 h-1 z" fill="#5d4037" />
    <path d="M12,21 h1 v1 h-1 z M11,22 h1 v1 h-1 z M10,23 h1 v1 h-1 z M9,24 h1 v1 h-1 z M8,25 h1 v2 h-1 z M9,27 h1 v2 h-1 z M10,29 h1 v2 h-1 z M11,31 h1 v2 h-1 z M12,33 h1 v9 h-1 z M5,36 h2 v1 h-2 z M4,37 h3 v1 h-3 z M3,38 h7 v1 h-7 z M5,39 h4 v1 h-4 z M14,40 h2 v1 h-2 z M14,41 h3 v1 h-3 z M12,42 h7 v1 h-7 z M12,43 h1 v5 h-1 z M14,43 h3 v1 h-3 z" fill="#4e342e" />
    {/* Drooping head */}
    <path d="M2,14 h8 v1 h-8 z M1,15 h2 v1 h-2 z M9,15 h2 v1 h-2 z M0,16 h2 v1 h-2 z M10,16 h2 v1 h-2 z M0,17 h1 v2 h-1 z M11,17 h1 v2 h-1 z M0,19 h2 v1 h-2 z M10,19 h2 v1 h-2 z M1,20 h2 v1 h-2 z M9,20 h2 v1 h-2 z M2,21 h9 v1 h-9 z M2,22 h1 v2 h-1 z M4,22 h1 v1 h-1 z M7,22 h1 v1 h-1 z M9,22 h1 v1 h-1 z M5,23 h1 v1 h-1 z M8,23 h1 v1 h-1 z M7,24 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M3,15 h1 v1 h-1 z M8,15 h1 v1 h-1 z M2,16 h1 v1 h-1 z M9,16 h1 v1 h-1 z M1,17 h1 v2 h-1 z M10,17 h1 v2 h-1 z M2,19 h1 v1 h-1 z M9,19 h1 v1 h-1 z M3,20 h1 v1 h-1 z M8,20 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M4,15 h4 v1 h-4 z M3,16 h6 v1 h-6 z M2,17 h8 v2 h-8 z M3,19 h6 v1 h-6 z M4,20 h4 v1 h-4 z" fill="#3e2723" />
  </svg>
));

const WiltedZinniaSprite = React.memo(() => (
  <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M9,9 h2 v2 h-2 z M9,11 h1 v2 h-1 z M8,13 h1 v1 h-1 z M9,14 h1 v1 h-1 z M10,15 h1 v1 h-1 z M11,16 h1 v16 h-1 z" fill="#5d4037" />
    <path d="M10,11 h1 v2 h-1 z M9,13 h1 v1 h-1 z M10,14 h1 v1 h-1 z M11,15 h1 v1 h-1 z M12,16 h1 v9 h-1 z M5,20 h2 v1 h-2 z M4,21 h7 v1 h-7 z M6,22 h3 v1 h-3 z M14,24 h2 v1 h-2 z M12,25 h7 v1 h-7 z M12,26 h1 v6 h-1 z M14,26 h3 v1 h-3 z" fill="#4e342e" />
    {/* Drooping head */}
    <path d="M2,6 h6 v1 h-6 z M1,7 h1 v3 h-1 z M8,7 h1 v3 h-1 z M2,10 h6 v1 h-6 z M2,11 h1 v1 h-1 z M4,11 h1 v1 h-1 z M7,11 h1 v2 h-1 z" fill="#8d6e63" />
    <path d="M2,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M2,9 h1 v1 h-1 z M7,9 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M3,7 h4 v1 h-4 z M2,8 h6 v1 h-6 z M3,9 h4 v1 h-4 z" fill="#3e2723" />
  </svg>
));

const WiltedMarigoldSprite = React.memo(() => (
  <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M13,9 h2 v2 h-2 z M13,11 h1 v3 h-1 z M12,14 h1 v2 h-1 z M11,16 h1 v16 h-1 z" fill="#5d4037" />
    <path d="M14,11 h1 v3 h-1 z M13,14 h1 v2 h-1 z M12,16 h1 v5 h-1 z M14,20 h2 v1 h-2 z M12,21 h8 v1 h-8 z M12,22 h1 v10 h-1 z M15,22 h3 v1 h-3 z M5,24 h2 v1 h-2 z M4,25 h6 v1 h-6 z M6,26 h3 v1 h-3 z" fill="#4e342e" />
    {/* Drooping head */}
    <path d="M16,6 h6 v1 h-6 z M15,7 h1 v3 h-1 z M22,7 h1 v3 h-1 z M16,10 h6 v1 h-6 z M16,11 h1 v1 h-1 z M19,11 h1 v1 h-1 z M21,11 h1 v1 h-1 z M17,12 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M16,7 h1 v1 h-1 z M21,7 h1 v1 h-1 z M16,9 h1 v1 h-1 z M21,9 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M17,7 h4 v1 h-4 z M16,8 h6 v1 h-6 z M17,9 h4 v1 h-4 z" fill="#3e2723" />
  </svg>
));

const WiltedLavenderSprite = React.memo(() => (
  <svg viewBox="0 0 20 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M11,11 h1 v2 h-1 z M10,13 h1 v4 h-1 z M9,17 h1 v23 h-1 z" fill="#5d4037" />
    <path d="M11,13 h1 v4 h-1 z M10,17 h1 v23 h-1 z M6,24 h1 v1 h-1 z M5,25 h2 v2 h-2 z M6,27 h1 v1 h-1 z M12,29 h1 v1 h-1 z M12,30 h2 v1 h-2 z M13,31 h2 v1 h-2 z M14,32 h1 v1 h-1 z" fill="#4e342e" />
    {/* Dead spike */}
    <path d="M15,5 h1 v2 h-1 z M14,7 h1 v2 h-1 z M16,7 h1 v2 h-1 z M13,9 h1 v3 h-1 z M15,9 h1 v3 h-1 z M14,12 h1 v2 h-1 z M16,12 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M15,4 h1 v1 h-1 z M14,5 h1 v2 h-1 z M16,5 h1 v2 h-1 z M13,7 h1 v2 h-1 z M15,7 h1 v2 h-1 z M12,9 h1 v3 h-1 z M14,9 h1 v3 h-1 z M16,9 h1 v3 h-1 z M12,12 h2 v1 h-2 z M15,12 h1 v2 h-1 z M13,13 h1 v1 h-1 z M13,14 h3 v1 h-3 z M14,15 h1 v1 h-1 z" fill="#6d4c41" />
  </svg>
));

const BarnSprite = React.memo(() => (
  <svg viewBox="0 0 48 44" className="w-full h-full drop-shadow-lg" shapeRendering="crispEdges">
    {/* Roof */}
    <path d="M23,0 h2 v1 h-2 z M21,1 h2 v1 h-2 z M20,2 h2 v1 h-2 z M17,4 h2 v1 h-2 z M16,5 h2 v1 h-2 z M15,6 h2 v1 h-2 z M12,8 h2 v1 h-2 z M11,9 h2 v1 h-2 z M9,10 h2 v1 h-2 z M7,12 h2 v1 h-2 z M5,13 h2 v1 h-2 z M4,14 h2 v1 h-2 z M1,16 h2 v1 h-2 z M0,17 h2 v1 h-2 z" fill="#a52a2a" />
    <path d="M23,1 h4 v1 h-4 z M22,2 h6 v1 h-6 z M19,4 h12 v1 h-12 z M18,5 h14 v1 h-14 z M17,6 h3 v1 h-3 z M28,6 h5 v1 h-5 z M14,8 h6 v1 h-6 z M28,8 h8 v1 h-8 z M13,9 h7 v1 h-7 z M28,9 h9 v1 h-9 z M11,10 h9 v1 h-9 z M28,10 h11 v1 h-11 z M9,12 h11 v1 h-11 z M28,12 h13 v1 h-13 z M7,13 h13 v1 h-13 z M28,13 h15 v1 h-15 z M6,14 h38 v1 h-38 z M3,16 h44 v1 h-44 z M2,17 h46 v1 h-46 z" fill="#8b1a1a" />
    <path d="M19,3 h10 v1 h-10 z M13,7 h7 v1 h-7 z M28,7 h7 v1 h-7 z M8,11 h12 v1 h-12 z M28,11 h12 v1 h-12 z M3,15 h42 v1 h-42 z M0,18 h48 v1 h-48 z" fill="#6d1515" />
    {/* Walls & trim */}
    <path d="M6,20 h32 v3 h-32 z M6,24 h1 v3 h-1 z M13,24 h22 v3 h-22 z M6,28 h1 v1 h-1 z M13,28 h2 v1 h-2 z M33,28 h2 v1 h-2 z M6,29 h9 v2 h-9 z M33,29 h5 v2 h-5 z M6,32 h9 v3 h-9 z M33,32 h5 v3 h-5 z M6,36 h9 v3 h-9 z M33,36 h5 v3 h-5 z M6,40 h9 v3 h-9 z M33,40 h5 v3 h-5 z" fill="#c0392b" />
    <path d="M38,20 h4 v3 h-4 z M41,24 h1 v3 h-1 z M41,28 h1 v1 h-1 z M38,29 h4 v2 h-4 z M38,32 h4 v3 h-4 z M38,36 h4 v3 h-4 z M38,40 h4 v3 h-4 z" fill="#922b21" />
    <path d="M6,23 h1 v1 h-1 z M13,23 h22 v1 h-22 z M41,23 h1 v1 h-1 z M6,27 h1 v1 h-1 z M13,27 h2 v1 h-2 z M33,27 h2 v1 h-2 z M41,27 h1 v1 h-1 z M6,31 h9 v1 h-9 z M33,31 h9 v1 h-9 z M6,35 h9 v1 h-9 z M33,35 h9 v1 h-9 z M6,39 h9 v1 h-9 z M33,39 h9 v1 h-9 z" fill="#b03a2e" />
    <path d="M20,6 h8 v1 h-8 z M20,7 h1 v6 h-1 z M27,7 h1 v6 h-1 z M20,13 h8 v1 h-8 z M4,19 h40 v1 h-40 z M4,20 h2 v23 h-2 z M42,20 h2 v23 h-2 z M7,23 h6 v1 h-6 z M35,23 h6 v1 h-6 z M7,24 h1 v2 h-1 z M10,24 h1 v2 h-1 z M12,24 h1 v2 h-1 z M35,24 h1 v2 h-1 z M38,24 h1 v2 h-1 z M40,24 h1 v2 h-1 z M7,26 h6 v1 h-6 z M35,26 h6 v1 h-6 z M7,27 h1 v1 h-1 z M10,27 h1 v1 h-1 z M12,27 h1 v1 h-1 z M15,27 h18 v1 h-18 z M35,27 h1 v1 h-1 z M38,27 h1 v1 h-1 z M40,27 h1 v1 h-1 z M7,28 h6 v1 h-6 z M15,28 h1 v15 h-1 z M23,28 h2 v13 h-2 z M32,28 h1 v15 h-1 z M35,28 h6 v1 h-6 z" fill="#f5f5f5" />
    {/* Windows & hay */}
    <path d="M23,7 h4 v1 h-4 z M21,8 h6 v2 h-6 z M21,10 h1 v1 h-1 z M24,10 h3 v1 h-3 z M9,24 h1 v1 h-1 z M11,24 h1 v2 h-1 z M37,24 h1 v1 h-1 z M39,24 h1 v2 h-1 z M8,25 h2 v1 h-2 z M36,25 h2 v1 h-2 z M8,27 h2 v1 h-2 z M11,27 h1 v1 h-1 z M36,27 h2 v1 h-2 z M39,27 h1 v1 h-1 z" fill="#87ceeb" />
    <path d="M21,7 h2 v1 h-2 z M8,24 h1 v1 h-1 z M36,24 h1 v1 h-1 z" fill="#e1f5fe" />
    <path d="M22,10 h2 v1 h-2 z M21,11 h6 v2 h-6 z" fill="#fdd835" />
    {/* Door */}
    <path d="M16,28 h7 v1 h-7 z M25,28 h7 v1 h-7 z M16,29 h1 v2 h-1 z M18,29 h4 v2 h-4 z M26,29 h4 v2 h-4 z M31,29 h1 v2 h-1 z M16,31 h2 v2 h-2 z M19,31 h2 v2 h-2 z M22,31 h1 v2 h-1 z M25,31 h1 v2 h-1 z M27,31 h2 v2 h-2 z M30,31 h2 v2 h-2 z M16,33 h3 v4 h-3 z M21,33 h2 v4 h-2 z M25,33 h2 v4 h-2 z M29,33 h3 v4 h-3 z M16,37 h2 v2 h-2 z M19,37 h2 v2 h-2 z M22,37 h1 v2 h-1 z M25,37 h1 v2 h-1 z M27,37 h2 v2 h-2 z M30,37 h2 v2 h-2 z M16,39 h1 v2 h-1 z M18,39 h4 v2 h-4 z M26,39 h4 v2 h-4 z M31,39 h1 v2 h-1 z M17,41 h6 v2 h-6 z M25,41 h6 v2 h-6 z" fill="#795548" />
    <path d="M17,29 h1 v2 h-1 z M22,29 h1 v2 h-1 z M25,29 h1 v2 h-1 z M30,29 h1 v2 h-1 z M18,31 h1 v2 h-1 z M21,31 h1 v2 h-1 z M26,31 h1 v2 h-1 z M29,31 h1 v2 h-1 z M19,33 h2 v4 h-2 z M27,33 h2 v4 h-2 z M18,37 h1 v2 h-1 z M21,37 h1 v2 h-1 z M26,37 h1 v2 h-1 z M29,37 h1 v2 h-1 z M17,39 h1 v2 h-1 z M22,39 h1 v2 h-1 z M25,39 h1 v2 h-1 z M30,39 h1 v2 h-1 z M16,41 h1 v2 h-1 z M23,41 h2 v2 h-2 z M31,41 h1 v2 h-1 z M4,43 h40 v1 h-40 z" fill="#5d4037" />
  </svg>
));

const SiloSprite = React.memo(() => (
  <svg viewBox="0 0 20 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Silo */}
    <path d="M6,0 h2 v1 h-2 z M12,0 h2 v1 h-2 z M8,1 h9 v2 h-9 z M7,3 h12 v3 h-12 z M17,6 h1 v2 h-1 z M15,8 h3 v1 h-3 z M17,9 h1 v2 h-1 z M15,11 h3 v1 h-3 z M17,12 h1 v1 h-1 z M2,13 h16 v1 h-16 z M15,14 h3 v1 h-3 z M17,15 h1 v2 h-1 z M15,17 h3 v1 h-3 z M17,18 h1 v2 h-1 z M15,20 h3 v1 h-3 z M17,21 h1 v1 h-1 z M2,22 h16 v1 h-16 z M15,23 h3 v1 h-3 z M17,24 h1 v2 h-1 z M15,26 h3 v1 h-3 z M17,27 h1 v2 h-1 z M15,29 h3 v1 h-3 z M17,30 h1 v1 h-1 z M2,31 h4 v1 h-4 z M12,31 h6 v1 h-6 z M17,32 h1 v8 h-1 z" fill="#9e9e9e" />
    <path d="M3,1 h5 v2 h-5 z M1,3 h6 v3 h-6 z M14,6 h3 v2 h-3 z M14,8 h1 v1 h-1 z M14,9 h3 v2 h-3 z M14,11 h1 v1 h-1 z M14,12 h3 v1 h-3 z M14,14 h1 v1 h-1 z M14,15 h3 v2 h-3 z M14,17 h1 v1 h-1 z M14,18 h3 v2 h-3 z M14,20 h1 v1 h-1 z M14,21 h3 v1 h-3 z M14,23 h1 v1 h-1 z M14,24 h3 v2 h-3 z M14,26 h1 v1 h-1 z M14,27 h3 v2 h-3 z M14,29 h1 v1 h-1 z M14,30 h3 v1 h-3 z M14,32 h3 v8 h-3 z" fill="#bdbdbd" />
    <path d="M8,0 h4 v1 h-4 z M6,6 h8 v7 h-8 z M6,14 h8 v8 h-8 z M6,23 h8 v8 h-8 z M12,32 h2 v8 h-2 z" fill="#e0e0e0" />
    <path d="M2,6 h4 v7 h-4 z M2,14 h4 v8 h-4 z M2,23 h4 v8 h-4 z M2,32 h4 v8 h-4 z" fill="#f5f5f5" />
    {/* Door */}
    <path d="M6,31 h1 v9 h-1 z M9,31 h3 v9 h-3 z" fill="#8d6e63" />
    <path d="M7,31 h2 v9 h-2 z" fill="#a1887f" />
  </svg>
));

const CuttingStationSprite = React.memo(({ isChopping }) => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Table Legs */}
    <path d="M6,16 h4 v14 h-4 z M22,16 h4 v14 h-4 z" fill="#5d4037" />
    <path d="M8,18 h2 v12 h-2 z M24,18 h2 v12 h-2 z" fill="#3e2723" />
    {/* Table Top */}
    <path d="M2,12 h28 v6 h-28 z" fill="#8d6e63" />
    <path d="M2,12 h28 v2 h-28 z" fill="#a1887f" />
    <path d="M2,16 h28 v2 h-28 z" fill="#5d4037" />
    {/* Cutting Board */}
    <path d="M8,9 h16 v3 h-16 z" fill="#ffccaa" />
    <path d="M8,11 h16 v1 h-16 z" fill="#e6b38c" />
    
    {/* Food */}
    <path d="M10,8 h5 v3 h-5 z M15,10 h2 v1 h-2 z M17,9 h2 v2 h-2 z" fill="#4caf50" />
    <path d="M11,9 h2 v1 h-2 z M16,9 h1 v1 h-1 z" fill="#81c784" />
    
    {/* Chopping Knife Animation */}
    {isChopping ? (
       <g className="animate-chop-fast" style={{ transformOrigin: '20px 8px' }}>
          <path d="M16,4 h6 v3 h-6 z" fill="#bdbdbd" />
          <path d="M15,5 h1 v2 h-1 z" fill="#9e9e9e" />
          <path d="M22,4 h4 v3 h-4 z" fill="#212121" />
       </g>
    ) : (
       <g>
          <path d="M18,9 h6 v2 h-6 z" fill="#bdbdbd" />
          <path d="M17,10 h1 v1 h-1 z" fill="#9e9e9e" />
          <path d="M24,9 h4 v2 h-4 z" fill="#212121" />
       </g>
    )}
  </svg>
));

const PrepStationSprite = React.memo(({ isPrepping }) => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Table Legs */}
    <path d="M6,16 h4 v14 h-4 z M22,16 h4 v14 h-4 z" fill="#5d4037" />
    <path d="M8,18 h2 v12 h-2 z M24,18 h2 v12 h-2 z" fill="#3e2723" />
    {/* Table Top */}
    <path d="M2,12 h28 v6 h-28 z" fill="#8d6e63" />
    <path d="M2,12 h28 v2 h-28 z" fill="#a1887f" />
    <path d="M2,16 h28 v2 h-28 z" fill="#5d4037" />

    {/* Tape Dispenser */}
    <g>
      <path d="M19,10 h7 v2 h-7 z" fill="#455a64" />
      <path d="M20,8 h2 v2 h-2 z" fill="#37474f" />
      <path d="M18,4 h6 v4 h-6 z" fill="#eeeeee" />
      <path d="M20,5 h2 v2 h-2 z" fill="#bdbdbd" />
      <path d="M25,8 h1 v2 h-1 z" fill="#9e9e9e" />
    </g>

    {/* Scrap papers on table */}
    <path d="M15,11 h3 v1 h-3 z" fill="#ffffff" opacity="0.8" />
    <path d="M6,10 h4 v2 h-4 z" fill="#fff59d" opacity="0.9" />

    {/* Scissors */}
    <g style={{ transform: 'translate(2px, 0)' }}>
        {/* Top Blade & Handle */}
        <g className={isPrepping ? "animate-snip-top" : ""} style={{ transformOrigin: "11px 9px" }}>
          <path d="M5,6 h4 v3 h-4 z" fill="#ef5350" />
          <path d="M6,7 h2 v1 h-2 z" fill="#a1887f" />
          <path d="M9,8 h6 v1 h-6 z" fill="#e0e0e0" />
        </g>
        {/* Bottom Blade & Handle */}
        <g className={isPrepping ? "animate-snip-bottom" : ""} style={{ transformOrigin: "11px 9px" }}>
          <path d="M5,9 h4 v3 h-4 z" fill="#ef5350" />
          <path d="M6,10 h2 v1 h-2 z" fill="#a1887f" />
          <path d="M9,9 h6 v1 h-6 z" fill="#bdbdbd" />
          <rect x="10.5" y="8.5" width="1" height="1" fill="#424242" />
        </g>
    </g>
  </svg>
));

const CompostBucketSprite = React.memo(() => (
  <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-md" overflow="visible" shapeRendering="crispEdges">
    {/* Smell Lines */}
    <g stroke="#65a30d" strokeWidth="4" fill="none" className="opacity-70">
       <path className="animate-smell-1" d="M15,40 v-5 h-5 v-5 h5 v-5 h-5 v-5 h5 v-10" />
       <path className="animate-smell-2" d="M30,40 v-5 h5 v-5 h-5 v-5 h5 v-5 h-5 v-10" />
       <path className="animate-smell-3" d="M45,40 v-5 h-5 v-5 h5 v-5 h-5 v-5 h5 v-10" />
    </g>
    
    {/* Glitter */}
    <g fill="#facc15">
       <path d="M10,0 h5 v5 h-5 z M5,5 h15 v5 h-15 z M10,10 h5 v5 h-5 z" className="animate-sparkle-1" />
       <path d="M45,10 h5 v5 h-5 z M40,15 h15 v5 h-15 z M45,20 h5 v5 h-5 z" className="animate-sparkle-2" />
       <path d="M25,-5 h5 v5 h-5 z M20,0 h15 v5 h-15 z M25,5 h5 v5 h-5 z" className="animate-sparkle-3" />
    </g>
    {/* Overflowing scraps */}
    <path d="M26,24 h4 v2 h-4 z M22,26 h4 v2 h-4 z M28,26 h2 v2 h-2 z M18,28 h2 v2 h-2 z M22,28 h2 v2 h-2 z M26,28 h4 v2 h-4 z M14,30 h4 v2 h-4 z M20,30 h4 v2 h-4 z M26,30 h6 v2 h-6 z M40,30 h2 v4 h-2 z M14,32 h6 v2 h-6 z M22,32 h2 v2 h-2 z M26,32 h4 v2 h-4 z M34,32 h4 v2 h-4 z M44,32 h2 v2 h-2 z M16,34 h2 v2 h-2 z M20,34 h4 v2 h-4 z M26,34 h6 v2 h-6 z M36,34 h8 v2 h-8 z M16,36 h6 v2 h-6 z M24,36 h4 v2 h-4 z M36,36 h4 v2 h-4 z M42,36 h2 v2 h-2 z M46,36 h2 v2 h-2 z M14,38 h4 v2 h-4 z M20,38 h2 v2 h-2 z M24,38 h6 v2 h-6 z M32,38 h4 v2 h-4 z M38,38 h4 v2 h-4 z M44,38 h6 v2 h-6 z" fill="#7cb342" />
    <path d="M26,26 h2 v2 h-2 z M16,28 h2 v2 h-2 z M24,28 h2 v4 h-2 z M20,32 h2 v2 h-2 z M42,32 h2 v2 h-2 z M24,34 h2 v2 h-2 z M34,34 h2 v2 h-2 z M44,34 h2 v2 h-2 z M28,36 h2 v2 h-2 z M18,38 h2 v2 h-2 z M36,38 h2 v2 h-2 z" fill="#aed581" />
    <path d="M20,28 h2 v2 h-2 z M18,30 h2 v2 h-2 z M38,30 h2 v4 h-2 z M12,32 h2 v2 h-2 z M24,32 h2 v2 h-2 z M18,34 h2 v2 h-2 z M32,34 h2 v2 h-2 z M22,36 h2 v4 h-2 z M34,36 h2 v2 h-2 z M40,36 h2 v2 h-2 z M44,36 h2 v2 h-2 z M10,38 h2 v2 h-2 z M30,38 h2 v2 h-2 z M42,38 h2 v2 h-2 z" fill="#558b2f" />
    <path d="M38,24 h2 v2 h-2 z M36,26 h2 v2 h-2 z M40,26 h2 v2 h-2 z M34,28 h8 v2 h-8 z M34,30 h4 v2 h-4 z M12,34 h2 v2 h-2 z M10,36 h6 v2 h-6 z M12,38 h2 v2 h-2 z" fill="#e53935" />
    <path d="M38,26 h2 v2 h-2 z M14,34 h2 v2 h-2 z" fill="#ff8a80" />
    <path d="M44,26 h2 v2 h-2 z M42,28 h6 v2 h-6 z M32,30 h2 v2 h-2 z M44,30 h4 v2 h-4 z M30,32 h4 v2 h-4 z M30,36 h4 v2 h-4 z" fill="#ffb300" />
    <path d="M42,30 h2 v2 h-2 z" fill="#fb8c00" />
    {/* Bucket */}
    <path d="M6,40 h48 v2 h-48 z" fill="#66bb6a" />
    <path d="M6,42 h48 v2 h-48 z M10,46 h4 v22 h-4 z M12,68 h4 v8 h-4 z M14,76 h2 v8 h-2 z" fill="#4caf50" />
    <path d="M14,46 h8 v22 h-8 z M24,46 h12 v38 h-12 z M38,46 h8 v22 h-8 z M16,68 h6 v16 h-6 z M38,68 h6 v8 h-6 z M38,76 h4 v8 h-4 z" fill="#2e7d32" />
    <path d="M6,44 h48 v2 h-48 z M22,46 h2 v38 h-2 z M36,46 h2 v38 h-2 z M46,46 h4 v22 h-4 z M44,68 h4 v8 h-4 z M42,76 h4 v8 h-4 z M14,84 h32 v2 h-32 z" fill="#1b5e20" />
  </svg>
));

const BrownsBucketSprite = React.memo(() => (
  <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-md" overflow="visible" shapeRendering="crispEdges">
    {/* Leaves, twigs & cardboard */}
    <path d="M28,26 h2 v2 h-2 z M26,28 h2 v2 h-2 z M30,28 h2 v2 h-2 z M24,30 h2 v2 h-2 z M32,30 h2 v2 h-2 z M24,32 h4 v2 h-4 z M30,32 h4 v2 h-4 z M28,34 h4 v2 h-4 z M34,36 h2 v2 h-2 z" fill="#ef6c00" />
    <path d="M28,28 h2 v2 h-2 z M26,30 h6 v2 h-6 z M28,32 h2 v2 h-2 z M34,32 h2 v2 h-2 z M34,34 h10 v2 h-10 z M30,36 h4 v2 h-4 z M36,36 h6 v2 h-6 z M10,38 h4 v2 h-4 z M32,38 h6 v2 h-6 z M40,38 h4 v2 h-4 z" fill="#d84315" />
    <path d="M40,24 h2 v2 h-2 z M38,26 h2 v2 h-2 z M42,26 h2 v2 h-2 z M14,30 h2 v2 h-2 z M36,30 h4 v2 h-4 z M42,30 h4 v2 h-4 z M12,32 h2 v2 h-2 z M16,32 h2 v2 h-2 z M36,32 h8 v2 h-8 z M10,34 h2 v2 h-2 z M16,34 h4 v2 h-4 z M32,34 h2 v2 h-2 z M44,34 h4 v2 h-4 z M10,36 h10 v2 h-10 z M16,38 h2 v2 h-2 z" fill="#f9a825" />
    <path d="M40,26 h2 v2 h-2 z M38,28 h6 v2 h-6 z M40,30 h2 v2 h-2 z M14,32 h2 v2 h-2 z M12,34 h4 v2 h-4 z" fill="#fdd835" />
    <path d="M8,38 h2 v2 h-2 z M14,38 h2 v2 h-2 z M30,38 h2 v2 h-2 z M38,38 h2 v2 h-2 z M44,38 h2 v2 h-2 z M54,38 h2 v2 h-2 z" fill="#bf360c" />
    <path d="M18,24 h2 v4 h-2 z M16,28 h4 v4 h-4 z M46,28 h2 v4 h-2 z M18,32 h2 v2 h-2 z M44,32 h4 v2 h-4 z M20,34 h2 v4 h-2 z" fill="#6d4c41" />
    <path d="M22,34 h6 v2 h-6 z M22,36 h8 v2 h-8 z M42,36 h8 v2 h-8 z M18,38 h12 v2 h-12 z M46,38 h8 v2 h-8 z" fill="#c49a6c" />
    {/* Bucket */}
    <path d="M6,40 h48 v2 h-48 z" fill="#a1887f" />
    <path d="M6,42 h48 v2 h-48 z M10,46 h4 v22 h-4 z M12,68 h4 v8 h-4 z M14,76 h2 v8 h-2 z" fill="#8d6e63" />
    <path d="M14,46 h8 v22 h-8 z M24,46 h12 v38 h-12 z M38,46 h8 v22 h-8 z M16,68 h6 v16 h-6 z M38,68 h6 v8 h-6 z M38,76 h4 v8 h-4 z" fill="#5d4037" />
    <path d="M6,44 h48 v2 h-48 z M22,46 h2 v38 h-2 z M36,46 h2 v38 h-2 z M46,46 h4 v22 h-4 z M44,68 h4 v8 h-4 z M42,76 h4 v8 h-4 z M14,84 h32 v2 h-32 z" fill="#3e2723" />
  </svg>
));

const ComposterSprite = React.memo(({ greens = false, browns = false, wet = false }) => (
  <svg viewBox="0 0 56 56" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Ground shadow */}
    <path d="M3,55 h50 v1 h-50 z" fill="#000000" opacity="0.25" />
    {/* Bin walls (top view of rim) */}
    <path d="M2,1 h52 v54 h-52 z" fill="#3e2723" />
    <path d="M3,2 h50 v4 h-50 z M3,6 h5 v32 h-5 z M48,6 h5 v32 h-5 z" fill="#8d6e63" />
    <path d="M3,2 h50 v1 h-50 z M3,6 h1 v32 h-1 z" fill="#a1887f" />
    <path d="M7,6 h1 v32 h-1 z M48,6 h1 v32 h-1 z M20,3 h1 v3 h-1 z M36,3 h1 v3 h-1 z M4,16 h3 v1 h-3 z M4,27 h3 v1 h-3 z M49,13 h3 v1 h-3 z M49,30 h3 v1 h-3 z" fill="#6d4c41" />
    <path d="M52,6 h1 v32 h-1 z M11,4 h5 v1 h-5 z M26,3 h6 v1 h-6 z M40,4 h4 v1 h-4 z M5,10 h1 v4 h-1 z M5,21 h1 v4 h-1 z M5,32 h1 v3 h-1 z M50,8 h1 v3 h-1 z M50,19 h1 v5 h-1 z M50,34 h1 v3 h-1 z M3,2 h5 v4 h-5 z M48,2 h5 v4 h-5 z" fill="#795548" />
    <path d="M3,2 h5 v1 h-5 z M48,2 h5 v1 h-5 z" fill="#a1887f" />
    <path d="M5,4 h1 v1 h-1 z M50,4 h1 v1 h-1 z" fill="#3e2723" />
    {/* Inside back wall */}
    <path d="M8,6 h40 v6 h-40 z" fill="#5d4037" />
    <path d="M8,6 h40 v1 h-40 z" fill="#3e2723" />
    <path d="M8,9 h40 v1 h-40 z M21,7 h1 v2 h-1 z M35,7 h1 v2 h-1 z M14,10 h1 v2 h-1 z M28,10 h1 v2 h-1 z M42,10 h1 v2 h-1 z" fill="#4e342e" />
    {/* Soil */}
    <path d="M8,12 h40 v26 h-40 z" fill="#4e342e" />
    <path d="M8,12 h40 v2 h-40 z M8,14 h1 v24 h-1 z M17,20 h2 v1 h-2 z M31,17 h1 v1 h-1 z M39,23 h2 v1 h-2 z M13,28 h1 v1 h-1 z M27,30 h2 v1 h-2 z M43,36 h2 v1 h-2 z M21,36 h1 v1 h-1 z M34,29 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M12,17 h2 v1 h-2 z M20,15 h1 v1 h-1 z M27,19 h2 v1 h-2 z M36,16 h1 v1 h-1 z M42,20 h2 v1 h-2 z M15,24 h1 v1 h-1 z M23,27 h2 v1 h-2 z M33,24 h1 v1 h-1 z M40,29 h2 v1 h-2 z M11,31 h2 v1 h-2 z M19,34 h1 v1 h-1 z M29,33 h2 v1 h-2 z M37,35 h1 v1 h-1 z M44,33 h1 v1 h-1 z M25,22 h1 v1 h-1 z M45,25 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M38,31 h2 v1 h-2 z M37,32 h1 v1 h-1 z M40,32 h1 v1 h-1 z M42,32 h1 v1 h-1 z M41,33 h1 v1 h-1 z" fill="#f48fb1" />
    {/* Front wall */}
    <path d="M3,38 h50 v3 h-50 z" fill="#8d6e63" />
    <path d="M3,38 h50 v1 h-50 z" fill="#a1887f" />
    <path d="M3,40 h50 v1 h-50 z" fill="#6d4c41" />
    <path d="M8,42 h40 v3 h-40 z M8,46 h40 v3 h-40 z M8,50 h40 v3 h-40 z M3,38 h5 v3 h-5 z M48,38 h5 v3 h-5 z" fill="#795548" />
    <path d="M8,42 h40 v1 h-40 z M8,46 h40 v1 h-40 z M8,50 h40 v1 h-40 z" fill="#8d6e63" />
    <path d="M8,44 h40 v1 h-40 z M8,48 h40 v1 h-40 z M8,52 h40 v1 h-40 z M15,43 h6 v1 h-6 z M31,43 h8 v1 h-8 z M20,47 h9 v1 h-9 z M36,47 h5 v1 h-5 z M13,51 h7 v1 h-7 z M27,51 h6 v1 h-6 z M39,51 h4 v1 h-4 z M3,41 h5 v13 h-5 z M48,41 h5 v13 h-5 z" fill="#6d4c41" />
    <path d="M10,43 h1 v1 h-1 z M45,43 h1 v1 h-1 z M10,47 h1 v1 h-1 z M45,47 h1 v1 h-1 z M10,51 h1 v1 h-1 z M45,51 h1 v1 h-1 z M5,39 h1 v1 h-1 z M50,39 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M25,43 h2 v1 h-2 z" fill="#4e342e" />
    <path d="M3,41 h1 v13 h-1 z" fill="#8d6e63" />
    <path d="M52,41 h1 v13 h-1 z" fill="#5d4037" />
    <path d="M3,38 h5 v1 h-5 z M48,38 h5 v1 h-5 z" fill="#a1887f" />
    {greens && <>
      {/* Greens (veggie scraps) */}
      <path d="M11,15 h3 v1 h-3 z M10,16 h2 v1 h-2 z M13,16 h2 v1 h-2 z M11,17 h1 v1 h-1 z M13,17 h1 v1 h-1 z M19,19 h3 v1 h-3 z M18,20 h2 v1 h-2 z M21,20 h2 v1 h-2 z M19,21 h1 v1 h-1 z M21,21 h1 v1 h-1 z M13,25 h3 v1 h-3 z M12,26 h2 v1 h-2 z M15,26 h2 v1 h-2 z M13,27 h1 v1 h-1 z M15,27 h1 v1 h-1 z M23,30 h3 v1 h-3 z M22,31 h2 v1 h-2 z M25,31 h2 v1 h-2 z M23,32 h1 v1 h-1 z M25,32 h1 v1 h-1 z M29,16 h3 v1 h-3 z M28,17 h2 v1 h-2 z M31,17 h2 v1 h-2 z M29,18 h1 v1 h-1 z M31,18 h1 v1 h-1 z" fill="#7cb342" />
      <path d="M12,16 h1 v1 h-1 z M20,20 h1 v1 h-1 z M14,26 h1 v1 h-1 z M24,31 h1 v1 h-1 z M30,17 h1 v1 h-1 z M33,27 h1 v1 h-1 z M17,34 h1 v1 h-1 z" fill="#aed581" />
      <path d="M12,17 h1 v1 h-1 z M20,21 h1 v1 h-1 z M14,27 h1 v1 h-1 z M24,32 h1 v1 h-1 z M30,18 h1 v1 h-1 z M33,28 h1 v1 h-1 z M17,35 h1 v1 h-1 z M18,15 h1 v1 h-1 z M26,23 h1 v1 h-1 z M12,20 h1 v1 h-1 z M35,33 h1 v1 h-1 z M28,34 h1 v1 h-1 z" fill="#558b2f" />
      <path d="M32,26 h3 v1 h-3 z M31,27 h2 v1 h-2 z M34,27 h2 v1 h-2 z M32,28 h1 v1 h-1 z M34,28 h1 v1 h-1 z M16,33 h3 v1 h-3 z M15,34 h2 v1 h-2 z M18,34 h2 v1 h-2 z M16,35 h1 v1 h-1 z M18,35 h1 v1 h-1 z" fill="#7cb342" />
      <path d="M17,16 h1 v1 h-1 z M19,16 h1 v1 h-1 z M17,17 h3 v1 h-3 z M25,24 h1 v1 h-1 z M27,24 h1 v1 h-1 z M25,25 h3 v1 h-3 z M11,21 h1 v1 h-1 z M13,21 h1 v1 h-1 z M11,22 h3 v1 h-3 z M34,34 h1 v1 h-1 z M36,34 h1 v1 h-1 z M34,35 h3 v1 h-3 z M27,35 h1 v1 h-1 z M29,35 h1 v1 h-1 z M27,36 h3 v1 h-3 z" fill="#e53935" />
      <path d="M18,16 h1 v1 h-1 z M26,24 h1 v1 h-1 z M12,21 h1 v1 h-1 z M35,34 h1 v1 h-1 z M28,35 h1 v1 h-1 z" fill="#ff8a80" />
      <path d="M22,15 h3 v1 h-3 z M23,16 h3 v1 h-3 z M16,29 h3 v1 h-3 z M17,30 h3 v1 h-3 z M30,21 h3 v1 h-3 z M31,22 h3 v1 h-3 z M10,34 h3 v1 h-3 z M11,35 h3 v1 h-3 z M35,17 h3 v1 h-3 z M36,18 h3 v1 h-3 z" fill="#ffb300" />
    </>}
    {browns && <>
      {/* Browns (leaves, twigs, cardboard) */}
      <path d="M42,14 h1 v1 h-1 z M41,15 h1 v1 h-1 z M43,15 h1 v1 h-1 z M40,16 h1 v1 h-1 z M44,16 h1 v1 h-1 z M41,17 h2 v1 h-2 z M35,20 h1 v1 h-1 z M34,21 h1 v1 h-1 z M36,21 h1 v1 h-1 z M33,22 h1 v1 h-1 z M37,22 h1 v1 h-1 z M34,23 h2 v1 h-2 z M43,26 h1 v1 h-1 z M42,27 h1 v1 h-1 z M44,27 h1 v1 h-1 z M41,28 h1 v1 h-1 z M45,28 h1 v1 h-1 z M42,29 h2 v1 h-2 z M26,26 h1 v1 h-1 z M25,27 h1 v1 h-1 z M27,27 h1 v1 h-1 z M24,28 h1 v1 h-1 z M28,28 h1 v1 h-1 z M25,29 h2 v1 h-2 z" fill="#ef6c00" />
      <path d="M42,15 h1 v1 h-1 z M41,16 h3 v1 h-3 z M35,21 h1 v1 h-1 z M34,22 h3 v1 h-3 z M43,27 h1 v1 h-1 z M42,28 h3 v1 h-3 z M26,27 h1 v1 h-1 z M25,28 h3 v1 h-3 z M38,30 h1 v1 h-1 z M37,31 h3 v1 h-3 z M22,23 h1 v1 h-1 z M21,24 h3 v1 h-3 z" fill="#d84315" />
      <path d="M38,29 h1 v1 h-1 z M37,30 h1 v1 h-1 z M39,30 h1 v1 h-1 z M36,31 h1 v1 h-1 z M40,31 h1 v1 h-1 z M37,32 h2 v1 h-2 z M22,22 h1 v1 h-1 z M21,23 h1 v1 h-1 z M23,23 h1 v1 h-1 z M20,24 h1 v1 h-1 z M24,24 h1 v1 h-1 z M21,25 h2 v1 h-2 z" fill="#ef6c00" />
      <path d="M36,14 h2 v1 h-2 z M35,15 h1 v1 h-1 z M38,15 h1 v1 h-1 z M36,16 h2 v1 h-2 z M44,21 h2 v1 h-2 z M43,22 h1 v1 h-1 z M46,22 h1 v1 h-1 z M44,23 h2 v1 h-2 z M30,30 h2 v1 h-2 z M29,31 h1 v1 h-1 z M32,31 h1 v1 h-1 z M30,32 h2 v1 h-2 z M40,34 h2 v1 h-2 z M39,35 h1 v1 h-1 z M42,35 h1 v1 h-1 z M40,36 h2 v1 h-2 z M15,17 h2 v1 h-2 z M14,18 h1 v1 h-1 z M17,18 h1 v1 h-1 z M15,19 h2 v1 h-2 z" fill="#f9a825" />
      <path d="M36,15 h2 v1 h-2 z M44,22 h2 v1 h-2 z M30,31 h2 v1 h-2 z M40,35 h2 v1 h-2 z M15,18 h2 v1 h-2 z" fill="#fdd835" />
      <path d="M40,19 h1 v1 h-1 z M38,20 h6 v1 h-6 z M28,20 h1 v1 h-1 z M26,21 h6 v1 h-6 z M33,35 h1 v1 h-1 z M31,36 h6 v1 h-6 z M14,30 h1 v1 h-1 z M12,31 h6 v1 h-6 z" fill="#a1887f" />
      <path d="M43,30 h4 v1 h-4 z M43,31 h1 v1 h-1 z M46,31 h1 v1 h-1 z M43,32 h4 v1 h-4 z M29,24 h4 v1 h-4 z M29,25 h1 v1 h-1 z M32,25 h1 v1 h-1 z M29,26 h4 v1 h-4 z M19,34 h4 v1 h-4 z M19,35 h1 v1 h-1 z M22,35 h1 v1 h-1 z M19,36 h4 v1 h-4 z" fill="#c49a6c" />
      <path d="M44,31 h2 v1 h-2 z M30,25 h2 v1 h-2 z M20,35 h2 v1 h-2 z" fill="#a67c52" />
    </>}
    {wet && <>
      {/* Water droplets */}
      <path d="M13,18 h2 v1 h-2 z M21,16 h2 v1 h-2 z M30,19 h2 v1 h-2 z M39,17 h2 v1 h-2 z M45,23 h2 v1 h-2 z M16,27 h2 v1 h-2 z M26,29 h2 v1 h-2 z M35,25 h2 v1 h-2 z M42,33 h2 v1 h-2 z M11,35 h2 v1 h-2 z M23,34 h2 v1 h-2 z M32,31 h2 v1 h-2 z" fill="#81d4fa" />
      <path d="M13,19 h1 v1 h-1 z M21,17 h1 v1 h-1 z M30,20 h1 v1 h-1 z M39,18 h1 v1 h-1 z M45,24 h1 v1 h-1 z M16,28 h1 v1 h-1 z M26,30 h1 v1 h-1 z M35,26 h1 v1 h-1 z M42,34 h1 v1 h-1 z M11,36 h1 v1 h-1 z M23,35 h1 v1 h-1 z M32,32 h1 v1 h-1 z" fill="#4fc3f7" />
    </>}
  </svg>
));

const CompactedPlotSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Plot edge */}
    <path d="M0,0 h32 v1 h-32 z M0,1 h1 v30 h-1 z M31,1 h1 v30 h-1 z M0,31 h32 v1 h-32 z" fill="#3e2723" />
    <path d="M30,1 h1 v29 h-1 z M1,30 h30 v1 h-30 z" fill="#4e342e" />
    {/* Hard dry soil */}
    <path d="M1,1 h6 v1 h-6 z M8,1 h1 v1 h-1 z M10,1 h1 v1 h-1 z M13,1 h6 v1 h-6 z M21,1 h3 v1 h-3 z M25,1 h1 v1 h-1 z M27,1 h2 v1 h-2 z M3,2 h4 v1 h-4 z M8,2 h4 v1 h-4 z M15,2 h2 v1 h-2 z M18,2 h1 v1 h-1 z M20,2 h4 v1 h-4 z M28,2 h2 v1 h-2 z M1,3 h1 v1 h-1 z M3,3 h12 v1 h-12 z M16,3 h1 v2 h-1 z M18,3 h3 v1 h-3 z M24,3 h5 v1 h-5 z M2,4 h1 v1 h-1 z M4,4 h5 v1 h-5 z M11,4 h1 v1 h-1 z M13,4 h2 v1 h-2 z M18,4 h1 v1 h-1 z M20,4 h3 v1 h-3 z M24,4 h1 v1 h-1 z M29,4 h1 v1 h-1 z M1,5 h3 v1 h-3 z M6,5 h1 v1 h-1 z M8,5 h5 v1 h-5 z M14,5 h3 v1 h-3 z M18,5 h8 v1 h-8 z M1,6 h4 v1 h-4 z M6,6 h9 v1 h-9 z M16,6 h1 v1 h-1 z M18,6 h1 v1 h-1 z M20,6 h4 v1 h-4 z M27,6 h2 v1 h-2 z M1,7 h2 v1 h-2 z M4,7 h2 v1 h-2 z M7,7 h2 v2 h-2 z M10,7 h6 v2 h-6 z M19,7 h1 v1 h-1 z M21,7 h1 v1 h-1 z M24,7 h6 v1 h-6 z M2,8 h4 v1 h-4 z M17,8 h2 v1 h-2 z M22,8 h2 v1 h-2 z M25,8 h2 v1 h-2 z M28,8 h1 v1 h-1 z M2,9 h1 v1 h-1 z M4,9 h2 v1 h-2 z M8,9 h3 v1 h-3 z M12,9 h3 v1 h-3 z M19,9 h2 v1 h-2 z M23,9 h5 v1 h-5 z M29,9 h1 v1 h-1 z M3,10 h4 v1 h-4 z M10,10 h1 v1 h-1 z M15,10 h1 v1 h-1 z M17,10 h10 v1 h-10 z M28,10 h2 v1 h-2 z M3,11 h6 v1 h-6 z M11,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z M16,11 h1 v1 h-1 z M18,11 h9 v1 h-9 z M3,12 h1 v1 h-1 z M5,12 h1 v1 h-1 z M11,12 h5 v1 h-5 z M17,12 h1 v1 h-1 z M19,12 h4 v1 h-4 z M24,12 h3 v1 h-3 z M2,13 h7 v1 h-7 z M11,13 h1 v1 h-1 z M13,13 h1 v1 h-1 z M15,13 h4 v1 h-4 z M21,13 h2 v1 h-2 z M24,13 h6 v1 h-6 z M1,14 h8 v1 h-8 z M11,14 h7 v1 h-7 z M23,14 h7 v1 h-7 z M1,15 h1 v1 h-1 z M3,15 h3 v1 h-3 z M9,15 h1 v1 h-1 z M12,15 h5 v1 h-5 z M18,15 h4 v1 h-4 z M24,15 h1 v1 h-1 z M28,15 h2 v1 h-2 z M1,16 h5 v1 h-5 z M10,16 h1 v1 h-1 z M12,16 h1 v1 h-1 z M14,16 h1 v1 h-1 z M16,16 h7 v1 h-7 z M25,16 h1 v1 h-1 z M27,16 h3 v1 h-3 z M2,17 h1 v1 h-1 z M4,17 h1 v1 h-1 z M6,17 h5 v1 h-5 z M12,17 h8 v1 h-8 z M21,17 h2 v1 h-2 z M24,17 h4 v1 h-4 z M29,17 h1 v1 h-1 z M1,18 h1 v1 h-1 z M5,18 h5 v1 h-5 z M13,18 h1 v1 h-1 z M15,18 h8 v1 h-8 z M24,18 h6 v1 h-6 z M2,19 h3 v1 h-3 z M6,19 h6 v1 h-6 z M14,19 h2 v1 h-2 z M17,19 h1 v1 h-1 z M19,19 h3 v1 h-3 z M24,19 h2 v1 h-2 z M27,19 h1 v1 h-1 z M29,19 h1 v1 h-1 z M1,20 h8 v1 h-8 z M10,20 h2 v1 h-2 z M13,20 h1 v1 h-1 z M19,20 h1 v1 h-1 z M21,20 h1 v1 h-1 z M23,20 h6 v1 h-6 z M1,21 h2 v1 h-2 z M4,21 h7 v1 h-7 z M13,21 h5 v1 h-5 z M20,21 h2 v1 h-2 z M24,21 h2 v1 h-2 z M27,21 h1 v1 h-1 z M1,22 h7 v1 h-7 z M9,22 h1 v1 h-1 z M12,22 h8 v1 h-8 z M21,22 h1 v1 h-1 z M23,22 h7 v1 h-7 z M2,23 h4 v1 h-4 z M8,23 h3 v1 h-3 z M13,23 h1 v1 h-1 z M15,23 h6 v1 h-6 z M22,23 h4 v1 h-4 z M28,23 h1 v1 h-1 z M1,24 h3 v1 h-3 z M9,24 h1 v1 h-1 z M12,24 h3 v1 h-3 z M17,24 h3 v1 h-3 z M22,24 h1 v1 h-1 z M25,24 h5 v1 h-5 z M1,25 h5 v1 h-5 z M7,25 h1 v1 h-1 z M10,25 h1 v1 h-1 z M12,25 h1 v1 h-1 z M14,25 h1 v1 h-1 z M16,25 h2 v1 h-2 z M19,25 h3 v1 h-3 z M27,25 h3 v3 h-3 z M1,26 h2 v1 h-2 z M4,26 h1 v1 h-1 z M6,26 h4 v1 h-4 z M11,26 h3 v1 h-3 z M15,26 h5 v1 h-5 z M1,27 h3 v1 h-3 z M5,27 h5 v3 h-5 z M12,27 h5 v1 h-5 z M18,27 h6 v1 h-6 z M25,27 h1 v1 h-1 z M1,28 h2 v2 h-2 z M11,28 h3 v1 h-3 z M16,28 h1 v1 h-1 z M18,28 h2 v1 h-2 z M21,28 h4 v1 h-4 z M26,28 h1 v1 h-1 z M28,28 h2 v1 h-2 z M11,29 h2 v1 h-2 z M14,29 h7 v1 h-7 z M22,29 h2 v1 h-2 z M27,29 h1 v1 h-1 z M29,29 h1 v1 h-1 z" fill="#bcaaa4" />
    <path d="M7,1 h1 v2 h-1 z M11,1 h1 v1 h-1 z M19,1 h2 v1 h-2 z M24,1 h1 v2 h-1 z M26,1 h1 v1 h-1 z M29,1 h1 v1 h-1 z M1,2 h2 v1 h-2 z M12,2 h3 v1 h-3 z M27,2 h1 v1 h-1 z M2,3 h1 v1 h-1 z M15,3 h1 v2 h-1 z M21,3 h3 v1 h-3 z M29,3 h1 v1 h-1 z M1,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z M12,4 h1 v1 h-1 z M19,4 h1 v1 h-1 z M23,4 h1 v1 h-1 z M25,4 h3 v1 h-3 z M7,5 h1 v1 h-1 z M13,5 h1 v1 h-1 z M28,5 h2 v1 h-2 z M15,6 h1 v1 h-1 z M26,6 h1 v1 h-1 z M29,6 h1 v1 h-1 z M3,7 h1 v1 h-1 z M9,7 h1 v2 h-1 z M17,7 h1 v1 h-1 z M20,7 h1 v1 h-1 z M1,8 h1 v1 h-1 z M24,8 h1 v1 h-1 z M27,8 h1 v1 h-1 z M29,8 h1 v1 h-1 z M3,9 h1 v1 h-1 z M6,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z M22,9 h1 v1 h-1 z M28,9 h1 v1 h-1 z M2,10 h1 v1 h-1 z M7,10 h1 v1 h-1 z M9,10 h1 v1 h-1 z M27,10 h1 v1 h-1 z M1,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M14,11 h1 v1 h-1 z M1,12 h2 v1 h-2 z M4,12 h1 v1 h-1 z M6,12 h3 v1 h-3 z M10,12 h1 v1 h-1 z M16,12 h1 v1 h-1 z M23,12 h1 v1 h-1 z M1,13 h1 v1 h-1 z M9,13 h1 v2 h-1 z M12,13 h1 v1 h-1 z M14,13 h1 v1 h-1 z M19,14 h2 v1 h-2 z M22,14 h1 v1 h-1 z M2,15 h1 v1 h-1 z M10,15 h1 v1 h-1 z M17,15 h1 v1 h-1 z M25,15 h3 v1 h-3 z M13,16 h1 v1 h-1 z M15,16 h1 v1 h-1 z M26,16 h1 v1 h-1 z M1,17 h1 v1 h-1 z M5,17 h1 v1 h-1 z M20,17 h1 v1 h-1 z M28,17 h1 v1 h-1 z M2,18 h3 v1 h-3 z M5,19 h1 v1 h-1 z M16,19 h1 v1 h-1 z M18,19 h1 v2 h-1 z M23,19 h1 v1 h-1 z M28,19 h1 v1 h-1 z M9,20 h1 v1 h-1 z M20,20 h1 v1 h-1 z M29,20 h1 v2 h-1 z M3,21 h1 v1 h-1 z M11,21 h1 v1 h-1 z M26,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M20,22 h1 v1 h-1 z M1,23 h1 v1 h-1 z M12,23 h1 v1 h-1 z M14,23 h1 v1 h-1 z M26,23 h2 v1 h-2 z M7,24 h2 v1 h-2 z M10,24 h1 v1 h-1 z M15,24 h2 v1 h-2 z M20,24 h1 v1 h-1 z M23,24 h2 v1 h-2 z M6,25 h1 v1 h-1 z M8,25 h1 v1 h-1 z M15,25 h1 v1 h-1 z M18,25 h1 v1 h-1 z M23,25 h1 v1 h-1 z M3,26 h1 v1 h-1 z M14,26 h1 v1 h-1 z M21,26 h2 v1 h-2 z M4,27 h1 v3 h-1 z M11,27 h1 v1 h-1 z M17,27 h1 v2 h-1 z M26,27 h1 v1 h-1 z M14,28 h2 v1 h-2 z M20,28 h1 v1 h-1 z M27,28 h1 v1 h-1 z M10,29 h1 v1 h-1 z M24,29 h2 v1 h-2 z M28,29 h1 v1 h-1 z" fill="#cfc1bb" />
    <path d="M9,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z M19,2 h1 v1 h-1 z M25,2 h2 v1 h-2 z M9,4 h1 v1 h-1 z M5,5 h1 v1 h-1 z M19,6 h1 v1 h-1 z M18,7 h1 v1 h-1 z M1,9 h1 v2 h-1 z M21,9 h1 v1 h-1 z M2,11 h1 v1 h-1 z M15,11 h1 v1 h-1 z M23,13 h1 v1 h-1 z M18,14 h1 v1 h-1 z M23,15 h1 v1 h-1 z M9,16 h1 v1 h-1 z M24,16 h1 v1 h-1 z M3,17 h1 v1 h-1 z M10,18 h2 v1 h-2 z M14,18 h1 v1 h-1 z M1,19 h1 v1 h-1 z M26,19 h1 v1 h-1 z M23,21 h1 v1 h-1 z M28,21 h1 v1 h-1 z M29,23 h1 v1 h-1 z M6,24 h1 v1 h-1 z M9,25 h1 v1 h-1 z M13,25 h1 v1 h-1 z M5,26 h1 v1 h-1 z M20,26 h1 v1 h-1 z M3,28 h1 v2 h-1 z M13,29 h1 v1 h-1 z M21,29 h1 v1 h-1 z" fill="#a89890" />
    {/* Cracks */}
    <path d="M17,2 h1 v5 h-1 z M3,4 h1 v1 h-1 z M28,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M26,5 h2 v1 h-2 z M5,6 h1 v1 h-1 z M24,6 h2 v1 h-2 z M6,7 h1 v2 h-1 z M16,7 h1 v2 h-1 z M22,7 h2 v1 h-2 z M19,8 h3 v1 h-3 z M7,9 h1 v1 h-1 z M15,9 h4 v1 h-4 z M8,10 h1 v1 h-1 z M11,10 h4 v1 h-4 z M16,10 h1 v1 h-1 z M9,11 h2 v1 h-2 z M17,11 h1 v1 h-1 z M9,12 h1 v1 h-1 z M18,12 h1 v1 h-1 z M10,13 h1 v2 h-1 z M19,13 h2 v1 h-2 z M21,14 h1 v1 h-1 z M11,15 h1 v3 h-1 z M22,15 h1 v1 h-1 z M23,16 h1 v3 h-1 z M12,18 h1 v1 h-1 z M12,19 h2 v1 h-2 z M22,19 h1 v4 h-1 z M12,20 h1 v2 h-1 z M14,20 h4 v1 h-4 z M18,21 h2 v1 h-2 z M8,22 h1 v1 h-1 z M11,22 h1 v4 h-1 z M6,23 h2 v1 h-2 z M21,23 h1 v2 h-1 z M4,24 h2 v1 h-2 z M22,25 h1 v1 h-1 z M10,26 h1 v3 h-1 z M23,26 h1 v1 h-1 z M24,27 h1 v1 h-1 z M25,28 h1 v1 h-1 z M26,29 h1 v1 h-1 z" fill="#5d4037" />
    {/* Stones */}
    <path d="M28,11 h2 v1 h-2 z M27,12 h2 v1 h-2 z M7,15 h2 v1 h-2 z M6,16 h2 v1 h-2 z M25,25 h2 v1 h-2 z M24,26 h2 v1 h-2 z" fill="#9e9e9e" />
    <path d="M27,11 h1 v1 h-1 z M6,15 h1 v1 h-1 z M24,25 h1 v1 h-1 z" fill="#bdbdbd" />
    <path d="M29,12 h1 v1 h-1 z M8,16 h1 v1 h-1 z M26,26 h1 v1 h-1 z" fill="#757575" />
  </svg>
));

const ErodingPlotSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Plot edge */}
    <path d="M0,0 h32 v1 h-32 z M0,1 h1 v30 h-1 z M31,1 h1 v19 h-1 z M31,21 h1 v10 h-1 z M0,31 h32 v1 h-32 z" fill="#3e2723" />
    <path d="M30,1 h1 v9 h-1 z M30,11 h1 v17 h-1 z M1,30 h30 v1 h-30 z" fill="#4e342e" />
    {/* Washed soil */}
    <path d="M1,1 h2 v5 h-2 z M5,1 h2 v1 h-2 z M8,1 h1 v1 h-1 z M11,1 h4 v1 h-4 z M17,1 h1 v2 h-1 z M19,1 h2 v2 h-2 z M25,1 h1 v1 h-1 z M27,1 h3 v1 h-3 z M6,2 h3 v1 h-3 z M11,2 h1 v1 h-1 z M13,2 h2 v1 h-2 z M23,2 h6 v1 h-6 z M6,3 h4 v2 h-4 z M13,3 h3 v1 h-3 z M20,3 h2 v1 h-2 z M26,3 h2 v1 h-2 z M29,3 h1 v1 h-1 z M12,4 h3 v1 h-3 z M21,4 h1 v1 h-1 z M24,4 h1 v1 h-1 z M28,4 h2 v2 h-2 z M6,5 h2 v1 h-2 z M9,5 h1 v1 h-1 z M12,5 h4 v2 h-4 z M2,6 h2 v1 h-2 z M6,6 h4 v1 h-4 z M18,6 h4 v1 h-4 z M25,6 h4 v1 h-4 z M2,7 h3 v1 h-3 z M7,7 h4 v2 h-4 z M13,7 h1 v1 h-1 z M15,7 h2 v1 h-2 z M28,7 h2 v1 h-2 z M1,8 h1 v1 h-1 z M3,8 h2 v2 h-2 z M13,8 h3 v1 h-3 z M19,8 h2 v1 h-2 z M26,8 h1 v1 h-1 z M7,9 h3 v1 h-3 z M13,9 h1 v1 h-1 z M15,9 h2 v1 h-2 z M20,9 h2 v1 h-2 z M28,9 h2 v1 h-2 z M1,10 h1 v1 h-1 z M3,10 h3 v2 h-3 z M8,10 h4 v1 h-4 z M14,10 h4 v1 h-4 z M20,10 h4 v2 h-4 z M26,10 h4 v2 h-4 z M9,11 h3 v1 h-3 z M15,11 h1 v1 h-1 z M17,11 h1 v1 h-1 z M1,12 h5 v2 h-5 z M8,12 h4 v2 h-4 z M14,12 h3 v1 h-3 z M21,12 h2 v1 h-2 z M28,12 h1 v1 h-1 z M14,13 h2 v1 h-2 z M17,13 h1 v2 h-1 z M21,13 h3 v1 h-3 z M26,13 h3 v1 h-3 z M1,14 h1 v1 h-1 z M3,14 h4 v1 h-4 z M9,14 h4 v1 h-4 z M15,14 h1 v1 h-1 z M22,14 h3 v1 h-3 z M27,14 h2 v1 h-2 z M2,15 h1 v1 h-1 z M4,15 h3 v1 h-3 z M10,15 h3 v1 h-3 z M16,15 h2 v1 h-2 z M21,15 h3 v1 h-3 z M28,15 h2 v1 h-2 z M1,16 h4 v1 h-4 z M6,16 h1 v1 h-1 z M10,16 h2 v1 h-2 z M15,16 h3 v1 h-3 z M23,16 h2 v1 h-2 z M27,16 h3 v1 h-3 z M2,17 h6 v1 h-6 z M12,17 h1 v1 h-1 z M16,17 h4 v1 h-4 z M22,17 h4 v1 h-4 z M28,17 h2 v1 h-2 z M1,18 h7 v1 h-7 z M10,18 h4 v1 h-4 z M17,18 h3 v1 h-3 z M23,18 h3 v1 h-3 z M28,18 h1 v1 h-1 z M2,19 h4 v1 h-4 z M7,19 h1 v1 h-1 z M11,19 h3 v2 h-3 z M16,19 h2 v1 h-2 z M19,19 h1 v3 h-1 z M24,19 h2 v1 h-2 z M29,19 h1 v1 h-1 z M1,20 h4 v2 h-4 z M16,20 h1 v1 h-1 z M22,20 h3 v1 h-3 z M28,20 h2 v1 h-2 z M11,21 h4 v1 h-4 z M17,21 h1 v1 h-1 z M23,21 h3 v1 h-3 z M29,21 h1 v2 h-1 z M1,22 h2 v4 h-2 z M4,22 h1 v1 h-1 z M11,22 h1 v1 h-1 z M13,22 h2 v1 h-2 z M17,22 h3 v1 h-3 z M23,22 h2 v1 h-2 z M4,23 h3 v1 h-3 z M8,23 h1 v1 h-1 z M11,23 h2 v1 h-2 z M18,23 h2 v1 h-2 z M26,23 h1 v2 h-1 z M5,24 h5 v1 h-5 z M12,24 h1 v1 h-1 z M14,24 h2 v2 h-2 z M19,24 h1 v1 h-1 z M24,24 h1 v1 h-1 z M4,25 h6 v1 h-6 z M18,25 h4 v1 h-4 z M24,25 h4 v1 h-4 z M2,26 h7 v1 h-7 z M12,26 h4 v1 h-4 z M18,26 h3 v1 h-3 z M25,26 h3 v1 h-3 z M1,27 h3 v1 h-3 z M5,27 h2 v1 h-2 z M8,27 h2 v1 h-2 z M13,27 h2 v1 h-2 z M18,27 h2 v1 h-2 z M21,27 h1 v1 h-1 z M24,27 h2 v1 h-2 z M1,28 h8 v1 h-8 z M10,28 h1 v1 h-1 z M13,28 h1 v1 h-1 z M15,28 h2 v1 h-2 z M19,28 h4 v1 h-4 z M25,28 h4 v1 h-4 z M2,29 h9 v1 h-9 z M13,29 h4 v1 h-4 z M19,29 h2 v1 h-2 z M22,29 h1 v1 h-1 z M25,29 h2 v1 h-2 z M28,29 h1 v1 h-1 z" fill="#795548" />
    <path d="M7,1 h1 v1 h-1 z M18,1 h1 v1 h-1 z M23,1 h1 v1 h-1 z M5,2 h1 v1 h-1 z M12,2 h1 v2 h-1 z M3,3 h1 v3 h-1 z M18,3 h1 v1 h-1 z M28,3 h1 v1 h-1 z M15,4 h1 v1 h-1 z M19,4 h1 v1 h-1 z M27,4 h1 v1 h-1 z M8,5 h1 v1 h-1 z M26,5 h2 v1 h-2 z M1,6 h1 v2 h-1 z M14,7 h1 v1 h-1 z M2,8 h1 v1 h-1 z M16,8 h1 v1 h-1 z M22,8 h1 v2 h-1 z M25,8 h1 v1 h-1 z M27,8 h1 v1 h-1 z M1,9 h2 v1 h-2 z M10,9 h1 v1 h-1 z M14,9 h1 v1 h-1 z M2,10 h1 v1 h-1 z M1,11 h2 v1 h-2 z M8,11 h1 v1 h-1 z M14,11 h1 v1 h-1 z M16,11 h1 v1 h-1 z M17,12 h1 v1 h-1 z M20,12 h1 v1 h-1 z M23,12 h1 v1 h-1 z M16,13 h1 v1 h-1 z M2,14 h1 v1 h-1 z M1,15 h1 v1 h-1 z M3,15 h1 v1 h-1 z M9,15 h1 v2 h-1 z M15,15 h1 v1 h-1 z M18,15 h1 v2 h-1 z M24,15 h1 v1 h-1 z M5,16 h1 v1 h-1 z M12,16 h1 v1 h-1 z M1,17 h1 v1 h-1 z M10,17 h2 v1 h-2 z M13,17 h1 v1 h-1 z M1,19 h1 v1 h-1 z M6,19 h1 v1 h-1 z M10,19 h1 v2 h-1 z M22,19 h1 v1 h-1 z M18,21 h1 v1 h-1 z M20,21 h1 v3 h-1 z M26,21 h1 v1 h-1 z M3,22 h1 v2 h-1 z M12,22 h1 v1 h-1 z M25,22 h2 v1 h-2 z M7,23 h1 v1 h-1 z M13,23 h2 v1 h-2 z M17,23 h1 v1 h-1 z M23,23 h1 v1 h-1 z M25,23 h1 v1 h-1 z M29,23 h1 v1 h-1 z M3,24 h2 v1 h-2 z M13,24 h1 v1 h-1 z M18,24 h1 v1 h-1 z M21,24 h1 v1 h-1 z M3,25 h1 v1 h-1 z M12,25 h2 v1 h-2 z M1,26 h1 v1 h-1 z M9,26 h1 v1 h-1 z M24,26 h1 v1 h-1 z M4,27 h1 v1 h-1 z M7,27 h1 v1 h-1 z M12,27 h1 v1 h-1 z M15,27 h1 v1 h-1 z M20,27 h1 v1 h-1 z M26,27 h1 v1 h-1 z M9,28 h1 v1 h-1 z M14,28 h1 v1 h-1 z M1,29 h1 v1 h-1 z M21,29 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M3,1 h1 v2 h-1 z M9,1 h1 v2 h-1 z M15,1 h1 v2 h-1 z M21,1 h1 v2 h-1 z M4,3 h1 v4 h-1 z M10,3 h1 v4 h-1 z M16,3 h1 v4 h-1 z M22,4 h1 v1 h-1 z M5,7 h1 v3 h-1 z M11,7 h1 v3 h-1 z M17,7 h1 v3 h-1 z M23,8 h1 v2 h-1 z M6,10 h1 v4 h-1 z M12,10 h1 v4 h-1 z M18,10 h1 v4 h-1 z M24,10 h1 v4 h-1 z M7,14 h1 v3 h-1 z M13,14 h1 v3 h-1 z M19,14 h1 v3 h-1 z M25,14 h1 v3 h-1 z M8,17 h1 v3 h-1 z M14,17 h1 v4 h-1 z M20,17 h1 v4 h-1 z M26,17 h1 v4 h-1 z M9,21 h1 v3 h-1 z M15,21 h1 v3 h-1 z M21,21 h1 v3 h-1 z M27,21 h1 v3 h-1 z M10,24 h1 v4 h-1 z M16,24 h1 v4 h-1 z M22,24 h1 v4 h-1 z M28,24 h1 v4 h-1 z M11,28 h1 v2 h-1 z M17,28 h1 v2 h-1 z M23,28 h1 v2 h-1 z M29,28 h1 v2 h-1 z" fill="#5d4037" />
    <path d="M4,1 h1 v2 h-1 z M10,1 h1 v2 h-1 z M16,1 h1 v2 h-1 z M22,1 h1 v2 h-1 z M5,3 h1 v4 h-1 z M11,3 h1 v4 h-1 z M17,3 h1 v4 h-1 z M23,4 h1 v1 h-1 z M6,7 h1 v3 h-1 z M12,7 h1 v3 h-1 z M18,8 h1 v2 h-1 z M24,8 h1 v1 h-1 z M7,10 h1 v4 h-1 z M13,10 h1 v4 h-1 z M19,10 h1 v4 h-1 z M25,10 h1 v4 h-1 z M8,14 h1 v3 h-1 z M14,14 h1 v3 h-1 z M20,14 h1 v3 h-1 z M26,14 h1 v3 h-1 z M9,17 h1 v4 h-1 z M15,17 h1 v4 h-1 z M21,17 h1 v4 h-1 z M27,17 h1 v1 h-1 z M27,19 h1 v2 h-1 z M10,21 h1 v3 h-1 z M16,21 h1 v3 h-1 z M22,21 h1 v3 h-1 z M28,21 h1 v1 h-1 z M28,23 h1 v1 h-1 z M11,24 h1 v4 h-1 z M17,24 h1 v4 h-1 z M23,24 h1 v4 h-1 z M29,24 h1 v2 h-1 z M29,27 h1 v1 h-1 z M12,28 h1 v2 h-1 z M18,28 h1 v2 h-1 z M24,28 h1 v2 h-1 z M30,28 h1 v2 h-1 z" fill="#a1887f" />
    <path d="M24,1 h1 v1 h-1 z M26,1 h1 v1 h-1 z M18,2 h1 v1 h-1 z M29,2 h1 v1 h-1 z M19,3 h1 v1 h-1 z M18,4 h1 v1 h-1 z M20,4 h1 v1 h-1 z M29,6 h1 v1 h-1 z M21,8 h1 v1 h-1 z M19,9 h1 v1 h-1 z M30,10 h1 v1 h-1 z M26,12 h2 v1 h-2 z M29,12 h1 v3 h-1 z M20,13 h1 v1 h-1 z M16,14 h1 v1 h-1 z M18,14 h1 v1 h-1 z M21,14 h1 v1 h-1 z M27,15 h1 v1 h-1 z M21,16 h2 v1 h-2 z M16,18 h1 v1 h-1 z M22,18 h1 v1 h-1 z M27,18 h1 v1 h-1 z M29,18 h1 v1 h-1 z M18,19 h1 v1 h-1 z M23,19 h1 v1 h-1 z M28,19 h1 v1 h-1 z M17,20 h2 v1 h-2 z M25,20 h1 v1 h-1 z M31,20 h1 v1 h-1 z M28,22 h1 v1 h-1 z M24,23 h1 v1 h-1 z M20,24 h1 v1 h-1 z M25,24 h1 v1 h-1 z M27,24 h1 v1 h-1 z M21,26 h1 v1 h-1 z M29,26 h1 v1 h-1 z M27,27 h1 v1 h-1 z M27,29 h1 v1 h-1 z" fill="#bcaaa4" />
    {/* Stones */}
    <path d="M23,6 h2 v1 h-2 z M6,20 h3 v1 h-3 z M5,21 h4 v1 h-4 z M5,22 h3 v1 h-3 z" fill="#9e9e9e" />
    <path d="M22,6 h1 v1 h-1 z M5,20 h1 v1 h-1 z" fill="#bdbdbd" />
    <path d="M8,22 h1 v1 h-1 z" fill="#757575" />
    {/* Wind */}
    <path d="M22,3 h4 v1 h-4 z M25,4 h2 v1 h-2 z M18,5 h8 v1 h-8 z M18,7 h10 v1 h-10 z M28,8 h2 v1 h-2 z M24,9 h4 v1 h-4 z" fill="#eceff1" opacity="0.85" />
  </svg>
));

const FloodedPlotSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Plot edge */}
    <path d="M0,0 h32 v1 h-32 z M0,1 h1 v30 h-1 z M31,1 h1 v30 h-1 z M0,31 h32 v1 h-32 z" fill="#3e2723" />
    <path d="M30,1 h1 v29 h-1 z M1,30 h30 v1 h-30 z" fill="#4e342e" />
    {/* Mud */}
    <path d="M2,1 h1 v2 h-1 z M5,1 h3 v1 h-3 z M9,1 h10 v1 h-10 z M20,1 h9 v1 h-9 z M4,2 h8 v1 h-8 z M13,2 h1 v1 h-1 z M16,2 h4 v1 h-4 z M21,2 h5 v1 h-5 z M27,2 h3 v2 h-3 z M1,3 h12 v1 h-12 z M14,3 h1 v1 h-1 z M16,3 h10 v1 h-10 z M1,4 h3 v1 h-3 z M5,4 h2 v1 h-2 z M8,4 h5 v1 h-5 z M14,4 h9 v1 h-9 z M25,4 h1 v1 h-1 z M29,4 h1 v1 h-1 z M1,5 h2 v1 h-2 z M4,5 h2 v1 h-2 z M8,5 h14 v1 h-14 z M24,5 h6 v1 h-6 z M1,6 h6 v1 h-6 z M8,6 h3 v1 h-3 z M12,6 h5 v1 h-5 z M18,6 h1 v1 h-1 z M20,6 h8 v1 h-8 z M29,6 h1 v1 h-1 z M2,7 h2 v1 h-2 z M5,7 h5 v1 h-5 z M22,7 h8 v1 h-8 z M1,8 h3 v1 h-3 z M5,8 h3 v1 h-3 z M24,8 h4 v1 h-4 z M29,8 h1 v2 h-1 z M1,9 h6 v1 h-6 z M25,9 h3 v1 h-3 z M1,10 h3 v1 h-3 z M5,10 h1 v1 h-1 z M26,10 h3 v1 h-3 z M1,11 h4 v1 h-4 z M27,11 h3 v1 h-3 z M2,12 h2 v1 h-2 z M28,12 h2 v2 h-2 z M1,13 h2 v7 h-2 z M29,14 h1 v6 h-1 z M1,20 h1 v2 h-1 z M3,20 h1 v2 h-1 z M28,20 h2 v2 h-2 z M1,22 h3 v1 h-3 z M27,22 h2 v1 h-2 z M1,23 h5 v1 h-5 z M26,23 h4 v1 h-4 z M2,24 h1 v1 h-1 z M4,24 h3 v1 h-3 z M25,24 h4 v1 h-4 z M1,25 h6 v1 h-6 z M24,25 h1 v1 h-1 z M26,25 h2 v1 h-2 z M1,26 h5 v1 h-5 z M8,26 h2 v1 h-2 z M22,26 h3 v1 h-3 z M27,26 h3 v1 h-3 z M1,27 h1 v1 h-1 z M4,27 h8 v1 h-8 z M13,27 h4 v1 h-4 z M19,27 h3 v1 h-3 z M23,27 h1 v1 h-1 z M25,27 h4 v1 h-4 z M1,28 h2 v1 h-2 z M4,28 h13 v1 h-13 z M18,28 h5 v1 h-5 z M24,28 h3 v1 h-3 z M28,28 h2 v1 h-2 z M1,29 h8 v1 h-8 z M10,29 h2 v1 h-2 z M13,29 h8 v1 h-8 z M22,29 h8 v1 h-8 z" fill="#5d4037" />
    <path d="M1,1 h1 v2 h-1 z M3,1 h2 v1 h-2 z M8,1 h1 v1 h-1 z M19,1 h1 v1 h-1 z M29,1 h1 v1 h-1 z M3,2 h1 v1 h-1 z M12,2 h1 v1 h-1 z M14,2 h2 v1 h-2 z M20,2 h1 v1 h-1 z M26,2 h1 v2 h-1 z M13,3 h1 v2 h-1 z M15,3 h1 v1 h-1 z M4,4 h1 v1 h-1 z M7,4 h1 v1 h-1 z M23,4 h2 v1 h-2 z M26,4 h3 v1 h-3 z M3,5 h1 v1 h-1 z M6,5 h2 v1 h-2 z M22,5 h2 v1 h-2 z M7,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z M17,6 h1 v1 h-1 z M19,6 h1 v1 h-1 z M28,6 h1 v1 h-1 z M1,7 h1 v1 h-1 z M4,7 h1 v2 h-1 z M28,8 h1 v2 h-1 z M4,10 h1 v1 h-1 z M29,10 h1 v1 h-1 z M1,12 h1 v1 h-1 z M3,13 h1 v1 h-1 z M2,20 h1 v2 h-1 z M4,22 h1 v1 h-1 z M29,22 h1 v1 h-1 z M1,24 h1 v1 h-1 z M3,24 h1 v1 h-1 z M29,24 h1 v1 h-1 z M7,25 h1 v1 h-1 z M25,25 h1 v1 h-1 z M28,25 h2 v1 h-2 z M6,26 h2 v1 h-2 z M25,26 h2 v1 h-2 z M2,27 h2 v1 h-2 z M12,27 h1 v1 h-1 z M17,27 h2 v1 h-2 z M22,27 h1 v1 h-1 z M24,27 h1 v1 h-1 z M29,27 h1 v1 h-1 z M3,28 h1 v1 h-1 z M17,28 h1 v1 h-1 z M23,28 h1 v1 h-1 z M27,28 h1 v1 h-1 z M9,29 h1 v1 h-1 z M12,29 h1 v1 h-1 z M21,29 h1 v1 h-1 z" fill="#4e342e" />
    {/* Standing water */}
    <path d="M10,7 h12 v1 h-12 z M8,8 h3 v1 h-3 z M21,8 h3 v1 h-3 z M7,9 h1 v1 h-1 z M23,9 h2 v1 h-2 z M6,10 h1 v1 h-1 z M25,10 h1 v1 h-1 z M5,11 h1 v1 h-1 z M26,11 h1 v1 h-1 z M4,12 h1 v2 h-1 z M27,12 h1 v2 h-1 z M3,14 h1 v6 h-1 z M28,14 h1 v6 h-1 z M4,20 h1 v2 h-1 z M27,20 h1 v2 h-1 z M5,22 h1 v1 h-1 z M26,22 h1 v1 h-1 z M6,23 h1 v1 h-1 z M25,23 h1 v1 h-1 z M7,24 h2 v1 h-2 z M23,24 h1 v1 h-1 z M8,25 h3 v1 h-3 z M21,25 h3 v1 h-3 z M10,26 h12 v1 h-12 z" fill="#0288d1" />
    <path d="M11,8 h10 v1 h-10 z M11,9 h12 v1 h-12 z M8,10 h3 v1 h-3 z M12,10 h13 v1 h-13 z M6,11 h6 v1 h-6 z M13,11 h5 v1 h-5 z M19,11 h3 v1 h-3 z M25,11 h1 v1 h-1 z M5,12 h7 v1 h-7 z M14,12 h3 v1 h-3 z M19,12 h2 v1 h-2 z M22,12 h3 v1 h-3 z M26,12 h1 v1 h-1 z M5,13 h8 v1 h-8 z M15,13 h1 v1 h-1 z M18,13 h9 v1 h-9 z M4,14 h10 v1 h-10 z M21,14 h7 v1 h-7 z M4,15 h9 v1 h-9 z M23,15 h5 v1 h-5 z M4,16 h8 v1 h-8 z M24,16 h4 v1 h-4 z M4,17 h7 v3 h-7 z M25,17 h3 v3 h-3 z M5,20 h6 v1 h-6 z M25,20 h2 v1 h-2 z M5,21 h7 v1 h-7 z M24,21 h3 v1 h-3 z M6,22 h7 v1 h-7 z M23,22 h3 v1 h-3 z M7,23 h8 v1 h-8 z M24,23 h1 v1 h-1 z M9,24 h10 v1 h-10 z M20,24 h3 v1 h-3 z M11,25 h10 v1 h-10 z" fill="#4fc3f7" />
    <path d="M17,14 h4 v1 h-4 z M13,15 h2 v1 h-2 z M16,15 h7 v1 h-7 z M12,16 h3 v1 h-3 z M16,16 h8 v1 h-8 z M11,17 h14 v4 h-14 z M12,21 h12 v1 h-12 z M13,22 h10 v1 h-10 z M15,23 h5 v1 h-5 z" fill="#29b6f6" />
    <path d="M8,9 h3 v1 h-3 z M7,10 h1 v1 h-1 z M11,10 h1 v1 h-1 z M22,11 h3 v1 h-3 z M21,12 h1 v1 h-1 z M25,12 h1 v1 h-1 z M20,23 h4 v1 h-4 z M19,24 h1 v1 h-1 z M24,24 h1 v1 h-1 z" fill="#e1f5fe" />
    {/* Drowning seedling */}
    <path d="M12,11 h1 v1 h-1 z M18,11 h1 v1 h-1 z M12,12 h2 v1 h-2 z M17,12 h2 v1 h-2 z M13,13 h2 v1 h-2 z M16,13 h2 v1 h-2 z M14,14 h1 v1 h-1 z M16,14 h1 v1 h-1 z" fill="#81c784" />
    <path d="M15,14 h1 v3 h-1 z" fill="#558b2f" />
  </svg>
));

const GardenPlotSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Plot edge */}
    <path d="M0,0 h32 v1 h-32 z M0,1 h1 v30 h-1 z M31,1 h1 v30 h-1 z M0,31 h32 v1 h-32 z" fill="#3e2723" />
    <path d="M30,1 h1 v29 h-1 z M1,30 h30 v1 h-30 z" fill="#4e342e" />
    {/* Rich soil */}
    <path d="M1,1 h2 v1 h-2 z M4,1 h8 v1 h-8 z M15,1 h1 v1 h-1 z M17,1 h5 v1 h-5 z M23,1 h7 v1 h-7 z M1,2 h11 v1 h-11 z M13,2 h6 v1 h-6 z M20,2 h3 v1 h-3 z M24,2 h6 v1 h-6 z M1,3 h5 v1 h-5 z M7,3 h3 v1 h-3 z M11,3 h4 v1 h-4 z M16,3 h2 v1 h-2 z M19,3 h1 v1 h-1 z M21,3 h9 v1 h-9 z M2,4 h8 v1 h-8 z M11,4 h5 v1 h-5 z M17,4 h2 v1 h-2 z M20,4 h7 v1 h-7 z M28,4 h2 v3 h-2 z M1,5 h1 v1 h-1 z M3,5 h1 v1 h-1 z M7,5 h3 v1 h-3 z M14,5 h4 v2 h-4 z M19,5 h1 v1 h-1 z M21,5 h3 v1 h-3 z M26,5 h1 v1 h-1 z M1,6 h2 v1 h-2 z M7,6 h2 v1 h-2 z M10,6 h1 v1 h-1 z M22,6 h3 v1 h-3 z M1,7 h4 v1 h-4 z M6,7 h6 v1 h-6 z M14,7 h2 v1 h-2 z M17,7 h2 v1 h-2 z M21,7 h4 v1 h-4 z M27,7 h3 v1 h-3 z M1,8 h1 v3 h-1 z M3,8 h1 v1 h-1 z M5,8 h3 v1 h-3 z M9,8 h10 v1 h-10 z M20,8 h8 v1 h-8 z M29,8 h1 v1 h-1 z M3,10 h5 v1 h-5 z M9,10 h2 v1 h-2 z M12,10 h5 v1 h-5 z M18,10 h1 v1 h-1 z M20,10 h4 v1 h-4 z M25,10 h5 v1 h-5 z M2,11 h5 v1 h-5 z M8,11 h1 v1 h-1 z M10,11 h2 v1 h-2 z M13,11 h1 v1 h-1 z M18,11 h2 v1 h-2 z M21,11 h1 v1 h-1 z M23,11 h1 v1 h-1 z M25,11 h2 v1 h-2 z M28,11 h2 v1 h-2 z M1,12 h1 v1 h-1 z M3,12 h10 v1 h-10 z M20,12 h10 v1 h-10 z M1,13 h2 v4 h-2 z M6,13 h5 v1 h-5 z M13,13 h1 v1 h-1 z M17,13 h1 v1 h-1 z M19,13 h7 v1 h-7 z M28,13 h2 v1 h-2 z M7,14 h1 v1 h-1 z M9,14 h1 v1 h-1 z M11,14 h4 v2 h-4 z M16,14 h1 v1 h-1 z M18,14 h1 v1 h-1 z M20,14 h1 v1 h-1 z M22,14 h3 v1 h-3 z M6,15 h1 v2 h-1 z M8,15 h1 v1 h-1 z M16,15 h5 v1 h-5 z M24,15 h1 v1 h-1 z M29,15 h1 v4 h-1 z M11,16 h3 v1 h-3 z M17,16 h4 v1 h-4 z M25,16 h1 v1 h-1 z M1,17 h1 v1 h-1 z M7,17 h1 v1 h-1 z M9,17 h9 v1 h-9 z M19,17 h1 v1 h-1 z M21,17 h1 v1 h-1 z M23,17 h1 v1 h-1 z M25,17 h2 v1 h-2 z M1,18 h7 v1 h-7 z M9,18 h4 v1 h-4 z M14,18 h4 v1 h-4 z M19,18 h3 v1 h-3 z M23,18 h3 v1 h-3 z M1,19 h1 v1 h-1 z M2,20 h2 v1 h-2 z M6,20 h15 v1 h-15 z M22,20 h8 v1 h-8 z M1,21 h1 v2 h-1 z M3,21 h5 v1 h-5 z M9,21 h3 v1 h-3 z M16,21 h8 v1 h-8 z M25,21 h5 v1 h-5 z M3,22 h12 v1 h-12 z M16,22 h4 v1 h-4 z M21,22 h5 v1 h-5 z M27,22 h3 v1 h-3 z M1,23 h4 v1 h-4 z M6,23 h8 v1 h-8 z M15,23 h11 v1 h-11 z M27,23 h1 v1 h-1 z M29,23 h1 v1 h-1 z M1,24 h2 v1 h-2 z M6,24 h21 v1 h-21 z M28,24 h2 v3 h-2 z M1,25 h3 v2 h-3 z M5,25 h1 v1 h-1 z M7,25 h3 v1 h-3 z M12,25 h1 v1 h-1 z M14,25 h4 v1 h-4 z M19,25 h1 v1 h-1 z M21,25 h1 v1 h-1 z M23,25 h2 v1 h-2 z M26,25 h1 v1 h-1 z M8,26 h3 v1 h-3 z M14,26 h1 v1 h-1 z M16,26 h2 v1 h-2 z M21,26 h3 v1 h-3 z M1,27 h1 v1 h-1 z M3,27 h2 v1 h-2 z M6,27 h6 v1 h-6 z M13,27 h2 v1 h-2 z M16,27 h3 v1 h-3 z M20,27 h3 v1 h-3 z M24,27 h2 v2 h-2 z M27,27 h3 v1 h-3 z M1,28 h6 v1 h-6 z M8,28 h8 v1 h-8 z M17,28 h3 v1 h-3 z M21,28 h2 v1 h-2 z M28,28 h2 v1 h-2 z M1,29 h1 v1 h-1 z" fill="#4e342e" />
    <path d="M3,1 h1 v1 h-1 z M12,1 h3 v1 h-3 z M16,1 h1 v1 h-1 z M22,1 h1 v1 h-1 z M12,2 h1 v1 h-1 z M19,2 h1 v1 h-1 z M23,2 h1 v1 h-1 z M6,3 h1 v1 h-1 z M10,3 h1 v3 h-1 z M15,3 h1 v1 h-1 z M18,3 h1 v1 h-1 z M20,3 h1 v1 h-1 z M1,4 h1 v1 h-1 z M16,4 h1 v1 h-1 z M19,4 h1 v1 h-1 z M27,4 h1 v1 h-1 z M2,5 h1 v1 h-1 z M5,5 h1 v1 h-1 z M12,5 h1 v1 h-1 z M24,5 h1 v1 h-1 z M3,6 h1 v1 h-1 z M9,6 h1 v1 h-1 z M21,6 h1 v1 h-1 z M13,7 h1 v1 h-1 z M16,7 h1 v1 h-1 z M20,7 h1 v1 h-1 z M25,7 h1 v1 h-1 z M2,8 h1 v1 h-1 z M4,8 h1 v1 h-1 z M8,8 h1 v1 h-1 z M19,8 h1 v1 h-1 z M28,8 h1 v1 h-1 z M2,10 h1 v1 h-1 z M8,10 h1 v1 h-1 z M11,10 h1 v1 h-1 z M17,10 h1 v2 h-1 z M19,10 h1 v1 h-1 z M24,10 h1 v2 h-1 z M1,11 h1 v1 h-1 z M7,11 h1 v1 h-1 z M9,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M15,11 h1 v1 h-1 z M20,11 h1 v1 h-1 z M22,11 h1 v1 h-1 z M27,11 h1 v1 h-1 z M2,12 h1 v1 h-1 z M18,12 h2 v1 h-2 z M3,13 h1 v1 h-1 z M11,13 h2 v1 h-2 z M18,13 h1 v1 h-1 z M8,14 h1 v1 h-1 z M10,14 h1 v3 h-1 z M17,14 h1 v1 h-1 z M19,14 h1 v1 h-1 z M21,14 h1 v1 h-1 z M29,14 h1 v1 h-1 z M22,15 h1 v1 h-1 z M3,16 h1 v1 h-1 z M5,16 h1 v1 h-1 z M24,16 h1 v2 h-1 z M28,16 h1 v2 h-1 z M2,17 h1 v1 h-1 z M6,17 h1 v1 h-1 z M18,17 h1 v2 h-1 z M20,17 h1 v1 h-1 z M8,18 h1 v1 h-1 z M13,18 h1 v1 h-1 z M22,18 h1 v1 h-1 z M1,20 h1 v1 h-1 z M4,20 h2 v1 h-2 z M21,20 h1 v1 h-1 z M2,21 h1 v2 h-1 z M8,21 h1 v1 h-1 z M12,21 h4 v1 h-4 z M24,21 h1 v1 h-1 z M15,22 h1 v1 h-1 z M20,22 h1 v1 h-1 z M26,22 h1 v2 h-1 z M5,23 h1 v1 h-1 z M14,23 h1 v1 h-1 z M28,23 h1 v1 h-1 z M3,24 h3 v1 h-3 z M27,24 h1 v1 h-1 z M10,25 h1 v1 h-1 z M22,25 h1 v1 h-1 z M7,26 h1 v1 h-1 z M15,26 h1 v2 h-1 z M24,26 h1 v1 h-1 z M2,27 h1 v1 h-1 z M23,27 h1 v2 h-1 z M7,28 h1 v1 h-1 z M16,28 h1 v1 h-1 z M20,28 h1 v1 h-1 z M26,28 h2 v1 h-2 z" fill="#5d4037" />
    <path d="M2,9 h28 v1 h-28 z M2,19 h28 v1 h-28 z M2,29 h28 v1 h-28 z" fill="#3e2723" />
    {/* Seedlings */}
    <path d="M4,5 h1 v1 h-1 z M6,5 h1 v1 h-1 z M11,5 h1 v1 h-1 z M13,5 h1 v1 h-1 z M18,5 h1 v1 h-1 z M20,5 h1 v1 h-1 z M25,5 h1 v1 h-1 z M27,5 h1 v1 h-1 z M7,15 h1 v1 h-1 z M9,15 h1 v1 h-1 z M21,15 h1 v1 h-1 z M23,15 h1 v1 h-1 z M14,16 h1 v1 h-1 z M16,16 h1 v1 h-1 z M3,17 h1 v1 h-1 z M5,17 h1 v1 h-1 z M26,18 h1 v1 h-1 z M28,18 h1 v1 h-1 z M4,25 h1 v1 h-1 z M6,25 h1 v1 h-1 z M11,25 h1 v1 h-1 z M13,25 h1 v1 h-1 z M18,25 h1 v1 h-1 z M20,25 h1 v1 h-1 z M25,25 h1 v1 h-1 z M27,25 h1 v1 h-1 z" fill="#81c784" />
    <path d="M4,6 h1 v1 h-1 z M6,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z M13,6 h1 v1 h-1 z M18,6 h1 v1 h-1 z M20,6 h1 v1 h-1 z M25,6 h1 v1 h-1 z M27,6 h1 v1 h-1 z M7,16 h1 v1 h-1 z M9,16 h1 v1 h-1 z M21,16 h1 v1 h-1 z M23,16 h1 v1 h-1 z M4,26 h1 v1 h-1 z M6,26 h1 v1 h-1 z M11,26 h1 v1 h-1 z M13,26 h1 v1 h-1 z M18,26 h1 v1 h-1 z M20,26 h1 v1 h-1 z M25,26 h1 v1 h-1 z M27,26 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M5,6 h1 v2 h-1 z M12,6 h1 v2 h-1 z M19,6 h1 v2 h-1 z M26,6 h1 v2 h-1 z M15,14 h1 v3 h-1 z M4,16 h1 v2 h-1 z M8,16 h1 v2 h-1 z M22,16 h1 v2 h-1 z M27,17 h1 v2 h-1 z M5,26 h1 v2 h-1 z M12,26 h1 v2 h-1 z M19,26 h1 v2 h-1 z M26,26 h1 v2 h-1 z" fill="#2e7d32" />
    {/* Flowers & fruit */}
    <path d="M14,11 h1 v1 h-1 z M16,11 h1 v1 h-1 z M13,12 h1 v1 h-1 z M15,12 h1 v1 h-1 z M17,12 h1 v1 h-1 z M14,13 h3 v1 h-3 z" fill="#f06292" />
    <path d="M14,12 h1 v1 h-1 z M16,12 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M26,13 h2 v1 h-2 z M25,14 h1 v2 h-1 z M28,14 h1 v2 h-1 z M26,16 h2 v1 h-2 z" fill="#ff9800" />
    <path d="M26,14 h2 v2 h-2 z" fill="#ffeb3b" />
    <path d="M4,13 h2 v1 h-2 z M3,14 h1 v1 h-1 z M5,14 h2 v1 h-2 z M3,15 h3 v1 h-3 z" fill="#e53935" />
    <path d="M4,14 h1 v1 h-1 z" fill="#ff8a80" />
  </svg>
));

const LoamBedSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Plank edging */}
    <path d="M2,1 h28 v1 h-28 z M1,2 h1 v28 h-1 z M30,2 h1 v28 h-1 z M2,30 h28 v1 h-28 z" fill="#8d6e63" />
    <path d="M0,0 h31 v1 h-31 z M0,1 h1 v30 h-1 z" fill="#a1887f" />
    <path d="M31,0 h1 v1 h-1 z M1,1 h1 v1 h-1 z M30,1 h2 v1 h-2 z M2,2 h28 v1 h-28 z M31,2 h1 v28 h-1 z M2,3 h1 v26 h-1 z M29,3 h1 v26 h-1 z M2,29 h28 v1 h-28 z M1,30 h1 v1 h-1 z M30,30 h2 v1 h-2 z M0,31 h32 v1 h-32 z" fill="#5d4037" />
    {/* Dark crumbly loam */}
    <path d="M3,3 h4 v1 h-4 z M8,3 h1 v1 h-1 z M10,3 h3 v1 h-3 z M16,3 h2 v2 h-2 z M19,3 h2 v2 h-2 z M22,3 h2 v1 h-2 z M25,3 h1 v1 h-1 z M27,3 h1 v1 h-1 z M3,4 h6 v1 h-6 z M10,4 h1 v2 h-1 z M13,4 h2 v2 h-2 z M22,4 h5 v1 h-5 z M7,5 h2 v1 h-2 z M16,5 h1 v2 h-1 z M19,5 h8 v1 h-8 z M28,5 h1 v1 h-1 z M3,6 h6 v1 h-6 z M12,6 h1 v1 h-1 z M14,6 h1 v1 h-1 z M18,6 h3 v1 h-3 z M22,6 h2 v1 h-2 z M26,6 h3 v1 h-3 z M3,7 h2 v2 h-2 z M6,7 h1 v2 h-1 z M8,7 h1 v1 h-1 z M11,7 h3 v1 h-3 z M16,7 h6 v1 h-6 z M25,7 h1 v1 h-1 z M27,7 h2 v2 h-2 z M10,8 h2 v1 h-2 z M13,8 h3 v1 h-3 z M17,8 h2 v1 h-2 z M20,8 h2 v1 h-2 z M23,8 h3 v1 h-3 z M3,9 h1 v1 h-1 z M5,9 h2 v1 h-2 z M8,9 h10 v1 h-10 z M21,9 h6 v1 h-6 z M5,10 h3 v1 h-3 z M9,10 h6 v1 h-6 z M16,10 h1 v1 h-1 z M18,10 h2 v1 h-2 z M21,10 h4 v1 h-4 z M3,11 h1 v1 h-1 z M7,11 h3 v1 h-3 z M11,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z M16,11 h4 v1 h-4 z M21,11 h1 v1 h-1 z M24,11 h2 v1 h-2 z M27,11 h2 v1 h-2 z M6,12 h4 v1 h-4 z M12,12 h1 v1 h-1 z M14,12 h4 v1 h-4 z M19,12 h5 v1 h-5 z M25,12 h2 v1 h-2 z M28,12 h1 v1 h-1 z M3,13 h2 v1 h-2 z M8,13 h12 v1 h-12 z M21,13 h2 v1 h-2 z M25,13 h4 v1 h-4 z M5,14 h2 v1 h-2 z M9,14 h3 v1 h-3 z M13,14 h6 v1 h-6 z M20,14 h1 v1 h-1 z M23,14 h1 v2 h-1 z M25,14 h2 v1 h-2 z M28,14 h1 v1 h-1 z M6,15 h2 v1 h-2 z M9,15 h1 v1 h-1 z M11,15 h2 v1 h-2 z M14,15 h5 v1 h-5 z M25,15 h4 v1 h-4 z M5,16 h10 v1 h-10 z M17,16 h1 v1 h-1 z M19,16 h2 v1 h-2 z M22,16 h4 v1 h-4 z M28,16 h1 v2 h-1 z M3,17 h2 v1 h-2 z M6,17 h2 v1 h-2 z M9,17 h1 v1 h-1 z M11,17 h4 v1 h-4 z M16,17 h1 v1 h-1 z M18,17 h3 v1 h-3 z M22,17 h2 v1 h-2 z M25,17 h2 v1 h-2 z M4,18 h1 v1 h-1 z M7,18 h2 v1 h-2 z M10,18 h2 v1 h-2 z M14,18 h4 v1 h-4 z M19,18 h5 v1 h-5 z M26,18 h2 v1 h-2 z M3,19 h5 v1 h-5 z M10,19 h1 v1 h-1 z M12,19 h5 v1 h-5 z M18,19 h1 v1 h-1 z M21,19 h2 v1 h-2 z M24,19 h3 v1 h-3 z M3,20 h1 v1 h-1 z M7,20 h1 v1 h-1 z M9,20 h2 v1 h-2 z M14,20 h3 v1 h-3 z M19,20 h2 v1 h-2 z M22,20 h5 v1 h-5 z M28,20 h1 v1 h-1 z M3,21 h2 v1 h-2 z M6,21 h1 v1 h-1 z M8,21 h1 v1 h-1 z M10,21 h4 v1 h-4 z M15,21 h7 v1 h-7 z M23,21 h5 v1 h-5 z M4,22 h2 v1 h-2 z M7,22 h1 v1 h-1 z M9,22 h5 v1 h-5 z M15,22 h3 v1 h-3 z M19,22 h1 v1 h-1 z M23,22 h4 v1 h-4 z M28,22 h1 v1 h-1 z M3,23 h1 v1 h-1 z M5,23 h4 v1 h-4 z M10,23 h4 v1 h-4 z M16,23 h2 v1 h-2 z M20,23 h2 v1 h-2 z M23,23 h1 v1 h-1 z M26,23 h3 v1 h-3 z M4,24 h1 v1 h-1 z M6,24 h2 v1 h-2 z M9,24 h3 v1 h-3 z M13,24 h4 v1 h-4 z M19,24 h2 v1 h-2 z M22,24 h1 v1 h-1 z M25,24 h2 v1 h-2 z M28,24 h1 v1 h-1 z M3,25 h3 v1 h-3 z M7,25 h1 v1 h-1 z M9,25 h2 v1 h-2 z M13,25 h7 v1 h-7 z M22,25 h7 v1 h-7 z M3,26 h1 v2 h-1 z M5,26 h5 v1 h-5 z M11,26 h5 v1 h-5 z M17,26 h2 v1 h-2 z M20,26 h5 v1 h-5 z M26,26 h2 v1 h-2 z M5,27 h8 v1 h-8 z M14,27 h1 v1 h-1 z M16,27 h2 v1 h-2 z M19,27 h4 v1 h-4 z M25,27 h3 v1 h-3 z M5,28 h4 v1 h-4 z M13,28 h3 v1 h-3 z M17,28 h1 v1 h-1 z M19,28 h3 v1 h-3 z M24,28 h5 v1 h-5 z" fill="#4e342e" />
    <path d="M9,3 h1 v2 h-1 z M13,3 h3 v1 h-3 z M21,3 h1 v2 h-1 z M24,3 h1 v1 h-1 z M28,3 h1 v1 h-1 z M12,4 h1 v1 h-1 z M15,4 h1 v4 h-1 z M18,4 h1 v1 h-1 z M27,4 h1 v2 h-1 z M3,5 h4 v1 h-4 z M11,5 h1 v1 h-1 z M17,5 h1 v2 h-1 z M10,6 h2 v1 h-2 z M13,6 h1 v1 h-1 z M21,6 h1 v1 h-1 z M24,6 h2 v1 h-2 z M5,7 h1 v1 h-1 z M7,7 h1 v3 h-1 z M10,7 h1 v1 h-1 z M22,7 h2 v1 h-2 z M26,7 h1 v2 h-1 z M9,8 h1 v1 h-1 z M4,9 h1 v1 h-1 z M18,9 h3 v1 h-3 z M27,9 h1 v1 h-1 z M3,10 h2 v1 h-2 z M8,10 h1 v1 h-1 z M20,10 h1 v2 h-1 z M25,10 h2 v1 h-2 z M28,10 h1 v1 h-1 z M5,11 h1 v1 h-1 z M10,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M22,11 h1 v1 h-1 z M26,11 h1 v1 h-1 z M4,12 h2 v1 h-2 z M18,12 h1 v1 h-1 z M24,12 h1 v1 h-1 z M27,12 h1 v1 h-1 z M5,13 h2 v1 h-2 z M23,13 h1 v1 h-1 z M4,14 h1 v1 h-1 z M7,14 h2 v1 h-2 z M12,14 h1 v1 h-1 z M21,14 h1 v1 h-1 z M27,14 h1 v1 h-1 z M3,15 h1 v1 h-1 z M5,15 h1 v1 h-1 z M19,15 h3 v1 h-3 z M3,16 h2 v1 h-2 z M15,16 h1 v2 h-1 z M18,16 h1 v1 h-1 z M21,16 h1 v2 h-1 z M26,16 h2 v1 h-2 z M5,17 h1 v1 h-1 z M8,17 h1 v1 h-1 z M17,17 h1 v1 h-1 z M24,17 h1 v1 h-1 z M27,17 h1 v1 h-1 z M5,18 h2 v1 h-2 z M9,18 h1 v1 h-1 z M12,18 h2 v1 h-2 z M18,18 h1 v1 h-1 z M24,18 h2 v1 h-2 z M28,18 h1 v1 h-1 z M8,19 h2 v1 h-2 z M19,19 h2 v1 h-2 z M27,19 h2 v1 h-2 z M4,20 h3 v1 h-3 z M8,20 h1 v1 h-1 z M12,20 h2 v1 h-2 z M17,20 h2 v1 h-2 z M27,20 h1 v1 h-1 z M7,21 h1 v1 h-1 z M9,21 h1 v1 h-1 z M22,21 h1 v2 h-1 z M28,21 h1 v1 h-1 z M6,22 h1 v1 h-1 z M14,22 h1 v1 h-1 z M27,22 h1 v1 h-1 z M18,23 h1 v2 h-1 z M3,24 h1 v1 h-1 z M5,24 h1 v1 h-1 z M8,24 h1 v2 h-1 z M12,24 h1 v1 h-1 z M21,24 h1 v1 h-1 z M24,24 h1 v1 h-1 z M11,25 h2 v1 h-2 z M20,25 h2 v1 h-2 z M10,26 h1 v1 h-1 z M16,26 h1 v1 h-1 z M19,26 h1 v1 h-1 z M25,26 h1 v1 h-1 z M28,26 h1 v1 h-1 z M13,27 h1 v1 h-1 z M18,27 h1 v1 h-1 z M23,27 h2 v1 h-2 z M3,28 h2 v1 h-2 z M9,28 h2 v1 h-2 z M12,28 h1 v1 h-1 z M22,28 h2 v1 h-2 z" fill="#5d4037" />
    <path d="M28,4 h1 v1 h-1 z M12,5 h1 v1 h-1 z M18,5 h1 v1 h-1 z M9,6 h1 v1 h-1 z M24,7 h1 v1 h-1 z M5,8 h1 v1 h-1 z M8,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M28,9 h1 v1 h-1 z M15,10 h1 v1 h-1 z M17,10 h1 v1 h-1 z M4,11 h1 v1 h-1 z M6,11 h1 v1 h-1 z M14,11 h2 v1 h-2 z M23,11 h1 v1 h-1 z M3,12 h1 v1 h-1 z M10,12 h2 v1 h-2 z M13,12 h1 v1 h-1 z M7,13 h1 v1 h-1 z M20,13 h1 v1 h-1 z M24,13 h1 v2 h-1 z M3,14 h1 v1 h-1 z M22,14 h1 v2 h-1 z M8,15 h1 v1 h-1 z M10,15 h1 v1 h-1 z M13,15 h1 v1 h-1 z M16,16 h1 v1 h-1 z M10,17 h1 v1 h-1 z M3,18 h1 v1 h-1 z M11,19 h1 v2 h-1 z M23,19 h1 v1 h-1 z M21,20 h1 v1 h-1 z M5,21 h1 v1 h-1 z M3,22 h1 v1 h-1 z M8,22 h1 v1 h-1 z M4,23 h1 v1 h-1 z M9,23 h1 v1 h-1 z M14,23 h1 v1 h-1 z M17,24 h1 v1 h-1 z M27,24 h1 v1 h-1 z M4,26 h1 v2 h-1 z M28,27 h1 v1 h-1 z M11,28 h1 v1 h-1 z M16,28 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M18,3 h1 v1 h-1 z M26,3 h1 v1 h-1 z M11,4 h1 v1 h-1 z M9,5 h1 v1 h-1 z M9,7 h1 v1 h-1 z M14,7 h1 v1 h-1 z M22,8 h1 v1 h-1 z M19,14 h1 v1 h-1 z M17,19 h1 v1 h-1 z M14,21 h1 v1 h-1 z M25,23 h1 v1 h-1 z M6,25 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M7,3 h1 v1 h-1 z M16,8 h1 v1 h-1 z M19,8 h1 v1 h-1 z M27,10 h1 v1 h-1 z M4,15 h1 v1 h-1 z M24,15 h1 v1 h-1 z M18,22 h1 v1 h-1 z M15,23 h1 v1 h-1 z M15,27 h1 v1 h-1 z M18,28 h1 v1 h-1 z" fill="#8d6e63" />
    {/* Worm */}
    <path d="M20,22 h2 v1 h-2 z M19,23 h1 v1 h-1 z M22,23 h1 v1 h-1 z M24,23 h1 v1 h-1 z M23,24 h1 v1 h-1 z" fill="#f48fb1" />
  </svg>
));

const SandyBedSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Plank edging */}
    <path d="M2,1 h28 v1 h-28 z M1,2 h1 v28 h-1 z M30,2 h1 v28 h-1 z M2,30 h28 v1 h-28 z" fill="#8d6e63" />
    <path d="M0,0 h31 v1 h-31 z M0,1 h1 v30 h-1 z" fill="#a1887f" />
    <path d="M31,0 h1 v1 h-1 z M1,1 h1 v1 h-1 z M30,1 h2 v1 h-2 z M2,2 h28 v1 h-28 z M31,2 h1 v28 h-1 z M2,3 h1 v26 h-1 z M29,3 h1 v26 h-1 z M2,29 h28 v1 h-28 z M1,30 h1 v1 h-1 z M30,30 h2 v1 h-2 z M0,31 h32 v1 h-32 z" fill="#5d4037" />
    {/* Sand & grit */}
    <path d="M5,3 h6 v1 h-6 z M12,3 h3 v1 h-3 z M17,3 h1 v2 h-1 z M19,3 h2 v1 h-2 z M28,3 h1 v1 h-1 z M3,4 h1 v5 h-1 z M5,4 h2 v1 h-2 z M8,4 h2 v1 h-2 z M12,4 h2 v1 h-2 z M19,4 h1 v1 h-1 z M21,4 h3 v1 h-3 z M25,4 h3 v1 h-3 z M5,5 h3 v1 h-3 z M10,5 h1 v1 h-1 z M12,5 h1 v1 h-1 z M14,5 h1 v1 h-1 z M16,5 h1 v1 h-1 z M19,5 h6 v1 h-6 z M26,5 h3 v1 h-3 z M5,6 h8 v1 h-8 z M14,6 h4 v1 h-4 z M20,6 h1 v1 h-1 z M22,6 h7 v1 h-7 z M5,7 h1 v1 h-1 z M10,7 h3 v1 h-3 z M14,7 h1 v1 h-1 z M16,7 h2 v1 h-2 z M19,7 h1 v1 h-1 z M21,7 h2 v1 h-2 z M25,7 h2 v1 h-2 z M28,7 h1 v1 h-1 z M9,8 h3 v1 h-3 z M13,8 h5 v1 h-5 z M19,8 h2 v1 h-2 z M22,8 h2 v2 h-2 z M26,8 h3 v1 h-3 z M4,9 h1 v1 h-1 z M6,9 h2 v1 h-2 z M10,9 h7 v1 h-7 z M25,9 h4 v1 h-4 z M4,10 h13 v1 h-13 z M18,10 h1 v1 h-1 z M24,10 h1 v1 h-1 z M26,10 h2 v1 h-2 z M4,11 h5 v1 h-5 z M10,11 h9 v1 h-9 z M24,11 h3 v1 h-3 z M3,12 h2 v1 h-2 z M6,12 h1 v1 h-1 z M8,12 h1 v1 h-1 z M12,12 h1 v2 h-1 z M14,12 h2 v2 h-2 z M17,12 h2 v1 h-2 z M20,12 h2 v1 h-2 z M23,12 h6 v2 h-6 z M3,13 h4 v1 h-4 z M8,13 h2 v1 h-2 z M17,13 h1 v1 h-1 z M19,13 h2 v1 h-2 z M4,14 h2 v1 h-2 z M7,14 h1 v1 h-1 z M9,14 h1 v1 h-1 z M15,14 h4 v1 h-4 z M20,14 h1 v1 h-1 z M22,14 h1 v1 h-1 z M24,14 h4 v1 h-4 z M3,15 h1 v1 h-1 z M5,15 h1 v1 h-1 z M8,15 h5 v1 h-5 z M14,15 h3 v1 h-3 z M18,15 h6 v1 h-6 z M26,15 h3 v1 h-3 z M3,16 h2 v3 h-2 z M7,16 h5 v1 h-5 z M13,16 h1 v1 h-1 z M17,16 h3 v1 h-3 z M21,16 h1 v1 h-1 z M23,16 h2 v1 h-2 z M28,16 h1 v1 h-1 z M6,17 h2 v2 h-2 z M11,17 h1 v1 h-1 z M13,17 h2 v2 h-2 z M17,17 h2 v1 h-2 z M21,17 h3 v1 h-3 z M25,17 h4 v1 h-4 z M9,18 h3 v1 h-3 z M16,18 h1 v1 h-1 z M18,18 h3 v1 h-3 z M23,18 h3 v1 h-3 z M27,18 h2 v1 h-2 z M3,19 h1 v2 h-1 z M5,19 h1 v2 h-1 z M7,19 h8 v1 h-8 z M16,19 h3 v1 h-3 z M20,19 h1 v1 h-1 z M22,19 h1 v1 h-1 z M25,19 h1 v2 h-1 z M8,20 h1 v1 h-1 z M15,20 h4 v1 h-4 z M20,20 h4 v1 h-4 z M4,21 h1 v1 h-1 z M6,21 h2 v1 h-2 z M9,21 h3 v1 h-3 z M15,21 h11 v1 h-11 z M27,21 h2 v1 h-2 z M3,22 h9 v1 h-9 z M13,22 h2 v1 h-2 z M16,22 h6 v1 h-6 z M23,22 h5 v1 h-5 z M3,23 h1 v1 h-1 z M6,23 h1 v1 h-1 z M10,23 h4 v1 h-4 z M15,23 h1 v1 h-1 z M17,23 h3 v1 h-3 z M21,23 h3 v2 h-3 z M27,23 h1 v1 h-1 z M5,24 h2 v1 h-2 z M8,24 h1 v1 h-1 z M11,24 h2 v1 h-2 z M14,24 h1 v1 h-1 z M16,24 h4 v1 h-4 z M27,24 h2 v1 h-2 z M3,25 h2 v1 h-2 z M6,25 h2 v1 h-2 z M11,25 h5 v1 h-5 z M20,25 h4 v1 h-4 z M26,25 h2 v1 h-2 z M3,26 h1 v2 h-1 z M7,26 h1 v1 h-1 z M12,26 h1 v1 h-1 z M14,26 h3 v1 h-3 z M18,26 h4 v1 h-4 z M24,26 h1 v1 h-1 z M26,26 h1 v1 h-1 z M28,26 h1 v2 h-1 z M5,27 h2 v1 h-2 z M8,27 h2 v1 h-2 z M11,27 h2 v1 h-2 z M14,27 h2 v1 h-2 z M18,27 h1 v1 h-1 z M20,27 h2 v1 h-2 z M23,27 h2 v1 h-2 z M4,28 h1 v1 h-1 z M6,28 h3 v1 h-3 z M10,28 h2 v1 h-2 z M13,28 h4 v1 h-4 z M19,28 h4 v1 h-4 z M24,28 h1 v1 h-1 z M27,28 h1 v1 h-1 z" fill="#d7b98a" />
    <path d="M3,3 h2 v1 h-2 z M11,3 h1 v1 h-1 z M16,3 h1 v1 h-1 z M18,3 h1 v1 h-1 z M22,3 h4 v1 h-4 z M4,4 h1 v4 h-1 z M10,4 h1 v1 h-1 z M14,4 h3 v1 h-3 z M20,4 h1 v1 h-1 z M9,5 h1 v1 h-1 z M11,5 h1 v1 h-1 z M13,5 h1 v3 h-1 z M15,5 h1 v1 h-1 z M18,5 h1 v1 h-1 z M25,5 h1 v1 h-1 z M18,6 h2 v1 h-2 z M21,6 h1 v1 h-1 z M15,7 h1 v1 h-1 z M18,7 h1 v2 h-1 z M20,7 h1 v1 h-1 z M27,7 h1 v1 h-1 z M5,8 h1 v2 h-1 z M12,8 h1 v1 h-1 z M21,8 h1 v1 h-1 z M8,9 h2 v1 h-2 z M18,9 h4 v1 h-4 z M3,10 h1 v2 h-1 z M19,10 h2 v1 h-2 z M28,10 h1 v1 h-1 z M9,11 h1 v2 h-1 z M19,11 h1 v2 h-1 z M27,11 h2 v1 h-2 z M11,12 h1 v2 h-1 z M13,12 h1 v2 h-1 z M16,12 h1 v2 h-1 z M22,12 h1 v1 h-1 z M21,13 h1 v2 h-1 z M3,14 h1 v1 h-1 z M8,14 h1 v1 h-1 z M10,14 h3 v1 h-3 z M14,14 h1 v1 h-1 z M23,14 h1 v1 h-1 z M4,15 h1 v1 h-1 z M7,15 h1 v1 h-1 z M13,15 h1 v1 h-1 z M17,15 h1 v1 h-1 z M25,15 h1 v1 h-1 z M5,16 h1 v1 h-1 z M12,16 h1 v1 h-1 z M14,16 h1 v1 h-1 z M22,16 h1 v1 h-1 z M25,16 h3 v1 h-3 z M8,17 h3 v1 h-3 z M15,17 h1 v1 h-1 z M20,17 h1 v1 h-1 z M5,18 h1 v1 h-1 z M8,18 h1 v1 h-1 z M12,18 h1 v1 h-1 z M17,18 h1 v1 h-1 z M26,18 h1 v1 h-1 z M6,19 h1 v1 h-1 z M15,19 h1 v1 h-1 z M19,19 h1 v1 h-1 z M21,19 h1 v1 h-1 z M23,19 h2 v1 h-2 z M27,19 h2 v1 h-2 z M4,20 h1 v1 h-1 z M7,20 h1 v1 h-1 z M9,20 h2 v1 h-2 z M26,20 h3 v1 h-3 z M3,21 h1 v1 h-1 z M5,21 h1 v1 h-1 z M8,21 h1 v1 h-1 z M26,21 h1 v1 h-1 z M12,22 h1 v1 h-1 z M28,22 h1 v2 h-1 z M4,23 h1 v1 h-1 z M7,23 h1 v1 h-1 z M9,23 h1 v1 h-1 z M16,23 h1 v1 h-1 z M3,24 h2 v1 h-2 z M10,24 h1 v1 h-1 z M15,24 h1 v1 h-1 z M5,25 h1 v1 h-1 z M16,25 h2 v1 h-2 z M19,25 h1 v1 h-1 z M24,25 h2 v1 h-2 z M4,26 h1 v2 h-1 z M6,26 h1 v1 h-1 z M11,26 h1 v1 h-1 z M13,26 h1 v2 h-1 z M17,26 h1 v1 h-1 z M22,26 h2 v1 h-2 z M27,26 h1 v1 h-1 z M7,27 h1 v1 h-1 z M10,27 h1 v1 h-1 z M16,27 h2 v1 h-2 z M22,27 h1 v1 h-1 z M26,27 h1 v2 h-1 z M3,28 h1 v1 h-1 z M5,28 h1 v1 h-1 z M12,28 h1 v1 h-1 z M28,28 h1 v1 h-1 z" fill="#e6d2b0" />
    <path d="M15,3 h1 v1 h-1 z M26,3 h2 v1 h-2 z M11,4 h1 v1 h-1 z M18,4 h1 v1 h-1 z M24,4 h1 v1 h-1 z M8,5 h1 v1 h-1 z M9,7 h1 v1 h-1 z M23,7 h2 v1 h-2 z M4,8 h1 v1 h-1 z M25,8 h1 v1 h-1 z M3,9 h1 v1 h-1 z M17,9 h1 v2 h-1 z M24,9 h1 v1 h-1 z M25,10 h1 v1 h-1 z M20,11 h1 v1 h-1 z M5,12 h1 v1 h-1 z M7,12 h1 v1 h-1 z M10,12 h1 v2 h-1 z M18,13 h1 v1 h-1 z M6,14 h1 v1 h-1 z M13,14 h1 v1 h-1 z M19,14 h1 v1 h-1 z M28,14 h1 v1 h-1 z M24,15 h1 v1 h-1 z M6,16 h1 v1 h-1 z M15,16 h2 v1 h-2 z M20,16 h1 v1 h-1 z M5,17 h1 v1 h-1 z M12,17 h1 v1 h-1 z M16,17 h1 v1 h-1 z M19,17 h1 v1 h-1 z M24,17 h1 v1 h-1 z M15,18 h1 v1 h-1 z M21,18 h2 v1 h-2 z M4,19 h1 v1 h-1 z M26,19 h1 v1 h-1 z M6,20 h1 v1 h-1 z M19,20 h1 v1 h-1 z M24,20 h1 v1 h-1 z M15,22 h1 v1 h-1 z M22,22 h1 v1 h-1 z M5,23 h1 v1 h-1 z M14,23 h1 v1 h-1 z M20,23 h1 v1 h-1 z M7,24 h1 v1 h-1 z M9,24 h1 v1 h-1 z M13,24 h1 v1 h-1 z M28,25 h1 v1 h-1 z M19,27 h1 v1 h-1 z M25,27 h1 v2 h-1 z M27,27 h1 v1 h-1 z M9,28 h1 v1 h-1 z M17,28 h1 v1 h-1 z" fill="#bcaaa4" />
    <path d="M21,3 h1 v1 h-1 z M7,4 h1 v1 h-1 z M28,4 h1 v1 h-1 z M17,5 h1 v1 h-1 z M24,8 h1 v1 h-1 z M7,13 h1 v1 h-1 z M22,13 h1 v1 h-1 z M6,15 h1 v1 h-1 z M11,20 h1 v1 h-1 z M8,23 h1 v1 h-1 z M20,24 h1 v1 h-1 z M18,25 h1 v1 h-1 z M5,26 h1 v1 h-1 z M25,26 h1 v1 h-1 z M18,28 h1 v1 h-1 z M23,28 h1 v1 h-1 z" fill="#f5f5f5" />
    {/* Pebbles */}
    <path d="M7,7 h2 v1 h-2 z M6,8 h2 v1 h-2 z M22,10 h2 v1 h-2 z M21,11 h2 v1 h-2 z M13,20 h2 v1 h-2 z M12,21 h2 v1 h-2 z M25,23 h2 v1 h-2 z M24,24 h2 v1 h-2 z M9,25 h2 v1 h-2 z M8,26 h2 v1 h-2 z" fill="#9e9e9e" />
    <path d="M6,7 h1 v1 h-1 z M21,10 h1 v1 h-1 z M12,20 h1 v1 h-1 z M24,23 h1 v1 h-1 z M8,25 h1 v1 h-1 z" fill="#bdbdbd" />
    <path d="M8,8 h1 v1 h-1 z M23,11 h1 v1 h-1 z M14,21 h1 v1 h-1 z M26,24 h1 v1 h-1 z M10,26 h1 v1 h-1 z" fill="#757575" />
  </svg>
));

const AcidicBedSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Plank edging */}
    <path d="M2,1 h28 v1 h-28 z M1,2 h1 v28 h-1 z M30,2 h1 v28 h-1 z M2,30 h28 v1 h-28 z" fill="#8d6e63" />
    <path d="M0,0 h31 v1 h-31 z M0,1 h1 v30 h-1 z" fill="#a1887f" />
    <path d="M31,0 h1 v1 h-1 z M1,1 h1 v1 h-1 z M30,1 h2 v1 h-2 z M2,2 h28 v1 h-28 z M31,2 h1 v28 h-1 z M2,3 h1 v26 h-1 z M29,3 h1 v26 h-1 z M2,29 h28 v1 h-28 z M1,30 h1 v1 h-1 z M30,30 h2 v1 h-2 z M0,31 h32 v1 h-32 z" fill="#5d4037" />
    {/* Peaty soil & bark */}
    <path d="M4,3 h1 v1 h-1 z M6,3 h2 v1 h-2 z M10,3 h2 v1 h-2 z M14,3 h3 v1 h-3 z M18,3 h3 v1 h-3 z M23,3 h3 v1 h-3 z M28,3 h1 v3 h-1 z M3,4 h3 v1 h-3 z M7,4 h1 v1 h-1 z M11,4 h11 v1 h-11 z M25,4 h1 v1 h-1 z M3,5 h4 v1 h-4 z M8,5 h2 v1 h-2 z M11,5 h2 v1 h-2 z M14,5 h2 v1 h-2 z M17,5 h5 v1 h-5 z M24,5 h3 v1 h-3 z M3,6 h11 v1 h-11 z M15,6 h2 v1 h-2 z M18,6 h1 v1 h-1 z M20,6 h1 v1 h-1 z M23,6 h2 v1 h-2 z M27,6 h1 v1 h-1 z M4,7 h3 v1 h-3 z M8,7 h2 v1 h-2 z M12,7 h1 v1 h-1 z M14,7 h7 v1 h-7 z M22,7 h5 v1 h-5 z M3,8 h3 v1 h-3 z M7,8 h2 v1 h-2 z M10,8 h4 v1 h-4 z M15,8 h2 v1 h-2 z M18,8 h1 v1 h-1 z M20,8 h7 v1 h-7 z M28,8 h1 v1 h-1 z M3,9 h4 v1 h-4 z M8,9 h1 v1 h-1 z M11,9 h4 v1 h-4 z M16,9 h3 v1 h-3 z M20,9 h5 v1 h-5 z M27,9 h1 v1 h-1 z M3,10 h1 v1 h-1 z M5,10 h2 v1 h-2 z M9,10 h4 v1 h-4 z M14,10 h1 v1 h-1 z M19,10 h3 v1 h-3 z M23,10 h2 v1 h-2 z M27,10 h2 v1 h-2 z M3,11 h4 v1 h-4 z M10,11 h5 v1 h-5 z M18,11 h5 v1 h-5 z M24,11 h4 v1 h-4 z M3,12 h5 v1 h-5 z M9,12 h8 v1 h-8 z M19,12 h5 v1 h-5 z M25,12 h1 v1 h-1 z M27,12 h1 v1 h-1 z M3,13 h4 v2 h-4 z M8,13 h3 v1 h-3 z M12,13 h13 v1 h-13 z M26,13 h1 v1 h-1 z M28,13 h1 v1 h-1 z M9,14 h3 v1 h-3 z M13,14 h10 v1 h-10 z M25,14 h1 v1 h-1 z M27,14 h1 v1 h-1 z M3,15 h6 v1 h-6 z M12,15 h3 v1 h-3 z M16,15 h9 v1 h-9 z M26,15 h1 v1 h-1 z M28,15 h1 v1 h-1 z M3,16 h1 v1 h-1 z M5,16 h1 v1 h-1 z M7,16 h3 v1 h-3 z M11,16 h2 v1 h-2 z M14,16 h5 v1 h-5 z M20,16 h2 v1 h-2 z M24,16 h2 v1 h-2 z M4,17 h7 v1 h-7 z M13,17 h4 v1 h-4 z M18,17 h1 v1 h-1 z M21,17 h8 v1 h-8 z M3,18 h1 v2 h-1 z M5,18 h4 v1 h-4 z M11,18 h1 v1 h-1 z M13,18 h2 v1 h-2 z M16,18 h3 v1 h-3 z M20,18 h1 v1 h-1 z M22,18 h4 v1 h-4 z M27,18 h2 v1 h-2 z M6,19 h1 v1 h-1 z M8,19 h1 v1 h-1 z M10,19 h1 v1 h-1 z M12,19 h2 v1 h-2 z M16,19 h1 v1 h-1 z M19,19 h4 v1 h-4 z M24,19 h3 v1 h-3 z M3,20 h2 v1 h-2 z M7,20 h1 v1 h-1 z M9,20 h7 v1 h-7 z M17,20 h1 v1 h-1 z M23,20 h4 v1 h-4 z M28,20 h1 v3 h-1 z M3,21 h1 v1 h-1 z M5,21 h2 v1 h-2 z M8,21 h1 v1 h-1 z M10,21 h5 v1 h-5 z M16,21 h1 v1 h-1 z M18,21 h1 v1 h-1 z M24,21 h3 v1 h-3 z M3,22 h3 v1 h-3 z M7,22 h1 v1 h-1 z M9,22 h1 v1 h-1 z M12,22 h2 v1 h-2 z M15,22 h4 v1 h-4 z M21,22 h1 v1 h-1 z M23,22 h1 v1 h-1 z M25,22 h1 v1 h-1 z M3,23 h2 v1 h-2 z M6,23 h3 v1 h-3 z M12,23 h1 v1 h-1 z M14,23 h3 v1 h-3 z M18,23 h2 v1 h-2 z M22,23 h3 v1 h-3 z M26,23 h3 v1 h-3 z M3,24 h3 v1 h-3 z M7,24 h1 v1 h-1 z M9,24 h3 v1 h-3 z M13,24 h1 v1 h-1 z M16,24 h3 v1 h-3 z M21,24 h1 v1 h-1 z M23,24 h1 v1 h-1 z M25,24 h1 v1 h-1 z M27,24 h1 v1 h-1 z M3,25 h2 v1 h-2 z M6,25 h4 v1 h-4 z M12,25 h2 v1 h-2 z M15,25 h1 v1 h-1 z M17,25 h2 v1 h-2 z M22,25 h1 v1 h-1 z M24,25 h5 v1 h-5 z M3,26 h1 v1 h-1 z M6,26 h6 v1 h-6 z M13,26 h3 v1 h-3 z M19,26 h3 v1 h-3 z M23,26 h1 v1 h-1 z M25,26 h2 v1 h-2 z M3,27 h5 v1 h-5 z M10,27 h1 v1 h-1 z M12,27 h1 v1 h-1 z M14,27 h5 v1 h-5 z M21,27 h4 v2 h-4 z M27,27 h1 v1 h-1 z M4,28 h4 v1 h-4 z M10,28 h4 v1 h-4 z M15,28 h5 v1 h-5 z M26,28 h2 v1 h-2 z" fill="#3e2723" />
    <path d="M3,3 h1 v1 h-1 z M5,3 h1 v1 h-1 z M8,3 h1 v1 h-1 z M21,3 h2 v1 h-2 z M26,3 h2 v1 h-2 z M6,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z M22,4 h2 v1 h-2 z M27,4 h1 v1 h-1 z M16,5 h1 v1 h-1 z M22,5 h1 v1 h-1 z M14,6 h1 v1 h-1 z M17,6 h1 v1 h-1 z M19,6 h1 v1 h-1 z M25,6 h2 v1 h-2 z M3,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M27,7 h2 v1 h-2 z M9,8 h1 v1 h-1 z M17,8 h1 v1 h-1 z M19,8 h1 v1 h-1 z M27,8 h1 v1 h-1 z M10,9 h1 v1 h-1 z M26,9 h1 v1 h-1 z M28,9 h1 v1 h-1 z M4,10 h1 v1 h-1 z M13,10 h1 v1 h-1 z M15,10 h1 v1 h-1 z M17,10 h1 v1 h-1 z M22,10 h1 v1 h-1 z M25,10 h1 v1 h-1 z M15,11 h2 v1 h-2 z M23,11 h1 v1 h-1 z M28,11 h1 v2 h-1 z M17,12 h2 v1 h-2 z M24,12 h1 v1 h-1 z M11,13 h1 v1 h-1 z M7,14 h1 v1 h-1 z M12,14 h1 v1 h-1 z M26,14 h1 v1 h-1 z M11,15 h1 v1 h-1 z M15,15 h1 v1 h-1 z M27,15 h1 v1 h-1 z M4,16 h1 v1 h-1 z M13,16 h1 v1 h-1 z M19,16 h1 v1 h-1 z M22,16 h2 v1 h-2 z M27,16 h2 v1 h-2 z M3,17 h1 v1 h-1 z M12,17 h1 v1 h-1 z M19,17 h2 v1 h-2 z M9,18 h1 v1 h-1 z M15,18 h1 v1 h-1 z M19,18 h1 v1 h-1 z M21,18 h1 v1 h-1 z M26,18 h1 v1 h-1 z M4,19 h1 v1 h-1 z M7,19 h1 v1 h-1 z M11,19 h1 v1 h-1 z M14,19 h2 v1 h-2 z M18,19 h1 v1 h-1 z M23,19 h1 v1 h-1 z M28,19 h1 v1 h-1 z M5,20 h1 v1 h-1 z M8,20 h1 v1 h-1 z M19,20 h1 v1 h-1 z M27,20 h1 v2 h-1 z M4,21 h1 v1 h-1 z M17,21 h1 v1 h-1 z M8,22 h1 v1 h-1 z M11,22 h1 v1 h-1 z M26,22 h2 v1 h-2 z M10,23 h2 v1 h-2 z M17,23 h1 v1 h-1 z M20,23 h1 v1 h-1 z M6,24 h1 v1 h-1 z M14,24 h1 v1 h-1 z M19,24 h1 v1 h-1 z M10,25 h1 v1 h-1 z M16,25 h1 v1 h-1 z M20,25 h1 v1 h-1 z M4,26 h2 v1 h-2 z M17,26 h2 v1 h-2 z M22,26 h1 v1 h-1 z M27,26 h2 v1 h-2 z M8,27 h1 v1 h-1 z M11,27 h1 v1 h-1 z M19,27 h1 v1 h-1 z M26,27 h1 v1 h-1 z M28,27 h1 v2 h-1 z M8,28 h2 v1 h-2 z M20,28 h1 v1 h-1 z M25,28 h1 v1 h-1 z" fill="#4e342e" />
    <path d="M12,3 h2 v1 h-2 z M17,3 h1 v1 h-1 z M9,4 h1 v1 h-1 z M24,4 h1 v1 h-1 z M10,5 h1 v1 h-1 z M13,5 h1 v1 h-1 z M21,6 h1 v1 h-1 z M10,7 h2 v1 h-2 z M13,7 h1 v1 h-1 z M9,9 h1 v1 h-1 z M25,9 h1 v1 h-1 z M26,10 h1 v1 h-1 z M25,13 h1 v1 h-1 z M23,14 h1 v1 h-1 z M10,15 h1 v1 h-1 z M6,16 h1 v1 h-1 z M17,17 h1 v1 h-1 z M12,18 h1 v1 h-1 z M27,19 h1 v1 h-1 z M20,20 h1 v1 h-1 z M9,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M19,22 h1 v1 h-1 z M9,23 h1 v1 h-1 z M8,24 h1 v1 h-1 z M15,24 h1 v1 h-1 z M24,24 h1 v1 h-1 z M28,24 h1 v1 h-1 z M5,25 h1 v1 h-1 z M14,25 h1 v1 h-1 z M21,25 h1 v1 h-1 z M16,26 h1 v1 h-1 z M9,27 h1 v1 h-1 z M20,27 h1 v1 h-1 z M25,27 h1 v1 h-1 z M3,28 h1 v1 h-1 z" fill="#795548" />
    <path d="M7,10 h2 v2 h-2 z M21,20 h2 v1 h-2 z M20,21 h3 v1 h-3 z" fill="#6d4c41" />
    {/* Pine needles */}
    <path d="M9,3 h1 v1 h-1 z M8,4 h1 v1 h-1 z M26,4 h1 v1 h-1 z M7,5 h1 v1 h-1 z M23,5 h1 v1 h-1 z M27,5 h1 v1 h-1 z M22,6 h1 v1 h-1 z M28,6 h1 v1 h-1 z M21,7 h1 v1 h-1 z M6,8 h1 v1 h-1 z M14,8 h1 v1 h-1 z M7,9 h1 v1 h-1 z M15,9 h1 v1 h-1 z M16,10 h1 v1 h-1 z M9,11 h1 v1 h-1 z M8,12 h1 v1 h-1 z M26,12 h1 v1 h-1 z M7,13 h1 v1 h-1 z M27,13 h1 v1 h-1 z M28,14 h1 v1 h-1 z M11,17 h1 v1 h-1 z M4,18 h1 v1 h-1 z M10,18 h1 v1 h-1 z M5,19 h1 v1 h-1 z M9,19 h1 v1 h-1 z M6,20 h1 v1 h-1 z M7,21 h1 v1 h-1 z M23,21 h1 v1 h-1 z M6,22 h1 v1 h-1 z M22,22 h1 v1 h-1 z M24,22 h1 v1 h-1 z M5,23 h1 v1 h-1 z M21,23 h1 v1 h-1 z M25,23 h1 v1 h-1 z M20,24 h1 v1 h-1 z M26,24 h1 v1 h-1 z M19,25 h1 v1 h-1 z" fill="#bf360c" />
    <path d="M19,9 h1 v1 h-1 z M18,10 h1 v1 h-1 z M17,11 h1 v1 h-1 z M8,14 h1 v1 h-1 z M24,14 h1 v1 h-1 z M9,15 h1 v1 h-1 z M25,15 h1 v1 h-1 z M10,16 h1 v1 h-1 z M26,16 h1 v1 h-1 z M17,19 h1 v1 h-1 z M16,20 h1 v1 h-1 z M18,20 h1 v1 h-1 z M15,21 h1 v1 h-1 z M19,21 h1 v1 h-1 z M14,22 h1 v1 h-1 z M20,22 h1 v1 h-1 z M13,23 h1 v1 h-1 z M12,24 h1 v1 h-1 z M22,24 h1 v1 h-1 z M11,25 h1 v1 h-1 z M23,25 h1 v1 h-1 z M12,26 h1 v1 h-1 z M24,26 h1 v1 h-1 z M13,27 h1 v1 h-1 z M14,28 h1 v1 h-1 z" fill="#d84315" />
  </svg>
));

const TomatoPlantSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Stake */}
    <path d="M15,0 h1 v3 h-1 z M16,3 h1 v2 h-1 z M15,5 h1 v3 h-1 z M13,8 h1 v1 h-1 z M14,9 h1 v1 h-1 z M15,10 h1 v7 h-1 z M16,17 h1 v2 h-1 z M15,19 h1 v4 h-1 z M14,23 h1 v3 h-1 z M15,26 h1 v4 h-1 z" fill="#8d6e63" />
    <path d="M16,0 h1 v3 h-1 z M17,3 h1 v2 h-1 z M16,5 h1 v3 h-1 z M14,8 h1 v1 h-1 z M15,9 h1 v1 h-1 z M16,10 h1 v7 h-1 z M17,17 h1 v2 h-1 z M16,19 h1 v4 h-1 z M15,23 h1 v3 h-1 z M16,26 h1 v4 h-1 z" fill="#6d4c41" />
    {/* Vine & leaves */}
    <path d="M13,1 h1 v1 h-1 z M17,1 h1 v1 h-1 z M12,2 h1 v2 h-1 z M14,2 h1 v1 h-1 z M18,2 h1 v1 h-1 z M15,3 h1 v1 h-1 z M20,3 h1 v1 h-1 z M14,4 h1 v1 h-1 z M19,4 h1 v1 h-1 z M21,5 h1 v1 h-1 z M9,6 h1 v3 h-1 z M20,6 h1 v1 h-1 z M22,6 h1 v1 h-1 z M11,7 h1 v1 h-1 z M18,7 h1 v1 h-1 z M21,7 h1 v1 h-1 z M12,8 h1 v1 h-1 z M15,8 h2 v1 h-2 z M12,9 h2 v1 h-2 z M17,9 h1 v1 h-1 z M20,13 h2 v1 h-2 z M19,14 h1 v1 h-1 z M22,14 h1 v1 h-1 z M17,15 h1 v1 h-1 z M21,15 h2 v1 h-2 z M11,16 h1 v1 h-1 z M20,16 h1 v1 h-1 z M12,17 h1 v1 h-1 z M15,17 h1 v1 h-1 z M13,23 h1 v1 h-1 z M12,24 h1 v1 h-1 z M11,25 h1 v1 h-1 z M16,25 h1 v1 h-1 z M17,26 h1 v1 h-1 z M19,26 h1 v1 h-1 z M18,27 h1 v1 h-1 z M14,31 h1 v1 h-1 z M16,31 h1 v1 h-1 z" fill="#43a047" />
    <path d="M13,2 h1 v1 h-1 z M17,2 h1 v1 h-1 z M19,2 h1 v1 h-1 z M13,3 h2 v1 h-2 z M18,3 h2 v1 h-2 z M15,4 h1 v1 h-1 z M18,4 h1 v1 h-1 z M21,6 h1 v1 h-1 z M10,7 h1 v1 h-1 z M19,7 h2 v1 h-2 z M10,8 h2 v1 h-2 z M11,9 h1 v1 h-1 z M16,9 h1 v1 h-1 z M20,14 h2 v1 h-2 z M18,15 h3 v1 h-3 z M18,16 h2 v1 h-2 z M13,17 h2 v1 h-2 z M14,18 h2 v1 h-2 z M13,24 h1 v1 h-1 z M12,25 h2 v1 h-2 z M18,26 h1 v1 h-1 z M14,30 h4 v1 h-4 z M13,31 h1 v1 h-1 z M15,31 h1 v1 h-1 z M17,31 h2 v1 h-2 z" fill="#2e7d32" />
    <path d="M12,1 h1 v1 h-1 z M18,1 h1 v1 h-1 z M11,2 h1 v1 h-1 z M20,2 h1 v1 h-1 z M20,5 h1 v1 h-1 z M10,6 h1 v1 h-1 z M19,6 h1 v1 h-1 z M8,7 h1 v1 h-1 z M19,13 h1 v1 h-1 z M18,14 h1 v1 h-1 z M10,16 h1 v1 h-1 z M19,27 h1 v1 h-1 z" fill="#81c784" />
    <path d="M22,7 h1 v1 h-1 z M6,11 h2 v1 h-2 z M21,17 h2 v1 h-2 z M9,22 h2 v1 h-2 z" fill="#558b2f" />
    {/* Tomatoes */}
    <path d="M5,12 h4 v1 h-4 z M4,13 h1 v1 h-1 z M6,13 h4 v1 h-4 z M4,14 h5 v2 h-5 z M5,16 h3 v1 h-3 z M20,18 h4 v1 h-4 z M19,19 h1 v1 h-1 z M21,19 h4 v1 h-4 z M19,20 h5 v2 h-5 z M20,22 h3 v1 h-3 z M8,23 h4 v1 h-4 z M7,24 h1 v1 h-1 z M9,24 h3 v1 h-3 z M7,25 h4 v1 h-4 z M7,26 h5 v1 h-5 z M8,27 h3 v1 h-3 z" fill="#e53935" />
    <path d="M5,13 h1 v1 h-1 z M20,19 h1 v1 h-1 z M8,24 h1 v1 h-1 z" fill="#ff8a80" />
    <path d="M9,14 h1 v2 h-1 z M8,16 h1 v1 h-1 z M24,20 h1 v2 h-1 z M23,22 h1 v1 h-1 z M12,26 h1 v1 h-1 z M11,27 h1 v1 h-1 z" fill="#b71c1c" />
    <path d="M22,8 h3 v1 h-3 z M21,9 h4 v2 h-4 z M22,11 h2 v1 h-2 z" fill="#ff9800" />
  </svg>
));

const SucculentsSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Green rosette */}
    <path d="M12,9 h1 v1 h-1 z M17,9 h1 v1 h-1 z M11,10 h2 v1 h-2 z M14,10 h1 v1 h-1 z M17,10 h2 v1 h-2 z M10,11 h1 v2 h-1 z M13,11 h1 v1 h-1 z M15,11 h1 v1 h-1 z M17,11 h1 v1 h-1 z M19,11 h1 v3 h-1 z M12,12 h1 v1 h-1 z M15,12 h3 v1 h-3 z M9,13 h1 v1 h-1 z M13,13 h2 v1 h-2 z M16,13 h1 v1 h-1 z M21,13 h2 v1 h-2 z M26,13 h1 v1 h-1 z M10,14 h1 v1 h-1 z M15,14 h1 v1 h-1 z M20,14 h1 v1 h-1 z M25,14 h1 v1 h-1 z M12,15 h1 v2 h-1 z M23,15 h1 v1 h-1 z M14,16 h1 v1 h-1 z M21,16 h1 v1 h-1 z M13,17 h2 v1 h-2 z M19,17 h2 v1 h-2 z M14,18 h5 v1 h-5 z M15,19 h3 v1 h-3 z" fill="#66bb6a" />
    <path d="M11,11 h1 v2 h-1 z M14,11 h1 v1 h-1 z M18,11 h1 v2 h-1 z M13,12 h2 v1 h-2 z M10,13 h3 v1 h-3 z M17,13 h2 v1 h-2 z M23,13 h3 v1 h-3 z M11,14 h4 v1 h-4 z M16,14 h4 v1 h-4 z M21,14 h4 v1 h-4 z M13,15 h10 v1 h-10 z M15,16 h6 v1 h-6 z M15,17 h4 v1 h-4 z" fill="#2e7d32" />
    <path d="M12,8 h1 v1 h-1 z M17,8 h1 v1 h-1 z M11,9 h1 v1 h-1 z M14,9 h1 v1 h-1 z M18,9 h1 v1 h-1 z M10,10 h1 v1 h-1 z M13,10 h1 v1 h-1 z M15,10 h1 v1 h-1 z M19,10 h1 v1 h-1 z M12,11 h1 v1 h-1 z M16,11 h1 v1 h-1 z M9,12 h1 v1 h-1 z M20,12 h1 v2 h-1 z M15,13 h1 v1 h-1 z M11,15 h1 v1 h-1 z M24,15 h1 v1 h-1 z M13,16 h1 v1 h-1 z M22,16 h1 v1 h-1 z" fill="#a5d6a7" />
    {/* Blue-green rosette */}
    <path d="M4,19 h1 v1 h-1 z M3,20 h2 v1 h-2 z M6,20 h1 v1 h-1 z M3,21 h1 v1 h-1 z M5,21 h5 v1 h-5 z M2,22 h2 v2 h-2 z M7,22 h4 v1 h-4 z M8,23 h3 v1 h-3 z M1,24 h3 v1 h-3 z M9,24 h3 v2 h-3 z M2,25 h3 v1 h-3 z M3,26 h3 v1 h-3 z M8,26 h3 v1 h-3 z M3,27 h9 v1 h-9 z M5,28 h6 v1 h-6 z" fill="#80cbc4" />
    <path d="M4,21 h1 v1 h-1 z M4,22 h3 v1 h-3 z M4,23 h4 v1 h-4 z M4,24 h5 v1 h-5 z M5,25 h4 v1 h-4 z M6,26 h2 v1 h-2 z" fill="#26a69a" />
    <path d="M4,18 h1 v1 h-1 z M3,19 h1 v1 h-1 z M6,19 h1 v1 h-1 z M5,20 h1 v1 h-1 z M2,21 h1 v1 h-1 z M10,21 h1 v1 h-1 z M1,23 h1 v1 h-1 z M11,23 h1 v1 h-1 z M2,26 h1 v1 h-1 z M11,26 h1 v1 h-1 z M4,28 h1 v1 h-1 z M11,28 h1 v1 h-1 z" fill="#b2dfdb" />
    {/* Pink-tipped rosette */}
    <path d="M23,16 h1 v1 h-1 z M21,17 h1 v1 h-1 z M23,17 h2 v1 h-2 z M25,18 h1 v1 h-1 z M20,19 h1 v1 h-1 z M27,19 h1 v1 h-1 z M19,21 h1 v1 h-1 z M27,21 h1 v1 h-1 z M20,24 h1 v1 h-1 z M26,24 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M22,17 h1 v1 h-1 z M21,18 h4 v1 h-4 z M21,19 h6 v1 h-6 z M20,20 h3 v1 h-3 z M25,20 h2 v1 h-2 z M20,21 h2 v1 h-2 z M26,21 h1 v1 h-1 z M19,22 h2 v1 h-2 z M26,22 h2 v1 h-2 z M20,23 h2 v1 h-2 z M25,23 h2 v1 h-2 z M21,24 h5 v2 h-5 z" fill="#81c784" />
    <path d="M23,20 h2 v1 h-2 z M22,21 h4 v1 h-4 z M21,22 h5 v1 h-5 z M22,23 h3 v1 h-3 z" fill="#388e3c" />
  </svg>
));

const BlueberryBushSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Stem */}
    <path d="M14,24 h1 v7 h-1 z" fill="#8d6e63" />
    <path d="M15,24 h3 v7 h-3 z" fill="#6d4c41" />
    {/* Foliage */}
    <path d="M10,5 h1 v1 h-1 z M13,5 h3 v1 h-3 z M7,6 h4 v1 h-4 z M14,6 h2 v1 h-2 z M6,7 h1 v1 h-1 z M9,7 h7 v1 h-7 z M19,7 h1 v2 h-1 z M6,8 h3 v1 h-3 z M13,8 h3 v1 h-3 z M5,9 h3 v1 h-3 z M9,9 h1 v1 h-1 z M13,9 h4 v1 h-4 z M18,9 h3 v1 h-3 z M5,10 h5 v1 h-5 z M13,10 h2 v1 h-2 z M16,10 h5 v1 h-5 z M5,11 h4 v1 h-4 z M10,11 h3 v1 h-3 z M14,11 h7 v1 h-7 z M5,12 h1 v1 h-1 z M9,12 h6 v1 h-6 z M17,12 h3 v1 h-3 z M9,13 h5 v1 h-5 z M15,13 h1 v1 h-1 z M17,13 h2 v2 h-2 z M10,14 h6 v1 h-6 z M10,15 h8 v1 h-8 z M9,16 h3 v1 h-3 z M15,16 h2 v1 h-2 z" fill="#43a047" />
    <path d="M11,4 h10 v1 h-10 z M9,5 h1 v1 h-1 z M11,5 h1 v2 h-1 z M16,5 h7 v1 h-7 z M13,6 h1 v1 h-1 z M19,6 h6 v1 h-6 z M7,7 h1 v1 h-1 z M20,7 h6 v1 h-6 z M5,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z M20,8 h7 v1 h-7 z M8,9 h1 v1 h-1 z M17,9 h1 v1 h-1 z M21,9 h1 v3 h-1 z M25,9 h2 v2 h-2 z M4,10 h1 v3 h-1 z M15,10 h1 v1 h-1 z M9,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z M25,11 h1 v1 h-1 z M15,12 h2 v1 h-2 z M21,12 h4 v1 h-4 z M4,13 h2 v2 h-2 z M14,13 h1 v1 h-1 z M16,13 h1 v2 h-1 z M22,13 h2 v1 h-2 z M9,14 h1 v1 h-1 z M22,14 h1 v1 h-1 z M4,15 h5 v2 h-5 z M18,15 h1 v1 h-1 z M17,16 h4 v1 h-4 z M4,17 h8 v1 h-8 z M15,17 h5 v1 h-5 z M5,18 h3 v2 h-3 z M11,18 h1 v1 h-1 z M15,18 h4 v1 h-4 z M11,19 h5 v2 h-5 z M6,20 h2 v1 h-2 z M7,21 h9 v1 h-9 z M9,22 h6 v1 h-6 z M11,23 h3 v1 h-3 z" fill="#2e7d32" />
    <path d="M27,10 h1 v1 h-1 z M26,11 h2 v1 h-2 z M25,12 h3 v1 h-3 z M24,13 h4 v1 h-4 z M23,14 h5 v1 h-5 z M22,15 h3 v1 h-3 z M21,16 h4 v1 h-4 z M20,17 h5 v1 h-5 z M19,18 h8 v2 h-8 z M19,20 h4 v2 h-4 z M15,22 h8 v1 h-8 z M14,23 h7 v1 h-7 z" fill="#1b5e20" />
    <path d="M12,5 h1 v2 h-1 z M8,7 h1 v1 h-1 z M20,12 h1 v1 h-1 z M9,15 h1 v1 h-1 z" fill="#81c784" />
    {/* Blueberries */}
    <path d="M17,6 h2 v1 h-2 z M16,7 h3 v1 h-3 z M11,8 h2 v1 h-2 z M16,8 h2 v1 h-2 z M10,9 h3 v1 h-3 z M23,9 h2 v1 h-2 z M10,10 h2 v1 h-2 z M22,10 h3 v1 h-3 z M22,11 h2 v1 h-2 z M7,12 h2 v1 h-2 z M6,13 h3 v1 h-3 z M20,13 h2 v1 h-2 z M6,14 h2 v1 h-2 z M19,14 h3 v1 h-3 z M19,15 h2 v1 h-2 z M26,15 h2 v1 h-2 z M13,16 h2 v1 h-2 z M25,16 h3 v1 h-3 z M12,17 h3 v1 h-3 z M25,17 h2 v1 h-2 z M9,18 h2 v1 h-2 z M12,18 h2 v1 h-2 z M8,19 h3 v1 h-3 z M17,19 h2 v1 h-2 z M8,20 h2 v1 h-2 z M16,20 h3 v1 h-3 z M24,20 h2 v1 h-2 z M16,21 h2 v1 h-2 z M23,21 h3 v1 h-3 z M23,22 h2 v1 h-2 z" fill="#3f51b5" />
    <path d="M18,8 h1 v1 h-1 z M12,10 h1 v1 h-1 z M24,11 h1 v1 h-1 z M8,14 h1 v1 h-1 z M21,15 h1 v1 h-1 z M27,17 h1 v1 h-1 z M14,18 h1 v1 h-1 z M10,20 h1 v1 h-1 z M18,21 h1 v1 h-1 z M25,22 h1 v1 h-1 z" fill="#1a237e" />
    <path d="M16,6 h1 v1 h-1 z M10,8 h1 v1 h-1 z M22,9 h1 v1 h-1 z M6,12 h1 v1 h-1 z M19,13 h1 v1 h-1 z M25,15 h1 v1 h-1 z M12,16 h1 v1 h-1 z M8,18 h1 v1 h-1 z M16,19 h1 v1 h-1 z M23,20 h1 v1 h-1 z" fill="#9fa8da" />
  </svg>
));

const KittenSprite = React.memo(({ gray = false, hat = null }) => {
  const fur = gray ? "#bdbdbd" : "#ffb74d";
  const shade = gray ? "#9e9e9e" : "#fb8c00";
  // Wizard hat colours: [cone, cone shade, brim]
  const hatColors = hat === 'purple' ? ["#7e57c2", "#5e35b1", "#4527a0"] : ["#42a5f5", "#1e88e5", "#1565c0"];

  return (
    <svg viewBox="0 0 14 11" className="w-full h-full drop-shadow-sm" overflow="visible" shapeRendering="crispEdges">
      {hat && (
        <>
          {/* Wizard hat (the cone rises above the sprite box) */}
          <path d="M7,0 h8 v1 h-8 z" fill={hatColors[2]} />
          <path d="M8,-1 h6 v1 h-6 z M9,-2 h5 v1 h-5 z M9,-3 h4 v1 h-4 z M10,-4 h3 v1 h-3 z M10,-5 h2 v1 h-2 z M11,-6 h1 v1 h-1 z" fill={hatColors[0]} />
          <path d="M13,-2 h1 v2 h-1 z M12,-4 h1 v2 h-1 z M11,-5 h1 v1 h-1 z" fill={hatColors[1]} />
          <path d="M11,-3 h1 v3 h-1 z M10,-2 h3 v1 h-3 z M10,-4 h1 v1 h-1 z" fill="#fdd835" />
        </>
      )}
      {/* Head, ears & body */}
      <path d="M9,0 h1 v1 h-1 z M12,0 h1 v1 h-1 z M8,1 h6 v3 h-6 z M4,4 h9 v1 h-9 z M3,5 h11 v1 h-11 z M3,6 h10 v2 h-10 z M3,8 h9 v1 h-9 z" fill={fur} />
      {/* Legs, tail & tabby stripes */}
      <path d="M3,9 h2 v2 h-2 z M6,9 h2 v2 h-2 z M9,9 h2 v2 h-2 z M1,5 h1 v3 h-1 z M2,8 h1 v1 h-1 z M5,5 h1 v1 h-1 z M7,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z" fill={shade} />
      {/* Ears, nose & eyes */}
      <path d="M9,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z M13,4 h1 v1 h-1 z" fill="#f48fb1" />
      <path d="M10,3 h1 v1 h-1 z M12,3 h1 v1 h-1 z" fill="#43a047" />
    </svg>
  );
});

// Which tile each damaged plot, soil bed and planted crop is drawn with
const DAMAGED_PLOT_SPRITES = { compaction: CompactedPlotSprite, erosion: ErodingPlotSprite, drainage: FloodedPlotSprite };
const SOIL_BED_SPRITES = { tomato: LoamBedSprite, succulent: SandyBedSprite, blueberry: AcidicBedSprite };
const PLANT_SPRITES = { tomato: TomatoPlantSprite, succulent: SucculentsSprite, blueberry: BlueberryBushSprite };

const PixelBox = ({ children, className = "" }) => (
  <div className={`bg-[#f4e2b8] border-4 border-[#8b5a2b] shadow-[inset_0_0_0_4px_#a0522d] p-4 font-mono text-[#3e2723] ${className}`}>
    {children}
  </div>
);

const DialogBox = ({ name, portrait, text, onNext, hideNext, emotion = 'normal', bottomClass = 'bottom-4' }) => {
  let imgSrc = `${BASE}/wallace.png`;
  let fbSrc = `${BASE}/wallace.png`;

  if (emotion === 'sad' || emotion === 'angry') {
    imgSrc = `${BASE}/sad.png`;
    fbSrc = `${BASE}/sad.png`;
  } else if (emotion === 'surprised') {
    imgSrc = `${BASE}/surprised.png`;
    fbSrc = `${BASE}/surprised.png`;
  }

  return (
    <div className={`fixed ${bottomClass} left-1/2 -translate-x-1/2 w-full max-w-3xl px-2 md:px-4 z-50 animate-fade-in-up`}>
      <PixelBox className="flex gap-4 items-start relative shadow-2xl bg-[rgba(244,226,184,0.85)]">
        {(portrait || name === 'Wallace') && (
          <div className="flex flex-col items-center shrink-0">
            <div className="w-20 h-20 bg-[#d7ccc8] border-4 border-[#5d4037] flex items-center justify-center text-4xl overflow-hidden relative">
              {name === 'Wallace' ? (
                <>
                  <img src={imgSrc} alt={`Wallace ${emotion}`} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = fbSrc; }} />
                  {emotion === 'angry' && <div className="absolute top-1 right-1 text-2xl animate-bounce drop-shadow-md">💢</div>}
                </>
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${name === 'You' || name === 'Instructor' ? '' : 'p-2'}`}>{portrait}</div>
              )}
            </div>
            {name && <span className="text-xs font-bold text-[#5d4037] mt-1">{name}</span>}
          </div>
        )}
        <div className="flex-1 pr-10">
          {name && !(portrait || name === 'Wallace') && <h3 className="font-bold text-xl mb-1 text-[#5d4037]">{name}</h3>}
          <p className="text-sm md:text-base leading-relaxed break-words">{text}</p>
        </div>
        {!hideNext && (
          <button 
            onClick={onNext}
            className="absolute bottom-2 right-2 animate-bounce text-xl bg-[#8b5a2b] text-white px-3 py-1 rounded hover:bg-[#5d4037]"
          >
            ▼
          </button>
        )}
      </PixelBox>
    </div>
  );
};

// The classroom is drawn on a 242x167 "bit" grid; this places a sprite on that grid so the whole scene scales together.
const classroomSpot = (x, y, w, h) => ({ left: `${x / 2.42}%`, top: `${y / 1.67}%`, width: `${w / 2.42}%`, height: `${h / 1.67}%` });

const ClassroomScene = ({ farmerEyes = 'open', farmerJolts = false, instructorAngry = false }) => (
  <div className="w-full max-w-[372px] md:max-w-[500px] border-8 border-[#5d4037] shadow-2xl mb-4 md:mb-24">
    <div className="aspect-[242/167] bg-[#d7ccc8] relative overflow-hidden">
      <div className="absolute inset-0"><ClassroomBackdropSprite /></div>
      <div className="absolute" style={classroomSpot(37, 53, 48, 52)}>
        <InstructorSprite />
        {instructorAngry && <div className="absolute -top-[10%] left-[42%] text-2xl animate-bounce text-red-500 font-bold">💢</div>}
      </div>
      <div className="absolute" style={classroomSpot(152, 118, 40, 18)}><ClassDeskSprite paper="#fbcfe8" /></div>
      <div className="absolute" style={classroomSpot(152, 96, 40, 26)}><StudentPonytailSprite /></div>
      <div className="absolute" style={classroomSpot(10, 136, 40, 18)}><ClassDeskSprite /></div>
      <div className="absolute" style={classroomSpot(10, 114, 40, 26)}><StudentBlondeSprite /></div>
      <div className="absolute" style={classroomSpot(192, 136, 40, 18)}><ClassDeskSprite paper="#fdd835" /></div>
      <div className="absolute" style={classroomSpot(192, 114, 40, 26)}><StudentBrownHairSprite /></div>
      <div className={`absolute ${farmerJolts ? 'animate-[bounce_0.5s_ease-out_2]' : ''}`} style={classroomSpot(101, 114, 40, 38)}>
        <SeatedFarmerSprite eyes={farmerEyes} />
        {farmerJolts && <div key="alert-bubble" className="absolute -top-4 right-0 text-xl animate-pulse text-red-600 font-bold">❗</div>}
      </div>
      <div className="absolute" style={classroomSpot(101, 140, 40, 18)}><ClassDeskSprite /></div>
    </div>
  </div>
);

export default function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState('TITLE'); 
  const [dreamStage, setDreamStage] = useState('INTRO_DIALOG'); 
  const [matchPhase, setMatchPhase] = useState(0); 
  const [combinedBins, setCombinedBins] = useState([]); 
  const [dialogIndex, setDialogIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [crows, setCrows] = useState([]);
  const [isChapterSelectOpen, setIsChapterSelectOpen] = useState(false);

  // Title effects
  const [sakuraClicks, setSakuraClicks] = useState([]);
  const [bugsClicks, setBugsClicks] = useState([]);
  const [butterflyBursts, setButterflyBursts] = useState([]);
  const [lingeringBugs, setLingeringBugs] = useState({ bees: [], woodlice: [] });
  const [henHearts, setHenHearts] = useState([]);
  const [isChopping, setIsChopping] = useState(false);
  const [isPrepping, setIsPrepping] = useState(false);

  const handleHenClick = (e, henName) => {
    e.stopPropagation();
    const id = Date.now() + Math.random();
    setHenHearts(prev => [...prev, { id, hen: henName }]);
    playSfx(riotBeyonceTapSound);
    setTimeout(() => {
      setHenHearts(prev => prev.filter(h => h.id !== id));
    }, 1000);
  };

  const triggerSakura = () => {
    const id = Date.now();
    const petals = [...Array(30)].map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 2,
      tx: (Math.random() - 0.5) * 300
    }));

    playSfx(sakuraSound);
    setSakuraClicks(prev => [...prev, { id, petals }]);
    setTimeout(() => setSakuraClicks(prev => prev.filter(c => c.id !== id)), 4000);
  };

  const triggerBugs = () => {
    const id = Date.now();
    
    const bees = [...Array(15)].map(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 250;
      return {
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        duration: 0.8 + Math.random()
      };
    });
    
    const woodlice = [...Array(12)].map(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 150;
      const ty = Math.sin(angle) * dist;
      const tx = Math.cos(angle) * dist;
      return {
        tx, ty,
        rot: Math.atan2(ty, tx),
        duration: 1.2 + Math.random() * 0.8
      };
    });

    setBugsClicks(prev => [...prev, { id, bees, woodlice }]);
    setTimeout(() => setBugsClicks(prev => prev.filter(c => c.id !== id)), 2000);

    // Add persistent lingering bugs to the background
    setLingeringBugs(prev => {
      const newBees = [...prev.bees];
      for (let i = 0; i < 3; i++) {
         const anims = ['animate-fly', 'animate-fly-delayed', 'animate-fly-fast'];
         newBees.push({
           id: id + 'b' + i,
           x: Math.random() * 80 + 10,
           y: Math.random() * 80 + 10,
           anim: anims[Math.floor(Math.random() * anims.length)],
           zoomed: false
         });
      }
      
      const newWoodlice = [...prev.woodlice];
      for (let i = 0; i < 2; i++) {
         newWoodlice.push({
           id: id + 'w' + i,
           y: Math.random() * 90 + 5,
           duration: 10 + Math.random() * 15,
           dir: Math.random() > 0.5 ? 'lr' : 'rl',
           rolled: false
         });
      }
      
      return {
        bees: newBees.slice(-20), // Cap max bees so it doesn't crash browsers
        woodlice: newWoodlice.slice(-15) // Cap max woodlice
      };
    });
  };

  const triggerButterflies = (e) => {
    e.stopPropagation();
    playSfx(butterflyTapSound);
    const x = e.clientX;
    const y = e.clientY;
    const id = Date.now() + Math.random();
    
    // Pre-calculate randomized animation data so re-renders don't scramble them
    const butterflies = [...Array(6)].map(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 150;
      return {
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 40,
        spriteIdx: Math.floor(Math.random() * 3),
        duration: 1.5 + Math.random(),
        flapDuration: 0.1 + Math.random() * 0.1
      };
    });
    
    setButterflyBursts(prev => [...prev, { id, x, y, butterflies }]);
    setTimeout(() => setButterflyBursts(prev => prev.filter(b => b.id !== id)), 2500);
  };

  const handleBeeClick = (id) => {
    playSfx(beeTapSound);
    setLingeringBugs(prev => ({
      ...prev,
      bees: prev.bees.map(b => b.id === id ? { ...b, zoomed: true } : b)
    }));
  };

  const handleWoodlouseClick = (id) => {
    playSfx(woodliceSound);
    setLingeringBugs(prev => ({
      ...prev,
      woodlice: prev.woodlice.map(w => w.id === id ? { ...w, rolled: true } : w)
    }));
  };

  const audioRef = useRef(null);
  const wowAudioRef = useRef(null);
  const introAnxietyRef = useRef(null);
  const preloadedSfx = useRef({});
  const catAudioCtxRef = useRef(null);
  const catAnimFrameRef = useRef(null);
  const catIsPlayingRef = useRef(false);
  const catRef = useRef(null);
  const catOrbitFrameRef = useRef(null);
  const gameFieldRef = useRef(null);
  const catShouldMoveRef = useRef(false);
  const raveOverlayRef = useRef(null);
  const raveColorIdxRef = useRef(0);
  const raveColors = ['#ff00ff','#00ffff','#ffff00','#ff0055','#00ff88','#aa00ff','#ff6600'];
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioDismissed, setAudioDismissed] = useState(false);
  const [volume, setVolume] = useState(() => {
    try {
      const saved = parseFloat(localStorage.getItem('mc-volume'));
      return Number.isFinite(saved) ? Math.min(1, Math.max(0, saved)) : 1;
    } catch { return 1; }
  });
  const volumeRef = useRef(volume);

  // Master volume: background music sits at 15% of it, the "wow" sting at 60%, every other SFX at 100%.
  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = 0.15 * volume;
    if (wowAudioRef.current) wowAudioRef.current.volume = 0.6 * volume;
    Object.values(preloadedSfx.current).forEach(sfx => { sfx.volume = volume; });
    try { localStorage.setItem('mc-volume', String(volume)); } catch { /* storage unavailable */ }
  }, [volume]);

  const [cauldron, setCauldron] = useState([]);
  const [completedExamples, setCompletedExamples] = useState([]);
  const [fixedPlots, setFixedPlots] = useState([]);
  const [answeredPlots, setAnsweredPlots] = useState([]);
  const [activePlot, setActivePlot] = useState(null);
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);
  const [plotItems, setPlotItems] = useState([]); 
  const [appliedItems, setAppliedItems] = useState([]); // TRACKS ITEMS BROUGHT TO PLOT
  const [plantedBeds, setPlantedBeds] = useState({});
  const [isStirring, setIsStirring] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const [isWorking, setIsWorking] = useState(false); 

  const [heldItem, setHeldItem] = useState(null);
  const [groundItems, setGroundItems] = useState([]);
  const farmerPosRef = useRef({ x: 150, y: 150, isWalking: false });
  const [farmerRenderPos, setFarmerRenderPos] = useState({ x: 150, y: 150, isWalking: false });
  const wallacePosRef = useRef({ x: 100, y: 165 });
  const [wallaceRenderPos, setWallaceRenderPos] = useState({ x: 100, y: 165 });
  const wallaceDirRef = useRef('right');
  const [wallaceDir, setWallaceDir] = useState('right');
  const farmerHistoryRef = useRef(Array(45).fill({ x: 100, y: 165 }));
  const keys = useRef({});
  const targetPosRef = useRef(null);
  const [gameScale, setGameScale] = useState(1);

  const [toastMsg, setToastMsg] = useState(null);
  const [wallaceEmotion, setWallaceEmotion] = useState('normal');
  const [catSpinning, setCatSpinning] = useState(false);

  const handleCatClick = () => {
    if (catIsPlayingRef.current) return;
    catIsPlayingRef.current = true;

    const stopOrbit = () => {
      cancelAnimationFrame(catOrbitFrameRef.current);
      if (catRef.current) {
        catRef.current.style.left = '';
        catRef.current.style.top = '';
        catRef.current.style.bottom = '';
      }
    };

    const startOrbit = () => {
      const catEl = catRef.current;
      const fieldEl = gameFieldRef.current;
      if (!catEl || !fieldEl) return;
      const sceneEl = catEl.offsetParent;
      if (!sceneEl) return;
      const fieldRect = fieldEl.getBoundingClientRect();
      const sceneRect = sceneEl.getBoundingClientRect();
      const cx = fieldRect.left - sceneRect.left + fieldRect.width / 2;
      const cy = fieldRect.top - sceneRect.top + fieldRect.height / 2;
      const rx = fieldRect.width / 2 + 28;
      const ry = fieldRect.height / 2 + 28;
      const catRect = catEl.getBoundingClientRect();
      const catCx = catRect.left - sceneRect.left + catEl.offsetWidth / 2;
      const catCy = catRect.top - sceneRect.top + catEl.offsetHeight / 2;
      let angle = Math.atan2((catCy - cy) / ry, (catCx - cx) / rx);
      const animate = () => {
        if (catShouldMoveRef.current) {
          angle -= 0.01;
          catEl.style.left = `${cx + rx * Math.cos(angle) - catEl.offsetWidth / 2}px`;
          catEl.style.top = `${cy + ry * Math.sin(angle) - catEl.offsetHeight / 2}px`;
          catEl.style.bottom = 'auto';
        }
        catOrbitFrameRef.current = requestAnimationFrame(animate);
      };
      catOrbitFrameRef.current = requestAnimationFrame(animate);
    };

    const reset = () => {
      cancelAnimationFrame(catAnimFrameRef.current);
      stopOrbit();
      setCatSpinning(false);
      catShouldMoveRef.current = false;
      catIsPlayingRef.current = false;
      if (raveOverlayRef.current) raveOverlayRef.current.style.opacity = '0';
      catAudioCtxRef.current?.close();
      catAudioCtxRef.current = null;
    };

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      catAudioCtxRef.current = audioCtx;

      const audio = new Audio(oiiaCatSound);
      audio.crossOrigin = 'anonymous';
      audio.volume = volumeRef.current;

      const source = audioCtx.createMediaElementSource(audio);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let currentSpin = false;
      let raveFrame = 0;
      const raveStartTime = Date.now() + 5000;

      const tick = () => {
        analyser.getByteFrequencyData(dataArray);

        // Overall amplitude → spin
        const avg = dataArray.reduce((s, v) => s + v, 0) / dataArray.length;
        const shouldSpin = avg > 8;
        if (shouldSpin !== currentSpin) {
          currentSpin = shouldSpin;
          catShouldMoveRef.current = shouldSpin;
          setCatSpinning(shouldSpin);
        }

        // Bass bins (0-3) → rave overlay
        const bassAvg = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
        const hasBass = bassAvg > 230 && Date.now() >= raveStartTime;
        if (raveOverlayRef.current) {
          if (hasBass) {
            raveFrame++;
            if (raveFrame % 12 === 0) {
              raveColorIdxRef.current = (raveColorIdxRef.current + 1) % raveColors.length;
              raveOverlayRef.current.style.backgroundColor = raveColors[raveColorIdxRef.current];
            }
            raveOverlayRef.current.style.opacity = '0.45';
          } else {
            raveFrame = 0;
            raveOverlayRef.current.style.opacity = '0';
          }
        }

        catAnimFrameRef.current = requestAnimationFrame(tick);
      };

      audioCtx.resume().then(() => audio.play()).then(() => {
        catAnimFrameRef.current = requestAnimationFrame(tick);
        startOrbit();
      }).catch(reset);

      audio.onended = reset;
    } catch {
      reset();
    }
  };

  const toastTimerRef = useRef(null);
  const showToast = (msg, emotion = 'normal') => {
    setToastMsg(msg);
    if (emotion !== 'normal') setWallaceEmotion(emotion);
    // A newer toast restarts the clock, so an older toast's timer can't hide it early
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMsg(null);
      setWallaceEmotion('normal');
    }, 3500);
  };

  const loseLife = (msg, emotion = 'sad') => {
    if (msg) showToast(msg, emotion);

    const id = Date.now() + Math.random();

    let targetX = window.innerWidth / 2 - 40;
    let targetY = 40;
    if (heartsRef.current) {
      const rect = heartsRef.current.getBoundingClientRect();
      targetX = rect.left + rect.width / 2 - 40;
      targetY = rect.top - 10;
    }

    setCrows(prev => [...prev, { id, targetX, targetY }]);

    // Decrement life and play sound when the crow grabs the heart (skip on final heart to avoid clashing with nightmare sound)
    const isLastHeart = lives === 1;
    setTimeout(() => {
      setLives(l => Math.max(0, l - 1));
      if (!isLastHeart) { playSfx(loseHeartSound); }
    }, 1700);

    // Remove crow after full animation finishes
    setTimeout(() => {
      setCrows(prev => prev.filter(c => c.id !== id));
    }, 3500);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15 * volumeRef.current;
      audioRef.current.play().catch(() => {});
    }
    setIsMusicPlaying(true);
    if (wowAudioRef.current) wowAudioRef.current.load();
    // Pre-unlock sounds that play outside user gesture handlers (setTimeout/useEffect).
    // audio.volume is read-only on iOS so volume=0 plays audibly — use muted=true instead,
    // which iOS respects as a logical property and genuinely silences the brief unlock play.
    [loseHeartSound, nightmareSound, wakeUpSound, questSound, introAnxietySound].forEach(url => {
      const sfx = preloadedSfx.current[url];
      if (sfx) {
        sfx.muted = true;
        sfx.play().then(() => { sfx.pause(); sfx.muted = false; sfx.currentTime = 0; }).catch(() => {});
      }
    });
  };

  useEffect(() => {
    SOUND_URLS.forEach(url => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audio.load();
      preloadedSfx.current[url] = audio;
    });
  }, []);

  const playSfx = (url) => {
    const sfx = preloadedSfx.current[url];
    if (!sfx) return;
    sfx.currentTime = 0;
    sfx.volume = volumeRef.current;
    sfx.play().catch(() => {});
  };

  const stopAllSfx = () => {
    Object.values(preloadedSfx.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    if (wowAudioRef.current) {
      wowAudioRef.current.pause();
      wowAudioRef.current.currentTime = 0;
    }
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const heartsRef = useRef(null);
  const prevGameState = useRef(gameState);

  // Centralized audio controller
  useEffect(() => {
    if (!audioRef.current || !audioDismissed) return;

    const allowedScenes = gameState === 'TITLE' || (gameState === 'DREAM' && !['NIGHTMARE_END', 'WAKE_UP'].includes(dreamStage));

    // Restart the music when transitioning into the title screen or starting the dream
    if (prevGameState.current !== gameState) {
      if (gameState === 'DREAM' || gameState === 'TITLE') {
        audioRef.current.currentTime = 0;
      }
    }
    prevGameState.current = gameState;

    if (allowedScenes && isMusicPlaying) {
      audioRef.current.play().catch(() => setIsMusicPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [gameState, dreamStage, audioDismissed, isMusicPlaying]);

  const introStory = [
    "9:00 AM Saturday: You wake up and look around the room. You see a big red circle on today's date on your calendar.",
    "You couldn't sleep well. Dogs were barking, the neighbors were having a party, and the babies—oh, the sweet babies—were crying throughout the night.",
    "Ugh, I'm exhausted... My brain feels like a browser with 40 tabs open and with terrible Wi-Fi.",
    "But today is important. It's the Master Composter class at 10:00 AM.",
    "You grab a quick breakfast bar, hop in the car, and get going to class."
  ];

  const classStory = [
    "10:00 AM - The Classroom.",
    "The instructor is talking about soil profiles. You're trying your best to pay attention.",
    "With the little sleep you got last night, your eyelids grow incredibly heavy.",
    "The instructor's voice fades into a low hum... Zzzzz..."
  ];

  const wormIntro = [
    "Howdy partner! I'm Wallace the Fellow Worm!",
    "You fell asleep in class, didn't ya? Well, you're in the Soil Realm now!",
    "You can't wake up until you master the secrets of the dirt. Let's get to work on the farm!"
  ];

  const endStory = [
    "You did it! The farm is thriving!",
    "I reckon you're ready to go back to the surface now. Wake up, Master Composter!"
  ];

  const nightmareStory = [
    "WHAT DID YOU DO?! The soil is completely dead! *sniff* I'm so angry and sad...",
    "Nothing will grow here now. It's a barren wasteland on fire! You've ruined the farm!",
    "Wake up! You need to study more before you try farming!"
  ];

  const wakeUpStory = [
    { name: "Reality", portrait: null, text: "You jolt awake in your chair at the Master Composting class." },
    { name: "Instructor", portrait: <InstructorPortrait />, text: "...and that concludes our section on soil properties and compost components!" },
    { name: "You", portrait: <StudentPortrait />, text: "(Whoa... I actually understood all of that. The dream made perfect sense!)" },
    { name: "You", portrait: <StudentPortrait />, text: "(I know the 4 soil components, how to create compost, how to manage soil problems, and the optimal plant soils!)" }
  ];

  const badWakeUpStory = [
    { name: "Reality", portrait: null, text: "You jolt awake in your chair at the Master Composting class, sweating." },
    { name: "Instructor", portrait: <InstructorPortrait />, text: "Hey! Are you sleeping in my class? Soil properties are NOT nap material!" },
    { name: "You", portrait: <StudentPortrait />, text: "(Oh no... I got caught... and that nightmare was awful. I didn't learn a thing.)" },
    { name: "You", portrait: <StudentPortrait />, text: "(I need to pay better attention next time...)" }
  ];

  const activeWakeUpStory = lives > 0 ? wakeUpStory : badWakeUpStory;

  const handleDialogNext = (script, nextStage) => {
    if (dialogIndex < script.length - 1) { setDialogIndex(dialogIndex + 1); }
    else { setDialogIndex(0); setDreamStage(nextStage); }
  };

  const handleStartDream = () => { setGameState('DREAM'); };

  const jumpToChapter = (stage) => {
    setDreamStage(stage); setDialogIndex(0); setCauldron([]); setCompletedExamples([]);
    setFixedPlots([]); setAnsweredPlots([]); setActivePlot(null); setPlotItems([]); setIsFixModalOpen(false);
    setAppliedItems([]); setPlantedBeds({}); setMatchPhase(0); setCombinedBins([]);
    setAudioDismissed(true); setIsChapterSelectOpen(false);
    setLives(stage === 'NIGHTMARE_END' ? 0 : 3); setCrows([]);
    setGameState('DREAM');
  };

  // Watch for game over / lives empty
  useEffect(() => {
    if (lives <= 0 && gameState === 'DREAM' && !['NIGHTMARE_END', 'WAKE_UP'].includes(dreamStage)) {
       setDreamStage('NIGHTMARE_END');
       setDialogIndex(0);
       setIsFixModalOpen(false);
       setHeldItem(null);
    }
  }, [lives, gameState, dreamStage]);

  useEffect(() => {
    if (dreamStage === 'WAKE_UP' && dialogIndex >= wakeUpStory.length && lives > 0) {
      playSfx(questSound);
    }
  }, [dreamStage, dialogIndex, lives]);

  useEffect(() => {
    if (dreamStage === 'END_DIALOG' && lives > 0) {
      if (wowAudioRef.current) {
        wowAudioRef.current.currentTime = 0;
        wowAudioRef.current.volume = 0.6 * volumeRef.current;
        wowAudioRef.current.play().catch(() => {});
      }
    }
    if (dreamStage === 'NIGHTMARE_END') {
      if (audioRef.current) { audioRef.current.currentTime = 0; }
      playSfx(nightmareSound);
    }
    if (dreamStage === 'WAKE_UP') {
      if (audioRef.current) { audioRef.current.currentTime = 0; }
      playSfx(wakeUpSound);
    }
  }, [dreamStage, lives]);

  useEffect(() => {
    if (gameState === 'SLEEP_TRANSITION') {
      const timer = setTimeout(() => handleStartDream(), 4000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (!introAnxietyRef.current) {
      const sfx = preloadedSfx.current[introAnxietySound];
      if (!sfx) return;
      introAnxietyRef.current = sfx;
      introAnxietyRef.current.loop = true;
    }
    const audio = introAnxietyRef.current;
    const shouldPlay = ['INTRO', 'CLASS', 'SLEEP_TRANSITION'].includes(gameState);
    if (shouldPlay) {
      if (audio.paused) audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [gameState]);

  const initializeGroundItems = () => {
    const items = [...SOIL_COMPONENTS, ...FALSE_COMPONENTS]
      .sort(() => Math.random() - 0.5)
      .map((name, idx) => ({ id: `craft-${idx}`, name, x: 20 + Math.random() * 260, y: 110 + Math.random() * 140 }));
    setGroundItems(items);
    setCauldron([]); setHeldItem(null);
    farmerPosRef.current = { x: 150, y: 150, isWalking: false };
    setFarmerRenderPos({ x: 150, y: 150, isWalking: false });
  };

  const initializeExamplesItems = (phase = 0) => {
    let items = [];
    if (phase === 0) items = EXAMPLE_ITEMS.filter(i => i.comp.includes('Nitrogen') || i.comp.includes('Carbon'));
    else if (phase === 2) items = [EXAMPLE_ITEMS.find(i => i.id === 'ex_w')];
    else if (phase === 3) items = [EXAMPLE_ITEMS.find(i => i.id === 'ex_a')];

    const positionedItems = items.map((item) => ({ ...item, x: 40 + Math.random() * 220, y: 110 + Math.random() * 140 }));
    setGroundItems(positionedItems); setHeldItem(null);
    if (phase === 0) {
      farmerPosRef.current = { x: 150, y: 150, isWalking: false };
      setFarmerRenderPos({ x: 150, y: 150, isWalking: false });
      setCompletedExamples([]); setMatchPhase(0); setCombinedBins([]);
    }
  };

  useEffect(() => {
     if (dreamStage === 'CRAFT_SOIL') initializeGroundItems();
     else if (dreamStage === 'MATCH_EXAMPLES') initializeExamplesItems(0);
     else if (dreamStage === 'FIX_PLOTS') {
       farmerPosRef.current = { x: 150, y: 220, isWalking: false };
       setFarmerRenderPos({ x: 150, y: 220, isWalking: false });
       wallacePosRef.current = { x: 134, y: 228 }; setWallaceRenderPos({ ...wallacePosRef.current }); farmerHistoryRef.current = [];
       setGroundItems([]); setHeldItem(null); setAppliedItems([]);
     } else if (dreamStage === 'PLANT_SEEDS') {
       const seeds = PLANTS.slice(0, 3).map((p, i) => ({ ...p, x: 50 + (i * 100), y: 230 }));
       setGroundItems(seeds); setHeldItem(null);
       farmerPosRef.current = { x: 150, y: 150, isWalking: false };
       setFarmerRenderPos({ x: 150, y: 150, isWalking: false });
       wallacePosRef.current = { x: 134, y: 158 }; setWallaceRenderPos({ ...wallacePosRef.current }); farmerHistoryRef.current = [];
     }
  }, [dreamStage]);

  useEffect(() => {
    if (dreamStage === 'CRAFT_SOIL' && cauldron.length === 4) {
      const isCorrect = cauldron.every(c => SOIL_COMPONENTS.includes(c));
      if (isCorrect) {
        setIsStirring(true); showToast("Stirring it all together...", 'surprised');
        playSfx(pitchforkSound);
        setTimeout(() => { setIsStirring(false); showToast("Perfect! Compost is made!", 'surprised'); setTimeout(() => setDreamStage('MATCH_EXAMPLES'), 2000); }, 2000);
      } else {
        setTimeout(() => { 
           loseLife("Wallace: That ain't soil! Try again.", 'sad');
           initializeGroundItems(); 
        }, 2000);
      }
    }
  }, [cauldron, dreamStage]);

  useEffect(() => {
    if (dreamStage === 'MATCH_EXAMPLES') {
      if (matchPhase === 0) {
        // Use a helper to correctly identify the component even if it was chopped/prepped
        const getComp = (id) => {
           if (id === 'ex_n2' || id === 'ex_n2_chopped') return '🍃 Nitrogen (Greens)';
           if (id === 'ex_c2' || id === 'ex_c2_prepped') return '🍂 Carbon (Browns)';
           return EXAMPLE_ITEMS.find(i => i.id === id)?.comp;
        };
        const greens = completedExamples.filter(id => getComp(id)?.includes('Nitrogen')).length;
        const browns = completedExamples.filter(id => getComp(id)?.includes('Carbon')).length;
        if (greens === 3 && browns === 3) { setMatchPhase(1); showToast("Bins are full! Combine them in the center pile!", 'surprised'); }
      } else if (matchPhase === 1 && combinedBins.length === 2) {
        setMatchPhase(2); initializeExamplesItems(2); showToast("Combined! Water the pile.", 'surprised');
      }
    }
  }, [completedExamples, combinedBins, matchPhase, dreamStage]);

  useEffect(() => {
    const rootEl = document.getElementById('root');
    const update = () => {
      const available = rootEl ? rootEl.clientWidth : window.innerWidth;
      setGameScale(Math.min((available - 32) / 340, 1.3));
    };
    update();
    const ro = new ResizeObserver(update);
    if (rootEl) ro.observe(rootEl);
    return () => ro.disconnect();
  }, []);

  const handleApplyItemToPlot = () => {
    // Check if the held item is correct for the active plot
    let isCorrectTool = false;
    if (activePlot.id === 'compaction' && (heldItem.id === 'tool_p' || heldItem.id === 'item_om')) isCorrectTool = true;
    if (activePlot.id === 'erosion' && (heldItem.id === 'item_cc' || heldItem.id === 'item_m')) isCorrectTool = true;
    if (activePlot.id === 'drainage' && (heldItem.id === 'tool_h' || heldItem.id === 'item_om2')) isCorrectTool = true;

    if (!isCorrectTool) {
        loseLife("Wallace: That ain't the right material for this problem!", 'sad');
        return;
    }

    if (appliedItems.includes(heldItem.id)) {
        showToast("You already applied that!");
        return;
    }

    const newApplied = [...appliedItems, heldItem.id];
    setAppliedItems(newApplied);
    setHeldItem(null);

    if (newApplied.length < 2) {
        showToast("Great! Now bring the second material over.", 'surprised');
    } else {
        handlePerformPlotFix();
    }
  };

  const handlePerformPlotFix = () => {
     setIsWorking(true);
     showToast(`Fixing the ${activePlot.name}...`, 'surprised');
     
     if (activePlot.id === 'compaction') { setIsStirring(true); playSfx(pitchforkSound); }
     if (activePlot.id === 'erosion') { playSfx(patDirtSound); }
     if (activePlot.id === 'drainage') { setIsWorking(true); playSfx(hammerSound); }
     
     setTimeout(() => {
        setIsWorking(false); setIsStirring(false); setIsWatering(false);
        const newFixedPlots = [...fixedPlots, activePlot.id];
        setFixedPlots(newFixedPlots);
        setActivePlot(null); setPlotItems([]); setAppliedItems([]);
        showToast(`${activePlot.name} Fixed!`, 'surprised');
        
        if (newFixedPlots.length === 3) {
          const seeds = PLANTS.slice(0, 3).map((p, i) => ({ ...p, x: 50 + (i * 100), y: 230 }));
          setGroundItems(seeds); setHeldItem(null); 
          farmerPosRef.current = { x: 150, y: 150, isWalking: false };
          setFarmerRenderPos({ ...farmerPosRef.current });
          wallacePosRef.current = { x: 134, y: 158 }; setWallaceRenderPos({ ...wallacePosRef.current }); farmerHistoryRef.current = [];
          setPlantedBeds({}); 
          setDreamStage('PLANT_SEEDS');
        }
     }, 3000);
  };

  useEffect(() => {
    if (!['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) || isFixModalOpen || isWorking || lives <= 0) return;

    let animationFrameId;
    let lastFrameTime = performance.now();
    const basePace = 1.5; // Walking pace per 60fps frame
    const maxX = 340 - 40; const maxY = 300 - 40;

    const loop = (now) => {
       // Scale movement by elapsed time so walking speed doesn't depend on the frame rate
       const frames = Math.min((now - lastFrameTime) / (1000 / 60), 4);
       lastFrameTime = now;
       const speed = basePace * frames;
       let moved = false;
       const k = keys.current;
       if (k['w'] || k['W'] || k['ArrowUp'] || k['arrowup']) { farmerPosRef.current.y -= speed; moved = true; }
       if (k['s'] || k['S'] || k['ArrowDown'] || k['arrowdown']) { farmerPosRef.current.y += speed; moved = true; }
       if (k['a'] || k['A'] || k['ArrowLeft'] || k['arrowleft']) { farmerPosRef.current.x -= speed; moved = true; }
       if (k['d'] || k['D'] || k['ArrowRight'] || k['arrowright']) { farmerPosRef.current.x += speed; moved = true; }

       if (!moved && targetPosRef.current) {
         const dx = targetPosRef.current.x - farmerPosRef.current.x;
         const dy = targetPosRef.current.y - farmerPosRef.current.y;
         const dist = Math.hypot(dx, dy);
         if (dist > 1) {
           const step = Math.min(speed, dist * 0.15 * frames);
           farmerPosRef.current.x += (dx / dist) * step;
           farmerPosRef.current.y += (dy / dist) * step;
           moved = true;
         } else {
           farmerPosRef.current.x = targetPosRef.current.x;
           farmerPosRef.current.y = targetPosRef.current.y;
           targetPosRef.current = null;
         }
       }

       if (moved) {
           farmerPosRef.current.x = Math.max(0, Math.min(farmerPosRef.current.x, maxX));
           farmerPosRef.current.y = Math.max(0, Math.min(farmerPosRef.current.y, maxY));
           farmerPosRef.current.isWalking = true;
           setFarmerRenderPos({ x: farmerPosRef.current.x, y: farmerPosRef.current.y, isWalking: true });
       } else if (farmerPosRef.current.isWalking) {
           farmerPosRef.current.isWalking = false;
           setFarmerRenderPos(prev => ({ ...prev, isWalking: false }));
       }
       if (moved) {
         farmerHistoryRef.current.push({ x: farmerPosRef.current.x, y: farmerPosRef.current.y });
         if (farmerHistoryRef.current.length > 45) farmerHistoryRef.current.shift();
       }
       if (farmerHistoryRef.current.length > 0) {
         const trailPos = farmerHistoryRef.current[0];
         const prevWX = wallacePosRef.current.x;
         const follow = 1 - Math.pow(0.93, frames);
         wallacePosRef.current.x += (trailPos.x - wallacePosRef.current.x) * follow;
         wallacePosRef.current.y += (trailPos.y - wallacePosRef.current.y) * follow;
         const deltaX = wallacePosRef.current.x - prevWX;
         if (Math.abs(deltaX) > 0.05) {
           const newDir = deltaX > 0 ? 'right' : 'left';
           if (newDir !== wallaceDirRef.current) {
             wallaceDirRef.current = newDir;
             setWallaceDir(newDir);
           }
         }
         setWallaceRenderPos({ x: wallacePosRef.current.x, y: wallacePosRef.current.y });
       }
       animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    const handleKeyDown = (e) => {
      const keyStr = e.key ? e.key.toLowerCase() : '';
      if (['w','a','s','d','W','A','S','D','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        targetPosRef.current = null;
      }
      keys.current[e.key] = true;
      if (keyStr) keys.current[keyStr] = true;

      if (['w','a','s','d','W','A','S','D',' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();

      if (e.key === ' ' || e.code === 'Space') {
         if (heldItem) {
            if (heldItem.id === 'held_bin_n' || heldItem.id === 'held_bin_c') {
              const pileCenter = { x: 170, y: 150 };
              if (Math.hypot(farmerPosRef.current.x + 20 - pileCenter.x, farmerPosRef.current.y + 20 - pileCenter.y) < 80) {
                setCombinedBins(prev => [...prev, heldItem.id === 'held_bin_n' ? 'bin_n' : 'bin_c']);
                setHeldItem(null); showToast(`Emptied ${heldItem.name}!`); return;
              }
              // Bins go back to their spot instead of becoming a second copy on the ground
              setHeldItem(null); showToast(`Put the ${heldItem.name} back.`); return;
            }
            if (dreamStage === 'FIX_PLOTS') {
                setPlotItems(prev => [...prev, { ...heldItem, x: farmerPosRef.current.x, y: Math.min(260, farmerPosRef.current.y + 20) }]);
            } else {
                setGroundItems(prev => [...prev, { ...heldItem, x: farmerPosRef.current.x, y: Math.min(260, farmerPosRef.current.y + 20) }]);
            }
            setHeldItem(null); return;
         }
         let closest = null; let minDist = 60;
         
         groundItems.forEach(item => {
            const dist = Math.hypot(farmerPosRef.current.x + 20 - (item.x + 20), farmerPosRef.current.y + 20 - (item.y + 10));
            if (dist < minDist) { minDist = dist; closest = item; }
         });

         if (!closest && dreamStage === 'MATCH_EXAMPLES' && matchPhase === 1) {
            EXAMPLE_BINS.forEach(bin => {
               if (!combinedBins.includes(bin.id) && Math.hypot(farmerPosRef.current.x + 20 - (bin.x + 40), farmerPosRef.current.y + 20 - (bin.y + 40)) < 60) {
                  closest = { 
                     id: `held_${bin.id}`, 
                     name: bin.label, 
                     sprite: null, 
                     component: bin.id === 'bin_n' ? CompostBucketSprite : BrownsBucketSprite,
                     isBin: true 
                  };
               }
            });
         }
         
         if (!closest && dreamStage === 'FIX_PLOTS' && plotItems.length > 0) {
            plotItems.forEach(item => {
               const dist = Math.hypot(farmerPosRef.current.x + 20 - (item.x + 10), farmerPosRef.current.y + 20 - (item.y + 10));
               if (dist < 60) { minDist = dist; closest = item; }
            });
         }

         if (closest) {
            setHeldItem(closest);
            setGroundItems(prev => prev.filter(i => (i.id || i.name) !== (closest.id || closest.name)));
            setPlotItems(prev => prev.filter(i => i.id !== closest.id));
            showToast(`Picked up ${closest.name}!`);
         }
      }

      if (e.key === 'e' || e.key === 'E') {
         const farmerCenter = { x: farmerPosRef.current.x + 20, y: farmerPosRef.current.y + 20 };
         
         if (dreamStage === 'FIX_PLOTS') {
            if (heldItem && activePlot && !isWorking) {
               const plotCenter = { x: activePlot.x + 32, y: activePlot.y + 32 };
               if (Math.hypot(farmerCenter.x - plotCenter.x, farmerCenter.y - plotCenter.y) < 80) {
                 handleApplyItemToPlot();
                 return;
               }
            }
            
            if (!isFixModalOpen) {
              const isWorkingOnPlot = activePlot?.id && answeredPlots.includes(activePlot.id) && !fixedPlots.includes(activePlot.id);
              if (!isWorkingOnPlot) {
                let nearbyPlot = null;
                SOIL_PROBLEMS.forEach(plot => {
                   if (fixedPlots.includes(plot.id) || answeredPlots.includes(plot.id)) return;
                   const dist = Math.hypot(farmerCenter.x - (plot.x + 32), farmerCenter.y - (plot.y + 32));
                   if (dist < 80) nearbyPlot = plot;
                });
                if (nearbyPlot) {
                  setActivePlot(nearbyPlot);
                  setIsFixModalOpen(true);
                }
              }
            }
            return;
         }

         if (!heldItem) return;

         if (dreamStage === 'CRAFT_SOIL') {
             const binCenter = { x: 170, y: 50 };
             if (Math.hypot(farmerCenter.x - binCenter.x, farmerCenter.y - binCenter.y) < 110) {
                setCauldron(prev => [...prev, heldItem.name || heldItem]); setHeldItem(null);
                if ((heldItem.name || heldItem) === '✨ Magic') { playSfx(magicSound); }
                else if ((heldItem.name || heldItem) === '🐱 Kittens') { playSfx(kittenTossSound); }
                else { playSfx(tossBinSound); }
             } else showToast("Get closer to the mixing bin!");
         } else if (dreamStage === 'MATCH_EXAMPLES') {
             const pileCenter = { x: 170, y: 150 };
             const distToPile = Math.hypot(farmerCenter.x - pileCenter.x, farmerCenter.y - pileCenter.y);

             if (matchPhase === 0) {
               let closestBin = null;
               let distToClosestBin = Infinity;
               EXAMPLE_BINS.forEach(bin => {
                  const d = Math.hypot(farmerCenter.x - (bin.x + 40), farmerCenter.y - (bin.y + 40));
                  if (d < 75 && d < distToClosestBin) { closestBin = bin; distToClosestBin = d; }
               });

               const cuttingBoardCenter = { x: 100 + 32, y: 15 + 32 };
               const distToCuttingBoard = Math.hypot(farmerCenter.x - cuttingBoardCenter.x, farmerCenter.y - cuttingBoardCenter.y);

               const prepStationCenter = { x: 164 + 32, y: 15 + 32 };
               const distToPrepStation = Math.hypot(farmerCenter.x - prepStationCenter.x, farmerCenter.y - prepStationCenter.y);

               const nearCuttingBoard = distToCuttingBoard < 70 && distToCuttingBoard <= distToPrepStation && distToCuttingBoard <= distToClosestBin;
               const nearPrepStation = distToPrepStation < 70 && distToPrepStation < distToCuttingBoard && distToPrepStation <= distToClosestBin;

               if (nearCuttingBoard) {
                  if (heldItem.id === 'ex_n2' && !heldItem.isChopped) {
                     setIsWorking(true);
                     setIsChopping(true);
                     showToast("Chopping scraps...", 'surprised');
                     playSfx(patDirtSound);
                     setTimeout(() => {
                        setIsWorking(false);
                        setIsChopping(false);
                        setHeldItem(prev => ({...prev, name: 'Chopped Veggies', sprite: '🥗', isChopped: true}));
                        showToast("All chopped up!");
                     }, 1500);
                  } else {
                     showToast("No need to chop this!");
                  }
                  return;
               }

               if (nearPrepStation) {
                  if (heldItem.id === 'ex_c2' && !heldItem.isPrepped) {
                     setIsWorking(true);
                     setIsPrepping(true);
                     showToast("Removing tape & stickers...", 'surprised');
                     playSfx(patDirtSound);
                     setTimeout(() => {
                        setIsWorking(false);
                        setIsPrepping(false);
                        setHeldItem(prev => ({...prev, name: 'Clean Cardboard', isPrepped: true}));
                        showToast("Tape & stickers removed!");
                     }, 1500);
                  } else {
                     showToast("Nothing to prep here!");
                  }
                  return;
               }

               if (closestBin) {
                  if (heldItem.id === 'ex_n2' && !heldItem.isChopped && closestBin.comp.includes('Nitrogen')) {
                     loseLife("Wallace: Chop those vegetable scraps first!", 'angry');
                  }
                  else if (heldItem.id === 'ex_c2' && !heldItem.isPrepped && closestBin.comp.includes('Carbon')) {
                     loseLife("Wallace: Remove the tape and stickers first!", 'angry');
                  }
                  else if (heldItem.comp === closestBin.comp) { 
                     setCompletedExamples(prev => [...prev, heldItem.id]); 
                     setHeldItem(null); 
                     showToast(`Correct! Added ${heldItem.name}.`, 'surprised'); 
                  }
                  else {
                     loseLife("Wallace: Wrong bin!", 'sad');
                  }
               } else {
                 if (!nearCuttingBoard && !nearPrepStation) showToast("Get closer to a station!");
               }
             } else if (matchPhase === 1 && heldItem.isBin && distToPile < 80) {
               setCombinedBins(prev => [...prev, heldItem.id === 'held_bin_n' ? 'bin_n' : 'bin_c']);
               setHeldItem(null); showToast(`Combined!`, 'surprised');
             } else if (matchPhase === 2 && heldItem.id === 'ex_w' && distToPile < 80) {
               setIsWatering(true); setHeldItem(null); showToast("Watering...", 'surprised'); playSfx(wateringCanSound);
               setTimeout(() => { setIsWatering(false); setMatchPhase(3); initializeExamplesItems(3); showToast("Now add air!", 'surprised'); }, 3000);
             } else if (matchPhase === 3 && heldItem.id === 'ex_a' && distToPile < 80) {
               setIsStirring(true); setHeldItem(null); showToast("Aerating...", 'surprised');
               playSfx(pitchforkSound);
               setTimeout(() => { setIsStirring(false); showToast("Compost complete!", 'surprised'); setTimeout(() => setDreamStage('FIX_PLOTS'), 2000); }, 2500);
             }
         } else if (dreamStage === 'PLANT_SEEDS') {
             const beds = [{ id: 0, x: 25, y: 30, soil: PLANTS[0].soil }, { id: 1, x: 135, y: 30, soil: PLANTS[1].soil }, { id: 2, x: 245, y: 30, soil: PLANTS[2].soil }];
             let closestBed = null;
             beds.forEach(bed => { if (Math.hypot(farmerCenter.x - (bed.x + 32), farmerCenter.y - (bed.y + 32)) < 70) closestBed = bed; });
             if (closestBed) {
                if (plantedBeds[closestBed.id]) { showToast("Already planted!"); return; }
                if (heldItem.soil === closestBed.soil) { 
                   setPlantedBeds(prev => ({ ...prev, [closestBed.id]: heldItem })); 
                   setHeldItem(null); 
                   showToast(`Planted!`, 'surprised'); 
                   if (Object.keys(plantedBeds).length === 2) setTimeout(() => setDreamStage('END_DIALOG'), 1500); 
                }
                else {
                   loseLife("Wallace: Wrong soil!", 'sad');
                }
             }
         }
      }
    };

    const handleKeyUp = (e) => {
      const keyStr = e.key ? e.key.toLowerCase() : '';
      keys.current[e.key] = false;
      if (keyStr) keys.current[keyStr] = false;
      if (e.key) keys.current[e.key.toUpperCase()] = false;
    };

    const handleBlur = () => { keys.current = {}; }; // Prevent sticky keys on window focus loss

    window.addEventListener('keydown', handleKeyDown, { passive: false }); 
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    
    return () => {
        keys.current = {};
        targetPosRef.current = null;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('blur', handleBlur);
    };
  }, [dreamStage, heldItem, groundItems, matchPhase, completedExamples, combinedBins, activePlot, isFixModalOpen, isWorking, isChopping, isPrepping, plotItems, appliedItems, fixedPlots, answeredPlots, plantedBeds, lives]);

  const handleFixPlotChoice = (plotId, isCorrect) => {
    if (isCorrect) {
      setWallaceEmotion('surprised');
      setIsFixModalOpen(false);
      setAnsweredPlots(prev => [...prev, plotId]);
      let items = [];
      if (plotId === 'compaction') {
        items = [
          { id: 'tool_p', name: 'Pitchfork', type: 'tool', x: activePlot.x - 40, y: activePlot.y + 40, component: PitchforkSprite },
          { id: 'item_om', name: 'Compost Bag', x: activePlot.x + 70, y: activePlot.y + 40, component: CompostBagSprite }
        ];
      } else if (plotId === 'erosion') {
        items = [
          { id: 'item_cc', name: 'Cover Crop Seeds', sprite: '🌱', x: activePlot.x - 40, y: activePlot.y + 40 },
          { id: 'item_m', name: 'Mulch', x: activePlot.x + 70, y: activePlot.y + 40, component: MulchSprite }
        ];
      } else if (plotId === 'drainage') {
        items = [
          { id: 'item_om2', name: 'Compost Bag', x: activePlot.x - 40, y: activePlot.y + 40, component: CompostBagSprite },
          { id: 'tool_h', name: 'Hammer', type: 'tool', x: activePlot.x + 70, y: activePlot.y + 40, component: HammerSprite }
        ];
      }
      setPlotItems(items);
      setAppliedItems([]);
      showToast("Correct! Bring BOTH materials to the plot one by one.", 'surprised');
    } else { 
      loseLife("Wallace: That'll make it worse!", 'sad'); 
    }
  };

  // --- RENDERERS ---
  const renderTitle = () => (
    <div key="scene-title" className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Volume Control */}
      <PixelBox className="absolute top-3 right-3 md:top-5 md:right-5 z-30 p-2! flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? 'Turn music off' : 'Turn music on'}
          className="bg-[#8b5a2b] text-white px-2 py-1 text-xs hover:bg-[#5d4037] border-2 border-[#3e2723] whitespace-nowrap"
        >
          🎵 {isMusicPlaying ? 'ON' : 'OFF'}
        </button>
        <span className="text-sm select-none" aria-hidden="true">{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Volume"
          className="w-20 md:w-28 h-2 accent-[#4caf50] cursor-pointer"
        />
        <span className="text-[10px] font-bold w-8 text-right tabular-nums select-none">{Math.round(volume * 100)}%</span>
      </PixelBox>

      {/* Flower Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Bottom Left - Adjusted Spacing Here! */}
        <div className="absolute bottom-4 left-4 md:left-12 w-10 h-20 md:w-16 md:h-32 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform" onClick={triggerButterflies}><SunflowerSprite /></div>
        <div className="absolute bottom-2 left-16 md:left-32 w-8 h-12 md:w-12 md:h-16 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-3 transition-transform" onClick={triggerButterflies}><MarigoldSprite /></div>
        <div className="absolute bottom-12 left-24 md:left-48 w-6 h-10 md:w-10 md:h-14 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-6 transition-transform" onClick={triggerButterflies}><ZinniaSprite /></div>
        
        {/* Adjusted Lavender on the Bottom Left: Moved higher and to the right */}
        <div className="absolute bottom-32 left-12 md:left-24 w-8 h-16 md:w-12 md:h-24 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform" onClick={triggerButterflies}><LavenderSprite /></div>

        {/* Bottom Right */}
        <div className="absolute bottom-8 right-4 md:right-10 w-12 h-24 md:w-16 md:h-32 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-3 transition-transform" onClick={triggerButterflies}><SunflowerSprite /></div>
        <div className="absolute bottom-4 right-24 md:right-36 w-8 h-16 md:w-12 md:h-24 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform" onClick={triggerButterflies}><LavenderSprite /></div>
        <div className="absolute bottom-16 right-36 md:right-56 w-8 h-12 md:w-12 md:h-16 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-6 transition-transform" onClick={triggerButterflies}><MarigoldSprite /></div>
        <div className="absolute bottom-2 right-12 md:right-24 w-6 h-10 md:w-10 md:h-14 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-3 transition-transform" onClick={triggerButterflies}><ZinniaSprite /></div>

        {/* Top Left */}
        <div className="absolute top-12 left-8 md:left-16 w-8 h-16 md:w-10 md:h-20 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform" onClick={triggerButterflies}><LavenderSprite /></div>
        <div className="absolute top-24 left-2 md:left-6 w-8 h-12 md:w-12 md:h-16 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-6 transition-transform" onClick={triggerButterflies}><ZinniaSprite /></div>
        <div className="absolute top-8 left-24 md:left-36 w-8 h-12 md:w-12 md:h-16 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-3 transition-transform" onClick={triggerButterflies}><MarigoldSprite /></div>

        {/* Top Right */}
        <div className="absolute top-16 right-10 md:right-20 w-10 h-20 md:w-14 md:h-28 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-3 transition-transform" onClick={triggerButterflies}><SunflowerSprite /></div>
        <div className="absolute top-8 right-24 md:right-40 w-6 h-10 md:w-10 md:h-14 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-6 transition-transform" onClick={triggerButterflies}><ZinniaSprite /></div>
        <div className="absolute top-32 right-4 md:right-12 w-8 h-16 md:w-10 md:h-20 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-3 transition-transform" onClick={triggerButterflies}><LavenderSprite /></div>

        {/* Middle Edges */}
        <div className="absolute top-1/2 left-2 md:left-8 w-8 h-12 md:w-12 md:h-16 -translate-y-1/2 pointer-events-auto cursor-pointer hover:scale-110 hover:rotate-3 transition-transform" onClick={triggerButterflies}><MarigoldSprite /></div>
        <div className="absolute top-1/3 right-4 md:right-10 w-8 h-16 md:w-10 md:h-20 pointer-events-auto cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform" onClick={triggerButterflies}><LavenderSprite /></div>
      </div>

      {/* Fluttering Butterflies Overlay */}
      {butterflyBursts.map(burst => (
        <div key={`bb-${burst.id}`} className="fixed pointer-events-none z-[160]" style={{ left: burst.x, top: burst.y }}>
          {burst.butterflies.map((bf, i) => {
            const Sprites = [MonarchSprite, PaintedLadySprite, DogfaceSprite];
            const Sprite = Sprites[bf.spriteIdx];
            
            return (
              <div key={`bf-${i}`} className="absolute animate-butterfly-burst" style={{ '--tx': `${bf.tx}px`, '--ty': `${bf.ty}px`, animationDuration: `${bf.duration}s` }}>
                 <div className="w-5 h-5 animate-butterfly-flap drop-shadow-md" style={{ animationDuration: `${bf.flapDuration}s` }}>
                    <Sprite />
                 </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Lingering Bugs Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[140] overflow-hidden">
        {lingeringBugs.bees.map(bee => (
           <div key={bee.id} className={`absolute ${bee.anim}`} style={{ top: `${bee.y}%`, left: `${bee.x}%` }}>
              <div 
                className={`w-5 h-5 ${bee.zoomed ? 'animate-bee-zoom pointer-events-none' : 'pointer-events-auto cursor-pointer hover:scale-125 transition-transform'}`}
                onClick={() => handleBeeClick(bee.id)}
              >
                <BeeSprite />
              </div>
           </div>
        ))}
        {lingeringBugs.woodlice.map(louse => (
           <div 
              key={louse.id} 
              className={`absolute animate-crawl-${louse.dir}`} 
              style={{ top: `${louse.y}%`, animationDuration: `${louse.duration}s`, animationPlayState: louse.rolled ? 'paused' : 'running' }}
           >
              <div 
                className="w-5 h-4 pointer-events-auto cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                onClick={() => handleWoodlouseClick(louse.id)}
              >
                {louse.rolled ? <div className="w-4 h-4"><RolledWoodlouseSprite /></div> : <div className="w-5 h-4"><WoodlouseSprite /></div>}
              </div>
           </div>
        ))}
      </div>

      {/* Sakura Petals Overlay */}
      {sakuraClicks.map(burst => (
        <div key={`sakura-cascade-${burst.id}`} className="fixed inset-0 pointer-events-none z-[150]">
          {burst.petals.map((p, i) => (
            <div key={`petal-${i}`} className="absolute -top-10 animate-sakura-fall" style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--tx': `${p.tx}px`
            }}>
              <div className="w-4 h-4"><SakuraSprite /></div>
            </div>
          ))}
        </div>
      ))}

      {/* Bugs Burst Overlay */}
      {bugsClicks.map(burst => (
        <div key={`bug-burst-${burst.id}`} className="fixed top-[45%] left-1/2 -translate-x-1/2 pointer-events-none z-[150]">
          {burst.bees.map((b, i) => (
            <div key={`bee-${i}`} className="absolute animate-bug-burst" style={{
              '--tx': `${b.tx}px`, '--ty': `${b.ty}px`, '--rot': '0rad', animationDuration: `${b.duration}s`
            }}>
              <div className="w-5 h-5"><BeeSprite /></div>
            </div>
          ))}
          {burst.woodlice.map((w, i) => (
            <div key={`louse-${i}`} className="absolute animate-bug-burst" style={{
              '--tx': `${w.tx}px`, '--ty': `${w.ty}px`, '--rot': `${w.rot}rad`, animationDuration: `${w.duration}s`
            }}>
              <div className="w-4 h-3"><WoodlouseSprite /></div>
            </div>
          ))}
        </div>
      ))}

      <PixelBox className="text-center max-w-lg w-full relative z-10">
        <div className="mb-8 mt-4 leading-tight">
          <h1 className="font-bold mb-2 leading-none">
            <span 
               className="stardew-title text-6xl md:text-7xl cursor-pointer hover:scale-110 hover:-rotate-6 transition-transform inline-block select-none" 
               onClick={triggerSakura}
            >
              Master
            </span>
            <br />
            <span 
               className="stardew-subtitle text-4xl md:text-5xl mt-3 tracking-[0.2em] cursor-pointer hover:scale-110 hover:rotate-6 transition-transform inline-block select-none" 
               onClick={triggerBugs}
            >
              COMPOSTER
            </span>
          </h1>
          <h2 className="mt-3">
            <span className="stardew-quest text-2xl md:text-3xl tracking-[0.4em] cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform inline-block select-none">QUEST</span>
          </h2>
        </div>
        <div className="h-24 mb-8 animate-bounce flex items-end justify-center gap-4">
          <div className="w-16 h-16"><FarmerSprite /></div>
          <div className="w-12 h-16"><WallaceFollowerSprite /></div>
        </div>
        <button onClick={() => setGameState('INTRO')} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full mb-3 relative z-20 pointer-events-auto">New Game</button>
        <button onClick={() => setIsChapterSelectOpen(true)} className="bg-[#8b5a2b] text-white px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#5d4037] border-b-4 border-[#3e2723] active:border-b-0 active:translate-y-1 w-full relative z-20 pointer-events-auto">Chapter Select</button>
        <div className="mt-3 text-sm md:text-base leading-5 md:leading-6 tracking-[0.15em]">
          <span className="stardew-credit hover:scale-110 hover:rotate-3 transition-transform inline-block select-none">Made by Ybresciani</span>
        </div>
      </PixelBox>
    </div>
  );

  const renderCutscene = (script, onComplete) => (
    <div key="scene-cutscene" className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <p className="text-white font-mono text-base md:text-xl leading-loose mb-8 md:mb-12 animate-pulse">{script[dialogIndex]}</p>
        <button onClick={() => { if (dialogIndex < script.length - 1) setDialogIndex(dialogIndex + 1); else { setDialogIndex(0); onComplete(); } }} className="text-amber-500 font-mono text-lg hover:text-amber-300">[ Click to continue ]</button>
      </div>
    </div>
  );

  const renderClassroomIntro = () => {
    const currentText = classStory[dialogIndex];
    return (
      <div key="scene-class-intro" className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
         <ClassroomScene farmerEyes={dialogIndex >= 3 ? 'closed' : dialogIndex === 2 ? 'heavy' : 'open'} />
         <DialogBox
           name="" 
           portrait={null} 
           text={currentText} 
           onNext={() => { 
             if (dialogIndex < classStory.length - 1) setDialogIndex(dialogIndex + 1); 
             else { setDialogIndex(0); setGameState('SLEEP_TRANSITION'); } 
           }} 
         />
      </div>
    );
  };

  const renderSleepTransition = () => (
    <div key="scene-sleep" className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <p className="text-white font-mono text-3xl md:text-4xl tracking-[0.5em] animate-pulse">Z z z . . .</p>
    </div>
  );

  const renderDream = () => {
    const currentDay = dreamStage === 'CRAFT_SOIL' ? 'Day 1' :
                       dreamStage === 'MATCH_EXAMPLES' ? 'Day 2' :
                       dreamStage === 'FIX_PLOTS' ? 'Day 3' :
                       dreamStage === 'PLANT_SEEDS' ? 'Day 4' : 'Day 5';

    return (
      <div key="scene-dream" className={`min-h-screen ${dreamStage === 'NIGHTMARE_END' ? 'bg-[#7a3535]' : 'bg-[#7ec850]'} relative overflow-hidden font-mono p-4 flex flex-col items-center`}>
          {/* Fluttering Butterflies Overlay */}
          {butterflyBursts.map(burst => (
            <div key={`bb-${burst.id}`} className="fixed pointer-events-none z-[160]" style={{ left: burst.x, top: burst.y }}>
              {burst.butterflies.map((bf, i) => {
                const Sprites = [MonarchSprite, PaintedLadySprite, DogfaceSprite];
                const Sprite = Sprites[bf.spriteIdx];
                
                return (
                  <div key={`bf-${i}`} className="absolute animate-butterfly-burst" style={{ '--tx': `${bf.tx}px`, '--ty': `${bf.ty}px`, animationDuration: `${bf.duration}s` }}>
                     <div className="w-5 h-5 animate-butterfly-flap drop-shadow-md" style={{ animationDuration: `${bf.flapDuration}s` }}>
                        <Sprite />
                     </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Background farm scenery */}
          <div className={`absolute top-4 left-4 w-12 h-16 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-8 left-20 w-16 h-20 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-2 left-40 w-10 h-14 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          
          <div className={`absolute top-6 right-10 w-16 h-20 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-12 right-28 w-12 h-16 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-2 right-44 w-14 h-18 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>

          {/* Pond & Frog */}
          <div className={`absolute top-28 sm:top-20 left-[50%] w-32 h-16 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><PondSprite /></div>
          <div className="absolute top-[7.5rem] sm:top-[5.5rem] left-[60%] z-[100] animate-frog cursor-pointer" onClick={() => { playSfx(frogTapSound); }} style={{ width: '56px', height: '52px', margin: '-16px' }}>
             <div className="absolute top-4 left-4 w-6 h-5 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonFrogSprite /> : <FrogSprite />}</div>
          </div>
          {dreamStage !== 'NIGHTMARE_END' && (
             <div className="absolute top-[7.5rem] sm:top-[5.5rem] left-[60%] w-6 h-5 opacity-90 z-20 pointer-events-none animate-frog-splash">
               <svg viewBox="0 0 16 12" className="w-full h-full" shapeRendering="crispEdges">
                 <path d="M4,10 h8 v2 h-8 z M6,8 h4 v2 h-4 z M8,6 h2 v2 h-2 z M2,6 h2 v2 h-2 z M12,6 h2 v2 h-2 z" fill="#ffffff" opacity="0.8"/>
               </svg>
             </div>
          )}

          {/* Barn & Silo */}
          <div className={`absolute bottom-48 left-10 w-24 h-20 opacity-70 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><BarnSprite /></div>
          <div className={`absolute bottom-48 left-36 w-10 h-20 opacity-70 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><SiloSprite /></div>
          
          {dreamStage === 'NIGHTMARE_END' && (
            <>
              {/* Lightning striking silo */}
              <div className="absolute bottom-[16.5rem] left-[8.5rem] w-12 h-24 z-10 animate-lightning"><LightningSprite color="#ab47bc" /></div>
              
              {/* Silo Fires Spreading (z-0 to stay behind dialog container) */}
              <div className="absolute bottom-[15.5rem] left-[8.5rem] w-10 h-10 z-0 animate-spread" style={{animationDelay: '2.8s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>
              <div className="absolute bottom-[16.5rem] left-[9rem] w-8 h-8 z-0 animate-spread" style={{animationDelay: '3.2s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>
              <div className="absolute bottom-[14.5rem] left-[8rem] w-12 h-12 z-0 animate-spread" style={{animationDelay: '3.8s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>
              <div className="absolute bottom-[14rem] left-[9.5rem] w-10 h-10 z-0 animate-spread" style={{animationDelay: '4.5s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>

              {/* Large Fire Off Plot (z-0 to stay behind dialog container) */}
              <div className="absolute top-40 right-4 w-32 h-32 z-0 animate-spread" style={{animationDelay: '0.5s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>

              {/* Other Spreading Fires around the farm (z-0 to stay behind dialog container) */}
              <div className="absolute top-[35%] left-[25%] w-16 h-16 z-0 animate-spread" style={{animationDelay: '1.2s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>
              <div className="absolute bottom-[20%] right-[35%] w-12 h-12 z-0 animate-spread" style={{animationDelay: '2.5s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>
              <div className="absolute top-[50%] left-[8%] w-14 h-14 z-0 animate-spread" style={{animationDelay: '4.0s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>
              <div className="absolute bottom-[40%] right-[8%] w-20 h-20 z-0 animate-spread" style={{animationDelay: '5.0s'}}>
                 <div className="w-full h-full animate-flicker"><FireSprite /></div>
              </div>
            </>
          )}

          {/* Farm Animals */}
          <div className="absolute bottom-40 right-28 w-16 h-12 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonCowSprite /> : <CowSprite />}</div>
          <div className="absolute bottom-52 right-12 w-12 h-10 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonPigSprite /> : <PigSprite />}</div>
          
          <div className="absolute bottom-56 right-36 w-12 h-10 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonSheepSprite /> : <SheepSprite />}</div>
          <div className="absolute bottom-44 right-44 w-10 h-10 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonGoatSprite /> : <GoatSprite />}</div>
          
          <div className="absolute bottom-48 left-20 w-6 h-6 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonChickenSprite /> : <ChickenSprite />}</div>
          <div className="absolute bottom-52 left-28 w-8 h-8 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonRoosterSprite /> : <RoosterSprite />}</div>
          <div className="absolute bottom-46 left-24 w-3 h-3 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonChickSprite /> : <ChickSprite />}</div>
          <div className="absolute bottom-45 left-26 w-3 h-3 opacity-90">{dreamStage === 'NIGHTMARE_END' ? <SkeletonChickSprite /> : <ChickSprite />}</div>

          {/* Pets */}
          <div ref={catRef} className={`absolute bottom-54 left-56 w-8 h-6 opacity-90 z-50 cursor-pointer ${catSpinning ? 'animate-cat-spin' : ''}`} onClick={handleCatClick}>{dreamStage === 'NIGHTMARE_END' ? <SkeletonCatSprite /> : <CatSprite />}</div>
          <div className="absolute bottom-50 left-72 w-10 h-8 opacity-90 z-10">{dreamStage === 'NIGHTMARE_END' ? <SkeletonDogSprite /> : <DogSprite />}</div>

          {/* Running Rabbit */}
          {dreamStage !== 'NIGHTMARE_END' && (
             <div className="absolute top-[42%] z-20 w-10 h-8 animate-rabbit-dash" style={{ left: '-20%' }}>
                <div className="w-full h-full animate-rabbit-hop">
                   <RabbitSprite />
                </div>
             </div>
          )}

          {/* Flowers */}
          <div onClick={triggerButterflies} className={`absolute top-32 left-6 w-6 h-12 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedSunflowerSprite /> : <SunflowerSprite />}</div>
          <div onClick={triggerButterflies} className={`absolute top-36 left-16 w-5 h-10 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:rotate-3 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedSunflowerSprite /> : <SunflowerSprite />}</div>
          <div onClick={triggerButterflies} className={`absolute top-40 right-8 w-6 h-12 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedSunflowerSprite /> : <SunflowerSprite />}</div>

          <div onClick={triggerButterflies} className={`absolute top-48 left-10 w-4 h-8 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:rotate-3 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedZinniaSprite /> : <ZinniaSprite />}</div>
          <div onClick={triggerButterflies} className={`absolute top-52 left-14 w-4 h-8 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:-rotate-6 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedMarigoldSprite /> : <MarigoldSprite />}</div>
          <div onClick={triggerButterflies} className={`absolute top-46 left-16 w-4 h-10 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:rotate-6 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedLavenderSprite /> : <LavenderSprite />}</div>
          <div onClick={triggerButterflies} className={`absolute top-64 right-10 w-4 h-10 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedLavenderSprite /> : <LavenderSprite />}</div>
          <div onClick={triggerButterflies} className={`absolute top-60 right-16 w-4 h-8 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : 'cursor-pointer hover:scale-110 hover:rotate-3 transition-transform z-30'}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedZinniaSprite /> : <ZinniaSprite />}</div>

          {/* Bees */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 z-50 animate-fly">{dreamStage === 'NIGHTMARE_END' ? <LocustSprite /> : <BeeSprite />}</div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 z-50 animate-fly-delayed">{dreamStage === 'NIGHTMARE_END' ? <LocustSprite /> : <BeeSprite />}</div>
          <div className="absolute top-2/3 left-1/3 w-3 h-3 z-50 animate-fly-fast">{dreamStage === 'NIGHTMARE_END' ? <LocustSprite /> : <BeeSprite />}</div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 z-50 animate-fly">{dreamStage === 'NIGHTMARE_END' ? <LocustSprite /> : <BeeSprite />}</div>

          {/* Grass details */}
          <div className={`absolute top-60 left-12 w-4 h-3 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><GrassSprite /></div>
          <div className={`absolute top-72 right-20 w-5 h-4 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><GrassSprite /></div>
          <div className={`absolute bottom-32 left-8 w-6 h-5 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><GrassSprite /></div>
          <div className={`absolute bottom-60 right-32 w-4 h-3 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><GrassSprite /></div>

          {/* Fence line */}
          <div className={`absolute bottom-10 left-40 right-36 h-6 flex items-center opacity-50 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-1 flex gap-0.5 items-center">
                <div className="w-2 h-6 bg-[#d7ccc8] border border-[#bcaaa4]"></div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="h-1 bg-[#d7ccc8]"></div>
                  <div className="h-1 bg-[#d7ccc8]"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Main content wrapper safely raised to z-40 so it stays over background fires */}
          <div className="max-w-3xl w-full mt-8 relative z-40 pb-48">
            <div className="flex justify-between items-center mb-3">
               <PixelBox className="py-2 px-4"><span className="text-amber-700">{currentDay}</span> | 9:00 AM</PixelBox>
               {['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) && (
                 <div className="text-xs font-bold text-[#5d4037] bg-white/50 px-4 py-2 rounded-full border-2 border-[#8b5a2b] animate-pulse text-center">
                   {dreamStage === 'CRAFT_SOIL' && "Gather Minerals, Organic Material, Water, and Air."}
                   {dreamStage === 'MATCH_EXAMPLES' && (
                     matchPhase === 0 ? "Chop veggies, remove tape from cardboard, then sort into Greens & Browns!" :
                     matchPhase === 1 ? "Pick up the full bins and dump them into the center compost pile!" :
                     matchPhase === 2 ? "Grab the watering can and water the pile!" :
                     "Grab the pitchfork and aerate the pile!"
                   )}
                   {dreamStage === 'FIX_PLOTS' && (activePlot ? (appliedItems.length < 2 ? `Gather the 2 materials!` : "Finishing work...") : "Walk to a damaged plot and press E.")}
                   {dreamStage === 'PLANT_SEEDS' && "Match the plants to their preferred soil!"}
                 </div>
               )}
               <PixelBox className="py-2 px-4 flex gap-4 items-center relative overflow-visible">
                  <span ref={heartsRef} className="text-red-500 font-bold text-lg tracking-widest drop-shadow-md relative z-10">
                     {'❤️'.repeat(Math.max(0, lives))}{'🖤'.repeat(Math.max(0, 3 - lives))}
                  </span>
                  <button onClick={toggleMusic} className="bg-[#8b5a2b] text-white px-3 py-1 text-xs hover:bg-[#5d4037] border-2 border-[#3e2723] relative z-10">🎵 {isMusicPlaying ? 'ON' : 'OFF'}</button>
               </PixelBox>
            </div>

            {['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) && (
              <div className="text-center animate-fade-in relative flex flex-col items-center">


                 <div ref={gameFieldRef} style={{ width: 340 * gameScale, height: 300 * gameScale, position: 'relative', flexShrink: 0, overflow: 'hidden', touchAction: 'manipulation' }}>
                 <div className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner garden-grid" style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }} onClick={(e) => {
                   if (isFixModalOpen || isWorking || lives <= 0) return;
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = (e.clientX - rect.left) / gameScale - 20;
                   const y = (e.clientY - rect.top) / gameScale - 20;
                   targetPosRef.current = {
                     x: Math.max(0, Math.min(x, 340 - 40)),
                     y: Math.max(0, Math.min(y, 300 - 40)),
                   };
                 }}>
                    
                    {dreamStage === 'CRAFT_SOIL' && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 z-10">
                         <ComposterSprite />
                         {cauldron.includes('🐱 Kittens') && (
                            <div className="absolute left-[14.3%] top-[10.7%] w-[71.4%] h-[57.1%] overflow-hidden pointer-events-none">
                              {/* Magic in the bin turns them into wizard kittens */}
                              <div className="absolute top-0 left-0 w-7 h-5 animate-kitten-walk"><div className="w-full h-full animate-kitten-trot"><KittenSprite hat={cauldron.includes('✨ Magic') ? 'purple' : null} /></div></div>
                              <div className="absolute top-0 left-0 w-7 h-5 animate-kitten-walk" style={{ animationDelay: '-4.5s' }}><div className="w-full h-full animate-kitten-trot"><KittenSprite gray hat={cauldron.includes('✨ Magic') ? 'blue' : null} /></div></div>
                            </div>
                         )}
                         {/* Sits over the composter's open top */}
                         <div className={`absolute left-[14.3%] top-[10.7%] w-[71.4%] h-[57.1%] flex flex-wrap items-center content-center justify-center overflow-hidden transition-all duration-300 ${cauldron.includes('✨ Magic') ? 'animate-rainbow-glow' : ''}`}>
                            {cauldron.length === 0 && <span className="text-[#8d6e63] text-xs font-bold">BIN</span>}
                            {cauldron.map((item, idx) => <span key={`cauldron-${idx}`} className="bg-[#d7ccc8] text-[8px] leading-none px-0.5 py-px m-px font-bold rounded relative z-30">{item}</span>)}

                            {cauldron.includes('✨ Magic') && (
                               <>
                                 <div className="absolute top-2 left-4 text-xs animate-sparkle" style={{animationDelay: '0s'}}>✨</div>
                                 <div className="absolute bottom-4 right-6 text-sm animate-sparkle" style={{animationDelay: '0.3s'}}>✨</div>
                                 <div className="absolute top-6 right-2 text-xs animate-sparkle" style={{animationDelay: '0.6s'}}>✨</div>
                                 <div className="absolute bottom-2 left-6 text-sm animate-sparkle" style={{animationDelay: '0.9s'}}>✨</div>
                               </>
                            )}
                         </div>
                         {isStirring && <div className="absolute left-[14.3%] top-[10.7%] w-[71.4%] h-[57.1%] bg-black/40 flex items-center justify-center z-40"><div className="w-10 h-14 animate-stir"><PitchforkSprite/></div></div>}
                      </div>
                    )}

                    {dreamStage === 'MATCH_EXAMPLES' && (
                      <>
                        {EXAMPLE_BINS.map(bin => {
                           const isCombined = combinedBins.includes(bin.id);
                           const BucketComponent = bin.id === 'bin_n' ? CompostBucketSprite : BrownsBucketSprite;
                           return (
                              <div key={bin.id} className={`absolute w-20 h-20 flex flex-col items-center justify-center z-10 transition-opacity duration-500 ${isCombined ? 'opacity-30 grayscale' : 'opacity-100'}`} style={{ transform: `translate(${bin.x}px, ${bin.y}px)` }}>
                                <>
                                  <div className="w-14 h-20 mt-2"><BucketComponent /></div>
                                  <span className="absolute -bottom-3 text-white text-[7px] font-bold text-center leading-none bg-black/50 px-1 py-0.5 rounded shadow-sm whitespace-nowrap">{bin.label}</span>
                                </>
                              </div>
                           );
                        })}
                        
                        {matchPhase === 0 && (
                          <>
                            <div className="absolute w-16 h-16 flex flex-col items-center justify-center z-10" style={{ transform: `translate(100px, 15px)` }}>
                              <CuttingStationSprite isChopping={isChopping} />
                              <span className="absolute -bottom-3 text-white text-[7px] font-bold text-center leading-none bg-black/50 px-1 py-0.5 rounded shadow-sm whitespace-nowrap">Cutting Board</span>
                            </div>
                            <div className="absolute w-16 h-16 flex flex-col items-center justify-center z-10" style={{ transform: `translate(164px, 15px)` }}>
                              <PrepStationSprite isPrepping={isPrepping} />
                              <span className="absolute -bottom-3 text-white text-[7px] font-bold text-center leading-none bg-black/50 px-1 py-0.5 rounded shadow-sm whitespace-nowrap">Prep Station</span>
                            </div>
                          </>
                        )}

                        <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 transition-all duration-700 flex items-center justify-center z-5 ${matchPhase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                           <ComposterSprite greens={combinedBins.includes('bin_n')} browns={combinedBins.includes('bin_c')} wet={isWatering || matchPhase >= 3} />
                           {isWatering && (
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                               <div className="w-12 h-10 animate-pour origin-right"><WateringCanSprite /></div>
                               <div className="flex justify-end gap-1 mt-2 pr-1">{[1,2,3,4].map(i => <div key={i} className="w-1 h-2 bg-blue-400 animate-droplet" style={{ animationDelay: `${i * 0.1}s` }}></div>)}</div>
                             </div>
                           )}
                           {isStirring && <div className="absolute left-[14.3%] top-[10.7%] w-[71.4%] h-[57.1%] bg-black/40 flex items-center justify-center z-20"><div className="w-10 h-14 animate-stir"><PitchforkSprite/></div></div>}
                        </div>
                      </>
                    )}

                    {dreamStage === 'FIX_PLOTS' && (
                      <>
                        {SOIL_PROBLEMS.map(plot => {
                           const isFixed = fixedPlots.includes(plot.id);
                           const isWorkingOnPlot = activePlot?.id && answeredPlots.includes(activePlot.id) && !fixedPlots.includes(activePlot.id);
                           const PlotSprite = isFixed ? GardenPlotSprite : DAMAGED_PLOT_SPRITES[plot.id];
                           return (
                             <div key={plot.id} className={`absolute w-16 h-16 flex items-center justify-center z-10 ${isFixed ? '' : 'animate-pulse'}`} style={{ transform: `translate(${plot.x}px, ${plot.y}px)` }}>
                                <div className="absolute inset-0"><PlotSprite /></div>
                                {(!isFixed && !answeredPlots.includes(plot.id) && !isWorkingOnPlot && Math.hypot(farmerRenderPos.x + 20 - (plot.x + 32), farmerRenderPos.y + 20 - (plot.y + 32)) < 50) && (
                                    <div className="absolute -top-8 animate-bounce text-[8px] bg-white px-1 rounded border border-black font-bold min-w-max">Press E</div>
                                )}
                                {activePlot?.id === plot.id && appliedItems.length > 0 && (
                                    <div className="absolute -bottom-6 text-[8px] bg-amber-100 px-1 rounded border border-amber-600 font-bold whitespace-nowrap">{appliedItems.length}/2 Ready</div>
                                )}
                             </div>
                           );
                        })}
                        {plotItems.map(item => (
                          <div key={item.id} className="absolute z-20 flex flex-col items-center" style={{ transform: `translate(${item.x}px, ${item.y}px)` }}>
                             <div className="w-6 h-6">{item.component ? <item.component /> : <span className="text-lg">{item.sprite}</span>}</div>
                             <span className="text-[6px] font-bold bg-white/80 px-0.5 rounded leading-none">{item.name}</span>
                          </div>
                        ))}
                        {isStirring && activePlot && <div className="absolute z-40 animate-stir" style={{ transform: `translate(${activePlot.x + 20}px, ${activePlot.y + 20}px)` }}><div className="w-10 h-14"><PitchforkSprite/></div></div>}
                        {isWorking && activePlot?.id === 'drainage' && (
                            <div className="absolute z-40" style={{ transform: `translate(${activePlot.x + 20}px, ${activePlot.y + 20}px)` }}><div className="animate-hammer w-10 h-10"><HammerSprite/></div></div>
                        )}
                      </>
                    )}

                    {dreamStage === 'PLANT_SEEDS' && (
                      PLANTS.slice(0, 3).map((p, index) => {
                        const bed = { 0: { x: 25, y: 30 }, 1: { x: 135, y: 30 }, 2: { x: 245, y: 30 } }[index];
                        const planted = plantedBeds[index];
                        const BedSprite = SOIL_BED_SPRITES[p.id];
                        const PlantSprite = planted ? PLANT_SPRITES[planted.id] : null;
                        return (
                          <React.Fragment key={`bed-fragment-${index}`}>
                            <div className="absolute w-16 h-16 z-10" style={{ transform: `translate(${bed.x}px, ${bed.y}px)` }}>
                              <BedSprite />
                              {PlantSprite && <div className="absolute inset-0"><PlantSprite /></div>}
                            </div>
                            <div className="absolute w-[80px] bg-white border border-[#388e3c] text-[8px] leading-tight text-center font-bold p-1 rounded z-20 shadow-sm" style={{ transform: `translate(${bed.x - 8}px, ${bed.y + 70}px)` }}>{PLANTS[index].soil}</div>
                          </React.Fragment>
                        )
                      })
                    )}

                    {groundItems.map((item) => (
                      <div key={item.id || item.name} className="absolute bg-white border-2 border-amber-600 px-2 py-1 rounded text-[10px] font-bold shadow-md z-20 flex items-center gap-1" style={{ transform: `translate(${item.x}px, ${item.y}px)` }}>
                        {item.sprite && <span className="text-sm">{item.sprite}</span>}
                        <span>{item.name}</span>
                      </div>
                    ))}

                    <div className="absolute w-8 h-10 z-[29]" style={{ transform: `translate(${wallaceRenderPos.x}px, ${wallaceRenderPos.y}px)`, willChange: 'transform' }}>
                       <div className="w-full h-full animate-wallace-wobble">
                         <div className="w-full h-full" style={{ transform: wallaceDir === 'left' ? 'scaleX(-1)' : undefined }}><WallaceFollowerSprite /></div>
                       </div>
                    </div>

                    <div className="absolute w-10 h-10 z-30" style={{ transform: `translate(${farmerRenderPos.x}px, ${farmerRenderPos.y}px)`, willChange: 'transform' }}>
                      <div className={farmerRenderPos.isWalking ? 'farmer-walking' : ''}>
                       <FarmerSprite />
                       {heldItem && (
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-900 border-2 border-amber-600 px-1 py-0.5 text-[10px] font-bold rounded animate-bounce shadow-md flex items-center gap-1 min-w-max">
                            {(heldItem.component || heldItem.sprite) && (
                              <div className="w-4 h-4">{heldItem.component ? <heldItem.component /> : <span>{heldItem.sprite}</span>}</div>
                            )}
                            <span>{heldItem.name}</span>
                         </div>
                       )}

                      </div>
                    </div>
                 </div>
                 </div>


                <DialogBox name="Wallace" text={
                   dreamStage === 'CRAFT_SOIL' ? "First, let's investigate what soil is made of! Toss those four components into the soil bin!" :
                   dreamStage === 'MATCH_EXAMPLES' ? (
                     matchPhase === 0 ? "We need more organic material. Let's make some compost! Put green stuff in Greens and brown stuff in Browns! Chop veggies, and remove tape/stickers from cardboard first!" :
                     matchPhase === 1 ? "Now bring those full bins to the center pile!" :
                     matchPhase === 2 ? "Needs some moisture! Give it a good watering." :
                     "Last step, let's get some air in there. Pitchfork time!"
                   ) :
                   dreamStage === 'FIX_PLOTS' ? (activePlot ? activePlot.hint : "Let's fix up this garden before we plant.") :
                   "Final stretch! Get those seeds in the right dirt."
                 } hideNext emotion={wallaceEmotion} bottomClass="bottom-16" />
              </div>
            )}

            {dreamStage === 'FIX_PLOTS' && isFixModalOpen && activePlot && (
              <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
                <PixelBox className="w-full max-w-lg animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold">{activePlot.name}</h2>
                     <button onClick={() => { setIsFixModalOpen(false); setActivePlot(null); }} className="text-red-500 font-bold">X</button>
                  </div>
                  <p className="mb-6 text-sm">{activePlot.description}</p>
                  <div className="space-y-3">
                    {activePlot.options.map((opt, i) => (
                      <button 
                        key={`opt-${i}`} 
                        onClick={() => handleFixPlotChoice(activePlot.id, opt.correct)} 
                        className="w-full text-left bg-white p-3 border-2 border-stone-300 hover:border-amber-500 hover:bg-amber-50 transition-colors font-bold text-xs"
                      >
                        ▶ {opt.text}
                      </button>
                    ))}
                  </div>
                </PixelBox>
              </div>
            )}

            {dreamStage === 'INTRO_DIALOG' && <DialogBox key="intro-dialog" name="Wallace" text={wormIntro[dialogIndex]} onNext={() => handleDialogNext(wormIntro, 'CRAFT_SOIL')} emotion={wallaceEmotion} />}
            
            {dreamStage === 'NIGHTMARE_END' && (
              <div className="animate-fade-in relative pt-4" style={{ height: 300 * gameScale + 16 }}>
                <div style={{ width: 340 * gameScale, height: 300 * gameScale, position: 'relative', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden' }}>
                <div style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, width: '340px', height: '300px' }}>
                <div className="w-[340px] h-[300px] bg-[#4e342e] border-4 border-[#212121] relative overflow-hidden rounded-xl shadow-inner flex flex-wrap justify-center items-center gap-4 p-4 animate-shake">
                   <div className="absolute top-10 w-full h-full garden-grid opacity-10 pointer-events-none grayscale"></div>
                   
                   {/* Atmospheric Effects */}
                   <div className="absolute inset-0 bg-purple-900/30 animate-lightning mix-blend-color-dodge pointer-events-none z-30"></div>
                   <div className="absolute inset-0 bg-blue-900/30 animate-lightning-delayed mix-blend-color-dodge pointer-events-none z-30"></div>

                   {/* Lightning Bolts */}
                   <div className="absolute top-0 left-8 w-16 h-24 animate-lightning z-10"><LightningSprite color="#ab47bc" /></div>
                   <div className="absolute top-8 right-16 w-12 h-20 animate-lightning-delayed z-10"><LightningSprite color="#42a5f5" /></div>
                   <div className="absolute -top-4 left-2/3 w-20 h-28 animate-lightning z-10" style={{ animationDuration: '5s' }}><LightningSprite color="#7e57c2" /></div>

                   {/* Border Fires */}
                   <div className="absolute -bottom-4 -left-4 w-16 h-16 animate-flicker z-20"><FireSprite /></div>
                   <div className="absolute -bottom-4 left-1/4 w-12 h-12 animate-flicker z-20" style={{animationDelay: '0.1s'}}><FireSprite /></div>
                   <div className="absolute -bottom-4 left-2/4 w-14 h-14 animate-flicker z-20" style={{animationDelay: '0.2s'}}><FireSprite /></div>
                   <div className="absolute -bottom-4 left-3/4 w-12 h-12 animate-flicker z-20" style={{animationDelay: '0.3s'}}><FireSprite /></div>
                   <div className="absolute -bottom-4 -right-4 w-16 h-16 animate-flicker z-20"><FireSprite /></div>

                   <div className="absolute top-1/4 -left-4 w-12 h-12 animate-flicker z-20" style={{animationDelay: '0.1s'}}><FireSprite /></div>
                   <div className="absolute top-2/3 -left-4 w-14 h-14 animate-flicker z-20" style={{animationDelay: '0.2s'}}><FireSprite /></div>

                   <div className="absolute top-1/3 -right-4 w-12 h-12 animate-flicker z-20" style={{animationDelay: '0.2s'}}><FireSprite /></div>
                   <div className="absolute top-3/4 -right-4 w-12 h-12 animate-flicker z-20" style={{animationDelay: '0.1s'}}><FireSprite /></div>

                   <div className="absolute -top-4 left-10 w-12 h-12 animate-flicker z-20" style={{animationDelay: '0.1s'}}><FireSprite /></div>
                   <div className="absolute -top-4 right-10 w-12 h-12 animate-flicker z-20" style={{animationDelay: '0.2s'}}><FireSprite /></div>

                   {/* Original Fire Elements */}
                   <div className="absolute bottom-12 left-12 w-10 h-10 animate-flicker origin-bottom z-20"><FireSprite /></div>
                   <div className="absolute top-24 right-16 w-16 h-16 animate-flicker origin-bottom z-20" style={{animationDelay: '0.1s'}}><FireSprite /></div>
                   <div className="absolute top-32 left-20 w-12 h-12 animate-flicker origin-bottom z-20" style={{animationDelay: '0.2s'}}><FireSprite /></div>

                   {/* Moving Tumbleweed */}
                   <div className="absolute bottom-12 left-0 z-20 w-16 h-16 animate-tumbleweed">
                     <TumbleweedSprite />
                   </div>
                   
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 grayscale z-10"><FarmerSprite /></div>
                </div>
                </div>
                </div>
                <DialogBox key="nightmare-dialog" name="Wallace" text={nightmareStory[dialogIndex]} onNext={() => handleDialogNext(nightmareStory, 'WAKE_UP')} emotion={dialogIndex < 2 ? "angry" : "sad"} />
              </div>
            )}

            {dreamStage === 'END_DIALOG' && (
              <div className="animate-fade-in relative" style={{ height: 300 * gameScale }}>
                <div style={{ width: 340 * gameScale, height: 300 * gameScale, position: 'relative', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden' }}>
                <div className="w-[340px] h-[300px] bg-[#81c784] border-4 border-[#388e3c] relative overflow-hidden rounded-xl shadow-inner flex flex-wrap justify-center items-center gap-4 p-4" style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
                   {[...Array(9)].map((_, i) => {
                     const Sprites = [CornSprite, CarrotSprite, MelonSprite];
                     const Sprite = Sprites[i % 3];
                     return (
                       <div key={`crop-${i}`} className="w-16 h-16 animate-grow" style={{ animationDelay: `${i * 0.1}s` }}>
                         <Sprite />
                       </div>
                     );
                   })}
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 z-30"><FarmerSprite /></div>
                   
                   {/* Riot (Gold/White Buff Laced Polish Hen) */}
                   <div className="absolute bottom-[30%] left-[20%] z-20 animate-hen-walk" style={{ animationDelay: '0.5s' }}>
                      <div 
                         className="flex flex-col items-center animate-hen-hop cursor-pointer hover:scale-110 transition-transform relative"
                         onClick={(e) => handleHenClick(e, 'Riot')}
                      >
                         {henHearts.filter(h => h.hen === 'Riot').map(h => (
                           <div key={h.id} className="absolute -top-6 w-5 h-4 animate-float-up pointer-events-none z-30">
                             <PixelHeartSprite />
                           </div>
                         ))}
                         <div className="w-14 h-14">
                            <PolishHenSprite name="Riot" />
                         </div>
                         <span className="text-[8px] font-bold text-white bg-black/50 px-1 rounded mt-1 shadow-sm pointer-events-none">Riot</span>
                      </div>
                   </div>

                   {/* Beyonce (Black/Copper Golden Laced Polish Hen) */}
                   <div className="absolute bottom-[35%] right-[20%] z-20 animate-hen-walk" style={{ animationDelay: '1.5s' }}>
                      <div 
                         className="flex flex-col items-center animate-hen-hop cursor-pointer hover:scale-110 transition-transform relative" 
                         style={{ animationDelay: '0.15s' }}
                         onClick={(e) => handleHenClick(e, 'Beyonce')}
                      >
                         {henHearts.filter(h => h.hen === 'Beyonce').map(h => (
                           <div key={h.id} className="absolute -top-6 w-5 h-4 animate-float-up pointer-events-none z-30">
                             <PixelHeartSprite />
                           </div>
                         ))}
                         <div className="w-14 h-14" style={{ transform: 'scaleX(-1)' }}>
                            <PolishHenSprite name="Beyonce" />
                         </div>
                         <span className="text-[8px] font-bold text-white bg-black/50 px-1 rounded mt-1 shadow-sm pointer-events-none">Beyonce</span>
                      </div>
                   </div>

                </div>
                </div>
                <DialogBox key="end-dialog" name="Wallace" text={endStory[dialogIndex]} onNext={() => handleDialogNext(endStory, 'WAKE_UP')} emotion={wallaceEmotion} />
              </div>
            )}

            {['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-2 md:px-4 z-40">
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#5d4037]/80 text-[#f4e2b8] font-bold py-1 rounded-md border-b-2 border-[#3e2723]/80 text-[10px] text-center leading-tight flex flex-col items-center justify-center pointer-events-none">
                    <span>Move</span>
                    <span className="text-[8px] font-normal opacity-80">WASD / Tap</span>
                  </div>
                  <button
                    type="button"
                    disabled={isFixModalOpen || isWorking || lives <= 0}
                    className="flex-1 bg-[#1565c0]/80 text-white font-bold py-1 rounded-md border-b-2 border-[#0d47a1]/80 active:border-b-0 active:translate-y-0.5 text-[10px] disabled:opacity-40 disabled:pointer-events-none leading-tight flex flex-col items-center justify-center"
                    onPointerDown={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true }));
                      window.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', bubbles: true }));
                    }}
                  >
                    <span>Pick Up / Drop</span>
                    <span className="text-[8px] font-normal opacity-80">Space</span>
                  </button>
                  <button
                    type="button"
                    disabled={isFixModalOpen || isWorking || lives <= 0}
                    className="flex-1 bg-[#f57f17]/80 text-white font-bold py-1 rounded-md border-b-2 border-[#e65100]/80 active:border-b-0 active:translate-y-0.5 text-[10px] disabled:opacity-40 disabled:pointer-events-none leading-tight flex flex-col items-center justify-center"
                    onPointerDown={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', code: 'KeyE', bubbles: true }));
                      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'e', code: 'KeyE', bubbles: true }));
                    }}
                  >
                    <span>Interact</span>
                    <span className="text-[8px] font-normal opacity-80">E</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
    );
  };

  const renderWakeUp = () => {
    if (dialogIndex < activeWakeUpStory.length) {
      const current = activeWakeUpStory[dialogIndex];
      const isBadEnding = lives <= 0;

      return (
        <div key="scene-wakeup-classroom" className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
           <ClassroomScene farmerJolts={!isBadEnding && dialogIndex === 0} instructorAngry={isBadEnding && dialogIndex >= 1} />
           <DialogBox name={current.name} portrait={current.portrait} text={current.text} onNext={() => setDialogIndex(dialogIndex + 1)} />
        </div>
      );
    }

    if (lives <= 0) {
      return (
        <div key="scene-wakeup-complete-bad" className="min-h-screen bg-[#8d6e63] flex flex-col items-center justify-center p-4 font-mono text-stone-800 relative overflow-hidden">
          <PixelBox className="text-center max-w-2xl w-full shadow-2xl relative z-10">
            <div className="text-6xl mb-4 animate-bounce grayscale">🥀</div>
            <h2 className="text-4xl font-extrabold text-[#3e2723] mb-6 border-b-4 border-[#5d4037] pb-4">Quest Failed...</h2>
            <div className="text-lg bg-[#a1887f] p-6 border-4 border-[#5d4037] text-left leading-relaxed shadow-inner mb-8">
              <p className="font-bold mb-4 text-[#3e2723]">You fell asleep and dreamt of a barren wasteland.</p>
              <p className="text-[#3e2723] font-medium">Try again to learn the true secrets of Master Composting!</p>
            </div>
            <button onClick={() => {
               stopAllSfx(); setGameState('TITLE'); setDreamStage('INTRO_DIALOG'); setDialogIndex(0); setCauldron([]); setCompletedExamples([]); setFixedPlots([]); setAnsweredPlots([]); setActivePlot(null); setPlotItems([]); setIsFixModalOpen(false); setAppliedItems([]); setPlantedBeds({}); setMatchPhase(0); setCombinedBins([]); setLives(3); setCrows([]);
            }} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full">Play Again</button>
          </PixelBox>
        </div>
      );
    }

    return (
      <div key="scene-wakeup-complete" className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4 font-mono text-stone-800 relative overflow-hidden">
        {/* Celebratory Background Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[20%] text-6xl animate-sparkle" style={{animationDelay: '0.1s'}}>✨</div>
          <div className="absolute top-[30%] right-[15%] text-5xl animate-sparkle" style={{animationDelay: '0.4s'}}>✨</div>
          <div className="absolute bottom-[20%] left-[25%] text-7xl animate-sparkle" style={{animationDelay: '0.7s'}}>✨</div>
          <div className="absolute top-[60%] right-[25%] text-4xl animate-sparkle" style={{animationDelay: '0.2s'}}>✨</div>
          <div className="absolute top-[45%] left-[10%] text-5xl animate-sparkle" style={{animationDelay: '0.8s'}}>✨</div>
          <div className="absolute bottom-[35%] right-[15%] text-6xl animate-sparkle" style={{animationDelay: '0.5s'}}>✨</div>
        </div>

        <PixelBox className="text-center max-w-2xl w-full shadow-2xl relative z-10">
          <div className="text-6xl mb-4 animate-bounce">🌱</div>
          <h2 className="text-4xl font-extrabold text-[#5d4037] mb-6 border-b-4 border-[#8b5a2b] pb-4">Quest Complete!</h2>
          <div className="text-lg bg-[#d7ccc8] p-6 border-4 border-[#8b5a2b] text-left leading-relaxed shadow-inner mb-8">
            <p className="font-bold mb-4 text-[#5d4037]">You successfully learned:</p>
            <ul className="list-disc list-inside space-y-2 text-[#3e2723] font-medium">
              <li key="learned-1">Soil Components: Organic Material, Minerals, Water, Air</li>
              <li key="learned-2">Compost Steps: Nitrogen (Greens), Carbon (Browns), Water, Air</li>
              <li key="learned-3">Managing Compaction, Erosion, and Drainage</li>
              <li key="learned-4">Optimal soil pairings for your garden</li>
            </ul>
          </div>
          <button onClick={() => setGameState('END_CREDITS')} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full">Continue</button>
        </PixelBox>
      </div>
    );
  };

  const renderCurrentScene = () => {
    switch (gameState) {
      case 'TITLE': return renderTitle();
      case 'INTRO': return renderCutscene(introStory, () => setGameState('CLASS'));
      case 'CLASS': return renderClassroomIntro();
      case 'SLEEP_TRANSITION': return renderSleepTransition();
      case 'DREAM': return dreamStage === 'WAKE_UP' ? renderWakeUp() : renderDream();
      case 'END_CREDITS': return (
        <div key="scene-end-credits" className="fixed inset-0 bg-black flex items-center justify-center">
          <video src={endCreditsVideo} autoPlay playsInline className="w-screen h-screen object-contain"
            onEnded={() => { stopAllSfx(); setGameState('TITLE'); setDreamStage('INTRO_DIALOG'); setDialogIndex(0); setCauldron([]); setCompletedExamples([]); setFixedPlots([]); setAnsweredPlots([]); setActivePlot(null); setPlotItems([]); setIsFixModalOpen(false); setAppliedItems([]); setPlantedBeds({}); setMatchPhase(0); setCombinedBins([]); setLives(3); setCrows([]); }} />
        </div>
      );
      default: return renderTitle();
    }
  };

  return (
    <div className="app-container">
      <div className="portrait-lock">
        <div style={{ fontSize: '3rem' }}>🔄</div>
        <p>Please rotate your device to portrait mode to play.</p>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@700&display=swap');

        .stardew-title {
          font-family: 'Pixelify Sans', sans-serif;
          color: #ffeb3b;
          text-shadow: 
            -3px -3px 0 #5d4037, 
             0   -3px 0 #5d4037, 
             3px -3px 0 #5d4037, 
             3px  0   0 #5d4037, 
             3px  3px 0 #5d4037, 
             0    3px 0 #5d4037, 
            -3px  3px 0 #5d4037, 
            -3px  0   0 #5d4037,
             0    8px 0 #3e2723;
        }

        .stardew-subtitle {
          font-family: 'Pixelify Sans', sans-serif;
          color: #8bc34a;
          text-shadow: 
            -2px -2px 0 #33691e, 
             0   -2px 0 #33691e, 
             2px -2px 0 #33691e, 
             2px  0   0 #33691e, 
             2px  2px 0 #33691e, 
             0    2px 0 #33691e, 
            -2px  2px 0 #33691e, 
            -2px  0   0 #33691e,
             0    5px 0 #1b5e20;
        }

        .stardew-quest {
          font-family: 'Pixelify Sans', sans-serif;
          color: #fff3c4;
          text-shadow: 
            -2px -2px 0 #5d4037, 
             0   -2px 0 #5d4037, 
             2px -2px 0 #5d4037, 
             2px  0   0 #5d4037, 
             2px  2px 0 #5d4037, 
             0    2px 0 #5d4037, 
            -2px  2px 0 #5d4037, 
            -2px  0   0 #5d4037,
             0    4px 0 #3e2723;
        }

        .stardew-credit {
          font-family: 'Pixelify Sans', sans-serif;
          color: #ffb74d;
          text-shadow: 
            -1px -1px 0 #5d4037, 
             0   -1px 0 #5d4037, 
             1px -1px 0 #5d4037, 
             1px  0   0 #5d4037, 
             1px  1px 0 #5d4037, 
             0    1px 0 #5d4037, 
            -1px  1px 0 #5d4037, 
            -1px  0   0 #5d4037,
             0    3px 0 #3e2723;
        }

        .garden-grid { background-image: radial-gradient(#8d6e63 1px, transparent 1px); background-size: 20px 20px; }
        @keyframes walk-bounce { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .farmer-walking { animation: walk-bounce 350ms ease-in-out infinite; }
        @keyframes stir-animation { 0% { transform: translate(-5px, -5px) rotate(-10deg); } 50% { transform: translate(5px, 5px) rotate(10deg); } 100% { transform: translate(-5px, -5px) rotate(-10deg); } }
        .animate-stir { animation: stir-animation 0.3s infinite linear; }
        @keyframes pour-animation { 0% { transform: rotate(0deg); } 20% { transform: rotate(45deg); } 80% { transform: rotate(45deg); } 100% { transform: rotate(0deg); } }
        .animate-pour { animation: pour-animation 3s forwards; }
        @keyframes droplet-animation { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(20px); opacity: 0; } }
        .animate-droplet { animation: droplet-animation 0.5s infinite; }
        @keyframes grow-in { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-grow { animation: grow-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .text-shadow { text-shadow: 2px 2px #3e2723; }

        @keyframes hammer-animation {
          0% { transform: rotate(0deg); }
          40% { transform: rotate(45deg); }
          60% { transform: rotate(-25deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-hammer { animation: hammer-animation 0.4s infinite ease-in-out; transform-origin: center bottom; }

        @keyframes rainbow-glow {
          0% { box-shadow: 0 0 15px 5px #ff0000, inset 0 0 15px 5px #ff0000; }
          16% { box-shadow: 0 0 15px 5px #ff7f00, inset 0 0 15px 5px #ff7f00; }
          33% { box-shadow: 0 0 15px 5px #ffff00, inset 0 0 15px 5px #ffff00; }
          50% { box-shadow: 0 0 15px 5px #00ff00, inset 0 0 15px 5px #00ff00; }
          66% { box-shadow: 0 0 15px 5px #0000ff, inset 0 0 15px 5px #0000ff; }
          83% { box-shadow: 0 0 15px 5px #4b0082, inset 0 0 15px 5px #4b0082; }
          100% { box-shadow: 0 0 15px 5px #ff0000, inset 0 0 15px 5px #ff0000; }
        }
        .animate-rainbow-glow { animation: rainbow-glow 2s linear infinite; }

        @keyframes sparkle-anim {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        .animate-sparkle { animation: sparkle-anim 1.5s ease-in-out infinite; pointer-events: none; }

        @keyframes tumbleweed-anim {
          0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
          20% { transform: translateX(0px) translateY(-40px) rotate(180deg); }
          40% { transform: translateX(100px) translateY(0px) rotate(360deg); }
          60% { transform: translateX(200px) translateY(-40px) rotate(540deg); }
          80% { transform: translateX(300px) translateY(0px) rotate(720deg); }
          100% { transform: translateX(400px) translateY(-40px) rotate(900deg); }
        }
        .animate-tumbleweed { animation: tumbleweed-anim 4s linear infinite; }

        @keyframes flicker {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-flicker { animation: flicker 0.2s infinite alternate; }

        @keyframes shake-anim {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, 2px); }
          80% { transform: translate(1px, -2px); }
        }
        .animate-shake { animation: shake-anim 0.2s infinite linear; }

        @keyframes lightning-flash {
          0%, 90%, 100% { opacity: 0; }
          92%, 96% { opacity: 1; }
          94% { opacity: 0; }
        }
        .animate-lightning { animation: lightning-flash 3s infinite; }
        .animate-lightning-delayed { animation: lightning-flash 4.5s infinite 2s; }

        @keyframes wallace-wobble {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-4px); }
        }
        .animate-wallace-wobble { animation: wallace-wobble 0.4s ease-in-out infinite alternate; }

        /* KITTENS PADDING AROUND INSIDE THE COMPOST BIN (path loops inside the 80x64px opening) */
        @keyframes kitten-walk {
          0% { transform: translate(0px, 44px) scaleX(1); }
          30% { transform: translate(52px, 44px) scaleX(1); }
          40% { transform: translate(52px, 12px) scaleX(1); }
          44% { transform: translate(52px, 12px) scaleX(-1); }
          74% { transform: translate(0px, 12px) scaleX(-1); }
          86% { transform: translate(0px, 44px) scaleX(-1); }
          90%, 100% { transform: translate(0px, 44px) scaleX(1); }
        }
        .animate-kitten-walk { animation: kitten-walk 9s linear infinite; }
        @keyframes kitten-trot { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        .animate-kitten-trot { animation: kitten-trot 0.3s ease-in-out infinite; }

        @keyframes fly-around {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(10deg); }
          50% { transform: translate(20px, 5px) rotate(-5deg); }
          75% { transform: translate(5px, 15px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-fly { animation: fly-around 8s infinite ease-in-out; }
        .animate-fly-delayed { animation: fly-around 10s infinite ease-in-out 2s reverse; }
        .animate-fly-fast { animation: fly-around 6s infinite ease-in-out 1s; }

        @keyframes spread-fire {
          0% { opacity: 0; transform: scale(0.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-spread { opacity: 0; animation: spread-fire 0.5s ease-out forwards; }

        @keyframes sit-toggle {
           0% { opacity: 1; }
           1%, 7% { opacity: 0; }
           8%, 83% { opacity: 1; }
           84%, 99% { opacity: 0; }
           100% { opacity: 1; }
        }
        @keyframes leap-toggle {
           0% { opacity: 0; }
           1%, 7% { opacity: 1; }
           8%, 83% { opacity: 0; }
           84%, 99% { opacity: 1; }
           100% { opacity: 0; }
        }
        .frog-sit { animation: sit-toggle 14s infinite ease-in-out; }
        .frog-leap { animation: leap-toggle 14s infinite ease-in-out; }

        @keyframes pond-ripple {
           0%, 100% { opacity: 0; transform: translateY(0); }
           50% { opacity: 1; transform: translateY(-1px); }
        }
        .animate-pond-ripple-1 { animation: pond-ripple 3s infinite ease-in-out; }
        .animate-pond-ripple-2 { animation: pond-ripple 4s infinite ease-in-out 1s; }
        .animate-pond-ripple-3 { animation: pond-ripple 3.5s infinite ease-in-out 2s; }

        @keyframes frog-splash-anim {
           0%, 7.9% { opacity: 0; transform: translate(-40px, 10px) scale(0.5); }
           8% { opacity: 1; transform: translate(-40px, 10px) scale(1); }
           10% { opacity: 1; transform: translate(-40px, 10px) scale(1.5); }
           13%, 100% { opacity: 0; transform: translate(-40px, 10px) scale(2); }
        }
        .animate-frog-splash { animation: frog-splash-anim 14s infinite ease-out; }

        @keyframes frog-action {
          0% { transform: translate(0px, 0px) scaleX(1); }
          4% { transform: translate(-20px, -20px) scaleX(1) rotate(-15deg); }
          8% { transform: translate(-40px, 10px) scaleX(1) rotate(0deg); }
          25% { transform: translate(-70px, 20px) scaleX(1); }
          30% { transform: translate(-70px, 20px) scaleX(-1); }
          55% { transform: translate(-20px, 5px) scaleX(-1); }
          60% { transform: translate(-20px, 5px) scaleX(1); }
          84% { transform: translate(-50px, 15px) scaleX(1); }
          92% { transform: translate(-25px, -15px) scaleX(1) rotate(15deg); }
          100% { transform: translate(0px, 0px) scaleX(1); }
        }
        .animate-frog { animation: frog-action 14s infinite ease-in-out; }

        /* NEW ANIMATIONS FOR TITLE SCREEN */
        @keyframes sakura-fall {
          0% { transform: translateY(-20px) translateX(0) rotate(0deg) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(var(--tx)) rotate(720deg) scale(1); opacity: 0; }
        }
        .animate-sakura-fall { animation: sakura-fall linear forwards; }

        @keyframes bug-burst {
          0% { transform: translate(0, 0) scale(0) rotate(var(--rot)); opacity: 1; }
          20% { transform: translate(calc(var(--tx) * 0.2), calc(var(--ty) * 0.2)) scale(1.5) rotate(var(--rot)); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1) rotate(var(--rot)); opacity: 0; }
        }
        .animate-bug-burst { animation: bug-burst ease-out forwards; }

        @keyframes crawl-lr {
          0% { left: -10%; transform: scaleX(-1); }
          100% { left: 110%; transform: scaleX(-1); }
        }
        @keyframes crawl-rl {
          0% { left: 110%; transform: scaleX(1); }
          100% { left: -10%; transform: scaleX(1); }
        }
        .animate-crawl-lr { animation: crawl-lr linear infinite; }
        .animate-crawl-rl { animation: crawl-rl linear infinite; }

        @keyframes bee-zoom-out {
          0% { transform: scale(1) translate(0,0); opacity: 1; }
          100% { transform: scale(15) translate(10px, -20px) rotate(45deg); opacity: 0; }
        }
        .animate-bee-zoom { animation: bee-zoom-out 0.4s ease-in forwards !important; }

        @keyframes butterfly-fly {
          0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
          20% { opacity: 1; transform: translate(calc(var(--tx) * 0.3), calc(var(--ty) * 0.3)) scale(1.2); }
          70% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
        }
        .animate-butterfly-burst { animation: butterfly-fly forwards; pointer-events: none; }

        @keyframes butterfly-flap {
          0%, 100% { transform: scaleX(1) translateY(0); }
          50% { transform: scaleX(0.2) translateY(-2px); }
        }
        .animate-butterfly-flap { animation: butterfly-flap infinite alternate; transform-origin: center; }

        @keyframes float-up-fade {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-20px) scale(1.5); opacity: 0; }
        }
        .animate-float-up { animation: float-up-fade 1s ease-out forwards; }

        /* RABBIT ANIMATIONS */
        @keyframes rabbit-dash {
          0% { left: -20%; }
          3% { left: 120%; }
          100% { left: 120%; }
        }
        .animate-rabbit-dash { animation: rabbit-dash 120s linear infinite 10s; }
        
        @keyframes rabbit-hop-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-rabbit-hop { animation: rabbit-hop-fast 0.25s infinite; }

        /* HENS ANIMATION */
        @keyframes hen-walk {
          0% { transform: translateY(180px); opacity: 0; }
          5% { opacity: 1; }
          100% { transform: translateY(0px); opacity: 1; }
        }
        .animate-hen-walk { animation: hen-walk 4s ease-out forwards; opacity: 0; }
        
        @keyframes hen-hop {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-hen-hop { animation: hen-hop 0.3s infinite alternate ease-in-out; }

        /* CUTTING ANIMATION */
        @keyframes chop-fast {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(-25deg) translateY(-8px); }
        }
        .animate-chop-fast { animation: chop-fast 0.2s infinite ease-in-out; }

        /* SNIPPING ANIMATION */
        @keyframes snip-top {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes snip-bottom {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        .animate-snip-top { animation: snip-top 0.2s infinite ease-in-out; }
        .animate-snip-bottom { animation: snip-bottom 0.2s infinite ease-in-out; }

        /* BUCKET SMELL & GLITTER */
        @keyframes smell-waft {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        .animate-smell-1 { stroke-dasharray: 100; stroke-dashoffset: 100; animation: smell-waft 2.5s infinite linear 0s; }
        .animate-smell-2 { stroke-dasharray: 100; stroke-dashoffset: 100; animation: smell-waft 2.5s infinite linear 0.8s; }
        .animate-smell-3 { stroke-dasharray: 100; stroke-dashoffset: 100; animation: smell-waft 2.5s infinite linear 1.6s; }

        @keyframes bucket-sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; filter: drop-shadow(0 0 2px #ffea00); }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        .animate-sparkle-1 { transform-origin: 10px 8px; animation: bucket-sparkle 1.5s infinite alternate 0.2s; }
        .animate-sparkle-2 { transform-origin: 50px 18px; animation: bucket-sparkle 1.5s infinite alternate 0.5s; }
        .animate-sparkle-3 { transform-origin: 25px 3px; animation: bucket-sparkle 1.5s infinite alternate 0.8s; }

        /* OIIA CAT SPIN */
        @keyframes oiia-spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-cat-spin { animation: oiia-spin 0.46s linear infinite; }

        /* CROW ANIMATION */
        @keyframes crow-flap-anim {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(-1); }
        }
        .animate-crow-flap {
          animation: crow-flap-anim 0.25s infinite;
        }

      `}</style>
      <div key="active-scene-wrapper">{renderCurrentScene()}</div>

      {/* CROW STEALING LIFE ANIMATION OVERLAY */}
      {crows.map(crow => (
        <CrowOverlay key={crow.id} crow={crow} />
      ))}

      <div ref={raveOverlayRef} className="fixed inset-0 pointer-events-none z-[180]" style={{ opacity: 0, backgroundColor: '#ff00ff', mixBlendMode: 'screen' }} />
      {!audioDismissed && (
         <div key="audio-prompt-overlay" className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
            <PixelBox className="text-center animate-bounce max-w-sm mx-4">
               <h3 className="text-2xl mb-4 font-bold text-amber-900">Master Composter Quest</h3>
               <p className="text-sm mb-6 font-mono">Turn on audio for the best experience!</p>
               <button onClick={() => { setAudioDismissed(true); playAudio(); }} className="bg-emerald-500 text-white px-6 py-4 font-bold text-lg hover:bg-emerald-600 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 w-full rounded-lg">Enter Game 🎵</button>
            </PixelBox>
         </div>
      )}
      {isChapterSelectOpen && (
        <div key="chapter-select-overlay" className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
          <PixelBox className="text-center max-w-sm mx-4 w-full">
            <h3 className="text-2xl mb-6 foAVnt-bold text-amber-900 border-b-4 border-[#8b5a2b] pb-3">Select Chapter</h3>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { label: '🌙 The Dream',     stage: 'INTRO_DIALOG'  },
                { label: '🪣 Craft Soil',     stage: 'CRAFT_SOIL'    },
                { label: '🔄 Match Examples',  stage: 'MATCH_EXAMPLES'},
                { label: '🛠️ Fix Plots',       stage: 'FIX_PLOTS'     },
                { label: '🌱 Plant Seeds',     stage: 'PLANT_SEEDS'   },
                { label: '💀 Nightmare',       stage: 'NIGHTMARE_END' },
              ].map(({ label, stage }) => (
                <button key={stage} onClick={() => jumpToChapter(stage)} className="bg-[#fff8e1] text-[#3e2723] px-4 py-3 font-bold text-sm text-left hover:bg-[#ffe082] border-2 border-[#8b5a2b] active:translate-y-0.5 w-full font-mono">
                  {label}
                </button>
              ))}
              <button onClick={() => { setIsChapterSelectOpen(false); setGameState('END_CREDITS'); }} className="bg-[#fff8e1] text-[#3e2723] px-4 py-3 font-bold text-sm text-left hover:bg-[#ffe082] border-2 border-[#8b5a2b] active:translate-y-0.5 w-full font-mono">
                🎬 End Credits
              </button>
            </div>
            <button onClick={() => setIsChapterSelectOpen(false)} className="text-xs text-[#8b5a2b] font-mono hover:text-[#5d4037]">[ cancel ]</button>
          </PixelBox>
        </div>
      )}
      {toastMsg && <div key="toast-notification-popup" className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-[#5d4037] text-white px-6 py-3 border-4 border-[#8b5a2b] shadow-xl font-mono text-center w-11/12 max-w-md">{toastMsg}</div>}
      <audio ref={audioRef} key="background-audio-element" loop preload="auto" src={backgroundMusic} className="hidden" />
      <audio ref={wowAudioRef} key="wow-audio-element" src={wowSound} preload="auto" className="hidden" />
    </div>
  );
}