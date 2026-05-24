import GameProgressForm from "./GameProgressForm";

export default function Page({ params }) {
  const { gameID } = params;

  return (
    <div className="mt-20">
      <GameProgressForm gameID={gameID} />
    </div>
  );
}
