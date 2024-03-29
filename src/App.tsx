import { Hand } from "./components/hand";
import { Deck } from "./components/deck";
import { PlayedCards } from "./components/played-cards";
import { PlayButton } from "./components/play-button";
import { DiscardButton } from "./components/discard-button";

function App() {
  return (
    <div
      /* className="crt" */
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
        <div className="h-1/2 flex items-center gap-16">
          <Hand />
          <div className="flex flex-col items-center gap-6">
            <PlayButton />
            <DiscardButton />
          </div>
          <div className="self-end mb-6">
            <Deck />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
