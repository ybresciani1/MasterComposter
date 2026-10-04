import React from 'react';

export const LightningSprite = React.memo(({ color = "#ab47bc" }) => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" shapeRendering="crispEdges">
    {/* Bolt */}
    <path d="M18,0 h6 v1 h-6 z M17,1 h3 v2 h-3 z M22,1 h2 v2 h-2 z M16,3 h3 v1 h-3 z M21,3 h2 v1 h-2 z M16,4 h2 v1 h-2 z M20,4 h3 v1 h-3 z M15,5 h2 v2 h-2 z M19,5 h3 v1 h-3 z M19,6 h2 v1 h-2 z M14,7 h2 v2 h-2 z M18,7 h2 v2 h-2 z M13,9 h2 v1 h-2 z M17,9 h7 v1 h-7 z M13,10 h3 v1 h-3 z M20,10 h4 v1 h-4 z M13,11 h7 v1 h-7 z M22,11 h2 v1 h-2 z M18,12 h3 v1 h-3 z M23,12 h2 v1 h-2 z M18,13 h2 v1 h-2 z M22,13 h3 v1 h-3 z M17,14 h2 v2 h-2 z M21,14 h3 v1 h-3 z M21,15 h2 v1 h-2 z M16,16 h2 v2 h-2 z M20,16 h2 v2 h-2 z M15,18 h2 v2 h-2 z M19,18 h2 v2 h-2 z M14,20 h2 v2 h-2 z M18,20 h2 v1 h-2 z M18,21 h1 v1 h-1 z M13,22 h2 v2 h-2 z M17,22 h1 v1 h-1 z M16,23 h1 v1 h-1 z M12,24 h2 v1 h-2 z M15,24 h1 v1 h-1 z M12,25 h3 v1 h-3 z M11,26 h3 v1 h-3 z M11,27 h2 v1 h-2 z M10,28 h2 v1 h-2 z M10,29 h1 v1 h-1 z M9,30 h1 v1 h-1 z" fill={color} />
    {/* Core */}
    <path d="M20,1 h2 v2 h-2 z M19,3 h2 v1 h-2 z M18,4 h2 v1 h-2 z M17,5 h2 v2 h-2 z M16,7 h2 v2 h-2 z M15,9 h2 v1 h-2 z M16,10 h4 v1 h-4 z M20,11 h2 v1 h-2 z M21,12 h2 v1 h-2 z M20,13 h2 v1 h-2 z M19,14 h2 v2 h-2 z M18,16 h2 v2 h-2 z M17,18 h2 v2 h-2 z M16,20 h2 v2 h-2 z M15,22 h2 v1 h-2 z M15,23 h1 v1 h-1 z M14,24 h1 v1 h-1 z" fill="#ffffff" opacity="0.85" />
  </svg>
));

