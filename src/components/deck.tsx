import { useDeck } from "../stores/card";
import cardBack from "../assets/card-back.png";

export function Deck() {
  const deck = useDeck();

  return (
    <div>
      <div
        className="aspect-[62/88] h-[250px] rounded-md bg-cover"
        style={{
          backgroundImage: `url(${cardBack})`,
        }}
      />
      <p className="mt-2 text-center font-bold text-white">
        Cards left : {deck.length}/52
      </p>
    </div>
  );
}
