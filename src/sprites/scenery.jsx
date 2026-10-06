import React from 'react';

export const ClassDeskSprite = React.memo(({ paper = "#ffffff" }) => (
  <svg viewBox="0 0 40 18" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Floor shadow */}
    <path d="M3,14 h34 v4 h-34 z M0,17 h1 v1 h-1 z M39,17 h1 v1 h-1 z" fill="#000000" opacity="0.25" />
    {/* Desk top */}
    <path d="M1,0 h38 v1 h-38 z M0,1 h14 v4 h-14 z M25,1 h15 v1 h-15 z M25,2 h6 v1 h-6 z M36,2 h4 v1 h-4 z M25,3 h5 v1 h-5 z M32,3 h8 v1 h-8 z M25,4 h15 v1 h-15 z" fill="#795548" />
    <path d="M0,5 h40 v1 h-40 z" fill="#6d4c41" />
    {/* Notebook */}
    <path d="M15,1 h10 v1 h-10 z M15,2 h1 v1 h-1 z M23,2 h2 v1 h-2 z M15,3 h10 v1 h-10 z M15,4 h1 v1 h-1 z M23,4 h2 v1 h-2 z" fill={paper} />
    <path d="M16,2 h7 v1 h-7 z M16,4 h7 v1 h-7 z" fill="#b0bec5" />
    <path d="M14,1 h1 v4 h-1 z" fill="#78909c" />
    {/* Pencil */}
    <path d="M31,2 h4 v1 h-4 z M31,3 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M35,2 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M30,3 h1 v1 h-1 z" fill="#3e2723" />
    {/* Front panel & legs */}
    <path d="M0,6 h40 v1 h-40 z" fill="#a1887f" />
    <path d="M0,7 h40 v1 h-40 z M2,9 h36 v1 h-36 z M2,10 h1 v2 h-1 z M37,10 h1 v2 h-1 z M2,12 h36 v1 h-36 z M1,14 h2 v4 h-2 z M37,14 h2 v4 h-2 z" fill="#3e2723" />
    <path d="M1,8 h38 v1 h-38 z M1,9 h1 v4 h-1 z M38,9 h1 v4 h-1 z M1,13 h38 v1 h-38 z" fill="#4e342e" />
    <path d="M3,10 h34 v2 h-34 z" fill="#5d4037" />
  </svg>
));

