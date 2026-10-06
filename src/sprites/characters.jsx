import React from 'react';

// `costume` dresses her up for the holidays: a witch hat at Halloween, a Catrina crown of roses and gold spikes at
// Día de los Muertos, a Santa hat at Christmas, a sunflower crown on Earth Day and a party hat for Compost Week
export const FarmerSprite = React.memo(({ costume }) => (
  // overflow visible lets the tall witch hat and the Catrina crown's halo rise above the sprite's box
  <svg viewBox="0 0 24 27" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges" overflow="visible">
    {costume === 'halloween' ? <>
      {/* Tall witch hat with a bent tip */}
      <path d="M15,-5 h1 v1 h-1 z M13,-4 h3 v1 h-3 z M12,-3 h3 v1 h-3 z M11,-2 h4 v2 h-4 z M10,0 h5 v1 h-5 z M10,1 h6 v1 h-6 z M9,2 h7 v1 h-7 z M3,5 h18 v1 h-18 z" fill="#4a148c" />
      <path d="M16,-5 h1 v1 h-1 z M14,-2 h1 v3 h-1 z M15,1 h1 v2 h-1 z M2,4 h20 v1 h-20 z" fill="#7b1fa2" />
      <path d="M13,-4 h1 v1 h-1 z M12,-3 h1 v1 h-1 z M11,-2 h1 v2 h-1 z M10,0 h1 v2 h-1 z M9,2 h1 v1 h-1 z M3,5 h2 v1 h-2 z" fill="#311b92" />
      <path d="M8,3 h8 v1 h-8 z" fill="#ff9800" />
      <path d="M11,3 h2 v1 h-2 z" fill="#fdd835" />
    </> : costume === 'muertos' ? <>
      {/* Catrina crown: a halo of red-tipped gold spikes behind a ring of red roses */}
      <path d="M6,5 h1 v1 h-1 z M5,5 h1 v1 h-1 z M4,5 h1 v1 h-1 z M7,4 h1 v1 h-1 z M6,3 h1 v1 h-1 z M5,3 h1 v1 h-1 z M8,3 h1 v1 h-1 z M7,2 h1 v1 h-1 z M9,2 h1 v1 h-1 z M8,1 h1 v1 h-1 z M8,0 h1 v1 h-1 z M10,1 h1 v1 h-1 z M10,0 h1 v1 h-1 z M10,-1 h1 v1 h-1 z M12,1 h1 v1 h-1 z M12,0 h1 v1 h-1 z M12,-1 h1 v1 h-1 z M14,1 h1 v1 h-1 z M14,0 h1 v1 h-1 z M14,-1 h1 v1 h-1 z M15,2 h1 v1 h-1 z M16,1 h1 v1 h-1 z M16,0 h1 v1 h-1 z M16,3 h1 v1 h-1 z M17,2 h1 v1 h-1 z M17,4 h1 v1 h-1 z M18,3 h1 v1 h-1 z M19,3 h1 v1 h-1 z M18,5 h1 v1 h-1 z M19,5 h1 v1 h-1 z M20,5 h1 v1 h-1 z" fill="#c8962c" />
      <path d="M2,4 h1 v1 h-1 z M1,4 h1 v1 h-1 z M0,4 h1 v1 h-1 z M4,2 h1 v1 h-1 z M3,1 h1 v1 h-1 z M2,1 h1 v1 h-1 z M5,0 h1 v1 h-1 z M4,-1 h1 v1 h-1 z M7,-1 h1 v1 h-1 z M6,-2 h1 v1 h-1 z M6,-3 h1 v1 h-1 z M9,-3 h1 v1 h-1 z M9,-4 h1 v1 h-1 z M9,-5 h1 v1 h-1 z M12,-2 h1 v1 h-1 z M12,-3 h1 v1 h-1 z M12,-4 h1 v1 h-1 z M12,-5 h1 v1 h-1 z M15,-3 h1 v1 h-1 z M15,-4 h1 v1 h-1 z M15,-5 h1 v1 h-1 z M17,-1 h1 v1 h-1 z M18,-2 h1 v1 h-1 z M18,-3 h1 v1 h-1 z M19,0 h1 v1 h-1 z M20,-1 h1 v1 h-1 z M20,2 h1 v1 h-1 z M21,1 h1 v1 h-1 z M22,1 h1 v1 h-1 z M22,4 h1 v1 h-1 z M23,4 h1 v1 h-1 z M24,4 h1 v1 h-1 z" fill="#f2c94c" />
      <path d="M3,5 h1 v1 h-1 z M6,1 h1 v1 h-1 z M10,-2 h1 v1 h-1 z M14,-2 h1 v1 h-1 z M18,1 h1 v1 h-1 z M21,5 h1 v1 h-1 z" fill="#ff7043" />
      <path d="M-1,4 h1 v1 h-1 z M1,0 h1 v1 h-1 z M3,-2 h1 v1 h-1 z M5,-4 h1 v1 h-1 z M9,-6 h1 v1 h-1 z M12,-6 h1 v1 h-1 z M15,-6 h1 v1 h-1 z M19,-4 h1 v1 h-1 z M21,-2 h1 v1 h-1 z M23,0 h1 v1 h-1 z M25,4 h1 v1 h-1 z" fill="#e53935" />
      <path d="M8,2 h8 v1 h-8 z M7,3 h10 v1 h-10 z M6,4 h12 v2 h-12 z" fill="#8d2a0e" />
      <path d="M4,5 h2 v1 h-2 z M3,6 h4 v2 h-4 z M4,8 h2 v1 h-2 z M6,2 h2 v1 h-2 z M5,3 h4 v2 h-4 z M6,5 h2 v1 h-2 z M9,0 h2 v1 h-2 z M8,1 h4 v2 h-4 z M9,3 h2 v1 h-2 z M13,0 h2 v1 h-2 z M12,1 h4 v2 h-4 z M13,3 h2 v1 h-2 z M16,2 h2 v1 h-2 z M15,3 h4 v2 h-4 z M16,5 h2 v1 h-2 z M18,5 h2 v1 h-2 z M17,6 h4 v2 h-4 z M18,8 h2 v1 h-2 z" fill="#c62828" />
      <path d="M4,5 h1 v1 h-1 z M3,6 h1 v1 h-1 z M6,2 h1 v1 h-1 z M5,3 h1 v1 h-1 z M9,0 h1 v1 h-1 z M8,1 h1 v1 h-1 z M13,0 h1 v1 h-1 z M12,1 h1 v1 h-1 z M16,2 h1 v1 h-1 z M15,3 h1 v1 h-1 z M18,5 h1 v1 h-1 z M17,6 h1 v1 h-1 z" fill="#ff5252" />
      <path d="M6,7 h1 v1 h-1 z M5,8 h1 v1 h-1 z M8,4 h1 v1 h-1 z M7,5 h1 v1 h-1 z M11,2 h1 v1 h-1 z M10,3 h1 v1 h-1 z M15,2 h1 v1 h-1 z M14,3 h1 v1 h-1 z M18,4 h1 v1 h-1 z M17,5 h1 v1 h-1 z M20,7 h1 v1 h-1 z M19,8 h1 v1 h-1 z" fill="#5d0a0a" />
      <path d="M5,6 h1 v1 h-1 z M4,7 h1 v1 h-1 z M7,3 h1 v1 h-1 z M6,4 h1 v1 h-1 z M10,1 h1 v1 h-1 z M9,2 h1 v1 h-1 z M14,1 h1 v1 h-1 z M13,2 h1 v1 h-1 z M17,3 h1 v1 h-1 z M16,4 h1 v1 h-1 z M19,6 h1 v1 h-1 z M18,7 h1 v1 h-1 z" fill="#7f0000" />
      <path d="M6,6 h1 v1 h-1 z M11,1 h1 v1 h-1 z M18,3 h1 v1 h-1 z M5,4 h1 v1 h-1 z M12,2 h1 v1 h-1 z M17,7 h1 v1 h-1 z" fill="#ffffff" />
      <path d="M8,4 h1 v1 h-1 z M7,5 h3 v1 h-3 z M8,6 h1 v1 h-1 z M12,3 h1 v1 h-1 z M11,4 h3 v1 h-3 z M12,5 h1 v1 h-1 z M16,4 h1 v1 h-1 z M15,5 h3 v1 h-3 z M16,6 h1 v1 h-1 z" fill="#e53935" />
      <path d="M8,5 h1 v1 h-1 z M12,4 h1 v1 h-1 z M16,5 h1 v1 h-1 z" fill="#7f0000" />
    </> : costume === 'earthday' ? <>
      {/* Sunflower crown on a leafy band */}
      <path d="M8,2 h8 v1 h-8 z M7,3 h10 v1 h-10 z M6,4 h12 v2 h-12 z" fill="#d84315" />
      <path d="M5,4 h14 v1 h-14 z M4,5 h2 v1 h-2 z M18,5 h2 v1 h-2 z" fill="#43a047" />
      <path d="M4,5 h1 v1 h-1 z M19,5 h1 v1 h-1 z" fill="#2e7d32" />
      <path d="M6,3 h1 v1 h-1 z M5,4 h3 v1 h-3 z M6,5 h1 v1 h-1 z" fill="#fdd835" />
      <path d="M5,3 h1 v1 h-1 z M7,3 h1 v1 h-1 z M5,5 h1 v1 h-1 z M7,5 h1 v1 h-1 z" fill="#f9a825" />
      <path d="M6,4 h1 v1 h-1 z" fill="#6d4c41" />
      <path d="M9,2 h1 v1 h-1 z M8,3 h3 v1 h-3 z M9,4 h1 v1 h-1 z" fill="#fdd835" />
      <path d="M8,2 h1 v1 h-1 z M10,2 h1 v1 h-1 z M8,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z" fill="#f9a825" />
      <path d="M9,3 h1 v1 h-1 z" fill="#6d4c41" />
      <path d="M12,1 h1 v1 h-1 z M11,2 h3 v1 h-3 z M12,3 h1 v1 h-1 z" fill="#fdd835" />
      <path d="M11,1 h1 v1 h-1 z M13,1 h1 v1 h-1 z M11,3 h1 v1 h-1 z M13,3 h1 v1 h-1 z" fill="#f9a825" />
      <path d="M12,2 h1 v1 h-1 z" fill="#6d4c41" />
      <path d="M15,2 h1 v1 h-1 z M14,3 h3 v1 h-3 z M15,4 h1 v1 h-1 z" fill="#fdd835" />
      <path d="M14,2 h1 v1 h-1 z M16,2 h1 v1 h-1 z M14,4 h1 v1 h-1 z M16,4 h1 v1 h-1 z" fill="#f9a825" />
      <path d="M15,3 h1 v1 h-1 z" fill="#6d4c41" />
      <path d="M18,3 h1 v1 h-1 z M17,4 h3 v1 h-3 z M18,5 h1 v1 h-1 z" fill="#fdd835" />
      <path d="M17,3 h1 v1 h-1 z M19,3 h1 v1 h-1 z M17,5 h1 v1 h-1 z M19,5 h1 v1 h-1 z" fill="#f9a825" />
      <path d="M18,4 h1 v1 h-1 z" fill="#6d4c41" />
    </> : costume === 'christmas' ? <>
      {/* Santa hat flopping to one side, with a fur brim and pompom */}
      <path d="M12,0 h5 v1 h-5 z M9,1 h10 v1 h-10 z M7,2 h10 v2 h-10 z" fill="#e53935" />
      <path d="M7,2 h2 v2 h-2 z M9,1 h1 v1 h-1 z" fill="#c62828" />
      <path d="M13,2 h3 v1 h-3 z M14,0 h2 v1 h-2 z" fill="#ef5350" />
      <path d="M4,4 h16 v2 h-16 z M19,0 h2 v3 h-2 z" fill="#fafafa" />
      <path d="M4,5 h16 v1 h-16 z M19,2 h2 v1 h-2 z" fill="#e0e0e0" />
    </> : <>
      {/* Hat & flower */}
      <path d="M9,0 h6 v1 h-6 z M8,1 h1 v1 h-1 z M11,1 h5 v1 h-5 z M10,2 h6 v1 h-6 z M4,4 h16 v1 h-16 z" fill="#f48fb1" />
      <path d="M9,1 h2 v1 h-2 z M9,2 h1 v1 h-1 z" fill="#f8bbd0" />
      <path d="M4,5 h16 v1 h-16 z" fill="#ec407a" />
      <path d="M8,3 h8 v1 h-8 z" fill="#d81b60" />
      <path d="M7,1 h1 v1 h-1 z M6,2 h1 v1 h-1 z M8,2 h1 v1 h-1 z M7,3 h1 v1 h-1 z" fill="#ff4081" />
      <path d="M7,2 h1 v1 h-1 z" fill="#fdd835" />
    </>}
    {costume === 'compostweek' && <>
      {/* Party hat perched on top of her sun hat */}
      <path d="M10,-2 h5 v2 h-5 z M11,-4 h3 v2 h-3 z M12,-5 h1 v1 h-1 z" fill="#ab47bc" />
      <path d="M10,-2 h1 v2 h-1 z M11,-4 h1 v2 h-1 z" fill="#8e24aa" />
      <path d="M10,-1 h5 v1 h-5 z M11,-3 h3 v1 h-3 z" fill="#4fc3f7" />
      <path d="M11,-7 h3 v2 h-3 z" fill="#fdd835" />
      <path d="M12,-7 h1 v1 h-1 z" fill="#fff59d" />
    </>}
    {/* Hair & braids */}
    <path d="M7,6 h10 v1 h-10 z M6,7 h1 v1 h-1 z M17,7 h1 v1 h-1 z M7,8 h1 v1 h-1 z M16,8 h1 v1 h-1 z M6,9 h1 v1 h-1 z M17,9 h1 v1 h-1 z M7,10 h1 v1 h-1 z M16,10 h1 v1 h-1 z M6,11 h1 v1 h-1 z M17,11 h1 v1 h-1 z M7,12 h1 v1 h-1 z M16,12 h1 v1 h-1 z M6,13 h1 v1 h-1 z M17,13 h1 v1 h-1 z M7,14 h1 v1 h-1 z M16,14 h1 v1 h-1 z M6,15 h1 v1 h-1 z M17,15 h1 v1 h-1 z M7,16 h1 v1 h-1 z M16,16 h1 v1 h-1 z M7,18 h1 v2 h-1 z M16,18 h1 v2 h-1 z" fill="#d84315" />
    <path d="M6,6 h1 v1 h-1 z M17,6 h1 v1 h-1 z M7,7 h1 v1 h-1 z M16,7 h1 v1 h-1 z M6,8 h1 v1 h-1 z M17,8 h1 v1 h-1 z M7,9 h1 v1 h-1 z M16,9 h1 v1 h-1 z M6,10 h1 v1 h-1 z M17,10 h1 v1 h-1 z M7,11 h1 v1 h-1 z M16,11 h1 v1 h-1 z M6,12 h1 v1 h-1 z M17,12 h1 v1 h-1 z M7,13 h1 v1 h-1 z M16,13 h1 v1 h-1 z M6,14 h1 v1 h-1 z M17,14 h1 v1 h-1 z M7,15 h1 v1 h-1 z M16,15 h1 v1 h-1 z M6,16 h1 v1 h-1 z M17,16 h1 v1 h-1 z M6,18 h1 v1 h-1 z M17,18 h1 v1 h-1 z" fill="#bf360c" />
    <path d="M6,17 h2 v1 h-2 z M16,17 h2 v1 h-2 z" fill="#4caf50" />
    {/* Face & hands */}
    <path d="M8,7 h8 v1 h-8 z M8,8 h1 v3 h-1 z M11,8 h2 v2 h-2 z M15,8 h1 v3 h-1 z M10,10 h4 v1 h-4 z M8,11 h3 v1 h-3 z M13,11 h3 v1 h-3 z M4,17 h2 v1 h-2 z M18,17 h2 v1 h-2 z M5,18 h1 v1 h-1 z M18,18 h1 v1 h-1 z" fill="#ffccaa" />
    <path d="M11,12 h2 v1 h-2 z M4,18 h1 v1 h-1 z M19,18 h1 v1 h-1 z" fill="#eeb38f" />
    <path d="M9,10 h1 v1 h-1 z M14,10 h1 v1 h-1 z" fill="#ff8a80" />
    <path d="M11,11 h2 v1 h-2 z" fill="#c2705a" />
    <path d="M9,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M10,8 h1 v1 h-1 z M14,8 h1 v1 h-1 z M9,9 h2 v1 h-2 z M13,9 h2 v1 h-2 z" fill="#3e2723" />
    {/* Shirt & overalls */}
    <path d="M4,12 h2 v4 h-2 z M8,12 h1 v6 h-1 z M10,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z M15,12 h1 v6 h-1 z M18,12 h2 v4 h-2 z" fill="#e53935" />
    <path d="M4,16 h2 v1 h-2 z M18,16 h2 v1 h-2 z" fill="#c62828" />
    <path d="M10,13 h4 v2 h-4 z M9,15 h2 v2 h-2 z M13,15 h2 v2 h-2 z M9,17 h6 v1 h-6 z M8,18 h8 v2 h-8 z M8,20 h3 v4 h-3 z M13,20 h3 v4 h-3 z" fill="#1e88e5" />
    <path d="M9,12 h1 v2 h-1 z M14,12 h1 v2 h-1 z M11,15 h2 v2 h-2 z M7,20 h1 v4 h-1 z M16,20 h1 v4 h-1 z" fill="#1565c0" />
    <path d="M9,14 h1 v1 h-1 z M14,14 h1 v1 h-1 z" fill="#fdd835" />
    {/* Boots */}
    <path d="M7,24 h4 v1 h-4 z M13,24 h4 v1 h-4 z M6,25 h5 v1 h-5 z M13,25 h5 v1 h-5 z" fill="#8b5a2b" />
    <path d="M6,24 h1 v1 h-1 z M17,24 h1 v1 h-1 z" fill="#a1887f" />
    <path d="M6,26 h5 v1 h-5 z M13,26 h5 v1 h-5 z" fill="#5d4037" />
  </svg>
));

