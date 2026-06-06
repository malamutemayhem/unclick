// WriterLane validation layer (validator slice).
//
// Dead code. Nothing in this repo wires it yet: not the autopilot runner, not
// CodeRoom, not OpenHands, not the watcher, not cron. This module extends the
// WriterLane autonomy-proof contract with the layer the merged #1052 scope/diff
// gate does NOT cover.
//
// Why this layer exists: the #1052 gate (gateOpenHandsDiff / acceptsAsAutonomyProof)
// proves AUTHORSHIP + SCOPE + a real trusted worktree diff, but it does NOT prove
// the code works or is clean. Two real free-model runs proved the gap: one model
// passed the scope gate yet shipped a stray "</assistant>" chat-template tag (a
// syntax error that broke the module), and another passed the tests yet DELETED a
// docstring (over-edited, +14/-14). So clearing the scope gate is necessary but
// not sufficient.
//
// Purity / safety:
//   - Pure. No DB, no LLM, no network, no shell, no filesystem, no git, no
//     secrets, no side effects.
//   - It does NOT run tests or builds itself. Exactly like the injected diff in
//     the #1052 backend, it ACCEPTS a validation result as INPUT and gates on it.
//     The testsPassed verdict is supplied by a real test runner that lives
//     outside this pure module. The clean / withinDiffBudget signals are pure
//     functions of the patch text, so this module also offers helpers to compute
//     them (scanForUncleanArtifacts, isWithinDiffBudget).
//   - Fail-closed: any missing or failing validation component means the result
//     is NOT autonomy proof.

import {
  acceptsAsAutonomyProof,
  type WriterLaneProofMode,
  type WriterLaneResult,
} from "./writerlane-types.js";

// Exact, stable reason codes. Callers and tests gate on these strings.
// The underlying scope/diff gate (acceptsAsAutonomyProof) rejected the result,
// so it never even reached validation.
export const WRITERLANE_SCOPE_GATE_FAILED = "writerlane_scope_gate_failed";
// The project's tests / build for the slice did not pass.
export const WRITERLANE_TESTS_FAILED = "writerlane_tests_failed";
// Changed files carried stray model chatter / chat-template tags / non-code junk.
export const WRITERLANE_UNCLEAN_OUTPUT = "writerlane_unclean_output";
// The diff exceeded its size budget or violated the doc-preservation guard
// (over-edited beyond the scope).
export const WRITERLANE_DIFF_OVER_BUDGET = "writerlane_diff_over_budget";

// The validation verdict a real test/build run produces for one WriterLane
// result. Supplied to the gate as data; this module never produces testsPassed
// itself.
export interface WriterLaneValidation {
  // The project's tests / build for the slice ran and passed. The pure lib never
  // runs them; the caller supplies this verdict.
  readonly testsPassed: boolean;
  // The changed files carry no stray model chatter / chat-template tags /
  // non-code junk. Compute with scanForUncleanArtifacts / isCleanPatch.
  readonly clean: boolean;
  // The diff stayed within its size budget and did not over-edit (e.g. delete a
  // docstring). Compute with isWithinDiffBudget.
  readonly withinDiffBudget: boolean;
  // Free-form notes about how validation was performed.
  readonly notes?: string;
}

export interface ValidatedProofAccept {
  readonly ok: true;
}

export interface ValidatedProofReject {
  readonly ok: false;
  readonly reason: string;
}

export type ValidatedProofOutcome = ValidatedProofAccept | ValidatedProofReject;

// THE extended autonomy-proof contract gate for real code writers.
//
// A result counts as autonomy proof ONLY IF:
//   1. it clears the existing scope/diff gate (acceptsAsAutonomyProof), AND
//   2. its validation reports testsPassed AND clean AND withinDiffBudget.
//
// Fail-closed and order-stable: scope gate, then tests, then clean, then budget.
// A result that clears scope but fails any validation component is NOT proof.
export function validateAutonomyProof(
  result: WriterLaneResult,
  proofMode: WriterLaneProofMode,
  validation: WriterLaneValidation,
): ValidatedProofOutcome {
  if (!acceptsAsAutonomyProof(result, proofMode)) {
    return { ok: false, reason: WRITERLANE_SCOPE_GATE_FAILED };
  }
  if (validation.testsPassed !== true) {
    return { ok: false, reason: WRITERLANE_TESTS_FAILED };
  }
  if (validation.clean !== true) {
    return { ok: false, reason: WRITERLANE_UNCLEAN_OUTPUT };
  }
  if (validation.withinDiffBudget !== true) {
    return { ok: false, reason: WRITERLANE_DIFF_OVER_BUDGET };
  }
  return { ok: true };
}

// Boolean convenience: true ONLY when the full extended contract passes.
export function isValidatedAutonomyProof(
  result: WriterLaneResult,
  proofMode: WriterLaneProofMode,
  validation: WriterLaneValidation,
): boolean {
  return validateAutonomyProof(result, proofMode, validation).ok;
}

