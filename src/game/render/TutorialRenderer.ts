export function drawTutorial(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, tutorialState: 'start' | 'playing') {
    ctx.save();
    ctx.font = "24px 'Minecraft', 'Press Start 2P', monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const text = tutorialState === 'start'
        ? "Toque para começar"
        : "Clique várias vezes para Naruu pular";
    const x = canvas.width / 2;
    const y = canvas.height / 2 + 80;

    const maxWidth = canvas.width * 0.9;
    const words = text.split(' ');
    let line = '';
    const lineHeight = 30;
    const currentY = y;

    if (canvas.width < 400) {
        ctx.font = "16px 'Minecraft', 'Press Start 2P', monospace";
    }
    const lines = [];
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

    lines.forEach((l, i) => {
        ctx.fillText(l, x, currentY + (i * lineHeight));
    });

    ctx.restore();
}
