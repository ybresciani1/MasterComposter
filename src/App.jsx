import React, { useState, useEffect, useRef } from 'react';
import { ClassroomScene } from './components/ClassroomScene.jsx';
import { CrowOverlay } from './components/CrowOverlay.jsx';
import { CompostKittens } from './components/CompostKittens.jsx';
import { MovingActor } from './components/MovingActor.jsx';
import { PeckingHens } from './components/PeckingHens.jsx';
import { InstructorPortrait, StudentPortrait } from './components/portraits.jsx';
import { PixelBox, DialogBox } from './components/ui.jsx';
import { backgroundMusic, wowSound, endCreditsVideo, pitchforkSound, hammerSound, patDirtSound, magicSound, wakeUpSound, nightmareSound, tossBinSound, questSound, introAnxietySound, sakuraSound, woodliceSound, beeTapSound, butterflyTapSound, frogTapSound, oiiaCatSound, wateringCanSound, loseHeartSound, riotBeyonceTapSound, kittenTossSound, SOUND_URLS } from './data/assets.js';
import { DREAM_LEVELS, SOIL_COMPONENTS, FALSE_COMPONENTS, INGREDIENT_ICONS, EXAMPLE_ITEMS, EXAMPLE_BINS, NO_COMPOST_ITEMS, SOIL_PROBLEMS, COMPOST_PROBLEMS, WORM_BEDDING_ITEMS, WORM_FOODS, PLANTS, BED_SPOTS } from './data/gameData.js';
import { PolishHenSprite, CowSprite, PigSprite, ChickenSprite, RoosterSprite, ChickSprite, SheepSprite, GoatSprite, FrogSprite, RabbitSprite, CatSprite, DogSprite } from './sprites/animals.jsx';
import { FarmerSprite, WallaceFollowerSprite } from './sprites/characters.jsx';
import { SakuraSprite, MonarchSprite, PaintedLadySprite, DogfaceSprite, WoodlouseSprite, RolledWoodlouseSprite, PixelHeartSprite, BeeSprite } from './sprites/critters.jsx';
import { CanopySprite } from './sprites/garden.jsx';
import { ChoppedVeggiesIcon, CleanCardboardIcon, LifeHeartSprite, SparkleSprite, SproutSprite, MusicNoteIcon, SpeakerIcon } from './sprites/icons.jsx';
import { TrashCanSprite, ScrapBucketSprite, WormBinSprite, WigglerSprite } from './sprites/props.jsx';
import { LightningSprite, TumbleweedSprite, FireSprite, SkeletonCowSprite, SkeletonPigSprite, SkeletonSheepSprite, SkeletonGoatSprite, SkeletonChickenSprite, SkeletonRoosterSprite, SkeletonChickSprite, SkeletonCatSprite, SkeletonDogSprite, SkeletonFrogSprite, LocustSprite, BareTreeSprite, WiltedSunflowerSprite, WiltedZinniaSprite, WiltedMarigoldSprite, WiltedLavenderSprite } from './sprites/nightmare.jsx';
import { CornSprite, CarrotSprite, MelonSprite, TreeSprite, SunflowerSprite, ZinniaSprite, MarigoldSprite, LavenderSprite, GrassSprite } from './sprites/plants.jsx';
import { PondSprite, BarnSprite, SiloSprite } from './sprites/scenery.jsx';
import { PitchforkSprite, WateringCanSprite, CompostBagSprite, MulchSprite, HammerSprite, CuttingStationSprite, PrepStationSprite, CompostBucketSprite, BrownsBucketSprite, ComposterSprite } from './sprites/tools.jsx';

const PLAYABLE_STAGES = DREAM_LEVELS.map(l => l.stage);
const dayOf = (stage) => { const i = PLAYABLE_STAGES.indexOf(stage); return i >= 0 ? i + 1 : PLAYABLE_STAGES.length + 1; };

// Saved progress lives in this browser only; storage can be unavailable, so every access is guarded
const SAVE_KEY = 'mc-save';
const readSave = () => {
  try {
    const save = JSON.parse(localStorage.getItem(SAVE_KEY));
    return save && PLAYABLE_STAGES.includes(save.stage) && save.lives > 0 ? save : null;
  } catch { return null; }
};
const writeSave = (save) => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch { /* storage unavailable */ } };
const clearSave = () => { try { localStorage.removeItem(SAVE_KEY); } catch { /* storage unavailable */ } };

const shuffled = (list) => [...list].sort(() => Math.random() - 0.5);

// Centres of the drop-off spots in the 340x300 field (used for both drawing and distance checks)
const NO_COMPOST_SPOTS = { compost: { x: 82, y: 64 }, trash: { x: 266, y: 62 } };
const WORM_BIN_SPOTS = { bin: { x: 174, y: 65 }, compost: { x: 288, y: 62 } };

const FIELD_LABEL = 'text-white text-[7px] font-bold text-center leading-none bg-black/50 px-1 py-0.5 rounded shadow-sm whitespace-nowrap z-10';

