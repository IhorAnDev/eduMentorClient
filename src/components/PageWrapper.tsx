import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="flex pt-8 pl-6">{children}</div>;
}
