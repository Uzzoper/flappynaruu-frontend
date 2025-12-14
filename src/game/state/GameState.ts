import type { Bird } from "../entities/Bird";
import type { Pipe } from "../entities/Pipe";

export interface GameState {
    bird: Bird;
    pipes: Pipe[];
    frames: number;
    isGameOver: boolean;
    score: number;
    canRestart: boolean;
}