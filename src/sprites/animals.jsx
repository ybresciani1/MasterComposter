import React from 'react';

export const CrowSprite = React.memo(({ hasHeart = true }) => (
  <svg viewBox="0 0 64 40" className="w-full h-full drop-shadow-lg" shapeRendering="crispEdges">
    {/* Wing (matches body color, scaleY flap around SVG center) */}
    <g className="animate-crow-flap" style={{ transformOrigin: '28px 20px' }}>
      {/* Wing */}
      <path d="M28,0 h2 v1 h-2 z M27,1 h4 v1 h-4 z M26,2 h6 v1 h-6 z M25,3 h8 v1 h-8 z M24,4 h9 v1 h-9 z M23,5 h10 v1 h-10 z M22,6 h12 v1 h-12 z M22,7 h13 v1 h-13 z M21,8 h14 v1 h-14 z M21,9 h15 v1 h-15 z M20,10 h17 v1 h-17 z M20,11 h18 v1 h-18 z M20,12 h19 v1 h-19 z M20,13 h20 v1 h-20 z M21,14 h20 v1 h-20 z M22,15 h18 v1 h-18 z" fill="#0c0e14" />
      <path d="M33,4 h1 v1 h-1 z M33,5 h2 v1 h-2 z M34,6 h1 v1 h-1 z M35,7 h1 v1 h-1 z M35,8 h2 v1 h-2 z M36,9 h2 v1 h-2 z M37,10 h1 v1 h-1 z M38,11 h1 v1 h-1 z M39,12 h1 v1 h-1 z" fill="#1a3040" />
    </g>
    {/* Body, tail & head */}
    <path d="M40,13 h5 v1 h-5 z M38,14 h12 v1 h-12 z M10,15 h5 v1 h-5 z M36,15 h17 v1 h-17 z M8,16 h8 v1 h-8 z M20,16 h37 v1 h-37 z M8,17 h45 v1 h-45 z M8,18 h41 v1 h-41 z M8,19 h3 v1 h-3 z M13,19 h36 v1 h-36 z M8,20 h4 v1 h-4 z M14,20 h40 v1 h-40 z M8,21 h47 v1 h-47 z M8,22 h48 v1 h-48 z M9,23 h43 v1 h-43 z M10,24 h38 v1 h-38 z M12,25 h28 v1 h-28 z M14,26 h12 v1 h-12 z" fill="#0c0e14" />
    <path d="M53,17 h6 v1 h-6 z M49,18 h11 v1 h-11 z M49,19 h13 v1 h-13 z M54,20 h9 v1 h-9 z M55,21 h6 v1 h-6 z" fill="#1a3040" />
    {/* Beak, eye & legs */}
    <path d="M4,18 h4 v1 h-4 z M5,19 h3 v1 h-3 z M6,20 h2 v1 h-2 z M30,26 h2 v1 h-2 z M36,26 h2 v1 h-2 z M31,27 h2 v1 h-2 z M37,27 h2 v1 h-2 z M32,28 h3 v1 h-3 z M38,28 h3 v1 h-3 z" fill="#e8b820" />
    <path d="M11,19 h2 v1 h-2 z M12,20 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M13,20 h1 v1 h-1 z" fill="#000000" />
    {/* Heart in beak */}
    {hasHeart && <>
      {/* Heart */}
      <path d="M0,14 h2 v1 h-2 z M3,14 h2 v1 h-2 z M0,15 h1 v1 h-1 z M2,15 h4 v1 h-4 z M0,16 h6 v1 h-6 z M1,17 h4 v1 h-4 z M2,18 h2 v1 h-2 z" fill="#e53935" />
      <path d="M1,15 h1 v1 h-1 z" fill="#ffcdd2" />
    </>}
  </svg>
));

