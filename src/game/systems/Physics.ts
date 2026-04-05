import { GRAVITY } from "../config/Constants";
import type { Bird } from "../entities/Bird";
import type { Pipe } from "../entities/Pipe";

export function applyGravity(bird: Bird, dt: number) {
    bird.velocity += GRAVITY * dt;
    bird.y += bird.velocity * dt;
}

export function applyJump(bird: Bird, jumpForce: number) {
    bird.velocity = jumpForce;
}

export function checkBoundaryCollision(
    bird: Bird,
    canvas: HTMLCanvasElement
): boolean {
    const birdTop = bird.y + bird.hitboxOffsetY;
    const birdBottom = birdTop + bird.hitboxHeight;

    return birdBottom >= canvas.height || birdTop <= 0;
}

export function checkPipeCollision(
    bird: Bird,
    pipes: Pipe[],
): Pipe | null {
    const birdLeft = bird.x + bird.hitboxOffsetX;
    const birdRight = birdLeft + bird.hitboxWidth;
    const birdTop = bird.y + bird.hitboxOffsetY;
    const birdBottom = birdTop + bird.hitboxHeight;

    for (const pipe of pipes) {
        const overlapX = birdRight > pipe.x && birdLeft < pipe.x + pipe.width;

        if (overlapX) {
            const hitTop = birdTop < pipe.gapTop;
            const hitBottom = birdBottom > pipe.gapBottom;

            if (hitTop || hitBottom) return pipe;
        }
    }

    return null;
}
