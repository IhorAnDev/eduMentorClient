import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { ChildrenProps } from '@/types';
import { StoreProvider } from '@/store/StoreProvider';
import { CookiesProvider } from 'next-client-cookies/server';

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
    <StoreProvider>
      <html lang="en">
        <body className={`bg-white ${inter.className}`}>
          <CookiesProvider>{children}</CookiesProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
