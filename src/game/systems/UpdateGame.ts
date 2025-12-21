import type { GameState } from "../state/GameState";
import { saveHighScore } from "../state/HighScore";
import { getDifficulty } from "./DifficultySystem";
import { applyGravity, checkCollision } from "./Physics";
import { createPipe, updatePipes } from "./PipeSystem";
import { updateScore } from "./ScoreSystem";

export function updateGame(
    state: GameState,
    canvas: HTMLCanvasElement
) {
    state.frames++;

    applyGravity(state.bird);

    const difficulty = getDifficulty(state.score);

    if (state.frames % 120 === 0) {
        state.pipes.push(createPipe(canvas.height, canvas.width, difficulty.gapSize));
    }

    state.pipes = updatePipes(state.pipes, difficulty.pipeSpeed);

    if (checkCollision(state.bird, state.pipes, canvas)) {
        state.isGameOver = true;

        if (state.score > state.highScore) {
            state.highScore = state.score;
            saveHighScore(state.score);
        }

        setTimeout(() => {
            state.canRestart = true;
        }, 1000);
    }

    state.score += updateScore(state.bird, state.pipes);

    if (state.bird.velocity < 0) {
        state.bird.frameTimer++;

        if (state.bird.frameTimer >= 8) {
            state.bird.frameIndex = (state.bird.frameIndex + 1) % 2;
            state.bird.frameTimer = 0;
        }
    } else {
        state.bird.frameIndex = 0;
    }
}