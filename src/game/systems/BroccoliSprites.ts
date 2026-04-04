import broccoliImg from "../../assets/image/broccoli/broccoli.png";
import { BROCCOLI_TARGET_HEIGHT } from "../config/Constants";

let broccoliSprite: HTMLImageElement | null = null;

export async function loadBroccoliSprites(): Promise<void> {
    if (broccoliSprite) return;

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = broccoliImg;
        img.onload = () => {
            broccoliSprite = img;
            resolve();
        };
        img.onerror = () => reject(`Failed to load image: ${broccoliImg}`);
    });
}

export function getBroccoliSprite() {
    return broccoliSprite;
}

export function getBroccoliSpriteDimensions() {
    if (!broccoliSprite) return { width: 30, height: 30 };
    return { width: broccoliSprite.width, height: broccoliSprite.height };
}

export function getScaledBroccoliDimensions() {
    if (!broccoliSprite) return { width: 82, height: BROCCOLI_TARGET_HEIGHT };
    const aspectRatio = broccoliSprite.width / broccoliSprite.height;
    const height = BROCCOLI_TARGET_HEIGHT;
    const width = Math.round(height * aspectRatio);
    return { width, height };
}
