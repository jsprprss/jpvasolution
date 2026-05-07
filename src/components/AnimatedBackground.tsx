import { useEffect, useRef } from "react";

/**
 * Premium animated background:
 * - Canvas particle field with connection lines (cyan/teal)
 * - Animated gradient orbs (CSS)
 * - Grid overlay
 * - Cursor-reactive parallax glow
 * Adapts automatically to light/dark via CSS variables.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const isDark = () => !document.documentElement.classList.contains("light");

    const setSize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(90, Math.floor((width * height) / 18000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    };
    setSize();

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const draw = () => {
      const dark = isDark();
      ctx.clearRect(0, 0, width, height);

      const dotColor = dark ? "rgba(125, 230, 240, " : "rgba(20, 130, 160, ";
      const lineColor = dark ? "rgba(125, 230, 240, " : "rgba(20, 130, 160, ";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // mouse repel
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (14000 - d2) / 14000;
          p.x += (dx / Math.sqrt(d2 + 1)) * f * 0.6;
          p.y += (dy / Math.sqrt(d2 + 1)) * f * 0.6;
        }

        ctx.beginPath();
        ctx.fillStyle = dotColor + "0.7)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const alpha = (1 - d2 / 14000) * (dark ? 0.25 : 0.18);
            ctx.strokeStyle = lineColor + alpha + ")";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* base gradient backdrop */}
      <div className="absolute inset-0 bg-background transition-colors duration-700" />
      {/* animated orbs */}
      <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,_var(--cyan)_0%,_transparent_60%)] opacity-30 blur-3xl animate-orb-a" />
      <div className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,_var(--teal)_0%,_transparent_60%)] opacity-25 blur-3xl animate-orb-b" />
      <div className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_var(--cyan)_0%,_transparent_60%)] opacity-20 blur-3xl animate-orb-c" />
      {/* grid */}
      <div className="absolute inset-0 bg-grid-anim opacity-[0.35]" />
      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* cursor glow */}
      <div
        ref={glowRef}
        className="absolute h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_var(--cyan)_0%,_transparent_65%)] opacity-[0.12] blur-2xl will-change-transform"
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_var(--background)_100%)]" />
    </div>
  );
}
