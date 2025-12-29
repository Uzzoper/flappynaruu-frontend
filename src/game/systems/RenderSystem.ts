import type { GameState } from "../state/GameState";
import { drawPipes } from "./PipeSystem";
import { drawBackground } from "./BackgroundRender";
import { getBirdSprite } from "./BirdSprites";

export function renderGame(
    ctx: CanvasRenderingContext2D,
    state: GameState,
    canvas: HTMLCanvasElement
) {
    drawBackground(ctx);

    if (!ctx.canvas) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawPipes(ctx, state.pipes, canvas);

    const birdSprite = getBirdSprite(state.bird.frameIndex);

    if (birdSprite && birdSprite.complete && birdSprite.naturalWidth > 0) {
        ctx.drawImage(
            birdSprite,
            state.bird.x,
            state.bird.y,
            state.bird.width,
            state.bird.height
        );
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";

    ctx.fillText(`Score: ${state.score}`, 20, 30);
    ctx.fillText(`Highscore: ${state.highScore}`, 20, 55);

    if (state.isGameOver) {
        drawGameOver(ctx, canvas, state.canRestart);
    }
}

const drawGameOver = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canRestart: boolean
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

    if (canRestart) {
        ctx.font = "16px Arial";
        ctx.fillText(
            "Clique para jogar novamente",
            canvas.width / 2,
            canvas.height / 2 + 40
        );
    }
}