import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export type DraggableProps = {
  children: React.ReactNode;
};

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}
