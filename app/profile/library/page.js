import { Suspense } from "react";
import LoadingSpinner from "@/app/loading";
import FilterBar from "@/app/components/FilterBar";
import GamesGrid from "@/app/components/GamesGrid";

export const metadata = {
  title: "My Library | GameShelf",
};

export default async function Page({ searchParams }) {
  const selectedStatus = searchParams?.status || "All";

  return (
    // TIGHTENED TOP PADDING: Dropped from pt-20/32 to pt-16 sm:pt-24
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 sm:pt-24 pb-12 px-3 sm:px-8 relative overflow-x-hidden transition-colors duration-300">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* Header Section */}
        {/* TIGHTENED MARGINS: Reduced bottom margin (mb-5) and internal spacing (space-y-1) */}
        <div className="text-center mb-5 sm:mb-8 space-y-1 sm:space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Library</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Manage your collection, track your progress, and jump back into your favorite adventures.
          </p>
        </div>

        {/* Filter Bar Wrapper */}
        {/* TIGHTENED MARGINS: Reduced bottom margin from mb-8 to mb-4 sm:mb-6 */}
        <div className="mb-4 sm:mb-6 w-full flex justify-center">
          <FilterBar />
        </div>

        {/* Grid & Suspense Area */}
        <div className="flex-1 w-full flex flex-col relative">
          <Suspense fallback={
            <div className="absolute inset-0 flex justify-center items-center min-h-[40vh]">
              <LoadingSpinner />
            </div>
          }>
            <GamesGrid selectedStatus={selectedStatus} />
          </Suspense>
        </div>

      </div>
    </div>
  );
}