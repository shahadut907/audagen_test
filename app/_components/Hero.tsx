'use client';

import { motion } from 'framer-motion';
import { hero } from '@/app/_content/site';
import VoiceDemoCard from '@/app/_components/VoiceDemoCard';
import { Reveal } from '@/app/_components/ui/Reveal';

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
      className="relative md:min-h-screen flex items-center justify-center overflow-hidden isolate"
      aria-label="Hero"
    >
      <MeshGradient />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28 w-full">
        {/* Two-column grid on desktop, stacked on mobile */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column — text content */}
          <div className="text-center md:text-left">
            {/* Eyebrow pill */}
            <Reveal delay={0}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <span className="block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-caption text-accent font-medium">
                  {hero.eyebrow}
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.1}>
              <h1 className="text-display-hero font-display text-ink mb-6">
                {hero.headline}
              </h1>
            </Reveal>

            {/* Subheadline */}
            <Reveal delay={0.2}>
              <p className="text-body-l text-ink2 max-w-2xl mb-10">
                {hero.subhead}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.3}>
              <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
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
              </div>
            </Reveal>
          </div>

          {/* Right column — Voice Demo Card */}
          <Reveal delay={0.4} className="flex justify-center md:justify-end">
            <VoiceDemoCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
