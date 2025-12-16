import type { Bird } from "../entities/Bird";
import type { Pipe } from "../entities/Pipe";

export function applyGravity(bird: Bird, gravity: number) {
    bird.velocity += gravity;
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

    const birdHitboxX = bird.x + bird.hitboxOffsetX;
    const birdHitboxY = bird.y + bird.hitboxOffsetY;
    const birdHitboxRight = birdHitboxX + bird.hitboxWidth;
    const birdHitboxBottom = birdHitboxY + bird.hitboxHeight;

    if (birdHitboxBottom >= canvas.height) return true;

    if (birdHitboxY <= 0) return true;

    for (const pipe of pipes) {
        const hitPipeX = birdHitboxRight > pipe.x && birdHitboxX < pipe.x + pipe.width;

        const hitTopPipe = birdHitboxY < pipe.gapTop;

        const hitBottomPipe = birdHitboxBottom > pipe.gapBottom;

        if (hitPipeX && (hitTopPipe || hitBottomPipe)) {
            return true;
        }
    }

    return false;
}