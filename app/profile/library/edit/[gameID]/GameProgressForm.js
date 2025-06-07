import { updateStatus } from '@/app/_lib/actions';
import getGameData from '@/app/_lib/DataService';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default async function GameProgressForm({ gameID }) {
  const userData = (await getGameData(gameID))?.[0];

  const defaultFormData = {
    status: userData?.status || 'Not Completed',
    completedMonth: userData?.completed_on?.split(' ')?.[0].substring(0, 3) || '',
    completedYear: userData?.completed_on?.split(' ')?.[1] || '',
    notes: userData?.notes || '',
  };

  return (
    <>
    <Link href={`/profile/library/${gameID}`} className="inline-flex items-center gap-2 text-indigo-500 hover:underline">
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </Link>
    <form
      action={updateStatus }
      className="max-w-xl space-y-6 p-6 bg-white dark:bg-gray-900 rounded-lg shadow"
    >
      <input type="hidden" name="gameID" value={gameID} />

      <h2 className="text-2xl font-bold">Edit Game Progress</h2>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select
          name="status"
          defaultValue={defaultFormData.status}
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>

      {/* Completed On */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Month</label>
          <select
            name="completedMonth"
            defaultValue={defaultFormData.completedMonth}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">Select</option>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Year</label>
          <select
            name="completedYear"
            defaultValue={defaultFormData.completedYear}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="">Select</option>
            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold mb-1">Notes</label>
        <textarea
          name="notes"
          defaultValue={defaultFormData.notes}
          rows={4}
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Save Changes
      </button>
    </form>
    </>
  );
}