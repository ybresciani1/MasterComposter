import React, { useState, useEffect, useRef } from 'react';
const BASE = 'https://master-composter.vercel.app/assets';
const backgroundMusic = `${BASE}/nastelbom-background-music-486996.mp3`;
const wowSound = `${BASE}/anime-wow-sound-effect.mp3`;
const endCreditsVideo = `${BASE}/End Credits.mov`;
const pitchforkSound = `${BASE}/Pitchfork Sound Final.mp3`;
const hammerSound = `${BASE}/Hammer Sound Final.mp3`;
const patDirtSound = `${BASE}/Pat Dirt Final Sound.mp3`;
const magicSound = `${BASE}/Magic Sound Final.mp3`;
const wakeUpSound = `${BASE}/Wake up Sound Final.mp3`;
const nightmareSound = `${BASE}/Nightmare sound.mp3`;
const tossBinSound = `${BASE}/Toss Bin Final Sound.mp3`;
const questSound = `${BASE}/Quest sound.mp3`;

// --- GAME DATA ---
const SOIL_COMPONENTS = ['🍃 Nitrogen (Greens)', '🍂 Carbon (Browns)', '💧 Water', '💨 Air'];
const FALSE_COMPONENTS = ['🥤 Plastic', '✨ Magic', '🪨 Gravel'];

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
    sprite: "🪨",
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
    sprite: "💨",
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
    sprite: "💧",
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
const FarmerSprite = () => (
  <svg viewBox="0 0 16 18" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,5 h6 v3 h-6 z" fill="#bf360c" />
    <path d="M2,9 h3 v3 h-3 z M11,9 h3 v3 h-3 z" fill="#e53935" />
    <path d="M2,12 h2 v2 h-2 z M12,12 h2 v2 h-2 z" fill="#ffccaa" />
    <path d="M5,9 h6 v6 h-6 z" fill="#1e88e5" />
    <path d="M5,15 h2 v2 h-2 z M9,15 h2 v2 h-2 z" fill="#1e88e5" />
    <path d="M4,17 h3 v1 h-3 z M9,17 h3 v1 h-3 z" fill="#8b5a2b" />
    <path d="M4,16 h1 v1 h-1 z M11,16 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M5,11 h6 v4 h-6 z" fill="#1e88e5" />
    <path d="M5,9 h1 v2 h-1 z M10,9 h1 v2 h-1 z" fill="#1565c0" />
    <path d="M5,10 h1 v1 h-1 z M10,10 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M7,12 h2 v2 h-2 z" fill="#1565c0" />
    <path d="M5,5 h6 v4 h-6 z" fill="#ffccaa" />
    <path d="M6,6 h1 v1 h-1 z M9,6 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M5,7 h1 v1 h-1 z M10,7 h1 v1 h-1 z" fill="#ff8a80" />
    <path d="M4,1 h8 v3 h-8 z" fill="#f48fb1" />
    <path d="M4,3 h8 v1 h-8 z" fill="#d81b60" />
    <path d="M2,4 h12 v1 h-12 z" fill="#f48fb1" />
    <path d="M3,2 h1 v1 h-1 z M5,2 h1 v1 h-1 z M4,1 h1 v1 h-1 z M4,3 h1 v1 h-1 z" fill="#ff4081" />
    <path d="M4,2 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M5,4 h6 v1 h-6 z" fill="#d84315" />
    <path d="M4,5 h1 v8 h-1 z M11,5 h1 v8 h-1 z" fill="#d84315" />
    <path d="M4,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M4,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z M4,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z" fill="#bf360c" />
    <path d="M3,12 h3 v1 h-3 z M10,12 h3 v1 h-3 z" fill="#4caf50" />
    <path d="M4,13 h1 v2 h-1 z M11,13 h1 v2 h-1 z" fill="#d84315" />
  </svg>
);

const WormSprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,11 h3 v-3 h3 v3 h3 v-4 h3 v5 h-14 z" fill="#f48fb1" />
    <path d="M4,9 h1 v2 h-1 z M7,11 h1 v1 h-1 z M10,8 h1 v3 h-1 z M13,9 h1 v1 h-1 z" fill="#d81b60" />
    <path d="M12,6 h4 v4 h-4 z" fill="#f48fb1" />
    <path d="M13,7 h1 v1 h-1 z M15,7 h1 v1 h-1 z" fill="#3e2723" />
  </svg>
);

const WallaceFollowerSprite = () => (
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
);

const SakuraSprite = () => (
  <svg viewBox="0 0 10 10" className="w-full h-full drop-shadow-sm opacity-90" shapeRendering="geometricPrecision">
    <path d="M5,0 C8,0 10,4 5,10 C0,4 2,0 5,0 Z" fill="#f8bbd0" />
    <path d="M5,2 C7,2 8,4 5,8 C2,4 3,2 5,2 Z" fill="#f48fb1" />
  </svg>
);

const MonarchSprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M7,3 h2 v10 h-2 z" fill="#212121" />
    <path d="M1,2 h6 v6 h-6 z M9,2 h6 v6 h-6 z" fill="#ff9800" />
    <path d="M2,8 h5 v6 h-5 z M9,8 h5 v6 h-5 z" fill="#e65100" />
    <path d="M1,2 h6 v1 h-6 z M9,2 h6 v1 h-6 z M1,2 h1 v6 h-1 z M14,2 h1 v6 h-1 z M2,13 h5 v1 h-5 z M9,13 h5 v1 h-5 z M2,8 h1 v6 h-1 z M13,8 h1 v6 h-1 z" fill="#212121" />
    <path d="M1,3 h1 v1 h-1 z M14,3 h1 v1 h-1 z M2,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
);

const PaintedLadySprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M7,4 h2 v8 h-2 z" fill="#3e2723" />
    <path d="M2,3 h5 v5 h-5 z M9,3 h5 v5 h-5 z" fill="#ffb74d" />
    <path d="M3,8 h4 v5 h-4 z M9,8 h4 v5 h-4 z" fill="#fb8c00" />
    <path d="M2,3 h2 v2 h-2 z M12,3 h2 v2 h-2 z" fill="#000000" />
    <path d="M2,4 h1 v1 h-1 z M13,4 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M4,5 h2 v1 h-2 z M10,5 h2 v1 h-2 z" fill="#000000" opacity="0.6"/>
    <path d="M4,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M5,12 h1 v1 h-1 z M10,12 h1 v1 h-1 z" fill="#000000" opacity="0.8"/>
  </svg>
);

const DogfaceSprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M7,5 h2 v6 h-2 z" fill="#4e342e" />
    <path d="M2,3 h5 v5 h-5 z M9,3 h5 v5 h-5 z" fill="#ffeb3b" />
    <path d="M4,8 h3 v4 h-3 z M9,8 h3 v4 h-3 z" fill="#fdd835" />
    <path d="M2,3 h3 v2 h-3 z M11,3 h3 v2 h-3 z M2,5 h1 v2 h-1 z M13,5 h1 v2 h-1 z" fill="#000000" />
    <path d="M4,4 h1 v1 h-1 z M11,4 h1 v1 h-1 z" fill="#ec407a" />
  </svg>
);

const WoodlouseSprite = () => (
  <svg viewBox="0 0 10 8" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M2,2 h6 v4 h-6 z" fill="#d1c4e9" />
    <path d="M3,1 h4 v1 h-4 z M3,6 h4 v1 h-4 z" fill="#b39ddb" />
    <path d="M4,2 h1 v4 h-1 z M6,2 h1 v4 h-1 z" fill="#9575cd" />
    <path d="M2,6 h1 v1 h-1 z M4,6 h1 v1 h-1 z M6,6 h1 v1 h-1 z M8,6 h1 v1 h-1 z" fill="#512da8" />
    <path d="M1,3 h1 v2 h-1 z M8,3 h1 v2 h-1 z" fill="#b39ddb" />
  </svg>
);

const RolledWoodlouseSprite = () => (
  <svg viewBox="0 0 8 8" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M2,1 h4 v6 h-4 z" fill="#d1c4e9" />
    <path d="M1,2 h6 v4 h-6 z" fill="#d1c4e9" />
    <path d="M3,1 h2 v6 h-2 z" fill="#b39ddb" />
    <path d="M2,3 h4 v1 h-4 z M2,5 h4 v1 h-4 z" fill="#9575cd" />
  </svg>
);

const LightningSprite = ({ color = "#ab47bc" }) => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" shapeRendering="crispEdges">
    <path d="M9,0 h3 v4 h-2 v3 h3 v2 h-5 v7 h-3 v-6 h2 v-2 h-3 v-4 h3 z" fill={color} />
    <path d="M10,1 h1 v3 h-2 v2 h1 v1 h-2 v4 h-1 v-3 h2 v-2 h-2 v-2 h1 z" fill="#ffffff" opacity="0.8"/>
  </svg>
);

const TumbleweedSprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M6,1 h4 v1 h-4 z M4,2 h8 v1 h-8 z M2,3 h12 v1 h-12 z M2,4 h12 v8 h-12 z M3,12 h10 v1 h-10 z M5,13 h6 v1 h-6 z" fill="#a1887f" />
    <path d="M7,2 h2 v1 h-2 z M5,4 h2 v1 h-2 z M9,5 h3 v1 h-3 z M3,7 h4 v1 h-4 z M10,8 h2 v1 h-2 z M6,10 h3 v1 h-3 z" fill="#5d4037" />
  </svg>
);

const FireSprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M3,13 h10 v2 h-10 z M2,14 h12 v1 h-12 z" fill="#4e342e" />
    <path d="M4,13 h8 v1 h-8 z" fill="#795548" />
    <path d="M6,3 h4 v2 h-4 z M5,5 h6 v4 h-6 z M4,9 h8 v4 h-8 z" fill="#d32f2f" />
    <path d="M7,5 h2 v2 h-2 z M6,7 h4 v5 h-4 z" fill="#f57c00" />
    <path d="M7,8 h2 v4 h-2 z" fill="#fbc02d" />
  </svg>
);

