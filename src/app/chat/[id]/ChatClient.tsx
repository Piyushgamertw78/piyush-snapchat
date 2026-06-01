'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Camera,
  Mic,
  Smile,
  Phone,
  Video,
  ChevronLeft,
  Shield,
  Image,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';
import { Avatar, GlowButton } from '@/components/ui';
import { useAuthStore, useChatStore } from '@/store';

const emojiList = ['❤️', '😂', '😢', '😮', '🔥', '👍', '👎', '🎉', '💯', '✨'];

export default function ChatDetailPage() {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const chatId = params?.id as string;
  const { user } = useAuthStore();
  const { chats, messages, sendMessage, addReaction } = useChatStore();

  const chat = chats.find((c) => c.id === chatId);
  const chatMessages = messages[chatId] || [];
  const otherParticipant = chat?.participants.find((p) => p.userId !== user?.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(chatId, message);
    setMessage('');
  };

  const handleReaction = (messageId: string, emoji: string) => {
    addReaction(chatId, messageId, emoji);
    setSelectedMessage(null);
  };

  return (
    <div className="flex h-screen flex-col bg-snap-darkest">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-snap-darker/50 backdrop-blur-xl px-4 py-3">
        <button
          onClick={() => router.back()}
          className="rounded-full p-1 text-white/70 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <Avatar
            name={otherParticipant?.user.displayName || 'Chat'}
            size="sm"
            isOnline={otherParticipant?.user.isOnline}
          />
          <div>
            <p className="font-semibold text-white text-sm">
              {chat?.type === 'group'
                ? `Group (${chat?.participants.length})`
                : otherParticipant?.user.displayName}
            </p>
            <p className="text-[10px] text-white/30">
              {otherParticipant?.user.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors">
            <Phone size={18} />
          </button>
          <button className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors">
            <Video size={18} />
          </button>
          <button className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* E2E Encryption Badge */}
      {chat?.isEncrypted && (
        <div className="flex items-center justify-center gap-1.5 py-2 bg-green-500/5">
          <Shield size={12} className="text-green-400" />
          <span className="text-[10px] text-green-400 font-medium">
            End-to-end encrypted
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        {chatMessages.map((msg, index) => {
          const isMe = msg.senderId === user?.id;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              onClick={() => setSelectedMessage(msg.id === selectedMessage ? null : msg.id)}
            >
              <div className="relative max-w-[75%]">
                {!isMe && (
                  <div className="mb-1 flex items-center gap-2">
                    <Avatar name={otherParticipant?.user.displayName || '?'} size="xs" />
                    <span className="text-[10px] text-white/30">
                      {otherParticipant?.user.displayName}
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 ${
                    isMe
                      ? 'bg-snap-yellow/20 text-white border border-snap-yellow/10'
                      : 'bg-white/10 text-white border border-white/5'
                  }`}
                >
                  {msg.type === 'snap' && (
                    <div className="mb-2 flex items-center gap-2 text-snap-yellow">
                      <Camera size={16} />
                      <span className="text-sm font-medium">📸 Snap</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <div className="mt-1 flex items-center justify-end gap-1">
                    <span className="text-[10px] text-white/20">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {isMe && (
                      <span className="text-[10px] text-snap-yellow/40">
                        {msg.readBy.length > 0 ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Reactions */}
                {msg.reactions.length > 0 && (
                  <div className="absolute -bottom-2 left-2 flex gap-0.5">
                    {msg.reactions.map((r, i) => (
                      <span key={i} className="text-xs bg-snap-darker rounded-full px-1 border border-white/10">
                        {r.emoji}
                      </span>
                    ))}
                  </div>
                )}

                {/* Reaction picker */}
                <AnimatePresence>
                  {selectedMessage === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 rounded-full bg-snap-dark border border-white/10 px-2 py-1 shadow-lg"
                    >
                      {emojiList.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReaction(msg.id, emoji);
                          }}
                          className="hover:scale-125 transition-transform p-0.5"
                        >
                          {emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-white/5 bg-snap-darker/50 backdrop-blur-xl px-4 py-3 pb-20">
        <div className="flex items-end gap-2">
          <div className="flex gap-1">
            <button className="rounded-full p-2 text-white/40 hover:bg-white/10 hover:text-white transition-colors">
              <Camera size={20} />
            </button>
            <button className="rounded-full p-2 text-white/40 hover:bg-white/10 hover:text-white transition-colors">
              <Image size={20} />
            </button>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder-white/30 focus:border-snap-yellow/30 focus:outline-none"
            />
            <button
              onClick={() => setShowEmojis(!showEmojis)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              <Smile size={18} />
            </button>
          </div>
          {message.trim() ? (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-snap-yellow text-black hover:shadow-glow-yellow transition-all"
            >
              <Send size={18} />
            </motion.button>
          ) : (
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-white transition-all">
              <Mic size={20} />
            </button>
          )}
        </div>

        {/* Emoji picker */}
        <AnimatePresence>
          {showEmojis && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 120, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2"
            >
              <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                {['😀', '😂', '🥰', '😎', '🤩', '😢', '😡', '🥳', '🤗', '😴',
                  '❤️', '🔥', '⭐', '💯', '🎉', '🎵', '🌈', '🍕', '🌍', '✈️',
                  '📸', '🎬', '🎮', '⚡', '🌙', '☀️', '🌺', '🎨', '💎', '🦋'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setMessage(message + emoji);
                      setShowEmojis(false);
                    }}
                    className="text-xl hover:scale-125 transition-transform p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
