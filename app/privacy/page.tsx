import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.12em] text-accent mb-4">PRIVACY POLICY</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">Coming soon.</h1>
        <p className="text-ink2 text-lg mb-8">
          We are putting the finishing touches on our privacy policy. In the meantime, reach out to{' '}
          <a href="mailto:hello@audagen.com" className="text-accent hover:underline">hello@audagen.com</a>{' '}
          with any questions.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
