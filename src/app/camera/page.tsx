'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  SwitchCamera,
  Timer,
  Grid3x3,
  Settings,
  ChevronLeft,
  Send,
  Download,
  Sparkles,
  Palette,
  Sticker,
  Music,
  Type,
  Circle,
} from 'lucide-react';
import { GlowButton } from '@/components/ui';

const colorFilters = [
  { id: 'none', name: 'Normal', style: {} },
  { id: 'bw', name: 'B&W', style: { filter: 'grayscale(100%)' } },
  { id: 'vintage', name: 'Vintage', style: { filter: 'sepia(60%) contrast(110%)' } },
  { id: 'vivid', name: 'Vivid', style: { filter: 'saturate(180%) contrast(110%)' } },
  { id: 'warm', name: 'Warm', style: { filter: 'sepia(30%) saturate(140%) brightness(105%)' } },
  { id: 'cool', name: 'Cool', style: { filter: 'hue-rotate(20deg) saturate(120%)' } },
  { id: 'dramatic', name: 'Drama', style: { filter: 'contrast(140%) saturate(80%)' } },
  { id: 'noir', name: 'Noir', style: { filter: 'grayscale(100%) contrast(130%)' } },
];

const faceFilters = [
  { id: 'dog', name: '🐶 Dog', emoji: '🐶' },
  { id: 'cat', name: '🐱 Cat', emoji: '🐱' },
  { id: 'crown', name: '👑 Crown', emoji: '👑' },
  { id: 'sunglasses', name: '🕶️ Cool', emoji: '🕶️' },
  { id: 'hearts', name: '❤️ Love', emoji: '❤️' },
  { id: 'fire', name: '🔥 Fire', emoji: '🔥' },
  { id: 'rainbow', name: '🌈 Rainbow', emoji: '🌈' },
  { id: 'stars', name: '⭐ Stars', emoji: '⭐' },
];

const arObjects = [
  { id: 'balloon', name: '🎈 Balloon', emoji: '🎈' },
  { id: 'dog3d', name: '🐕 3D Dog', emoji: '🐕' },
  { id: 'heart3d', name: '💖 Heart', emoji: '💖' },
  { id: 'star3d', name: '🌟 Star', emoji: '🌟' },
  { id: 'flower', name: '🌸 Flower', emoji: '🌸' },
  { id: 'confetti', name: '🎊 Confetti', emoji: '🎊' },
];

