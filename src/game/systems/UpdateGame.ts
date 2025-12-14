import type { GameState } from "../state/GameState";
import { applyGravity, checkCollision } from "./Physics";
import { createPipe, updatePipes } from "./PipeSystem";
import { updateScore } from "./ScoreSystem";

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

        setTimeout(() => {
            state.canRestart = true;
        }, 1000);
    }

    const gainedScore = updateScore(state.bird, state.pipes);
    state.score += gainedScore; 
}