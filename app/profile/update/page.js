import { auth } from '@/app/_lib/auth';
import { getUserData } from '@/app/_lib/DataService';
import { updateUser } from '@/app/_lib/actions';
import countries from '@/app/_lib/countries';

export const metadata = {
  title: "Account Settings | GameShelf",
};

export default async function Update() {
  const session = await auth();
  const email = session?.user?.email;

  const userData = (await getUserData(email))?.[0];

  const defaultData = {
    name: userData?.name || '',
    email: userData?.email || '',
    country: userData?.country || '',
    genre: userData?.favourite_genre || '',
    platform: userData?.platform_preference || '',
    theme: userData?.theme || '',
  };

  // Ultra-compact on mobile (p-2, text-xs), standard on desktop (sm:p-2.5, sm:text-sm)
  const inputBaseClasses = "w-full p-2 sm:p-2.5 text-xs sm:text-sm border rounded-lg sm:rounded-xl outline-none transition-all duration-300";
  const activeInputClasses = `${inputBaseClasses} bg-white/80 dark:bg-gray-950/50 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-indigo-500/30`;
  const disabledInputClasses = `${inputBaseClasses} bg-gray-100/80 dark:bg-gray-800/50 border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 cursor-not-allowed`;

  return (
    // Removed `mt-14` to stop it from pushing past 100vh. Added `pt-16` to safely clear the fixed navbar.
    // Reduced mobile Y-padding to `py-2`.
    <div className="flex-1 w-full min-h-screen flex items-center justify-center bg-transparent pt-16 pb-4 px-3 sm:px-6 relative overflow-hidden transition-colors duration-300">
      
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Glassmorphism Form Card - Reduced mobile padding to `p-5` */}
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-white/5">
          
          {/* Header - Scaled down text and margins for mobile */}
          <div className="text-center mb-4 sm:mb-6 space-y-0.5 sm:space-y-1">
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Settings</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Update your preferences to customize your GameShelf.</p>
          </div>
          
          {/* Form - Reduced spacing to `space-y-3` on mobile */}
          <form action={updateUser} className="space-y-3 sm:space-y-4">
            <input type="hidden" name="email" value={defaultData.email} />

            {/* Read-Only Information: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={defaultData.name}
                  className={disabledInputClasses}
                  disabled
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  defaultValue={defaultData.email}
                  className={disabledInputClasses}
                  disabled
                />
              </div>
            </div>

            {/* Editable Information - Reduced top margin on divider */}
            <div className="pt-3 sm:pt-4 mt-1 border-t border-gray-200 dark:border-white/10">
              
              <div className="mb-3 sm:mb-4">
                <label className="block text-[10px] sm:text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300 uppercase tracking-wider">Country</label>
                <select 
                  name="country" 
                  defaultValue={defaultData.country} 
                  className={activeInputClasses}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Genre and Platform Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                
                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300 uppercase tracking-wider">Favourite Genre</label>
                  <select
                    name="favourite_genre"
                    defaultValue={defaultData.genre}
                    className={activeInputClasses}
                  >
                    <option value="">Select Genre</option>
                    {['Action', 'RPG', 'Adventure', 'Shooter', 'Horror', 'Puzzle', 'Indie', 'Strategy'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300 uppercase tracking-wider">Primary Platform</label>
                  <select
                    name="platform_preference"
                    defaultValue={defaultData.platform}
                    className={activeInputClasses}
                  >
                    <option value="">Select Platform</option>
                    {['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* Submit Button - Thinner padding on mobile */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-indigo-500/50 outline-none"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}