const PitchforkSprite = () => (
  <svg viewBox="0 0 11 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,0 h3 v11 h-3 z" fill="#8b5a2b" />
    <path d="M6,0 h1 v11 h-1 z" fill="#5d4037" />
    <path d="M2,11 h7 v2 h-7 z" fill="#9e9e9e" />
    <path d="M2,12 h7 v1 h-7 z" fill="#757575" />
    <path d="M2,13 h1 v3 h-1 z M5,13 h1 v3 h-1 z M8,13 h1 v3 h-1 z" fill="#9e9e9e" />
  </svg>
);

const WateringCanSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,2 h8 v8 h-8 z" fill="#0288d1" />
    <path d="M12,4 h3 v1 h-3 z M13,5 h2 v1 h-2 z" fill="#b3e5fc" />
    <path d="M1,4 h3 v1 h-3 z" fill="#01579b" />
    <path d="M5,0 h6 v2 h-6 z" fill="#01579b" />
  </svg>
);

const CompostBagSprite = () => (
  <svg viewBox="0 0 10 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,2 h6 v10 h-6 z" fill="#795548" />
    <path d="M3,3 h4 v2 h-4 z" fill="#8d6e63" />
    <path d="M3,6 h4 v1 h-4 z" fill="#5d4037" />
    <path d="M2,1 h6 v1 h-6 z" fill="#a1887f" />
  </svg>
);

const MulchSprite = () => (
  <svg viewBox="0 0 12 8" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,6 h8 v2 h-8 z" fill="#3e2723" />
    <path d="M3,4 h6 v2 h-6 z" fill="#5d4037" />
    <path d="M5,2 h2 v2 h-2 z" fill="#8d6e63" />
  </svg>
);

const HammerSprite = () => (
  <svg viewBox="0 0 12 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,6 h2 v6 h-2 z" fill="#8d6e63" />
    <path d="M2,2 h8 v4 h-8 z" fill="#9e9e9e" />
    <path d="M2,3 h8 v1 h-8 z" fill="#757575" />
    <path d="M10,2 h1 v4 h-1 z" fill="#424242" />
  </svg>
);

const InstructorSprite = () => (
  <svg viewBox="0 0 10 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,1 h6 v2 h-6 z M1,2 h1 v2 h-1 z M8,2 h1 v2 h-1 z" fill="#616161" />
    <path d="M3,3 h4 v3 h-4 z M2,4 h1 v2 h-1 z M7,4 h1 v2 h-1 z" fill="#ffccaa" />
    <path d="M3,4 h1 v1 h-1 z M6,4 h1 v1 h-1 z" fill="#000000" />
    <path d="M2,6 h6 v4 h-6 z" fill="#3949ab" />
    <path d="M4,6 h2 v3 h-2 z" fill="#ffffff" />
    <path d="M4,7 h1 v2 h-1 z" fill="#d32f2f" />
    <path d="M3,10 h1 v2 h-1 z M6,10 h1 v2 h-1 z" fill="#212121" />
  </svg>
);

const InstructorPortrait = () => (
  <img src={`${BASE}/Teacher.png`} alt="Instructor" className="w-full h-full object-cover" />
);

const StudentBlondeSprite = () => (
  <svg viewBox="0 0 16 18" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,13 h8 v5 h-8 z" fill="#4caf50" />
    <path d="M6,10 h4 v3 h-4 z" fill="#ffccaa" />
    <path d="M4,5 h8 v6 h-8 z" fill="#ffccaa" />
    <path d="M5,7 h2 v2 h-2 z M9,7 h2 v2 h-2 z" fill="#ffffff" />
    <path d="M6,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z" fill="#000000" />
    <path d="M3,2 h10 v4 h-10 z" fill="#fdd835" />
    <path d="M2,4 h1 v4 h-1 z M13,4 h1 v4 h-1 z" fill="#fdd835" />
    <path d="M4,1 h8 v1 h-8 z" fill="#fdd835" />
    <path d="M4,6 h3 v1 h-3 z M10,6 h2 v1 h-2 z M13,5 h1 v2 h-1 z M2,5 h1 v2 h-1 z" fill="#fbc02d" />
  </svg>
);

const StudentBrownHairSprite = () => (
  <svg viewBox="0 0 16 18" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,13 h8 v5 h-8 z" fill="#ab47bc" />
    <path d="M6,10 h4 v3 h-4 z" fill="#ffb74d" />
    <path d="M4,5 h8 v6 h-8 z" fill="#ffb74d" />
    <path d="M5,7 h2 v2 h-2 z M9,7 h2 v2 h-2 z" fill="#ffffff" />
    <path d="M6,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z" fill="#4e342e" />
    <path d="M3,2 h10 v4 h-10 z M2,4 h1 v7 h-1 z M13,4 h1 v7 h-1 z" fill="#6d4c41" />
    <path d="M4,1 h8 v1 h-8 z M3,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M4,6 h1 v2 h-1 z M11,6 h1 v2 h-1 z" fill="#5d4037" />
  </svg>
);

const StudentPonytailSprite = () => (
  <svg viewBox="0 0 16 18" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M13,5 h3 v6 h-3 z" fill="#111111" />
    <path d="M14,11 h2 v3 h-2 z" fill="#212121" />
    <path d="M4,13 h8 v5 h-8 z" fill="#ff4081" />
    <path d="M6,10 h4 v3 h-4 z" fill="#ffe0b2" />
    <path d="M4,5 h8 v6 h-8 z" fill="#ffe0b2" />
    <path d="M5,7 h2 v3 h-2 z M9,7 h2 v3 h-2 z" fill="#ffffff" />
    <path d="M5,8 h2 v2 h-2 z M9,8 h2 v2 h-2 z" fill="#81d4fa" /> 
    <path d="M6,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z" fill="#01579b" /> 
    <path d="M5,7 h1 v1 h-1 z M10,7 h1 v1 h-1 z" fill="#ffffff" /> 
    <path d="M4,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z" fill="#ff8a80" opacity="0.6"/>
    <path d="M3,2 h10 v3 h-10 z M2,4 h1 v4 h-1 z" fill="#212121" />
    <path d="M12,4 h1 v4 h-1 z" fill="#212121" />
    <path d="M4,1 h8 v1 h-8 z" fill="#212121" />
    <path d="M4,5 h8 v1 h-8 z" fill="#212121" />
    <path d="M12,4 h2 v2 h-2 z" fill="#ffeb3b" />
  </svg>
);

const StudentPortrait = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const urls = [
    `${BASE}/farmgirl.png`,
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

const PolishHenSprite = ({ name }) => {
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
};

const CornSprite = () => (
  <svg viewBox="0 0 12 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,10 h2 v6 h-2 z" fill="#8b5a2b" />
    <path d="M2,6 h2 v6 h-2 z" fill="#4caf50" />
    <path d="M8,6 h2 v6 h-2 z" fill="#388e3c" />
    <path d="M3,4 h1 v5 h-1 z M8,5 h1 v4 h-1 z" fill="#66bb6a" />
    <path d="M4,1 h4 v9 h-4 z" fill="#ffeb3b" />
    <path d="M4,2 h1 v1 h-1 z M6,2 h1 v1 h-1 z M4,4 h1 v1 h-1 z M6,4 h1 v1 h-1 z M4,6 h1 v1 h-1 z M6,6 h1 v1 h-1 z M4,8 h1 v1 h-1 z M6,8 h1 v1 h-1 z" fill="#f9a825" />
    <path d="M5,3 h1 v1 h-1 z M5,5 h1 v1 h-1 z M5,7 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M5,0 h1 v1 h-1 z M4,0 h1 v2 h-1 z M6,0 h1 v2 h-1 z" fill="#ffe082" />
    <path d="M4,1 h1 v4 h-1 z" fill="#fff176" opacity="0.4" />
  </svg>
);

const CarrotSprite = () => (
  <svg viewBox="0 0 10 14" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,0 h1 v3 h-1 z" fill="#4caf50" />
    <path d="M5,0 h1 v4 h-1 z" fill="#388e3c" />
    <path d="M3,1 h1 v2 h-1 z M6,1 h1 v2 h-1 z" fill="#66bb6a" />
    <path d="M2,2 h1 v1 h-1 z M7,2 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M3,4 h4 v2 h-4 z M3,6 h3 v2 h-3 z M3,8 h2 v2 h-2 z M3,10 h1 v2 h-1 z" fill="#ff9800" />
    <path d="M3,4 h1 v8 h-1 z" fill="#ffb74d" opacity="0.6" />
    <path d="M3,6 h3 v1 h-3 z M3,9 h2 v1 h-2 z" fill="#e65100" opacity="0.4" />
    <path d="M3,12 h1 v2 h-1 z" fill="#ef6c00" />
  </svg>
);

const MelonSprite = () => (
  <svg viewBox="0 0 14 14" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M6,0 h2 v2 h-2 z" fill="#8b5a2b" />
    <path d="M5,1 h1 v1 h-1 z M8,1 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M2,2 h10 v10 h-10 z" fill="#4caf50" />
    <path d="M3,2 h8 v1 h-8 z M2,3 h1 v8 h-1 z M11,3 h1 v8 h-1 z M3,11 h8 v1 h-8 z" fill="#43a047" />
    <path d="M4,2 h1 v10 h-1 z M7,2 h1 v10 h-1 z M10,2 h1 v10 h-1 z" fill="#2e7d32" />
    <path d="M5,2 h2 v10 h-2 z M8,2 h2 v10 h-2 z" fill="#66bb6a" />
    <path d="M3,3 h2 v3 h-2 z" fill="#a5d6a7" opacity="0.5" />
    <path d="M4,11 h6 v1 h-6 z" fill="#ff8f00" opacity="0.3" />
  </svg>
);

const TreeSprite = () => (
  <svg viewBox="0 0 16 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M7,16 h2 v4 h-2 z" fill="#5d4037" />
    <path d="M7,1 h2 v2 h-2 z M5,3 h6 v3 h-6 z M3,6 h10 v4 h-10 z M1,10 h14 v6 h-14 z" fill="#2e7d32" />
    <path d="M6,1 h1 v2 h-1 z M4,3 h2 v3 h-2 z M2,6 h2 v4 h-2 z M0,10 h2 v6 h-2 z" fill="#388e3c" />
  </svg>
);

const CowSprite = () => (
  <svg viewBox="0 0 24 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,12 h2 v4 h-2 z M8,12 h2 v4 h-2 z M16,12 h2 v4 h-2 z M20,12 h2 v4 h-2 z" fill="#e0e0e0" />
    <path d="M4,15 h2 v1 h-2 z M8,15 h2 v1 h-2 z M16,15 h2 v1 h-2 z M20,15 h2 v1 h-2 z" fill="#212121" />
    <path d="M3,4 h19 v8 h-19 z" fill="#ffffff" />
    <path d="M8,4 h4 v3 h-4 z M10,7 h3 v3 h-3 z M16,5 h4 v4 h-4 z M5,9 h2 v2 h-2 z" fill="#212121" />
    <path d="M22,5 h1 v4 h-1 z M22,9 h1 v2 h-1 z" fill="#e0e0e0" />
    <path d="M22,11 h1 v1 h-1 z" fill="#212121" />
    <path d="M1,2 h5 v6 h-5 z" fill="#ffffff" />
    <path d="M1,6 h5 v2 h-5 z" fill="#f48fb1" /> 
    <path d="M2,3 h1 v1 h-1 z M4,3 h1 v1 h-1 z" fill="#212121" /> 
    <path d="M2,1 h1 v1 h-1 z M4,1 h1 v1 h-1 z" fill="#9e9e9e" /> 
  </svg>
);

const PigSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,8 h2 v4 h-2 z M5,8 h2 v4 h-2 z M9,8 h2 v4 h-2 z M12,8 h2 v4 h-2 z" fill="#f06292" />
    <path d="M1,4 h13 v6 h-13 z" fill="#f48fb1" />
    <path d="M13,3 h3 v5 h-3 z" fill="#f48fb1" />
    <path d="M14,5 h2 v2 h-2 z" fill="#ec407a" /> 
    <path d="M14,4 h1 v1 h-1 z" fill="#212121" /> 
    <path d="M13,2 h1 v1 h-1 z M15,2 h1 v1 h-1 z" fill="#f06292" /> 
    <path d="M0,5 h1 v1 h-1 z" fill="#f06292" />
  </svg>
);

