'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const statuses = ["All", "Completed", "Not Completed"];
const currentYear = new Date().getFullYear();
const years = ["All Years", ...Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())];

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedStatus = searchParams.get('status') || "All";
  const selectedYear = searchParams.get('year') || "All Years";

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-3xl mx-auto px-1">
      
      {/* Premium Segmented Control for Status */}
      <div className="flex items-center p-1 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg w-full sm:w-auto overflow-hidden">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => updateParam('status', status)}
            // whitespace-nowrap prevents the text from stacking and ruining the shape!
            className={`flex-1 sm:flex-none px-2 py-2 sm:px-5 sm:py-2.5 rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
              selectedStatus === status
                ? "bg-indigo-600 text-white shadow-md transform scale-[1.02]"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Glassmorphism Year Dropdown */}
      <div className="relative w-full sm:w-auto">
        <select
          value={selectedYear}
          onChange={(e) => updateParam('year', e.target.value)}
          className="w-full appearance-none px-4 py-2.5 pr-10 sm:px-5 sm:py-2.5 sm:pr-12 rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-lg outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 cursor-pointer"
        >
          {years.map((year) => (
            <option 
              key={year} 
              value={year} 
              className="text-gray-900 dark:text-white bg-white dark:bg-gray-900 font-medium"
            >
              {year}
            </option>
          ))}
        </select>
        
        {/* Custom Dropdown Arrow */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

    </div>
  );
}