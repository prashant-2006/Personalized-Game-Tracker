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
    <div className="flex flex-col items-center gap-4 mb-6 sm:flex-row sm:justify-center">
      <div className="flex gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => updateParam('status', status)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedStatus === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="relative">
        <select
          value={selectedYear}
          onChange={(e) => updateParam('year', e.target.value)}
          className="appearance-none px-4 py-2 pr-10 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
          >
          {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
          ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
            <ChevronDown size={16} />
          </div>
      </div>
    </div>
  );
}
