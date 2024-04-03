import { Hand } from "./components/hand";
import { Deck } from "./components/deck";
import { PlayedCards } from "./components/played-cards";
import { PlayButton } from "./components/play-button";
import { DiscardButton } from "./components/discard-button";
import { usePlayedCards } from "./stores/card";
import { ReplayButton } from "./components/replay-button";

function App() {
  const playedCards = usePlayedCards();

  return (
    <div
      className="crt font-balatro"
      style={{
        backgroundImage: "url('/balatro.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto h-[100vh]">
        <div className="h-1/2 flex items-center justify-center">
          <PlayedCards />
        </div>
        <div className="h-1/2 flex flex-col justify-center gap-16 relative">
          <Hand />
          <div className="flex justify-center items-center gap-6">
            {playedCards.length ? (
              <ReplayButton />
            ) : (
              <>
                <PlayButton />
                <DiscardButton />
              </>
            )}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0">
            <Deck />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
