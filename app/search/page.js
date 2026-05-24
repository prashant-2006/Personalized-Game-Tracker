// app/search/page.jsx
import { Suspense } from 'react';
import SearchClient from './SearchClient';
import LoadingSpinner from '../loading';
import { getGames } from '../_lib/DataService';
import { auth } from '../_lib/auth';

export const metadata = {
  title: "Search Games | GameShelf",
  description: "Discover and search for your next favorite game.",
};

export default async function SearchPage() {
  const gameList = await getGames();
  const session = await auth();

  return (
    // Removed min-h-screen and pt-24. Replaced with flex-1 and standard padding 
    // to align perfectly within your existing layout.js main container.
    <div className="flex-1 flex flex-col w-full bg-gray-50 dark:bg-gray-950 px-4 sm:px-8 lg:px-12 py-12 relative overflow-hidden transition-colors duration-300 mt-14">
      
      {/* Ambient Background Glow centered near the top to highlight the search area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      {/* Main Content Container - Centered and full width */}
      <div className="w-full max-w-7xl mx-auto flex flex-col relative z-10">
        
        {/* Header Section - ALIGNED CENTER for a stronger Search UI focus */}
        <div className="mb-12 flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Games</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Browse our extensive library, filter by your favorite genres, and find the next great adventure for your digital shelf.
          </p>
        </div>

        {/* Search Client wrapped in Suspense */}
        <div className="w-full flex-1 flex flex-col">
          <Suspense fallback={
            // Perfectly centered loading spinner within the remaining space
            <div className="flex-1 flex justify-center items-center py-32">
              <LoadingSpinner />
            </div>
          }>
            <SearchClient gameList={gameList} session={session} />
          </Suspense>
        </div>
        
      </div>
    </div>
  );
}