import { ChevronLeft, ChevronRight } from "lucide-react";

// Explains the directional handshake pill. Static, presentational only.
const ITEMS = [
  {
    title: "Nothing shared",
    render: () => (
      <span className="inline-flex h-6 w-[60px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
      </span>
    ),
  },
  {
    title: "You sharing out",
    render: () => (
      <span className="inline-flex h-6 w-[60px] items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-1">
        <ChevronLeft className="h-3 w-3 text-muted-foreground/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
        <ChevronRight className="h-3 w-3 text-amber-300" />
      </span>
    ),
  },
  {
    title: "They are requesting",
    render: () => (
      <span className="inline-flex h-6 w-[60px] items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-1">
        <ChevronLeft className="h-3 w-3 text-sky-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
        <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
      </span>
    ),
  },
  {
    title: "Two-way handshake",
    render: () => (
      <span className="inline-flex h-6 w-[60px] items-center justify-between rounded-full border border-emerald-400/60 bg-emerald-400/10 px-1 shadow-[0_0_10px_-2px_rgba(52,211,153,0.6)]">
        <ChevronLeft className="h-3 w-3 text-emerald-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
        <ChevronRight className="h-3 w-3 text-emerald-300" />
      </span>
    ),
  },
];

export function ShareLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border border-white/10 bg-card/40 p-4">
      {ITEMS.map((item) => (
        <div key={item.title} className="flex items-center gap-2">
          {item.render()}
          <span className="text-xs text-muted-foreground">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
