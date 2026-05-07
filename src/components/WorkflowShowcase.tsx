import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Item = {
  title: string;
  caption: string;
  src: string;
};

// Placeholder gradient SVGs as data URIs — replace with real screenshots later.
const placeholder = (label: string, hue: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='${hue}' stop-opacity='0.35'/>
          <stop offset='100%' stop-color='#000' stop-opacity='1'/>
        </linearGradient>
      </defs>
      <rect width='800' height='500' fill='#000'/>
      <rect width='800' height='500' fill='url(#g)'/>
      <g fill='none' stroke='${hue}' stroke-opacity='0.35'>
        <circle cx='400' cy='250' r='80'/>
        <circle cx='180' cy='150' r='40'/>
        <circle cx='620' cy='350' r='40'/>
        <line x1='220' y1='150' x2='360' y2='240'/>
        <line x1='440' y1='260' x2='580' y2='340'/>
      </g>
      <text x='40' y='460' font-family='monospace' font-size='14' fill='#9adfe6' opacity='0.7'>${label}</text>
    </svg>`
  )}`;

const ITEMS: Item[] = [
  { title: "Lead Capture Pipeline", caption: "Form → enrich → score → assign → notify in <2s.", src: placeholder("LEAD_CAPTURE.workflow", "#7fd3dd") },
  { title: "Appointment Engine", caption: "Calendly + GHL + reminders + no-show recovery.", src: placeholder("APPOINTMENTS.workflow", "#5fbac7") },
  { title: "AI Reply Bot", caption: "OpenAI-powered SMS/email auto-responder with handoff.", src: placeholder("AI_REPLY.workflow", "#7fd3dd") },
  { title: "Stripe → CRM Sync", caption: "Real-time payment events into pipelines & tags.", src: placeholder("STRIPE_SYNC.workflow", "#5fbac7") },
  { title: "Reactivation Sequence", caption: "Cold-list reactivation across SMS, email, voice drop.", src: placeholder("REACTIVATION.workflow", "#7fd3dd") },
  { title: "Reporting Dashboard", caption: "Live KPI snapshots delivered to Slack daily.", src: placeholder("REPORTING.workflow", "#5fbac7") },
];

export function WorkflowShowcase() {
  const [open, setOpen] = useState<Item | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-3">// WORKFLOW SHOWCASE</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Behind the automation.</h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            A look at the systems I've architected — from lead capture to AI-driven follow-up.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ITEMS.map((item) => (
          <button
            key={item.title}
            onClick={() => setOpen(item)}
            className="group glass relative overflow-hidden rounded-lg text-left hover-glow transition"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] text-primary/80">
                // 0{ITEMS.indexOf(item) + 1}
              </div>
            </div>
            <div className="p-5">
              <div className="text-base font-semibold tracking-tight">{item.title}</div>
              <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.caption}</div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl w-[95vw] glass border-primary/30 p-0 overflow-hidden">
          {open && (
            <div className="flex flex-col">
              <div className="relative bg-black">
                <img src={open.src} alt={open.title} className="w-full h-auto max-h-[75vh] object-contain" />
              </div>
              <div className="p-6 border-t border-border">
                <DialogTitle className="text-xl">{open.title}</DialogTitle>
                <DialogDescription className="mt-2">{open.caption}</DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
