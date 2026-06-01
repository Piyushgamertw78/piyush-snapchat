import { describe, it, expect } from 'vitest';
import {
  useAuthStore,
  useChatStore,
  useStoryStore,
  useNotificationStore,
  useThemeStore,
  useFriendStore,
  useMemoriesStore,
  useMapStore,
  useDiscoverStore,
} from '@/store';

describe('Auth Store', () => {
  it('should start with no user', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should login successfully', async () => {
    const { login } = useAuthStore.getState();
    await login('test@example.com', 'password');
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).not.toBeNull();
    expect(state.user?.email).toBe('piyush@example.com');
  });

  it('should logout', () => {
    const { logout } = useAuthStore.getState();
    logout();
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should login with Google', async () => {
    const { loginWithGoogle } = useAuthStore.getState();
    await loginWithGoogle();
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
  });

  it('should update profile', () => {
    const { login, updateProfile } = useAuthStore.getState();
    login('test@example.com', 'password');
    updateProfile({ displayName: 'New Name' });
    const state = useAuthStore.getState();
    expect(state.user?.displayName).toBe('New Name');
  });

  it('should clear error', () => {
    const { clearError } = useAuthStore.getState();
    clearError();
    expect(useAuthStore.getState().error).toBeNull();
  });
});

describe('Chat Store', () => {
  it('should have demo chats', () => {
    const state = useChatStore.getState();
    expect(state.chats.length).toBeGreaterThan(0);
  });

  it('should send a message', () => {
    const { sendMessage } = useChatStore.getState();
    sendMessage('chat_1', 'Test message');
    const state = useChatStore.getState();
    const messages = state.messages['chat_1'];
    const lastMsg = messages[messages.length - 1];
    expect(lastMsg.content).toBe('Test message');
    expect(lastMsg.senderId).toBe('user_1');
  });

  it('should set active chat', () => {
    const { setActiveChat } = useChatStore.getState();
    setActiveChat('chat_1');
    expect(useChatStore.getState().activeChat).toBe('chat_1');
  });

  it('should delete a message', () => {
    const { messages, sendMessage, deleteMessage } = useChatStore.getState();
    sendMessage('chat_2', 'To be deleted');
    const msgId = useChatStore.getState().messages['chat_2'].slice(-1)[0].id;
    deleteMessage('chat_2', msgId);
    const remaining = useChatStore.getState().messages['chat_2'];
    expect(remaining.find((m) => m.id === msgId)).toBeUndefined();
  });

  it('should add a reaction', () => {
    const { sendMessage, addReaction } = useChatStore.getState();
    sendMessage('chat_1', 'React to this');
    const msgs = useChatStore.getState().messages['chat_1'];
    const msgId = msgs[msgs.length - 1].id;
    addReaction('chat_1', msgId, '🔥');
    const updated = useChatStore.getState().messages['chat_1'];
    const msg = updated.find((m) => m.id === msgId);
    expect(msg?.reactions.some((r) => r.emoji === '🔥')).toBe(true);
  });
});

describe('Story Store', () => {
  it('should have demo stories', () => {
    const state = useStoryStore.getState();
    expect(state.stories.length).toBeGreaterThan(0);
  });

  it('should increment view count', () => {
    const { viewStory } = useStoryStore.getState();
    const storyId = useStoryStore.getState().stories[0].id;
    const initialViews = useStoryStore.getState().stories[0].viewCount;
    viewStory(storyId);
    const updated = useStoryStore.getState().stories[0];
    expect(updated.viewCount).toBe(initialViews + 1);
  });

  it('should add a new story', () => {
    const { addStory } = useStoryStore.getState();
    addStory({
      userId: 'user_1',
      user: { id: 'user_1', username: 'test', displayName: 'Test', avatar: '' },
      items: [],
      isHighlight: false,
      isCollaborative: false,
    });
    const state = useStoryStore.getState();
    expect(state.myStories.length).toBeGreaterThan(0);
  });
});

