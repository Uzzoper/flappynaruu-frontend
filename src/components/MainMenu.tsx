import { useState, useEffect } from "react";
import "./MainMenu.css";
import birdImage from "../assets/image/bird/bird_0.png";
import click from "../assets/audio/click.wav";
import { getTop5Scores } from "../api/LeaderboardApi";
import type { LeaderboardEntry } from "../api/Types";

interface MainMenuProps {
    onPlay: () => void;
}

const MainMenu = ({ onPlay }: MainMenuProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [scores, setScores] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
        <div className="main-menu">
            <div className="menu-background" />

            <div className="menu-content">
                <h1 className="title">FLAPPY</h1>
                <h2 className="subtitle">NARUU</h2>

                <div className="bird-container">
                    <img
                        src={birdImage}
                        alt="Naruu"
                        className={"bird-image"}
                    />
                </div>

                <p className="synopsis">
                    Ajude Naruu a escapar da gaiola e realizar seu sonho de se tornar presidente do bando de futebol de botão!
                </p>

                <button
                    className={`play-button ${isHovered ? 'hovered' : ''}`}
                    onClick={handlePlayClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    ▶ JOGAR
                </button>

                <div className="leaderboard-container">
                    <h3 className="leaderboard-title">TOP 5 GLOBAL</h3>
                    {isLoading ? (
                        <p className="loading-text">Carregando...</p>
                    ) : (
                        <ul className="leaderboard-list">
                            {scores.length > 0 ? (
                                scores.map((entry, index) => (
                                    <li key={index} className="leaderboard-item">
                                        <span className="rank">#{index + 1}</span>
                                        <span className="nickname">{entry.nickname}</span>
                                        <span className="score">{entry.score}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="no-scores">Sem recordes ainda</p>
                            )}
                        </ul>
                    )}
                </div>

                <div className="version">
                    V 0.0.1
                </div>

                <div className="footer">
                    <p>
                        © 2025 Flappy Naruu  is a
                        <a
                            href="https://www.gnu.org/licenses/gpl-3.0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="license-link"
                        >
                            Free Software / GNU GPLv3
                        </a>
                    </p>
                    <div className="social-links">
                        <p> Developed by Juan Antonio Peruzzo</p>
                        <a href="https://github.com/Uzzoper" target="_blank" rel="noopener noreferrer" className="social-link">
                            My GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;