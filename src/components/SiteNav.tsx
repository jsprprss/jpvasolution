import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 group min-w-0">
          <div className="relative h-8 w-8 shrink-0 rounded-md border border-primary/60 grid place-items-center overflow-hidden">
            <span className="font-mono text-sm text-primary font-bold">JP</span>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          </div>
          <div className="leading-none min-w-0">
            <div className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] text-foreground uppercase truncate">JPVA SOLUTION</div>
            <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground uppercase mt-1 truncate">JASPER PRESAS</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
              activeProps={{ className: "px-4 py-2 text-sm text-primary font-mono tracking-wider uppercase" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-md hover-glow ripple"
          >
            Book a call <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-1 shrink-0">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="h-11 w-11 grid place-items-center rounded-md border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-border bg-background/95 backdrop-blur-xl ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-4 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-3 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase border-b border-border/50 last:border-b-0"
              activeProps={{
                className:
                  "px-3 py-3 text-sm text-primary font-mono tracking-wider uppercase border-b border-border/50 last:border-b-0",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-widest border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-md"
          >
            Book a call <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