describe('Notification Store', () => {
  it('should have demo notifications', () => {
    const state = useNotificationStore.getState();
    expect(state.notifications.length).toBeGreaterThan(0);
  });

  it('should mark as read', () => {
    const { markAsRead } = useNotificationStore.getState();
    const notifId = useNotificationStore.getState().notifications[0].id;
    markAsRead(notifId);
    const notif = useNotificationStore.getState().notifications[0];
    expect(notif.read).toBe(true);
  });

  it('should mark all as read', () => {
    useNotificationStore.getState().markAllAsRead();
    const state = useNotificationStore.getState();
    expect(state.unreadCount).toBe(0);
    state.notifications.forEach((n) => expect(n.read).toBe(true));
  });

  it('should clear all', () => {
    useNotificationStore.getState().clearAll();
    const state = useNotificationStore.getState();
    expect(state.notifications.length).toBe(0);
    expect(state.unreadCount).toBe(0);
  });
});

describe('Theme Store', () => {
  it('should start with dark theme', () => {
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('should toggle theme', () => {
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('light');
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('should set specific theme', () => {
    useThemeStore.getState().setTheme('light');
    expect(useThemeStore.getState().theme).toBe('light');
    useThemeStore.getState().setTheme('dark');
  });
});

describe('Friend Store', () => {
  it('should have demo friends', () => {
    const state = useFriendStore.getState();
    expect(state.friends.length).toBeGreaterThan(0);
  });

  it('should remove a friend', () => {
    const { removeFriend } = useFriendStore.getState();
    const initialCount = useFriendStore.getState().friends.length;
    removeFriend('user_5');
    expect(useFriendStore.getState().friends.length).toBe(initialCount - 1);
  });

  it('should accept friend request', () => {
    const { acceptRequest } = useFriendStore.getState();
    const fr = useFriendStore.getState().friendRequests[0];
    if (fr) {
      acceptRequest(fr.id);
      const updated = useFriendStore.getState().friendRequests.find(
        (r) => r.id === fr.id
      );
      expect(updated?.status).toBe('accepted');
    }
  });

  it('should decline friend request', () => {
    const { declineRequest } = useFriendStore.getState();
    const initialCount = useFriendStore.getState().friendRequests.length;
    if (initialCount > 0) {
      declineRequest(useFriendStore.getState().friendRequests[0].id);
      expect(useFriendStore.getState().friendRequests.length).toBeLessThan(initialCount);
    }
  });
});

describe('Memories Store', () => {
  it('should have demo memories', () => {
    expect(useMemoriesStore.getState().memories.length).toBeGreaterThan(0);
  });

  it('should add a memory', () => {
    useMemoriesStore.getState().addMemory({
      userId: 'user_1',
      type: 'photo',
      mediaUrl: 'test.jpg',
      tags: ['test'],
      createdAt: new Date().toISOString(),
      isHighlight: false,
    });
    const memories = useMemoriesStore.getState().memories;
    expect(memories.some((m) => m.mediaUrl === 'test.jpg')).toBe(true);
  });
});

describe('Map Store', () => {
  it('should have demo markers', () => {
    expect(useMapStore.getState().markers.length).toBeGreaterThan(0);
  });

  it('should toggle ghost mode', () => {
    expect(useMapStore.getState().ghostMode).toBe(false);
    useMapStore.getState().toggleGhostMode();
    expect(useMapStore.getState().ghostMode).toBe(true);
    useMapStore.getState().toggleGhostMode();
    expect(useMapStore.getState().ghostMode).toBe(false);
  });
});

describe('Discover Store', () => {
  it('should have discover items', () => {
    expect(useDiscoverStore.getState().items.length).toBeGreaterThan(0);
  });

  it('should have trending tags', () => {
    expect(useDiscoverStore.getState().trending.length).toBeGreaterThan(0);
  });
});
