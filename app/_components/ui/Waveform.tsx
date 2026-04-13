'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

type WaveformProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  variant?: 'light' | 'dark';
  barCount?: number;
  className?: string;
};

function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// Generate static idle heights using a sine-wave pattern
function generateIdleHeights(count: number): number[] {
  const heights: number[] = [];
  for (let i = 0; i < count; i++) {
    const normalized = i / count;
    const sine = Math.sin(normalized * Math.PI * 2) * 0.15 + 0.3;
    heights.push(sine);
  }
  return heights;
}

export default function Waveform({
  audioRef,
  isPlaying,
  variant = 'light',
  barCount: barCountProp,
  className = '',
}: WaveformProps) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const resolvedBarCount = barCountProp ?? (isMobile ? 24 : 48);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const [activeHeights, setActiveHeights] = useState<number[]>([]);

  const idleHeights = useMemo(() => generateIdleHeights(resolvedBarCount), [resolvedBarCount]);

  // Initialize Web Audio API on first play
  const initAudio = useCallback(() => {
    if (audioContextRef.current || !audioRef.current || prefersReduced) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaElementSource(audioRef.current);
      sourceRef.current = source;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;

      source.connect(analyser);
      analyser.connect(ctx.destination);

      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      // Web Audio API not supported — graceful fallback to idle
    }
  }, [audioRef, prefersReduced]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || prefersReduced) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      setActiveHeights([]);
      return;
    }

    initAudio();

    // Resume suspended AudioContext (Chrome autoplay policy)
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!analyser || !dataArray) {
      setActiveHeights([]);
      return;
    }

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);

      const binCount = dataArray.length;
      const heights: number[] = [];

      for (let i = 0; i < resolvedBarCount; i++) {
        // Map bar index to frequency bin
        const binIndex = Math.floor((i / resolvedBarCount) * binCount);
        const value = dataArray[binIndex] / 255;
        // Clamp between 10% and 100%
        const height = Math.max(0.1, Math.min(1.0, value));
        heights.push(height);
      }

      setActiveHeights(heights);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [isPlaying, prefersReduced, initAudio, resolvedBarCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const heights = isPlaying && activeHeights.length > 0 ? activeHeights : idleHeights;
  const barWidth = 3;
  const gap = 4;
  const svgWidth = resolvedBarCount * (barWidth + gap) - gap;
  const svgHeight = 80;

  const barColor = isPlaying
    ? '#FF5A1F' // accent
    : variant === 'light'
      ? 'rgba(10, 10, 10, 0.3)' // ink/30
      : 'rgba(255, 255, 255, 0.4)'; // white/40

  return (
    <div className={`relative ${className}`} aria-hidden="true" ref={containerRef}>
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Glow filter for active state */}
        {isPlaying && !prefersReduced && (
          <defs>
            <filter id="waveform-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}
        {heights.map((h, i) => {
          const barHeight = Math.max(4, h * svgHeight);
          const x = i * (barWidth + gap);
          const y = (svgHeight - barHeight) / 2;

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={barWidth / 2}
              fill={barColor}
              style={{
                transition: isPlaying ? 'height 75ms ease-out, y 75ms ease-out' : 'none',
              }}
              filter={isPlaying && !prefersReduced ? 'url(#waveform-glow)' : undefined}
            />
          );
        })}
      </svg>
    </div>
  );
}
