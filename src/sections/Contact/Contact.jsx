import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiLoader, FiTerminal } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import SectionHeading from '../../components/common/SectionHeading';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please populate Name, Email, and Message fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please input a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateForm()) return;

    setStatus('loading');

    // EmailJS integration configuration.
    // In production, the user will configure actual service/template/public keys inside a .env file.
    // If not configured, we simulate a successful email dispatch after 1.5s for demonstration robustness.
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_demo';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_demo';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (publicKey) {
      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then(() => {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        })
        .catch((err) => {
          console.error(err);
          setStatus('error');
          setErrorMsg('Failed to dispatch mail. Please check connection.');
        });
    } else {
      // Simulation mode
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 w-full max-w-7xl mx-auto z-20">
      <SectionHeading 
        number="05" 
        title="Establish Contact" 
        subtitle="Let's build something futuristic. Fill the handshake fields to begin." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
        {/* Left Side: Contact Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col justify-between"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-neutral-400">INPUT_NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full bg-neutral-900/60 border border-white/5 hover:border-white/10 focus:border-emeraldAccent/30 rounded-xl px-4 py-3 text-sm text-white outline-none placeholder-neutral-500 transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-neutral-400">INPUT_EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@domain.com"
                  className="w-full bg-neutral-900/60 border border-white/5 hover:border-white/10 focus:border-emeraldAccent/30 rounded-xl px-4 py-3 text-sm text-white outline-none placeholder-neutral-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-neutral-400">INPUT_SUBJECT</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Project Consultation"
                className="w-full bg-neutral-900/60 border border-white/5 hover:border-white/10 focus:border-emeraldAccent/30 rounded-xl px-4 py-3 text-sm text-white outline-none placeholder-neutral-500 transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-neutral-400">INPUT_MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows="5"
                className="w-full bg-neutral-900/60 border border-white/5 hover:border-white/10 focus:border-emeraldAccent/30 rounded-xl px-4 py-3 text-sm text-white outline-none placeholder-neutral-500 transition-colors resize-none"
                required
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="text-red-500 text-xs font-mono">
                {`[ERROR]: ${errorMsg}`}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-gradient-to-r from-indigoAccent to-emeraldAccent text-darkBg font-bold text-xs tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] disabled:opacity-50 disabled:shadow-none transition-all duration-300"
            >
              {status === 'loading' ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>DISPATCHED_SUCCESSFULLY</span>
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  <span>DISPATCH_MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Side: Live Terminal JSON Preview (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 glassmorphism-indigo rounded-2xl p-6 border border-indigoAccent/15 flex flex-col justify-between font-mono"
        >
          {/* Topbar */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2 text-indigoAccent">
              <FiTerminal className="w-4 h-4" />
              <span className="text-[10px] text-white font-semibold">payload_compiler.json</span>
            </div>
            <span className="text-[9px] text-neutral-500">LIVE PREVIEW</span>
          </div>

          {/* JSON Body */}
          <div className="text-[11px] md:text-xs text-neutral-400 space-y-1.5 flex-grow">
            <div><span className="text-emeraldAccent">const</span> messagePayload = &#123;</div>
            <div className="pl-4">name: <span className="text-indigoAccent">"{formData.name || 'Aditya'}"</span>,</div>
            <div className="pl-4">email: <span className="text-indigoAccent">"{formData.email || 'aditya@domain.com'}"</span>,</div>
            <div className="pl-4">subject: <span className="text-indigoAccent">"{formData.subject || 'Consultation'}"</span>,</div>
            <div className="pl-4">message: <span className="text-indigoAccent">"{formData.message || 'Connecting...'}"</span>,</div>
            <div className="pl-4">timestamp: <span className="text-indigoAccent">"{new Date().toISOString()}"</span></div>
            <div>&#125;;</div>
          </div>

          {/* Status logs */}
          <div className="border-t border-white/5 pt-4 mt-6 text-[10px] text-neutral-500 space-y-1">
            <div>STATUS: {status.toUpperCase()}</div>
            {status === 'success' && <div className="text-emeraldAccent">&gt; MESSAGE TRANSMITTED TO ADITYA</div>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
