import { useState } from 'react';
import { saveScore } from '../api/LeaderboardApi';
import { Card, Input, Button } from 'pixel-retroui';

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
            await saveScore(nickname, score);
            onSaved();
        } catch (err: unknown) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Erro ao conectar com o servidor.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100]">
            <Card 
                className="p-8 text-center max-w-[90%] w-[420px]"
                bg="#1e1e2e"
                borderColor="#333"
            >
                <h2 className="text-2xl mb-4 text-[#eb8c32] font-bold font-minecraft">
                    NOVO RECORDE !
                </h2>
                <p className="mb-6 text-gray-300">
                    Sua pontuação <strong className="font-minecraft text-[#5f9aff] text-xl">{score}</strong> entrou para o Top 5 global do Flappynaruu!
                </p>
                <p className="mb-4 text-gray-300">Digite seu nome para aparecer em nosso ranking:</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value.slice(0, 30))}
                        placeholder="Seu Nickname"
                        maxLength={30}
                        disabled={isSaving}
                        autoFocus
                        className="w-full text-center mb-4"
                        bg="#2a2a3a"
                        textColor="white"
                    />

                    {error && (
                        <p className="text-[#ff6b6b] text-sm mb-4 bg-[#ff6b6b]/10 p-2 rounded">
                            {error}
                        </p>
                    )}

                    <div className="flex gap-3 justify-center mt-4 flex-wrap">
                        <Button 
                            type="submit" 
                            disabled={isSaving || !nickname.trim()}
                            bg="#eb8c32"
                            textColor="#0d0d14"
                            shadow="#c97020"
                            className="px-6 py-3"
                        >
                            {isSaving ? 'Salvando...' : 'Salvar Recorde'}
                        </Button>
                        <Button 
                            type="button" 
                            onClick={onClose} 
                            disabled={isSaving}
                            bg="transparent"
                            textColor="#aaa"
                            shadow="#555"
                            className="px-6 py-3"
                        >
                            Não quero aparecer
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
