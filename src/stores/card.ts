import { create } from "zustand";
import { CardDef } from "../types";
import { generateDeck } from "../utils";

type CardState = {
  selectedCards: Array<CardDef>;
  playedCards: Array<CardDef>;
  hand: Array<CardDef>;
  deck: Array<CardDef>;
  discardPile: Array<CardDef>;
  actions: {
    setHand: (hand: Array<CardDef>) => void;
    selectCard: (cardId: CardDef) => void;
    drawCard: () => void;
    fillHand: () => void;
    playSelectedCards: () => void;
    cleanPlayedCards: () => void;
    discardSelectedCards: () => void;
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
  actions: {
    setHand: (hand: Array<CardDef>) => set({ hand }),
    selectCard: (cardDef: CardDef) => {
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

        return {
          hand: hand.filter(
            (card) =>
              selectedCards.findIndex(
                (c) => c[0] === card[0] && c[1] === card[1],
              ) === -1,
          ),
          playedCards: selectedCards,
          selectedCards: [],
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
          selectedCards: [],
          discardPile: [...s.discardPile, ...selectedCards],
        };
      });
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

export const useCardActions = () => useCardStore((s) => s.actions);
