# Audio Resilience — Design Spec
**Date:** 2026-04-27

## Problem

Users on mobile (iOS/Android) and desktop occasionally report sounds not playing. Two root causes:

1. **Network latency on first play** — all SFX are `new Audio(url)` at play time, so the browser must download the file before it can play. On slow connections the file isn't ready and the sound is silently dropped.
2. **iOS autoplay block on delayed plays** — iOS Safari only allows `.play()` calls made directly within a user gesture call stack. Sounds triggered via `setTimeout` (e.g., the 1700ms crow grab) are outside that window and silently blocked.

Background music and the wow sound already use `<audio preload="auto">` elements — they are not affected.

## Approach

**Preload + iOS unlock (Approach B).** Preload all SFX Audio objects on mount, unlock them on the "Enter Game" gesture, and replace scattered `new Audio()` calls with a shared `playSfx()` helper. No architectural change to the Web Audio API or AudioContext layer.

## Design

### 1. Preloading

A `SOUND_URLS` array collects all SFX constants (all module-level sound URL constants except `backgroundMusic` and `wowSound`, which are already handled by `<audio>` elements with `preload="auto"`).

On component mount, a `useEffect` iterates `SOUND_URLS`, creates one `Audio` object per URL, calls `.load()`, and stores each in a `useRef` map (`preloadedSfx: { [url]: Audio }`). This triggers browser download and caching before any sound is needed.

### 2. iOS Unlock

The "Enter Game" button click handler already calls `playAudio()` — this is the user gesture window. We extend it to also loop through every `Audio` object in `preloadedSfx` and call:

```js
audio.volume = 0;
audio.play().then(() => { audio.pause(); audio.currentTime = 0; }).catch(() => {});
```

This registers each element as gesture-permitted in iOS Safari. The unlock runs silently; per-element errors are swallowed.

### 3. Playback Helper

A `playSfx(url)` function replaces all scattered `new Audio(url); sfx.volume = 1.0; sfx.play().catch(() => {})` patterns:

```js
const playSfx = (url) => {
  const sfx = preloadedSfx.current[url];
  if (!sfx) return;
  sfx.currentTime = 0;
  sfx.volume = 1.0;
  sfx.play().catch(() => {});
};
```

Resetting `currentTime` before play ensures rapid re-plays of the same sound work correctly. All call sites in App.jsx are updated to use `playSfx(url)`.

**Exception:** The oiia cat sound keeps its custom `AudioContext` + analyser node logic untouched — it needs the analyser for the visual bouncing effect and already handles its own unlock via `audioCtx.resume()`.

## Out of Scope

- Web Audio API refactor (Approach C)
- Retry logic
- User-visible error indicators for failed sounds
- Any changes to background music or wow sound playback
