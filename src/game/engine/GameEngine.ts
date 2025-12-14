import type { GameState } from "../state/GameState";
import { updateGame } from "../systems/UpdateGame";
import { applyJump } from "../systems/Physics";
import { renderGame } from "../systems/RenderSystem";

export function startGame(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state: GameState = {
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
    }

    window.addEventListener("keydown", (event) => {
        if (event.code === "Space" && !state.isGameOver) {
            applyJump(state.bird, -8);
        }
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