export const WormSprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M2,11 h3 v-3 h3 v3 h3 v-4 h3 v5 h-14 z" fill="#f48fb1" />
    <path d="M4,9 h1 v2 h-1 z M7,11 h1 v1 h-1 z M10,8 h1 v3 h-1 z M13,9 h1 v1 h-1 z" fill="#d81b60" />
    <path d="M12,6 h4 v4 h-4 z" fill="#f48fb1" />
    <path d="M13,7 h1 v1 h-1 z M15,7 h1 v1 h-1 z" fill="#3e2723" />
  </svg>
));

// Wallace keeps his original 1x look; holiday costumes (see data/holidays.js) add half-unit detail on top
export const WallaceFollowerSprite = React.memo(({ costume }) => (
  <svg viewBox="0 0 16 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    <path d="M12,6 h4 v4 h-4 z" fill="#c8960c" />
    <path d="M12,9 h4 v1 h-4 z" fill="#5d4037" />
    <path d="M10,10 h6 v1 h-6 z" fill="#e8c44a" />
    <path d="M12,10 h4 v4 h-4 z" fill="#f48fb1" />
    <path d="M12,11 h2 v2 h-2 z M14,11 h2 v2 h-2 z" fill="white" />
    <path d="M12,11 h1 v1 h-1 z M14,11 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M2,15 h3 v-3 h3 v3 h3 v-4 h3 v5 h-14 z" fill="#f48fb1" />
    <path d="M4,13 h1 v2 h-1 z M7,15 h1 v1 h-1 z M10,12 h1 v3 h-1 z M13,13 h1 v1 h-1 z" fill="#d81b60" />
    {costume === 'halloween' && <>
      {/* Ghost sheet over his head, with the hat perched on top */}
      <path d="M11.5,11 h4.5 v4.5 h-4.5 z M11.5,15.5 h1 v1 h-1 z M13.5,15.5 h1 v1 h-1 z M15,15.5 h1 v1 h-1 z" fill="#f5f5f5" />
      <path d="M11.5,11 h0.5 v5.5 h-0.5 z M12,15 h4 v0.5 h-4 z" fill="#cfd8dc" />
      <path d="M15.5,11 h0.5 v3 h-0.5 z" fill="#ffffff" />
      <path d="M12.5,11.5 h1 v1.5 h-1 z M14.5,11.5 h1 v1.5 h-1 z M13.5,13.5 h1 v1 h-1 z" fill="#3e2723" />
      <path d="M12,6 h4 v4 h-4 z" fill="#c8960c" />
      <path d="M12,9 h4 v1 h-4 z" fill="#5d4037" />
      <path d="M10,10 h6 v1 h-6 z" fill="#e8c44a" />
    </>}
    {costume === 'earthday' && <>
      {/* A sprout tucked in his hat band */}
      <path d="M11.5,4.5 h0.5 v5 h-0.5 z" fill="#558b2f" />
      <path d="M9.5,4 h2 v1 h-2 z M10,5 h1.5 v0.5 h-1.5 z M12,3 h2 v1 h-2 z M12,4 h1.5 v0.5 h-1.5 z" fill="#66bb6a" />
      <path d="M10,5 h1.5 v0.5 h-1.5 z M12,4 h1.5 v0.5 h-1.5 z" fill="#43a047" />
      <path d="M9.5,4 h1 v0.5 h-1 z M13,3 h1 v0.5 h-1 z" fill="#a5d6a7" />
    </>}
    {costume === 'muertos' && <>
      {/* Calavera face paint and marigolds in his hat band */}
      <path d="M12,11 h4 v3 h-4 z" fill="#fafafa" />
      <path d="M12,13.5 h4 v0.5 h-4 z" fill="#e0e0e0" />
      <path d="M12,11 h2 v2 h-2 z" fill="#f06292" />
      <path d="M14,11 h2 v2 h-2 z" fill="#4dd0e1" />
      <path d="M12.5,11.5 h1 v1 h-1 z M14.5,11.5 h1 v1 h-1 z M13.5,13 h1 v0.5 h-1 z M12.5,13.5 h0.5 v0.5 h-0.5 z M13.5,13.5 h0.5 v0.5 h-0.5 z M14.5,13.5 h0.5 v0.5 h-0.5 z M15.5,13.5 h0.5 v0.5 h-0.5 z" fill="#212121" />
      <path d="M10.5,8 h1.5 v1.5 h-1.5 z M14.5,8.5 h1.5 v1.5 h-1.5 z" fill="#ff9800" />
      <path d="M11,8.5 h0.5 v0.5 h-0.5 z M15,9 h0.5 v0.5 h-0.5 z" fill="#e65100" />
      <path d="M10.5,8 h0.5 v0.5 h-0.5 z M14.5,8.5 h0.5 v0.5 h-0.5 z" fill="#ffcc80" />
    </>}
    {costume === 'christmas' && <>
      {/* Santa hat on top of the cowboy hat, its tip flopping over */}
      <path d="M12,4 h4 v2 h-4 z M12.5,3 h3 v1 h-3 z M13,2 h2 v1 h-2 z M11.5,2 h1.5 v1 h-1.5 z" fill="#e53935" />
      <path d="M12,4 h0.5 v2 h-0.5 z M12.5,3 h0.5 v1 h-0.5 z M11.5,2.5 h1.5 v0.5 h-1.5 z" fill="#c62828" />
      <path d="M11.5,5.5 h4.5 v1 h-4.5 z M10.5,1.5 h1 v1 h-1 z" fill="#fafafa" />
      <path d="M11.5,6 h4.5 v0.5 h-4.5 z M10.5,2 h1 v0.5 h-1 z" fill="#e0e0e0" />
    </>}
    {costume === 'compostweek' && <>
      {/* Party hat on top of the cowboy hat */}
      <path d="M13.5,2.5 h1 v1 h-1 z M13,3.5 h2 v1 h-2 z M12.5,4.5 h3 v1.5 h-3 z" fill="#ab47bc" />
      <path d="M13,3.5 h0.5 v1 h-0.5 z M12.5,4.5 h0.5 v1.5 h-0.5 z" fill="#8e24aa" />
      <path d="M13.5,3 h1 v0.5 h-1 z M12.5,5 h3 v0.5 h-3 z" fill="#4fc3f7" />
      <path d="M13.5,1.5 h1 v1 h-1 z" fill="#fdd835" />
      <path d="M14,1.5 h0.5 v0.5 h-0.5 z" fill="#fff59d" />
    </>}
  </svg>
));

