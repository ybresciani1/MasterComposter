import React from 'react';

// Small 16x16 icons for things the player carries, plus UI sprites

export const OrganicMatterIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Leaf */}
    <path d="M10,1 h1 v1 h-1 z M9,2 h1 v1 h-1 z M8,3 h1 v1 h-1 z" fill="#a5d6a7" />
    <path d="M11,1 h1 v1 h-1 z M10,2 h2 v1 h-2 z M9,3 h3 v1 h-3 z M8,4 h3 v1 h-3 z M9,5 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M12,2 h1 v2 h-1 z M11,4 h2 v1 h-2 z M10,5 h2 v1 h-2 z M10,6 h1 v1 h-1 z M11,7 h1 v1 h-1 z" fill="#388e3c" />
    {/* Humus */}
    <path d="M5,5 h1 v1 h-1 z M5,6 h2 v1 h-2 z M7,7 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M5,7 h2 v1 h-2 z M8,7 h3 v1 h-3 z M12,7 h2 v1 h-2 z M3,8 h2 v1 h-2 z M2,9 h1 v1 h-1 z M1,10 h1 v1 h-1 z" fill="#795548" />
    <path d="M5,8 h10 v1 h-10 z M3,9 h3 v1 h-3 z M7,9 h4 v1 h-4 z M12,9 h3 v1 h-3 z M2,10 h2 v1 h-2 z M5,10 h8 v1 h-8 z M14,10 h1 v1 h-1 z M1,11 h5 v1 h-5 z M7,11 h8 v1 h-8 z M1,12 h1 v1 h-1 z M3,12 h7 v1 h-7 z M11,12 h2 v1 h-2 z M14,12 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M6,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z M4,10 h1 v1 h-1 z M13,10 h1 v1 h-1 z M6,11 h1 v1 h-1 z M2,12 h1 v1 h-1 z M10,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z M3,13 h11 v1 h-11 z" fill="#4e342e" />
    <path d="M15,9 h1 v4 h-1 z M2,13 h1 v1 h-1 z M14,13 h1 v1 h-1 z M3,14 h11 v1 h-11 z" fill="#3e2723" />
  </svg>
));

export const MineralsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Rocks */}
    <path d="M6,3 h3 v1 h-3 z M5,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M3,7 h1 v1 h-1 z M12,8 h2 v1 h-2 z M10,9 h1 v1 h-1 z M9,10 h1 v1 h-1 z" fill="#e0e0e0" />
    <path d="M6,4 h4 v1 h-4 z M5,5 h6 v1 h-6 z M4,6 h7 v1 h-7 z M4,7 h6 v1 h-6 z M4,8 h5 v1 h-5 z M11,9 h3 v1 h-3 z M10,10 h4 v1 h-4 z M9,11 h5 v1 h-5 z M10,12 h3 v1 h-3 z" fill="#bdbdbd" />
    <path d="M10,4 h1 v1 h-1 z M11,5 h1 v1 h-1 z M11,6 h2 v1 h-2 z M10,7 h3 v1 h-3 z M9,8 h3 v1 h-3 z M5,9 h5 v1 h-5 z M14,9 h1 v1 h-1 z M14,10 h2 v2 h-2 z M9,12 h1 v1 h-1 z M13,12 h3 v1 h-3 z M10,13 h5 v1 h-5 z" fill="#9e9e9e" />
    <path d="M1,8 h2 v1 h-2 z M0,9 h4 v1 h-4 z M0,10 h5 v2 h-5 z M1,12 h3 v1 h-3 z" fill="#bcaaa4" />
    <path d="M3,8 h1 v1 h-1 z M4,9 h1 v1 h-1 z M5,10 h1 v1 h-1 z M5,11 h2 v1 h-2 z M0,12 h1 v1 h-1 z M4,12 h3 v1 h-3 z M1,13 h5 v1 h-5 z" fill="#8d6e63" />
  </svg>
));

export const WaterDropIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Water drop */}
    <path d="M7,1 h1 v1 h-1 z M6,2 h1 v2 h-1 z M8,2 h1 v2 h-1 z M5,4 h1 v2 h-1 z M9,4 h1 v2 h-1 z M4,6 h1 v2 h-1 z M10,6 h1 v2 h-1 z M3,8 h1 v4 h-1 z M11,8 h1 v4 h-1 z M4,12 h1 v1 h-1 z M10,12 h1 v1 h-1 z M5,13 h5 v1 h-5 z" fill="#0288d1" />
    <path d="M7,2 h1 v2 h-1 z M6,4 h3 v2 h-3 z M5,6 h1 v2 h-1 z M7,6 h3 v2 h-3 z M4,8 h1 v2 h-1 z M6,8 h5 v1 h-5 z M6,9 h4 v1 h-4 z M4,10 h6 v1 h-6 z M4,11 h5 v1 h-5 z M5,12 h3 v1 h-3 z" fill="#4fc3f7" />
    <path d="M6,6 h1 v2 h-1 z M5,8 h1 v2 h-1 z" fill="#e1f5fe" />
    <path d="M10,9 h1 v2 h-1 z M9,11 h2 v1 h-2 z M8,12 h2 v1 h-2 z" fill="#29b6f6" />
  </svg>
));

export const AirIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Wind */}
    <path d="M11,1 h2 v1 h-2 z M10,2 h1 v1 h-1 z M13,2 h1 v2 h-1 z M0,4 h13 v1 h-13 z" fill="#90caf9" />
    <path d="M2,6 h12 v1 h-12 z M14,7 h1 v2 h-1 z M11,9 h3 v1 h-3 z" fill="#e3f2fd" />
    <path d="M0,11 h10 v1 h-10 z M10,12 h1 v2 h-1 z M7,13 h1 v1 h-1 z M8,14 h2 v1 h-2 z" fill="#64b5f6" />
  </svg>
));

export const PlasticIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Straw */}
    <path d="M10,0 h1 v1 h-1 z M8,2 h1 v2 h-1 z" fill="#fafafa" />
    <path d="M9,1 h1 v1 h-1 z M8,4 h1 v1 h-1 z" fill="#ef5350" />
    {/* Cup */}
    <path d="M3,4 h5 v1 h-5 z M9,4 h4 v1 h-4 z M5,9 h5 v1 h-5 z" fill="#f5f5f5" />
    <path d="M4,3 h4 v1 h-4 z M9,3 h3 v1 h-3 z M3,5 h10 v1 h-10 z M10,9 h1 v1 h-1 z" fill="#cfd8dc" />
    <path d="M4,6 h1 v3 h-1 z M6,6 h5 v3 h-5 z M5,10 h1 v2 h-1 z M7,10 h3 v2 h-3 z M6,12 h3 v1 h-3 z" fill="#e53935" />
    <path d="M11,6 h1 v3 h-1 z M10,10 h1 v2 h-1 z M9,12 h1 v1 h-1 z M6,13 h4 v1 h-4 z" fill="#c62828" />
    <path d="M5,6 h1 v3 h-1 z M6,10 h1 v2 h-1 z" fill="#ff8a80" />
  </svg>
));

