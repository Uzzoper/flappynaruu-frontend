import type { Bird } from "../entities/Bird";
import type { Broccoli } from "../entities/Broccoli";
import type { Pipe } from "../entities/Pipe";
import { getScaledBroccoliDimensions } from "./BroccoliSprites";

function isPositionSafe(
    x: number,
    y: number,
    width: number,
    height: number,
    pipes: Pipe[]
): boolean {
    const brocLeft = x;
    const brocRight = x + width;
    const brocTop = y;
    const brocBottom = y + height;

    for (const pipe of pipes) {
        const overlapX = brocRight > pipe.x && brocLeft < pipe.x + pipe.width;

        if (overlapX) {
            const hitsTopPipe = brocTop < pipe.gapTop;
            const hitsBottomPipe = brocBottom > pipe.gapBottom;

            if (hitsTopPipe || hitsBottomPipe) return false;
        }
    }

    return true;
}

export function createBroccoli(
    canvasHeight: number,
    canvasWidth: number,
    pipes: Pipe[]
): Broccoli | null {
    const dims = getScaledBroccoliDimensions();

    const onScreenPipes = pipes.filter(p => p.x > 0 && p.x < canvasWidth);

    for (let i = 0; i < onScreenPipes.length - 1; i++) {
        const pipe1 = onScreenPipes[i];
        const pipe2 = onScreenPipes[i + 1];

        const midpointX = (pipe1.x + pipe1.width + pipe2.x) / 2;
        const x = midpointX - dims.width / 2;
        const gapCenter1 = (pipe1.gapTop + pipe1.gapBottom) / 2;
        const gapCenter2 = (pipe2.gapTop + pipe2.gapBottom) / 2;
        const y = (gapCenter1 + gapCenter2) / 2 - dims.height / 2;

        if (isPositionSafe(x, y, dims.width, dims.height, pipes)) {
            return {
                x,
                y,
                width: dims.width,
                height: dims.height,
                isCollected: false,
            };
        }
    }

    const candidateYs = [
        canvasHeight / 2 - dims.height / 2,
        canvasHeight * 0.35,
        canvasHeight * 0.65,
        canvasHeight * 0.25,
        canvasHeight * 0.75,
        canvasHeight * 0.45,
        canvasHeight * 0.55,
    ];

    for (const y of candidateYs) {
        if (isPositionSafe(canvasWidth - dims.width, y, dims.width, dims.height, pipes)) {
            return {
                x: canvasWidth - dims.width,
                y,
                width: dims.width,
                height: dims.height,
                isCollected: false,
            };
        }
    }

    return null;
}

export function updateBroccolis(
    broccolis: Broccoli[],
    speed: number
): Broccoli[] {
    for (const broccoli of broccolis) {
        broccoli.x -= speed;
    }

    return broccolis.filter(b => b.x + b.width > 0 && !b.isCollected);
}

export function checkBroccoliCollision(
    bird: Bird,
    broccolis: Broccoli[]
): Broccoli[] {
    const collected: Broccoli[] = [];

    const birdLeft = bird.x + bird.hitboxOffsetX;
    const birdRight = birdLeft + bird.hitboxWidth;
    const birdTop = bird.y + bird.hitboxOffsetY;
    const birdBottom = birdTop + bird.hitboxHeight;

    for (const broccoli of broccolis) {
        if (broccoli.isCollected) continue;

        const brocLeft = broccoli.x;
        const brocRight = broccoli.x + broccoli.width;
        const brocTop = broccoli.y;
        const brocBottom = broccoli.y + broccoli.height;

        const overlapX = birdRight > brocLeft && birdLeft < brocRight;
        const overlapY = birdBottom > brocTop && birdTop < brocBottom;

        if (overlapX && overlapY) {
            broccoli.isCollected = true;
            collected.push(broccoli);
        }
    }

    return collected;
}
