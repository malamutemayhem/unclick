// Freshness + bucketing helpers for Boardroom ideas.
//
// Ideas pile up and go quiet. To keep the panel honest, we split them into:
//   - active:   still open (proposed/voting) and touched recently
//   - stale:    still open but nothing has happened for a long time
//   - resolved: locked, parked, or rejected (the decision is made)
//
// The page shows "active" up front and tucks "stale" and "resolved" behind
// view-more toggles so dead ideas stop crowding the live ones.

export type IdeaStatus = "proposed" | "voting" | "locked" | "parked" | "rejected";

export interface IdeaActivity {
  status: IdeaStatus;
  created_at: string;
  updated_at: string;
}

export type IdeaBucket = "active" | "stale" | "resolved";

// An open idea with no movement for three weeks is treated as stale.
export const IDEA_STALE_AFTER_MS = 21 * 24 * 60 * 60 * 1000;

const RESOLVED_STATUSES: ReadonlySet<IdeaStatus> = new Set<IdeaStatus>([
  "locked",
  "parked",
  "rejected",
]);

export function ideaBucket(idea: IdeaActivity, nowMs: number): IdeaBucket {
  if (RESOLVED_STATUSES.has(idea.status)) return "resolved";
  const updated = new Date(idea.updated_at).getTime();
  if (Number.isFinite(updated) && nowMs - updated > IDEA_STALE_AFTER_MS) {
    return "stale";
  }
  return "active";
}

export interface PartitionedIdeas<T extends IdeaActivity> {
  active: T[];
  stale: T[];
  resolved: T[];
}

export function partitionIdeas<T extends IdeaActivity>(
  ideas: T[],
  nowMs: number,
): PartitionedIdeas<T> {
  const out: PartitionedIdeas<T> = { active: [], stale: [], resolved: [] };
  for (const idea of ideas) {
    out[ideaBucket(idea, nowMs)].push(idea);
  }
  return out;
}

/** Short, plain-English age label, e.g. "3d ago" or "just now". */
export function ageLabel(iso: string | null | undefined, nowMs: number): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const diffSec = Math.max(1, Math.floor((nowMs - then) / 1000));
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${Math.floor(diffMonth / 12)}y ago`;
}
