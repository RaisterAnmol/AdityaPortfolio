import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import SkillCard from './SkillCard';
import { skillsData } from '../../data/skillsData';
import { FiCode, FiDatabase, FiCpu } from 'react-icons/fi';

export default function Skills() {
  const getCategoryIcon = (icon) => {
    switch (icon) {
      case 'code':
        return <FiCode className="w-5 h-5 text-emeraldAccent" />;
      case 'database':
        return <FiDatabase className="w-5 h-5 text-indigoAccent" />;
      case 'tools':
        return <FiCpu className="w-5 h-5 text-emeraldAccent" />;
      default:
        return <FiCode className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 w-full max-w-7xl mx-auto z-20">
      <SectionHeading 
        number="02" 
        title="Technical Skills" 
        subtitle="My specialized weapons categorized by stack layer and operations scope." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {skillsData.map((cat, catIdx) => (
          <motion.div
            key={catIdx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            className="space-y-6 flex flex-col"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/5">
                {getCategoryIcon(cat.icon)}
              </div>
              <h3 className="text-lg font-bold text-white font-mono tracking-tight">
                {cat.category}
              </h3>
            </div>

            {/* Cards Grid */}
            <div className="flex flex-col gap-4 flex-grow">
              {cat.skills.map((skill, skillIdx) => (
                <SkillCard key={skillIdx} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
