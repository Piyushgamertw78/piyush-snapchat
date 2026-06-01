'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Camera, ArrowRight, Phone } from 'lucide-react';
import { GlowButton, InputField } from '@/components/ui';
import { useAuthStore } from '@/store';

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();

  const handleNext = () => {
    if (step === 1 && (!email || !password)) {
      setError('Please fill in all fields');
      return;
    }
    if (step === 2 && (!username || !displayName)) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    if (step < 3) setStep(step + 1);
  };

  const handleSignUp = async () => {
    if (!email || !password || !username || !displayName) {
      setError('All fields are required');
      return;
    }
    setError('');
    await signup({ email, password, username, displayName });
    router.push('/stories');
  };

  return (
    <div className="relative min-h-screen bg-snap-darkest overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-purple-500/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-snap-yellow/5 blur-[80px]" />
      </div>

      <div className="relative flex min-h-screen flex-col px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="mb-6 text-white/50 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-snap-yellow to-orange-500">
              <Camera size={20} className="text-black" />
            </div>
            <h1 className="text-2xl font-extrabold gradient-text">Create Account</h1>
          </div>
          {/* Progress indicator */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-snap-yellow' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 space-y-4"
        >
          {step === 1 && (
            <>
              <p className="text-white/40 text-sm mb-4">Step 1: Your credentials</p>
              <InputField
                label="Email"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={setEmail}
                icon={<Mail size={18} />}
              />
              <InputField
                label="Password"
                placeholder="Min 8 characters"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={setPassword}
                icon={<Lock size={18} />}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-white/30 hover:text-white/50"
              >
                {showPassword ? 'Hide' : 'Show'} password
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-white/40 text-sm mb-4">Step 2: Your profile</p>
              <InputField
                label="Username"
                placeholder="cool_username"
                value={username}
                onChange={setUsername}
                icon={<User size={18} />}
              />
              <InputField
                label="Display Name"
                placeholder="Your Name"
                value={displayName}
                onChange={setDisplayName}
              />
              <InputField
                label="Phone (optional)"
                placeholder="+1 234 567 8900"
                type="tel"
                value={phone}
                onChange={setPhone}
                icon={<Phone size={18} />}
              />
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-white/40 text-sm mb-4">Step 3: Choose your avatar</p>
              <div className="flex justify-center mb-6">
                <div className="story-ring">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-snap-yellow to-orange-500 text-4xl font-bold text-black">
                    {displayName.charAt(0) || '?'}
                  </div>
                </div>
              </div>
              <p className="text-center text-white/30 text-sm">
                Your avatar will be visible to friends
              </p>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {['🦊', '🐼', '🦄', '🐉', '🎭', '👻', '🌟', '🎯'].map((emoji) => (
                  <button
                    key={emoji}
                    className="flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl hover:border-snap-yellow/30 hover:bg-snap-yellow/10 transition-all"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </>
          )}

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="pt-6 space-y-3">
            {step < 3 ? (
              <GlowButton
                size="lg"
                className="w-full"
                onClick={handleNext}
                icon={<ArrowRight size={20} />}
              >
                Continue
              </GlowButton>
            ) : (
              <GlowButton
                size="lg"
                className="w-full"
                onClick={handleSignUp}
                disabled={isLoading}
                icon={<ArrowRight size={20} />}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </GlowButton>
            )}

            {step > 1 && (
              <GlowButton
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={() => setStep(step - 1)}
              >
                ← Go back
              </GlowButton>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-white/30 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/auth/login')}
              className="text-snap-yellow/70 hover:text-snap-yellow font-semibold"
            >
              Sign In
            </button>
          </p>
          <p className="mt-3 text-[10px] text-white/15">Made by Piyush ✨</p>
        </motion.div>
      </div>
    </div>
  );
}
