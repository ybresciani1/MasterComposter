import { KittenSprite } from '../sprites/characters.jsx';
import {
  CompactedPlotSprite, ErodingPlotSprite, FloodedPlotSprite, GardenPlotSprite, LoamBedSprite, SandyBedSprite, AcidicBedSprite, ShadyBedSprite,
  TomatoPlantSprite, SucculentsSprite, BlueberryBushSprite, FernPlantSprite, SmellyPileSprite, ColdPileSprite, PestPileSprite, HealthyPileSprite,
} from '../sprites/garden.jsx';
import {
  OrganicMatterIcon, MineralsIcon, WaterDropIcon, AirIcon, PlasticIcon, MagicIcon, GrassClippingsIcon, VegScrapsIcon, CoffeeGroundsIcon,
  DryLeafIcon, CardboardIcon, TwigsIcon, BananaPeelIcon, EggshellsIcon, ShreddedPaperIcon, MeatIcon, CheeseIcon, GreasyPizzaIcon,
  PetWasteIcon, DiseasedPlantIcon, OrangePeelIcon, OnionIcon, HotPepperIcon, LeafBagIcon, BinLidIcon,
  TomatoSeedsIcon, SucculentSeedsIcon, BlueberrySeedsIcon, FernSeedsIcon, CoverCropSeedsIcon,
} from '../sprites/icons.jsx';
import { PitchforkSprite, WateringCanSprite, CompostBagSprite, MulchSprite, HammerSprite } from '../sprites/tools.jsx';

// The dream levels in play order; the day shown in the HUD is the level's position + 1
export const DREAM_LEVELS = [
  { stage: 'CRAFT_SOIL', label: '🪣 Craft Soil' },
  { stage: 'MATCH_EXAMPLES', label: '🔄 Make Compost' },
  { stage: 'NO_COMPOST', label: '🚫 Don\'t Compost This!' },
  { stage: 'COMPOST_DOCTOR', label: '🩺 Compost Doctor' },
  { stage: 'WORM_BIN', label: '🪱 Wallace\'s Worm Bin' },
  { stage: 'FIX_PLOTS', label: '🛠️ Fix Plots' },
  { stage: 'PLANT_SEEDS', label: '🌱 Plant Seeds' },
];

export const SOIL_COMPONENTS = ['Organic Materials', 'Minerals', 'Water', 'Air'];

export const FALSE_COMPONENTS = ['Plastic', 'Magic', 'Kittens'];

// Icon for each Craft Soil ingredient
export const INGREDIENT_ICONS = {
  'Organic Materials': OrganicMatterIcon, Minerals: MineralsIcon, Water: WaterDropIcon, Air: AirIcon,
  Plastic: PlasticIcon, Magic: MagicIcon, Kittens: KittenSprite,
};

export const EXAMPLE_ITEMS = [
  { id: 'ex_n1', name: 'Grass Clippings', icon: GrassClippingsIcon, comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_n2', name: 'Vegetable Scraps', icon: VegScrapsIcon, comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_n3', name: 'Coffee Grounds', icon: CoffeeGroundsIcon, comp: '🍃 Nitrogen (Greens)' },
  { id: 'ex_c1', name: 'Dry Leaves', icon: DryLeafIcon, comp: '🍂 Carbon (Browns)' },
  { id: 'ex_c2', name: 'Cardboard', icon: CardboardIcon, comp: '🍂 Carbon (Browns)' },
  { id: 'ex_c3', name: 'Twigs', icon: TwigsIcon, comp: '🍂 Carbon (Browns)' },
  { id: 'ex_w', name: 'Watering Can', type: 'tool', icon: WateringCanSprite, comp: '💧 Water' },
  { id: 'ex_a', name: 'Pitchfork', type: 'tool', icon: PitchforkSprite, comp: '💨 Air' }
];

export const EXAMPLE_BINS = [
  { id: 'bin_n', x: 20, y: 15, comp: '🍃 Nitrogen (Greens)', color: 'bg-green-700', label: 'Greens Bin' },
  { id: 'bin_c', x: 240, y: 15, comp: '🍂 Carbon (Browns)', color: 'bg-[#8d6e63]', label: 'Browns Bin' },
];

