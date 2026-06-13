// Pure helpers for session-inspection persistence: streak bookkeeping and the
// mapping from a proposed improvement job to a Boardroom todo row. The Supabase
// IO (select/upsert/insert) lives in the endpoint; this stays unit-testable.

import type { ImprovementJobProposal, InspectionStatus } from "./session-inspection.js";

export interface InspectionStreakRow {
  friction_key: string;
  streak: number | null;
}

/**
 * Compute the next streak for the active friction key, given the prior streaks.
 * Returns the friction key in play (or null when healthy), the resulting streak,
 * and the full set of keys to persist (the active one bumped, others reset).
 */
export interface StreakUpdate {
  frictionKey: string | null;
  streak: number;
  /** Rows to upsert: every known key with its new streak (0 when reset). */
  toPersist: Array<{ friction_key: string; streak: number }>;
}

const ALL_KEYS = ["fake_green", "stale"] as const;
export type FrictionKey = (typeof ALL_KEYS)[number];

/** Map an inspection status + flags to the single dominant friction key. */
export function frictionKeyFor(status: InspectionStatus, fakeGreenHigh: boolean, staleHigh: boolean): FrictionKey | null {
  if (status === "healthy") return null;
  // Fake-green (proof dishonesty) dominates stale (idle owner) when both fire.
  if (fakeGreenHigh) return "fake_green";
  if (staleHigh) return "stale";
  return null;
}

/**
 * Advance streaks: bump the active friction key, reset all others to zero.
 * Pure; the caller supplies prior rows and persists `toPersist`.
 */
export function advanceStreaks(prior: InspectionStreakRow[], active: FrictionKey | null): StreakUpdate {
  const priorByKey = new Map(prior.map((r) => [r.friction_key, r.streak ?? 0]));
  const toPersist: Array<{ friction_key: string; streak: number }> = [];
  let activeStreak = 0;

  for (const key of ALL_KEYS) {
    if (key === active) {
      const next = (priorByKey.get(key) ?? 0) + 1;
      activeStreak = next;
      toPersist.push({ friction_key: key, streak: next });
    } else {
      // Reset non-active keys so a one-off blip does not accumulate forever.
      toPersist.push({ friction_key: key, streak: 0 });
    }
  }

  return { frictionKey: active, streak: active ? activeStreak : 0, toPersist };
}

/** A Boardroom todo row ready to insert from an improvement-job proposal. */
export interface ImprovementTodoRow {
  api_key_hash: string;
  title: string;
  description: string;
  status: "open";
  priority: "low" | "normal" | "high" | "urgent";
  created_by_agent_id: string;
}

/** Map a proposal to a todo row. Caller supplies tenant + the proposing agent id. */
export function proposalToTodoRow(
  proposal: ImprovementJobProposal,
  apiKeyHash: string,
  createdByAgentId: string,
): ImprovementTodoRow {
  const description =
    `${proposal.rationale}\n\nLane: ${proposal.lane}\n` +
    `Evidence: ${proposal.evidence.join(", ")}\n` +
    `Proposed by session-start inspection. Gated: Autopilot Improver lane builds under its own tiers.`;
  return {
    api_key_hash: apiKeyHash,
    title: proposal.title,
    description,
    status: "open",
    priority: proposal.priority,
    created_by_agent_id: createdByAgentId,
  };
}