export default function CameraPage() {
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [flash, setFlash] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [activeFilter, setActiveFilter] = useState('none');
  const [activeFaceFilter, setActiveFaceFilter] = useState<string | null>(null);
  const [activeArObject, setActiveArObject] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<'color' | 'face' | 'ar' | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 1920 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      // Camera not available - use fallback
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  const handleCapture = () => {
    if (timer > 0) {
      setCountdown(timer);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            doCapture();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      doCapture();
    }
  };

  const doCapture = () => {
    // Simulate capture
    setCaptured(`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700"><rect fill="#2c2c3e" width="400" height="700"/><text x="200" y="350" text-anchor="middle" fill="white" font-size="24">📸 Captured!</text></svg>')}`);
  };

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      setCaptured(`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700"><rect fill="#1a1a2e" width="400" height="700"/><text x="200" y="350" text-anchor="middle" fill="white" font-size="24">🎬 Video Captured!</text></svg>')}`);
    } else {
      setRecording(true);
      setTimeout(() => {
        setRecording(false);
        setCaptured(`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700"><rect fill="#1a1a2e" width="400" height="700"/><text x="200" y="350" text-anchor="middle" fill="white" font-size="24">🎬 Video Captured!</text></svg>')}`);
      }, 5000);
    }
  };

  const currentFilter = colorFilters.find((f) => f.id === activeFilter);
  const currentFaceFilter = faceFilters.find((f) => f.id === activeFaceFilter);
  const currentArObject = arObjects.find((o) => o.id === activeArObject);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Camera View */}
      {!captured ? (
        <>
          <div className="relative h-full w-full">
            {/* Video feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              style={currentFilter?.style}
            />

            {/* Fallback when no camera */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-snap-dark via-snap-darker to-snap-darkest -z-10">
              <div className="text-center">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-white/30 text-sm">Camera Preview</p>
              </div>
            </div>

            {/* Grid overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full grid grid-cols-3 grid-rows-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-white/10" />
                  ))}
                </div>
              </div>
            )}

            {/* Face filter overlay */}
            {currentFaceFilter && (
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce-in pointer-events-none">
                {currentFaceFilter.emoji}
              </div>
            )}

            {/* AR object overlay */}
            {currentArObject && (
              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-5xl animate-float pointer-events-none">
                {currentArObject.emoji}
              </div>
            )}

            {/* Countdown overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  key={countdown}
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-8xl font-bold text-white drop-shadow-lg"
                >
                  {countdown}
                </motion.div>
              </div>
            )}

            {/* Top controls */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-12">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
                >
                  <X size={22} />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFlash(!flash)}
                    className={`rounded-full p-2 backdrop-blur-sm transition-all ${
                      flash ? 'bg-snap-yellow text-black' : 'bg-black/30 text-white'
                    }`}
                  >
                    <Zap size={20} />
                  </button>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`rounded-full p-2 backdrop-blur-sm transition-all ${
                      showGrid ? 'bg-snap-yellow text-black' : 'bg-black/30 text-white'
                    }`}
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => setTimer(timer === 0 ? 3 : timer === 3 ? 10 : 0)}
                    className={`rounded-full p-2 backdrop-blur-sm transition-all ${
                      timer > 0 ? 'bg-snap-yellow text-black' : 'bg-black/30 text-white'
                    }`}
                  >
                    <Timer size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-20">
              {/* Filter tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide px-2">
                <button
                  onClick={() => setShowFilters(showFilters === 'color' ? null : 'color')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all ${
                    showFilters === 'color' || activeFilter !== 'none'
                      ? 'bg-snap-yellow text-black'
                      : 'bg-black/30 text-white'
                  }`}
                >
                  <Palette size={14} /> Color
                </button>
                <button
                  onClick={() => setShowFilters(showFilters === 'face' ? null : 'face')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all ${
                    showFilters === 'face' || activeFaceFilter
                      ? 'bg-snap-yellow text-black'
                      : 'bg-black/30 text-white'
                  }`}
                >
                  <Sparkles size={14} /> Filters
                </button>
                <button
                  onClick={() => setShowFilters(showFilters === 'ar' ? null : 'ar')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all ${
                    showFilters === 'ar' || activeArObject
                      ? 'bg-snap-yellow text-black'
                      : 'bg-black/30 text-white'
                  }`}
                >
                  🌐 AR
                </button>
                <button className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Music size={14} /> Music
                </button>
                <button className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Sticker size={14} /> Stickers
                </button>
                <button className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Type size={14} /> Text
                </button>
              </div>

              {/* Filter selector */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 80, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2 pb-2">
                      {showFilters === 'color' &&
                        colorFilters.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${
                              activeFilter === filter.id
                                ? 'bg-snap-yellow/20 border border-snap-yellow/30'
                                : 'bg-black/30 border border-transparent'
                            }`}
                          >
                            <div
                              className="h-8 w-8 rounded-full"
                              style={filter.style}
                            />
                            <span className="text-[10px] text-white/60">{filter.name}</span>
                          </button>
                        ))}
                      {showFilters === 'face' &&
                        faceFilters.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() =>
                              setActiveFaceFilter(activeFaceFilter === filter.id ? null : filter.id)
                            }
                            className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${
                              activeFaceFilter === filter.id
                                ? 'bg-snap-yellow/20 border border-snap-yellow/30'
                                : 'bg-black/30 border border-transparent'
                            }`}
                          >
                            <span className="text-2xl">{filter.emoji}</span>
                            <span className="text-[10px] text-white/60">{filter.name.split(' ')[1]}</span>
                          </button>
                        ))}
                      {showFilters === 'ar' &&
                        arObjects.map((obj) => (
                          <button
                            key={obj.id}
                            onClick={() =>
                              setActiveArObject(activeArObject === obj.id ? null : obj.id)
                            }
                            className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${
                              activeArObject === obj.id
                                ? 'bg-snap-yellow/20 border border-snap-yellow/30'
                                : 'bg-black/30 border border-transparent'
                            }`}
                          >
                            <span className="text-2xl">{obj.emoji}</span>
                            <span className="text-[10px] text-white/60">{obj.name.split(' ')[1]}</span>
                          </button>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Capture controls */}
              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={() => router.back()}
                  className="rounded-full p-2 text-white/50"
                >
                  <ChevronLeft size={28} />
                </button>

                {/* Main capture button */}
                <button
                  onClick={handleCapture}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    toggleRecording();
                  }}
                  className="relative"
                >
                  <div
                    className={`rounded-full border-4 p-1 transition-all ${
                      recording
                        ? 'border-red-500 scale-110'
                        : 'border-white'
                    }`}
                  >
                    <div
                      className={`transition-all ${
                        recording
                          ? 'h-12 w-12 rounded-lg bg-red-500'
                          : 'h-16 w-16 rounded-full bg-white'
                      }`}
                    />
                  </div>
                  {recording && (
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => {
                    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
                  }}
                  className="rounded-full p-2 text-white/50"
                >
                  <SwitchCamera size={28} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Captured preview */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-full w-full"
        >
          <img
            src={captured}
            alt="Captured"
            className="h-full w-full object-cover"
            style={currentFilter?.style}
          />

          {/* Face filter on preview */}
          {currentFaceFilter && (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl pointer-events-none">
              {currentFaceFilter.emoji}
            </div>
          )}

          {/* Top controls */}
          <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex items-center justify-between">
            <button
              onClick={() => setCaptured(null)}
              className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
            >
              <X size={22} />
            </button>
            <div className="flex gap-2">
              <button className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm">
                <Download size={20} />
              </button>
              <button className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm">
                <Sparkles size={20} />
              </button>
            </div>
          </div>

          {/* Caption & send */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-20">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add caption..."
                className="flex-1 rounded-full border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-sm focus:outline-none focus:border-snap-yellow/30"
              />
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-snap-yellow text-black hover:shadow-glow-yellow transition-all">
                <Send size={22} />
              </button>
            </div>

            {/* Quick send options */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="flex flex-col items-center gap-1 rounded-xl bg-black/20 px-3 py-2 backdrop-blur-sm">
                <span className="text-lg">📸</span>
                <span className="text-[10px] text-white/50">Story</span>
              </button>
              <button className="flex flex-col items-center gap-1 rounded-xl bg-black/20 px-3 py-2 backdrop-blur-sm">
                <span className="text-lg">👤</span>
                <span className="text-[10px] text-white/50">Friends</span>
              </button>
              <button className="flex flex-col items-center gap-1 rounded-xl bg-black/20 px-3 py-2 backdrop-blur-sm">
                <span className="text-lg">🌍</span>
                <span className="text-[10px] text-white/50">Public</span>
              </button>
              <button className="flex flex-col items-center gap-1 rounded-xl bg-black/20 px-3 py-2 backdrop-blur-sm">
                <span className="text-lg">💾</span>
                <span className="text-[10px] text-white/50">Save</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
