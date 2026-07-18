import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiTerminal } from 'react-icons/fi';
import MagneticButton from '../../components/ui/MagneticButton';
import FloatingLaptop3D from '../../components/three/FloatingLaptop3D';

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 px-6 md:px-12">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
        <Suspense fallback={null}>
          <FloatingLaptop3D />
        </Suspense>
      </div>

      {/* Hero Content Panel */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none z-20 relative">
        <div className="space-y-6 max-w-xl text-left pointer-events-auto">
          {/* Animated Tech Subheading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-emeraldAccent bg-emeraldAccent/5 border border-emeraldAccent/10 px-3 py-1.5 rounded-full w-fit"
          >
            <FiTerminal className="w-3.5 h-3.5" />
            <span>SYSTEM_ONLINE: INCOMING DATA IN PROGRESS</span>
          </motion.div>

          {/* Headline Reveal */}
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Aditya<span className="text-indigoAccent">.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
                Fullstack Web Architect
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-sm md:text-lg text-neutral-400 font-normal leading-relaxed"
          >
            Crafting futuristic, high-performance web applications inspired by Apple, Linear, and Vercel. Bridging state-of-the-art animations with robust backend architectures.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <MagneticButton>
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-block bg-gradient-to-r from-indigoAccent to-emeraldAccent text-darkBg font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full hover:shadow-[0_0_25px_rgba(0,255,153,0.5)] transition-shadow duration-300"
              >
                Explore Work
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-block bg-neutral-900/60 text-white border border-white/10 hover:border-emeraldAccent/30 hover:bg-neutral-800/80 font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-all duration-300"
              >
                Establish Connection
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Live Coordinate Display */}
      <div className="absolute bottom-8 left-8 font-mono text-[9px] text-neutral-500 hidden md:block select-none z-20">
        <span>LOC_X: {coords.x}px | LOC_Y: {coords.y}px</span>
      </div>

      {/* Downward Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 right-8 text-neutral-400 hover:text-emeraldAccent cursor-pointer z-20"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <FiChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
