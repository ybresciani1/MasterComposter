# Mobile Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the entire Master Composter Valley game playable and readable on all screen sizes from 320px phones to wide desktop monitors.

**Architecture:** CSS `transform: scale()` applied to a fixed 340×300 game canvas so all internal coordinate math remains untouched; tap-to-move added to the animation loop alongside existing WASD input; non-game scenes get lightweight Tailwind responsive-class adjustments.

**Tech Stack:** React 19, Tailwind CSS 4, Vite — no new dependencies.

---

## File Map

| File | What changes |
|---|---|
| `src/App.jsx` | `gameScale` state + ResizeObserver; scale wrapper around all three 340×300 game containers; `targetPosRef` + movement loop update; canvas `onClick` for tap-to-move; action buttons; controls hint width fix; portrait-lock div; title/cutscene responsive class tweaks |
| `src/index.css` | Portrait-lock media query |

---

## Task 1: gameScale state + ResizeObserver

**Files:**
- Modify: `src/App.jsx` (state block ~line 675, add new useEffect before line 879)

- [ ] **Step 1: Add `gameScale` state and ResizeObserver effect**

  In `src/App.jsx`, directly after the `keys = useRef({})` line (~line 675), add:

  ```jsx
  const [gameScale, setGameScale] = useState(1);
  ```

  Then add a new `useEffect` directly before the existing movement-loop `useEffect` (the one at ~line 879 that checks `['CRAFT_SOIL', ...]`):

  ```jsx
  useEffect(() => {
    const update = () => {
      const rootEl = document.getElementById('root');
      const available = rootEl ? rootEl.clientWidth : window.innerWidth;
      setGameScale(Math.min(available / 340, 2));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);
  ```