export const ClassroomBackdropSprite = React.memo(() => (
  <svg viewBox="0 0 242 167" className="w-full h-full" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
    {/* Wall */}
    <path d="M0,0 h242 v97 h-242 z" fill="#d7ccc8" />
    <path d="M0,0 h242 v3 h-242 z" fill="#bcaaa4" />
    <path d="M0,3 h242 v1 h-242 z" fill="#a1887f" />
    <path d="M0,4 h242 v1 h-242 z" fill="#e4dbd7" />
    <path d="M0,72 h242 v21 h-242 z" fill="#cbbeb8" />
    <path d="M0,72 h242 v1 h-242 z" fill="#efe7e3" />
    <path d="M0,73 h242 v1 h-242 z" fill="#a1887f" />
    <path d="M9,75 h1 v17 h-1 z M25,75 h1 v17 h-1 z M41,75 h1 v17 h-1 z M57,75 h1 v17 h-1 z M73,75 h1 v17 h-1 z M89,75 h1 v17 h-1 z M105,75 h1 v17 h-1 z M121,75 h1 v17 h-1 z M137,75 h1 v17 h-1 z M153,75 h1 v17 h-1 z M169,75 h1 v17 h-1 z M185,75 h1 v17 h-1 z M201,75 h1 v17 h-1 z M217,75 h1 v17 h-1 z M233,75 h1 v17 h-1 z" fill="#b9aaa3" />
    <path d="M0,93 h242 v4 h-242 z" fill="#6d4c41" />
    <path d="M0,93 h242 v1 h-242 z" fill="#8d6e63" />
    <path d="M0,96 h242 v1 h-242 z" fill="#4e342e" />
    {/* Floor */}
    <path d="M0,97 h242 v70 h-242 z" fill="#8d6e63" />
    <path d="M0,97 h242 v2 h-242 z M0,108 h242 v1 h-242 z M0,118 h242 v1 h-242 z M0,128 h242 v1 h-242 z M0,138 h242 v1 h-242 z M0,148 h242 v1 h-242 z M0,158 h242 v1 h-242 z M22,99 h1 v9 h-1 z M102,99 h1 v9 h-1 z M182,99 h1 v9 h-1 z M62,109 h1 v9 h-1 z M142,109 h1 v9 h-1 z M222,109 h1 v9 h-1 z M22,119 h1 v9 h-1 z M102,119 h1 v9 h-1 z M182,119 h1 v9 h-1 z M62,129 h1 v9 h-1 z M142,129 h1 v9 h-1 z M222,129 h1 v9 h-1 z M22,139 h1 v9 h-1 z M102,139 h1 v9 h-1 z M182,139 h1 v9 h-1 z M62,149 h1 v9 h-1 z M142,149 h1 v9 h-1 z M222,149 h1 v9 h-1 z M22,159 h1 v8 h-1 z M102,159 h1 v8 h-1 z M182,159 h1 v8 h-1 z" fill="#7b5e54" />
    <path d="M8,103 h7 v1 h-7 z M48,113 h9 v1 h-9 z M96,102 h6 v1 h-6 z M150,104 h8 v1 h-8 z M206,112 h7 v1 h-7 z M30,124 h8 v1 h-8 z M120,123 h6 v1 h-6 z M184,133 h9 v1 h-9 z M70,143 h7 v1 h-7 z M226,144 h6 v1 h-6 z M14,153 h8 v1 h-8 z M140,154 h7 v1 h-7 z M100,163 h9 v1 h-9 z M196,162 h6 v1 h-6 z" fill="#997a6e" />
    {/* Window */}
    <path d="M5,12 h31 v47 h-31 z" fill="#f5efe6" />
    <path d="M7,14 h27 v14 h-27 z" fill="#90caf9" />
    <path d="M7,28 h27 v14 h-27 z" fill="#bbdefb" />
    <path d="M7,42 h27 v9 h-27 z" fill="#e3f2fd" />
    <path d="M11,46 h3 v1 h-3 z M24,46 h2 v1 h-2 z M10,47 h2 v1 h-2 z M13,47 h2 v1 h-2 z M22,47 h2 v1 h-2 z M26,47 h1 v1 h-1 z M31,47 h2 v1 h-2 z M9,48 h2 v1 h-2 z M14,48 h2 v1 h-2 z M21,48 h1 v1 h-1 z M26,48 h2 v1 h-2 z M30,48 h1 v1 h-1 z M33,48 h1 v1 h-1 z M8,49 h2 v1 h-2 z M15,49 h3 v1 h-3 z M20,49 h2 v1 h-2 z M27,49 h4 v1 h-4 z M7,50 h3 v1 h-3 z M16,50 h5 v1 h-5 z M29,50 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M12,47 h1 v1 h-1 z M24,47 h2 v1 h-2 z M11,48 h3 v1 h-3 z M22,48 h4 v1 h-4 z M31,48 h2 v1 h-2 z M10,49 h5 v1 h-5 z M22,49 h5 v1 h-5 z M31,49 h3 v1 h-3 z M10,50 h6 v1 h-6 z M21,50 h8 v1 h-8 z M30,50 h4 v1 h-4 z" fill="#43a047" />
    <path d="M7,51 h27 v6 h-27 z" fill="#81c784" />
    <path d="M11,18 h3 v1 h-3 z M10,19 h5 v1 h-5 z M16,19 h1 v1 h-1 z M9,20 h9 v1 h-9 z M10,21 h7 v1 h-7 z M26,30 h3 v1 h-3 z M25,31 h5 v1 h-5 z" fill="#ffffff" />
    <path d="M13,23 h1 v1 h-1 z M12,24 h1 v1 h-1 z M11,25 h1 v1 h-1 z M10,26 h1 v1 h-1 z M9,27 h1 v1 h-1 z M30,38 h1 v1 h-1 z M29,39 h1 v1 h-1 z M28,40 h1 v1 h-1 z M27,41 h1 v1 h-1 z" fill="#ffffff" opacity="0.55" />
    <path d="M20,14 h1 v43 h-1 z M7,35 h27 v1 h-27 z M3,59 h35 v2 h-35 z" fill="#f5efe6" />
    <path d="M35,12 h1 v47 h-1 z M33,14 h1 v43 h-1 z M7,56 h27 v1 h-27 z" fill="#cfc4bd" />
    <path d="M12,51 h1 v1 h-1 z M14,51 h1 v1 h-1 z M11,52 h2 v1 h-2 z M14,52 h2 v1 h-2 z M12,53 h3 v1 h-3 z M13,54 h1 v1 h-1 z" fill="#4caf50" />
    <path d="M10,55 h7 v1 h-7 z M24,55 h7 v1 h-7 z" fill="#d9825b" />
    <path d="M11,56 h5 v2 h-5 z M25,56 h5 v2 h-5 z" fill="#c2693f" />
    <path d="M12,58 h3 v1 h-3 z M26,58 h3 v1 h-3 z" fill="#a85a36" />
    <path d="M27,49 h1 v3 h-1 z M25,50 h1 v2 h-1 z M30,51 h1 v2 h-1 z M25,52 h3 v1 h-3 z M27,53 h1 v2 h-1 z M29,53 h2 v1 h-2 z" fill="#66bb6a" />
    <path d="M28,50 h1 v5 h-1 z" fill="#388e3c" />
    <path d="M3,61 h35 v1 h-35 z" fill="#bcaaa4" />
    <path d="M4,62 h33 v1 h-33 z" fill="#c5b8b2" />
    {/* Chalkboard */}
    <path d="M58,10 h134 v54 h-134 z M56,65 h138 v2 h-138 z" fill="#5d4037" />
    <path d="M58,10 h134 v1 h-134 z M58,10 h1 v54 h-1 z" fill="#795548" />
    <path d="M58,63 h134 v1 h-134 z M191,10 h1 v54 h-1 z" fill="#3e2723" />
    <path d="M61,13 h128 v48 h-128 z" fill="#1b5e20" />
    <path d="M61,13 h128 v1 h-128 z M61,13 h1 v48 h-1 z" fill="#174f1b" />
    <path d="M56,64 h138 v1 h-138 z M168,62 h8 v1 h-8 z" fill="#a1887f" />
    <path d="M57,67 h136 v1 h-136 z" fill="#c5b8b2" />
    <path d="M96,63 h5 v1 h-5 z" fill="#ffffff" />
    <path d="M104,63 h4 v1 h-4 z" fill="#fff59d" />
    <path d="M111,63 h3 v1 h-3 z" fill="#f8bbd0" />
    <path d="M168,63 h8 v1 h-8 z" fill="#424242" />
    {/* Chalk: COMPOST = greens + browns + water + air */}
    <path d="M75,17 h3 v1 h-3 z M81,17 h3 v1 h-3 z M86,17 h1 v1 h-1 z M90,17 h1 v1 h-1 z M92,17 h4 v1 h-4 z M99,17 h3 v1 h-3 z M105,17 h4 v1 h-4 z M110,17 h5 v1 h-5 z M74,18 h1 v5 h-1 z M78,18 h1 v1 h-1 z M80,18 h1 v5 h-1 z M84,18 h1 v5 h-1 z M86,18 h2 v1 h-2 z M89,18 h2 v1 h-2 z M92,18 h1 v2 h-1 z M96,18 h1 v2 h-1 z M98,18 h1 v5 h-1 z M102,18 h1 v5 h-1 z M104,18 h1 v2 h-1 z M112,18 h1 v6 h-1 z M86,19 h1 v5 h-1 z M88,19 h1 v2 h-1 z M90,19 h1 v5 h-1 z M92,20 h4 v1 h-4 z M105,20 h3 v1 h-3 z M92,21 h1 v3 h-1 z M108,21 h1 v2 h-1 z M78,22 h1 v1 h-1 z M75,23 h3 v1 h-3 z M81,23 h3 v1 h-3 z M99,23 h3 v1 h-3 z M104,23 h4 v1 h-4 z M119,19 h5 v1 h-5 z M119,22 h5 v1 h-5 z" fill="#f5f5f5" />
    <path d="M132,17 h2 v1 h-2 z M130,18 h4 v1 h-4 z M129,19 h5 v1 h-5 z M129,20 h4 v1 h-4 z M128,21 h4 v1 h-4 z M129,22 h2 v1 h-2 z M128,23 h1 v1 h-1 z" fill="#a5d6a7" />
    <path d="M138,19 h1 v1 h-1 z M137,20 h3 v1 h-3 z M138,21 h1 v1 h-1 z M152,19 h1 v1 h-1 z M151,20 h3 v1 h-3 z M152,21 h1 v1 h-1 z M166,19 h1 v1 h-1 z M165,20 h3 v1 h-3 z M166,21 h1 v1 h-1 z M173,17 h2 v1 h-2 z M175,18 h1 v1 h-1 z M170,19 h5 v1 h-5 z M170,21 h6 v1 h-6 z M176,22 h1 v1 h-1 z M174,23 h2 v1 h-2 z" fill="#f5f5f5" />
    <path d="M146,17 h2 v1 h-2 z M144,18 h4 v1 h-4 z M143,19 h5 v1 h-5 z M143,20 h4 v1 h-4 z M142,21 h4 v1 h-4 z M143,22 h2 v1 h-2 z M142,23 h1 v1 h-1 z" fill="#e6a15c" />
    <path d="M159,17 h1 v2 h-1 z M158,19 h3 v1 h-3 z M157,20 h5 v3 h-5 z M158,23 h3 v1 h-3 z" fill="#90caf9" />
    <path d="M74,27 h101 v1 h-101 z" fill="#f5f5f5" opacity="0.5" />
    {/* Chalk: soil layers diagram */}
    <path d="M84,31 h1 v1 h-1 z M86,31 h1 v1 h-1 z M85,32 h1 v2 h-1 z" fill="#a5d6a7" />
    <path d="M73,34 h26 v4 h-26 z" fill="#6d4c41" />
    <path d="M73,38 h26 v6 h-26 z" fill="#a1887f" />
    <path d="M73,44 h26 v6 h-26 z" fill="#e6a15c" />
    <path d="M73,50 h26 v7 h-26 z" fill="#bdbdbd" />
    <path d="M85,34 h1 v6 h-1 z M83,37 h2 v1 h-2 z M86,38 h2 v1 h-2 z" fill="#f5f5f5" opacity="0.7" />
    <path d="M91,39 h2 v1 h-2 z M90,40 h1 v1 h-1 z M93,40 h1 v1 h-1 z M95,40 h1 v1 h-1 z M94,41 h1 v1 h-1 z" fill="#f8bbd0" />
    <path d="M77,52 h2 v1 h-2 z M83,52 h2 v1 h-2 z M90,52 h1 v1 h-1 z M76,53 h3 v1 h-3 z M82,53 h3 v1 h-3 z M87,53 h1 v2 h-1 z M89,53 h3 v1 h-3 z M77,54 h1 v1 h-1 z M90,54 h1 v1 h-1 z" fill="#757575" />
    <path d="M72,33 h28 v1 h-28 z M72,57 h28 v1 h-28 z M72,33 h1 v25 h-1 z M99,33 h1 v25 h-1 z M68,33 h1 v1 h-1 z M67,34 h1 v3 h-1 z M69,34 h1 v3 h-1 z M68,37 h1 v1 h-1 z M68,39 h1 v1 h-1 z M67,40 h1 v1 h-1 z M69,40 h1 v1 h-1 z M67,41 h3 v1 h-3 z M67,42 h1 v2 h-1 z M69,42 h1 v2 h-1 z M67,45 h2 v1 h-2 z M67,46 h1 v1 h-1 z M69,46 h1 v1 h-1 z M67,47 h2 v1 h-2 z M67,48 h1 v1 h-1 z M69,48 h1 v1 h-1 z M67,49 h2 v1 h-2 z M68,52 h2 v1 h-2 z M67,53 h1 v3 h-1 z M68,56 h2 v1 h-2 z" fill="#f5f5f5" />
    <path d="M105,34 h2 v1 h-2 z M109,34 h1 v1 h-1 z M112,34 h3 v1 h-3 z M116,34 h1 v4 h-1 z M104,35 h1 v1 h-1 z M108,35 h1 v3 h-1 z M110,35 h1 v3 h-1 z M113,35 h1 v3 h-1 z M105,36 h1 v1 h-1 z M106,37 h1 v1 h-1 z M104,38 h2 v1 h-2 z M109,38 h1 v1 h-1 z M112,38 h3 v1 h-3 z M116,38 h3 v1 h-3 z M104,41 h1 v4 h-1 z M109,41 h1 v1 h-1 z M112,41 h1 v2 h-1 z M114,41 h1 v2 h-1 z M116,41 h3 v1 h-3 z M120,41 h2 v1 h-2 z M125,41 h2 v1 h-2 z M108,42 h1 v1 h-1 z M110,42 h1 v1 h-1 z M116,42 h1 v1 h-1 z M120,42 h1 v1 h-1 z M122,42 h1 v1 h-1 z M124,42 h1 v1 h-1 z M108,43 h3 v1 h-3 z M113,43 h1 v3 h-1 z M116,43 h2 v1 h-2 z M120,43 h2 v1 h-2 z M125,43 h1 v1 h-1 z M108,44 h1 v2 h-1 z M110,44 h1 v2 h-1 z M116,44 h1 v1 h-1 z M120,44 h1 v2 h-1 z M122,44 h1 v2 h-1 z M126,44 h1 v1 h-1 z M104,45 h3 v1 h-3 z M116,45 h3 v1 h-3 z M124,45 h2 v1 h-2 z" fill="#fff59d" />
    {/* Chalk: ingredient list */}
    <path d="M138,33 h2 v2 h-2 z M144,32 h2 v1 h-2 z M147,32 h2 v1 h-2 z M151,32 h3 v1 h-3 z M155,32 h3 v1 h-3 z M159,32 h2 v1 h-2 z M164,32 h2 v1 h-2 z M143,33 h1 v3 h-1 z M147,33 h1 v1 h-1 z M149,33 h1 v1 h-1 z M151,33 h1 v1 h-1 z M155,33 h1 v1 h-1 z M159,33 h1 v4 h-1 z M161,33 h1 v4 h-1 z M163,33 h1 v1 h-1 z M145,34 h1 v2 h-1 z M147,34 h2 v1 h-2 z M151,34 h2 v1 h-2 z M155,34 h2 v1 h-2 z M164,34 h1 v1 h-1 z M147,35 h1 v2 h-1 z M149,35 h1 v2 h-1 z M151,35 h1 v1 h-1 z M155,35 h1 v1 h-1 z M165,35 h1 v1 h-1 z M144,36 h2 v1 h-2 z M151,36 h3 v1 h-3 z M155,36 h3 v1 h-3 z M163,36 h2 v1 h-2 z" fill="#a5d6a7" />
    <path d="M138,40 h2 v2 h-2 z M143,39 h2 v1 h-2 z M147,39 h2 v1 h-2 z M152,39 h1 v1 h-1 z M155,39 h1 v2 h-1 z M157,39 h1 v2 h-1 z M159,39 h2 v1 h-2 z M164,39 h2 v1 h-2 z M143,40 h1 v1 h-1 z M145,40 h1 v1 h-1 z M147,40 h1 v1 h-1 z M149,40 h1 v1 h-1 z M151,40 h1 v3 h-1 z M153,40 h1 v3 h-1 z M159,40 h1 v4 h-1 z M161,40 h1 v4 h-1 z M163,40 h1 v1 h-1 z M143,41 h2 v1 h-2 z M147,41 h2 v1 h-2 z M155,41 h3 v2 h-3 z M164,41 h1 v1 h-1 z M143,42 h1 v1 h-1 z M145,42 h1 v1 h-1 z M147,42 h1 v2 h-1 z M149,42 h1 v2 h-1 z M165,42 h1 v1 h-1 z M143,43 h2 v1 h-2 z M152,43 h1 v1 h-1 z M155,43 h1 v1 h-1 z M157,43 h1 v1 h-1 z M163,43 h2 v1 h-2 z" fill="#e6a15c" />
    <path d="M138,47 h2 v2 h-2 z M143,46 h1 v2 h-1 z M145,46 h1 v2 h-1 z M148,46 h1 v1 h-1 z M151,46 h3 v1 h-3 z M155,46 h3 v1 h-3 z M159,46 h2 v1 h-2 z M147,47 h1 v1 h-1 z M149,47 h1 v1 h-1 z M152,47 h1 v4 h-1 z M155,47 h1 v1 h-1 z M159,47 h1 v1 h-1 z M161,47 h1 v1 h-1 z M143,48 h3 v2 h-3 z M147,48 h3 v1 h-3 z M155,48 h2 v1 h-2 z M159,48 h2 v1 h-2 z M147,49 h1 v2 h-1 z M149,49 h1 v2 h-1 z M155,49 h1 v1 h-1 z M159,49 h1 v2 h-1 z M161,49 h1 v2 h-1 z M143,50 h1 v1 h-1 z M145,50 h1 v1 h-1 z M155,50 h3 v1 h-3 z" fill="#90caf9" />
    <path d="M138,54 h2 v2 h-2 z M144,53 h1 v1 h-1 z M147,53 h3 v1 h-3 z M151,53 h2 v1 h-2 z M143,54 h1 v1 h-1 z M145,54 h1 v1 h-1 z M148,54 h1 v3 h-1 z M151,54 h1 v1 h-1 z M153,54 h1 v1 h-1 z M143,55 h3 v1 h-3 z M151,55 h2 v1 h-2 z M143,56 h1 v2 h-1 z M145,56 h1 v2 h-1 z M151,56 h1 v2 h-1 z M153,56 h1 v2 h-1 z M147,57 h3 v1 h-3 z" fill="#f5f5f5" />
    {/* Clock (10:00) */}
    <path d="M201,7 h5 v1 h-5 z M199,8 h2 v1 h-2 z M206,8 h2 v1 h-2 z M198,9 h1 v2 h-1 z M208,9 h1 v2 h-1 z M197,11 h1 v5 h-1 z M209,11 h1 v5 h-1 z M198,16 h1 v2 h-1 z M208,16 h1 v2 h-1 z M199,18 h2 v1 h-2 z M206,18 h2 v1 h-2 z M201,19 h5 v1 h-5 z" fill="#5d4037" />
    <path d="M201,8 h5 v1 h-5 z M199,9 h4 v2 h-4 z M204,9 h4 v2 h-4 z M198,11 h5 v1 h-5 z M204,11 h5 v2 h-5 z M198,12 h2 v1 h-2 z M201,12 h2 v1 h-2 z M199,13 h2 v1 h-2 z M204,13 h4 v1 h-4 z M198,14 h11 v2 h-11 z M199,16 h9 v1 h-9 z M199,17 h4 v1 h-4 z M204,17 h4 v1 h-4 z M201,18 h5 v1 h-5 z" fill="#fffdf2" />
    <path d="M203,9 h1 v1 h-1 z M198,13 h1 v1 h-1 z M208,13 h1 v1 h-1 z M203,17 h1 v1 h-1 z" fill="#9e9e9e" />
    <path d="M203,10 h1 v3 h-1 z M200,12 h1 v1 h-1 z M201,13 h2 v1 h-2 z" fill="#3e2723" />
    <path d="M203,13 h1 v1 h-1 z" fill="#e53935" />
    {/* Worm poster */}
    <path d="M214,6 h22 v28 h-22 z" fill="#d7c9a8" />
    <path d="M215,7 h20 v26 h-20 z" fill="#fff8e1" />
    <path d="M224,5 h2 v2 h-2 z M230,16 h1 v1 h-1 z M232,16 h1 v1 h-1 z M229,17 h5 v1 h-5 z M230,18 h3 v1 h-3 z M231,19 h1 v1 h-1 z" fill="#e53935" />
    <path d="M216,9 h1 v2 h-1 z M218,9 h1 v2 h-1 z M221,9 h1 v1 h-1 z M224,9 h2 v1 h-2 z M228,9 h1 v1 h-1 z M230,9 h1 v1 h-1 z M233,9 h2 v1 h-2 z M220,10 h1 v3 h-1 z M222,10 h1 v3 h-1 z M224,10 h1 v1 h-1 z M226,10 h1 v1 h-1 z M228,10 h3 v2 h-3 z M232,10 h1 v1 h-1 z M216,11 h3 v2 h-3 z M224,11 h2 v1 h-2 z M233,11 h1 v1 h-1 z M224,12 h1 v2 h-1 z M226,12 h1 v2 h-1 z M228,12 h1 v2 h-1 z M230,12 h1 v2 h-1 z M234,12 h1 v1 h-1 z M216,13 h1 v1 h-1 z M218,13 h1 v1 h-1 z M221,13 h1 v1 h-1 z M232,13 h2 v1 h-2 z" fill="#5d4037" />
    <path d="M221,15 h4 v1 h-4 z M220,16 h6 v1 h-6 z M220,17 h1 v1 h-1 z M222,17 h2 v1 h-2 z M225,17 h1 v1 h-1 z M220,18 h2 v1 h-2 z M224,18 h2 v1 h-2 z M221,19 h4 v1 h-4 z M223,21 h4 v1 h-4 z M224,22 h4 v1 h-4 z M223,24 h4 v1 h-4 z M222,25 h4 v1 h-4 z M221,27 h4 v1 h-4 z" fill="#f48fb1" />
    <path d="M222,18 h2 v1 h-2 z M222,20 h4 v1 h-4 z M224,23 h4 v1 h-4 z M221,26 h4 v1 h-4 z" fill="#d81b60" />
    <path d="M221,17 h1 v1 h-1 z M224,17 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M231,24 h1 v1 h-1 z M233,24 h1 v1 h-1 z M232,25 h1 v2 h-1 z" fill="#66bb6a" />
    <path d="M215,27 h6 v1 h-6 z M225,27 h10 v1 h-10 z M215,28 h12 v1 h-12 z M228,28 h7 v1 h-7 z M215,29 h2 v1 h-2 z M218,29 h13 v1 h-13 z M232,29 h3 v1 h-3 z M215,30 h7 v1 h-7 z M223,30 h12 v1 h-12 z" fill="#8d6e63" />
    <path d="M217,26 h2 v1 h-2 z M227,26 h2 v1 h-2 z M227,28 h1 v1 h-1 z M217,29 h1 v1 h-1 z M231,29 h1 v1 h-1 z M222,30 h1 v1 h-1 z M215,31 h20 v1 h-20 z" fill="#6d4c41" />
    {/* Bookshelf */}
    <path d="M198,48 h40 v49 h-40 z" fill="#6d4c41" />
    <path d="M200,50 h36 v43 h-36 z" fill="#3e2723" />
    <path d="M198,48 h1 v49 h-1 z M198,48 h40 v1 h-40 z M200,63 h36 v1 h-36 z M200,78 h36 v1 h-36 z M200,93 h36 v1 h-36 z M227,67 h3 v11 h-3 z" fill="#8d6e63" />
    <path d="M237,48 h1 v49 h-1 z M200,64 h36 v1 h-36 z M200,79 h36 v1 h-36 z" fill="#5d4037" />
    <path d="M198,95 h40 v2 h-40 z M203,72 h4 v5 h-4 z" fill="#4e342e" />
    <path d="M201,52 h3 v11 h-3 z M225,59 h9 v2 h-9 z M230,66 h2 v12 h-2 z" fill="#c62828" />
    <path d="M201,54 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M204,53 h2 v10 h-2 z M229,82 h3 v11 h-3 z" fill="#ef6c00" />
    <path d="M206,51 h3 v12 h-3 z M224,61 h10 v2 h-10 z M232,68 h3 v10 h-3 z" fill="#1565c0" />
    <path d="M206,53 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M209,54 h2 v9 h-2 z M224,57 h9 v2 h-9 z" fill="#f9a825" />
    <path d="M211,52 h3 v11 h-3 z M224,66 h3 v12 h-3 z" fill="#2e7d32" />
    <path d="M211,54 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M214,51 h2 v12 h-2 z M232,81 h3 v12 h-3 z" fill="#6a1b9a" />
    <path d="M217,53 h3 v10 h-3 z" fill="#00838f" />
    <path d="M217,55 h3 v1 h-3 z M224,68 h3 v1 h-3 z M230,68 h2 v1 h-2 z" fill="#fff8e1" />
    <path d="M220,52 h2 v11 h-2 z" fill="#ad1457" />
    <path d="M203,70 h4 v1 h-4 z M210,70 h4 v1 h-4 z M217,70 h4 v1 h-4 z" fill="#9e9e9e" />
    <path d="M202,71 h6 v1 h-6 z M202,72 h1 v5 h-1 z M207,72 h1 v5 h-1 z M202,77 h6 v1 h-6 z M209,71 h6 v1 h-6 z M209,72 h1 v5 h-1 z M214,72 h1 v5 h-1 z M209,77 h6 v1 h-6 z M216,71 h6 v1 h-6 z M216,72 h1 v5 h-1 z M221,72 h1 v5 h-1 z M216,77 h6 v1 h-6 z" fill="#cfd8dc" />
    <path d="M210,72 h4 v5 h-4 z" fill="#d7b98a" />
    <path d="M217,72 h4 v5 h-4 z" fill="#b5651d" />
    <path d="M202,84 h16 v9 h-16 z" fill="#c49a6c" />
    <path d="M202,84 h16 v1 h-16 z" fill="#ddb98b" />
    <path d="M202,88 h16 v1 h-16 z" fill="#a67c52" />
    <path d="M208,85 h4 v2 h-4 z M204,47 h6 v1 h-6 z" fill="#5d4037" />
    <path d="M221,81 h4 v12 h-4 z" fill="#455a64" />
    <path d="M221,83 h4 v1 h-4 z" fill="#fff8e1" />
    <path d="M225,81 h4 v12 h-4 z" fill="#37474f" />
    <path d="M225,83 h4 v1 h-4 z M232,83 h3 v1 h-3 z" fill="#fff8e1" />
    <path d="M205,37 h4 v1 h-4 z M204,38 h1 v1 h-1 z M207,38 h3 v1 h-3 z M203,39 h1 v1 h-1 z M207,39 h4 v1 h-4 z M203,40 h2 v1 h-2 z M206,40 h2 v1 h-2 z M210,40 h1 v2 h-1 z M203,41 h4 v1 h-4 z M203,42 h1 v1 h-1 z M205,42 h3 v1 h-3 z M209,42 h2 v1 h-2 z M204,43 h1 v1 h-1 z M206,43 h4 v1 h-4 z M205,44 h4 v1 h-4 z" fill="#42a5f5" />
    <path d="M205,38 h2 v1 h-2 z M204,39 h3 v1 h-3 z M205,40 h1 v1 h-1 z M208,40 h2 v1 h-2 z M207,41 h3 v1 h-3 z M204,42 h1 v1 h-1 z M208,42 h1 v1 h-1 z M205,43 h1 v1 h-1 z M229,38 h1 v2 h-1 z M227,39 h1 v1 h-1 z M232,39 h1 v1 h-1 z M226,40 h1 v2 h-1 z M228,40 h2 v1 h-2 z M231,40 h1 v1 h-1 z M229,41 h1 v1 h-1 z M232,41 h1 v1 h-1 z M234,41 h1 v1 h-1 z M227,42 h1 v1 h-1 z M232,42 h2 v1 h-2 z M228,43 h1 v1 h-1 z M232,43 h1 v1 h-1 z" fill="#66bb6a" />
    <path d="M206,45 h2 v2 h-2 z" fill="#c9a227" />
    <path d="M230,38 h1 v3 h-1 z M227,40 h1 v1 h-1 z M232,40 h1 v1 h-1 z M227,41 h2 v1 h-2 z M230,41 h2 v1 h-2 z M228,42 h4 v1 h-4 z M234,42 h1 v1 h-1 z M229,43 h3 v1 h-3 z" fill="#388e3c" />
    <path d="M226,44 h8 v1 h-8 z" fill="#d9825b" />
    <path d="M227,45 h6 v2 h-6 z M228,47 h4 v1 h-4 z" fill="#c2693f" />
    {/* Compost bin */}
    <path d="M15,68 h2 v1 h-2 z M23,68 h1 v1 h-1 z M12,69 h3 v1 h-3 z M16,69 h4 v1 h-4 z M21,69 h5 v1 h-5 z M9,70 h4 v1 h-4 z M14,70 h6 v1 h-6 z M21,70 h3 v1 h-3 z M25,70 h4 v1 h-4 z M7,71 h2 v1 h-2 z M10,71 h5 v1 h-5 z M16,71 h4 v1 h-4 z M21,71 h7 v1 h-7 z M29,71 h3 v1 h-3 z M5,72 h5 v1 h-5 z M11,72 h7 v1 h-7 z M19,72 h5 v1 h-5 z M25,72 h5 v1 h-5 z M31,72 h4 v1 h-4 z M4,73 h2 v1 h-2 z M7,73 h7 v1 h-7 z M15,73 h5 v1 h-5 z M21,73 h8 v1 h-8 z M30,73 h6 v1 h-6 z" fill="#4e342e" />
    <path d="M13,70 h1 v1 h-1 z M20,71 h1 v1 h-1 z M10,72 h1 v1 h-1 z M30,72 h1 v1 h-1 z M14,73 h1 v1 h-1 z" fill="#3e2723" />
    <path d="M15,69 h1 v1 h-1 z M24,70 h1 v1 h-1 z M15,71 h1 v1 h-1 z M24,72 h1 v1 h-1 z M6,73 h1 v1 h-1 z M29,73 h1 v1 h-1 z" fill="#7cb342" />
    <path d="M20,69 h1 v1 h-1 z M9,71 h1 v1 h-1 z M28,71 h1 v1 h-1 z M20,73 h1 v1 h-1 z" fill="#ef6c00" />
    <path d="M20,70 h1 v1 h-1 z M18,72 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M3,74 h34 v1 h-34 z" fill="#66bb6a" />
    <path d="M3,75 h34 v1 h-34 z" fill="#388e3c" />
    <path d="M3,76 h34 v1 h-34 z M33,77 h3 v25 h-3 z M5,102 h30 v1 h-30 z" fill="#1b5e20" />
    <path d="M4,77 h2 v25 h-2 z" fill="#43a047" />
    <path d="M6,77 h27 v25 h-27 z" fill="#2e7d32" />
    <path d="M4,78 h32 v1 h-32 z" fill="#1b5e20" />
    <path d="M6,81 h29 v7 h-29 z" fill="#f5ecd7" />
    <path d="M8,82 h2 v1 h-2 z M12,82 h1 v1 h-1 z M15,82 h1 v1 h-1 z M17,82 h1 v1 h-1 z M19,82 h2 v1 h-2 z M24,82 h1 v1 h-1 z M28,82 h2 v1 h-2 z M31,82 h3 v1 h-3 z M7,83 h1 v3 h-1 z M11,83 h1 v3 h-1 z M13,83 h1 v3 h-1 z M15,83 h3 v2 h-3 z M19,83 h1 v1 h-1 z M21,83 h1 v1 h-1 z M23,83 h1 v3 h-1 z M25,83 h1 v3 h-1 z M27,83 h1 v1 h-1 z M32,83 h1 v4 h-1 z M19,84 h2 v1 h-2 z M28,84 h1 v1 h-1 z M15,85 h1 v2 h-1 z M17,85 h1 v2 h-1 z M19,85 h1 v2 h-1 z M29,85 h1 v1 h-1 z M8,86 h2 v1 h-2 z M12,86 h1 v1 h-1 z M24,86 h1 v1 h-1 z M27,86 h2 v1 h-2 z M4,100 h32 v1 h-32 z" fill="#1b5e20" />
    <path d="M21,91 h2 v1 h-2 z M19,92 h4 v1 h-4 z M18,93 h5 v1 h-5 z M18,94 h4 v1 h-4 z M17,95 h4 v1 h-4 z M18,96 h2 v1 h-2 z M17,97 h1 v1 h-1 z" fill="#a5d6a7" />
    <path d="M3,103 h34 v1 h-34 z" fill="#000000" opacity="0.2" />
  </svg>
));

