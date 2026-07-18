import React from 'react';

export default function TechBadge({ tech }) {
  return (
    <span className="inline-block px-3 py-1 text-[11px] font-mono font-medium rounded-full bg-neutral-900/60 border border-white/5 hover:border-emeraldAccent/30 hover:bg-emeraldAccent/5 text-neutral-300 hover:text-emeraldAccent transition-all duration-300">
      {tech}
    </span>
  );
}
