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
    if (bird.y + bird.height >= canvas.height) {
        return true;
    }

    if (bird.y <= 0) {
        return true;
    }

    for (const pipe of pipes) {
        const hitPipeX = bird.x + bird.width > pipe.x &&
            bird.x < pipe.x + pipe.width;


        const hitTopPipe = bird.y < pipe.gapTop;

        const hitBottomPipe = bird.y + bird.height > pipe.gapBottom;

        if (hitPipeX && (hitTopPipe || hitBottomPipe)) {
            return true;
        }
    }
    
    return false;
}