export const PondSprite = React.memo(() => (
  <svg viewBox="0 0 80 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Water */}
    <path d="M31,3 h18 v1 h-18 z M25,4 h1 v1 h-1 z M54,4 h1 v1 h-1 z M21,5 h1 v1 h-1 z M58,5 h1 v1 h-1 z M18,6 h1 v1 h-1 z M61,6 h1 v1 h-1 z M16,7 h1 v1 h-1 z M63,7 h1 v1 h-1 z M13,8 h1 v1 h-1 z M66,8 h1 v1 h-1 z M12,9 h1 v1 h-1 z M67,9 h1 v1 h-1 z M10,10 h1 v1 h-1 z M9,11 h1 v1 h-1 z M8,12 h1 v1 h-1 z M71,12 h1 v1 h-1 z M7,13 h1 v1 h-1 z M72,13 h1 v1 h-1 z M6,14 h1 v1 h-1 z M5,15 h1 v2 h-1 z M4,17 h1 v6 h-1 z M75,18 h1 v5 h-1 z M5,23 h1 v2 h-1 z M6,25 h1 v1 h-1 z M73,25 h1 v1 h-1 z M7,26 h1 v1 h-1 z M72,26 h1 v1 h-1 z M8,27 h1 v1 h-1 z M71,27 h1 v1 h-1 z M9,28 h1 v1 h-1 z M10,29 h1 v1 h-1 z M69,29 h1 v1 h-1 z M12,30 h1 v1 h-1 z M67,30 h1 v1 h-1 z M13,31 h1 v1 h-1 z M16,32 h1 v1 h-1 z M63,32 h1 v1 h-1 z M18,33 h1 v1 h-1 z M61,33 h1 v1 h-1 z M21,34 h1 v1 h-1 z M58,34 h1 v1 h-1 z M25,35 h1 v1 h-1 z M54,35 h1 v1 h-1 z M31,36 h18 v1 h-18 z" fill="#0288d1" />
    <path d="M26,4 h28 v1 h-28 z M22,5 h36 v1 h-36 z M19,6 h2 v1 h-2 z M43,6 h18 v1 h-18 z M17,7 h2 v1 h-2 z M37,7 h26 v1 h-26 z M14,8 h2 v1 h-2 z M30,8 h36 v1 h-36 z M13,9 h2 v1 h-2 z M25,9 h41 v1 h-41 z M11,10 h54 v1 h-54 z M68,10 h1 v2 h-1 z M10,11 h55 v1 h-55 z M9,12 h56 v1 h-56 z M68,12 h2 v3 h-2 z M8,13 h57 v1 h-57 z M71,13 h1 v1 h-1 z M7,14 h23 v1 h-23 z M40,14 h25 v1 h-25 z M71,14 h2 v4 h-2 z M6,15 h60 v2 h-60 z M67,15 h3 v5 h-3 z M5,17 h15 v1 h-15 z M21,17 h45 v1 h-45 z M5,18 h14 v1 h-14 z M22,18 h44 v1 h-44 z M71,18 h3 v7 h-3 z M5,19 h15 v1 h-15 z M21,19 h45 v1 h-45 z M5,20 h8 v3 h-8 z M68,20 h2 v3 h-2 z M6,23 h8 v2 h-8 z M67,23 h3 v6 h-3 z M7,25 h8 v1 h-8 z M71,25 h2 v1 h-2 z M8,26 h8 v1 h-8 z M65,26 h1 v1 h-1 z M71,26 h1 v1 h-1 z M9,27 h8 v1 h-8 z M64,27 h2 v1 h-2 z M10,28 h8 v1 h-8 z M63,28 h3 v1 h-3 z M11,29 h8 v1 h-8 z M62,29 h4 v1 h-4 z M67,29 h2 v1 h-2 z M13,30 h8 v1 h-8 z M60,30 h6 v1 h-6 z M14,31 h8 v1 h-8 z M59,31 h7 v1 h-7 z M17,32 h8 v1 h-8 z M56,32 h7 v1 h-7 z M19,33 h8 v1 h-8 z M54,33 h7 v1 h-7 z M22,34 h36 v1 h-36 z M26,35 h28 v1 h-28 z" fill="#4fc3f7" />
    <path d="M13,20 h5 v1 h-5 z M22,20 h28 v1 h-28 z M55,20 h11 v1 h-11 z M67,20 h1 v3 h-1 z M13,21 h4 v2 h-4 z M23,21 h26 v2 h-26 z M56,21 h10 v3 h-10 z M20,22 h1 v1 h-1 z M14,23 h4 v1 h-4 z M23,23 h27 v1 h-27 z M53,23 h1 v1 h-1 z M14,24 h37 v1 h-37 z M54,24 h12 v1 h-12 z M15,25 h51 v1 h-51 z M16,26 h49 v1 h-49 z M17,27 h47 v1 h-47 z M18,28 h45 v1 h-45 z M19,29 h43 v1 h-43 z M21,30 h31 v1 h-31 z M59,30 h1 v1 h-1 z M22,31 h37 v1 h-37 z M25,32 h31 v1 h-31 z M27,33 h27 v1 h-27 z" fill="#29b6f6" />
    <path d="M21,6 h22 v1 h-22 z M19,7 h18 v1 h-18 z M16,8 h14 v1 h-14 z M15,9 h10 v1 h-10 z" fill="#81d4fa" />
    <path d="M30,14 h10 v1 h-10 z M52,30 h7 v1 h-7 z" fill="#e1f5fe" />
    {/* Lily pads & cattails */}
    <path d="M18,20 h4 v1 h-4 z M50,20 h5 v1 h-5 z M17,21 h1 v1 h-1 z M19,21 h4 v1 h-4 z M49,21 h1 v1 h-1 z M51,21 h5 v1 h-5 z M17,22 h3 v1 h-3 z M21,22 h2 v1 h-2 z M49,22 h5 v1 h-5 z M55,22 h1 v1 h-1 z M18,23 h5 v1 h-5 z M50,23 h3 v1 h-3 z M54,23 h2 v1 h-2 z M51,24 h3 v1 h-3 z" fill="#4caf50" />
    <path d="M18,21 h1 v1 h-1 z M50,21 h1 v1 h-1 z M54,22 h1 v1 h-1 z" fill="#81c784" />
    <path d="M20,17 h1 v1 h-1 z M19,18 h1 v1 h-1 z M21,18 h1 v1 h-1 z M20,19 h1 v1 h-1 z" fill="#f48fb1" />
    <path d="M20,18 h1 v1 h-1 z" fill="#fdd835" />
    <path d="M70,6 h1 v1 h-1 z M66,9 h1 v1 h-1 z M70,12 h1 v23 h-1 z M74,12 h1 v1 h-1 z M66,15 h1 v20 h-1 z M74,18 h1 v17 h-1 z" fill="#558b2f" />
    <path d="M69,7 h3 v5 h-3 z M65,10 h3 v5 h-3 z M73,13 h3 v5 h-3 z" fill="#5d4037" />
    {/* Ripples */}
    <g className="animate-pond-ripple-1">
      <path d="M42,24 h4 v1 h-4 z M41,25 h1 v1 h-1 z M46,25 h1 v1 h-1 z M42,26 h4 v1 h-4 z" fill="#e1f5fe" opacity="0.7" />
    </g>
    <g className="animate-pond-ripple-2">
      <path d="M58,11 h4 v1 h-4 z M57,12 h1 v1 h-1 z M62,12 h1 v1 h-1 z M58,13 h4 v1 h-4 z" fill="#e1f5fe" opacity="0.7" />
    </g>
    <g className="animate-pond-ripple-3">
      <path d="M16,30 h4 v1 h-4 z M15,31 h1 v1 h-1 z M20,31 h1 v1 h-1 z M16,32 h4 v1 h-4 z" fill="#e1f5fe" opacity="0.7" />
    </g>
  </svg>
));

