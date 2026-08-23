import React from 'react';
import Image from 'next/image';

// ── Local photo map (generated images in /public/images/scrap/) ─────────────
const localPhotos: Record<string, string> = {
  // Paper
  'newspaper':        '/images/scrap/newspaper.jpg',
  'books':            '/images/scrap/books.jpg',
  'cartoon-gatta':    '/images/scrap/cardboard.jpg',
  'magazine':         '/images/scrap/magazine.jpg',

  // Metals — AI generated
  'iron':             '/images/scrap/iron.jpg',
  'steel':            '/images/scrap/steel.jpg',

  // Metals — user provided real photos
  'aluminium':        '/images/scrap/aluminium.jpg',
  'copper':           '/images/scrap/copper.jpg',
  'brass':            '/images/scrap/brass.jpg',
  'tin':              '/images/scrap/tin.jpg',
  'aluminium-cable':  '/images/scrap/aluminium-cable.jpg',
  'copper-cable':     '/images/scrap/copper-cable.jpg',
};

// ── Colors ──────────────────────────────────────────────────────────────────
const C = {
  body: '#CBD5E1',    // light grey appliance body
  bodyD: '#94A3B8',   // mid grey
  dark: '#475569',    // dark elements
  accent: '#0B5D3B',  // brand green
  accentL: '#A6D95B', // lime accent
  copper: '#C2410C',  // copper/orange
  blue: '#3B82F6',    // screen / cold
  blueL: '#BFDBFE',   // light blue
  warm: '#F59E0B',    // warm / yellow
  white: '#FFFFFF',
  shadow: 'rgba(0,0,0,0.08)',
};

// ── SVG Illustrations ───────────────────────────────────────────────────────

