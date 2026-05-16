// src/lib/criticalPathQueue.ts
//
// Critical-path queue picker - ranks todos by combined unblock value AND
// priority weight, not by priority alone.
//
// Closes UnClick todo "Critical-path queue picker: rank todos by unblock
// value, not only priority" (green-lit efficiency build 2026-05-07).
//
// Intuition: if Todo A blocks 5 downstream todos, finishing A unblocks all 5.
// Even if A is `medium` priority and B is `high`, A may have higher *real*
// throughput value than B when B has no blockers downstream. This module
// computes that and returns a sorted queue.
//
// The algorithm is intentionally pure and dependency-free - it takes a flat
// list of todos and returns a sorted list. The caller is responsible for
// fetching todos from the store.

export type Priority = "urgent" | "high" | "medium" | "low";

export interface TodoLike {
  id: string;
  status: string; // "open" | "in_progress" | "blocked" | "done" | ...
  priority?: Priority;
  /** IDs of todos this one is blocked by (i.e., must finish those first). */
  blocked_by?: string[];
  /** Optional manual override - caller can pin a base score. */
  manual_score?: number;
  /** Lightweight tag used by the picker; e.g., "actionable", "stale", etc. */
  ranking_tag?: string;
}

export interface RankedTodo<T extends TodoLike = TodoLike> {
  todo: T;
  score: number;
  priorityWeight: number;
  unblockCount: number;
  reachableUnblocks: number;
}

export interface PickerOptions {
  /** Priority weight overrides. Defaults below favour `urgent` >> `low`. */
  priorityWeights?: Partial<Record<Priority, number>>;
  /** Weight multiplier applied to reachableUnblocks before adding to priority. Default 2. */
  unblockMultiplier?: number;
  /** Status values that exclude a todo from being ranked at all. */
  excludedStatuses?: ReadonlySet<string>;
  /** If true, include a stable secondary sort by todo.id for deterministic output. Default true. */
  stableSecondarySort?: boolean;
}

const DEFAULT_PRIORITY_WEIGHTS: Record<Priority, number> = {
  urgent: 100,
  high: 60,
  medium: 30,
  low: 10,
};

const DEFAULT_EXCLUDED_STATUSES: ReadonlySet<string> = new Set([
  "done",
  "cancelled",
  "wontfix",
  "archived",
]);

/**
 * Compute the ranked queue for a list of todos.
 *
 * @param todos any iterable of TodoLike - full list. Caller should pre-filter
 *              if needed (e.g. only active todos), but the function also skips
 *              statuses in `excludedStatuses`.
 * @returns todos sorted by score descending (most valuable first).
 */
export function rankCriticalPath<T extends TodoLike>(
  todos: ReadonlyArray<T>,
  options: PickerOptions = {},
): RankedTodo<T>[] {
  const priorityWeights: Record<Priority, number> = {
    ...DEFAULT_PRIORITY_WEIGHTS,
    ...(options.priorityWeights ?? {}),
  };
  const unblockMultiplier = options.unblockMultiplier ?? 2;
  const excludedStatuses = options.excludedStatuses ?? DEFAULT_EXCLUDED_STATUSES;
  const stableSecondarySort = options.stableSecondarySort ?? true;

  // 1. Build reverse-block map: who depends on this todo?
  //    For each todo X listed in blocked_by, record that the parent depends on X.
  const dependents = new Map<string, Set<string>>(); // todoId -> set of todoIds that depend on it
  for (const t of todos) {
    if (!Array.isArray(t.blocked_by)) continue;
    for (const blockerId of t.blocked_by) {
      if (typeof blockerId !== "string" || !blockerId) continue;
      if (!dependents.has(blockerId)) dependents.set(blockerId, new Set());
      dependents.get(blockerId)!.add(t.id);
    }
  }

  // 2. Compute reachable unblocks via BFS down the dependents graph.
  //    Cap depth to avoid pathological cycles or huge graphs blowing up.
  const reachableCache = new Map<string, number>();
  const MAX_BFS_DEPTH = 50;

  function reachableFrom(id: string): number {
    if (reachableCache.has(id)) return reachableCache.get(id)!;
    const visited = new Set<string>([id]);
    const queue: Array<[string, number]> = [[id, 0]];
    while (queue.length > 0) {
      const [cur, depth] = queue.shift()!;
      if (depth >= MAX_BFS_DEPTH) continue;
      const next = dependents.get(cur);
      if (!next) continue;
      for (const n of next) {
        if (visited.has(n)) continue;
        visited.add(n);
        queue.push([n, depth + 1]);
      }
    }
    const count = visited.size - 1; // exclude self
    reachableCache.set(id, count);
    return count;
  }

  // 3. Score each non-excluded todo.
  const ranked: RankedTodo<T>[] = [];
  for (const t of todos) {
    if (excludedStatuses.has(t.status)) continue;

    const pri = t.priority ?? "medium";
    const priorityWeight = priorityWeights[pri] ?? DEFAULT_PRIORITY_WEIGHTS.medium;

    const direct = dependents.get(t.id)?.size ?? 0;
    const reachable = reachableFrom(t.id);

    let score = priorityWeight + reachable * unblockMultiplier;
    if (typeof t.manual_score === "number") score += t.manual_score;

    ranked.push({
      todo: t,
      score,
      priorityWeight,
      unblockCount: direct,
      reachableUnblocks: reachable,
    });
  }

  // 4. Sort by score desc; tiebreak by reachableUnblocks desc, then id asc.
  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.reachableUnblocks !== a.reachableUnblocks) return b.reachableUnblocks - a.reachableUnblocks;
    if (stableSecondarySort) return a.todo.id.localeCompare(b.todo.id);
    return 0;
  });

  return ranked;
}

/**
 * Convenience wrapper: returns just the top N ranked todos (default 10).
 */
export function pickTopN<T extends TodoLike>(
  todos: ReadonlyArray<T>,
  n = 10,
  options?: PickerOptions,
): RankedTodo<T>[] {
  if (!Number.isInteger(n) || n <= 0) {
    throw new RangeError("pickTopN: n must be a positive integer");
  }
  return rankCriticalPath(todos, options).slice(0, n);
}

/**
 * Returns one human-readable label explaining why a todo ranked where it did.
 * Useful for surfacing in admin UI / logs ("ranked #3 because: high priority,
 * unblocks 4 downstream todos").
 */
export function explainRank(r: RankedTodo): string {
  const parts: string[] = [];
  parts.push(`${r.priorityWeight}w priority`);
  if (r.reachableUnblocks > 0) {
    parts.push(`unblocks ${r.reachableUnblocks} downstream${r.unblockCount !== r.reachableUnblocks ? ` (${r.unblockCount} direct)` : ""}`);
  } else {
    parts.push("no downstream blockers");
  }
  if (typeof r.todo.manual_score === "number") {
    parts.push(`manual ${r.todo.manual_score >= 0 ? "+" : ""}${r.todo.manual_score}`);
  }
  return `score ${r.score} = ${parts.join(", ")}`;
}

export const __consts__ = {
  DEFAULT_PRIORITY_WEIGHTS,
  DEFAULT_EXCLUDED_STATUSES,
};
