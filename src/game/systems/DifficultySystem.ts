export function getDifficulty(score: number) {
    return {
        pipeSpeed: Math.min(3 + score * 0.002, 5),
        gapSize: Math.max(220 - score * 2, 120),
    };
}