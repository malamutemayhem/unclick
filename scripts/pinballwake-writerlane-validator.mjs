// WriterLane validation layer - runtime .mjs mirror.
//
// Dead code. Nothing wires it: not the runner, not CodeRoom, not OpenHands, not
// the watcher, not cron.
//
// WHY this file exists as a .mjs duplicate of api/lib/writerlane/writerlane-validator.ts:
// the autopilot runner is plain `node ...mjs` and cannot import the TypeScript
// WriterLane lib at runtime. This is the runtime mirror of the MERGED validator
// (PR #1055) - the layer the #1052 scope/diff gate does NOT cover: it proves the
// code WORKS (testsPassed, supplied by a real external run) and is CLEAN / within
// budget (pure functions of the patch text). Keep in sync with the TS spec.
//
// Pure. No DB, no LLM, no network, no shell, no filesystem, no git, no secrets.
// It NEVER runs tests itself: testsPassed is supplied as input.

// Exact, stable reason codes (mirror the TS lib). Callers / tests gate on these.
export const WRITERLANE_SCOPE_GATE_FAILED = "writerlane_scope_gate_failed";
export const WRITERLANE_TESTS_FAILED = "writerlane_tests_failed";
export const WRITERLANE_UNCLEAN_OUTPUT = "writerlane_unclean_output";
export const WRITERLANE_DIFF_OVER_BUDGET = "writerlane_diff_over_budget";

// Mirrors acceptsAsAutonomyProof in api/lib/writerlane/writerlane-types.ts: a
// result counts as scope-gate proof ONLY under autonomy mode, on success, with an
// explicit proof.autonomyProof === true. Fixture / canned output sets that false.
export function acceptsAsAutonomyProof(result, proofMode) {
  if (proofMode !== "autonomy") return false;
  if (!result || result.ok !== true) return false;
  return result.proof?.autonomyProof === true;
}

// THE extended autonomy-proof gate for real code writers. Proof ONLY IF it clears
// the scope/diff gate AND validation reports testsPassed AND clean AND
// withinDiffBudget. Fail-closed and order-stable: scope, tests, clean, budget.
export function validateAutonomyProof(result, proofMode, validation) {
  if (!acceptsAsAutonomyProof(result, proofMode)) {
    return { ok: false, reason: WRITERLANE_SCOPE_GATE_FAILED };
  }
  if (validation?.testsPassed !== true) {
    return { ok: false, reason: WRITERLANE_TESTS_FAILED };
  }
  if (validation?.clean !== true) {
    return { ok: false, reason: WRITERLANE_UNCLEAN_OUTPUT };
  }
  if (validation?.withinDiffBudget !== true) {
    return { ok: false, reason: WRITERLANE_DIFF_OVER_BUDGET };
  }
  return { ok: true };
}

export function isValidatedAutonomyProof(result, proofMode, validation) {
  return validateAutonomyProof(result, proofMode, validation).ok;
}

// ---------------------------------------------------------------------------
// CLEAN check (pure)
// ---------------------------------------------------------------------------

// Chat-template / role scaffolding tokens that betray raw model chatter leaking
// into a patch (the real laguna-xs.2 failure leaked "</assistant>"). Does NOT
// include code-fence markers (```), which are legitimate in a Markdown diff.
export const UNCLEAN_MARKERS = [
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
// removed lines are ignored. Returns the distinct markers found (empty => clean).
export function scanForUncleanArtifacts(patch, markers = UNCLEAN_MARKERS) {
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

export function isCleanPatch(patch, markers = UNCLEAN_MARKERS) {
  return scanForUncleanArtifacts(patch, markers).length === 0;
}

// ---------------------------------------------------------------------------
// DIFF BUDGET / doc-preservation guard (pure)
// ---------------------------------------------------------------------------

function isDocOrCommentContent(content) {
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

// Count added / removed content lines, classifying removed doc/comment lines.
// Header lines (+++/---) and hunk markers (@@) are not content.
export function computeDiffStats(patch) {
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
export function isWithinDiffBudget(patch, budget = {}) {
  const stats = computeDiffStats(patch);
  if (typeof budget.maxAddedLines === "number" && stats.addedLines > budget.maxAddedLines) {
    return false;
  }
  if (typeof budget.maxRemovedLines === "number" && stats.removedLines > budget.maxRemovedLines) {
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

// Build a validation by computing clean + withinDiffBudget from the patch, with
// testsPassed supplied from the real (external) test run.
export function buildValidationFromPatch(patch, testsPassed, budget = {}, markers = UNCLEAN_MARKERS) {
  return {
    testsPassed: testsPassed === true,
    clean: isCleanPatch(patch, markers),
    withinDiffBudget: isWithinDiffBudget(patch, budget),
  };
}
