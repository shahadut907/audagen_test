'use client';

import { whyAudagen } from '@/app/_content/site';
import { Reveal } from '@/app/_components/ui/Reveal';
import { X, Check } from 'lucide-react';

/* ─────────────────────────── Pillar bento card ─────────────────────────── */

function PillarCard({
  number,
  title,
  body,
  variant,
}: (typeof whyAudagen.pillars)[number]) {
  const isDark = variant === 'large-dark';
  const isLargeGlow = variant === 'large-glow';
  const isLarge = isDark || isLargeGlow;

  return (
    <div
      className={`
        relative overflow-hidden h-full
        rounded-4xl p-8 md:p-10
        transition-all duration-300 ease-out
        hover:-translate-y-1
        ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}
        ${
          isDark
            ? 'bg-dark text-darkInk shadow-[0_0_80px_rgba(255,90,31,0.15)] hover:shadow-[0_0_100px_rgba(255,90,31,0.25)]'
            : isLargeGlow
              ? 'bg-surface shadow-[0_0_60px_rgba(255,90,31,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
              : 'bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
        }
      `}
    >
      {/* Decorative pulsing dot on dark card */}
      {isDark && (
        <div className="absolute top-8 right-8 md:top-10 md:right-10" aria-hidden="true">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-ring motion-reduce:animate-none" />
            <div
              className="absolute inset-2 rounded-full bg-accent/30 animate-pulse-ring motion-reduce:animate-none"
              style={{ animationDelay: '0.5s' }}
            />
            <div className="absolute inset-[12px] rounded-full bg-accent" />
          </div>
        </div>
      )}

      <span className={`text-caption font-medium block mb-4 ${isDark ? 'text-accent' : 'text-accent'}`}>
        {number}
      </span>

      <h3
        className={`text-[1.25rem] md:text-[1.5rem] font-semibold mb-3 font-sans ${
          isDark ? 'text-darkInk' : 'text-ink'
        }`}
      >
        {title}
      </h3>

      <p className={`text-body-m max-w-lg ${isDark ? 'text-darkInk/70' : 'text-ink2'}`}>
        {body}
      </p>
    </div>
  );
}

/* ─────────────────────────── Comparison column ─────────────────────────── */

function ComparisonColumn({
  variant,
}: {
  variant: 'them' | 'us';
}) {
  const isUs = variant === 'us';
  const data = isUs ? whyAudagen.comparison.us : whyAudagen.comparison.them;

  return (
    <div
      className={`
        rounded-4xl p-8 md:p-10
        transition-all duration-300 ease-out
        ${
          isUs
            ? 'bg-surface border border-accent/20 shadow-[0_0_60px_rgba(255,90,31,0.12)]'
            : 'bg-bg/60 border border-line'
        }
      `}
    >
      <span
        className={`text-caption font-medium block mb-4 ${
          isUs ? 'text-accent' : 'text-ink3'
        }`}
      >
        {data.caption}
      </span>

      <h3 className="text-[1.25rem] md:text-[1.375rem] font-semibold font-sans text-ink mb-6">
        {data.title}
      </h3>

      <ul className="space-y-4">
        {data.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className={`
                flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center
                ${isUs ? 'bg-accent text-white' : 'bg-line text-ink3'}
              `}
            >
              {isUs ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} />}
            </span>
            <span className={`text-body-m ${isUs ? 'text-ink' : 'text-ink2'}`}>
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────── Main section ─────────────────────────── */

export default function WhyAudagen() {
  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      aria-label="Why Audagen"
    >
      {/* Subtle peach gradient wash */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] max-w-[1000px]
                      rounded-full bg-accent3 opacity-[0.15] blur-[150px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <Reveal delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-caption text-ink3 font-medium">
                {whyAudagen.eyebrow}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-display-section font-display text-ink">
              {whyAudagen.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-body-l text-ink2 max-w-2xl mx-auto mt-6">
              {whyAudagen.sub}
            </p>
          </Reveal>
        </div>

        {/* ── Sub-block 1: Four trust-point bento cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 mb-20 md:mb-28">
          {whyAudagen.pillars.map((pillar, index) => {
            const isLarge =
              pillar.variant === 'large-dark' || pillar.variant === 'large-glow';

            return (
              <Reveal
                key={pillar.number}
                delay={0.1 + index * 0.1}
                className={isLarge ? 'md:col-span-2' : 'md:col-span-1'}
              >
                <PillarCard {...pillar} />
              </Reveal>
            );
          })}
        </div>

        {/* ── Sub-block 2: Manifesto ── */}
        <Reveal y={48} delay={0.1}>
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-caption text-ink3 font-medium">
                {whyAudagen.manifesto.eyebrow}
              </span>
            </div>

            <blockquote className="font-display text-2xl md:text-4xl leading-snug text-ink">
              &ldquo;{whyAudagen.manifesto.quote}&rdquo;
            </blockquote>

            {/* Horizontal divider */}
            <div className="mx-auto mt-8 mb-4 w-6 h-px bg-accent" aria-hidden="true" />

            <p className="text-caption text-ink3">
              &mdash; {whyAudagen.manifesto.attribution}
            </p>
          </div>
        </Reveal>

        {/* ── Sub-block 3: Differentiation (two-column comparison) ── */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0.1}>
              <ComparisonColumn variant="them" />
            </Reveal>
            <Reveal delay={0.2}>
              <ComparisonColumn variant="us" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
