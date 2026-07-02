import { GitPullRequest, MessageSquare } from "lucide-react";
import { GlassCard } from "@/components/brand";

/**
 * A made-up but faithful preview of the real Autopilot Jobs board
 * (src/pages/admin/AdminJobs.tsx), for one relatable project: a dog-toys shop.
 * It mirrors the real portal's shape - stat cards, grouped sections, the dense
 * column row (rank, job, state, priority, worker, live, progress, proof, notes),
 * the 5-stage pipeline, and the same state palette (teal = active, amber =
 * waiting on proof, emerald = shipped). Static and uses sample data only.
 *
 * The state/priority/proof colours are kept in sync with the admin board.
 */
type Cell = "done" | "active" | "todo";
type JobState = "Active" | "Needs proof" | "Open" | "Done";
type Priority = "Urgent" | "High" | "Normal" | "Low";
type ProofTone = "quiet" | "linked" | "done" | "alert";

type Job = {
  title: string;
  summary: string;
  state: JobState;
  priority: Priority;
  worker: string;
  icon: string;
  live: "live" | "proof" | "ship";
  pct: number;
  stages: [Cell, Cell, Cell, Cell, Cell]; // Brief, Build, Proof, Review, Ship
  proof: string;
  proofTone: ProofTone;
  notes: number;
};

const STAGES = ["Brief", "Build", "Proof", "Review", "Ship"] as const;

const stateStyle: Record<JobState, string> = {
  Active: "border-[#61C1C4]/35 bg-[#61C1C4]/12 text-[#8EE8EB]",
  "Needs proof": "border-[#E2B93B]/35 bg-[#E2B93B]/12 text-[#E8C766]",
  Open: "border-white/12 bg-white/[0.04] text-white/65",
  Done: "border-emerald-400/30 bg-emerald-500/12 text-emerald-300",
};

const priorityStyle: Record<Priority, string> = {
  Urgent: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  High: "border-[#E2B93B]/35 bg-[#E2B93B]/12 text-[#E8C766]",
  Normal: "border-white/12 bg-white/[0.04] text-white/60",
  Low: "border-white/[0.06] bg-white/[0.02] text-white/40",
};

const proofStyle: Record<ProofTone, string> = {
  quiet: "border-white/[0.08] bg-white/[0.025] text-white/40",
  linked: "border-[#61C1C4]/30 bg-[#61C1C4]/10 text-[#8EE8EB]",
  done: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
  alert: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E8C766]",
};

const stageFill: Record<JobState, string> = {
  Active: "bg-[#61C1C4]/90 text-black/70",
  "Needs proof": "bg-[#E2B93B]/90 text-black/70",
  Done: "bg-emerald-400/90 text-black/70",
  Open: "bg-[#61C1C4]/90 text-black/70",
};

const liveDot: Record<Job["live"], string> = {
  live: "bg-emerald-400",
  proof: "bg-[#E8C766]",
  ship: "bg-emerald-300",
};

// Grid mirrors the admin row: rank, job, state, priority, worker, live,
// progress, proof, notes. Switches to a stacked card below lg so nothing squishes.
const ROW_GRID =
  "lg:grid lg:grid-cols-[34px_minmax(180px,1.4fr)_74px_56px_minmax(118px,0.6fr)_44px_minmax(176px,0.6fr)_98px_42px] lg:items-center lg:gap-1.5";