export const BarnSprite = React.memo(() => (
  <svg viewBox="0 0 48 44" className="w-full h-full drop-shadow-lg" shapeRendering="crispEdges">
    {/* Roof */}
    <path d="M23,0 h2 v1 h-2 z M21,1 h2 v1 h-2 z M20,2 h2 v1 h-2 z M17,4 h2 v1 h-2 z M16,5 h2 v1 h-2 z M15,6 h2 v1 h-2 z M12,8 h2 v1 h-2 z M11,9 h2 v1 h-2 z M9,10 h2 v1 h-2 z M7,12 h2 v1 h-2 z M5,13 h2 v1 h-2 z M4,14 h2 v1 h-2 z M1,16 h2 v1 h-2 z M0,17 h2 v1 h-2 z" fill="#a52a2a" />
    <path d="M23,1 h4 v1 h-4 z M22,2 h6 v1 h-6 z M19,4 h12 v1 h-12 z M18,5 h14 v1 h-14 z M17,6 h3 v1 h-3 z M28,6 h5 v1 h-5 z M14,8 h6 v1 h-6 z M28,8 h8 v1 h-8 z M13,9 h7 v1 h-7 z M28,9 h9 v1 h-9 z M11,10 h9 v1 h-9 z M28,10 h11 v1 h-11 z M9,12 h11 v1 h-11 z M28,12 h13 v1 h-13 z M7,13 h13 v1 h-13 z M28,13 h15 v1 h-15 z M6,14 h38 v1 h-38 z M3,16 h44 v1 h-44 z M2,17 h46 v1 h-46 z" fill="#8b1a1a" />
    <path d="M19,3 h10 v1 h-10 z M13,7 h7 v1 h-7 z M28,7 h7 v1 h-7 z M8,11 h12 v1 h-12 z M28,11 h12 v1 h-12 z M3,15 h42 v1 h-42 z M0,18 h48 v1 h-48 z" fill="#6d1515" />
    {/* Walls & trim */}
    <path d="M6,20 h32 v3 h-32 z M6,24 h1 v3 h-1 z M13,24 h22 v3 h-22 z M6,28 h1 v1 h-1 z M13,28 h2 v1 h-2 z M33,28 h2 v1 h-2 z M6,29 h9 v2 h-9 z M33,29 h5 v2 h-5 z M6,32 h9 v3 h-9 z M33,32 h5 v3 h-5 z M6,36 h9 v3 h-9 z M33,36 h5 v3 h-5 z M6,40 h9 v3 h-9 z M33,40 h5 v3 h-5 z" fill="#c0392b" />
    <path d="M38,20 h4 v3 h-4 z M41,24 h1 v3 h-1 z M41,28 h1 v1 h-1 z M38,29 h4 v2 h-4 z M38,32 h4 v3 h-4 z M38,36 h4 v3 h-4 z M38,40 h4 v3 h-4 z" fill="#922b21" />
    <path d="M6,23 h1 v1 h-1 z M13,23 h22 v1 h-22 z M41,23 h1 v1 h-1 z M6,27 h1 v1 h-1 z M13,27 h2 v1 h-2 z M33,27 h2 v1 h-2 z M41,27 h1 v1 h-1 z M6,31 h9 v1 h-9 z M33,31 h9 v1 h-9 z M6,35 h9 v1 h-9 z M33,35 h9 v1 h-9 z M6,39 h9 v1 h-9 z M33,39 h9 v1 h-9 z" fill="#b03a2e" />
    <path d="M20,6 h8 v1 h-8 z M20,7 h1 v6 h-1 z M27,7 h1 v6 h-1 z M20,13 h8 v1 h-8 z M4,19 h40 v1 h-40 z M4,20 h2 v23 h-2 z M42,20 h2 v23 h-2 z M7,23 h6 v1 h-6 z M35,23 h6 v1 h-6 z M7,24 h1 v2 h-1 z M10,24 h1 v2 h-1 z M12,24 h1 v2 h-1 z M35,24 h1 v2 h-1 z M38,24 h1 v2 h-1 z M40,24 h1 v2 h-1 z M7,26 h6 v1 h-6 z M35,26 h6 v1 h-6 z M7,27 h1 v1 h-1 z M10,27 h1 v1 h-1 z M12,27 h1 v1 h-1 z M15,27 h18 v1 h-18 z M35,27 h1 v1 h-1 z M38,27 h1 v1 h-1 z M40,27 h1 v1 h-1 z M7,28 h6 v1 h-6 z M15,28 h1 v15 h-1 z M23,28 h2 v13 h-2 z M32,28 h1 v15 h-1 z M35,28 h6 v1 h-6 z" fill="#f5f5f5" />
    {/* Windows & hay */}
    <path d="M23,7 h4 v1 h-4 z M21,8 h6 v2 h-6 z M21,10 h1 v1 h-1 z M24,10 h3 v1 h-3 z M9,24 h1 v1 h-1 z M11,24 h1 v2 h-1 z M37,24 h1 v1 h-1 z M39,24 h1 v2 h-1 z M8,25 h2 v1 h-2 z M36,25 h2 v1 h-2 z M8,27 h2 v1 h-2 z M11,27 h1 v1 h-1 z M36,27 h2 v1 h-2 z M39,27 h1 v1 h-1 z" fill="#87ceeb" />
    <path d="M21,7 h2 v1 h-2 z M8,24 h1 v1 h-1 z M36,24 h1 v1 h-1 z" fill="#e1f5fe" />
    <path d="M22,10 h2 v1 h-2 z M21,11 h6 v2 h-6 z" fill="#fdd835" />
    {/* Door */}
    <path d="M16,28 h7 v1 h-7 z M25,28 h7 v1 h-7 z M16,29 h1 v2 h-1 z M18,29 h4 v2 h-4 z M26,29 h4 v2 h-4 z M31,29 h1 v2 h-1 z M16,31 h2 v2 h-2 z M19,31 h2 v2 h-2 z M22,31 h1 v2 h-1 z M25,31 h1 v2 h-1 z M27,31 h2 v2 h-2 z M30,31 h2 v2 h-2 z M16,33 h3 v4 h-3 z M21,33 h2 v4 h-2 z M25,33 h2 v4 h-2 z M29,33 h3 v4 h-3 z M16,37 h2 v2 h-2 z M19,37 h2 v2 h-2 z M22,37 h1 v2 h-1 z M25,37 h1 v2 h-1 z M27,37 h2 v2 h-2 z M30,37 h2 v2 h-2 z M16,39 h1 v2 h-1 z M18,39 h4 v2 h-4 z M26,39 h4 v2 h-4 z M31,39 h1 v2 h-1 z M17,41 h6 v2 h-6 z M25,41 h6 v2 h-6 z" fill="#795548" />
    <path d="M17,29 h1 v2 h-1 z M22,29 h1 v2 h-1 z M25,29 h1 v2 h-1 z M30,29 h1 v2 h-1 z M18,31 h1 v2 h-1 z M21,31 h1 v2 h-1 z M26,31 h1 v2 h-1 z M29,31 h1 v2 h-1 z M19,33 h2 v4 h-2 z M27,33 h2 v4 h-2 z M18,37 h1 v2 h-1 z M21,37 h1 v2 h-1 z M26,37 h1 v2 h-1 z M29,37 h1 v2 h-1 z M17,39 h1 v2 h-1 z M22,39 h1 v2 h-1 z M25,39 h1 v2 h-1 z M30,39 h1 v2 h-1 z M16,41 h1 v2 h-1 z M23,41 h2 v2 h-2 z M31,41 h1 v2 h-1 z M4,43 h40 v1 h-40 z" fill="#5d4037" />
  </svg>
));

