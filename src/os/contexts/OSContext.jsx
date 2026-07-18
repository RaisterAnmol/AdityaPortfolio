import React, { createContext, useContext, useState, useEffect } from 'react';

const OSContext = createContext(null);

export const themes = {
  'cyber-green': {
    name: 'Cyber Green',
    accent: '#00FF99',
    bg: '#050505',
    card: 'rgba(10, 10, 10, 0.45)',
    border: 'rgba(0, 255, 153, 0.15)',
    glow: 'rgba(0, 255, 153, 0.3)',
    text: '#ffffff',
    sub: '#a3a3a3'
  },
  'midnight-blue': {
    name: 'Midnight Blue',
    accent: '#3B82F6',
    bg: '#020617',
    card: 'rgba(15, 23, 42, 0.45)',
    border: 'rgba(59, 130, 246, 0.15)',
    glow: 'rgba(59, 130, 246, 0.3)',
    text: '#f8fafc',
    sub: '#94a3b8'
  },
  'purple-neon': {
    name: 'Purple Neon',
    accent: '#D946EF',
    bg: '#0d0214',
    card: 'rgba(20, 5, 30, 0.45)',
    border: 'rgba(217, 70, 239, 0.15)',
    glow: 'rgba(217, 70, 239, 0.3)',
    text: '#fdf4ff',
    sub: '#c084fc'
  },
  'amber': {
    name: 'Amber',
    accent: '#F59E0B',
    bg: '#0c0701',
    card: 'rgba(25, 15, 5, 0.45)',
    border: 'rgba(245, 158, 11, 0.15)',
    glow: 'rgba(245, 158, 11, 0.3)',
    text: '#fffbeb',
    sub: '#fbbf24'
  },
  'matrix': {
    name: 'Matrix',
    accent: '#22C55E',
    bg: '#000000',
    card: 'rgba(0, 5, 0, 0.6)',
    border: 'rgba(34, 197, 94, 0.25)',
    glow: 'rgba(34, 197, 94, 0.4)',
    text: '#22C55E',
    sub: '#15803d'
  }
};

export function OSProvider({ children }) {
  const [themeName, setThemeName] = useState('cyber-green');
  const [notifications, setNotifications] = useState([]);
  const [muted, setMuted] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);

  // Initialize Audio Context on user click to comply with browser autoplay policies
  useEffect(() => {
    const handleUnlock = () => {
      if (!audioCtx) {
        setAudioCtx(new (window.AudioContext || window.webkitAudioContext)());
      }
    };
    window.addEventListener('click', handleUnlock, { once: true });
    return () => window.removeEventListener('click', handleUnlock);
  }, [audioCtx]);

  const activeTheme = themes[themeName];

  // Inject CSS Variables dynamically
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', activeTheme.accent);
    root.style.setProperty('--bg-color', activeTheme.bg);
    root.style.setProperty('--card-color', activeTheme.card);
    root.style.setProperty('--border-color', activeTheme.border);
    root.style.setProperty('--glow-color', activeTheme.glow);
    root.style.setProperty('--text-color', activeTheme.text);
    root.style.setProperty('--sub-color', activeTheme.sub);
  }, [activeTheme]);

  // Audio Synthesizer using Web Audio API
  const playSound = (type) => {
    if (muted || !audioCtx) return;

    // Resume if suspended (browser behavior)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (type) {
      case 'click':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;

      case 'hover':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(250, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;

      case 'window':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.25);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;

      case 'notification':
        // Double beep
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1000, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.setValueAtTime(0.001, now + 0.08);
        gain.gain.setValueAtTime(0.06, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.frequency.setValueAtTime(1200, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.2);
        break;

      default:
        break;
    }
  };

  const addNotification = (text, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, text, type }]);
    playSound('notification');

    // Auto clear
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3500);
  };

  return (
    <OSContext.Provider
      value={{
        themeName,
        setThemeName,
        activeTheme,
        notifications,
        addNotification,
        muted,
        setMuted: (val) => {
          setMuted(val);
          if (!val) playSound('click');
        },
        playSound
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) throw new Error('useOS must be used within an OSProvider');
  return context;
}
