import axios from 'axios';
import type { LeaderboardEntry } from './Types';

const API_BASE_URL = '';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const saveScore = async (nickname: string, score: number): Promise<void> => {
    try {
        await api.post('/leaderboard', { nickname, score });
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            // Normalize error message (e.g., "nickname: Msg" -> "Msg")
            const rawMessage = err.response.data.message;
            const cleanMessage = rawMessage.includes(': ')
                ? rawMessage.split(': ').slice(1).join(': ')
                : rawMessage;
            throw new Error(cleanMessage);
        }
        throw new Error('Não foi possível salvar o recorde.');
    }
};

export const getTop5Scores = async (): Promise<LeaderboardEntry[]> => {
    const response = await api.get<LeaderboardEntry[]>('/leaderboard/top5');
    return response.data;
};

export default api;