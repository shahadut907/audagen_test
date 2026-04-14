import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Audagen',
  description:
    'Audagen builds AI receptionists that answer calls, book appointments, and handle customers around the clock. Voice AI that sounds human.',
  openGraph: {
    title: 'Audagen | AI Voice Receptionists',
    description:
      'Voice AI that sounds human. Calls answered, appointments booked, customers handled — around the clock.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Audagen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audagen | AI Voice Receptionists',
    description:
      'Voice AI that sounds human. Calls answered, appointments booked, customers handled — around the clock.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
