import React, { useState, useEffect, useRef } from 'react';

// --- GAME DATA ---
const SOIL_COMPONENTS = ['🍃 Nitrogen (Greens)', '🍂 Carbon (Browns)', '💧 Water', '💨 Air'];
const FALSE_COMPONENTS = ['🥤 Plastic', '✨ Magic', '🪨 Gravel'];

const COMPONENT_EXAMPLES = [
  { text: "Grass clippings, vegetable scraps, and coffee grounds", correct: "🍃 Nitrogen (Greens)" },
  { text: "Dry leaves, cardboard, and twigs", correct: "🍂 Carbon (Browns)" },
  { text: "Rainfall, hose water, and pile moisture", correct: "💧 Water" },
  { text: "Oxygen pockets for microbes to breathe", correct: "💨 Air" },
];

const SOIL_PROBLEMS = [
  {
    id: 'compaction',
    name: "Compacted Plot",
    sprite: "🪨",
    description: "The soil is packed too tightly, suffocating roots.",
    options: [
      { text: "Aerate & add organic matter", correct: true },
      { text: "Water until it turns to mud", correct: false },
      { text: "Press it down with a tractor", correct: false }
    ]
  },
  {
    id: 'erosion',
    name: "Eroding Plot",
    sprite: "💨",
    description: "Wind and water are washing the topsoil away.",
    options: [
      { text: "Remove all plants", correct: false },
      { text: "Add heavy sand", correct: false },
      { text: "Plant cover crops & apply mulch", correct: true }
    ]
  },
  {
    id: 'drainage',
    name: "Flooded Plot",
    sprite: "💧",
    description: "Water pools on the surface and won't drain.",
    options: [
      { text: "Pave over it with concrete", correct: false },
      { text: "Add organic matter & create raised beds", correct: true },
      { text: "Step on it to squeeze water out", correct: false }
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
  <svg viewBox="0 0 10 11" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,1 h6 v1 h-6 z M1,2 h8 v1 h-8 z" fill="#8b5a2b" />
    <path d="M3,3 h4 v3 h-4 z M2,4 h1 v1 h-1 z M7,4 h1 v1 h-1 z" fill="#ffccaa" />
    <path d="M3,4 h1 v1 h-1 z M6,4 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M2,6 h6 v3 h-6 z M1,6 h1 v2 h-1 z M8,6 h1 v2 h-1 z" fill="#e53935" />
    <path d="M3,6 h1 v2 h-1 z M6,6 h1 v2 h-1 z M3,8 h4 v1 h-4 z M3,9 h1 v2 h-1 z M6,9 h1 v2 h-1 z" fill="#1e88e5" />
    <path d="M2,10 h2 v1 h-2 z M6,10 h2 v1 h-2 z" fill="#8b5a2b" />
  </svg>
);

const WormSprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Body */}
    <path d="M2,11 h3 v-3 h3 v3 h3 v-4 h3 v5 h-14 z" fill="#f48fb1" />
    {/* Darker segments for texture */}
    <path d="M4,9 h1 v2 h-1 z M7,11 h1 v1 h-1 z M10,8 h1 v3 h-1 z M13,9 h1 v1 h-1 z" fill="#d81b60" />
    {/* Head */}
    <path d="M12,6 h4 v4 h-4 z" fill="#f48fb1" />
    {/* Eyes */}
    <path d="M13,7 h1 v1 h-1 z M15,7 h1 v1 h-1 z" fill="#3e2723" />
  </svg>
);

const PixelBox = ({ children, className = "" }) => (
  <div className={`bg-[#f4e2b8] border-4 border-[#8b5a2b] shadow-[inset_0_0_0_4px_#a0522d] p-4 font-mono text-[#3e2723] ${className}`}>
    {children}
  </div>
);

