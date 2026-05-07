import { useEffect, useRef } from "react";

/**
 * Premium fluid background:
 * - Aurora gradient mesh (animated conic + radial)
 * - Diagonal light sweeps
 * - Floating glowing particles on canvas (no grid, no lines)
 * - Cursor-reactive ambient glow
 * Adapts to dark/light via CSS vars.
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; life: number };
    let particles: P[] = [];

    const isDark = () => !document.documentElement.classList.contains("light");

    const setSize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(40, Math.floor((width * height) / 48000));
      particles = Array.from({ length: target }, () => spawn());
    };
    const spawn = (): P => ({
      x: Math.random() * (canvas.clientWidth || window.innerWidth),
      y: Math.random() * (canvas.clientHeight || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      r: Math.random() * 1.8 + 0.4,
      hue: Math.random(),
      life: Math.random() * 1,
    });
    setSize();

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 350}px, ${e.clientY - 350}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const draw = () => {
      const dark = isDark();
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.0025;

        if (p.y < -10 || p.x < -10 || p.x > width + 10 || p.life > 1) {
          Object.assign(p, spawn(), { y: height + 10 });
        }

        // gentle attraction toward mouse for ambient feel
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 40000) {
          p.vx += (dx / (Math.sqrt(d2) + 1)) * 0.0008;
          p.vy += (dy / (Math.sqrt(d2) + 1)) * 0.0008;
        }
        // damping
        p.vx *= 0.995;
        p.vy = Math.max(p.vy * 0.998, -0.4);

        const alpha = (1 - Math.abs(p.life - 0.5) * 2) * (dark ? 0.55 : 0.35);
        const color = p.hue > 0.5
          ? (dark ? `rgba(120, 230, 240, ${alpha})` : `rgba(40, 150, 175, ${alpha})`)
          : (dark ? `rgba(80, 180, 210, ${alpha})` : `rgba(80, 170, 190, ${alpha})`);

        // soft glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
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
      {/* base */}
      <div className="absolute inset-0 bg-background transition-colors duration-700" />

      {/* aurora mesh */}
      <div className="absolute inset-0 bg-aurora opacity-90" />

      {/* diagonal light sweep */}
      <div className="absolute -inset-[20%] bg-sweep mix-blend-screen opacity-40 dark:opacity-60" />

      {/* drifting blobs */}
      <div className="absolute top-[-20%] left-[-10%] h-[55vw] w-[55vw] rounded-full blob-cyan animate-blob-a" />
      <div className="absolute top-[20%] right-[-15%] h-[60vw] w-[60vw] rounded-full blob-teal animate-blob-b" />
      <div className="absolute bottom-[-25%] left-[20%] h-[50vw] w-[50vw] rounded-full blob-cyan animate-blob-c" />

      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* cursor glow */}
      <div
        ref={glowRef}
        className="absolute h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,_var(--cyan)_0%,_transparent_65%)] opacity-[0.10] blur-3xl will-change-transform"
      />

      {/* film grain + vignette for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_var(--background)_100%)]" />
    </div>
  );
}
