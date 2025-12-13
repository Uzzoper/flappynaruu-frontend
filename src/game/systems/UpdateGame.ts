import type { GameState } from "../state/GameState";
import { applyGravity, checkCollision } from "./Physics";
import { createPipe, updatePipes } from "./PipeSystem";

export function updateGame(
    state: GameState,
    canvas: HTMLCanvasElement
) {
    state.frames++;

    applyGravity(state.bird, 0.4);

    if (state.frames % 120 === 0) {
        state.pipes.push(createPipe(canvas.height));
    }

    state.pipes = updatePipes(state.pipes);

    if (checkCollision(state.bird, state.pipes, canvas)) {
        state.isGameOver = true;
    }
}