export const MagicIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Star */}
    <path d="M11,0 h1 v2 h-1 z M10,2 h1 v1 h-1 z M12,2 h1 v1 h-1 z M8,3 h2 v1 h-2 z M13,3 h2 v1 h-2 z M10,4 h1 v1 h-1 z M12,4 h1 v1 h-1 z M11,5 h1 v2 h-1 z" fill="#fdd835" />
    <path d="M11,2 h1 v1 h-1 z M10,3 h3 v1 h-3 z M11,4 h1 v1 h-1 z" fill="#fffde7" />
    {/* Wand */}
    <path d="M9,7 h1 v1 h-1 z M7,8 h2 v1 h-2 z M6,9 h2 v1 h-2 z M5,10 h2 v1 h-2 z M4,11 h2 v1 h-2 z M3,12 h2 v1 h-2 z M2,13 h2 v1 h-2 z" fill="#212121" />
    <path d="M9,6 h1 v1 h-1 z M8,7 h1 v1 h-1 z" fill="#f5f5f5" />
    {/* Twinkles */}
    <path d="M2,2 h1 v1 h-1 z M9,11 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M12,7 h1 v1 h-1 z" fill="#90caf9" />
  </svg>
));

export const GrassClippingsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Grass */}
    <path d="M4,7 h1 v1 h-1 z M8,7 h1 v1 h-1 z M11,8 h1 v1 h-1 z M4,9 h1 v1 h-1 z M8,10 h1 v1 h-1 z" fill="#a5d6a7" />
    <path d="M7,4 h1 v1 h-1 z M9,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M6,5 h1 v1 h-1 z M8,5 h1 v1 h-1 z M11,5 h1 v2 h-1 z M3,6 h1 v1 h-1 z M5,6 h1 v1 h-1 z M7,6 h1 v1 h-1 z M9,6 h1 v1 h-1 z M2,7 h1 v1 h-1 z M6,7 h1 v1 h-1 z M10,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M1,8 h1 v1 h-1 z M3,8 h1 v1 h-1 z M5,8 h1 v1 h-1 z M7,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z M13,8 h1 v1 h-1 z M2,9 h1 v2 h-1 z M6,9 h1 v2 h-1 z M8,9 h1 v1 h-1 z M10,9 h1 v2 h-1 z M12,9 h1 v2 h-1 z M14,9 h1 v2 h-1 z M0,10 h1 v1 h-1 z M4,10 h1 v1 h-1 z M1,11 h1 v1 h-1 z M3,11 h1 v1 h-1 z M5,11 h1 v1 h-1 z M7,11 h1 v1 h-1 z M9,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M7,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z M4,6 h1 v1 h-1 z M6,6 h1 v1 h-1 z M8,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z M12,6 h1 v1 h-1 z M3,7 h1 v1 h-1 z M5,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M9,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M2,8 h1 v1 h-1 z M4,8 h1 v1 h-1 z M6,8 h1 v1 h-1 z M8,8 h1 v1 h-1 z M10,8 h1 v1 h-1 z M12,8 h1 v1 h-1 z M14,8 h1 v1 h-1 z M1,9 h1 v2 h-1 z M3,9 h1 v2 h-1 z M5,9 h1 v2 h-1 z M7,9 h1 v2 h-1 z M9,9 h1 v2 h-1 z M11,9 h1 v2 h-1 z M13,9 h1 v2 h-1 z M15,10 h1 v1 h-1 z M0,11 h1 v1 h-1 z M2,11 h1 v1 h-1 z M4,11 h1 v1 h-1 z M6,11 h1 v1 h-1 z M8,11 h1 v1 h-1 z M10,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M14,11 h1 v1 h-1 z M1,12 h1 v1 h-1 z M3,12 h1 v1 h-1 z M5,12 h1 v1 h-1 z M7,12 h1 v1 h-1 z M9,12 h1 v1 h-1 z M11,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z" fill="#43a047" />
    <path d="M15,11 h1 v1 h-1 z M0,12 h1 v1 h-1 z M2,12 h1 v1 h-1 z M4,12 h1 v1 h-1 z M6,12 h1 v1 h-1 z M8,12 h1 v1 h-1 z M10,12 h1 v1 h-1 z M12,12 h1 v1 h-1 z M14,12 h2 v1 h-2 z M1,13 h14 v1 h-14 z" fill="#2e7d32" />
  </svg>
));

export const VegScrapsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Broccoli */}
    <path d="M2,1 h1 v1 h-1 z M4,1 h1 v1 h-1 z M1,2 h1 v1 h-1 z M5,2 h1 v1 h-1 z M0,3 h1 v2 h-1 z M7,3 h1 v1 h-1 z M6,4 h2 v1 h-2 z M1,5 h1 v1 h-1 z M3,5 h1 v1 h-1 z M5,5 h2 v1 h-2 z M2,6 h1 v1 h-1 z M4,6 h1 v1 h-1 z" fill="#2e7d32" />
    <path d="M3,1 h1 v1 h-1 z M2,2 h3 v1 h-3 z M1,3 h2 v1 h-2 z M4,3 h3 v1 h-3 z M1,4 h5 v1 h-5 z M2,5 h1 v1 h-1 z M4,5 h1 v1 h-1 z" fill="#43a047" />
    <path d="M3,3 h1 v1 h-1 z M12,5 h1 v1 h-1 z" fill="#81c784" />
    <path d="M3,6 h1 v1 h-1 z M3,7 h2 v2 h-2 z M3,9 h3 v1 h-3 z M4,10 h1 v1 h-1 z" fill="#9ccc65" />
    {/* Carrot */}
    <path d="M10,7 h3 v1 h-3 z M9,8 h3 v1 h-3 z M8,9 h3 v1 h-3 z M7,10 h3 v1 h-3 z M6,11 h3 v1 h-3 z M5,12 h3 v1 h-3 z M4,13 h2 v1 h-2 z M3,14 h1 v1 h-1 z" fill="#ff9800" />
    <path d="M12,8 h1 v1 h-1 z M11,9 h1 v1 h-1 z M10,10 h1 v1 h-1 z M9,11 h1 v1 h-1 z M8,12 h1 v1 h-1 z M6,13 h1 v1 h-1 z M4,14 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M12,4 h2 v1 h-2 z M11,5 h1 v1 h-1 z M13,5 h1 v1 h-1 z M11,6 h2 v1 h-2 z" fill="#66bb6a" />
  </svg>
));

export const ChoppedVeggiesIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Chopped veg */}
    <path d="M3,6 h2 v1 h-2 z M3,7 h1 v1 h-1 z M12,7 h2 v1 h-2 z M11,8 h1 v1 h-1 z M8,9 h2 v1 h-2 z M8,10 h1 v1 h-1 z M6,11 h1 v1 h-1 z" fill="#43a047" />
    <path d="M4,7 h1 v1 h-1 z M12,8 h1 v1 h-1 z M9,10 h1 v1 h-1 z" fill="#2e7d32" />
    <path d="M7,6 h2 v1 h-2 z M7,7 h1 v1 h-1 z M7,8 h2 v1 h-2 z M1,9 h2 v1 h-2 z M13,9 h2 v1 h-2 z M1,10 h1 v1 h-1 z M13,10 h1 v1 h-1 z" fill="#ff9800" />
    <path d="M8,7 h1 v1 h-1 z M2,10 h1 v1 h-1 z M14,10 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M12,6 h2 v1 h-2 z M11,7 h1 v1 h-1 z M5,10 h2 v1 h-2 z M5,11 h1 v1 h-1 z" fill="#9ccc65" />
    {/* Board */}
    <path d="M0,12 h16 v1 h-16 z" fill="#ffccaa" />
    <path d="M0,13 h16 v1 h-16 z" fill="#e6b38c" />
  </svg>
));

