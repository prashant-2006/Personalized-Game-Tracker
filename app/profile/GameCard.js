'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ClockIcon, CalendarIcon, BuildingOffice2Icon, TrashIcon } from '@heroicons/react/24/solid';
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
    router.push(`/profile/library/${id}`); // navigates to /gameID where gameID = id
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all">
      {/* Game Image */}
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

      {/* Game Details */}
      <div className="p-4 space-y-3">

        {/* Publisher */}
        {publishers?.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <BuildingOffice2Icon className="w-4 h-4 text-blue-500" />
            <span>{publishers[0].name}</span>
          </div>
        )}

        {/* Playtime & Release */}
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

        {/* Buttons: Track Progress + Remove */}
        <div className="flex gap-3 pt-3">
          <button
            onClick={handleTrackClick}
            className="flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            📈 Track
          </button>
          <form action={deleteGame}>
          <input type="hidden" name="gameId" value={id} />
          <Button />
          </form>
        </div>
      </div>
    </div>
  );
}

function Button(){
  const {pending} = useFormStatus();
  return (
    <button disabled={pending} className={`flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium  rounded-lg transition ${pending ? "bg-gray-500" : "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"}`}>
      <TrashIcon className={`w-5 h-5 ${pending ? "hidden" : "text-red-600 dark:text-red-300"}`} />
      <span className="hidden sm:inline">{pending ? "Removing..." : "Remove"}</span>
    </button>
  )
}
