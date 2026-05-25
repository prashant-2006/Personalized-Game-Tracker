import GameProgressForm from "./GameProgressForm";

export default async function Page({ params }) {
  // Await the params Promise here
  const { gameID } = await params;

  return (
    <div className="mt-20">
      <GameProgressForm gameID={gameID} />
    </div>
  );
}