import type { GameState } from "../state/GameState";
import { updateGame } from "../systems/UpdateGame";
import { drawPipes } from "../systems/PipeSystem";
import { applyJump } from "../systems/Physics";

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

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawPipes(ctx, state.pipes, canvas);

        ctx.fillStyle = "yellow";
        ctx.fillRect(
            state.bird.x,
            state.bird.y,
            state.bird.width,
            state.bird.height
        );

        if (state.isGameOver) {
            ctx.fillStyle = "white";
            ctx.font = "32px Arial";
            ctx.fillText("Game Over", 80, canvas.height / 2);
            return;
        }
        requestAnimationFrame(loop);
    };

    loop();
}