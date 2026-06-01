// ===== User Types =====
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phone?: string;
  avatar: string;
  bio: string;
  birthday?: string;
  snapScore: number;
  snapcode: string;
  createdAt: string;
  isOnline: boolean;
  lastSeen: string;
  location?: GeoLocation;
  settings: UserSettings;
  trophies: Trophy[];
  streaks: Streak[];
  bestFriends: string[];
  mutualFriends: string[];
}

export interface UserSettings {
  privacy: PrivacySettings;
  notifications: NotificationSettings;
  theme: 'light' | 'dark' | 'system';
}

export interface PrivacySettings {
  whoCanSendSnaps: 'everyone' | 'friends' | 'custom';
  whoCanViewStory: 'everyone' | 'friends' | 'custom';
  whoCanSeeLocation: 'everyone' | 'friends' | 'ghost' | 'custom';
  showInQuickAdd: boolean;
}

export interface NotificationSettings {
  snaps: boolean;
  chats: boolean;
  stories: boolean;
  friendRequests: boolean;
  sounds: boolean;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface Trophy {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;
}

export interface Streak {
  friendId: string;
  count: number;
  startDate: string;
  lastSnapDate: string;
}

// ===== Auth Types =====
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  displayName: string;
  phone?: string;
}

// ===== Snap Types =====
export interface Snap {
  id: string;
  senderId: string;
  recipientIds: string[];
  type: 'photo' | 'video';
  mediaUrl: string;
  caption?: string;
  filter?: string;
  duration: number;
  createdAt: string;
  expiresAt: string;
  viewed: boolean;
  saved: boolean;
}

export interface CameraState {
  isActive: boolean;
  facingMode: 'user' | 'environment';
  flash: 'on' | 'off' | 'auto';
  zoom: number;
  timer: number;
  filter: string | null;
  recording: boolean;
}

export interface Filter {
  id: string;
  name: string;
  category: FilterCategory;
  thumbnail: string;
  active: boolean;
}

export type FilterCategory =
  | 'face'
  | 'color'
  | 'background'
  | 'ar'
  | 'animated'
  | 'geo'
  | 'custom';

// ===== Story Types =====
export interface Story {
  id: string;
  userId: string;
  user: Pick<User, 'id' | 'username' | 'displayName' | 'avatar'>;
  items: StoryItem[];
  createdAt: string;
  expiresAt: string;
  viewCount: number;
  isHighlight: boolean;
  isCollaborative: boolean;
  collaboratorIds?: string[];
}

export interface StoryItem {
  id: string;
  type: 'photo' | 'video';
  mediaUrl: string;
  caption?: string;
  music?: MusicTrack;
  stickers?: Sticker[];
  poll?: Poll;
  question?: QuestionSticker;
  createdAt: string;
  duration: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  previewUrl: string;
  startTime: number;
}

export interface Sticker {
  id: string;
  type: 'emoji' | 'bitmoji' | 'text' | 'poll' | 'question' | 'location' | 'music' | 'gif';
  content: string;
  position: { x: number; y: number };
  style?: Record<string, string>;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  votedBy: string[];
}

export interface QuestionSticker {
  id: string;
  question: string;
  responses: QuestionResponse[];
  allowAnonymous: boolean;
}

export interface QuestionResponse {
  id: string;
  userId: string;
  response: string;
  createdAt: string;
}

// ===== Chat Types =====
export interface Chat {
  id: string;
  type: 'direct' | 'group';
  participants: ChatParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  isEncrypted: boolean;
  disappearingSettings?: DisappearingSettings;
  pinnedBy?: string[];
  mutedBy?: string[];
}

export interface ChatParticipant {
  userId: string;
  user: Pick<User, 'id' | 'username' | 'displayName' | 'avatar' | 'isOnline'>;
  role: 'admin' | 'member';
  joinedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  type: MessageType;
  content: string;
  mediaUrl?: string;
  reactions: Reaction[];
  readBy: string[];
  deliveredTo: string[];
  createdAt: string;
  expiresAt?: string;
  repliedTo?: string;
  isScreenshot?: boolean;
}

export type MessageType =
  | 'text'
  | 'snap'
  | 'image'
  | 'video'
  | 'voice'
  | 'sticker'
  | 'emoji'
  | 'system'
  | 'game';

export interface Reaction {
  userId: string;
  emoji: string;
  createdAt: string;
}

export interface DisappearingSettings {
  enabled: boolean;
  timer: 1 | 3 | 5 | 10 | 30 | 0; // 0 = no limit
}

// ===== Map Types =====
export interface MapMarker {
  userId: string;
  user: Pick<User, 'id' | 'username' | 'displayName' | 'avatar'>;
  location: GeoLocation;
  storyId?: string;
  actionEmoji?: string;
}

export interface SnapMapCluster {
  id: string;
  location: GeoLocation;
  snapCount: number;
  snaps: Snap[];
}

// ===== Memory Types =====
export interface Memory {
  id: string;
  userId: string;
  type: 'photo' | 'video';
  mediaUrl: string;
  caption?: string;
  location?: GeoLocation;
  faces?: string[];
  tags: string[];
  createdAt: string;
  isHighlight: boolean;
  highlightReelId?: string;
}

export interface HighlightReel {
  id: string;
  name: string;
  coverUrl: string;
  memories: Memory[];
  createdAt: string;
}

// ===== Notification Types =====
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  fromUserId?: string;
  fromUser?: Pick<User, 'id' | 'username' | 'displayName' | 'avatar'>;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}

export type NotificationType =
  | 'snap'
  | 'chat'
  | 'story_view'
  | 'friend_request'
  | 'friend_accept'
  | 'streak'
  | 'mention'
  | 'screenshot'
  | 'birthday'
  | 'trending';

// ===== Discover Types =====
export interface DiscoverItem {
  id: string;
  type: 'publisher' | 'trending' | 'suggested' | 'topic';
  title: string;
  description?: string;
  thumbnail: string;
  publisher?: string;
  storyId?: string;
  category?: string;
  viewCount?: number;
}

// ===== Friend Types =====
export interface FriendRequest {
  id: string;
  fromUserId: string;
  fromUser: Pick<User, 'id' | 'username' | 'displayName' | 'avatar'>;
  toUserId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

// ===== Avatar Types =====
export interface Avatar {
  faceShape: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeShape: string;
  eyeColor: string;
  nose: string;
  mouth: string;
  outfit: string;
  outfitColor: string;
  accessories: string[];
  background: string;
}
