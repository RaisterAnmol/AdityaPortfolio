import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import { FiCode, FiUser, FiActivity } from 'react-icons/fi';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-12 w-full max-w-7xl mx-auto z-20">
      <SectionHeading 
        number="01" 
        title="About Aditya" 
        subtitle="Bridging software engineering, creative design, and automated systems." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
        {/* Left Side: Cyber Bio Terminal (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 glassmorphism-indigo rounded-2xl p-6 flex flex-col justify-between border border-indigoAccent/15 min-h-[400px]"
        >
          {/* Terminal Topbar */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="font-mono text-[10px] text-neutral-500">
              user@aditya:~
            </div>
          </div>

          {/* Terminal Body */}
          <div className="font-mono text-xs md:text-sm text-neutral-300 space-y-4 flex-grow">
            <p className="flex gap-2 text-indigoAccent">
              <span>$</span>
              <span className="text-white font-semibold">cat bio.txt</span>
            </p>
            <p className="leading-relaxed text-neutral-300 pl-4 border-l border-indigoAccent/30">
              Hello! I am Aditya, a software engineer specializing in developing modern fullstack applications. I possess a deep interest in performance-optimized frontend architectures and interactive 3D graphics, alongside writing highly stable backend microservices.
            </p>

            <p className="flex gap-2 text-indigoAccent pt-2">
              <span>$</span>
              <span className="text-white font-semibold">cat goal.txt</span>
            </p>
            <p className="leading-relaxed text-neutral-300 pl-4 border-l border-emeraldAccent/30">
              My mission is to create websites and software systems that feel responsive, look elegant, and operate at peak efficiency. I merge mathematical precision with pixel-perfect layouts to build websites that command attention.
            </p>
          </div>

          {/* Terminal Footer */}
          <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
            <span>Encoding: UTF-8</span>
            <span>OS: Ubuntu 24.04</span>
          </div>
        </motion.div>

        {/* Right Side: OS Stats & Education (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Stat 1 */}
          <div className="glassmorphism rounded-2xl p-6 border border-white/5 hover:border-emeraldAccent/20 hover:bg-emeraldAccent/[0.02] transition-all group flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-emeraldAccent/10 flex items-center justify-center text-emeraldAccent border border-emeraldAccent/20">
              <FiCode className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-500">PROJECTS COMPLETED</div>
              <div className="text-2xl font-bold text-white group-hover:text-emeraldAccent transition-colors">15+ Repos</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glassmorphism rounded-2xl p-6 border border-white/5 hover:border-indigoAccent/20 hover:bg-indigoAccent/[0.02] transition-all group flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigoAccent/10 flex items-center justify-center text-indigoAccent border border-indigoAccent/20">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-500">ACADEMICS</div>
              <div className="text-2xl font-bold text-white group-hover:text-indigoAccent transition-colors">B.Tech CSE</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glassmorphism rounded-2xl p-6 border border-white/5 hover:border-emeraldAccent/20 hover:bg-emeraldAccent/[0.02] transition-all group flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-emeraldAccent/10 flex items-center justify-center text-emeraldAccent border border-emeraldAccent/20">
              <FiActivity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-500">DEVELOPMENT TIME</div>
              <div className="text-2xl font-bold text-white group-hover:text-emeraldAccent transition-colors">24 / 7 Live</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
