import type { GameState } from "../state/GameState";
import { updateGame } from "../systems/UpdateGame";
import { renderGame } from "../systems/RenderSystem";
import { createInitialState } from "../state/CreateInitialState";
import { loadBackground } from "../systems/BackgroundRender";
import { setupInput } from "../systems/InputSystem";

export function startGame(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    loadBackground();

    let state: GameState = createInitialState(canvas);

    setupInput(
        canvas,
        () => state,
        (newState) => (state = newState)
    );

    const loop = () => {
        if (!state.isGameOver) {
            updateGame(state, canvas);
        }

        renderGame(ctx, state, canvas);

        requestAnimationFrame(loop);
    };

    loop();
}