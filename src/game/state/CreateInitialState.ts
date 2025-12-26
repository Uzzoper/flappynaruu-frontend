import type { GameState } from "./GameState";
import { loadHighScore } from "./HighScore";

export function createInitialState(
    canvas: HTMLCanvasElement
): GameState {
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
        pipes: [],
        frames: 0,
        isGameOver: false,
        score: 0,
        canRestart: false,
        highScore: loadHighScore(),
    };
}