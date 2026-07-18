import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useWindows } from '../contexts/WindowContext';
import { useOS } from '../contexts/OSContext';

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const { openWindow } = useWindows();
  const { playSound, addNotification, setThemeName, themeName } = useOS();

  const handleResumeDownload = () => {
    // Simulated Resume download
    addNotification("Resume downloaded successfully!", "success");
    // Create direct mock file download link
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', 'Aditya_Resume.pdf');
    // In production, user will link actual PDF.
  };

  const cycleTheme = () => {
    const list = ['cyber-green', 'midnight-blue', 'purple-neon', 'amber', 'matrix'];
    const nextIdx = (list.indexOf(themeName) + 1) % list.length;
    setThemeName(list[nextIdx]);
    addNotification(`Theme switched to: ${list[nextIdx]}`, 'info');
  };

  const items = [
    { label: 'About Me', icon: '👤', action: () => openWindow('about') },
    { label: 'Skills', icon: '⚡', action: () => openWindow('skills') },
    { label: 'Projects', icon: '📁', action: () => openWindow('projects') },
    { label: 'Timeline', icon: '📅', action: () => openWindow('experience') },
    { label: 'Terminal', icon: '🖥️', action: () => openWindow('terminal') },
    { label: 'AI Assistant', icon: '🧠', action: () => openWindow('chatbot') },
    { label: 'Resume', icon: '📄', action: handleResumeDownload },
    { label: 'Cycle Theme', icon: '🎨', action: cycleTheme },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex h-16 items-end gap-3.5 rounded-2xl glassmorphism px-4 pb-3 z-50 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      {items.map((item, idx) => (
        <DockIcon key={idx} mouseX={mouseX} item={item} playSound={playSound} />
      ))}
    </motion.div>
  );
}

function DockIcon({ mouseX, item, playSound }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-120, 0, 120], [42, 60, 42]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [42, 60, 42]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 180, damping: 14 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 180, damping: 14 });

  const handleClick = (e) => {
    e.preventDefault();
    item.action();
    playSound('click');
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => playSound('hover')}
      style={{ width, height }}
      className="group relative flex items-center justify-center rounded-xl bg-neutral-900/60 text-xl border border-white/5 hover:border-[var(--accent-color)]/30 hover:bg-[var(--accent-color)]/10 transition-colors duration-300"
    >
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-neutral-950 px-2 py-1 text-[10px] font-mono text-white border border-white/10 group-hover:scale-100 transition-all shadow-md tracking-wider">
        {item.label}
      </span>
      <span>{item.icon}</span>
    </motion.button>
  );
}
