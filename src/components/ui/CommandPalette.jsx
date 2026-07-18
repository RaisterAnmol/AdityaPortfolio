import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiTerminal, FiUser, FiCode, FiBriefcase, FiMail, FiGithub, FiLayers } from 'react-icons/fi';

export default function CommandPalette({ onChatTrigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const items = [
    { name: 'Go to Hero Section', action: () => scrollToSection('hero'), icon: <FiUser /> },
    { name: 'Read About Biography', action: () => scrollToSection('about'), icon: <FiUser /> },
    { name: 'Browse Tech Skills', action: () => scrollToSection('skills'), icon: <FiLayers /> },
    { name: 'Explore Portfolio Projects', action: () => scrollToSection('projects'), icon: <FiCode /> },
    { name: 'View Work History Timeline', action: () => scrollToSection('experience'), icon: <FiBriefcase /> },
    { name: 'Contact Aditya', action: () => scrollToSection('contact'), icon: <FiMail /> },
    { name: 'Ask AI: "Tell me about Aditya"', action: () => handleChat('about'), icon: <FiTerminal /> },
    { name: 'Ask AI: "What technologies does he use?"', action: () => handleChat('skills'), icon: <FiTerminal /> },
    { name: 'Ask AI: "Are there clone projects?"', action: () => handleChat('projects'), icon: <FiTerminal /> },
    { name: 'Open Project Repository', action: () => window.open('https://github.com', '_blank'), icon: <FiGithub /> },
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChat = (topic) => {
    setIsOpen(false);
    if (onChatTrigger) {
      onChatTrigger(topic);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Floating Shortcut Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 glassmorphism text-xs text-neutral-400 hover:text-emeraldAccent hover:border-emeraldAccent/30 py-2.5 px-4 rounded-full flex items-center gap-2 z-[40] transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-pulse" />
        <span>Press</span>
        <kbd className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded text-[10px]">⌘</kbd>
        <span>+</span>
        <kbd className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded text-[10px]">K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg glassmorphism-indigo rounded-2xl overflow-hidden shadow-2xl border border-indigoAccent/25"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 border-b border-white/5 py-4">
                <FiSearch className="text-indigoAccent w-5 h-5" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or ask a question..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-white outline-none border-none text-sm placeholder-neutral-400"
                />
              </div>

              {/* Items List */}
              <div className="max-h-[300px] overflow-y-auto p-2 scrollbar">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-neutral-900/50 group transition-all"
                    >
                      <div className="flex items-center gap-3 text-neutral-300 group-hover:text-emeraldAccent">
                        <span className="text-neutral-400 group-hover:text-emeraldAccent">
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <FiArrowRight className="text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all w-4 h-4" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-6 text-neutral-500 text-sm">
                    No results found for "{search}"
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center px-4 py-2.5 bg-neutral-950/80 border-t border-white/5 text-[10px] text-neutral-500">
                <span>Use arrows to navigate, enter to select</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
