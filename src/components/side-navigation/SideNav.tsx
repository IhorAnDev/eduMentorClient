'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/contains/constants';
import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { setHover } from '@/store/slices/SidebarSlice';
import { RootState } from '@/store/store';
import { cn, cx } from '@/lib/utils';

type MenuItemProps = {
  item: SideNavItem;
  hover: boolean;
};

const SideNav = () => {
  const dispatch = useDispatch();
  const hover = useSelector((state: RootState) => state.sidebar.hover);

  return (
    <div
      className={cx(
        'group bg-gray-700 h-screen fixed border-r border-zinc-200 transition-all duration-300 z-20 flex flex-col justify-between',
        hover ? 'w-60' : 'w-16'
      )}
      onMouseEnter={() => dispatch(setHover(true))}
      onMouseLeave={() => dispatch(setHover(false))}
    >
      <div>
        <Link
          href="/"
          className="flex items-center justify-center md:justify-start pl-11 pr-6 border-b border-zinc-200 h-12 w-full"
        >
          <div className="flex items-center">
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl ml-4 hidden group-hover:block transition-all duration-300">
              Logo
            </span>
          </div>
        </Link>

        <div className="flex pt-4 flex-col space-y-2 px-2 group-hover:px-2">
          {SIDENAV_ITEMS.filter(item => item.title !== 'Logout').map(
            (item, idx) => (
              <MenuItem key={idx} item={item} hover={hover} />
            )
          )}
        </div>
      </div>

      <div className="px-2 mb-4">
        <MenuItem
          item={SIDENAV_ITEMS.find(item => item.title === 'Logout')!}
          hover={hover}
        />
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem: React.FC<MenuItemProps> = ({ item, hover }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  useEffect(() => {
    if (!hover) {
      setSubMenuOpen(false);
    }
  }, [hover]);

  return (
    <div className="relative">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={cx(
              'flex flex-row items-center p-2 rounded-lg hover:bg-purple-400 w-full',
              pathname.includes(item.path) ? 'bg-purple-400' : ''
            )}
          >
            <div className="flex items-center">
              <div className="w-7 h-7">{item.icon}</div>
              <span className="ml-4 font-semibold text-xl hidden group-hover:block transition-all duration-300">
                {item.title}
              </span>
            </div>

            <div
              className={`ml-auto group-hover:flex ${subMenuOpen ? 'rotate-180' : ''} hidden`}
            >
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="ml-4 flex flex-col space-y-2 bg-gray-700 border border-gray-600 p-2 rounded-lg z-10">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`p-2 rounded-lg hover:bg-purple-400 ${
                    subItem.path === pathname ? 'bg-purple-400' : ''
                  }`}
                >
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={cn(
            'flex flex-row items-center p-2 rounded-lg hover:bg-purple-400 group',
            item.path === pathname ? 'bg-gray-500' : ''
          )}
        >
          <div className="flex items-center">
            <div className="w-7 h-7">{item.icon}</div>
            <span className="ml-4 font-semibold text-xl hidden group-hover:block transition-all duration-300">
              {item.title}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};
