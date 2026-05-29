// WriterLane Slice 2a: pure release-decision helper for stale, human-assigned
// OPEN todos.
//
// Wired by the watcher and the Boardroom release_claim mutation. The helper is
// pure: it classifies via the Slice 1 classifyTodoActionability helper and
// returns a release plan, with no DB, no LLM, no NudgeOnly, and no imports from
// api/fishbowl-watcher.ts. Protection and the owner-liveness inputs are passed
// in by the caller rather than recomputed here, so the function stays clock/math
// only.

import {
  classifyTodoActionability,
  type TodoActionability,
} from "./fishbowl-todo-actionability.js";

// Mirrors WORKER_SELF_HEALING_REASSIGN_ATTEMPT_LIMIT (= 3) in
// api/fishbowl-watcher.ts. Duplicated here so this helper stays pure and free of
// watcher imports; the watcher owns the canonical constant.
export const OPEN_STALE_RECLAIM_ATTEMPT_LIMIT = 3;

export interface PlanOpenStaleTodoReleaseInput {
  status: unknown;
  assignedToAgentId: unknown;
  updatedAt?: unknown;
  createdAt?: unknown;
  ownerLastSeenAt?: unknown;
  reclaimCount: number | null | undefined;
  isProtected: boolean;
  nowMs: number;
}

// Consumed verbatim by releaseWorkerSelfHealingTodoOwnership (the CAS applier) in
// api/fishbowl-watcher.ts via plan.update. Must stay byte-identical to
// WorkerSelfHealingTodoReleasePlan["update"] so Slice 2b can reuse the applier
// unchanged.
export interface OpenStaleTodoReleaseUpdate {
  status: "open";
  assigned_to_agent_id: null;
  lease_token: null;
  lease_expires_at: null;
  reclaim_count: number;
  updated_at: string;
}

export interface OpenStaleTodoReleasePlan {
  classification: Extract<TodoActionability, "stale_assigned_open">;
  update: OpenStaleTodoReleaseUpdate;
}

export function planOpenStaleTodoRelease(
  input: PlanOpenStaleTodoReleaseInput,
): OpenStaleTodoReleasePlan | null {
  if (input.isProtected) return null;

  const reclaimCountRaw = Number(input.reclaimCount ?? 0);
  const reclaimCount = Number.isFinite(reclaimCountRaw)
    ? Math.max(0, Math.trunc(reclaimCountRaw))
    : 0;
  if (reclaimCount >= OPEN_STALE_RECLAIM_ATTEMPT_LIMIT) return null;

  const classification = classifyTodoActionability({
    status: input.status,
    assignedToAgentId: input.assignedToAgentId,
    updatedAt: input.updatedAt,
    createdAt: input.createdAt,
    ownerLastSeenAt: input.ownerLastSeenAt,
    nowMs: input.nowMs,
  });
  if (classification !== "stale_assigned_open") return null;

  return {
    classification,
    update: {
      status: "open",
      assigned_to_agent_id: null,
      lease_token: null,
      lease_expires_at: null,
      reclaim_count: reclaimCount + 1,
      updated_at: new Date(input.nowMs).toISOString(),
    },
  };
}
