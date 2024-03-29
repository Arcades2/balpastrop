import { useCardActions } from "../stores/card";

export function DiscardButton() {
  const { discardSelectedCards, fillHand } = useCardActions();

  return (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-32"
      onClick={() => {
        discardSelectedCards();
        fillHand();
      }}
    >
      Discard
    </button>
  );
}
