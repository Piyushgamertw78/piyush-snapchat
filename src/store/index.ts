import { create } from 'zustand';
import type {
  User,
  Chat,
  Message,
  Story,
  Snap,
  Notification,
  FriendRequest,
  Memory,
  DiscoverItem,
  MapMarker,
  CameraState,
} from '@/types';
import { generateId } from '@/utils/helpers';

// ===== Auth Store =====
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (data: { email: string; password: string; username: string; displayName: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  clearError: () => void;
}

const demoUser: User = {
  id: 'user_1',
  username: 'piyush_dev',
  displayName: 'Piyush',
  email: 'piyush@example.com',
  avatar: '',
  bio: 'Building cool stuff ✨',
  snapScore: 15420,
  snapcode: 'PS_DEV_42',
  createdAt: new Date().toISOString(),
  isOnline: true,
  lastSeen: new Date().toISOString(),
  settings: {
    privacy: {
      whoCanSendSnaps: 'friends',
      whoCanViewStory: 'friends',
      whoCanSeeLocation: 'friends',
      showInQuickAdd: true,
    },
    notifications: {
      snaps: true,
      chats: true,
      stories: true,
      friendRequests: true,
      sounds: true,
    },
    theme: 'dark',
  },
  trophies: [],
  streaks: [],
  bestFriends: ['user_2', 'user_3'],
  mutualFriends: [],
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (_email: string, _password: string) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 1000));
    set({ user: demoUser, isAuthenticated: true, isLoading: false });
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 1000));
    set({ user: demoUser, isAuthenticated: true, isLoading: false });
  },

  signup: async (data) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 1000));
    const newUser: User = {
      ...demoUser,
      id: generateId(),
      username: data.username,
      displayName: data.displayName,
      email: data.email,
    };
    set({ user: newUser, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateProfile: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },

  clearError: () => set({ error: null }),
}));

// ===== Chat Store =====
interface ChatStore {
  chats: Chat[];
  activeChat: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  sendMessage: (chatId: string, content: string, type?: Message['type']) => void;
  setActiveChat: (chatId: string | null) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
  addReaction: (chatId: string, messageId: string, emoji: string) => void;
}

