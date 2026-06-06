import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  WRITERLANE_DIFF_OVER_BUDGET,
  WRITERLANE_SCOPE_GATE_FAILED,
  WRITERLANE_TESTS_FAILED,
  WRITERLANE_UNCLEAN_OUTPUT,
  acceptsAsAutonomyProof,
  buildValidationFromPatch,
  computeDiffStats,
  isCleanPatch,
  isValidatedAutonomyProof,
  isWithinDiffBudget,
  scanForUncleanArtifacts,
  validateAutonomyProof,
} from "./pinballwake-writerlane-validator.mjs";

const PROOF = { ok: true, patch: "x", changedFiles: ["a"], proof: { autonomyProof: true } };
const PASS_VALIDATION = { testsPassed: true, clean: true, withinDiffBudget: true };

describe("writerlane validator mirror: acceptsAsAutonomyProof", () => {
  it("accepts only autonomy mode + success + autonomyProof true", () => {
    assert.equal(acceptsAsAutonomyProof(PROOF, "autonomy"), true);
    assert.equal(acceptsAsAutonomyProof(PROOF, "plumbing"), false);
    assert.equal(acceptsAsAutonomyProof({ ok: false, reason: "x" }, "autonomy"), false);
    assert.equal(
      acceptsAsAutonomyProof({ ok: true, patch: "x", changedFiles: [], proof: { autonomyProof: false } }, "autonomy"),
      false,
    );
  });
});

describe("writerlane validator mirror: validateAutonomyProof order", () => {
  it("passes only when scope + tests + clean + budget all hold", () => {
    assert.deepEqual(validateAutonomyProof(PROOF, "autonomy", PASS_VALIDATION), { ok: true });
    assert.equal(isValidatedAutonomyProof(PROOF, "autonomy", PASS_VALIDATION), true);
  });

  it("fails scope gate first", () => {
    const r = validateAutonomyProof(PROOF, "plumbing", PASS_VALIDATION);
    assert.deepEqual(r, { ok: false, reason: WRITERLANE_SCOPE_GATE_FAILED });
  });

  it("fails tests before clean/budget", () => {
    const r = validateAutonomyProof(PROOF, "autonomy", { testsPassed: false, clean: false, withinDiffBudget: false });
    assert.deepEqual(r, { ok: false, reason: WRITERLANE_TESTS_FAILED });
  });

  it("fails clean before budget", () => {
    const r = validateAutonomyProof(PROOF, "autonomy", { testsPassed: true, clean: false, withinDiffBudget: false });
    assert.deepEqual(r, { ok: false, reason: WRITERLANE_UNCLEAN_OUTPUT });
  });

  it("fails budget last", () => {
    const r = validateAutonomyProof(PROOF, "autonomy", { testsPassed: true, clean: true, withinDiffBudget: false });
    assert.deepEqual(r, { ok: false, reason: WRITERLANE_DIFF_OVER_BUDGET });
  });
});

describe("writerlane validator mirror: clean check", () => {
  it("flags chat-template junk on ADDED lines only", () => {
    const dirty = ["+const x = 1;", "+// </assistant>"].join("\n");
    assert.deepEqual(scanForUncleanArtifacts(dirty), ["</assistant>"]);
    assert.equal(isCleanPatch(dirty), false);
  });

  it("ignores junk that appears only on context or removed lines", () => {
    const onlyRemoved = [" context <assistant>", "-old </s>"].join("\n");
    assert.deepEqual(scanForUncleanArtifacts(onlyRemoved), []);
    assert.equal(isCleanPatch(onlyRemoved), true);
  });

  it("treats a normal code patch as clean", () => {
    const clean = ["+export function add(a, b) {", "+  return a + b;", "+}"].join("\n");
    assert.equal(isCleanPatch(clean), true);
  });
});

describe("writerlane validator mirror: diff budget", () => {
  it("counts added/removed and classifies removed doc lines", () => {
    const patch = [
      "diff --git a/x.ts b/x.ts",
      "--- a/x.ts",
      "+++ b/x.ts",
      "@@ -1,3 +1,2 @@",
      "-/** old docstring */",
      "-const a = 1;",
      "+const a = 2;",
    ].join("\n");
    const stats = computeDiffStats(patch);
    assert.equal(stats.addedLines, 1);
    assert.equal(stats.removedLines, 2);
    assert.equal(stats.removedDocLines, 1);
  });

  it("rejects doc deletion when forbidDocDeletion is set (the glm over-edit guard)", () => {
    const overEdit = ["-// keep me", "+code();"].join("\n");
    assert.equal(isWithinDiffBudget(overEdit, { forbidDocDeletion: true }), false);
    assert.equal(isWithinDiffBudget(overEdit, {}), true);
  });

  it("enforces line-count caps when set", () => {
    const patch = ["+a", "+b", "+c", "-x"].join("\n");
    assert.equal(isWithinDiffBudget(patch, { maxAddedLines: 2 }), false);
    assert.equal(isWithinDiffBudget(patch, { maxAddedLines: 3 }), true);
    assert.equal(isWithinDiffBudget(patch, { maxRemovedLines: 0 }), false);
    assert.equal(isWithinDiffBudget(patch, { maxChangedLines: 3 }), false);
    assert.equal(isWithinDiffBudget(patch, { maxChangedLines: 4 }), true);
  });
});

describe("writerlane validator mirror: buildValidationFromPatch", () => {
  it("derives clean + budget from text and carries the supplied test verdict", () => {
    const clean = ["+ok();"].join("\n");
    const v = buildValidationFromPatch(clean, true, {});
    assert.deepEqual(v, { testsPassed: true, clean: true, withinDiffBudget: true });

    const dirty = ["+// <|im_end|>"].join("\n");
    const v2 = buildValidationFromPatch(dirty, true, {});
    assert.equal(v2.clean, false);

    // an external test failure is carried through unchanged
    const v3 = buildValidationFromPatch(clean, false, {});
    assert.equal(v3.testsPassed, false);
  });
});
