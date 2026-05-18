import { useCallback, useState } from "react";
import { Check, Copy, HeartPulse } from "lucide-react";

export const HEARTBEAT_CADENCE_OPTIONS = [
  { value: "1", label: "1 min", note: "High signal" },
  { value: "5", label: "5 min", note: "Fast loop" },
  { value: "7", label: "7 min", note: "Current" },
  { value: "10", label: "10 min", note: "Tight loop" },
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

export const DEFAULT_HEARTBEAT_CADENCE: HeartbeatCadenceValue = "7";

export const HEARTBEAT_CONNECTION_PROMPT =
  "Run UnClick Heartbeat as the scheduled heartbeat seat. Call heartbeat_protocol first. If commonsensepass_protocol is available, call it before any healthy, no_work, done, merge_ready, or PASS claim. Use session_id='unclick-heartbeat-seat'. Read Orchestrator, Boardroom, Jobs, dispatches, and signals before deciding. Do one safe useful heartbeat step only. Do not build, merge, edit code, assign ownership, or mark done outside the heartbeat policy. Use simple control-tower language. Reply only with PASS/BLOCKER when Chris needs to know; stay quiet for routine healthy checks.";

export const HEARTBEAT_SOURCE_OF_TRUTH = [
  {
    title: "1. Scheduler copy",
    body: "Copy the schedule text above into Codex or another AI platform. The cadence belongs in the scheduler.",
  },
  {
    title: "2. Live policy",
    body: "The full heartbeat playbook lives inside UnClick. The seat must fetch heartbeat_protocol every run.",
  },
  {
    title: "3. Green-claim guard",
    body: "CommonSensePass is the check before any healthy, no_work, done, merge_ready, quiet, or PASS claim.",
  },
  {
    title: "Keep only one local schedule",
    body: "Use the current 7 minute UnClick Heartbeat schedule. Old computer prompts should be replaced with the scheduler copy above.",
  },
] as const;

export function getHeartbeatCadenceLabel(value: HeartbeatCadenceValue): string {
  return HEARTBEAT_CADENCE_OPTIONS.find((option) => option.value === value)?.label ?? "7 min";
}

export function buildHeartbeatSchedulePrompt(cadence: HeartbeatCadenceValue): string {
  return `Schedule ❤️ UnClick Heartbeat every ${getHeartbeatCadenceLabel(cadence)}. ${HEARTBEAT_CONNECTION_PROMPT}`;
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
            The clean copy source for the one scheduled UnClick Heartbeat.
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
              Paste this into the scheduler. It is only a launcher; UnClick provides the full policy at runtime.
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
          <h2 className="text-sm font-semibold text-heading">Policy transparency</h2>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
            This is not copy-paste text. It explains why the small scheduler copy above is enough.
          </p>
        </div>
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
