'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { GlowButton } from '@/components/ui';

export default function SplashPage() {
  const [phase, setPhase] = useState<'splash' | 'welcome'>('splash');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setPhase('welcome'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-snap-darkest">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-snap-yellow/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-snap-blue/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[80px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <AnimatePresence mode="wait">
        {phase === 'splash' ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex min-h-screen flex-col items-center justify-center px-6"
          >
            {/* Logo */}
            <motion.div
              className="relative mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative flex h-28 w-28 items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-snap-yellow/20 blur-xl animate-pulse-glow" />
                {/* Icon container */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-snap-yellow to-orange-500 shadow-glow-yellow">
                  <Camera size={44} className="text-black" strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>

            {/* App Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-4xl font-extrabold gradient-text"
            >
              PiyushSnap
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/40 text-sm font-medium tracking-wider uppercase"
            >
              Premium Social Experience
            </motion.p>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-12 flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-snap-yellow"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Watermark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 text-xs text-white/20 font-medium"
            >
              Made by Piyush ✨
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex min-h-screen flex-col items-center justify-center px-6"
          >
            {/* Hero Section */}
            <div className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                className="mb-6 flex justify-center"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-snap-yellow to-orange-500 shadow-glow-yellow">
                  <Camera size={36} className="text-black" strokeWidth={2.5} />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-3 text-3xl font-extrabold text-white"
              >
                Welcome to{' '}
                <span className="gradient-text">PiyushSnap</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/50 text-base max-w-xs mx-auto"
              >
                Share moments, create stories, and connect with friends in a whole new way
              </motion.p>
            </div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10 grid grid-cols-3 gap-4 w-full max-w-sm"
            >
              {[
                { icon: <Camera size={20} />, label: 'Snaps' },
                { icon: <MessageCircle size={20} />, label: 'Chat' },
                { icon: <Sparkles size={20} />, label: 'Stories' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="text-snap-yellow">{feature.icon}</div>
                  <span className="text-xs font-medium text-white/60">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full max-w-sm space-y-3"
            >
              <GlowButton
                size="lg"
                className="w-full"
                onClick={() => router.push('/auth/login')}
                icon={<ArrowRight size={20} />}
              >
                Sign In
              </GlowButton>

              <GlowButton
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => router.push('/auth/signup')}
              >
                Create Account
              </GlowButton>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-snap-darkest px-3 text-white/30">or continue with</span>
                </div>
              </div>

              <GlowButton
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={() => router.push('/auth/login')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </GlowButton>
            </motion.div>

            {/* Watermark */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-xs text-white/20"
            >
              Made by Piyush ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
