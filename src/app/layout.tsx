import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PiyushSnap - Premium Social Experience',
  description: 'A premium Snapchat-like social media app. Made by Piyush.',
  keywords: ['social', 'snapchat', 'chat', 'stories', 'camera', 'piyush'],
  authors: [{ name: 'Piyush' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a1a2e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-snap-darkest text-white">
        <div className="mx-auto min-h-screen max-w-lg relative">
          {children}
        </div>
      </body>
    </html>
  );
}