const SunflowerSprite = () => (
  <svg viewBox="0 0 12 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,10 h2 v14 h-2 z" fill="#4caf50" />
    <path d="M3,14 h2 v1 h-2 z M7,17 h2 v1 h-2 z" fill="#388e3c" />
    <path d="M4,1 h4 v8 h-4 z M1,4 h10 v2 h-10 z M2,2 h8 v6 h-8 z" fill="#ffeb3b" />
    <path d="M4,4 h4 v2 h-4 z M5,3 h2 v4 h-2 z" fill="#5d4037" />
  </svg>
);

const ZinniaSprite = () => (
  <svg viewBox="0 0 12 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,6 h2 v10 h-2 z" fill="#4caf50" />
    <path d="M2,2 h8 v4 h-8 z M4,0 h4 v8 h-4 z" fill="#e91e63" />
    <path d="M3,3 h6 v2 h-6 z M5,1 h2 v6 h-2 z" fill="#f06292" />
    <path d="M5,3 h2 v2 h-2 z" fill="#ffeb3b" />
  </svg>
);

const MarigoldSprite = () => (
  <svg viewBox="0 0 12 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,6 h2 v10 h-2 z" fill="#4caf50" />
    <path d="M3,2 h6 v4 h-6 z M4,1 h4 v6 h-4 z" fill="#ff9800" />
    <path d="M4,3 h4 v2 h-4 z M5,2 h2 v4 h-2 z" fill="#ffeb3b" />
  </svg>
);

const LavenderSprite = () => (
  <svg viewBox="0 0 10 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,8 h2 v12 h-2 z" fill="#4caf50" />
    <path d="M3,2 h4 v6 h-4 z M4,1 h2 v8 h-2 z" fill="#ab47bc" />
    <path d="M2,12 h2 v1 h-2 z M6,14 h2 v1 h-2 z" fill="#81c784" />
  </svg>
);

const GrassSprite = () => (
  <svg viewBox="0 0 10 8" className="w-full h-full opacity-60 drop-shadow-sm" shapeRendering="crispEdges">
     <path d="M2,4 h1 v4 h-1 z M5,2 h1 v6 h-1 z M8,5 h1 v3 h-1 z" fill="#66bb6a" />
  </svg>
);

const ChickenSprite = () => (
  <svg viewBox="0 0 10 10" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,8 h1 v2 h-1 z M7,8 h1 v2 h-1 z" fill="#fbc02d" />
    <path d="M2,4 h6 v4 h-6 z" fill="#ffffff" />
    <path d="M7,2 h2 v2 h-2 z" fill="#ffffff" />
    <path d="M8,1 h1 v1 h-1 z M7,0 h1 v1 h-1 z" fill="#e53935" /> 
    <path d="M9,3 h1 v1 h-1 z" fill="#fbc02d" /> 
    <path d="M1,3 h1 v2 h-1 z" fill="#ffffff" /> 
  </svg>
);

const RoosterSprite = () => (
  <svg viewBox="0 0 12 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,10 h1 v2 h-1 z M8,10 h1 v2 h-1 z" fill="#fbc02d" />
    <path d="M3,5 h6 v5 h-6 z" fill="#8d6e63" />
    <path d="M8,3 h2 v3 h-2 z" fill="#a1887f" />
    <path d="M8,0 h2 v2 h-2 z M10,1 h1 v2 h-1 z" fill="#e53935" /> 
    <path d="M9,6 h1 v2 h-1 z" fill="#e53935" /> 
    <path d="M10,4 h1 v1 h-1 z" fill="#fbc02d" /> 
    <path d="M1,3 h2 v6 h-2 z M0,4 h1 v4 h-1 z" fill="#1e88e5" /> 
    <path d="M2,5 h1 v2 h-1 z" fill="#43a047" /> 
  </svg>
);

const ChickSprite = () => (
  <svg viewBox="0 0 6 6" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M1,2 h4 v3 h-4 z" fill="#ffeb3b" />
    <path d="M5,3 h1 v1 h-1 z" fill="#f57f17" /> 
    <path d="M2,5 h1 v1 h-1 z M4,5 h1 v1 h-1 z" fill="#f57f17" /> 
  </svg>
);

const BeeSprite = () => (
  <svg viewBox="0 0 8 8" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M2,4 h4 v2 h-4 z" fill="#ffeb3b" />
    <path d="M3,4 h1 v2 h-1 z M5,4 h1 v2 h-1 z" fill="#212121" />
    <path d="M3,2 h2 v2 h-2 z" fill="#ffffff" opacity="0.8"/> 
  </svg>
);

const SheepSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,8 h2 v4 h-2 z M10,8 h2 v4 h-2 z" fill="#212121" /> 
    <path d="M1,2 h12 v8 h-12 z M0,4 h14 v4 h-14 z" fill="#f5f5f5" /> 
    <path d="M12,3 h3 v3 h-3 z" fill="#212121" /> 
    <path d="M13,3 h1 v1 h-1 z" fill="#ffffff" /> 
  </svg>
);

const GoatSprite = () => (
  <svg viewBox="0 0 16 14" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,8 h2 v4 h-2 z M10,8 h2 v4 h-2 z M14,8 h2 v4 h-2 z" fill="#9e9e9e" /> 
    <path d="M3,10 h1 v4 h-1 z M6,10 h1 v4 h-1 z M10,10 h1 v4 h-1 z M13,10 h1 v4 h-1 z" fill="#757575" />
    <path d="M2,5 h10 v5 h-10 z" fill="#e0e0e0" /> 
    <path d="M11,3 h3 v4 h-3 z" fill="#e0e0e0" /> 
    <path d="M14,4 h2 v2 h-2 z" fill="#e0e0e0" /> 
    <path d="M12,1 h1 v2 h-1 z M14,1 h1 v2 h-1 z" fill="#9e9e9e" /> 
    <path d="M13,7 h1 v2 h-1 z" fill="#bdbdbd" /> 
  </svg>
);

const PondSprite = () => (
  <svg viewBox="0 0 40 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,4 h32 v12 h-32 z" fill="#4fc3f7" opacity="0.8"/>
    <path d="M2,6 h36 v8 h-36 z" fill="#4fc3f7" opacity="0.8"/>
    <path d="M6,2 h28 v16 h-28 z" fill="#4fc3f7" opacity="0.8"/>
    <path d="M10,8 h4 v2 h-4 z M11,7 h2 v4 h-2 z" fill="#4caf50" />
    <path d="M12,8 h1 v1 h-1 z" fill="#4fc3f7" /> 
    <path d="M16,10 h6 v1 h-6 z M24,14 h4 v1 h-4 z" fill="#81d4fa" />
    <g className="animate-pond-ripple-1">
       <path d="M20,12 h4 v1 h-4 z M21,11 h2 v1 h-2 z" fill="#e1f5fe" opacity="0.7"/>
    </g>
    <g className="animate-pond-ripple-2">
       <path d="M30,6 h4 v1 h-4 z M31,7 h2 v1 h-2 z" fill="#e1f5fe" opacity="0.7"/>
    </g>
    <g className="animate-pond-ripple-3">
       <path d="M8,14 h4 v1 h-4 z M9,15 h2 v1 h-2 z" fill="#e1f5fe" opacity="0.7"/>
    </g>
  </svg>
);

const FrogSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <g className="frog-sit">
       <path d="M4,6 h8 v4 h-8 z" fill="#4caf50" />
       <path d="M5,4 h2 v2 h-2 z M9,4 h2 v2 h-2 z" fill="#4caf50" />
       <path d="M5,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z" fill="#212121" />
       <path d="M3,8 h2 v2 h-2 z M11,8 h2 v2 h-2 z" fill="#388e3c" />
    </g>
    <g className="frog-leap">
       <path d="M4,4 h8 v4 h-8 z" fill="#4caf50" />
       <path d="M4,2 h2 v2 h-2 z M8,2 h2 v2 h-2 z" fill="#4caf50" />
       <path d="M4,3 h1 v1 h-1 z M8,3 h1 v1 h-1 z" fill="#212121" />
       <path d="M1,6 h3 v2 h-3 z M12,7 h3 v2 h-3 z" fill="#388e3c" />
       <path d="M0,8 h2 v1 h-2 z M14,9 h2 v1 h-2 z" fill="#2e7d32" />
    </g>
  </svg>
);

const CatSprite = () => (
  <svg viewBox="0 0 14 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M3,8 h1 v4 h-1 z M10,8 h1 v4 h-1 z" fill="#fb8c00" />
    <path d="M2,5 h10 v4 h-10 z" fill="#ffb74d" />
    <path d="M10,2 h3 v3 h-3 z" fill="#ffb74d" />
    <path d="M10,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z" fill="#fb8c00" />
    <path d="M1,6 h1 v4 h-1 z M0,9 h1 v2 h-1 z" fill="#fb8c00" />
  </svg>
);

const DogSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M3,8 h2 v4 h-2 z M11,8 h2 v4 h-2 z" fill="#5d4037" />
    <path d="M2,4 h11 v5 h-11 z" fill="#8d6e63" />
    <path d="M11,1 h4 v4 h-4 z" fill="#8d6e63" />
    <path d="M11,2 h1 v3 h-1 z" fill="#5d4037" />
    <path d="M15,3 h1 v1 h-1 z M14,2 h1 v1 h-1 z" fill="#212121" />
    <path d="M1,4 h1 v4 h-1 z M0,5 h1 v2 h-1 z" fill="#5d4037" />
  </svg>
);

const SkeletonCowSprite = () => (
  <svg viewBox="0 0 24 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,12 h1 v4 h-1 z M9,12 h1 v4 h-1 z M16,12 h1 v4 h-1 z M21,12 h1 v4 h-1 z" fill="#e0e0e0" />
    <path d="M3,4 h18 v2 h-18 z" fill="#ffffff" />
    <path d="M6,6 h2 v4 h-2 z M10,6 h2 v4 h-2 z M14,6 h2 v4 h-2 z M18,6 h2 v3 h-2 z" fill="#ffffff" />
    <path d="M7,6 h1 v3 h-1 z M11,6 h1 v3 h-1 z M15,6 h1 v3 h-1 z" fill="#212121" />
    <path d="M22,5 h1 v1 h-1 z M22,7 h1 v1 h-1 z M22,9 h1 v1 h-1 z" fill="#e0e0e0" />
    <path d="M1,2 h5 v6 h-5 z" fill="#ffffff" />
    <path d="M2,3 h2 v2 h-2 z M1,6 h1 v1 h-1 z" fill="#000000" />
    <path d="M2,1 h1 v1 h-1 z M4,1 h1 v1 h-1 z" fill="#9e9e9e" />
  </svg>
);

const SkeletonPigSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,8 h1 v4 h-1 z M6,8 h1 v4 h-1 z M10,8 h1 v4 h-1 z M13,8 h1 v4 h-1 z" fill="#e0e0e0" />
    <path d="M1,4 h13 v2 h-13 z" fill="#ffffff" />
    <path d="M3,6 h1 v3 h-1 z M6,6 h1 v3 h-1 z M9,6 h1 v3 h-1 z" fill="#ffffff" />
    <path d="M13,3 h3 v5 h-3 z" fill="#ffffff" />
    <path d="M14,4 h1 v1 h-1 z M14,6 h1 v1 h-1 z" fill="#000000" />
    <path d="M13,2 h1 v1 h-1 z M15,2 h1 v1 h-1 z M0,5 h1 v1 h-1 z" fill="#bdbdbd" />
  </svg>
);

const SkeletonSheepSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,8 h1 v4 h-1 z M11,8 h1 v4 h-1 z" fill="#e0e0e0" />
    <path d="M1,4 h12 v2 h-12 z" fill="#ffffff" />
    <path d="M4,6 h1 v3 h-1 z M7,6 h1 v3 h-1 z M10,6 h1 v3 h-1 z" fill="#ffffff" />
    <path d="M12,3 h3 v3 h-3 z" fill="#ffffff" />
    <path d="M13,3 h1 v1 h-1 z" fill="#000000" />
    <path d="M12,2 h2 v1 h-2 z" fill="#bdbdbd" />
  </svg>
);

const SkeletonGoatSprite = () => (
  <svg viewBox="0 0 16 14" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,8 h1 v4 h-1 z M11,8 h1 v4 h-1 z M14,8 h1 v4 h-1 z" fill="#e0e0e0" />
    <path d="M2,5 h10 v2 h-10 z" fill="#ffffff" />
    <path d="M4,7 h1 v3 h-1 z M7,7 h1 v3 h-1 z M10,7 h1 v3 h-1 z" fill="#ffffff" />
    <path d="M11,3 h3 v4 h-3 z" fill="#ffffff" />
    <path d="M12,4 h1 v1 h-1 z" fill="#000000" />
    <path d="M12,1 h1 v2 h-1 z M14,1 h1 v2 h-1 z" fill="#9e9e9e" />
  </svg>
);

const SkeletonChickenSprite = () => (
  <svg viewBox="0 0 10 10" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,8 h1 v2 h-1 z M7,8 h1 v2 h-1 z" fill="#bdbdbd" />
    <path d="M2,4 h6 v2 h-6 z M3,6 h1 v1 h-1 z M5,6 h1 v1 h-1 z M7,2 h2 v2 h-2 z" fill="#ffffff" />
    <path d="M7,2 h1 v1 h-1 z" fill="#000000" />
    <path d="M9,3 h1 v1 h-1 z M1,3 h1 v1 h-1 z" fill="#bdbdbd" />
  </svg>
);

const SkeletonRoosterSprite = () => (
  <svg viewBox="0 0 12 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,10 h1 v2 h-1 z M8,10 h1 v2 h-1 z M10,4 h1 v1 h-1 z M1,3 h2 v1 h-2 z M0,4 h1 v1 h-1 z" fill="#bdbdbd" />
    <path d="M3,5 h6 v2 h-6 z M4,7 h1 v2 h-1 z M6,7 h1 v2 h-1 z M8,3 h2 v3 h-2 z" fill="#ffffff" />
    <path d="M8,4 h1 v1 h-1 z" fill="#000000" />
  </svg>
);

const SkeletonChickSprite = () => (
  <svg viewBox="0 0 6 6" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M1,2 h4 v2 h-4 z" fill="#ffffff" />
    <path d="M2,2 h1 v1 h-1 z" fill="#000000" />
    <path d="M5,3 h1 v1 h-1 z M2,5 h1 v1 h-1 z M4,5 h1 v1 h-1 z" fill="#bdbdbd" />
  </svg>
);

const SkeletonCatSprite = () => (
  <svg viewBox="0 0 14 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M3,8 h1 v4 h-1 z M10,8 h1 v4 h-1 z M1,6 h1 v1 h-1 z M1,8 h1 v1 h-1 z M0,9 h1 v2 h-1 z" fill="#bdbdbd" />
    <path d="M2,5 h10 v2 h-10 z M4,7 h1 v2 h-1 z M7,7 h1 v2 h-1 z M10,2 h3 v3 h-3 z M10,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M11,3 h1 v1 h-1 z" fill="#000000" />
  </svg>
);

const SkeletonDogSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M3,8 h1 v4 h-1 z M11,8 h1 v4 h-1 z M11,2 h1 v2 h-1 z M1,4 h1 v1 h-1 z M1,6 h1 v1 h-1 z M0,7 h1 v1 h-1 z" fill="#bdbdbd" />
    <path d="M2,4 h11 v2 h-11 z M4,6 h1 v3 h-1 z M8,6 h1 v3 h-1 z M11,1 h4 v4 h-4 z" fill="#ffffff" />
    <path d="M12,2 h1 v1 h-1 z M15,3 h1 v1 h-1 z" fill="#000000" />
  </svg>
);

const SkeletonFrogSprite = () => (
  <svg viewBox="0 0 16 12" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <g className="frog-sit">
      <path d="M4,6 h8 v1 h-8 z M5,4 h2 v2 h-2 z M9,4 h2 v2 h-2 z" fill="#ffffff" />
      <path d="M5,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z" fill="#000000" />
      <path d="M3,8 h2 v1 h-2 z M11,8 h2 v1 h-2 z" fill="#bdbdbd" />
    </g>
    <g className="frog-leap">
      <path d="M4,4 h8 v1 h-8 z M4,2 h2 v2 h-2 z M8,2 h2 v2 h-2 z" fill="#ffffff" />
      <path d="M4,3 h1 v1 h-1 z M8,3 h1 v1 h-1 z" fill="#000000" />
      <path d="M1,6 h2 v1 h-2 z M12,7 h2 v1 h-2 z" fill="#bdbdbd" />
    </g>
  </svg>
);

const LocustSprite = () => (
  <svg viewBox="0 0 8 8" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M1,4 h6 v2 h-6 z" fill="#5d4037" />
    <path d="M7,4 h1 v1 h-1 z" fill="#d84315" />
    <path d="M2,2 h3 v2 h-3 z M1,3 h1 v1 h-1 z" fill="#d7ccc8" opacity="0.8"/>
    <path d="M5,5 h1 v2 h-1 z M6,6 h1 v2 h-1 z" fill="#4e342e" />
  </svg>
);

