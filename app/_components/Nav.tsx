'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { nav } from '@/app/_content/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className={`
          inline-flex items-center gap-8 rounded-full px-6 py-3
          bg-white/70 backdrop-blur-xl border border-line/60
          transition-shadow duration-300 ease-out
          ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.08)]' : 'shadow-[0_4px_16px_rgba(0,0,0,0.04)]'}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <span className="font-display text-xl text-ink select-none">
          {nav.wordmark}
        </span>

        <button
          onClick={handleContactClick}
          className="
            rounded-full bg-ink text-white px-5 py-2
            text-sm font-medium
            transition-all duration-200 ease-out
            hover:bg-ink/90 hover:shadow-[0_4px_16px_rgba(10,10,10,0.2)]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
          "
        >
          {nav.cta}
        </button>
      </motion.nav>
    </header>
  );
}
