import type { Pipe } from "../entities/Pipe"

export function createPipe(
    canvasHeight: number,
    canvasWidth: number,
    gapSize: number
): Pipe {
    const gapPosition = Math.random() * (canvasHeight - gapSize - 40) + 20;

    return {
        x: canvasWidth,
        width: 60,
        gapTop: gapPosition,
        gapBottom: gapPosition + gapSize,
        isPassed: false,
    };
}

export function updatePipes(
    pipes: Pipe[],
    speed: number
) {
    for (const pipe of pipes) {
        pipe.x -= speed;
    }

    return pipes.filter(pipe => pipe.x + pipe.width > 0)
}

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