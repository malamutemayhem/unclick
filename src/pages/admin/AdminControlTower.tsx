import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCopy,
  ListTodo,
  Loader2,
  RefreshCw,
  ShieldCheck,
  TowerControl,
  Users,
} from "lucide-react";
import { useSession } from "@/lib/auth";
import {
  claimControlTowerLane,
  createControlTowerPlan,
  type ControlTowerJobBoardItem,
  type ControlTowerLane,
} from "@/lib/controltower";

interface BoardroomTodoRow {
  id?: unknown;
  title?: unknown;
  description?: unknown;
  status?: unknown;
  priority?: unknown;
  assigned_to_agent_id?: unknown;
  updated_at?: unknown;
  proof_state?: unknown;
  release_blocked?: unknown;
}

interface BoardroomProfileRow {
  agent_id?: unknown;
}

const DEFAULT_PROMPT =
  "Continue active ControlTower jobs across Boardroom Jobs. Build the big job through lanes, proof, XPass, and Crews Council when judgment is needed.";
const CONTROLTOWER_READ_AGENT_ID = "controltower-ui";
const PRIORITY_VALUES = new Set(["low", "normal", "high", "urgent"]);
const STATUS_VALUES = new Set(["open", "in_progress", "done", "dropped"]);

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toControlTowerJob(row: BoardroomTodoRow): ControlTowerJobBoardItem | null {
  const id = readString(row.id);
  const title = readString(row.title);
  if (!id || !title) return null;

  const statusText = readString(row.status) ?? "open";
  const priorityText = readString(row.priority) ?? "normal";

  return {
    id,
    title,
    description: readString(row.description),
    status: STATUS_VALUES.has(statusText) ? (statusText as ControlTowerJobBoardItem["status"]) : "open",
    priority: PRIORITY_VALUES.has(priorityText) ? (priorityText as ControlTowerJobBoardItem["priority"]) : "normal",
    assignedTo: readString(row.assigned_to_agent_id),
    updatedAt: readString(row.updated_at),
    proofState: readString(row.proof_state),
    releaseBlocked: row.release_blocked === true,
  };
}

function StatTile({ label, value, tone = "neutral" }: { label: string; value: number | string; tone?: "neutral" | "good" | "warn" | "bad" }) {
  const toneClass =
    tone === "good"
      ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
      : tone === "warn"
        ? "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#F6D778]"
        : tone === "bad"
          ? "border-red-300/25 bg-red-500/10 text-red-100"
          : "border-white/10 bg-white/[0.035] text-white";

  return (
    <div className={`rounded-lg border px-4 py-3 ${toneClass}`}>
      <div className="text-2xl font-semibold leading-none">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.08em] text-white/50">{label}</div>
    </div>
  );
}

