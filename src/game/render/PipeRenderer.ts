import type { Pipe } from "../entities/Pipe";

let cachedGradient: CanvasGradient | null = null;

export function drawPipes(
    ctx: CanvasRenderingContext2D,
    pipes: Pipe[],
    canvas: HTMLCanvasElement
) {
    if (!cachedGradient) {
        cachedGradient = ctx.createLinearGradient(0, 0, 60, 0);
        cachedGradient.addColorStop(0, "#1a1a1a");
        cachedGradient.addColorStop(0.5, "#3a3a3a");
        cachedGradient.addColorStop(1, "#1a1a1a");
    }

    ctx.save();
    ctx.fillStyle = cachedGradient;

    for (const pipe of pipes) {
        ctx.setTransform(1, 0, 0, 1, pipe.x, 0);
        ctx.fillRect(0, 0, pipe.width, pipe.gapTop);
        ctx.fillRect(0, pipe.gapBottom, pipe.width, canvas.height - pipe.gapBottom);
    }

    ctx.restore();
}