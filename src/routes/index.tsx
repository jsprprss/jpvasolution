import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero-portrait.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Jasper Presas — GoHighLevel Specialist & Automation Expert" },
      { name: "description", content: "I architect GoHighLevel systems, AI-powered workflows, and automation that scale revenue for ambitious businesses." },
    ],
  }),
});

const stats = [
  { k: "GHL", v: "Specialist" },
  { k: "Automations", v: "Built daily" },
  { k: "Stack", v: "Zapier · Make · AI" },
  { k: "Based", v: "PH / Remote" },
];

const services = [
  { code: "01", title: "GoHighLevel Build-Outs", desc: "Sub-accounts, snapshots, pipelines, calendars, and SaaS configuration engineered for scale." },
  { code: "02", title: "Automation Architecture", desc: "Multi-step workflows across Zapier, Make, and native GHL — connecting every tool you run." },
  { code: "03", title: "AI Integrations", desc: "AI receptionists, lead qualifiers, and content engines wired into your CRM and conversations." },
  { code: "04", title: "Funnels & Sites", desc: "High-converting funnels, websites, and booking flows built natively in HighLevel." },
  { code: "05", title: "Email & SMS Systems", desc: "Reactivation, nurture, and sales sequences with deliverability dialed in." },
  { code: "06", title: "Reporting & Ops", desc: "Dashboards, attribution, and SOPs so the system runs without you." },
];

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              AVAILABLE FOR NEW PROJECTS — Q2 / 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95]">
              Engineering<br />
              <span className="text-gradient">GoHighLevel</span> systems<br />
              that scale.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Experienced GoHighLevel specialist building automation, AI workflows, and conversion machines for any business — from solo operators to multi-location brands.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="ripple group inline-flex items-center gap-3 px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest glow hover-glow transition magnetic">
                Start a project <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link to="/services" className="ripple inline-flex items-center gap-3 px-6 py-3 rounded-md border border-border text-foreground font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition magnetic">
                Explore services
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border mt-12 border border-border">
              {stats.map((s) => (
                <div key={s.k} className="bg-card p-4">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">{s.k.toUpperCase()}</div>
                  <div className="mt-2 text-sm font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative corner-frame p-2">
              <div className="relative overflow-hidden rounded-sm">
                <img src={heroImg} alt="Jasper Presas" className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-primary/30 to-transparent animate-scan" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] tracking-[0.3em] text-primary">
                  <span>ID // 0x4A53</span>
                  <span>PH / LAGUNA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-y border-border bg-card/40">
        <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground text-teal-200">
          <span>GOHIGHLEVEL</span><span>/</span>
          <span>ZAPIER</span><span>/</span>
          <span>MAKE</span><span>/</span>
          <span>OPENAI</span><span>/</span>
          <span>STRIPE</span><span>/</span>
          <span>TWILIO</span><span>/</span>
          <span>SUPABASE</span>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-3">// CAPABILITIES</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Systems built for velocity.</h2>
          </div>
          <Link to="/services" className="hidden md:inline-flex font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {services.map((s, i) => (
            <Reveal key={s.code} delay={i * 80}>
              <div className="bg-card p-8 group hover:bg-secondary/40 transition-colors hover-glow h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-primary">{s.code}</span>
                  <span className="h-px w-12 bg-border group-hover:bg-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-12 md:p-16">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-3">// LET'S BUILD</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to deploy a smarter system?</h2>
              <p className="mt-4 text-muted-foreground">Tell me about your business. I'll map the automations and HighLevel build that move the needle.</p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-md bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest glow hover:opacity-90 transition">
                Book a discovery call →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
