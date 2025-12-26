import gameOverSrc from "../../assets/audio/game_over.wav";
import jumpSrc from "../../assets/audio/jump.wav";
import highScoreSrc from "../../assets/audio/high-score.wav";

let gameOverSound: HTMLAudioElement | null = null;
let jumpSound: HTMLAudioElement | null = null;
let highScoreSound: HTMLAudioElement | null = null;
let audioUnlocked = false;

export function loadAudioAssets() {
    if (gameOverSound && jumpSound && highScoreSound) return;

    jumpSound = new Audio(jumpSrc);
    jumpSound.volume = 0.2;

    highScoreSound = new Audio(highScoreSrc);
    highScoreSound.volume = 0.3;

    gameOverSound = new Audio(gameOverSrc);
    gameOverSound.volume = 0.5;
}

export function unlockAudio() {
    if (audioUnlocked) return;

    if (!gameOverSound || !jumpSound || !highScoreSound) loadAudioAssets();

    jumpSound?.play()
        .then(() => {
            audioUnlocked = true;
        })
        .catch((err) => {
            console.log("Audio unlock failed", err);
            audioUnlocked = false;
        });
}
export function playJumpSound() {
    if (!audioUnlocked || !jumpSound) return;

    jumpSound.currentTime = 0;
    jumpSound.play().catch(() => { });
}

export function playHighScoreSound() {
    if (!audioUnlocked || !highScoreSound) return;

    highScoreSound.currentTime = 0;
    highScoreSound.play().catch(() => { });
}

export function playGameOverSound() {
    if (!audioUnlocked || !gameOverSound) return;

    gameOverSound.currentTime = 0;
    gameOverSound.play().catch(() => { });
}