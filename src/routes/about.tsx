import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Jasper Presas" },
      { name: "description", content: "Experienced GoHighLevel specialist and automation expert helping businesses operationalize growth." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-4">// ABOUT / 03</div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Operator. Architect.<br />
          <span className="text-gradient">Automation engineer.</span>
        </h1>

        <div className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-8 sm:gap-10">
          <div className="md:col-span-2 space-y-5 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm Jasper Presas — an experienced GoHighLevel specialist building automation
              systems and AI-powered workflows for any business that wants to grow without
              adding headcount.
            </p>
            <p>
              My work sits at the intersection of CRM strategy, automation engineering, and
              AI. I design HighLevel environments that capture leads, qualify them
              automatically, book appointments, follow up forever, and report cleanly to the
              dashboard.
            </p>
            <p>
              The goal is always the same: a system that runs the business while you focus
              on the parts only you can do.
            </p>
          </div>

          <div className="border border-border rounded-md p-5 sm:p-6 bg-card h-fit">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-4">PROFILE</div>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-muted-foreground font-mono text-[11px]">NAME</dt><dd>Jasper Presas</dd></div>
              <div><dt className="text-muted-foreground font-mono text-[11px]">ROLE</dt><dd>GHL & Automation Expert</dd></div>
              <div><dt className="text-muted-foreground font-mono text-[11px]">BASE</dt><dd>Laguna, Philippines</dd></div>
              <div><dt className="text-muted-foreground font-mono text-[11px]">STATUS</dt><dd className="text-primary">Available</dd></div>
            </dl>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <Link to="/resume" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-md border border-primary/60 text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition">
            View full resume →
          </Link>
        </div>
      </section>


      <SiteFooter />
    </div>
  );
}
