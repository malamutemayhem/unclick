// WriterLane canary acceptance rule (minimum release #6).
//
// Dead code. Nothing in this repo wires it yet: not the autonomous runner, not
// the canary CI check, not the watcher. This module is a POLICY / GUARD, not a
// feature. It defines the single gate that decides whether an autonomy canary
// run may be called a VICTORY, and it is built to be reviewed before anything
// depends on it.
//
// What it guards against: the WriterLane fixture backend (#2) emits a known,
// hard-coded diff so the plumbing can be exercised without an LLM. That is
// useful for wiring, but a plumbing run must NEVER be reported as proof that the
// system autonomously wrote and shipped code. This gate ties the verdict to the
// backend identity + commit SHA and refuses any pass whose patch came from the
// fixture backend or is a canned / echoed copy of the fixture diff.
//
// Victory (the canary's definition of a win) requires ALL of:
//   1. a non-fixture backend,
//   2. a real diff (not empty, not the fixture/echoed patch),
//   3. the extended autonomy-proof contract passes (validateAutonomyProof:
//      scope gate + tests + clean + diff budget),
//   4. a real commit SHA the verdict is tied to,
//   5. an App PR carrying the change,
//   6. green checks,
//   7. a protected merge, and
//   8. ledger human_touch_count === 0.
//
// Purity / safety:
//   - Pure. No DB, no LLM, no network, no shell, no filesystem, no git, no
//     secrets, no side effects. It ACCEPTS the build facts as input (PR url,
//     checks-green, protected-merge, human_touch_count) exactly like the
//     validator accepts the test verdict; it never gathers them itself.
//   - Fail-closed and order-stable: any missing or failing component means the
//     run is NOT a victory, with a single named reason.

import { FIXTURE_BACKEND_KIND, type WriterLaneResult, type WriterLaneProofMode } from "./writerlane-types.js";
import { FIXTURE_CHANGED_FILES, FIXTURE_PATCH } from "./fixture-backend.js";
import {
  validateAutonomyProof,
  type WriterLaneValidation,
} from "./writerlane-validator.js";

// Exact, stable reason codes. Callers, the canary CI check, and tests gate on
// these strings, so they must not change without a coordinated migration.

// The patch was produced by the PLUMBING-ONLY fixture backend (by kind or by
// the isFixture flag). The headline rule: a fixture run is never a victory.
export const CANARY_FIXTURE_BACKEND = "canary_fixture_backend";
// The patch is a canned / echoed copy of the fixture diff (same content or the
// fixture sentinel file), even though the backend did not declare itself fixture.
export const CANARY_ECHOED_FIXTURE_DIFF = "canary_echoed_fixture_diff";
// The patch carried no real change (empty / whitespace-only, or no changed files).
export const CANARY_NO_REAL_DIFF = "canary_no_real_diff";
// The extended autonomy-proof contract (scope gate + tests + clean + budget)
// rejected the result. The detail carries the underlying validator reason.
export const CANARY_PROOF_GATE_FAILED = "canary_proof_gate_failed";
// No real commit SHA was supplied to tie the verdict to a build.
export const CANARY_NO_COMMIT_SHA = "canary_no_commit_sha";
// No App PR carried the change.
export const CANARY_NO_APP_PR = "canary_no_app_pr";
// CI checks were not green.
export const CANARY_CHECKS_NOT_GREEN = "canary_checks_not_green";
// The change did not land via a protected merge.
export const CANARY_UNPROTECTED_MERGE = "canary_unprotected_merge";
// The ledger recorded human involvement (human_touch_count !== 0), so the run is
// not zero-touch autonomous.
export const CANARY_HUMAN_TOUCHED = "canary_human_touched";

// The full claim a canary run presents for adjudication. The WriterLane result
// (patch + proof) plus the operational facts that surround a real ship. All
// supplied as data; this module derives nothing from the outside world.
export interface CanaryVictoryClaim {
  // Stable backend identifier, e.g. "fixture" or "openhands".
  readonly backendKind: string;
  // True if the backend only emits fixture / canned output. Mirrors
  // WriterLaneBackend.isFixture.
  readonly backendIsFixture: boolean;
  // The writer's result (success carries the patch + autonomy proof).
  readonly result: WriterLaneResult;
  // The proof mode the run claimed. Victory requires "autonomy".
  readonly proofMode: WriterLaneProofMode;
  // The external test/clean/budget verdict for the extended contract gate.
  readonly validation: WriterLaneValidation;
  // The real commit SHA the verdict is tied to.
  readonly commitSha: string;
  // The App PR url that carried the change.
  readonly appPrUrl: string;
  // CI checks were green on the merged commit.
  readonly checksGreen: boolean;
  // The change merged via protected branch rules (not a direct/force push).
  readonly protectedMerge: boolean;
  // Ledger human_touch_count. Must be exactly 0 for a zero-touch victory. This
  // is the SAME human_touch_count the autopilot ledger already produces (see
  // api/lib/autopilot-control-ledger.ts and api/lib/orchestrator-context.ts):
  // this gate consumes that value, it does not recompute it.
  readonly humanTouchCount: number;
}