const BareTreeSprite = () => (
  <svg viewBox="0 0 16 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M7,16 h2 v4 h-2 z" fill="#3e2723" />
    <path d="M6,14 h2 v2 h-2 z M8,12 h2 v4 h-2 z M5,12 h2 v2 h-2 z M9,9 h2 v3 h-2 z M6,7 h2 v5 h-2 z M4,8 h2 v2 h-2 z M7,4 h2 v3 h-2 z M9,2 h1 v2 h-1 z" fill="#4e342e" />
  </svg>
);

const WiltedSunflowerSprite = () => (
  <svg viewBox="0 0 12 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,16 h2 v8 h-2 z M4,14 h2 v2 h-2 z M3,12 h2 v2 h-2 z M2,10 h2 v2 h-2 z" fill="#5d4037" />
    <path d="M3,18 h2 v1 h-2 z M7,21 h2 v1 h-2 z" fill="#4e342e" />
    <path d="M1,9 h4 v4 h-4 z M0,11 h6 v2 h-6 z" fill="#8d6e63" />
    <path d="M1,10 h4 v2 h-4 z" fill="#3e2723" />
  </svg>
);

const WiltedZinniaSprite = () => (
  <svg viewBox="0 0 12 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,10 h2 v6 h-2 z M4,8 h2 v2 h-2 z M3,6 h2 v2 h-2 z" fill="#5d4037" />
    <path d="M1,5 h4 v3 h-4 z" fill="#8d6e63" />
    <path d="M2,6 h2 v2 h-2 z" fill="#4e342e" />
  </svg>
);

const WiltedMarigoldSprite = () => (
  <svg viewBox="0 0 12 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M5,10 h2 v6 h-2 z M6,8 h2 v2 h-2 z M7,6 h2 v2 h-2 z" fill="#5d4037" />
    <path d="M7,5 h4 v3 h-4 z" fill="#8d6e63" />
    <path d="M8,6 h2 v2 h-2 z" fill="#4e342e" />
  </svg>
);

const WiltedLavenderSprite = () => (
  <svg viewBox="0 0 10 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M4,12 h2 v8 h-2 z M5,10 h2 v2 h-2 z M6,8 h2 v2 h-2 z" fill="#5d4037" />
    <path d="M6,6 h2 v4 h-2 z M7,4 h2 v4 h-2 z" fill="#5d4037" />
    <path d="M3,16 h2 v1 h-2 z M6,18 h2 v1 h-2 z" fill="#4e342e" /> 
  </svg>
);

const BarnSprite = () => (
  <svg viewBox="0 0 24 22" className="w-full h-full drop-shadow-lg" shapeRendering="crispEdges">
    <path d="M12,0 L24,9 h-24 z" fill="#8b1a1a" />
    <path d="M12,0 L24,9 h-2 L12,2 L2,9 H0 z" fill="#c0392b" />
    <path d="M10,3 h4 v4 h-4 z" fill="#87ceeb" />
    <path d="M11,3 h2 v4 h-2 z" fill="#b3e5fc" />
    <path d="M2,9 h20 v13 h-20 z" fill="#c0392b" />
    <path d="M18,9 h4 v13 h-4 z" fill="#922b21" />
    <path d="M8,14 h8 v8 h-8 z" fill="#6d4c41" />
    <path d="M8,14 h4 v8 h-4 z" fill="#795548" />
    <path d="M8,14 h1 v1 h1 v1 h1 v1 h-1 v1 h-1 v1 h-1 z" fill="#5d4037" opacity="0.6"/>
    <path d="M15,14 h1 v3 h-1 z M14,17 h1 v1 h-1 z M13,18 h1 v1 h-1 z M12,19 h1 v1 h-1 z" fill="#5d4037" opacity="0.6"/>
    <path d="M3,11 h3 v3 h-3 z M18,11 h3 v3 h-3 z" fill="#87ceeb" />
    <path d="M3,11 h1 v3 h-1 z M18,11 h1 v3 h-1 z" fill="#b3e5fc" />
    <path d="M2,21 h20 v1 h-20 z" fill="#5d4037" />
  </svg>
);