const demoChats: Chat[] = [
  {
    id: 'chat_1',
    type: 'direct',
    participants: [
      {
        userId: 'user_2',
        user: { id: 'user_2', username: 'sarah_snaps', displayName: 'Sarah', avatar: '', isOnline: true },
        role: 'member',
        joinedAt: new Date().toISOString(),
      },
      {
        userId: 'user_1',
        user: { id: 'user_1', username: 'piyush_dev', displayName: 'Piyush', avatar: '', isOnline: true },
        role: 'member',
        joinedAt: new Date().toISOString(),
      },
    ],
    lastMessage: {
      id: 'msg_1',
      chatId: 'chat_1',
      senderId: 'user_2',
      type: 'text',
      content: 'Hey! Check out my new story 📸',
      reactions: [],
      readBy: [],
      deliveredTo: [],
      createdAt: new Date(Date.now() - 300000).toISOString(),
    },
    unreadCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isEncrypted: true,
  },
  {
    id: 'chat_2',
    type: 'direct',
    participants: [
      {
        userId: 'user_3',
        user: { id: 'user_3', username: 'alex_photos', displayName: 'Alex', avatar: '', isOnline: false },
        role: 'member',
        joinedAt: new Date().toISOString(),
      },
      {
        userId: 'user_1',
        user: { id: 'user_1', username: 'piyush_dev', displayName: 'Piyush', avatar: '', isOnline: true },
        role: 'member',
        joinedAt: new Date().toISOString(),
      },
    ],
    lastMessage: {
      id: 'msg_2',
      chatId: 'chat_2',
      senderId: 'user_1',
      type: 'text',
      content: 'That sunset snap was incredible! 🔥',
      reactions: [],
      readBy: ['user_3'],
      deliveredTo: ['user_3'],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    unreadCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isEncrypted: true,
  },
  {
    id: 'chat_3',
    type: 'group',
    participants: [
      {
        userId: 'user_2',
        user: { id: 'user_2', username: 'sarah_snaps', displayName: 'Sarah', avatar: '', isOnline: true },
        role: 'admin',
        joinedAt: new Date().toISOString(),
      },
      {
        userId: 'user_3',
        user: { id: 'user_3', username: 'alex_photos', displayName: 'Alex', avatar: '', isOnline: false },
        role: 'member',
        joinedAt: new Date().toISOString(),
      },
      {
        userId: 'user_1',
        user: { id: 'user_1', username: 'piyush_dev', displayName: 'Piyush', avatar: '', isOnline: true },
        role: 'member',
        joinedAt: new Date().toISOString(),
      },
    ],
    lastMessage: {
      id: 'msg_3',
      chatId: 'chat_3',
      senderId: 'user_2',
      type: 'text',
      content: 'Group trip this weekend? 🏖️',
      reactions: [{ userId: 'user_3', emoji: '🔥', createdAt: new Date().toISOString() }],
      readBy: ['user_3'],
      deliveredTo: ['user_3'],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
    unreadCount: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isEncrypted: true,
  },
];

const demoMessages: Record<string, Message[]> = {
  chat_1: [
    {
      id: 'msg_1_1',
      chatId: 'chat_1',
      senderId: 'user_2',
      type: 'text',
      content: 'Hey! How are you? 😊',
      reactions: [],
      readBy: ['user_1'],
      deliveredTo: ['user_1'],
      createdAt: new Date(Date.now() - 600000).toISOString(),
    },
    {
      id: 'msg_1_2',
      chatId: 'chat_1',
      senderId: 'user_1',
      type: 'text',
      content: 'I\'m great! Working on a new project 💻',
      reactions: [{ userId: 'user_2', emoji: '❤️', createdAt: new Date().toISOString() }],
      readBy: ['user_2'],
      deliveredTo: ['user_2'],
      createdAt: new Date(Date.now() - 500000).toISOString(),
    },
    {
      id: 'msg_1',
      chatId: 'chat_1',
      senderId: 'user_2',
      type: 'text',
      content: 'Hey! Check out my new story 📸',
      reactions: [],
      readBy: [],
      deliveredTo: ['user_1'],
      createdAt: new Date(Date.now() - 300000).toISOString(),
    },
  ],
  chat_2: [
    {
      id: 'msg_2',
      chatId: 'chat_2',
      senderId: 'user_1',
      type: 'text',
      content: 'That sunset snap was incredible! 🔥',
      reactions: [],
      readBy: ['user_3'],
      deliveredTo: ['user_3'],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
  chat_3: [
    {
      id: 'msg_3',
      chatId: 'chat_3',
      senderId: 'user_2',
      type: 'text',
      content: 'Group trip this weekend? 🏖️',
      reactions: [{ userId: 'user_3', emoji: '🔥', createdAt: new Date().toISOString() }],
      readBy: ['user_3'],
      deliveredTo: ['user_3'],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
};

export const useChatStore = create<ChatStore>((set) => ({
  chats: demoChats,
  activeChat: null,
  messages: demoMessages,
  isLoading: false,

  sendMessage: (chatId, content, type = 'text') => {
    const newMessage: Message = {
      id: generateId(),
      chatId,
      senderId: 'user_1',
      type,
      content,
      reactions: [],
      readBy: [],
      deliveredTo: [],
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), newMessage],
      },
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, lastMessage: newMessage, updatedAt: new Date().toISOString() }
          : chat
      ),
    }));
  },

  setActiveChat: (chatId) => set({ activeChat: chatId }),

  deleteMessage: (chatId, messageId) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: (state.messages[chatId] || []).filter((m) => m.id !== messageId),
      },
    }));
  },

  addReaction: (chatId, messageId, emoji) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: (state.messages[chatId] || []).map((m) =>
          m.id === messageId
            ? {
                ...m,
                reactions: [
                  ...m.reactions.filter((r) => r.userId !== 'user_1'),
                  { userId: 'user_1', emoji, createdAt: new Date().toISOString() },
                ],
              }
            : m
        ),
      },
    }));
  },
}));

