import { useCallback, useState } from "react";
import { Check, Copy, HeartPulse } from "lucide-react";

export const HEARTBEAT_CADENCE_OPTIONS = [
  { value: "1", label: "1 min", note: "High signal" },
  { value: "5", label: "5 min", note: "Fast loop" },
  { value: "7", label: "7 min", note: "Legacy" },
  { value: "10", label: "10 min", note: "Current" },
  { value: "15", label: "15 min", note: "Balanced" },
  { value: "30", label: "30 min", note: "Balanced" },
  { value: "60", label: "1 hour", note: "Light" },
  { value: "120", label: "2 hours", note: "Quiet" },
  { value: "240", label: "4 hours", note: "Low touch" },
  { value: "360", label: "6 hours", note: "Low touch" },
  { value: "720", label: "12 hours", note: "Daily checks" },
  { value: "1440", label: "24 hours", note: "Daily" },
  { value: "2880", label: "48 hours", note: "Sparse" },
] as const;

export type HeartbeatCadenceValue = (typeof HEARTBEAT_CADENCE_OPTIONS)[number]["value"];

export const DEFAULT_HEARTBEAT_CADENCE: HeartbeatCadenceValue = "10";

export const HEARTBEAT_MASTER_URL = "https://unclick.world/admin/agents/heartbeat";

export const HEARTBEAT_SHORTCUT_PROMPT =
  `Load MASTER from ${HEARTBEAT_MASTER_URL}, then run one safe Fleet Action Runner step with proof. Use session_id='unclick-builder-tether-seat'.`;

export const HEARTBEAT_MASTER_PROMPT = `MASTER: UnClick Action Heartbeat

Role:
Run as the UnClick Action Heartbeat builder-capable tether. This is not the old read-only watcher. Each wake should move one highest-value safe step with proof.

Induction:
You are entering the UnClick Bubble. Fresh state beats pasted chat. Save or confirm the wake turn, load Memory, then read Orchestrator, Boardroom, Jobs, dispatches, and signals before deciding. Boardroom Jobs are the work source. Orchestrator is context, not queue authority.

One safe step:
Pick one bounded step only. Allowed step types include build, patch, test, proof refresh, route, narrow ScopePack, CI fix, false-DONE repair, or blocker proof. Check the last 30 minutes for a fresh ACK, claim, HOLD, blocker, or proof on the exact slice before editing or waking anyone.

Nudge handoff:
NudgeOnly is not the executor. If nudgeonly_receipt_bridge returns receipt_request or escalation_request, do not stop there. Continue through IgniteOnly for a verified wake packet, PushOnly for the worker envelope, then let the Action Heartbeat or builder tether do one safe runnable step, or post BLOCKER with the exact missing executor gate.

Active chat build capture:
When Chris is already in a live Chat/subscription LLM seat and the build context is fresh, prefer getting that active seat to code or fit the change immediately. Capture the build into repo code, a draft PR, or a scoped handoff quickly. Do not leave fresh build context for later heartbeat recovery if the active seat can safely act now.

SeatRelay priority:
Treat SeatRelay as high priority when choosing between safe queue slices because stale worker issues are recurring. Favor fixes that reduce stale owners, stale HOLD loops, unclear reassignment, and weak handoff.

Proof:
Do not claim DONE, healthy, no_work, merge_ready, or PASS without current proof. Code work needs PR, commit, test, or explicit NO_CODE_NEEDED proof. UI work needs screenshot proof. Final receipts must say what moved, proof id/link/test/screenshot, and the next step.

Chat output budget:
Keep the thread tiny. Save exact proof in Boardroom comments, PR comments, session summaries, and conversation receipts. In the heartbeat reply, use one short line only: PASS, BLOCKER, or HOLD plus the plain reason and one proof pointer. Do not paste receipt lists, Orchestrator timestamps, check rollups, or full PR metadata into chat unless Chris asks.

Safety:
Protected surfaces are secrets, billing, DNS, production deploy, destructive data actions, force push, hard reset, and overriding another worker. Stop for a human decision when those appear.

Lane rule:
JobSmith is a separate CV and cover-letter tool. Do not couple JobSmith product work into AutoPilot or heartbeat automation.

Chris updates:
Use simple control-tower language. Notify Chris only for a real decision, access need, safety risk, or meaningful blocker. Stay quiet for routine safe progress.`;

