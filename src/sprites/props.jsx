import React from 'react';

export const TrashCanSprite = React.memo(() => (
  <svg viewBox="0 0 24 28" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Trash can */}
    <path d="M10,0 h4 v1 h-4 z M10,1 h1 v1 h-1 z M13,1 h1 v1 h-1 z" fill="#616161" />
    <path d="M11,1 h2 v1 h-2 z" fill="#9e9e9e" />
    <path d="M1,3 h22 v2 h-22 z" fill="#b0bec5" />
    <path d="M2,2 h20 v1 h-20 z M3,6 h3 v20 h-3 z M8,8 h1 v17 h-1 z M12,8 h1 v17 h-1 z M16,8 h1 v17 h-1 z" fill="#cfd8dc" />
    <path d="M6,6 h12 v2 h-12 z M6,8 h1 v17 h-1 z M9,8 h2 v17 h-2 z M13,8 h2 v17 h-2 z M17,8 h1 v17 h-1 z M6,25 h12 v1 h-12 z" fill="#90a4ae" />
    <path d="M1,5 h22 v1 h-22 z M18,6 h3 v20 h-3 z M7,8 h1 v17 h-1 z M11,8 h1 v17 h-1 z M15,8 h1 v17 h-1 z M3,26 h18 v1 h-18 z M4,27 h16 v1 h-16 z" fill="#607d8b" />
  </svg>
));

export const ScrapBucketSprite = React.memo(() => (
  <svg viewBox="0 0 20 18" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Scraps */}
    <path d="M5,0 h1 v1 h-1 z M4,1 h1 v1 h-1 z M7,1 h1 v1 h-1 z M3,2 h1 v1 h-1 z M5,2 h2 v1 h-2 z M8,9 h1 v2 h-1 z" fill="#66bb6a" />
    <path d="M6,0 h1 v1 h-1 z M5,1 h2 v1 h-2 z M4,2 h1 v1 h-1 z M9,9 h3 v1 h-3 z M10,10 h1 v1 h-1 z" fill="#2e7d32" />
    <path d="M8,1 h1 v1 h-1 z M7,2 h2 v1 h-2 z" fill="#ff9800" />
    <path d="M9,2 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M10,2 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M11,2 h1 v1 h-1 z" fill="#fbc02d" />
    <path d="M9,0 h1 v1 h-1 z M9,1 h2 v1 h-2 z" fill="#e53935" />
    {/* Kitchen caddy */}
    <path d="M2,4 h16 v1 h-16 z" fill="#43a047" />
    <path d="M2,3 h16 v1 h-16 z M3,5 h2 v12 h-2 z" fill="#81c784" />
    <path d="M5,5 h10 v3 h-10 z M5,8 h2 v4 h-2 z M13,8 h2 v4 h-2 z M5,12 h10 v5 h-10 z" fill="#388e3c" />
    <path d="M0,2 h1 v2 h-1 z M19,2 h1 v2 h-1 z M0,4 h2 v1 h-2 z M18,4 h2 v1 h-2 z M15,5 h2 v12 h-2 z M4,17 h12 v1 h-12 z" fill="#1b5e20" />
    <path d="M7,8 h6 v1 h-6 z M7,9 h1 v2 h-1 z M12,9 h1 v1 h-1 z M9,10 h1 v1 h-1 z M11,10 h2 v1 h-2 z M7,11 h6 v1 h-6 z" fill="#f1f8e9" />
  </svg>
));

export const WigglerSprite = React.memo(() => (
  <svg viewBox="0 0 10 3" className="w-full h-full" shapeRendering="crispEdges">
    {/* Red wiggler */}
    <path d="M7,0 h2 v1 h-2 z M0,1 h2 v1 h-2 z M3,1 h1 v1 h-1 z M6,1 h2 v1 h-2 z M9,1 h1 v1 h-1 z M0,2 h1 v1 h-1 z M3,2 h4 v1 h-4 z" fill="#e57373" />
    <path d="M1,0 h2 v1 h-2 z" fill="#ef9a9a" />
    <path d="M2,1 h1 v1 h-1 z M8,1 h1 v1 h-1 z M9,2 h1 v1 h-1 z" fill="#c62828" />
  </svg>
));

