import { Hand } from "./components/hand";
import { Deck } from "./components/deck";

function App() {
  return (
    <div>
      <div className="container mx-auto h-[100vh]">
        <div className="h-1/2">Test</div>
        <div className="h-1/2 flex items-center">
          <Hand />
          <div className="self-end mb-6">
            <Deck />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
