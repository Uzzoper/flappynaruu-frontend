import { useEffect, useRef, useState } from "react";
import { startGame } from "../game/engine/GameEngine";
import "../GameCanvas.css";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };

    init();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resize);

      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <div className="canvas-wrapper">
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>
            Quase lá... <br />
            Deixando tudo pronto para você!
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
      />
    </div>
  );
}