import { GlassCard } from "@/components/brand";

/**
 * A tiny, apple-clean mock of one running conversation that follows you across
 * devices and teammates. Shows the Orchestrator idea in its simplest form:
 * one thread, same context, any device, shared with your team.
 */
type Bubble = { who: string; text: string; me?: boolean };
type Row = Bubble | { divider: string };

const thread: Row[] = [
  { who: "You · Laptop", text: "Plan the product launch.", me: true },
  { who: "UnClick", text: "On it. I'll keep this thread as we go." },
  { divider: "later, on your phone" },
  { who: "You · Phone", text: "Add a pricing section.", me: true },
  { divider: "your teammate, same account" },
  { who: "Sam", text: "Looks great. Picking it up from here." },
];

export default function OrchestratorThread() {
  return (
    <GlassCard className="mx-auto max-w-md p-5 sm:p-6">
      <div className="space-y-4">
        {thread.map((row, i) =>
          "divider" in row ? (
            <div key={i} className="flex items-center gap-3 py-0.5">
              <span className="h-px flex-1 bg-[#86dadd]/15" />
              <span className="whitespace-nowrap text-[10.5px] uppercase tracking-wider text-muted-foreground">
                {row.divider}
              </span>
              <span className="h-px flex-1 bg-[#86dadd]/15" />
            </div>
          ) : (
            <div key={i} className={`flex flex-col ${row.me ? "items-end" : "items-start"}`}>
              <span className="mb-1 px-1 text-[11px] text-muted-foreground">{row.who}</span>
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  row.me
                    ? "rounded-br-sm bg-primary/15 text-heading"
                    : "rounded-bl-sm border border-white/[0.06] bg-white/[0.05] text-body"
                }`}
              >
                {row.text}
              </div>
            </div>
          ),
        )}
      </div>
    </GlassCard>
  );
}
