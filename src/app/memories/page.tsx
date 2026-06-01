'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  MapPin,
  Heart,
  Star,
  Bookmark,
  ChevronLeft,
  Grid3x3,
  Image,
  Play,
} from 'lucide-react';
import { GlassCard, Avatar, GlowButton } from '@/components/ui';
import { TopBar, BottomNav } from '@/components/common';
import { useMemoriesStore } from '@/store';

export default function MemoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'flashback' | 'highlights' | 'saved'>('all');
  const { memories } = useMemoriesStore();

  return (
    <div className="min-h-screen bg-snap-darkest pb-20">
      <TopBar title="Memories" showProfile showSettings />

      <div className="px-4 py-2">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-snap-yellow/30 focus:outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {[
            { id: 'all', label: 'All', icon: <Grid3x3 size={14} /> },
            { id: 'flashback', label: '⏪ Flashback', icon: <Calendar size={14} /> },
            { id: 'highlights', label: '⭐ Highlights', icon: <Star size={14} /> },
            { id: 'saved', label: '🔖 Saved', icon: <Bookmark size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-snap-yellow text-black'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Flashback Card */}
        {activeTab === 'flashback' || activeTab === 'all' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <GlassCard className="overflow-hidden" gradient>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⏪</span>
                  <div>
                    <p className="font-semibold text-white text-sm">On This Day</p>
                    <p className="text-xs text-white/40">1 year ago</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-snap-yellow/20 to-orange-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl mb-2">🌅</p>
                      <p className="text-white/60 text-sm">On this day last year</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <GlowButton size="sm" className="flex-1">View Memory</GlowButton>
                  <button className="rounded-xl border border-white/10 p-2 text-white/40 hover:bg-white/5 hover:text-white transition-all">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ) : null}

        {/* Memories Grid */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            {activeTab === 'all' ? 'All Memories' : activeTab === 'highlights' ? 'Highlights' : 'Saved'}
          </h3>
          <div className="grid grid-cols-3 gap-1.5">
            {memories.map((memory) => (
              <motion.div
                key={memory.id}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${memory.mediaUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {memory.type === 'video' && (
                  <div className="absolute top-1 right-1">
                    <Play size={12} className="text-white drop-shadow" />
                  </div>
                )}
                {memory.isHighlight && (
                  <div className="absolute bottom-1 left-1">
                    <Star size={10} className="text-snap-yellow" fill="currentColor" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Placeholder items */}
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={`placeholder_${i}`}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://picsum.photos/200/200?random=${30 + i})`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Reels */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            Highlight Reels
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {['Summer 2025', 'Travel', 'Friends', 'Adventures'].map((reel) => (
              <div key={reel} className="flex flex-col items-center gap-2 min-w-[90px]">
                <div className="story-ring">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-snap-yellow/20 to-orange-500/20 border-2 border-snap-darker">
                    <Image size={20} className="text-snap-yellow" />
                  </div>
                </div>
                <span className="text-xs text-white/50 text-center">{reel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
