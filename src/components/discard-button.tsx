import { useCardActions } from "../stores/card";
import { Button } from "./button";

export function DiscardButton() {
  const { discardSelectedCards, fillHand } = useCardActions();

  return (
    <Button
      className="bg-red-500 hover:bg-red-700"
      onClick={() => {
        discardSelectedCards();
        fillHand();
      }}
    >
      Discard
    </Button>
  );
}