const svgIcons: Record<string, React.ReactNode> = {

  // ═══════════════════ E-WASTE ═══════════════════════════════════════════════

  // — AC Unit (split AC indoor unit) —
  'ac': (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="104" height="48" rx="8" fill={C.white} stroke={C.bodyD} strokeWidth="2.5"/>
      <rect x="8" y="16" width="104" height="48" rx="8" fill="url(#acGrad)"/>
      {/* Top panel */}
      <rect x="12" y="18" width="96" height="14" rx="4" fill={C.body} fillOpacity="0.3"/>
      {/* Vents */}
      <rect x="16" y="50" width="88" height="2.5" rx="1" fill={C.bodyD} fillOpacity="0.4"/>
      <rect x="16" y="54" width="88" height="2.5" rx="1" fill={C.bodyD} fillOpacity="0.35"/>
      <rect x="16" y="58" width="88" height="2.5" rx="1" fill={C.bodyD} fillOpacity="0.3"/>
      {/* LED indicator */}
      <circle cx="20" cy="24" r="2.5" fill="#22C55E"/>
      <circle cx="20" cy="24" r="4" fill="#22C55E" fillOpacity="0.2"/>
      {/* Brand area */}
      <rect x="45" y="22" width="30" height="6" rx="2" fill={C.bodyD} fillOpacity="0.2"/>
      {/* Cold air waves */}
      <path d="M30 72 Q38 67 46 72 Q54 77 62 72" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
      <path d="M40 78 Q48 73 56 78 Q64 83 72 78" stroke={C.blue} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
      {/* Snowflake */}
      <g transform="translate(98, 24)" opacity="0.5">
        <line x1="0" y1="-5" x2="0" y2="5" stroke={C.blue} strokeWidth="1.5"/>
        <line x1="-4.3" y1="-2.5" x2="4.3" y2="2.5" stroke={C.blue} strokeWidth="1.5"/>
        <line x1="-4.3" y1="2.5" x2="4.3" y2="-2.5" stroke={C.blue} strokeWidth="1.5"/>
      </g>
      <defs>
        <linearGradient id="acGrad" x1="8" y1="16" x2="8" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor={C.white} stopOpacity="0.9"/>
          <stop offset="1" stopColor="#E2E8F0" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  ),

  // — Refrigerator Single Door —
  'fridge-single': (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="6" width="64" height="104" rx="6" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Top freezer section */}
      <rect x="22" y="10" width="56" height="28" rx="3" fill={C.blueL} fillOpacity="0.5" stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Main door */}
      <rect x="22" y="42" width="56" height="64" rx="3" fill={C.white} stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Handle */}
      <rect x="70" y="48" width="4" height="24" rx="2" fill={C.dark}/>
      <rect x="70" y="16" width="4" height="14" rx="2" fill={C.dark}/>
      {/* Shelves visible */}
      <line x1="26" y1="58" x2="74" y2="58" stroke={C.bodyD} strokeWidth="1" strokeOpacity="0.3"/>
      <line x1="26" y1="72" x2="74" y2="72" stroke={C.bodyD} strokeWidth="1" strokeOpacity="0.3"/>
      <line x1="26" y1="86" x2="74" y2="86" stroke={C.bodyD} strokeWidth="1" strokeOpacity="0.3"/>
      {/* Brand */}
      <rect x="38" y="50" width="20" height="4" rx="1.5" fill={C.bodyD} fillOpacity="0.2"/>
      {/* Feet */}
      <rect x="22" y="108" width="8" height="4" rx="2" fill={C.dark}/>
      <rect x="70" y="108" width="8" height="4" rx="2" fill={C.dark}/>
      {/* Snowflake in freezer */}
      <g transform="translate(50, 24)" opacity="0.4">
        <line x1="0" y1="-6" x2="0" y2="6" stroke={C.blue} strokeWidth="1.5"/>
        <line x1="-5" y1="-3" x2="5" y2="3" stroke={C.blue} strokeWidth="1.5"/>
        <line x1="-5" y1="3" x2="5" y2="-3" stroke={C.blue} strokeWidth="1.5"/>
      </g>
    </svg>
  ),

  // — Refrigerator Double Door —
  'fridge-dual': (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="6" width="72" height="104" rx="6" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Left door */}
      <rect x="18" y="10" width="33" height="96" rx="3" fill={C.white} stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Right door */}
      <rect x="55" y="10" width="27" height="96" rx="3" fill={C.white} stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Handles */}
      <rect x="46" y="38" width="3.5" height="28" rx="1.5" fill={C.dark}/>
      <rect x="56" y="38" width="3.5" height="28" rx="1.5" fill={C.dark}/>
      {/* Water/ice dispenser */}
      <rect x="60" y="24" width="16" height="20" rx="3" fill={C.blueL} fillOpacity="0.4" stroke={C.bodyD} strokeWidth="1"/>
      <rect x="64" y="34" width="8" height="6" rx="2" fill={C.dark} fillOpacity="0.3"/>
      {/* LED panel */}
      <rect x="24" y="16" width="20" height="8" rx="2" fill={C.dark} fillOpacity="0.15"/>
      <circle cx="30" cy="20" r="1.5" fill={C.blue} fillOpacity="0.7"/>
      <circle cx="36" cy="20" r="1.5" fill="#22C55E" fillOpacity="0.7"/>
      {/* Feet */}
      <rect x="18" y="108" width="8" height="4" rx="2" fill={C.dark}/>
      <rect x="74" y="108" width="8" height="4" rx="2" fill={C.dark}/>
    </svg>
  ),

  // — Washing Machine —
  'washing-machine': (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="8" width="72" height="90" rx="8" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Control panel */}
      <rect x="18" y="12" width="64" height="18" rx="4" fill={C.white} stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Dial */}
      <circle cx="38" cy="21" r="7" fill={C.white} stroke={C.dark} strokeWidth="1.5"/>
      <line x1="38" y1="16" x2="38" y2="21" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
      {/* Display */}
      <rect x="52" y="16" width="24" height="10" rx="2" fill={C.dark} fillOpacity="0.15"/>
      <text x="56" y="24" fontSize="7" fill={C.blue} fontFamily="monospace" fontWeight="bold">30°</text>
      {/* Drum window */}
      <circle cx="50" cy="62" r="24" fill={C.white} stroke={C.bodyD} strokeWidth="2"/>
      <circle cx="50" cy="62" r="20" fill={C.blueL} fillOpacity="0.25" stroke={C.bodyD} strokeWidth="1.5"/>
      <circle cx="50" cy="62" r="8" fill={C.bodyD} fillOpacity="0.2"/>
      {/* Door handle */}
      <rect x="72" y="58" width="6" height="3" rx="1.5" fill={C.dark}/>
      {/* Water motion */}
      <path d="M34 68 Q42 62 50 68 Q58 74 66 68" stroke={C.blue} strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round"/>
      {/* Feet */}
      <rect x="18" y="96" width="8" height="4" rx="2" fill={C.dark}/>
      <rect x="74" y="96" width="8" height="4" rx="2" fill={C.dark}/>
    </svg>
  ),

  // — Microwave —
  'microwave': (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="108" height="64" rx="6" fill={C.dark} fillOpacity="0.85" stroke={C.dark} strokeWidth="2"/>
      {/* Window */}
      <rect x="12" y="18" width="70" height="52" rx="4" fill="#1E293B"/>
      <rect x="14" y="20" width="66" height="48" rx="3" fill={C.blueL} fillOpacity="0.12"/>
      {/* Interior glow */}
      <rect x="18" y="24" width="58" height="40" rx="2" fill={C.warm} fillOpacity="0.08"/>
      {/* Plate inside */}
      <ellipse cx="47" cy="54" rx="18" ry="6" fill={C.bodyD} fillOpacity="0.3"/>
      {/* Grid overlay */}
      <line x1="14" y1="32" x2="80" y2="32" stroke={C.bodyD} strokeWidth="0.5" strokeOpacity="0.3"/>
      <line x1="14" y1="44" x2="80" y2="44" stroke={C.bodyD} strokeWidth="0.5" strokeOpacity="0.3"/>
      <line x1="14" y1="56" x2="80" y2="56" stroke={C.bodyD} strokeWidth="0.5" strokeOpacity="0.3"/>
      {/* Control panel */}
      <rect x="86" y="18" width="24" height="52" rx="3" fill={C.dark} fillOpacity="0.5"/>
      {/* Display */}
      <rect x="89" y="22" width="18" height="10" rx="2" fill="#22C55E" fillOpacity="0.25"/>
      <text x="92" y="30" fontSize="7" fill="#22C55E" fontFamily="monospace">0:30</text>
      {/* Buttons */}
      <circle cx="98" cy="40" r="3" fill={C.bodyD} fillOpacity="0.5"/>
      <circle cx="98" cy="48" r="3" fill={C.bodyD} fillOpacity="0.5"/>
      <circle cx="98" cy="56" r="3" fill={C.bodyD} fillOpacity="0.5"/>
      {/* Handle */}
      <rect x="82" y="30" width="3" height="20" rx="1.5" fill={C.bodyD}/>
      {/* Feet */}
      <rect x="12" y="74" width="8" height="3" rx="1.5" fill={C.dark}/>
      <rect x="100" y="74" width="8" height="3" rx="1.5" fill={C.dark}/>
    </svg>
  ),

  // — Ceiling Fan —
  'fan': (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Motor housing */}
      <circle cx="50" cy="50" r="12" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      <circle cx="50" cy="50" r="6" fill={C.dark} fillOpacity="0.3"/>
      <circle cx="50" cy="50" r="3" fill={C.bodyD}/>
      {/* Blade 1 — top */}
      <path d="M50 38 Q44 20 32 12 Q38 24 40 38 Z" fill={C.bodyD} stroke={C.dark} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Blade 2 — right */}
      <path d="M62 50 Q80 44 88 32 Q76 38 62 40 Z" fill={C.bodyD} stroke={C.dark} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Blade 3 — bottom */}
      <path d="M50 62 Q56 80 68 88 Q62 76 60 62 Z" fill={C.bodyD} stroke={C.dark} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Blade 4 — left */}
      <path d="M38 50 Q20 56 12 68 Q24 62 38 60 Z" fill={C.bodyD} stroke={C.dark} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Rotation arrow hint */}
      <path d="M65 20 Q72 26 68 35" stroke={C.blue} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
      <path d="M68 35 L72 32 L66 31" stroke={C.blue} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),

  // — Motor / Gear —
  'motor': (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Motor body */}
      <rect x="14" y="30" width="52" height="40" rx="5" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Cooling fins */}
      <line x1="20" y1="30" x2="20" y2="70" stroke={C.bodyD} strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="28" y1="30" x2="28" y2="70" stroke={C.bodyD} strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="36" y1="30" x2="36" y2="70" stroke={C.bodyD} strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="44" y1="30" x2="44" y2="70" stroke={C.bodyD} strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="52" y1="30" x2="52" y2="70" stroke={C.bodyD} strokeWidth="1.5" strokeOpacity="0.5"/>
      {/* Shaft */}
      <rect x="66" y="45" width="22" height="10" rx="3" fill={C.dark} fillOpacity="0.5" stroke={C.bodyD} strokeWidth="2"/>
      {/* Shaft cap */}
      <circle cx="88" cy="50" r="4" fill={C.dark} fillOpacity="0.3" stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Junction box */}
      <rect x="24" y="20" width="20" height="12" rx="3" fill={C.dark} fillOpacity="0.2" stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Wire */}
      <path d="M34 8 L34 20" stroke={C.copper} strokeWidth="2" strokeLinecap="round"/>
      {/* Label */}
      <rect x="22" y="48" width="16" height="6" rx="1.5" fill={C.dark} fillOpacity="0.15"/>
      {/* Feet */}
      <rect x="18" y="70" width="12" height="4" rx="2" fill={C.dark} fillOpacity="0.5"/>
      <rect x="50" y="70" width="12" height="4" rx="2" fill={C.dark} fillOpacity="0.5"/>
    </svg>
  ),

  // — Battery (generic) —
  'battery': (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Battery body */}
      <rect x="8" y="18" width="88" height="44" rx="6" fill="#1E293B" stroke={C.dark} strokeWidth="2.5"/>
      {/* Terminal positive */}
      <rect x="96" y="30" width="16" height="20" rx="4" fill="#DC2626" fillOpacity="0.5" stroke="#DC2626" strokeWidth="2"/>
      <text x="100" y="44" fontSize="12" fill="white" fontWeight="bold" fontFamily="sans-serif">+</text>
      {/* Terminal negative */}
      <rect x="6" y="32" width="6" height="16" rx="2" fill={C.dark} stroke={C.bodyD} strokeWidth="1.5"/>
      <text x="4" y="44" fontSize="12" fill={C.body} fontWeight="bold" fontFamily="sans-serif">−</text>
      {/* Cell indicators */}
      <rect x="16" y="24" width="14" height="32" rx="2" fill={C.accentL} fillOpacity="0.5"/>
      <rect x="34" y="24" width="14" height="32" rx="2" fill={C.accentL} fillOpacity="0.5"/>
      <rect x="52" y="24" width="14" height="32" rx="2" fill={C.accentL} fillOpacity="0.45"/>
      <rect x="70" y="24" width="14" height="32" rx="2" fill={C.accentL} fillOpacity="0.3"/>
      {/* Lightning bolt */}
      <path d="M54 32 L48 42 L56 42 L50 54" stroke={C.warm} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Label */}
      <text x="20" y="68" fontSize="6" fill={C.bodyD} fontFamily="monospace">12V</text>
    </svg>
  ),

  // — Laptop —
  'laptop': (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Screen */}
      <rect x="16" y="6" width="88" height="56" rx="5" fill={C.dark} stroke={C.bodyD} strokeWidth="2"/>
      <rect x="20" y="10" width="80" height="48" rx="3" fill="#1E293B"/>
      {/* Screen content */}
      <rect x="24" y="16" width="30" height="3" rx="1" fill={C.accentL} fillOpacity="0.6"/>
      <rect x="24" y="22" width="50" height="2.5" rx="1" fill={C.body} fillOpacity="0.3"/>
      <rect x="24" y="27" width="40" height="2.5" rx="1" fill={C.body} fillOpacity="0.25"/>
      <rect x="24" y="32" width="45" height="2.5" rx="1" fill={C.body} fillOpacity="0.2"/>
      {/* Code bracket */}
      <text x="76" y="42" fontSize="16" fill={C.blue} fillOpacity="0.3" fontFamily="monospace">{'>'}_</text>
      {/* Webcam */}
      <circle cx="60" cy="8" r="1.5" fill={C.bodyD} fillOpacity="0.5"/>
      {/* Base */}
      <path d="M6 64 L16 62 L104 62 L114 64 L110 72 L10 72 Z" fill={C.body} stroke={C.bodyD} strokeWidth="2" strokeLinejoin="round"/>
      {/* Trackpad */}
      <rect x="44" y="65" width="32" height="4" rx="2" fill={C.bodyD} fillOpacity="0.3"/>
      {/* Keyboard line hint */}
      <line x1="20" y1="64" x2="100" y2="64" stroke={C.bodyD} strokeWidth="0.7" strokeOpacity="0.4"/>
    </svg>
  ),

  // — LCD / Monitor —
  'lcd': (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Screen bezel */}
      <rect x="10" y="8" width="100" height="64" rx="5" fill={C.dark} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Screen panel */}
      <rect x="14" y="12" width="92" height="56" rx="3" fill="#1E293B"/>
      {/* Screen content — gradient */}
      <rect x="18" y="16" width="84" height="48" rx="2" fill={C.blue} fillOpacity="0.08"/>
      {/* Desktop icons */}
      <rect x="26" y="24" width="10" height="10" rx="2" fill={C.blue} fillOpacity="0.3"/>
      <rect x="42" y="24" width="10" height="10" rx="2" fill={C.accentL} fillOpacity="0.3"/>
      <rect x="58" y="24" width="10" height="10" rx="2" fill={C.warm} fillOpacity="0.3"/>
      {/* Taskbar */}
      <rect x="18" y="56" width="84" height="6" rx="1" fill={C.dark} fillOpacity="0.5"/>
      {/* LED */}
      <circle cx="60" cy="69" r="1.5" fill={C.blue} fillOpacity="0.6"/>
      {/* Stand neck */}
      <rect x="52" y="72" width="16" height="10" rx="2" fill={C.bodyD}/>
      {/* Stand base */}
      <ellipse cx="60" cy="88" rx="28" ry="6" fill={C.body} stroke={C.bodyD} strokeWidth="2"/>
    </svg>
  ),

  // — CRT TV/Monitor —
  'crt': (
    <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bulky body */}
      <rect x="10" y="10" width="90" height="72" rx="8" fill={C.dark} fillOpacity="0.8" stroke={C.dark} strokeWidth="2"/>
      {/* Screen (curved) */}
      <rect x="16" y="16" width="60" height="58" rx="6" fill="#1E293B"/>
      <rect x="18" y="18" width="56" height="54" rx="5" fill={C.blueL} fillOpacity="0.1"/>
      {/* Screen lines (CRT scanlines) */}
      <line x1="20" y1="28" x2="72" y2="28" stroke={C.body} strokeWidth="0.5" strokeOpacity="0.15"/>
      <line x1="20" y1="38" x2="72" y2="38" stroke={C.body} strokeWidth="0.5" strokeOpacity="0.15"/>
      <line x1="20" y1="48" x2="72" y2="48" stroke={C.body} strokeWidth="0.5" strokeOpacity="0.15"/>
      <line x1="20" y1="58" x2="72" y2="58" stroke={C.body} strokeWidth="0.5" strokeOpacity="0.15"/>
      {/* Side panel */}
      <rect x="80" y="20" width="14" height="50" rx="3" fill={C.dark} fillOpacity="0.4"/>
      {/* Controls/buttons */}
      <circle cx="87" cy="32" r="4" fill={C.bodyD} fillOpacity="0.5" stroke={C.bodyD} strokeWidth="1"/>
      <circle cx="87" cy="44" r="3" fill={C.bodyD} fillOpacity="0.4"/>
      <circle cx="87" cy="54" r="3" fill={C.bodyD} fillOpacity="0.4"/>
      {/* Speaker grille */}
      <rect x="80" y="60" width="14" height="8" rx="2" fill={C.bodyD} fillOpacity="0.2"/>
      {/* Feet */}
      <rect x="16" y="80" width="12" height="4" rx="2" fill={C.dark}/>
      <rect x="82" y="80" width="12" height="4" rx="2" fill={C.dark}/>
    </svg>
  ),

  // — Printer/Scanner —
  'printer': (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body */}
      <rect x="10" y="28" width="100" height="40" rx="5" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Paper input tray (top) */}
      <path d="M24 28 L24 14 L96 14 L96 28" fill={C.white} stroke={C.bodyD} strokeWidth="2"/>
      {/* Paper */}
      <rect x="30" y="8" width="60" height="12" rx="1" fill={C.white} stroke={C.bodyD} strokeWidth="1"/>
      <rect x="36" y="10" width="30" height="2" rx="1" fill={C.bodyD} fillOpacity="0.2"/>
      <rect x="36" y="14" width="40" height="2" rx="1" fill={C.bodyD} fillOpacity="0.15"/>
      {/* Paper output (bottom slot) */}
      <rect x="24" y="58" width="72" height="4" rx="1" fill={C.dark} fillOpacity="0.2"/>
      {/* Output paper */}
      <rect x="30" y="60" width="60" height="22" rx="1" fill={C.white} stroke={C.bodyD} strokeWidth="1"/>
      <rect x="36" y="64" width="32" height="2" rx="1" fill={C.bodyD} fillOpacity="0.25"/>
      <rect x="36" y="68" width="40" height="2" rx="1" fill={C.bodyD} fillOpacity="0.2"/>
      <rect x="36" y="72" width="26" height="2" rx="1" fill={C.bodyD} fillOpacity="0.15"/>
      {/* Control panel */}
      <rect x="70" y="34" width="34" height="14" rx="3" fill={C.dark} fillOpacity="0.2"/>
      {/* Buttons */}
      <circle cx="80" cy="41" r="3" fill={C.accentL} fillOpacity="0.6"/>
      <circle cx="90" cy="41" r="3" fill={C.bodyD} fillOpacity="0.5"/>
      {/* LED */}
      <circle cx="16" cy="36" r="2" fill="#22C55E" fillOpacity="0.7"/>
    </svg>
  ),

  // — UPS —
  'ups': (
    <svg viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* UPS body */}
      <rect x="14" y="10" width="62" height="88" rx="6" fill="#1E293B" stroke={C.dark} strokeWidth="2.5"/>
      {/* Front face */}
      <rect x="18" y="14" width="54" height="80" rx="4" fill="#334155"/>
      {/* LED display */}
      <rect x="24" y="20" width="42" height="18" rx="3" fill={C.dark}/>
      <text x="30" y="33" fontSize="10" fill="#22C55E" fontFamily="monospace" fontWeight="bold">ONLINE</text>
      {/* LED indicators */}
      <circle cx="30" cy="46" r="2.5" fill="#22C55E"/>
      <circle cx="38" cy="46" r="2.5" fill="#22C55E" fillOpacity="0.5"/>
      <circle cx="46" cy="46" r="2.5" fill={C.warm} fillOpacity="0.5"/>
      <circle cx="54" cy="46" r="2.5" fill="#DC2626" fillOpacity="0.3"/>
      {/* Power button */}
      <circle cx="45" cy="60" r="8" fill={C.dark} stroke={C.bodyD} strokeWidth="2"/>
      <path d="M45 54 L45 58 M41 56 Q45 52 49 56" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Outlet ports */}
      <rect x="26" y="74" width="12" height="8" rx="2" fill={C.dark} fillOpacity="0.7" stroke={C.bodyD} strokeWidth="1"/>
      <rect x="42" y="74" width="12" height="8" rx="2" fill={C.dark} fillOpacity="0.7" stroke={C.bodyD} strokeWidth="1"/>
      <rect x="58" y="74" width="12" height="8" rx="2" fill={C.dark} fillOpacity="0.7" stroke={C.bodyD} strokeWidth="1"/>
      {/* Vent */}
      <line x1="24" y1="86" x2="66" y2="86" stroke={C.bodyD} strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="24" y1="88" x2="66" y2="88" stroke={C.bodyD} strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="24" y1="90" x2="66" y2="90" stroke={C.bodyD} strokeWidth="0.7" strokeOpacity="0.4"/>
    </svg>
  ),

  // — CPU Desktop Tower —
  'cpu': (
    <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tower body */}
      <rect x="10" y="6" width="60" height="96" rx="5" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Front panel */}
      <rect x="14" y="10" width="52" height="88" rx="3" fill={C.white} fillOpacity="0.5"/>
      {/* DVD/CD drive bay */}
      <rect x="18" y="14" width="44" height="10" rx="2" fill={C.bodyD} fillOpacity="0.2" stroke={C.bodyD} strokeWidth="1"/>
      <circle cx="58" cy="19" r="1.5" fill={C.dark} fillOpacity="0.3"/>
      {/* Front USB/Audio panel */}
      <rect x="18" y="28" width="20" height="10" rx="2" fill={C.dark} fillOpacity="0.15"/>
      <rect x="20" y="31" width="6" height="4" rx="1" fill={C.dark} fillOpacity="0.3"/>
      <rect x="28" y="31" width="6" height="4" rx="1" fill={C.dark} fillOpacity="0.3"/>
      {/* Brand logo area */}
      <rect x="28" y="52" width="24" height="8" rx="2" fill={C.accent} fillOpacity="0.15"/>
      {/* Power button */}
      <circle cx="40" cy="80" r="7" fill={C.dark} fillOpacity="0.15" stroke={C.bodyD} strokeWidth="1.5"/>
      <circle cx="40" cy="80" r="3" fill={C.blue} fillOpacity="0.4"/>
      {/* LED */}
      <circle cx="24" cy="80" r="2" fill="#22C55E"/>
      {/* Vents */}
      <rect x="18" y="90" width="44" height="4" rx="1" fill={C.bodyD} fillOpacity="0.15"/>
    </svg>
  ),

  // — Geyser / Water Heater —
  'geyser': (
    <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body cylinder */}
      <rect x="14" y="16" width="52" height="72" rx="12" fill={C.white} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Top mounting bracket */}
      <rect x="30" y="6" width="20" height="12" rx="3" fill={C.bodyD} stroke={C.dark} strokeWidth="1.5"/>
      {/* Temperature dial */}
      <circle cx="40" cy="46" r="12" fill={C.body} fillOpacity="0.4" stroke={C.bodyD} strokeWidth="2"/>
      <circle cx="40" cy="46" r="6" fill="#DC2626" fillOpacity="0.2" stroke="#DC2626" strokeWidth="1.5"/>
      <line x1="40" y1="40" x2="40" y2="46" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
      {/* Brand label */}
      <rect x="26" y="28" width="28" height="6" rx="2" fill={C.bodyD} fillOpacity="0.2"/>
      {/* LED indicator */}
      <circle cx="40" cy="65" r="2.5" fill="#DC2626" fillOpacity="0.6"/>
      <circle cx="40" cy="65" r="5" fill="#DC2626" fillOpacity="0.15"/>
      {/* Bottom pipes */}
      <rect x="26" y="86" width="6" height="16" rx="2" fill={C.blue} fillOpacity="0.4" stroke={C.bodyD} strokeWidth="1.5"/>
      <rect x="48" y="86" width="6" height="16" rx="2" fill="#DC2626" fillOpacity="0.3" stroke={C.bodyD} strokeWidth="1.5"/>
      {/* Cold/Hot labels */}
      <text x="23" y="108" fontSize="5" fill={C.blue} fontFamily="sans-serif">C</text>
      <text x="49" y="108" fontSize="5" fill="#DC2626" fontFamily="sans-serif">H</text>
    </svg>
  ),

  // — RO Water Purifier —
  'ro': (
    <svg viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body */}
      <rect x="12" y="8" width="66" height="88" rx="8" fill={C.white} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Top brand panel */}
      <rect x="16" y="12" width="58" height="18" rx="4" fill={C.accent} fillOpacity="0.1"/>
      <text x="24" y="24" fontSize="9" fill={C.accent} fontWeight="bold" fontFamily="sans-serif">PURE</text>
      {/* Display panel */}
      <rect x="20" y="34" width="50" height="14" rx="3" fill={C.blue} fillOpacity="0.1" stroke={C.blue} strokeWidth="1" strokeOpacity="0.3"/>
      <text x="26" y="44" fontSize="7" fill={C.blue} fontFamily="monospace">TDS: 30</text>
      {/* Water drop icon */}
      <path d="M45 58 Q45 52 50 46 Q55 52 55 58 Q55 64 50 66 Q45 64 45 58 Z" fill={C.blue} fillOpacity="0.3" stroke={C.blue} strokeWidth="1.5"/>
      {/* Tap/spout */}
      <rect x="38" y="78" width="14" height="6" rx="2" fill={C.bodyD}/>
      <rect x="42" y="84" width="6" height="12" rx="2" fill={C.bodyD}/>
      {/* Water drops */}
      <circle cx="45" cy="100" r="2" fill={C.blue} fillOpacity="0.4"/>
      <circle cx="45" cy="106" r="1.5" fill={C.blue} fillOpacity="0.25"/>
      {/* Filter indicators */}
      <circle cx="26" cy="72" r="4" fill={C.accentL} fillOpacity="0.5" stroke={C.accent} strokeWidth="1"/>
      <circle cx="38" cy="72" r="4" fill={C.accentL} fillOpacity="0.4" stroke={C.accent} strokeWidth="1"/>
      <circle cx="50" cy="72" r="4" fill={C.warm} fillOpacity="0.3" stroke={C.warm} strokeWidth="1"/>
    </svg>
  ),

  // — Inverter / Cable —
  'cable': (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cable coil */}
      <ellipse cx="50" cy="50" rx="34" ry="30" fill={C.copper} fillOpacity="0.1"/>
      <ellipse cx="50" cy="50" rx="34" ry="30" fill="none" stroke={C.copper} strokeWidth="4" strokeOpacity="0.5"/>
      <ellipse cx="50" cy="50" rx="26" ry="22" fill="none" stroke={C.copper} strokeWidth="4" strokeOpacity="0.4"/>
      <ellipse cx="50" cy="50" rx="18" ry="14" fill="none" stroke={C.copper} strokeWidth="4" strokeOpacity="0.35"/>
      <ellipse cx="50" cy="50" rx="10" ry="6" fill={C.copper} fillOpacity="0.2" stroke={C.copper} strokeWidth="3" strokeOpacity="0.3"/>
      {/* Wire ends */}
      <path d="M84 50 Q90 50 94 44" stroke={C.copper} strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M16 50 Q10 50 6 56" stroke={C.copper} strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Copper gleam */}
      <path d="M32 30 Q50 22 68 30" stroke={C.warm} strokeWidth="2" strokeOpacity="0.3" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // — Air Cooler —
  'cooler': (
    <svg viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="12" y="12" width="66" height="78" rx="8" fill={C.body} stroke={C.bodyD} strokeWidth="2.5"/>
      {/* Top vent/grill */}
      <rect x="16" y="16" width="58" height="24" rx="4" fill={C.dark} fillOpacity="0.15"/>
      {/* Louvers */}
      <rect x="20" y="18" width="50" height="3" rx="1" fill={C.bodyD} fillOpacity="0.3"/>
      <rect x="20" y="23" width="50" height="3" rx="1" fill={C.bodyD} fillOpacity="0.3"/>
      <rect x="20" y="28" width="50" height="3" rx="1" fill={C.bodyD} fillOpacity="0.3"/>
      <rect x="20" y="33" width="50" height="3" rx="1" fill={C.bodyD} fillOpacity="0.3"/>
      {/* Control panel */}
      <rect x="20" y="46" width="50" height="10" rx="3" fill={C.white} fillOpacity="0.6"/>
      <circle cx="30" cy="51" r="3" fill={C.blue} fillOpacity="0.4"/>
      <circle cx="40" cy="51" r="3" fill={C.accentL} fillOpacity="0.4"/>
      <circle cx="50" cy="51" r="3" fill={C.bodyD} fillOpacity="0.3"/>
      {/* Water tank area */}
      <rect x="18" y="62" width="54" height="24" rx="4" fill={C.blue} fillOpacity="0.1" stroke={C.bodyD} strokeWidth="1"/>
      <text x="28" y="77" fontSize="7" fill={C.bodyD} fontFamily="sans-serif">WATER</text>
      {/* Wheels */}
      <circle cx="24" cy="94" r="5" fill={C.body} stroke={C.bodyD} strokeWidth="2"/>
      <circle cx="24" cy="94" r="2" fill={C.bodyD}/>
      <circle cx="66" cy="94" r="5" fill={C.body} stroke={C.bodyD} strokeWidth="2"/>
      <circle cx="66" cy="94" r="2" fill={C.bodyD}/>
      {/* Cold air */}
      <path d="M30 6 Q38 2 46 6" stroke={C.blue} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round"/>
      <path d="M40 3 Q48 -1 56 3" stroke={C.blue} strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round"/>
    </svg>
  ),

  // ═══════════════════ METALS (non-photo) ═══════════════════════════════════

  'aluminium': (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crushed cans pile */}
      <ellipse cx="50" cy="68" rx="38" ry="10" fill={C.body} fillOpacity="0.3"/>
      {/* Can 1 */}
      <ellipse cx="36" cy="50" rx="12" ry="16" fill={C.body} stroke={C.bodyD} strokeWidth="2"/>
      <ellipse cx="36" cy="36" rx="12" ry="5" fill={C.body} stroke={C.bodyD} strokeWidth="1.5"/>
      <line x1="28" y1="42" x2="28" y2="56" stroke="white" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round"/>
      {/* Can 2 */}
      <ellipse cx="60" cy="46" rx="10" ry="14" fill={C.body} fillOpacity="0.8" stroke={C.bodyD} strokeWidth="2"/>
      <ellipse cx="60" cy="34" rx="10" ry="4" fill={C.body} stroke={C.bodyD} strokeWidth="1.5"/>
      <line x1="54" y1="38" x2="54" y2="50" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round"/>
      {/* Tab */}
      <ellipse cx="36" cy="35" rx="4" ry="2" fill={C.bodyD} stroke={C.dark} strokeWidth="1"/>
      {/* Sheet */}
      <rect x="14" y="58" width="36" height="8" rx="2" fill={C.body} fillOpacity="0.6" stroke={C.bodyD} strokeWidth="1.5"/>
      <line x1="16" y1="60" x2="48" y2="60" stroke="white" strokeWidth="1.5" strokeOpacity="0.3"/>
    </svg>
  ),

  'copper': (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Copper pipe */}
      <rect x="10" y="32" width="80" height="16" rx="8" fill={C.copper} fillOpacity="0.35" stroke={C.copper} strokeWidth="2.5"/>
      <rect x="10" y="32" width="80" height="8" rx="4" fill="white" fillOpacity="0.2"/>
      {/* Second pipe */}
      <rect x="18" y="52" width="64" height="12" rx="6" fill={C.copper} fillOpacity="0.3" stroke={C.copper} strokeWidth="2"/>
      <rect x="18" y="52" width="64" height="6" rx="3" fill="white" fillOpacity="0.15"/>
      {/* Wire coil on top */}
      <circle cx="50" cy="20" r="14" fill="none" stroke={C.copper} strokeWidth="3" strokeOpacity="0.4"/>
      <circle cx="50" cy="20" r="8" fill="none" stroke={C.copper} strokeWidth="2.5" strokeOpacity="0.35"/>
      <circle cx="50" cy="20" r="3" fill={C.copper} fillOpacity="0.3"/>
      {/* Gleam */}
      <path d="M20 34 L80 34" stroke={C.warm} strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
      {/* Cu label */}
      <text x="72" y="76" fontSize="12" fontWeight="700" fill={C.copper} fillOpacity="0.5" fontFamily="monospace">Cu</text>
    </svg>
  ),

  'brass': (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Brass fittings */}
      <rect x="20" y="20" width="24" height="36" rx="4" fill="#D97706" fillOpacity="0.3" stroke="#D97706" strokeWidth="2"/>
      <rect x="20" y="20" width="24" height="12" rx="4" fill="white" fillOpacity="0.15"/>
      {/* Hex nut */}
      <polygon points="70,22 82,28 82,42 70,48 58,42 58,28" fill="#D97706" fillOpacity="0.25" stroke="#D97706" strokeWidth="2"/>
      <circle cx="70" cy="35" r="6" fill="#D97706" fillOpacity="0.15" stroke="#D97706" strokeWidth="1.5"/>
      {/* Valve */}
      <rect x="36" y="56" width="28" height="14" rx="4" fill="#D97706" fillOpacity="0.25" stroke="#D97706" strokeWidth="2"/>
      <circle cx="50" cy="63" r="4" fill="#D97706" fillOpacity="0.2" stroke="#D97706" strokeWidth="1.5"/>
      <line x1="50" y1="56" x2="50" y2="50" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="48" r="3" fill="#D97706" fillOpacity="0.4"/>
      {/* Gleams */}
      <line x1="24" y1="24" x2="24" y2="40" stroke="white" strokeWidth="2" strokeOpacity="0.35" strokeLinecap="round"/>
    </svg>
  ),

  // ═══════════════════ PLASTIC (non-photo) ═══════════════════════════════════

  'soft-plastic': (
    <svg viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottle body */}
      <path d="M32 24 L28 34 L24 42 L24 88 Q24 94 30 94 L60 94 Q66 94 66 88 L66 42 L62 34 L58 24 Z" fill={C.blue} fillOpacity="0.12" stroke={C.accent} strokeWidth="2" strokeLinejoin="round"/>
      {/* Cap */}
      <rect x="36" y="10" width="18" height="16" rx="4" fill={C.accent} fillOpacity="0.5" stroke={C.accent} strokeWidth="2"/>
      {/* Label */}
      <rect x="28" y="52" width="34" height="22" rx="3" fill={C.accent} fillOpacity="0.12" stroke={C.accent} strokeWidth="1.5" strokeOpacity="0.5"/>
      {/* Recycle symbol on label */}
      <text x="38" y="68" fontSize="14" fill={C.accent} fillOpacity="0.5" fontFamily="sans-serif">♻</text>
      {/* Sheen */}
      <path d="M28 40 Q26 54 26 70" stroke="white" strokeWidth="3.5" strokeOpacity="0.4" fill="none" strokeLinecap="round"/>
      {/* Water level */}
      <path d="M24 72 L66 72 L66 88 Q66 94 60 94 L30 94 Q24 94 24 88 Z" fill={C.blue} fillOpacity="0.15"/>
    </svg>
  ),

  'hard-plastic': (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bucket/tub */}
      <path d="M18 30 L14 82 Q14 88 20 88 L80 88 Q86 88 86 82 L82 30 Z" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="2.5"/>
      {/* Rim */}
      <ellipse cx="50" cy="30" rx="32" ry="8" fill={C.accent} fillOpacity="0.15" stroke={C.accent} strokeWidth="2.5"/>
      {/* Handle */}
      <path d="M22 24 Q22 10 50 10 Q78 10 78 24" stroke={C.accent} strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Rib lines */}
      <line x1="22" y1="50" x2="78" y2="50" stroke={C.accent} strokeWidth="1" strokeOpacity="0.25"/>
      <line x1="20" y1="65" x2="80" y2="65" stroke={C.accent} strokeWidth="1" strokeOpacity="0.25"/>
      {/* Sheen */}
      <path d="M24 34 Q20 50 18 70" stroke="white" strokeWidth="3" strokeOpacity="0.3" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  'mix-plastic': (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Recycle bin */}
      <path d="M20 26 L16 82 Q16 88 22 88 L78 88 Q84 88 84 82 L80 26 Z" fill={C.accentL} fillOpacity="0.15" stroke={C.accent} strokeWidth="2.5"/>
      <rect x="14" y="20" width="72" height="8" rx="3" fill={C.accent} fillOpacity="0.2" stroke={C.accent} strokeWidth="2"/>
      {/* Large recycle symbol */}
      <text x="36" y="68" fontSize="28" fill={C.accent} fillOpacity="0.35" fontFamily="sans-serif">♻</text>
      {/* Items poking out */}
      <rect x="28" y="12" width="8" height="14" rx="2" fill={C.blue} fillOpacity="0.3" stroke={C.accent} strokeWidth="1"/>
      <rect x="52" y="8" width="10" height="16" rx="2" fill={C.warm} fillOpacity="0.3" stroke={C.accent} strokeWidth="1"/>
    </svg>
  ),
};

