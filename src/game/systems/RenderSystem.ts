import type { GameState } from "../state/GameState";
import { drawPipes } from "./PipeSystem";
import { getBirdSprite, loadBirdSprites } from "./BirdSprites";
import { drawBackground } from "./BackgroundRender";

export function renderGame(
    ctx: CanvasRenderingContext2D,
    state: GameState,
    canvas: HTMLCanvasElement
) {
    drawBackground(ctx);

    if(!ctx.canvas) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    loadBirdSprites();

    drawPipes(ctx, state.pipes, canvas);

    const birdSprite = getBirdSprite(state.bird.frameIndex);
    ctx.drawImage(
        birdSprite,
        state.bird.x,
        state.bird.y,
        state.bird.width,
        state.bird.height
    );

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";

    ctx.fillText(
        `Score: ${state.score}`,
        20,
        30
    );

    ctx.strokeStyle = "red";
    ctx.strokeRect(
        state.bird.x + state.bird.hitboxOffsetX,
        state.bird.y + state.bird.hitboxOffsetY,
        state.bird.hitboxWidth,
        state.bird.hitboxHeight
    );

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
            "Aperte ESPAÇO para jogar novamente",
            canvas.width / 2,
            canvas.height / 2 + 40
        );
    }
}