import bgSrc from "../../assets/image/background/bg.png";

let backgroundImg: HTMLImageElement | null = null;

export function loadBackground() {
    if (backgroundImg) return;

    const img = new Image();
    img.src = bgSrc;
    backgroundImg = img;
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