'use client';

import React from 'react';
import { cn } from '@/utils/helpers';
import { usePathname, useRouter } from 'next/navigation';
import {
  MessageCircle,
  Camera,
  Users,
  Search,
  MapPin,
} from 'lucide-react';

const navItems = [
  { id: 'map', label: 'Map', icon: MapPin, path: '/map' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
  { id: 'camera', label: 'Camera', icon: Camera, path: '/camera' },
  { id: 'stories', label: 'Stories', icon: Users, path: '/stories' },
  { id: 'discover', label: 'Discover', icon: Search, path: '/discover' },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-snap-darker/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path || pathname?.startsWith(item.path + '/');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all duration-200',
                isActive
                  ? 'text-snap-yellow bg-snap-yellow/10'
                  : 'text-white/40 hover:text-white/60'
              )}
            >
              <Icon
                className={cn(
                  'transition-all duration-200',
                  isActive ? 'scale-110' : 'scale-100'
                )}
                size={24}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
      {/* Home indicator */}
      <div className="flex justify-center pb-1">
        <div className="h-1 w-32 rounded-full bg-white/20" />
      </div>
    </nav>
  );
}
