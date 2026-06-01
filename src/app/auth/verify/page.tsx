'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { GlowButton } from '@/components/ui';

export default function VerifyPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    router.push('/stories');
  };

  return (
    <div className="relative min-h-screen bg-snap-darkest flex flex-col px-6 py-8">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-snap-yellow/5 blur-[100px]" />
      </div>

      <div className="relative flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-snap-yellow to-orange-500">
              <ShieldCheck size={28} className="text-black" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Verify Your Number</h1>
          <p className="text-white/40 text-sm">
            Enter the 6-digit code sent to your phone
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="flex justify-center gap-3">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-12 rounded-xl border border-white/10 bg-white/5 text-center text-xl font-bold text-white focus:border-snap-yellow/50 focus:outline-none focus:ring-2 focus:ring-snap-yellow/20 transition-all"
              />
            ))}
          </div>

          <GlowButton size="lg" className="w-full" onClick={handleVerify}>
            Verify
          </GlowButton>

          <p className="text-center text-sm text-white/30">
            Didn&apos;t receive a code?{' '}
            <button className="text-snap-yellow/70 hover:text-snap-yellow font-medium">
              Resend
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
