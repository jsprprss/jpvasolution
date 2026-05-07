import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "./Reveal";
import {
  Layers,
  Workflow,
  Brain,
  LayoutTemplate,
  Mail,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Capability = {
  code: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  detail: string;
  tools: string[];
  process: string[];
  benefits: string[];
};

const capabilities: Capability[] = [
  {
    code: "01",
    title: "GoHighLevel Build-Outs",
    desc: "Sub-accounts, snapshots, pipelines, calendars, and SaaS configuration engineered for scale.",
    icon: Layers,
    detail:
      "End-to-end GoHighLevel setup tailored to your business model — agency, SaaS, or in-house. Every sub-account is structured for clean reporting, fast onboarding, and zero technical debt.",
    tools: ["GoHighLevel", "Stripe", "Twilio", "Mailgun", "Calendly"],
    process: [
      "Audit business model & goals",
      "Map pipelines, calendars & products",
      "Build snapshot with reusable assets",
      "Configure billing, SMS & email",
      "Deliver SOPs and team training",
    ],
    benefits: [
      "Launch in days, not months",
      "Reusable snapshot for every client",
      "Predictable revenue infrastructure",
    ],
  },
  {
    code: "02",
    title: "Automation Architecture",
    desc: "Multi-step workflows across Zapier, Make, and native GHL — connecting every tool you run.",
    icon: Workflow,
    detail:
      "Custom automations that move data and decisions across your stack — silently, reliably, and at scale. From lead routing to invoicing to internal ops.",
    tools: ["Zapier", "Make.com", "GHL Workflows", "Webhooks", "Google Sheets"],
    process: [
      "Map current manual processes",
      "Design event-driven workflow graph",
      "Implement with error handling & retries",
      "Add monitoring & alerts",
      "Document for team handoff",
    ],
    benefits: [
      "Eliminate repetitive manual work",
      "Faster lead response times",
      "Fewer dropped customers",
    ],
  },
  {
    code: "03",
    title: "AI Integrations",
    desc: "AI receptionists, lead qualifiers, and content engines wired into your CRM and conversations.",
    icon: Brain,
    detail:
      "Production-grade AI agents that book calls, qualify leads, summarize conversations, and personalize outreach — embedded directly into your GoHighLevel pipelines.",
    tools: ["OpenAI", "Anthropic", "GHL Conversations AI", "Vector DBs", "Custom APIs"],
    process: [
      "Define agent goals & guardrails",
      "Build prompts, tools & memory",
      "Connect to CRM context",
      "Test against real conversations",
      "Deploy with feedback loop",
    ],
    benefits: [
      "24/7 instant lead engagement",
      "Higher show & close rates",
      "Reduced cost per qualified lead",
    ],
  },
  {
    code: "04",
    title: "Funnels & Sites",
    desc: "High-converting funnels, websites, and booking flows built natively in HighLevel.",
    icon: LayoutTemplate,
    detail:
      "Conversion-first design built natively in HighLevel — fast to ship, easy to iterate, and wired into your CRM and tracking from day one.",
    tools: ["GHL Funnels", "GHL Sites", "Forms", "Surveys", "Booking Calendars"],
    process: [
      "Define offer & target segment",
      "Wireframe high-intent flow",
      "Design & build in HighLevel",
      "Wire analytics & A/B test",
      "Optimize against live data",
    ],
    benefits: [
      "Native CRM tracking",
      "Faster iteration cycles",
      "Higher booking conversion",
    ],
  },
  {
    code: "05",
    title: "Email & SMS Systems",
    desc: "Reactivation, nurture, and sales sequences with deliverability dialed in.",
    icon: Mail,
    detail:
      "Engineered messaging systems — domain warm-up, segmentation, sequences, and compliance — built so the right message reaches the right contact at the right moment.",
    tools: ["GHL Email", "Mailgun", "Twilio SMS", "DKIM/SPF/DMARC", "Segments"],
    process: [
      "Audit list health & deliverability",
      "Configure domains & authentication",
      "Build segmented sequences",
      "Test, send, monitor reputation",
      "Iterate on engagement data",
    ],
    benefits: [
      "Higher inbox placement",
      "More replies and bookings",
      "Reactivated dormant revenue",
    ],
  },
  {
    code: "06",
    title: "Reporting & Ops",
    desc: "Dashboards, attribution, and SOPs so the system runs without you.",
    icon: BarChart3,
    detail:
      "Operational clarity layered over your CRM — dashboards, attribution, and documented SOPs so the right people see the right numbers and the system runs cleanly without daily firefighting.",
    tools: ["GHL Dashboards", "Looker Studio", "Notion SOPs", "Slack Alerts"],
    process: [
      "Define key metrics & owners",
      "Build dashboards & alerts",
      "Document SOPs & playbooks",
      "Train the team",
      "Quarterly review & refine",
    ],
    benefits: [
      "Clear visibility into pipeline",
      "Confident, faster decisions",
      "Operations independent of founder",
    ],
  },
];

export function CapabilitiesGrid() {
  const [active, setActive] = useState<Capability | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
        {capabilities.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.code} delay={i * 70}>
              <button
                onClick={() => setActive(s)}
                className="relative w-full text-left bg-card p-8 group transition-all duration-500 hover:bg-card/60 h-full overflow-hidden focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--cyan) 10%, transparent), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-primary">{s.code}</span>
                  <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="relative text-xl font-semibold mb-3">{s.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="relative mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">
                  EXPLORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-700" />
              </button>
            </Reveal>
          );
        })}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          className="max-w-3xl p-0 overflow-hidden border-border bg-card/80 backdrop-blur-2xl"
        >
          {active && (
            <div className="relative">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_var(--cyan)_0%,_transparent_60%)] opacity-15 blur-3xl pointer-events-none" />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-primary mb-4">
                  <span>// CAPABILITY</span>
                  <span className="text-muted-foreground">{active.code}</span>
                </div>

                <DialogTitle className="text-3xl md:text-4xl font-semibold tracking-tight">
                  {active.title}
                </DialogTitle>

                <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">{active.detail}</p>

                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-3">// PROCESS</div>
                    <ol className="space-y-2 text-sm">
                      {active.process.map((p, i) => (
                        <li key={p} className="flex gap-3 text-muted-foreground">
                          <span className="font-mono text-primary/70 text-xs pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-3">// BENEFITS</div>
                      <ul className="space-y-2 text-sm">
                        {active.benefits.map((b) => (
                          <li key={b} className="flex gap-3 text-muted-foreground">
                            <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-3">// TOOLS</div>
                      <div className="flex flex-wrap gap-2">
                        {active.tools.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-[11px] font-mono tracking-wider rounded border border-border text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-3 pt-6 border-t border-border">
                  <Link
                    to="/contact"
                    onClick={() => setActive(null)}
                    className="ripple inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-widest hover:opacity-90 transition"
                  >
                    Start a project <ArrowRight size={12} />
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-mono text-[11px] uppercase tracking-widest hover:border-primary hover:text-primary transition"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
