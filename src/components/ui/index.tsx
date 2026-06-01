'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/utils/helpers';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = true, gradient = false, onClick }: GlassCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300',
        hover && 'hover:border-white/20 hover:shadow-glass hover:-translate-y-0.5',
        gradient && 'bg-gradient-to-br from-white/10 to-white/5',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={
        isHovered
          ? {
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,252,0,0.08) 0%, transparent 50%), rgba(255,255,255,0.05)`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
}

export function GlowButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  icon,
}: GlowButtonProps) {
  const variants = {
    primary:
      'bg-snap-yellow text-black font-bold hover:shadow-glow-yellow active:scale-95',
    secondary:
      'bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95',
    ghost: 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white active:scale-95',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-base rounded-xl',
    lg: 'px-8 py-3.5 text-lg rounded-2xl',
  };

  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
}

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  name?: string;
}

export function InputField({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  icon,
  error,
  className,
  name,
}: InputFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="text-sm font-medium text-white/60">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            {icon}
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 backdrop-blur-sm transition-all focus:border-snap-yellow/50 focus:outline-none focus:ring-2 focus:ring-snap-yellow/20',
            icon && 'pl-10',
            error && 'border-red-500/50'
          )}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  hasStory?: boolean;
  className?: string;
}

export function Avatar({
  src,
  name,
  size = 'md',
  isOnline,
  hasStory = false,
  className,
}: AvatarProps) {
  const sizes = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('relative inline-flex', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full font-bold',
          sizes[size],
          hasStory && 'ring-2 ring-snap-yellow ring-offset-2 ring-offset-snap-darker',
          src ? '' : 'bg-gradient-to-br from-snap-yellow to-orange-500 text-black'
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-snap-darker',
            isOnline ? 'bg-green-400' : 'bg-gray-500'
          )}
        />
      )}
    </div>
  );
}

interface BadgeProps {
  count: number;
  className?: string;
}

export function Badge({ count, className }: BadgeProps) {
  if (count <= 0) return null;
  return (
    <span
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

interface TabBarProps {
  activeTab: string;
  tabs: { id: string; label: string; icon: React.ReactNode }[];
  onChange: (id: string) => void;
}

export function TabBar({ activeTab, tabs, onChange }: TabBarProps) {
  return (
    <div className="flex items-center justify-around border-b border-white/10 bg-snap-darker/80 backdrop-blur-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            'flex flex-col items-center gap-1 px-6 py-3 transition-all',
            activeTab === tab.id
              ? 'text-snap-yellow border-b-2 border-snap-yellow'
              : 'text-white/40 hover:text-white/60'
          )}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full max-w-md rounded-3xl border border-white/10 bg-snap-dark/95 p-6 backdrop-blur-xl animate-scale-in shadow-3d',
          className
        )}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type = 'info', isVisible, onClose }: ToastProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  const bgColors = {
    success: 'bg-green-500/20 border-green-500/30 text-green-300',
    error: 'bg-red-500/20 border-red-500/30 text-red-300',
    info: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-xl',
          bgColors[type]
        )}
      >
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-white/50 hover:text-white">
          ✕
        </button>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={cn('animate-spin rounded-full border-2 border-white/10 border-t-snap-yellow', sizes[size])} />
  );
}

export function ShimmerEffect() {
  return (
    <div className="animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] rounded-lg h-4 w-full" />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-xl bg-white/5', className)} />
  );
}

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  label?: string;
}

export function FloatingActionButton({ icon, onClick, className, label }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-snap-yellow text-black shadow-glow-yellow transition-all hover:scale-110 active:scale-95',
        className
      )}
      aria-label={label || 'Action'}
    >
      {icon}
    </button>
  );
}
