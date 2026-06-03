// Cowork scheduled-task wake route - dry-run receipt path (non-mutating).
//
// First safe slice for Boardroom job be55cb76 ("Implement Cowork
// scheduled-task wake route"). Per the 2026-05-10 scoping comment, the first
// slice is a DRY RUN ONLY: validate which scheduled tasks are due in UTC and
// record which schedule would wake, with no real work, no GitHub workflow
// dispatch, and no credential access.
//
// This module computes a plain receipt object from the scheduled-tasks
// catalog and a supplied "now". It performs no I/O and triggers nothing.
// The caller (e.g. a heartbeat that posts the receipt as a Boardroom proof
// comment) owns any side effects; this layer stays pure so it is trivially
// testable and impossible to misfire.
//
// The route is largely superseded by existing wake infrastructure
// (.github/workflows/event-wake-router.yml, the PinballWake clock routes in
// pinballwakeClockRoutes.ts, and the scheduled crons cataloged here). This
// dry-run gives the Cowork lane a traceable, non-mutating "what would wake
// now" view on top of that infrastructure instead of a new mutating path.

import { cronMatchesUtc, SCHEDULED_TASKS, type ScheduledTask } from "./scheduledTasksCatalog";

export interface CoworkWakeDueTask {
  id: string;
  name: string;
  cron: string;
  workflowFile: string;
  /** ISO-8601 UTC minute this task would wake at (the checked instant, truncated to the minute). */
  wouldWakeAtUtc: string;
}

export interface CoworkWakeDryRunReceipt {
  /** Always false: this path never mutates state or dispatches work. */
  mutating: false;
  kind: "cowork-wake-dry-run";
  /** The UTC instant the dry run was evaluated at, truncated to the minute. */
  evaluatedAtUtc: string;
  /** Number of catalog tasks examined. */
  checkedCount: number;
  /** Tasks whose schedule matches the evaluated minute. */
  dueTasks: CoworkWakeDueTask[];
}

function truncateToMinuteIso(date: Date): string {
  const truncated = new Date(date.getTime());
  truncated.setUTCSeconds(0, 0);
  return truncated.toISOString();
}

/**
 * Compute the non-mutating "would wake" receipt for a given instant.
 * @param now The instant to evaluate (defaults to current time).
 * @param tasks The catalog to check (defaults to the shipped catalog).
 */
export function computeCoworkWakeDryRun(
  now: Date = new Date(),
  tasks: ScheduledTask[] = SCHEDULED_TASKS,
): CoworkWakeDryRunReceipt {
  const evaluatedAtUtc = truncateToMinuteIso(now);

  const dueTasks: CoworkWakeDueTask[] = tasks
    .filter((task) => cronMatchesUtc(task.cron, now))
    .map((task) => ({
      id: task.id,
      name: task.name,
      cron: task.cron,
      workflowFile: task.workflowFile,
      wouldWakeAtUtc: evaluatedAtUtc,
    }));

  return {
    mutating: false,
    kind: "cowork-wake-dry-run",
    evaluatedAtUtc,
    checkedCount: tasks.length,
    dueTasks,
  };
}

/** Render a short, human-readable proof line for a dry-run receipt. */
export function formatCoworkWakeDryRunProof(receipt: CoworkWakeDryRunReceipt): string {
  if (receipt.dueTasks.length === 0) {
    return `Cowork wake dry run at ${receipt.evaluatedAtUtc}: 0 of ${receipt.checkedCount} scheduled tasks due. No wake. (dry run, non-mutating)`;
  }
  const names = receipt.dueTasks.map((task) => task.name).join(", ");
  return `Cowork wake dry run at ${receipt.evaluatedAtUtc}: ${receipt.dueTasks.length} of ${receipt.checkedCount} due -> ${names}. (dry run, non-mutating; nothing dispatched)`;
}