export const SiloSprite = React.memo(() => (
  <svg viewBox="0 0 20 40" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
    {/* Silo */}
    <path d="M6,0 h2 v1 h-2 z M12,0 h2 v1 h-2 z M8,1 h9 v2 h-9 z M7,3 h12 v3 h-12 z M17,6 h1 v2 h-1 z M15,8 h3 v1 h-3 z M17,9 h1 v2 h-1 z M15,11 h3 v1 h-3 z M17,12 h1 v1 h-1 z M2,13 h16 v1 h-16 z M15,14 h3 v1 h-3 z M17,15 h1 v2 h-1 z M15,17 h3 v1 h-3 z M17,18 h1 v2 h-1 z M15,20 h3 v1 h-3 z M17,21 h1 v1 h-1 z M2,22 h16 v1 h-16 z M15,23 h3 v1 h-3 z M17,24 h1 v2 h-1 z M15,26 h3 v1 h-3 z M17,27 h1 v2 h-1 z M15,29 h3 v1 h-3 z M17,30 h1 v1 h-1 z M2,31 h4 v1 h-4 z M12,31 h6 v1 h-6 z M17,32 h1 v8 h-1 z" fill="#9e9e9e" />
    <path d="M3,1 h5 v2 h-5 z M1,3 h6 v3 h-6 z M14,6 h3 v2 h-3 z M14,8 h1 v1 h-1 z M14,9 h3 v2 h-3 z M14,11 h1 v1 h-1 z M14,12 h3 v1 h-3 z M14,14 h1 v1 h-1 z M14,15 h3 v2 h-3 z M14,17 h1 v1 h-1 z M14,18 h3 v2 h-3 z M14,20 h1 v1 h-1 z M14,21 h3 v1 h-3 z M14,23 h1 v1 h-1 z M14,24 h3 v2 h-3 z M14,26 h1 v1 h-1 z M14,27 h3 v2 h-3 z M14,29 h1 v1 h-1 z M14,30 h3 v1 h-3 z M14,32 h3 v8 h-3 z" fill="#bdbdbd" />
    <path d="M8,0 h4 v1 h-4 z M6,6 h8 v7 h-8 z M6,14 h8 v8 h-8 z M6,23 h8 v8 h-8 z M12,32 h2 v8 h-2 z" fill="#e0e0e0" />
    <path d="M2,6 h4 v7 h-4 z M2,14 h4 v8 h-4 z M2,23 h4 v8 h-4 z M2,32 h4 v8 h-4 z" fill="#f5f5f5" />
    {/* Door */}
    <path d="M6,31 h1 v9 h-1 z M9,31 h3 v9 h-3 z" fill="#8d6e63" />
    <path d="M7,31 h2 v9 h-2 z" fill="#a1887f" />
  </svg>
));