function LaneStatusPill({ status }: { status: ControlTowerLane["status"] }) {
  const className =
    status === "done"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : status === "blocked"
        ? "border-red-300/30 bg-red-500/10 text-red-200"
        : status === "stale"
          ? "border-[#E2B93B]/35 bg-[#E2B93B]/10 text-[#F6D778]"
          : status === "claimed" || status === "in_progress"
            ? "border-sky-300/30 bg-sky-400/10 text-sky-200"
            : "border-white/10 bg-white/[0.035] text-white/60";

  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${className}`}>
      {status.replace("_", " ")}
    </span>
  );
}

function LaneRow({ lane, index }: { lane: ControlTowerLane; index: number }) {
  return (
    <article className="grid gap-3 border-b border-white/[0.06] px-4 py-4 last:border-b-0 md:grid-cols-[54px_minmax(220px,1fr)_120px_minmax(190px,0.8fr)] md:items-start">
      <div className="text-sm font-semibold text-white/45">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-white">{lane.title}</h3>
          <LaneStatusPill status={lane.status} />
        </div>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-white/62">{lane.summary}</p>
        <p className="mt-2 text-xs text-white/42">Proof: {lane.proofNeeded}</p>
      </div>
      <div className="text-xs uppercase tracking-[0.08em] text-white/45">{lane.role}</div>
      <div className="space-y-1 text-xs text-white/55">
        <div>{lane.source === "job_board" ? "Boardroom Jobs" : lane.source === "paste_intake" ? "Paste intake" : "Control Tower"}</div>
        {lane.workerLabel && <div>Worker: {lane.workerLabel}</div>}
        {lane.sourceJobId && <div>Job: {lane.sourceJobId}</div>}
      </div>
    </article>
  );
}

export default function AdminControlTower() {
  const { session } = useSession();
  const token = session?.access_token;
  const authHeader = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [pasteText, setPasteText] = useState("");
  const [jobs, setJobs] = useState<ControlTowerJobBoardItem[]>([]);
  const [claimedAgentId, setClaimedAgentId] = useState<string | null>(null);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobError, setJobError] = useState<string | null>(null);
  const [lastProcessedAt, setLastProcessedAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const jobsReadAgentId = token ? (claimedAgentId ?? CONTROLTOWER_READ_AGENT_ID) : null;

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function claimProfile() {
      try {
        const response = await fetch("/api/memory-admin?action=fishbowl_admin_claim", {
          method: "POST",
          headers: { ...authHeader, "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const body = (await response.json().catch(() => ({}))) as { profile?: BoardroomProfileRow };
        const agentId = readString(body.profile?.agent_id);
        if (!cancelled) setClaimedAgentId(agentId ?? CONTROLTOWER_READ_AGENT_ID);
      } catch {
        if (!cancelled) setClaimedAgentId(CONTROLTOWER_READ_AGENT_ID);
      }
    }

    void claimProfile();
    return () => {
      cancelled = true;
    };
  }, [authHeader, token]);

  const loadJobs = useCallback(async () => {
    if (!jobsReadAgentId) return;
    setLoadingJobs(true);
    try {
      const response = await fetch("/api/memory-admin?action=fishbowl_list_todos", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: jobsReadAgentId,
          include_description: true,
          limit: 80,
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { todos?: BoardroomTodoRow[]; error?: string };
      if (!response.ok) throw new Error(body.error ?? "Boardroom Jobs did not load");
      setJobs((body.todos ?? []).map(toControlTowerJob).filter((job): job is ControlTowerJobBoardItem => Boolean(job)));
      setJobError(null);
    } catch (error) {
      setJobError(error instanceof Error ? error.message : "Boardroom Jobs did not load");
    } finally {
      setLoadingJobs(false);
    }
  }, [authHeader, jobsReadAgentId]);

  useEffect(() => {
    if (!jobsReadAgentId) return undefined;
    const timeoutId = window.setTimeout(() => {
      void loadJobs();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [jobsReadAgentId, loadJobs]);

  const plan = useMemo(
    () =>
      createControlTowerPlan({
        prompt,
        pastes: pasteText ? [pasteText] : [],
        jobBoardItems: jobs,
        maxActiveWorkers: 4,
      }),
    [jobs, pasteText, prompt],
  );

  const claim = useMemo(() => claimControlTowerLane(plan), [plan]);
  const slotsFull = plan.workerCounts.activeWorkers >= plan.maxActiveWorkers;

  const copyMasterBox = async () => {
    try {
      await navigator.clipboard.writeText(plan.masterCopyBox);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6">
      <section className="flex flex-col gap-4 border-b border-white/[0.08] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#E2B93B]">
            <TowerControl className="h-4 w-4" />
            Control Tower
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-white md:text-4xl">Big-job coordination</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">
            Turns a large request, pasted context, and Boardroom Jobs into clean worker lanes with proof rules and a copy box for new chats.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void loadJobs()}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
          >
            {loadingJobs ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh jobs
          </button>
          <Link
            to="/admin/jobs"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
          >
            <ListTodo className="h-4 w-4" />
            Open Jobs
          </Link>
        </div>
      </section>

      {jobError && (
        <section className="flex items-start gap-3 rounded-lg border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-4 py-3 text-sm text-[#F6D778]">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <div className="font-semibold">Boardroom Jobs could not load.</div>
            <div className="text-[#F6D778]/78">{jobError}</div>
          </div>
        </section>
      )}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <StatTile label="Lanes" value={plan.workerCounts.totalLanes} />
        <StatTile label="Active" value={`${plan.workerCounts.activeWorkers}/${plan.workerCounts.activeSlots}`} tone={slotsFull ? "warn" : "neutral"} />
        <StatTile label="Waiting" value={plan.workerCounts.waiting} />
        <StatTile label="Stale" value={plan.workerCounts.stale} tone={plan.workerCounts.stale > 0 ? "warn" : "good"} />
        <StatTile label="Blocked" value={plan.workerCounts.blocked} tone={plan.workerCounts.blocked > 0 ? "bad" : "good"} />
        <StatTile label="Helpers" value={plan.workerCounts.helperSlots} />
      </section>

      {slotsFull && (
        <section className="rounded-lg border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-4 py-3 text-sm text-[#F6D778]">
          All active worker slots are full. New chats should become Scouts, Reviewers, or Proof Checkers.
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
        <div className="space-y-4">
          <section className="rounded-lg border border-white/[0.08] bg-[#10151f] p-4">
            <label htmlFor="controltower-prompt" className="text-sm font-semibold text-white">
              Big job prompt
            </label>
            <textarea
              id="controltower-prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="mt-3 min-h-[118px] w-full resize-y rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm leading-6 text-white outline-none focus:border-[#E2B93B]/55"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="h-4 w-4 text-[#E2B93B]" />
              {plan.triggered ? "Control Tower would trigger automatically." : "This looks small enough for one worker unless more context arrives."}
            </div>
          </section>

          <section className="rounded-lg border border-white/[0.08] bg-[#10151f] p-4">
            <label htmlFor="controltower-paste" className="text-sm font-semibold text-white">
              Paste intake
            </label>
            <textarea
              id="controltower-paste"
              value={pasteText}
              onChange={(event) => setPasteText(event.target.value)}
              placeholder="Paste messy updates, old chat notes, worker reports, proof links, or blockers here."
              className="mt-3 min-h-[180px] w-full resize-y rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/32 focus:border-[#E2B93B]/55"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setLastProcessedAt(new Date().toLocaleTimeString())}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Process intake
              </button>
              {lastProcessedAt && <span className="text-xs text-white/45">Last processed {lastProcessedAt}</span>}
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            <StatTile label="Useful" value={plan.intake.usefulItems} />
            <StatTile label="Duplicates" value={plan.intake.duplicatesIgnored} tone={plan.intake.duplicatesIgnored > 0 ? "warn" : "neutral"} />
            <StatTile label="Redacted" value={plan.intake.redactedItems} tone={plan.intake.redactedItems > 0 ? "bad" : "neutral"} />
            <StatTile label="Tasks" value={plan.intake.tasks.length} />
            <StatTile label="Decisions" value={plan.intake.decisions.length} />
            <StatTile label="Blockers" value={plan.intake.blockers.length} tone={plan.intake.blockers.length > 0 ? "bad" : "neutral"} />
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-lg border border-white/[0.08] bg-[#10151f] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-white">Master Copy Box</h2>
                <p className="mt-1 text-xs text-white/48">Paste this into a new chat when you want more workers.</p>
              </div>
              <button
                type="button"
                onClick={() => void copyMasterBox()}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
              >
                <ClipboardCopy className="h-4 w-4" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <textarea
              readOnly
              aria-label="Master Copy Box"
              value={plan.masterCopyBox}
              className="mt-3 min-h-[322px] w-full resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-3 font-mono text-xs leading-5 text-white/78 outline-none"
            />
          </section>

          <section className="rounded-lg border border-white/[0.08] bg-[#10151f] p-4">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 text-[#E2B93B]" />
              <div>
                <h2 className="text-sm font-semibold text-white">Next worker claim</h2>
                <p className="mt-2 text-sm leading-6 text-white/68">{claim.message}</p>
                <p className="mt-3 text-xs text-white/45">{plan.resumeHint}</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="rounded-lg border border-white/[0.08] bg-[#10151f]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Worker lanes</h2>
            <p className="mt-1 text-xs text-white/48">Boardroom Jobs first, Control Tower defaults after that.</p>
          </div>
          <div className="text-xs text-white/45">{plan.xgateStatus.replace(/_/g, " ")} | {plan.crewsMode === "council" ? "Crews Council" : "Crews Lite"}</div>
        </div>
        <div>
          {plan.lanes.map((lane, index) => (
            <LaneRow key={lane.id} lane={lane} index={index} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/[0.08] bg-[#10151f] p-4">
        <h2 className="text-sm font-semibold text-white">Closeout checks</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {plan.xpassChecklist.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm leading-6 text-white/62">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
