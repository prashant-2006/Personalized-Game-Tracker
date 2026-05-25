// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full pt-[60px]">
      
      <div className="relative flex-1 w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
        
        {/* 📱 MOBILE IMAGE: Shows on screens smaller than md (768px) */}
        <Image
          src="/homeImage2.jpg"
          alt="Game Background Mobile"
          fill
          // Centers the image and hides it on medium screens and up
          className="block md:hidden object-cover object-center"
          quality={100}
          priority
        />

        {/* 💻 DESKTOP IMAGE: Shows on md screens (768px) and larger */}
        <Image
          src="/homeImage.jpg"
          alt="Game Background Desktop"
          fill
          // Anchors top-right and hides it on small screens
          className="hidden md:block object-cover object-right-top"
          quality={100}
          priority
        />
        
        {/* CHANGED: Reduced light mode mobile opacity to 30% (bg-white/30) 
            while keeping dark mode at 60% (dark:bg-gray-950/60). */}
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-950/60 md:bg-transparent dark:md:bg-transparent md:bg-gradient-to-r md:from-white dark:md:from-gray-950 md:from-[30%] md:via-transparent dark:md:via-gray-950/70 md:via-[60%] md:to-transparent dark:md:to-gray-950/15 flex items-center justify-center md:justify-start px-6 md:px-16 lg:px-24 transition-colors duration-300">
          
          <div className="max-w-xl md:max-w-2xl flex flex-col items-center md:items-start text-center md:text-left z-10">
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter drop-shadow-md">
              <span className="text-indigo-600 dark:text-indigo-400 block">Track Your Games</span>
              Effortlessly
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg md:max-w-xl leading-relaxed drop-shadow">
              Your ultimate digital shelf. Organize your collection, discover new worlds, and see what friends are playing.
            </p>
            
            <Link 
              href="/search"
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white text-lg md:text-xl font-bold px-8 py-3 md:px-10 md:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-1"
            >
              Browse Games
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}