export const TumbleweedSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Tumbleweed */}
    <path d="M12,3 h1 v1 h-1 z M11,4 h1 v1 h-1 z M13,4 h5 v1 h-5 z M7,5 h1 v1 h-1 z M9,5 h6 v1 h-6 z M16,5 h1 v1 h-1 z M20,5 h1 v1 h-1 z M8,6 h4 v1 h-4 z M13,6 h3 v1 h-3 z M24,6 h1 v1 h-1 z M7,7 h4 v1 h-4 z M12,7 h4 v1 h-4 z M6,8 h8 v1 h-8 z M19,8 h1 v1 h-1 z M6,9 h7 v1 h-7 z M23,9 h1 v1 h-1 z M6,10 h6 v1 h-6 z M14,10 h1 v1 h-1 z M27,10 h1 v1 h-1 z M4,11 h7 v1 h-7 z M18,11 h1 v1 h-1 z M5,12 h1 v1 h-1 z M7,12 h1 v1 h-1 z M9,12 h1 v1 h-1 z M22,12 h1 v1 h-1 z M4,13 h3 v3 h-3 z M8,13 h1 v1 h-1 z M13,13 h1 v1 h-1 z M26,13 h1 v1 h-1 z M17,14 h1 v1 h-1 z M8,15 h1 v1 h-1 z M21,15 h1 v1 h-1 z M4,16 h2 v1 h-2 z M12,16 h1 v1 h-1 z M25,16 h1 v1 h-1 z M3,17 h2 v1 h-2 z M16,17 h1 v1 h-1 z M29,17 h1 v1 h-1 z M7,18 h1 v1 h-1 z M20,18 h1 v1 h-1 z M11,19 h1 v1 h-1 z M24,19 h1 v1 h-1 z M15,20 h1 v1 h-1 z M28,20 h1 v1 h-1 z M6,21 h1 v1 h-1 z M19,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M23,22 h1 v1 h-1 z M14,23 h1 v1 h-1 z M27,23 h1 v1 h-1 z M5,24 h1 v1 h-1 z M18,24 h1 v1 h-1 z M9,25 h1 v1 h-1 z M22,25 h1 v1 h-1 z M13,26 h1 v1 h-1 z M17,27 h1 v1 h-1 z M21,28 h1 v1 h-1 z M12,29 h1 v1 h-1 z" fill="#bcaaa4" />
    <path d="M19,4 h2 v1 h-2 z M17,5 h3 v1 h-3 z M21,5 h2 v1 h-2 z M16,6 h2 v1 h-2 z M20,6 h4 v1 h-4 z M16,7 h5 v1 h-5 z M22,7 h3 v1 h-3 z M14,8 h4 v1 h-4 z M21,8 h3 v1 h-3 z M25,8 h1 v1 h-1 z M13,9 h10 v1 h-10 z M24,9 h3 v1 h-3 z M12,10 h2 v1 h-2 z M15,10 h6 v1 h-6 z M23,10 h1 v1 h-1 z M25,10 h2 v1 h-2 z M12,11 h3 v1 h-3 z M16,11 h2 v1 h-2 z M19,11 h9 v1 h-9 z M10,12 h12 v1 h-12 z M23,12 h5 v1 h-5 z M9,13 h4 v1 h-4 z M14,13 h3 v1 h-3 z M18,13 h8 v1 h-8 z M27,13 h1 v2 h-1 z M8,14 h2 v1 h-2 z M11,14 h6 v1 h-6 z M18,14 h5 v1 h-5 z M24,14 h2 v1 h-2 z M7,15 h1 v1 h-1 z M9,15 h4 v1 h-4 z M14,15 h5 v1 h-5 z M20,15 h1 v1 h-1 z M22,15 h1 v1 h-1 z M24,15 h4 v1 h-4 z M6,16 h2 v1 h-2 z M9,16 h1 v1 h-1 z M11,16 h1 v1 h-1 z M13,16 h3 v1 h-3 z M17,16 h7 v1 h-7 z M26,16 h2 v1 h-2 z M6,17 h10 v1 h-10 z M17,17 h2 v1 h-2 z M20,17 h8 v1 h-8 z M4,18 h3 v1 h-3 z M8,18 h1 v1 h-1 z M10,18 h6 v1 h-6 z M17,18 h3 v1 h-3 z M21,18 h1 v1 h-1 z M23,18 h2 v1 h-2 z M26,18 h2 v2 h-2 z M4,19 h7 v1 h-7 z M12,19 h11 v1 h-11 z M4,20 h6 v1 h-6 z M11,20 h4 v1 h-4 z M17,20 h5 v1 h-5 z M23,20 h3 v1 h-3 z M27,20 h1 v1 h-1 z M5,21 h1 v1 h-1 z M7,21 h2 v1 h-2 z M10,21 h9 v1 h-9 z M20,21 h7 v1 h-7 z M5,22 h5 v1 h-5 z M12,22 h11 v1 h-11 z M24,22 h3 v1 h-3 z M6,23 h8 v1 h-8 z M16,23 h10 v1 h-10 z M7,24 h1 v1 h-1 z M9,24 h3 v1 h-3 z M13,24 h5 v1 h-5 z M19,24 h1 v1 h-1 z M21,24 h4 v1 h-4 z M8,25 h1 v1 h-1 z M10,25 h1 v1 h-1 z M12,25 h1 v1 h-1 z M14,25 h7 v1 h-7 z M23,25 h1 v1 h-1 z M9,26 h4 v1 h-4 z M15,26 h8 v1 h-8 z M11,27 h6 v1 h-6 z M18,27 h3 v1 h-3 z" fill="#a1887f" />
    <path d="M12,2 h8 v1 h-8 z M10,3 h2 v1 h-2 z M13,3 h9 v1 h-9 z M8,4 h3 v1 h-3 z M12,4 h1 v1 h-1 z M18,4 h1 v1 h-1 z M21,4 h3 v1 h-3 z M8,5 h1 v1 h-1 z M15,5 h1 v1 h-1 z M23,5 h2 v1 h-2 z M6,6 h2 v1 h-2 z M19,6 h1 v1 h-1 z M25,6 h1 v1 h-1 z M5,7 h2 v1 h-2 z M21,7 h1 v1 h-1 z M25,7 h2 v1 h-2 z M5,8 h1 v1 h-1 z M18,8 h1 v1 h-1 z M20,8 h1 v1 h-1 z M24,8 h1 v1 h-1 z M26,8 h2 v1 h-2 z M4,9 h2 v1 h-2 z M3,10 h2 v1 h-2 z M21,10 h2 v1 h-2 z M24,10 h1 v1 h-1 z M28,10 h1 v2 h-1 z M3,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M15,11 h1 v1 h-1 z M2,12 h3 v1 h-3 z M8,12 h1 v1 h-1 z M28,12 h2 v5 h-2 z M2,13 h2 v4 h-2 z M7,13 h1 v1 h-1 z M23,14 h1 v2 h-1 z M26,14 h1 v1 h-1 z M13,15 h1 v1 h-1 z M19,15 h1 v1 h-1 z M10,16 h1 v1 h-1 z M16,16 h1 v1 h-1 z M24,16 h1 v1 h-1 z M2,17 h1 v1 h-1 z M5,17 h1 v1 h-1 z M28,17 h1 v1 h-1 z M2,18 h2 v2 h-2 z M16,18 h1 v1 h-1 z M22,18 h1 v1 h-1 z M25,18 h1 v2 h-1 z M28,18 h2 v2 h-2 z M3,20 h1 v1 h-1 z M26,20 h1 v1 h-1 z M3,21 h2 v1 h-2 z M27,21 h2 v1 h-2 z M4,22 h1 v1 h-1 z M27,22 h1 v1 h-1 z M4,23 h2 v1 h-2 z M15,23 h1 v1 h-1 z M26,23 h1 v1 h-1 z M6,24 h1 v1 h-1 z M8,24 h1 v1 h-1 z M20,24 h1 v1 h-1 z M25,24 h2 v1 h-2 z M6,25 h2 v1 h-2 z M13,25 h1 v1 h-1 z M21,25 h1 v1 h-1 z M24,25 h2 v1 h-2 z M7,26 h2 v1 h-2 z M14,26 h1 v1 h-1 z M23,26 h2 v1 h-2 z M8,27 h3 v1 h-3 z M21,27 h3 v1 h-3 z M10,28 h4 v1 h-4 z M15,28 h5 v1 h-5 z M13,29 h7 v1 h-7 z" fill="#5d4037" />
    <path d="M12,6 h1 v1 h-1 z M18,6 h1 v1 h-1 z M11,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M27,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M6,12 h1 v1 h-1 z M17,13 h1 v1 h-1 z M7,14 h1 v1 h-1 z M10,14 h1 v1 h-1 z M8,16 h1 v1 h-1 z M19,17 h1 v1 h-1 z M9,18 h1 v1 h-1 z M23,19 h1 v1 h-1 z M10,20 h1 v1 h-1 z M16,20 h1 v1 h-1 z M22,20 h1 v1 h-1 z M9,21 h1 v1 h-1 z M11,22 h1 v1 h-1 z M12,24 h1 v1 h-1 z M11,25 h1 v1 h-1 z M14,28 h1 v1 h-1 z M20,28 h1 v1 h-1 z" fill="#3e2723" />
  </svg>
));

