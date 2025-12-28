import { GameCanvas } from "./components/GameCanvas";
import MainMenu from "./components/MainMenu";
import { useState } from "react";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <MainMenu onPlay={() => setGameStarted(true)} />;
  }
  return (
    <div>
      <GameCanvas />
    </div>
  );
}

export default App;
