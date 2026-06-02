// Heartbeat no-op reason codes (WriterLane minimum release #5).
//
// Dead code. Nothing in this repo wires it yet: not the scheduled heartbeat,
// not the watcher, not the orchestrator ledger. This module defines ONLY the
// vocabulary and the pure classifier for heartbeat outcomes, decoupled from any
// concrete heartbeat runner so the shape can be reviewed before anything depends
// on it. Wiring it into the live heartbeat-protocol prose and the orchestrator
// ledger is the gated follow-up; see the WriterLane epic.
//
// Why this exists: today the heartbeat policy lets a healthy cycle emit a plain
// "UnClick healthy." / "no change" as its main status (see heartbeat-protocol.ts
// throttle_rules.idle_message and procedure step 14). A bare "no change" hides
// WHY nothing happened: was the queue empty, were the tools missing, was a
// duplicate wake suppressed, did a stale lease get released? This module makes
// every heartbeat outcome carry exactly one named reason code so the silence is
// legible in the ledger instead of being an unexplained blank.
//
// Purity / safety:
//   - Pure. No DB, no LLM, no network, no shell, no filesystem, no git, no
//     secrets, no side effects. It classifies a supplied signal; it never
//     gathers the signal itself.
//   - Total + fail-closed: classifyHeartbeatOutcome ALWAYS returns exactly one
//     named code. There is no "no code" / silent-no-change path. In particular
//     it never returns NO_WORK while actionable backlog exists.

// Exact, stable reason codes. Callers, the ledger, and tests gate on these
// strings, so they must not change without a coordinated migration.

// Tools/connectors the heartbeat needs were not available, so it could not even
// run the job hunt. A capability gap, not a healthy idle.
export const HEARTBEAT_TOOLS_MISSING = "heartbeat_tools_missing";
// The job hunt ran and found no actionable backlog (actionable_todos === 0 and
// no in_progress work). The ONLY code that means a genuine quiet cycle.
export const HEARTBEAT_NO_WORK = "heartbeat_no_work";
// A wake/nudge for a target that was already nudged this window was suppressed
// to avoid a duplicate. Honors the one-tether-heartbeat-per-seat rule.
export const HEARTBEAT_SAME_TARGET_SUPPRESSED = "heartbeat_same_target_suppressed";
// NudgeOnly returned advisory_only for an owner-silence-past-TTL item; the
// heartbeat bypassed the advisory and proceeded on deterministic lease-expiry
// evidence instead of waiting on the bridge.
export const HEARTBEAT_ADVISORY_ONLY_BYPASSED = "heartbeat_advisory_only_bypassed";
// An expired ownership lease was released back to the queue (a safe, reversible
// action). Carries an action, but it is a recovery action, not new build work.
export const HEARTBEAT_STALE_OWNER_RELEASED = "heartbeat_stale_owner_released";
// The heartbeat performed one safe Fleet Action Runner step with proof. The one
// outcome that is NOT a no-op.
export const HEARTBEAT_ACTION_TAKEN = "heartbeat_action_taken";
// Actionable state exists but only a human may move it (protected surface, or
// backlog the heartbeat may not safely action itself). Surfaced as a named
// blocker, never as a silent "no change".
export const HEARTBEAT_HUMAN_ONLY_BLOCKER = "heartbeat_human_only_blocker";

// The closed set of outcome codes. Order is the documented classification
// precedence used by classifyHeartbeatOutcome (highest precedence first).
export const HEARTBEAT_OUTCOME_CODES = [
  HEARTBEAT_TOOLS_MISSING,
  HEARTBEAT_ACTION_TAKEN,
  HEARTBEAT_STALE_OWNER_RELEASED,
  HEARTBEAT_HUMAN_ONLY_BLOCKER,
  HEARTBEAT_SAME_TARGET_SUPPRESSED,
  HEARTBEAT_ADVISORY_ONLY_BYPASSED,
  HEARTBEAT_NO_WORK,
] as const;

export type HeartbeatOutcomeCode = (typeof HEARTBEAT_OUTCOME_CODES)[number];

// The codes that represent a no-op (the heartbeat did not perform a build/fleet
// action). HEARTBEAT_ACTION_TAKEN is the only non-no-op. HEARTBEAT_STALE_OWNER_
// RELEASED is treated as a no-op for build purposes: it recovered a dead lease
// but produced no new work product.
export const HEARTBEAT_NOOP_CODES: readonly HeartbeatOutcomeCode[] = [
  HEARTBEAT_TOOLS_MISSING,
  HEARTBEAT_STALE_OWNER_RELEASED,
  HEARTBEAT_HUMAN_ONLY_BLOCKER,
  HEARTBEAT_SAME_TARGET_SUPPRESSED,
  HEARTBEAT_ADVISORY_ONLY_BYPASSED,
  HEARTBEAT_NO_WORK,
];

// Short, stable human labels for ledger/orchestrator lines. Kept terse to honor
// the heartbeat alert style ("no prose, no bullets, no bold").
export const HEARTBEAT_OUTCOME_LABELS: Record<HeartbeatOutcomeCode, string> = {
  [HEARTBEAT_TOOLS_MISSING]: "tools missing",
  [HEARTBEAT_ACTION_TAKEN]: "action taken",
  [HEARTBEAT_STALE_OWNER_RELEASED]: "stale owner released",
  [HEARTBEAT_HUMAN_ONLY_BLOCKER]: "human-only blocker",
  [HEARTBEAT_SAME_TARGET_SUPPRESSED]: "same target suppressed",
  [HEARTBEAT_ADVISORY_ONLY_BYPASSED]: "advisory_only bypassed",
  [HEARTBEAT_NO_WORK]: "no work",
};