export const FireSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Logs */}
    <path d="M4,26 h24 v1 h-24 z M4,27 h6 v1 h-6 z M12,27 h16 v1 h-16 z M3,28 h26 v1 h-26 z" fill="#795548" />
    <path d="M6,25 h20 v1 h-20 z M2,28 h1 v1 h-1 z M29,28 h1 v1 h-1 z M2,29 h18 v1 h-18 z M22,29 h8 v1 h-8 z M2,30 h28 v1 h-28 z" fill="#4e342e" />
    <path d="M10,27 h2 v1 h-2 z M20,29 h2 v1 h-2 z" fill="#3e2723" />
    {/* Flames */}
    <path d="M15,6 h1 v1 h-1 z M23,6 h1 v1 h-1 z M11,7 h5 v1 h-5 z M22,7 h1 v1 h-1 z M8,8 h1 v1 h-1 z M10,8 h7 v1 h-7 z M9,9 h1 v1 h-1 z M11,9 h7 v1 h-7 z M11,10 h4 v1 h-4 z M16,10 h3 v1 h-3 z M13,11 h2 v1 h-2 z M19,11 h3 v1 h-3 z M12,12 h3 v1 h-3 z M21,12 h3 v1 h-3 z M11,13 h5 v1 h-5 z M22,13 h3 v1 h-3 z M11,14 h4 v1 h-4 z M21,14 h4 v1 h-4 z M10,15 h4 v1 h-4 z M21,15 h3 v3 h-3 z M9,16 h3 v1 h-3 z M7,17 h3 v1 h-3 z M5,18 h3 v1 h-3 z M20,18 h4 v1 h-4 z M5,19 h4 v1 h-4 z M20,19 h5 v1 h-5 z M6,20 h4 v1 h-4 z M21,20 h4 v1 h-4 z M7,21 h3 v2 h-3 z M23,21 h3 v1 h-3 z M25,22 h2 v1 h-2 z M6,23 h3 v1 h-3 z M25,23 h3 v1 h-3 z M5,24 h4 v1 h-4 z M25,24 h4 v1 h-4 z M5,25 h1 v1 h-1 z M26,25 h3 v1 h-3 z" fill="#d32f2f" />
    <path d="M15,10 h1 v1 h-1 z M19,10 h1 v1 h-1 z M12,11 h1 v1 h-1 z M15,11 h4 v1 h-4 z M15,12 h6 v1 h-6 z M16,13 h6 v1 h-6 z M15,14 h6 v1 h-6 z M14,15 h3 v1 h-3 z M18,15 h3 v2 h-3 z M12,16 h3 v1 h-3 z M10,17 h2 v1 h-2 z M17,17 h4 v1 h-4 z M8,18 h4 v1 h-4 z M17,18 h3 v2 h-3 z M9,19 h3 v1 h-3 z M10,20 h3 v3 h-3 z M18,20 h3 v1 h-3 z M19,21 h4 v1 h-4 z M21,22 h4 v1 h-4 z M9,23 h4 v2 h-4 z M22,23 h3 v2 h-3 z" fill="#f57c00" />
    <path d="M17,15 h1 v1 h-1 z M15,16 h3 v1 h-3 z M12,17 h5 v3 h-5 z M13,20 h1 v1 h-1 z M15,20 h3 v1 h-3 z M13,21 h3 v4 h-3 z M17,21 h2 v1 h-2 z M19,22 h2 v1 h-2 z M20,23 h2 v2 h-2 z" fill="#fbc02d" />
    <path d="M14,20 h1 v1 h-1 z M16,21 h1 v1 h-1 z M16,22 h3 v1 h-3 z M16,23 h4 v2 h-4 z" fill="#fff176" />
  </svg>
));