export const PolishHenSprite = React.memo(({ name, flipping = false }) => {
  const isRiot = name === 'Riot';
  
  // Riot is a Buff Laced Polish (Gold/Buff body, White lacing)
  // Beyonce is a Golden Laced Polish (Black body, Copper/Gold lacing)
  const baseColor = isRiot ? "#fbc02d" : "#1a1a1a"; 
  const laceColor1 = isRiot ? "#ffffff" : "#d84315"; 
  const laceColor2 = isRiot ? "#fff9c4" : "#ff9800"; 
  const legColor = "#78909c"; 
  const beakColor = isRiot ? "#d7ccc8" : "#90a4ae";

  return (
    <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
      {/* Legs */}
      <path d="M6,13 h1 v3 h-1 z M10,13 h1 v3 h-1 z M5,15 h2 v1 h-2 z M9,15 h2 v1 h-2 z" fill={legColor} />
      
      {/* Tail Base */}
      <path d="M1,2 h4 v8 h-4 z M0,3 h2 v6 h-2 z M4,1 h2 v4 h-2 z" fill={baseColor} />
      {/* Tail Lacing */}
      <path d="M2,3 h1 v6 h-1 z M4,3 h1 v5 h-1 z M1,4 h1 v4 h-1 z M5,2 h1 v3 h-1 z" fill={laceColor1} />
      
      {/* Body Base */}
      <path d="M3,8 h9 v5 h-9 z M4,13 h7 v1 h-7 z M10,7 h2 v2 h-2 z" fill={baseColor} />
      {/* Body Feathers / Lacing */}
      <path d="M4,9 h1 v1 h-1 z M6,9 h1 v1 h-1 z M8,9 h1 v1 h-1 z M10,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M7,10 h1 v1 h-1 z M9,10 h1 v1 h-1 z M11,10 h1 v1 h-1 z M4,11 h1 v1 h-1 z M6,11 h1 v1 h-1 z M8,11 h1 v1 h-1 z M10,11 h1 v1 h-1 z M5,12 h1 v1 h-1 z M7,12 h1 v1 h-1 z M9,12 h1 v1 h-1 z" fill={laceColor1} />
      
      {/* Neck */}
      <path d="M8,5 h4 v4 h-4 z" fill={baseColor} />
      
      {/* Beak & Wattle */}
      <path d="M13,6 h2 v1 h-2 z M14,7 h1 v1 h-1 z" fill={beakColor} />
      <path d="M12,7 h1 v1 h-1 z" fill="#d32f2f" />
      
      {/* Crest wrapped so it can do a hair flip */}
      <g className={flipping ? 'hen-crest-flip' : undefined}>
        {/* Giant Crest (Poof) Base */}
        <path d="M7,1 h6 v5 h-6 z M8,0 h4 v1 h-4 z M6,2 h2 v4 h-2 z M13,2 h2 v3 h-2 z M12,1 h2 v1 h-2 z" fill={baseColor} />
        {/* Giant Crest Lacing/Feather Details */}
        <path d="M9,1 h1 v1 h-1 z M11,1 h1 v1 h-1 z M8,2 h1 v1 h-1 z M10,2 h1 v1 h-1 z M12,2 h1 v1 h-1 z M7,3 h1 v1 h-1 z M9,3 h1 v1 h-1 z M11,3 h1 v1 h-1 z M13,3 h1 v1 h-1 z M8,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z M12,4 h1 v1 h-1 z M14,4 h1 v1 h-1 z M7,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z M11,5 h1 v1 h-1 z M6,4 h1 v1 h-1 z" fill={laceColor2} />
        <path d="M10,0 h1 v1 h-1 z M8,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z M11,2 h1 v1 h-1 z M13,2 h1 v1 h-1 z M10,3 h1 v1 h-1 z M12,3 h1 v1 h-1 z M9,4 h1 v1 h-1 z M11,4 h1 v1 h-1 z M8,5 h1 v1 h-1 z M10,5 h1 v1 h-1 z" fill={laceColor1} />
      </g>

      {/* Eye */}
      <path d="M12,5 h1 v1 h-1 z" fill="#000000" />
    </svg>
  );
});

