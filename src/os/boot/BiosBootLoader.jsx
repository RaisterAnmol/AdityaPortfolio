import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BiosBootLoader({ onFinish }) {
  const [logs, setLogs] = useState([]);
  const [bootReady, setBootReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const biosSequence = [
    "ADITYA.OS(R) BIOS VERSION 2.0.26",
    "COPYRIGHT (C) 2026 ADITYA CO. ALL RIGHTS RESERVED.",
    "--------------------------------------------------",
    "CPU: AMD Ryzen 9 @ 4.90GHz (8 Cores, 16 Threads)",
    "RAM: 32768MB SYSTEM RAM OK",
    "GPU: HOLOGRAPHIC ACCELERATOR DETECTED",
    "INITIALIZING HARDWARE DEVS...",
    "MOUNTING FILE SYSTEM (/dev/sda1)...",
    "LOADING GRAPHICS PIPELINE (WEBGL)...",
    "ESTABLISHING MEMORY HANDSHAKE (GSAP/LENIS)...",
    "MOUNTING PORTFOLIO REGISTRIES...",
    "CONNECTING AI ASSISTANT NEURAL AGENT...",
    "BOOT COMPLETED successfully."
  ];

  useEffect(() => {
    let currentIdx = 0;
    const logTimer = setInterval(() => {
      if (currentIdx < biosSequence.length) {
        setLogs((prev) => [...prev, biosSequence[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(logTimer);
        setBootReady(true);
      }
    }, 150);

    return () => clearInterval(logTimer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (bootReady && e.key === 'Enter') {
        handleBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootReady]);

  const handleBoot = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 bg-[#000000] text-[#22C55E] z-[9999] flex flex-col justify-between p-8 font-mono select-none"
        >
          {/* Main Logs */}
          <div className="space-y-1.5 overflow-hidden max-w-3xl self-start w-full text-xs sm:text-sm">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-[#15803d]">&gt;&gt;</span>
                <span>{log}</span>
              </div>
            ))}

            {bootReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="mt-4 text-white text-sm sm:text-base font-bold bg-[#22C55E]/10 border border-[#22C55E]/30 px-4 py-2.5 rounded-lg w-fit cursor-pointer hover:bg-[#22C55E]/20 transition-all select-none"
                onClick={handleBoot}
              >
                PRESS [ENTER] OR CLICK HERE TO RUN ADITYA.OS
              </motion.div>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-center text-[10px] text-[#16a34a] border-t border-[#15803d]/30 pt-4">
            <span>SECURE_BOOT: ENABLED</span>
            <span>SYSTEM READY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
