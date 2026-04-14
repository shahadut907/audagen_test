'use client';

import { featureBento } from '@/app/_content/site';
import { Reveal } from '@/app/_components/ui/Reveal';

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
      className="py-20 md:py-28 px-6 bg-bg"
      aria-label="Capabilities"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <Reveal delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <span className="text-caption text-ink3 font-medium">
                {featureBento.eyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display-section font-display text-ink">
              {featureBento.headline}
            </h2>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          {featureBento.cards.map((card, index) => {
            const isDark = card.variant === 'dark';
            const isAccent = card.variant === 'accent';
            const isLarge = card.span === 'large';

            return (
              <Reveal key={card.title} delay={0.2 + index * 0.1} className={isLarge ? 'md:col-span-2' : 'md:col-span-1'}>
                <div
                  className={`
                    relative overflow-hidden h-full
                    rounded-4xl p-8 md:p-10
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    ${isDark
                      ? 'bg-dark text-darkInk shadow-[0_0_80px_rgba(255,90,31,0.15)] hover:shadow-[0_0_100px_rgba(255,90,31,0.25)]'
                      : isAccent
                        ? 'bg-surface shadow-[0_0_60px_rgba(255,90,31,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
                        : 'bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
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
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
