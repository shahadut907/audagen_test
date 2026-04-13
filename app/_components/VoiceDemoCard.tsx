'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Loader2 } from 'lucide-react';
import { heroVoiceDemo, type TranscriptLine } from '@/app/_content/site';
import Waveform from '@/app/_components/ui/Waveform';
import AnimatedTranscript from '@/app/_components/ui/AnimatedTranscript';

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended';

export default function VoiceDemoCard() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(heroVoiceDemo.duration);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Create audio element on mount
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = heroVoiceDemo.audioSrc;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setAudioReady(true);
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setPlaybackState('ended');
      setCurrentTime(0);
    };

    const handleError = () => {
      setAudioError(true);
      setPlaybackState('idle');
    };

    const handleCanPlayThrough = () => {
      setAudioReady(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playbackState === 'playing') {
      audio.pause();
      setPlaybackState('paused');
      return;
    }

    if (playbackState === 'ended') {
      audio.currentTime = 0;
      setCurrentTime(0);
    }

    setPlaybackState('loading');

    try {
      await audio.play();
      setPlaybackState('playing');
    } catch {
      // Audio file may be empty/invalid — graceful fallback
      setAudioError(true);
      setPlaybackState('idle');
    }
  }, [playbackState]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handlePlayPause();
      }
    },
    [handlePlayPause]
  );

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isPlaying = playbackState === 'playing';

  const transcript: TranscriptLine[] = heroVoiceDemo.transcript.map((t) => ({
    start: t.start,
    end: t.end,
    text: t.text,
  }));

  const PlayIcon = playbackState === 'ended' ? RotateCcw : playbackState === 'playing' ? Pause : Play;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="
        rounded-[2rem] bg-white/70 backdrop-blur-xl 
        border border-white/60 
        p-7 md:p-9 
        max-w-md w-full
        shadow-[0_0_80px_rgba(255,90,31,0.2),0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-4">
        <span className="block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        <span className="text-caption text-accent font-medium">
          {heroVoiceDemo.label}
        </span>
      </div>

      {/* Heading */}
      <h3 className="text-2xl md:text-3xl font-display text-ink leading-tight mb-1.5">
        Hear her voice
      </h3>

      {/* Sub */}
      <p className="text-body-m text-ink2 mb-6">
        Click play. She will introduce herself.
      </p>

      {/* Waveform */}
      <div className="mb-6">
        <Waveform
          audioRef={audioRef}
          isPlaying={isPlaying}
          variant="light"
          className="w-full"
        />
      </div>

      {/* Play/Pause row */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handlePlayPause}
          onKeyDown={handleKeyDown}
          disabled={audioError}
          aria-label={
            playbackState === 'ended'
              ? 'Replay voice demo'
              : isPlaying
                ? 'Pause voice demo'
                : 'Play voice demo'
          }
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-200 ease-out
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isPlaying
              ? 'bg-ink text-white shadow-[0_0_40px_rgba(255,90,31,0.4)]'
              : 'bg-ink text-white shadow-[0_0_40px_rgba(255,90,31,0.3)]'
            }
          `}
        >
          {/* Breathing glow ring when idle */}
          {!isPlaying && playbackState !== 'loading' && (
            <span
              className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-ring motion-reduce:animate-none"
              aria-hidden="true"
            />
          )}
          {playbackState === 'loading' ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <PlayIcon className="w-6 h-6" strokeWidth={1.5} fill={isPlaying ? 'none' : 'currentColor'} />
          )}
        </button>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-ink tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          {audioError && (
            <span className="text-xs text-ink3 mt-0.5">Audio loading…</span>
          )}
        </div>
      </div>

      {/* Transcript */}
      <AnimatedTranscript
        audioRef={audioRef}
        transcript={transcript}
        variant="inline"
      />
    </motion.div>
  );
}
