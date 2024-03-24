export type Ranks =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type Suits = "C" | "D" | "H" | "S";

export type SuitColor = "red" | "black";

export type CardDef = readonly [Ranks, Suits];

export type CardId = `${Ranks}${Suits}`;
