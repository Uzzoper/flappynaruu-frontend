import { AURA_REQUIRED } from "../config/Constants";

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

export function drawHUD(ctx: CanvasRenderingContext2D, score: number, highScore: number, aura: number = 0) {
    const canvasWidth = ctx.canvas?.width ?? 400;

    ctx.fillStyle = "white";
    ctx.font = `24px ${FONT_STACK}`;
    ctx.textAlign = "left";

    ctx.fillText(`Score: ${score}`, 20, 35);
    ctx.fillText(`Highscore: ${highScore}`, 20, 65);

    if (aura > 0) {
        ctx.textAlign = "right";
        ctx.font = `20px ${FONT_STACK}`;
        
        let auraText = "";
        for (let i = 0; i < AURA_REQUIRED; i++) {
            auraText += i < aura ? "🥦" : "⬜";
        }
        
        ctx.fillText(auraText, canvasWidth - 20, 35);
    }
}

export function drawHint(ctx: CanvasRenderingContext2D, hint: string | null) {
    if (!hint) return;

    ctx.save();
    ctx.font = `20px ${FONT_STACK}`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const canvasWidth = ctx.canvas?.width ?? 400;
    const canvasHeight = ctx.canvas?.height ?? 600;

    if (canvasWidth < 400) {
        ctx.font = `14px ${FONT_STACK}`;
    }

    const maxWidth = canvasWidth * 0.9;
    const words = hint.split(' ');
    let line = '';
    const lineHeight = 30;

    const lines: string[] = [];
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    const lineCount = lines.length;
    const startY = canvasHeight - 40 - (lineCount - 1) * lineHeight;

    lines.forEach((l, i) => {
        ctx.fillText(l, canvasWidth / 2, startY + (i * lineHeight));
    });

    ctx.restore();
}
