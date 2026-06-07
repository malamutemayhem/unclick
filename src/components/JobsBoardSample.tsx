import { GlassCard } from "@/components/brand";

/**
 * A simplified, made-up sample of the real Autopilot Jobs board, for one
 * relatable project (a dog-toys shop). Shows the board's shape - state,
 * pipeline progress, and proof - in its simplest form, with fewer jobs than a
 * real board. The state colours mirror the admin board palette
 * (src/pages/admin/AdminJobs.tsx): teal = active, amber = waiting on proof,
 * emerald = shipped. Labels use whitespace-nowrap so badges never overflow.
 */
type Stage = "done" | "active" | "todo";
type JobState = "Active" | "Needs proof" | "Open" | "Done";

type Job = {
  title: string;
  state: JobState;
  progress: [Stage, Stage, Stage, Stage]; // Plan, Build, Test, Ship
  proof: string;
};

const STAGES = ["Plan", "Build", "Test", "Ship"] as const;

// Same colour language as the admin board, so this reads as a true preview.
const stateStyle: Record<JobState, string> = {
  Active: "border border-[#61C1C4]/35 bg-[#61C1C4]/12 text-[#8EE8EB]",
  "Needs proof": "border border-[#E2B93B]/35 bg-[#E2B93B]/12 text-[#E8C766]",
  Open: "border border-white/12 bg-white/[0.04] text-white/65",
  Done: "border border-emerald-400/30 bg-emerald-500/12 text-emerald-300",
};

const groups: { label: string; jobs: Job[] }[] = [
  {
    label: "Working now",
    jobs: [
      { title: "Build the squeaky-toy collection page", state: "Active", progress: ["done", "active", "todo", "todo"], proof: "Proof pending" },
      { title: "Set up checkout for the treat boxes", state: "Needs proof", progress: ["done", "done", "done", "todo"], proof: "Needs proof" },
    ],
  },
  {
    label: "Up next",
    jobs: [
      { title: "Write descriptions for 12 chew toys", state: "Open", progress: ["todo", "todo", "todo", "todo"], proof: "Waiting" },
      { title: "Email the spring new-toys sale", state: "Open", progress: ["todo", "todo", "todo", "todo"], proof: "Waiting" },
    ],
  },
  {
    label: "Done",
    jobs: [
      { title: "Fix the wobbly mobile cart", state: "Done", progress: ["done", "done", "done", "done"], proof: "PR #42" },
    ],
  },
];

function Pipeline({ progress }: { progress: Job["progress"] }) {
  return (
    <div className="flex items-center gap-1">
      {STAGES.map((s, i) => {
        const st = progress[i];
        const cls =
          st === "done"
            ? "border-primary/30 bg-primary/20 text-primary"
            : st === "active"
            ? "border-primary/50 text-primary"
            : "border-white/10 text-muted-foreground/50";
        return (
          <span key={s} className={`rounded border px-1.5 py-0.5 text-[10px] ${cls}`}>
            {s}
          </span>
        );
      })}
    </div>
  );
}

export default function JobsBoardSample() {
  return (
    <GlassCard className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-heading">Jobs - Waggle dog toys</h3>
          <p className="text-xs text-muted-foreground">Everything your AI is doing for one project.</p>
        </div>
        <div className="flex gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1">2 working</span>
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1">2 up next</span>
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1">1 done</span>
        </div>
      </div>

      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {g.label}
            </div>
            <div className="space-y-2">
              {g.jobs.map((job) => (
                <div
                  key={job.title}
                  className="flex flex-col gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide ${stateStyle[job.state]}`}
                    >
                      {job.state}
                    </span>
                    <span className="truncate text-sm text-heading">{job.title}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Pipeline progress={job.progress} />
                    <span className="whitespace-nowrap text-[11px] text-muted-foreground">{job.proof}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
