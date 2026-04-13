'use client';

import { motion } from 'framer-motion';
import { Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { howItWorks } from '@/app/_content/site';
import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  Phone: <Phone className="h-5 w-5 text-darkInk" strokeWidth={1.5} />,
  MessageSquare: <MessageSquare className="h-5 w-5 text-darkInk" strokeWidth={1.5} />,
  CalendarCheck: <CalendarCheck className="h-5 w-5 text-darkInk" strokeWidth={1.5} />,
};

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

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 px-6"
      aria-label="How it works"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.div
            custom={0}
            variants={fadeRise}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          >
            <span className="text-caption text-ink3 font-medium">
              {howItWorks.eyebrow}
            </span>
          </motion.div>
          <motion.h2
            custom={1}
            variants={fadeRise}
            className="text-display-section font-display text-ink"
          >
            {howItWorks.headline}
          </motion.h2>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {howItWorks.steps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index + 2}
              variants={fadeRise}
              className="
                bg-surface rounded-4xl p-8
                shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                transition-all duration-200 ease-out
                hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]
              "
            >
              <span className="text-caption text-accent font-semibold block mb-5">
                {step.number}
              </span>

              <div className="w-11 h-11 rounded-2xl bg-dark flex items-center justify-center mb-5">
                {iconMap[step.icon]}
              </div>

              <h3 className="text-[1.25rem] font-semibold text-ink mb-2 font-sans">
                {step.title}
              </h3>

              <p className="text-body-m text-ink2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