export const CowSprite = React.memo(() => (
  <svg viewBox="0 0 48 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hide */}
    <path d="M5,4 h1 v1 h-1 z M2,5 h4 v1 h-4 z M9,5 h3 v1 h-3 z M2,6 h10 v1 h-10 z M2,7 h2 v1 h-2 z M5,7 h4 v1 h-4 z M10,7 h2 v2 h-2 z M14,7 h29 v1 h-29 z M2,8 h1 v1 h-1 z M5,8 h3 v1 h-3 z M14,8 h3 v1 h-3 z M23,8 h21 v1 h-21 z M2,9 h10 v1 h-10 z M14,9 h2 v1 h-2 z M24,9 h20 v1 h-20 z M2,10 h14 v2 h-14 z M24,10 h8 v1 h-8 z M39,10 h5 v1 h-5 z M24,11 h7 v2 h-7 z M40,11 h4 v7 h-4 z M12,12 h4 v2 h-4 z M27,13 h4 v5 h-4 z M12,14 h6 v2 h-6 z M6,16 h12 v2 h-12 z M6,18 h5 v1 h-5 z M14,18 h4 v1 h-4 z M27,18 h7 v1 h-7 z M39,18 h5 v3 h-5 z M6,19 h4 v2 h-4 z M14,19 h5 v1 h-5 z M26,19 h8 v1 h-8 z M13,20 h21 v1 h-21 z M8,24 h3 v6 h-3 z M16,24 h3 v6 h-3 z M32,24 h3 v6 h-3 z M40,24 h3 v6 h-3 z" fill="#ffffff" />
    <path d="M0,7 h2 v3 h-2 z M12,7 h2 v3 h-2 z M44,10 h2 v11 h-2 z M6,21 h40 v1 h-40 z M6,22 h38 v1 h-38 z M6,23 h20 v1 h-20 z M33,23 h11 v1 h-11 z M11,24 h1 v6 h-1 z M19,24 h1 v6 h-1 z M35,24 h1 v6 h-1 z M43,24 h1 v6 h-1 z" fill="#e0e0e0" />
    <path d="M6,4 h3 v2 h-3 z M4,7 h1 v1 h-1 z M9,7 h1 v1 h-1 z M3,8 h2 v1 h-2 z M8,8 h2 v1 h-2 z M17,8 h6 v1 h-6 z M16,9 h8 v4 h-8 z M32,10 h7 v1 h-7 z M31,11 h9 v7 h-9 z M16,13 h11 v1 h-11 z M18,14 h9 v5 h-9 z M11,18 h3 v1 h-3 z M34,18 h5 v3 h-5 z M10,19 h4 v1 h-4 z M19,19 h7 v1 h-7 z M10,20 h3 v1 h-3 z M44,22 h3 v3 h-3 z M8,30 h4 v2 h-4 z M16,30 h4 v2 h-4 z M32,30 h4 v2 h-4 z M40,30 h4 v2 h-4 z" fill="#212121" />
    {/* Muzzle & udder */}
    <path d="M2,12 h10 v1 h-10 z M2,13 h2 v1 h-2 z M5,13 h4 v1 h-4 z M10,13 h2 v1 h-2 z M2,14 h10 v1 h-10 z M26,23 h7 v1 h-7 z M26,24 h6 v2 h-6 z M27,26 h1 v1 h-1 z M31,26 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M4,13 h1 v1 h-1 z M9,13 h1 v1 h-1 z M2,15 h10 v1 h-10 z" fill="#ec407a" />
    {/* Horns */}
    <path d="M4,2 h1 v1 h-1 z M9,2 h1 v1 h-1 z M3,3 h2 v2 h-2 z M9,3 h2 v2 h-2 z" fill="#bdbdbd" />
    <path d="M3,2 h1 v1 h-1 z M10,2 h1 v1 h-1 z" fill="#9e9e9e" />
  </svg>
));

export const PigSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Body */}
    <path d="M3,8 h20 v3 h-20 z" fill="#f8bbd0" />
    <path d="M25,5 h3 v1 h-3 z M30,5 h1 v1 h-1 z M23,6 h9 v1 h-9 z M3,7 h29 v1 h-29 z M2,8 h1 v3 h-1 z M23,8 h2 v2 h-2 z M27,8 h5 v2 h-5 z M23,10 h5 v1 h-5 z M2,11 h26 v3 h-26 z M2,14 h30 v1 h-30 z M2,15 h21 v1 h-21 z M2,16 h24 v1 h-24 z" fill="#f48fb1" />
    <path d="M24,2 h1 v1 h-1 z M29,2 h1 v1 h-1 z M23,3 h2 v3 h-2 z M28,3 h2 v3 h-2 z M0,8 h1 v1 h-1 z M1,9 h1 v1 h-1 z M0,10 h1 v1 h-1 z M1,11 h1 v1 h-1 z M23,15 h9 v1 h-9 z M2,17 h24 v3 h-24 z M4,20 h4 v3 h-4 z M10,20 h4 v3 h-4 z M18,20 h4 v3 h-4 z M24,20 h4 v3 h-4 z" fill="#f06292" />
    <path d="M29,11 h1 v1 h-1 z M31,11 h1 v1 h-1 z M28,13 h4 v1 h-4 z M4,23 h4 v1 h-4 z M10,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M24,23 h4 v1 h-4 z" fill="#ad1457" />
    {/* Snout */}
    <path d="M28,10 h4 v1 h-4 z M28,11 h1 v1 h-1 z M30,11 h1 v1 h-1 z M28,12 h4 v1 h-4 z" fill="#ec407a" />
    {/* Eye */}
    <path d="M26,8 h1 v1 h-1 z M25,9 h2 v1 h-2 z" fill="#212121" />
    <path d="M25,8 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

