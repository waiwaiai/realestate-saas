"use client";

export default function BuildingAnimation() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <style>{`
        @keyframes ies-house-build {
          0% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
          30% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes ies-roof-build {
          0%, 25% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; }
        }
        @keyframes ies-pop-in {
          0%, 40% { opacity: 0; transform: scale(0); }
          60% { opacity: 1; transform: scale(1.15); }
          70% { transform: scale(1); }
          100% { opacity: 1; }
        }
        @keyframes ies-smoke {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          30% { opacity: 0; }
          50% { opacity: 0.6; transform: translateY(-3px) scale(1); }
          100% { opacity: 0; transform: translateY(-14px) scale(1.4); }
        }
        @keyframes ies-dwarf-walk {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(2px) translateY(-2px); }
          75% { transform: translateX(-2px) translateY(-2px); }
        }
        @keyframes ies-dwarf-carry {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-8px); }
        }
        @keyframes ies-dwarf-paint {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-1px) translateY(1px); }
        }
        @keyframes ies-hammer {
          0%, 60%, 100% { transform: rotate(0deg); transform-origin: 29px 74px; }
          30% { transform: rotate(-30deg); transform-origin: 29px 74px; }
        }
        @keyframes ies-brick-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes ies-brush {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        @keyframes ies-sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
      `}</style>

      <svg
        width="180"
        height="110"
        viewBox="0 0 180 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Ground */}
        <rect x="0" y="95" width="180" height="2" rx="1" fill="#e2e8f0" />
        <rect x="10" y="97" width="160" height="6" rx="2" fill="#f1f5f9" />

        {/* House body */}
        <rect
          x="50" y="55" width="60" height="40" rx="2" fill="#93c5fd"
          style={{ animation: "ies-house-build 2s ease-out both" }}
        />

        {/* Roof */}
        <polygon
          points="44,57 116,57 80,30"
          fill="#3b82f6"
          style={{ animation: "ies-roof-build 2s ease-out both" }}
        />

        {/* Door */}
        <rect
          x="72" y="72" width="14" height="23" rx="2" fill="#1e40af"
          style={{ animation: "ies-pop-in 2.5s ease-out both" }}
        />
        <circle
          cx="83" cy="84" r="1.5" fill="#fbbf24"
          style={{ animation: "ies-pop-in 2.5s ease-out both" }}
        />

        {/* Window left */}
        <g style={{ animation: "ies-pop-in 2.8s ease-out both" }}>
          <rect x="56" y="65" width="11" height="11" rx="1.5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
          <line x1="61.5" y1="65" x2="61.5" y2="76" stroke="#60a5fa" strokeWidth="0.6" />
          <line x1="56" y1="70.5" x2="67" y2="70.5" stroke="#60a5fa" strokeWidth="0.6" />
        </g>

        {/* Window right */}
        <g style={{ animation: "ies-pop-in 3s ease-out both" }}>
          <rect x="92" y="65" width="11" height="11" rx="1.5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
          <line x1="97.5" y1="65" x2="97.5" y2="76" stroke="#60a5fa" strokeWidth="0.6" />
          <line x1="92" y1="70.5" x2="103" y2="70.5" stroke="#60a5fa" strokeWidth="0.6" />
        </g>

        {/* Chimney */}
        <rect
          x="95" y="34" width="8" height="20" rx="1" fill="#64748b"
          style={{ animation: "ies-pop-in 2.2s ease-out both" }}
        />

        {/* Smoke */}
        <circle cx="99" cy="26" r="3.5" fill="#cbd5e1" style={{ animation: "ies-smoke 3s ease-out 3s infinite" }} />
        <circle cx="103" cy="17" r="3" fill="#e2e8f0" style={{ animation: "ies-smoke 3s ease-out 3.6s infinite" }} />
        <circle cx="97" cy="9" r="2.5" fill="#f1f5f9" style={{ animation: "ies-smoke 3s ease-out 4.2s infinite" }} />

        {/* Dwarf 1 - Hammering (left) */}
        <g style={{ animation: "ies-dwarf-walk 0.8s ease-in-out infinite" }}>
          <circle cx="28" cy="78" r="6" fill="#fde68a" />
          <circle cx="26" cy="77" r="1" fill="#1e293b" />
          <circle cx="30" cy="77" r="1" fill="#1e293b" />
          <path d="M26 80 Q28 82 30 80" stroke="#1e293b" strokeWidth="0.7" fill="none" />
          <polygon points="22,73 34,73 28,63" fill="#dc2626" />
          <rect x="25" y="84" width="6" height="8" rx="2" fill="#16a34a" />
          <rect x="26" y="92" width="2.5" height="3" rx="1" fill="#92400e" />
          <rect x="29" y="92" width="2.5" height="3" rx="1" fill="#92400e" />
          <g style={{ animation: "ies-hammer 0.5s ease-in-out infinite" }}>
            <line x1="33" y1="80" x2="42" y2="72" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="40" y="68" width="6" height="5" rx="1.5" fill="#6b7280" />
          </g>
        </g>

        {/* Dwarf 2 - Carrying brick (right) */}
        <g style={{ animation: "ies-dwarf-carry 2s ease-in-out infinite" }}>
          <circle cx="140" cy="78" r="6" fill="#fde68a" />
          <circle cx="138" cy="77" r="1" fill="#1e293b" />
          <circle cx="142" cy="77" r="1" fill="#1e293b" />
          <path d="M138 80 Q140 82 142 80" stroke="#1e293b" strokeWidth="0.7" fill="none" />
          <polygon points="134,73 146,73 140,63" fill="#2563eb" />
          <rect x="137" y="84" width="6" height="8" rx="2" fill="#dc2626" />
          <rect x="138" y="92" width="2.5" height="3" rx="1" fill="#92400e" />
          <rect x="141" y="92" width="2.5" height="3" rx="1" fill="#92400e" />
          <g style={{ animation: "ies-brick-bob 1s ease-in-out infinite" }}>
            <rect x="131" y="73" width="8" height="5" rx="1" fill="#f97316" />
            <rect x="131" y="73" width="8" height="5" rx="1" fill="none" stroke="#ea580c" strokeWidth="0.5" />
          </g>
        </g>

        {/* Dwarf 3 - On ladder (right side of house) */}
        <g style={{ animation: "ies-dwarf-paint 1.2s ease-in-out infinite" }}>
          {/* Ladder */}
          <line x1="118" y1="50" x2="122" y2="95" stroke="#92400e" strokeWidth="1.8" />
          <line x1="125" y1="50" x2="129" y2="95" stroke="#92400e" strokeWidth="1.8" />
          <line x1="119" y1="60" x2="126" y2="60" stroke="#92400e" strokeWidth="1.2" />
          <line x1="119.5" y1="68" x2="126.5" y2="68" stroke="#92400e" strokeWidth="1.2" />
          <line x1="120" y1="76" x2="127" y2="76" stroke="#92400e" strokeWidth="1.2" />
          <line x1="120.5" y1="84" x2="127.5" y2="84" stroke="#92400e" strokeWidth="1.2" />
          {/* Dwarf on ladder */}
          <circle cx="122" cy="54" r="5" fill="#fde68a" />
          <circle cx="120" cy="53" r="0.8" fill="#1e293b" />
          <circle cx="124" cy="53" r="0.8" fill="#1e293b" />
          <path d="M120 55.5 Q122 57 124 55.5" stroke="#1e293b" strokeWidth="0.6" fill="none" />
          <polygon points="117,50 127,50 122,42" fill="#16a34a" />
          <rect x="120" y="59" width="5" height="7" rx="1.5" fill="#7c3aed" />
          <g style={{ animation: "ies-brush 0.7s ease-in-out infinite" }}>
            <line x1="118" y1="62" x2="112" y2="59" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="109" y="57.5" width="4" height="3" rx="1" fill="#3b82f6" />
          </g>
        </g>

        {/* Sparkles */}
        <g style={{ animation: "ies-sparkle 2s ease-in-out 2.5s infinite" }}>
          <polygon points="65,42 66.5,46 70,46 67.5,48.5 68.5,52 65,49.5 61.5,52 62.5,48.5 60,46 63.5,46" fill="#fbbf24" />
        </g>
        <g style={{ animation: "ies-sparkle 2.5s ease-in-out 3.5s infinite" }}>
          <polygon points="150,50 151,53 154,53 152,55 153,58 150,56 147,58 148,55 146,53 149,53" fill="#fbbf24" />
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
