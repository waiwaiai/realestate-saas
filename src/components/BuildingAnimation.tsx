"use client";

export default function BuildingAnimation() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <svg
        width="160"
        height="100"
        viewBox="0 0 160 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Ground */}
        <rect x="0" y="88" width="160" height="2" rx="1" fill="#e2e8f0" />

        {/* House body - builds up */}
        <rect x="40" y="50" width="60" height="38" rx="2" fill="#93c5fd" className="animate-house-body" />

        {/* Roof */}
        <polygon points="35,52 100,52 70,28" fill="#3b82f6" className="animate-roof" />

        {/* Door */}
        <rect x="62" y="66" width="14" height="22" rx="2" fill="#1e40af" className="animate-door" />
        <circle cx="73" cy="78" r="1.5" fill="#fbbf24" className="animate-door" />

        {/* Window left */}
        <rect x="46" y="60" width="10" height="10" rx="1" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" className="animate-window-l" />
        <line x1="51" y1="60" x2="51" y2="70" stroke="#60a5fa" strokeWidth="0.5" className="animate-window-l" />
        <line x1="46" y1="65" x2="56" y2="65" stroke="#60a5fa" strokeWidth="0.5" className="animate-window-l" />

        {/* Window right */}
        <rect x="82" y="60" width="10" height="10" rx="1" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" className="animate-window-r" />
        <line x1="87" y1="60" x2="87" y2="70" stroke="#60a5fa" strokeWidth="0.5" className="animate-window-r" />
        <line x1="82" y1="65" x2="92" y2="65" stroke="#60a5fa" strokeWidth="0.5" className="animate-window-r" />

        {/* Chimney */}
        <rect x="82" y="32" width="8" height="18" rx="1" fill="#64748b" className="animate-chimney" />

        {/* Smoke puffs */}
        <circle cx="86" cy="24" r="3" fill="#cbd5e1" className="animate-smoke-1" />
        <circle cx="90" cy="16" r="2.5" fill="#e2e8f0" className="animate-smoke-2" />
        <circle cx="84" cy="9" r="2" fill="#f1f5f9" className="animate-smoke-3" />

        {/* Dwarf 1 - Hammering */}
        <g className="animate-dwarf-1">
          {/* Body */}
          <circle cx="24" cy="72" r="5" fill="#fbbf24" />
          {/* Hat */}
          <polygon points="19,68 29,68 24,60" fill="#dc2626" />
          {/* Body */}
          <rect x="21" y="77" width="6" height="8" rx="2" fill="#16a34a" />
          {/* Legs */}
          <rect x="22" y="85" width="2" height="3" rx="1" fill="#854d0e" />
          <rect x="25" y="85" width="2" height="3" rx="1" fill="#854d0e" />
          {/* Hammer */}
          <line x1="29" y1="74" x2="36" y2="68" stroke="#854d0e" strokeWidth="1.5" strokeLinecap="round" className="animate-hammer" />
          <rect x="34" y="64" width="5" height="4" rx="1" fill="#6b7280" className="animate-hammer" />
        </g>

        {/* Dwarf 2 - Carrying brick */}
        <g className="animate-dwarf-2">
          {/* Head */}
          <circle cx="120" cy="72" r="5" fill="#fbbf24" />
          {/* Hat */}
          <polygon points="115,68 125,68 120,60" fill="#2563eb" />
          {/* Body */}
          <rect x="117" y="77" width="6" height="8" rx="2" fill="#dc2626" />
          {/* Legs */}
          <rect x="118" y="85" width="2" height="3" rx="1" fill="#854d0e" />
          <rect x="121" y="85" width="2" height="3" rx="1" fill="#854d0e" />
          {/* Brick */}
          <rect x="112" y="68" width="7" height="4" rx="1" fill="#f97316" className="animate-brick" />
        </g>

        {/* Dwarf 3 - On ladder painting */}
        <g className="animate-dwarf-3">
          {/* Ladder */}
          <line x1="104" y1="48" x2="108" y2="88" stroke="#854d0e" strokeWidth="1.5" />
          <line x1="110" y1="48" x2="114" y2="88" stroke="#854d0e" strokeWidth="1.5" />
          <line x1="105" y1="56" x2="111" y2="56" stroke="#854d0e" strokeWidth="1" />
          <line x1="106" y1="64" x2="112" y2="64" stroke="#854d0e" strokeWidth="1" />
          <line x1="106.5" y1="72" x2="112.5" y2="72" stroke="#854d0e" strokeWidth="1" />
          <line x1="107" y1="80" x2="113" y2="80" stroke="#854d0e" strokeWidth="1" />
          {/* Head */}
          <circle cx="107" cy="50" r="4" fill="#fbbf24" />
          {/* Hat */}
          <polygon points="103,47 111,47 107,40" fill="#16a34a" />
          {/* Body */}
          <rect x="105" y="54" width="5" height="6" rx="1.5" fill="#7c3aed" />
          {/* Brush arm */}
          <line x1="103" y1="56" x2="98" y2="54" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className="animate-brush" />
          <rect x="95" y="52" width="4" height="2" rx="0.5" fill="#3b82f6" className="animate-brush" />
        </g>

        {/* Sparkles */}
        <g className="animate-sparkle">
          <polygon points="55,40 56,43 59,43 57,45 58,48 55,46 52,48 53,45 51,43 54,43" fill="#fbbf24" />
        </g>
        <g className="animate-sparkle-2">
          <polygon points="130,45 131,47 133,47 131.5,48.5 132,50.5 130,49 128,50.5 128.5,48.5 127,47 129,47" fill="#fbbf24" />
        </g>
      </svg>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 font-medium">
          小人たちが機能を建築中
        </span>
        <span className="inline-flex gap-0.5">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
    </div>
  );
}