export const CoffeeGroundsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Grounds */}
    <path d="M6,3 h4 v1 h-4 z M4,4 h2 v1 h-2 z M7,4 h3 v1 h-3 z M11,4 h1 v1 h-1 z M2,5 h2 v1 h-2 z M5,5 h3 v1 h-3 z M9,5 h5 v1 h-5 z M2,6 h4 v1 h-4 z M7,6 h5 v1 h-5 z M13,6 h1 v1 h-1 z M3,7 h6 v1 h-6 z M10,7 h3 v1 h-3 z" fill="#3e2723" />
    <path d="M6,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M8,5 h1 v1 h-1 z M6,6 h1 v1 h-1 z M12,6 h1 v1 h-1 z M9,7 h1 v1 h-1 z" fill="#5d4037" />
    {/* Filter */}
    <path d="M1,6 h1 v1 h-1 z M14,6 h1 v1 h-1 z M1,7 h2 v1 h-2 z M13,7 h2 v1 h-2 z M1,8 h1 v1 h-1 z M3,8 h2 v1 h-2 z M6,8 h2 v1 h-2 z M9,8 h2 v1 h-2 z M12,8 h2 v1 h-2 z M2,9 h1 v2 h-1 z M4,9 h2 v2 h-2 z M7,9 h2 v2 h-2 z M10,9 h2 v2 h-2 z M13,9 h1 v2 h-1 z M3,11 h1 v2 h-1 z M5,11 h2 v2 h-2 z M8,11 h2 v2 h-2 z M11,11 h2 v2 h-2 z" fill="#fafafa" />
    <path d="M2,8 h1 v1 h-1 z M5,8 h1 v1 h-1 z M8,8 h1 v1 h-1 z M11,8 h1 v1 h-1 z M14,8 h1 v1 h-1 z M3,9 h1 v2 h-1 z M6,9 h1 v2 h-1 z M9,9 h1 v2 h-1 z M12,9 h1 v2 h-1 z M4,11 h1 v2 h-1 z M7,11 h1 v2 h-1 z M10,11 h1 v2 h-1 z M4,13 h9 v1 h-9 z" fill="#e0e0e0" />
  </svg>
));

export const DryLeafIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Leaf */}
    <path d="M7,1 h1 v1 h-1 z M6,2 h2 v2 h-2 z M2,3 h1 v1 h-1 z M12,3 h1 v1 h-1 z M2,4 h2 v1 h-2 z M5,4 h2 v1 h-2 z M8,4 h1 v1 h-1 z M11,4 h1 v1 h-1 z M2,5 h5 v1 h-5 z M8,5 h4 v1 h-4 z M3,6 h4 v1 h-4 z M8,6 h3 v1 h-3 z M1,7 h6 v1 h-6 z M8,7 h5 v1 h-5 z M2,8 h5 v1 h-5 z M8,8 h4 v1 h-4 z M3,9 h4 v1 h-4 z M8,9 h3 v1 h-3 z M4,10 h3 v1 h-3 z M8,10 h2 v1 h-2 z M6,11 h1 v1 h-1 z M8,11 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M8,2 h1 v2 h-1 z M9,4 h1 v1 h-1 z M12,4 h1 v2 h-1 z M11,6 h1 v1 h-1 z M13,7 h1 v1 h-1 z M12,8 h1 v1 h-1 z M11,9 h1 v1 h-1 z M10,10 h1 v1 h-1 z" fill="#d84315" />
    <path d="M7,4 h1 v8 h-1 z" fill="#ffcc80" />
    {/* Stem */}
    <path d="M7,12 h1 v2 h-1 z M6,14 h1 v1 h-1 z" fill="#6d4c41" />
  </svg>
));

export const CardboardIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Box */}
    <path d="M3,3 h11 v1 h-11 z M2,4 h5 v2 h-5 z M9,4 h6 v1 h-6 z M9,5 h5 v1 h-5 z" fill="#ddb98b" />
    <path d="M2,6 h5 v2 h-5 z M9,6 h5 v2 h-5 z M2,8 h12 v1 h-12 z M2,9 h2 v2 h-2 z M7,9 h7 v2 h-7 z M2,11 h12 v2 h-12 z" fill="#c49a6c" />
    <path d="M14,5 h1 v8 h-1 z M2,13 h13 v1 h-13 z" fill="#a67c52" />
    {/* Tape & sticker */}
    <path d="M7,4 h2 v4 h-2 z" fill="#cfd8dc" />
    <path d="M4,9 h2 v1 h-2 z M4,10 h3 v1 h-3 z" fill="#e53935" />
    <path d="M6,9 h1 v1 h-1 z" fill="#ffffff" />
  </svg>
));

export const CleanCardboardIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Flattened cardboard */}
    <path d="M5,5 h10 v1 h-10 z M4,6 h1 v1 h-1 z M6,6 h1 v1 h-1 z M8,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z M12,6 h1 v1 h-1 z M3,7 h1 v1 h-1 z M5,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M9,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M2,8 h1 v1 h-1 z M4,8 h1 v1 h-1 z M6,8 h1 v1 h-1 z M8,8 h1 v1 h-1 z M10,8 h1 v1 h-1 z M1,9 h1 v1 h-1 z M3,9 h1 v1 h-1 z M5,9 h1 v1 h-1 z M7,9 h1 v1 h-1 z M9,9 h1 v1 h-1 z M0,10 h10 v1 h-10 z" fill="#ddb98b" />
    <path d="M5,6 h1 v1 h-1 z M7,6 h1 v1 h-1 z M9,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z M13,6 h1 v1 h-1 z M4,7 h1 v1 h-1 z M6,7 h1 v1 h-1 z M8,7 h1 v1 h-1 z M10,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M3,8 h1 v1 h-1 z M5,8 h1 v1 h-1 z M7,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z M11,8 h1 v1 h-1 z M2,9 h1 v1 h-1 z M4,9 h1 v1 h-1 z M6,9 h1 v1 h-1 z M8,9 h1 v1 h-1 z M10,9 h1 v1 h-1 z" fill="#c49a6c" />
    <path d="M14,6 h1 v1 h-1 z M13,7 h1 v1 h-1 z M12,8 h1 v1 h-1 z M11,9 h1 v1 h-1 z M10,10 h1 v1 h-1 z M0,11 h11 v1 h-11 z" fill="#a67c52" />
  </svg>
));

