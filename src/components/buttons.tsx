import {
  usePlayedCards,
  usePlayableHands,
  useCardActions,
} from "../stores/card";
import { ReplayButton } from "./replay-button";
import { PlayButton } from "./play-button";
import { DiscardButton } from "./discard-button";
import { Button } from "./button";

export function Buttons() {
  const playedCards = usePlayedCards();
  const playableHands = usePlayableHands();
  const { newGame } = useCardActions();

  if (playableHands === 0) {
    return (
      <Button className="bg-blue-500" onClick={newGame}>
        New game
      </Button>
    );
  }

  if (playedCards.length) return <ReplayButton />;

  return (
    <>
      <PlayButton />
      <DiscardButton />
    </>
  );
}
