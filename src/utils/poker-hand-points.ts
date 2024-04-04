import { CardDef } from "../types";
import { guessPokerHand } from "./guess-poker-hand";

const pokerHandPoints = {
  "Royal Flush": 1000,
  "Straight Flush": 800,
  "Four of a Kind": 420,
  "Full House": 160,
  Flush: 140,
  Straight: 120,
  "Three of a Kind": 90,
  "Two Pair": 40,
  Pair: 20,
  "High Card": 5,
};

const cardValues = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  "10": 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

export const getPokerHandPoints = (hand: Array<CardDef>) => {
  const pokerHand = guessPokerHand(hand);

  if (!pokerHand) return 0;

  return (
    pokerHandPoints[pokerHand] +
    hand.reduce((acc, card) => acc + cardValues[card[0]], 0)
  );
};