export const TwigsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Twigs */}
    <path d="M1,2 h1 v1 h-1 z M2,3 h1 v1 h-1 z M13,3 h1 v1 h-1 z M3,4 h1 v1 h-1 z M12,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M11,5 h1 v1 h-1 z M5,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z M6,7 h1 v1 h-1 z M8,7 h1 v1 h-1 z M1,8 h1 v1 h-1 z M5,9 h1 v2 h-1 z M9,9 h1 v1 h-1 z M10,10 h1 v1 h-1 z M4,11 h1 v1 h-1 z M11,11 h1 v1 h-1 z M3,12 h1 v1 h-1 z M12,12 h1 v1 h-1 z M2,13 h1 v1 h-1 z M13,13 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M2,2 h1 v1 h-1 z M3,3 h1 v1 h-1 z M14,3 h1 v1 h-1 z M4,4 h1 v1 h-1 z M13,4 h1 v1 h-1 z M5,5 h1 v1 h-1 z M12,5 h1 v1 h-1 z M6,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z M7,7 h1 v1 h-1 z M9,7 h1 v1 h-1 z M2,8 h13 v1 h-13 z M6,9 h1 v2 h-1 z M10,9 h1 v1 h-1 z M11,10 h1 v1 h-1 z M5,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M4,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z M3,13 h1 v1 h-1 z M14,13 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M1,9 h4 v1 h-4 z M7,9 h2 v1 h-2 z M11,9 h3 v1 h-3 z" fill="#5d4037" />
  </svg>
));

export const BananaPeelIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Peel */}
    <path d="M7,3 h1 v1 h-1 z M6,4 h2 v1 h-2 z M6,5 h1 v1 h-1 z M8,5 h1 v2 h-1 z M5,6 h2 v2 h-2 z M8,7 h2 v1 h-2 z M3,8 h2 v1 h-2 z M6,8 h1 v4 h-1 z M8,8 h1 v4 h-1 z M10,8 h2 v1 h-2 z M2,9 h2 v1 h-2 z M11,9 h2 v1 h-2 z M1,10 h2 v1 h-2 z M12,10 h2 v1 h-2 z M1,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z M6,12 h2 v1 h-2 z M7,13 h1 v1 h-1 z" fill="#ffeb3b" />
    <path d="M8,4 h1 v1 h-1 z M9,6 h1 v1 h-1 z M4,7 h1 v1 h-1 z M10,7 h1 v1 h-1 z M8,12 h1 v1 h-1 z" fill="#fbc02d" />
    <path d="M7,5 h1 v7 h-1 z" fill="#fff9c4" />
    <path d="M7,2 h1 v1 h-1 z M2,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M1,12 h1 v1 h-1 z M13,12 h1 v1 h-1 z M6,13 h1 v1 h-1 z M8,13 h1 v1 h-1 z" fill="#6d4c41" />
  </svg>
));

export const EggshellsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Eggshells */}
    <path d="M3,4 h1 v1 h-1 z M5,4 h1 v1 h-1 z M7,4 h1 v1 h-1 z M9,4 h1 v1 h-1 z M2,5 h9 v1 h-9 z M2,6 h1 v2 h-1 z M10,6 h1 v2 h-1 z M2,8 h9 v1 h-9 z M3,9 h7 v1 h-7 z M10,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z M9,12 h4 v1 h-4 z M2,13 h1 v1 h-1 z M1,14 h2 v1 h-2 z" fill="#fffde7" />
    <path d="M11,6 h1 v3 h-1 z M10,9 h1 v1 h-1 z M4,10 h6 v1 h-6 z M13,12 h1 v1 h-1 z M10,13 h4 v1 h-4 z M3,14 h1 v1 h-1 z" fill="#d7ccb0" />
    <path d="M3,6 h7 v2 h-7 z" fill="#efe6cc" />
  </svg>
));

export const ShreddedPaperIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Paper strips */}
    <path d="M3,4 h1 v2 h-1 z M8,4 h1 v2 h-1 z M13,4 h1 v1 h-1 z M12,5 h1 v3 h-1 z M4,6 h1 v2 h-1 z M7,6 h1 v2 h-1 z M1,8 h14 v1 h-14 z M1,9 h1 v1 h-1 z M3,9 h1 v1 h-1 z M5,9 h1 v1 h-1 z M7,9 h1 v1 h-1 z M9,9 h1 v1 h-1 z M11,9 h1 v1 h-1 z M13,9 h1 v1 h-1 z M2,10 h12 v1 h-12 z M1,11 h2 v1 h-2 z M4,11 h2 v1 h-2 z M7,11 h2 v1 h-2 z M10,11 h2 v1 h-2 z M13,11 h2 v1 h-2 z M2,12 h12 v1 h-12 z" fill="#fafafa" />
    <path d="M4,5 h1 v1 h-1 z M7,5 h1 v1 h-1 z M13,5 h1 v1 h-1 z M5,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M2,9 h1 v1 h-1 z M4,9 h1 v1 h-1 z M6,9 h1 v1 h-1 z M8,9 h1 v1 h-1 z M10,9 h1 v1 h-1 z M12,9 h1 v1 h-1 z M3,11 h1 v1 h-1 z M6,11 h1 v1 h-1 z M9,11 h1 v1 h-1 z M12,11 h1 v1 h-1 z" fill="#9e9e9e" />
    <path d="M14,9 h1 v1 h-1 z M1,12 h1 v1 h-1 z M14,12 h1 v1 h-1 z M2,13 h12 v1 h-12 z" fill="#cfd8dc" />
  </svg>
));

export const MeatIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Meat & bone */}
    <path d="M4,3 h6 v1 h-6 z M2,4 h10 v1 h-10 z M1,5 h2 v1 h-2 z M4,5 h9 v1 h-9 z M1,6 h1 v2 h-1 z M4,6 h4 v1 h-4 z M9,6 h4 v2 h-4 z M3,7 h5 v1 h-5 z M1,8 h6 v1 h-6 z M10,8 h3 v1 h-3 z M1,9 h7 v1 h-7 z M9,9 h4 v1 h-4 z M2,10 h6 v1 h-6 z M9,10 h3 v1 h-3 z M3,11 h8 v1 h-8 z M5,12 h4 v1 h-4 z" fill="#e57373" />
    <path d="M13,6 h1 v4 h-1 z M12,10 h2 v1 h-2 z M2,11 h1 v1 h-1 z M11,11 h2 v1 h-2 z M3,12 h2 v1 h-2 z M9,12 h3 v1 h-3 z M5,13 h5 v1 h-5 z" fill="#c62828" />
    <path d="M3,5 h1 v1 h-1 z M2,6 h2 v1 h-2 z M2,7 h1 v1 h-1 z" fill="#ffebee" />
    <path d="M8,6 h1 v2 h-1 z M7,8 h3 v1 h-3 z M8,9 h1 v2 h-1 z" fill="#fafafa" />
  </svg>
));

export const CheeseIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Cheese */}
    <path d="M11,4 h1 v1 h-1 z M8,5 h4 v1 h-4 z M5,6 h7 v1 h-7 z M2,7 h10 v1 h-10 z M1,9 h4 v1 h-4 z M6,9 h6 v1 h-6 z M1,10 h7 v1 h-7 z M9,10 h3 v1 h-3 z M1,11 h1 v1 h-1 z M3,11 h9 v1 h-9 z M1,12 h8 v1 h-8 z M10,12 h2 v1 h-2 z" fill="#ffca28" />
    <path d="M1,8 h11 v1 h-11 z" fill="#ffe082" />
    <path d="M12,8 h1 v5 h-1 z M1,13 h12 v1 h-12 z" fill="#f9a825" />
    <path d="M5,9 h1 v1 h-1 z M8,10 h1 v1 h-1 z M2,11 h1 v1 h-1 z M9,12 h1 v1 h-1 z" fill="#e0a000" />
  </svg>
));

