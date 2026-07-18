import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[90] transition-all duration-300 ${
          scrolled 
            ? 'bg-darkBg/70 backdrop-blur-md border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2 group font-mono text-lg font-bold tracking-tight">
            <span className="text-emeraldAccent">&lt;</span>
            <span className="text-white group-hover:text-indigoAccent transition-colors">Aditya.OS</span>
            <span className="text-emeraldAccent">/&gt;</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-neutral-400 hover:text-white hover:text-glow-emerald transition-all font-medium relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emeraldAccent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA & Socials */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="ml-2 bg-gradient-to-r from-indigoAccent to-emeraldAccent text-darkBg font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] transition-shadow duration-300"
              >
                Hire Me
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-emeraldAccent transition-colors p-1"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-[80] md:hidden glassmorphism border-b border-white/10 p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base text-neutral-300 hover:text-emeraldAccent transition-colors font-medium py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="h-[1px] bg-white/5" />
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                  <FiGithub className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-emeraldAccent text-darkBg font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
