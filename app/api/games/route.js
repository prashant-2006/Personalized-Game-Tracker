import { getGames } from "@/app/_lib/DataService";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const selectedStatus = searchParams.get("status") || "All";
  const selectedYear = searchParams.get("year") || "All Years";

  const gameIds = await getGames({ selectedStatus, selectedYear });
  return Response.json(gameIds);
}
