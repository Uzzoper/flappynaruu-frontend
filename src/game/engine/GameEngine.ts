import type { GameState } from "../state/GameState";
import { updateGame } from "../systems/UpdateGame";
import { renderGame } from "../render/RenderGame";
import { createInitialState } from "../state/CreateInitialState";
import { loadBackground, resizeBackground } from "../render/BackgroundRenderer";
import { setupInput } from "../systems/InputSystem";
import { loadAudioAssets } from "../systems/AudioSystem";
import { loadBirdSprites } from "../systems/BirdSprites";
import { loadBroccoliSprites } from "../systems/BroccoliSprites";
import { loadMinecraftFont } from "../render/HUDRenderer";
import { MAX_DELTA_TIME } from "../config/Constants";

export async function startGame(
    canvas: HTMLCanvasElement,
    onStateChange?: (state: GameState) => void
) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    await Promise.all([
        loadBackground(),
        loadBirdSprites(),
        loadBroccoliSprites(),
        loadAudioAssets(),
        loadMinecraftFont()
    ]);

    resizeBackground(canvas.width, canvas.height);

    let state: GameState = createInitialState(canvas);
    let animationId: number;
    let lastLeaderboardStatus = state.leaderboardStatus;

    const cleanupInput = setupInput(
        canvas,
        () => state,
        (newState) => (state = newState)
    );

    let lastTime = performance.now();

    const loop = (time: number) => {
        const rawDt = (time - lastTime) / (1000 / 60);
        lastTime = time;
        
        const dt = Math.max(0, Math.min(rawDt, MAX_DELTA_TIME));

        if (!state.isGameOver) {
            updateGame(state, canvas, dt);
        }

        renderGame(ctx, state, canvas);

        if (state.leaderboardStatus !== lastLeaderboardStatus) {
            lastLeaderboardStatus = state.leaderboardStatus;
            if (onStateChange) onStateChange({ ...state });
        }

        animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame((time) => {
        lastTime = time;
        loop(time);
    });

    return {
        stop: () => {
            cancelAnimationFrame(animationId);
            if (cleanupInput) cleanupInput();
        },
        reset: () => {
            state = createInitialState(canvas);
            lastTime = performance.now();
        }
    };
}