import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../contexts/OSContext';
import { FiInfo, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

export default function NotificationCenter() {
  const { notifications } = useOS();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-emeraldAccent w-4 h-4" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500 w-4 h-4" />;
      default:
        return <FiInfo className="text-indigoAccent w-4 h-4" />;
    }
  };

  return (
    <div className="fixed top-16 right-6 w-80 max-w-[90vw] space-y-3 z-[999] pointer-events-none select-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glassmorphism rounded-xl p-4 border border-white/10 flex items-center gap-3 shadow-xl backdrop-blur-md pointer-events-auto"
          >
            <div className="shrink-0">{getIcon(n.type)}</div>
            <div className="font-mono text-xs text-neutral-200 font-medium">
              {n.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
