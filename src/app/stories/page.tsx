'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Camera,
  Search,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';
import { Avatar, GlassCard, Badge } from '@/components/ui';
import { TopBar, BottomNav } from '@/components/common';
import { useAuthStore, useStoryStore, useChatStore } from '@/store';

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user } = useAuthStore();
  const { stories } = useStoryStore();
  const { chats } = useChatStore();
  const totalUnread = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  const currentStory = stories.find((s) => s.id === selectedStory);
  const currentStoryItem = currentStory?.items[storyProgress];

  return (
    <div className="min-h-screen bg-snap-darkest pb-20">
      <TopBar showProfile showNotifications />

      <div className="px-4 py-2">
        {/* Stories Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Stories</h2>
          <button
            onClick={() => router.push('/camera')}
            className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-all"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-snap-yellow/30 focus:outline-none"
          />
        </div>

        {/* My Story + Add */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => router.push('/camera')}
              className="relative"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-snap-yellow/40 bg-snap-yellow/10 transition-all hover:border-snap-yellow/60">
                <Plus size={24} className="text-snap-yellow" />
              </div>
            </button>
            <div>
              <p className="font-semibold text-white text-sm">Add to My Story</p>
              <p className="text-xs text-white/40">Tap to add</p>
            </div>
          </div>
        </div>

        {/* Friends' Stories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            Friends
          </h3>
          <div className="space-y-1">
            {stories.map((story) => (
              <motion.button
                key={story.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setSelectedStory(story.id);
                  setStoryProgress(0);
                }}
                className="flex w-full items-center gap-3 rounded-2xl p-3 transition-all hover:bg-white/5"
              >
                <div className="story-ring">
                  <Avatar
                    name={story.user.displayName}
                    size="md"
                    isOnline={true}
                    hasStory
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white text-sm">{story.user.displayName}</p>
                  <p className="text-xs text-white/40">
                    {story.items.length} {story.items.length === 1 ? 'story' : 'stories'} • {story.viewCount} views
                  </p>
                </div>
                <MoreHorizontal size={18} className="text-white/20" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick Chat */}
        <div>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            Recent Chats
          </h3>
          <div className="space-y-1">
            {chats.slice(0, 3).map((chat) => {
              const otherParticipant = chat.participants.find(
                (p) => p.userId !== user?.id
              );
              if (!otherParticipant) return null;
              return (
                <motion.button
                  key={chat.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => router.push(`/chat/${chat.id}`)}
                  className="flex w-full items-center gap-3 rounded-2xl p-3 transition-all hover:bg-white/5"
                >
                  <div className="relative">
                    <Avatar
                      name={otherParticipant.user.displayName}
                      size="md"
                      isOnline={otherParticipant.user.isOnline}
                    />
                    {chat.unreadCount > 0 && (
                      <Badge count={chat.unreadCount} className="absolute -top-1 -right-1" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white text-sm">
                        {chat.type === 'group'
                          ? 'Group Chat'
                          : otherParticipant.user.displayName}
                      </p>
                      <span className="text-[10px] text-white/30">2m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {chat.isEncrypted && (
                        <span className="text-[10px] text-green-400">🔒</span>
                      )}
                      <p className="text-xs text-white/40 truncate">
                        {chat.lastMessage?.content}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && currentStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Progress bars */}
            <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-4 pt-12">
              {currentStory.items.map((_, i) => (
                <div key={i} className="h-0.5 flex-1 rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '0%' }}
                    animate={{
                      width: i < storyProgress ? '100%' : i === storyProgress ? '100%' : '0%',
                    }}
                    transition={
                      i === storyProgress ? { duration: 5, ease: 'linear' } : { duration: 0 }
                    }
                    onAnimationComplete={() => {
                      if (i === storyProgress && storyProgress < currentStory.items.length - 1) {
                        setStoryProgress(storyProgress + 1);
                      } else if (i === storyProgress) {
                        setSelectedStory(null);
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-12 right-4 z-10 rounded-full bg-black/30 p-2 text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Story content */}
            <div className="relative h-full w-full">
              {currentStoryItem && (
                <div className="relative h-full w-full bg-gradient-to-br from-snap-dark via-snap-darker to-snap-darkest">
                  {/* Placeholder image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${currentStoryItem.mediaUrl})`,
                      }}
                    />
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Story info */}
                  <div className="absolute top-20 left-4 flex items-center gap-3">
                    <Avatar name={currentStory.user.displayName} size="sm" hasStory />
                    <div>
                      <p className="font-semibold text-white text-sm">{currentStory.user.displayName}</p>
                      <p className="text-[10px] text-white/50">
                        {currentStoryItem.createdAt ? new Date(currentStoryItem.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </p>
                    </div>
                  </div>

                  {/* Caption */}
                  {currentStoryItem.caption && (
                    <div className="absolute bottom-24 left-4 right-4 text-center">
                      <p className="text-lg font-semibold text-white drop-shadow-lg">
                        {currentStoryItem.caption}
                      </p>
                    </div>
                  )}

                  {/* Poll */}
                  {currentStoryItem.poll && (
                    <div className="absolute bottom-28 left-4 right-4 space-y-2">
                      <p className="text-sm font-medium text-white text-center mb-3">
                        📊 {currentStoryItem.poll.question}
                      </p>
                      {currentStoryItem.poll.options.map((option) => (
                        <div key={option.id} className="relative rounded-xl bg-white/10 p-3 backdrop-blur-sm border border-white/10">
                          <div
                            className="absolute inset-y-0 left-0 rounded-xl bg-snap-yellow/20"
                            style={{ width: `${(option.votes / currentStoryItem.poll!.totalVotes) * 100}%` }}
                          />
                          <div className="relative flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{option.text}</span>
                            <span className="text-xs text-white/50">
                              {Math.round((option.votes / currentStoryItem.poll!.totalVotes) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Story actions */}
                  <div className="absolute bottom-8 left-4 right-4 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Reply to story..."
                      className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 backdrop-blur-sm focus:outline-none focus:border-snap-yellow/30"
                    />
                    <button className="rounded-full p-2 text-white/60 hover:text-white transition-colors">
                      <Heart size={22} />
                    </button>
                    <button className="rounded-full p-2 text-white/60 hover:text-white transition-colors">
                      <Send size={22} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tap zones for navigation */}
            <div className="absolute inset-0 flex">
              <div
                className="w-1/3"
                onClick={() => {
                  if (storyProgress > 0) setStoryProgress(storyProgress - 1);
                }}
              />
              <div className="w-1/3" />
              <div
                className="w-1/3"
                onClick={() => {
                  if (storyProgress < (currentStory?.items.length || 0) - 1) {
                    setStoryProgress(storyProgress + 1);
                  } else {
                    setSelectedStory(null);
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
