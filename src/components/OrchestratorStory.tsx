import { GlassCard } from "@/components/brand";
import { HeartPulse, ReceiptText, Flag, Brain } from "lucide-react";

/**
 * A simplified, truthful mock of the real Orchestrator "Today's running story":
 * a plain-English feed of work receipts, proof, decisions, and memory saves,
 * latest first. Not a chat (that is Boardroom) - this is the running timeline.
 */
type Entry = {
  icon: typeof HeartPulse;
  tint: string;
  title: string;
  text?: string;
  when: string;
};

const entries: Entry[] = [
  { icon: HeartPulse, tint: "text-[#52c08a]", title: "Heartbeat checked the board", text: "All healthy. Nothing needs you.", when: "just now" },
  { icon: ReceiptText, tint: "text-[#61c1c4]", title: "Proof saved for the launch email", text: "A connected seat left the receipt.", when: "2m ago" },
  { icon: Flag, tint: "text-[#e7b14d]", title: "Pricing change flagged for you", text: "Saved so the next seat carries it forward.", when: "13m ago" },
  { icon: Brain, tint: "text-[#86dadd]", title: "Session summary saved to memory", when: "13m ago" },
];

export default function OrchestratorStory() {
  return (
    <GlassCard className="mx-auto max-w-lg p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-heading">Today's running story</h3>
        <span className="text-[11px] text-muted-foreground">latest first</span>
      </div>
      <div className="space-y-4">
        {entries.map((e, i) => (
          <div key={i} className="flex gap-3">
            <e.icon className={`mt-0.5 h-4 w-4 shrink-0 ${e.tint}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-heading">{e.title}</p>
                <span className="shrink-0 text-[11px] text-muted-foreground">{e.when}</span>
              </div>
              {e.text && <p className="mt-0.5 text-[13px] leading-relaxed text-body">{e.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-white/[0.06] pt-3 text-center text-[11px] text-muted-foreground">
        The same story shows on every device and seat you connect.
      </div>
    </GlassCard>
  );
}
