import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative h-8 w-8 rounded-md border border-primary/60 grid place-items-center overflow-hidden">
            <span className="font-mono text-sm text-primary font-bold">JP</span>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          </div>
          <div className="leading-none">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">JPVA SOLUTION</div>
            <div className="text-sm font-semibold tracking-wide">JASPER PRESAS</div>
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
      </div>
    </header>
  );
}
