import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  StarIcon,
  ClockIcon,
  ArrowLeftIcon,
  DeviceTabletIcon,
  FilmIcon,
  BuildingOffice2Icon,
  TagIcon,
} from '@heroicons/react/24/solid';

const API_KEY = 'a98780749aad4b9c8897d8bec2152282';

export async function generateMetadata(props) {
  const { params } = props;
  const { gameID } = params;
  const res = await fetch(`https://api.rawg.io/api/games/${gameID}?key=${API_KEY}`);
  const game = await res.json();
  return {
    title: game.name || 'Game Details',
    description: game.description_raw?.slice(0, 150),
  };
}

export default async function GameDetails({ params }) {
  const { gameID } = params;

  const res = await fetch(`https://api.rawg.io/api/games/${gameID}?key=${API_KEY}`);
  if (!res.ok) return notFound();
  const game = await res.json();

  const ssRes = await fetch(`https://api.rawg.io/api/games/${gameID}/screenshots?key=${API_KEY}`);
  const ssData = await ssRes.json();

  const trailerRes = await fetch(`https://api.rawg.io/api/games/${gameID}/movies?key=${API_KEY}`);
  const trailerData = await trailerRes.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-900 dark:text-white">
      <Link href="/search" className="inline-flex items-center gap-2 mb-6 text-indigo-500 hover:underline">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

      {/* Trailers */}
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
