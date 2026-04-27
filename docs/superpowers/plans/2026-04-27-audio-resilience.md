# Audio Resilience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preload all SFX Audio objects on mount and unlock them on the "Enter Game" gesture so sounds play reliably on iOS and slow connections.

**Architecture:** Add a `SOUND_URLS` array, a `preloadedSfx` ref, a preload `useEffect`, and a `playSfx(url)` helper — all in `src/App.jsx`. The "Enter Game" `playAudio` function gains an iOS unlock loop. All scattered `new Audio(url)` call sites are replaced with `playSfx(url)`. The oiia cat sound's custom `AudioContext` logic is untouched. Background music and wow sound already use `<audio preload="auto">` elements and are untouched.

**Tech Stack:** React 19, Web Audio API (`new Audio()`), Vite dev server

---

### Task 1: Add SOUND_URLS array

**Files:**
- Modify: `src/App.jsx:23` (after the last sound constant)

- [ ] **Step 1: Add the array**

After line 23 (`const riotBeyonceTapSound = ...`), insert:

```js
const SOUND_URLS = [
  pitchforkSound, hammerSound, patDirtSound, magicSound, wakeUpSound,
  nightmareSound, tossBinSound, questSound, introAnxietySound, sakuraSound,
  woodliceSound, beeTapSound, butterflyTapSound, frogTapSound, wateringCanSound,
  loseHeartSound, riotBeyonceTapSound,
];
```

- [ ] **Step 2: Verify the dev server compiles**

```bash
npm run dev
```
Expected: server starts with no errors at `localhost:5173`.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add SOUND_URLS array for all SFX"
```

---

### Task 2: Add preloadedSfx ref and preload useEffect

**Files:**
- Modify: `src/App.jsx` — add ref near line 1119, add useEffect near line 1325

- [ ] **Step 1: Add the ref**

After the line `const introAnxietyRef = useRef(null);` (near line 1119), insert:

```js
const preloadedSfx = useRef({});
```

- [ ] **Step 2: Add the preload useEffect**

After the `playAudio` function (near line 1323), insert:

```js
useEffect(() => {
  SOUND_URLS.forEach(url => {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();
    preloadedSfx.current[url] = audio;
  });
}, []);
```

- [ ] **Step 3: Verify the dev server compiles**

```bash
npm run dev
```
Expected: server starts cleanly. Open `localhost:5173` in a browser, open DevTools → Network tab, filter by "media". Reload the page — you should see all 17 MP3 files begin downloading on load (before any button is pressed).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: preload all SFX Audio objects on mount"
```

---

### Task 3: Add playSfx helper and iOS unlock

**Files:**
- Modify: `src/App.jsx` — add helper after preload useEffect, modify `playAudio`

- [ ] **Step 1: Add the playSfx helper**

After the preload `useEffect` added in Task 2, insert:

```js
const playSfx = (url) => {
  const sfx = preloadedSfx.current[url];
  if (!sfx) return;
  sfx.currentTime = 0;
  sfx.volume = 1.0;
  sfx.play().catch(() => {});
};
```

- [ ] **Step 2: Add the iOS unlock to playAudio**

Replace the existing `playAudio` function:

```js
const playAudio = () => {
  if (audioRef.current) {
    audioRef.current.volume = 0.15;
  }
  setIsMusicPlaying(true);
  if (wowAudioRef.current) wowAudioRef.current.load();
};
```

With:

```js
const playAudio = () => {
  if (audioRef.current) {
    audioRef.current.volume = 0.15;
  }
  setIsMusicPlaying(true);
  if (wowAudioRef.current) wowAudioRef.current.load();
  Object.values(preloadedSfx.current).forEach(audio => {
    audio.volume = 0;
    audio.play().then(() => { audio.pause(); audio.currentTime = 0; }).catch(() => {});
  });
};
```

- [ ] **Step 3: Verify compilation**

