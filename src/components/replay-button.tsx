import { useCardActions } from "../stores/card";
import { Button } from "./button";

export function ReplayButton() {
  const { fillHand, cleanPlayedCards } = useCardActions();

  return (
    <Button
      onClick={() => {
        fillHand();
        cleanPlayedCards();
      }}
    >
      Replay
    </Button>
  );
}