// Corner cobweb, anchored top-left (mirror it for the other corners): five threads fanning out from the corner,
// joined by four rings that sag towards it. Rasterised to 1-unit pixels once, when the module loads.
const pixelLine = (x0, y0, x1, y1) => {
  const pts = [];
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    pts.push([x0, y0]);
    if (x0 === x1 && y0 === y1) return pts;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
};
const COBWEB = (() => {
  const angles = [0, 22.5, 45, 67.5, 90].map(a => a * Math.PI / 180);
  const at = (r, a) => [Math.round(r * Math.cos(a)), Math.round(r * Math.sin(a))];
  const threads = new Set(), rings = new Set();
  angles.forEach(a => pixelLine(0, 0, ...at(31, a)).forEach(p => threads.add(p.join())));
  [8, 15, 22, 29].forEach(r => angles.slice(1).forEach((a, i) => {
    const mid = at(r * 0.84, (a + angles[i]) / 2);
    [...pixelLine(...at(r, angles[i]), ...mid), ...pixelLine(...mid, ...at(r, a))].forEach(p => rings.add(p.join()));
  }));
  const toPath = (set) => [...set].map(p => p.split(',').map(Number)).filter(([x, y]) => x >= 0 && y >= 0 && x < 32 && y < 32).map(([x, y]) => `M${x},${y} h1 v1 h-1 z`).join(' ');
  return { threads: toPath(threads), rings: toPath([...rings].filter(p => !threads.has(p))) };
})();

