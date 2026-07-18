import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '../contexts/WindowContext';

export default function WindowFrame({ app, children }) {
  const { windows, activeId, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindows();
  const constraintsRef = useRef(null);

  const winState = windows[app.id];
  if (!winState || !winState.isOpen) return null;

  const isActive = activeId === app.id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ 
        opacity: winState.isMinimized ? 0 : 1, 
        scale: winState.isMinimized ? 0.8 : 1,
        y: winState.isMinimized ? 50 : 0,
        pointerEvents: winState.isMinimized ? 'none' : 'auto'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        zIndex: winState.zIndex,
        position: 'absolute',
        left: winState.isMaximized ? 0 : '15%',
        top: winState.isMaximized ? '64px' : '15%',
        width: winState.isMaximized ? '100vw' : `${app.defaultWidth || 800}px`,
        height: winState.isMaximized ? 'calc(100vh - 128px)' : `${app.defaultHeight || 550}px`,
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      drag={!winState.isMaximized}
      dragHandleClassName="window-titlebar"
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={() => focusWindow(app.id)}
      className={`glassmorphism rounded-2xl flex flex-col overflow-hidden border shadow-2xl transition-shadow duration-300 ${
        isActive 
          ? 'border-[var(--accent-color)]/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)]' 
          : 'border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.4)]'
      }`}
    >
      {/* Title Bar (Draggable Handler) */}
      <div 
        className="window-titlebar h-12 bg-neutral-950/80 border-b border-white/5 flex items-center justify-between px-5 select-none cursor-move shrink-0"
      >
        {/* Title / Icon */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <span>{app.icon}</span>
          <span className="font-semibold text-neutral-200">{app.title}</span>
        </div>

        {/* Windows Control Actions (VisionOS dot styles) */}
        <div className="flex gap-2 items-center pointer-events-auto">
          {/* Minimize button (Yellow) */}
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(app.id); }}
            className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors flex items-center justify-center text-[8px] text-neutral-900 font-bold"
            title="Minimize Window"
          >
            –
          </button>
          
          {/* Maximize button (Green) */}
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(app.id); }}
            className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors flex items-center justify-center text-[8px] text-neutral-900 font-bold"
            title="Toggle Maximize"
          >
            +
          </button>

          {/* Close button (Red) */}
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(app.id); }}
            className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors flex items-center justify-center text-[7px] text-neutral-900 font-bold"
            title="Close App"
          >
            ×
          </button>
        </div>
      </div>

      {/* App Body Frame */}
      <div className="flex-grow overflow-y-auto p-6 bg-neutral-950/20 backdrop-blur-md relative select-text scrollbar">
        {children}
      </div>
    </motion.div>
  );
}
