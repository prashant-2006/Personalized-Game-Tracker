import { auth } from "../_lib/auth";
import { getGamesData, getUserData } from "../_lib/DataService";
import {
  Gamepad2,
  CheckCircle,
  Star,
  MonitorSmartphone,
} from "lucide-react";

export const metadata = {
  title: "Profile | GameShelf",
};

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
    // FIXED PADDING: Changed px-2 to px-4 sm:px-8 for much better mobile breathing room on the edges.
    <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 sm:pt-28 pb-12 px-4 sm:px-8 relative overflow-x-hidden transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 space-y-1.5 sm:space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">{user?.name?.split(" ")?.[0]}</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 px-2">
            Here&apos;s a quick overview of your digital shelf.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          
          {/* Games Played */}
          <div className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 dark:border-white/5 flex items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-500/30">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 mr-4 sm:mr-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0">
              <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{totalGames}</p>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 uppercase tracking-wider">Games Played</p>
            </div>
          </div>

          {/* Games Completed */}
          <div className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 dark:border-white/5 flex items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/30">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mr-4 sm:mr-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{completedGames}</p>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 uppercase tracking-wider">Games Completed</p>
            </div>
          </div>

          {/* Favourite Genre */}
          <div className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 dark:border-white/5 flex items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-500/30">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 mr-4 sm:mr-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0">
              <Star className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate" title={favGenre}>{favGenre}</p>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 uppercase tracking-wider">Favourite Genre</p>
            </div>
          </div>

          {/* Platform Preference */}
          <div className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 dark:border-white/5 flex items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-500/30">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 mr-4 sm:mr-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0">
              <MonitorSmartphone className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate" title={platform}>{platform}</p>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 uppercase tracking-wider">Top Platform</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}