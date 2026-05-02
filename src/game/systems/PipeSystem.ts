import type { Pipe } from "../entities/Pipe"
import { PIPE_SPAWN_INTERVAL } from "../config/Constants"

const INITIAL_PIPE_START = 0.7;
const MIN_WIDTH_FOR_INITIAL_PIPES = 768;

export function createInitialPipes(
    canvasHeight: number,
    canvasWidth: number,
    gapSize: number,
    pipeSpeed: number
): Pipe[] {
    if (canvasWidth < MIN_WIDTH_FOR_INITIAL_PIPES) return [];
    const spacing = pipeSpeed * PIPE_SPAWN_INTERVAL;
    const startX = canvasWidth * INITIAL_PIPE_START;
    const pipes: Pipe[] = [];

    for (let x = startX; x < canvasWidth; x += spacing) {
        const pipe = createPipe(canvasHeight, canvasWidth, gapSize);
        pipe.x = x;
        pipes.push(pipe);
    }

    return pipes;
}

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
    speed: number,
    dt: number
) {
    for (const pipe of pipes) {
        pipe.x -= speed * dt;
    }

    return pipes.filter(pipe => pipe.x + pipe.width > 0)
}