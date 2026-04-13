import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F5F5F2',
        surface: '#FFFFFF',
        ink: '#0A0A0A',
        ink2: '#3F3F3F',
        ink3: '#737373',
        line: '#E8E8E3',
        accent: '#FF5A1F',
        accent2: '#FF8A5B',
        accent3: '#FFB88C',
        dark: '#0A0A0A',
        darkInk: '#FAFAF7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-instrument)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'drift-1': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%':      { transform: 'translate(8%, 6%) scale(1.1)' },
          '66%':      { transform: 'translate(-4%, 10%) scale(0.95)' },
        },
        'drift-2': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%':      { transform: 'translate(-10%, 5%) scale(1.05)' },
          '66%':      { transform: 'translate(6%, -8%) scale(1.1)' },
        },
        'drift-3': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%':      { transform: 'translate(5%, -7%) scale(0.95)' },
          '66%':      { transform: 'translate(-8%, -4%) scale(1.08)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.15)', opacity: '0.3' },
          '100%': { transform: 'scale(1)', opacity: '0.6' },
        },
      },
      animation: {
        'drift-1': 'drift-1 28s ease-in-out infinite',
        'drift-2': 'drift-2 32s ease-in-out infinite',
        'drift-3': 'drift-3 36s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
