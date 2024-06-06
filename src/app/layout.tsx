import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { ChildrenProps } from '@/types';
import { StoreProvider } from '@/store/StoreProvider';
import SideNav from '@/components/side-navigation/SideNav';
import MarginWidthWrapper from '@/components/MarginWithWrapper';
import Header from '@/components/Header/Header';
import HeaderMobile from '@/components/Header/HeaderMobile';
import PageWrapper from '@/components/PageWrapper';

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
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
