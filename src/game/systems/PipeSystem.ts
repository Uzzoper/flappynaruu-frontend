import type { Pipe } from "../entities/Pipe"

export function createPipe(canvasHeight: number): Pipe {
    const gapSize = 140;
    const gapPosition = Math.random() * (canvasHeight - gapSize - 40) + 20;


    return {
        x:400,
        width: 60,
        gapTop: gapPosition,
        gapBottom: gapPosition + gapSize,
    };
}