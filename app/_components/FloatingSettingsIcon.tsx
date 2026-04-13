'use client';

import { Settings } from 'lucide-react';

export default function FloatingSettingsIcon() {
  return (
    <div
      className="
        fixed left-6 top-1/2 -translate-y-1/2 z-40
        hidden lg:flex
        rounded-full bg-surface px-3 py-4
        shadow-[0_8px_32px_rgba(0,0,0,0.06)]
      "
      aria-hidden="true"
    >
      <Settings className="h-[18px] w-[18px] text-ink3" strokeWidth={1.5} />
    </div>
  );
}
