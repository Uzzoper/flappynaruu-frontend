import { GameCanvas } from "./components/GameCanvas";
import MainMenu from "./components/MainMenu";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return (
      <>
        <MainMenu onPlay={() => setGameStarted(true)} />
        <Analytics />
      </>
    );
  }
  return (
    <div>
      <GameCanvas />
      <Analytics />
    </div>
  );
}

export default App;
