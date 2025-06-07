import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  StarIcon,
  ClockIcon,
  ArrowLeftIcon,
  DeviceTabletIcon,
  BuildingOffice2Icon,
  TagIcon,
  CheckCircleIcon,
  PencilIcon,
  CalendarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import getGameData from '@/app/_lib/DataService';

const API_KEY = 'a98780749aad4b9c8897d8bec2152282';

export async function generateMetadata({ params }) {
  const gameID = params.gameID;
  const res = await fetch(`https://api.rawg.io/api/games/${gameID}?key=${API_KEY}`);
  const game = await res.json();
  return {
    title: game.name || 'Game Details',
    description: game.description_raw?.slice(0, 150),
  };
}

export default async function GameDetails({ params }) {
  const gameID = params.gameID;

  const res = await fetch(`https://api.rawg.io/api/games/${gameID}?key=${API_KEY}`);
  if (!res.ok) return notFound();
  const game = await res.json();

  const ssRes = await fetch(`https://api.rawg.io/api/games/${gameID}/screenshots?key=${API_KEY}`);
  const ssData = await ssRes.json();

  const trailerRes = await fetch(`https://api.rawg.io/api/games/${gameID}/movies?key=${API_KEY}`);
  const trailerData = await trailerRes.json();

  // Fetch custom game data from Supabase
  const gameData = await getGameData(gameID);
  const userGame = gameData?.[0]; // assuming only one record per user/game

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-900 dark:text-white">
      <Link href="/profile/library" className="inline-flex items-center gap-2 mb-6 text-indigo-500 hover:underline">
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Poster */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={game.background_image || '/fallback.jpg'}
            alt={game.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{game.name}</h1>

          <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            Rating: {game.rating || 'N/A'} ({game.ratings_count} ratings)
          </div>

          <div className="flex items-center gap-3 text-sm">
            <ClockIcon className="w-5 h-5 text-purple-500" />
            Playtime: {game.playtime || '-'} hours
          </div>

          <div className="flex items-center gap-3 text-sm">
            <BuildingOffice2Icon className="w-5 h-5 text-blue-500" />
            Publishers: {game.publishers?.map((p) => p.name).join(', ') || '-'}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <DeviceTabletIcon className="w-5 h-5 text-green-500" />
            Platforms: {game.parent_platforms?.map((p) => p.platform.name).join(', ') || '-'}
          </div>

          {/* Custom Game Data (status, completed_on, notes) */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            🎮 Your Progress
            </h2>
            <Link
              href={`/profile/library/edit/${gameID}`}
              className="text-sm text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
            >
            <PencilIcon className="w-4 h-4" />
              Edit
            </Link>
            </div>
            {userGame ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  <span>Status: {userGame.status}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="w-5 h-5 text-blue-400" />
                  <span>Completed on: {userGame.completed_on || 'Not completed'}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <PencilIcon className="w-5 h-5 text-gray-500 mt-1" />
                  <span>Notes: {userGame.notes || 'No notes added.'}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 italic">
                <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" />
                No user data found for this game.
              </div>
            )}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 text-sm">
            {game.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 text-sm">
            {game.tags?.slice(0, 6).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded"
              >
                <TagIcon className="w-4 h-4" />
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 space-y-2">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: game.description || 'No description available.' }}
        />
      </div>

      {/* Screenshots */}
      {ssData.results?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ssData.results.slice(0, 6).map((ss) => (
              <div key={ss.id} className="rounded overflow-hidden shadow">
                <Image
                  src={ss.image}
                  alt="Screenshot"
                  width={600}
                  height={400}
                  className="object-cover w-full h-40"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trailer */}
      {trailerData.results?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <video
            controls
            className="w-full rounded-lg shadow-lg"
            src={trailerData.results[0].data.max}
          />
        </div>
      )}
    </div>
  );
}
