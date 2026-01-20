import axios from 'axios';
import type { LeaderboardEntry } from './Types';

const API_BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://flappynaruu-backend-production.up.railway.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const saveScore = async (nickname: string, score: number): Promise<boolean> => {
    const response = await api.post('/leaderboard', { nickname, score });
    return response.status === 201;
};

export const getTop5Scores = async (): Promise<LeaderboardEntry[]> => {
    const response = await api.get<LeaderboardEntry[]>('/leaderboard/top5');
    return response.data;
};

export default api;