export const GreasyPizzaIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Crust */}
    <path d="M1,2 h12 v1 h-12 z M2,3 h10 v1 h-10 z" fill="#d7a86e" />
    <path d="M1,3 h1 v1 h-1 z M12,3 h1 v1 h-1 z" fill="#bf8f50" />
    {/* Cheese & pepperoni */}
    <path d="M2,4 h11 v1 h-11 z M2,5 h1 v1 h-1 z M5,5 h5 v1 h-5 z M12,5 h1 v1 h-1 z M5,6 h2 v1 h-2 z M8,6 h2 v1 h-2 z M3,7 h4 v1 h-4 z M9,7 h3 v1 h-3 z M4,8 h3 v1 h-3 z M9,8 h2 v1 h-2 z M4,9 h1 v1 h-1 z M6,9 h5 v1 h-5 z M5,10 h1 v2 h-1 z M8,10 h2 v1 h-2 z M8,11 h1 v1 h-1 z M6,12 h2 v1 h-2 z M6,13 h1 v1 h-1 z" fill="#ffd54f" />
    <path d="M3,5 h2 v2 h-2 z M10,5 h2 v2 h-2 z M7,7 h2 v2 h-2 z M6,10 h2 v2 h-2 z" fill="#e53935" />
    {/* Grease */}
    <path d="M7,6 h1 v1 h-1 z M5,9 h1 v1 h-1 z M13,9 h1 v1 h-1 z M12,12 h1 v1 h-1 z" fill="#ffb300" />
  </svg>
));

export const PetWasteIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Flies */}
    <path d="M1,0 h1 v1 h-1 z M0,1 h1 v1 h-1 z M2,1 h1 v1 h-1 z M13,1 h1 v1 h-1 z M12,2 h1 v1 h-1 z M14,2 h1 v1 h-1 z" fill="#212121" />
    <path d="M1,1 h1 v1 h-1 z M13,2 h1 v1 h-1 z" fill="#e3f2fd" />
    {/* Poop */}
    <path d="M7,5 h1 v1 h-1 z M6,6 h2 v1 h-2 z M6,7 h3 v2 h-3 z M5,9 h5 v1 h-5 z M3,10 h8 v1 h-8 z M5,11 h6 v1 h-6 z M3,12 h9 v1 h-9 z M1,13 h12 v1 h-12 z" fill="#795548" />
    <path d="M8,6 h1 v1 h-1 z M9,7 h1 v2 h-1 z M5,8 h1 v1 h-1 z M10,9 h1 v1 h-1 z M11,10 h1 v2 h-1 z M3,11 h1 v1 h-1 z M12,12 h1 v1 h-1 z M13,13 h1 v1 h-1 z M1,14 h13 v1 h-13 z" fill="#5d4037" />
    <path d="M5,7 h1 v1 h-1 z M4,9 h1 v1 h-1 z M4,11 h1 v1 h-1 z M2,12 h1 v1 h-1 z" fill="#a1887f" />
  </svg>
));

export const DiseasedPlantIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Sick leaves */}
    <path d="M6,1 h2 v1 h-2 z M5,2 h3 v1 h-3 z M4,3 h1 v1 h-1 z M6,3 h3 v1 h-3 z M5,4 h3 v1 h-3 z M11,4 h1 v1 h-1 z M9,5 h4 v1 h-4 z M8,6 h2 v1 h-2 z M11,6 h2 v1 h-2 z M10,7 h2 v1 h-2 z M2,8 h3 v1 h-3 z M1,9 h2 v1 h-2 z M4,9 h2 v1 h-2 z M2,10 h3 v1 h-3 z" fill="#c0ca33" />
    <path d="M8,2 h1 v1 h-1 z M5,3 h1 v1 h-1 z M10,4 h1 v1 h-1 z M10,6 h1 v1 h-1 z M3,9 h1 v1 h-1 z" fill="#6d4c41" />
    <path d="M7,5 h1 v4 h-1 z M6,9 h2 v1 h-2 z M6,10 h1 v2 h-1 z" fill="#827717" />
    {/* Soil */}
    <path d="M4,12 h6 v1 h-6 z M3,13 h1 v1 h-1 z M10,13 h1 v1 h-1 z" fill="#8d6e63" />
    <path d="M4,13 h6 v1 h-6 z" fill="#6d4c41" />
  </svg>
));

export const OrangePeelIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Orange peel */}
    <path d="M3,3 h4 v1 h-4 z M2,4 h1 v2 h-1 z M6,4 h2 v1 h-2 z M7,5 h1 v1 h-1 z M9,5 h3 v1 h-3 z M2,6 h2 v1 h-2 z M6,6 h3 v1 h-3 z M11,6 h2 v1 h-2 z M3,7 h4 v1 h-4 z M8,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z M8,8 h2 v1 h-2 z M12,8 h2 v1 h-2 z M9,9 h4 v1 h-4 z M2,10 h5 v1 h-5 z M1,11 h1 v1 h-1 z M7,11 h1 v1 h-1 z M2,12 h5 v1 h-5 z" fill="#ff9800" />
    <path d="M3,4 h1 v1 h-1 z M9,6 h1 v1 h-1 z M2,11 h1 v1 h-1 z M6,11 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M4,4 h2 v1 h-2 z M3,5 h1 v1 h-1 z M6,5 h1 v1 h-1 z M10,6 h1 v1 h-1 z M9,7 h1 v1 h-1 z M12,7 h1 v1 h-1 z M3,11 h3 v1 h-3 z" fill="#fff3e0" />
  </svg>
));

export const OnionIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Sprout */}
    <path d="M7,1 h1 v2 h-1 z M9,2 h1 v2 h-1 z M6,3 h2 v1 h-2 z M7,4 h2 v1 h-2 z" fill="#66bb6a" />
    {/* Onion */}
    <path d="M6,5 h3 v1 h-3 z M5,6 h2 v1 h-2 z M8,6 h2 v1 h-2 z M4,7 h2 v1 h-2 z M7,7 h3 v1 h-3 z M3,8 h2 v1 h-2 z M6,8 h5 v1 h-5 z M3,9 h1 v2 h-1 z M5,9 h6 v1 h-6 z M5,10 h3 v1 h-3 z M9,10 h2 v1 h-2 z M3,11 h5 v1 h-5 z M9,11 h1 v1 h-1 z M4,12 h5 v1 h-5 z" fill="#ab47bc" />
    <path d="M7,6 h1 v1 h-1 z M6,7 h1 v1 h-1 z M5,8 h1 v1 h-1 z M4,9 h1 v2 h-1 z" fill="#e1bee7" />
    <path d="M10,7 h1 v1 h-1 z M11,8 h1 v3 h-1 z M8,10 h1 v2 h-1 z M10,11 h2 v1 h-2 z M9,12 h2 v1 h-2 z M5,13 h5 v1 h-5 z" fill="#7b1fa2" />
    {/* Roots */}
    <path d="M6,14 h1 v1 h-1 z M8,14 h1 v1 h-1 z" fill="#d7ccc8" />
  </svg>
));

