import { useCardActions } from "../stores/card";
import { Button } from "./button";

export function PlayButton() {
  const { playSelectedCards } = useCardActions();

  return (
    <Button
      className="bg-green-500 hover:bg-green-700"
      onClick={() => {
        playSelectedCards();
      }}
    >
      Play
    </Button>
  );
}
