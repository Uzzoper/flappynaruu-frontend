import { useEffect, useRef } from "react";
import { startGame } from "../game/engine/GameEngine";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const stopGame = startGame(canvas);

    return () => {
      window.removeEventListener("resize", resize);

      if (stopGame) stopGame();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        background: "#222",
      }}
    />
  );
}