export const SkeletonCowSprite = React.memo(() => (
  <svg viewBox="0 0 48 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M3,4 h8 v1 h-8 z M2,5 h10 v2 h-10 z M2,7 h2 v2 h-2 z M6,7 h2 v2 h-2 z M10,7 h2 v1 h-2 z M10,8 h34 v1 h-34 z M2,9 h10 v2 h-10 z M15,10 h1 v9 h-1 z M19,10 h1 v9 h-1 z M23,10 h1 v9 h-1 z M27,10 h1 v9 h-1 z M31,10 h1 v9 h-1 z M35,10 h1 v9 h-1 z M38,10 h6 v4 h-6 z M2,11 h5 v1 h-5 z M8,11 h4 v1 h-4 z M2,12 h10 v2 h-10 z M2,14 h1 v1 h-1 z M4,14 h1 v1 h-1 z M6,14 h1 v1 h-1 z M8,14 h1 v1 h-1 z M10,14 h2 v1 h-2 z M9,23 h1 v8 h-1 z M17,23 h1 v8 h-1 z M33,23 h1 v8 h-1 z M41,23 h1 v8 h-1 z" fill="#ffffff" />
    <path d="M12,9 h32 v1 h-32 z M44,10 h1 v1 h-1 z M45,12 h1 v1 h-1 z M3,14 h1 v1 h-1 z M5,14 h1 v1 h-1 z M7,14 h1 v1 h-1 z M9,14 h1 v1 h-1 z M38,14 h6 v1 h-6 z M45,14 h1 v1 h-1 z M2,15 h10 v1 h-10 z M46,16 h1 v1 h-1 z M46,18 h1 v1 h-1 z M16,19 h1 v1 h-1 z M20,19 h1 v1 h-1 z M24,19 h1 v1 h-1 z M28,19 h1 v1 h-1 z M32,19 h1 v1 h-1 z M36,19 h1 v1 h-1 z M12,20 h32 v1 h-32 z M8,22 h4 v1 h-4 z M16,22 h4 v1 h-4 z M32,22 h4 v1 h-4 z M40,22 h4 v1 h-4 z M10,23 h1 v8 h-1 z M18,23 h1 v8 h-1 z M34,23 h1 v8 h-1 z M42,23 h1 v8 h-1 z M8,31 h4 v1 h-4 z M16,31 h4 v1 h-4 z M32,31 h4 v1 h-4 z M40,31 h4 v1 h-4 z" fill="#e0e0e0" />
    <path d="M3,2 h2 v2 h-2 z M9,2 h2 v2 h-2 z" fill="#9e9e9e" />
    {/* Eye sockets */}
    <path d="M4,7 h2 v2 h-2 z M8,7 h2 v2 h-2 z M7,11 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

export const SkeletonPigSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M24,6 h7 v1 h-7 z M23,7 h9 v1 h-9 z M4,8 h21 v1 h-21 z M27,8 h2 v2 h-2 z M31,8 h1 v2 h-1 z M23,9 h2 v1 h-2 z M6,10 h1 v6 h-1 z M9,10 h1 v6 h-1 z M12,10 h1 v6 h-1 z M15,10 h1 v6 h-1 z M18,10 h1 v6 h-1 z M21,10 h1 v6 h-1 z M23,10 h9 v2 h-9 z M23,12 h7 v1 h-7 z M31,12 h1 v1 h-1 z M23,13 h9 v1 h-9 z M23,14 h1 v1 h-1 z M25,14 h1 v1 h-1 z M27,14 h1 v1 h-1 z M29,14 h3 v1 h-3 z M5,18 h1 v5 h-1 z M11,18 h1 v5 h-1 z M19,18 h1 v5 h-1 z M25,18 h1 v5 h-1 z" fill="#ffffff" />
    <path d="M2,9 h1 v1 h-1 z M4,9 h19 v1 h-19 z M1,10 h1 v1 h-1 z M2,11 h1 v1 h-1 z M24,14 h1 v1 h-1 z M26,14 h1 v1 h-1 z M28,14 h1 v1 h-1 z M23,15 h9 v1 h-9 z M4,16 h22 v1 h-22 z M4,17 h4 v1 h-4 z M10,17 h4 v1 h-4 z M18,17 h4 v1 h-4 z M24,17 h4 v1 h-4 z M6,18 h1 v5 h-1 z M12,18 h1 v5 h-1 z M20,18 h1 v5 h-1 z M26,18 h1 v5 h-1 z M4,23 h4 v1 h-4 z M10,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M24,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M25,8 h2 v2 h-2 z M29,8 h2 v2 h-2 z M30,12 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

export const SkeletonSheepSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M25,5 h6 v1 h-6 z M24,6 h8 v1 h-8 z M5,7 h21 v1 h-21 z M28,7 h4 v1 h-4 z M24,8 h2 v1 h-2 z M28,8 h1 v1 h-1 z M31,8 h1 v2 h-1 z M7,9 h1 v6 h-1 z M10,9 h1 v6 h-1 z M13,9 h1 v6 h-1 z M16,9 h1 v6 h-1 z M19,9 h1 v6 h-1 z M22,9 h1 v6 h-1 z M24,9 h5 v1 h-5 z M24,10 h8 v2 h-8 z M24,12 h6 v1 h-6 z M31,12 h1 v1 h-1 z M24,13 h8 v1 h-8 z M7,17 h1 v6 h-1 z M12,17 h1 v6 h-1 z M19,17 h1 v6 h-1 z M24,17 h1 v6 h-1 z" fill="#ffffff" />
    <path d="M3,8 h1 v1 h-1 z M5,8 h19 v1 h-19 z M2,10 h1 v1 h-1 z M24,14 h8 v1 h-8 z M5,15 h22 v1 h-22 z M6,16 h4 v1 h-4 z M11,16 h4 v1 h-4 z M18,16 h4 v1 h-4 z M23,16 h4 v1 h-4 z M8,17 h1 v6 h-1 z M13,17 h1 v6 h-1 z M20,17 h1 v6 h-1 z M25,17 h1 v6 h-1 z M6,23 h4 v1 h-4 z M11,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M23,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M26,7 h2 v2 h-2 z M29,8 h2 v2 h-2 z M30,12 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

export const SkeletonGoatSprite = React.memo(() => (
  <svg viewBox="0 0 32 28" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M23,6 h8 v1 h-8 z M22,7 h10 v1 h-10 z M5,8 h20 v1 h-20 z M27,8 h5 v1 h-5 z M22,9 h3 v1 h-3 z M27,9 h2 v1 h-2 z M31,9 h1 v2 h-1 z M7,10 h1 v7 h-1 z M10,10 h1 v7 h-1 z M13,10 h1 v7 h-1 z M16,10 h1 v7 h-1 z M19,10 h1 v7 h-1 z M22,10 h7 v1 h-7 z M22,11 h10 v1 h-10 z M22,12 h8 v1 h-8 z M31,12 h1 v1 h-1 z M22,13 h10 v1 h-10 z M6,19 h1 v8 h-1 z M11,19 h1 v8 h-1 z M17,19 h1 v8 h-1 z M22,19 h1 v8 h-1 z" fill="#ffffff" />
    <path d="M2,7 h1 v1 h-1 z M3,8 h1 v1 h-1 z M5,9 h17 v1 h-17 z M22,14 h10 v1 h-10 z M26,15 h2 v3 h-2 z M5,17 h20 v1 h-20 z M5,18 h4 v1 h-4 z M10,18 h4 v1 h-4 z M16,18 h4 v1 h-4 z M21,18 h4 v1 h-4 z M7,19 h1 v8 h-1 z M12,19 h1 v8 h-1 z M18,19 h1 v8 h-1 z M23,19 h1 v8 h-1 z M5,27 h4 v1 h-4 z M10,27 h4 v1 h-4 z M16,27 h4 v1 h-4 z M21,27 h4 v1 h-4 z" fill="#e0e0e0" />
    <path d="M24,2 h2 v4 h-2 z M28,2 h2 v4 h-2 z" fill="#9e9e9e" />
    {/* Eye sockets */}
    <path d="M25,8 h2 v2 h-2 z M29,9 h2 v2 h-2 z M30,12 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

export const SkeletonChickenSprite = React.memo(() => (
  <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M14,3 h4 v1 h-4 z M13,4 h6 v1 h-6 z M13,5 h2 v2 h-2 z M17,5 h2 v2 h-2 z M13,7 h6 v1 h-6 z M4,9 h10 v1 h-10 z M6,11 h1 v3 h-1 z M9,11 h1 v3 h-1 z M12,11 h1 v3 h-1 z M7,16 h1 v3 h-1 z M12,16 h1 v3 h-1 z" fill="#ffffff" />
    <path d="M1,6 h1 v1 h-1 z M19,6 h1 v1 h-1 z M2,7 h1 v1 h-1 z M13,8 h6 v1 h-6 z M2,9 h1 v1 h-1 z M4,10 h10 v1 h-10 z M4,14 h10 v1 h-10 z M6,15 h4 v1 h-4 z M11,15 h4 v1 h-4 z M8,16 h1 v3 h-1 z M13,16 h1 v3 h-1 z M6,19 h4 v1 h-4 z M11,19 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M15,5 h2 v2 h-2 z" fill="#000000" />
  </svg>
));

export const SkeletonRoosterSprite = React.memo(() => (
  <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M17,6 h5 v1 h-5 z M16,7 h7 v1 h-7 z M16,8 h2 v2 h-2 z M20,8 h3 v2 h-3 z M16,10 h7 v2 h-7 z M6,12 h10 v1 h-10 z M8,14 h1 v4 h-1 z M11,14 h1 v4 h-1 z M14,14 h1 v4 h-1 z M10,20 h1 v3 h-1 z M15,20 h1 v3 h-1 z" fill="#ffffff" />
    <path d="M17,3 h4 v2 h-4 z M2,4 h1 v1 h-1 z M1,5 h1 v1 h-1 z M3,6 h1 v1 h-1 z M2,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M3,9 h1 v1 h-1 z M23,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M4,11 h1 v1 h-1 z M16,12 h7 v1 h-7 z M6,13 h11 v1 h-11 z M6,18 h10 v1 h-10 z M9,19 h4 v1 h-4 z M14,19 h4 v1 h-4 z M11,20 h1 v3 h-1 z M16,20 h1 v3 h-1 z M9,23 h4 v1 h-4 z M14,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M18,8 h2 v2 h-2 z" fill="#000000" />
  </svg>
));

export const SkeletonChickSprite = React.memo(() => (
  <svg viewBox="0 0 12 12" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M4,3 h5 v1 h-5 z M3,4 h7 v1 h-7 z M3,5 h4 v2 h-4 z M9,5 h1 v2 h-1 z M3,7 h7 v1 h-7 z" fill="#ffffff" />
    <path d="M10,6 h1 v1 h-1 z M3,8 h7 v1 h-7 z M3,9 h2 v1 h-2 z M3,10 h7 v2 h-7 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M7,5 h2 v2 h-2 z" fill="#000000" />
  </svg>
));

export const SkeletonCatSprite = React.memo(() => (
  <svg viewBox="0 0 28 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M20,2 h2 v3 h-2 z M26,2 h2 v3 h-2 z M21,5 h6 v1 h-6 z M20,6 h8 v1 h-8 z M20,7 h2 v2 h-2 z M24,7 h2 v2 h-2 z M4,9 h24 v1 h-24 z M20,10 h5 v1 h-5 z M26,10 h2 v1 h-2 z M6,11 h1 v4 h-1 z M9,11 h1 v4 h-1 z M12,11 h1 v4 h-1 z M15,11 h1 v4 h-1 z M18,11 h1 v4 h-1 z M20,11 h8 v1 h-8 z M7,17 h1 v6 h-1 z M12,17 h1 v6 h-1 z M18,17 h1 v6 h-1 z M22,17 h1 v6 h-1 z" fill="#ffffff" />
    <path d="M1,4 h1 v1 h-1 z M2,6 h1 v1 h-1 z M2,8 h1 v1 h-1 z M3,10 h17 v1 h-17 z M20,12 h8 v1 h-8 z M4,15 h18 v1 h-18 z M6,16 h9 v1 h-9 z M16,16 h9 v1 h-9 z M8,17 h1 v6 h-1 z M13,17 h1 v6 h-1 z M19,17 h1 v6 h-1 z M23,17 h1 v6 h-1 z M6,23 h4 v1 h-4 z M11,23 h4 v1 h-4 z M17,23 h8 v1 h-8 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M22,7 h2 v2 h-2 z M26,7 h2 v2 h-2 z M25,10 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

export const SkeletonDogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Bones */}
    <path d="M23,3 h8 v1 h-8 z M24,4 h8 v1 h-8 z M24,5 h1 v2 h-1 z M27,5 h5 v1 h-5 z M27,6 h2 v1 h-2 z M31,6 h1 v2 h-1 z M24,7 h5 v1 h-5 z M4,8 h18 v1 h-18 z M24,8 h8 v1 h-8 z M24,9 h6 v1 h-6 z M31,9 h1 v1 h-1 z M6,10 h1 v5 h-1 z M9,10 h1 v5 h-1 z M12,10 h1 v5 h-1 z M15,10 h1 v5 h-1 z M18,10 h1 v5 h-1 z M21,10 h1 v1 h-1 z M24,10 h8 v1 h-8 z M21,11 h11 v1 h-11 z M21,12 h1 v3 h-1 z M7,17 h1 v6 h-1 z M13,17 h1 v6 h-1 z M19,17 h1 v6 h-1 z M24,17 h1 v6 h-1 z" fill="#ffffff" />
    <path d="M1,4 h1 v1 h-1 z M22,4 h2 v5 h-2 z M2,5 h1 v1 h-1 z M2,7 h1 v1 h-1 z M3,9 h21 v1 h-21 z M22,10 h2 v1 h-2 z M22,12 h10 v1 h-10 z M4,15 h20 v1 h-20 z M6,16 h5 v1 h-5 z M12,16 h5 v1 h-5 z M18,16 h9 v1 h-9 z M8,17 h1 v6 h-1 z M14,17 h1 v6 h-1 z M20,17 h1 v6 h-1 z M25,17 h1 v6 h-1 z M6,23 h4 v1 h-4 z M12,23 h4 v1 h-4 z M18,23 h4 v1 h-4 z M23,23 h4 v1 h-4 z" fill="#e0e0e0" />
    {/* Eye sockets */}
    <path d="M25,5 h2 v2 h-2 z M29,6 h2 v2 h-2 z M30,9 h1 v1 h-1 z" fill="#000000" />
  </svg>
));

export const SkeletonFrogSprite = React.memo(() => (
  <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    <g className="frog-sit">
      {/* Bones */}
      <path d="M10,8 h4 v1 h-4 z M18,8 h4 v1 h-4 z M10,9 h1 v2 h-1 z M13,9 h1 v2 h-1 z M18,9 h1 v2 h-1 z M21,9 h1 v2 h-1 z M10,11 h4 v1 h-4 z M18,11 h4 v1 h-4 z M8,12 h16 v1 h-16 z M10,14 h1 v4 h-1 z M13,14 h1 v4 h-1 z M16,14 h1 v4 h-1 z M19,14 h1 v4 h-1 z M22,14 h1 v2 h-1 z M5,16 h4 v2 h-4 z M22,16 h5 v2 h-5 z" fill="#ffffff" />
      <path d="M8,13 h16 v1 h-16 z M11,18 h1 v1 h-1 z M14,18 h1 v1 h-1 z M17,18 h1 v1 h-1 z M20,18 h1 v1 h-1 z M23,18 h1 v1 h-1 z M3,19 h6 v1 h-6 z M23,19 h6 v1 h-6 z" fill="#e0e0e0" />
      {/* Eye sockets */}
      <path d="M11,9 h2 v2 h-2 z M19,9 h2 v2 h-2 z" fill="#000000" />
    </g>
    <g className="frog-leap">
      {/* Bones */}
      <path d="M10,4 h4 v1 h-4 z M18,4 h4 v1 h-4 z M10,5 h1 v2 h-1 z M13,5 h1 v2 h-1 z M18,5 h1 v2 h-1 z M21,5 h1 v2 h-1 z M10,7 h4 v1 h-4 z M18,7 h4 v1 h-4 z M8,8 h16 v1 h-16 z M10,10 h1 v4 h-1 z M13,10 h1 v4 h-1 z M16,10 h1 v4 h-1 z M19,10 h1 v4 h-1 z M22,10 h1 v4 h-1 z M7,12 h2 v1 h-2 z M6,13 h2 v1 h-2 z M24,13 h2 v1 h-2 z M5,14 h2 v1 h-2 z M25,14 h2 v1 h-2 z M4,15 h2 v1 h-2 z M26,15 h2 v1 h-2 z M3,16 h2 v1 h-2 z M27,16 h2 v1 h-2 z M28,17 h2 v1 h-2 z" fill="#ffffff" />
      <path d="M8,9 h16 v1 h-16 z M11,14 h1 v1 h-1 z M14,14 h1 v1 h-1 z M17,14 h1 v1 h-1 z M20,14 h1 v1 h-1 z M23,14 h1 v1 h-1 z M0,17 h4 v1 h-4 z M28,18 h4 v1 h-4 z" fill="#e0e0e0" />
      {/* Eye sockets */}
      <path d="M11,5 h2 v2 h-2 z M19,5 h2 v2 h-2 z" fill="#000000" />
    </g>
  </svg>
));

export const LocustSprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Wing */}
    <path d="M4,0 h4 v1 h-4 z M3,1 h6 v1 h-6 z M2,2 h9 v1 h-9 z M2,3 h11 v1 h-11 z M3,4 h11 v1 h-11 z" fill="#d7ccc8" opacity="0.8" />
    {/* Body & legs */}
    <path d="M2,5 h10 v1 h-10 z M1,6 h13 v1 h-13 z M1,7 h14 v1 h-14 z M4,8 h10 v1 h-10 z" fill="#5d4037" />
    <path d="M12,5 h2 v1 h-2 z M1,8 h3 v1 h-3 z M14,8 h1 v1 h-1 z M4,9 h1 v1 h-1 z M7,9 h1 v2 h-1 z M10,9 h1 v3 h-1 z M13,9 h1 v1 h-1 z M3,10 h1 v2 h-1 z M14,10 h1 v2 h-1 z M6,11 h1 v1 h-1 z M2,12 h1 v1 h-1 z M6,12 h2 v1 h-2 z M11,12 h1 v1 h-1 z M15,12 h1 v1 h-1 z" fill="#4e342e" />
    <path d="M1,5 h1 v1 h-1 z M0,6 h1 v2 h-1 z" fill="#8d6e63" />
    <path d="M14,6 h1 v1 h-1 z" fill="#d84315" />
  </svg>
));

