import React, { useEffect, useState } from 'react';
import { Train, Zap, QrCode } from 'lucide-react';

interface WelcomeAnimationProps {
  onComplete?: () => void;
}

export function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => {
      setStage(4);
      onComplete?.();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }, (_, i) => (
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

      {/* Central Animation */}
      <div className="relative z-10 text-center">
        {/* Stage 1: QRail Logo Appears */}
        <div className={`transition-all duration-1000 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center animate-glow shadow-2xl">
              <Train className="w-12 h-12 text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center animate-spin">
              <QrCode className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent mb-4">
            QRail
          </h1>
        </div>

        {/* Stage 2: Subtitle Appears */}
        <div className={`transition-all duration-1000 delay-500 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-xl text-blue-200 mb-8">Smart Railway Management System</p>
        </div>

        {/* Stage 3: Features List */}
        <div className={`transition-all duration-1000 delay-1000 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-2 animate-pulse">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <p className="text-blue-200 text-sm">QR Tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-2 animate-pulse" style={{ animationDelay: '0.2s' }}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-blue-200 text-sm">AI Insights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-2 animate-pulse" style={{ animationDelay: '0.4s' }}>
                <Train className="w-6 h-6 text-white" />
              </div>
              <p className="text-blue-200 text-sm">Live Monitoring</p>
            </div>
          </div>
        </div>

        {/* Stage 4: Loading Complete */}
        <div className={`transition-all duration-1000 delay-1500 ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-blue-300 mt-4">Initializing System...</p>
        </div>
      </div>

      {/* Railway Track Animation at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg width="100%" height="100" viewBox="0 0 800 100" className="opacity-30">
          <defs>
            <linearGradient id="welcomeTrackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          
          {/* Track bed */}
          <rect x="0" y="40" width="800" height="20" fill="url(#welcomeTrackGradient)" />
          
          {/* Rails */}
          <line x1="0" y1="45" x2="800" y2="45" stroke="#94a3b8" strokeWidth="3" />
          <line x1="0" y1="55" x2="800" y2="55" stroke="#94a3b8" strokeWidth="3" />
          
          {/* Sleepers */}
          {Array.from({ length: 25 }, (_, i) => (
            <rect
              key={i}
              x={i * 32}
              y="35"
              width="4"
              height="30"
              fill="#8b5a3c"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}