import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Core Shell Components
import Loader from './components/ui/Loader';
import Cursor from './components/ui/Cursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Background from './components/background/Background';
import ThemeGlow from './components/common/ThemeGlow';
import Navbar from './components/ui/Navbar';
import FloatingDock from './components/ui/FloatingDock';
import CommandPalette from './components/ui/CommandPalette';
import ChatBot from './components/chatbot/ChatBot';

// Page Sections
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chatTopic, setChatTopic] = useState(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  const handleChatTrigger = (topic) => {
    setChatTopic(topic);
  };

  const clearChatTopic = () => {
    setChatTopic(null);
  };

  return (
    <>
      {/* 1. Loading Diagnostic Screen */}
      <Loader onFinish={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen text-white select-none">
          {/* 2. Custom Cursor physics */}
          <Cursor />

          {/* 3. Top progress bar */}
          <ScrollProgress />

          {/* 4. Background Matrix (Glow, Particles, Grid overlay) */}
          <Background />
          <ThemeGlow />

          {/* 5. Navigation menu */}
          <Navbar />

          {/* 6. Main Portfolio Layout */}
          <main className="relative z-10 w-full overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>

          {/* 7. Footer metadata */}
          <Footer />

          {/* 8. Command Palette and OS accessories */}
          <CommandPalette onChatTrigger={handleChatTrigger} />
          <FloatingDock />
          <ChatBot forceTopic={chatTopic} clearForceTopic={clearChatTopic} />
        </div>
      )}
    </>
  );
}
