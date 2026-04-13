'use client';

import { motion } from 'framer-motion';
import { hero } from '@/app/_content/site';

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

function MeshGradient() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Orange core */}
      <div
        className="
          absolute top-1/4 left-1/3
          w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]
          rounded-full
          bg-accent/30
          blur-[120px]
          animate-drift-1
          motion-reduce:animate-none
        "
      />
      {/* Pink / warm spread */}
      <div
        className="
          absolute top-1/2 right-1/4
          w-[50vw] h-[50vw] max-w-[700px] max-h-[700px]
          rounded-full
          bg-accent2/25
          blur-[140px]
          animate-drift-2
          motion-reduce:animate-none
        "
      />
      {/* Pale orange edge */}
      <div
        className="
          absolute bottom-1/4 left-1/2
          w-[55vw] h-[55vw] max-w-[750px] max-h-[750px]
          rounded-full
          bg-accent3/20
          blur-[160px]
          animate-drift-3
          motion-reduce:animate-none
        "
      />
    </div>
  );
}

export default function Hero() {
  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorksClick = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <MeshGradient />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        {/* Eyebrow pill */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeRise}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
        >
          <span className="block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-caption text-accent font-medium">
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeRise}
          className="text-display-hero font-display text-ink mb-6"
        >
          {hero.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeRise}
          className="text-body-l text-ink2 max-w-2xl mx-auto mb-10"
        >
          {hero.subhead}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeRise}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            onClick={handleContactClick}
            className="
              rounded-full bg-ink text-white px-7 py-3.5
              text-base font-medium
              shadow-[0_0_80px_rgba(255,90,31,0.35)]
              transition-all duration-200 ease-out
              hover:bg-ink/90 hover:shadow-[0_0_100px_rgba(255,90,31,0.45)]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
            "
          >
            {hero.ctaPrimary}
          </button>

          <button
            onClick={handleHowItWorksClick}
            className="
              rounded-full bg-white text-ink px-7 py-3.5
              text-base font-medium
              border border-line
              transition-all duration-200 ease-out
              hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
            "
          >
            {hero.ctaSecondary}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
