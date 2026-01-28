import type { Pipe } from "../entities/Pipe"

export function createPipe(
    canvasHeight: number,
    canvasWidth: number,
    gapSize: number
): Pipe {
    const minMargin = 80;
    const gapPosition = Math.random() * (canvasHeight - gapSize - minMargin * 2) + minMargin;

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