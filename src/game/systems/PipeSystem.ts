import type { Pipe } from "../entities/Pipe"

export function createPipe(canvasHeight: number): Pipe {
    const gapSize = 140;
    const gapPosition = Math.random() * (canvasHeight - gapSize - 40) + 20;


    return {
        x:400,
        width: 60,
        gapTop: gapPosition,
        gapBottom: gapPosition + gapSize,
        isPassed: false,
    };
}

export function updatePipes(pipes: Pipe[]) {
    for (const pipe of pipes) {
        pipe.x -= 2;
    }

    return pipes.filter(pipe => pipe.x + pipe.width > 0)
}

export function drawPipes(
    ctx: CanvasRenderingContext2D,
    pipes: Pipe[],
    canvas: HTMLCanvasElement
) {
    ctx.fillStyle = "green";

    for (const pipe of pipes) {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapTop);

        ctx.fillRect(
            pipe.x,
            pipe.gapBottom,
            pipe.width,
            canvas.height - pipe.gapBottom
        );
    }
}