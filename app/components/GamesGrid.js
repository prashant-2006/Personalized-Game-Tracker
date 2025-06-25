'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import GameCard from "../profile/GameCard";
import LoadingSpinner from "../loading";

async function fetchGameDetails(gameIds) {
  if (!gameIds.length) return [];
  const responses = await Promise.all(
    gameIds.map((id) =>
      fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
        .then((res) => res.json())
    )
  );
  return responses;
}

export default function GamesGrid() {
  const searchParams = useSearchParams();
  const selectedStatus = searchParams.get("status") || "All";
  const selectedYear = searchParams.get("year") || "All Years";

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("status", selectedStatus);
        queryParams.set("year", selectedYear);

        const res = await fetch(`/api/games?${queryParams.toString()}`);
        const gameIds = await res.json();
        const details = await fetchGameDetails(gameIds);
        setGames(details);
      } catch (error) {
        console.error("Error loading games:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, [selectedStatus, selectedYear]);

  if (loading) return <LoadingSpinner />;

  if (!games.length) {
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
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
