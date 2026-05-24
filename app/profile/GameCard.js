'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ClockIcon, 
  CalendarIcon, 
  BuildingOffice2Icon, 
  TrashIcon,
  ChartBarIcon 
} from '@heroicons/react/24/solid';
import { deleteGame } from '../_lib/actions';
import { useFormStatus } from 'react-dom';

export default function GameCard({ game }) {
  const {
    id,
    name,
    background_image,
    genres,
    released,
    playtime,
    publishers,
  } = game;

  const router = useRouter();

  const handleTrackClick = () => {
    router.push(`/profile/library/${id}`);
  };

  return (
    // Premium Glassmorphism Card with flex-col to keep heights uniform in a grid
    <div className="group flex flex-col bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 h-full">
      
      {/* Game Image Header - Clickable for tracking */}
      <div 
        className="relative h-48 sm:h-56 w-full overflow-hidden cursor-pointer"
        onClick={handleTrackClick}
      >
        <Image
          src={background_image || '/fallback.jpg'}
          alt={name}
          fill
          // Image scales up slightly when hovering anywhere on the card
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Smoother gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80 dark:opacity-100 transition-opacity duration-300" />
        <h2 className="absolute bottom-3 left-4 right-4 text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg line-clamp-2 leading-tight">
          {name}
        </h2>
      </div>

      {/* Game Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-4">

        {/* Info Grid - Playtime, Date, Publisher */}
        <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="truncate">{playtime || 0}h avg</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">{released || 'TBA'}</span>
          </div>
          {publishers?.length > 0 && (
            <div className="flex items-center gap-1.5 col-span-2 mt-0.5">
              <BuildingOffice2Icon className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="truncate">{publishers[0].name}</span>
            </div>
          )}
        </div>

        {/* Buttons Wrapper - Uses mt-auto to push strictly to the bottom */}
        <div className="mt-auto pt-4 flex gap-3">
          
          {/* Track Progress Button */}
          <button
            onClick={handleTrackClick}
            className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm sm:text-base font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Track
          </button>
          
          {/* Remove Game Form */}
          <form action={deleteGame} className="flex-[1] flex">
            <input type="hidden" name="gameId" value={id} />
            <Button />
          </form>
          
        </div>
      </div>
    </div>
  );
}

// Extracted Button Component
function Button() {
  const { pending } = useFormStatus();

  return (
    <button 
      disabled={pending} 
      className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
        pending 
          ? 'bg-gray-500 text-white' 
          // Premium "Remove" style: Transparent red with border, solid on hover
          : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white'
      }`}
    >
      <TrashIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${pending ? 'hidden' : ''}`} />
      <span className="hidden sm:inline">
        {pending ? "Removing..." : "Remove"}
      </span>
    </button>
  );
}