export const ChickenSprite = React.memo(() => (
  <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Feathers */}
    <path d="M14,2 h5 v1 h-5 z M13,3 h6 v1 h-6 z M13,4 h3 v1 h-3 z M17,4 h2 v1 h-2 z M13,5 h6 v2 h-6 z M2,6 h1 v1 h-1 z M1,7 h2 v1 h-2 z M7,7 h12 v1 h-12 z M1,8 h17 v1 h-17 z M2,9 h14 v1 h-14 z M17,9 h1 v1 h-1 z M3,10 h7 v2 h-7 z M11,10 h4 v2 h-4 z M16,10 h1 v3 h-1 z M4,12 h7 v1 h-7 z M4,13 h13 v1 h-13 z" fill="#ffffff" />
    <path d="M16,9 h1 v1 h-1 z M10,10 h1 v2 h-1 z M15,10 h1 v2 h-1 z M11,12 h5 v1 h-5 z M5,14 h11 v1 h-11 z M6,15 h9 v1 h-9 z" fill="#e0e0e0" />
    {/* Comb, wattle, beak & legs */}
    <path d="M15,0 h2 v1 h-2 z M14,1 h4 v1 h-4 z M18,8 h1 v2 h-1 z" fill="#e53935" />
    <path d="M19,4 h1 v2 h-1 z M7,16 h2 v3 h-2 z M12,16 h2 v3 h-2 z M6,19 h4 v1 h-4 z M11,19 h4 v1 h-4 z" fill="#fbc02d" />
    {/* Eye */}
    <path d="M16,4 h1 v1 h-1 z" fill="#212121" />
  </svg>
));

