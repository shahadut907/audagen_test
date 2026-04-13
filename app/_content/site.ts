export const nav = {
  wordmark: 'Audagen',
  cta: 'Get in touch',
} as const;

export const hero = {
  eyebrow: 'AI VOICE INFRASTRUCTURE',
  headline: 'Voice AI that sounds human.',
  subhead:
    'Audagen builds AI receptionists for service businesses. Calls answered, appointments booked, customers handled — around the clock.',
  ctaPrimary: 'Get in touch',
  ctaSecondary: 'How it works',
} as const;

export const howItWorks = {
  eyebrow: 'HOW IT WORKS',
  headline: 'Three steps. Zero missed calls.',
  steps: [
    {
      number: '01',
      title: 'Call comes in',
      description:
        'A customer dials your business line — from anywhere, at any hour.',
      icon: 'Phone' as const,
    },
    {
      number: '02',
      title: 'Audagen answers',
      description:
        'An AI receptionist picks up instantly, sounds natural, and handles the conversation.',
      icon: 'MessageSquare' as const,
    },
    {
      number: '03',
      title: 'Handoff to you',
      description:
        'Appointment booked, lead captured, notification in your inbox before the call ends.',
      icon: 'CalendarCheck' as const,
    },
  ],
} as const;

export const featureBento = {
  eyebrow: 'CAPABILITIES',
  headline: 'Built for real conversations.',
  cards: [
    {
      title: 'Available 24/7/365',
      description:
        'Nights, weekends, holidays, lunch breaks. Audagen never goes to voicemail.',
      variant: 'dark' as const,
      span: 'large' as const,
    },
    {
      title: 'Natural voice',
      description:
        'Conversational, warm, and indistinguishable from a human receptionist.',
      variant: 'light' as const,
      span: 'small' as const,
    },
    {
      title: 'Books instantly',
      description:
        'Appointments drop straight into your calendar the moment the call ends.',
      variant: 'light' as const,
      span: 'small' as const,
    },
    {
      title: 'Setup in 48 hours',
      description:
        'Forward your existing number, share your business details, go live in two days.',
      variant: 'accent' as const,
      span: 'large' as const,
    },
  ],
} as const;

export const contact = {
  eyebrow: 'GET IN TOUCH',
  headline: 'Talk to us.',
  body: 'We are taking on a limited number of new deployments each month. Reach out and we will reply within one business day.',
  email: 'hello@audagen.com',
} as const;

export const footer = {
  wordmark: 'Audagen',
  tagline: 'AI VOICE RECEPTIONISTS',
  copyright: '\u00A9 2026 Audagen. All rights reserved.',
} as const;
