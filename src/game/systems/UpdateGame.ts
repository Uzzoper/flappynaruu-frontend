import type { GameState } from "../state/GameState";
import { applyGravity, checkBoundaryCollision, checkPipeCollision } from "./Physics";
import { getDifficulty } from "./DifficultySystem";
import { createPipe, updatePipes } from "./PipeSystem";
import { playGameOverSound, playHighScoreSound } from "./AudioSystem";
import { saveHighScore } from "../state/HighScore";
import { updateScore } from "./ScoreSystem";
import { updateBirdAnimation } from "./BirdSystem";
import { checkIfTopScore } from "../services/LeaderboardService";
import { createBroccoli, updateBroccolis, checkBroccoliCollision } from "./BroccoliSystem";
import {
    BROCCOLI_SPAWN_INTERVAL,
    AURA_REQUIRED,
    PIPE_SPAWN_INTERVAL,
    HINT_DURATION_SECONDS,
} from "../config/Constants";

function handleGameOver(state: GameState) {
    state.isGameOver = true;

    playGameOverSound();

    if (state.score > state.highScore) {
        state.highScore = state.score;
        saveHighScore(state.score);
    }

    state.leaderboardStatus = 'postgame';
    setTimeout(() => {
        state.canRestart = true;
    }, 1000);

    if (state.score > 0) {
        checkIfTopScore(state.score).then(isTop => {
            if (isTop) {
                state.isTopScore = true;
                state.leaderboardStatus = 'input';
                state.canRestart = false;
            }
        }).catch(() => {});
    }
}

export function updateGame(
    state: GameState,
    canvas: HTMLCanvasElement,
    dt: number
) {
    if (state.isGameOver) return;

    if (state.tutorialState === 'start') {
        state.elapsedTime += dt;
        updateBirdAnimation(state.bird, dt);
        state.bird.y += Math.sin(state.elapsedTime * 0.1) * 1.5;
        return;
    }

    if (state.tutorialState === 'playing' && state.score > 0) {
        state.tutorialState = 'none';
    }

    state.elapsedTime += dt;

    applyGravity(state.bird, dt);

    updateBirdAnimation(state.bird, dt);

    const difficulty = getDifficulty(state.score);

    state.pipes = updatePipes(state.pipes, difficulty.pipeSpeed, dt);

    state.pipeSpawnTimer += dt;
    if (state.pipeSpawnTimer >= PIPE_SPAWN_INTERVAL) {
        state.pipeSpawnTimer = 0;
        state.pipes.push(createPipe(canvas.height, canvas.width, difficulty.gapSize));
    }

    state.broccoliSpawnTimer += dt;
    if (state.broccoliSpawnTimer >= BROCCOLI_SPAWN_INTERVAL) {
        state.broccoliSpawnTimer = 0;
        const broccoli = createBroccoli(canvas.height, canvas.width, state.pipes);
        if (broccoli) {
            state.broccolis.push(broccoli);
        }
    }

    if (state.broccolis.length > 0 && !state.broccoliHintShown) {
        state.broccoliHintShown = true;
        state.activeHint = "Colete brócolis para farmar aura!";
        state.hintTimerRemaining = HINT_DURATION_SECONDS;
    }

    state.broccolis = updateBroccolis(state.broccolis, difficulty.pipeSpeed, dt);

    const collectedBroccolis = checkBroccoliCollision(state.bird, state.broccolis);
    if (collectedBroccolis.length > 0) {
        state.aura += collectedBroccolis.length;

        if (state.aura >= AURA_REQUIRED) {
            state.aura = 0;
            state.shieldActive = true;
            state.activeHint = "Você farmou aura! A aura de Naruu o protege contra 1 colisão com barras";
            state.hintTimerRemaining = HINT_DURATION_SECONDS;
        }
    }

    if (checkBoundaryCollision(state.bird, canvas)) {
        handleGameOver(state);
        return;
    }

    const collidingPipe = checkPipeCollision(state.bird, state.pipes);

    if (collidingPipe && collidingPipe !== state.ignoredPipe) {
        if (state.shieldActive) {
            state.shieldActive = false;
            state.ignoredPipe = collidingPipe;
        } else {
            handleGameOver(state);
            return;
        }
    }

    if (state.ignoredPipe && !state.pipes.includes(state.ignoredPipe)) {
        state.ignoredPipe = null;
    }

    if (state.hintTimerRemaining > 0) {
        state.hintTimerRemaining -= dt / 60;
        if (state.hintTimerRemaining <= 0) {
            state.activeHint = null;
        }
    }

    const pointsGained = updateScore(state.bird, state.pipes);
    if (pointsGained > 0) {
        state.score += pointsGained;

        if (state.score > state.highScore && state.highScore > 0 && !state.isHighScoreBeaten) {
            playHighScoreSound();
            state.isHighScoreBeaten = true;
        }
    }
}
