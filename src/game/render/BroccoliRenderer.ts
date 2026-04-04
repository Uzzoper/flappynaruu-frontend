import type { Broccoli } from "../entities/Broccoli";
import { getBroccoliSprite } from "../systems/BroccoliSprites";

export function drawBroccolis(ctx: CanvasRenderingContext2D, broccolis: Broccoli[]) {
    const sprite = getBroccoliSprite();
    if (!sprite) return;

    for (const broccoli of broccolis) {
        if (broccoli.isCollected) continue;

        ctx.drawImage(
            sprite,
            broccoli.x,
            broccoli.y,
            broccoli.width,
            broccoli.height
        );
    }
}
