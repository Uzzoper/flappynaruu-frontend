# Flappy Naruu - Frontend

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Flappy Naruu** is a high-performance, open-source casual game built with **React 19** and **Bun**. It features a modular "System-based" architecture, inspired by ECS (Entity Component System) patterns, ensuring clean separation of concerns and scalability.

---

## Features

- 🎮 **Classic Flappy Bird gameplay** with smooth physics
- 📱 **PWA (Progressive Web App)** - Install on mobile/desktop
- 🏆 **Global Leaderboard** - Top 5 scores from players worldwide
- 💾 **Local High Score** - Your best score saved locally
- 🎵 **Audio System** - Background music and sound effects
- 📖 **Interactive Tutorial** - Two-phase tap-to-start guidance

---

## Technical Stack

This project utilizes the latest cutting-edge web technologies:

- **React 19**: Leveraging the newest hooks and the **React Compiler** (Babel plugin) for automatic memoization and optimized rendering.
- **Bun**: Used as a fast JavaScript runtime and package manager.
- **Vite (Rolldown)**: Utilizing the next-generation Rust-based bundler for ultra-fast builds and HMR.
- **TypeScript 5.9**: Strict typing across all game systems for robust development.
- **vite-plugin-pwa**: PWA support with service worker and offline capabilities.

---

## Project Structure & Architecture

The game logic is decoupled from UI components in `src/game/`:

### Engine & State
- **`engine/GameEngine.ts`**: Main game loop and initialization.
- **`state/GameState.ts`**: Type definitions for game state.
- **`state/CreateInitialState.ts`**: Factory for initial game state.
- **`state/HighScore.ts`**: Local storage persistence for high scores.
- **`config/Constants.ts`**: Centralized game constants (gravity, jump force).

### Systems
- **`systems/UpdateGame.ts`**: The core game loop manager.
- **`systems/Physics.ts`**: Gravity and collision detection.
- **`systems/BirdSystem.ts`**: Naruu's state and animation logic.
- **`systems/BirdSprites.ts`**: Sprite loading and management.
- **`systems/PipeSystem.ts`**: Procedural generation and lifecycle of obstacles.
- **`systems/InputSystem.ts`**: Centralized event handling for player interactions.
- **`systems/ScoreSystem.ts`**: Score calculation and tracking.
- **`systems/DifficultySystem.ts`**: Dynamic difficulty scaling.
- **`systems/AudioSystem.ts`**: Sound effects and music management.

### Rendering
- **`render/RenderGame.ts`**: Main render orchestrator.
- **`render/BackgroundRenderer.ts`**: Parallax background rendering.
- **`render/BirdRenderer.ts`**: Naruu sprite rendering.
- **`render/PipeRenderer.ts`**: Obstacle rendering.
- **`render/HUDRenderer.ts`**: Score and UI overlay.
- **`render/TutorialRenderer.ts`**: Tutorial text rendering.
- **`render/GameOverRenderer.ts`**: Game over screen.

### Services
- **`services/LeaderboardService.ts`**: API integration for global leaderboard.

### Entities
- **`entities/Bird.ts`**: Bird entity type definition.
- **`entities/Pipe.ts`**: Pipe entity type definition.

---

## Getting Started

### Prerequisites

You must have [Bun](https://bun.sh) installed.

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Uzzoper/flappynaruu-frontend.git
   cd flappynaruu-frontend
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Run the development server:**
   ```bash
   bun run dev
   ```

4. **Build for production:**
   ```bash
   bun run build
   ```

---

## PWA Installation

Flappy Naruu can be installed as a Progressive Web App:
1. Visit the game in Chrome, Edge, or Safari
2. Click the "📲 Adicionar à Tela Inicial" button on the main menu
3. Confirm the installation prompt
4. The game will appear on your home screen/desktop


---

## License

This project is licensed under the GNU GPLv3. See the LICENSE file for the full legal text.

---

## Author

Developed with ❤️ by **Juan Antonio Peruzzo**.
- **GitHub**: [@Uzzoper](https://github.com/Uzzoper)
- **Website**: [juanperuzzo.is-a.dev](https://juanperuzzo.is-a.dev)