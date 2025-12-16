const birdSprites: HTMLImageElement[] = [];

export function loadBirdSprites() {
    if (birdSprites.length > 0) return birdSprites;

    for (let i = 0; i < 2; i++) {
        const img = new Image();
        img.src = `/src/assets/bird/bird_${i}.png`
        birdSprites.push(img);
    }

    return birdSprites;
}

export function getBirdSprite(frameIndex: number) {
    return birdSprites[frameIndex % birdSprites.length];
}