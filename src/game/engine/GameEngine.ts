import type { Bird } from "../entities/Bird";

export function startGame(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bird: Bird  = {
        x: 50,
        y: canvas.height / 2,
        width: 30,
        height: 30,
        velocity: 0,
    };

    const gravity = 0.4;

    const update = () => {
        bird.velocity += gravity;
        bird.y += bird.velocity;

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "yellow";
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        
        requestAnimationFrame(update);
    }

    update();
}