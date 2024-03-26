import { usePlayedCards } from "../stores/card";
import { Card } from "./card";
import { guessPokerHand } from "../utils";

export function PlayedCards() {
  const playedCards = usePlayedCards();

  const pokerHand = guessPokerHand(playedCards);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <p className="font-bold text-center">{pokerHand}</p>
      <div className="flex flex-row gap-2">
        {playedCards.map(([rank, suit]) => (
          <Card key={`${rank}${suit}`} rank={rank} suit={suit} />
        ))}
      </div>
    </div>
  );
}
