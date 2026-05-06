import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-2">// JASPER PRESAS</div>
          <div className="text-lg font-semibold">GoHighLevel Specialist & Automation Expert</div>
          <p className="text-sm text-muted-foreground mt-2">Laguna, Philippines</p>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-3">CONTACT</div>
          <ul className="space-y-1 text-sm">
            <li><a className="hover:text-primary" href="mailto:jsprprss@gmail.com">jsprprss@gmail.com</a></li>
            <li><a className="hover:text-primary" href="tel:+639277737399">+63 927 773 7399</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-3">NAVIGATE</div>
          <ul className="space-y-1 text-sm">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/resume" className="hover:text-primary">Resume</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>© {new Date().getFullYear()} JASPER PRESAS</span>
          <span className="tracking-[0.3em]">SYSTEM // ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
