import { Hand } from "./components/hand";
import { Deck } from "./components/deck";
import { PlayedCards } from "./components/played-cards";
import { PlayButton } from "./components/play-button";

function App() {
  return (
    <div>
      <div className="container mx-auto h-[100vh]">
        <div className="h-1/2 flex items-center justify-center">
          <PlayedCards />
        </div>
        <div className="h-1/2 flex items-center gap-16">
          <Hand />
          <PlayButton />
          <div className="self-end mb-6">
            <Deck />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
