import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "light") root.classList.add("light");
  else root.classList.remove("light");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) ?? "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-8 w-[60px] rounded-full border border-border bg-card/60 backdrop-blur-md overflow-hidden group transition-all hover:border-primary"
    >
      <span
        className="absolute top-1 left-1 h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center transition-transform duration-500 ease-[cubic-bezier(.6,.05,.2,1)] shadow-[0_0_18px_var(--cyan)]"
        style={{ transform: isDark ? "translateX(0)" : "translateX(28px)" }}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
      <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-primary/0 group-hover:ring-primary/40 transition" />
    </button>
  );
}
