import GameProgressForm from "./GameProgressForm";

export default function Page({ params }) {
  const { gameID } = params;

  return (
    <div className="p-6">
      <GameProgressForm gameID={gameID} />
    </div>
  );
}
