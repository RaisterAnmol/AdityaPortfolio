import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [visible, setVisible] = useState(true);

  const logLines = [
    "INITIALIZING CORE SYSTEM...",
    "ESTABLISHING SECURE HANDSHAKE...",
    "LOADING 3D RENDER ENGINE (R3F)...",
    "IMPORTING GSAP SCROLLTRIGGERS...",
    "LOADING PROJECTS & EXPERIENCES...",
    "ADITYA.OS BOOTED SUCCESSFULLY!"
  ];

  useEffect(() => {
    // Progress counter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
          }, 600);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onFinish]);

  useEffect(() => {
    // Diagnostic logs timing
    if (progress > 5 && logs.length === 0) setLogs([logLines[0]]);
    if (progress > 25 && logs.length === 1) setLogs(prev => [...prev, logLines[1]]);
    if (progress > 45 && logs.length === 2) setLogs(prev => [...prev, logLines[2]]);
    if (progress > 65 && logs.length === 3) setLogs(prev => [...prev, logLines[3]]);
    if (progress > 85 && logs.length === 4) setLogs(prev => [...prev, logLines[4]]);
    if (progress === 100 && logs.length === 5) setLogs(prev => [...prev, logLines[5]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col justify-between p-8 md:p-16 font-mono"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-[10px] text-indigoAccent">
            <span>SYS_STATUS: ACTIVE</span>
            <span>VER: 2.0.26</span>
          </div>

          {/* Center Boot Information */}
          <div className="max-w-xl self-center w-full space-y-6">
            {/* Title / Logo */}
            <div className="flex items-center gap-2 text-2xl font-bold tracking-wider">
              <span className="text-emeraldAccent">&lt;</span>
              <span>Aditya.OS</span>
              <span className="text-emeraldAccent">/&gt;</span>
            </div>

            {/* Diagnostic Logs */}
            <div className="h-[140px] flex flex-col gap-1.5 justify-end text-neutral-400 text-xs md:text-sm">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-emeraldAccent">&gt;</span>
                  <span className={idx === logs.length - 1 ? 'text-white' : ''}>{log}</span>
                </div>
              ))}
            </div>

            {/* Percentage Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>BOOTING OS...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-[3px] bg-neutral-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-indigoAccent to-emeraldAccent"
                />
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex justify-between text-[9px] text-neutral-600">
            <span>PORTFOLIO SYSTEM SECURED</span>
            <span>© 2026 ADITYA. ALL RIGHTS RESERVED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
