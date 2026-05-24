'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HomeIcon,
  Cog6ToothIcon,
  BookmarkIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { signOutAction } from '../_lib/actions';

export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const links = [
    { href: '/profile', icon: HomeIcon, title: 'Home' },
    { href: '/profile/library', icon: BookmarkIcon, title: 'Library' },
    { href: '/profile/update', icon: Cog6ToothIcon, title: 'Update Account' },
  ];

  // Refined active and inactive classes to match the Navbar aesthetic
  const activeClasses =
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 shadow-sm';
  const inactiveClasses =
    'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* Sidebar - Upgraded with Glassmorphism */}
      <aside className="fixed top-[68px] left-0 h-[calc(100vh-68px)] z-40 w-16 sm:w-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-md flex flex-col items-center py-8 border-r border-gray-200 dark:border-white/5 transition-colors duration-300">
        
        {/* Nav Links Container */}
        <div className="flex flex-col space-y-4 w-full px-2 sm:px-3">
          {links.map(({ href, icon: Icon, title }) => (
            <Link key={href} href={href} title={title} className="flex justify-center">
              <div
                className={`p-3 rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 ${
                  pathname === href ? activeClasses : inactiveClasses
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          ))}
        </div>

        {/* Sign Out Button - Pushed to the bottom using mt-auto */}
        <form action={signOutAction} className="mt-auto mb-4 w-full px-2 sm:px-3 flex justify-center">
          <button
            title="Sign Out"
            className="p-3 rounded-2xl text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          </button>
        </form>
        
      </aside>

      {/* Main Content Area */}
      {/* Set background to transparent so the ambient glows from your child pages shine through */}
      <main className="flex-1 ml-16 sm:ml-20 text-gray-900 dark:text-white bg-transparent relative z-0">
        {mounted && children}
      </main>
      
    </div>
  );
}