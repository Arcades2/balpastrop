import { useCardActions } from "../stores/card";

export function PlayButton() {
  const { playSelectedCards, fillHand, cleanPlayedCards } = useCardActions();

  return (
    <button
      type="button"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-40 h-20 text-xl"
      onClick={() => {
        playSelectedCards();
        setTimeout(() => {
          fillHand();
          cleanPlayedCards();
        }, 2000);
      }}
    >
      Play
    </button>
  );
}
