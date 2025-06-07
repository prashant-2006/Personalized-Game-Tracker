import { auth } from "../_lib/auth";
import { getGamesData, getUserData } from "../_lib/DataService";
import {
  Gamepad2,
  CheckCircle,
  Star,
  MonitorSmartphone,
} from "lucide-react"; // beautiful icons

export default async function Profile() {
  const session = await auth();
  const email = session?.user?.email;
  const user = session?.user;

  const games = await getGamesData();
  const userData = (await getUserData(email))?.[0];

  const totalGames = games?.length || 0;
  const completedGames = games?.filter((g) => g.status == "Completed")?.length || 0;

  const favGenre = userData?.favourite_genre || "Not set";
  const platform = userData?.platform_preference || "Not set";

  return (
    <div className="max-w-3xl mx-auto mt-0 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome, {user?.name?.split(" ")?.[0]}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Games Played */}
        <div className="flex items-center p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg shadow">
          <Gamepad2 className="h-10 w-10 text-indigo-600 dark:text-indigo-300 mr-4" />
          <div>
            <p className="text-xl font-semibold">{totalGames}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Games Played</p>
          </div>
        </div>

        {/* Games Completed */}
        <div className="flex items-center p-4 bg-green-50 dark:bg-green-900 rounded-lg shadow">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-300 mr-4" />
          <div>
            <p className="text-xl font-semibold">{completedGames}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Games Completed</p>
          </div>
        </div>

        {/* Favourite Genre */}
        <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg shadow">
          <Star className="h-10 w-10 text-yellow-600 dark:text-yellow-300 mr-4" />
          <div>
            <p className="text-xl font-semibold">{favGenre}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Favourite Genre</p>
          </div>
        </div>

        {/* Platform Preference */}
        <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg shadow">
          <MonitorSmartphone className="h-10 w-10 text-purple-600 dark:text-purple-300 mr-4" />
          <div>
            <p className="text-xl font-semibold">{platform}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Platform Preference</p>
          </div>
        </div>
      </div>
    </div>
  );
}
