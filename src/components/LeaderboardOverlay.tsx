import { useState } from 'react';
import { saveScore } from '../api/LeaderboardApi';
import './LeaderboardOverlay.css';

interface LeaderboardOverlayProps {
    score: number;
    onSaved: () => void;
    onClose: () => void;
}

export function LeaderboardOverlay({ score, onSaved, onClose }: LeaderboardOverlayProps) {
    const [nickname, setNickname] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nickname.trim()) return;

        setIsSaving(true);
        setError(null);

        try {
            const success = await saveScore(nickname, score);
            if (success) {
                onSaved();
            } else {
                setError('Não foi possível salvar o recorde (talvez alguém te passou!).');
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao conectar com o servidor.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="leaderboard-overlay-backdrop">
            <div className="leaderboard-modal">
                <h2>🎉 NOVO RECORDE ! 🎉</h2>
                <p>Sua pontuação <strong>{score}</strong> entrou para o Top 5 global do Flappynaruu!</p>
                <p>Digite seu nome para aparecer em nosso ranking:</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value.slice(0, 30))}
                        placeholder="Seu Nickname"
                        maxLength={30}
                        disabled={isSaving}
                        autoFocus
                    />

                    {error && <p className="error-message">{error}</p>}

                    <div className="button-group">
                        <button type="submit" disabled={isSaving || !nickname.trim()}>
                            {isSaving ? 'Salvando...' : 'Salvar Recorde'}
                        </button>
                        <button type="button" onClick={onClose} disabled={isSaving} className="cancel-button">
                            Não quero aparecer no ranking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