// ── Alias mapping (multiple IDs → same icon) ──────────────────────────────
const aliases: Record<string, string> = {
  'ac-copper-1':     'ac',
  'ac-copper-1.5':   'ac',
  'ac-copper-2':     'ac',
  'ac-aluminium-1':  'ac',
  'ac-aluminium-1.5':'ac',
  'ac-aluminium-2':  'ac',
  'washing-machine-al': 'washing-machine',
  'washing-machine-cu': 'washing-machine',
  'black-battery':   'battery',
  'white-battery':   'battery',
  'geyser-steel':    'geyser',
  'geyser-copper':   'geyser',
  'lcd-kg':          'lcd',
  'crt-monitor':     'crt',
  'crt-tv':          'crt',
  'inverter-wiring': 'cable',
  'aluminium-cable': 'cable',
  'copper-cable':    'cable',
  'plastic-cooler':  'cooler',
  'iron-cooler':     'cooler',
  'metal-ewaste':    'motor',
  'plastic-ewaste':  'mix-plastic',
  'tin':             'aluminium',
};

// ── Category fallback ──────────────────────────────────────────────────────
const categoryFallback: Record<string, string> = {
  'Paper Scrap':    'newspaper',
  'Metal Scraps':   'aluminium',
  'Plastic Scrap':  'soft-plastic',
  'E-waste Scraps': 'laptop',
};

// ── Component ─────────────────────────────────────────────────────────────
interface ScrapIconProps {
  id: string;
  category: string;
  className?: string;
}

export const ScrapIcon: React.FC<ScrapIconProps> = ({ id, category, className }) => {
  // 1. Check for local photo first
  const photoSrc = localPhotos[id];
  if (photoSrc) {
    return (
      <Image
        src={photoSrc}
        alt={id}
        width={100}
        height={100}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          padding: '0.25rem',
          borderRadius: '12px'
        }}
      />
    );
  }

  // 2. Check for inline SVG (direct or via alias)
  const resolvedId = aliases[id] ?? id;
  const svg = svgIcons[resolvedId] ?? svgIcons[categoryFallback[category] ?? 'laptop'];

  if (svg) {
    return (
      <span
        className={className}
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {svg}
      </span>
    );
  }

  // 3. Ultimate fallback
  return (
    <span
      className={className}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
      }}
    >
      ♻️
    </span>
  );
};
