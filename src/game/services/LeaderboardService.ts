import { getTop5Scores } from '../../api/LeaderboardApi';

export const checkIfTopScore = async (score: number): Promise<boolean> => {
    const top5 = await getTop5Scores();

    if (top5.length < 5) return score > 0;

    const lowestTopScore = Math.min(...top5.map(entry => entry.score));

    return score > lowestTopScore;
};