export const BareTreeSprite = React.memo(() => (
  <svg viewBox="0 0 32 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead tree */}
    <path d="M14,17 h1 v2 h-1 z M13,19 h1 v6 h-1 z M12,25 h1 v10 h-1 z M11,35 h1 v1 h-1 z M10,36 h1 v1 h-1 z M9,37 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M18,0 h1 v2 h-1 z M10,1 h1 v1 h-1 z M11,2 h1 v2 h-1 z M17,2 h1 v4 h-1 z M28,2 h1 v2 h-1 z M12,4 h1 v2 h-1 z M27,4 h1 v2 h-1 z M22,5 h1 v2 h-1 z M13,6 h1 v2 h-1 z M16,6 h2 v3 h-2 z M26,6 h1 v2 h-1 z M23,7 h1 v2 h-1 z M14,8 h1 v1 h-1 z M25,8 h2 v1 h-2 z M14,9 h4 v1 h-4 z M24,9 h2 v2 h-2 z M15,10 h3 v3 h-3 z M24,11 h1 v1 h-1 z M23,12 h2 v1 h-2 z M14,13 h4 v4 h-4 z M22,13 h2 v1 h-2 z M4,14 h1 v2 h-1 z M21,14 h2 v1 h-2 z M8,15 h1 v2 h-1 z M20,15 h2 v1 h-2 z M5,16 h1 v2 h-1 z M19,16 h3 v1 h-3 z M7,17 h1 v1 h-1 z M15,17 h3 v2 h-3 z M19,17 h2 v2 h-2 z M6,18 h2 v2 h-2 z M14,19 h4 v6 h-4 z M19,19 h1 v1 h-1 z M7,20 h2 v1 h-2 z M8,21 h2 v1 h-2 z M9,22 h2 v1 h-2 z M10,23 h3 v1 h-3 z M11,24 h2 v1 h-2 z M13,25 h5 v10 h-5 z M12,35 h6 v1 h-6 z M11,36 h7 v1 h-7 z M10,37 h8 v1 h-8 z" fill="#4e342e" />
    <path d="M18,17 h1 v21 h-1 z M8,38 h11 v1 h-11 z" fill="#3e2723" />
  </svg>
));

