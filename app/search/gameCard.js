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

export default function GameCard({ game, onClick, gameList }) {
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

  // Convert all game IDs to string for comparison (to match formData.get behavior)
  const isInLibrary = gameList.includes(id);
  const router = useRouter();

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all"
    >
      <div className="relative h-56 w-full">
        <Image
          src={background_image || '/fallback.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <h2 className="absolute bottom-2 left-3 text-xl font-bold text-white drop-shadow-md">
          {name}
        </h2>
      </div>

      <div className="p-4 space-y-2">
        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {genres?.map((genre) => (
            <span
              key={genre.id}
              className="text-sm px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Publisher */}
        {publishers?.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <BuildingOffice2Icon className="w-4 h-4 text-blue-500" />
            <span>{publishers[0].name}</span>
          </div>
        )}

        {/* Playtime & Release Date */}
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4 text-purple-500" />
            <span>{playtime || 0}h avg</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-green-500" />
            <span>{released}</span>
          </div>
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-2 mt-1">
          {parent_platforms?.map(({ platform }) => (
            <span
              key={platform.id}
              className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs text-gray-700 dark:text-white rounded"
            >
              {platform.name}
            </span>
          ))}
        </div>

        {/* Metacritic Score */}
        {metacritic && (
          <div className="flex items-center gap-1 text-sm mt-2 text-yellow-600 dark:text-yellow-400">
            <StarIcon className="w-4 h-4" />
            <span>Metacritic: {metacritic}</span>
          </div>
        )}

        {/* Library Button */}
        <div onClick={(e) => e.stopPropagation()}>
          <form action={async (formData) => {
    await (isInLibrary ? deleteGame : addGame)(formData);
    router.refresh(); // force a re-fetch if using `useRouter()` from `next/navigation`
  }}>
            <input type="hidden" name="gameId" value={id} />
            <Button isInLibrary={isInLibrary} />
          </form>
        </div>
      </div>
    </div>
  );
}

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
      className={`w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg transition bottom-0 disabled:bg-gray-500 ${
        isInLibrary
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
      }`}
      disabled={pending}
    >
      {pending ? (
        <span>{buttonText}</span>
      ) : isInLibrary ? (
        <>
          <TrashIcon className="w-5 h-5" />
          {buttonText}
        </>
      ) : (
        <>
          <PlusIcon className="w-5 h-5" />
          {buttonText}
        </>
      )}
    </button>
  );
}