export const CobwebSprite = React.memo(() => (
  <svg viewBox="0 0 32 32" className="w-full h-full" shapeRendering="crispEdges" opacity="0.8">
    <path d={COBWEB.rings} fill="#cfd8dc" />
    <path d={COBWEB.threads} fill="#fafafa" />
  </svg>
));

// Falling snowflake (Christmas title)
export const SnowflakeSprite = React.memo(() => (
  <svg viewBox="0 0 5 5" className="w-full h-full" shapeRendering="crispEdges">
    <path d="M2,0 h1 v5 h-1 z M0,2 h5 v1 h-5 z" fill="#ffffff" />
    <path d="M1,1 h1 v1 h-1 z M3,1 h1 v1 h-1 z M1,3 h1 v1 h-1 z M3,3 h1 v1 h-1 z" fill="#e3f2fd" />
  </svg>
));

// Smiling pixel Earth for the Earth Day title. The land scrolls past in whole-pixel steps (see .earth-spin), clipped
// to the globe, so the planet slowly turns.
const GLOBE = 'M5,1 h6 v1 h-6 z M3,2 h10 v1 h-10 z M2,3 h12 v2 h-12 z M1,5 h14 v6 h-14 z M2,11 h12 v2 h-12 z M3,13 h10 v1 h-10 z M5,14 h6 v1 h-6 z';
const LAND = 'M3,3 h3 v1 h-3 z M10,3 h2 v1 h-2 z M2,4 h5 v1 h-5 z M9,4 h4 v1 h-4 z M2,5 h4 v1 h-4 z M9,5 h5 v1 h-5 z M3,6 h2 v1 h-2 z M10,6 h3 v1 h-3 z M14,6 h1 v1 h-1 z M4,7 h1 v1 h-1 z M11,7 h1 v1 h-1 z M14,7 h2 v1 h-2 z M4,8 h2 v1 h-2 z M13,8 h3 v1 h-3 z M5,9 h2 v1 h-2 z M12,9 h3 v1 h-3 z M1,10 h2 v1 h-2 z M5,10 h2 v1 h-2 z M1,11 h3 v1 h-3 z M6,11 h1 v1 h-1 z M2,12 h2 v1 h-2 z M9,12 h2 v1 h-2 z M9,13 h3 v1 h-3 z';
export const EarthSprite = React.memo(() => {
  const clipId = React.useId();
  return (
    <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-md" shapeRendering="crispEdges">
      <clipPath id={clipId}><path d={GLOBE} /></clipPath>
      <path d={GLOBE} fill="#42a5f5" />
      <g clipPath={`url(#${clipId})`}>
        {/* Two copies of the land side by side so the scroll wraps seamlessly */}
        <g className="earth-spin">
          <path d={LAND} fill="#66bb6a" />
          <path d={LAND} fill="#66bb6a" transform="translate(16 0)" />
        </g>
      </g>
      {/* Shading, a shine and a happy face stay put while the land turns */}
      <path d="M13,4 h1 v1 h-1 z M14,5 h1 v6 h-1 z M13,11 h1 v2 h-1 z M12,13 h1 v1 h-1 z M5,14 h6 v1 h-6 z" fill="#1565c0" opacity="0.55" />
      <path d="M4,2 h2 v1 h-2 z M3,3 h1 v1 h-1 z" fill="#e3f2fd" opacity="0.8" />
      <path d="M5,7 h1 v2 h-1 z M10,7 h1 v2 h-1 z M6,10 h4 v1 h-4 z M5,9 h1 v1 h-1 z M10,9 h1 v1 h-1 z" fill="#1a237e" />
      <path d="M3,9 h2 v1 h-2 z M11,9 h2 v1 h-2 z" fill="#f48fb1" opacity="0.8" />
    </svg>
  );
});