// Watering can tipping over a bin or plot, with droplets falling from the spout
const WateringPour = () => (
  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
    <div className="w-12 h-10 animate-pour origin-right"><WateringCanSprite /></div>
    <div className="flex justify-end gap-1 mt-2 pr-1">{[1,2,3,4].map(i => <div key={i} className="w-1 h-2 bg-blue-400 animate-droplet" style={{ animationDelay: `${i * 0.1}s` }}></div>)}</div>
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

  // One-at-a-time sorting (Don't Compost This! and feeding the worms)
  const [sortQueue, setSortQueue] = useState([]);
  const [sortedCount, setSortedCount] = useState(0);
  // Worm bin: 0 = make bedding, 1 = feed the worms, 2 = making castings
  const [wormPhase, setWormPhase] = useState(0);
  const [wormBedding, setWormBedding] = useState({ paper: false, water: false });
  const [wormFed, setWormFed] = useState([]);
  // Tapping a kitten bumps its counter, which replays its hop / spell animation
  const [kittenTaps, setKittenTaps] = useState({ orange: 0, gray: 0 });

  const handleKittenTap = (kitten) => {
    playSfx(kittenTossSound);
    if (cauldron.includes('Magic')) playSfx(magicSound);
    setKittenTaps(t => ({ ...t, [kitten]: t[kitten] + 1 }));
  };


  const [heldItem, setHeldItem] = useState(null);
  const [groundItems, setGroundItems] = useState([]);
  const farmerPosRef = useRef({ x: 150, y: 150, isWalking: false });
  const [farmerRenderPos, setFarmerRenderPos] = useState({ x: 150, y: 150, isWalking: false });
  const wallacePosRef = useRef({ x: 100, y: 165 });
  const [wallaceRenderPos, setWallaceRenderPos] = useState({ x: 100, y: 165 });
  const wallaceDirRef = useRef('right');
  // The game loop moves these two directly (see MovingActor) instead of re-rendering the whole game each frame
  const farmerApi = useRef(null);
  const wallaceApi = useRef(null);
  const nearPlotRef = useRef(null);
  const [nearPlotId, setNearPlotId] = useState(null);
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

  // Clears every level's progress (used by chapter jumps, Play Again and the end credits)
  const resetProgress = () => {
    setDialogIndex(0); setCauldron([]); setCompletedExamples([]);
    setFixedPlots([]); setAnsweredPlots([]); setActivePlot(null); setPlotItems([]); setIsFixModalOpen(false);
    setAppliedItems([]); setPlantedBeds({}); setMatchPhase(0); setCombinedBins([]); setCrows([]); setHeldItem(null);
    setSortQueue([]); setSortedCount(0); setWormPhase(0); setWormBedding({ paper: false, water: false }); setWormFed([]);
  };

  const returnToTitle = () => {
    stopAllSfx(); resetProgress(); setLives(3);
    setGameState('TITLE'); setDreamStage('INTRO_DIALOG');
  };

  const jumpToChapter = (stage, savedLives = 3) => {
    resetProgress();
    setDreamStage(stage);
    setAudioDismissed(true); setIsChapterSelectOpen(false);
    setLives(stage === 'NIGHTMARE_END' ? 0 : savedLives);
    setGameState('DREAM');
  };

  // Save the level you're on (and your hearts) so a page refresh offers "Continue"
  useEffect(() => {
    if (gameState !== 'DREAM') return;
    if (PLAYABLE_STAGES.includes(dreamStage) && lives > 0) writeSave({ stage: dreamStage, lives });
    else if (['NIGHTMARE_END', 'END_DIALOG', 'WAKE_UP'].includes(dreamStage)) clearSave();
  }, [gameState, dreamStage, lives]);

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

  const placeFarmer = (x, y) => {
    farmerPosRef.current = { x, y, isWalking: false };
    wallacePosRef.current = { x: x - 16, y: y + 8 }; farmerHistoryRef.current = [];
    targetPosRef.current = null;
    // start positions for when the actors mount; once mounted they're moved through their api
    setFarmerRenderPos({ x, y, isWalking: false }); setWallaceRenderPos({ ...wallacePosRef.current });
    farmerApi.current?.({ x, y, isWalking: false });
    wallaceApi.current?.({ ...wallacePosRef.current, dir: wallaceDirRef.current });
  };

  const initializeGroundItems = () => {
    const items = [...SOIL_COMPONENTS, ...FALSE_COMPONENTS]
      .sort(() => Math.random() - 0.5)
      .map((name, idx) => ({ id: `craft-${idx}`, name, icon: INGREDIENT_ICONS[name], x: 20 + Math.random() * 240, y: 110 + Math.random() * 140 }));
    setGroundItems(items);
    setCauldron([]); setHeldItem(null);
    placeFarmer(150, 150);
  };

  const initializeExamplesItems = (phase = 0) => {
    let items = [];
    if (phase === 0) items = EXAMPLE_ITEMS.filter(i => i.comp.includes('Nitrogen') || i.comp.includes('Carbon'));
    else if (phase === 2) items = [EXAMPLE_ITEMS.find(i => i.id === 'ex_w')];
    else if (phase === 3) items = [EXAMPLE_ITEMS.find(i => i.id === 'ex_a')];

    const positionedItems = items.map((item) => ({ ...item, x: 40 + Math.random() * 220, y: 110 + Math.random() * 140 }));
    setGroundItems(positionedItems); setHeldItem(null);
    if (phase === 0) {
      placeFarmer(150, 150);
      setCompletedExamples([]); setMatchPhase(0); setCombinedBins([]);
    }
  };


  // Puts the next scrap from the sorting queue next to the kitchen caddy
  const SORT_SPOT = { NO_COMPOST: { x: 128, y: 158 }, WORM_BIN: { x: 108, y: 162 } };
  const dealNextScrap = (queue, stage) => {
    const [next, ...rest] = queue;
    setGroundItems(next ? [{ ...next, ...SORT_SPOT[stage] }] : []);
    setSortQueue(rest);
  };

  useEffect(() => {
     if (dreamStage === 'CRAFT_SOIL') initializeGroundItems();
     else if (dreamStage === 'MATCH_EXAMPLES') initializeExamplesItems(0);
     else if (dreamStage === 'FIX_PLOTS' || dreamStage === 'COMPOST_DOCTOR') {
       placeFarmer(150, 220);
       setGroundItems([]); setHeldItem(null); setAppliedItems([]);
       setFixedPlots([]); setAnsweredPlots([]); setActivePlot(null); setPlotItems([]);
     } else if (dreamStage === 'NO_COMPOST') {
       placeFarmer(150, 210);
       setHeldItem(null); setSortedCount(0);
       dealNextScrap(shuffled(NO_COMPOST_ITEMS), 'NO_COMPOST');
     } else if (dreamStage === 'WORM_BIN') {
       placeFarmer(150, 200);
       setHeldItem(null); setSortedCount(0); setSortQueue([]);
       setWormPhase(0); setWormBedding({ paper: false, water: false }); setWormFed([]);
       setGroundItems(WORM_BEDDING_ITEMS.map((item, i) => ({ ...item, x: i === 0 ? 12 : 196, y: i === 0 ? 132 : 150 })));
     } else if (dreamStage === 'PLANT_SEEDS') {
       const seeds = shuffled(PLANTS).map((p, i) => ({ ...p, x: 8 + (i * 82), y: i % 2 ? 188 : 158 }));
       setGroundItems(seeds); setHeldItem(null); setPlantedBeds({});
       placeFarmer(150, 212);
     }
  }, [dreamStage]);

  useEffect(() => {
    if (dreamStage === 'CRAFT_SOIL' && cauldron.length === 4) {
      const isCorrect = SOIL_COMPONENTS.every(c => cauldron.includes(c));
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

  // Fix Plots and Compost Doctor play the same way, each with its own set of problems
  const isPlotStage = dreamStage === 'FIX_PLOTS' || dreamStage === 'COMPOST_DOCTOR';
  const activeProblems = dreamStage === 'COMPOST_DOCTOR' ? COMPOST_PROBLEMS : SOIL_PROBLEMS;

  const handleApplyItemToPlot = () => {
    // Check if the held item is correct for the active plot
    const isCorrectTool = activePlot.fixItems.some(item => item.id === heldItem.id);

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
     
     if (activePlot.fixAnim === 'stir') { setIsStirring(true); playSfx(pitchforkSound); }
     if (activePlot.fixAnim === 'pat') { playSfx(patDirtSound); }
     if (activePlot.fixAnim === 'hammer') { playSfx(hammerSound); }
     if (activePlot.fixAnim === 'water') { setIsWatering(true); playSfx(wateringCanSound); }

     const stage = dreamStage;
     setTimeout(() => {
        setIsWorking(false); setIsStirring(false); setIsWatering(false);
        const newFixedPlots = [...fixedPlots, activePlot.id];
        setFixedPlots(newFixedPlots);
        setActivePlot(null); setPlotItems([]); setAppliedItems([]);
        showToast(`${activePlot.name} Fixed!`, 'surprised');

        if (newFixedPlots.length === activeProblems.length) {
          setTimeout(() => setDreamStage(stage === 'COMPOST_DOCTOR' ? 'WORM_BIN' : 'PLANT_SEEDS'), 1500);
        }
     }, 3000);
  };

  useEffect(() => {
    if (!PLAYABLE_STAGES.includes(dreamStage) || isFixModalOpen || isWorking || lives <= 0) return;

    let animationFrameId;
    let lastFrameTime = null;
    const basePace = 1.5; // Walking pace per 60fps frame
    const maxX = 340 - 40; const maxY = 300 - 40;

    const loop = (now) => {
       // Scale movement by elapsed time so walking speed doesn't depend on the frame rate
       const frames = lastFrameTime === null ? 1 : Math.min((now - lastFrameTime) / (1000 / 60), 4);
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
           farmerApi.current?.({ x: farmerPosRef.current.x, y: farmerPosRef.current.y, isWalking: true });
       } else if (farmerPosRef.current.isWalking) {
           farmerPosRef.current.isWalking = false;
           farmerApi.current?.(prev => ({ ...prev, isWalking: false }));
       }
       if (moved && isPlotStage) {
         // only re-render the game when the 'Press E' prompt moves to a different plot
         const fc = { x: farmerPosRef.current.x + 20, y: farmerPosRef.current.y + 20 };
         const near = activeProblems.find(plot => !fixedPlots.includes(plot.id) && !answeredPlots.includes(plot.id) && Math.hypot(fc.x - (plot.x + 32), fc.y - (plot.y + 32)) < 50)?.id ?? null;
         if (near !== nearPlotRef.current) { nearPlotRef.current = near; setNearPlotId(near); }
       }
       if (moved) {
         farmerHistoryRef.current.push({ x: farmerPosRef.current.x, y: farmerPosRef.current.y });
         if (farmerHistoryRef.current.length > 45) farmerHistoryRef.current.shift();
       }
       if (farmerHistoryRef.current.length > 0) {
         const trailPos = farmerHistoryRef.current[0];
         const prevWX = wallacePosRef.current.x;
         const prevWY = wallacePosRef.current.y;
         const follow = 1 - Math.pow(0.93, frames);
         wallacePosRef.current.x += (trailPos.x - wallacePosRef.current.x) * follow;
         wallacePosRef.current.y += (trailPos.y - wallacePosRef.current.y) * follow;
         const deltaX = wallacePosRef.current.x - prevWX;
         if (Math.abs(deltaX) > 0.05) {
           const newDir = deltaX > 0 ? 'right' : 'left';
           if (newDir !== wallaceDirRef.current) wallaceDirRef.current = newDir;
         }
         if (Math.abs(deltaX) > 0.01 || Math.abs(wallacePosRef.current.y - prevWY) > 0.01) {
           wallaceApi.current?.({ x: wallacePosRef.current.x, y: wallacePosRef.current.y, dir: wallaceDirRef.current });
         }
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
            if (isPlotStage) {
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
         
         if (!closest && isPlotStage && plotItems.length > 0) {
            plotItems.forEach(item => {
               const dist = Math.hypot(farmerPosRef.current.x + 20 - (item.x + 10), farmerPosRef.current.y + 20 - (item.y + 10));
               if (dist < 60) { minDist = dist; closest = item; }
            });
         }

         // Nothing to pick up: if Riot or Beyonce is close by, Space makes them cluck
         if (!closest) {
            const field = gameFieldRef.current?.firstElementChild;
            const hens = field ? [...field.querySelectorAll('[data-hen]')] : [];
            if (hens.length) {
               const fr = field.getBoundingClientRect();
               const scale = fr.width / 340, border = 4 * scale;
               const fc = { x: farmerPosRef.current.x + 20, y: farmerPosRef.current.y + 20 };
               let nearestHen = null, best = 48;
               hens.forEach(el => {
                  const r = el.getBoundingClientRect();
                  const d = Math.hypot((r.left + r.width / 2 - fr.left - border) / scale - fc.x, (r.top + r.height / 2 - fr.top - border) / scale - fc.y);
                  if (d < best) { best = d; nearestHen = el.dataset.hen; }
               });
               if (nearestHen) { handleHenClick({ stopPropagation() {} }, nearestHen); return; }
            }
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
         
         if (isPlotStage) {
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
                activeProblems.forEach(plot => {
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
                setCauldron(prev => [...prev, heldItem.name]); setHeldItem(null);
                if (heldItem.name === 'Magic') { playSfx(magicSound); }
                else if (heldItem.name === 'Kittens') { playSfx(kittenTossSound); }
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
                        setHeldItem(prev => ({...prev, name: 'Chopped Veggies', icon: ChoppedVeggiesIcon, isChopped: true}));
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
                        setHeldItem(prev => ({...prev, name: 'Clean Cardboard', icon: CleanCardboardIcon, isPrepped: true}));
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
               setTimeout(() => { setIsStirring(false); showToast("Compost complete!", 'surprised'); setTimeout(() => setDreamStage('NO_COMPOST'), 2000); }, 2500);
             }
         } else if (dreamStage === 'NO_COMPOST') {
             const near = (spot, r) => Math.hypot(farmerCenter.x - spot.x, farmerCenter.y - spot.y) < r;
             const dest = near(NO_COMPOST_SPOTS.compost, 75) ? 'compost' : near(NO_COMPOST_SPOTS.trash, 70) ? 'trash' : null;
             if (!dest) { showToast("Take it to the Compost bin or the Trash!"); return; }
             if (heldItem.bin === dest) {
                setHeldItem(null); playSfx(tossBinSound); setSortedCount(n => n + 1);
                showToast(`${dest === 'compost' ? 'Into the compost!' : 'Into the trash!'} ${heldItem.why}`, 'surprised');
                if (sortQueue.length === 0) setTimeout(() => setDreamStage('COMPOST_DOCTOR'), 2500);
                else dealNextScrap(sortQueue, 'NO_COMPOST');
             } else {
                loseLife(`Wallace: ${heldItem.bin === 'trash' ? `Not in the compost! ${heldItem.why}` : `That belongs in the compost! ${heldItem.why}`}`, 'sad');
             }
         } else if (dreamStage === 'WORM_BIN') {
             const near = (spot, r) => Math.hypot(farmerCenter.x - spot.x, farmerCenter.y - spot.y) < r;
             const nearBin = near(WORM_BIN_SPOTS.bin, 80);
             if (wormPhase === 0) {
                if (!nearBin) { showToast("Bring it to the worm bin!"); return; }
                if (heldItem.id === 'wb_paper') {
                   setWormBedding(b => ({ ...b, paper: true })); setHeldItem(null); playSfx(tossBinSound);
                   showToast("Shredded newspaper makes fluffy bedding!", 'surprised');
                } else if (heldItem.id === 'wb_water') {
                   if (!wormBedding.paper) { showToast("Add the shredded newspaper first!"); return; }
                   setHeldItem(null); setIsWatering(true); setIsWorking(true); playSfx(wateringCanSound);
                   showToast("Damp like a wrung-out sponge. Perfect!", 'surprised');
                   setTimeout(() => {
                      setIsWatering(false); setIsWorking(false);
                      setWormBedding({ paper: true, water: true }); setWormPhase(1);
                      showToast("The red wigglers moved in! Time to feed them.", 'surprised');
                      dealNextScrap(shuffled(WORM_FOODS), 'WORM_BIN');
                   }, 2500);
                }
                return;
             }
             if (wormPhase !== 1) return;
             const dest = nearBin ? 'worms' : near(WORM_BIN_SPOTS.compost, 66) ? 'compost' : null;
             if (!dest) { showToast("Feed the worm bin, or use the compost pile!"); return; }
             if (heldItem.bin === dest) {
                setHeldItem(null); playSfx(tossBinSound); setSortedCount(n => n + 1);
                if (dest === 'worms') setWormFed(f => [...f, heldItem]);
                showToast(dest === 'worms' ? `Yum! ${heldItem.why}` : `${heldItem.why} The big compost pile can handle it.`, 'surprised');
                if (sortQueue.length === 0) {
                   setWormPhase(2);
                   setTimeout(() => showToast("Munch, munch... worm castings! Black gold for your garden!", 'surprised'), 1500);
                   setTimeout(() => setDreamStage('FIX_PLOTS'), 5000);
                } else dealNextScrap(sortQueue, 'WORM_BIN');
             } else if (heldItem.bin === 'worms') {
                showToast("That's great worm food. Give it to the worms!");
             } else {
                loseLife(`Wallace: Not in the worm bin! ${heldItem.why}`, 'sad');
             }
         } else if (dreamStage === 'PLANT_SEEDS') {
             const beds = PLANTS.map((p, i) => ({ id: i, ...BED_SPOTS[i], soil: p.soil }));
             let closestBed = null;
             beds.forEach(bed => { if (Math.hypot(farmerCenter.x - (bed.x + 32), farmerCenter.y - (bed.y + 32)) < 70) closestBed = bed; });
             if (closestBed) {
                if (plantedBeds[closestBed.id]) { showToast("Already planted!"); return; }
                if (heldItem.soil === closestBed.soil) { 
                   setPlantedBeds(prev => ({ ...prev, [closestBed.id]: heldItem })); 
                   setHeldItem(null); 
                   showToast(`Planted!`, 'surprised'); 
                   if (Object.keys(plantedBeds).length === PLANTS.length - 1) setTimeout(() => setDreamStage('END_DIALOG'), 1500); 
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
  }, [dreamStage, heldItem, groundItems, matchPhase, completedExamples, combinedBins, activePlot, isFixModalOpen, isWorking, isChopping, isPrepping, plotItems, appliedItems, fixedPlots, answeredPlots, plantedBeds, lives, sortQueue, sortedCount, wormPhase, wormBedding]);

  const handleFixPlotChoice = (plotId, isCorrect) => {
    if (isCorrect) {
      setWallaceEmotion('surprised');
      setIsFixModalOpen(false);
      setAnsweredPlots(prev => [...prev, plotId]);
      // Drop the two fix items either side of the plot, kept inside the field
      const items = activePlot.fixItems.map((item, i) => ({
        ...item,
        x: Math.max(4, Math.min(activePlot.x + (i === 0 ? -40 : 70), 308)),
        y: activePlot.y + 40,
      }));
      setPlotItems(items);
      setAppliedItems([]);
      showToast("Correct! Bring BOTH materials to the plot one by one.", 'surprised');
    } else { 
      loseLife("Wallace: That'll make it worse!", 'sad'); 
    }
  };

  // --- RENDERERS ---
  const renderTitle = () => {
    const savedGame = readSave();
    return (
    <div key="scene-title" className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Volume Control */}
      <PixelBox className="absolute top-3 right-3 md:top-5 md:right-5 z-30 p-2! flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? 'Turn music off' : 'Turn music on'}
          className="bg-[#8b5a2b] text-white px-2 py-1 text-xs hover:bg-[#5d4037] border-2 border-[#3e2723] whitespace-nowrap inline-flex items-center gap-1.5"
        >
          <span className="w-3.5 h-3.5 block" aria-hidden="true"><MusicNoteIcon on={isMusicPlaying} /></span>{isMusicPlaying ? 'ON' : 'OFF'}
        </button>
        <span className="w-5 h-4 block select-none" aria-hidden="true"><SpeakerIcon level={volume === 0 ? 0 : volume < 0.5 ? 1 : 2} /></span>
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
        {savedGame ? (
          // A saved game puts Continue beside New Game so the card stays the same height
          <div className="flex gap-2 mb-3 relative z-20">
            <button onClick={() => jumpToChapter(savedGame.stage, savedGame.lives)} className="flex-1 bg-[#4caf50] text-white px-2 py-2 font-bold text-base md:text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 pointer-events-auto leading-tight">
              Continue<span className="block text-[10px] md:text-xs tracking-normal normal-case font-normal">Day {dayOf(savedGame.stage)}</span>
            </button>
            <button onClick={() => { clearSave(); setGameState('INTRO'); }} className="flex-1 bg-[#689f38] text-white px-2 py-2 font-bold text-base md:text-xl uppercase tracking-wider hover:bg-[#558b2f] border-b-4 border-[#33691e] active:border-b-0 active:translate-y-1 pointer-events-auto">New Game</button>
          </div>
        ) : (
          <button onClick={() => setGameState('INTRO')} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full mb-3 relative z-20 pointer-events-auto">New Game</button>
        )}
        <button onClick={() => setIsChapterSelectOpen(true)} className="bg-[#8b5a2b] text-white px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#5d4037] border-b-4 border-[#3e2723] active:border-b-0 active:translate-y-1 w-full relative z-20 pointer-events-auto">Chapter Select</button>
        <div className="mt-3 text-sm md:text-base leading-5 md:leading-6 tracking-[0.15em]">
          <span className="stardew-credit hover:scale-110 hover:rotate-3 transition-transform inline-block select-none">Made by Ybresciani</span>
        </div>
      </PixelBox>
    </div>
  );
  };

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
    const currentDay = `Day ${dayOf(dreamStage)}`;
    const heldBubble = heldItem && (() => {
                         const HeldIcon = heldItem.icon || heldItem.component;
                         return (
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-900 border-2 border-amber-600 px-1 py-0.5 text-[10px] font-bold rounded animate-bounce shadow-md flex items-center gap-1 min-w-max">
                              {HeldIcon ? <div className="w-4 h-4"><HeldIcon /></div> : heldItem.sprite && <div className="w-4 h-4"><span>{heldItem.sprite}</span></div>}
                              <span>{heldItem.name}</span>
                           </div>
                         );
                       })();
    const plotHint = activePlot ? (appliedItems.length < 2 ? "Gather the 2 materials!" : "Finishing work...") : null;
    const stageHint = {
      CRAFT_SOIL: "Gather Minerals, Organic Material, Water, and Air.",
      MATCH_EXAMPLES: ["Chop veggies, remove tape from cardboard, then sort into Greens & Browns!", "Pick up the full bins and dump them into the center compost pile!", "Grab the watering can and water the pile!", "Grab the pitchfork and aerate the pile!"][matchPhase],
      NO_COMPOST: `Compost or trash? Sorted ${sortedCount} of ${NO_COMPOST_ITEMS.length}`,
      COMPOST_DOCTOR: plotHint || "Walk to a sick compost pile and press E.",
      WORM_BIN: ["Bring shredded newspaper, then water, to the worm bin.", `Feed the worms: ${sortedCount} of ${WORM_FOODS.length} sorted`, "The worms are making castings!"][wormPhase],
      FIX_PLOTS: plotHint || "Walk to a damaged plot and press E.",
      PLANT_SEEDS: "Match the plants to their preferred soil!",
    }[dreamStage];
    const wallaceLine = {
      CRAFT_SOIL: "First, let's investigate what soil is made of! Toss those four components into the soil bin!",
      MATCH_EXAMPLES: ["We need more organic material. Let's make some compost! Put green stuff in Greens and brown stuff in Browns! Chop veggies, and remove tape/stickers from cardboard first!", "Now bring those full bins to the center pile!", "Needs some moisture! Give it a good watering.", "Last step, let's get some air in there. Pitchfork time!"][matchPhase],
      NO_COMPOST: "Not everything belongs in compost! Grab each scrap from the kitchen caddy and toss it in the Compost bin or the Trash.",
      COMPOST_DOCTOR: activePlot ? activePlot.hint : "Uh-oh, these compost piles are sick! Walk up to one and press E to play compost doctor.",
      WORM_BIN: ["Welcome to my family's worm bin! Worms need cozy bedding: bring shredded newspaper, then water it till it's damp like a wrung-out sponge.", "My cousins are hungry! Worm food goes in the worm bin. Citrus, onions and hot peppers upset our tummies, so those go in the big compost pile.", "Munch, munch! Those castings are black gold for your garden!"][wormPhase],
      FIX_PLOTS: activePlot ? activePlot.hint : "Let's fix up this garden before we plant.",
      PLANT_SEEDS: "Final stretch! Get those seeds in the right dirt.",
    }[dreamStage];
    // Holding a Compost Doctor fix or a seed packet: Wallace hints where it goes
    const wallaceSays = heldItem?.clue || wallaceLine;

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
               {PLAYABLE_STAGES.includes(dreamStage) && (
                 <div className="text-xs font-bold text-[#5d4037] bg-white/50 px-4 py-2 rounded-full border-2 border-[#8b5a2b] animate-pulse text-center">
                   {stageHint}
                 </div>
               )}
               <PixelBox className="py-2 px-4 flex gap-4 items-center relative overflow-visible">
                  <span ref={heartsRef} className="flex gap-1 relative z-10" aria-label={`${Math.max(0, lives)} of 3 hearts left`}>
                     {[0, 1, 2].map(i => <span key={i} className="w-5 h-5 block"><LifeHeartSprite empty={i >= lives} /></span>)}
                  </span>
                  <button onClick={toggleMusic} aria-label={isMusicPlaying ? 'Turn music off' : 'Turn music on'} className="bg-[#8b5a2b] text-white px-3 py-1 text-xs hover:bg-[#5d4037] border-2 border-[#3e2723] relative z-10 inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 block" aria-hidden="true"><MusicNoteIcon on={isMusicPlaying} /></span>{isMusicPlaying ? 'ON' : 'OFF'}</button>
               </PixelBox>
            </div>

            {PLAYABLE_STAGES.includes(dreamStage) && (
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
                         {cauldron.includes('Kittens') && (
                            <CompostKittens wizard={cauldron.includes('Magic')} taps={kittenTaps} onTap={handleKittenTap} />
                         )}
                         {/* Sits over the composter's open top */}
                         <div className={`absolute left-[14.3%] top-[10.7%] w-[71.4%] h-[57.1%] flex flex-wrap items-center content-center justify-center overflow-hidden pointer-events-none transition-all duration-300 ${cauldron.includes('Magic') ? 'animate-rainbow-glow' : ''}`}>
                            {cauldron.length === 0 && <span className="text-[#8d6e63] text-xs font-bold">BIN</span>}
                            {cauldron.map((item, idx) => {
                               const Icon = INGREDIENT_ICONS[item];
                               return (
                                 <span key={`cauldron-${idx}`} className="bg-[#d7ccc8] text-[8px] leading-none px-0.5 py-px m-px font-bold rounded relative z-30 inline-flex items-center gap-0.5">
                                   {Icon && <span className="w-2.5 h-2.5 inline-block"><Icon /></span>}{item}
                                 </span>
                               );
                            })}

                            {cauldron.includes('Magic') && (
                               <>
                                 <div className="absolute top-2 left-4 w-3 h-3 animate-sparkle" style={{animationDelay: '0s'}}><SparkleSprite /></div>
                                 <div className="absolute bottom-4 right-6 w-4 h-4 animate-sparkle" style={{animationDelay: '0.3s'}}><SparkleSprite color="#b388ff" /></div>
                                 <div className="absolute top-6 right-2 w-3 h-3 animate-sparkle" style={{animationDelay: '0.6s'}}><SparkleSprite /></div>
                                 <div className="absolute bottom-2 left-6 w-4 h-4 animate-sparkle" style={{animationDelay: '0.9s'}}><SparkleSprite color="#64b5f6" /></div>
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
                                  <span className={`absolute -bottom-3 ${FIELD_LABEL}`}>{bin.label}</span>
                                </>
                              </div>
                           );
                        })}

                        {matchPhase === 0 && (
                          <>
                            <div className="absolute w-16 h-16 flex flex-col items-center justify-center z-10" style={{ transform: `translate(100px, 15px)` }}>
                              <CuttingStationSprite isChopping={isChopping} />
                              <span className={`absolute -bottom-3 ${FIELD_LABEL}`}>Cutting Board</span>
                            </div>
                            <div className="absolute w-16 h-16 flex flex-col items-center justify-center z-10" style={{ transform: `translate(164px, 15px)` }}>
                              <PrepStationSprite isPrepping={isPrepping} />
                              <span className={`absolute -bottom-3 ${FIELD_LABEL}`}>Prep Station</span>
                            </div>
                          </>
                        )}

                        <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 transition-all duration-700 flex items-center justify-center z-5 ${matchPhase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                           <ComposterSprite greens={combinedBins.includes('bin_n')} browns={combinedBins.includes('bin_c')} wet={isWatering || matchPhase >= 3} />
                           {isWatering && <WateringPour />}
                           {isStirring && <div className="absolute left-[14.3%] top-[10.7%] w-[71.4%] h-[57.1%] bg-black/40 flex items-center justify-center z-20"><div className="w-10 h-14 animate-stir"><PitchforkSprite/></div></div>}
                        </div>
                        {matchPhase >= 1 && <PeckingHens x={14} y={140} span={76} hearts={henHearts} onHenClick={handleHenClick} />}
                      </>
                    )}

                    {dreamStage === 'NO_COMPOST' && (
                      <>
                        <div className="absolute w-24 h-24 z-10" style={{ transform: 'translate(34px, 16px)' }}>
                          <ComposterSprite greens browns />
                          <span className={`absolute left-1/2 -translate-x-1/2 -bottom-2 ${FIELD_LABEL}`}>Compost</span>
                        </div>
                        <div className="absolute z-10" style={{ width: 72, height: 84, transform: 'translate(230px, 20px)' }}>
                          <TrashCanSprite />
                          <span className={`absolute left-1/2 -translate-x-1/2 -bottom-2 ${FIELD_LABEL}`}>Trash</span>
                        </div>
                        <div className="absolute w-10 h-9 z-10" style={{ transform: 'translate(150px, 112px)' }}><ScrapBucketSprite /></div>
                        <PeckingHens x={12} y={124} span={74} hearts={henHearts} onHenClick={handleHenClick} />
                      </>
                    )}

                    {dreamStage === 'WORM_BIN' && (
                      <>
                        <div className="absolute z-10" style={{ width: 120, height: 90, transform: 'translate(114px, 20px)' }}>
                          <WormBinSprite state={wormPhase === 2 ? 'castings' : wormBedding.water ? 'damp' : wormBedding.paper ? 'dry' : 'empty'} />
                          {/* The bedding area inside the tote */}
                          <div className="absolute overflow-hidden" style={{ left: '6.25%', top: '8.3%', width: '87.5%', height: '55.6%' }}>
                            {wormPhase === 1 && wormFed.map((food, i) => (
                              <div key={food.id} className="absolute w-4 h-4" style={{ left: `${8 + i * 30}%`, top: i % 2 ? '48%' : '12%' }}><food.icon /></div>
                            ))}
                            {wormBedding.water && [0, 1, 2, 3].map(i => (
                              <div key={i} className="absolute animate-wiggler" style={{ width: 20, height: 6, left: `${6 + i * 22}%`, top: `${22 + (i % 2) * 38}%`, animationDelay: `${-i * 0.8}s` }}><WigglerSprite /></div>
                            ))}
                          </div>
                          {isWatering && <WateringPour />}
                          <span className={`absolute left-1/2 -translate-x-1/2 -bottom-2 ${FIELD_LABEL}`}>Worm Bin</span>
                        </div>
                        {wormPhase >= 1 && (
                          <>
                            <div className="absolute w-24 h-24 z-10" style={{ transform: 'translate(240px, 14px)' }}>
                              <ComposterSprite greens browns />
                              <span className={`absolute left-1/2 -translate-x-1/2 -bottom-2 ${FIELD_LABEL}`}>Compost Pile</span>
                            </div>
                            <div className="absolute w-10 h-9 z-10" style={{ transform: 'translate(58px, 150px)' }}><ScrapBucketSprite /></div>
                          </>
                        )}
                      </>
                    )}

                    {isPlotStage && (
                      <>
                        {activeProblems.map(plot => {
                           const isFixed = fixedPlots.includes(plot.id);
                           const isWorkingOnPlot = activePlot?.id && answeredPlots.includes(activePlot.id) && !fixedPlots.includes(activePlot.id);
                           const PlotSprite = isFixed ? plot.fixedTile : plot.tile;
                           return (
                             <div key={plot.id} className={`absolute w-16 h-16 flex items-center justify-center z-10 ${isFixed ? '' : 'animate-pulse'}`} style={{ transform: `translate(${plot.x}px, ${plot.y}px)` }}>
                                <div className="absolute inset-0"><PlotSprite /></div>
                                {(!isFixed && !answeredPlots.includes(plot.id) && !isWorkingOnPlot && nearPlotId === plot.id) && (
                                    <div className="absolute -top-8 animate-bounce text-[8px] bg-white px-1 rounded border border-black font-bold min-w-max">Press E</div>
                                )}
                                {activePlot?.id === plot.id && appliedItems.length > 0 && (
                                    <div className="absolute -bottom-6 text-[8px] bg-amber-100 px-1 rounded border border-amber-600 font-bold whitespace-nowrap">{appliedItems.length}/2 Ready</div>
                                )}
                             </div>
                           );
                        })}
                        {plotItems.map(item => {
                          const Icon = item.icon || item.component;
                          return (
                            <div key={item.id} className="absolute z-20 flex flex-col items-center" style={{ transform: `translate(${item.x}px, ${item.y}px)` }}>
                               <div className="w-6 h-6">{Icon ? <Icon /> : <span className="text-lg">{item.sprite}</span>}</div>
                               <span className="text-[6px] font-bold bg-white/80 px-0.5 rounded leading-none">{item.name}</span>
                            </div>
                          );
                        })}
                        {/* Tools are centred on the plot; the outer box positions, the inner one animates (both use transform) */}
                        {isStirring && activePlot && <div className="absolute z-40 w-16 h-16 flex items-center justify-center pointer-events-none" style={{ transform: `translate(${activePlot.x}px, ${activePlot.y}px)` }}><div className="w-10 h-14 animate-stir"><PitchforkSprite/></div></div>}
                        {isWorking && activePlot?.fixAnim === 'hammer' && (
                            <div className="absolute z-40 w-16 h-16 flex items-center justify-center pointer-events-none" style={{ transform: `translate(${activePlot.x}px, ${activePlot.y}px)` }}><div className="animate-hammer w-10 h-10"><HammerSprite/></div></div>
                        )}
                        {isWatering && activePlot && (
                            <div className="absolute z-40 w-16 h-16" style={{ transform: `translate(${activePlot.x}px, ${activePlot.y}px)` }}><WateringPour /></div>
                        )}
                        {dreamStage === 'COMPOST_DOCTOR' && <PeckingHens x={20} y={150} span={250} hearts={henHearts} onHenClick={handleHenClick} />}
                      </>
                    )}

                    {dreamStage === 'PLANT_SEEDS' && (
                      PLANTS.map((p, index) => {
                        const bed = BED_SPOTS[index];
                        const planted = plantedBeds[index];
                        const BedSprite = p.bed;
                        const PlantSprite = planted?.plant;
                        return (
                          <React.Fragment key={`bed-fragment-${p.id}`}>
                            {p.shady && <div className="absolute z-[9] rounded-[40%] bg-[#1b2a12]/30 pointer-events-none" style={{ width: 84, height: 82, transform: `translate(${bed.x - 10}px, ${bed.y - 10}px)` }} />}
                            <div className="absolute w-16 h-16 z-10" style={{ transform: `translate(${bed.x}px, ${bed.y}px)` }}>
                              <BedSprite />
                              {PlantSprite && <div className="absolute inset-0"><PlantSprite /></div>}
                              {p.shady && <div className="absolute inset-0 bg-[#0d1a08]/40 pointer-events-none" />}
                            </div>
                            {p.shady && <div className="absolute z-[11] pointer-events-none" style={{ width: 90, height: 32, transform: `translate(${bed.x - 14}px, ${bed.y - 22}px)` }}><CanopySprite /></div>}
                            <div className="absolute w-[76px] bg-white border border-[#388e3c] text-[8px] leading-tight text-center font-bold p-1 rounded z-20 shadow-sm" style={{ transform: `translate(${bed.x - 6}px, ${bed.y + 70}px)` }}>{p.soil}</div>
                          </React.Fragment>
                        )
                      })
                    )}

                    {groundItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id || item.name} className="absolute bg-white border-2 border-amber-600 px-1.5 py-1 rounded text-[10px] font-bold shadow-md z-20 flex items-center gap-1 whitespace-nowrap" style={{ transform: `translate(${item.x}px, ${item.y}px)` }}>
                          {Icon ? <span className="w-4 h-4 shrink-0"><Icon /></span> : item.sprite && <span className="text-sm">{item.sprite}</span>}
                          <span>{item.name}</span>
                        </div>
                      );
                    })}

                    <MovingActor apiRef={wallaceApi} start={wallaceRenderPos} className="absolute w-8 h-10 z-[29]">
                      {(pos) => (
                        <div className="w-full h-full animate-wallace-wobble">
                          <div className="w-full h-full" style={{ transform: pos.dir === 'left' ? 'scaleX(-1)' : undefined }}><WallaceFollowerSprite /></div>
                        </div>
                      )}
                    </MovingActor>

                    <MovingActor apiRef={farmerApi} start={farmerRenderPos} className="absolute w-10 h-10 z-30">
                      {(pos) => (
                        <div className={pos.isWalking ? 'farmer-walking' : ''}>
                          <FarmerSprite />
                          {heldBubble}
                        </div>
                      )}
                    </MovingActor>
                 </div>
                 </div>


                <DialogBox name="Wallace" text={wallaceSays} hideNext emotion={wallaceEmotion} bottomClass="bottom-16" />
              </div>
            )}

            {isPlotStage && isFixModalOpen && activePlot && (
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
            <div className="w-12 h-24 mx-auto mb-4 animate-bounce grayscale"><WiltedSunflowerSprite /></div>
            <h2 className="text-4xl font-extrabold text-[#3e2723] mb-6 border-b-4 border-[#5d4037] pb-4">Quest Failed...</h2>
            <div className="text-lg bg-[#a1887f] p-6 border-4 border-[#5d4037] text-left leading-relaxed shadow-inner mb-8">
              <p className="font-bold mb-4 text-[#3e2723]">You fell asleep and dreamt of a barren wasteland.</p>
              <p className="text-[#3e2723] font-medium">Try again to learn the true secrets of Master Composting!</p>
            </div>
            <button onClick={returnToTitle} className="bg-[#4caf50] text-white px-8 py-4 font-bold text-xl uppercase tracking-wider hover:bg-[#388e3c] border-b-4 border-[#1b5e20] active:border-b-0 active:translate-y-1 w-full">Play Again</button>
          </PixelBox>
        </div>
      );
    }

    return (
      <div key="scene-wakeup-complete" className="min-h-screen bg-[#7ec850] flex flex-col items-center justify-center p-4 font-mono text-stone-800 relative overflow-hidden">
        {/* Celebratory Background Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[20%] w-14 h-14 animate-sparkle" style={{animationDelay: '0.1s'}}><SparkleSprite /></div>
          <div className="absolute top-[30%] right-[15%] w-12 h-12 animate-sparkle" style={{animationDelay: '0.4s'}}><SparkleSprite /></div>
          <div className="absolute bottom-[20%] left-[25%] w-16 h-16 animate-sparkle" style={{animationDelay: '0.7s'}}><SparkleSprite /></div>
          <div className="absolute top-[60%] right-[25%] w-10 h-10 animate-sparkle" style={{animationDelay: '0.2s'}}><SparkleSprite /></div>
          <div className="absolute top-[45%] left-[10%] w-12 h-12 animate-sparkle" style={{animationDelay: '0.8s'}}><SparkleSprite /></div>
          <div className="absolute bottom-[35%] right-[15%] w-14 h-14 animate-sparkle" style={{animationDelay: '0.5s'}}><SparkleSprite /></div>
        </div>

        <PixelBox className="text-center max-w-2xl w-full shadow-2xl relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 animate-bounce"><SproutSprite /></div>
          <h2 className="text-4xl font-extrabold text-[#5d4037] mb-6 border-b-4 border-[#8b5a2b] pb-4">Quest Complete!</h2>
          <div className="text-lg bg-[#d7ccc8] p-6 border-4 border-[#8b5a2b] text-left leading-relaxed shadow-inner mb-8">
            <p className="font-bold mb-4 text-[#5d4037]">You successfully learned:</p>
            <ul className="list-disc list-inside space-y-2 text-[#3e2723] font-medium">
              <li key="learned-1">Soil Components: Organic Material, Minerals, Water, Air</li>
              <li key="learned-2">Compost Steps: Nitrogen (Greens), Carbon (Browns), Water, Air</li>
              <li key="learned-4">What not to compost: meat, dairy, oily food, pet waste, sick plants</li>
              <li key="learned-5">Fixing smelly, cold and pest-ridden compost piles</li>
              <li key="learned-6">Worm composting: damp bedding and worm-friendly food</li>
              <li key="learned-3">Managing Compaction, Erosion, and Drainage</li>
              <li key="learned-7">Optimal soil pairings for your garden</li>
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
            onEnded={returnToTitle} />
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
               <button onClick={() => { setAudioDismissed(true); playAudio(); }} className="bg-emerald-500 text-white px-6 py-4 font-bold text-lg hover:bg-emerald-600 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 w-full rounded-lg inline-flex items-center justify-center gap-2">Enter Game <span className="w-5 h-5 block" aria-hidden="true"><MusicNoteIcon /></span></button>
            </PixelBox>
         </div>
      )}
      {isChapterSelectOpen && (
        <div key="chapter-select-overlay" className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
          <PixelBox className="text-center max-w-sm mx-4 w-full">
            <h3 className="text-2xl mb-6 font-bold text-amber-900 border-b-4 border-[#8b5a2b] pb-3">Select Chapter</h3>
            <div className="flex flex-col gap-2 mb-4 max-h-[60vh] overflow-y-auto pr-1">
              {[{ label: '🌙 The Dream', stage: 'INTRO_DIALOG' }, ...DREAM_LEVELS, { label: '💀 Nightmare', stage: 'NIGHTMARE_END' }].map(({ label, stage }) => (
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