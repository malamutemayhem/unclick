import { Cpu } from "lucide-react";

export default function AdminSeatsLocal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Cpu className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Local</h1>
      </div>
      <p className="text-muted-foreground">
        Run AI models on your own hardware. Detect local endpoints, manage
        installed models, and configure routing rules.
      </p>
      <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center text-sm text-muted-foreground">
        Local tier management coming soon.
      </div>
    </div>
  );
}