export const HotPepperIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Stem */}
    <path d="M10,2 h2 v1 h-2 z M9,3 h1 v1 h-1 z" fill="#43a047" />
    <path d="M10,3 h1 v1 h-1 z" fill="#2e7d32" />
    {/* Pepper */}
    <path d="M8,4 h3 v1 h-3 z M7,5 h2 v1 h-2 z M10,5 h1 v1 h-1 z M7,6 h1 v1 h-1 z M9,6 h2 v1 h-2 z M6,7 h4 v1 h-4 z M5,8 h4 v1 h-4 z M4,9 h4 v1 h-4 z M3,10 h4 v1 h-4 z M2,11 h3 v1 h-3 z M1,12 h2 v1 h-2 z" fill="#e53935" />
    <path d="M11,5 h1 v2 h-1 z M10,7 h1 v1 h-1 z M9,8 h1 v1 h-1 z M8,9 h1 v1 h-1 z M7,10 h1 v1 h-1 z M5,11 h1 v1 h-1 z M3,12 h1 v1 h-1 z M1,13 h1 v1 h-1 z" fill="#b71c1c" />
    <path d="M9,5 h1 v1 h-1 z M8,6 h1 v1 h-1 z" fill="#ff8a80" />
  </svg>
));

export const LeafBagIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Leaves */}
    <path d="M5,0 h1 v1 h-1 z M12,0 h1 v1 h-1 z M1,1 h1 v1 h-1 z M3,1 h1 v1 h-1 z M5,1 h3 v1 h-3 z M9,1 h1 v1 h-1 z M11,1 h2 v1 h-2 z" fill="#ef6c00" />
    <path d="M2,0 h1 v2 h-1 z M10,1 h1 v1 h-1 z" fill="#fbc02d" />
    <path d="M9,0 h1 v1 h-1 z" fill="#d84315" />
    {/* Paper bag */}
    <path d="M2,2 h12 v1 h-12 z M2,3 h11 v2 h-11 z M2,5 h4 v1 h-4 z M8,5 h5 v1 h-5 z M2,6 h3 v1 h-3 z M9,6 h4 v1 h-4 z M2,7 h4 v1 h-4 z M8,7 h5 v2 h-5 z M2,8 h5 v1 h-5 z M2,9 h11 v4 h-11 z" fill="#d7b98a" />
    <path d="M13,3 h1 v10 h-1 z M2,13 h12 v1 h-12 z" fill="#bfa070" />
    <path d="M6,5 h2 v1 h-2 z M5,6 h4 v1 h-4 z M6,7 h2 v1 h-2 z M7,8 h1 v1 h-1 z" fill="#8d6e63" />
  </svg>
));

export const BinLidIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Lid */}
    <path d="M3,7 h10 v1 h-10 z M1,8 h2 v1 h-2 z M13,8 h2 v1 h-2 z M0,9 h2 v1 h-2 z M4,9 h8 v1 h-8 z M14,9 h2 v1 h-2 z M0,10 h16 v1 h-16 z M2,11 h12 v1 h-12 z" fill="#388e3c" />
    <path d="M7,6 h2 v1 h-2 z M3,8 h10 v1 h-10 z M2,9 h2 v1 h-2 z M12,9 h2 v1 h-2 z" fill="#66bb6a" />
    <path d="M6,5 h4 v1 h-4 z M6,6 h1 v1 h-1 z M9,6 h1 v1 h-1 z M1,11 h1 v1 h-1 z M14,11 h1 v1 h-1 z M2,12 h12 v1 h-12 z" fill="#1b5e20" />
  </svg>
));

export const SproutSprite = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Leaves & stem */}
    <path d="M2,1 h2 v1 h-2 z M10,1 h2 v1 h-2 z M1,2 h1 v1 h-1 z M12,2 h1 v1 h-1 z" fill="#a5d6a7" />
    <path d="M2,2 h3 v1 h-3 z M9,2 h3 v1 h-3 z M1,3 h3 v1 h-3 z M5,3 h1 v1 h-1 z M8,3 h1 v1 h-1 z M10,3 h3 v1 h-3 z M2,4 h2 v1 h-2 z M6,4 h2 v1 h-2 z M10,4 h2 v1 h-2 z M3,5 h3 v1 h-3 z M8,5 h3 v1 h-3 z" fill="#66bb6a" />
    <path d="M4,3 h1 v1 h-1 z M9,3 h1 v1 h-1 z M4,4 h2 v1 h-2 z M8,4 h2 v1 h-2 z M6,5 h2 v4 h-2 z M6,9 h1 v1 h-1 z" fill="#388e3c" />
    <path d="M7,9 h1 v1 h-1 z" fill="#2e7d32" />
    {/* Soil */}
    <path d="M3,10 h10 v1 h-10 z M2,11 h1 v1 h-1 z M13,11 h1 v1 h-1 z M1,12 h1 v1 h-1 z M14,12 h1 v1 h-1 z M1,13 h14 v1 h-14 z" fill="#5d4037" />
    <path d="M3,11 h10 v1 h-10 z M2,12 h12 v1 h-12 z" fill="#6d4c41" />
  </svg>
));

export const TomatoSeedsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Packet */}
    <path d="M3,0 h10 v2 h-10 z" fill="#e53935" />
    <path d="M3,2 h9 v1 h-9 z M3,3 h1 v3 h-1 z M3,9 h1 v2 h-1 z M3,11 h9 v1 h-9 z M3,12 h1 v2 h-1 z M11,12 h1 v1 h-1 z M9,13 h3 v1 h-3 z M3,14 h9 v1 h-9 z M4,3 h3 v1 h-3 z M9,3 h3 v1 h-3 z M4,4 h1 v1 h-1 z M10,4 h2 v1 h-2 z M11,5 h1 v1 h-1 z M11,9 h1 v1 h-1 z M4,10 h1 v1 h-1 z M10,10 h2 v1 h-2 z" fill="#fff8e1" />
    <path d="M12,2 h1 v13 h-1 z M3,15 h10 v1 h-10 z" fill="#d7ccc8" />
    <path d="M4,12 h7 v1 h-7 z M4,13 h5 v1 h-5 z" fill="#bcaaa4" />
    {/* Picture */}
    <path d="M7,4 h1 v1 h-1 z M4,5 h7 v1 h-7 z M3,6 h1 v2 h-1 z M5,6 h6 v2 h-6 z M3,8 h8 v1 h-8 z M4,9 h6 v1 h-6 z" fill="#e53935" />
    <path d="M4,6 h1 v2 h-1 z" fill="#ff8a80" />
    <path d="M11,6 h1 v3 h-1 z M10,9 h1 v1 h-1 z M5,10 h5 v1 h-5 z" fill="#b71c1c" />
    <path d="M7,3 h2 v1 h-2 z M5,4 h2 v1 h-2 z M8,4 h2 v1 h-2 z" fill="#43a047" />
  </svg>
));

