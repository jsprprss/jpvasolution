import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Jasper Presas" },
      { name: "description", content: "Get in touch to scope a GoHighLevel build or automation project." },
    ],
  }),
});

const channels = [
  { label: "EMAIL", value: "jsprprss@gmail.com", href: "mailto:jsprprss@gmail.com" },
  { label: "PHONE", value: "+63 927 773 7399", href: "tel:+639277737399" },
  { label: "LOCATION", value: "Laguna, Philippines" },
  { label: "BOOKING", value: "Calendly link — coming soon" },
];

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
        <div className="mx-auto max-w-5xl px-6 py-24 relative">
          <div className="font-mono text-[11px] tracking-[0.3em] text-primary mb-4">// CONTACT / 05</div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Let's build your <span className="text-gradient">growth engine.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Send a quick note about your business and what you'd like automated. I reply within one business day.
          </p>

          <div className="mt-16 grid md:grid-cols-2 gap-px bg-border border border-border">
            {channels.map((c) => {
              const Inner = (
                <div className="bg-card p-6 h-full hover:bg-secondary/40 transition">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">{c.label}</div>
                  <div className="text-lg mt-2 font-medium">{c.value}</div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href}>{Inner}</a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}
          </div>

          <form
            action="mailto:jsprprss@gmail.com"
            method="post"
            encType="text/plain"
            className="mt-16 grid gap-5 border border-border rounded-md bg-card p-8"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Name" name="name" />
              <Field label="Email" name="email" type="email" />
            </div>
            <Field label="Business / Website" name="business" />
            <div>
              <Label>Project</Label>
              <textarea name="message" rows={5} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="Tell me about what you want to automate…" />
            </div>
            <button type="submit" className="justify-self-start inline-flex items-center gap-3 px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest glow hover:opacity-90 transition">
              Send inquiry →
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-2">{children}</div>;
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input type={type} name={name} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary" />
    </div>
  );
}
