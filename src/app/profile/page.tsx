'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Settings,
  Share2,
  QrCode,
  Trophy,
  Star,
  Users,
  Eye,
  Edit3,
  ChevronRight,
  Moon,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  BookOpen,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { GlassCard, GlowButton, Avatar, Modal } from '@/components/ui';
import { TopBar, BottomNav } from '@/components/common';
import { useAuthStore } from '@/store';

export default function ProfilePage() {
  const [showQR, setShowQR] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const menuItems = [
    { icon: <Star size={20} />, label: 'My Stories', count: '3', path: '/stories' },
    { icon: <BookOpen size={20} />, label: 'Memories', count: '', path: '/memories' },
    { icon: <Trophy size={20} />, label: 'Trophy Case', count: '12', path: '#' },
    { icon: <Users size={20} />, label: 'Best Friends', count: '5', path: '#' },
    { icon: <Eye size={20} />, label: 'Who Viewed Me', count: '28', path: '#' },
  ];

  const settingsItems = [
    { icon: <Moon size={20} />, label: 'Appearance', subtitle: 'Dark mode' },
    { icon: <Bell size={20} />, label: 'Notifications', subtitle: 'All enabled' },
    { icon: <Shield size={20} />, label: 'Privacy', subtitle: 'Friends only' },
    { icon: <Camera size={20} />, label: 'Camera Settings', subtitle: '' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', subtitle: '' },
    { icon: <LogOut size={20} />, label: 'Log Out', subtitle: '', danger: true },
  ];

  return (
    <div className="min-h-screen bg-snap-darkest pb-20">
      <TopBar showProfile={false} showSettings={false}>
        <button
          onClick={() => router.push('/settings')}
          className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Settings size={22} />
        </button>
      </TopBar>

      <div className="px-4 py-2">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="story-ring">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-snap-yellow to-orange-500 text-3xl font-bold text-black border-2 border-snap-darkest">
                  {user.displayName.charAt(0)}
                </div>
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-snap-yellow text-black">
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
                <button className="text-white/30 hover:text-white/50">
                  <Edit3 size={14} />
                </button>
              </div>
              <p className="text-sm text-white/40">@{user.username}</p>
              <p className="text-xs text-white/30 mt-1">{user.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <GlassCard className="p-3 text-center">
              <p className="text-lg font-bold gradient-text">{user.snapScore.toLocaleString()}</p>
              <p className="text-[10px] text-white/40">Snap Score</p>
            </GlassCard>
            <GlassCard className="p-3 text-center" onClick={() => setShowQR(true)}>
              <div className="flex justify-center mb-1">
                <QrCode size={20} className="text-snap-yellow" />
              </div>
              <p className="text-[10px] text-white/40">Snapcode</p>
            </GlassCard>
            <GlassCard className="p-3 text-center">
              <p className="text-lg font-bold text-white">42 🔥</p>
              <p className="text-[10px] text-white/40">Best Streak</p>
            </GlassCard>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <GlowButton size="sm" className="flex-1" icon={<Share2 size={16} />}>
              Share Profile
            </GlowButton>
            <GlowButton variant="secondary" size="sm" className="flex-1" icon={<Edit3 size={16} />}>
              Edit Profile
            </GlowButton>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-1 mb-6">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => item.path !== '#' && router.push(item.path)}
              className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all"
            >
              <div className="text-white/40">{item.icon}</div>
              <span className="flex-1 text-left text-sm font-medium text-white/80">
                {item.label}
              </span>
              {item.count && (
                <span className="text-xs text-white/30 mr-2">{item.count}</span>
              )}
              <ChevronRight size={16} className="text-white/20" />
            </motion.button>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-1 mb-6">
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
            Settings
          </h3>
          {settingsItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all ${
                'danger' in item && item.danger ? 'text-red-400' : ''
              }`}
              onClick={() => {
                if (item.label === 'Log Out') {
                  router.push('/');
                }
                if (item.label === 'Appearance') {
                  router.push('/settings');
                }
                if (item.label === 'Privacy') {
                  router.push('/settings');
                }
              }}
            >
              <div className={item.danger ? 'text-red-400/60' : 'text-white/40'}>
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <span
                  className={`text-sm font-medium ${
                    item.danger ? 'text-red-400' : 'text-white/80'
                  }`}
                >
                  {item.label}
                </span>
                {item.subtitle && (
                  <p className="text-[10px] text-white/30">{item.subtitle}</p>
                )}
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </motion.button>
          ))}
        </div>

        {/* Watermark */}
        <div className="text-center py-4">
          <p className="text-xs text-white/10">Made by Piyush ✨</p>
          <p className="text-[10px] text-white/5 mt-1">v1.0.0</p>
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal isOpen={showQR} onClose={() => setShowQR(false)} title="My Snapcode">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-2xl bg-white p-4">
            <QRCodeSVG
              value={`piyushsnap://user/${user.username}`}
              size={200}
              bgColor="white"
              fgColor="black"
              level="H"
              imageSettings={{
                src: '',
                height: 0,
                width: 0,
                excavate: false,
              }}
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-white">{user.displayName}</p>
            <p className="text-sm text-white/40">@{user.username}</p>
            <p className="text-xs text-white/20 mt-1">Scan to add friend</p>
          </div>
          <div className="flex gap-2 w-full">
            <GlowButton size="sm" className="flex-1" icon={<Share2 size={16} />}>
              Share
            </GlowButton>
            <GlowButton variant="secondary" size="sm" className="flex-1">
              Save Image
            </GlowButton>
          </div>
        </div>
      </Modal>

      <BottomNav />
    </div>
  );
}
