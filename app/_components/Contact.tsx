'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { contact } from '@/app/_content/site';

const fadeRise = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
      delay: i * 0.08,
    },
  }),
};

export default function Contact() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleEmailClick = useCallback(() => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
    window.location.href = `mailto:${contact.email}`;
  }, []);

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6"
      aria-label="Contact"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeRise}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          >
            <span className="text-caption text-ink3 font-medium">
              {contact.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            custom={1}
            variants={fadeRise}
            className="text-display-section font-display text-ink mb-6"
          >
            {contact.headline}
          </motion.h2>

          {/* Body */}
          <motion.p
            custom={2}
            variants={fadeRise}
            className="text-body-l text-ink2 mb-10 max-w-xl mx-auto"
          >
            {contact.body}
          </motion.p>

          {/* Email pill */}
          <motion.div custom={3} variants={fadeRise} className="relative inline-block">
            <a
              href={`mailto:${contact.email}`}
              onClick={(e) => {
                e.preventDefault();
                handleEmailClick();
              }}
              className="
                inline-flex items-center gap-3
                rounded-full bg-surface px-8 py-4
                text-lg font-medium text-ink
                shadow-[0_0_80px_rgba(255,90,31,0.25)]
                transition-all duration-200 ease-out
                hover:shadow-[0_0_100px_rgba(255,90,31,0.35)]
                hover:-translate-y-0.5
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
              "
              aria-label={`Send email to ${contact.email}`}
            >
              <svg
                className="h-5 w-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              {contact.email}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast notification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={toastVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' as const }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-full bg-dark text-darkInk px-6 py-3 text-sm font-medium shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          Opening your email...
        </div>
      </motion.div>
    </section>
  );
}