export const InstructorSprite = React.memo(() => (
  <svg viewBox="0 0 48 52" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Floor shadow */}
    <path d="M5,51 h20 v1 h-20 z" fill="#000000" opacity="0.2" />
    {/* Pointer */}
    <path d="M46,0 h1 v1 h-1 z M45,1 h2 v1 h-2 z M44,2 h2 v1 h-2 z M43,3 h2 v1 h-2 z M42,4 h2 v1 h-2 z M41,5 h2 v1 h-2 z M40,6 h2 v1 h-2 z M39,7 h2 v1 h-2 z M38,8 h2 v1 h-2 z M37,9 h2 v1 h-2 z M36,10 h2 v1 h-2 z M35,11 h2 v1 h-2 z M34,12 h2 v1 h-2 z M33,13 h2 v1 h-2 z M33,14 h1 v1 h-1 z" fill="#e0c9a6" />
    <path d="M47,0 h1 v1 h-1 z" fill="#e53935" />
    {/* Shaggy hair */}
    <path d="M9,4 h2 v1 h-2 z M13,4 h3 v1 h-3 z M18,4 h2 v1 h-2 z M8,5 h14 v1 h-14 z M7,6 h2 v1 h-2 z M10,6 h6 v1 h-6 z M17,6 h6 v1 h-6 z M6,7 h4 v1 h-4 z M11,7 h7 v1 h-7 z M19,7 h5 v1 h-5 z M6,8 h18 v1 h-18 z M6,9 h2 v1 h-2 z M9,9 h2 v1 h-2 z M19,9 h2 v1 h-2 z M22,9 h2 v1 h-2 z M6,10 h3 v1 h-3 z M21,10 h3 v1 h-3 z M6,11 h1 v1 h-1 z M8,11 h1 v1 h-1 z M21,11 h1 v1 h-1 z M23,11 h1 v1 h-1 z M6,12 h3 v1 h-3 z M21,12 h3 v1 h-3 z M7,13 h2 v2 h-2 z M21,13 h2 v2 h-2 z M8,15 h1 v1 h-1 z M21,15 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M8,9 h1 v1 h-1 z M21,9 h1 v1 h-1 z M9,10 h1 v1 h-1 z M20,10 h1 v1 h-1 z M7,11 h1 v1 h-1 z M22,11 h1 v1 h-1 z M6,13 h1 v2 h-1 z M23,13 h1 v2 h-1 z M7,15 h1 v1 h-1 z M22,15 h1 v1 h-1 z M8,16 h1 v1 h-1 z M21,16 h1 v1 h-1 z" fill="#4e342e" />
    <path d="M9,6 h1 v1 h-1 z M16,6 h1 v1 h-1 z M10,7 h1 v1 h-1 z M18,7 h1 v1 h-1 z" fill="#a1887f" />
    {/* Face & hands */}
    <path d="M11,9 h8 v1 h-8 z M10,10 h10 v1 h-10 z M9,11 h1 v1 h-1 z M13,11 h4 v1 h-4 z M20,11 h1 v1 h-1 z M14,13 h2 v1 h-2 z M9,14 h1 v2 h-1 z M13,14 h1 v1 h-1 z M16,14 h1 v1 h-1 z M20,14 h1 v2 h-1 z M30,14 h3 v2 h-3 z M11,15 h8 v1 h-8 z M9,16 h3 v1 h-3 z M13,16 h4 v1 h-4 z M18,16 h3 v1 h-3 z M9,17 h4 v1 h-4 z M17,17 h4 v1 h-4 z M11,18 h8 v1 h-8 z M5,35 h4 v1 h-4 z M6,36 h3 v1 h-3 z" fill="#ffccaa" />
    <path d="M14,14 h2 v1 h-2 z M10,18 h1 v1 h-1 z M19,18 h1 v1 h-1 z M12,19 h6 v1 h-6 z" fill="#e6a57e" />
    <path d="M10,15 h1 v1 h-1 z M19,15 h1 v1 h-1 z" fill="#ffab91" />
    <path d="M12,16 h1 v1 h-1 z M17,16 h1 v1 h-1 z M13,17 h4 v1 h-4 z" fill="#8e2c2c" />
    {/* Glasses */}
    <path d="M10,11 h3 v1 h-3 z M17,11 h3 v1 h-3 z M9,12 h1 v2 h-1 z M13,12 h4 v1 h-4 z M20,12 h1 v2 h-1 z M13,13 h1 v1 h-1 z M16,13 h1 v1 h-1 z M10,14 h3 v1 h-3 z M17,14 h3 v1 h-3 z" fill="#3e2723" />
    <path d="M10,12 h1 v2 h-1 z M12,12 h1 v2 h-1 z M17,12 h1 v2 h-1 z M19,12 h1 v2 h-1 z" fill="#d6ecf7" />
    <path d="M11,12 h1 v2 h-1 z M18,12 h1 v2 h-1 z" fill="#212121" />
    {/* Tweed jacket */}
    <path d="M28,17 h4 v1 h-4 z M27,18 h1 v1 h-1 z M29,18 h2 v1 h-2 z M26,19 h4 v1 h-4 z M9,20 h3 v1 h-3 z M18,20 h3 v1 h-3 z M25,20 h4 v1 h-4 z M6,21 h5 v1 h-5 z M19,21 h9 v1 h-9 z M5,22 h6 v1 h-6 z M19,22 h7 v1 h-7 z M5,23 h2 v1 h-2 z M8,23 h4 v1 h-4 z M18,23 h6 v1 h-6 z M5,24 h4 v4 h-4 z M10,24 h3 v1 h-3 z M17,24 h4 v1 h-4 z M10,25 h4 v1 h-4 z M16,25 h5 v1 h-5 z M10,26 h2 v1 h-2 z M13,26 h2 v1 h-2 z M16,26 h2 v1 h-2 z M19,26 h2 v1 h-2 z M10,27 h5 v3 h-5 z M16,27 h5 v3 h-5 z M5,28 h1 v1 h-1 z M7,28 h2 v1 h-2 z M5,29 h4 v5 h-4 z M10,30 h2 v1 h-2 z M13,30 h2 v1 h-2 z M16,30 h3 v1 h-3 z M20,30 h1 v1 h-1 z M10,31 h5 v2 h-5 z M16,31 h5 v2 h-5 z" fill="#795548" />
    <path d="M28,18 h1 v1 h-1 z M11,21 h1 v1 h-1 z M18,21 h1 v1 h-1 z M11,22 h2 v1 h-2 z M17,22 h2 v1 h-2 z M12,23 h2 v1 h-2 z M16,23 h2 v1 h-2 z M9,24 h1 v9 h-1 z M13,24 h1 v1 h-1 z M16,24 h1 v1 h-1 z M15,26 h1 v2 h-1 z M15,29 h1 v1 h-1 z M15,31 h1 v2 h-1 z M9,33 h12 v1 h-12 z" fill="#5d4037" />
    <path d="M7,23 h1 v1 h-1 z M12,26 h1 v1 h-1 z M18,26 h1 v1 h-1 z M6,28 h1 v1 h-1 z M12,30 h1 v1 h-1 z M19,30 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M15,28 h1 v1 h-1 z M15,30 h1 v1 h-1 z" fill="#3e2723" />
    {/* Shirt & tie */}
    <path d="M29,16 h3 v1 h-3 z M12,20 h2 v2 h-2 z M16,20 h2 v2 h-2 z M13,22 h1 v1 h-1 z M16,22 h1 v1 h-1 z M5,34 h4 v1 h-4 z" fill="#efe6d5" />
    <path d="M14,20 h2 v5 h-2 z" fill="#2e7d32" />
    <path d="M14,25 h2 v1 h-2 z" fill="#1b5e20" />
    {/* Trousers & shoes */}
    <path d="M9,34 h12 v2 h-12 z M9,36 h5 v12 h-5 z M16,36 h5 v12 h-5 z" fill="#455a64" />
    <path d="M14,36 h2 v2 h-2 z M9,48 h5 v1 h-5 z M16,48 h5 v1 h-5 z" fill="#37474f" />
    <path d="M8,49 h6 v1 h-6 z M16,49 h6 v1 h-6 z M7,50 h7 v1 h-7 z M16,50 h7 v1 h-7 z" fill="#3e2723" />
  </svg>
));

