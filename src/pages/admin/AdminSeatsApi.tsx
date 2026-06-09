import { KeyRound } from "lucide-react";

export default function AdminSeatsApi() {
  return (
    <div className="space-y-6">
      <header>
        <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          <KeyRound className="h-3.5 w-3.5" />
          Seats / API
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">API Providers</h1>
        <p className="mt-1 max-w-2xl text-sm text-body">
          Manage API keys for AI providers like Anthropic, OpenAI, Cohere, and more.
        </p>
      </header>

      <section className="rounded-lg border border-border/30 bg-card/10 p-6 text-center">
        <KeyRound className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">
          API provider management coming soon.
        </p>
      </section>
    </div>
  );
}
