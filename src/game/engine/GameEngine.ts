import type { GameState } from "../state/GameState";
import { updateGame } from "../systems/UpdateGame";
import { applyJump } from "../systems/Physics";
import { renderGame } from "../systems/RenderSystem";
import { createInitialState } from "../state/CreateInitialState";

export function startGame(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let state: GameState = createInitialState(canvas);

    window.addEventListener("keydown", (event) => {
        if (event.code != "Space") return;
        
        if (state.isGameOver) {
            state = createInitialState(canvas);
            loop();
            return;
        }

            applyJump(state.bird, -8);
    });

    const loop = () => {
        updateGame(state, canvas);

        renderGame(ctx, state, canvas);

        if (!state.isGameOver) {
            requestAnimationFrame(loop);
        }
    }

    loop();
}