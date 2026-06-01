'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Edit3,
  MoreHorizontal,
  Phone,
  Video,
  Shield,
} from 'lucide-react';
import { Avatar, Badge, GlassCard } from '@/components/ui';
import { TopBar, BottomNav } from '@/components/common';
import { useAuthStore, useChatStore } from '@/store';
import { formatTime } from '@/utils/helpers';

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user } = useAuthStore();
  const { chats } = useChatStore();

  const filteredChats = chats.filter((chat) => {
    if (!searchQuery) return true;
    const other = chat.participants.find((p) => p.userId !== user?.id);
    return other?.user.displayName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-snap-darkest pb-20">
      <TopBar title="Chat" showProfile>
        <button className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-all">
          <Edit3 size={20} />
        </button>
      </TopBar>

      <div className="px-4 py-2">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-snap-yellow/30 focus:outline-none"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => router.push('/camera')}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 min-w-[80px] transition-all hover:bg-white/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-snap-yellow/20">
              <Camera size={18} className="text-snap-yellow" />
            </div>
            <span className="text-[10px] text-white/50">Camera</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 min-w-[80px] transition-all hover:bg-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-snap-blue/20">
              <Phone size={18} className="text-snap-blue" />
            </div>
            <span className="text-[10px] text-white/50">Audio Call</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 min-w-[80px] transition-all hover:bg-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
              <Video size={18} className="text-purple-400" />
            </div>
            <span className="text-[10px] text-white/50">Video Call</span>
          </button>
        </div>

        {/* Chat List */}
        <div className="space-y-1">
          {filteredChats.map((chat) => {
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
                    name={
                      chat.type === 'group'
                        ? '👥'
                        : otherParticipant.user.displayName
                    }
                    size="md"
                    isOnline={otherParticipant.user.isOnline}
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-semibold text-white text-sm truncate">
                      {chat.type === 'group'
                        ? `Group (${chat.participants.length})`
                        : otherParticipant.user.displayName}
                    </p>
                    <span className="text-[10px] text-white/30 flex-shrink-0 ml-2">
                      {chat.lastMessage
                        ? formatTime(chat.lastMessage.createdAt)
                        : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {chat.isEncrypted && (
                      <Shield size={10} className="text-green-400 flex-shrink-0" />
                    )}
                    <p className="text-xs text-white/40 truncate">
                      {chat.lastMessage?.type === 'snap' && '📸 Snap • '}
                      {chat.lastMessage?.type === 'voice' && '🎤 Voice • '}
                      {chat.lastMessage?.content}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge
                        count={chat.unreadCount}
                        className="flex-shrink-0 ml-auto"
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Camera({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
