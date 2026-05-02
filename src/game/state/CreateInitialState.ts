import type { GameState } from "./GameState";
import { loadHighScore } from "./HighScore";
import { createInitialPipes } from "../systems/PipeSystem";
import { getDifficulty } from "../systems/DifficultySystem";

export function createInitialState(
    canvas: HTMLCanvasElement
): GameState {
    const difficulty = getDifficulty(0);

    const initialPipes = createInitialPipes(canvas.height, canvas.width, difficulty.gapSize, difficulty.pipeSpeed);
    const lastPipe = initialPipes[initialPipes.length - 1];
    const initialSpawnTimer = lastPipe
        ? (canvas.width - lastPipe.x) / difficulty.pipeSpeed
        : 0;

    return {
        bird: {
            x: 50,
            y: canvas.height / 2,
            width: 60,
            height: 60,
            velocity: 0,
            frameIndex: 0,
            frameTimer: 0,
            hitboxOffsetX: 18,
            hitboxOffsetY: 18,
            hitboxWidth: 26,
            hitboxHeight: 24,
        },
        pipes: initialPipes,
        broccolis: [],
        elapsedTime: 0,
        pipeSpawnTimer: initialSpawnTimer,
        broccoliSpawnTimer: 0,
        isGameOver: false,
        score: 0,
        canRestart: false,
        highScore: loadHighScore(),
        isHighScoreBeaten: false,
        isTopScore: false,
        leaderboardStatus: 'idle',
        connectionError: false,
        tutorialState: 'start',
        aura: 0,
        shieldActive: false,
        ignoredPipe: null,
        activeHint: null,
        hintTimerRemaining: 0,
        broccoliHintShown: false,
    };
}
