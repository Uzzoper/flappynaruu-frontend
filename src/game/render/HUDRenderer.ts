export function drawHUD(ctx: CanvasRenderingContext2D, score: number, highScore: number) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";

    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillText(`Highscore: ${highScore}`, 20, 55);
}