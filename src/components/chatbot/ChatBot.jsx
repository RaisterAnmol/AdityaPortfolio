import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiTerminal } from 'react-icons/fi';
import { chatResponses, fallbackResponse } from '../../data/chatData';

export default function ChatBot({ forceTopic, clearForceTopic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Aditya.OS Terminal ChatBot ready. Ask me anything or click a preset command below!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (forceTopic) {
      setIsOpen(true);
      handleTriggerTopic(forceTopic);
      clearForceTopic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceTopic]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleTriggerTopic = (topic) => {
    const matched = chatResponses.find(r => r.keywords.includes(topic));
    if (matched) {
      setMessages(prev => [...prev, { sender: 'user', text: matched.question }]);
      simulateBotReply(matched.answer);
    }
  };

  const simulateBotReply = (answerText) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: answerText }]);
    }, 1200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    // Search keywords
    const normalized = userText.toLowerCase();
    let reply = fallbackResponse;

    for (const res of chatResponses) {
      if (res.keywords.some(k => normalized.includes(k))) {
        reply = res.answer;
        break;
      }
    }

    simulateBotReply(reply);
  };

  return (
    <>
      {/* Floating Toggle Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-indigoAccent to-emeraldAccent flex items-center justify-center text-darkBg shadow-[0_0_20px_rgba(0,255,153,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 z-40 transition-all duration-300"
        title="Open System ChatBot"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageSquare className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[380px] h-[480px] glassmorphism-indigo rounded-2xl border border-indigoAccent/20 flex flex-col z-40 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-neutral-950/80 px-4 py-3.5 border-b border-white/5">
              <div className="flex items-center gap-2 text-indigoAccent">
                <FiTerminal className="w-4 h-4 text-emeraldAccent animate-pulse" />
                <span className="font-mono text-xs font-semibold tracking-wider text-white">aditya_chatbot.sh</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 text-xs font-mono border ${
                      m.sender === 'user'
                        ? 'bg-indigoAccent/15 border-indigoAccent/30 text-white'
                        : 'bg-neutral-900/80 border-white/5 text-neutral-300'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-900/80 border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Preset Action Bubbles */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-neutral-950/20">
              <button onClick={() => handleTriggerTopic('skills')} className="text-[10px] font-mono border border-white/5 hover:border-emeraldAccent/30 hover:bg-emeraldAccent/5 px-2 py-1 rounded-full text-neutral-400 hover:text-emeraldAccent transition-colors">
                skills
              </button>
              <button onClick={() => handleTriggerTopic('projects')} className="text-[10px] font-mono border border-white/5 hover:border-emeraldAccent/30 hover:bg-emeraldAccent/5 px-2 py-1 rounded-full text-neutral-400 hover:text-emeraldAccent transition-colors">
                projects
              </button>
              <button onClick={() => handleTriggerTopic('experience')} className="text-[10px] font-mono border border-white/5 hover:border-emeraldAccent/30 hover:bg-emeraldAccent/5 px-2 py-1 rounded-full text-neutral-400 hover:text-emeraldAccent transition-colors">
                timeline
              </button>
              <button onClick={() => handleTriggerTopic('contact')} className="text-[10px] font-mono border border-white/5 hover:border-emeraldAccent/30 hover:bg-emeraldAccent/5 px-2 py-1 rounded-full text-neutral-400 hover:text-emeraldAccent transition-colors">
                contact
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-neutral-950/80 border-t border-white/5 flex gap-2">
              <input
                type="text"
                placeholder="Query system (e.g. 'tell me about skills')..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-neutral-900 border border-white/5 hover:border-white/10 focus:border-indigoAccent/30 rounded-lg px-3 py-2 text-xs font-mono text-white outline-none placeholder-neutral-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-indigoAccent hover:bg-indigoAccent/80 text-white rounded-lg px-3.5 flex items-center justify-center transition-colors"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
