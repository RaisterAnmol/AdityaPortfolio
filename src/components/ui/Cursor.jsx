import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseOver = (e) => {
      // Scale cursor if hovering over buttons, links, or custom interactive elements
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[data-hover]') ||
        target.classList.contains('cursor-pointer');
      
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide custom cursor on mobile touch screens
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (touchDevice) {
      setHidden(true);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emeraldAccent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? 'rgba(0, 255, 153, 0.2)' : 'rgba(0, 255, 153, 0)',
          borderColor: hovered ? '#6366F1' : '#00FF99',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-emeraldAccent pointer-events-none z-[10000] mix-blend-difference translate-x-[12px] translate-y-[12px] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
      />
    </>
  );
}
