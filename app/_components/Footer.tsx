import { footer } from '@/app/_content/site';

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        {/* Left: Wordmark + tagline */}
        <div className="text-center sm:text-left">
          <span className="font-display text-xl text-ink block">
            {footer.wordmark}
          </span>
          <span className="text-caption text-ink3 mt-1 block">
            {footer.tagline}
          </span>
        </div>

        {/* Right: Copyright */}
        <div className="text-center sm:text-right">
          <span className="text-caption text-ink3">
            {footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
