import type { Bird } from "../entities/Bird";
import type { Pipe } from "../entities/Pipe";
import { applyGravity, applyJump } from "../systems/Physics";
import { createPipe, updatePipes, drawPipes } from "../systems/PipeSystem";

export function startGame(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pipes: Pipe[] = [];
    let frames = 0;

    const bird: Bird = {
        x: 50,
        y: canvas.height / 2,
        width: 30,
        height: 30,
        velocity: 0,
    };

    const gravity = 0.4;
    const jumpForce = -8;

    window.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            applyJump(bird, jumpForce);
        }
    });

    const update = () => {

        frames++;

        if (frames % 120 === 0) {
            pipes.push(createPipe(canvas.height));
        }

        pipes = updatePipes(pipes);

        applyGravity(bird, gravity);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "yellow";
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

        drawPipes(ctx, pipes, canvas);

        requestAnimationFrame(update);
    }

    update();
}