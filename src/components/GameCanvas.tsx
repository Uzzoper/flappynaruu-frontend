import { useEffect, useRef } from "react";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={600}
      style={{
        border: "2px solid white",
        display: "block",
        margin: "0 auto",
        background: "#222",
      }}
    />
  );
}