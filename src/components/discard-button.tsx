import { useCardActions, useDiscards } from "../stores/card";
import { Button } from "./button";

export function DiscardButton() {
  const { discardSelectedCards, fillHand } = useCardActions();
  const discards = useDiscards();

  return (
    <Button
      className="bg-red-500 hover:bg-red-700 disabled:bg-gray-400"
      disabled={discards === 0}
      onClick={() => {
        discardSelectedCards();
        fillHand();
      }}
    >
      Discard
    </Button>
  );
}
