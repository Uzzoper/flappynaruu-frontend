import type { GameState } from "./GameState";

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
        },
        pipes: [],
        frames: 0,
        isGameOver: false,
        score: 0,
        canRestart: false,
    };
}