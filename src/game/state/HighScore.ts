const HIGH_SCORE_KEY = "flappynaruu_high_scores";

export function loadHighScore(): number {
    const savedScore = localStorage.getItem(HIGH_SCORE_KEY);
    return savedScore ? Number(savedScore) : 0;
}

export function saveHighScore(score: number) {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
}