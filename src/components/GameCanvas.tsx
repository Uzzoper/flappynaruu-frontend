import { useEffect, useRef, useState } from "react";
import { startGame } from "../game/engine/GameEngine";
import { LeaderboardOverlay } from "./LeaderboardOverlay";
import { Button, Card } from "pixel-retroui";
import "./GameCanvas.css";
import type { GameState } from "../game/state/GameState";

interface GameCanvasProps {
  onBackToMenu?: () => void;
}

export function GameCanvas({ onBackToMenu }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardState, setLeaderboardState] = useState<{
    show: boolean;
    score: number;
    connectionError: boolean;
  }>({ show: false, score: 0, connectionError: false });
  const [showPostGameOverlay, setShowPostGameOverlay] = useState(false);

  const stopGameRef = useRef<(() => void) | undefined>(undefined);
  const resetGameRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isMounted = true;

    const resize = () => {
      const vv = window.visualViewport;
      canvas.width = vv ? vv.width : window.innerWidth;
      canvas.height = vv ? vv.height : window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);

    const init = async () => {
      const result = await startGame(canvas, (state: GameState) => {
        if (!isMounted) return;

        if (state.leaderboardStatus === 'input') {
          setLeaderboardState({ show: true, score: state.score, connectionError: state.connectionError });
          setShowPostGameOverlay(false);
        }

        if (state.leaderboardStatus === 'postgame') {
          setLeaderboardState({ show: false, score: state.score, connectionError: false });
          setShowPostGameOverlay(true);
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
      window.visualViewport?.removeEventListener("resize", resize);

      if (stopGameRef.current) stopGameRef.current();
    };
  }, []);

  const handleSaved = () => {
    setLeaderboardState(prev => ({ ...prev, show: false, connectionError: false }));
    setShowPostGameOverlay(true);
  };

  const handleClose = () => {
    setLeaderboardState(prev => ({ ...prev, show: false, connectionError: false }));
    setShowPostGameOverlay(true);
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
          initialError={leaderboardState.connectionError ? 'Nós pedimos desculpas, o servidor não respondeu a tempo. Temos certeza que na próxima será possível salvar seu highscore!' : undefined}
          onSaved={handleSaved}
          onClose={handleClose}
        />
      )}

      {showPostGameOverlay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100]">
          <Card
            className="p-8 text-center max-w-[90%] w-[420px]"
            bg="#1e1e2e"
            borderColor="#333"
          >
            <h2 className="text-2xl mb-4 text-[#eb8c32] font-bold font-minecraft">
              Game Over
            </h2>
            <p className="mb-6 text-gray-300">
              Score : <strong className="font-minecraft text-[#5f9aff] text-xl">{leaderboardState.score}</strong>
            </p>
            <div className="flex gap-3 justify-center mt-4 flex-wrap">
              <Button
                onClick={() => {
                  setShowPostGameOverlay(false);
                  resetGameRef.current?.();
                }}
                bg="#eb8c32"
                textColor="#0d0d14"
                shadow="#c97020"
                className="px-6 py-3"
              >
                JOGAR NOVAMENTE
              </Button>
              <Button
                onClick={() => {
                  stopGameRef.current?.();
                  onBackToMenu?.();
                }}
                bg="transparent"
                textColor="#aaa"
                shadow="#555"
                className="px-6 py-3"
              >
                VOLTAR AO MENU
              </Button>
            </div>
          </Card>
        </div>
      )}

      <canvas
        ref={canvasRef}
      />
    </div>
  );
}