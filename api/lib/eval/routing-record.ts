// Write path for learned routing: attribute each scored live job to the arm
// (the agent/seat/model that owned it) and fold the proof outcome into the arm
// table. This is the half that makes the bandit actually learn from production:
// scoreLiveJobs grades the work, this records which arm earned which reward.
//
// Pure: takes the scored jobs + the arm-id resolver, returns an updated table
// and the per-arm events. Persisting the table is the caller's job.

import type { RunScore } from "../score-trace.js";
import { recordArmOutcome, type ArmTable } from "./router-bandit.js";
import { emptyArmTable } from "./router-bandit.js";
import type { ArmOutcomeEvent } from "./learned-router.js";
import type { LiveJobScore } from "./live-score.js";

/** Map a scored job to the arm that should get credit/blame, or null to skip. */
export type ArmResolver = (jobId: string) => string | null;

export interface RoutingRecordResult {
  table: ArmTable;
  events: ArmOutcomeEvent[];
  /** Jobs skipped because no arm could be attributed. */
  skipped: string[];
}

/**
 * Fold a batch of scored live jobs into an arm table. `resolveArm` maps a job id
 * to the arm that ran it (e.g. its assigned_to_agent_id, or a model tag). Jobs
 * with no resolvable arm are skipped, not guessed.
 */
export function recordRoutingOutcomes(
  scored: LiveJobScore[],
  resolveArm: ArmResolver,
  startTable: ArmTable = emptyArmTable(),
): RoutingRecordResult {
  let table = startTable;
  const events: ArmOutcomeEvent[] = [];
  const skipped: string[] = [];

  for (const job of scored) {
    const arm = resolveArm(job.jobId);
    if (!arm) {
      skipped.push(job.jobId);
      continue;
    }
    table = recordArmOutcome(table, arm, job.score);
    events.push({ arm, score: job.score });
  }

  return { table, events, skipped };
}

/** Build an arm resolver from a jobId -> arm map (e.g. assignee per job). */
export function resolverFromMap(map: Record<string, string | null | undefined>): ArmResolver {
  return (jobId: string) => map[jobId] ?? null;
}

/** Convenience: directly score-and-record using a precomputed jobId->arm map. */
export function foldScoresByArm(
  scored: LiveJobScore[],
  jobArm: Record<string, string | null | undefined>,
  startTable?: ArmTable,
): RoutingRecordResult {
  return recordRoutingOutcomes(scored, resolverFromMap(jobArm), startTable);
}

export type { RunScore };