```bash
npm run dev
```
Expected: no errors. Open `localhost:5173`, click "Enter Game" — DevTools Console should show no uncaught errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add playSfx helper and iOS audio unlock on Enter Game"
```

---

### Task 4: Replace new Audio() call sites — tap sounds and loseHeart

**Files:**
- Modify: `src/App.jsx` — lines ~997, ~1012, ~1079, ~1102, ~1110, ~1308

- [ ] **Step 1: Replace handleHenClick (line ~997)**

Replace:
```js
const sfx = new Audio(riotBeyonceTapSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(riotBeyonceTapSound);
```

- [ ] **Step 2: Replace triggerSakura (line ~1012)**

Replace:
```js
const sfx = new Audio(sakuraSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(sakuraSound);
```

- [ ] **Step 3: Replace butterfly tap (line ~1079)**

Replace:
```js
const sfx = new Audio(butterflyTapSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(butterflyTapSound);
```

- [ ] **Step 4: Replace bee tap (line ~1102)**

Replace:
```js
const sfx = new Audio(beeTapSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(beeTapSound);
```

- [ ] **Step 5: Replace woodlice tap (line ~1110)**

Replace:
```js
const sfx = new Audio(woodliceSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(woodliceSound);
```

- [ ] **Step 6: Replace loseHeart in loseLife (line ~1308)**

Replace:
```js
if (!isLastHeart) { const sfx = new Audio(loseHeartSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
```
With:
```js
if (!isLastHeart) { playSfx(loseHeartSound); }
```

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: replace new Audio() with playSfx for tap and heart sounds"
```

---

### Task 5: Replace new Audio() call sites — quest, nightmare, wakeUp

**Files:**
- Modify: `src/App.jsx` — lines ~1429, ~1443, ~1447

- [ ] **Step 1: Replace questSound (line ~1429)**

Replace:
```js
const sfx = new Audio(questSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(questSound);
```

- [ ] **Step 2: Replace nightmareSound (line ~1443)**

Replace:
```js
const sfx = new Audio(nightmareSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(nightmareSound);
```

- [ ] **Step 3: Replace wakeUpSound (line ~1447)**

Replace:
```js
const sfx = new Audio(wakeUpSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(wakeUpSound);
```

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: replace new Audio() with playSfx for quest/nightmare/wakeUp sounds"
```

---

### Task 6: Replace new Audio() call sites — gameplay SFX

**Files:**
- Modify: `src/App.jsx` — lines ~1520, ~1716–1717, ~1740, ~1758, ~1793, ~1797, ~1875–1877

- [ ] **Step 1: Replace pitchforkSound in CRAFT_SOIL (line ~1520)**

Replace:
```js
const sfx = new Audio(pitchforkSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(pitchforkSound);
```
(This is the first occurrence; do only this one in this step.)

- [ ] **Step 2: Replace magic and tossBin sounds (lines ~1716–1717)**

Replace:
```js
if ((heldItem.name || heldItem) === '✨ Magic') { const sfx = new Audio(magicSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
else { const sfx = new Audio(tossBinSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
```
With:
```js
if ((heldItem.name || heldItem) === '✨ Magic') { playSfx(magicSound); }
else { playSfx(tossBinSound); }
```

- [ ] **Step 3: Replace patDirtSound at cutting board (line ~1740)**

Replace:
```js
const sfx = new Audio(patDirtSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(patDirtSound);
```
(This is the chopping / cutting board occurrence.)

- [ ] **Step 4: Replace patDirtSound at prep station (line ~1758)**

Replace:
```js
const sfx = new Audio(patDirtSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(patDirtSound);
```
(This is the prep station / removing tape occurrence.)

- [ ] **Step 5: Replace wateringCanSound (line ~1793)**

Replace:
```js
const waterSfx = new Audio(wateringCanSound); waterSfx.volume = 1.0; waterSfx.play().catch(() => {});
```
With:
```js
playSfx(wateringCanSound);
```

- [ ] **Step 6: Replace pitchforkSound for aerating (line ~1797)**

Replace the second `new Audio(pitchforkSound)` occurrence (the aerating / MATCH_EXAMPLES one):
```js
const sfx = new Audio(pitchforkSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(pitchforkSound);
```

- [ ] **Step 7: Replace handlePerformPlotFix sounds (lines ~1875–1877)**

Replace:
```js
if (activePlot.id === 'compaction') { setIsStirring(true); const sfx = new Audio(pitchforkSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
if (activePlot.id === 'erosion') { const sfx = new Audio(patDirtSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
if (activePlot.id === 'drainage') { setIsWorking(true); const sfx = new Audio(hammerSound); sfx.volume = 1.0; sfx.play().catch(() => {}); }
```
With:
```js
if (activePlot.id === 'compaction') { setIsStirring(true); playSfx(pitchforkSound); }
if (activePlot.id === 'erosion') { playSfx(patDirtSound); }
if (activePlot.id === 'drainage') { setIsWorking(true); playSfx(hammerSound); }
```

- [ ] **Step 8: Replace frogTapSound (line ~2165)**

Replace:
```js
const sfx = new Audio(frogTapSound); sfx.volume = 1.0; sfx.play().catch(() => {});
```
With:
```js
playSfx(frogTapSound);
```

- [ ] **Step 9: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: replace new Audio() with playSfx for all gameplay SFX"
```

---

### Task 7: Update introAnxietyRef to use preloaded Audio

**Files:**
- Modify: `src/App.jsx` — line ~1459–1461

- [ ] **Step 1: Replace the new Audio() inside the introAnxiety useEffect**

Replace:
```js
if (!introAnxietyRef.current) {
  introAnxietyRef.current = new Audio(introAnxietySound);
  introAnxietyRef.current.loop = true;
}
```
With:
```js
if (!introAnxietyRef.current) {
  introAnxietyRef.current = preloadedSfx.current[introAnxietySound];
  introAnxietyRef.current.loop = true;
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```
Open `localhost:5173`. Navigate through TITLE → click "Enter Game" → proceed to INTRO/CLASS scenes. The intro anxiety ambient sound should start playing. Proceed through SLEEP_TRANSITION; it should stop.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: wire introAnxietyRef to preloaded Audio object"
```

---

### Task 8: Final end-to-end verification

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Smoke test in desktop browser**

Open `localhost:5173`. Click "Enter Game". Play through each scene and verify sounds fire:
- Tap the hen → RiotBeyonce tap sound
- Tap the frog → frog tap sound
- CRAFT_SOIL: toss items into bin → toss/magic sound; pitchfork on cauldron → pitchfork sound
- MATCH_EXAMPLES: chop veggies → pat dirt sound; water pile → watering can sound; aerate → pitchfork sound
- FIX_PLOTS: fix compaction → pitchfork; erosion → pat dirt; drainage → hammer
- Make a wrong answer → crow animation + lose heart sound (not on last heart)
- Lose all hearts → nightmare sound plays, lose heart sound does NOT play
- Complete dream → wow sound, quest sound, wake-up sound

- [ ] **Step 3: Verify no new Audio() calls remain (except oiia cat)**

```bash
grep -n "new Audio(" src/App.jsx
```
Expected: only the oiia cat sound line (`const audio = new Audio(oiiaCatSound)`) and the preload useEffect (`const audio = new Audio(url)`) remain.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "chore: verify audio resilience implementation complete"
```
