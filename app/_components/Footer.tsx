'use client';

import Link from 'next/link';
import { footer } from '@/app/_content/site';
import type { ReactNode } from 'react';

/* ─── Inline brand SVGs (lucide-react v1.x dropped brand icons) ─── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
  instagram: <InstagramIcon className="w-4 h-4" />,
  linkedin: <LinkedInIcon className="w-4 h-4" />,
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg">
      {/* ── Subtle top-of-footer gradient wash — bridges Contact → Footer transition ── */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none -z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[-40%]
                     w-[80vw] h-[200px] max-w-[1200px] rounded-full
                     bg-accent3 opacity-20 blur-[100px]"
        />
      </div>

      {/* ── Stronger top border ── */}
      <div className="border-t border-line/80" />

      {/* ── Block 1: Link Row ── */}
      <div className="border-b border-line/40 relative z-10">
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

          {/* Social pills — X, Instagram, LinkedIn */}
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

      {/* ── Block 2: Giant Wordmark with scoped gradient wash ── */}
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

        {/* Wordmark — constrained to match link row max-width */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <h2
            className="font-display text-ink leading-[0.8] text-center tracking-tighter whitespace-nowrap"
            style={{ fontSize: 'clamp(6rem, 22vw, 26rem)' }}
            aria-hidden="true"
          >
            Audagen
          </h2>
        </div>
      </div>

      {/* ── Block 3: Bottom meta strip ── */}
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
