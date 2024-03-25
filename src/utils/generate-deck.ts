function shuffle<T>(array: Array<T>) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateDeck() {
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ] as const;
  const suits = ["C", "D", "H", "S"] as const;

  const deck = ranks.flatMap((rank) =>
    suits.map((suit) => [rank, suit] as const),
  );

  return shuffle(deck);
}
