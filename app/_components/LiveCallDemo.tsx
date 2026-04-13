'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Play, Pause, RotateCcw, CheckCircle2, Loader2 } from 'lucide-react';
import { liveCallDemo, type TranscriptLine } from '@/app/_content/site';
import Waveform from '@/app/_components/ui/Waveform';
import AnimatedTranscript from '@/app/_components/ui/AnimatedTranscript';
import { Reveal } from '@/app/_components/ui/Reveal';

type CallState = 'idle' | 'ringing' | 'connected' | 'ended' | 'replay';

export default function LiveCallDemo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [callState, setCallState] = useState<CallState>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const ringTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Create audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = liveCallDemo.audioSrc;
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCallState('ended');
    };
    const handleError = () => {
      setAudioError(true);
      setIsPlaying(false);
      // Still show the ended state even on error
      if (callState === 'connected') {
        setCallState('ended');
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      if (ringTimerRef.current) clearTimeout(ringTimerRef.current);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCall = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCallState('ringing');
    setCurrentTime(0);

    // Ring for 1.5s then connect
    ringTimerRef.current = setTimeout(async () => {
      setCallState('connected');
      try {
        audio.currentTime = 0;
        await audio.play();
        setIsPlaying(true);
      } catch {
        setAudioError(true);
        // Even if audio fails, simulate the call experience
        simulateFakeCall();
      }
    }, 1500);
  }, []);

  // Simulate progression through transcript if audio fails
  const simulateFakeCall = useCallback(() => {
    const totalDuration = liveCallDemo.duration * 1000;
    const timer = setTimeout(() => {
      setCallState('ended');
      setIsPlaying(false);
    }, totalDuration);
    endTimerRef.current = timer;
  }, []);

  const togglePause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        setAudioError(true);
      });
    }
  }, [isPlaying]);

  const endCall = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setCallState('ended');
    if (endTimerRef.current) clearTimeout(endTimerRef.current);
  }, []);

  const replay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
    }
    setCurrentTime(0);
    setIsPlaying(false);
    setCallState('idle');
  }, []);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const transcript: TranscriptLine[] = liveCallDemo.transcript.map((t) => ({
    start: t.start,
    end: t.end,
    text: t.text,
    speaker: t.speaker,
  }));

  return (
    <section
      id="live-demo"
      className="py-24 md:py-40 px-6"
      aria-label="Live demo"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <span className="text-caption text-accent font-medium">
                LIVE DEMO
              </span>
            </div>
            <h2 className="text-display-section font-display text-ink mb-4">
              Watch Audagen take a real call.
            </h2>
            <p className="text-body-l text-ink2 max-w-2xl mx-auto">
              A new customer calling to book an appointment. No edits, no script. This is how it sounds.
            </p>
          </div>
        </Reveal>

        {/* Phone Call Card */}
        <Reveal delay={0.15} y={32}>
          <div
            className="
              relative rounded-[2.5rem] bg-dark text-darkInk overflow-hidden
              border border-white/10
              shadow-[0_30px_100px_rgba(0,0,0,0.3)]
              min-h-[560px]
              p-8 md:p-12
              flex flex-col
            "
          >
            <AnimatePresence mode="wait">
              {/* IDLE STATE — Play overlay */}
              {callState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col items-center justify-center gap-6"
                >
                  <div className="text-center mb-4">
                    <p className="text-sm text-white/50 uppercase tracking-wider mb-2">
                      {liveCallDemo.callerName}
                    </p>
                    <p className="text-xs text-white/30">
                      {liveCallDemo.callerContext}
                    </p>
                  </div>

                  <button
                    onClick={startCall}
                    aria-label="Start live call demo"
                    className="
                      relative w-20 h-20 rounded-full bg-green-500 text-white
                      flex items-center justify-center
                      shadow-[0_0_60px_rgba(34,197,94,0.4)]
                      transition-all duration-200 ease-out
                      hover:bg-green-400 hover:shadow-[0_0_80px_rgba(34,197,94,0.5)]
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400
                    "
                  >
                    <span
                      className="absolute inset-0 rounded-full bg-green-400/30 animate-pulse-ring motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    <Play className="w-8 h-8 ml-1" fill="currentColor" strokeWidth={0} />
                  </button>

                  <p className="text-sm text-white/40">
                    Tap to answer the call
                  </p>
                </motion.div>
              )}

              {/* RINGING STATE */}
              {callState === 'ringing' && (
                <motion.div
                  key="ringing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col items-center justify-center gap-8"
                >
                  {/* Pulsing phone icon */}
                  <div className="relative">
                    <span
                      className="absolute inset-0 w-24 h-24 rounded-full bg-green-500/20 animate-pulse-ring motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Phone className="w-10 h-10 text-green-400" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-medium text-darkInk mb-1">
                      {liveCallDemo.callerName}
                    </p>
                    <p className="text-sm text-white/50">
                      {liveCallDemo.callerContext}
                    </p>
                  </div>

                  {/* Ghost buttons */}
                  <div className="flex items-center gap-8 mt-4">
                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
                        <PhoneOff className="w-6 h-6 text-red-400" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-white/40">Decline</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-400" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-white/40">Accept</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CONNECTED STATE */}
              {callState === 'connected' && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Top row: status bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 motion-reduce:animate-none" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </span>
                      <span className="text-caption text-white/60 font-medium">
                        CALL IN PROGRESS
                      </span>
                    </div>
                    <span className="text-sm font-medium text-white/60 tabular-nums">
                      {formatTime(currentTime)}
                    </span>
                  </div>

                  {/* Waveform */}
                  <div className="mb-6">
                    <Waveform
                      audioRef={audioRef}
                      isPlaying={isPlaying}
                      variant="dark"
                      className="w-full"
                    />
                  </div>

                  {/* Transcript */}
                  <div className="flex-1 min-h-0 mb-6">
                    <AnimatedTranscript
                      audioRef={audioRef}
                      transcript={transcript}
                      variant="chat"
                    />
                  </div>

                  {/* Bottom control row */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
                    <button
                      onClick={togglePause}
                      aria-label={isPlaying ? 'Pause call' : 'Resume call'}
                      className="
                        w-12 h-12 rounded-full bg-white/10 text-white
                        flex items-center justify-center
                        transition-all duration-200 ease-out
                        hover:bg-white/20
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
                      "
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" strokeWidth={1.5} />
                      ) : (
                        <Play className="w-5 h-5" strokeWidth={1.5} fill="currentColor" />
                      )}
                    </button>

                    <button
                      onClick={endCall}
                      aria-label="End call"
                      className="
                        w-14 h-14 rounded-full bg-red-500 text-white
                        flex items-center justify-center
                        transition-all duration-200 ease-out
                        hover:bg-red-400
                        shadow-[0_0_30px_rgba(239,68,68,0.3)]
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400
                      "
                    >
                      <PhoneOff className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ENDED STATE */}
              {callState === 'ended' && (
                <motion.div
                  key="ended"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  {/* Waveform faded */}
                  <div className="w-full opacity-20 mb-8">
                    <Waveform
                      audioRef={audioRef}
                      isPlaying={false}
                      variant="dark"
                      className="w-full"
                    />
                  </div>

                  {/* Confirmation card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="
                      rounded-3xl bg-white/5 border border-white/10 
                      p-8 text-center max-w-sm w-full
                      shadow-[0_0_60px_rgba(34,197,94,0.15)]
                    "
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" strokeWidth={1.5} />
                    </div>

                    <h4 className="text-xl font-semibold text-darkInk mb-1">
                      {liveCallDemo.outcome.title}
                    </h4>
                    <p className="text-sm text-white/60 mb-1">
                      {liveCallDemo.outcome.details}
                    </p>
                    {liveCallDemo.outcome.confirmationSent && (
                      <p className="text-xs text-green-400/80">
                        Confirmation sent to customer
                      </p>
                    )}
                  </motion.div>

                  {/* Replay button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    onClick={replay}
                    aria-label="Play call demo again"
                    className="
                      mt-8 flex items-center gap-2
                      rounded-full bg-white/10 text-darkInk px-6 py-3
                      text-sm font-medium
                      transition-all duration-200 ease-out
                      hover:bg-white/20
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
                    "
                  >
                    <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                    Play again
                  </motion.button>

                  {audioError && (
                    <p className="text-xs text-white/30 mt-3">Audio loading…</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
