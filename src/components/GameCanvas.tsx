import { useEffect, useRef, useState } from "react";
import { startGame } from "../game/engine/GameEngine";
import { LeaderboardOverlay } from "./LeaderboardOverlay";
import "./GameCanvas.css";
import type { GameState } from "../game/state/GameState";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardState, setLeaderboardState] = useState<{
    show: boolean;
    score: number;
  }>({ show: false, score: 0 });

  const stopGameRef = useRef<(() => void) | undefined>(undefined);
  const resetGameRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isMounted = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const init = async () => {
      const result = await startGame(canvas, (state: GameState) => {
        if (!isMounted) return;

        if (state.leaderboardStatus === 'input') {
          setLeaderboardState({ show: true, score: state.score });
        }
      });

      if (!isMounted || !result) {
        if (result?.stop) result.stop();
        return;
      }
      stopGameRef.current = result.stop;
      resetGameRef.current = result.reset;
      setIsLoading(false);
    };

    init();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resize);

      if (stopGameRef.current) stopGameRef.current();
    };
  }, []);

  const handleSaved = () => {
    setLeaderboardState({ show: false, score: 0 });
    if (resetGameRef.current) resetGameRef.current();
  };

  const handleClose = () => {
    setLeaderboardState({ show: false, score: 0 });
    if (resetGameRef.current) resetGameRef.current();
  };

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

      {leaderboardState.show && (
        <LeaderboardOverlay
          score={leaderboardState.score}
          onSaved={handleSaved}
          onClose={handleClose}
        />
      )}

      <canvas
        ref={canvasRef}
      />
    </div>
  );
}