export interface CanaryVictory {
  readonly ok: true;
  // Echoed back so the ledger can tie the win to an identity + build.
  readonly backendKind: string;
  readonly commitSha: string;
  readonly appPrUrl: string;
}

export interface CanaryRejection {
  readonly ok: false;
  readonly reason: string;
  // Optional extra context (e.g. the underlying validator reason).
  readonly detail?: string;
}

export type CanaryOutcome = CanaryVictory | CanaryRejection;

// True when a patch is the fixture diff or otherwise a canned echo of it. We
// compare against the canonical fixture constants so a non-fixture backend can
// not smuggle the plumbing diff through by simply not setting isFixture.
function isEchoedFixtureDiff(result: WriterLaneResult): boolean {
  if (result.ok !== true) return false;
  const patch = String(result.patch ?? "");
  if (patch.trim() === FIXTURE_PATCH.trim()) return true;
  const changed = result.changedFiles ?? [];
  return changed.some((file) => FIXTURE_CHANGED_FILES.includes(file));
}

// True when a success result carries no real change.
function hasNoRealDiff(result: WriterLaneResult): boolean {
  if (result.ok !== true) return true;
  const patch = String(result.patch ?? "");
  const changed = result.changedFiles ?? [];
  return patch.trim().length === 0 || changed.length === 0;
}

// THE canary victory gate.
//
// Fail-closed and order-stable. Precedence (most fundamental first):
//   1. fixture backend identity           -> CANARY_FIXTURE_BACKEND
//   2. echoed/canned fixture diff          -> CANARY_ECHOED_FIXTURE_DIFF
//   3. no real diff                        -> CANARY_NO_REAL_DIFF
//   4. extended autonomy-proof contract    -> CANARY_PROOF_GATE_FAILED (+detail)
//   5. real commit SHA                     -> CANARY_NO_COMMIT_SHA
//   6. App PR                              -> CANARY_NO_APP_PR
//   7. green checks                        -> CANARY_CHECKS_NOT_GREEN
//   8. protected merge                     -> CANARY_UNPROTECTED_MERGE
//   9. zero human touch                    -> CANARY_HUMAN_TOUCHED
// All clear -> victory.
//
// The fixture rules (1-2) come BEFORE the proof gate on purpose: a fixture run
// must be rejected with a fixture-specific reason, not a generic proof-gate
// failure, so "a plumbing run was mislabeled a win" is always legible.
export function acceptCanaryVictory(claim: CanaryVictoryClaim): CanaryOutcome {
  if (claim.backendIsFixture === true || claim.backendKind === FIXTURE_BACKEND_KIND) {
    return { ok: false, reason: CANARY_FIXTURE_BACKEND };
  }
  if (isEchoedFixtureDiff(claim.result)) {
    return { ok: false, reason: CANARY_ECHOED_FIXTURE_DIFF };
  }
  if (hasNoRealDiff(claim.result)) {
    return { ok: false, reason: CANARY_NO_REAL_DIFF };
  }

  const proof = validateAutonomyProof(claim.result, claim.proofMode, claim.validation);
  if (!proof.ok) {
    return { ok: false, reason: CANARY_PROOF_GATE_FAILED, detail: proof.reason };
  }

  if (String(claim.commitSha ?? "").trim().length === 0) {
    return { ok: false, reason: CANARY_NO_COMMIT_SHA };
  }
  if (String(claim.appPrUrl ?? "").trim().length === 0) {
    return { ok: false, reason: CANARY_NO_APP_PR };
  }
  if (claim.checksGreen !== true) {
    return { ok: false, reason: CANARY_CHECKS_NOT_GREEN };
  }
  if (claim.protectedMerge !== true) {
    return { ok: false, reason: CANARY_UNPROTECTED_MERGE };
  }
  if (Number(claim.humanTouchCount) !== 0) {
    return { ok: false, reason: CANARY_HUMAN_TOUCHED };
  }

  return {
    ok: true,
    backendKind: claim.backendKind,
    commitSha: String(claim.commitSha).trim(),
    appPrUrl: String(claim.appPrUrl).trim(),
  };
}

// Boolean convenience: true ONLY when the full canary victory gate passes.
export function isCanaryVictory(claim: CanaryVictoryClaim): boolean {
  return acceptCanaryVictory(claim).ok;
}
