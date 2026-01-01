import gameOverSrc from "../../assets/audio/game_over.wav";
import jumpSrc from "../../assets/audio/jump.wav";
import highScoreSrc from "../../assets/audio/high-score.wav";
import bgmSrc from "../../assets/audio/background_track.mp3";

let bgm: HTMLAudioElement | null = null;
let gameOverSound: HTMLAudioElement | null = null;
let jumpSound: HTMLAudioElement | null = null;
let highScoreSound: HTMLAudioElement | null = null;
let audioUnlocked = false;

export async function loadAudioAssets(): Promise<void> {
    if (gameOverSound && jumpSound && highScoreSound) return;

    const waitForAudio = (audio: HTMLAudioElement) => {
        return new Promise<void>((resolve) => {
            audio.oncanplaythrough = () => resolve();
            audio.onerror = () => resolve();
        });
    };

    bgm = new Audio(bgmSrc);
    bgm.loop = true;
    bgm.volume = 0.06;

    jumpSound = new Audio(jumpSrc);
    jumpSound.volume = 0.2;

    highScoreSound = new Audio(highScoreSrc);
    highScoreSound.volume = 0.3;

    gameOverSound = new Audio(gameOverSrc);
    gameOverSound.volume = 0.4;

    await Promise.all([
        waitForAudio(bgm),
        waitForAudio(jumpSound),
        waitForAudio(highScoreSound),
        waitForAudio(gameOverSound)
    ]);
}

export function unlockAudio() {
    if (audioUnlocked) return;

    if (jumpSound) {
        jumpSound.play()
            .then(() => {
                audioUnlocked = true;
                playBGM();
            })
            .catch((err) => {
                console.log("Audio unlock failed", err);
            });
    }
}

export function playBGM() {
    if (!audioUnlocked || !bgm) return;
    bgm.play().catch(() => { });
}

export function stopBGM() {
    if (bgm) {
        bgm.pause();
        bgm.currentTime = 0;
    }
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