import { useEffect, useRef } from "react";
import { startGame } from "../game/engine/GameEngine";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      startGame(canvasRef.current)
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={600}
      style={{
        border: "2px solid white",
        display: "block",
        margin: "0 auto",
        background: "#222",
      }}
    />
  );
}