import bird0 from "../../assets/image/bird/bird_0.png";
import bird1 from "../../assets/image/bird/bird_1.png";

const birdSprites: HTMLImageElement[] = [];

export function loadBirdSprites() {
    if (birdSprites.length > 0) return birdSprites;

    const sources = [bird0, bird1];

    for (const src of sources) {
        const img = new Image();
        img.src = src;
        birdSprites.push(img);
    }

    return birdSprites;
}

export function getBirdSprite(frameIndex: number) {
    return birdSprites[frameIndex % birdSprites.length];
}