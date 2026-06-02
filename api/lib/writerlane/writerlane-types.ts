// WriterLane interface + contract (minimum release #1).
//
// Dead code. Nothing in this repo wires it yet: not the autopilot runner, not
// CodeRoom, not OpenHands, not the watcher. WriterLane is the planned
// "swappable socket" for autopilot's code-writer; this module defines ONLY the
// contract a backend must satisfy, decoupled from any concrete producer so the
// shape can be reviewed and revised before anything depends on it.
//
// Pure types plus small pure predicates (acceptsAsAutonomyProof, the type
// guards). No DB, no LLM, no network, no side effects, and no imports from the
// runner / watcher / CodeRoom.

// The repo currently carries scope packs only as an untyped
// Record<string, unknown> (see api/lib/scope-pack-comments.ts:
// ScopePackSource.scope_pack). A WriterLane producer needs to know which files
// it may change, what change to make, and how the result will be proven, so we
// define a minimal structured descriptor here rather than threading the untyped
// bag through. Kept local + minimal on purpose; widen later if the real
// ScopePack grows a shared typed form.
export interface WriterLaneScopePack {
  // Files the writer is allowed to change. A producer MUST NOT touch anything
  // outside this set.
  ownedFiles: string[];
  // Statement of what change to make.
  changeIntent: string;
  // What must hold for the change to count as done (test ids, commands,
  // acceptance notes). Free-form on purpose at this stage.
  proofRequirements: string[];
}

// How a WriterLane result will be judged.
// - "autonomy": the patch is offered as evidence the writer did real,
//   autonomous work. Canned / echoed / fixture patches MUST NOT pass under this
//   mode.
// - "plumbing": wiring / smoke checks where a fixture patch is acceptable
//   because nothing is claiming it as proof of autonomy.
export type WriterLaneProofMode = "autonomy" | "plumbing";

// Canonical id for the fixture / plumbing backend. Declared in the contract
// module so producers and consumers agree on the string without importing the
// backend. (This is a name, not a backend: no fixture logic lives here.)
export const FIXTURE_BACKEND_KIND = "fixture";

export interface WriterLaneInput {
  scopePack: WriterLaneScopePack;
  proofMode: WriterLaneProofMode;
}

// Attached to a SUCCESS result. The contract forbids fixture / canned / echoed
// patches from counting as autonomy proof: such backends MUST set
// autonomyProof = false. See acceptsAsAutonomyProof for the single gate that
// enforces this.
export interface WriterLaneProof {
  // True ONLY when the patch is genuine autonomous output. Fixture / canned
  // backends MUST set this false.
  autonomyProof: boolean;
  // Free-form notes about how the result was produced / can be verified.
  notes?: string;
}

export interface WriterLaneSuccess {
  ok: true;
  patch: string;
  changedFiles: string[];
  proof: WriterLaneProof;
}

// Fail-closed result. reason is a required, non-empty string explaining why the
// writer produced no patch. There is no implicit "empty success": absence of a
// patch is always an explicit failure with a reason.
export interface WriterLaneFailure {
  ok: false;
  reason: string;
}

export type WriterLaneResult = WriterLaneSuccess | WriterLaneFailure;

// A swappable code-writer backend. Concrete backends (the future OpenHands one,
// or the fixture one in this slice) implement this. produce() must resolve to a
// WriterLaneResult and never throw for ordinary failure: it fails closed with a
// reason instead.
export interface WriterLaneBackend {
  // Stable identifier, e.g. "fixture" or (later) "openhands".
  readonly kind: string;
  // True if this backend only emits fixture / canned output and can never
  // produce genuine autonomy proof.
  readonly isFixture: boolean;
  produce(input: WriterLaneInput): Promise<WriterLaneResult>;
}

export function isWriterLaneSuccess(
  result: WriterLaneResult,
): result is WriterLaneSuccess {
  return result.ok === true;
}

// A result is a valid fail-closed failure only when reason is a non-empty
// string. An empty reason does not satisfy the contract.
export function isWriterLaneFailure(
  result: WriterLaneResult,
): result is WriterLaneFailure {
  return (
    result.ok === false &&
    typeof result.reason === "string" &&
    result.reason.trim().length > 0
  );
}

// The single contract gate the rest of the system must use to decide whether a
// WriterLane result may be counted as proof of autonomous work.
//
// Fail-closed by construction: a result counts as autonomy proof ONLY when
//   - it ran under the "autonomy" proof mode, AND
//   - the writer succeeded (ok === true), AND
//   - the proof explicitly marks itself autonomyProof === true.
//
// Fixture / canned / echoed patches set proof.autonomyProof = false, so they can
// NEVER pass here regardless of mode. This is the rule minimum release #1/#2
// exists to encode.
export function acceptsAsAutonomyProof(
  result: WriterLaneResult,
  proofMode: WriterLaneProofMode,
): boolean {
  if (proofMode !== "autonomy") return false;
  if (result.ok !== true) return false;
  return result.proof.autonomyProof === true;
}