const groups: { label: string; jobs: Job[] }[] = [
  {
    label: "Active + proof holds",
    jobs: [
      { title: "Build the squeaky-toy collection page", summary: "New arrivals grid, filterable by size and chew level.", state: "Active", priority: "Urgent", worker: "Builder", icon: "🧵", live: "live", pct: 45, stages: ["done", "active", "todo", "todo", "todo"], proof: "Proof pending", proofTone: "quiet", notes: 2 },
      { title: "Set up checkout for the treat boxes", summary: "Stripe checkout for the monthly treat subscription.", state: "Needs proof", priority: "Urgent", worker: "Cowork", icon: "AI", live: "proof", pct: 70, stages: ["done", "done", "done", "todo", "todo"], proof: "Proof missing", proofTone: "alert", notes: 0 },
      { title: "Photograph the new rope toys", summary: "Studio shots for the six new rope toys.", state: "Active", priority: "High", worker: "Studio", icon: "📸", live: "live", pct: 40, stages: ["done", "active", "todo", "todo", "todo"], proof: "Proof pending", proofTone: "quiet", notes: 1 },
      { title: "Write blurbs for 12 chew toys", summary: "Short, friendly product descriptions.", state: "Needs proof", priority: "Normal", worker: "Writer", icon: "AI", live: "proof", pct: 80, stages: ["done", "done", "done", "active", "todo"], proof: "Needs proof", proofTone: "alert", notes: 3 },
      { title: "Add a size guide to dog harnesses", summary: "Neck and chest measurements with a fit chart.", state: "Needs proof", priority: "High", worker: "Cowork", icon: "AI", live: "proof", pct: 60, stages: ["done", "done", "done", "todo", "todo"], proof: "Proof blocked", proofTone: "alert", notes: 0 },
      { title: "Fix broken links in the toy catalog", summary: "Twelve dead links found by the crawler.", state: "Active", priority: "Urgent", worker: "Builder", icon: "🧵", live: "live", pct: 30, stages: ["done", "active", "todo", "todo", "todo"], proof: "Proof pending", proofTone: "quiet", notes: 0 },
      { title: "Connect the WaggleClub points", summary: "Loyalty points earned on every order.", state: "Needs proof", priority: "High", worker: "Cowork", icon: "AI", live: "proof", pct: 75, stages: ["done", "done", "done", "todo", "todo"], proof: "Proof missing", proofTone: "alert", notes: 5 },
      { title: "Restock alert for the plush ducks", summary: "Email the team when stock drops below 20.", state: "Needs proof", priority: "Normal", worker: "Seat", icon: "AI", live: "proof", pct: 65, stages: ["done", "done", "done", "todo", "todo"], proof: "Needs proof", proofTone: "alert", notes: 1 },
    ],
  },
  {
    label: "Next up",
    jobs: [
      { title: "Email the spring new-toys sale", summary: "Newsletter to 4,300 subscribers.", state: "Open", priority: "High", worker: "Unassigned", icon: "AI", live: "live", pct: 0, stages: ["todo", "todo", "todo", "todo", "todo"], proof: "Job first", proofTone: "quiet", notes: 1 },
      { title: "Bundle a puppy starter pack", summary: "Toy, treat, and chew in one discounted box.", state: "Open", priority: "Normal", worker: "Unassigned", icon: "AI", live: "live", pct: 0, stages: ["todo", "todo", "todo", "todo", "todo"], proof: "Waiting", proofTone: "quiet", notes: 0 },
      { title: "Add customer reviews to toy pages", summary: "Show star ratings and recent reviews.", state: "Open", priority: "Normal", worker: "Unassigned", icon: "AI", live: "live", pct: 0, stages: ["todo", "todo", "todo", "todo", "todo"], proof: "Waiting", proofTone: "quiet", notes: 0 },
      { title: "Set up an abandoned-cart reminder", summary: "Nudge after 24 hours with a 10% code.", state: "Open", priority: "High", worker: "Unassigned", icon: "AI", live: "live", pct: 0, stages: ["todo", "todo", "todo", "todo", "todo"], proof: "Waiting", proofTone: "quiet", notes: 2 },
      { title: "Translate the top 10 toys to French", summary: "For the new Quebec storefront.", state: "Open", priority: "Low", worker: "Unassigned", icon: "AI", live: "live", pct: 0, stages: ["todo", "todo", "todo", "todo", "todo"], proof: "Waiting", proofTone: "quiet", notes: 0 },
    ],
  },
  {
    label: "Done",
    jobs: [
      { title: "Fix the wobbly mobile cart", summary: "Cart button jumped on small screens.", state: "Done", priority: "Normal", worker: "Builder", icon: "🧵", live: "ship", pct: 100, stages: ["done", "done", "done", "done", "done"], proof: "PR #42", proofTone: "done", notes: 0 },
      { title: "Launch the chew-proof guarantee badge", summary: "A 30-day chew-proof promise on tough toys.", state: "Done", priority: "High", worker: "Cowork", icon: "AI", live: "ship", pct: 100, stages: ["done", "done", "done", "done", "done"], proof: "PR #51", proofTone: "done", notes: 4 },
    ],
  },
];

const STATS: { label: string; value: number; tone: string }[] = [
  { label: "Being worked", value: 3, tone: "text-[#8EE8EB]" },
  { label: "Up next", value: 5, tone: "text-white/80" },
  { label: "Proof holds", value: 5, tone: "text-[#E8C766]" },
  { label: "Done", value: 2, tone: "text-emerald-300" },
];

