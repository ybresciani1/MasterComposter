# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Live Deployment

**Production URL:** https://master-composter.vercel.app/

Static assets (audio, images) are served from the same origin, e.g.:
`https://master-composter.vercel.app/assets/Nightmare sound.mp3`

Use this URL when testing the deployed build or taking browser screenshots via Playwright.

## Commands

```bash
npm run dev      # Start dev server with HMR at localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build
npm run lint     # ESLint
```

Node version is pinned to 24.15.0 (see `.nvmrc`).

## Architecture

**Master Composter Valley** is a single-page educational web game built with React 19 + Vite + Tailwind CSS 4.

### Files

- `src/App.jsx` — the game state machine, all game logic (movement loop, input handling) and the scene renderers.
- `src/data/gameData.js` — level content: `DREAM_LEVELS` (play order, which sets the "Day N" label and the chapter list), Craft Soil ingredients, compost items, the sorting lists, plot/pile problems (each with its tile, fix items and fix animation), and plants with their beds.
- `src/data/assets.js` — `BASE` asset URL and every sound/video URL.
- `src/sprites/*.jsx` — pixel-art SVG sprites (`characters`, `animals`, `critters`, `plants`, `scenery`, `tools`, `props`, `garden` tiles, `nightmare`, and 16x16 `icons`).
- `src/components/` — `PixelBox`/`DialogBox` (`ui.jsx`), `ClassroomScene`, `CrowOverlay`, `PeckingHens`, `CompostKittens`, portraits, and `EasterEggs` (worm-on-a-string overlay, achievement card).
- `src/data/holidays.js` — date-based holiday skins (Halloween, Día de los Muertos, Christmas, Earth Day, Compost Awareness Week); preview one with `?holiday=halloween` / `muertos` / `christmas` / `earthday` / `compostweek`.
- `src/audio/synth.js` — Web Audio sound effects for easter eggs that have no recorded sound (goat scream, slip, achievement chime).

### Game State Machine

The top-level `gameState` drives which scene renders:

```
TITLE → INTRO → CLASS → SLEEP_TRANSITION → DREAM → END_CREDITS → TITLE
```

Within `DREAM`, `dreamStage` progresses through the levels in `DREAM_LEVELS`:

```
INTRO_DIALOG → CRAFT_SOIL → MATCH_EXAMPLES → NO_COMPOST → COMPOST_DOCTOR → WORM_BIN → FIX_PLOTS → PLANT_SEEDS → END_DIALOG → WAKE_UP
```

Losing all hearts jumps to `NIGHTMARE_END` instead. `FIX_PLOTS` and `COMPOST_DOCTOR` share one implementation driven by `SOIL_PROBLEMS` / `COMPOST_PROBLEMS`; `NO_COMPOST` and the feeding half of `WORM_BIN` share the one-scrap-at-a-time sorting queue.

### Key Patterns

- **State**: `useState` hooks in `App` manage game state; `farmerPosRef` holds the character position, updated in a `requestAnimationFrame` loop that scales movement by elapsed time (walking speed doesn't depend on frame rate).
- **Smooth movement**: the farmer and Wallace are `MovingActor`s that the loop moves through `farmerApi`/`wallaceApi`, so walking re-renders only those two, not all of `App`. Don't put per-frame values in `App` state — it makes walking jitter.
- **Collision**: distance checks with `Math.hypot` against spot centres in the 340x300 play field.
- **Sprites**: SVG built from 1-unit rects with `shapeRendering="crispEdges"`, wrapped in `React.memo`. The house style is a 2x-resolution grid with base/shade/highlight tones and no outlines; match it for new art. Wallace (`WallaceFollowerSprite`) and the Polish hens (`PolishHenSprite`) intentionally keep their original style.
- **Save**: the current level and hearts are saved to `localStorage` (`mc-save`) so the title can offer Continue.
- **Audio**: Background music plays via an `<audio>` element with a toggle button; browser autoplay restrictions are handled with try/catch.

### Styling

- Tailwind CSS 4 via the Vite plugin (no `tailwind.config.js` — config is in `vite.config.js`).
- CSS custom properties and typography in `src/index.css`; the Pixelify Sans font is linked in `index.html`.
- Game animations (keyframes) and title text styles in `src/game.css`.