export function isHeartbeatNoOp(code: HeartbeatOutcomeCode): boolean {
  return HEARTBEAT_NOOP_CODES.includes(code);
}

// The compact, structured outcome of one heartbeat cycle for ONE seat. The
// caller (the heartbeat runner) fills this in from its job hunt; this module
// only classifies it. Booleans describe what the cycle observed/did; the
// classifier applies a fixed precedence so identical signals always map to the
// identical code (no oscillation).
export interface HeartbeatSignal {
  // The single seat tether this heartbeat ran for. Required and non-empty:
  // every coded outcome is attributed to exactly one seat (one-tether-per-seat).
  readonly seatTetherId: string;
  // False when the connectors/tools the heartbeat needs were unavailable.
  readonly toolsAvailable: boolean;
  // True when the cycle performed one safe Fleet Action Runner step with proof.
  readonly actionTaken: boolean;
  // True when an expired ownership lease was released back to the queue.
  readonly staleOwnerReleased: boolean;
  // True when actionable state exists that only a human may move (protected
  // surface, or backlog the heartbeat may not safely action itself).
  readonly humanOnlyBlocker: boolean;
  // True when a duplicate wake/nudge to an already-targeted item was suppressed.
  readonly sameTargetSuppressed: boolean;
  // True when a NudgeOnly advisory_only verdict was bypassed on deterministic
  // lease-expiry evidence.
  readonly advisoryOnlyBypassed: boolean;
  // Count of actionable todos found by the job hunt. 0 is required for NO_WORK.
  readonly actionableTodoCount: number;
}

export interface HeartbeatOutcome {
  readonly seatTetherId: string;
  readonly code: HeartbeatOutcomeCode;
  readonly isNoOp: boolean;
  readonly label: string;
  // A stable single ledger/orchestrator line: "<seat> -- <code> -- <label>".
  readonly ledgerLine: string;
}

// Classify a single heartbeat cycle into exactly one named outcome code.
//
// Fixed precedence (also the order of HEARTBEAT_OUTCOME_CODES):
//   1. tools missing        - could not run; capability gap dominates.
//   2. action taken         - a safe step ran; report the action.
//   3. stale owner released - a dead lease was recovered.
//   4. human-only blocker   - actionable state only a human may move, OR
//                             actionable backlog the heartbeat did not and may
//                             not safely action itself. This is what stops a
//                             bare "no change" from hiding live backlog.
//   5. same target suppressed
//   6. advisory_only bypassed
//   7. no work              - reached ONLY when actionableTodoCount === 0.
//
// Fail-closed: the function is total and never returns an empty / "no change"
// status. If backlog exists (actionableTodoCount > 0) but the cycle neither
// acted, released, suppressed, nor bypassed, the honest disposition is a
// human/builder handoff, so it returns HEARTBEAT_HUMAN_ONLY_BLOCKER rather than
// falsely claiming NO_WORK.
export function classifyHeartbeatOutcome(signal: HeartbeatSignal): HeartbeatOutcome {
  const seatTetherId = String(signal?.seatTetherId ?? "").trim();
  if (seatTetherId.length === 0) {
    throw new Error(
      "classifyHeartbeatOutcome: seatTetherId is required (one tether per seat)",
    );
  }

  const code = pickHeartbeatCode(signal);
  const label = HEARTBEAT_OUTCOME_LABELS[code];
  return {
    seatTetherId,
    code,
    isNoOp: isHeartbeatNoOp(code),
    label,
    ledgerLine: `${seatTetherId} -- ${code} -- ${label}`,
  };
}

function pickHeartbeatCode(signal: HeartbeatSignal): HeartbeatOutcomeCode {
  if (signal.toolsAvailable !== true) return HEARTBEAT_TOOLS_MISSING;
  if (signal.actionTaken === true) return HEARTBEAT_ACTION_TAKEN;
  if (signal.staleOwnerReleased === true) return HEARTBEAT_STALE_OWNER_RELEASED;
  if (signal.humanOnlyBlocker === true) return HEARTBEAT_HUMAN_ONLY_BLOCKER;
  if (signal.sameTargetSuppressed === true) return HEARTBEAT_SAME_TARGET_SUPPRESSED;
  if (signal.advisoryOnlyBypassed === true) return HEARTBEAT_ADVISORY_ONLY_BYPASSED;
  // Backlog exists but the cycle did nothing safe with it: route to a human/
  // builder instead of falsely reporting an empty queue.
  if (Number(signal.actionableTodoCount) > 0) return HEARTBEAT_HUMAN_ONLY_BLOCKER;
  return HEARTBEAT_NO_WORK;
}

// Honor one-tether-heartbeat-per-seat: a single heartbeat run must carry exactly
// one distinct seat tether id. Returns that id, or throws if there are zero or
// more than one distinct ids. Pure helper for callers assembling a run.
export function assertSingleSeatTether(seatTetherIds: readonly string[]): string {
  const distinct = [
    ...new Set(
      (seatTetherIds ?? [])
        .map((id) => String(id ?? "").trim())
        .filter((id) => id.length > 0),
    ),
  ];
  if (distinct.length === 0) {
    throw new Error("assertSingleSeatTether: no seat tether id supplied");
  }
  if (distinct.length > 1) {
    throw new Error(
      `assertSingleSeatTether: expected one seat tether per heartbeat, got ${distinct.length}: ${distinct.join(", ")}`,
    );
  }
  return distinct[0];
}