// ===== Story Store =====
interface StoryStore {
  stories: Story[];
  myStories: Story[];
  isLoading: boolean;
  addStory: (item: Omit<Story, 'id' | 'createdAt' | 'expiresAt' | 'viewCount'>) => void;
  viewStory: (storyId: string) => void;
  reactToStory: (storyId: string, emoji: string) => void;
}

const demoStories: Story[] = [
  {
    id: 'story_1',
    userId: 'user_2',
    user: { id: 'user_2', username: 'sarah_snaps', displayName: 'Sarah', avatar: '' },
    items: [
      {
        id: 'si_1',
        type: 'photo',
        mediaUrl: 'https://picsum.photos/400/700?random=1',
        caption: 'Golden hour vibes ✨',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        duration: 5,
      },
    ],
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    viewCount: 142,
    isHighlight: false,
    isCollaborative: false,
  },
  {
    id: 'story_2',
    userId: 'user_3',
    user: { id: 'user_3', username: 'alex_photos', displayName: 'Alex', avatar: '' },
    items: [
      {
        id: 'si_2',
        type: 'photo',
        mediaUrl: 'https://picsum.photos/400/700?random=2',
        caption: 'City lights 🌃',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        duration: 5,
      },
      {
        id: 'si_3',
        type: 'video',
        mediaUrl: 'https://picsum.photos/400/700?random=3',
        caption: 'Night drive 🚗',
        createdAt: new Date(Date.now() - 2700000).toISOString(),
        duration: 10,
      },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 82800000).toISOString(),
    viewCount: 89,
    isHighlight: false,
    isCollaborative: false,
  },
  {
    id: 'story_4',
    userId: 'user_4',
    user: { id: 'user_4', username: 'emma_creates', displayName: 'Emma', avatar: '' },
    items: [
      {
        id: 'si_4',
        type: 'photo',
        mediaUrl: 'https://picsum.photos/400/700?random=4',
        caption: 'Beach day! 🏖️',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        duration: 5,
        poll: {
          id: 'poll_1',
          question: 'Best beach activity?',
          options: [
            { id: 'po_1', text: 'Surfing 🏄', votes: 45, votedBy: [] },
            { id: 'po_2', text: 'Tanning ☀️', votes: 32, votedBy: [] },
            { id: 'po_3', text: 'Volleyball 🏐', votes: 28, votedBy: [] },
          ],
          totalVotes: 105,
        },
      },
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    expiresAt: new Date(Date.now() + 79200000).toISOString(),
    viewCount: 234,
    isHighlight: false,
    isCollaborative: false,
  },
];

export const useStoryStore = create<StoryStore>((set) => ({
  stories: demoStories,
  myStories: [],
  isLoading: false,

  addStory: (story) => {
    const newStory: Story = {
      ...story,
      id: generateId(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      viewCount: 0,
    };
    set((state) => ({ myStories: [...state.myStories, newStory] }));
  },

  viewStory: (storyId) => {
    set((state) => ({
      stories: state.stories.map((s) =>
        s.id === storyId ? { ...s, viewCount: s.viewCount + 1 } : s
      ),
    }));
  },

  reactToStory: (storyId, _emoji) => {
    console.log('Reacted to story:', storyId);
  },
}));

// ===== Notification Store =====
interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const demoNotifications: Notification[] = [
  {
    id: 'notif_1',
    type: 'snap',
    title: 'New Snap',
    body: 'Sarah sent you a snap!',
    fromUserId: 'user_2',
    fromUser: { id: 'user_2', username: 'sarah_snaps', displayName: 'Sarah', avatar: '' },
    read: false,
    createdAt: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 'notif_2',
    type: 'friend_request',
    title: 'Friend Request',
    body: 'Jake wants to be your friend',
    fromUserId: 'user_5',
    fromUser: { id: 'user_5', username: 'jake_adventures', displayName: 'Jake', avatar: '' },
    read: false,
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'notif_3',
    type: 'story_view',
    title: 'Story View',
    body: 'Alex viewed your story',
    fromUserId: 'user_3',
    fromUser: { id: 'user_3', username: 'alex_photos', displayName: 'Alex', avatar: '' },
    read: false,
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'notif_4',
    type: 'streak',
    title: '🔥 Streak',
    body: 'You and Sarah have a 42-day streak!',
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: demoNotifications,
  unreadCount: demoNotifications.filter((n) => !n.read).length,

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));

// ===== Camera Store =====
interface CameraStoreExtended {
  camera: CameraState;
  setCamera: (state: Partial<CameraState>) => void;
  resetCamera: () => void;
  capturedMedia: Snap[];
  addCapturedMedia: (snap: Omit<Snap, 'id'>) => void;
}

const defaultCameraState: CameraState = {
  isActive: false,
  facingMode: 'user',
  flash: 'off',
  zoom: 1,
  timer: 0,
  filter: null,
  recording: false,
};

export const useCameraStore = create<CameraStoreExtended>((set) => ({
  camera: defaultCameraState,
  setCamera: (state) =>
    set((prev) => ({ camera: { ...prev.camera, ...state } })),
  resetCamera: () => set({ camera: defaultCameraState }),
  capturedMedia: [],
  addCapturedMedia: (snap) => {
    const newSnap: Snap = { ...snap, id: generateId() };
    set((state) => ({ capturedMedia: [...state.capturedMedia, newSnap] }));
  },
}));

// ===== Theme Store =====
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),
}));

