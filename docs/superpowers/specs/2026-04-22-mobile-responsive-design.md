# Mobile Responsive Design — Master Composter Valley

**Date:** 2026-04-22
**Status:** Approved

## Goals

Make the entire application playable and readable on all screen sizes (320px phones through wide desktop monitors), in portrait orientation on mobile.

## Decisions

| Topic | Decision |
|---|---|
| Target screens | All sizes: phones (320px+), tablets, desktop |
| Orientation | Portrait-only on mobile; landscape phone gets a rotate overlay |
| Game viewport scaling | CSS transform scale (Approach A) |
| Touch controls | Tap-to-move + action buttons |

---

## Section 1: Game Viewport Scaling

### How it works

The 340×300 game canvas keeps its internal coordinate system exactly as-is. All collision math, sprite positions, and movement logic are untouched.

A `useRef` + `ResizeObserver` (or `window resize` listener) measures the available container width. A scale factor is computed:

```
scale = Math.min(availableWidth / 340, 2)
```

The cap of `2` prevents the game from becoming comically large on wide monitors.

The outer wrapper div is sized to `340 * scale` × `300 * scale` px. The inner game div stays exactly `340×300` and receives:

```css
transform: scale(scale);
transform-origin: top left;
```

All three existing game containers (`w-[340px] h-[300px]`) get this wrapper treatment.

### State

A `gameScale` state value (number, default `1`) is updated on mount and on resize. It is passed down to any component that needs to convert screen coordinates to game coordinates.

### Coordinate conversion

Touch/click events on the game canvas divide their `clientX/Y` offset by `gameScale` to get game-world coordinates. This is only needed for tap-to-move.

---

## Section 2: Touch Controls (Gameplay Phases)

Applies to: `CRAFT_SOIL`, `MATCH_EXAMPLES`, `FIX_PLOTS`, `PLANT_SEEDS`.

### Tap-to-move

- An `onClick` (works for both mouse and touch) handler is added to the game canvas div.
- It reads the tap position relative to the canvas, divides by `gameScale`, and sets a `targetPosRef = { x, y }`.
- The existing `requestAnimationFrame` movement loop is extended: if `targetPosRef` is set and the farmer is not already there (within ~5px), the farmer moves toward it at the same speed (`2.5px/frame`). On arrival, `targetPosRef` is cleared.
- Keyboard WASD still works simultaneously — pressing a key clears `targetPosRef` so keyboard takes over cleanly.

### Action buttons

- Two large touch-friendly buttons render **below** the game canvas (outside the scaled container, so they are unaffected by the scale transform).
- **"Pick Up / Drop"** — triggers the same handler as the Space key.
- **"Interact"** — triggers the same handler as the E key.
- Buttons are always visible (desktop users can click them too, no need to hide them).
- Tapping a button does not trigger tap-to-move because the buttons are outside the canvas div.

---

## Section 3: Non-Game Scene Responsive Polish

### Title screen

- The PixelBox container: `w-full max-w-sm mx-auto` instead of fixed width.
- Buttons: `w-full` already; font sizes get `text-lg md:text-xl`.
- Heading text: responsive scale with `text-2xl md:text-3xl`.

### Cutscenes (INTRO phase)

- Text container: `px-4 max-w-2xl w-full mx-auto`.
- Font size: `text-base md:text-xl` (currently `text-xl md:text-2xl` — reduce mobile base size).

### Class & Wake-Up scenes

- Classroom illustration box: `w-full max-w-[500px] h-auto min-h-[240px]` (was `max-w-[500px] h-[350px]`).
- DialogBox: add `w-full max-w-full` constraint; existing `text-sm md:text-base` is fine.

### DialogBox component

- Add `w-full` and `break-words` to prevent overflow on narrow screens.
- Portrait name label gets `truncate` or wraps gracefully.

### Portrait lock overlay

A CSS rule in `index.css` renders a full-screen overlay on landscape phones:

```css
@media (orientation: landscape) and (max-width: 768px) {
  .portrait-lock {
    display: flex;
  }
}
```

A `div.portrait-lock` is added near the root of `App.jsx`, hidden by default (`display: none`), shown by the media query. It covers the full viewport with a message: "Please rotate your device to portrait mode 🔄".

---

## Files to Change

| File | Changes |
|---|---|
| `src/App.jsx` | Add `gameScale` state + ResizeObserver; wrap game containers; tap-to-move handler; `targetPosRef` movement in animation loop; action buttons; portrait lock div; responsive Tailwind classes on non-game scenes |
| `src/index.css` | Portrait lock media query; minor font-size adjustments |
| `src/App.css` | Any additional mobile overrides if needed |

## Out of Scope

- Landscape layout on mobile
- Canvas/WebGL rewrite
- Percentage-based coordinate system refactor
- Audio or game logic changes
