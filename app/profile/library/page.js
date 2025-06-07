import { Suspense } from "react";
import { getGames } from "@/app/_lib/DataService";
import GameCard from "../GameCard";
import LoadingSpinner from "@/app/loading";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

async function fetchGameDetails(gameIds) {
  if (!gameIds.length) return [];
  const responses = await Promise.all(
    gameIds.map(id =>
      fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`).then(res =>
        res.json()
      )
    )
  );
  return responses;
}

async function GamesGrid() {
  const games = await getGames();
  const gameData = await fetchGameDetails(games);

  if (!gameData.length) {
    return (
      <div className="text-center mt-20">
        <Gamepad2 className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-600" />
        <h2 className="text-2xl font-semibold mt-4">No games in your library yet</h2>
        <p className="text-gray-500 mt-2">Start exploring and add some games to track your progress.</p>
        <Link
          href="/search"
          className="inline-block mt-6 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Browse Games
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {gameData.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default function Library() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Library</h1>
      <Suspense fallback={<LoadingSpinner />}>
        {/* @ts-expect-error Server Component inside Suspense */}
        <GamesGrid />
      </Suspense>
    </div>
  );
}
