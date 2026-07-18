import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiLayers, FiBriefcase, FiMail, FiGithub } from 'react-icons/fi';

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { label: 'Home', icon: <FiHome />, href: '#hero' },
    { label: 'About', icon: <FiUser />, href: '#about' },
    { label: 'Skills', icon: <FiLayers />, href: '#skills' },
    { label: 'Projects', icon: <FiCode />, href: '#projects' },
    { label: 'Experience', icon: <FiBriefcase />, href: '#experience' },
    { label: 'Contact', icon: <FiMail />, href: '#contact' },
    { label: 'GitHub', icon: <FiGithub />, href: 'https://github.com', external: true },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex h-16 items-end gap-4 rounded-2xl glassmorphism px-4 pb-3 z-50 border border-white/15"
    >
      {items.map((item, idx) => (
        <DockIcon key={idx} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
}

function DockIcon({ mouseX, label, icon, href, external }) {
  const ref = useRef(null);

  // Compute distance from cursor to scale icon dynamically
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = (e) => {
    if (external) return;
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      style={{ width, height }}
      className="group relative flex items-center justify-center rounded-full bg-neutral-900/60 text-white border border-white/5 hover:border-emeraldAccent/30 hover:bg-emeraldAccent/10 hover:text-emeraldAccent transition-colors"
    >
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-neutral-950 px-2 py-1 text-xs text-white border border-white/10 group-hover:scale-100 transition-all">
        {label}
      </span>
      <div className="flex items-center justify-center text-lg md:text-xl">
        {icon}
      </div>
    </motion.a>
  );
}
