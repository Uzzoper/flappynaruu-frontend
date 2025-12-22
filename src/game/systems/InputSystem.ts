import { createInitialState } from "../state/CreateInitialState";
import type { GameState } from "../state/GameState";
import { applyJump } from "../systems/Physics";
import { unlockAudio } from "./AudioSystem";

export function setupInput(
    canvas: HTMLCanvasElement,
    getState: () => GameState,
    setState: (state: GameState) => void
) {
    const handleJump = () => {
        unlockAudio();

        const state = getState();

        if (state.isGameOver) {
            if (state.canRestart) {
                setState(createInitialState(canvas));
            }
            return;
        }

        applyJump(state.bird, -8);
    };

    window.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            handleJump();
        }
    });

    canvas.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        handleJump();
    });
}