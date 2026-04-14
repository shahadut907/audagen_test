'use client';

import { Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { howItWorks } from '@/app/_content/site';
import { Reveal } from '@/app/_components/ui/Reveal';
import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  Phone: <Phone className="h-5 w-5 text-darkInk" strokeWidth={1.5} />,
  MessageSquare: <MessageSquare className="h-5 w-5 text-darkInk" strokeWidth={1.5} />,
  CalendarCheck: <CalendarCheck className="h-5 w-5 text-darkInk" strokeWidth={1.5} />,
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 px-6 bg-bg"
      aria-label="How it works"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <Reveal delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <span className="text-caption text-ink3 font-medium">
                {howItWorks.eyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display-section font-display text-ink">
              {howItWorks.headline}
            </h2>
          </Reveal>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {howItWorks.steps.map((step, index) => (
            <Reveal key={step.number} delay={0.2 + index * 0.1}>
              <div
                className="
                  bg-surface rounded-4xl p-8
                  shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
