/**
 * Queue hydration failure detection (cron side).
 *
 * Pinned v9 definition: active_jobs = COUNT(todos WHERE status='in_progress'
 * AND owner_last_seen <= 24h). When active_jobs is 0 while unclaimed open
 * backlog exists, the fleet has a queue hydration failure: work is waiting
 * and nobody is pulling it.
 *
 * Until now this check only ran inside seat heartbeats, so when no seats run
 * (the exact failure being detected) nobody raises the flag. This module
 * gives the watcher cron a pure planner for the same check.
 *
 * Pure and side-effect free: the watcher fetches rows and applies inserts.
 */

export const HYDRATION_OWNER_FRESH_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * A tenant only gets hydration signals while its fleet is plausibly alive:
 * at least one profile seen within this window. Without this gate an
 * abandoned tenant with old open todos would be flagged twice a day forever,
 * which is the same signal noise this sweep exists to surface, not add.
 */
export const HYDRATION_TENANT_ACTIVE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/** One signal per tenant per this window, so the cron reminds daily-ish instead of every 15 minutes. */
export const HYDRATION_SIGNAL_DEDUP_WINDOW_MS = 12 * 60 * 60 * 1000;

export const HYDRATION_SIGNAL_ACTION = "queue_hydration_failure";

export interface HydrationTodoRow {
  api_key_hash: string;
  status: string;
  assigned_to_agent_id: string | null;
}

export interface HydrationProfileRow {
  agent_id: string;
  last_seen_at: string | null;
}

export interface QueueHydrationSignalPlan {
  api_key_hash: string;
  insert: {
    api_key_hash: string;
    tool: "fishbowl";
    action: typeof HYDRATION_SIGNAL_ACTION;
    severity: "action_needed";
    summary: string;
    deep_link: string;
    payload: {
      active_jobs: number;
      open_unassigned: number;
      open_assigned: number;
      in_progress: number;
      definition: string;
    };
  };
}

function ownerSeenWithinWindow(
  profiles: HydrationProfileRow[],
  agentId: string | null,
  nowMs: number,
): boolean {
  if (!agentId) return false;
  const profile = profiles.find((p) => p.agent_id === agentId);
  return seenWithin(profile?.last_seen_at ?? null, nowMs, HYDRATION_OWNER_FRESH_WINDOW_MS);
}

function seenWithin(lastSeenAt: string | null, nowMs: number, windowMs: number): boolean {
  if (!lastSeenAt) return false;
  const seenMs = Date.parse(lastSeenAt);
  if (!Number.isFinite(seenMs)) return false;
  return nowMs - seenMs <= windowMs;
}

function tenantRecentlyActive(profiles: HydrationProfileRow[], nowMs: number): boolean {
  return profiles.some((p) => seenWithin(p.last_seen_at, nowMs, HYDRATION_TENANT_ACTIVE_WINDOW_MS));
}

/**
 * Plans one queue_hydration_failure signal per tenant where active_jobs is 0
 * while unclaimed open backlog exists. Tenants with any live in_progress
 * owner, or with no unclaimed backlog, plan nothing.
 */
export function planQueueHydrationSignals(input: {
  todos: HydrationTodoRow[];
  profilesByTenant: Map<string, HydrationProfileRow[]>;
  nowMs: number;
}): QueueHydrationSignalPlan[] {
  const byTenant = new Map<string, HydrationTodoRow[]>();
  for (const todo of input.todos) {
    if (!todo.api_key_hash) continue;
    const list = byTenant.get(todo.api_key_hash) ?? [];
    list.push(todo);
    byTenant.set(todo.api_key_hash, list);
  }

  const plans: QueueHydrationSignalPlan[] = [];
  for (const [tenant, todos] of byTenant.entries()) {
    const profiles = input.profilesByTenant.get(tenant) ?? [];
    if (!tenantRecentlyActive(profiles, input.nowMs)) continue;
    let activeJobs = 0;
    let inProgress = 0;
    let openUnassigned = 0;
    let openAssigned = 0;

    for (const todo of todos) {
      if (todo.status === "in_progress") {
        inProgress += 1;
        if (ownerSeenWithinWindow(profiles, todo.assigned_to_agent_id, input.nowMs)) {
          activeJobs += 1;
        }
      } else if (todo.status === "open") {
        if (todo.assigned_to_agent_id) openAssigned += 1;
        else openUnassigned += 1;
      }
    }

    if (activeJobs > 0 || openUnassigned === 0) continue;

    const summary = `🧯 Queue hydration failure: 0 active jobs while ${openUnassigned} open todo${
      openUnassigned === 1 ? "" : "s"
    } wait unclaimed`;
    plans.push({
      api_key_hash: tenant,
      insert: {
        api_key_hash: tenant,
        tool: "fishbowl",
        action: HYDRATION_SIGNAL_ACTION,
        severity: "action_needed",
        summary,
        deep_link: "/admin/boardroom",
        payload: {
          active_jobs: activeJobs,
          open_unassigned: openUnassigned,
          open_assigned: openAssigned,
          in_progress: inProgress,
          definition: "v9: active_jobs = in_progress todos whose owner was seen within 24h",
        },
      },
    });
  }
  return plans;
}
