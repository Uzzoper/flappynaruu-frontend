import type { GameState } from "../state/GameState";
import { applyGravity } from "./Physics";
import { getDifficulty } from "./DifficultySystem";
import { createPipe, updatePipes } from "./PipeSystem";
import { checkCollision } from "./Physics";
import { playGameOverSound } from "./AudioSystem";
import { saveHighScore } from "../state/HighScore";
import { updateScore } from "./ScoreSystem";

export function updateGame(
    state: GameState,
    canvas: HTMLCanvasElement
) {
    if (state.isGameOver) return;

    state.frames++;

    applyGravity(state.bird);
    const difficulty = getDifficulty(state.score);

    state.pipes = updatePipes(state.pipes, difficulty.pipeSpeed);

    if (state.frames % 120 === 0) {
        state.pipes.push(createPipe(canvas.height, canvas.width, difficulty.gapSize));
    }

    if (checkCollision(state.bird, state.pipes, canvas)) {

        state.isGameOver = true;

        playGameOverSound();

        if (state.score > state.highScore) {
            state.highScore = state.score;
            saveHighScore(state.score);
        }

        setTimeout(() => {
            state.canRestart = true;
        }, 1000);

        return;
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