import { useScores } from "../stores/card";

export function Score() {
  const { score, highestScore } = useScores();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-3xl text-white">Score: {score}</div>
      <div className="text-2xl text-white">Highest: {highestScore}</div>
    </div>
  );
}
