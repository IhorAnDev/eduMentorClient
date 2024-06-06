import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex pt-2 px-4 space-y-2 bg-zinc-100  pb-4">
      {children}
    </div>
  );
}