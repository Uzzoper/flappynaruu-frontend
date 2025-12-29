import { GRAVITY } from "../config/Constants";
import type { Bird } from "../entities/Bird";
import type { Pipe } from "../entities/Pipe";

export function applyGravity(bird: Bird) {
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;
}

export function applyJump(bird: Bird, jumpForce: number) {
    bird.velocity = jumpForce;
}

export function checkCollision(
    bird: Bird,
    pipes: Pipe[],
    canvas: HTMLCanvasElement
): boolean {

    const birdLeft = bird.x + bird.hitboxOffsetX;
    const birdRight = birdLeft + bird.hitboxWidth;
    const birdTop = bird.y + bird.hitboxOffsetY;
    const birdBottom = birdTop + bird.hitboxHeight;

    if (birdBottom >= canvas.height || birdTop <= 0) return true;

    for (const pipe of pipes) {

        const overlapX = birdRight > pipe.x && birdLeft < pipe.x + pipe.width;

        if (overlapX) {

            const hitTop = birdTop < pipe.gapTop;
            const hitBottom = birdBottom > pipe.gapBottom;

            if (hitTop || hitBottom) return true;
        }
    }

    return false;
}