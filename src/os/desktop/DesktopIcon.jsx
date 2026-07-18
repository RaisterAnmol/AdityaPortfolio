import React from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '../contexts/WindowContext';
import { useOS } from '../contexts/OSContext';

export default function DesktopIcon({ app, isSelected, onSelect }) {
  const { openWindow } = useWindows();
  const { playSound } = useOS();

  const handleSingleClick = (e) => {
    e.stopPropagation();
    onSelect();
    playSound('hover');
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    openWindow(app.id);
    playSound('click');
  };

  return (
    <motion.div
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ y: -6, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-20 h-22 flex flex-col items-center justify-center rounded-xl cursor-pointer p-2.5 transition-all duration-300 relative group select-none ${
        isSelected 
          ? 'bg-white/10 border border-[var(--accent-color)]/40 shadow-[0_0_20px_var(--glow-color)]' 
          : 'bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10'
      }`}
    >
      {/* Icon Sphere Wrapper */}
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl relative border border-white/5 glassmorphism shadow-inner group-hover:shadow-[0_0_15px_var(--glow-color)] transition-shadow duration-300"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)'
        }}
      >
        <span>{app.icon}</span>
        {/* Glow indicator */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at center, var(--accent-color) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Label */}
      <span 
        className="text-[10px] font-mono font-medium mt-2 text-center truncate max-w-full drop-shadow-md tracking-wide"
        style={{ color: isSelected ? 'var(--accent-color)' : '#e5e5e5' }}
      >
        {app.title}
      </span>
    </motion.div>
  );
}