export const StudentBlondeSprite = React.memo(() => (
  <svg viewBox="0 0 40 26" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hair */}
    <path d="M15,0 h10 v1 h-10 z M13,1 h3 v1 h-3 z M20,1 h7 v1 h-7 z M12,2 h2 v2 h-2 z M17,2 h10 v1 h-10 z M15,3 h12 v1 h-12 z M12,4 h15 v1 h-15 z M12,5 h2 v3 h-2 z M16,5 h2 v1 h-2 z M26,5 h1 v1 h-1 z M26,7 h1 v2 h-1 z M13,8 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M27,2 h1 v4 h-1 z M14,5 h2 v1 h-2 z M18,5 h1 v1 h-1 z M24,5 h2 v1 h-2 z M14,6 h1 v1 h-1 z M26,6 h2 v1 h-2 z M27,7 h1 v2 h-1 z M12,8 h1 v1 h-1 z M13,9 h1 v1 h-1 z M26,9 h1 v1 h-1 z" fill="#fbc02d" />
    <path d="M16,1 h4 v1 h-4 z M14,2 h3 v1 h-3 z M14,3 h1 v1 h-1 z" fill="#fff59d" />
    {/* Face & arms */}
    <path d="M19,5 h5 v1 h-5 z M15,6 h11 v1 h-11 z M14,7 h2 v2 h-2 z M18,7 h4 v2 h-4 z M24,7 h2 v2 h-2 z M14,9 h1 v1 h-1 z M16,9 h8 v1 h-8 z M25,9 h1 v1 h-1 z M14,10 h5 v1 h-5 z M21,10 h5 v1 h-5 z M16,11 h8 v1 h-8 z M10,19 h3 v2 h-3 z M27,19 h3 v2 h-3 z M10,21 h2 v2 h-2 z M28,21 h2 v2 h-2 z M10,23 h3 v1 h-3 z M27,23 h3 v1 h-3 z M11,24 h3 v1 h-3 z M26,24 h3 v1 h-3 z M12,25 h2 v1 h-2 z M26,25 h2 v1 h-2 z" fill="#ffccaa" />
    <path d="M15,11 h1 v1 h-1 z M24,11 h1 v1 h-1 z M17,12 h6 v1 h-6 z M18,13 h4 v1 h-4 z M20,14 h1 v1 h-1 z M12,21 h1 v2 h-1 z M27,21 h1 v2 h-1 z M11,25 h1 v1 h-1 z M28,25 h1 v1 h-1 z" fill="#eeb38f" />
    <path d="M15,9 h1 v1 h-1 z M24,9 h1 v1 h-1 z" fill="#ffab91" />
    <path d="M19,10 h2 v1 h-2 z" fill="#c2705a" />
    {/* Eyes */}
    <path d="M16,7 h1 v1 h-1 z M22,7 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M17,7 h1 v1 h-1 z M23,7 h1 v1 h-1 z M16,8 h2 v1 h-2 z M22,8 h2 v1 h-2 z" fill="#3e2723" />
    {/* T-shirt */}
    <path d="M14,13 h2 v1 h-2 z M24,13 h2 v1 h-2 z M12,14 h6 v1 h-6 z M23,14 h5 v1 h-5 z M11,15 h18 v1 h-18 z M10,16 h20 v1 h-20 z M10,17 h3 v1 h-3 z M14,17 h12 v1 h-12 z M27,17 h3 v1 h-3 z M13,18 h14 v1 h-14 z M14,19 h12 v3 h-12 z" fill="#4caf50" />
    <path d="M13,17 h1 v1 h-1 z M26,17 h1 v1 h-1 z M10,18 h3 v1 h-3 z M27,18 h3 v1 h-3 z M13,19 h1 v3 h-1 z M26,19 h1 v3 h-1 z" fill="#388e3c" />
    <path d="M16,13 h2 v1 h-2 z M22,13 h2 v1 h-2 z M18,14 h2 v1 h-2 z M21,14 h2 v1 h-2 z" fill="#81c784" />
  </svg>
));

