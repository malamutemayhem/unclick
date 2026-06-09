import { CreditCard } from "lucide-react";

export default function AdminSeatsSubscription() {
  return (
    <div className="space-y-6">
      <header>
        <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          <CreditCard className="h-3.5 w-3.5" />
          Seats / Subscription
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">Subscriptions</h1>
        <p className="mt-1 max-w-2xl text-sm text-body">
          Manage your AI platform subscriptions - Claude Pro, ChatGPT Plus, Copilot, Cursor, Windsurf, and more.
        </p>
      </header>

      <section className="rounded-lg border border-border/30 bg-card/10 p-6 text-center">
        <CreditCard className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">
          Subscription management coming soon.
        </p>
      </section>
    </div>
  );
}
