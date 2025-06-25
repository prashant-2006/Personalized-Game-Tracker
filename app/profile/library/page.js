import { Suspense } from "react";
import LoadingSpinner from "@/app/loading";
import FilterBar from "@/app/components/FilterBar";
import GamesGrid from "@/app/components/GamesGrid";

export default async function Page({ searchParams }) {
  const selectedStatus = searchParams?.status || "All";
  console.log("Selected status:", selectedStatus);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Library</h1>
      <FilterBar />
      <Suspense fallback={<LoadingSpinner />}>
        <GamesGrid selectedStatus={selectedStatus} /> {/* ✅ Pass the prop */}
      </Suspense>
    </div>
  );
}
