import type { Bird } from "../entities/Bird";

export function applyGravity(bird: Bird, gravity: number) {
    bird.velocity += gravity;
    bird.y += bird.velocity;
}

export function applyJump(bird: Bird, jumpForce: number) {
    bird.velocity = jumpForce;
}