export const RoosterSprite = React.memo(() => (
  <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Body */}
    <path d="M6,13 h10 v1 h-10 z M20,13 h1 v1 h-1 z M6,14 h16 v1 h-16 z M6,15 h3 v2 h-3 z M15,15 h7 v1 h-7 z M10,16 h5 v1 h-5 z M16,16 h6 v1 h-6 z M7,17 h3 v1 h-3 z M11,17 h5 v1 h-5 z M17,17 h5 v2 h-5 z M7,18 h4 v1 h-4 z M8,19 h13 v1 h-13 z" fill="#8d6e63" />
    <path d="M16,3 h6 v2 h-6 z M16,5 h2 v2 h-2 z M20,5 h2 v2 h-2 z M16,7 h6 v1 h-6 z M16,8 h5 v1 h-5 z M16,9 h4 v1 h-4 z M16,10 h3 v1 h-3 z M16,11 h2 v1 h-2 z M7,12 h5 v1 h-5 z M17,12 h2 v1 h-2 z" fill="#a1887f" />
    <path d="M9,15 h6 v1 h-6 z M9,16 h1 v1 h-1 z M15,16 h1 v1 h-1 z M10,17 h1 v1 h-1 z M16,17 h1 v1 h-1 z M11,18 h6 v1 h-6 z M21,19 h1 v1 h-1 z M9,20 h12 v1 h-12 z" fill="#6d4c41" />
    {/* Hackles */}
    <path d="M15,8 h1 v1 h-1 z M14,9 h2 v1 h-2 z M13,10 h3 v1 h-3 z M12,11 h4 v1 h-4 z M12,12 h5 v1 h-5 z M16,13 h4 v1 h-4 z" fill="#f9a825" />
    {/* Comb, wattle & beak */}
    <path d="M18,0 h1 v1 h-1 z M20,0 h1 v1 h-1 z M17,1 h5 v2 h-5 z M19,10 h1 v1 h-1 z M19,11 h2 v1 h-2 z M20,12 h1 v1 h-1 z" fill="#e53935" />
    {/* Tail */}
    <path d="M2,0 h1 v1 h-1 z M1,1 h2 v1 h-2 z M0,2 h3 v1 h-3 z M5,2 h1 v1 h-1 z M0,3 h1 v2 h-1 z M2,3 h1 v1 h-1 z M4,3 h2 v1 h-2 z M2,4 h4 v1 h-4 z M1,5 h4 v2 h-4 z M6,5 h2 v1 h-2 z M7,6 h2 v1 h-2 z M2,7 h4 v2 h-4 z M8,7 h2 v4 h-2 z M3,9 h3 v1 h-3 z M4,10 h3 v1 h-3 z M5,11 h3 v1 h-3 z M9,11 h2 v1 h-2 z" fill="#1e88e5" />
    <path d="M1,3 h1 v2 h-1 z M0,5 h1 v2 h-1 z M1,7 h1 v2 h-1 z M6,8 h1 v2 h-1 z M2,9 h1 v1 h-1 z M2,10 h2 v1 h-2 z M7,10 h1 v1 h-1 z M3,11 h2 v1 h-2 z M8,11 h1 v1 h-1 z M4,12 h3 v1 h-3 z M5,13 h1 v1 h-1 z" fill="#1565c0" />
    <path d="M5,5 h1 v1 h-1 z M5,6 h2 v1 h-2 z M6,7 h2 v1 h-2 z M7,8 h1 v2 h-1 z" fill="#43a047" />
    {/* Legs */}
    <path d="M22,5 h1 v1 h-1 z M22,6 h2 v1 h-2 z M10,21 h2 v2 h-2 z M15,21 h2 v2 h-2 z M9,23 h4 v1 h-4 z M14,23 h4 v1 h-4 z" fill="#fbc02d" />
    {/* Eye */}
    <path d="M19,5 h1 v1 h-1 z M18,6 h2 v1 h-2 z" fill="#212121" />
    <path d="M18,5 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

export const ChickSprite = React.memo(() => (
  <svg viewBox="0 0 12 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fluff */}
    <path d="M4,1 h1 v1 h-1 z M3,2 h1 v1 h-1 z M2,3 h1 v1 h-1 z" fill="#fff59d" />
    <path d="M5,0 h4 v1 h-4 z M5,1 h5 v1 h-5 z M4,2 h7 v1 h-7 z M3,3 h4 v1 h-4 z M8,3 h2 v1 h-2 z M2,4 h9 v2 h-9 z M2,6 h2 v2 h-2 z M7,6 h4 v1 h-4 z M5,7 h2 v1 h-2 z M8,7 h2 v1 h-2 z M3,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M4,6 h3 v1 h-3 z M4,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M10,7 h1 v2 h-1 z M4,8 h5 v1 h-5 z M4,9 h6 v1 h-6 z" fill="#fdd835" />
    {/* Beak & legs */}
    <path d="M10,3 h1 v1 h-1 z M11,4 h1 v1 h-1 z M5,10 h1 v1 h-1 z M8,10 h1 v1 h-1 z M4,11 h2 v1 h-2 z M7,11 h2 v1 h-2 z" fill="#f57f17" />
    {/* Eye */}
    <path d="M7,3 h1 v1 h-1 z" fill="#212121" />
  </svg>
));

export const SheepSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fleece */}
    <path d="M26,3 h4 v1 h-4 z M25,4 h6 v1 h-6 z M11,5 h7 v1 h-7 z M26,5 h4 v1 h-4 z M10,6 h9 v1 h-9 z M8,7 h13 v1 h-13 z M5,8 h17 v1 h-17 z M4,9 h20 v1 h-20 z M4,10 h7 v1 h-7 z M12,10 h12 v1 h-12 z M3,11 h21 v1 h-21 z M4,12 h13 v1 h-13 z M18,12 h6 v1 h-6 z M3,13 h21 v1 h-21 z M3,14 h5 v1 h-5 z M9,14 h12 v1 h-12 z M22,14 h2 v1 h-2 z M2,15 h26 v1 h-26 z M3,16 h11 v1 h-11 z M15,16 h12 v1 h-12 z M3,17 h1 v1 h-1 z M26,17 h1 v1 h-1 z" fill="#f5f5f5" />
    <path d="M11,10 h1 v1 h-1 z M17,12 h1 v1 h-1 z M8,14 h1 v1 h-1 z M21,14 h1 v1 h-1 z M14,16 h1 v1 h-1 z M4,17 h22 v2 h-22 z M4,19 h3 v1 h-3 z M10,19 h2 v1 h-2 z M15,19 h4 v1 h-4 z M22,19 h2 v1 h-2 z" fill="#e0e0e0" />
    {/* Face & legs */}
    <path d="M25,5 h1 v1 h-1 z M24,6 h7 v1 h-7 z M25,7 h6 v1 h-6 z M25,8 h2 v1 h-2 z M29,8 h2 v1 h-2 z M24,9 h3 v1 h-3 z M28,9 h4 v1 h-4 z M24,10 h8 v3 h-8 z M7,19 h2 v5 h-2 z M12,19 h2 v5 h-2 z M19,19 h2 v5 h-2 z M24,19 h2 v5 h-2 z" fill="#212121" />
    <path d="M22,7 h3 v2 h-3 z M24,13 h7 v2 h-7 z M9,19 h1 v5 h-1 z M14,19 h1 v5 h-1 z M21,19 h1 v5 h-1 z M26,19 h1 v5 h-1 z" fill="#424242" />
    <path d="M27,8 h2 v1 h-2 z M27,9 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

