import React from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Droppable } from "./droppable";
import { Card } from "./card";
import { useHand, useCardActions, useSelectedCards } from "../stores/card";
import { CardDef } from "../types";

function calculateCardRotation(idx: number, total: number) {
  const isEven = total % 2 === 0;

  const half = total / 2;

  const distance = (() => {
    if (isEven && idx - half >= 0) {
      return idx - half + 1;
    }

    return Math.round(idx - half);
  })();

  const rotation = distance * 3;

  const translate = Math.abs(distance) ** 2 * 3;

  return {
    rotation,
    translate,
  };
}

export function Hand() {
  const hand = useHand();
  const selectedCards = useSelectedCards();
  const { setHand, selectCard, fillHand } = useCardActions();

  const isCardSelected = (cardDef: CardDef) =>
    selectedCards.findIndex(
      (c) => c[0] === cardDef[0] && c[1] === cardDef[1],
    ) !== -1;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor),
  );

  React.useEffect(() => {
    fillHand();
  }, [fillHand]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
          const oldIndex = hand.findIndex(
            (card) => `${card[0]}${card[1]}` === active.id,
          );
          const newIndex = hand.findIndex(
            (card) => `${card[0]}${card[1]}` === over?.id,
          );

          setHand(arrayMove(hand, oldIndex, newIndex));
        }
      }}
    >
      <Droppable className="relative w-full flex justify-center">
        <SortableContext
          items={hand.map((c) => `${c[0]}${c[1]}`)}
          strategy={horizontalListSortingStrategy}
        >
          {hand.map((card, idx) => (
            <Card
              className="-mx-8"
              style={{
                transform: ((): string => {
                  const transform = calculateCardRotation(idx, hand.length);

                  let { translate } = transform;

                  if (isCardSelected(card)) {
                    translate -= 30;
                  }

                  return `rotate(${transform.rotation}deg) translateY(${translate}px)`;
                })(),
              }}
              key={`${card[0]}${card[1]}`}
              rank={card[0]}
              suit={card[1]}
              onClick={selectCard}
            />
          ))}
        </SortableContext>
      </Droppable>
    </DndContext>
  );
}
