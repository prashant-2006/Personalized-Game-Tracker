// app/search/page.jsx
import { Suspense } from 'react';
import SearchClient from './SearchClient';
import LoadingSpinner from '../loading';
import { getGames } from '../_lib/DataService';
import { auth } from '../_lib/auth';

export default async function SearchPage() {
  const gameList = await getGames();
  const session = await auth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mt-4 ml-6">Search Games</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <SearchClient gameList={gameList} session={session} />
      </Suspense>
    </div>
  );
}
