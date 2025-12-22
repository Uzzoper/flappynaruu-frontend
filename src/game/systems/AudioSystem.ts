import gameOverSrc from "../../assets/audio/game_over.wav";

let gameOverSound: HTMLAudioElement | null = null;
let audioUnlocked = false;

export function loadGameOverSound() {
    if (gameOverSound) return;

    const audio = new Audio(gameOverSrc);
    audio.volume = 0.5;
    audio.load();
    gameOverSound = audio;
}

export function unlockAudio() {
    if (audioUnlocked) return;

    if (!gameOverSound) loadGameOverSound();

    if (!gameOverSound) {
        audioUnlocked = true;
        return;
    }

    gameOverSound.play()
        .then(() => {
            gameOverSound?.pause();
            if (gameOverSound) gameOverSound.currentTime = 0;
            audioUnlocked = true;
        })
        .catch(() => {
            audioUnlocked = false;
        });
}

export function playGameOverSound() {
    if (!audioUnlocked || !gameOverSound) return;

    gameOverSound.currentTime = 0;
    gameOverSound.play().catch(() => { });
}