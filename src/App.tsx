import { Hand } from "./components/hand";
import { Deck } from "./components/deck";
import { PlayedCards } from "./components/played-cards";
import { Score } from "./components/score";
import { Buttons } from "./components/buttons";
import { PlayInfo } from "./components/play-info";

function App() {
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
        <div className="h-1/2 flex items-center justify-center relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-0">
            <Score />
            <PlayInfo containerClassName="mt-8" />
          </div>
          <PlayedCards />
        </div>
        <div className="h-1/2 flex flex-col justify-center gap-16 relative">
          <Hand />
          <div className="flex justify-center items-center gap-6">
            <Buttons />
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