export const WiltedSunflowerSprite = React.memo(() => (
  <svg viewBox="0 0 24 48" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M12,18 h2 v3 h-2 z M11,21 h1 v1 h-1 z M10,22 h1 v1 h-1 z M9,23 h1 v1 h-1 z M8,24 h1 v1 h-1 z M7,25 h1 v2 h-1 z M8,27 h1 v2 h-1 z M9,29 h1 v2 h-1 z M10,31 h1 v2 h-1 z M11,33 h1 v15 h-1 z" fill="#5d4037" />
    <path d="M12,21 h1 v1 h-1 z M11,22 h1 v1 h-1 z M10,23 h1 v1 h-1 z M9,24 h1 v1 h-1 z M8,25 h1 v2 h-1 z M9,27 h1 v2 h-1 z M10,29 h1 v2 h-1 z M11,31 h1 v2 h-1 z M12,33 h1 v9 h-1 z M5,36 h2 v1 h-2 z M4,37 h3 v1 h-3 z M3,38 h7 v1 h-7 z M5,39 h4 v1 h-4 z M14,40 h2 v1 h-2 z M14,41 h3 v1 h-3 z M12,42 h7 v1 h-7 z M12,43 h1 v5 h-1 z M14,43 h3 v1 h-3 z" fill="#4e342e" />
    {/* Drooping head */}
    <path d="M2,14 h8 v1 h-8 z M1,15 h2 v1 h-2 z M9,15 h2 v1 h-2 z M0,16 h2 v1 h-2 z M10,16 h2 v1 h-2 z M0,17 h1 v2 h-1 z M11,17 h1 v2 h-1 z M0,19 h2 v1 h-2 z M10,19 h2 v1 h-2 z M1,20 h2 v1 h-2 z M9,20 h2 v1 h-2 z M2,21 h9 v1 h-9 z M2,22 h1 v2 h-1 z M4,22 h1 v1 h-1 z M7,22 h1 v1 h-1 z M9,22 h1 v1 h-1 z M5,23 h1 v1 h-1 z M8,23 h1 v1 h-1 z M7,24 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M3,15 h1 v1 h-1 z M8,15 h1 v1 h-1 z M2,16 h1 v1 h-1 z M9,16 h1 v1 h-1 z M1,17 h1 v2 h-1 z M10,17 h1 v2 h-1 z M2,19 h1 v1 h-1 z M9,19 h1 v1 h-1 z M3,20 h1 v1 h-1 z M8,20 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M4,15 h4 v1 h-4 z M3,16 h6 v1 h-6 z M2,17 h8 v2 h-8 z M3,19 h6 v1 h-6 z M4,20 h4 v1 h-4 z" fill="#3e2723" />
  </svg>
));