export const GoatSprite = React.memo(() => (
  <svg viewBox="0 0 32 28" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Coat */}
    <path d="M5,7 h16 v2 h-16 z M5,9 h17 v1 h-17 z" fill="#f5f5f5" />
    <path d="M23,5 h1 v1 h-1 z M26,5 h2 v1 h-2 z M22,6 h8 v1 h-8 z M2,7 h1 v1 h-1 z M23,7 h7 v1 h-7 z M3,8 h2 v2 h-2 z M23,8 h2 v1 h-2 z M27,8 h3 v2 h-3 z M22,9 h3 v1 h-3 z M4,10 h23 v4 h-23 z M4,14 h26 v1 h-26 z M4,15 h20 v2 h-20 z" fill="#e0e0e0" />
    <path d="M21,7 h2 v2 h-2 z M27,10 h5 v1 h-5 z M27,11 h4 v1 h-4 z M27,12 h5 v2 h-5 z M26,15 h2 v3 h-2 z M4,17 h20 v3 h-20 z M27,18 h1 v1 h-1 z M6,20 h3 v6 h-3 z M11,20 h3 v6 h-3 z M17,20 h3 v6 h-3 z M22,20 h3 v6 h-3 z" fill="#bdbdbd" />
    {/* Horns & hooves */}
    <path d="M25,2 h1 v1 h-1 z M28,2 h1 v1 h-1 z M24,3 h2 v3 h-2 z M28,3 h2 v3 h-2 z M31,11 h1 v1 h-1 z M6,26 h3 v2 h-3 z M11,26 h3 v2 h-3 z M17,26 h3 v2 h-3 z M22,26 h3 v2 h-3 z" fill="#9e9e9e" />
    {/* Eye */}
    <path d="M26,8 h1 v1 h-1 z M25,9 h2 v1 h-2 z" fill="#212121" />
    <path d="M25,8 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

export const FrogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <g className="frog-sit">
      {/* Frog */}
      <path d="M9,12 h14 v2 h-14 z" fill="#66bb6a" />
      <path d="M10,8 h4 v1 h-4 z M18,8 h4 v1 h-4 z M10,9 h1 v2 h-1 z M13,9 h1 v2 h-1 z M18,9 h1 v2 h-1 z M21,9 h1 v2 h-1 z M9,11 h14 v1 h-14 z M8,12 h1 v2 h-1 z M23,12 h1 v2 h-1 z M8,14 h6 v1 h-6 z M15,14 h9 v1 h-9 z M8,15 h10 v1 h-10 z M19,15 h5 v1 h-5 z M9,16 h3 v1 h-3 z M20,16 h3 v1 h-3 z M9,17 h1 v3 h-1 z M22,17 h1 v3 h-1 z" fill="#4caf50" />
      <path d="M14,14 h1 v1 h-1 z M18,15 h1 v1 h-1 z M5,16 h4 v3 h-4 z M12,16 h8 v1 h-8 z M23,16 h4 v3 h-4 z" fill="#388e3c" />
      <path d="M3,19 h6 v1 h-6 z M23,19 h6 v1 h-6 z" fill="#2e7d32" />
      <path d="M10,17 h12 v3 h-12 z" fill="#c5e1a5" />
      <path d="M11,9 h2 v1 h-2 z M19,9 h2 v1 h-2 z M11,10 h1 v1 h-1 z M20,10 h1 v1 h-1 z" fill="#ffffff" />
      <path d="M12,10 h1 v1 h-1 z M19,10 h1 v1 h-1 z" fill="#212121" />
    </g>
    <g className="frog-leap">
      {/* Frog */}
      <path d="M9,8 h14 v2 h-14 z" fill="#66bb6a" />
      <path d="M9,4 h4 v1 h-4 z M17,4 h4 v1 h-4 z M9,5 h1 v2 h-1 z M12,5 h1 v2 h-1 z M17,5 h1 v2 h-1 z M20,5 h1 v2 h-1 z M9,7 h14 v1 h-14 z M8,8 h1 v2 h-1 z M23,8 h1 v2 h-1 z M8,10 h16 v2 h-16 z M9,12 h3 v1 h-3 z M20,12 h4 v1 h-4 z M9,13 h1 v1 h-1 z M22,13 h2 v3 h-2 z M8,14 h2 v2 h-2 z" fill="#4caf50" />
      <path d="M7,12 h2 v1 h-2 z M12,12 h8 v1 h-8 z M6,13 h3 v1 h-3 z M24,13 h2 v1 h-2 z M5,14 h3 v1 h-3 z M24,14 h3 v1 h-3 z M4,15 h3 v1 h-3 z M25,15 h3 v1 h-3 z M3,16 h3 v1 h-3 z M26,16 h3 v1 h-3 z M4,17 h1 v1 h-1 z M27,17 h3 v1 h-3 z" fill="#388e3c" />
      <path d="M0,17 h4 v2 h-4 z M28,18 h4 v2 h-4 z" fill="#2e7d32" />
      <path d="M10,13 h12 v3 h-12 z" fill="#c5e1a5" />
      <path d="M10,5 h2 v1 h-2 z M18,5 h2 v1 h-2 z M10,6 h1 v1 h-1 z M19,6 h1 v1 h-1 z" fill="#ffffff" />
      <path d="M11,6 h1 v1 h-1 z M18,6 h1 v1 h-1 z" fill="#212121" />
    </g>
  </svg>
));