export const SucculentSeedsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Packet */}
    <path d="M3,0 h10 v2 h-10 z" fill="#26a69a" />
    <path d="M3,2 h9 v1 h-9 z M3,3 h1 v4 h-1 z M3,8 h1 v3 h-1 z M3,11 h9 v1 h-9 z M3,12 h1 v2 h-1 z M11,12 h1 v1 h-1 z M9,13 h3 v1 h-3 z M3,14 h9 v1 h-9 z M4,3 h3 v1 h-3 z M8,3 h4 v1 h-4 z M4,4 h2 v1 h-2 z M9,4 h3 v1 h-3 z M5,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z M11,5 h1 v2 h-1 z M11,8 h1 v1 h-1 z M4,9 h1 v1 h-1 z M10,9 h2 v1 h-2 z M4,10 h2 v1 h-2 z M9,10 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M12,2 h1 v13 h-1 z M3,15 h10 v1 h-10 z" fill="#d7ccc8" />
    <path d="M4,12 h7 v1 h-7 z M4,13 h5 v1 h-5 z" fill="#bcaaa4" />
    {/* Picture */}
    <path d="M7,4 h1 v1 h-1 z M6,5 h1 v1 h-1 z M8,5 h1 v1 h-1 z M4,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z M3,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M10,8 h1 v1 h-1 z M5,9 h1 v1 h-1 z M9,9 h1 v1 h-1 z M6,10 h3 v1 h-3 z" fill="#80cbc4" />
    <path d="M7,5 h1 v1 h-1 z M6,6 h3 v1 h-3 z M4,7 h7 v1 h-7 z M5,8 h5 v1 h-5 z M6,9 h3 v1 h-3 z" fill="#26a69a" />
    <path d="M6,4 h1 v1 h-1 z M8,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M10,5 h1 v1 h-1 z M5,6 h1 v1 h-1 z M9,6 h1 v1 h-1 z" fill="#b2dfdb" />
    <path d="M7,3 h1 v1 h-1 z" fill="#f48fb1" />
  </svg>
));

export const BlueberrySeedsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Packet */}
    <path d="M3,0 h10 v2 h-10 z" fill="#3f51b5" />
    <path d="M3,2 h9 v1 h-9 z M3,3 h1 v3 h-1 z M3,8 h1 v3 h-1 z M3,11 h9 v1 h-9 z M3,12 h1 v2 h-1 z M11,12 h1 v1 h-1 z M9,13 h3 v1 h-3 z M3,14 h9 v1 h-9 z M4,3 h1 v1 h-1 z M8,3 h4 v1 h-4 z M9,4 h3 v1 h-3 z M7,5 h1 v1 h-1 z M10,5 h2 v1 h-2 z M11,6 h1 v1 h-1 z M10,7 h2 v1 h-2 z M5,8 h1 v1 h-1 z M9,8 h3 v1 h-3 z M4,9 h2 v2 h-2 z M10,9 h2 v1 h-2 z M9,10 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M12,2 h1 v13 h-1 z M3,15 h10 v1 h-10 z" fill="#d7ccc8" />
    <path d="M4,12 h7 v1 h-7 z M4,13 h5 v1 h-5 z" fill="#bcaaa4" />
    {/* Picture */}
    <path d="M5,3 h1 v1 h-1 z M7,3 h1 v1 h-1 z M4,4 h1 v1 h-1 z M8,4 h1 v1 h-1 z M6,5 h1 v1 h-1 z M6,7 h1 v1 h-1 z M8,8 h1 v1 h-1 z" fill="#43a047" />
    <path d="M6,3 h1 v1 h-1 z M5,4 h3 v1 h-3 z" fill="#2e7d32" />
    <path d="M5,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z M3,6 h3 v1 h-3 z M7,6 h3 v1 h-3 z M3,7 h2 v1 h-2 z M7,7 h2 v1 h-2 z M7,8 h1 v1 h-1 z M6,9 h3 v1 h-3 z M6,10 h2 v1 h-2 z" fill="#3f51b5" />
    <path d="M6,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z M5,7 h1 v1 h-1 z M9,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M9,9 h1 v1 h-1 z M8,10 h1 v1 h-1 z" fill="#1a237e" />
    <path d="M4,5 h1 v1 h-1 z M8,5 h1 v1 h-1 z M6,8 h1 v1 h-1 z" fill="#9fa8da" />
  </svg>
));

export const FernSeedsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Packet */}
    <path d="M3,0 h10 v2 h-10 z" fill="#2e7d32" />
    <path d="M3,2 h9 v1 h-9 z M3,3 h1 v3 h-1 z M3,7 h1 v4 h-1 z M3,11 h9 v1 h-9 z M3,12 h1 v2 h-1 z M11,12 h1 v1 h-1 z M9,13 h3 v1 h-3 z M3,14 h9 v1 h-9 z M4,3 h3 v1 h-3 z M8,3 h4 v1 h-4 z M5,4 h1 v1 h-1 z M9,4 h1 v1 h-1 z M11,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M10,5 h2 v1 h-2 z M6,6 h1 v1 h-1 z M8,6 h1 v1 h-1 z M11,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M10,8 h2 v1 h-2 z M4,9 h3 v2 h-3 z M8,9 h4 v2 h-4 z" fill="#fff8e1" />
    <path d="M12,2 h1 v13 h-1 z M3,15 h10 v1 h-10 z" fill="#d7ccc8" />
    <path d="M4,12 h7 v1 h-7 z M4,13 h5 v1 h-5 z" fill="#bcaaa4" />
    {/* Picture */}
    <path d="M6,4 h1 v1 h-1 z M8,4 h1 v1 h-1 z M5,5 h1 v1 h-1 z M9,5 h1 v1 h-1 z M4,6 h1 v2 h-1 z M10,6 h1 v2 h-1 z M6,7 h1 v1 h-1 z M8,7 h1 v1 h-1 z M5,8 h1 v1 h-1 z M9,8 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M7,4 h1 v1 h-1 z M6,5 h3 v1 h-3 z M5,6 h1 v2 h-1 z M7,6 h1 v2 h-1 z M9,6 h1 v2 h-1 z M6,8 h3 v1 h-3 z M7,9 h1 v2 h-1 z" fill="#2e7d32" />
    <path d="M7,3 h1 v1 h-1 z M4,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z M3,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z" fill="#a5d6a7" />
  </svg>
));

export const CoverCropSeedsIcon = React.memo(() => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Packet */}
    <path d="M3,0 h10 v2 h-10 z" fill="#7cb342" />
    <path d="M3,2 h9 v1 h-9 z M3,3 h1 v8 h-1 z M3,11 h9 v1 h-9 z M3,12 h1 v2 h-1 z M11,12 h1 v1 h-1 z M9,13 h3 v1 h-3 z M3,14 h9 v1 h-9 z M4,3 h1 v1 h-1 z M6,3 h3 v1 h-3 z M10,3 h2 v1 h-2 z M7,4 h1 v1 h-1 z M11,4 h1 v1 h-1 z M4,5 h1 v1 h-1 z M6,5 h3 v1 h-3 z M10,5 h2 v1 h-2 z M7,6 h1 v1 h-1 z M11,6 h1 v1 h-1 z M4,7 h1 v1 h-1 z M6,7 h1 v1 h-1 z M8,7 h1 v1 h-1 z M10,7 h2 v1 h-2 z M11,8 h1 v1 h-1 z M4,9 h1 v1 h-1 z M10,9 h2 v1 h-2 z M11,10 h1 v1 h-1 z" fill="#fff8e1" />
    <path d="M12,2 h1 v13 h-1 z M3,15 h10 v1 h-10 z" fill="#d7ccc8" />
    <path d="M4,12 h7 v1 h-7 z M4,13 h5 v1 h-5 z" fill="#bcaaa4" />
    {/* Picture */}
    <path d="M5,4 h1 v2 h-1 z M9,5 h1 v1 h-1 z M4,6 h1 v1 h-1 z M6,6 h1 v1 h-1 z M8,6 h1 v1 h-1 z M10,6 h1 v1 h-1 z M7,7 h1 v1 h-1 z M4,8 h1 v1 h-1 z M6,8 h1 v1 h-1 z M8,8 h1 v1 h-1 z M10,8 h1 v1 h-1 z" fill="#7cb342" />
    <path d="M9,4 h1 v1 h-1 z M5,6 h1 v3 h-1 z M9,6 h1 v3 h-1 z M7,8 h1 v1 h-1 z M5,9 h5 v1 h-5 z M4,10 h7 v1 h-7 z" fill="#558b2f" />
    <path d="M5,3 h1 v1 h-1 z M4,4 h1 v1 h-1 z M6,4 h1 v1 h-1 z" fill="#f5f5f5" />
    <path d="M9,3 h1 v1 h-1 z M8,4 h1 v1 h-1 z M10,4 h1 v1 h-1 z" fill="#f48fb1" />
  </svg>
));


