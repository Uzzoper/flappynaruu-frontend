import type { Bird } from "../entities/Bird";

export function drawShield(
    ctx: CanvasRenderingContext2D,
    bird: Bird,
) {
    const centerX = bird.x + bird.width / 2;
    const centerY = bird.y + bird.height / 2;
    const baseRadius = bird.width / 2 + 10;

    const pulse = Math.sin(performance.now() * 0.005) * 3;
    const radius = baseRadius + pulse;

    ctx.save();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(100, 200, 255, 0.3)`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(100, 200, 255, 0.6)`;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 200, 100, 0.8)`;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
}
