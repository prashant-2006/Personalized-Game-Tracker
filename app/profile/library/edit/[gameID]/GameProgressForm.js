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

  // TIGHTENED INPUTS: Reduced vertical padding to py-2 sm:py-2.5
  const inputClasses = "w-full py-2 px-3 sm:py-2.5 sm:px-3 text-sm sm:text-base bg-white/80 dark:bg-gray-950/50 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-indigo-500/30 transition-all duration-300 outline-none";
  const labelClasses = "block text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1 sm:mb-1.5";

  return (
    // TIGHTENED WRAPPER: Reduced top/bottom padding to py-4 sm:py-8 and max-width to max-w-xl
    <div className="w-full max-w-xl mx-auto py-4 sm:py-8 px-4 sm:px-0 relative z-10">
      
      {/* Glassmorphism Form Card */}
      <form
        action={updateStatus}
        // TIGHTENED CARD: Reduced padding to p-5 sm:p-8 and gap to space-y-4 sm:space-y-6
        className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-5 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-white/5 space-y-4 sm:space-y-6"
      >
        <input type="hidden" name="gameID" value={gameID} />

        {/* Header Area with Inner Back Button */}
        <div className="relative flex flex-col items-center">
          
          {/* Back Button - Reduced mb-4 for mobile */}
          <div className="w-full flex justify-start mb-4 sm:absolute sm:top-0 sm:left-0 sm:mb-0">
            <Link 
              href={`/profile/library/${gameID}`} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/80 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Back
            </Link>
          </div>

          {/* Main Title */}
          <div className="text-center space-y-0.5 sm:space-y-1 mt-1 sm:mt-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Edit <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Progress</span>
            </h2>
            <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-400">Update your play status and notes.</p>
          </div>
          
        </div>

        {/* Form Fields Wrapper - Tighter spacing */}
        <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          
          {/* Status */}
          <div>
            <label className={labelClasses}>Status</label>
            <select
              name="status"
              defaultValue={defaultFormData.status}
              className={inputClasses}
            >
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>

          {/* Completed On (Grid) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className={labelClasses}>Month</label>
              <select
                name="completedMonth"
                defaultValue={defaultFormData.completedMonth}
                className={inputClasses}
              >
                <option value="">Select</option>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Year</label>
              <select
                name="completedYear"
                defaultValue={defaultFormData.completedYear}
                className={inputClasses}
              >
                <option value="">Select</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes - Reduced to 3 rows */}
          <div>
            <label className={labelClasses}>Notes</label>
            <textarea
              name="notes"
              defaultValue={defaultFormData.notes}
              rows={3}
              placeholder="What did you think of the game?"
              className={`${inputClasses} resize-none`}
            />
          </div>
        </div>

        {/* Submit Button - Reduced padding to py-2.5 sm:py-3 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-indigo-500/50 outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}