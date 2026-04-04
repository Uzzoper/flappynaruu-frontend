import type { GameState } from "../state/GameState";
import { drawPipes } from "./PipeRenderer";
import { drawBackground } from "./BackgroundRenderer";
import { drawBird } from "./BirdRenderer";
import { drawHUD, drawHint } from "./HUDRenderer";
import { drawGameOver } from "./GameOverRenderer";
import { drawTutorial } from "./TutorialRenderer";
import { drawBroccolis } from "./BroccoliRenderer";
import { drawShield } from "./ShieldRenderer";

export function renderGame(ctx: CanvasRenderingContext2D, state: GameState, canvas: HTMLCanvasElement) {
    drawBackground(ctx);

    if (!ctx.canvas) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawPipes(ctx, state.pipes, canvas);

    drawBroccolis(ctx, state.broccolis);

    drawBird(ctx, state.bird);

    if (state.shieldActive) {
        drawShield(ctx, state.bird);
    }

    drawHUD(ctx, state.score, state.highScore, state.aura);

    drawHint(ctx, state.activeHint);

    if (state.isGameOver) {
        drawGameOver(ctx, canvas, state.canRestart);
    } else if (state.tutorialState !== 'none') {
        drawTutorial(ctx, canvas, state.tutorialState);
    }
}
