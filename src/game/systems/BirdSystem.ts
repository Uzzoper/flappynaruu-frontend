import type { Bird } from '../entities/Bird';

export function updateBirdAnimation(bird: Bird) {
    if (bird.velocity < 0) {
        bird.frameTimer++;

        if (bird.frameTimer >= 8) {
            bird.frameIndex = (bird.frameIndex + 1) % 2;
            bird.frameTimer = 0;
        }
    } else {
        bird.frameIndex = 0;
    }
}