// Worm bin tote; `state` is the bedding inside: empty, dry (shredded paper), damp, or castings
export const WormBinSprite = React.memo(({ state = "empty" }) => (
  <svg viewBox="0 0 48 36" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {state === "empty" && <>
      {/* Tote */}
      <path d="M2,2 h44 v1 h-44 z M2,3 h1 v20 h-1 z M45,3 h1 v20 h-1 z M2,23 h44 v1 h-44 z" fill="#546e7a" />
      <path d="M0,0 h46 v2 h-46 z M0,2 h2 v22 h-2 z M0,24 h48 v1 h-48 z" fill="#78909c" />
      <path d="M46,0 h2 v24 h-2 z M0,35 h48 v1 h-48 z" fill="#37474f" />
      <path d="M0,25 h48 v1 h-48 z M0,26 h18 v2 h-18 z M30,26 h18 v2 h-18 z M0,28 h6 v1 h-6 z M7,28 h4 v1 h-4 z M12,28 h4 v1 h-4 z M17,28 h1 v1 h-1 z M30,28 h1 v1 h-1 z M32,28 h4 v1 h-4 z M37,28 h4 v1 h-4 z M42,28 h6 v1 h-6 z M0,29 h48 v2 h-48 z M0,31 h8 v1 h-8 z M9,31 h4 v1 h-4 z M14,31 h4 v1 h-4 z M19,31 h4 v1 h-4 z M24,31 h4 v1 h-4 z M29,31 h4 v1 h-4 z M34,31 h4 v1 h-4 z M39,31 h4 v1 h-4 z M44,31 h4 v1 h-4 z M0,32 h48 v3 h-48 z" fill="#455a64" />
      <path d="M6,28 h1 v1 h-1 z M11,28 h1 v1 h-1 z M16,28 h1 v1 h-1 z M31,28 h1 v1 h-1 z M36,28 h1 v1 h-1 z M41,28 h1 v1 h-1 z M8,31 h1 v1 h-1 z M13,31 h1 v1 h-1 z M18,31 h1 v1 h-1 z M23,31 h1 v1 h-1 z M28,31 h1 v1 h-1 z M33,31 h1 v1 h-1 z M38,31 h1 v1 h-1 z M43,31 h1 v1 h-1 z" fill="#263238" />
      <path d="M18,26 h12 v1 h-12 z M18,27 h1 v1 h-1 z M29,27 h1 v1 h-1 z M18,28 h12 v1 h-12 z" fill="#eceff1" />
      <path d="M19,27 h10 v1 h-10 z" fill="#f48fb1" />
      {/* Inside */}
      <path d="M3,5 h42 v18 h-42 z" fill="#263238" />
      <path d="M3,3 h42 v2 h-42 z" fill="#1c262b" />
    </>}
    {state === "dry" && <>
      {/* Tote */}
      <path d="M2,2 h44 v1 h-44 z M2,3 h1 v20 h-1 z M45,3 h1 v20 h-1 z M2,23 h44 v1 h-44 z" fill="#546e7a" />
      <path d="M0,0 h46 v2 h-46 z M0,2 h2 v22 h-2 z M0,24 h48 v1 h-48 z" fill="#78909c" />
      <path d="M46,0 h2 v24 h-2 z M0,35 h48 v1 h-48 z" fill="#37474f" />
      <path d="M0,25 h48 v1 h-48 z M0,26 h18 v2 h-18 z M30,26 h18 v2 h-18 z M0,28 h6 v1 h-6 z M7,28 h4 v1 h-4 z M12,28 h4 v1 h-4 z M17,28 h1 v1 h-1 z M30,28 h1 v1 h-1 z M32,28 h4 v1 h-4 z M37,28 h4 v1 h-4 z M42,28 h6 v1 h-6 z M0,29 h48 v2 h-48 z M0,31 h8 v1 h-8 z M9,31 h4 v1 h-4 z M14,31 h4 v1 h-4 z M19,31 h4 v1 h-4 z M24,31 h4 v1 h-4 z M29,31 h4 v1 h-4 z M34,31 h4 v1 h-4 z M39,31 h4 v1 h-4 z M44,31 h4 v1 h-4 z M0,32 h48 v3 h-48 z" fill="#455a64" />
      <path d="M6,28 h1 v1 h-1 z M11,28 h1 v1 h-1 z M16,28 h1 v1 h-1 z M31,28 h1 v1 h-1 z M36,28 h1 v1 h-1 z M41,28 h1 v1 h-1 z M8,31 h1 v1 h-1 z M13,31 h1 v1 h-1 z M18,31 h1 v1 h-1 z M23,31 h1 v1 h-1 z M28,31 h1 v1 h-1 z M33,31 h1 v1 h-1 z M38,31 h1 v1 h-1 z M43,31 h1 v1 h-1 z" fill="#263238" />
      <path d="M18,26 h12 v1 h-12 z M18,27 h1 v1 h-1 z M29,27 h1 v1 h-1 z M18,28 h12 v1 h-12 z" fill="#eceff1" />
      <path d="M19,27 h10 v1 h-10 z" fill="#f48fb1" />
      {/* Inside */}
      <path d="M3,3 h8 v1 h-8 z M12,3 h2 v1 h-2 z M15,3 h10 v1 h-10 z M26,3 h10 v1 h-10 z M37,3 h8 v1 h-8 z M7,4 h3 v1 h-3 z M14,4 h3 v1 h-3 z M21,4 h3 v1 h-3 z M28,4 h3 v1 h-3 z M35,4 h3 v1 h-3 z M42,4 h3 v2 h-3 z M3,5 h38 v1 h-38 z M3,6 h26 v1 h-26 z M31,6 h14 v1 h-14 z M3,7 h3 v1 h-3 z M10,7 h3 v1 h-3 z M17,7 h1 v1 h-1 z M19,7 h1 v1 h-1 z M24,7 h1 v1 h-1 z M26,7 h1 v1 h-1 z M31,7 h3 v1 h-3 z M38,7 h1 v1 h-1 z M3,8 h33 v1 h-33 z M37,8 h8 v1 h-8 z M3,9 h4 v1 h-4 z M8,9 h8 v1 h-8 z M17,9 h3 v1 h-3 z M21,9 h24 v1 h-24 z M7,10 h3 v1 h-3 z M14,10 h3 v1 h-3 z M21,10 h3 v1 h-3 z M28,10 h2 v1 h-2 z M35,10 h3 v1 h-3 z M42,10 h3 v1 h-3 z M3,11 h37 v1 h-37 z M41,11 h4 v1 h-4 z M3,12 h4 v1 h-4 z M8,12 h37 v1 h-37 z M3,13 h1 v1 h-1 z M5,13 h1 v1 h-1 z M10,13 h3 v1 h-3 z M17,13 h3 v1 h-3 z M24,13 h3 v1 h-3 z M32,13 h2 v1 h-2 z M38,13 h1 v1 h-1 z M40,13 h1 v1 h-1 z M3,14 h6 v2 h-6 z M10,14 h35 v1 h-35 z M10,15 h15 v1 h-15 z M26,15 h19 v1 h-19 z M7,16 h3 v1 h-3 z M14,16 h3 v1 h-3 z M21,16 h3 v1 h-3 z M28,16 h3 v1 h-3 z M35,16 h3 v1 h-3 z M42,16 h3 v1 h-3 z M3,17 h25 v1 h-25 z M29,17 h16 v1 h-16 z M3,18 h22 v1 h-22 z M26,18 h11 v1 h-11 z M38,18 h2 v1 h-2 z M41,18 h4 v1 h-4 z M3,19 h3 v1 h-3 z M10,19 h3 v1 h-3 z M17,19 h3 v1 h-3 z M24,19 h3 v1 h-3 z M31,19 h3 v1 h-3 z M38,19 h3 v1 h-3 z M3,20 h18 v1 h-18 z M22,20 h2 v1 h-2 z M25,20 h8 v1 h-8 z M34,20 h11 v1 h-11 z M4,21 h2 v1 h-2 z M8,21 h8 v1 h-8 z M17,21 h7 v1 h-7 z M25,21 h6 v1 h-6 z M32,21 h4 v1 h-4 z M37,21 h8 v1 h-8 z M7,22 h3 v1 h-3 z M14,22 h3 v1 h-3 z M21,22 h3 v1 h-3 z M28,22 h3 v1 h-3 z M35,22 h3 v1 h-3 z M42,22 h3 v1 h-3 z" fill="#eceff1" />
      <path d="M3,4 h4 v1 h-4 z M10,4 h4 v1 h-4 z M17,4 h4 v1 h-4 z M24,4 h4 v1 h-4 z M31,4 h4 v1 h-4 z M38,4 h4 v1 h-4 z M6,7 h4 v1 h-4 z M13,7 h4 v1 h-4 z M20,7 h4 v1 h-4 z M27,7 h4 v1 h-4 z M34,7 h4 v1 h-4 z M41,7 h4 v1 h-4 z M3,10 h4 v1 h-4 z M10,10 h4 v1 h-4 z M17,10 h4 v1 h-4 z M24,10 h4 v1 h-4 z M31,10 h4 v1 h-4 z M38,10 h4 v1 h-4 z M6,13 h4 v1 h-4 z M13,13 h4 v1 h-4 z M20,13 h4 v1 h-4 z M27,13 h4 v1 h-4 z M34,13 h4 v1 h-4 z M41,13 h4 v1 h-4 z M3,16 h4 v1 h-4 z M10,16 h4 v1 h-4 z M17,16 h4 v1 h-4 z M24,16 h4 v1 h-4 z M31,16 h4 v1 h-4 z M38,16 h4 v1 h-4 z M6,19 h4 v1 h-4 z M13,19 h4 v1 h-4 z M20,19 h4 v1 h-4 z M27,19 h4 v1 h-4 z M34,19 h4 v1 h-4 z M41,19 h4 v1 h-4 z M3,22 h4 v1 h-4 z M10,22 h4 v1 h-4 z M17,22 h4 v1 h-4 z M24,22 h4 v1 h-4 z M31,22 h4 v1 h-4 z M38,22 h4 v1 h-4 z" fill="#b0bec5" />
      <path d="M11,3 h1 v1 h-1 z M14,3 h1 v1 h-1 z M25,3 h1 v1 h-1 z M36,3 h1 v1 h-1 z M41,5 h1 v1 h-1 z M29,6 h2 v1 h-2 z M18,7 h1 v1 h-1 z M25,7 h1 v1 h-1 z M39,7 h2 v1 h-2 z M36,8 h1 v1 h-1 z M7,9 h1 v1 h-1 z M16,9 h1 v1 h-1 z M20,9 h1 v1 h-1 z M30,10 h1 v1 h-1 z M40,11 h1 v1 h-1 z M7,12 h1 v1 h-1 z M4,13 h1 v1 h-1 z M31,13 h1 v1 h-1 z M39,13 h1 v1 h-1 z M9,14 h1 v2 h-1 z M25,15 h1 v1 h-1 z M28,17 h1 v1 h-1 z M25,18 h1 v1 h-1 z M37,18 h1 v1 h-1 z M40,18 h1 v1 h-1 z M21,20 h1 v1 h-1 z M24,20 h1 v2 h-1 z M33,20 h1 v1 h-1 z M3,21 h1 v1 h-1 z M6,21 h2 v1 h-2 z M16,21 h1 v1 h-1 z M31,21 h1 v1 h-1 z M36,21 h1 v1 h-1 z" fill="#78909c" />
    </>}
    {state === "damp" && <>
      {/* Tote */}
      <path d="M2,2 h44 v1 h-44 z M2,3 h1 v20 h-1 z M45,3 h1 v20 h-1 z M2,23 h44 v1 h-44 z" fill="#546e7a" />
      <path d="M0,0 h46 v2 h-46 z M0,2 h2 v22 h-2 z M0,24 h48 v1 h-48 z" fill="#78909c" />
      <path d="M46,0 h2 v24 h-2 z M0,35 h48 v1 h-48 z" fill="#37474f" />
      <path d="M0,25 h48 v1 h-48 z M0,26 h18 v2 h-18 z M30,26 h18 v2 h-18 z M0,28 h6 v1 h-6 z M7,28 h4 v1 h-4 z M12,28 h4 v1 h-4 z M17,28 h1 v1 h-1 z M30,28 h1 v1 h-1 z M32,28 h4 v1 h-4 z M37,28 h4 v1 h-4 z M42,28 h6 v1 h-6 z M0,29 h48 v2 h-48 z M0,31 h8 v1 h-8 z M9,31 h4 v1 h-4 z M14,31 h4 v1 h-4 z M19,31 h4 v1 h-4 z M24,31 h4 v1 h-4 z M29,31 h4 v1 h-4 z M34,31 h4 v1 h-4 z M39,31 h4 v1 h-4 z M44,31 h4 v1 h-4 z M0,32 h48 v3 h-48 z" fill="#455a64" />
      <path d="M6,28 h1 v1 h-1 z M11,28 h1 v1 h-1 z M16,28 h1 v1 h-1 z M31,28 h1 v1 h-1 z M36,28 h1 v1 h-1 z M41,28 h1 v1 h-1 z M8,31 h1 v1 h-1 z M13,31 h1 v1 h-1 z M18,31 h1 v1 h-1 z M23,31 h1 v1 h-1 z M28,31 h1 v1 h-1 z M33,31 h1 v1 h-1 z M38,31 h1 v1 h-1 z M43,31 h1 v1 h-1 z" fill="#263238" />
      <path d="M18,26 h12 v1 h-12 z M18,27 h1 v1 h-1 z M29,27 h1 v1 h-1 z M18,28 h12 v1 h-12 z" fill="#eceff1" />
      <path d="M19,27 h10 v1 h-10 z" fill="#f48fb1" />
      {/* Inside */}
      <path d="M3,3 h3 v1 h-3 z M7,3 h20 v1 h-20 z M28,3 h1 v1 h-1 z M30,3 h1 v1 h-1 z M32,3 h13 v1 h-13 z M7,4 h3 v1 h-3 z M14,4 h3 v1 h-3 z M21,4 h3 v1 h-3 z M28,4 h3 v1 h-3 z M35,4 h3 v1 h-3 z M42,4 h3 v1 h-3 z M3,5 h4 v1 h-4 z M8,5 h37 v1 h-37 z M3,6 h42 v1 h-42 z M3,7 h3 v1 h-3 z M10,7 h3 v1 h-3 z M18,7 h2 v1 h-2 z M24,7 h3 v1 h-3 z M31,7 h3 v1 h-3 z M38,7 h3 v1 h-3 z M3,8 h17 v1 h-17 z M22,8 h23 v1 h-23 z M3,9 h28 v1 h-28 z M32,9 h6 v1 h-6 z M39,9 h6 v1 h-6 z M7,10 h3 v1 h-3 z M14,10 h3 v1 h-3 z M21,10 h3 v1 h-3 z M29,10 h1 v1 h-1 z M35,10 h3 v1 h-3 z M42,10 h3 v1 h-3 z M3,11 h7 v1 h-7 z M11,11 h1 v1 h-1 z M13,11 h7 v1 h-7 z M21,11 h18 v1 h-18 z M40,11 h5 v1 h-5 z M3,12 h8 v1 h-8 z M12,12 h10 v1 h-10 z M23,12 h3 v1 h-3 z M28,12 h14 v1 h-14 z M43,12 h2 v1 h-2 z M3,13 h3 v1 h-3 z M10,13 h3 v1 h-3 z M17,13 h3 v1 h-3 z M24,13 h3 v1 h-3 z M31,13 h3 v1 h-3 z M38,13 h3 v1 h-3 z M3,14 h1 v1 h-1 z M5,14 h40 v1 h-40 z M3,15 h10 v1 h-10 z M14,15 h28 v1 h-28 z M43,15 h2 v1 h-2 z M7,16 h1 v1 h-1 z M9,16 h1 v1 h-1 z M14,16 h3 v1 h-3 z M21,16 h3 v1 h-3 z M28,16 h3 v1 h-3 z M36,16 h2 v1 h-2 z M42,16 h1 v1 h-1 z M44,16 h1 v1 h-1 z M3,17 h31 v1 h-31 z M35,17 h10 v1 h-10 z M3,18 h17 v1 h-17 z M21,18 h7 v1 h-7 z M29,18 h16 v1 h-16 z M3,19 h3 v1 h-3 z M10,19 h3 v1 h-3 z M17,19 h3 v1 h-3 z M24,19 h3 v1 h-3 z M31,19 h3 v1 h-3 z M38,19 h3 v1 h-3 z M3,20 h8 v1 h-8 z M12,20 h29 v1 h-29 z M42,20 h3 v1 h-3 z M3,21 h21 v1 h-21 z M25,21 h2 v1 h-2 z M28,21 h7 v1 h-7 z M38,21 h7 v1 h-7 z M7,22 h3 v1 h-3 z M14,22 h3 v1 h-3 z M21,22 h3 v1 h-3 z M28,22 h3 v1 h-3 z M35,22 h3 v1 h-3 z M42,22 h3 v1 h-3 z" fill="#bcaaa4" />
      <path d="M3,4 h4 v1 h-4 z M10,4 h4 v1 h-4 z M17,4 h4 v1 h-4 z M24,4 h4 v1 h-4 z M31,4 h4 v1 h-4 z M38,4 h4 v1 h-4 z M6,7 h4 v1 h-4 z M13,7 h4 v1 h-4 z M20,7 h4 v1 h-4 z M27,7 h4 v1 h-4 z M34,7 h4 v1 h-4 z M41,7 h4 v1 h-4 z M3,10 h4 v1 h-4 z M10,10 h4 v1 h-4 z M17,10 h4 v1 h-4 z M24,10 h4 v1 h-4 z M31,10 h4 v1 h-4 z M38,10 h4 v1 h-4 z M6,13 h4 v1 h-4 z M13,13 h4 v1 h-4 z M20,13 h4 v1 h-4 z M27,13 h4 v1 h-4 z M34,13 h4 v1 h-4 z M41,13 h4 v1 h-4 z M3,16 h4 v1 h-4 z M10,16 h4 v1 h-4 z M17,16 h4 v1 h-4 z M24,16 h4 v1 h-4 z M31,16 h4 v1 h-4 z M38,16 h4 v1 h-4 z M6,19 h4 v1 h-4 z M13,19 h4 v1 h-4 z M20,19 h4 v1 h-4 z M27,19 h4 v1 h-4 z M34,19 h4 v1 h-4 z M41,19 h4 v1 h-4 z M3,22 h4 v1 h-4 z M10,22 h4 v1 h-4 z M17,22 h4 v1 h-4 z M24,22 h4 v1 h-4 z M31,22 h4 v1 h-4 z M38,22 h4 v1 h-4 z" fill="#a1887f" />
      <path d="M6,3 h1 v1 h-1 z M27,3 h1 v1 h-1 z M29,3 h1 v1 h-1 z M31,3 h1 v1 h-1 z M7,5 h1 v1 h-1 z M17,7 h1 v1 h-1 z M20,8 h2 v1 h-2 z M31,9 h1 v1 h-1 z M38,9 h1 v1 h-1 z M28,10 h1 v1 h-1 z M30,10 h1 v1 h-1 z M10,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M20,11 h1 v1 h-1 z M39,11 h1 v1 h-1 z M11,12 h1 v1 h-1 z M22,12 h1 v1 h-1 z M26,12 h2 v1 h-2 z M42,12 h1 v1 h-1 z M4,14 h1 v1 h-1 z M13,15 h1 v1 h-1 z M42,15 h1 v1 h-1 z M8,16 h1 v1 h-1 z M35,16 h1 v1 h-1 z M43,16 h1 v1 h-1 z M34,17 h1 v1 h-1 z M20,18 h1 v1 h-1 z M28,18 h1 v1 h-1 z M11,20 h1 v1 h-1 z M41,20 h1 v1 h-1 z M24,21 h1 v1 h-1 z M27,21 h1 v1 h-1 z M35,21 h3 v1 h-3 z" fill="#8d6e63" />
    </>}
    {state === "castings" && <>
      {/* Tote */}
      <path d="M2,2 h44 v1 h-44 z M2,3 h1 v20 h-1 z M45,3 h1 v20 h-1 z M2,23 h44 v1 h-44 z" fill="#546e7a" />
      <path d="M0,0 h46 v2 h-46 z M0,2 h2 v22 h-2 z M0,24 h48 v1 h-48 z" fill="#78909c" />
      <path d="M46,0 h2 v24 h-2 z M0,35 h48 v1 h-48 z" fill="#37474f" />
      <path d="M0,25 h48 v1 h-48 z M0,26 h18 v2 h-18 z M30,26 h18 v2 h-18 z M0,28 h6 v1 h-6 z M7,28 h4 v1 h-4 z M12,28 h4 v1 h-4 z M17,28 h1 v1 h-1 z M30,28 h1 v1 h-1 z M32,28 h4 v1 h-4 z M37,28 h4 v1 h-4 z M42,28 h6 v1 h-6 z M0,29 h48 v2 h-48 z M0,31 h8 v1 h-8 z M9,31 h4 v1 h-4 z M14,31 h4 v1 h-4 z M19,31 h4 v1 h-4 z M24,31 h4 v1 h-4 z M29,31 h4 v1 h-4 z M34,31 h4 v1 h-4 z M39,31 h4 v1 h-4 z M44,31 h4 v1 h-4 z M0,32 h48 v3 h-48 z" fill="#455a64" />
      <path d="M6,28 h1 v1 h-1 z M11,28 h1 v1 h-1 z M16,28 h1 v1 h-1 z M31,28 h1 v1 h-1 z M36,28 h1 v1 h-1 z M41,28 h1 v1 h-1 z M8,31 h1 v1 h-1 z M13,31 h1 v1 h-1 z M18,31 h1 v1 h-1 z M23,31 h1 v1 h-1 z M28,31 h1 v1 h-1 z M33,31 h1 v1 h-1 z M38,31 h1 v1 h-1 z M43,31 h1 v1 h-1 z" fill="#263238" />
      <path d="M18,26 h12 v1 h-12 z M18,27 h1 v1 h-1 z M29,27 h1 v1 h-1 z M18,28 h12 v1 h-12 z" fill="#eceff1" />
      <path d="M19,27 h10 v1 h-10 z" fill="#f48fb1" />
      {/* Inside */}
      <path d="M4,3 h1 v1 h-1 z M6,3 h3 v1 h-3 z M10,3 h1 v2 h-1 z M13,3 h1 v1 h-1 z M16,3 h3 v1 h-3 z M21,3 h1 v1 h-1 z M23,3 h2 v1 h-2 z M28,3 h1 v1 h-1 z M31,3 h2 v1 h-2 z M34,3 h5 v1 h-5 z M40,3 h1 v1 h-1 z M4,4 h3 v1 h-3 z M8,4 h1 v1 h-1 z M12,4 h1 v1 h-1 z M14,4 h4 v1 h-4 z M19,4 h7 v1 h-7 z M27,4 h2 v1 h-2 z M30,4 h2 v1 h-2 z M35,4 h1 v1 h-1 z M37,4 h3 v1 h-3 z M41,4 h4 v1 h-4 z M3,5 h4 v1 h-4 z M8,5 h9 v1 h-9 z M18,5 h2 v1 h-2 z M21,5 h3 v2 h-3 z M25,5 h8 v1 h-8 z M34,5 h4 v1 h-4 z M39,5 h3 v1 h-3 z M43,5 h2 v1 h-2 z M4,6 h2 v1 h-2 z M7,6 h9 v1 h-9 z M18,6 h1 v1 h-1 z M26,6 h6 v1 h-6 z M33,6 h2 v1 h-2 z M36,6 h2 v1 h-2 z M40,6 h3 v1 h-3 z M4,7 h6 v1 h-6 z M11,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M15,7 h1 v1 h-1 z M18,7 h2 v1 h-2 z M21,7 h2 v1 h-2 z M24,7 h2 v1 h-2 z M29,7 h1 v1 h-1 z M31,7 h1 v1 h-1 z M34,7 h6 v1 h-6 z M42,7 h1 v1 h-1 z M44,7 h1 v1 h-1 z M5,8 h2 v1 h-2 z M8,8 h1 v1 h-1 z M11,8 h2 v1 h-2 z M17,8 h3 v1 h-3 z M21,8 h1 v2 h-1 z M23,8 h2 v1 h-2 z M27,8 h3 v1 h-3 z M31,8 h2 v1 h-2 z M36,8 h4 v2 h-4 z M41,8 h4 v1 h-4 z M5,9 h6 v1 h-6 z M13,9 h5 v1 h-5 z M19,9 h1 v1 h-1 z M23,9 h1 v1 h-1 z M27,9 h2 v1 h-2 z M30,9 h2 v1 h-2 z M33,9 h2 v1 h-2 z M42,9 h1 v1 h-1 z M44,9 h1 v1 h-1 z M3,10 h2 v1 h-2 z M6,10 h2 v1 h-2 z M10,10 h1 v1 h-1 z M12,10 h4 v1 h-4 z M18,10 h10 v1 h-10 z M29,10 h3 v1 h-3 z M35,10 h9 v1 h-9 z M7,11 h6 v1 h-6 z M14,11 h1 v1 h-1 z M16,11 h2 v1 h-2 z M19,11 h3 v1 h-3 z M23,11 h6 v1 h-6 z M30,11 h4 v1 h-4 z M36,11 h1 v1 h-1 z M38,11 h2 v1 h-2 z M42,11 h1 v1 h-1 z M44,11 h1 v1 h-1 z M4,12 h1 v1 h-1 z M7,12 h1 v1 h-1 z M9,12 h4 v1 h-4 z M14,12 h3 v1 h-3 z M19,12 h8 v1 h-8 z M28,12 h8 v1 h-8 z M39,12 h6 v1 h-6 z M3,13 h1 v2 h-1 z M9,13 h3 v1 h-3 z M13,13 h1 v1 h-1 z M16,13 h2 v1 h-2 z M20,13 h4 v1 h-4 z M25,13 h1 v1 h-1 z M28,13 h3 v1 h-3 z M32,13 h3 v1 h-3 z M36,13 h2 v1 h-2 z M39,13 h4 v1 h-4 z M44,13 h1 v1 h-1 z M5,14 h2 v1 h-2 z M8,14 h5 v1 h-5 z M14,14 h11 v1 h-11 z M28,14 h4 v1 h-4 z M33,14 h1 v1 h-1 z M35,14 h1 v1 h-1 z M38,14 h4 v1 h-4 z M43,14 h2 v3 h-2 z M4,15 h1 v1 h-1 z M6,15 h1 v1 h-1 z M8,15 h3 v1 h-3 z M12,15 h8 v1 h-8 z M21,15 h3 v1 h-3 z M25,15 h1 v1 h-1 z M27,15 h1 v1 h-1 z M29,15 h3 v1 h-3 z M33,15 h3 v1 h-3 z M39,15 h1 v1 h-1 z M41,15 h1 v1 h-1 z M3,16 h1 v1 h-1 z M5,16 h1 v1 h-1 z M9,16 h1 v1 h-1 z M11,16 h1 v1 h-1 z M14,16 h2 v1 h-2 z M17,16 h3 v1 h-3 z M22,16 h2 v1 h-2 z M25,16 h5 v1 h-5 z M31,16 h1 v1 h-1 z M33,16 h1 v1 h-1 z M35,16 h4 v1 h-4 z M40,16 h2 v1 h-2 z M3,17 h3 v1 h-3 z M8,17 h1 v1 h-1 z M10,17 h8 v1 h-8 z M19,17 h2 v1 h-2 z M22,17 h3 v1 h-3 z M26,17 h1 v1 h-1 z M28,17 h2 v1 h-2 z M32,17 h1 v1 h-1 z M34,17 h4 v1 h-4 z M39,17 h3 v1 h-3 z M44,17 h1 v1 h-1 z M3,18 h1 v2 h-1 z M5,18 h4 v1 h-4 z M10,18 h1 v1 h-1 z M12,18 h2 v1 h-2 z M16,18 h6 v1 h-6 z M24,18 h1 v1 h-1 z M26,18 h2 v1 h-2 z M29,18 h4 v1 h-4 z M34,18 h3 v1 h-3 z M38,18 h6 v1 h-6 z M6,19 h11 v1 h-11 z M18,19 h2 v1 h-2 z M21,19 h1 v1 h-1 z M23,19 h6 v1 h-6 z M30,19 h1 v1 h-1 z M32,19 h4 v1 h-4 z M38,19 h1 v1 h-1 z M40,19 h4 v1 h-4 z M3,20 h11 v1 h-11 z M17,20 h3 v1 h-3 z M22,20 h3 v1 h-3 z M26,20 h1 v1 h-1 z M28,20 h3 v1 h-3 z M32,20 h6 v1 h-6 z M39,20 h4 v1 h-4 z M44,20 h1 v1 h-1 z M5,21 h4 v2 h-4 z M12,21 h2 v1 h-2 z M15,21 h2 v1 h-2 z M20,21 h2 v1 h-2 z M24,21 h5 v1 h-5 z M30,21 h3 v1 h-3 z M35,21 h1 v1 h-1 z M37,21 h7 v1 h-7 z M3,22 h1 v1 h-1 z M10,22 h1 v1 h-1 z M12,22 h1 v1 h-1 z M16,22 h2 v1 h-2 z M19,22 h2 v1 h-2 z M23,22 h2 v1 h-2 z M26,22 h3 v1 h-3 z M31,22 h5 v1 h-5 z M37,22 h1 v1 h-1 z M39,22 h1 v1 h-1 z M44,22 h1 v1 h-1 z" fill="#3e2723" />
      <path d="M3,3 h1 v2 h-1 z M5,3 h1 v1 h-1 z M9,3 h1 v2 h-1 z M11,3 h2 v1 h-2 z M14,3 h2 v1 h-2 z M19,3 h2 v1 h-2 z M22,3 h1 v1 h-1 z M25,3 h1 v1 h-1 z M27,3 h1 v1 h-1 z M29,3 h2 v1 h-2 z M33,3 h1 v1 h-1 z M41,3 h1 v1 h-1 z M43,3 h1 v1 h-1 z M7,4 h1 v2 h-1 z M11,4 h1 v1 h-1 z M13,4 h1 v1 h-1 z M18,4 h1 v1 h-1 z M29,4 h1 v1 h-1 z M32,4 h1 v1 h-1 z M34,4 h1 v1 h-1 z M36,4 h1 v1 h-1 z M40,4 h1 v1 h-1 z M17,5 h1 v1 h-1 z M20,5 h1 v1 h-1 z M24,5 h1 v2 h-1 z M33,5 h1 v1 h-1 z M38,5 h1 v1 h-1 z M42,5 h1 v1 h-1 z M3,6 h1 v2 h-1 z M6,6 h1 v1 h-1 z M16,6 h1 v1 h-1 z M32,6 h1 v1 h-1 z M35,6 h1 v1 h-1 z M39,6 h1 v1 h-1 z M44,6 h1 v1 h-1 z M10,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M16,7 h2 v1 h-2 z M23,7 h1 v1 h-1 z M26,7 h3 v1 h-3 z M30,7 h1 v2 h-1 z M33,7 h1 v1 h-1 z M40,7 h1 v2 h-1 z M43,7 h1 v1 h-1 z M3,8 h2 v2 h-2 z M7,8 h1 v1 h-1 z M9,8 h2 v1 h-2 z M13,8 h4 v1 h-4 z M20,8 h1 v1 h-1 z M22,8 h1 v2 h-1 z M25,8 h1 v1 h-1 z M34,8 h2 v1 h-2 z M11,9 h2 v1 h-2 z M24,9 h3 v1 h-3 z M29,9 h1 v1 h-1 z M32,9 h1 v1 h-1 z M35,9 h1 v1 h-1 z M41,9 h1 v1 h-1 z M43,9 h1 v1 h-1 z M8,10 h1 v1 h-1 z M11,10 h1 v1 h-1 z M16,10 h2 v1 h-2 z M33,10 h2 v1 h-2 z M44,10 h1 v1 h-1 z M4,11 h3 v1 h-3 z M13,11 h1 v2 h-1 z M15,11 h1 v1 h-1 z M18,11 h1 v1 h-1 z M22,11 h1 v1 h-1 z M29,11 h1 v1 h-1 z M34,11 h1 v1 h-1 z M37,11 h1 v1 h-1 z M40,11 h2 v1 h-2 z M43,11 h1 v1 h-1 z M3,12 h1 v1 h-1 z M5,12 h2 v1 h-2 z M17,12 h2 v1 h-2 z M27,12 h1 v1 h-1 z M36,12 h1 v1 h-1 z M38,12 h1 v2 h-1 z M6,13 h3 v1 h-3 z M12,13 h1 v1 h-1 z M14,13 h2 v1 h-2 z M18,13 h2 v1 h-2 z M24,13 h1 v1 h-1 z M26,13 h2 v1 h-2 z M31,13 h1 v1 h-1 z M35,13 h1 v1 h-1 z M43,13 h1 v1 h-1 z M7,14 h1 v2 h-1 z M26,14 h1 v2 h-1 z M37,14 h1 v1 h-1 z M42,14 h1 v3 h-1 z M3,15 h1 v1 h-1 z M5,15 h1 v1 h-1 z M24,15 h1 v2 h-1 z M28,15 h1 v1 h-1 z M32,15 h1 v2 h-1 z M36,15 h3 v1 h-3 z M40,15 h1 v1 h-1 z M6,16 h3 v1 h-3 z M10,16 h1 v1 h-1 z M12,16 h2 v1 h-2 z M16,16 h1 v1 h-1 z M20,16 h2 v1 h-2 z M30,16 h1 v1 h-1 z M34,16 h1 v1 h-1 z M39,16 h1 v1 h-1 z M6,17 h2 v1 h-2 z M9,17 h1 v2 h-1 z M18,17 h1 v1 h-1 z M21,17 h1 v1 h-1 z M25,17 h1 v2 h-1 z M30,17 h2 v1 h-2 z M33,17 h1 v2 h-1 z M38,17 h1 v1 h-1 z M43,17 h1 v1 h-1 z M4,18 h1 v1 h-1 z M11,18 h1 v1 h-1 z M14,18 h2 v1 h-2 z M22,18 h2 v1 h-2 z M28,18 h1 v1 h-1 z M37,18 h1 v2 h-1 z M44,18 h1 v2 h-1 z M5,19 h1 v1 h-1 z M17,19 h1 v1 h-1 z M29,19 h1 v1 h-1 z M39,19 h1 v1 h-1 z M14,20 h3 v1 h-3 z M20,20 h2 v1 h-2 z M25,20 h1 v1 h-1 z M27,20 h1 v1 h-1 z M31,20 h1 v1 h-1 z M38,20 h1 v1 h-1 z M43,20 h1 v1 h-1 z M3,21 h1 v1 h-1 z M11,21 h1 v2 h-1 z M14,21 h1 v1 h-1 z M18,21 h1 v1 h-1 z M22,21 h2 v1 h-2 z M29,21 h1 v1 h-1 z M33,21 h2 v1 h-2 z M44,21 h1 v1 h-1 z M4,22 h1 v1 h-1 z M9,22 h1 v1 h-1 z M14,22 h2 v1 h-2 z M21,22 h2 v1 h-2 z M25,22 h1 v1 h-1 z M29,22 h2 v1 h-2 z M36,22 h1 v1 h-1 z M38,22 h1 v1 h-1 z M40,22 h2 v1 h-2 z" fill="#4e342e" />
      <path d="M26,3 h1 v2 h-1 z M39,3 h1 v1 h-1 z M42,3 h1 v1 h-1 z M44,3 h1 v1 h-1 z M33,4 h1 v1 h-1 z M17,6 h1 v1 h-1 z M19,6 h2 v1 h-2 z M25,6 h1 v1 h-1 z M38,6 h1 v1 h-1 z M43,6 h1 v1 h-1 z M14,7 h1 v1 h-1 z M20,7 h1 v1 h-1 z M32,7 h1 v1 h-1 z M41,7 h1 v1 h-1 z M26,8 h1 v1 h-1 z M33,8 h1 v1 h-1 z M18,9 h1 v1 h-1 z M20,9 h1 v1 h-1 z M40,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M9,10 h1 v1 h-1 z M28,10 h1 v1 h-1 z M32,10 h1 v1 h-1 z M3,11 h1 v1 h-1 z M35,11 h1 v1 h-1 z M8,12 h1 v1 h-1 z M37,12 h1 v1 h-1 z M4,13 h2 v1 h-2 z M4,14 h1 v1 h-1 z M13,14 h1 v1 h-1 z M25,14 h1 v1 h-1 z M27,14 h1 v1 h-1 z M32,14 h1 v1 h-1 z M34,14 h1 v1 h-1 z M36,14 h1 v1 h-1 z M11,15 h1 v1 h-1 z M20,15 h1 v1 h-1 z M4,16 h1 v1 h-1 z M27,17 h1 v1 h-1 z M42,17 h1 v1 h-1 z M4,19 h1 v1 h-1 z M20,19 h1 v1 h-1 z M22,19 h1 v1 h-1 z M31,19 h1 v1 h-1 z M36,19 h1 v1 h-1 z M4,21 h1 v1 h-1 z M9,21 h2 v1 h-2 z M17,21 h1 v1 h-1 z M19,21 h1 v1 h-1 z M36,21 h1 v1 h-1 z M13,22 h1 v1 h-1 z M18,22 h1 v1 h-1 z M42,22 h2 v1 h-2 z" fill="#6d4c41" />
    </>}
  </svg>
));