export const StudentBrownHairSprite = React.memo(() => (
  <svg viewBox="0 0 40 26" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Long hair */}
    <path d="M15,0 h10 v1 h-10 z M13,1 h4 v1 h-4 z M20,1 h7 v1 h-7 z M12,2 h3 v1 h-3 z M17,2 h11 v1 h-11 z M12,3 h16 v1 h-16 z M12,4 h8 v1 h-8 z M21,4 h7 v1 h-7 z M12,5 h5 v1 h-5 z M23,5 h5 v1 h-5 z M12,6 h3 v1 h-3 z M25,6 h3 v1 h-3 z M12,7 h2 v4 h-2 z M26,7 h2 v4 h-2 z M12,11 h3 v1 h-3 z M25,11 h3 v1 h-3 z M11,12 h5 v1 h-5 z M24,12 h5 v1 h-5 z M10,13 h6 v1 h-6 z M24,13 h6 v1 h-6 z M10,14 h5 v1 h-5 z M25,14 h5 v1 h-5 z M10,15 h4 v1 h-4 z M26,15 h4 v1 h-4 z M10,16 h3 v1 h-3 z M27,16 h3 v1 h-3 z M11,17 h2 v1 h-2 z M27,17 h2 v1 h-2 z M12,18 h1 v1 h-1 z M27,18 h1 v1 h-1 z M13,19 h1 v1 h-1 z M26,19 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M20,4 h1 v1 h-1 z M17,5 h1 v1 h-1 z M22,5 h1 v1 h-1 z M15,6 h1 v1 h-1 z M24,6 h1 v1 h-1 z M14,7 h1 v4 h-1 z M25,7 h1 v4 h-1 z M15,11 h1 v1 h-1 z M24,11 h1 v1 h-1 z M16,12 h1 v1 h-1 z M23,12 h1 v1 h-1 z M14,15 h1 v1 h-1 z M25,15 h1 v1 h-1 z M13,16 h1 v3 h-1 z M26,16 h1 v3 h-1 z M12,19 h1 v1 h-1 z M27,19 h1 v1 h-1 z M13,20 h1 v1 h-1 z M26,20 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M17,1 h3 v1 h-3 z M15,2 h2 v1 h-2 z" fill="#8d6e63" />
    {/* Face & hands */}
    <path d="M18,5 h4 v1 h-4 z M16,6 h8 v1 h-8 z M15,7 h1 v2 h-1 z M18,7 h4 v2 h-4 z M24,7 h1 v2 h-1 z M16,9 h8 v1 h-8 z M15,10 h4 v1 h-4 z M21,10 h4 v1 h-4 z M16,11 h8 v1 h-8 z M11,24 h3 v1 h-3 z M26,24 h3 v1 h-3 z M12,25 h2 v1 h-2 z M26,25 h2 v1 h-2 z" fill="#ffb74d" />
    <path d="M17,12 h6 v1 h-6 z M18,13 h4 v1 h-4 z M11,25 h1 v1 h-1 z M28,25 h1 v1 h-1 z" fill="#f09a3a" />
    <path d="M15,9 h1 v1 h-1 z M24,9 h1 v1 h-1 z" fill="#ff8a65" />
    <path d="M19,10 h2 v1 h-2 z" fill="#b5533c" />
    {/* Eyes */}
    <path d="M16,7 h1 v1 h-1 z M22,7 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M17,7 h1 v1 h-1 z M23,7 h1 v1 h-1 z M16,8 h2 v1 h-2 z M22,8 h2 v1 h-2 z" fill="#4e342e" />
    {/* Sweater */}
    <path d="M16,13 h1 v1 h-1 z M23,13 h1 v1 h-1 z M15,14 h3 v1 h-3 z M22,14 h3 v1 h-3 z M15,15 h10 v1 h-10 z M14,16 h12 v3 h-12 z M10,18 h1 v1 h-1 z M29,18 h1 v1 h-1 z M10,19 h2 v2 h-2 z M15,19 h10 v2 h-10 z M28,19 h2 v2 h-2 z M10,21 h3 v1 h-3 z M14,21 h12 v1 h-12 z M27,21 h3 v1 h-3 z M11,22 h3 v1 h-3 z M26,22 h3 v1 h-3 z" fill="#ab47bc" />
    <path d="M10,17 h1 v1 h-1 z M29,17 h1 v1 h-1 z M11,18 h1 v1 h-1 z M28,18 h1 v1 h-1 z M14,19 h1 v2 h-1 z M25,19 h1 v2 h-1 z M12,20 h1 v1 h-1 z M27,20 h1 v1 h-1 z M13,21 h1 v1 h-1 z M26,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M29,22 h1 v1 h-1 z" fill="#8e24aa" />
    <path d="M17,13 h1 v1 h-1 z M22,13 h1 v1 h-1 z M18,14 h4 v1 h-4 z M11,23 h3 v1 h-3 z M26,23 h3 v1 h-3 z" fill="#ce93d8" />
  </svg>
));

