'use client';

import { motion } from 'framer-motion';
import { featureBento } from '@/app/_content/site';

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

function PulseAnimation() {
  return (
    <div className="absolute top-8 right-8 md:top-10 md:right-10" aria-hidden="true">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-ring motion-reduce:animate-none" />
        <div className="absolute inset-2 rounded-full bg-accent/30 animate-pulse-ring motion-reduce:animate-none" style={{ animationDelay: '0.5s' }} />
        <div className="absolute inset-[14px] rounded-full bg-accent" />
      </div>
    </div>
  );
}

export default function FeatureBento() {
  return (
    <section
      className="py-24 md:py-32 px-6"
      aria-label="Capabilities"
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
              {featureBento.eyebrow}
            </span>
          </motion.div>
          <motion.h2
            custom={1}
            variants={fadeRise}
            className="text-display-section font-display text-ink"
          >
            {featureBento.headline}
          </motion.h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4"
        >
          {featureBento.cards.map((card, index) => {
            const isDark = card.variant === 'dark';
            const isAccent = card.variant === 'accent';
            const isLarge = card.span === 'large';

            return (
              <motion.div
                key={card.title}
                custom={index + 2}
                variants={fadeRise}
                className={`
                  relative overflow-hidden
                  rounded-4xl p-8 md:p-10
                  transition-all duration-200 ease-out
                  hover:-translate-y-1
                  ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}
                  ${isDark
                    ? 'bg-dark text-darkInk shadow-[0_0_80px_rgba(255,90,31,0.15)]  hover:shadow-[0_0_100px_rgba(255,90,31,0.25)]'
                    : isAccent
                      ? 'bg-surface shadow-[0_0_60px_rgba(255,90,31,0.12)] hover:shadow-[0_0_80px_rgba(255,90,31,0.2)]'
                      : 'bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]'
                  }
                `}
              >
                {/* Decorative pulse on the dark 24/7 card */}
                {isDark && <PulseAnimation />}

                <h3 className={`text-[1.25rem] font-semibold mb-2 font-sans ${isDark ? 'text-darkInk' : 'text-ink'}`}>
                  {card.title}
                </h3>

                <p className={`text-body-m max-w-md ${isDark ? 'text-darkInk/70' : 'text-ink2'}`}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
