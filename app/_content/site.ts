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

// TODO: replace when real audio is recorded
export const heroVoiceDemo = {
  audioSrc: '/audio/audagen-intro.mp3',
  label: 'MEET AUDAGEN',
  duration: 18, // seconds, approximate
  transcript: [
    { start: 0.0,  end: 2.5,  text: "Hey, this is Audagen." },
    { start: 2.5,  end: 5.5,  text: "Your AI voice assistant for service businesses." },
    { start: 5.5,  end: 9.0,  text: "I sound natural, I answer every call," },
    { start: 9.0,  end: 12.5, text: "and I book appointments straight to your calendar." },
    { start: 12.5, end: 17.0, text: "Around the clock. Every day. Never a missed customer." },
  ],
} as const;

// TODO: replace when real audio is recorded
export const liveCallDemo = {
  audioSrc: '/audio/audagen-booking-demo.mp3',
  callerName: 'Incoming call',
  callerContext: 'New customer \u00B7 first time booking',
  duration: 45,
  transcript: [
    { start: 0.0,  end: 3.0,  speaker: 'audagen' as const, text: "Hi, thanks for calling Audagen. How can I help you today?" },
    { start: 3.0,  end: 7.5,  speaker: 'caller' as const,  text: "Hey, I'd like to book an appointment for next week if possible." },
    { start: 7.5,  end: 11.0, speaker: 'audagen' as const, text: "Of course. What day works best for you?" },
    { start: 11.0, end: 15.5, speaker: 'caller' as const,  text: "Tuesday afternoon would be ideal." },
    { start: 15.5, end: 21.0, speaker: 'audagen' as const, text: "I have Tuesday at 2pm or 4pm available. Which do you prefer?" },
    { start: 21.0, end: 24.0, speaker: 'caller' as const,  text: "Let's go with 2pm." },
    { start: 24.0, end: 30.0, speaker: 'audagen' as const, text: "Booked. You'll get a confirmation text shortly. Anything else I can help with?" },
    { start: 30.0, end: 33.0, speaker: 'caller' as const,  text: "No, that's perfect. Thanks." },
    { start: 33.0, end: 38.0, speaker: 'audagen' as const, text: "You're welcome. Have a great day." },
  ],
  outcome: {
    title: 'Appointment booked',
    details: 'Tuesday \u00B7 2:00 PM',
    confirmationSent: true,
  },
} as const;

export type TranscriptLine = {
  start: number;
  end: number;
  text: string;
  speaker?: 'audagen' | 'caller';
};

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

export const whyAudagen = {
  eyebrow: 'WHY AUDAGEN',
  headline: 'Built differently. On purpose.',
  sub: 'We are not a call center. We are not a generic chatbot. We are an AI receptionist designed for one job and one job only — making sure your business never misses a customer.',

  pillars: [
    {
      number: '01 — FOCUS',
      title: 'We do one thing. Voice.',
      body: 'While other AI companies build everything from chatbots to image generators, we build voice receptionists. That is it. Every decision we make, every model we tune, every line of code is in service of one thing: making your phone feel like it is always answered.',
      variant: 'large-dark' as const,
    },
    {
      number: '02 — VOICE',
      title: 'Sounds human. For real.',
      body: 'Our agents pause, breathe, and react like a real person. Customers do not realize they are talking to AI until you tell them.',
      variant: 'medium-light' as const,
    },
    {
      number: '03 — SPEED',
      title: 'Live in 48 hours.',
      body: 'Forward your line, share your business details, go live in two days. No long onboarding. No engineering team required.',
      variant: 'medium-light' as const,
    },
    {
      number: '04 — PRICING',
      title: 'What you see is what you pay.',
      body: 'Flat monthly pricing. No per-minute charges that surprise you. No enterprise contact us games. You will know exactly what Audagen costs before you say yes.',
      variant: 'large-glow' as const,
    },
  ],

  manifesto: {
    eyebrow: 'OUR MANIFESTO',
    quote: 'Every missed call is a missed conversation. Every missed conversation is a missed customer. We built Audagen because the people who call your business deserve a real answer — and you deserve to be there for them, even when you cannot be.',
    attribution: 'THE AUDAGEN TEAM',
  },

  comparison: {
    them: {
      caption: 'THE OLD WAY',
      title: 'Generic call centers and clunky bots',
      points: [
        'Voicemail after hours and during lunch',
        'Bored receptionists in a call center halfway around the world',
        'Robotic chatbots that frustrate customers into hanging up',
        'Per-minute pricing that punishes you for being busy',
      ],
    },
    us: {
      caption: 'THE AUDAGEN WAY',
      title: 'An AI receptionist that actually feels right',
      points: [
        'Always available. 24/7/365. No exceptions.',
        'Trained on your business. Speaks like your best front-desk hire.',
        'Natural conversation. Customers stay engaged, not frustrated.',
        'Flat pricing. The more calls you take, the better your ROI.',
      ],
    },
  },
} as const;

export const footer = {

  brand: {
    wordmark: 'Audagen',
    description:
      'AI voice receptionists for service businesses. Built to make sure your phone is always answered.',
  },

  linkColumns: [
    {
      header: 'PRODUCT',
      links: [
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Why Audagen', href: '#why-audagen' },
        { label: 'Features', href: '#features' },
      ],
    },
    {
      header: 'COMPANY',
      links: [
        { label: 'Contact', href: 'mailto:hello@audagen.com' },
        { label: 'Follow us', href: 'https://x.com/audagen', external: true },
      ],
    },
    {
      header: 'LEGAL',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ],

  social: [
    {
      platform: 'x',
      label: 'Follow Audagen on X',
      href: 'https://x.com/audagen',
    },
    {
      platform: 'instagram',
      label: 'Follow Audagen on Instagram',
      href: 'https://instagram.com/audagen',
    },
    {
      platform: 'linkedin',
      label: 'Follow Audagen on LinkedIn',
      href: 'https://linkedin.com/company/audagen',
    },
  ],

  copyright: '\u00A9 2026 Audagen. All rights reserved.',
  metaTagline: 'Made for service businesses everywhere.',
} as const;
