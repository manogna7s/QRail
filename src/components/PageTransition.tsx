import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <div className={`animate-scale-in ${className}`}>
      <div className="relative">
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}