// Jack-o'-lantern that sits on the compost at Halloween; `lit={false}` leaves its face dark (the title lights them on tap)
export const PumpkinSprite = React.memo(({ lit = true }) => (
  <svg viewBox="0 0 16 14" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M7,0 h2 v3 h-2 z" fill="#6d4c41" />
    <path d="M8,0 h1 v2 h-1 z" fill="#8d6e63" />
    <path d="M9,1 h3 v1 h-3 z M10,2 h2 v1 h-2 z" fill="#7cb342" />
    <path d="M4,3 h8 v1 h-8 z M2,4 h12 v1 h-12 z M1,5 h14 v6 h-14 z M2,11 h12 v1 h-12 z M4,12 h8 v1 h-8 z" fill="#fb8c00" />
    <path d="M5,4 h1 v8 h-1 z M10,4 h1 v8 h-1 z" fill="#ef6c00" />
    <path d="M1,5 h1 v6 h-1 z M2,11 h2 v1 h-2 z M4,12 h8 v1 h-8 z" fill="#e65100" />
    <path d="M11,4 h2 v1 h-2 z M12,5 h1 v3 h-1 z" fill="#ffb74d" />
    {/* Face: glowing when lit, dark hollows when not */}
    <path d="M4,6 h1 v1 h-1 z M3,7 h2 v1 h-2 z M11,6 h1 v1 h-1 z M11,7 h2 v1 h-2 z M7,8 h2 v1 h-2 z M3,9 h10 v1 h-10 z M4,10 h8 v1 h-8 z" fill={lit ? '#ffd54f' : '#4e342e'} />
    <path d="M4,10 h8 v1 h-8 z" fill={lit ? '#ffb300' : '#3e2723'} />
    <path d="M6,9 h1 v1 h-1 z M9,10 h1 v1 h-1 z" fill="#fb8c00" />
  </svg>
));

