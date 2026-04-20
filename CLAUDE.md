# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

### Game State Machine

The entire game lives in `src/App.jsx` as a monolithic component. The top-level `gamePhase` state drives which scene renders:

```
TITLE → INTRO → CLASS → SLEEP_TRANSITION → DREAM → WAKE_UP → TITLE
```

Within `DREAM`, a nested `dreamPhase` state progresses through:

```
INTRO_DIALOG → CRAFT_SOIL → MATCH_EXAMPLES → FIX_PLOTS → PLANT_SEEDS → END_DIALOG
```

### Key Patterns in App.jsx

- **State**: 20+ `useState` hooks manage game state; `farmerPosRef` is a `useRef` for the character position that updates via `requestAnimationFrame` without re-renders.
- **Movement loop**: WASD/arrow keys update position; a sinusoidal bounce is applied for animation. Collision detection uses Euclidean distance (`Math.hypot`).
- **Game data**: All domain data (soil components, compost examples, soil problems, plants) is defined as module-level constants at the top of `App.jsx`. Each entity has an `id`, `name`, and domain-specific fields.
- **Sprites**: Characters and tools are inline SVG React components defined in `App.jsx` (FarmerSprite, WormSprite, tool sprites, crop sprites).
- **UI primitives**: `PixelBox` and `DialogBox` are small inline components for the retro pixel aesthetic.
- **Audio**: Background music plays via an `<audio>` element with a toggle button; browser autoplay restrictions are handled with try/catch.

### Styling

- Tailwind CSS 4 via the Vite plugin (no `tailwind.config.js` — config is in `vite.config.js`).
- CSS custom properties and typography in `src/index.css`.
- Component-specific styles in `src/App.css`.