export const StudentPonytailSprite = React.memo(() => (
  <svg viewBox="0 0 40 26" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hair & ponytail */}
    <path d="M15,0 h10 v1 h-10 z M13,1 h3 v1 h-3 z M20,1 h7 v1 h-7 z M12,2 h2 v2 h-2 z M17,2 h11 v1 h-11 z M15,3 h13 v1 h-13 z M30,3 h2 v1 h-2 z M12,4 h16 v1 h-16 z M29,4 h1 v1 h-1 z M31,4 h2 v1 h-2 z M12,5 h3 v1 h-3 z M16,5 h3 v1 h-3 z M20,5 h3 v1 h-3 z M24,5 h4 v1 h-4 z M30,5 h1 v1 h-1 z M32,5 h2 v1 h-2 z M12,6 h2 v2 h-2 z M26,6 h2 v2 h-2 z M31,6 h1 v2 h-1 z M33,6 h1 v2 h-1 z M13,8 h1 v2 h-1 z M26,8 h1 v2 h-1 z M31,8 h3 v2 h-3 z M32,10 h2 v1 h-2 z M32,11 h1 v1 h-1 z" fill="#212121" />
    <path d="M12,8 h1 v1 h-1 z M27,8 h1 v1 h-1 z M33,11 h1 v2 h-1 z" fill="#000000" />
    <path d="M16,1 h4 v1 h-4 z M14,2 h3 v1 h-3 z M14,3 h1 v1 h-1 z M30,4 h1 v1 h-1 z M15,5 h1 v1 h-1 z M19,5 h1 v1 h-1 z M23,5 h1 v1 h-1 z M31,5 h1 v1 h-1 z M32,6 h1 v2 h-1 z" fill="#455a64" />
    {/* Scrunchie */}
    <path d="M28,2 h2 v1 h-2 z M29,3 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M28,3 h1 v1 h-1 z" fill="#f9a825" />
    {/* Face & hands */}
    <path d="M14,6 h12 v1 h-12 z M14,7 h2 v2 h-2 z M18,7 h4 v2 h-4 z M24,7 h2 v2 h-2 z M14,9 h1 v1 h-1 z M16,9 h8 v1 h-8 z M25,9 h1 v1 h-1 z M14,10 h5 v1 h-5 z M21,10 h5 v1 h-5 z M16,11 h8 v1 h-8 z M11,24 h3 v1 h-3 z M26,24 h3 v1 h-3 z M12,25 h2 v1 h-2 z M26,25 h2 v1 h-2 z" fill="#ffe0b2" />
    <path d="M15,11 h1 v1 h-1 z M24,11 h1 v1 h-1 z M17,12 h6 v1 h-6 z M18,13 h4 v1 h-4 z M20,14 h1 v1 h-1 z M11,25 h1 v1 h-1 z M28,25 h1 v1 h-1 z" fill="#f0c48a" />
    <path d="M15,9 h1 v1 h-1 z M24,9 h1 v1 h-1 z" fill="#ffab91" />
    <path d="M19,10 h2 v1 h-2 z" fill="#d2706a" />
    {/* Eyes */}
    <path d="M16,7 h1 v1 h-1 z M22,7 h1 v1 h-1 z" fill="#ffffff" />
    <path d="M17,7 h1 v1 h-1 z M23,7 h1 v1 h-1 z" fill="#263238" />
    <path d="M16,8 h1 v1 h-1 z M22,8 h1 v1 h-1 z" fill="#546e7a" />
    <path d="M17,8 h1 v1 h-1 z M23,8 h1 v1 h-1 z" fill="#78909c" />
    {/* Sweater */}
    <path d="M14,13 h2 v1 h-2 z M24,13 h2 v1 h-2 z M12,14 h6 v1 h-6 z M23,14 h5 v1 h-5 z M11,15 h18 v1 h-18 z M10,16 h20 v1 h-20 z M10,17 h3 v5 h-3 z M14,17 h12 v5 h-12 z M27,17 h3 v5 h-3 z M11,22 h3 v1 h-3 z M26,22 h3 v1 h-3 z" fill="#ff4081" />
    <path d="M13,17 h1 v5 h-1 z M26,17 h1 v5 h-1 z M10,22 h1 v1 h-1 z M29,22 h1 v1 h-1 z" fill="#d81b60" />
    <path d="M16,13 h2 v1 h-2 z M22,13 h2 v1 h-2 z M18,14 h2 v1 h-2 z M21,14 h2 v1 h-2 z M11,23 h3 v1 h-3 z M26,23 h3 v1 h-3 z" fill="#ff80ab" />
  </svg>
));

