// Pure mapping between mc_routing_arm_stats rows and the in-memory ArmTable.
// The Supabase IO (select/upsert) lives in the caller; this stays unit-testable.

import type { ArmTable, ArmStats } from "./router-bandit.js";

export interface RoutingArmRow {
  arm: string;
  pulls: number | null;
  reward_sum: number | null;
  verified: number | null;
}

function safeNonNeg(value: number | null | undefined): number {
  if (value == null || !Number.isFinite(value) || value < 0) return 0;
  return value;
}

/** Build an ArmTable from persisted rows. */
export function armTableFromRows(rows: RoutingArmRow[]): ArmTable {
  const arms: Record<string, ArmStats> = {};
  for (const r of rows) {
    if (!r.arm) continue;
    const pulls = safeNonNeg(r.pulls);
    const verified = Math.min(safeNonNeg(r.verified), pulls);
    arms[r.arm] = {
      arm: r.arm,
      pulls,
      rewardSum: pulls === 0 ? 0 : (Number.isFinite(r.reward_sum) ? r.reward_sum! : 0),
      verified,
    };
  }
  return { arms };
}

/** Flatten an ArmTable into rows for upsert (caller adds api_key_hash + updated_at). */
export function rowsFromArmTable(table: ArmTable): RoutingArmRow[] {
  return Object.values(table.arms).map((a) => ({
    arm: a.arm,
    pulls: a.pulls,
    reward_sum: a.rewardSum,
    verified: a.verified,
  }));
}
