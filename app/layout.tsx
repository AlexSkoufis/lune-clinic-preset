import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import { clinic } from '@/lib/content';
import './globals.css';

// Bricolage Grotesque: a characterful variable display face, friendly without being childish.
// Figtree: a clean, open body face.
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sans = Figtree({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: `${clinic.name} — ${clinic.line}, ${clinic.area}`,
  description: `${clinic.name}: calm, unhurried dental and aesthetic care in ${clinic.area}, with prices up front and same-day emergency visits. A fictional clinic design concept.`,
};

export const viewport: Viewport = { themeColor: '#F8F6F1', width: 'device-width', initialScale: 1 };

// Runs before paint so elements that animate in never flash in their final position first.
const motionFlag = `try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script adds `motion` to <html> before hydration.
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
