'use client';

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/useScroll';
import { cn } from '@/lib/utils';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  const companyName = useSelector(
    (state: RootState) => state.company.companyName
  );

  return (
    <div
      className={cn(
        `inset-x-0 top-0 w-full transition-all bg-gray-500 border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-gray-500/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-gray-500': selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <span className="font-bold text-xl  text-purple-300 ml-4">{companyName}</span>
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Logo</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">Edu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