// "Don't compost this!": one scrap at a time goes to the Compost bin or the Trash.
// `clue` is Wallace's hint while you carry it; `why` is the answer shown once it's sorted.
export const NO_COMPOST_ITEMS = [
  { id: 'nc_banana', name: 'Banana Peel', icon: BananaPeelIcon, bin: 'compost', clue: 'Fruit peels are soft and break down fast. What do greens love to turn into?', why: 'Fruit peels are great greens!' },
  { id: 'nc_eggs', name: 'Eggshells', icon: EggshellsIcon, bin: 'compost', clue: 'Eggshells come from the kitchen, but they are not meat. Crushed up, they add calcium to soil!', why: 'Crushed eggshells add calcium.' },
  { id: 'nc_paper', name: 'Shredded Paper', icon: ShreddedPaperIcon, bin: 'compost', clue: 'Plain paper is made from trees, just like dry leaves and cardboard. Is that a brown?', why: 'Plain paper is a handy brown.' },
  { id: 'nc_meat', name: 'Meat Scraps', icon: MeatIcon, bin: 'trash', clue: 'Hmm, think about who would come sniffing for meat and bones. Rats and raccoons love a free meal!', why: 'Meat and bones attract rats and raccoons.' },
  { id: 'nc_cheese', name: 'Cheese', icon: CheeseIcon, bin: 'trash', clue: 'Dairy turns stinky as it rots. Do we want a smelly pile that brings pests?', why: 'Dairy turns smelly and draws pests.' },
  { id: 'nc_pizza', name: 'Greasy Pizza', icon: GreasyPizzaIcon, bin: 'trash', clue: 'Feel that grease? Oil coats everything and slows the microbes down.', why: 'Oily, greasy food slows the pile down and attracts pests.' },
  { id: 'nc_pet', name: 'Pet Waste', icon: PetWasteIcon, bin: 'trash', clue: 'Pet waste can carry germs and parasites. Would you want that near your veggies?', why: 'Pet waste can carry germs and parasites.' },
  { id: 'nc_sick', name: 'Diseased Plants', icon: DiseasedPlantIcon, bin: 'trash', clue: 'Those spots mean disease. A home pile might not get hot enough to kill it off.', why: 'Sick plants can spread disease back to your garden.' },
];

// Plot-style problems: walk up, answer the question, then bring both fix items.
// Each problem lists its tile, the tile once fixed, the fix items, and the fix animation.
export const SOIL_PROBLEMS = [
  {
    id: 'compaction',
    name: "Compacted Plot",
    x: 30, y: 50,
    tile: CompactedPlotSprite, fixedTile: GardenPlotSprite, fixAnim: 'stir',
    fixItems: [{ id: 'tool_p', name: 'Pitchfork', type: 'tool', icon: PitchforkSprite }, { id: 'item_om', name: 'Compost Bag', icon: CompostBagSprite }],
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
    tile: ErodingPlotSprite, fixedTile: GardenPlotSprite, fixAnim: 'pat',
    fixItems: [{ id: 'item_cc', name: 'Cover Crop Seeds', icon: CoverCropSeedsIcon }, { id: 'item_m', name: 'Mulch', icon: MulchSprite }],
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
    tile: FloodedPlotSprite, fixedTile: GardenPlotSprite, fixAnim: 'hammer',
    fixItems: [{ id: 'item_om2', name: 'Compost Bag', icon: CompostBagSprite }, { id: 'tool_h', name: 'Hammer', type: 'tool', icon: HammerSprite }],
    description: "Water pools on the surface. The roots are drowning!",
    hint: "That's a swamp, not a garden! We need to raise the beds so the water can flow away.",
    options: [
      { text: "Pave over it with concrete", correct: false },
      { text: "Build Raised Beds & improve grading", correct: true },
      { text: "Dig a deep hole and wait", correct: false }
    ]
  }
];

