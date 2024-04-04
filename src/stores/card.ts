import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { CardDef } from "../types";
import { generateDeck, getPokerHandPoints } from "../utils";

type CardState = {
  selectedCards: Array<CardDef>;
  playedCards: Array<CardDef>;
  hand: Array<CardDef>;
  deck: Array<CardDef>;
  discardPile: Array<CardDef>;
  score: number;
  highestScore: number;
  playableHands: number;
  discards: number;
  actions: {
    setHand: (hand: Array<CardDef>) => void;
    selectCard: (cardId: CardDef) => void;
    drawCard: () => void;
    fillHand: () => void;
    playSelectedCards: () => void;
    cleanPlayedCards: () => void;
    discardSelectedCards: () => void;
    newGame: () => void;
  };
  private: {
    isCardSelected: (cardId: CardDef) => boolean;
  };
};

export const useCardStore = create<CardState>()((set, get) => ({
  selectedCards: [],
  playedCards: [],
  deck: generateDeck(),
  discardPile: [],
  hand: [],
  score: 0,
  playableHands: 5,
  discards: 3,
  highestScore: Number(localStorage.getItem("highestScore")) ?? 0,
  actions: {
    setHand: (hand: Array<CardDef>) => set({ hand }),
    selectCard: (cardDef: CardDef) => {
      if (get().playableHands === 0 || get().playedCards.length) return;

      set((s) => {
        if (get().private.isCardSelected(cardDef)) {
          return {
            selectedCards: s.selectedCards.filter(
              (c) => c.join("") !== cardDef.join(""),
            ),
          };
        }

        if (s.selectedCards.length < 5) {
          return { selectedCards: [...s.selectedCards, cardDef] };
        }

        return { selectedCards: s.selectedCards };
      });
    },
    drawCard: () => {
      const { deck, hand } = get();

      if (deck.length === 0) {
        set({ deck: generateDeck() });
      }

      const [card, ...rest] = deck;
      set({ deck: rest, hand: [...hand, card] });
    },
    fillHand: () => {
      const { hand, deck } = get();

      if (hand.length < 8 && deck.length > 0) {
        get().actions.drawCard();
        get().actions.fillHand();
      }
    },
    playSelectedCards: () => {
      set((s) => {
        const { selectedCards, hand } = s;

        const score = s.score + getPokerHandPoints(selectedCards);

        if (score > s.highestScore) {
          localStorage.setItem("highestScore", score.toString());
        }

        return {
          hand: hand.filter(
            (card) =>
              selectedCards.findIndex(
                (c) => c[0] === card[0] && c[1] === card[1],
              ) === -1,
          ),
          playedCards: selectedCards,
          selectedCards: [],
          playableHands: s.playableHands - 1,
          score,
          highestScore: Math.max(s.highestScore, score),
        };
      });
    },
    cleanPlayedCards: () => {
      set((s) => {
        const { playedCards, discardPile } = s;

        return {
          playedCards: [],
          discardPile: [...discardPile, ...playedCards],
        };
      });
    },
    discardSelectedCards: () => {
      set((s) => {
        const { selectedCards, hand } = s;

        return {
          hand: hand.filter(
            (card) =>
              selectedCards.findIndex(
                (c) => c[0] === card[0] && c[1] === card[1],
              ) === -1,
          ),
          discards: s.discards - 1,
          selectedCards: [],
          discardPile: [...s.discardPile, ...selectedCards],
        };
      });
    },
    newGame: () => {
      set({
        selectedCards: [],
        playedCards: [],
        deck: generateDeck(),
        discardPile: [],
        hand: [],
        score: 0,
        playableHands: 5,
        discards: 3,
      });
      get().actions.fillHand();
    },
  },
  private: {
    isCardSelected: (cardDef: CardDef) => {
      const { selectedCards } = get();

      return (
        selectedCards.findIndex(
          (c) => c[0] === cardDef[0] && c[1] === cardDef[1],
        ) !== -1
      );
    },
  },
}));

export const useHand = () => useCardStore((s) => s.hand);
export const useSelectedCards = () => useCardStore((s) => s.selectedCards);
export const useDeck = () => useCardStore((s) => s.deck);
export const useDiscardPile = () => useCardStore((s) => s.discardPile);
export const usePlayedCards = () => useCardStore((s) => s.playedCards);
export const useScores = () =>
  useCardStore(
    useShallow((s) => ({
      score: s.score,
      highestScore: s.highestScore,
    })),
  );
export const usePlayableHands = () => useCardStore((s) => s.playableHands);
export const useDiscards = () => useCardStore((s) => s.discards);

export const useCardActions = () => useCardStore((s) => s.actions);
