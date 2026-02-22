export function drawGameOver(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, canRestart: boolean) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "32px 'Minecraft', 'Press Start 2P', monospace";
    ctx.textAlign = "center";

    ctx.fillText(
        "Game Over",
        canvas.width / 2,
        canvas.height / 2
    );

    if (canRestart) {
        ctx.font = "16px 'Minecraft', 'Press Start 2P', monospace";
        ctx.fillText(
            "Clique para jogar novamente",
            canvas.width / 2,
            canvas.height / 2 + 40
        );
    }

}