'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Camera, ArrowRight } from 'lucide-react';
import { GlowButton, InputField } from '@/components/ui';
import { useAuthStore } from '@/store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, loginWithGoogle, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    await login(email, password);
    router.push('/stories');
  };

  const handleGoogleLogin = async () => {
    setError('');
    await loginWithGoogle();
    router.push('/stories');
  };

  return (
    <div className="relative min-h-screen bg-snap-darkest overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-snap-yellow/5 blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-snap-blue/5 blur-[80px]" />
      </div>

      <div className="relative flex min-h-screen flex-col px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="mb-6 text-white/50 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-snap-yellow to-orange-500">
              <Camera size={24} className="text-black" />
            </div>
            <h1 className="text-3xl font-extrabold gradient-text">Sign In</h1>
          </div>
          <p className="text-white/40">Welcome back! Sign in to continue</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 space-y-4"
        >
          <InputField
            label="Email"
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={setEmail}
            icon={<Mail size={18} />}
            error={error && !email ? error : undefined}
          />

          <div className="space-y-1.5">
            <InputField
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              icon={<Lock size={18} />}
              error={error && !password ? error : undefined}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1 text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPassword ? 'Hide' : 'Show'} password
            </button>
          </div>

          <button
            onClick={() => router.push('/auth/forgot-password')}
            className="text-sm text-snap-yellow/70 hover:text-snap-yellow transition-colors"
          >
            Forgot password?
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          <div className="pt-4 space-y-3">
            <GlowButton
              size="lg"
              className="w-full"
              onClick={handleLogin}
              disabled={isLoading}
              icon={<ArrowRight size={20} />}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </GlowButton>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-snap-darkest px-3 text-white/30">or</span>
              </div>
            </div>

            <GlowButton
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </GlowButton>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/30 text-sm">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => router.push('/auth/signup')}
              className="text-snap-yellow/70 hover:text-snap-yellow font-semibold transition-colors"
            >
              Sign Up
            </button>
          </p>
          <p className="mt-4 text-[10px] text-white/15">Made by Piyush ✨</p>
        </motion.div>
      </div>
    </div>
  );
}
