'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/helpers';
import { Bell, Settings, ChevronLeft, User } from 'lucide-react';
import { useNotificationStore, useAuthStore } from '@/store';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showProfile?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  transparent?: boolean;
  className?: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}

export function TopBar({
  title,
  showBack = false,
  showProfile = true,
  showNotifications = true,
  showSettings = false,
  transparent = false,
  className,
  rightContent,
}: TopBarProps) {
  const router = useRouter();
  const { unreadCount } = useNotificationStore();
  const { user } = useAuthStore();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between px-4 py-3',
        transparent
          ? 'bg-transparent'
          : 'border-b border-white/5 bg-snap-darker/80 backdrop-blur-2xl',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {showProfile && user && (
          <button
            onClick={() => router.push('/profile')}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-snap-yellow to-orange-500 text-sm font-bold text-black">
              {user.displayName.charAt(0)}
            </div>
          </button>
        )}
        {title && (
          <h1 className="text-lg font-bold text-white">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {rightContent}
        {showNotifications && (
          <button
            onClick={() => router.push('/notifications')}
            className="relative rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        )}
        {showSettings && (
          <button
            onClick={() => router.push('/settings')}
            className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Settings size={22} />
          </button>
        )}
        {!showProfile && !showBack && (
          <button
            onClick={() => router.push('/profile')}
            className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <User size={22} />
          </button>
        )}
      </div>
    </header>
  );
}
