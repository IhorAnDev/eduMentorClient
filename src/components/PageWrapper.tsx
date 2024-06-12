import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="py-4 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">{children}</div>;
}


