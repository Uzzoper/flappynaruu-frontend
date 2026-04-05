# Changelog

All notable changes to Flappy Naruu will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - 2026-04-05

### Changed
- Game loop now uses delta time for frame-rate independent physics — consistent gameplay across 30/60/120/144Hz displays
- Background rendering cached via offscreen canvas for improved rendering performance
- Pipe gradients cached and reused instead of recreated every frame
- Spawn timers converted from frame-based to time-based for consistency
- Hint timer now uses real seconds instead of frame counts
- Reset game clock on restart to prevent physics jump after game over

## [0.0.4] - 2026-04-04

### Added
- Broccoli collectible system — broccolis spawn between pipes and can be collected by the bird
- Aura shield mechanic — collecting 3 broccolis grants a one-hit shield against pipe collisions
- HUD aura progress indicator with emoji display (🥦/⬜)
- In-game hint system with word-wrap for contextual tips
- Shield visual effect with pulsating aura around the bird

### Changed
- Refactored collision detection into separate boundary and pipe collision checks
- Extracted `handleGameOver` into reusable function

## [0.0.3] - 2026-04-01

### Added
- Post-game overlay with "Jogar Novamente" and "Voltar ao Menu" buttons after leaderboard flow
- Score display on post-game overlay

### Changed
- Background image replaced with new dark cage-themed pixel art
- Leaderboard check runs asynchronously in background — post-game overlay appears immediately without waiting for server response
- Removed 3s timeout from top score check to accommodate Render freetier cold starts

### Security
- Pinned axios to 1.13.2 to avoid compromised versions (1.14.1, 0.30.4)
- Added npm override to force axios 1.13.2 across all transitive dependencies

## [0.0.2] - 2026-01-28

### Changed
- Reduced gravity (0.4 → 0.28) for slower bird falling
- Increased pipe speed (base: 2 → 3, max: 3.5 → 5) for faster horizontal gameplay
- Increased initial gap size (160 → 220) for an easier start
- Minor gameplay improvements
- Updated copyright year to 2025-2026

## [0.0.1] - 2026-01-20

### Added
- Initial release with core Flappy Bird gameplay
- Leaderboard integration with backend API
- Main menu with play button and leaderboard display
- Game over screen with score submission
- Parallax scrolling background
- Dynamic difficulty scaling based on score
