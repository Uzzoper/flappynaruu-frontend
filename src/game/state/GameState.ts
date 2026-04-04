import type { Bird } from "../entities/Bird";
import type { Pipe } from "../entities/Pipe";
import type { Broccoli } from "../entities/Broccoli";

export interface GameState {
    bird: Bird;
    pipes: Pipe[];
    broccolis: Broccoli[];
    frames: number;
    isGameOver: boolean;
    score: number;
    canRestart: boolean;
    highScore: number;
    isHighScoreBeaten: boolean;
    isTopScore: boolean;
    leaderboardStatus: 'idle' | 'checking' | 'input' | 'saving' | 'saved' | 'failed' | 'postgame';
    connectionError: boolean;
    tutorialState: 'start' | 'playing' | 'none';
    aura: number;
    shieldActive: boolean;
    ignoredPipe: Pipe | null;
    activeHint: string | null;
    hintTimer: number;
    broccoliHintShown: boolean;
}
