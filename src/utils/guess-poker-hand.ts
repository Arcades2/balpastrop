import { CardDef } from "../types";

function isPair(cards: Array<CardDef>) {
  const rankCounts: Record<string, number> = {};

  cards.forEach(([rank]) => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });

  const pairCount = Object.values(rankCounts).filter(
    (count) => count === 2,
  ).length;

  return pairCount === 1;
}

function isTwoPair(cards: Array<CardDef>) {
  const rankCounts: Record<string, number> = {};

  cards.forEach(([rank]) => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });

  const pairCount = Object.values(rankCounts).filter(
    (count) => count === 2,
  ).length;

  return pairCount === 2;
}

function isThreeOfAKind(cards: Array<CardDef>) {
  const rankCounts: Record<string, number> = {};

  cards.forEach(([rank]) => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });

  const brelanCount = Object.values(rankCounts).filter(
    (count) => count === 3,
  ).length;

  return brelanCount === 1;
}

function isStraight(cards: Array<CardDef>) {
  if (cards.length !== 5) return false;

  const cardRanks = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const numericalRanks = cards.map(([rank]) => cardRanks[rank]);
  numericalRanks.sort((a, b) => a - b);

  for (let i = 0; i < 4; i += 1) {
    if (numericalRanks[i] + 1 !== numericalRanks[i + 1]) {
      if (numericalRanks[0] !== 2 || numericalRanks[4] !== 14) {
        return false;
      }
    }
  }

  return true;
}

function isFlush(cards: Array<CardDef>) {
  if (cards.length !== 5) return false;

  const suits = cards.map(([, suit]) => suit);
  return suits.every((s) => s === suits[0]);
}

function isFullHouse(cards: Array<CardDef>) {
  if (cards.length !== 5) return false;

  return isPair(cards) && isThreeOfAKind(cards);
}

function isFourOfAKind(cards: Array<CardDef>) {
  const ranks = cards.map(([rank]) => rank);
  return ranks.some((rank) => ranks.filter((r) => r === rank).length === 4);
}

function isStraightFlush(cards: Array<CardDef>) {
  return isStraight(cards) && isFlush(cards);
}

function isRoyalFlush(cards: Array<CardDef>) {
  return (
    isStraightFlush(cards) &&
    cards.some(([rank]) => rank === "A") &&
    cards.some(([rank]) => rank === "10")
  );
}

export function guessPokerHand(cards: Array<CardDef>) {
  if (cards.length === 0) return null;

  switch (true) {
    case isRoyalFlush(cards):
      return "Royal Flush";
    case isStraightFlush(cards):
      return "Straight Flush";
    case isFourOfAKind(cards):
      return "Four of a Kind";
    case isFullHouse(cards):
      return "Full House";
    case isFlush(cards):
      return "Flush";
    case isStraight(cards):
      return "Straight";
    case isThreeOfAKind(cards):
      return "Three of a Kind";
    case isTwoPair(cards):
      return "Two Pair";
    case isPair(cards):
      return "Pair";
    default:
      return "High Card";
  }
}