export const WiltedZinniaSprite = React.memo(() => (
  <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M9,9 h2 v2 h-2 z M9,11 h1 v2 h-1 z M8,13 h1 v1 h-1 z M9,14 h1 v1 h-1 z M10,15 h1 v1 h-1 z M11,16 h1 v16 h-1 z" fill="#5d4037" />
    <path d="M10,11 h1 v2 h-1 z M9,13 h1 v1 h-1 z M10,14 h1 v1 h-1 z M11,15 h1 v1 h-1 z M12,16 h1 v9 h-1 z M5,20 h2 v1 h-2 z M4,21 h7 v1 h-7 z M6,22 h3 v1 h-3 z M14,24 h2 v1 h-2 z M12,25 h7 v1 h-7 z M12,26 h1 v6 h-1 z M14,26 h3 v1 h-3 z" fill="#4e342e" />
    {/* Drooping head */}
    <path d="M2,6 h6 v1 h-6 z M1,7 h1 v3 h-1 z M8,7 h1 v3 h-1 z M2,10 h6 v1 h-6 z M2,11 h1 v1 h-1 z M4,11 h1 v1 h-1 z M7,11 h1 v2 h-1 z" fill="#8d6e63" />
    <path d="M2,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M2,9 h1 v1 h-1 z M7,9 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M3,7 h4 v1 h-4 z M2,8 h6 v1 h-6 z M3,9 h4 v1 h-4 z" fill="#3e2723" />
  </svg>
));

