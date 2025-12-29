export function getDifficulty(score: number) {
    return {
        pipeSpeed: Math.min(2 + score * 0.002, 3.5),
        gapSize: Math.max(160 - score * 2, 120), 
    };
}