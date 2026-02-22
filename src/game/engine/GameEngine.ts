import type { GameState } from "../state/GameState";
import { updateGame } from "../systems/UpdateGame";
import { renderGame } from "../render/RenderGame";
import { createInitialState } from "../state/CreateInitialState";
import { loadBackground } from "../render/BackgroundRenderer";
import { setupInput } from "../systems/InputSystem";
import { loadAudioAssets } from "../systems/AudioSystem";
import { loadBirdSprites } from "../systems/BirdSprites";
import { loadMinecraftFont } from "../render/HUDRenderer";

export async function startGame(
    canvas: HTMLCanvasElement,
    onStateChange?: (state: GameState) => void
) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    await Promise.all([
        loadBackground(),
        loadBirdSprites(),
        loadAudioAssets(),
        loadMinecraftFont()
    ]);

    let state: GameState = createInitialState(canvas);
    let animationId: number;
    let lastLeaderboardStatus = state.leaderboardStatus;

    const cleanupInput = setupInput(
        canvas,
        () => state,
        (newState) => (state = newState)
    );

    const loop = () => {
        if (!state.isGameOver) {
            updateGame(state, canvas);
        }

        renderGame(ctx, state, canvas);

        if (state.leaderboardStatus !== lastLeaderboardStatus) {
            lastLeaderboardStatus = state.leaderboardStatus;
            if (onStateChange) onStateChange({ ...state });
        }

        animationId = requestAnimationFrame(loop);
    };

    loop();

    return {
        stop: () => {
            cancelAnimationFrame(animationId);
            if (cleanupInput) cleanupInput();
        },
        reset: () => {
            state = createInitialState(canvas);
        }
    };
}