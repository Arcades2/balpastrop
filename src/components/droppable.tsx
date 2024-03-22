import { useDroppable } from "@dnd-kit/core";

export type DroppableProps = {
  children: React.ReactNode;
  className?: string;
};

export function Droppable({ children, ...props }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    background: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...props}>
      {children}
    </div>
  );
}
