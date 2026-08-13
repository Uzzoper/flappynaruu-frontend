export interface LeaderboardEntry {
    id?: number;
    nickname: string;
    score: number;
    createdAt?: string;
}

export type SaveScoreStatus = 'saved' | 'not_top';
export interface SaveScoreResult {
    status: SaveScoreStatus;
}