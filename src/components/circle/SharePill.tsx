import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { derivePillState, isTwoWay, type PermissionState } from "@/lib/circle/share";

// The directional handshake pill. One control per (person, resource):
//   - right arrow ">"  = give: you share yours out to them.
//   - left arrow  "<"  = receive: you take theirs in.
//   - both active      = the two-way handshake (the pill glows green).
// You only ever control your own two levers here; the other person completes
// the handshake from their own Circle. A side is "pending" while it waits on
// the other party (your "Waiting for them").

type SideTone = {
  off: string;
  pending: string;
  active: string;
};

const RECEIVE_TONE: SideTone = {
  off: "text-muted-foreground/40",
  pending: "text-sky-300",
  active: "text-emerald-300",
};

const GIVE_TONE: SideTone = {
  off: "text-muted-foreground/40",
  pending: "text-amber-300",
  active: "text-emerald-300",
};

export interface SharePillProps {
  state: PermissionState | undefined;
  busy?: boolean;
  disabled?: boolean;
  onToggle: (direction: "give" | "receive") => void;
  label?: string;
}

export function SharePill({ state, busy = false, disabled = false, onToggle, label }: SharePillProps) {
  const pill = derivePillState(state);
  const twoWay = isTwoWay(pill);

  if (disabled) {
    return (
      <div
        className="inline-flex h-7 w-[68px] items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02]"
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/25" />
      </div>
    );
  }

  return (
    <div
      className={[
        "relative inline-flex h-7 w-[68px] items-center justify-between rounded-full border px-1 transition-colors",
        twoWay
          ? "border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_10px_-2px_rgba(52,211,153,0.6)]"
          : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        disabled={busy}
        onClick={() => onToggle("receive")}
        className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-white/5 disabled:opacity-50"
        aria-label={`Receive: ${pill.receive}`}
        title="Receive theirs"
      >
        <ChevronLeft className={`h-3.5 w-3.5 ${RECEIVE_TONE[pill.receive]}`} />
      </button>

      {busy ? (
        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
      ) : (
        <span
          className={[
            "h-1.5 w-1.5 rounded-full transition-colors",
            twoWay ? "bg-emerald-300" : pill.give !== "off" || pill.receive !== "off" ? "bg-primary/70" : "bg-muted-foreground/30",
          ].join(" ")}
        />
      )}

      <button
        type="button"
        disabled={busy}
        onClick={() => onToggle("give")}
        className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-white/5 disabled:opacity-50"
        aria-label={`Give: ${pill.give}`}
        title="Share yours"
      >
        <ChevronRight className={`h-3.5 w-3.5 ${GIVE_TONE[pill.give]}`} />
      </button>
    </div>
  );
}
