import type { GameState } from "../state/GameState";
import { updateGame } from "../systems/UpdateGame";
import { renderGame } from "../render/RenderGame";
import { createInitialState } from "../state/CreateInitialState";
import { loadBackground } from "../render/BackgroundRenderer";
import { setupInput } from "../systems/InputSystem";
import { loadAudioAssets } from "../systems/AudioSystem";
import { loadBirdSprites } from "../systems/BirdSprites";

export function startGame(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    loadBackground();
    loadBirdSprites();
    loadAudioAssets();

    let state: GameState = createInitialState(canvas);
    let animationId: number;

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

        animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
        cancelAnimationFrame(animationId);
        if (cleanupInput) cleanupInput();
    };
}