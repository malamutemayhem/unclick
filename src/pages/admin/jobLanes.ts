/**
 * Job lanes: one todo substrate, two queues.
 *
 * Jobs (AI) is the agent workforce queue; Jobs (Human) is the people queue
 * that agents can push hand-offs into ("set up this key", "sign up here").
 * Lane is a convention over the existing `assigned_to_agent_id` field so the
 * human board ships with zero schema changes: assignees named `human` or
 * prefixed `human-` / `human:` are the human lane, everything else (including
 * unassigned) is the agent lane. A proper `lane` column can replace this
 * later without changing callers of these helpers.
 */

export type JobLane = "agent" | "human";
export type JobLaneFilter = "all" | JobLane;

export function laneOfAssignee(assigned: string | null | undefined): JobLane {
  const raw = (assigned ?? "").trim().toLowerCase();
  if (raw === "human" || raw.startsWith("human-") || raw.startsWith("human:")) return "human";
  return "agent";
}

/** "human-chris" -> "Chris", "human:james smith" -> "James Smith", "human" -> "Human". */
export function humanAssigneeName(assigned: string): string {
  const rest = assigned.trim().replace(/^human[-:]?/i, "").trim();
  if (!rest) return "Human";
  return rest
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export function parseLaneFilter(value: string | null | undefined): JobLaneFilter {
  if (value === "human" || value === "agent") return value;
  return "all";
}

export function matchesLane(assigned: string | null | undefined, filter: JobLaneFilter): boolean {
  if (filter === "all") return true;
  return laneOfAssignee(assigned) === filter;
}
