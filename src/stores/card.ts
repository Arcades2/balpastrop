import { create } from "zustand";
import { CardDef } from "../types";

type CardState = {
  selectedCards: Array<CardDef>;
  hand: Array<CardDef>;
  deck: Array<CardDef>;
  discardPile: Array<CardDef>;
  actions: {
    setHand: (hand: Array<CardDef>) => void;
    selectCard: (cardId: CardDef) => void;
    isCardSelected: (cardId: CardDef) => boolean;
  };
};

export const useCardStore = create<CardState>()((set, get) => ({
  selectedCards: [],
  deck: [],
  discardPile: [],
  hand: [
    ["A", "H"],
    ["K", "H"],
    ["Q", "H"],
    ["J", "H"],
    ["10", "H"],
    ["9", "H"],
    ["8", "H"],
    ["7", "H"],
    ["6", "H"],
    ["5", "H"],
  ],
  actions: {
    setHand: (hand: Array<CardDef>) => set({ hand }),
    selectCard: (cardDef: CardDef) => {
      set((s) => {
        if (get().actions.isCardSelected(cardDef)) {
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

export const useCardActions = () => useCardStore((s) => s.actions);
