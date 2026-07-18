import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import { experienceData } from '../../data/experienceData';
import TechBadge from '../../components/common/TechBadge';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 md:px-12 w-full max-w-7xl mx-auto z-20">
      <SectionHeading 
        number="04" 
        title="Experience Timeline" 
        subtitle="A chronological trace of academic foundations and developmental milestones." 
      />

      <div className="relative border-l border-white/5 mt-16 ml-4 md:ml-32 space-y-12">
        {/* Animated Connecting Vertical Line Overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-indigoAccent via-emeraldAccent to-neutral-900 origin-top pointer-events-none" />

        {experienceData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline Bullet Node */}
            <div className="absolute top-1.5 left-[-5px] w-[11px] h-[11px] rounded-full bg-[#050505] border-[2px] border-indigoAccent group-hover:border-emeraldAccent group-hover:scale-125 transition-all duration-300 z-10" />

            {/* Float Year Indicator at Left (on desktop) */}
            <div className="md:absolute md:left-[-120px] md:top-1 font-mono text-xs text-neutral-400 group-hover:text-emeraldAccent transition-colors">
              {item.year}
            </div>

            {/* Experience Panel Card */}
            <div className="glassmorphism rounded-2xl p-6 border border-white/5 group-hover:border-indigoAccent/20 hover:bg-indigoAccent/[0.01] transition-all duration-300 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emeraldAccent transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">
                    {item.company}
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Technologies or Categories list */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag, tagIdx) => (
                  <TechBadge key={tagIdx} tech={tag} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
