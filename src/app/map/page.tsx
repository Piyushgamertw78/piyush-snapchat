'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Locate,
  Eye,
  EyeOff,
  Settings,
  Users,
  MapPin,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Avatar, GlassCard, GlowButton } from '@/components/ui';
import { TopBar, BottomNav } from '@/components/common';
import { useMapStore } from '@/store';

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(12);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const { markers, ghostMode, toggleGhostMode } = useMapStore();

  return (
    <div className="relative min-h-screen bg-snap-darkest pb-20">
      <TopBar title="Snap Map" showProfile transparent />

      {/* Map View */}
      <div className="relative h-[calc(100vh-140px)] w-full overflow-hidden">
        {/* Simulated map background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(15, 173, 255, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 70% 60%, rgba(155, 89, 182, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 50% 80%, rgba(255, 252, 0, 0.05) 0%, transparent 40%),
              linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)
            `,
          }}
        >
          {/* Grid lines for map effect */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: `${50 / (zoom / 12)}px ${50 / (zoom / 12)}px`,
            }}
          />
        </div>

        {/* Friend markers */}
        {markers.map((marker) => (
          <motion.button
            key={marker.userId}
            className="absolute z-10"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${20 + Math.random() * 50}%`,
            }}
            onClick={() =>
              setSelectedFriend(
                selectedFriend === marker.userId ? null : marker.userId
              )
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="rounded-full border-2 border-snap-yellow/40 bg-snap-darker/80 backdrop-blur-sm p-1">
                <Avatar name={marker.user.displayName} size="sm" />
              </div>
              {marker.actionEmoji && (
                <span className="absolute -bottom-1 -right-1 text-sm bg-snap-darker rounded-full p-0.5 border border-white/10">
                  {marker.actionEmoji}
                </span>
              )}
            </div>
          </motion.button>
        ))}

        {/* Heatmap zones */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <div className="h-32 w-32 rounded-full bg-snap-yellow/10 blur-[40px] animate-pulse-glow" />
        </div>
        <div className="absolute top-1/2 left-1/4">
          <div className="h-24 w-24 rounded-full bg-snap-blue/10 blur-[30px] animate-pulse-glow" />
        </div>

        {/* Selected friend info */}
        {selectedFriend && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 left-4 right-4 z-20"
          >
            <GlassCard className="p-4">
              {(() => {
                const marker = markers.find((m) => m.userId === selectedFriend);
                if (!marker) return null;
                return (
                  <div className="flex items-center gap-3">
                    <Avatar name={marker.user.displayName} size="lg" isOnline />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{marker.user.displayName}</p>
                      <p className="text-xs text-white/40">@{marker.user.username}</p>
                      {marker.actionEmoji && (
                        <p className="text-sm mt-1">{marker.actionEmoji} Active now</p>
                      )}
                    </div>
                    <GlowButton size="sm">Chat</GlowButton>
                  </div>
                );
              })()}
            </GlassCard>
          </motion.div>
        )}

        {/* Search bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-snap-darker/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 backdrop-blur-xl focus:border-snap-yellow/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          <button
            onClick={() => setZoom(Math.min(zoom + 2, 20))}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-snap-darker/80 border border-white/10 backdrop-blur-xl text-white/60 hover:text-white transition-colors"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 2, 5))}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-snap-darker/80 border border-white/10 backdrop-blur-xl text-white/60 hover:text-white transition-colors"
          >
            <ZoomOut size={18} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-snap-darker/80 border border-white/10 backdrop-blur-xl text-white/60 hover:text-white transition-colors">
            <Locate size={18} />
          </button>
        </div>

        {/* Ghost mode toggle */}
        <div className="absolute left-4 bottom-24 z-10">
          <button
            onClick={toggleGhostMode}
            className={`flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-xl border transition-all ${
              ghostMode
                ? 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-snap-darker/80 border-white/10 text-white/60'
            }`}
          >
            {ghostMode ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="text-xs font-medium">
              {ghostMode ? 'Ghost Mode' : 'Visible'}
            </span>
          </button>
        </div>

        {/* Friends list strip */}
        <div className="absolute bottom-24 right-4 z-10">
          <div className="flex flex-col gap-2">
            {markers.map((marker) => (
              <button
                key={marker.userId}
                onClick={() =>
                  setSelectedFriend(
                    selectedFriend === marker.userId ? null : marker.userId
                  )
                }
                className={`rounded-full p-0.5 transition-all ${
                  selectedFriend === marker.userId
                    ? 'ring-2 ring-snap-yellow'
                    : ''
                }`}
              >
                <Avatar name={marker.user.displayName} size="sm" isOnline={true} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
