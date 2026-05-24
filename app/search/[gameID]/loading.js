'use client';

export default function LoadingSpinner() {
  return (
    // 'fixed inset-0 z-[9999]' forces it to cover the ENTIRE screen, hiding everything (including navbars)
    // The solid bg-gray-50/bg-gray-950 completely blocks out any ugly half-loaded content or glitches
    <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none"></div>

      {/* Premium Multi-Ring Spinner */}
      <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-8 z-10">
        
        {/* Outer Ring - Spins Clockwise */}
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-indigo-500/20 dark:border-indigo-500/10 animate-[spin_2s_linear_infinite]"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 dark:border-indigo-400 animate-[spin_2s_linear_infinite]"></div>
        
        {/* Inner Ring - Spins Counter-Clockwise */}
        <div className="absolute inset-3 sm:inset-4 rounded-full border-l-4 border-r-4 border-purple-500/20 dark:border-purple-500/10 animate-[spin_3s_linear_infinite_reverse]"></div>
        <div className="absolute inset-3 sm:inset-4 rounded-full border-l-4 border-purple-500 dark:border-purple-400 animate-[spin_3s_linear_infinite_reverse]"></div>

        {/* Center Pulsing Orb */}
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>
        
      </div>

      {/* Pulsing Loading Text */}
      <div className="flex flex-col items-center z-10 space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 uppercase animate-pulse">
          GameShelf
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase animate-pulse">
          Loading Library...
        </p>
      </div>
      
    </div>
  );
}