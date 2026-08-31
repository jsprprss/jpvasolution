import { useEffect, useState } from "react";

const GREETINGS = [
  { text: "Hello", lang: "EN" },
  { text: "Hola", lang: "ES" },
  { text: "Bonjour", lang: "FR" },
  { text: "こんにちは", lang: "JA" },
  { text: "안녕하세요", lang: "KO" },
  { text: "مرحبا", lang: "AR" },
  { text: "你好", lang: "ZH" },
];

const STEP_MS = 700;

export function WelcomeIntro() {
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("introSeen");
  });
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) return;
    if (idx >= GREETINGS.length) {
      setFading(true);
      const t = setTimeout(() => {
        sessionStorage.setItem("introSeen", "1");
        setShow(false);
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIdx((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [idx, show]);

  if (!show) return null;

  const current = GREETINGS[Math.min(idx, GREETINGS.length - 1)];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)] blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className="font-mono text-[10px] tracking-[0.4em] text-primary/70">// JPVA SOLUTION</div>
        <div key={idx} className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight text-foreground intro-word break-words">
          {current.text}
        </div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">{current.lang}</div>


        <div className="mt-8 flex items-center gap-3">
          {GREETINGS.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-500 ${i <= idx ? "w-10 bg-primary" : "w-6 bg-border"}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            setFading(true);
            setTimeout(() => {
              sessionStorage.setItem("introSeen", "1");
              setShow(false);
            }, 600);
          }}
          className="mt-10 font-mono text-[11px] tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
        >
          ENTER SITE →
        </button>
      </div>

      <style>{`
        .intro-word {
          animation: introIn 700ms cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes introIn {
          0%   { opacity: 0; transform: translateY(12px) scale(.98); filter: blur(8px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
