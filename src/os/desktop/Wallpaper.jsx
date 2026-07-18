import React from 'react';
import Particles from '../../components/background/Particles';
import GradientBlob from '../../components/background/GradientBlob';

export default function Wallpaper() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[var(--bg-color)] transition-colors duration-500">
      {/* 1. Drift Gradient Blobs */}
      <GradientBlob />

      {/* 2. Particle canvas */}
      <Particles />

      {/* 3. Tech HUD Lines & Grid */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.03] z-[1]" 
        style={{
          backgroundImage: `
            linear-gradient(var(--accent-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-color) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 4. Iron Man HUD Central Ring Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full border border-[var(--accent-color)]/5 opacity-50 z-[1] flex items-center justify-center animate-pulse" style={{ animationDuration: '6s' }}>
        <div className="w-[80%] h-[80%] rounded-full border border-dashed border-[var(--accent-color)]/5 flex items-center justify-center">
          <div className="w-[50%] h-[50%] rounded-full border border-[var(--accent-color)]/10 animate-spin" style={{ animationDuration: '60s' }} />
        </div>
      </div>

      {/* Ambient Radial Dark Gradient */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 35%, rgba(5,5,5,0.92) 90%)'
        }}
      />
    </div>
  );
}
