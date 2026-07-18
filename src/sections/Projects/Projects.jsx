import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../data/projectsData';

export default function Projects() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 w-full max-w-7xl mx-auto z-20">
      <SectionHeading 
        number="03" 
        title="Featured Projects" 
        subtitle="Exploring clones, smart SaaS architectures, algorithms, and microservices." 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
