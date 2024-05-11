/* eslint-disable import/no-extraneous-dependencies */
import '@/styles/globals.css';

import { Inter } from 'next/font/google';

import type { ChildrenProps } from '@/types';

export const metadata = {
  description: 'Education Platform. The best way to learn. Build. Grow.',
  keywords: 'learn, course, mentor, lessons, tutorial',
  title: 'EduMentor',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`${inter.className} h-full flex flex-col justify-between  h-full`}
      >
        <section className="flex-1">{children}</section>
      </body>
    </html>
  );
}