const SiloSprite = () => (
  <svg viewBox="0 0 10 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M1,0 h8 v1 h-8 z M0,1 h10 v2 h-10 z" fill="#9e9e9e" />
    <path d="M1,0 h4 v3 h-4 z" fill="#bdbdbd" />
    <path d="M1,3 h8 v17 h-8 z" fill="#e0e0e0" />
    <path d="M7,3 h2 v17 h-2 z" fill="#bdbdbd" />
    <path d="M1,3 h2 v17 h-2 z" fill="#f5f5f5" />
    <path d="M1,7 h8 v1 h-8 z M1,12 h8 v1 h-8 z M1,17 h8 v1 h-8 z" fill="#9e9e9e" />
    <path d="M3,15 h4 v5 h-4 z" fill="#8d6e63" />
    <path d="M4,15 h2 v5 h-2 z" fill="#a1887f" />
  </svg>
);

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
      <PixelBox className="flex gap-4 items-start relative shadow-2xl">
        {(portrait || name === 'Wallace') && (
          <div className="w-20 h-20 bg-[#d7ccc8] border-4 border-[#5d4037] flex items-center justify-center text-4xl shrink-0 overflow-hidden relative">
            {name === 'Wallace' ? (
              <>
                <img src={imgSrc} alt={`Wallace ${emotion}`} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = fbSrc; }} />
                {emotion === 'angry' && <div className="absolute top-1 right-1 text-2xl animate-bounce drop-shadow-md">💢</div>}
              </>
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${name === 'You' || name === 'Instructor' ? '' : 'p-2'}`}>{portrait}</div>
            )}
          </div>
        )}
        <div className="flex-1">
          {name && <h3 className="font-bold text-xl mb-1 text-[#5d4037]">{name}</h3>}
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

export default function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState('TITLE'); 
  const [dreamStage, setDreamStage] = useState('INTRO_DIALOG'); 
  const [matchPhase, setMatchPhase] = useState(0); 
  const [combinedBins, setCombinedBins] = useState([]); 
  const [dialogIndex, setDialogIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [isChapterSelectOpen, setIsChapterSelectOpen] = useState(false);

  // Title effects
  const [sakuraClicks, setSakuraClicks] = useState([]);
  const [bugsClicks, setBugsClicks] = useState([]);
  const [butterflyBursts, setButterflyBursts] = useState([]);
  const [lingeringBugs, setLingeringBugs] = useState({ bees: [], woodlice: [] });

  const triggerSakura = () => {
    const id = Date.now();
    setSakuraClicks(prev => [...prev, id]);
    setTimeout(() => setSakuraClicks(prev => prev.filter(c => c !== id)), 4000);
  };

  const triggerBugs = () => {
    const id = Date.now();
    setBugsClicks(prev => [...prev, id]);
    setTimeout(() => setBugsClicks(prev => prev.filter(c => c !== id)), 2000);

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
    const x = e.clientX;
    const y = e.clientY;
    const id = Date.now() + Math.random();
    
    setButterflyBursts(prev => [...prev, { id, x, y }]);
    setTimeout(() => setButterflyBursts(prev => prev.filter(b => b.id !== id)), 2500);
  };

  const handleBeeClick = (id) => {
    setLingeringBugs(prev => ({
      ...prev,
      bees: prev.bees.map(b => b.id === id ? { ...b, zoomed: true } : b)
    }));
  };

  const handleWoodlouseClick = (id) => {
    setLingeringBugs(prev => ({
      ...prev,
      woodlice: prev.woodlice.map(w => w.id === id ? { ...w, rolled: true } : w)
    }));
  };

  const audioRef = useRef(null);
  const wowAudioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioDismissed, setAudioDismissed] = useState(false);

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

  const showToast = (msg, emotion = 'normal') => {
    setToastMsg(msg);
    if (emotion !== 'normal') setWallaceEmotion(emotion);
    setTimeout(() => {
      setToastMsg(null);
      setWallaceEmotion('normal');
    }, 3500);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(() => setIsMusicPlaying(false));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) { audioRef.current.pause(); setIsMusicPlaying(false); }
      else { if (audioRef.current.readyState === 0) audioRef.current.load(); audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(() => showToast("Audio blocked!")); }
    }
  };

  const introStory = [
    "5:00 PM. You hold the familiar orange pill bottle in your hand.",
    "You pop the white plastic cap off, peer inside, and tip it upside down. Nothing. Just a dusting of powder falls out.",
    "Ugh, completely out of my ADHD medication... My brain feels like a browser with 40 tabs open and music playing from an unknown source.",
    "But tonight is important. It's the Chula Vista Master Composter class at 6:00 PM.",
    "You grab your keys, hop in your car, and hit the I-5."
  ];

  const classStory = [
    "6:00 PM - The Classroom.",
    "The instructor is talking about soil profiles. You're trying your best to pay attention.",
    "Without your medication, your eyelids grow incredibly heavy.",
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
    { name: "Reality", portrait: null, text: "You jolt awake in your chair at the Living Coast Discovery Center." },
    { name: "Instructor", portrait: <InstructorPortrait />, text: "...and that concludes our section on soil properties and compost components!" },
    { name: "You", portrait: <StudentPortrait />, text: "(Whoa... I actually understood all of that. The dream made perfect sense!)" },
    { name: "You", portrait: <StudentPortrait />, text: "(I know the 4 compost components, how to manage soil problems, and the optimal plant soils!)" }
  ];

  const badWakeUpStory = [
    { name: "Reality", portrait: null, text: "You jolt awake in your chair at the Living Coast Discovery Center, sweating." },
    { name: "Instructor", portrait: <InstructorPortrait />, text: "Hey! Are you sleeping in my class? Soil properties are NOT nap material!" },
    { name: "You", portrait: <StudentPortrait />, text: "(Oh no... I got caught... and that nightmare was awful. I didn't learn a thing.)" },
    { name: "You", portrait: <StudentPortrait />, text: "(I need to pay better attention next time...)" }
  ];

  const activeWakeUpStory = lives > 0 ? wakeUpStory : badWakeUpStory;

  const handleDialogNext = (script, nextStage) => {
    if (dialogIndex < script.length - 1) { setDialogIndex(dialogIndex + 1); }
    else { setDialogIndex(0); setDreamStage(nextStage); }
  };

  const handleStartDream = () => { setGameState('DREAM'); playAudio(); };

  const jumpToChapter = (stage) => {
    setDreamStage(stage); setDialogIndex(0); setCauldron([]); setCompletedExamples([]);
    setFixedPlots([]); setActivePlot(null); setPlotItems([]); setIsFixModalOpen(false);
    setAppliedItems([]); setPlantedBeds({}); setMatchPhase(0); setCombinedBins([]);
    setAudioDismissed(true); setIsChapterSelectOpen(false); 
    setLives(stage === 'NIGHTMARE_END' ? 0 : 3);
    setGameState('DREAM'); playAudio();
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
      const sfx = new Audio(questSound); sfx.volume = 1.0; sfx.play().catch(() => {});
    }
  }, [dreamStage, dialogIndex, lives]);

  useEffect(() => {
    if (dreamStage === 'END_DIALOG' && lives > 0) {
      if (wowAudioRef.current) {
        wowAudioRef.current.volume = 0.6;
        wowAudioRef.current.play().catch(() => {});
      }
    }
    if (dreamStage === 'NIGHTMARE_END') {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
      setIsMusicPlaying(false);
      const sfx = new Audio(nightmareSound); sfx.volume = 1.0; sfx.play().catch(() => {});
    }
    if (dreamStage === 'WAKE_UP') {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
      setIsMusicPlaying(false);
      const sfx = new Audio(wakeUpSound); sfx.volume = 1.0; sfx.play().catch(() => {});
    }
  }, [dreamStage]);

  useEffect(() => {
    if (gameState === 'SLEEP_TRANSITION') {
      const timer = setTimeout(() => handleStartDream(), 4000);
      return () => clearTimeout(timer);
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
        const sfx = new Audio(pitchforkSound); sfx.volume = 1.0; sfx.play().catch(() => {});
        setTimeout(() => { setIsStirring(false); showToast("Perfect! Compost is made!", 'surprised'); setTimeout(() => setDreamStage('MATCH_EXAMPLES'), 2000); }, 2000);
      } else {
        setTimeout(() => { 
           setLives(l => l - 1);
           showToast("Wallace: That ain't soil! Try again.", 'sad'); 
           initializeGroundItems(); 
        }, 2000);
      }
    }
  }, [cauldron, dreamStage]);

  useEffect(() => {
    if (dreamStage === 'MATCH_EXAMPLES') {
      if (matchPhase === 0) {
        const greens = completedExamples.filter(id => EXAMPLE_ITEMS.find(i => i.id === id)?.comp.includes('Nitrogen')).length;
        const browns = completedExamples.filter(id => EXAMPLE_ITEMS.find(i => i.id === id)?.comp.includes('Carbon')).length;
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

  useEffect(() => {
    if (!['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) || isFixModalOpen || isWorking || lives <= 0) return;

    let animationFrameId;
    const speed = 1.5; // Walking pace
    const maxX = 340 - 40; const maxY = 300 - 40;

    const loop = () => {
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
           const step = Math.min(speed, dist * 0.15);
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
         wallacePosRef.current.x += (trailPos.x - wallacePosRef.current.x) * 0.07;
         wallacePosRef.current.y += (trailPos.y - wallacePosRef.current.y) * 0.07;
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
                  closest = { id: `held_${bin.id}`, name: bin.label, sprite: '📦', isBin: true };
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
                if ((heldItem.name || heldItem) === '✨ Magic') { const sfx = new Audio(magicSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
                else { const sfx = new Audio(tossBinSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
             } else showToast("Get closer to the mixing bin!");
         } else if (dreamStage === 'MATCH_EXAMPLES') {
             const pileCenter = { x: 170, y: 150 };
             const distToPile = Math.hypot(farmerCenter.x - pileCenter.x, farmerCenter.y - pileCenter.y);

             if (matchPhase === 0) {
               let closestBin = null;
               EXAMPLE_BINS.forEach(bin => {
                  if (Math.hypot(farmerCenter.x - (bin.x + 40), farmerCenter.y - (bin.y + 40)) < 75) closestBin = bin;
               });
               if (closestBin) {
                  if (heldItem.comp === closestBin.comp) { 
                     setCompletedExamples(prev => [...prev, heldItem.id]); 
                     setHeldItem(null); 
                     showToast(`Correct! Added ${heldItem.name}.`, 'surprised'); 
                  }
                  else {
                     setLives(l => l - 1);
                     showToast("Wallace: Wrong bin!", 'sad');
                  }
               } else showToast("Get closer to a station!");
             } else if (matchPhase === 1 && heldItem.isBin && distToPile < 80) {
               setCombinedBins(prev => [...prev, heldItem.id === 'held_bin_n' ? 'bin_n' : 'bin_c']);
               setHeldItem(null); showToast(`Combined!`, 'surprised');
             } else if (matchPhase === 2 && heldItem.id === 'ex_w' && distToPile < 80) {
               setIsWatering(true); setHeldItem(null); showToast("Watering...", 'surprised');
               setTimeout(() => { setIsWatering(false); setMatchPhase(3); initializeExamplesItems(3); showToast("Now add air!", 'surprised'); }, 3000);
             } else if (matchPhase === 3 && heldItem.id === 'ex_a' && distToPile < 80) {
               setIsStirring(true); setHeldItem(null); showToast("Aerating...", 'surprised');
               const sfx = new Audio(pitchforkSound); sfx.volume = 1.0; sfx.play().catch(() => {});
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
                   setLives(l => l - 1);
                   showToast("Wallace: Wrong soil!", 'sad');
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
  }, [dreamStage, heldItem, groundItems, matchPhase, completedExamples, combinedBins, activePlot, isFixModalOpen, isWorking, plotItems, appliedItems, fixedPlots, answeredPlots, plantedBeds, lives]);

  const handleApplyItemToPlot = () => {
    // Check if the held item is correct for the active plot
    let isCorrectTool = false;
    if (activePlot.id === 'compaction' && (heldItem.id === 'tool_p' || heldItem.id === 'item_om')) isCorrectTool = true;
    if (activePlot.id === 'erosion' && (heldItem.id === 'item_cc' || heldItem.id === 'item_m')) isCorrectTool = true;
    if (activePlot.id === 'drainage' && (heldItem.id === 'tool_h' || heldItem.id === 'item_om2')) isCorrectTool = true;

    if (!isCorrectTool) {
        setLives(l => l - 1);
        showToast("Wallace: That ain't the right material for this problem!", 'sad');
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
     
     if (activePlot.id === 'compaction') { setIsStirring(true); const sfx = new Audio(pitchforkSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
     if (activePlot.id === 'erosion') { const sfx = new Audio(patDirtSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
     if (activePlot.id === 'drainage') { setIsWorking(true); const sfx = new Audio(hammerSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
     
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
      setLives(l => l - 1);
      showToast("Wallace: That'll make it worse!", 'sad'); 
    }
  };

  // --- RENDERERS ---
  const renderTitle = () => (
    <div key="scene-title" className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
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
          {[...Array(6)].map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 150;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 40; // bias upward 
            
            const Sprites = [MonarchSprite, PaintedLadySprite, DogfaceSprite];
            const Sprite = Sprites[Math.floor(Math.random() * Sprites.length)];
            
            return (
              <div key={`bf-${i}`} className="absolute animate-butterfly-burst" style={{ '--tx': `${tx}px`, '--ty': `${ty}px`, animationDuration: `${1.5 + Math.random()}s` }}>
                 <div className="w-5 h-5 animate-butterfly-flap drop-shadow-md" style={{ animationDuration: `${0.1 + Math.random() * 0.1}s` }}>
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
      {sakuraClicks.map(id => (
        <div key={`sakura-cascade-${id}`} className="fixed inset-0 pointer-events-none z-[150]">
          {[...Array(30)].map((_, i) => (
            <div key={`petal-${i}`} className="absolute -top-10 animate-sakura-fall" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`,
              '--tx': `${(Math.random() - 0.5) * 300}px`
            }}>
              <div className="w-4 h-4"><SakuraSprite /></div>
            </div>
          ))}
        </div>
      ))}

      {/* Bugs Burst Overlay */}
      {bugsClicks.map(id => (
        <div key={`bug-burst-${id}`} className="fixed top-[45%] left-1/2 -translate-x-1/2 pointer-events-none z-[150]">
          {[...Array(15)].map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 100 + Math.random() * 250;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            return (
              <div key={`bee-${i}`} className="absolute animate-bug-burst" style={{
                '--tx': `${tx}px`, '--ty': `${ty}px`, '--rot': '0rad', animationDuration: `${0.8 + Math.random()}s`
              }}>
                <div className="w-5 h-5"><BeeSprite /></div>
              </div>
            );
          })}
          {[...Array(12)].map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 80 + Math.random() * 150;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            return (
              <div key={`louse-${i}`} className="absolute animate-bug-burst" style={{
                '--tx': `${tx}px`, '--ty': `${ty}px`, '--rot': `${Math.atan2(ty, tx)}rad`, animationDuration: `${1.2 + Math.random() * 0.8}s`
              }}>
                <div className="w-4 h-3"><WoodlouseSprite /></div>
              </div>
            );
          })}
        </div>
      ))}

      <PixelBox className="text-center max-w-lg w-full relative z-10">
        <div className="mb-8 mt-4 leading-tight">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span 
               className="stardew-title cursor-pointer hover:scale-110 hover:-rotate-6 transition-transform inline-block select-none" 
               onClick={triggerSakura}
            >
              Master
            </span>
            <br />
            <span 
               className="stardew-subtitle text-3xl md:text-4xl mt-2 tracking-[0.2em] cursor-pointer hover:scale-110 hover:rotate-6 transition-transform inline-block select-none" 
               onClick={triggerBugs}
            >
              COMPOSTER
            </span>
          </h1>
          <h2 className="text-2xl mt-2 tracking-[0.4em] font-bold text-white drop-shadow-md">QUEST</h2>
        </div>
        <div className="h-24 mb-8 animate-bounce flex items-end justify-center gap-4">
          <div className="w-16 h-16"><FarmerSprite /></div>
          <div className="w-12 h-16"><WallaceFollowerSprite /></div>
        </div>
        <button onClick={() => setGameState('INTRO')} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full mb-3 relative z-20 pointer-events-auto">New Game</button>
        <button onClick={() => setIsChapterSelectOpen(true)} className="bg-[#8b5a2b] text-white px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#5d4037] border-b-4 border-[#3e2723] active:border-b-0 active:translate-y-1 w-full relative z-20 pointer-events-auto">Chapter Select</button>
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
         <div className="w-full max-w-[500px] h-[260px] md:h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-4 md:mb-24">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#1b5e20] border-4 border-[#3e2723] flex items-center justify-center"><span className="text-white font-mono text-xs opacity-80">COMPOST = 🍃+🍂+💧+💨</span></div>
            <div className="absolute bottom-0 w-full h-[140px] bg-[#8d6e63] border-t-4 border-[#5d4037] flex justify-center overflow-hidden">
              <div className="absolute top-10 left-6 flex flex-col items-center scale-90 opacity-90 z-10">
                 <div className="w-12 h-12 relative z-10"><StudentBlondeSprite /></div>
                 <div className="w-20 h-10 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-3"><div className="absolute left-2 top-1 w-4 h-6 bg-white opacity-80 rotate-6"></div></div>
              </div>
              <div className="absolute top-10 right-6 flex flex-col items-center scale-90 opacity-90 z-10">
                 <div className="w-12 h-12 relative z-10"><StudentBrownHairSprite /></div>
                 <div className="w-20 h-10 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-3"><div className="absolute right-2 top-2 w-5 h-5 bg-[#fdd835] opacity-80 -rotate-12"></div></div>
              </div>
              <div className="absolute -top-2 right-24 flex flex-col items-center scale-[0.80] opacity-80 z-0">
                 <div className="w-12 h-12 relative z-10"><StudentPonytailSprite /></div>
                 <div className="w-20 h-10 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-3"><div className="absolute left-4 top-1 w-6 h-4 bg-pink-200 opacity-80 rotate-12"></div></div>
              </div>
            </div>
            <div className="absolute top-[100px] left-1/4 w-10 h-12"><InstructorSprite /></div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
               <div className="w-14 h-14 relative z-10"><FarmerSprite /></div>
               <div className="w-28 h-12 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-4"><div className="absolute left-4 top-2 w-6 h-8 bg-white opacity-80 rotate-12"></div></div>
            </div>
         </div>
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
          {/* Background farm scenery */}
          <div className={`absolute top-4 left-4 w-12 h-16 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-8 left-20 w-16 h-20 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-2 left-40 w-10 h-14 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          
          <div className={`absolute top-6 right-10 w-16 h-20 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-12 right-28 w-12 h-16 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>
          <div className={`absolute top-2 right-44 w-14 h-18 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <BareTreeSprite /> : <TreeSprite />}</div>

          {/* Pond & Frog */}
          <div className={`absolute top-28 sm:top-20 left-[50%] w-32 h-16 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale sepia' : ''}`}><PondSprite /></div>
          <div className="absolute top-[7.5rem] sm:top-[5.5rem] left-[60%] w-6 h-5 opacity-90 z-20 animate-frog">
             {dreamStage === 'NIGHTMARE_END' ? <SkeletonFrogSprite /> : <FrogSprite />}
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
          <div className="absolute bottom-36 left-48 w-8 h-6 opacity-90 z-10">{dreamStage === 'NIGHTMARE_END' ? <SkeletonCatSprite /> : <CatSprite />}</div>
          <div className="absolute bottom-32 left-64 w-10 h-8 opacity-90 z-10">{dreamStage === 'NIGHTMARE_END' ? <SkeletonDogSprite /> : <DogSprite />}</div>

          {/* Flowers */}
          <div className={`absolute top-32 left-6 w-6 h-12 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedSunflowerSprite /> : <SunflowerSprite />}</div>
          <div className={`absolute top-36 left-16 w-5 h-10 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedSunflowerSprite /> : <SunflowerSprite />}</div>
          <div className={`absolute top-40 right-8 w-6 h-12 opacity-80 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedSunflowerSprite /> : <SunflowerSprite />}</div>

          <div className={`absolute top-48 left-10 w-4 h-8 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedZinniaSprite /> : <ZinniaSprite />}</div>
          <div className={`absolute top-52 left-14 w-4 h-8 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedMarigoldSprite /> : <MarigoldSprite />}</div>
          <div className={`absolute top-46 left-16 w-4 h-10 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedLavenderSprite /> : <LavenderSprite />}</div>
          <div className={`absolute top-64 right-10 w-4 h-10 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedLavenderSprite /> : <LavenderSprite />}</div>
          <div className={`absolute top-60 right-16 w-4 h-8 opacity-90 ${dreamStage === 'NIGHTMARE_END' ? 'grayscale' : ''}`}>{dreamStage === 'NIGHTMARE_END' ? <WiltedZinniaSprite /> : <ZinniaSprite />}</div>

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
                   {dreamStage === 'CRAFT_SOIL' && "Gather Nitrogen, Carbon, Water, and Air!"}
                   {dreamStage === 'MATCH_EXAMPLES' && "Follow the steps to layer, water, and air the pile."}
                   {dreamStage === 'FIX_PLOTS' && (activePlot ? (appliedItems.length < 2 ? `Gather the 2 materials!` : "Finishing work...") : "Walk to a damaged plot and press E.")}
                   {dreamStage === 'PLANT_SEEDS' && "Match the plants to their preferred soil!"}
                 </div>
               )}
               <PixelBox className="py-2 px-4 flex gap-4 items-center">
                  <span className="text-red-500 font-bold text-lg tracking-widest drop-shadow-md">
                     {'❤️'.repeat(Math.max(0, lives))}{'🖤'.repeat(Math.max(0, 3 - lives))}
                  </span>
                  <button onClick={toggleMusic} className="bg-[#8b5a2b] text-white px-3 py-1 text-xs hover:bg-[#5d4037] border-2 border-[#3e2723]">🎵 {isMusicPlaying ? 'ON' : 'OFF'}</button>
               </PixelBox>
            </div>

            {['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) && (
              <div className="text-center animate-fade-in relative flex flex-col items-center">


                 <div style={{ width: 340 * gameScale, height: 300 * gameScale, position: 'relative', flexShrink: 0, overflow: 'hidden', touchAction: 'manipulation' }}>
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
                      <div className={`absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#4e342e] rounded-full border-4 flex flex-wrap items-center justify-center p-2 z-10 overflow-hidden transition-all duration-300 ${cauldron.includes('✨ Magic') ? 'animate-rainbow-glow border-transparent' : 'border-[#3e2723]'}`}>
                         {cauldron.length === 0 && <span className="text-[#8d6e63] text-xs font-bold">BIN</span>}
                         {cauldron.map((item, idx) => <span key={`cauldron-${idx}`} className="bg-[#d7ccc8] text-[8px] p-0.5 m-0.5 font-bold rounded relative z-30">{item}</span>)}
                         
                         {cauldron.includes('✨ Magic') && (
                            <>
                              <div className="absolute top-2 left-4 text-xs animate-sparkle" style={{animationDelay: '0s'}}>✨</div>
                              <div className="absolute bottom-4 right-6 text-sm animate-sparkle" style={{animationDelay: '0.3s'}}>✨</div>
                              <div className="absolute top-6 right-2 text-xs animate-sparkle" style={{animationDelay: '0.6s'}}>✨</div>
                              <div className="absolute bottom-2 left-6 text-sm animate-sparkle" style={{animationDelay: '0.9s'}}>✨</div>
                            </>
                         )}

                         {isStirring && <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-40 rounded-full animate-stir"><div className="w-10 h-14"><PitchforkSprite/></div></div>}
                      </div>
                    )}

                    {dreamStage === 'MATCH_EXAMPLES' && (
                      <>
                        {EXAMPLE_BINS.map(bin => {
                           const isCombined = combinedBins.includes(bin.id);
                           return (
                              <div key={bin.id} className={`absolute w-20 h-20 border-4 border-[#3e2723] flex flex-col items-center justify-center z-10 shadow-md transition-opacity duration-500 ${bin.color} ${isCombined ? 'opacity-30 grayscale' : 'opacity-100'}`} style={{ transform: `translate(${bin.x}px, ${bin.y}px)` }}>
                                <span className="text-white text-[9px] font-bold text-center leading-tight">{bin.label}</span>
                              </div>
                           );
                        })}
                        <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#4e342e] border-4 border-[#3e2723] rounded-full transition-all duration-700 flex items-center justify-center z-5 shadow-inner ${matchPhase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                           {isWatering && (
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                               <div className="w-12 h-10 animate-pour origin-right"><WateringCanSprite /></div>
                               <div className="flex justify-center gap-1 mt-2">{[1,2,3,4].map(i => <div key={i} className="w-1 h-2 bg-blue-400 animate-droplet" style={{ animationDelay: `${i * 0.1}s` }}></div>)}</div>
                             </div>
                           )}
                           {isStirring && <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 rounded-full animate-stir"><div className="w-10 h-14"><PitchforkSprite/></div></div>}
                        </div>
                      </>
                    )}

                    {dreamStage === 'FIX_PLOTS' && (
                      <>
                        {SOIL_PROBLEMS.map(plot => {
                           const isFixed = fixedPlots.includes(plot.id);
                           const isWorkingOnPlot = activePlot?.id && answeredPlots.includes(activePlot.id) && !fixedPlots.includes(activePlot.id);
                           return (
                             <div key={plot.id} className={`absolute w-16 h-16 border-4 border-[#3e2723] flex items-center justify-center z-10 transition-colors ${isFixed ? 'bg-[#5d4037] border-green-600' : 'bg-[#795548] animate-pulse'}`} style={{ transform: `translate(${plot.x}px, ${plot.y}px)` }}>
                                {isFixed ? '🌱' : plot.sprite}
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
                        return (
                          <React.Fragment key={`bed-fragment-${index}`}>
                            <div className="absolute w-16 h-16 bg-[#5d4037] border-4 border-[#3e2723] flex items-center justify-center z-10" style={{ transform: `translate(${bed.x}px, ${bed.y}px)` }}>{planted ? <span className="text-3xl">{planted.sprite}</span> : <span className="text-[#8d6e63] text-[9px] font-bold">SOIL</span>}</div>
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

                    <div className="absolute w-8 h-10 z-[29]" style={{ transform: `translate(${wallaceRenderPos.x}px, ${wallaceRenderPos.y}px)` }}>
                       <div className="w-full h-full animate-wallace-wobble">
                         <div className="w-full h-full" style={{ transform: wallaceDir === 'left' ? 'scaleX(-1)' : undefined }}><WallaceFollowerSprite /></div>
                       </div>
                    </div>

                    <div className="absolute w-10 h-10 z-30" style={{ transform: `translate(${farmerRenderPos.x}px, ${farmerRenderPos.y}px)` }}>
                      <div className={farmerRenderPos.isWalking ? 'farmer-walking' : ''}>
                       <FarmerSprite />
                       {heldItem && (
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-900 border-2 border-amber-600 px-1 py-0.5 text-[10px] font-bold rounded animate-bounce shadow-md flex items-center gap-1 min-w-max">
                            <div className="w-4 h-4">{heldItem.component ? <heldItem.component /> : <span>{heldItem.sprite}</span>}</div>
                            <span>{heldItem.name}</span>
                         </div>
                       )}
                      </div>
                    </div>
                 </div>
                 </div>


<DialogBox name="Wallace" text={
                   dreamStage === 'CRAFT_SOIL' ? "Toss those four elements into the compost bin!" :
                   dreamStage === 'MATCH_EXAMPLES' ? "Step by step, partner! Layer 'em up." :
                   dreamStage === 'FIX_PLOTS' ? (activePlot ? activePlot.hint : "Let's fix up this garden before we plant.") :
                   "Final stretch! Get those seeds in the right dirt."
                 } hideNext emotion={wallaceEmotion} />
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
                      <div className="flex flex-col items-center animate-hen-hop">
                         <div className="w-14 h-14">
                            <PolishHenSprite name="Riot" />
                         </div>
                         <span className="text-[8px] font-bold text-white bg-black/50 px-1 rounded mt-1 shadow-sm">Riot</span>
                      </div>
                   </div>

                   {/* Beyonce (Black/Copper Golden Laced Polish Hen) */}
                   <div className="absolute bottom-[35%] right-[20%] z-20 animate-hen-walk" style={{ animationDelay: '1.5s' }}>
                      <div className="flex flex-col items-center animate-hen-hop" style={{ animationDelay: '0.15s' }}>
                         <div className="w-14 h-14" style={{ transform: 'scaleX(-1)' }}>
                            <PolishHenSprite name="Beyonce" />
                         </div>
                         <span className="text-[8px] font-bold text-white bg-black/50 px-1 rounded mt-1 shadow-sm">Beyonce</span>
                      </div>
                   </div>

                </div>
                </div>
                <DialogBox key="end-dialog" name="Wallace" text={endStory[dialogIndex]} onNext={() => handleDialogNext(endStory, 'WAKE_UP')} emotion={wallaceEmotion} />
              </div>
            )}

            {['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) && (
              <div className="fixed bottom-36 left-1/2 -translate-x-1/2 w-full max-w-xl px-2 md:px-4 z-40">
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
           <div className="w-full max-w-[500px] h-[260px] md:h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-4 md:mb-24">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#1b5e20] border-4 border-[#3e2723] flex items-center justify-center"><span className="text-white font-mono text-xs opacity-80">COMPOST = 🍃+🍂+💧+💨</span></div>
              <div className="absolute bottom-0 w-full h-[140px] bg-[#8d6e63] border-t-4 border-[#5d4037] flex justify-center overflow-hidden">
                <div className="absolute top-10 left-6 flex flex-col items-center scale-90 opacity-90 z-10">
                   <div className="w-12 h-12 relative z-10"><StudentBlondeSprite /></div>
                   <div className="w-20 h-10 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-3"><div className="absolute left-2 top-1 w-4 h-6 bg-white opacity-80 rotate-6"></div></div>
                </div>
                <div className="absolute top-10 right-6 flex flex-col items-center scale-90 opacity-90 z-10">
                   <div className="w-12 h-12 relative z-10"><StudentBrownHairSprite /></div>
                   <div className="w-20 h-10 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-3"><div className="absolute right-2 top-2 w-5 h-5 bg-[#fdd835] opacity-80 -rotate-12"></div></div>
                </div>
                <div className="absolute -top-2 right-24 flex flex-col items-center scale-[0.80] opacity-80 z-0">
                   <div className="w-12 h-12 relative z-10"><StudentPonytailSprite /></div>
                   <div className="w-20 h-10 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-3"><div className="absolute left-4 top-1 w-6 h-4 bg-pink-200 opacity-80 rotate-12"></div></div>
                </div>
              </div>
              <div className="absolute top-[100px] left-1/4 w-10 h-12 relative">
                  <InstructorSprite />
                  {isBadEnding && dialogIndex >= 1 && <div className="absolute -top-6 -right-6 text-2xl animate-bounce text-red-500 font-bold">💢</div>}
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                 <div className={`w-14 h-14 relative z-10 ${!isBadEnding && dialogIndex === 0 ? 'animate-[bounce_0.5s_ease-out_2]' : ''}`}><FarmerSprite />{!isBadEnding && dialogIndex === 0 && <div key="alert-bubble" className="absolute -top-4 -right-4 text-xl animate-pulse text-red-600 font-bold">❗</div>}</div>
                 <div className="w-28 h-12 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-4"><div className="absolute left-4 top-2 w-6 h-8 bg-white opacity-80 rotate-12"></div></div>
              </div>
           </div>
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
               setGameState('TITLE'); setDreamStage('INTRO_DIALOG'); setDialogIndex(0); setCauldron([]); setCompletedExamples([]); setFixedPlots([]); setActivePlot(null); setPlotItems([]); setIsFixModalOpen(false); setAppliedItems([]); setPlantedBeds({}); setAudioDismissed(false); setMatchPhase(0); setCombinedBins([]); setLives(3);
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
              <li key="learned-1">Compost Components: Nitrogen (Greens), Carbon (Browns), Water, Air</li>
              <li key="learned-2">Managing Compaction, Erosion, and Drainage</li>
              <li key="learned-3">Optimal soil pairings for your garden</li>
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
            onEnded={() => { setGameState('TITLE'); setDreamStage('INTRO_DIALOG'); setDialogIndex(0); setCauldron([]); setCompletedExamples([]); setFixedPlots([]); setActivePlot(null); setPlotItems([]); setIsFixModalOpen(false); setAppliedItems([]); setPlantedBeds({}); setAudioDismissed(false); setMatchPhase(0); setCombinedBins([]); setLives(3); }} />
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

        .garden-grid { background-image: radial-gradient(#8d6e63 1px, transparent 1px); background-size: 20px 20px; }
        @keyframes walk-bounce { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .farmer-walking { animation: walk-bounce 350ms ease-in-out infinite; }
        @keyframes stir-animation { 0% { transform: translate(-5px, -5px) rotate(-10deg); } 50% { transform: translate(5px, 5px) rotate(10deg); } 100% { transform: translate(-5px, -5px) rotate(-10deg); } }
        .animate-stir { animation: stir-animation 0.3s infinite linear; }
        @keyframes pour-animation { 0% { transform: rotate(0deg); } 20% { transform: rotate(-45deg); } 80% { transform: rotate(-45deg); } 100% { transform: rotate(0deg); } }
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

      `}</style>
      <div key="active-scene-wrapper">{renderCurrentScene()}</div>
      {gameState === 'DREAM' && !isMusicPlaying && !audioDismissed && dreamStage !== 'WAKE_UP' && dreamStage !== 'NIGHTMARE_END' && (
         <div key="audio-prompt-overlay" className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
            <PixelBox className="text-center animate-bounce max-w-sm mx-4">
               <h3 className="text-2xl mb-4 font-bold text-amber-900">Start Dream?</h3>
               <p className="text-sm mb-6 font-mono">Click to begin the quest and start the music!</p>
               <button onClick={() => { setAudioDismissed(true); toggleMusic(); }} className="bg-emerald-500 text-white px-6 py-4 font-bold text-lg hover:bg-emerald-600 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 w-full rounded-lg">Let's Go! 🧑‍🌾</button>
            </PixelBox>
         </div>
      )}
      {isChapterSelectOpen && (
        <div key="chapter-select-overlay" className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
          <PixelBox className="text-center max-w-sm mx-4 w-full">
            <h3 className="text-2xl mb-6 font-bold text-amber-900 border-b-4 border-[#8b5a2b] pb-3">Select Chapter</h3>
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
      <audio ref={wowAudioRef} key="wow-audio-element" src={wowSound} className="hidden" />
    </div>
  );
}