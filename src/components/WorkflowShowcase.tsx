import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import wfLead from "@/assets/workflow-lead-qualification.jpg";
import wfAppt from "@/assets/workflow-appointment.jpg";
import wfFollow from "@/assets/workflow-followup.jpg";
import wfPipe from "@/assets/workflow-pipeline.jpg";
import wfOnboard from "@/assets/workflow-onboarding.jpg";
import wfBot from "@/assets/workflow-ai-bot.jpg";

type Item = {
  title: string;
  caption: string;
  description: string;
  src: string;
  tools: string[];
  metric: { label: string; value: string };
};

const ITEMS: Item[] = [
  {
    title: "AI Lead Qualification Workflow",
    caption: "Inbound leads scored, routed, and replied to in under 60 seconds.",
    description:
      "Form submissions are enriched and scored by an OpenAI-powered qualifier. Hot leads are routed to a sales rep with an instant SMS, while cold leads enter a long-term nurture sequence — fully hands-off.",
    src: wfLead,
    tools: ["GoHighLevel", "OpenAI", "Twilio"],
    metric: { label: "Avg. response time", value: "< 60s" },
  },
  {
    title: "Multi-Step Appointment Funnel",
    caption: "Calendar bookings, reminders, and no-show recovery on autopilot.",
    description:
      "A complete booking engine: confirmation email, 24h reminder, SMS nudge, and an automated no-show reactivation branch that re-engages prospects without manual touch.",
    src: wfAppt,
    tools: ["GoHighLevel", "Calendar", "SMS"],
    metric: { label: "No-show recovery", value: "32%" },
  },
  {
    title: "Automated Follow-Up System",
    caption: "Multi-channel nurture across SMS and email with reply detection.",
    description:
      "A 7-day follow-up sequence that adapts in real time. If a lead replies, they're tagged Engaged and routed to a human; if not, they continue the sequence with escalating value.",
    src: wfFollow,
    tools: ["GoHighLevel", "Email", "SMS"],
    metric: { label: "Reply lift", value: "+47%" },
  },
  {
    title: "CRM Pipeline Automation",
    caption: "Live opportunity pipeline with automatic stage progression.",
    description:
      "A self-managing pipeline where deals move based on triggers — payment received, proposal opened, call booked. Sales managers see real-time value and conversion without manual data entry.",
    src: wfPipe,
    tools: ["GoHighLevel", "Stripe", "Zapier"],
    metric: { label: "Manual entry saved", value: "12 hrs/wk" },
  },
  {
    title: "SaaS Client Onboarding Workflow",
    caption: "From Stripe payment to fully onboarded client — zero manual steps.",
    description:
      "Triggered the moment a payment lands: provisions a sub-account, sends credentials, schedules a kickoff call, and drips out training resources over the first week.",
    src: wfOnboard,
    tools: ["Stripe", "GoHighLevel", "Make"],
    metric: { label: "Onboarding time", value: "8 min" },
  },
  {
    title: "AI Conversation Bot",
    caption: "GPT-4 powered SMS bot that books, answers, and hands off intelligently.",
    description:
      "An always-on conversation engine that handles inbound SMS, classifies intent, books appointments directly into the calendar, and seamlessly hands off to a human when needed.",
    src: wfBot,
    tools: ["OpenAI", "GoHighLevel", "Twilio"],
    metric: { label: "Auto-handled", value: "78%" },
  },
];

export function WorkflowShowcase() {
  const [open, setOpen] = useState<Item | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-3">// WORKFLOW SHOWCASE</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Real systems. Real results.</h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            A look inside the GoHighLevel workflows, AI bots, and CRM pipelines I've architected for clients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ITEMS.map((item, i) => (
          <button
            key={item.title}
            onClick={() => setOpen(item)}
            className="group glass relative overflow-hidden rounded-lg text-left transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover-glow"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img
                src={item.src}
                alt={item.title}
                width={1280}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] text-primary/90 bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                // 0{i + 1}
              </div>
              <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.25em] text-primary/90 bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                {item.metric.value}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <div className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {item.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.caption}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded border border-border/60 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary/80 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-6xl w-[95vw] glass border-primary/30 p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
          {open && (
            <div className="flex flex-col">
              <div className="relative bg-black">
                <img
                  src={open.src}
                  alt={open.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] text-primary bg-black/50 backdrop-blur px-3 py-1.5 rounded">
                  // GOHIGHLEVEL WORKFLOW
                </div>
              </div>
              <div className="p-6 md:p-8 border-t border-border space-y-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <DialogTitle className="text-2xl">{open.title}</DialogTitle>
                    <DialogDescription className="text-base">{open.caption}</DialogDescription>
                  </div>
                  <div className="shrink-0 glass rounded-md px-4 py-3 border border-primary/20">
                    <div className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
                      {open.metric.label}
                    </div>
                    <div className="text-xl font-semibold text-primary mt-1">{open.metric.value}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{open.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-primary self-center mr-2">
                    // STACK
                  </div>
                  {open.tools.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded border border-primary/30 text-primary bg-primary/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
