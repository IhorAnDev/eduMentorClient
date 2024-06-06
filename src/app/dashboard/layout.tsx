import Header from '@/components/Header/Header';
import HeaderMobile from '@/components/Header/HeaderMobile';
import MarginWidthWrapper from '@/components/MarginWithWrapper';
import PageWrapper from '@/components/PageWrapper';
import SideNav from '@/components/side-navigation/SideNav';
import type { ChildrenProps } from '@/types';

export default function CompanyLayout({ children }: ChildrenProps) {
  return (
    <div className="flex-1 flex flex-col">
      <SideNav />
      <main className="flex-1 transition-all duration-300">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
