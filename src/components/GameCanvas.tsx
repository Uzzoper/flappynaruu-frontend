import { useEffect, useRef } from "react";
import { startGame } from "../game/engine/GameEngine";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isMounted = true;
    let cleanupFn: (() => void) | undefined;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const init = async () => {
      const stop = await startGame(canvas);
      if (!isMounted) {
        if (stop) stop();
        return;
      }
      cleanupFn = stop;
    };

    init();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resize);

      if (cleanupFn) cleanupFn();
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