export const SeatedFarmerSprite = React.memo(({ eyes = 'open' }) => (
  <svg viewBox="0 0 40 38" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Hat & flower */}
    <path d="M15,0 h10 v1 h-10 z M14,1 h1 v1 h-1 z M17,1 h9 v1 h-9 z M13,2 h1 v2 h-1 z M16,2 h11 v1 h-11 z M15,3 h1 v1 h-1 z M17,3 h10 v1 h-10 z M8,6 h24 v1 h-24 z M9,7 h24 v1 h-24 z" fill="#f48fb1" />
    <path d="M15,1 h2 v1 h-2 z M14,2 h2 v1 h-2 z M14,3 h1 v1 h-1 z M7,7 h2 v1 h-2 z" fill="#f8bbd0" />
    <path d="M8,8 h24 v1 h-24 z" fill="#ec407a" />
    <path d="M13,4 h2 v1 h-2 z M18,4 h9 v1 h-9 z M13,5 h3 v1 h-3 z M17,5 h10 v1 h-10 z" fill="#d81b60" />
    <path d="M16,3 h1 v1 h-1 z M15,4 h1 v1 h-1 z M17,4 h1 v1 h-1 z M16,5 h1 v1 h-1 z" fill="#ff4081" />
    <path d="M16,4 h1 v1 h-1 z" fill="#fdd835" />
    {/* Hair & braids */}
    <path d="M13,9 h14 v1 h-14 z M13,10 h2 v1 h-2 z M17,10 h1 v1 h-1 z M22,10 h1 v1 h-1 z M25,10 h2 v1 h-2 z M13,11 h1 v4 h-1 z M26,11 h1 v4 h-1 z M12,15 h1 v1 h-1 z M14,15 h1 v1 h-1 z M25,15 h1 v1 h-1 z M27,15 h1 v1 h-1 z M13,16 h1 v2 h-1 z M26,16 h1 v2 h-1 z M15,17 h1 v1 h-1 z M24,17 h1 v1 h-1 z M14,18 h1 v1 h-1 z M25,18 h1 v1 h-1 z M13,19 h1 v1 h-1 z M15,19 h1 v1 h-1 z M24,19 h1 v1 h-1 z M26,19 h1 v1 h-1 z M14,20 h1 v1 h-1 z M25,20 h1 v1 h-1 z M13,21 h1 v1 h-1 z M15,21 h1 v1 h-1 z M24,21 h1 v1 h-1 z M26,21 h1 v1 h-1 z M14,22 h1 v1 h-1 z M25,22 h1 v1 h-1 z M14,24 h1 v2 h-1 z M25,24 h1 v2 h-1 z" fill="#d84315" />
    <path d="M12,9 h1 v6 h-1 z M27,9 h1 v6 h-1 z M14,14 h1 v1 h-1 z M25,14 h1 v1 h-1 z M13,15 h1 v1 h-1 z M26,15 h1 v1 h-1 z M12,16 h1 v1 h-1 z M14,16 h1 v2 h-1 z M25,16 h1 v2 h-1 z M27,16 h1 v1 h-1 z M13,18 h1 v1 h-1 z M15,18 h1 v1 h-1 z M24,18 h1 v1 h-1 z M26,18 h1 v1 h-1 z M14,19 h1 v1 h-1 z M25,19 h1 v1 h-1 z M13,20 h1 v1 h-1 z M15,20 h1 v1 h-1 z M24,20 h1 v1 h-1 z M26,20 h1 v1 h-1 z M14,21 h1 v1 h-1 z M25,21 h1 v1 h-1 z M13,22 h1 v1 h-1 z M15,22 h1 v1 h-1 z M24,22 h1 v1 h-1 z M26,22 h1 v1 h-1 z M13,24 h1 v1 h-1 z M15,24 h1 v1 h-1 z M24,24 h1 v1 h-1 z M26,24 h1 v1 h-1 z" fill="#bf360c" />
    <path d="M13,23 h3 v1 h-3 z M24,23 h3 v1 h-3 z" fill="#4caf50" />
    {/* Face */}
    <path d="M15,10 h2 v1 h-2 z M18,10 h4 v1 h-4 z M23,10 h2 v1 h-2 z M14,11 h12 v2 h-12 z M14,13 h1 v1 h-1 z M16,13 h8 v1 h-8 z M25,13 h1 v1 h-1 z M15,14 h4 v1 h-4 z M21,14 h4 v1 h-4 z M16,15 h8 v1 h-8 z" fill="#ffccaa" />
    <path d="M18,16 h4 v2 h-4 z" fill="#eeb38f" />
    <path d="M15,13 h1 v1 h-1 z M24,13 h1 v1 h-1 z" fill="#ff8a80" />
    <path d="M19,14 h2 v1 h-2 z" fill="#c2705a" />
    {/* Shirt & overalls */}
    <path d="M11,17 h2 v8 h-2 z M17,17 h1 v1 h-1 z M22,17 h1 v1 h-1 z M27,17 h2 v8 h-2 z M11,25 h3 v1 h-3 z M15,25 h1 v1 h-1 z M24,25 h1 v1 h-1 z M26,25 h3 v1 h-3 z M11,26 h5 v12 h-5 z M24,26 h5 v12 h-5 z" fill="#e53935" />
    <path d="M17,18 h6 v2 h-6 z M16,20 h8 v1 h-8 z M16,21 h2 v3 h-2 z M22,21 h2 v3 h-2 z M19,22 h2 v1 h-2 z M16,24 h8 v14 h-8 z" fill="#1e88e5" />
    <path d="M16,17 h1 v2 h-1 z M23,17 h1 v2 h-1 z M18,21 h4 v1 h-4 z M18,22 h1 v1 h-1 z M21,22 h1 v1 h-1 z M18,23 h4 v1 h-4 z" fill="#1565c0" />
    <path d="M16,19 h1 v1 h-1 z M23,19 h1 v1 h-1 z" fill="#fdd835" />
    {/* Eyes droop as she dozes off */}
    {eyes === 'open' && <>
      <path d="M16,11 h1 v1 h-1 z M22,11 h1 v1 h-1 z" fill="#ffffff" />
      <path d="M17,11 h1 v1 h-1 z M16,12 h2 v1 h-2 z M23,11 h1 v1 h-1 z M22,12 h2 v1 h-2 z" fill="#3e2723" />
    </>}
    {eyes === 'heavy' && <>
      <path d="M16,11 h2 v1 h-2 z M22,11 h2 v1 h-2 z" fill="#eeb38f" />
      <path d="M16,12 h2 v1 h-2 z M22,12 h2 v1 h-2 z" fill="#3e2723" />
    </>}
    {eyes === 'closed' && <path d="M15,12 h3 v1 h-3 z M22,12 h3 v1 h-3 z" fill="#3e2723" />}
  </svg>
));

