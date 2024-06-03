import type { ChildrenProps } from '@/types';

export default function CompanyLayout({ children }: ChildrenProps) {
  return <div className="flex-1 flex flex-col">{children}</div>;
}
