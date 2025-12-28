import { useState } from "react";
import "../MainMenu.css";
import birdImage from "../assets/image/bird/bird_0.png";

interface MainMenuProps {
    onPlay: () => void;
}

const MainMenu = ({ onPlay }: MainMenuProps) => {
    const [isHovered, setIsHovered] = useState(false);

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
                    onClick={onPlay}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    ▶ JOGAR
                </button>

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