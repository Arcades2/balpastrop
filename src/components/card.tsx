/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ranks, Suits, CardDef } from "../types";
import { Suit } from "./suit";
import { cn } from "../utils";

export type CardProps = {
  rank: Ranks;
  suit: Suits;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (cardDef: CardDef) => void;
};

export function Card({ rank, suit, className, style, onClick }: CardProps) {
  const id = `${rank}${suit}` as const;
  const cardDef = [rank, suit] as const;

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
      data-suit={suit}
      className={cn(
        "bg-stone-300 aspect-[62/88] h-[250px] rounded-md data-[suit=H]:text-red-800 data-[suit=D]:text-red-600 data-[suit=S]:text-stone-900 data-[suit=C]:text-sky-950 p-4 flex flex-col justify-between shadow-lg shadow-black select-none",
        className,
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(cardDef)}
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