export const RabbitSprite = React.memo(() => (
  <svg viewBox="0 0 40 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fur */}
    <path d="M24,2 h1 v1 h-1 z M24,9 h7 v1 h-7 z M7,13 h13 v1 h-13 z M7,14 h15 v2 h-15 z" fill="#bdbdbd" />
    <path d="M25,2 h3 v1 h-3 z M24,3 h1 v6 h-1 z M27,3 h1 v6 h-1 z M20,4 h1 v1 h-1 z M24,10 h8 v2 h-8 z M24,12 h4 v2 h-4 z M30,12 h2 v2 h-2 z M6,14 h1 v2 h-1 z M22,14 h2 v2 h-2 z M6,16 h18 v3 h-18 z M6,19 h2 v5 h-2 z M22,19 h2 v3 h-2 z M7,24 h1 v2 h-1 z M22,26 h4 v4 h-4 z" fill="#9e9e9e" />
    <path d="M21,4 h3 v1 h-3 z M20,5 h1 v7 h-1 z M23,5 h1 v7 h-1 z M20,12 h4 v2 h-4 z M3,24 h4 v3 h-4 z M8,26 h4 v4 h-4 z M5,27 h2 v1 h-2 z" fill="#757575" />
    <path d="M28,12 h1 v1 h-1 z M24,14 h8 v1 h-8 z M24,15 h7 v1 h-7 z M3,16 h3 v1 h-3 z M24,16 h8 v6 h-8 z M2,17 h4 v1 h-4 z M1,18 h5 v4 h-5 z M8,19 h14 v3 h-14 z M2,22 h4 v1 h-4 z M8,22 h18 v4 h-18 z M3,23 h1 v1 h-1 z M5,23 h1 v1 h-1 z M2,27 h3 v2 h-3 z M8,30 h5 v2 h-5 z M22,30 h5 v2 h-5 z" fill="#ffffff" />
    <path d="M4,23 h1 v1 h-1 z" fill="#e0e0e0" />
    {/* Ears & nose */}
    <path d="M25,3 h2 v6 h-2 z M21,5 h2 v7 h-2 z M31,15 h1 v1 h-1 z M32,16 h2 v1 h-2 z" fill="#f48fb1" />
    {/* Eye */}
    <path d="M29,12 h1 v1 h-1 z M28,13 h2 v1 h-2 z" fill="#212121" />
  </svg>
));

