'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  Sparkles,
  Hash,
  Bookmark,
  Play,
  Eye,
} from 'lucide-react';
import { GlassCard, Avatar } from '@/components/ui';
import { TopBar, BottomNav } from '@/components/common';
import { useDiscoverStore } from '@/store';
import { formatCount } from '@/utils/helpers';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();
  const { items, trending } = useDiscoverStore();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'trending', label: '🔥 Trending' },
    { id: 'news', label: '📰 News' },
    { id: 'lifestyle', label: '✨ Lifestyle' },
    { id: 'music', label: '🎵 Music' },
    { id: 'food', label: '🍕 Food' },
    { id: 'travel', label: '✈️ Travel' },
    { id: 'fitness', label: '💪 Fitness' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? items
      : items.filter(
          (item) =>
            item.category === activeCategory ||
            item.type === activeCategory
        );

  return (
    <div className="min-h-screen bg-snap-darkest pb-20">
      <TopBar title="Discover" showProfile showSettings />

      <div className="px-4 py-2">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="text"
            placeholder="Search topics, people, stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-snap-yellow/30 focus:outline-none"
          />
        </div>

        {/* Trending Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-snap-yellow" />
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Trending
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {trending.map((tag) => (
              <button
                key={tag}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 hover:border-snap-yellow/20 hover:bg-snap-yellow/5 hover:text-snap-yellow transition-all whitespace-nowrap"
              >
                <Hash size={12} />
                {tag.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-snap-yellow text-black'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="overflow-hidden" hover>
                <div className="relative">
                  <div
                    className="aspect-[3/4] w-full bg-cover bg-center rounded-t-2xl"
                    style={{
                      backgroundImage: `url(${item.thumbnail})`,
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Play button */}
                    {item.type === 'publisher' && (
                      <div className="absolute top-2 right-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                          <Play size={14} className="text-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* View count */}
                    {item.viewCount && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5 backdrop-blur-sm">
                        <Eye size={10} className="text-white/60" />
                        <span className="text-[10px] text-white/60">
                          {formatCount(item.viewCount)}
                        </span>
                      </div>
                    )}

                    {/* Content info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="font-semibold text-white text-sm leading-tight mb-1">
                        {item.title}
                      </p>
                      {item.publisher && (
                        <p className="text-[10px] text-white/50">{item.publisher}</p>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Suggested Friends */}
        <div className="mt-6 mb-4">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            Suggested Friends
          </h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {[
              { name: 'Mia', username: 'mia_art' },
              { name: 'James', username: 'james_fitness' },
              { name: 'Luna', username: 'luna_music' },
              { name: 'Kai', username: 'kai_travels' },
            ].map((friend) => (
              <div
                key={friend.username}
                className="flex flex-col items-center gap-2 min-w-[80px]"
              >
                <Avatar name={friend.name} size="lg" />
                <p className="text-xs font-medium text-white text-center">{friend.name}</p>
                <button className="rounded-full bg-snap-yellow/10 px-3 py-1 text-[10px] font-medium text-snap-yellow hover:bg-snap-yellow/20 transition-all">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
