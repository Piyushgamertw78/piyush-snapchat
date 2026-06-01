'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Bell,
  Camera,
  Users,
  Flame,
  UserPlus,
  Eye,
  Heart,
  MessageCircle,
  Check,
  CheckCheck,
} from 'lucide-react';
import { Avatar, GlowButton } from '@/components/ui';
import { useNotificationStore } from '@/store';
import { timeAgo } from '@/utils/helpers';

const notifIcons: Record<string, React.ReactNode> = {
  snap: <Camera size={16} className="text-snap-yellow" />,
  chat: <MessageCircle size={16} className="text-snap-blue" />,
  story_view: <Eye size={16} className="text-purple-400" />,
  friend_request: <UserPlus size={16} className="text-green-400" />,
  friend_accept: <Users size={16} className="text-green-400" />,
  streak: <Flame size={16} className="text-orange-400" />,
  screenshot: <Camera size={16} className="text-red-400" />,
  mention: <Heart size={16} className="text-pink-400" />,
};

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotificationStore();

  return (
    <div className="min-h-screen bg-snap-darkest">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-snap-darker/80 backdrop-blur-2xl px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-full p-1.5 text-white/70 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <GlowButton variant="ghost" size="sm" onClick={markAllAsRead}>
            <CheckCheck size={14} className="mr-1" />
            Read all
          </GlowButton>
        </div>
      </div>

      <div className="px-4 py-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell size={48} className="text-white/10 mb-4" />
            <p className="text-white/30 text-sm">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => markAsRead(notif.id)}
                className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                  notif.read
                    ? 'bg-transparent'
                    : 'bg-snap-yellow/5 border border-snap-yellow/10'
                } hover:bg-white/5`}
              >
                <div className="relative">
                  {notif.fromUser ? (
                    <Avatar name={notif.fromUser.displayName} size="md" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                      <Bell size={20} className="text-white/30" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-snap-darker border border-white/10">
                    {notifIcons[notif.type] || <Bell size={10} className="text-white/30" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80">
                    <span className="font-semibold">{notif.title}</span>
                    {' — '}
                    {notif.body}
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5">{timeAgo(notif.createdAt)}</p>
                </div>
                {!notif.read && (
                  <div className="h-2 w-2 rounded-full bg-snap-yellow flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {notifications.length > 0 && (
          <div className="mt-6 text-center">
            <GlowButton variant="ghost" size="sm" onClick={clearAll}>
              Clear all notifications
            </GlowButton>
          </div>
        )}
      </div>
    </div>
  );
}
