// Boardroom todo stale/actionable classification.
//
// Pure clock/math helper extracted verbatim from the inline closure in the
// fishbowl_list_actionable_todos handler in api/memory-admin.ts. No LLM, no DB
// access, and no NudgeOnly logic: the handler performs its own queries and
// passes the resolved values in. Constants and the role-assignee list are
// copied byte-for-byte from the original inline values so behavior is
// preserved.

export const STALE_OPEN_ASSIGNED_MS = 6 * 60 * 60 * 1000;
export const STALE_IN_PROGRESS_MS = 6 * 60 * 60 * 1000;
export const LIVE_OWNER_MS = 60 * 60 * 1000;

export const ROLE_ASSIGNEES = new Set([
  "master",
  "coordinator",
  "builder",
  "reviewer",
  "watcher",
  "planner",
  "tester",
  "safety",
  "messenger",
  "pinballwake-job-runner",
]);

export function isRoleAssignee(raw: unknown): boolean {
  const value = String(raw ?? "").trim().toLowerCase();
  return (
    ROLE_ASSIGNEES.has(value) ||
    value.startsWith("codex-forge-") ||
    value.startsWith("claude-pc-tether-") ||
    value.startsWith("claude-code-pc-tether-")
  );
}

export type TodoActionability =
  | "unassigned_open"
  | "role_assigned_open"
  | "stale_assigned_open"
  | "stale_in_progress"
  | "fresh_owner_do_not_touch";

export interface ClassifyTodoActionabilityInput {
  status: unknown;
  assignedToAgentId: unknown;
  updatedAt?: unknown;
  createdAt?: unknown;
  ownerLastSeenAt?: unknown;
  nowMs: number;
}

export function classifyTodoActionability(
  input: ClassifyTodoActionabilityInput,
): TodoActionability {
  const { nowMs } = input;
  const ageMs = (raw: unknown): number => {
    const ms = Date.parse(String(raw ?? ""));
    return Number.isFinite(ms) ? Math.max(0, nowMs - ms) : Number.POSITIVE_INFINITY;
  };

  const status = String(input.status ?? "");
  const assignee = String(input.assignedToAgentId ?? "").trim();
  const todoAge = ageMs(input.updatedAt ?? input.createdAt);
  const ownerLastSeen = input.ownerLastSeenAt ?? null;
  const ownerAge = ownerLastSeen ? ageMs(ownerLastSeen) : Number.POSITIVE_INFINITY;
  const ownerLooksDormant = !assignee || isRoleAssignee(assignee) || ownerAge > LIVE_OWNER_MS;

  if (status === "open" && !assignee) return "unassigned_open";
  if (status === "open" && isRoleAssignee(assignee)) return "role_assigned_open";
  if (status === "open" && todoAge > STALE_OPEN_ASSIGNED_MS && ownerLooksDormant) return "stale_assigned_open";
  if (status === "in_progress" && todoAge > STALE_IN_PROGRESS_MS && ownerLooksDormant) return "stale_in_progress";

  return "fresh_owner_do_not_touch";
}
