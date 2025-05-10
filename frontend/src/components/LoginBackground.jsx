import React from "react";

export default function LoginBackground() {
  return (
    <>
      {/* Physics: E = mc² */}
      <svg className="absolute left-8 top-8 w-52 h-24 opacity-10 -rotate-6" viewBox="0 0 300 80">
        <text x="0" y="60" fontSize="64" fill="#6b7280" fontFamily="cursive, sans-serif">E = mc²</text>
      </svg>
      {/* Chemistry: Flask */}
      <svg className="absolute right-8 top-16 w-20 h-32 opacity-10 rotate-3" viewBox="0 0 60 100" fill="none">
        <ellipse cx="30" cy="80" rx="25" ry="15" stroke="#6b7280" strokeWidth="4" />
        <rect x="25" y="10" width="10" height="60" fill="#6b7280" opacity="0.08" />
        <rect x="25" y="10" width="10" height="10" fill="#6b7280" />
        <line x1="30" y1="10" x2="30" y2="0" stroke="#6b7280" strokeWidth="4" />
      </svg>
      {/* Biology: Anatomy */}
      <svg className="absolute left-1/2 bottom-8 -translate-x-1/2 w-32 h-32 opacity-10 rotate-2" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="25" r="15" stroke="#6b7280" strokeWidth="3" />
        <rect x="35" y="40" width="30" height="40" rx="15" stroke="#6b7280" strokeWidth="3" />
        <line x1="50" y1="80" x2="50" y2="100" stroke="#6b7280" strokeWidth="3" />
        <line x1="35" y1="60" x2="15" y2="80" stroke="#6b7280" strokeWidth="3" />
        <line x1="65" y1="60" x2="85" y2="80" stroke="#6b7280" strokeWidth="3" />
      </svg>
      {/* Maths: Quadratic */}
      <svg className="absolute left-24 bottom-24 w-72 h-24 opacity-10 -rotate-3" viewBox="0 0 500 80">
        <text x="0" y="60" fontSize="56" fill="#6b7280" fontFamily="serif">ax² + bx + c = 0</text>
      </svg>
      {/* Chemistry: Benzene */}
      <svg className="absolute right-24 bottom-24 w-24 h-24 opacity-10 rotate-2" viewBox="0 0 100 100" fill="none">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#6b7280" strokeWidth="3" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="#6b7280" strokeWidth="2" fill="none" />
      </svg>
      {/* Biology: DNA */}
      <svg className="absolute right-1/2 top-24 w-24 h-32 opacity-10 -rotate-6" viewBox="0 0 100 140" fill="none">
        <path d="M30,10 Q70,70 30,130" stroke="#6b7280" strokeWidth="3" fill="none" />
        <path d="M70,10 Q30,70 70,130" stroke="#6b7280" strokeWidth="3" fill="none" />
        <line x1="40" y1="30" x2="60" y2="30" stroke="#6b7280" strokeWidth="2" />
        <line x1="40" y1="60" x2="60" y2="60" stroke="#6b7280" strokeWidth="2" />
        <line x1="40" y1="90" x2="60" y2="90" stroke="#6b7280" strokeWidth="2" />
        <line x1="40" y1="120" x2="60" y2="120" stroke="#6b7280" strokeWidth="2" />
      </svg>
      {/* Maths: Pi */}
      <svg className="absolute left-1/2 top-8 w-16 h-16 opacity-10 rotate-12" viewBox="0 0 50 50">
        <text x="0" y="35" fontSize="40" fill="#6b7280" fontFamily="serif">π</text>
      </svg>
      {/* Maths: Integral */}
      <svg className="absolute left-10 top-1/2 w-20 h-20 opacity-10 rotate-3" viewBox="0 0 60 60">
        <text x="0" y="40" fontSize="40" fill="#6b7280" fontFamily="serif">∫</text>
      </svg>
      {/* Chemistry: Test Tube */}
      <svg className="absolute right-10 bottom-10 w-16 h-28 opacity-10 -rotate-2" viewBox="0 0 60 100" fill="none">
        <rect x="25" y="10" width="10" height="70" fill="#6b7280" opacity="0.08" />
        <rect x="25" y="10" width="10" height="10" fill="#6b7280" />
        <ellipse cx="30" cy="80" rx="10" ry="8" stroke="#6b7280" strokeWidth="3" />
      </svg>
      {/* Biology: Microscope */}
      <svg className="absolute left-1/4 top-1/4 w-16 h-16 opacity-10 -rotate-12" viewBox="0 0 64 64" fill="none">
        <rect x="28" y="10" width="8" height="30" rx="4" stroke="#6b7280" strokeWidth="3" />
        <rect x="20" y="40" width="24" height="8" rx="4" stroke="#6b7280" strokeWidth="3" />
        <circle cx="32" cy="54" r="6" stroke="#6b7280" strokeWidth="3" />
      </svg>
      {/* Subtle Bar Chart SVG */}
      <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-40 h-32 opacity-10 rotate-6" viewBox="0 0 160 120" fill="none">
        {/* Axes */}
        <line x1="20" y1="10" x2="20" y2="110" stroke="#6b7280" strokeWidth="2" />
        <line x1="20" y1="110" x2="150" y2="110" stroke="#6b7280" strokeWidth="2" />
        {/* Bars */}
        <rect x="35" y="70" width="18" height="40" fill="#6b7280" fillOpacity="0.3" />
        <rect x="65" y="50" width="18" height="60" fill="#6b7280" fillOpacity="0.4" />
        <rect x="95" y="30" width="18" height="80" fill="#6b7280" fillOpacity="0.5" />
        <rect x="125" y="90" width="18" height="20" fill="#6b7280" fillOpacity="0.2" />
      </svg>
    </>
  );
} 