import React from 'react';
import Particles from './Particles';
import GradientBlob from './GradientBlob';

export default function Background() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#050505] z-[-2] overflow-hidden pointer-events-none">
      {/* Dynamic Animated Blobs */}
      <GradientBlob />

      {/* Interactive Particles Layer */}
      <Particles />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.03] z-[2]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Dark Ambient Radial Mask */}
      <div className="absolute inset-0 bg-radial-gradient z-[3] pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #050505 90%)'
        }}
      />
    </div>
  );
}
