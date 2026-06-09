import { KeyRound } from "lucide-react";

export default function AdminSeatsApi() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <KeyRound className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">API</h1>
      </div>
      <p className="text-muted-foreground">
        Manage API keys and usage across AI providers. Configure spend limits,
        smart routing, and escalation rules.
      </p>
      <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center text-sm text-muted-foreground">
        API tier management coming soon.
      </div>
    </div>
  );
}
