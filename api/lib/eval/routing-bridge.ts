// Routing bridge: join writerlane eligibility (the hard filter) with the
// proof-rewarded bandit (the learned preference). This is the live tie-in for
// docs/path-a-learning-and-autonomy.md part 1a: writerlane decides WHICH
// backends are allowed; the bandit decides WHICH allowed one to prefer, learned
// from real proof outcomes.
//
// Safety invariant (tested): the bridge can only ever return a backend that
// writerlane already marked eligible. Learning never widens the allowed set;
// and until the learned table has earned promotion, the bridge falls back to
// writerlane's own static pick, so behaviour is unchanged on a cold start.
//
// Pure and deterministic (inject the RNG). The arm table comes from the caller
// (loaded from persistence); this module is the decision, not the IO.

import type {
  WriterLaneSelection,
  WriterLaneSelectionSuccess,
} from "../../writerlane/writerlane-router.js";
import { routeAmong, evaluateRoutingPromotion } from "./learned-router.js";
import type { ArmTable } from "./router-bandit.js";
import type { SelectOptions } from "./router-bandit.js";

export interface BridgeOptions extends SelectOptions {
  /** Promotion thresholds for letting learned routing take the wheel. */
  minPullsPerArm?: number;
  minMeanReward?: number;
}

export interface BridgeDecision {
  /** The chosen backend kind. Always one writerlane marked eligible. */
  arm: string;
  /** "learned" if the bandit chose; "writerlane" if we fell back to the static pick. */
  source: "learned" | "writerlane";
  /** Why we used that source. */
  reason: string;
  /** The eligible arms considered (writerlane's eligible candidate kinds). */
  eligibleArms: string[];
}

/** Eligible backend kinds from a successful writerlane selection. */
export function eligibleArmsFromSelection(selection: WriterLaneSelectionSuccess): string[] {
  return selection.candidates.filter((c) => c.eligible).map((c) => c.kind);
}

/**
 * Choose a backend by learned proof-reward among writerlane's eligible set.
 * Falls back to writerlane's own selected backend when the learned table has
 * not earned promotion, or when there is only one eligible arm.
 */
export function bridgeRouteDecision(
  selection: WriterLaneSelection,
  table: ArmTable,
  options: BridgeOptions = {},
): BridgeDecision | null {
  if (!selection.ok) return null; // no eligible backend at all; nothing to route

  const eligibleArms = eligibleArmsFromSelection(selection);
  const writerlanePick = selection.selected.kind;

  if (eligibleArms.length <= 1) {
    return {
      arm: writerlanePick,
      source: "writerlane",
      reason: "only one eligible backend; no choice to learn",
      eligibleArms,
    };
  }

  // Gate: only let learned routing take over once it has earned it. We restrict
  // the promotion check to the eligible arms so an unrelated strong arm cannot
  // unlock routing for this decision.
  const restricted: ArmTable = {
    arms: Object.fromEntries(
      Object.entries(table.arms).filter(([arm]) => eligibleArms.includes(arm)),
    ),
  };
  const promotion = evaluateRoutingPromotion(restricted, {
    minPullsPerArm: options.minPullsPerArm,
    minMeanReward: options.minMeanReward,
  });

  if (!promotion.promote) {
    return {
      arm: writerlanePick,
      source: "writerlane",
      reason: `learned routing not promoted: ${promotion.reasons[0] ?? "insufficient evidence"}`,
      eligibleArms,
    };
  }

  const decision = routeAmong(eligibleArms, restricted, options);
  return {
    arm: decision.arm,
    source: "learned",
    reason: `learned routing chose "${decision.arm}" (${decision.selection.strategy})`,
    eligibleArms,
  };
}