// ===== Friend Store =====
interface FriendStore {
  friends: Pick<User, 'id' | 'username' | 'displayName' | 'avatar' | 'isOnline'>[];
  friendRequests: FriendRequest[];
  addFriend: (userId: string) => void;
  removeFriend: (userId: string) => void;
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
}

export const useFriendStore = create<FriendStore>((set) => ({
  friends: [
    { id: 'user_2', username: 'sarah_snaps', displayName: 'Sarah', avatar: '', isOnline: true },
    { id: 'user_3', username: 'alex_photos', displayName: 'Alex', avatar: '', isOnline: false },
    { id: 'user_4', username: 'emma_creates', displayName: 'Emma', avatar: '', isOnline: true },
    { id: 'user_5', username: 'jake_adventures', displayName: 'Jake', avatar: '', isOnline: false },
    { id: 'user_6', username: 'mike_codes', displayName: 'Mike', avatar: '', isOnline: true },
  ],
  friendRequests: [
    {
      id: 'fr_1',
      fromUserId: 'user_7',
      fromUser: { id: 'user_7', username: 'lisa_art', displayName: 'Lisa', avatar: '' },
      toUserId: 'user_1',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ],
  addFriend: (userId) => {
    console.log('Added friend:', userId);
  },
  removeFriend: (userId) => {
    set((state) => ({
      friends: state.friends.filter((f) => f.id !== userId),
    }));
  },
  acceptRequest: (requestId) => {
    set((state) => ({
      friendRequests: state.friendRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'accepted' as const } : r
      ),
    }));
  },
  declineRequest: (requestId) => {
    set((state) => ({
      friendRequests: state.friendRequests.filter((r) => r.id !== requestId),
    }));
  },
}));

// ===== Memories Store =====
interface MemoriesStore {
  memories: Memory[];
  isLoading: boolean;
  addMemory: (memory: Omit<Memory, 'id'>) => void;
}

