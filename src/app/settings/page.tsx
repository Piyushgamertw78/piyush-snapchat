'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Bell,
  Moon,
  User,
  Lock,
  Smartphone,
  HardDrive,
  Users,
  Link2,
  HelpCircle,
  Info,
  LogOut,
  Eye,
  MessageCircle,
  MapPin,
  Volume2,
  Vibrate,
  Mail,
  Trash2,
} from 'lucide-react';
import { GlassCard, GlowButton } from '@/components/ui';
import { useAuthStore } from '@/store';

interface SettingToggleProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function SettingToggle({ icon, label, subtitle, enabled, onChange }: SettingToggleProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
      <div className="text-white/40">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white/80">{label}</p>
        {subtitle && <p className="text-xs text-white/30">{subtitle}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          enabled ? 'bg-snap-yellow' : 'bg-white/10'
        }`}
      >
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    sounds: true,
    vibration: true,
    emailNotifs: false,
    snapNotifs: true,
    chatNotifs: true,
    storyNotifs: true,
    friendNotifs: true,
    ghostMode: false,
    twoFactor: false,
  });

  const updateSetting = (key: keyof typeof settings) => (value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-snap-darkest">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-white/5 bg-snap-darker/80 backdrop-blur-2xl px-4 py-3">
        <button
          onClick={() => router.back()}
          className="rounded-full p-1.5 text-white/70 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Settings</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Account Section */}
        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
            Account
          </h3>
          <GlassCard>
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <User size={20} className="text-white/40" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white/80">Edit Profile</p>
                <p className="text-xs text-white/30">Name, username, avatar, bio</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Lock size={20} className="text-white/40" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white/80">Change Password</p>
                <p className="text-xs text-white/30">Last changed 30 days ago</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Smartphone size={20} className="text-white/40" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white/80">Phone Number</p>
                <p className="text-xs text-white/30">{user?.phone || 'Not set'}</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Mail size={20} className="text-white/40" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white/80">Email</p>
                <p className="text-xs text-white/30">{user?.email || 'Not set'}</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </button>
          </GlassCard>
        </div>

        {/* Privacy */}
        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
            Privacy
          </h3>
          <GlassCard>
            <div className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Eye size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Who Can See My Stories</p>
                <p className="text-xs text-snap-yellow/50">Friends</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </div>
            <div className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <MessageCircle size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Who Can Send Me Snaps</p>
                <p className="text-xs text-snap-yellow/50">Friends</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </div>
            <div className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <MapPin size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Location Sharing</p>
                <p className="text-xs text-snap-yellow/50">Friends</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </div>
            <div className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Users size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Blocked Users</p>
                <p className="text-xs text-white/30">0 blocked</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </div>
            <SettingToggle
              icon={<Shield size={20} />}
              label="Two-Factor Authentication"
              subtitle="Extra security for your account"
              enabled={settings.twoFactor}
              onChange={updateSetting('twoFactor')}
            />
          </GlassCard>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
            Notifications
          </h3>
          <GlassCard>
            <SettingToggle
              icon={<Bell size={20} />}
              label="Push Notifications"
              enabled={settings.notifications}
              onChange={updateSetting('notifications')}
            />
            <SettingToggle
              icon={<Volume2 size={20} />}
              label="Sounds"
              enabled={settings.sounds}
              onChange={updateSetting('sounds')}
            />
            <SettingToggle
              icon={<Vibrate size={20} />}
              label="Vibration"
              enabled={settings.vibration}
              onChange={updateSetting('vibration')}
            />
            <SettingToggle
              icon={<Mail size={20} />}
              label="Email Notifications"
              enabled={settings.emailNotifs}
              onChange={updateSetting('emailNotifs')}
            />
          </GlassCard>
        </div>

        {/* Appearance */}
        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
            Appearance
          </h3>
          <GlassCard>
            <SettingToggle
              icon={<Moon size={20} />}
              label="Dark Mode"
              subtitle="Use dark theme"
              enabled={settings.darkMode}
              onChange={updateSetting('darkMode')}
            />
          </GlassCard>
        </div>

        {/* Data & Storage */}
        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
            Data & Storage
          </h3>
          <GlassCard>
            <div className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <HardDrive size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Storage Usage</p>
                <p className="text-xs text-white/30">2.4 GB used</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </div>
            <div className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Link2 size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Linked Devices</p>
                <p className="text-xs text-white/30">1 device connected</p>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </div>
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Trash2 size={20} className="text-red-400/60" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-red-400">Clear Cache</p>
                <p className="text-xs text-white/30">Free up storage space</p>
              </div>
            </button>
          </GlassCard>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
            Support
          </h3>
          <GlassCard>
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <HelpCircle size={20} className="text-white/40" />
              <span className="text-sm font-medium text-white/80">Help & Support</span>
              <ChevronRight size={16} className="text-white/20 ml-auto" />
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all">
              <Info size={20} className="text-white/40" />
              <span className="text-sm font-medium text-white/80">About</span>
              <ChevronRight size={16} className="text-white/20 ml-auto" />
            </button>
          </GlassCard>
        </div>

        {/* Logout */}
        <div className="pt-2 pb-8">
          <GlowButton
            variant="danger"
            size="lg"
            className="w-full"
            icon={<LogOut size={18} />}
            onClick={() => router.push('/')}
          >
            Log Out
          </GlowButton>
          <p className="text-center mt-4 text-xs text-white/10">
            Made by Piyush ✨ • v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