export const CatSprite = React.memo(() => (
  <svg viewBox="0 0 28 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fur */}
    <path d="M1,3 h2 v1 h-2 z M22,4 h4 v1 h-4 z M20,5 h3 v2 h-3 z M25,5 h3 v2 h-3 z M20,7 h2 v2 h-2 z M24,7 h2 v2 h-2 z M5,9 h3 v1 h-3 z M10,9 h3 v4 h-3 z M15,9 h3 v4 h-3 z M20,9 h8 v1 h-8 z M4,10 h4 v3 h-4 z M20,10 h4 v3 h-4 z M4,13 h24 v1 h-24 z M4,14 h18 v2 h-18 z M4,16 h2 v2 h-2 z M20,16 h2 v2 h-2 z M6,18 h3 v5 h-3 z M11,18 h3 v5 h-3 z M17,18 h3 v5 h-3 z M21,18 h3 v5 h-3 z" fill="#ffb74d" />
    <path d="M20,1 h1 v1 h-1 z M27,1 h1 v1 h-1 z M20,2 h2 v1 h-2 z M26,2 h2 v1 h-2 z M20,3 h1 v1 h-1 z M27,3 h1 v1 h-1 z M1,4 h1 v3 h-1 z M20,4 h2 v1 h-2 z M26,4 h2 v1 h-2 z M23,5 h2 v2 h-2 z M2,7 h1 v3 h-1 z M8,9 h2 v4 h-2 z M13,9 h2 v4 h-2 z M18,9 h2 v4 h-2 z M3,10 h1 v2 h-1 z" fill="#fb8c00" />
    <path d="M24,10 h1 v1 h-1 z M26,10 h2 v1 h-2 z M24,11 h4 v2 h-4 z M6,16 h14 v2 h-14 z M6,23 h3 v1 h-3 z M11,23 h3 v1 h-3 z M17,23 h3 v1 h-3 z M21,23 h3 v1 h-3 z" fill="#ffe0b2" />
    {/* Ears & nose */}
    <path d="M21,3 h1 v1 h-1 z M26,3 h1 v1 h-1 z M25,10 h1 v1 h-1 z" fill="#f48fb1" />
    {/* Eyes */}
    <path d="M22,7 h2 v1 h-2 z M26,7 h2 v1 h-2 z M22,8 h1 v1 h-1 z M26,8 h1 v1 h-1 z" fill="#43a047" />
    <path d="M23,8 h1 v1 h-1 z M27,8 h1 v1 h-1 z" fill="#212121" />
  </svg>
));

export const DogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Fur */}
    <path d="M5,8 h17 v1 h-17 z M27,8 h3 v2 h-3 z M5,9 h16 v1 h-16 z M27,10 h5 v2 h-5 z M27,12 h1 v1 h-1 z M31,12 h1 v1 h-1 z" fill="#a1887f" />
    <path d="M23,2 h8 v1 h-8 z M22,3 h10 v1 h-10 z M25,4 h7 v1 h-7 z M25,5 h1 v2 h-1 z M28,5 h4 v2 h-4 z M5,7 h17 v1 h-17 z M25,7 h7 v1 h-7 z M4,8 h1 v2 h-1 z M25,8 h2 v4 h-2 z M4,10 h17 v6 h-17 z M22,12 h1 v1 h-1 z M24,12 h3 v1 h-3 z M22,13 h7 v1 h-7 z M30,13 h2 v1 h-2 z M6,18 h4 v5 h-4 z M12,18 h4 v5 h-4 z M18,18 h4 v5 h-4 z M23,18 h4 v5 h-4 z" fill="#8d6e63" />
    <path d="M1,4 h2 v2 h-2 z M22,4 h3 v8 h-3 z M2,6 h1 v3 h-1 z M3,9 h1 v2 h-1 z M23,12 h1 v1 h-1 z M28,12 h3 v1 h-3 z M4,16 h17 v1 h-17 z M4,17 h20 v1 h-20 z M6,23 h4 v1 h-4 z M12,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M23,23 h4 v1 h-4 z" fill="#5d4037" />
    {/* Collar */}
    <path d="M21,9 h1 v5 h-1 z M21,14 h3 v3 h-3 z" fill="#e53935" />
    {/* Face */}
    <path d="M27,5 h1 v1 h-1 z M26,6 h2 v1 h-2 z M30,8 h2 v2 h-2 z" fill="#212121" />
    <path d="M26,5 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M29,13 h1 v1 h-1 z" fill="#f48fb1" />
  </svg>
));
