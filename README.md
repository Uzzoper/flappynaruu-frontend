# Flappy Naruu - Frontend

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Flappy Naruu** is a high-performance, open-source casual game built with **React 19** and **Bun**. It features a modular "System-based" architecture, inspired by ECS (Entity Component System) patterns, ensuring clean separation of concerns and scalability.

---

## Technical Stack

This project utilizes the latest cutting-edge web technologies:
* **React 19**: Leveraging the newest hooks and the **React Compiler** (Babel plugin) for automatic memoization and optimized rendering.
* **Bun**: Used as a fast JavaScript runtime, package manager, and test runner.
* **Vite (Rolldown)**: Utilizing the next-generation Rust-based bundler for ultra-fast builds and HMR.
* **TypeScript 5.9**: Strict typing across all game systems for robust development.

## Project Structure & Architecture

The game logic is decoupled from UI components, located in `src/game/systems/`:

* **`UpdateGame.ts`**: The core game loop manager.
* **`BirdSystem.ts` & `BirdSprites.ts`**: Handles Naruu's physics, state, and frame-by-frame animations.
* **`PipeSystem.ts`**: Procedural generation and lifecycle management of obstacles.
* **`Physics.ts`**: Core collision detection and gravity engine.
* **`InputSystem.ts`**: Centralized event handling for player interactions.
* **`ScoreSystem.ts` & `DifficultySystem.ts`**: Manages game progression and dynamic difficulty scaling.
* **`BackgroundRender.ts` & `RenderSystem.ts`**: Optimized rendering logic for parallax and game entities.

## Getting Started

### Prerequisites
You must have [Bun](https://bun.sh) installed.

### Installation & Run
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Uzzoper/flappy-naruu-frontend.git](https://github.com/Uzzoper/flappy-naruu-frontend.git)
   cd flappy-naruu-frontend
  ```

2. **Install dependencies:**
  ```Bash
  bun install
  ```

3. **Run the development server:**
  ```Bash
  bun run dev
  ```

4. **Build for production:**
  ```Bash
  bun run build
  ```

## License
This project is licensed under the GNU GPLv3. See the LICENSE file for the full legal text.

## Author
Developed with ❤️ by **Juan Antonio Peruzzo**.
* **GitHub**: [@Uzzoper](https://github.com/Uzzoper)