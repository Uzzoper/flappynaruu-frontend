import bgSrc from "../../assets/image/background/bg.png";

let backgroundImg: HTMLImageElement | null = null;
let offscreenCanvas: HTMLCanvasElement | null = null;
let offscreenCtx: CanvasRenderingContext2D | null = null;

function renderToOffscreen(width: number, height: number) {
    if (!backgroundImg || !backgroundImg.complete) return;

    if (!offscreenCanvas) {
        offscreenCanvas = document.createElement("canvas");
        offscreenCtx = offscreenCanvas.getContext("2d");
    }

    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    offscreenCtx?.drawImage(backgroundImg, 0, 0, width, height);
}

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

export function resizeBackground(width: number, height: number) {
    renderToOffscreen(width, height);
}

export function drawBackground(ctx: CanvasRenderingContext2D) {
    if (offscreenCanvas) {
        ctx.drawImage(offscreenCanvas, 0, 0);
        return;
    }

    if (!backgroundImg || !backgroundImg.complete) return;
    ctx.drawImage(backgroundImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}