- [ ] **Step 2: Verify build passes**

  ```bash
  npm run build 2>&1 | tail -5
  ```

  Expected: `✓ built in ...ms` with no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/App.jsx
  git commit -m "feat: add gameScale state with ResizeObserver for fluid canvas scaling"
  ```

---

## Task 2: Wrap game containers with CSS scale transform

**Files:**
- Modify: `src/App.jsx` (~lines 1328–1333, 1483–1484, 1529–1530)

There are three `340×300` game containers. Each gets an outer wrapper sized to `340*gameScale × 300*gameScale` with the inner div scaled via `transform: scale(gameScale)`.

- [ ] **Step 1: Wrap the main gameplay container (CRAFT_SOIL / MATCH_EXAMPLES / FIX_PLOTS / PLANT_SEEDS)**

  Find this block (around line 1327):

  ```jsx
  {['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) && (
    <div className="text-center animate-fade-in relative flex flex-col items-center">
       <div className="flex justify-between w-full max-w-[340px] mb-2 gap-2 text-[10px] text-white bg-[#5d4037] p-1 rounded">
          <span>WASD: Move</span><span>SPACE: Pick/Drop</span><span>E: Use</span>
       </div>
       
       <div className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner garden-grid">
  ```

  Replace with:

  ```jsx
  {['CRAFT_SOIL', 'MATCH_EXAMPLES', 'FIX_PLOTS', 'PLANT_SEEDS'].includes(dreamStage) && (
    <div className="text-center animate-fade-in relative flex flex-col items-center">
       <div className="flex justify-between mb-2 gap-2 text-[10px] text-white bg-[#5d4037] p-1 rounded" style={{ width: 340 * gameScale }}>
          <span>WASD/Tap: Move</span><span>SPACE: Pick/Drop</span><span>E: Use</span>
       </div>

       <div style={{ width: 340 * gameScale, height: 300 * gameScale, position: 'relative', flexShrink: 0 }}>
         <div className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner garden-grid" style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
  ```

  The closing `</div>` structure for the inner game canvas stays the same — you're only adding an outer wrapper `<div>` and adding `style` to the existing inner `<div>`.

- [ ] **Step 2: Wrap the NIGHTMARE_END container**

  Find (around line 1483):

  ```jsx
  {dreamStage === 'NIGHTMARE_END' && (
    <div className="text-center animate-fade-in flex flex-col items-center">
      <div className="w-[340px] h-[300px] bg-[#4e342e] border-4 border-[#212121] relative overflow-hidden rounded-xl shadow-inner flex flex-wrap justify-center items-center gap-4 p-4 animate-shake">
  ```

  Replace with:

  ```jsx
  {dreamStage === 'NIGHTMARE_END' && (
    <div className="text-center animate-fade-in flex flex-col items-center">
      <div style={{ width: 340 * gameScale, height: 300 * gameScale, position: 'relative', flexShrink: 0 }}>
        <div className="w-[340px] h-[300px] bg-[#4e342e] border-4 border-[#212121] relative overflow-hidden rounded-xl shadow-inner flex flex-wrap justify-center items-center gap-4 p-4 animate-shake" style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
  ```

  Add the closing `</div>` for the outer wrapper immediately after the existing closing `</div>` for the nightmare container (the one before `<DialogBox key="nightmare-dialog" ...`):

  Before the change the structure ends like:
  ```jsx
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 grayscale z-10"><FarmerSprite /></div>
              </div>
              <DialogBox key="nightmare-dialog" ...
  ```

  After:
  ```jsx
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 grayscale z-10"><FarmerSprite /></div>
              </div>
            </div>
            <DialogBox key="nightmare-dialog" ...
  ```

- [ ] **Step 3: Wrap the END_DIALOG container**

  Find (around line 1529):

  ```jsx
  {dreamStage === 'END_DIALOG' && (
    <div className="text-center animate-fade-in flex flex-col items-center">
      <div className="w-[340px] h-[300px] bg-[#81c784] border-4 border-[#388e3c] relative overflow-hidden rounded-xl shadow-inner flex flex-wrap justify-center items-center gap-4 p-4">
  ```

  Replace with:

  ```jsx
  {dreamStage === 'END_DIALOG' && (
    <div className="text-center animate-fade-in flex flex-col items-center">
      <div style={{ width: 340 * gameScale, height: 300 * gameScale, position: 'relative', flexShrink: 0 }}>
        <div className="w-[340px] h-[300px] bg-[#81c784] border-4 border-[#388e3c] relative overflow-hidden rounded-xl shadow-inner flex flex-wrap justify-center items-center gap-4 p-4" style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
  ```

  Add the closing `</div>` for the outer wrapper immediately after the existing closing `</div>` for the end-dialog container (the one before `<DialogBox key="end-dialog" ...`):

  Before:
  ```jsx
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12"><FarmerSprite /></div>
              </div>
              <DialogBox key="end-dialog" ...
  ```

  After:
  ```jsx
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12"><FarmerSprite /></div>
              </div>
            </div>
            <DialogBox key="end-dialog" ...
  ```

- [ ] **Step 4: Verify build passes**

  ```bash
  npm run build 2>&1 | tail -5
  ```

  Expected: `✓ built in ...ms`

- [ ] **Step 5: Manual visual check**

  ```bash
  npm run dev
  ```

  Open browser DevTools → toggle device toolbar → select iPhone SE (375px wide). Navigate to the dream gameplay stage. The farm canvas should fill the screen width and scale up on desktop. Sprites and elements should remain in correct relative positions.

- [ ] **Step 6: Commit**

  ```bash
  git add src/App.jsx
  git commit -m "feat: wrap game containers with CSS scale transform for fluid viewport scaling"
  ```

---

## Task 3: Tap-to-move

**Files:**
- Modify: `src/App.jsx` (state block, movement loop ~line 886, movement loop ~line 927, canvas div ~line 1333)

- [ ] **Step 1: Add `targetPosRef`**

  Directly after the `keys = useRef({})` line (~line 675), add:

  ```jsx
  const targetPosRef = useRef(null);
  ```

- [ ] **Step 2: Update the movement loop to walk toward target**

  In the movement loop `useEffect` (starting ~line 879), find the section inside `const loop = () => {` that handles keyboard movement:

  ```jsx
  if (k['w'] || k['W'] || k['ArrowUp'] || k['arrowup']) { farmerPosRef.current.y -= speed; moved = true; }
  if (k['s'] || k['S'] || k['ArrowDown'] || k['arrowdown']) { farmerPosRef.current.y += speed; moved = true; }
  if (k['a'] || k['A'] || k['ArrowLeft'] || k['arrowleft']) { farmerPosRef.current.x -= speed; moved = true; }
  if (k['d'] || k['D'] || k['ArrowRight'] || k['arrowright']) { farmerPosRef.current.x += speed; moved = true; }
  ```

  Directly after those four lines (and before the `if (moved) {` block), add:

  ```jsx
  if (!moved && targetPosRef.current) {
    const dx = targetPosRef.current.x - farmerPosRef.current.x;
    const dy = targetPosRef.current.y - farmerPosRef.current.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 5) {
      farmerPosRef.current.x += (dx / dist) * speed;
      farmerPosRef.current.y += (dy / dist) * speed;
      moved = true;
    } else {
      targetPosRef.current = null;
    }
  }
  ```

- [ ] **Step 3: Clear target when keyboard takes over**

  Inside `handleKeyDown` (starts ~line 927), at the very top of the function body (after `const keyStr = ...`), add:

  ```jsx
  if (['w','a','s','d','W','A','S','D','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    targetPosRef.current = null;
  }
  ```

- [ ] **Step 4: Add onClick to the main gameplay canvas**

  Find the main gameplay canvas div (around line 1333 after Task 2's changes):

  ```jsx
  <div className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner garden-grid" style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
  ```

  Add an `onClick` handler:

  ```jsx
  <div
    className="w-[340px] h-[300px] bg-[#a1887f] border-4 border-[#5d4037] relative overflow-hidden rounded-xl shadow-inner garden-grid"
    style={{ transform: `scale(${gameScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}
    onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / gameScale - 20;
      const y = (e.clientY - rect.top) / gameScale - 20;
      targetPosRef.current = {
        x: Math.max(0, Math.min(x, 300)),
        y: Math.max(0, Math.min(y, 260)),
      };
    }}
  >
  ```

- [ ] **Step 5: Verify build passes**

  ```bash
  npm run build 2>&1 | tail -5
  ```

  Expected: `✓ built in ...ms`

- [ ] **Step 6: Manual test tap-to-move**

  ```bash
  npm run dev
  ```

  Open in mobile DevTools (e.g. iPhone SE). Start the game, reach the `CRAFT_SOIL` stage. Tap on different parts of the farm canvas — the farmer should walk toward the tapped spot. Press WASD on desktop — the farmer should respond to keyboard and stop any tap-initiated movement.

- [ ] **Step 7: Commit**

  ```bash
  git add src/App.jsx
  git commit -m "feat: add tap-to-move touch input to gameplay canvas"
  ```

---

## Task 4: Action buttons (Pick Up / Drop + Interact)

**Files:**
- Modify: `src/App.jsx` (inside the gameplay flex column, after the scaled game canvas wrapper)

These buttons appear below the scaled game canvas. They dispatch synthetic keyboard events so they reuse the existing Space/E logic exactly.

- [ ] **Step 1: Add action buttons below the main gameplay canvas wrapper**

  Inside the gameplay flex column (`['CRAFT_SOIL', ...].includes(dreamStage) && ...`), find the closing `</div>` of the outer scale wrapper (the `style={{ width: 340 * gameScale, height: 300 * gameScale ... }}` div added in Task 2). Immediately after it, before the rest of the existing content in that section (toast messages, DialogBox, etc.), add:

  ```jsx
  <div className="flex gap-3 mt-3" style={{ width: 340 * gameScale }}>
    <button
      className="flex-1 bg-[#1565c0] text-white font-bold py-3 rounded-lg border-b-4 border-[#0d47a1] active:border-b-0 active:translate-y-1 text-sm"
      onPointerDown={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true })); }}
    >
      Pick Up / Drop
    </button>
    <button
      className="flex-1 bg-[#f57f17] text-white font-bold py-3 rounded-lg border-b-4 border-[#e65100] active:border-b-0 active:translate-y-1 text-sm"
      onPointerDown={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', bubbles: true })); }}
    >
      Interact
    </button>
  </div>
  ```

  Using `onPointerDown` with `e.preventDefault()` prevents the tap from also triggering `onClick` on the canvas beneath and avoids the 300ms click delay on mobile.

- [ ] **Step 2: Verify build passes**

  ```bash
  npm run build 2>&1 | tail -5
  ```

  Expected: `✓ built in ...ms`

- [ ] **Step 3: Manual test action buttons**

  ```bash
  npm run dev
  ```

  Open in mobile DevTools. Reach `CRAFT_SOIL`. Walk near a ground item (tap-to-move), then tap "Pick Up / Drop" — the farmer should pick up the item. Tap "Interact" near the compost bin — the item should be deposited. Verify both buttons scale with the canvas width.

- [ ] **Step 4: Commit**

  ```bash
  git add src/App.jsx
  git commit -m "feat: add touch action buttons for Pick Up/Drop and Interact below game canvas"
  ```

---

## Task 5: Non-game scene responsive polish

**Files:**
- Modify: `src/App.jsx` (~lines 1183–1200, 1209, 1557)

- [ ] **Step 1: Title screen — responsive heading sizes**

  Find (around line 1183):

  ```jsx
  <h1 className="text-4xl font-extrabold text-[#5d4037] mb-2 text-shadow text-white">Master Composter</h1>
  <h2 className="text-xl text-[#8b5a2b] mb-8 tracking-widest text-white drop-shadow-sm">VALLEY</h2>
  ```

  Replace with:

  ```jsx
  <h1 className="text-2xl md:text-4xl font-extrabold text-[#5d4037] mb-2 text-shadow text-white">Master Composter</h1>
  <h2 className="text-base md:text-xl text-[#8b5a2b] mb-8 tracking-widest text-white drop-shadow-sm">VALLEY</h2>
  ```

- [ ] **Step 2: Cutscene — smaller base font on mobile**

  Find (around line 1199):

  ```jsx
  <p className="text-white font-mono text-xl md:text-2xl leading-loose mb-12 animate-pulse">{script[dialogIndex]}</p>
  ```

  Replace with:

  ```jsx
  <p className="text-white font-mono text-base md:text-xl leading-loose mb-8 md:mb-12 animate-pulse">{script[dialogIndex]}</p>
  ```

- [ ] **Step 3: Classroom scene — responsive illustration height**

  Find (around line 1209):

  ```jsx
  <div className="w-full max-w-[500px] h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-24">
  ```

  Replace with:

  ```jsx
  <div className="w-full max-w-[500px] h-[220px] md:h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-24">
  ```

- [ ] **Step 4: Wake-up scene — same responsive height**

  Find (around line 1557):

  ```jsx
  <div className="w-full max-w-[500px] h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-24">
  ```

  Replace with:

  ```jsx
  <div className="w-full max-w-[500px] h-[220px] md:h-[350px] bg-[#d7ccc8] border-8 border-[#5d4037] relative overflow-hidden shadow-2xl mb-24">
  ```

- [ ] **Step 5: DialogBox — prevent overflow on narrow screens**

  Find the DialogBox component (around line 608):

  ```jsx
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50 animate-fade-in-up">
  ```

  Replace with:

  ```jsx
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-2 md:px-4 z-50 animate-fade-in-up">
  ```

  And find the dialogue text line:

  ```jsx
  <p className="text-sm md:text-base leading-relaxed">{text}</p>
  ```

  Replace with:

  ```jsx
  <p className="text-sm md:text-base leading-relaxed break-words">{text}</p>
  ```

- [ ] **Step 6: Verify build passes**

  ```bash
  npm run build 2>&1 | tail -5
  ```

  Expected: `✓ built in ...ms`

- [ ] **Step 7: Manual visual check all scenes**

  ```bash
  npm run dev
  ```

  In DevTools mobile view (375px), walk through: title → intro cutscene → classroom → sleep transition → dream intro dialog → gameplay. Check each scene fits without horizontal scroll or overflow.

- [ ] **Step 8: Commit**

  ```bash
  git add src/App.jsx
  git commit -m "feat: responsive polish for title, cutscene, classroom, wake-up, and dialog scenes"
  ```

---

## Task 6: Portrait lock overlay

**Files:**
- Modify: `src/index.css` (add media query)
- Modify: `src/App.jsx` (add overlay div in return)

- [ ] **Step 1: Add portrait-lock CSS to `src/index.css`**

  Append to the end of `src/index.css`:

  ```css
  .portrait-lock {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #1b5e20;
    color: white;
    font-family: monospace;
    font-size: 1.25rem;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
  }

  @media (orientation: landscape) and (max-width: 768px) {
    .portrait-lock {
      display: flex;
    }
  }
  ```

- [ ] **Step 2: Add the overlay div to `App.jsx`**

  In `App.jsx`, find the main `return (` at the bottom of the component (around line 1641):

  ```jsx
  return (
    <div className="app-container">
  ```

  Replace with:

  ```jsx
  return (
    <div className="app-container">
      <div className="portrait-lock">
        <div style={{ fontSize: '3rem' }}>🔄</div>
        <p>Please rotate your device to portrait mode to play.</p>
      </div>
  ```

- [ ] **Step 3: Verify build passes**

  ```bash
  npm run build 2>&1 | tail -5
  ```

  Expected: `✓ built in ...ms`

- [ ] **Step 4: Manual test portrait lock**

  ```bash
  npm run dev
  ```

  In DevTools, select an iPhone device, then rotate to landscape (click the rotate icon in DevTools). The green overlay with the rotate message should appear and cover the game. Rotate back to portrait — overlay disappears.

- [ ] **Step 5: Commit**

  ```bash
  git add src/App.jsx src/index.css
  git commit -m "feat: add portrait-lock overlay for landscape mobile orientation"
  ```

---

## Self-Review Checklist

- **Spec § 1 (game viewport scaling):** Tasks 1 + 2 implement the ResizeObserver + CSS scale wrapper. ✓
- **Spec § 2 (tap-to-move):** Task 3 covers tap target + animation loop extension + keyboard coexistence. ✓
- **Spec § 2 (action buttons):** Task 4 covers Pick Up/Drop + Interact buttons below canvas. ✓
- **Spec § 3 (non-game responsive):** Task 5 covers title, cutscene, classroom, wake-up, dialogbox. ✓
- **Spec § 3 (portrait lock):** Task 6 covers CSS + div. ✓
- **No placeholders:** All steps include exact code. ✓
- **Type consistency:** `gameScale` (number), `targetPosRef` (ref to `{x,y}|null`) used consistently across tasks. ✓
- **gameScale passed correctly:** Used as closure value in JSX — no prop threading needed since all code is in one `App.jsx`. ✓
