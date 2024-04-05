import { usePlayableHands, useDiscards } from "../stores/card";
import { cn } from "../utils";

export type PlayInfoProps = {
  containerClassName?: string;
};

export function PlayInfo({ containerClassName }: PlayInfoProps) {
  const playableHands = usePlayableHands();
  const discards = useDiscards();

  return (
    <div
      className={cn(
        "flex bg-opacity-25 bg-black text-white text-center p-2",
        containerClassName,
      )}
    >
      <div className="text-white p-2 flex flex-col gap-2 w-[120px]">
        <div className="text-2xl">Hands</div>
        <div className="rounded bg-opacity-80 bg-zinc-800 p-2 text-blue-500 font-bold text-3xl">
          {playableHands}
        </div>
      </div>
      <div className="text-white p-2 flex flex-col gap-2 w-[120px]">
        <div className="text-2xl">Discards</div>
        <div className="rounded bg-opacity-80 bg-zinc-800 p-2 text-red-500 font-bold text-3xl">
          {discards}
        </div>
      </div>
    </div>
  );
}
