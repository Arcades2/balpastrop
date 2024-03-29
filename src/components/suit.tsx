import { Suits } from "../types";

export type SuitProps = {
  suit: Suits;
};

export function Suit({ suit }: SuitProps) {
  if (suit === "H") {
    return <span className="text-red-800">♥</span>;
  }
  if (suit === "D") {
    return <span className="text-red-600">♦</span>;
  }
  if (suit === "C") {
    return <span className="text-sky-950">♣</span>;
  }
  if (suit === "S") {
    return <span className="text-stone-900">♠</span>;
  }
}
