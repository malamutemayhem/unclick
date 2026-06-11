import { GlassCard } from "@/components/brand";
import { HeartPulse, ReceiptText, CalendarCheck, Flag, Brain } from "lucide-react";

/**
 * A simplified, truthful mock of the real Orchestrator "Today's running story":
 * a plain-English feed of the work your seats did - everyday wins, the proof
 * they left, a decision held for you, and the memory save. Latest first. Not a
 * chat (that is Boardroom); this is the running timeline that gives every seat
 * its context, hand in hand with memory.
 */
type Entry = {
  icon: typeof HeartPulse;
  tint: string;
  title: string;
  text: string;
  when: string;
};

const entries: Entry[] = [
  { icon: HeartPulse, tint: "text-[#52c08a]", title: "Checked in on your work", text: "All good right now. Nothing needs you.", when: "just now" },
  { icon: ReceiptText, tint: "text-[#61c1c4]", title: "Drafted your launch email", text: "Left a receipt showing it matched your brand and tone.", when: "4m ago" },
  { icon: CalendarCheck, tint: "text-[#86dadd]", title: "Booked the call and sent the invite", text: "Added it to your calendar, with the receipt saved.", when: "11m ago" },
  { icon: Flag, tint: "text-[#e7b14d]", title: "Paused a pricing change for you", text: "Nothing shipped. It noted why and left the call to you.", when: "16m ago" },
  { icon: Brain, tint: "text-[#86dadd]", title: "Saved today's summary to your memory", text: "So the next seat starts already knowing the story.", when: "22m ago" },
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
              <p className="mt-0.5 text-[13px] leading-relaxed text-body">{e.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-white/[0.06] pt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
        Every step saves to your memory, so the same story and full context show up on every device and seat you connect.
      </div>
    </GlassCard>
  );
}
