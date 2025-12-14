import type { GameState } from "./GameState";

export function createInitialState(
    canvas: HTMLCanvasElement
): GameState {
    return {
        bird: {
            x: 50,
            y: canvas.height / 2,
            width: 30,
            height: 30,
            velocity: 0,
        },
        pipes: [],
        frames: 0,
        isGameOver: false,
        score: 0,
        canRestart: false,
    };
}