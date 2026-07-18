import React from 'react';
import { motion } from 'framer-motion';

export default function GradientBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Drifting Emerald Blob */}
      <motion.div
        animate={{
          x: [0, 40, -20, 10, 0],
          y: [0, -30, 40, -10, 0],
          scale: [1, 1.15, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[15%] w-80 h-80 rounded-full bg-emeraldAccent opacity-[0.06] blur-[80px]"
      />

      {/* Drifting Indigo Blob */}
      <motion.div
        animate={{
          x: [0, -40, 30, -10, 0],
          y: [0, 50, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[25%] right-[20%] w-96 h-96 rounded-full bg-indigoAccent opacity-[0.08] blur-[100px]"
      />
    </div>
  );
}
