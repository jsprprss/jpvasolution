import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Jasper Presas" },
      { name: "description", content: "GoHighLevel implementation, automation systems, AI integrations, funnels, email & SMS, and operational dashboards." },
    ],
  }),
});

const services = [
  {
    code: "01",
    title: "GoHighLevel Implementation",
    points: ["Sub-account setup & SaaS mode", "Snapshot engineering", "Pipelines, calendars, memberships", "Whitelabel rollout"],
  },
  {
    code: "02",
    title: "Automation Engineering",
    points: ["Native GHL workflows", "Zapier multi-step automations", "Make.com scenario design", "Webhook & API plumbing"],
  },
  {
    code: "03",
    title: "AI Integrations",
    points: ["AI conversation bots (SMS / DM / web)", "Lead qualification agents", "Content & SEO assistants", "Voice AI routing"],
  },
  {
    code: "04",
    title: "Funnels, Sites & Booking",
    points: ["High-converting funnels", "Booking & calendar flows", "Membership portals", "Native HighLevel sites"],
  },
  {
    code: "05",
    title: "Email & SMS Systems",
    points: ["Database reactivation", "Nurture & sales sequences", "Deliverability tuning", "A/B campaign testing"],
  },
  {
    code: "06",
    title: "Reporting & Ops",
    points: ["KPI dashboards", "Attribution tracking", "SOPs & team enablement", "Ongoing optimization"],
  },
];

const tools = ["GoHighLevel", "Zapier", "Make.com", "OpenAI", "Twilio", "Stripe", "Calendly", "Slack", "Airtable", "n8n"];

function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-4">// SERVICES / 02</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight max-w-4xl leading-tight">
            Six pillars of <span className="text-gradient">automated growth.</span>
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl">
            Modular services that combine into a complete revenue operating system inside GoHighLevel.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {services.map((s) => (
            <div key={s.code} className="bg-card p-6 sm:p-8 md:p-10">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <span className="font-mono text-[11px] tracking-[0.3em] text-primary">{s.code} / SERVICE</span>
                <span className="h-px w-12 sm:w-16 bg-primary/40" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">{s.title}</h3>
              <ul className="space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">▸</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-6">// TOOLBOX</div>
        <div className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <span key={t} className="px-3 sm:px-4 py-2 border border-border rounded-md font-mono text-xs tracking-wider bg-card">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-10 sm:mt-12">
          <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest glow hover:opacity-90 transition">
            Scope a project →
          </Link>
        </div>
      </section>


      <SiteFooter />
    </div>
  );
}
