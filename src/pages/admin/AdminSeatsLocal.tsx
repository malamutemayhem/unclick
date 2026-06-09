import { HardDrive } from "lucide-react";

export default function AdminSeatsLocal() {
  return (
    <div className="space-y-6">
      <header>
        <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          <HardDrive className="h-3.5 w-3.5" />
          Seats / Local
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">Local Models</h1>
        <p className="mt-1 max-w-2xl text-sm text-body">
          Run AI models on your own hardware. Nothing leaves the perimeter.
        </p>
      </header>

      <section className="rounded-lg border border-border/30 bg-card/10 p-6 text-center">
        <HardDrive className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">
          Local model management coming soon.
        </p>
      </section>
    </div>
  );
}
