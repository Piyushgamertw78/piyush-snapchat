# 📸 PiyushSnap — Premium Social Experience

> A production-ready Snapchat clone with a superior 3D premium UI, built with Next.js, TypeScript, and Tailwind CSS.

**Made by Piyush ✨**

---

## 🌟 Features

### 🔐 Authentication
- ✅ Email & Password Login/Signup
- ✅ Google Sign-In (OAuth 2.0 ready)
- ✅ OTP/Phone Verification UI
- ✅ Forgot Password Flow
- ✅ Persistent Sessions (Zustand)
- ✅ Profile Creation Wizard

### 📸 Camera & Snaps
- ✅ Full Camera Access (Front/Back)
- ✅ Photo & Video Capture
- ✅ Flash Toggle, Zoom, Timer
- ✅ Save to Device
- ✅ Send to Friends or Story

### 🎨 Filters & Lenses
- ✅ 8 Color Filters (B&W, Vintage, Vivid, Warm, Cool, Noir, etc.)
- ✅ 8 Face Detection Filters (Dog, Cat, Crown, Sunglasses, etc.)
- ✅ 6 AR World Objects (3D Balloon, Dog, Heart, Star, etc.)
- ✅ Sticker & Text Overlay Support
- ✅ Music Overlay Support

### 📖 Stories
- ✅ Post Photo/Video Stories (24h expiry)
- ✅ Story View Counter
- ✅ React to Stories with Emojis
- ✅ Reply to Stories via DM
- ✅ Poll Stickers in Stories
- ✅ Progress Bar & Swipe Navigation
- ✅ Story Highlights
- ✅ Collaborative Stories

### 💬 Messaging (Chat)
- ✅ One-on-One Chat
- ✅ Group Chats
- ✅ Emoji Reactions on Messages
- ✅ End-to-End Encryption Badge
- ✅ Read Receipts (✓/✓✓)
- ✅ Disappearing Messages (Concept)
- ✅ Voice & Video Call Buttons
- ✅ In-chat Camera & Gallery Access
- ✅ Emoji Picker

### 🗺️ Snap Map
- ✅ Real-time Location Display
- ✅ Ghost Mode Toggle
- ✅ Friend Markers on Map
- ✅ Activity Emojis
- ✅ Zoom Controls
- ✅ Location Search
- ✅ Heat Map Zones

### 🧠 Discover / Explore
- ✅ Trending Content Feed
- ✅ Category Filtering
- ✅ Trending Hashtags
- ✅ Publisher Stories
- ✅ Suggested Friends
- ✅ View Count Display

### 💾 Memories
- ✅ Save Snaps to Memories
- ✅ "On This Day" Flashbacks
- ✅ Highlight Reels
- ✅ Grid View
- ✅ Search Memories

### 👤 Profile
- ✅ Snapcode (QR Code)
- ✅ Snap Score
- ✅ Trophy Case
- ✅ Story Archive
- ✅ Edit Profile
- ✅ Share Profile

### ⚙️ Settings
- ✅ Privacy Controls
- ✅ Notification Preferences
- ✅ Two-Factor Authentication Toggle
- ✅ Dark/Light Mode
- ✅ Account Management
- ✅ Data & Storage Settings
- ✅ Blocked Users
- ✅ Linked Devices

### 🔔 Notifications
- ✅ Push Notification UI
- ✅ In-App Notification Center
- ✅ Unread Badge Counter
- ✅ Mark All as Read
- ✅ Clear All

### 👥 Friends
- ✅ Add Friends by Username
- ✅ Friend Suggestions
- ✅ Best Friends List
- ✅ Friend Requests (Accept/Decline)
- ✅ Block/Remove/Report
- ✅ Streak Counter (🔥)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand |
| Icons | Lucide React |
| QR Codes | qrcode.react |
| 3D | Three.js + React Three Fiber |
| Testing | Vitest + Testing Library |
| CI/CD | GitHub Actions |
| Linting | ESLint |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/piyush-snapchat.git
cd piyush-snapchat

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

---

## 📁 Project Structure

```
piyush-snapchat/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Splash/Welcome
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── auth/               # Authentication pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── verify/
│   │   │   └── forgot-password/
│   │   ├── camera/             # Camera & capture
│   │   ├── chat/               # Chat list & detail
│   │   ├── stories/            # Stories feed
│   │   ├── discover/           # Discover/Explore
│   │   ├── map/                # Snap Map
│   │   ├── memories/           # Memories
│   │   ├── profile/            # User profile
│   │   ├── settings/           # App settings
│   │   └── notifications/      # Notifications
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   └── common/             # Shared components
│   ├── store/                  # Zustand state management
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── __tests__/              # Test files
├── public/                     # Static assets
├── .env.example                # Environment template
├── .eslintrc.json              # ESLint config
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── vitest.config.ts            # Vitest config
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🎨 UI Features

- **Glassmorphism** — Frosted glass effects throughout
- **3D Elements** — Depth and perspective on cards
- **Premium Gradients** — Yellow-to-orange gradient theme
- **Smooth Animations** — 60fps with Framer Motion
- **Dark Mode** — Full dark theme (light mode ready)
- **Responsive** — Mobile-first design
- **Micro-interactions** — Hover, tap, and scroll effects
- **Neon Glow** — Yellow neon accents

---

## 🔒 Environment Variables

See `.env.example` for all required environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
NEXT_PUBLIC_MAPBOX_TOKEN=...
NEXT_PUBLIC_AGORA_APP_ID=...
NEXT_PUBLIC_OPENAI_API_KEY=...
```

---

## 📊 CI/CD

The project uses GitHub Actions for:
- ✅ ESLint linting
- ✅ TypeScript type checking
- ✅ Unit tests
- ✅ Production build

All checks must pass before merging.

---

## 📝 License

This project is for educational and demonstration purposes.

---

**Made by Piyush ✨**
