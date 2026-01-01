import bgSrc from "../../assets/image/background/bg.png";

let backgroundImg: HTMLImageElement | null = null;

export function loadBackground(): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = bgSrc;
        img.onload = () => {
            backgroundImg = img;
            resolve();
        };
    });
}

export function drawBackground(ctx: CanvasRenderingContext2D) {
    if (!backgroundImg || !backgroundImg.complete) return;

    ctx.drawImage(
        backgroundImg,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
    );
}