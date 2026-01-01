import bird0 from "../../assets/image/bird/bird_0.png";
import bird1 from "../../assets/image/bird/bird_1.png";

const birdSprites: HTMLImageElement[] = [];

export async function loadBirdSprites(): Promise<void> {
    if (birdSprites.length > 0) return;

    const sources = [bird0, bird1];

    const promises = sources.map(src => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image: ${src}`);
        });
    });

    const loadedImages = await Promise.all(promises);
    birdSprites.push(...loadedImages);
}

export function getBirdSprite(frameIndex: number) {
    return birdSprites[frameIndex % birdSprites.length];
}