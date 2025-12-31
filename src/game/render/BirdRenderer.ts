import { getBirdSprite } from "../systems/BirdSprites";
import type { Bird } from "../entities/Bird";

export function drawBird(ctx: CanvasRenderingContext2D, bird: Bird) {

    const sprite = getBirdSprite(bird.frameIndex);

    if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        ctx.drawImage(
            sprite,
            bird.x,
            bird.y,
            bird.width,
            bird.height
        );
    }
}