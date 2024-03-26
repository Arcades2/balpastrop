import { usePlayedCards } from "../stores/card";
import { Card } from "./card";
import { guessPokerHand } from "../utils";

export function PlayedCards() {
  const playedCards = usePlayedCards();

  const pokerHand = guessPokerHand(playedCards);

  return (
    <div className="flex flex-row gap-2">
      <p className="font-bold">{pokerHand}</p>
      {playedCards.map(([rank, suit]) => (
        <Card key={`${rank}${suit}`} rank={rank} suit={suit} />
      ))}
    </div>
  );
}
