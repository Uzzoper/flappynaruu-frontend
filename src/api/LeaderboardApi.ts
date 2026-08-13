import axios from 'axios';
import type { LeaderboardEntry } from './Types';
import { AxiosError } from 'axios';
import type { SaveScoreResult } from './Types';
import { buildSignedScore } from './signScore';

const API_BASE_URL = '';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const saveScore = async (nickname: string, score: number): Promise<SaveScoreResult> => {
    const secret = import.meta.env.VITE_LEADERBOARD_SECRET;
    if (!secret) {
        throw new Error('Configuração do leaderboard ausente (VITE_LEADERBOARD_SECRET).');
    }

    const body = await buildSignedScore(nickname, score, secret);

    try {
        const res = await api.post('/leaderboard', body);
        if (res.status === 201) return { status: 'saved' };
        return { status: 'not_top' };
    } catch (err: unknown) {
        if (err instanceof AxiosError && err.response) {
            const status = err.response.status;
            if (status === 400 || status === 401) {
                const rawMessage =
                    (err.response.data && typeof err.response.data.message === 'string')
                        ? err.response.data.message
                        : status === 401
                            ? 'Assinatura inválida ou expirada.'
                            : 'Dados inválidos.';
                throw new Error(rawMessage);
            }
        }
        throw new Error('Não foi possível salvar o recorde.');
    }
};

export const getTop5Scores = async (): Promise<LeaderboardEntry[]> => {
    const response = await api.get<LeaderboardEntry[]>('/leaderboard/top5');
    return response.data;
};

export default api;
export type { SaveScoreResult } from './Types';