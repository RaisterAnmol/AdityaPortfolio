import React from 'react';
import { motion } from 'framer-motion';

export default function SkillCard({ skill }) {
  const IconComponent = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glassmorphism rounded-xl p-5 border border-white/5 hover:border-emeraldAccent/20 hover:bg-emeraldAccent/[0.01] transition-all duration-300 relative group overflow-hidden"
    >
      {/* Background Subtle Hover Radial Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${skill.color}15 0%, transparent 50%)`
        }}
      />

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center border border-white/5 group-hover:border-emeraldAccent/20 group-hover:text-emeraldAccent transition-all duration-300">
            {IconComponent && <IconComponent className="w-5 h-5" style={{ color: skill.color }} />}
          </div>
          <span className="font-semibold text-neutral-200 group-hover:text-white transition-colors">{skill.name}</span>
        </div>
        <span className="font-mono text-xs text-neutral-400 group-hover:text-emeraldAccent transition-colors">{skill.level}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color || '#6366F1' }}
        />
      </div>
    </motion.div>
  );
}
