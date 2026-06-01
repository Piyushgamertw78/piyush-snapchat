'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { GlowButton, InputField } from '@/components/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (email) setSent(true);
  };

  return (
    <div className="relative min-h-screen bg-snap-darkest flex flex-col px-6 py-8">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-snap-blue/5 blur-[100px]" />
      </div>

      <button
        onClick={() => router.back()}
        className="relative mb-8 text-white/50 hover:text-white transition-colors text-sm"
      >
        ← Back to login
      </button>

      <div className="relative flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {!sent ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-snap-blue to-purple-500 mb-4">
                <Mail size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
              <p className="text-white/40 text-sm">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <div className="space-y-4">
              <InputField
                label="Email Address"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={setEmail}
                icon={<Mail size={18} />}
              />
              <GlowButton size="lg" className="w-full" onClick={handleSubmit}>
                Send Reset Link
              </GlowButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle size={40} className="text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Email Sent!</h2>
            <p className="text-white/40 text-sm mb-8">
              We&apos;ve sent a password reset link to <strong className="text-white/60">{email}</strong>
            </p>
            <GlowButton
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => router.push('/auth/login')}
              icon={<ArrowLeft size={18} />}
            >
              Back to Login
            </GlowButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}
