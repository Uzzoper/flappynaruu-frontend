import type { Bird } from "../entities/Bird";
import type { Pipe } from "../entities/Pipe";

export function updateScore(
    bird: Bird,
    pipes: Pipe[]
): number {
    let scoreIncrease = 0;

    for (const pipe of pipes) {
        if (!pipe.isPassed && bird.x > pipe.x && pipe.width) {
            pipe.isPassed = true;
            scoreIncrease++;
        }
    }

    return scoreIncrease;
}