export const LifeHeartSprite = React.memo(({ empty = false }) => (
  <svg viewBox="0 0 14 12" className="w-full h-full drop-shadow-sm" shapeRendering="crispEdges">
    {/* Heart */}
    <path d="M2,0 h3 v1 h-3 z M9,0 h3 v1 h-3 z M1,1 h1 v1 h-1 z M4,1 h2 v1 h-2 z M8,1 h5 v1 h-5 z M0,2 h1 v2 h-1 z M3,2 h10 v1 h-10 z M2,3 h11 v1 h-11 z M0,4 h13 v1 h-13 z M0,5 h12 v1 h-12 z M1,6 h10 v1 h-10 z M2,7 h8 v1 h-8 z M3,8 h6 v1 h-6 z M4,9 h4 v1 h-4 z M5,10 h2 v1 h-2 z" fill={empty ? '#757575' : '#e53935'} />
    <path d="M2,1 h2 v1 h-2 z M1,2 h2 v1 h-2 z M1,3 h1 v1 h-1 z" fill={empty ? '#9e9e9e' : '#ff8a80'} />
    <path d="M13,2 h1 v3 h-1 z M12,5 h2 v1 h-2 z M11,6 h2 v1 h-2 z M10,7 h2 v1 h-2 z M9,8 h2 v1 h-2 z M8,9 h2 v1 h-2 z M7,10 h2 v1 h-2 z M6,11 h2 v1 h-2 z" fill={empty ? '#424242' : '#b71c1c'} />
  </svg>
));

export const SparkleSprite = React.memo(({ color = "#fdd835" }) => (
  <svg viewBox="0 0 15 15" className="w-full h-full" shapeRendering="crispEdges">
    {/* Sparkle */}
    <path d="M7,0 h1 v2 h-1 z M6,2 h3 v2 h-3 z M5,4 h2 v1 h-2 z M8,4 h2 v1 h-2 z M4,5 h3 v1 h-3 z M8,5 h3 v1 h-3 z M2,6 h4 v1 h-4 z M9,6 h4 v1 h-4 z M0,7 h4 v1 h-4 z M11,7 h4 v1 h-4 z M2,8 h4 v1 h-4 z M9,8 h4 v1 h-4 z M4,9 h3 v1 h-3 z M8,9 h3 v1 h-3 z M5,10 h2 v1 h-2 z M8,10 h2 v1 h-2 z M6,11 h3 v2 h-3 z M7,13 h1 v2 h-1 z" fill={color} />
    <path d="M7,4 h1 v2 h-1 z M6,6 h3 v1 h-3 z M4,7 h7 v1 h-7 z M6,8 h3 v1 h-3 z M7,9 h1 v2 h-1 z" fill="#fffde7" />
  </svg>
));

// Music toggle: two beamed notes, with a red slash when the music is off
export const MusicNoteIcon = React.memo(({ on = true, color = "#fff3c4" }) => (
  <svg viewBox="0 0 12 12" className="w-full h-full" shapeRendering="crispEdges">
    {/* Notes */}
    <path d="M4,0 h7 v2 h-7 z M4,2 h1 v5 h-1 z M10,2 h1 v5 h-1 z M1,7 h4 v1 h-4 z M7,7 h4 v1 h-4 z M0,8 h5 v1 h-5 z M6,8 h5 v1 h-5 z M0,9 h4 v1 h-4 z M6,9 h4 v1 h-4 z M1,10 h2 v1 h-2 z M7,10 h2 v1 h-2 z" fill={color} opacity={on ? 1 : 0.55} />
    <path d="M1,7 h1 v1 h-1 z M7,7 h1 v1 h-1 z M0,8 h1 v1 h-1 z M6,8 h1 v1 h-1 z" fill="#ffffff" opacity={on ? 0.8 : 0.4} />
    {/* Off slash */}
    {!on && <path d="M11,0 h1 v1 h-1 z M10,1 h1 v1 h-1 z M9,2 h1 v1 h-1 z M8,3 h1 v1 h-1 z M7,4 h1 v1 h-1 z M6,5 h1 v1 h-1 z M5,6 h1 v1 h-1 z M4,7 h1 v1 h-1 z M3,8 h1 v1 h-1 z M2,9 h1 v1 h-1 z M1,10 h1 v1 h-1 z M0,11 h1 v1 h-1 z" fill="#e53935" />}
  </svg>
));

// Volume: a speaker with 0-2 sound waves (`level`), or an X when muted
export const SpeakerIcon = React.memo(({ level = 2 }) => (
  <svg viewBox="0 0 14 11" className="w-full h-full" shapeRendering="crispEdges">
    {/* Speaker */}
    <path d="M6,0 h1 v1 h-1 z M5,1 h2 v1 h-2 z M4,2 h3 v1 h-3 z M0,3 h7 v5 h-7 z M4,8 h3 v1 h-3 z M5,9 h2 v1 h-2 z M6,10 h1 v1 h-1 z" fill="#5d4037" />
    <path d="M0,3 h1 v5 h-1 z M4,2 h1 v1 h-1 z" fill="#8d6e63" />
    {/* Sound waves or mute cross */}
    {level === 0 && <path d="M9,3 h1 v1 h-1 z M13,3 h1 v1 h-1 z M10,4 h1 v1 h-1 z M12,4 h1 v1 h-1 z M11,5 h1 v1 h-1 z M10,6 h1 v1 h-1 z M12,6 h1 v1 h-1 z M9,7 h1 v1 h-1 z M13,7 h1 v1 h-1 z" fill="#e53935" />}
    {level >= 1 && <path d="M8,2 h1 v1 h-1 z M9,3 h1 v5 h-1 z M8,8 h1 v1 h-1 z" fill="#4caf50" />}
    {level >= 2 && <path d="M11,1 h1 v1 h-1 z M12,2 h1 v2 h-1 z M13,4 h1 v3 h-1 z M12,7 h1 v2 h-1 z M11,9 h1 v1 h-1 z" fill="#388e3c" />}
  </svg>
));
