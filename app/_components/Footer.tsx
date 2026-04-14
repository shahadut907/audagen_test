'use client';

import { footer } from '@/app/_content/site';
import { Reveal } from '@/app/_components/ui/Reveal';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg pt-24 pb-10">
      {/* Background gradient wash */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Big peach blob bottom-left */}
        <div
          className="absolute bottom-[-30%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px]
                      rounded-full bg-accent3 opacity-50 blur-[140px]"
        />
        {/* Warmer orange blob bottom-right */}
        <div
          className="absolute bottom-[-20%] right-[-15%] w-[55vw] h-[55vw] max-w-[700px]
                      rounded-full bg-accent2 opacity-35 blur-[150px]"
        />
      </div>

      {/* Top row: closing CTA */}
      <Reveal>
        <div className="max-w-4xl mx-auto text-center px-6 mb-20">
          <p className="font-display text-3xl md:text-5xl text-ink leading-tight">
            {footer.closingHeadline}
          </p>
          <p className="mt-4 text-ink2 text-lg">
            {footer.closingSub}
          </p>
          <a
            href={`mailto:${footer.email}`}
            className="inline-flex items-center gap-2 mt-8 bg-ink text-white rounded-full px-7 py-3.5
                       font-medium hover:scale-105 transition-transform
                       shadow-[0_0_60px_rgba(255,90,31,0.3)]"
          >
            {footer.email}
          </a>
        </div>
      </Reveal>

      {/* Middle: GIANT WORDMARK */}
      <div className="relative max-w-7xl mx-auto px-6 mb-12 select-none">
        <h2
          className="font-display text-ink/10 leading-none text-center"
          style={{ fontSize: 'clamp(6rem, 18vw, 16rem)' }}
          aria-hidden="true"
        >
          {footer.wordmark}
        </h2>
      </div>

      {/* Bottom row: links and copyright */}
      <div
        className="max-w-6xl mx-auto px-6 pt-10 border-t border-line/60
                    flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-ink">{footer.wordmark}</span>
          <span className="text-ink3 text-xs uppercase tracking-[0.12em]">
            {footer.tagline}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-ink2">
          <a
            href={`mailto:${footer.email}`}
            className="hover:text-ink transition-colors"
          >
            {footer.email}
          </a>
        </div>

        <p className="text-ink3 text-xs uppercase tracking-[0.12em]">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
