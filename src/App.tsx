import { Card } from "./components/card";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Droppable } from "./components/droppable";
import React from "react";
import { Ranks, Suits, CardId } from "./types";

function App() {
  const [cards, setCards] = React.useState<Array<[Ranks, Suits]>>([
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
  ]);
  const [selectedCards, setSelectedCards] = React.useState<Array<CardId>>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  return (
    <div className="dark">
      <div className="container mx-auto h-[100vh] flex items-center">
        <DndContext
          sensors={sensors}
          onDragEnd={(event) => {
            const { active, over } = event;

            if (active.id !== over?.id) {
              setCards((c) => {
                const oldIndex = c.findIndex(
                  (card) => `${card[0]}${card[1]}` === active.id,
                );
                const newIndex = c.findIndex(
                  (card) => `${card[0]}${card[1]}` === over?.id,
                );
                return arrayMove(c, oldIndex, newIndex);
              });
            }
          }}
        >
          <Droppable className="relative w-full flex justify-center">
            <SortableContext
              items={cards.map((c) => `${c[0]}${c[1]}`)}
              strategy={horizontalListSortingStrategy}
            >
              {cards.map((card, idx) => (
                <Card
                  className="-mx-8"
                  style={{
                    transform: ((): string => {
                      const transform = calculateCardRotation(
                        idx,
                        cards.length,
                      );

                      let { translate } = transform;

                      if (selectedCards.includes(card.join(""))) {
                        translate -= 30;
                      }

                      return `rotate(${transform.rotation}deg) translateY(${translate}px)`;
                    })(),
                  }}
                  key={`${card[0]}${card[1]}`}
                  rank={card[0]}
                  suit={card[1]}
                  onClick={(cardId: CardId) => {
                    console.log("clicked", idx);
                    setSelectedCards((s) => {
                      if (s.includes(cardId)) {
                        return s.filter((i) => i !== cardId);
                      }

                      return [...s, cardId];
                    });
                  }}
                />
              ))}
            </SortableContext>
          </Droppable>
        </DndContext>
      </div>
    </div>
  );
}

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

  const translate = Math.pow(Math.abs(distance), 2) * 3;

  return {
    rotation,
    translate,
  };
}

export default App;
