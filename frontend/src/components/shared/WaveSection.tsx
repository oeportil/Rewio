import { useEffect, useRef, type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

const WaveSection = ({ children, className = "" }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#f8fafc"; // slate-950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(38, 132, 191, 0.38)`;
        ctx.lineWidth = 2;

        for (let x = 0; x <= canvas.width; x += 12) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + time + i) * (20 + i * 12) +
            Math.sin(x * 0.02 + time) * 8;

          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      time += 0.02;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default WaveSection;
