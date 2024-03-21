import { Suits } from "../types";

export type SuitProps = {
  suit: Suits;
};

export function Suit({ suit }: SuitProps) {
  if (suit === "H") {
    return <span className="text-red-800">♥</span>;
  }
  if (suit === "D") {
    return <span className="text-red-800">♦</span>;
  }
  if (suit === "C") {
    return <span className="text-black">♣</span>;
  }
  if (suit === "S") {
    return <span className="text-black">♠</span>;
  }
}
