/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ranks, Suits, CardId } from "../types";
import { Suit } from "./suit";
import { cn } from "../utils";

export type CardProps = {
  rank: Ranks;
  suit: Suits;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (cardId: CardId) => void;
};

export function Card({ rank, suit, className, style, onClick }: CardProps) {
  const id = `${rank}${suit}` as const;
  const { attributes, active, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const cardStyle = {
    transform: transform
      ? `${CSS.Translate.toString(transform)} ${active?.id !== id ? style?.transform : ""}`
      : style?.transform,
    transition,
    zIndex: active?.id === id ? 999 : 0,
  };

  return (
    <div
      data-color={["H", "D"].includes(suit) ? "red" : "black"}
      data-dragging={active?.id === id ? "true" : "false"}
      className={cn(
        "bg-stone-300 aspect-[62/88] h-[250px] rounded-md data-[color=red]:text-red-800 data-[color=black]:text-stone-900 p-4 flex flex-col justify-between data-[dragging=true]:shadow-lg data-[dragging=false]:shadow-md border-stone-400 border-2",
        className,
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(id)}
      style={cardStyle}
    >
      <div className="text-5xl">
        <Suit suit={suit} />
      </div>
      <div className="text-6xl text-center">
        <span className="font-bold">{rank}</span>
      </div>
      <div className="text-5xl rotate-180">
        <Suit suit={suit} />
      </div>
    </div>
  );
}
