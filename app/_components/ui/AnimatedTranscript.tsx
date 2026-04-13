'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import type { TranscriptLine } from '@/app/_content/site';

type AnimatedTranscriptProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  transcript: readonly TranscriptLine[];
  variant: 'inline' | 'chat';
  className?: string;
};

export default function AnimatedTranscript({
  audioRef,
  transcript,
  variant,
  className = '',
}: AnimatedTranscriptProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  const updateActiveIndex = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    const time = audio.currentTime;
    const idx = transcript.findIndex(
      (line) => time >= line.start && time < line.end
    );
    if (idx !== -1) {
      setActiveIndex(idx);
      setIsEnded(false);
    }
  }, [audioRef, transcript]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => updateActiveIndex();
    const handleEnded = () => {
      setActiveIndex(transcript.length - 1);
      setIsEnded(true);
    };
    const handleSeeked = () => updateActiveIndex();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('seeked', handleSeeked);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('seeked', handleSeeked);
    };
  }, [audioRef, transcript, updateActiveIndex]);

  // Auto-scroll active line into view (chat variant)
  useEffect(() => {
    if (variant === 'chat' && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex, variant]);

  if (variant === 'inline') {
    return (
      <div className={`space-y-1.5 ${className}`} role="log" aria-label="Transcript">
        {transcript.map((line, i) => {
          const isActive = i === activeIndex && !isEnded;
          const isFaded = isEnded;

          return (
            <div
              key={i}
              ref={i === activeIndex ? activeLineRef : undefined}
              className={`
                text-sm leading-relaxed transition-all duration-300 ease-out
                ${isActive
                  ? 'opacity-100 text-ink border-l-2 border-accent pl-4'
                  : isFaded
                    ? 'opacity-40 pl-4 border-l-2 border-transparent'
                    : 'opacity-30 text-ink2 pl-4 border-l-2 border-transparent'
                }
              `}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    );
  }

  // Chat variant
  return (
    <div
      ref={scrollContainerRef}
      className={`space-y-3 max-h-[280px] overflow-y-auto scroll-smooth ${className}`}
      role="log"
      aria-label="Call transcript"
    >
      {transcript.map((line, i) => {
        const isActive = i === activeIndex && !isEnded;
        const isFaded = isEnded;
        const isAudagen = line.speaker === 'audagen';
        const isVisible = i <= activeIndex;

        if (!isVisible && !isEnded) return null;

        return (
          <div
            key={i}
            ref={i === activeIndex ? activeLineRef : undefined}
            className={`
              flex transition-opacity duration-300 ease-out
              ${isAudagen ? 'justify-start' : 'justify-end'}
              ${isActive ? 'opacity-100' : isFaded ? 'opacity-40' : 'opacity-70'}
            `}
          >
            <div
              className={`
                max-w-[80%] px-4 py-2.5 text-sm leading-relaxed
                ${isAudagen
                  ? 'bg-accent/10 text-darkInk rounded-2xl rounded-bl-md'
                  : 'bg-white/10 text-darkInk rounded-2xl rounded-br-md'
                }
              `}
            >
              <span className={`block text-[0.65rem] uppercase tracking-wider mb-0.5 ${isAudagen ? 'text-accent' : 'text-white/50'}`}>
                {isAudagen ? 'Audagen' : 'Caller'}
              </span>
              {line.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