export const WiltedMarigoldSprite = React.memo(() => (
  <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M13,9 h2 v2 h-2 z M13,11 h1 v3 h-1 z M12,14 h1 v2 h-1 z M11,16 h1 v16 h-1 z" fill="#5d4037" />
    <path d="M14,11 h1 v3 h-1 z M13,14 h1 v2 h-1 z M12,16 h1 v5 h-1 z M14,20 h2 v1 h-2 z M12,21 h8 v1 h-8 z M12,22 h1 v10 h-1 z M15,22 h3 v1 h-3 z M5,24 h2 v1 h-2 z M4,25 h6 v1 h-6 z M6,26 h3 v1 h-3 z" fill="#4e342e" />
    {/* Drooping head */}
    <path d="M16,6 h6 v1 h-6 z M15,7 h1 v3 h-1 z M22,7 h1 v3 h-1 z M16,10 h6 v1 h-6 z M16,11 h1 v1 h-1 z M19,11 h1 v1 h-1 z M21,11 h1 v1 h-1 z M17,12 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M16,7 h1 v1 h-1 z M21,7 h1 v1 h-1 z M16,9 h1 v1 h-1 z M21,9 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M17,7 h4 v1 h-4 z M16,8 h6 v1 h-6 z M17,9 h4 v1 h-4 z" fill="#3e2723" />
  </svg>
));

export const WiltedLavenderSprite = React.memo(() => (
  <svg viewBox="0 0 20 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Dead stem & leaves */}
    <path d="M11,11 h1 v2 h-1 z M10,13 h1 v4 h-1 z M9,17 h1 v23 h-1 z" fill="#5d4037" />
    <path d="M11,13 h1 v4 h-1 z M10,17 h1 v23 h-1 z M6,24 h1 v1 h-1 z M5,25 h2 v2 h-2 z M6,27 h1 v1 h-1 z M12,29 h1 v1 h-1 z M12,30 h2 v1 h-2 z M13,31 h2 v1 h-2 z M14,32 h1 v1 h-1 z" fill="#4e342e" />
    {/* Dead spike */}
    <path d="M15,5 h1 v2 h-1 z M14,7 h1 v2 h-1 z M16,7 h1 v2 h-1 z M13,9 h1 v3 h-1 z M15,9 h1 v3 h-1 z M14,12 h1 v2 h-1 z M16,12 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M15,4 h1 v1 h-1 z M14,5 h1 v2 h-1 z M16,5 h1 v2 h-1 z M13,7 h1 v2 h-1 z M15,7 h1 v2 h-1 z M12,9 h1 v3 h-1 z M14,9 h1 v3 h-1 z M16,9 h1 v3 h-1 z M12,12 h2 v1 h-2 z M15,12 h1 v2 h-1 z M13,13 h1 v1 h-1 z M13,14 h3 v1 h-3 z M14,15 h1 v1 h-1 z" fill="#6d4c41" />
  </svg>
));
