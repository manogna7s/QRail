import React from 'react';

export function RailwayTrack3D({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height="200"
        viewBox="0 0 800 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="railGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Track bed */}
        <rect x="0" y="80" width="800" height="40" fill="url(#trackGradient)" rx="20" />

        {/* Railway sleepers/ties */}
        {Array.from({ length: 20 }, (_, i) => (
          <rect
            key={i}
            x={i * 40 + 10}
            y="70"
            width="30"
            height="60"
            fill="#8b5a3c"
            rx="4"
            className="animate-track-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}

        {/* Left rail */}
        <rect x="0" y="75" width="800" height="8" fill="url(#railGradient)" rx="4" />
        
        {/* Right rail */}
        <rect x="0" y="117" width="800" height="8" fill="url(#railGradient)" rx="4" />

        {/* Electric/signal lines */}
        <line x1="0" y1="40" x2="800" y2="40" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
        <line x1="0" y1="160" x2="800" y2="160" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />

        {/* Signal poles */}
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i}>
            <rect x={i * 160 + 100} y="20" width="4" height="50" fill="#374151" />
            <circle cx={i * 160 + 102} cy="25" r="6" fill="#ef4444" className="animate-pulse" />
            <circle cx={i * 160 + 102} cy="35" r="6" fill="#22c55e" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function Train3D({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width="200"
        height="120"
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-train-move"
      >
        <defs>
          <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="trainWindowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <filter id="trainGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Train body */}
        <rect x="20" y="30" width="160" height="40" fill="url(#trainGradient)" rx="8" filter="url(#trainGlow)" />
        
        {/* Train nose */}
        <polygon points="180,30 200,50 180,70" fill="url(#trainGradient)" filter="url(#trainGlow)" />
        
        {/* Windows */}
        <rect x="30" y="35" width="20" height="15" fill="url(#trainWindowGradient)" rx="2" />
        <rect x="60" y="35" width="20" height="15" fill="url(#trainWindowGradient)" rx="2" />
        <rect x="90" y="35" width="20" height="15" fill="url(#trainWindowGradient)" rx="2" />
        <rect x="120" y="35" width="20" height="15" fill="url(#trainWindowGradient)" rx="2" />
        <rect x="150" y="35" width="20" height="15" fill="url(#trainWindowGradient)" rx="2" />

        {/* Wheels */}
        <circle cx="40" cy="75" r="8" fill="#374151" />
        <circle cx="70" cy="75" r="8" fill="#374151" />
        <circle cx="130" cy="75" r="8" fill="#374151" />
        <circle cx="160" cy="75" r="8" fill="#374151" />

        {/* Wheel details */}
        <circle cx="40" cy="75" r="4" fill="#6b7280" />
        <circle cx="70" cy="75" r="4" fill="#6b7280" />
        <circle cx="130" cy="75" r="4" fill="#6b7280" />
        <circle cx="160" cy="75" r="4" fill="#6b7280" />

        {/* Headlight */}
        <circle cx="190" cy="50" r="6" fill="#fbbf24" className="animate-pulse" />
        
        {/* QR Code on train */}
        <rect x="40" y="55" width="12" height="12" fill="#ffffff" rx="1" />
        <rect x="42" y="57" width="2" height="2" fill="#000000" />
        <rect x="46" y="57" width="2" height="2" fill="#000000" />
        <rect x="42" y="61" width="2" height="2" fill="#000000" />
        <rect x="46" y="61" width="2" height="2" fill="#000000" />
        <rect x="42" y="65" width="2" height="2" fill="#000000" />
        <rect x="46" y="65" width="2" height="2" fill="#000000" />
      </svg>
    </div>
  );
}

export function FloatingQRCodes({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`
          }}
        >
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded border border-white/30 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
              <rect x="2" y="2" width="2" height="2" />
              <rect x="6" y="2" width="2" height="2" />
              <rect x="12" y="2" width="2" height="2" />
              <rect x="16" y="2" width="2" height="2" />
              <rect x="2" y="6" width="2" height="2" />
              <rect x="16" y="6" width="2" height="2" />
              <rect x="2" y="12" width="2" height="2" />
              <rect x="6" y="12" width="2" height="2" />
              <rect x="12" y="12" width="2" height="2" />
              <rect x="16" y="12" width="2" height="2" />
              <rect x="2" y="16" width="2" height="2" />
              <rect x="6" y="16" width="2" height="2" />
              <rect x="12" y="16" width="2" height="2" />
              <rect x="16" y="16" width="2" height="2" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ParticleBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
}