// Wrapped present that sits on the compost at Christmas
export const PresentSprite = React.memo(() => (
  <svg viewBox="0 0 16 14" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bow */}
    <path d="M4,0 h3 v1 h-3 z M3,1 h1 v2 h-1 z M6,1 h1 v2 h-1 z M9,0 h3 v1 h-3 z M9,1 h1 v2 h-1 z M12,1 h1 v2 h-1 z" fill="#66bb6a" />
    <path d="M7,1 h2 v2 h-2 z" fill="#2e7d32" />
    {/* Lid and box */}
    <path d="M0,3 h16 v3 h-16 z M1,6 h14 v8 h-14 z" fill="#e53935" />
    <path d="M0,3 h16 v1 h-16 z M13,7 h1 v3 h-1 z" fill="#ff8a80" />
    <path d="M0,5 h16 v1 h-16 z M1,6 h1 v8 h-1 z M1,13 h14 v1 h-14 z" fill="#c62828" />
    {/* Ribbon */}
    <path d="M7,3 h2 v11 h-2 z" fill="#43a047" />
    <path d="M7,5 h2 v1 h-2 z M7,13 h2 v1 h-2 z" fill="#2e7d32" />
    <path d="M8,3 h1 v1 h-1 z" fill="#81c784" />
  </svg>
));

// Papel picado garland strung across the title at Día de los Muertos
const PICADO_COLORS = [['#ec407a', '#c2185b'], ['#ff9800', '#e65100'], ['#26c6da', '#00838f'], ['#ab47bc', '#7b1fa2'], ['#66bb6a', '#2e7d32']];
export const PapelPicadoSprite = React.memo(() => (
  <svg viewBox="0 0 62 14" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <path d="M0,1 h62 v1 h-62 z" fill="#8d6e63" />
    {PICADO_COLORS.map(([base, shade], i) => {
      const x = 2 + i * 12;
      return (
        <g key={base}>
          {/* Flag with a zigzag hem and cut-out holes */}
          <path fillRule="evenodd" fill={base} d={`M${x},2 h10 v9 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-2 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 z M${x + 4},4 h2 v2 h-2 z M${x + 2},7 h1 v1 h-1 z M${x + 7},7 h1 v1 h-1 z M${x + 4},8 h2 v1 h-2 z`} />
          <path d={`M${x},2 h1 v9 h-1 z`} fill={shade} />
        </g>
      );
    })}
  </svg>
));
