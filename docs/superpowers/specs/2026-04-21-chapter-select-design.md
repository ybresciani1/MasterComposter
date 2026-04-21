# Chapter Select — Design Spec
Date: 2026-04-21

## Overview

Add a "Chapter Select" option to the title screen that lets players skip directly to any dream stage without playing through the intro and classroom sequences.

## Title Screen Changes

Add a "Chapter Select" button directly below the "New Game" button. It uses the same brown pixel style as the existing music toggle (`bg-[#8b5a2b]` with `border-b-4 border-[#3e2723]`). Clicking it sets `isChapterSelectOpen` to `true`.

## Modal

Renders when `isChapterSelectOpen === true`. Reuses the existing overlay pattern:

```
fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm
```

Inside a `PixelBox`: a "Select Chapter" heading, five chapter buttons, and a cancel link at the bottom that sets `isChapterSelectOpen` to `false`.

## Chapters

| Label | `dreamStage` |
|---|---|
| 🌙 The Dream | `INTRO_DIALOG` |
| 🪣 Craft Soil | `CRAFT_SOIL` |
| 🔄 Match Examples | `MATCH_EXAMPLES` |
| 🛠️ Fix Plots | `FIX_PLOTS` |
| 🌱 Plant Seeds | `PLANT_SEEDS` |

## Jump Logic

A single `jumpToChapter(stage)` helper handles all chapters:

1. Full state reset (identical to "Play Again": clears cauldron, completedExamples, fixedPlots, activePlot, plotItems, isFixModalOpen, appliedItems, plantedBeds, matchPhase, combinedBins, dialogIndex)
2. Sets `dreamStage` to the target stage
3. Sets `gameState` to `'DREAM'`
4. Sets `audioDismissed` to `true` (user clicked deliberately — skip the audio prompt)
5. Calls `playAudio()`
6. Closes the modal (`isChapterSelectOpen` to `false`)

## State Changes

- Add `isChapterSelectOpen` (`useState(false)`) alongside existing state declarations.
- No other state structure changes.

## Scope

- ~1 new `useState`
- 1 new `jumpToChapter` helper function (~10 lines)
- ~30 lines of JSX for the modal
- No changes to game logic, only title screen and a new modal
