import { useCardActions } from "../stores/card";

export function DiscardButton() {
  const { discardSelectedCards, fillHand } = useCardActions();

  return (
    <button
      type="button"
      className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-40 h-20 text-xl"
      onClick={() => {
        discardSelectedCards();
        fillHand();
      }}
    >
      Discard
    </button>
  );
}