export const useMemoriesStore = create<MemoriesStore>((set) => ({
  memories: [
    {
      id: 'mem_1',
      userId: 'user_1',
      type: 'photo',
      mediaUrl: 'https://picsum.photos/400/600?random=10',
      caption: 'On this day last year 🌅',
      tags: ['sunset', 'travel'],
      createdAt: new Date(Date.now() - 365 * 86400000).toISOString(),
      isHighlight: true,
    },
    {
      id: 'mem_2',
      userId: 'user_1',
      type: 'photo',
      mediaUrl: 'https://picsum.photos/400/600?random=11',
      caption: 'Best summer memories 🏖️',
      tags: ['summer', 'beach'],
      createdAt: new Date(Date.now() - 180 * 86400000).toISOString(),
      isHighlight: false,
    },
  ],
  isLoading: false,
  addMemory: (memory) => {
    set((state) => ({
      memories: [...state.memories, { ...memory, id: generateId() }],
    }));
  },
}));

// ===== Map Store =====
interface MapStore {
  markers: MapMarker[];
  ghostMode: boolean;
  toggleGhostMode: () => void;
}

export const useMapStore = create<MapStore>((set) => ({
  markers: [
    {
      userId: 'user_2',
      user: { id: 'user_2', username: 'sarah_snaps', displayName: 'Sarah', avatar: '' },
      location: { lat: 40.7128, lng: -74.006, timestamp: new Date().toISOString() },
      actionEmoji: '🏖️',
    },
    {
      userId: 'user_4',
      user: { id: 'user_4', username: 'emma_creates', displayName: 'Emma', avatar: '' },
      location: { lat: 40.758, lng: -73.9855, timestamp: new Date().toISOString() },
      actionEmoji: '🎵',
    },
  ],
  ghostMode: false,
  toggleGhostMode: () => set((state) => ({ ghostMode: !state.ghostMode })),
}));

// ===== Discover Store =====
interface DiscoverStore {
  items: DiscoverItem[];
  trending: string[];
  isLoading: boolean;
}

export const useDiscoverStore = create<DiscoverStore>(() => ({
  items: [
    {
      id: 'disc_1',
      type: 'trending',
      title: 'Summer Vibes ☀️',
      description: 'Best summer moments from around the world',
      thumbnail: 'https://picsum.photos/300/500?random=20',
      category: 'lifestyle',
      viewCount: 15000,
    },
    {
      id: 'disc_2',
      type: 'publisher',
      title: 'Tech News',
      description: 'Latest in technology',
      thumbnail: 'https://picsum.photos/300/500?random=21',
      publisher: 'TechDaily',
      category: 'news',
      viewCount: 8200,
    },
    {
      id: 'disc_3',
      type: 'trending',
      title: 'Foodie Adventures 🍕',
      description: 'Amazing food from around the globe',
      thumbnail: 'https://picsum.photos/300/500?random=22',
      category: 'food',
      viewCount: 12300,
    },
    {
      id: 'disc_4',
      type: 'publisher',
      title: 'Music Hits',
      description: 'Top charts this week',
      thumbnail: 'https://picsum.photos/300/500?random=23',
      publisher: 'MusicNow',
      category: 'music',
      viewCount: 45000,
    },
    {
      id: 'disc_5',
      type: 'suggested',
      title: 'Fitness Goals 💪',
      description: 'Get inspired by fitness journeys',
      thumbnail: 'https://picsum.photos/300/500?random=24',
      category: 'fitness',
      viewCount: 7800,
    },
    {
      id: 'disc_6',
      type: 'trending',
      title: 'Travel Diaries ✈️',
      description: 'Explore the world through snaps',
      thumbnail: 'https://picsum.photos/300/500?random=25',
      category: 'travel',
      viewCount: 22000,
    },
  ],
  trending: ['#SummerVibes', '#SunsetLovers', '#Foodie', '#TravelGram', '#TechLife'],
  isLoading: false,
}));