export const KittenSprite = React.memo(({ gray = false, hat = null }) => {
  const fur = gray ? "#bdbdbd" : "#ffb74d";
  const shade = gray ? "#9e9e9e" : "#fb8c00";
  // Wizard hat colours: [cone, cone shade, brim]
  const hatColors = hat === 'purple' ? ["#7e57c2", "#5e35b1", "#4527a0"] : ["#42a5f5", "#1e88e5", "#1565c0"];

  return (
    <svg viewBox="0 0 14 11" className="w-full h-full drop-shadow-sm" overflow="visible" shapeRendering="crispEdges">
      {hat && (
        <>
          {/* Wizard hat (the cone rises above the sprite box) */}
          <path d="M7,0 h8 v1 h-8 z" fill={hatColors[2]} />
          <path d="M8,-1 h6 v1 h-6 z M9,-2 h5 v1 h-5 z M9,-3 h4 v1 h-4 z M10,-4 h3 v1 h-3 z M10,-5 h2 v1 h-2 z M11,-6 h1 v1 h-1 z" fill={hatColors[0]} />
          <path d="M13,-2 h1 v2 h-1 z M12,-4 h1 v2 h-1 z M11,-5 h1 v1 h-1 z" fill={hatColors[1]} />
          <path d="M11,-3 h1 v3 h-1 z M10,-2 h3 v1 h-3 z M10,-4 h1 v1 h-1 z" fill="#fdd835" />
        </>
      )}
      {/* Head, ears & body */}
      <path d="M9,0 h1 v1 h-1 z M12,0 h1 v1 h-1 z M8,1 h6 v3 h-6 z M4,4 h9 v1 h-9 z M3,5 h11 v1 h-11 z M3,6 h10 v2 h-10 z M3,8 h9 v1 h-9 z" fill={fur} />
      {/* Legs, tail & tabby stripes */}
      <path d="M3,9 h2 v2 h-2 z M6,9 h2 v2 h-2 z M9,9 h2 v2 h-2 z M1,5 h1 v3 h-1 z M2,8 h1 v1 h-1 z M5,5 h1 v1 h-1 z M7,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z" fill={shade} />
      {/* Ears, nose & eyes */}
      <path d="M9,1 h1 v1 h-1 z M12,1 h1 v1 h-1 z M13,4 h1 v1 h-1 z" fill="#f48fb1" />
      <path d="M10,3 h1 v1 h-1 z M12,3 h1 v1 h-1 z" fill="#43a047" />
    </svg>
  );
});
