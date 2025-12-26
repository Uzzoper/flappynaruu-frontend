import { createInitialState } from "../state/CreateInitialState";
import type { GameState } from "../state/GameState";
import { applyJump } from "../systems/Physics";
import { playJumpSound, unlockAudio } from "./AudioSystem";

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
        playJumpSound();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            handleJump();
        }
    };

    const handlePointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return;
        event.preventDefault();
        handleJump();
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("pointerdown", handlePointerDown);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
        canvas.removeEventListener("pointerdown", handlePointerDown);
    };
}