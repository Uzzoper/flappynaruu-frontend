import { useState, useEffect } from 'react';
import { saveScore } from '../api/LeaderboardApi';
import type { SaveScoreResult } from '../api/LeaderboardApi';
import { Card, Input, Button } from 'pixel-retroui';

interface LeaderboardOverlayProps {
    score: number;
    initialError?: string;
    onSaved: () => void;
    onClose: () => void;
}

function validateSubmission(nickname: string, score: number): string | null {
    const trimmed = nickname.trim();
    if (!trimmed) return 'Digite um nickname.';
    if (trimmed.length > 30) return 'Nickname muito longo (máx. 30 caracteres).';
    if (!Number.isInteger(score) || score < 1 || score > 1000000) return 'Score inválido (1 a 1000000).';
    return null;
}

export function LeaderboardOverlay({ score, initialError, onSaved, onClose }: LeaderboardOverlayProps) {
    const [nickname, setNickname] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SaveScoreResult | null>(null);

    useEffect(() => {
        if (initialError) {
            setError(initialError);
            const timer = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(timer);
        }
    }, [initialError, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nickname.trim()) return;

        const validationError = validateSubmission(nickname, score);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            const res = await saveScore(nickname, score);
            setResult(res);
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
                {result ? (
                    <div>
                        <h2 className="text-2xl mb-4 text-[#eb8c32] font-bold font-minecraft">
                            {result.status === 'saved' ? 'Entrou pro Top 5!' : 'Quase! Dessa vez não entrou'}
                        </h2>
                        <p className="mb-6 text-gray-300">Sua pontuação {score} pode entrar no ranking!</p>
                        <p className="mb-4 text-gray-300">Obrigado por jogar!</p>
                        <div className="flex gap-3 justify-center mt-4 flex-wrap">
                            <Button
                                type="button"
                                onClick={onSaved}
                                disabled={isSaving}
                                bg="#eb8c32"
                                textColor="#0d0d14"
                                shadow="#c97020"
                                className="px-6 py-3"
                            >
                                Continuar
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl mb-4 text-[#eb8c32] font-bold font-minecraft">
                            SALVAR PONTUAÇÃO
                        </h2>
                        <p className="mb-6 text-gray-300">
                            Sua pontuação <strong className="font-minecraft text-[#5f9aff] text-xl">{score}</strong> pode entrar no ranking! Digite seu nome para salvar:
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
                    </div>
                )}
            </Card>
        </div>
    );
}