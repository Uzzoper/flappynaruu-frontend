import type { GameState } from "../state/GameState";
import { drawPipes } from "./PipeSystem";

export function renderGame(
    ctx: CanvasRenderingContext2D,
    state: GameState,
    canvas: HTMLCanvasElement
) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    drawPipes(ctx, state.pipes, canvas);

    ctx.fillStyle = "yellow";
    ctx.fillRect(
        state.bird.x,
        state.bird.y,
        state.bird.width,
        state.bird.height
    );

    if (state.isGameOver) {
        drawGameOver(ctx, canvas);
    }
}

    const drawGameOver = (
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ) => {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "32px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            "Game Over",
            canvas.width / 2,
            canvas.height / 2
        );

        ctx.font = "16px Arial";
        ctx.fillText(
            "Aperte ESPAÇO para jogar novamente",
            canvas.width / 2,
            canvas.height / 2 + 40
        );
    }