const DialogBox = ({ name, portrait, text, onNext, hideNext, emotion = 'normal' }) => {
  let imgSrc = 'https://i.ibb.co/WLG8Tt3/wallace.png';
  let fbSrc = 'https://i.ibb.co/WLG8Tt3.png';

  if (emotion === 'sad') {
    imgSrc = 'https://i.ibb.co/zHNFQdVb/sad.png';
    fbSrc = 'https://i.ibb.co/zHNFQdVb.png';
  } else if (emotion === 'surprised') {
    imgSrc = 'https://i.ibb.co/r2PcZQvP/surprised.png';
    fbSrc = 'https://i.ibb.co/r2PcZQvP.png';
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50 animate-fade-in-up">
      <PixelBox className="flex gap-4 items-start relative shadow-2xl">
        <div className="w-20 h-20 bg-[#d7ccc8] border-4 border-[#5d4037] flex items-center justify-center text-4xl shrink-0 overflow-hidden">
          {name === 'Wallace' ? (
            <img src={imgSrc} alt={`Wallace ${emotion}`} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = fbSrc; }} />
          ) : (
            portrait
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-1 text-[#5d4037]">{name}</h3>
          <p className="text-sm md:text-base leading-relaxed">{text}</p>
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
  const [gameState, setGameState] = useState('TITLE'); // TITLE, INTRO, CLASS, SLEEP_TRANSITION, DREAM
  const [dreamStage, setDreamStage] = useState('INTRO_DIALOG'); 
  // Dream Stages: INTRO_DIALOG, CRAFT_SOIL, MATCH_EXAMPLES, FIX_PLOTS, PLANT_SEEDS, END_DIALOG, WAKE_UP
  const [dialogIndex, setDialogIndex] = useState(0);
  
  // Audio
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioDismissed, setAudioDismissed] = useState(false);

  // Minigame States
  const [cauldron, setCauldron] = useState([]);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [fixedPlots, setFixedPlots] = useState([]);
  const [activePlot, setActivePlot] = useState(null);
  const [plantedBeds, setPlantedBeds] = useState({});

  // WASD Movement States (Shared for CRAFT_SOIL and PLANT_SEEDS)
  const [heldItem, setHeldItem] = useState(null);
  const [groundItems, setGroundItems] = useState([]);
  const farmerPosRef = useRef({ x: 150, y: 150, bounceY: 0 });
  const [farmerRenderPos, setFarmerRenderPos] = useState({ x: 150, y: 150, bounceY: 0 });
  const keys = useRef({});
  
  // Custom Toast State
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

  // --- AUDIO HANDLING ---
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => {
          console.log("Audio play prevented by browser:", e);
          setIsMusicPlaying(false);
        });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        if (audioRef.current.readyState === 0) {
           audioRef.current.load();
        }
        audioRef.current.play()
          .then(() => setIsMusicPlaying(true))
          .catch(e => {
            console.log("Audio play prevented:", e);
            showToast("Audio blocked by browser, but the game will continue! 🎵");
          });
      }
    }
  };

  // --- DIALOGUES ---
  const introStory = [
    "5:00 PM. You hold the familiar orange pill bottle in your hand.",
    "You pop the white plastic cap off, peer inside, and tip it upside down. Nothing. Just a dusting of powder falls out.",
    "Ugh, completely out of my ADHD medication... My brain feels like a browser with 40 tabs open and music playing from an unknown source.",
    "But tonight is important. It's the Chula Vista Master Composter class at the Living Coast Discovery Center at 6:00 PM.",
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

  const wakeUpStory = [
    { name: "Reality", portrait: "💭", text: "You jolt awake in your chair at the Living Coast Discovery Center." },
    { name: "Instructor", portrait: "🧑‍🏫", text: "...and that concludes our section on soil properties and compost components!" },
    { name: "You", portrait: <div className="w-14 h-14"><FarmerSprite /></div>, text: "(Whoa... I actually understood all of that. The dream made perfect sense!)" },
    { name: "You", portrait: <div className="w-14 h-14"><FarmerSprite /></div>, text: "(I know the 4 compost components, how to manage soil problems, and the optimal plant soils!)" }
  ];

  // --- HANDLERS ---
  const handleDialogNext = (script, nextStage) => {
    if (dialogIndex < script.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setDialogIndex(0);
      setDreamStage(nextStage);
    }
  };

  const handleStartDream = () => {
    setGameState('DREAM');
    playAudio();
  };

  // --- MINIGAME LOGIC ---
  
  // Transition timer for sleep phase
  useEffect(() => {
    if (gameState === 'SLEEP_TRANSITION') {
      const timer = setTimeout(() => {
        handleStartDream();
      }, 4000); // Wait 4 seconds then launch the dream
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const initializeGroundItems = () => {
    const items = [...SOIL_COMPONENTS, ...FALSE_COMPONENTS]
      .sort(() => Math.random() - 0.5)
      .map((name) => ({
           name,
           x: 20 + Math.random() * 260, // Keep inside 340px width arena
           y: 110 + Math.random() * 140 // Spawns below the top bin
      }));
    setGroundItems(items);
    setCauldron([]);
    setHeldItem(null);
    farmerPosRef.current = { x: 150, y: 150, bounceY: 0 };
    setFarmerRenderPos({ x: 150, y: 150, bounceY: 0 });
  };

  useEffect(() => {
     if (dreamStage === 'CRAFT_SOIL') {
        initializeGroundItems();
     }
  }, [dreamStage]);

  useEffect(() => {
    // Only run WASD logic during these two active movement stages
    if (dreamStage !== 'CRAFT_SOIL' && dreamStage !== 'PLANT_SEEDS') return;

    let animationFrameId;
    const speed = 2.5; // Slower speed for smoother walking
    const maxX = 340 - 40; // Arena width (340) - farmer width (40)
    const maxY = 300 - 40; // Arena height (300) - farmer height (40)

    const loop = () => {
       let moved = false;
       if (keys.current['w'] || keys.current['W'] || keys.current['ArrowUp']) { farmerPosRef.current.y -= speed; moved = true; }
       if (keys.current['s'] || keys.current['S'] || keys.current['ArrowDown']) { farmerPosRef.current.y += speed; moved = true; }
       if (keys.current['a'] || keys.current['A'] || keys.current['ArrowLeft']) { farmerPosRef.current.x -= speed; moved = true; }
       if (keys.current['d'] || keys.current['D'] || keys.current['ArrowRight']) { farmerPosRef.current.x += speed; moved = true; }

       if (moved) {
           farmerPosRef.current.x = Math.max(0, Math.min(farmerPosRef.current.x, maxX));
           farmerPosRef.current.y = Math.max(0, Math.min(farmerPosRef.current.y, maxY));
           
           // Calculate a slight bounce effect based on time while moving
           farmerPosRef.current.bounceY = -Math.abs(Math.sin(Date.now() / 120)) * 6;
           
           setFarmerRenderPos({ ...farmerPosRef.current });
       } else if (farmerPosRef.current.bounceY !== 0) {
           // Reset bounce smoothly when stopped
           farmerPosRef.current.bounceY = 0;
           setFarmerRenderPos({ ...farmerPosRef.current });
       }
       animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
      
      // Prevent scrolling with arrows/space while playing
      if (['w','a','s','d','W','A','S','D',' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
          e.preventDefault();
      }

      // SPACE TO PICK UP OR DROP
      if (e.key === ' ' || e.code === 'Space') {
         if (heldItem) {
            // Drop the currently held item at the farmer's feet
            setGroundItems(prev => [...prev, {
               ...heldItem,
               x: farmerPosRef.current.x,
               y: farmerPosRef.current.y + 20
            }]);
            setHeldItem(null);
            showToast(`Dropped ${heldItem.name}.`);
            return;
         }

         let closest = null;
         let minDist = 60; // Interaction radius
         
         groundItems.forEach(item => {
            const dx = (farmerPosRef.current.x + 20) - (item.x + 20); 
            const dy = (farmerPosRef.current.y + 20) - (item.y + 10);
            const dist = Math.hypot(dx, dy);
            if (dist < minDist) {
               minDist = dist;
               closest = item;
            }
         });
         
         if (closest) {
            setHeldItem(closest); // Store the entire object
            setGroundItems(prev => prev.filter(i => i.name !== closest.name));
            showToast(`Picked up ${closest.name}! Press 'E' to interact or 'SPACE' to drop.`);
         }
      }

      // E TO TOSS OR PLANT
      if (e.key === 'e' || e.key === 'E') {
         if (!heldItem) return;
         const farmerCenter = { x: farmerPosRef.current.x + 20, y: farmerPosRef.current.y + 20 };

         if (dreamStage === 'CRAFT_SOIL') {
             // Logic for tossing into the mixing bin
             const binCenter = { x: 170, y: 50 };
             const dist = Math.hypot(farmerCenter.x - binCenter.x, farmerCenter.y - binCenter.y);
             
             if (dist < 110) { // Allowed toss distance
                setCauldron(prev => {
                   const next = [...prev, heldItem.name];
                   if (next.length === 4) {
                      const isCorrect = next.every(c => SOIL_COMPONENTS.includes(c));
                      if (isCorrect) {
                         setTimeout(() => setDreamStage('MATCH_EXAMPLES'), 1000);
                         showToast("Perfect! That's the right soil mix!", 'surprised');
                      } else {
                         setTimeout(() => {
                           showToast("Wallace: That ain't soil! Try again.", 'sad');
                           initializeGroundItems();
                         }, 2000);
                      }
                   }
                   return next;
                });
                setHeldItem(null);
             } else {
                showToast("Get closer to the mixing bin to toss!");
             }
         } else if (dreamStage === 'PLANT_SEEDS') {
             // Logic for planting seeds in beds
             const beds = [
                { id: 0, x: 25, y: 30, soil: PLANTS[0].soil },
                { id: 1, x: 135, y: 30, soil: PLANTS[1].soil },
                { id: 2, x: 245, y: 30, soil: PLANTS[2].soil }
             ];
             
             let closestBed = null;
             let minDist = 70; // Planting interaction distance

             beds.forEach(bed => {
                const bx = bed.x + 32; // Center of the 64px bed
                const by = bed.y + 32;
                const dist = Math.hypot(farmerCenter.x - bx, farmerCenter.y - by);
                if (dist < minDist) {
                   minDist = dist;
                   closestBed = bed;
                }
             });

             if (closestBed) {
                setPlantedBeds(prev => {
                   if (prev[closestBed.id]) {
                      showToast("There's already a plant here!");
                      return prev;
                   }
                   if (heldItem.soil === closestBed.soil) {
                      const next = { ...prev, [closestBed.id]: heldItem };
                      setHeldItem(null);
                      showToast(`Planted ${heldItem.name}!`, 'surprised');
                      
                      if (Object.keys(next).length === 3) {
                         setTimeout(() => setDreamStage('END_DIALOG'), 1500);
                      }
                      return next;
                   } else {
                      showToast("Wallace: This plant won't survive in this soil!", 'sad');
                      return prev;
                   }
                });
             } else {
                showToast("Get closer to a soil bed to plant!");
             }
         }
      }
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    return () => {
       cancelAnimationFrame(animationFrameId);
       window.removeEventListener('keydown', handleKeyDown);
       window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dreamStage, heldItem, groundItems]);

  const handleExampleAnswer = (comp) => {
    if (comp === COMPONENT_EXAMPLES[exampleIndex].correct) {
      if (exampleIndex < COMPONENT_EXAMPLES.length - 1) {
        setExampleIndex(exampleIndex + 1);
        setWallaceEmotion('surprised');
        setTimeout(() => setWallaceEmotion('normal'), 1500);
      } else {
        setDreamStage('FIX_PLOTS');
      }
    } else {
      showToast("Wallace: Nope! Think carefully about what that is.", 'sad');
    }
  };

  const handleFixPlot = (plotId, isCorrect) => {
    if (isCorrect) {
      const newFixed = [...fixedPlots, plotId];
      setFixedPlots(newFixed);
      setActivePlot(null);
      setWallaceEmotion('surprised');
      setTimeout(() => setWallaceEmotion('normal'), 1500);
      if (newFixed.length === 3) {
        // Setup for PLANT_SEEDS
        const seedsToPlant = PLANTS.slice(0, 3).map((p, i) => ({
           ...p,
           x: 50 + (i * 100), // Space them out evenly at the bottom
           y: 230
        }));
        setGroundItems(seedsToPlant);
        setHeldItem(null);
        farmerPosRef.current = { x: 150, y: 150, bounceY: 0 };
        setFarmerRenderPos({ x: 150, y: 150, bounceY: 0 });
        setPlantedBeds({});
        setDreamStage('PLANT_SEEDS');
      }
    } else {
      showToast("Wallace: That'll ruin the soil even more! Try a different tool.", 'sad');
    }
  };


  // --- RENDERERS ---
  const renderTitle = () => (
    <div className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4">
      <PixelBox className="text-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-[#5d4037] mb-2">Master Composter</h1>
        <h2 className="text-xl text-[#8b5a2b] mb-8 tracking-widest">VALLEY</h2>
        <div className="h-24 mb-8 animate-bounce flex items-end justify-center gap-4">
          <div className="w-16 h-16"><FarmerSprite /></div>
          <div className="w-16 h-16"><WormSprite /></div>
        </div>
        <button 
          onClick={() => setGameState('INTRO')}
          className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full"
        >
          New Game
        </button>
      </PixelBox>
    </div>
  );

  const renderCutscene = (script, onComplete) => (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <p className="text-white font-mono text-xl md:text-2xl leading-loose mb-12 animate-pulse">
          {script[dialogIndex]}
        </p>
        <button 
          onClick={() => {
            if (dialogIndex < script.length - 1) setDialogIndex(dialogIndex + 1);
            else { setDialogIndex(0); onComplete(); }
          }}
          className="text-amber-500 font-mono text-lg hover:text-amber-300"
        >
          [ Click to continue ]
        </button>
      </div>
    </div>
  );

  const renderSleepTransition = () => (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <p className="text-white font-mono text-3xl md:text-4xl tracking-[0.5em] animate-pulse">Z z z . . .</p>
      </div>
    </div>
  );

  const renderDream = () => {
    return (
      <div className="min-h-screen bg-[#7ec850] relative overflow-hidden font-mono p-4 flex flex-col items-center">
        {/* Background Details */}
        <div className="absolute top-10 left-10 text-4xl opacity-50">🌲</div>
        <div className="absolute top-20 right-20 text-4xl opacity-50">🌲</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-50">🪨</div>
        
        {/* Game Area */}
        <div className="max-w-3xl w-full mt-8 relative z-10 pb-48">
          
          {/* HEADER / UI */}
          <div className="flex justify-between items-center mb-8">
             <PixelBox className="py-2 px-4"><span className="text-amber-700">Day 1</span> | 9:00 AM</PixelBox>
             <PixelBox className="py-2 px-4 flex gap-4 items-center">
                <span>Funds: 0g</span>
                <button
                  onClick={toggleMusic}
                  className="bg-[#8b5a2b] text-white px-3 py-1 text-xs hover:bg-[#5d4037] active:scale-95 border-2 border-[#3e2723]"
                >
                  🎵 {isMusicPlaying ? 'ON' : 'OFF'}
                </button>
             </PixelBox>
          </div>

          {/* STAGE: CRAFT SOIL */}
          {dreamStage === 'CRAFT_SOIL' && (
            <div className="text-center animate-fade-in relative flex flex-col items-center">
              <div className="flex justify-between w-full max-w-[340px] mb-2 gap-2">
                  <span className="bg-[#5d4037] text-white px-2 py-1 text-[10px] sm:text-xs rounded border border-[#3e2723]">WASD to Move</span>
                  <span className="bg-[#5d4037] text-white px-2 py-1 text-[10px] sm:text-xs rounded border border-[#3e2723]">SPACE to Pick Up</span>
                  <span className="bg-[#5d4037] text-white px-2 py-1 text-[10px] sm:text-xs rounded border border-[#3e2723]">E to Toss</span>
              </div>

              {/* The Arena Container */}
              <div className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner shadow-black/30">
                 
                 {/* Mixing Bin */}
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#4e342e] rounded-full border-4 border-[#3e2723] shadow-inner flex flex-wrap items-center justify-center p-2 z-10">
                    {cauldron.length === 0 && <span className="text-[#8d6e63] text-xs text-center w-full font-bold">BIN</span>}
                    {cauldron.map(item => (
                      <span key={item} className="bg-[#d7ccc8] text-[8px] sm:text-[10px] p-0.5 m-0.5 font-bold rounded truncate max-w-full text-[#3e2723]">
                        {item}
                      </span>
                    ))}
                 </div>

                 {/* Ground Items */}
                 {groundItems.map(item => (
                    <div 
                      key={item.name} 
                      className="absolute bg-white border-2 border-amber-600 px-2 py-1 rounded text-[10px] font-bold shadow-md z-20 text-stone-800"
                      style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
                    >
                      {item.name}
                    </div>
                 ))}

                 {/* Farmer Sprite */}
                 <div 
                   className="absolute w-10 h-10 flex items-center justify-center z-30"
                   style={{ transform: `translate(${farmerRenderPos.x}px, ${farmerRenderPos.y + (farmerRenderPos.bounceY || 0)}px)` }}
                 >
                   <FarmerSprite />
                   {/* Held Item */}
                   {heldItem && (
                     <div className="absolute -top-6 bg-amber-300 text-amber-900 border-2 border-amber-600 px-1 py-0.5 text-[10px] font-bold rounded whitespace-nowrap animate-bounce shadow-md">
                       {heldItem.name}
                     </div>
                   )}
                 </div>

              </div>

              <DialogBox name="Wallace" portrait="🪱" text="Time to craft! Walk around (WASD), pick up the 4 compost elements (SPACE), and walk near the bin to toss them in (E)!" hideNext emotion={wallaceEmotion} />
            </div>
          )}

          {/* STAGE: MATCH EXAMPLES */}
          {dreamStage === 'MATCH_EXAMPLES' && (
            <div className="text-center animate-fade-in">
              <PixelBox className="mb-8">
                <h3 className="text-sm text-amber-800 mb-2">Identify this example:</h3>
                <p className="text-xl font-bold">{COMPONENT_EXAMPLES[exampleIndex].text}</p>
              </PixelBox>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                 {SOIL_COMPONENTS.map(comp => (
                    <button 
                      key={comp}
                      onClick={() => handleExampleAnswer(comp)}
                      className="bg-white border-4 border-[#8b5a2b] p-4 font-bold hover:bg-amber-100 active:scale-95 transition-transform"
                    >
                      {comp}
                    </button>
                 ))}
              </div>
              <DialogBox name="Wallace" portrait="🪱" text={`Great batch of soil! Now, match these examples to the 4 components we just used. (${exampleIndex + 1}/4)`} hideNext emotion={wallaceEmotion} />
            </div>
          )}

          {/* STAGE: FIX PLOTS */}
          {dreamStage === 'FIX_PLOTS' && (
            <div className="animate-fade-in">
               <div className="flex justify-center gap-6 mt-12">
                 {SOIL_PROBLEMS.map(plot => {
                   const isFixed = fixedPlots.includes(plot.id);
                   return (
                     <div key={plot.id} className="text-center flex flex-col items-center relative">
                       <button 
                         onClick={() => !isFixed && setActivePlot(plot)}
                         className={`w-32 h-32 border-4 ${isFixed ? 'bg-[#5d4037] border-[#3e2723]' : 'bg-[#a1887f] border-[#5d4037] animate-pulse'} flex items-center justify-center text-5xl transition-transform hover:scale-105`}
                       >
                         {isFixed ? '🌱' : plot.sprite}
                       </button>
                       <span className="mt-2 bg-[#f4e2b8] px-2 text-xs font-bold border border-[#8b5a2b]">{plot.name}</span>
                     </div>
                   );
                 })}
               </div>

               {/* Action Modal */}
               {activePlot && (
                 <div className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
                   <PixelBox className="w-full max-w-lg">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">{activePlot.sprite} {activePlot.name}</h2>
                        <button onClick={() => setActivePlot(null)} className="text-red-500 font-bold text-xl">X</button>
                     </div>
                     <p className="mb-6">{activePlot.description}</p>
                     <div className="space-y-3">
                       {activePlot.options.map((opt, i) => (
                         <button 
                           key={i}
                           onClick={() => handleFixPlot(activePlot.id, opt.correct)}
                           className="w-full text-left bg-white p-3 border-2 border-stone-300 hover:border-amber-500 hover:bg-amber-50"
                         >
                           ▶ {opt.text}
                         </button>
                       ))}
                     </div>
                   </PixelBox>
                 </div>
               )}

               {!activePlot && <DialogBox name="Wallace" portrait="🪱" text="Uh oh, the weather wreaked havoc on my fields. Click a broken plot and choose the right technique to fix it!" hideNext emotion={wallaceEmotion} />}
            </div>
          )}

          {/* STAGE: PLANT SEEDS */}
          {dreamStage === 'PLANT_SEEDS' && (
            <div className="text-center animate-fade-in w-full flex flex-col items-center">
              
               <div className="flex justify-between w-full max-w-[340px] mb-2 gap-2">
                  <span className="bg-[#5d4037] text-white px-2 py-1 text-[10px] sm:text-xs rounded border border-[#3e2723]">WASD to Move</span>
                  <span className="bg-[#5d4037] text-white px-2 py-1 text-[10px] sm:text-xs rounded border border-[#3e2723]">SPACE to Pick Up</span>
                  <span className="bg-[#5d4037] text-white px-2 py-1 text-[10px] sm:text-xs rounded border border-[#3e2723]">E to Plant</span>
              </div>

               {/* The Arena Container */}
              <div className="w-[340px] h-[300px] bg-[#81c784] border-4 border-[#388e3c] relative overflow-hidden rounded-xl shadow-inner shadow-black/30">
                 
                 {/* Soil Beds */}
                 {[0, 1, 2].map(index => {
                    const bedData = { 0: { x: 25, y: 30 }, 1: { x: 135, y: 30 }, 2: { x: 245, y: 30 } }[index];
                    const requiredSoil = PLANTS[index].soil;
                    const planted = plantedBeds[index];
                    return (
                       <React.Fragment key={index}>
                         <div 
                           className="absolute w-16 h-16 bg-[#5d4037] border-4 border-[#3e2723] flex flex-col items-center justify-center z-10"
                           style={{ transform: `translate(${bedData.x}px, ${bedData.y}px)` }}
                         >
                           {planted ? <span className="text-3xl">{planted.sprite}</span> : <span className="text-[#8d6e63] text-[10px] font-bold">DIRT</span>}
                         </div>
                         <div 
                           className="absolute w-[80px] bg-white border border-[#388e3c] text-[9px] leading-tight text-center font-bold text-[#1b5e20] p-1 rounded shadow-sm z-20"
                           style={{ transform: `translate(${bedData.x - 8}px, ${bedData.y + 70}px)` }}
                         >
                           {requiredSoil}
                         </div>
                       </React.Fragment>
                    )
                 })}

                 {/* Ground Items (Seeds) */}
                 {groundItems.map(item => (
                    <div 
                      key={item.name} 
                      className="absolute bg-white border-2 border-[#8b5a2b] w-8 h-8 flex items-center justify-center rounded-full text-lg shadow-md z-20"
                      style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
                      title={item.name}
                    >
                      {item.sprite}
                    </div>
                 ))}

                 {/* Farmer Sprite */}
                 <div 
                   className="absolute w-10 h-10 flex items-center justify-center z-30"
                   style={{ transform: `translate(${farmerRenderPos.x}px, ${farmerRenderPos.y + (farmerRenderPos.bounceY || 0)}px)` }}
                 >
                   <FarmerSprite />
                   {/* Held Seed */}
                   {heldItem && (
                     <div className="absolute -top-6 bg-white border-2 border-[#8b5a2b] w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold whitespace-nowrap animate-bounce shadow-md">
                       {heldItem.sprite}
                     </div>
                   )}
                 </div>

              </div>

               <DialogBox name="Wallace" portrait="🪱" text="Time to plant! Walk to the seeds (SPACE), read the soil labels on each bed, and plant them in the right dirt (E)!" hideNext emotion={wallaceEmotion} />
            </div>
          )}

          {/* STAGE: INTRO & END DIALOGS */}
          {dreamStage === 'INTRO_DIALOG' && (
            <DialogBox 
              name="Wallace" portrait="🪱" 
              text={wormIntro[dialogIndex]} 
              onNext={() => handleDialogNext(wormIntro, 'CRAFT_SOIL')} 
              emotion={wallaceEmotion}
            />
          )}
          
          {dreamStage === 'END_DIALOG' && (
            <DialogBox 
              name="Wallace" portrait="🪱" 
              text={endStory[dialogIndex]} 
              onNext={() => handleDialogNext(endStory, 'WAKE_UP')} 
              emotion={wallaceEmotion}
            />
          )}

        </div>

      </div>
    );
  };

  const renderWakeUp = () => {
    if (dialogIndex < wakeUpStory.length) {
      const currentLine = wakeUpStory[dialogIndex];
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
           {/* The Room Container */}
           <div className="w-full max-w-[500px] h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-24">
              {/* Chalkboard */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#1b5e20] border-4 border-[#3e2723] flex items-center justify-center shadow-inner">
                 <span className="text-white font-mono text-sm md:text-base opacity-80">SOIL = 🍃+🍂+💧+💨</span>
              </div>

              {/* Floor */}
              <div className="absolute bottom-0 w-full h-[140px] bg-[#8d6e63] border-t-4 border-[#5d4037] flex justify-center">
                {/* Desk Grids - Background */}
                <div className="w-16 h-8 bg-[#4e342e] border-2 border-[#3e2723] absolute top-4 left-10 opacity-70"></div>
                <div className="w-16 h-8 bg-[#4e342e] border-2 border-[#3e2723] absolute top-4 right-10 opacity-70"></div>
              </div>

              {/* Instructor */}
              <div className="absolute top-[100px] left-1/4 text-5xl">🧑‍🏫</div>

              {/* Desk & Farmer */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                 {/* Farmer */}
                 <div className={`w-14 h-14 relative z-10 transition-transform ${dialogIndex === 0 ? 'animate-[bounce_0.5s_ease-out_2]' : ''}`}>
                    <FarmerSprite />
                    {dialogIndex === 0 && <div className="absolute -top-4 -right-4 text-xl animate-pulse">❗</div>}
                 </div>
                 {/* Main Desk */}
                 <div className="w-28 h-12 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-4 flex justify-center p-1">
                   {/* Paper on desk */}
                   <div className="w-6 h-8 bg-white opacity-80 rotate-12"></div>
                 </div>
              </div>
           </div>

           <DialogBox 
              name={currentLine.name} 
              portrait={currentLine.portrait} 
              text={currentLine.text} 
              onNext={() => setDialogIndex(dialogIndex + 1)} 
           />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4 font-mono text-stone-800">
        <PixelBox className="text-center max-w-2xl w-full shadow-2xl">
          <div className="text-6xl mb-4 animate-bounce">🌱</div>
          <h2 className="text-4xl font-extrabold text-[#5d4037] mb-6 border-b-4 border-[#8b5a2b] pb-4">Quest Complete!</h2>
          
          <div className="text-lg bg-[#d7ccc8] p-6 border-4 border-[#8b5a2b] text-left leading-relaxed shadow-inner mb-8">
            <p className="font-bold mb-4 text-[#5d4037]">You successfully learned:</p>
            <ul className="list-disc list-inside space-y-2 text-[#3e2723] font-medium">
              <li>The 4 Components of Compost (and examples!)</li>
              <li>How to manage Compaction, Erosion, and Drainage</li>
              <li>Optimal soil pairings for Tomatoes, Succulents, and Blueberries</li>
            </ul>
          </div>
          
          <button 
            onClick={() => {
              setGameState('TITLE');
              setDreamStage('INTRO_DIALOG');
              setDialogIndex(0);
              setCauldron([]);
              setExampleIndex(0);
              setFixedPlots([]);
              setPlantedBeds({});
              setAudioDismissed(false);
            }}
            className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full"
          >
            Play Again
          </button>
        </PixelBox>
      </div>
    );
  };

  // --- MAIN RENDER ROUTING ---
  const renderCurrentScene = () => {
    switch (gameState) {
      case 'TITLE': return renderTitle();
      case 'INTRO': return renderCutscene(introStory, () => setGameState('CLASS'));
      case 'CLASS': return renderCutscene(classStory, () => setGameState('SLEEP_TRANSITION'));
      case 'SLEEP_TRANSITION': return renderSleepTransition();
      case 'DREAM': return dreamStage === 'WAKE_UP' ? renderWakeUp() : renderDream();
      default: return renderTitle();
    }
  };

  return (
    <>
      {renderCurrentScene()}

      {/* Forced Audio Interaction Overlay - Bypasses Strict Browser Policies */}
      {gameState === 'DREAM' && !isMusicPlaying && !audioDismissed && dreamStage !== 'WAKE_UP' && (
         <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
            <PixelBox className="text-center animate-bounce max-w-sm mx-4">
               <h3 className="text-2xl mb-4 font-bold text-amber-900">Start Farm?</h3>
               <p className="text-sm mb-6">Click to enter the dream and attempt to start background music.</p>
               <button 
                 onClick={() => {
                   setAudioDismissed(true);
                   toggleMusic();
                 }}
                 className="bg-emerald-500 text-white px-6 py-4 font-bold text-lg hover:bg-emerald-600 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 w-full rounded-lg"
               >
                 Let's Go! 🧑‍🌾
               </button>
            </PixelBox>
         </div>
      )}

      {/* Custom Toast Notification for in-game messages */}
      {toastMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-[#5d4037] text-white px-6 py-3 border-4 border-[#8b5a2b] shadow-xl font-mono text-center w-11/12 max-w-md">
          {toastMsg}
        </div>
      )}

      {/* Audio Player moved to root so it never unmounts */}
      <audio 
          ref={audioRef}
          loop 
          src="https://ia800504.us.archive.org/33/items/macLeod-autumn-day/Autumn_Day.mp3" 
          className="hidden"
          crossOrigin="anonymous"
      />
    </>
  );
}