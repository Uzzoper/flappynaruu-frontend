import type { GameState } from "../state/GameState";
import { drawPipes } from "./PipeRenderer";
import { drawBackground } from "./BackgroundRenderer";
import { drawBird } from "./BirdRenderer";
import { drawHUD } from "./HUDRenderer";
import { drawGameOver } from "./GameOverRenderer";
import { drawTutorial } from "./TutorialRenderer";

export function renderGame(ctx: CanvasRenderingContext2D, state: GameState, canvas: HTMLCanvasElement) {
    drawBackground(ctx);

    if (!ctx.canvas) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawPipes(ctx, state.pipes, canvas);

    drawBird(ctx, state.bird);

    drawHUD(ctx, state.score, state.highScore);

    if (state.isGameOver) {
        drawGameOver(ctx, canvas, state.canRestart);
    } else if (state.showTutorial) {
        drawTutorial(ctx, canvas);
    }
}