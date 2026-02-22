let fontLoaded = false;

const FONT_STACK = "'Minecraft', 'Press Start 2P', monospace";

export async function loadMinecraftFont(): Promise<void> {
    if (fontLoaded) return;

    try {
        await document.fonts.load('24px Minecraft');
        fontLoaded = true;
    } catch {
        console.warn('Failed to load Minecraft font, using fallback');
    }
}

export function drawHUD(ctx: CanvasRenderingContext2D, score: number, highScore: number) {
    ctx.fillStyle = "white";
    ctx.font = `24px ${FONT_STACK}`;
    ctx.textAlign = "left";

    ctx.fillText(`Score: ${score}`, 20, 35);
    ctx.fillText(`Highscore: ${highScore}`, 20, 65);
}

