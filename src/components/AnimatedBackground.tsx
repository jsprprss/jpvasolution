import { useEffect, useRef } from "react";

/**
 * Pure black futuristic background:
 * - Solid black base
 * - Soft drifting cyan/teal ambient blobs (very low opacity)
 * - Thin diagonal flowing light streaks on canvas
 * - Subtle floating particles
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vy: number; vx: number; r: number; a: number };
    type S = { x: number; y: number; len: number; speed: number; angle: number; alpha: number; hue: 0 | 1 };
    let particles: P[] = [];
    let streaks: S[] = [];

    const setSize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pCount = Math.min(35, Math.floor((width * height) / 60000));
      particles = Array.from({ length: pCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -Math.random() * 0.18 - 0.03,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.4 + 0.1,
      }));
      streaks = Array.from({ length: 6 }, () => spawnStreak());
    };

    const spawnStreak = (): S => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 120 + Math.random() * 220,
      speed: 0.4 + Math.random() * 0.7,
      angle: -Math.PI / 6 + (Math.random() - 0.5) * 0.2,
      alpha: 0,
      hue: Math.random() > 0.5 ? 0 : 1,
    });

    setSize();
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // streaks
      for (const s of streaks) {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha = Math.min(s.alpha + 0.004, 0.35);

        if (s.x - s.len > width || s.y - s.len > height) {
          Object.assign(s, spawnStreak(), {
            x: -s.len,
            y: Math.random() * height,
            alpha: 0,
          });
        }

        const x2 = s.x - Math.cos(s.angle) * s.len;
        const y2 = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, x2, y2);
        const color = s.hue === 0 ? "255, 255, 255" : "160, 160, 160";
        grad.addColorStop(0, `rgba(${color}, ${s.alpha})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(235, 235, 235, ${p.a * 0.45})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
      <div className="absolute inset-0 bg-aurora opacity-90" />
      <div className="absolute inset-0 bg-sweep" />
      <div className="absolute top-[-15%] left-[-10%] h-[55vw] w-[55vw] rounded-full blob-cyan animate-blob-a" />
      <div className="absolute top-[40%] right-[-20%] h-[60vw] w-[60vw] rounded-full blob-teal animate-blob-b" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_color-mix(in_oklab,_var(--background)_85%,_transparent)_100%)]" />
    </div>
  );
}