// ---------------------------------------------------------------------------
// CLEAN check (pure)
// ---------------------------------------------------------------------------

// Chat-template / role scaffolding tokens that betray raw model chatter leaking
// into a patch. The real laguna-xs.2 failure leaked "</assistant>"; these are the
// family of junk tokens that must never reach committed code. Deliberately does
// NOT include code-fence markers (```), because those are legitimate content in
// a Markdown diff; callers can pass custom markers if they need fence detection.
export const UNCLEAN_MARKERS: readonly string[] = [
  "</assistant>",
  "<assistant>",
  "</user>",
  "<user>",
  "</system>",
  "<system>",
  "<|im_start|>",
  "<|im_end|>",
  "<|endoftext|>",
  "</s>",
];

// Scan only the ADDED lines of a unified diff for unclean artifacts. Context and
// removed lines are not the writer's new output, so they are ignored. Returns the
// distinct markers found (empty array => clean). Pure string work.
export function scanForUncleanArtifacts(
  patch: string,
  markers: readonly string[] = UNCLEAN_MARKERS,
): string[] {
  const added = String(patch ?? "")
    .split(/\r?\n/)
    .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
    .join("\n")
    .toLowerCase();
  const found = markers.filter((marker) =>
    added.includes(String(marker).toLowerCase()),
  );
  return [...new Set(found)];
}

// True when the added lines carry no unclean artifacts.
export function isCleanPatch(
  patch: string,
  markers: readonly string[] = UNCLEAN_MARKERS,
): boolean {
  return scanForUncleanArtifacts(patch, markers).length === 0;
}

// ---------------------------------------------------------------------------
// DIFF BUDGET / doc-preservation guard (pure)
// ---------------------------------------------------------------------------

export interface DiffBudget {
  // Max added content lines allowed.
  readonly maxAddedLines?: number;
  // Max removed content lines allowed. An over-edit that deletes a docstring
  // shows up as a spike in removed lines (the glm-4.5-air run was +14/-14).
  readonly maxRemovedLines?: number;
  // Max total churn (added + removed) allowed.
  readonly maxChangedLines?: number;
  // Doc-preservation guard: when true, reject any patch that DELETES a doc /
  // comment line. This is the direct guard against the over-edit that silently
  // strips a docstring while still passing tests.
  readonly forbidDocDeletion?: boolean;
}

export interface DiffStats {
  readonly addedLines: number;
  readonly removedLines: number;
  // Removed lines whose content looks like a doc / comment line.
  readonly removedDocLines: number;
}

function isDocOrCommentContent(content: string): boolean {
  const trimmed = content.trim();
  return (
    trimmed.startsWith("/**") ||
    trimmed.startsWith("*/") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith('"""') ||
    trimmed.startsWith("'''") ||
    trimmed.startsWith("<!--")
  );
}

// Count added / removed content lines from a unified diff, classifying removed
// doc/comment lines. Header lines (+++/---) and hunk markers (@@) are not content.
export function computeDiffStats(patch: string): DiffStats {
  let addedLines = 0;
  let removedLines = 0;
  let removedDocLines = 0;
  for (const line of String(patch ?? "").split(/\r?\n/)) {
    if (line.startsWith("+") && !line.startsWith("+++")) {
      addedLines += 1;
    } else if (line.startsWith("-") && !line.startsWith("---")) {
      removedLines += 1;
      if (isDocOrCommentContent(line.slice(1))) {
        removedDocLines += 1;
      }
    }
  }
  return { addedLines, removedLines, removedDocLines };
}

// True when the patch fits the budget. An unset budget field is not enforced.
export function isWithinDiffBudget(patch: string, budget: DiffBudget): boolean {
  const stats = computeDiffStats(patch);
  if (
    typeof budget.maxAddedLines === "number" &&
    stats.addedLines > budget.maxAddedLines
  ) {
    return false;
  }
  if (
    typeof budget.maxRemovedLines === "number" &&
    stats.removedLines > budget.maxRemovedLines
  ) {
    return false;
  }
  if (
    typeof budget.maxChangedLines === "number" &&
    stats.addedLines + stats.removedLines > budget.maxChangedLines
  ) {
    return false;
  }
  if (budget.forbidDocDeletion === true && stats.removedDocLines > 0) {
    return false;
  }
  return true;
}

// Convenience: build a WriterLaneValidation by computing clean + withinDiffBudget
// from the patch, with testsPassed supplied from the real (external) test run.
// Keeps the pure / injected-verdict split explicit: the lib derives what it can
// from text, the caller owns the test verdict.
export function buildValidationFromPatch(
  patch: string,
  testsPassed: boolean,
  budget: DiffBudget,
  markers: readonly string[] = UNCLEAN_MARKERS,
): WriterLaneValidation {
  return {
    testsPassed,
    clean: isCleanPatch(patch, markers),
    withinDiffBudget: isWithinDiffBudget(patch, budget),
  };
}
