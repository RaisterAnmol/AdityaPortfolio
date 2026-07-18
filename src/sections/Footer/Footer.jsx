import React, { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Setup options for developer's GMT+5:30 (India Standard Time)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-darkBg/60 backdrop-blur-sm py-12 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Brand & Status */}
        <div className="text-center md:text-left space-y-2">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="font-mono text-sm font-bold tracking-wider text-white">
            <span className="text-emeraldAccent">&lt;</span>
            <span>Aditya.OS</span>
            <span className="text-emeraldAccent">/&gt;</span>
          </a>
          <p className="text-[10px] text-neutral-500 font-mono">
            BUILD_VER: 2.0.26 // PORTFOLIO_SYS
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono text-emeraldAccent bg-emeraldAccent/5 border border-emeraldAccent/10 px-2 py-1 rounded-full w-fit mx-auto md:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-400 font-mono">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">ABOUT</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="hover:text-white transition-colors">SKILLS</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-white transition-colors">PROJECTS</a>
          <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="hover:text-white transition-colors">TIMELINE</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white transition-colors">CONTACT</a>
        </div>

        {/* Right Side: Clock & Socials */}
        <div className="text-center md:text-right space-y-3 font-mono">
          <div className="text-xs text-neutral-400">
            <span>LOCAL_TIME (IST): </span>
            <span className="text-white font-semibold tabular-nums">{time}</span>
          </div>

          {/* Social icons */}
          <div className="flex justify-center md:justify-end gap-4 text-neutral-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-emeraldAccent transition-colors">
              <FiGithub className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigoAccent transition-colors">
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a href="mailto:aditya@example.com" className="hover:text-emeraldAccent transition-colors">
              <FiMail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500 font-mono">
        <span>DESIGNED & ENGINEERED BY ADITYA © 2026</span>
        <span>TERMS // SECURITY // PRIVACY_OS</span>
      </div>
    </footer>
  );
}
