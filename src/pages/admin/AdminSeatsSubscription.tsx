import { CreditCard } from "lucide-react";

export default function AdminSeatsSubscription() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Subscription</h1>
      </div>
      <p className="text-muted-foreground">
        Manage AI platform subscriptions you already pay for. Connect Claude Pro,
        ChatGPT Plus, Cursor, Windsurf, and Copilot.
      </p>
      <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center text-sm text-muted-foreground">
        Subscription tier management coming soon.
      </div>
    </div>
  );
}
