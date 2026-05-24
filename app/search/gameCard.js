'use client';

import Image from 'next/image';
import {
  PlusIcon,
  TrashIcon,
  ClockIcon,
  CalendarIcon,
  StarIcon,
  DeviceTabletIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/solid';
import { addGame, deleteGame } from '../_lib/actions';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function GameCard({ game, onClick, gameList, session }) {
  const {
    id,
    name,
    background_image,
    genres,
    released,
    metacritic,
    playtime,
    parent_platforms,
    publishers,
  } = game;

  const isInLibrary = gameList.includes(id);
  const router = useRouter();

  return (
    <div
      onClick={onClick}
      // Premium Glassmorphism Card with flex-col to keep heights uniform in a grid
      className="group flex flex-col bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full"
    >
      {/* Image Header */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <Image
          src={background_image || '/fallback.jpg'}
          alt={name}
          fill
          // Image scales up slightly when hovering anywhere on the card
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Smoother, taller gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80 dark:opacity-100 transition-opacity duration-300" />
        <h2 className="absolute bottom-3 left-4 right-4 text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg line-clamp-2 leading-tight">
          {name}
        </h2>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-4">
        
        {/* Genres - Styled as subtle colored pills */}
        <div className="flex flex-wrap gap-1.5">
          {genres?.map((genre) => (
            <span
              key={genre.id}
              className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 rounded-lg"
            >
              {genre.name}
            </span>
          ))}
        </div>

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

        {/* Platforms & Metacritic Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {parent_platforms?.map(({ platform }) => (
              <span
                key={platform.id}
                className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2 py-0.5 text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 rounded-md"
              >
                {platform.name}
              </span>
            ))}
          </div>
          
          {metacritic && (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-500/20 shrink-0">
              <StarIcon className="w-3.5 h-3.5" />
              <span>{metacritic}</span>
            </div>
          )}
        </div>

        {/* Library Button Wrapper - Uses mt-auto to push to bottom */}
        {session && (
          <div className="mt-auto pt-4" onClick={(e) => e.stopPropagation()}>
            <form
              action={async (formData) => {
                await (isInLibrary ? deleteGame : addGame)(formData);
                router.refresh();
              }}
            >
              <input type="hidden" name="gameId" value={id} />
              <Button isInLibrary={isInLibrary} />
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

// Extracted Button Component
function Button({ isInLibrary }) {
  const { pending } = useFormStatus();

  let buttonText;
  if (pending) {
    buttonText = isInLibrary ? 'Removing...' : 'Adding...';
  } else {
    buttonText = isInLibrary ? 'Remove from Library' : 'Add to Library';
  }

  return (
    <button
      className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
        isInLibrary
          // Premium "Remove" style: Transparent red with border, solid on hover
          ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white'
          // Premium "Add" style: Solid indigo with shadow
          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/30 transform hover:-translate-y-0.5'
      }`}
      disabled={pending}
    >
      {pending ? (
        <span>{buttonText}</span>
      ) : isInLibrary ? (
        <>
          <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          {buttonText}
        </>
      ) : (
        <>
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          {buttonText}
        </>
      )}
    </button>
  );
}