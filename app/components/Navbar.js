'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function Navbar({ session }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const links = [
    { href: '/search', icon: MagnifyingGlassIcon, label: 'Search' },
    { href: '/about', icon: InformationCircleIcon, label: 'About' },
  ];

  const activeClasses =
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 shadow-sm';
  const inactiveClasses = 
    'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/5 shadow-md dark:shadow-black/40 transition-colors duration-300">
      
      {/* Logo Area */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-11 h-11 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-gray-200 dark:ring-white/10 group-hover:ring-indigo-500/50 transition-all duration-300">
          <img
            src="https://t3.ftcdn.net/jpg/01/71/29/48/360_F_171294824_FDLwEWTzlfVr8iE0qojO0mmai44fdbIj.jpg"
            alt="Logo"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
          GameShelf
        </span>
      </Link>

      {/* Links & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {links.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} title={label}>
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                pathname === href ? activeClasses : inactiveClasses
              }`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </Link>
        ))}

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-gray-300 dark:bg-white/30 mx-1 sm:mx-2 hidden sm:block"></div>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl transition-all duration-300 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-indigo-500 dark:hover:text-indigo-400"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        )}

        {/* Profile / User Icon */}
        <Link href="/profile" title="Profile" className="ml-1">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="User Avatar"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full ring-2 ring-indigo-500/50 hover:ring-indigo-500 cursor-pointer object-cover transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
            />
          ) : (
            <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300">
              <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
}