export const COMPOST_PROBLEMS = [
  {
    id: 'smelly',
    name: "Smelly, Slimy Pile",
    x: 30, y: 50,
    tile: SmellyPileSprite, fixedTile: HealthyPileSprite, fixAnim: 'stir',
    fixItems: [{ id: 'doc_leaves', name: 'Bag of Leaves', icon: LeafBagIcon, clue: 'Dry brown leaves soak up extra water and let air back in. Which pile is soggy?' }, { id: 'doc_fork', name: 'Pitchfork', type: 'tool', icon: PitchforkSprite, clue: 'Turning a pile fluffs it up so it can breathe again. Find the one that stinks!' }],
    description: "This pile is soggy and smells like rotten eggs. Too many greens and too much water have squeezed out all the air.",
    hint: "Pee-yew! This pile can't breathe. It needs something dry mixed in, and some fresh air.",
    options: [
      { text: "Add even more food scraps", correct: false },
      { text: "Mix in dry browns & turn the pile", correct: true },
      { text: "Wrap it up tight in a plastic tarp", correct: false }
    ]
  },
  {
    id: 'cold',
    name: "Cold, Dry Pile",
    x: 135, y: 50,
    tile: ColdPileSprite, fixedTile: HealthyPileSprite, fixAnim: 'water',
    fixItems: [{ id: 'doc_grass', name: 'Grass Clippings', icon: GrassClippingsIcon, clue: 'Fresh grass is full of nitrogen. It wakes the microbes up and warms a pile. Which one is cold?' }, { id: 'doc_water', name: 'Watering Can', type: 'tool', icon: WateringCanSprite, clue: 'Compost should feel like a wrung-out sponge. Look for the dusty-dry pile!' }],
    description: "Nothing is breaking down. The pile is dusty-dry and stone cold in the middle.",
    hint: "This pile fell asleep! The microbes need moisture and some nitrogen-rich greens to heat things up.",
    options: [
      { text: "Add greens & water until it's damp like a wrung-out sponge", correct: true },
      { text: "Pile on more dry twigs", correct: false },
      { text: "Leave it alone in the sun", correct: false }
    ]
  },
  {
    id: 'pests',
    name: "Pest Problem",
    x: 240, y: 50,
    tile: PestPileSprite, fixedTile: HealthyPileSprite, fixAnim: 'pat',
    fixItems: [{ id: 'doc_cover', name: 'Bag of Leaves', icon: LeafBagIcon, clue: 'Burying food scraps under browns hides the smell from hungry critters.' }, { id: 'doc_lid', name: 'Bin Lid', icon: BinLidIcon, clue: 'A snug lid keeps rats and raccoons out. Who has pest trouble?' }],
    description: "Rats and flies keep raiding this pile. Someone tossed in meat and cheese, and the food scraps are left uncovered.",
    hint: "The critters smell a buffet! Take out the meat, cover the food scraps, and keep them out.",
    options: [
      { text: "Add more meat to keep them busy", correct: false },
      { text: "Leave the lid off so it airs out", correct: false },
      { text: "Remove meat & dairy, bury scraps under browns, and close the lid", correct: true }
    ]
  }
];

// Wallace's worm bin: bedding first, then feed the worms one scrap at a time
export const WORM_BEDDING_ITEMS = [
  { id: 'wb_paper', name: 'Shredded Newspaper', icon: ShreddedPaperIcon },
  { id: 'wb_water', name: 'Watering Can', type: 'tool', icon: WateringCanSprite },
];

export const WORM_FOODS = [
  { id: 'wf_banana', name: 'Banana Peel', icon: BananaPeelIcon, bin: 'worms', why: 'Worms love soft fruit peels!' },
  { id: 'wf_coffee', name: 'Coffee Grounds', icon: CoffeeGroundsIcon, bin: 'worms', why: 'Coffee grounds are a worm favorite.' },
  { id: 'wf_eggs', name: 'Crushed Eggshells', icon: EggshellsIcon, bin: 'worms', why: 'Crushed eggshells help worms digest.' },
  { id: 'wf_orange', name: 'Orange Peels', icon: OrangePeelIcon, bin: 'compost', why: 'Citrus is too acidic for worms.' },
  { id: 'wf_onion', name: 'Onions', icon: OnionIcon, bin: 'compost', why: 'Onions are too strong and acidic for worms.' },
  { id: 'wf_pepper', name: 'Hot Peppers', icon: HotPepperIcon, bin: 'compost', why: 'Spicy peppers irritate worms.' },
];

export const PLANTS = [
  { id: 'tomato', name: 'Tomatoes', icon: TomatoSeedsIcon, bed: LoamBedSprite, plant: TomatoPlantSprite, clue: 'Tomatoes are hungry plants! They want dark, crumbly soil packed with nutrients. A wriggly worm is a good sign.', soil: 'Loamy, well-draining, nutrient-rich soil' },
  { id: 'succulent', name: 'Succulents', icon: SucculentSeedsIcon, bed: SandyBedSprite, plant: SucculentsSprite, clue: 'Succulents come from the desert and hate wet feet. Look for gritty soil that drains in a flash.', soil: 'Sandy, highly porous, fast-draining soil' },
  { id: 'blueberry', name: 'Blueberries', icon: BlueberrySeedsIcon, bed: AcidicBedSprite, plant: BlueberryBushSprite, clue: 'Blueberries like their soil a little sour. Pine needles are a big hint!', soil: 'Acidic, well-draining loamy soil' },
  { id: 'fern', name: 'Ferns', icon: FernSeedsIcon, bed: ShadyBedSprite, plant: FernPlantSprite, clue: 'Ferns grow on the cool forest floor. Find the damp, mossy spot in the shade.', soil: 'Moist, shady soil rich in organic matter', shady: true },
];

// Where the soil beds sit in the Plant Seeds field (one per plant)
export const BED_SPOTS = [{ x: 12, y: 30 }, { x: 94, y: 30 }, { x: 176, y: 30 }, { x: 258, y: 30 }];