const rankedGroups = groups.map((group, groupIndex) => {
  const offset = groups.slice(0, groupIndex).reduce((total, current) => total + current.jobs.length, 0);
  return {
    ...group,
    jobs: group.jobs.map((job, jobIndex) => ({ job, rank: offset + jobIndex + 1 })),
  };
});

function StageStrip({ job }: { job: Job }) {
  return (
    <div className="flex min-w-[164px] items-center gap-1" aria-label="Pipeline progress">
      <span className="w-7 shrink-0 text-right text-[10px] font-semibold text-white/55">{job.pct}%</span>
      <div className="grid flex-1 grid-cols-5 gap-px overflow-hidden rounded-[3px]">
        {STAGES.map((stage, i) => {
          const lit = job.stages[i] === "done" || job.stages[i] === "active";
          return (
            <span
              key={stage}
              title={stage}
              className={`flex h-4 min-w-0 items-center justify-center text-[7px] font-semibold uppercase ${
                lit ? stageFill[job.state] : "bg-white/[0.08] text-white/30"
              }`}
            >
              {stage.slice(0, 4)}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Hug content with a consistent 3px side padding (left-aligned in its grid cell)
// instead of stretching to fill the column, so short labels do not look bloated.
const badge =
  "inline-flex min-w-0 items-center justify-self-start whitespace-nowrap rounded-[4px] border px-[3px] py-px text-[9px] font-semibold uppercase";

function Row({ rank, job }: { rank: number; job: Job }) {
  return (
    <div className={`px-3 py-1.5 text-xs ${ROW_GRID}`}>
      <span className="hidden h-4 w-5 items-center justify-center rounded-[4px] border border-white/[0.06] bg-white/[0.025] text-[10px] font-semibold tabular-nums text-white/35 lg:flex">
        {rank}
      </span>
      <div className="min-w-0">
        <p className={`truncate text-[11px] font-semibold leading-4 ${job.state === "Done" ? "text-white/35 line-through" : "text-white/85"}`}>
          {job.title}
        </p>
        <p className="truncate text-[10px] leading-4 text-white/35">{job.summary}</p>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 lg:mt-0 lg:contents">
        <span className={`${badge} ${stateStyle[job.state]}`}>{job.state}</span>
        <span className={`${badge} ${priorityStyle[job.priority]}`}>{job.priority}</span>
        <span className="flex min-w-0 items-center gap-1 text-[11px] text-white/45">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-white/[0.04] text-[11px]">{job.icon}</span>
          <span className="min-w-0 truncate">{job.worker}</span>
        </span>
        <span className="flex items-center gap-1 text-[11px] text-white/45">
          <span className={`h-1.5 w-1.5 rounded-full ${liveDot[job.live]}`} />
          {job.live}
        </span>
        <StageStrip job={job} />
        <span className={`inline-flex max-w-[98px] shrink-0 items-center justify-self-start gap-1 whitespace-nowrap rounded-[4px] border px-[3px] py-px text-[9px] font-semibold ${proofStyle[job.proofTone]}`}>
          <GitPullRequest className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="min-w-0 truncate">{job.proof}</span>
        </span>
        <span className="flex items-center gap-0.5 text-[11px] text-white/45">
          <MessageSquare className="h-3 w-3" aria-hidden="true" />
          {job.notes}
        </span>
      </div>
    </div>
  );
}

export default function JobsBoardSample() {
  return (
    <GlassCard className="mx-auto max-w-5xl p-3 sm:p-5">
      {/* Header + stat cards, mirroring the real board */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center rounded-full border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1 text-[11px] font-medium text-[#61C1C4]">
            Work board
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-heading">Jobs - Waggle dog toys</h3>
          <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
            Everything your AI is doing for one project, on one work list.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4 md:min-w-[420px]">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
              <p className="text-[11px] text-white/35">{s.label}</p>
              <p className={`mt-0.5 text-lg font-semibold ${s.tone}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
        {/* Column header (lg+) */}
        <div className={`hidden border-b border-white/[0.05] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase text-white/30 ${ROW_GRID}`}>
          <span>#</span>
          <span>Job</span>
          <span>State</span>
          <span>Priority</span>
          <span>Worker</span>
          <span>Live</span>
          <span>Progress</span>
          <span>Proof</span>
          <span>Notes</span>
        </div>

        {rankedGroups.map((g) => (
          <div key={g.label}>
            <div className="flex items-center justify-between border-b border-white/[0.05] bg-white/[0.02] px-3 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">{g.label}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] tabular-nums text-white/40">
                {g.jobs.length}
              </span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {g.jobs.map(({ job, rank }) => (
                <Row key={job.title} rank={rank} job={job} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
