# AGENTS.md - Flappy Naruu Frontend

## Commands

```bash
bun run dev        # Vite dev server (Rolldown bundler)
bun run build      # tsc -b && vite build (type-check first)
bun run lint       # ESLint
bun install        # Install dependencies (requires Bun)
```

No test runner configured.

## TypeScript Rules

- `verbatimModuleSyntax: true` — must use `import type { ... }` for type-only imports
- `erasableSyntaxOnly: true` — no `.d.ts` files; use inline types
- `strict: true` with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`

## Code Conventions

- **No comments** unless user explicitly requests
- **No default exports** except `App.tsx`
- **Files**: kebab-case (`game-engine.ts`)
- **Type imports**: `import type { Bird } from "../entities/Bird"`

## Architecture

ECS-inspired game with Canvas 2D rendering. Game logic in `src/game/`, React UI in `src/components/`:

- `src/game/engine/` — GameEngine main loop
- `src/game/systems/` — Logic (Physics, Input, Pipes, Broccoli, etc.)
- `src/game/render/` — Canvas renderers
- `src/game/entities/` — Data types (Bird, Pipe, Broccoli)
- `src/game/state/` — GameState, CreateInitialState
- `src/game/config/Constants.ts` — All game constants

Entry: `src/main.tsx` → React app with Canvas-based game.

## Key Toolchain Facts

- **Bun required** — not npm/yarn
- **Vite uses Rolldown fork** (`npm:rolldown-vite@7.2.5`)
- **React 19 Compiler** enabled via `babel-plugin-react-compiler`
- **Tailwind CSS 4** with `@tailwindcss/vite` plugin
- **PWA** via `vite-plugin-pwa` with auto-update SW

## API Proxy

`/leaderboard` requests proxied to `https://flappynaruu-backend.onrender.com` (see `vite.config.ts`).
