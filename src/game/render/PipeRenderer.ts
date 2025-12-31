import type { Pipe } from "../entities/Pipe";

export function drawPipes(
    ctx: CanvasRenderingContext2D,
    pipes: Pipe[],
    canvas: HTMLCanvasElement
) {
    for (const pipe of pipes) {

        const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipe.width, 0);
        gradient.addColorStop(0, "#1a1a1a");
        gradient.addColorStop(0.5, "#3a3a3a");
        gradient.addColorStop(1, "#1a1a1a");

        ctx.fillStyle = gradient;

        ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapTop);

        ctx.fillRect(
            pipe.x,
            pipe.gapBottom,
            pipe.width,
            canvas.height - pipe.gapBottom
        );
    }
}