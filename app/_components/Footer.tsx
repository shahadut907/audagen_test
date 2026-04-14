'use client';

import Link from 'next/link';
import { footer } from '@/app/_content/site';
import { Reveal } from '@/app/_components/ui/Reveal';
import type { ReactNode } from 'react';

/* ─── Inline brand SVGs (lucide-react v1.x dropped brand icons) ─── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Social icon map ─── */
const socialIconMap: Record<string, ReactNode> = {
  x: <XIcon className="w-4 h-4" />,
  linkedin: <LinkedInIcon className="w-4 h-4" />,
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      {/* ── Block 1: Closing CTA (unchanged) ── */}
      <Reveal>
        <div className="max-w-4xl mx-auto text-center px-6 pt-24 pb-16">
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

      {/* ── Block 2: Link Row (moved up, above wordmark) ── */}
      <div className="border-b border-line/40">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <span className="font-display text-2xl text-ink block mb-3">
              {footer.brand.wordmark}
            </span>
            <p className="text-sm text-ink2 leading-relaxed max-w-xs">
              {footer.brand.description}
            </p>
          </div>

          {/* 3 link columns */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {footer.linkColumns.map((column) => (
              <div key={column.header}>
                <span className="text-xs uppercase tracking-[0.12em] text-ink3 font-medium mb-4 block">
                  {column.header}
                </span>
                <ul className="space-y-0.5">
                  {column.links.map((link) => {
                    const isExternal = 'external' in link && link.external;
                    const isAnchor = link.href.startsWith('#');
                    const isMailto = link.href.startsWith('mailto:');

                    if (isExternal || isMailto) {
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            {...(isExternal
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="text-sm text-ink2 hover:text-ink transition-colors block py-1.5"
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    }

                    if (isAnchor) {
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-sm text-ink2 hover:text-ink transition-colors block py-1.5"
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-ink2 hover:text-ink transition-colors block py-1.5"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Social pills */}
          <div className="md:col-span-2 flex md:justify-end items-start gap-2">
            {footer.social.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-line
                           flex items-center justify-center
                           hover:bg-ink hover:text-white hover:border-ink
                           transition-all duration-200 shadow-sm"
                aria-label={s.label}
              >
                {socialIconMap[s.platform]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Block 3: Giant Wordmark with scoped gradient wash ── */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Gradient wash background — subtle warm peach sunrise */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-20%]
                       w-[90vw] h-[50vw] max-w-[1400px] rounded-full
                       bg-accent3 opacity-40 blur-[140px]"
          />
          <div
            className="absolute left-[20%] bottom-[-30%]
                       w-[50vw] h-[40vw] max-w-[900px] rounded-full
                       bg-accent opacity-15 blur-[160px]"
          />
        </div>

        {/* Wordmark container with dedicated breathing room */}
        <div className="py-16 md:py-24 px-4">
          <h2
            className="font-display text-ink leading-[0.85] text-center tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(7rem, 24vw, 22rem)' }}
            aria-hidden="true"
          >
            {footer.brand.wordmark}
          </h2>
        </div>
      </div>

      {/* ── Block 4: Bottom meta strip ── */}
      <div className="border-t border-line/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ink3 text-xs uppercase tracking-[0.12em]">
            {footer.copyright}
          </p>
          <p className="text-ink3 text-xs uppercase tracking-[0.12em]">
            {footer.metaTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
