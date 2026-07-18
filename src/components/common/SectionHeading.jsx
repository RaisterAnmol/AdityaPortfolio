import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ number, title, subtitle }) {
  return (
    <div className="mb-12 md:mb-16 space-y-3">
      {/* Category Indicator */}
      <div className="flex items-center gap-3 font-mono text-xs text-emeraldAccent tracking-widest uppercase">
        <span>{number}</span>
        <span className="w-8 h-[1px] bg-emeraldAccent/30" />
        <span>System Log</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white relative">
        {title}
        <span className="text-indigoAccent">.</span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm md:text-base text-neutral-400 max-w-xl font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
