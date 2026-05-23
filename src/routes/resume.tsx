import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
  head: () => ({
    meta: [
      { title: "Resume — Jasper Presas" },
      { name: "description", content: "Resume of Jasper Presas — GoHighLevel Specialist & Automation Expert." },
    ],
  }),
});

const skills = {
  CRM: ["GoHighLevel (SaaS Mode)", "Pipelines & Snapshots", "Memberships", "Whitelabel"],
  Automation: ["Zapier", "Make.com", "n8n", "Native GHL Workflows", "Webhooks / REST APIs"],
  AI: ["OpenAI / GPT", "AI SMS & Chat Agents", "Voice AI Routing", "Prompt Engineering"],
  Adjacent: ["Twilio", "Stripe", "Calendly", "Airtable", "Slack", "Supabase"],
};

const experience = [
  {
    role: "GoHighLevel Specialist & Automation Expert",
    org: "Independent / Freelance",
    period: "Present",
    bullets: [
      "Design and ship full GoHighLevel implementations for businesses across industries.",
      "Build multi-tool automation stacks combining GHL, Zapier, Make, and AI agents.",
      "Architect lead capture, nurture, and reactivation systems with measurable lift.",
    ],
  },
];

function ResumePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-3">// RESUME / 04</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">Jasper Presas</h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">GoHighLevel Specialist & Automation Expert</p>
          </div>
          <button onClick={() => window.print()} className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition">
            Print / PDF
          </button>
        </div>


        <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
          <div className="bg-card p-5">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">EMAIL</div>
            <div className="text-sm mt-1 break-words">jsprprss@gmail.com</div>
          </div>
          <div className="bg-card p-5">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">PHONE</div>
            <div className="text-sm mt-1">+63 927 773 7399</div>
          </div>
          <div className="bg-card p-5">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">LOCATION</div>
            <div className="text-sm mt-1">Laguna, Philippines</div>
          </div>
        </div>


        {/* SUMMARY */}
        <div className="mt-16">
          <SectionHeader code="01" label="Summary" />
          <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
            Experienced GoHighLevel specialist and automation expert. I build CRM, marketing,
            and AI systems that turn manual operations into reliable, scalable revenue
            machines for businesses of any size.
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-16">
          <SectionHeader code="02" label="Experience" />
          <div className="space-y-8">
            {experience.map((e) => (
              <div key={e.role} className="border border-border rounded-md bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <span className="font-mono text-[11px] tracking-[0.3em] text-primary">{e.period}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{e.org}</div>
                <ul className="mt-4 space-y-2">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-muted-foreground"><span className="text-primary mt-1">▸</span>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-16">
          <SectionHeader code="03" label="Skills & Stack" />
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="bg-card p-6">
                <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-3">{cat.toUpperCase()}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono border border-border rounded">{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div className="mt-16">
          <SectionHeader code="04" label="Core Services" />
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            {["GoHighLevel Build-Outs", "Automation Architecture", "AI Integrations", "Funnels & Booking Systems", "Email & SMS Campaigns", "Dashboards & SOPs"].map((s) => (
              <li key={s} className="flex gap-3 border border-border rounded-md bg-card p-3"><span className="text-primary">▸</span>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionHeader({ code, label }: { code: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[11px] tracking-[0.3em] text-primary">{code}</span>
      <h2 className="text-2xl font-semibold">{label}</h2>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}
