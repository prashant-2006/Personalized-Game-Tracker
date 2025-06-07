'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GameCard from './gameCard';
import LoadingSpinner from '../loading';

export default function SearchClient({gameList}) {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRouting, setIsRouting] = useState(false); // <-- new state
  const router = useRouter();

  const searchGames = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=a98780749aad4b9c8897d8bec2152282&search=${query}`
    );
    const data = await res.json();
    setGames(data.results || []);
    setLoading(false);
  };

  const handleCardClick = (gameId) => {
    setIsRouting(true);
    router.push(`/search/${gameId}`);
  };

  useEffect(() => {
    // Automatically stops loading when route changes
    const handleDone = () => setIsRouting(false);
    window.addEventListener('popstate', handleDone);
    return () => window.removeEventListener('popstate', handleDone);
  }, []);

  const showLoader = loading || isRouting;

  return (
    <div className="p-6">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search for a game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-l-lg border dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          onClick={searchGames}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {showLoader && <LoadingSpinner />}

      {!showLoader && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-2">
          {games.map((game) => (
            <GameCard key={game.id} game={game} gameList={gameList} onClick={() => handleCardClick(game.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
