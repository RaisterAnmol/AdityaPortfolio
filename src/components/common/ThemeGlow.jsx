import React from 'react';

export default function ThemeGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Indigo top-left blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigoAccent opacity-[0.08] blur-[120px]" />
      
      {/* Emerald bottom-right blob */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emeraldAccent opacity-[0.08] blur-[120px]" />

      {/* Center ambient glow */}
      <div className="absolute top-[30%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-indigoAccent opacity-[0.04] blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
    </div>
  );
}
