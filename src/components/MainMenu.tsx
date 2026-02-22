import { useState, useEffect } from "react";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { Button, Card } from "pixel-retroui";
import birdImage from "../assets/image/bird/bird_0.png";
import click from "../assets/audio/click.wav";
import { getTop5Scores } from "../api/LeaderboardApi";
import type { LeaderboardEntry } from "../api/Types";

interface MainMenuProps {
    onPlay: () => void;
}

const MainMenu = ({ onPlay }: MainMenuProps) => {
    const [scores, setScores] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showInstallToast, setShowInstallToast] = useState(false);
    const { isInstallable, installApp } = usePWAInstall(() => {
        setShowInstallToast(true);
        setTimeout(() => {
            setShowInstallToast(false);
        }, 3000);
    });

    useEffect(() => {
        getTop5Scores()
            .then(data => {
                setScores(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch scores", err);
                setIsLoading(false);
            });
    }, []);

    const playClickSound = () => {
        const audio = new Audio(click);
        audio.volume = 0.4;
        audio.play().catch(error => console.log("Error playing click sound: ", error));
    };

    const handlePlayClick = () => {
        playClickSound();
        setTimeout(onPlay, 150);
    };

    return (
        <div className="relative h-full w-full flex flex-col items-center overflow-y-auto overflow-x-hidden box-border p-4">
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-animated">
                <div className="absolute inset-0 bg-radial-glow" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-full animate-fade-in">
                <h1 className="title-flappy text-[#f5f0e6] font-minecraft tracking-wider m-0 drop-shadow-[0_0_20px_rgba(235,140,50,0.8)]">
                    FLAPPY
                </h1>
                <h2 className="title-naruu text-[#eb8c32] font-minecraft tracking-widest -mt-2 drop-shadow-[0_0_10px_rgba(235,140,50,0.5)]">
                    NARUU
                </h2>

                <div className="my-6 animate-float">
                    <img
                        src={birdImage}
                        alt="Naruu"
                        className="w-[120px] h-[120px] object-contain drop-shadow-[0_0_20px_rgba(235,140,50,0.5)] animate-bird-glow"
                    />
                </div>

                <p className="tutorial-text text-[#8b8b9a] text-sm md:text-base lg:text-lg text-center max-w-[300px] mb-8">
                    Ajude Naruu a escapar da gaiola e realizar seu sonho de se tornar presidente do bando de futebol de botão!
                </p>

                <Button
                    onClick={handlePlayClick}
                    bg="#eb8c32"
                    textColor="#0d0d14"
                    shadow="#c97020"
                    className="btn-retro-enhanced text-2xl font-bold tracking-widest px-16 py-5 hover:scale-110"
                >
                    JOGAR
                </Button>

                {isInstallable && (
                    <Button
                        onClick={installApp}
                        bg="transparent"
                        textColor="#eb8c32"
                        shadow="#eb8c32"
                        className="btn-retro-enhanced text-base font-bold tracking-wide px-8 py-3 mt-4"
                    >
                        Adicionar à Tela Inicial
                    </Button>
                )}

                {showInstallToast && (
                    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#4CAF50] text-white px-6 py-3 rounded-lg text-sm z-[1000] animate-slide-up">
                        Ícone adicionado! Procure o ícone do Naruu na sua tela inicial!
                    </div>
                )}

                <Card
                    className="mt-8 w-[90%] max-w-[400px] p-6"
                    bg="rgba(13, 13, 20, 0.6)"
                    borderColor="rgba(235, 140, 50, 0.3)"
                >
                    <h3 className="text-[#eb8c32] text-center m-0 mb-4 text-xl font-minecraft tracking-wide drop-shadow-[0_0_10px_rgba(235,140,50,0.4)]">
                        TOP 5 GLOBAL
                    </h3>
                    {isLoading ? (
                        <p className="text-[#8b8b9a] text-center italic">Carregando...</p>
                    ) : (
                        <ul className="list-none p-0 m-0">
                            {scores.length > 0 ? (
                                scores.map((entry, index) => (
                                    <li key={index} className="flex justify-between py-2 border-b border-[rgba(235,140,50,0.1)] text-[#f5f0e6] last:border-b-0">
                                        <span className="text-[#eb8c32] font-bold w-[30px]">#{index + 1}</span>
                                        <span className="flex-1 text-left truncate pr-2">{entry.nickname}</span>
                                        <span className="font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{entry.score}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-[#8b8b9a] text-center italic">Sem recordes ainda</p>
                            )}
                        </ul>
                    )}
                </Card>

                <div className="text-[#8b8b9a] text-lg italic text-center w-[90%] max-w-[300px] mt-8 mb-8">
                    V 0.0.2
                </div>

                <div className="text-[#8b8b9a] text-sm md:text-base lg:text-lg italic text-center mt-8 z-10">
                    <p>
                        © 2025-2026 Flappy Naruu is a
                        <a
                            href="https://www.gnu.org/licenses/gpl-3.0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 footer-link"
                        >
                            Free Software / GNU GPLv3
                        </a>
                    </p>
                    <div className="mt-2 text-white/60 text-xs">
                        <p> Developed by{" "}
                            <a href="https://juanperuzzo.is-a.dev" target="_blank" rel="noopener noreferrer" className="footer-link">
                                Juan Antonio Peruzzo
                            </a>
                        </p>
                        <a href="https://github.com/Uzzoper" target="_blank" rel="noopener noreferrer" className="footer-link">
                            My GitHub
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MainMenu;
