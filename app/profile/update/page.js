import { auth } from '@/app/_lib/auth';
import { getUserData } from '@/app/_lib/DataService';
import { updateUser } from '@/app/_lib/actions'; // 🔁 Replace with your update logic
import countries from '@/app/_lib/countries';

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

  return (
    <div className="max-w-xl mx-auto mt-0 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Update User Info</h1>
      
      <form action={updateUser} className="space-y-5">
        <input type="hidden" name="email" value={defaultData.email} />

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={defaultData.name}
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600"
            disabled
          />
        </div>

        {/* Email (disabled) */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={defaultData.email}
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600"
            disabled
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select name="country" defaultValue={defaultData.country} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600">
            <option value="">Select Country</option>
              {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Favourite Genre */}
        <div>
          <label className="block text-sm font-medium mb-1">Favourite Genre</label>
          <select
            name="favourite_genre"
            defaultValue={defaultData.genre}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">Select</option>
            {['Action', 'RPG', 'Adventure', 'Shooter', 'Horror', 'Puzzle', 'Indie', 'Strategy'].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Platform Preference */}
        <div>
          <label className="block text-sm font-medium mb-1">Platform Preference</label>
          <select
            name="platform_preference"
            defaultValue={defaultData.platform}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">Select</option>
            {['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