export const HEARTBEAT_SOURCE_OF_TRUTH = [
  {
    title: "1. Shortcut prompt",
    body: "Copy only the short launcher above into Codex or another AI platform. It points seats back to this page.",
  },
  {
    title: "2. MASTER induction",
    body: "The longer seat induction lives below. Update it here once and every shortcut seat reads the new policy.",
  },
  {
    title: "3. Action runner",
    body: "The heartbeat is builder-capable. Each wake should do one safe useful step with proof.",
  },
  {
    title: "4. Proof guard",
    body: "No DONE, healthy, no_work, merge_ready, or PASS claim without fresh proof.",
  },
] as const;

export function getHeartbeatCadenceLabel(value: HeartbeatCadenceValue): string {
  return HEARTBEAT_CADENCE_OPTIONS.find((option) => option.value === value)?.label ?? "7 min";
}

export function buildHeartbeatSchedulePrompt(cadence: HeartbeatCadenceValue): string {
  return `Schedule ❤️ UnClick Action Heartbeat every ${getHeartbeatCadenceLabel(cadence)}. ${HEARTBEAT_SHORTCUT_PROMPT}`;
}

export default function AdminSeatHeartbeatPage() {
  const [copied, setCopied] = useState(false);
  const [cadence, setCadence] = useState<HeartbeatCadenceValue>(DEFAULT_HEARTBEAT_CADENCE);
  const schedulePrompt = buildHeartbeatSchedulePrompt(cadence);
  const selectedCadence = HEARTBEAT_CADENCE_OPTIONS.find((option) => option.value === cadence);

  const copyConnectionPrompt = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    void navigator.clipboard.writeText(schedulePrompt).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [schedulePrompt]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
            <HeartPulse className="h-3.5 w-3.5" />
            Seats
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Heartbeat Master</h1>
          <p className="mt-1 max-w-2xl text-sm text-body">
            Short launcher up top. Full seat induction below.
          </p>
        </div>
      </header>

      <section className="space-y-4 rounded-lg border border-primary/25 bg-primary/10 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-background/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              <HeartPulse className="h-3.5 w-3.5" />
              ❤️ UnClick Heartbeat
            </div>
            <h2 className="mt-3 text-lg font-semibold text-heading">Schedule copy</h2>
            <p className="mt-1 max-w-2xl text-sm text-body">
              Paste this into the scheduler. It stays short because the MASTER lives on this page.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[minmax(160px,220px)_auto] sm:items-end">
            <label className="text-sm font-semibold text-heading" htmlFor="heartbeat-cadence">
              Cadence
              <select
                id="heartbeat-cadence"
                aria-label="Heartbeat cadence"
                value={cadence}
                onChange={(event) => setCadence(event.target.value as HeartbeatCadenceValue)}
                className="mt-1 block w-full rounded-md border border-border/40 bg-background px-3 py-2 text-sm text-body outline-none focus:border-primary/50"
              >
                {HEARTBEAT_CADENCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                    {option.note ? `, ${option.note}` : ""}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={copyConnectionPrompt}
              title="Copy schedule message"
              aria-label="Copy schedule message"
              className="inline-flex h-10 w-fit items-center gap-1.5 rounded-md border border-primary/30 bg-primary/15 px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <textarea
          id="heartbeat-schedule-prompt"
          aria-label="Heartbeat schedule message preview"
          readOnly
          value={schedulePrompt}
          rows={4}
          className="w-full resize-none rounded-md border border-border/40 bg-black/20 px-3 py-2 font-mono text-xs leading-5 text-body outline-none focus:border-primary/40"
        />

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-border/40 bg-card/30 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cadence</p>
            <p className="mt-1 text-sm font-semibold text-heading">{selectedCadence?.label}</p>
          </div>
          <div className="rounded-md border border-border/40 bg-card/30 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Proof</p>
            <p className="mt-1 text-sm font-semibold text-heading">One receipt per run</p>
          </div>
          <div className="rounded-md border border-border/40 bg-card/30 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Safety</p>
            <p className="mt-1 text-sm font-semibold text-heading">No secrets in copy</p>
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-md border border-border/30 bg-card/10 p-3">
        <div>
          <h2 className="text-sm font-semibold text-heading">MASTER induction</h2>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
            This is the runtime policy an AI seat reads after the shortcut opens the door.
          </p>
        </div>
        <textarea
          aria-label="Heartbeat MASTER induction"
          readOnly
          value={HEARTBEAT_MASTER_PROMPT}
          rows={10}
          className="w-full resize-none rounded-md border border-border/30 bg-black/20 px-3 py-2 font-mono text-xs leading-5 text-body outline-none focus:border-primary/40"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {HEARTBEAT_SOURCE_OF_TRUTH.map((item) => (
            <div key={item.title} className="rounded-md border border-border/30 bg-background/30 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
