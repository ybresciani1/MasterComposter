import React, { useState, useEffect, useRef } from 'react';

// --- GAME DATA ---
const SOIL_COMPONENTS = ['🍃 Nitrogen (Greens)', '🍂 Carbon (Browns)', '💧 Water', '💨 Air'];
const FALSE_COMPONENTS = ['🥤 Plastic', '✨ Magic', '🪨 Gravel'];

// Expanded data for the matching mini-game
const EXAMPLE_ITEMS = [
  { id: 'ex_n1', name: 'Grass Clippings', sprite: '🥬', comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_n2', name: 'Vegetable Scraps', sprite: '🥦', comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_n3', name: 'Coffee Grounds', sprite: '☕', comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_c1', name: 'Dry Leaves', sprite: '🍂', comp: '🍂 Carbon (Browns)' },
  { id: 'ex_c2', name: 'Cardboard', sprite: '📦', comp: '🍂 Carbon (Browns)' },
  { id: 'ex_c3', name: 'Twigs', sprite: '🪵', comp: '🍂 Carbon (Browns)' },
  { id: 'ex_w', name: 'Watering Can', type: 'tool', sprite: '🚿', comp: '💧 Water' },
  { id: 'ex_a', name: 'Pitchfork', type: 'tool', sprite: '🔱', comp: '💨 Air' }
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
      { text: "Removing all plants to let the soil breathe.", correct: false },
      { text: "Planting cover crops, applying mulch, and building terraces.", correct: true },
      { text: "Adding more sand to make it heavier.", correct: false }
    ]
  },
  {
    id: 'drainage',
    name: "Flooded Plot",
    sprite: "💧",
    description: "Water pools on the surface and won't drain, drowning plants.",
    options: [
      { text: "Pave over it with concrete.", correct: false },
      { text: "Adding organic matter, creating raised beds, and proper grading.", correct: true },
      { text: "Step on the soil to squeeze the water out.", correct: false }
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
    <path d="M2,11 h3 v-3 h3 v3 h3 v-4 h3 v5 h-14 z" fill="#f48fb1" />
    <path d="M4,9 h1 v2 h-1 z M7,11 h1 v1 h-1 z M10,8 h1 v3 h-1 z M13,9 h1 v1 h-1 z" fill="#d81b60" />
    <path d="M12,6 h4 v4 h-4 z" fill="#f48fb1" />
    <path d="M13,7 h1 v1 h-1 z M15,7 h1 v1 h-1 z" fill="#3e2723" />
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
            <div className="w-full h-full p-2">{portrait}</div>
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
  const [gameState, setGameState] = useState('TITLE'); 
  const [dreamStage, setDreamStage] = useState('INTRO_DIALOG'); 
  const [matchPhase, setMatchPhase] = useState(0); // 0: filling, 1: combining, 2: watering, 3: aerating
  const [combinedBins, setCombinedBins] = useState([]); // tracks 'bin_n' or 'bin_c'
  const [dialogIndex, setDialogIndex] = useState(0);
  
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioDismissed, setAudioDismissed] = useState(false);

  const [cauldron, setCauldron] = useState([]);
  const [completedExamples, setCompletedExamples] = useState([]);
  const [fixedPlots, setFixedPlots] = useState([]);
  const [activePlot, setActivePlot] = useState(null);
  const [plantedBeds, setPlantedBeds] = useState({});
  const [isStirring, setIsStirring] = useState(false);
  const [isWatering, setIsWatering] = useState(false);

  const [heldItem, setHeldItem] = useState(null);
  const [groundItems, setGroundItems] = useState([]);
  const farmerPosRef = useRef({ x: 150, y: 150, bounceY: 0 });
  const [farmerRenderPos, setFarmerRenderPos] = useState({ x: 150, y: 150, bounceY: 0 });
  const keys = useRef({});
  
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
        if (audioRef.current.readyState === 0) audioRef.current.load();
        audioRef.current.play()
          .then(() => setIsMusicPlaying(true))
          .catch(e => {
            console.log("Audio play prevented:", e);
            showToast("Audio blocked by browser! 🎵");
          });
      }
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

  const wakeUpStory = [
    { name: "Reality", portrait: "💭", text: "You jolt awake in your chair at the Living Coast Discovery Center." },
    { name: "Instructor", portrait: "🧑‍🏫", text: "...and that concludes our section on soil properties and compost components!" },
    { name: "You", portrait: <FarmerSprite />, text: "(Whoa... I actually understood all of that. The dream made perfect sense!)" },
    { name: "You", portrait: <FarmerSprite />, text: "(I know the 4 compost components, how to manage soil problems, and the optimal plant soils!)" }
  ];

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

  useEffect(() => {
    if (gameState === 'SLEEP_TRANSITION') {
      const timer = setTimeout(() => handleStartDream(), 4000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const initializeGroundItems = () => {
    const items = [...SOIL_COMPONENTS, ...FALSE_COMPONENTS]
      .sort(() => Math.random() - 0.5)
      .map((name, idx) => ({
           id: `craft-${idx}`,
           name,
           x: 20 + Math.random() * 260,
           y: 110 + Math.random() * 140 
      }));
    setGroundItems(items);
    setCauldron([]);
    setHeldItem(null);
    farmerPosRef.current = { x: 150, y: 150, bounceY: 0 };
    setFarmerRenderPos({ x: 150, y: 150, bounceY: 0 });
  };

  const initializeExamplesItems = (phase = 0) => {
    let items = [];
    if (phase === 0) {
      // Just Greens and Browns
      items = EXAMPLE_ITEMS.filter(i => i.comp.includes('Nitrogen') || i.comp.includes('Carbon'));
    } else if (phase === 2) {
      // Watering Can
      items = [EXAMPLE_ITEMS.find(i => i.id === 'ex_w')];
    } else if (phase === 3) {
      // Pitchfork
      items = [EXAMPLE_ITEMS.find(i => i.id === 'ex_a')];
    }

    const positionedItems = items.map((item) => ({
      ...item,
      x: 40 + Math.random() * 220,
      y: 110 + Math.random() * 140
    }));

    setGroundItems(positionedItems);
    setHeldItem(null);
    // Only reset farmer pos on first load of stage
    if (phase === 0) {
      farmerPosRef.current = { x: 150, y: 150, bounceY: 0 };
      setFarmerRenderPos({ x: 150, y: 150, bounceY: 0 });
      setCompletedExamples([]);
      setMatchPhase(0);
      setCombinedBins([]);
    }
  };

  useEffect(() => {
     if (dreamStage === 'CRAFT_SOIL') initializeGroundItems();
     else if (dreamStage === 'MATCH_EXAMPLES') initializeExamplesItems(0);
  }, [dreamStage]);

  useEffect(() => {
    if (dreamStage === 'CRAFT_SOIL' && cauldron.length === 4) {
      const isCorrect = cauldron.every(c => SOIL_COMPONENTS.includes(c));
      if (isCorrect) {
        setIsStirring(true);
        showToast("Stirring it all together...", 'surprised');
        setTimeout(() => {
          setIsStirring(false);
          showToast("Perfect! Compost is made!", 'surprised');
          setTimeout(() => setDreamStage('MATCH_EXAMPLES'), 2000);
        }, 2000);
      } else {
        setTimeout(() => {
          showToast("Wallace: That ain't soil! Try again.", 'sad');
          initializeGroundItems();
        }, 2000);
      }
    }
  }, [cauldron, dreamStage]);

  // Phase Transition Management for MATCH_EXAMPLES
  useEffect(() => {
    if (dreamStage === 'MATCH_EXAMPLES') {
      if (matchPhase === 0) {
        const greens = completedExamples.filter(id => EXAMPLE_ITEMS.find(i => i.id === id)?.comp.includes('Nitrogen')).length;
        const browns = completedExamples.filter(id => EXAMPLE_ITEMS.find(i => i.id === id)?.comp.includes('Carbon')).length;
        if (greens === 3 && browns === 3) {
          setMatchPhase(1);
          showToast("Bins are full! Now combine them in the center pile!", 'surprised');
        }
      } else if (matchPhase === 1) {
        if (combinedBins.length === 2) {
          setMatchPhase(2);
          initializeExamplesItems(2); // Spawn Watering Can
          showToast("Combined! Now find the Watering Can to moisten the pile.", 'surprised');
        }
      }
    }
  }, [completedExamples, combinedBins, matchPhase, dreamStage]);

  useEffect(() => {
    if (dreamStage !== 'CRAFT_SOIL' && dreamStage !== 'MATCH_EXAMPLES' && dreamStage !== 'PLANT_SEEDS') return;

    let animationFrameId;
    const speed = 2.5;
    const maxX = 340 - 40;
    const maxY = 300 - 40;

    const loop = () => {
       let moved = false;
       if (keys.current['w'] || keys.current['W'] || keys.current['ArrowUp']) { farmerPosRef.current.y -= speed; moved = true; }
       if (keys.current['s'] || keys.current['S'] || keys.current['ArrowDown']) { farmerPosRef.current.y += speed; moved = true; }
       if (keys.current['a'] || keys.current['A'] || keys.current['ArrowLeft']) { farmerPosRef.current.x -= speed; moved = true; }
       if (keys.current['d'] || keys.current['D'] || keys.current['ArrowRight']) { farmerPosRef.current.x += speed; moved = true; }

       if (moved) {
           farmerPosRef.current.x = Math.max(0, Math.min(farmerPosRef.current.x, maxX));
           farmerPosRef.current.y = Math.max(0, Math.min(farmerPosRef.current.y, maxY));
           farmerPosRef.current.bounceY = -Math.abs(Math.sin(Date.now() / 120)) * 6;
           setFarmerRenderPos({ ...farmerPosRef.current });
       } else if (farmerPosRef.current.bounceY !== 0) {
           farmerPosRef.current.bounceY = 0;
           setFarmerRenderPos({ ...farmerPosRef.current });
       }
       animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
      if (['w','a','s','d','W','A','S','D',' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();

      if (e.key === ' ' || e.code === 'Space') {
         if (heldItem) {
            // Check if user is trying to "empty" a bin they are carrying (Phase 1 logic)
            if (heldItem.id === 'held_bin_n' || heldItem.id === 'held_bin_c') {
              const farmerCenter = { x: farmerPosRef.current.x + 20, y: farmerPosRef.current.y + 20 };
              const pileCenter = { x: 170, y: 150 };
              if (Math.hypot(farmerCenter.x - pileCenter.x, farmerCenter.y - pileCenter.y) < 80) {
                const binType = heldItem.id === 'held_bin_n' ? 'bin_n' : 'bin_c';
                setCombinedBins(prev => [...prev, binType]);
                setHeldItem(null);
                showToast(`Emptied ${heldItem.name} into the pile!`);
                return;
              }
            }

            setGroundItems(prev => [...prev, { ...heldItem, x: farmerPosRef.current.x, y: Math.min(260, farmerPosRef.current.y + 20) }]);
            showToast(`Dropped ${heldItem.name || heldItem}.`);
            setHeldItem(null);
            return;
         }
         let closest = null; let minDist = 60;
         groundItems.forEach(item => {
            const dx = (farmerPosRef.current.x + 20) - (item.x + 20); 
            const dy = (farmerPosRef.current.y + 20) - (item.y + 10);
            const dist = Math.hypot(dx, dy);
            if (dist < minDist) { minDist = dist; closest = item; }
         });

         // Logic for picking up full bins in Phase 1
         if (!closest && dreamStage === 'MATCH_EXAMPLES' && matchPhase === 1) {
            const farmerCenter = { x: farmerPosRef.current.x + 20, y: farmerPosRef.current.y + 20 };
            EXAMPLE_BINS.forEach(bin => {
               if (combinedBins.includes(bin.id)) return;
               const dist = Math.hypot(farmerCenter.x - (bin.x + 40), farmerCenter.y - (bin.y + 40));
               if (dist < 60) {
                  closest = { id: `held_${bin.id}`, name: bin.label, sprite: '📦', isBin: true };
               }
            });
         }

         if (closest) {
            setHeldItem(closest);
            const identifier = closest.id || closest.name;
            setGroundItems(prev => prev.filter(i => (i.id || i.name) !== identifier));
            showToast(`Picked up ${closest.name || closest}! Press 'E' to use.`);
         }
      }

      if (e.key === 'e' || e.key === 'E') {
         if (!heldItem) return;
         const farmerCenter = { x: farmerPosRef.current.x + 20, y: farmerPosRef.current.y + 20 };

         if (dreamStage === 'CRAFT_SOIL') {
             const binCenter = { x: 170, y: 50 };
             if (Math.hypot(farmerCenter.x - binCenter.x, farmerCenter.y - binCenter.y) < 110) {
                setCauldron(prev => [...prev, heldItem.name || heldItem]);
                setHeldItem(null);
             } else showToast("Get closer to the mixing bin!");
         } else if (dreamStage === 'MATCH_EXAMPLES') {
             const pileCenter = { x: 170, y: 150 };
             const distToPile = Math.hypot(farmerCenter.x - pileCenter.x, farmerCenter.y - pileCenter.y);

             if (matchPhase === 0) {
               let closestBin = null; let minDist = 75;
               EXAMPLE_BINS.forEach(bin => {
                  const dx = farmerCenter.x - (bin.x + 40); const dy = farmerCenter.y - (bin.y + 40);
                  const dist = Math.hypot(dx, dy);
                  if (dist < minDist) { minDist = dist; closestBin = bin; }
               });

               if (closestBin) {
                  if (heldItem.comp === closestBin.comp) {
                     setCompletedExamples(prev => [...prev, heldItem.id]);
                     setHeldItem(null);
                     showToast(`Correct! Added ${heldItem.name}.`, 'surprised');
                  } else showToast("Wallace: That doesn't belong there!", 'sad');
               } else showToast("Get closer to a station!");
             } else if (matchPhase === 1) {
                // Empty bin logic handled in Space bar or here
                if (heldItem.isBin && distToPile < 80) {
                   const binType = heldItem.id === 'held_bin_n' ? 'bin_n' : 'bin_c';
                   setCombinedBins(prev => [...prev, binType]);
                   setHeldItem(null);
                   showToast(`Combined ${heldItem.name} into the pile!`, 'surprised');
                } else showToast("Take the full bin to the center pile!");
             } else if (matchPhase === 2) {
                if (heldItem.id === 'ex_w' && distToPile < 80) {
                   setIsWatering(true);
                   setHeldItem(null);
                   showToast("Watering the compost pile...", 'surprised');
                   setTimeout(() => {
                      setIsWatering(false);
                      setMatchPhase(3);
                      initializeExamplesItems(3); // Spawn Pitchfork
                      showToast("Pile is moist! Now get the Pitchfork to add air.", 'surprised');
                   }, 3000);
                } else showToast("Use the Watering Can on the center pile!");
             } else if (matchPhase === 3) {
                if (heldItem.id === 'ex_a' && distToPile < 80) {
                   setIsStirring(true);
                   setHeldItem(null);
                   showToast("Turning the pile for aeration...", 'surprised');
                   setTimeout(() => {
                      setIsStirring(false);
                      showToast("Compost complete! Now let's use it.", 'surprised');
                      setTimeout(() => setDreamStage('FIX_PLOTS'), 2000);
                   }, 2500);
                } else showToast("Use the Pitchfork on the center pile!");
             }
         } else if (dreamStage === 'PLANT_SEEDS') {
             const beds = [{ id: 0, x: 25, y: 30, soil: PLANTS[0].soil }, { id: 1, x: 135, y: 30, soil: PLANTS[1].soil }, { id: 2, x: 245, y: 30, soil: PLANTS[2].soil }];
             let closestBed = null; let minDist = 70;
             beds.forEach(bed => {
                const dist = Math.hypot(farmerCenter.x - (bed.x + 32), farmerCenter.y - (bed.y + 32));
                if (dist < minDist) { minDist = dist; closestBed = bed; }
             });

             if (closestBed) {
                setPlantedBeds(prev => {
                   if (prev[closestBed.id]) { showToast("Already planted!"); return prev; }
                   if (heldItem.soil === closestBed.soil) {
                      const next = { ...prev, [closestBed.id]: heldItem };
                      setHeldItem(null); showToast(`Planted ${heldItem.name}!`, 'surprised');
                      if (Object.keys(next).length === 3) setTimeout(() => setDreamStage('END_DIALOG'), 1500);
                      return next;
                   } else { showToast("Wallace: Wrong soil!", 'sad'); return prev; }
                });
             } else showToast("Get closer to a bed!");
         }
      }
    };

    const handleKeyUp = (e) => keys.current[e.key] = false;
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); };
  }, [dreamStage, heldItem, groundItems, matchPhase, completedExamples, combinedBins]);

  const handleFixPlot = (plotId, isCorrect) => {
    if (isCorrect) {
      const newFixed = [...fixedPlots, plotId];
      setFixedPlots(newFixed); setActivePlot(null); setWallaceEmotion('surprised');
      if (newFixed.length === 3) {
        const seeds = PLANTS.slice(0, 3).map((p, i) => ({ ...p, x: 50 + (i * 100), y: 230 }));
        setGroundItems(seeds); setHeldItem(null); farmerPosRef.current = { x: 150, y: 150, bounceY: 0 };
        setFarmerRenderPos({ x: 150, y: 150, bounceY: 0 }); setPlantedBeds({}); setDreamStage('PLANT_SEEDS');
      }
    } else showToast("Wallace: Try a different tool.", 'sad');
  };

  const renderTitle = () => (
    <div key="scene-title" className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4">
      <PixelBox className="text-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-[#5d4037] mb-2">Master Composter</h1>
        <h2 className="text-xl text-[#8b5a2b] mb-8 tracking-widest">VALLEY</h2>
        <div className="h-24 mb-8 animate-bounce flex items-end justify-center gap-4">
          <div className="w-16 h-16"><FarmerSprite /></div>
          <div className="w-16 h-16"><WormSprite /></div>
        </div>
        <button onClick={() => setGameState('INTRO')} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full">New Game</button>
      </PixelBox>
    </div>
  );

  const renderCutscene = (script, onComplete) => (
    <div key="scene-cutscene" className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <p className="text-white font-mono text-xl md:text-2xl leading-loose mb-12 animate-pulse">{script[dialogIndex]}</p>
        <button onClick={() => { if (dialogIndex < script.length - 1) setDialogIndex(dialogIndex + 1); else { setDialogIndex(0); onComplete(); } }} className="text-amber-500 font-mono text-lg hover:text-amber-300">[ Click to continue ]</button>
      </div>
    </div>
  );

  const renderSleepTransition = () => (
    <div key="scene-sleep" className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <p className="text-white font-mono text-3xl md:text-4xl tracking-[0.5em] animate-pulse">Z z z . . .</p>
    </div>
  );

  const renderDream = () => (
    <div key="scene-dream" className="min-h-screen bg-[#7ec850] relative overflow-hidden font-mono p-4 flex flex-col items-center">
        <div className="absolute top-10 left-10 text-4xl opacity-50">🌲</div>
        <div className="absolute top-20 right-20 text-4xl opacity-50">🌲</div>
        <div className="max-w-3xl w-full mt-8 relative z-10 pb-48">
          <div className="flex justify-between items-center mb-8">
             <PixelBox className="py-2 px-4"><span className="text-amber-700">Day 1</span> | 9:00 AM</PixelBox>
             <PixelBox className="py-2 px-4 flex gap-4 items-center">
                <span>Funds: 0g</span>
                <button onClick={toggleMusic} className="bg-[#8b5a2b] text-white px-3 py-1 text-xs hover:bg-[#5d4037] border-2 border-[#3e2723]">🎵 {isMusicPlaying ? 'ON' : 'OFF'}</button>
             </PixelBox>
          </div>

          {dreamStage === 'CRAFT_SOIL' && (
            <div className="text-center animate-fade-in relative flex flex-col items-center">
              <div className="flex justify-between w-full max-w-[340px] mb-2 gap-2 text-[10px] text-white bg-[#5d4037] p-1 rounded">
                  <span>WASD: Move</span><span>SPACE: Pick/Drop</span><span>E: Toss</span>
              </div>
              <div className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#4e342e] rounded-full border-4 border-[#3e2723] flex flex-wrap items-center justify-center p-2 z-10 overflow-hidden">
                    {cauldron.length === 0 && <span className="text-[#8d6e63] text-xs font-bold">BIN</span>}
                    {cauldron.map((item, idx) => <span key={`cauldron-${idx}`} className="bg-[#d7ccc8] text-[8px] p-0.5 m-0.5 font-bold rounded">{item}</span>)}
                    {isStirring && <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 rounded-full animate-stir"><div className="w-10 h-14"><PitchforkSprite/></div></div>}
                 </div>
                 {groundItems.map((item) => <div key={item.id || item.name} className="absolute bg-white border-2 border-amber-600 px-2 py-1 rounded text-[10px] font-bold shadow-md z-20" style={{ transform: `translate(${item.x}px, ${item.y}px)` }}>{item.name}</div>)}
                 <div className="absolute w-10 h-10 z-30" style={{ transform: `translate(${farmerRenderPos.x}px, ${farmerRenderPos.y + (farmerRenderPos.bounceY || 0)}px)` }}><FarmerSprite />{heldItem && <div className="absolute -top-6 bg-amber-300 text-amber-900 border-2 border-amber-600 px-1 py-0.5 text-[10px] font-bold rounded animate-bounce shadow-md">{heldItem.name || heldItem}</div>}</div>
              </div>
              <DialogBox name="Wallace" text="Gather Nitrogen (Greens), Carbon (Browns), Water, and Air! Use WASD to walk, SPACE to pick up, and E near the bin to toss them in!" hideNext emotion={wallaceEmotion} />
            </div>
          )}

          {dreamStage === 'MATCH_EXAMPLES' && (
            <div className="text-center animate-fade-in relative flex flex-col items-center">
              <div className="flex justify-between w-full max-w-[340px] mb-2 gap-2 text-[10px] text-white bg-[#5d4037] p-1 rounded">
                  <span>WASD: Move</span><span>SPACE: Pick/Drop</span><span>E: Action</span>
              </div>
              <div className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner">
                 {/* Nitrogen/Carbon Bins */}
                 {EXAMPLE_BINS.map(bin => {
                    const count = completedExamples.filter(id => EXAMPLE_ITEMS.find(i => i.id === id)?.comp === bin.comp).length;
                    const max = 3;
                    const isCombined = combinedBins.includes(bin.id);
                    return (
                       <div key={bin.id} className={`absolute w-20 h-20 border-4 border-[#3e2723] flex flex-col items-center justify-center z-10 shadow-md transition-opacity duration-500 ${bin.color} ${isCombined ? 'opacity-30 grayscale' : 'opacity-100'}`} style={{ transform: `translate(${bin.x}px, ${bin.y}px)` }}>
                         <span className="text-white text-[9px] font-bold text-center leading-tight">{bin.label}</span>
                         {!isCombined && <span className="text-white text-[10px] font-bold mt-1 bg-black/30 px-1 rounded">{count}/{max}</span>}
                         {count === max && !isCombined && <span className="absolute -top-2 -right-2 text-xl animate-bounce">✨</span>}
                       </div>
                    );
                 })}

                 {/* The Central Compost Pile */}
                 <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#4e342e] border-4 border-[#3e2723] rounded-full transition-all duration-700 flex items-center justify-center z-5 shadow-inner ${matchPhase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    {matchPhase === 1 && <span className="text-[10px] text-white font-bold text-center p-1">COMPOST PILE</span>}
                    
                    {/* Watering Animation */}
                    {isWatering && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <div className="w-12 h-10 animate-pour origin-right">
                          <WateringCanSprite />
                        </div>
                        {/* Pixelated Droplets */}
                        <div className="flex justify-center gap-1 mt-2">
                           {[1,2,3,4].map(i => (
                             <div key={i} className="w-1 h-2 bg-blue-400 animate-droplet" style={{ animationDelay: `${i * 0.1}s` }}></div>
                           ))}
                        </div>
                      </div>
                    )}

                    {/* Stirring Animation */}
                    {isStirring && <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 rounded-full animate-stir"><div className="w-10 h-14"><PitchforkSprite/></div></div>}
                 </div>

                 {/* Ground Items (Scraps, Tools, etc) */}
                 {groundItems.map(item => (
                    <div key={item.id} className="absolute bg-white border-2 border-amber-600 p-1 rounded text-[10px] font-bold shadow-md z-20 flex items-center gap-1" style={{ transform: `translate(${item.x}px, ${item.y}px)` }}>
                      <div className="w-5 h-5 flex items-center justify-center">
                        {item.id === 'ex_w' ? <WateringCanSprite/> : item.id === 'ex_a' ? <PitchforkSprite/> : <span className="text-sm">{item.sprite}</span>}
                      </div>
                      <span className="truncate max-w-[60px]">{item.name}</span>
                    </div>
                 ))}

                 {/* Farmer Sprite */}
                 <div className="absolute w-10 h-10 z-30" style={{ transform: `translate(${farmerRenderPos.x}px, ${farmerRenderPos.y + (farmerRenderPos.bounceY || 0)}px)` }}>
                   <FarmerSprite />
                   {heldItem && (
                     <div className="absolute -top-8 bg-amber-300 text-amber-900 border-2 border-amber-600 px-1 py-0.5 text-[10px] font-bold rounded animate-bounce shadow-md flex items-center gap-1">
                        <div className="w-4 h-4">
                          {heldItem.id === 'ex_w' ? <WateringCanSprite/> : heldItem.id === 'ex_a' ? <PitchforkSprite/> : <span>{heldItem.sprite}</span>}
                        </div>
                        <span className="max-w-[50px] truncate">{heldItem.name}</span>
                     </div>
                   )}
                 </div>
              </div>

              {/* Instructions based on Phase */}
              <div className="mt-4 text-xs font-bold text-[#5d4037] bg-white/50 px-4 py-2 rounded-full border-2 border-[#8b5a2b]">
                 {matchPhase === 0 && "Step 1: Fill the Green Bin and Brown Bin with scraps!"}
                 {matchPhase === 1 && "Step 2: Carry the full bins (SPACE) and empty them (E) into the center pile!"}
                 {matchPhase === 2 && "Step 3: Find the Watering Can and moisten the pile (E)!"}
                 {matchPhase === 3 && "Step 4: Use the Pitchfork to stir and add air (E)!"}
              </div>

              <DialogBox name="Wallace" text="We're makin' real compost now! Follow the steps to layer, water, and air out your pile." hideNext emotion={wallaceEmotion} />
            </div>
          )}

          {dreamStage === 'FIX_PLOTS' && (
            <div className="animate-fade-in">
               <div className="flex justify-center gap-6 mt-12">
                 {SOIL_PROBLEMS.map(plot => {
                   const isFixed = fixedPlots.includes(plot.id);
                   return (
                     <div key={plot.id} className="text-center flex flex-col items-center">
                       <button onClick={() => !isFixed && setActivePlot(plot)} className={`w-32 h-32 border-4 ${isFixed ? 'bg-[#5d4037] border-[#3e2723]' : 'bg-[#a1887f] border-[#5d4037] animate-pulse'} flex items-center justify-center text-5xl hover:scale-105 transition-transform`}>{isFixed ? '🌱' : plot.sprite}</button>
                       <span className="mt-2 bg-[#f4e2b8] px-2 text-xs font-bold border border-[#8b5a2b]">{plot.name}</span>
                     </div>
                   );
                 })}
               </div>
               {activePlot && (
                 <div className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
                   <PixelBox className="w-full max-w-lg">
                     <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">{activePlot.name}</h2><button onClick={() => setActivePlot(null)} className="text-red-500 font-bold text-xl">X</button></div>
                     <p className="mb-6">{activePlot.description}</p>
                     <div className="space-y-3">{activePlot.options.map((opt, i) => <button key={`opt-${i}`} onClick={() => handleFixPlot(activePlot.id, opt.correct)} className="w-full text-left bg-white p-3 border-2 border-stone-300 hover:border-amber-500 hover:bg-amber-50">▶ {opt.text}</button>)}</div>
                   </PixelBox>
                 </div>
               )}
               {!activePlot && <DialogBox name="Wallace" text="Fix these soil problems! Click a plot and select the correct practice." hideNext emotion={wallaceEmotion} />}
            </div>
          )}

          {dreamStage === 'PLANT_SEEDS' && (
            <div className="text-center animate-fade-in flex flex-col items-center">
               <div className="flex justify-between w-full max-w-[340px] mb-2 gap-2 text-[10px] text-white bg-[#5d4037] p-1 rounded"><span>WASD: Move</span><span>SPACE: Pick/Drop</span><span>E: Plant</span></div>
              <div className="w-[340px] h-[300px] bg-[#81c784] border-4 border-[#388e3c] relative overflow-hidden rounded-xl shadow-inner">
                 {[0, 1, 2].map(index => {
                    const bed = { 0: { x: 25, y: 30 }, 1: { x: 135, y: 30 }, 2: { x: 245, y: 30 } }[index];
                    const soil = PLANTS[index].soil; const planted = plantedBeds[index];
                    return (
                       <React.Fragment key={`bed-fragment-${index}`}>
                         <div key={`bed-${index}`} className="absolute w-16 h-16 bg-[#5d4037] border-4 border-[#3e2723] flex items-center justify-center z-10" style={{ transform: `translate(${bed.x}px, ${bed.y}px)` }}>{planted ? <span className="text-3xl">{planted.sprite}</span> : <span className="text-[#8d6e63] text-[9px] font-bold">SOIL</span>}</div>
                         <div key={`label-${index}`} className="absolute w-[80px] bg-white border border-[#388e3c] text-[8px] leading-tight text-center font-bold p-1 rounded z-20" style={{ transform: `translate(${bed.x - 8}px, ${bed.y + 70}px)` }}>{soil}</div>
                       </React.Fragment>
                    )
                 })}
                 {groundItems.map(item => <div key={item.id || item.name} className="absolute bg-white border-2 border-[#8b5a2b] w-8 h-8 flex items-center justify-center rounded-full text-lg shadow-md z-20" style={{ transform: `translate(${item.x}px, ${item.y}px)` }}>{item.sprite}</div>)}
                 <div className="absolute w-10 h-10 z-30" style={{ transform: `translate(${farmerRenderPos.x}px, ${farmerRenderPos.y + (farmerRenderPos.bounceY || 0)}px)` }}><FarmerSprite />{heldItem && <div className="absolute -top-6 bg-white border-2 border-[#8b5a2b] w-6 h-6 flex items-center justify-center rounded-full text-sm animate-bounce">{heldItem.sprite}</div>}</div>
              </div>
              <DialogBox name="Wallace" text="Match the plants to their preferred soil! Pick them up with SPACE and plant with E." hideNext emotion={wallaceEmotion} />
            </div>
          )}

          {dreamStage === 'INTRO_DIALOG' && <DialogBox key="intro-dialog" name="Wallace" text={wormIntro[dialogIndex]} onNext={() => handleDialogNext(wormIntro, 'CRAFT_SOIL')} emotion={wallaceEmotion} />}
          {dreamStage === 'END_DIALOG' && <DialogBox key="end-dialog" name="Wallace" text={endStory[dialogIndex]} onNext={() => handleDialogNext(endStory, 'WAKE_UP')} emotion={wallaceEmotion} />}
        </div>
      </div>
  );

  const renderWakeUp = () => {
    if (dialogIndex < wakeUpStory.length) {
      const current = wakeUpStory[dialogIndex];
      return (
        <div key="scene-wakeup-classroom" className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
           <div className="w-full max-w-[500px] h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-24">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#1b5e20] border-4 border-[#3e2723] flex items-center justify-center"><span className="text-white font-mono text-xs opacity-80">COMPOST = 🍃+🍂+💧+💨</span></div>
              <div className="absolute bottom-0 w-full h-[140px] bg-[#8d6e63] border-t-4 border-[#5d4037] flex justify-center">
                <div className="w-16 h-8 bg-[#4e342e] border-2 border-[#3e2723] absolute top-4 left-10 opacity-70"></div>
                <div className="w-16 h-8 bg-[#4e342e] border-2 border-[#3e2723] absolute top-4 right-10 opacity-70"></div>
              </div>
              <div className="absolute top-[100px] left-1/4 text-5xl">🧑‍🏫</div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                 <div className={`w-14 h-14 relative z-10 ${dialogIndex === 0 ? 'animate-[bounce_0.5s_ease-out_2]' : ''}`}><FarmerSprite />{dialogIndex === 0 && <div key="alert-bubble" className="absolute -top-4 -right-4 text-xl animate-pulse text-red-600 font-bold">❗</div>}</div>
                 <div className="w-28 h-12 bg-[#4e342e] border-4 border-[#3e2723] relative z-20 shadow-lg -mt-4"><div className="absolute left-4 top-2 w-6 h-8 bg-white opacity-80 rotate-12"></div></div>
              </div>
           </div>
           <DialogBox name={current.name} portrait={current.portrait} text={current.text} onNext={() => setDialogIndex(dialogIndex + 1)} />
        </div>
      );
    }

    return (
      <div key="scene-wakeup-complete" className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4 font-mono text-stone-800">
        <PixelBox className="text-center max-w-2xl w-full shadow-2xl">
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
          <button onClick={() => { setGameState('TITLE'); setDreamStage('INTRO_DIALOG'); setDialogIndex(0); setCauldron([]); setCompletedExamples([]); setFixedPlots([]); setPlantedBeds({}); setAudioDismissed(false); setMatchPhase(0); setCombinedBins([]); }} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full">Play Again</button>
        </PixelBox>
      </div>
    );
  };

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
    <div className="app-container">
      <style>{`
        @keyframes stir-animation { 0% { transform: translate(-5px, -5px) rotate(-10deg); } 50% { transform: translate(5px, 5px) rotate(10deg); } 100% { transform: translate(-5px, -5px) rotate(-10deg); } }
        .animate-stir { animation: stir-animation 0.3s infinite linear; }
        
        @keyframes pour-animation {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-45deg); }
          80% { transform: rotate(-45deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-pour { animation: pour-animation 3s forwards; }

        @keyframes droplet-animation {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-droplet { animation: droplet-animation 0.5s infinite; }
      `}</style>
      <div key="active-scene-wrapper">{renderCurrentScene()}</div>
      {gameState === 'DREAM' && !isMusicPlaying && !audioDismissed && dreamStage !== 'WAKE_UP' && (
         <div key="audio-prompt-overlay" className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
            <PixelBox className="text-center animate-bounce max-w-sm mx-4">
               <h3 className="text-2xl mb-4 font-bold text-amber-900">Start Dream?</h3>
               <p className="text-sm mb-6 font-mono">Click to begin the quest and start the music!</p>
               <button onClick={() => { setAudioDismissed(true); toggleMusic(); }} className="bg-emerald-500 text-white px-6 py-4 font-bold text-lg hover:bg-emerald-600 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 w-full rounded-lg">Let's Go! 🧑‍🌾</button>
            </PixelBox>
         </div>
      )}
      {toastMsg && <div key="toast-notification-popup" className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-[#5d4037] text-white px-6 py-3 border-4 border-[#8b5a2b] shadow-xl font-mono text-center w-11/12 max-w-md">{toastMsg}</div>}
      <audio ref={audioRef} key="background-audio-element" loop src="https://ia800504.us.archive.org/33/items/macLeod-autumn-day/Autumn_Day.mp3" className="hidden" crossOrigin="anonymous" />
    </div>
  );
}