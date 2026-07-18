import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import TiltCard from '../../components/ui/TiltCard';
import TechBadge from '../../components/common/TechBadge';

export default function ProjectCard({ project }) {
  return (
    <TiltCard className="h-full">
      <div 
        className="h-full glassmorphism rounded-2xl overflow-hidden border border-white/5 hover:border-emeraldAccent/20 hover:shadow-[0_0_40px_rgba(0,255,153,0.03)] flex flex-col group transition-all duration-500 relative"
      >
        {/* Project Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-neutral-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          {/* Accent Color Radial Mask */}
          <div 
            className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, transparent 30%, ${project.glowColor} 100%)`
            }}
          />

          {/* Quick Links Overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glassmorphism border border-white/10 text-white hover:text-emeraldAccent hover:border-emeraldAccent/30 hover:scale-105 transition-all"
              title="View GitHub Repository"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glassmorphism border border-white/10 text-white hover:text-emeraldAccent hover:border-emeraldAccent/30 hover:scale-105 transition-all"
              title="Visit Live Deployment"
            >
              <FiExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="text-xl font-bold text-white group-hover:text-emeraldAccent transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          <div className="space-y-4">
            {/* Features (Micro bullet lists) */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">KEY_SPECS:</span>
              <ul className="text-[11px] text-neutral-300 font-mono space-y-0.5">
                {project.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-emeraldAccent text-[9px]">•</span>
                    <span className="truncate">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tech.map((t, idx) => (
                <TechBadge key={idx} tech={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
