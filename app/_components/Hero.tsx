'use client';

import { motion } from 'framer-motion';
import { hero } from '@/app/_content/site';
import VoiceDemoCard from '@/app/_components/VoiceDemoCard';

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
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base warm cream wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* Orb 1 — pale peach, top-left */}
      <div
        className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px]
                   rounded-full bg-accent3 opacity-70 blur-[80px] md:blur-[120px]
                   animate-drift-1 motion-reduce:animate-none will-change-transform"
      />

      {/* Orb 2 — warm orange, right side */}
      <div
        className="absolute top-[10%] right-[-20%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px]
                   rounded-full bg-accent opacity-55 blur-[80px] md:blur-[140px]
                   animate-drift-2 motion-reduce:animate-none will-change-transform"
      />

      {/* Orb 3 — mid orange, bottom-center */}
      <div
        className="absolute bottom-[-15%] left-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]
                   rounded-full bg-accent2 opacity-60 blur-[80px] md:blur-[130px]
                   animate-drift-3 motion-reduce:animate-none will-change-transform"
      />

      {/* Soft vignette to prevent edges being too vibrant */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/0 to-bg/40" />
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        {/* Two-column grid on desktop, stacked on mobile */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column — text content */}
          <div className="text-center md:text-left">
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
              className="text-body-l text-ink2 max-w-2xl mb-10"
            >
              {hero.subhead}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeRise}
              className="flex items-center gap-4 flex-wrap justify-center md:justify-start"
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

          {/* Right column — Voice Demo Card */}
          <div className="flex justify-center md:justify-end">
            <VoiceDemoCard />
          </div>
        </div>
      </div>
    </section>
  );
}
