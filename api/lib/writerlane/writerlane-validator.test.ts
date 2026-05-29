import { describe, expect, it } from "vitest";
import type { WriterLaneResult } from "./writerlane-types";
import {
  buildValidationFromPatch,
  computeDiffStats,
  isCleanPatch,
  isValidatedAutonomyProof,
  isWithinDiffBudget,
  scanForUncleanArtifacts,
  UNCLEAN_MARKERS,
  validateAutonomyProof,
  WRITERLANE_DIFF_OVER_BUDGET,
  WRITERLANE_SCOPE_GATE_FAILED,
  WRITERLANE_TESTS_FAILED,
  WRITERLANE_UNCLEAN_OUTPUT,
  type WriterLaneValidation,
} from "./writerlane-validator";

const ownedFile = "api/lib/writerlane/example.ts";

// A clean unified diff: +1 line, removes nothing.
const goodPatch = [
  `diff --git a/${ownedFile} b/${ownedFile}`,
  "index 1111111..2222222 100644",
  `--- a/${ownedFile}`,
  `+++ b/${ownedFile}`,
  "@@ -1,2 +1,3 @@",
  " export const x = 1;",
  "+export const y = 2;",
  " export const z = 3;",
  "",
].join("\n");

// laguna-xs.2's real failure: a stray </assistant> chat-template tag added into
// the file (a syntax error that passed the scope gate).
const uncleanPatch = [
  `diff --git a/${ownedFile} b/${ownedFile}`,
  `--- a/${ownedFile}`,
  `+++ b/${ownedFile}`,
  "@@ -1,2 +1,4 @@",
  " export const x = 1;",
  "+export const y = 2;",
  "+</assistant>",
  " export const z = 3;",
  "",
].join("\n");

// glm-4.5-air's real failure: deleted a JSDoc docstring (over-edited).
const overEditPatch = [
  `diff --git a/${ownedFile} b/${ownedFile}`,
  `--- a/${ownedFile}`,
  `+++ b/${ownedFile}`,
  "@@ -1,5 +1,2 @@",
  "-/**",
  "- * Adds two numbers.",
  "- */",
  " export function add(a, b) {",
  "+  return a + b;",
  " }",
  "",
].join("\n");

// A genuine scope-passing autonomy success for the gate to build on.
function successWith(patch: string): WriterLaneResult {
  return {
    ok: true,
    patch,
    changedFiles: [ownedFile],
    proof: { autonomyProof: true },
  };
}

const passing: WriterLaneValidation = {
  testsPassed: true,
  clean: true,
  withinDiffBudget: true,
};

describe("validateAutonomyProof - extended autonomy-proof contract", () => {
  it("accepts ONLY when the scope gate passes AND every validation component passes", () => {
    const result = successWith(goodPatch);
    expect(validateAutonomyProof(result, "autonomy", passing)).toEqual({
      ok: true,
    });
    expect(isValidatedAutonomyProof(result, "autonomy", passing)).toBe(true);
  });

  it("rejects when the underlying scope/diff gate fails, even if validation passes", () => {
    // proof.autonomyProof false => the #1052 scope gate rejects it.
    const notScoped: WriterLaneResult = {
      ok: true,
      patch: goodPatch,
      changedFiles: [ownedFile],
      proof: { autonomyProof: false },
    };
    expect(validateAutonomyProof(notScoped, "autonomy", passing)).toEqual({
      ok: false,
      reason: WRITERLANE_SCOPE_GATE_FAILED,
    });
    // A scope-passing result under plumbing mode is also not autonomy proof.
    expect(
      validateAutonomyProof(successWith(goodPatch), "plumbing", passing),
    ).toEqual({ ok: false, reason: WRITERLANE_SCOPE_GATE_FAILED });
    // A failure result is never proof.
    expect(
      validateAutonomyProof({ ok: false, reason: "no diff" }, "autonomy", passing),
    ).toEqual({ ok: false, reason: WRITERLANE_SCOPE_GATE_FAILED });
  });

  it("passes scope but FAILS validation -> not autonomy proof, exact reason per component", () => {
    const result = successWith(goodPatch);

    expect(
      validateAutonomyProof(result, "autonomy", { ...passing, testsPassed: false }),
    ).toEqual({ ok: false, reason: WRITERLANE_TESTS_FAILED });

    expect(
      validateAutonomyProof(result, "autonomy", { ...passing, clean: false }),
    ).toEqual({ ok: false, reason: WRITERLANE_UNCLEAN_OUTPUT });

    expect(
      validateAutonomyProof(result, "autonomy", {
        ...passing,
        withinDiffBudget: false,
      }),
    ).toEqual({ ok: false, reason: WRITERLANE_DIFF_OVER_BUDGET });

    // In every failing case it is NOT accepted as autonomy proof.
    for (const bad of [
      { ...passing, testsPassed: false },
      { ...passing, clean: false },
      { ...passing, withinDiffBudget: false },
    ]) {
      expect(isValidatedAutonomyProof(result, "autonomy", bad)).toBe(false);
    }
  });

  it("checks components in a stable order: tests -> clean -> budget", () => {
    const result = successWith(goodPatch);
    // All three failing: tests is reported first.
    expect(
      validateAutonomyProof(result, "autonomy", {
        testsPassed: false,
        clean: false,
        withinDiffBudget: false,
      }),
    ).toEqual({ ok: false, reason: WRITERLANE_TESTS_FAILED });
    // tests pass, clean+budget fail: clean is reported next.
    expect(
      validateAutonomyProof(result, "autonomy", {
        testsPassed: true,
        clean: false,
        withinDiffBudget: false,
      }),
    ).toEqual({ ok: false, reason: WRITERLANE_UNCLEAN_OUTPUT });
  });
});

describe("clean check - chat-template / junk detection", () => {
  it("lists </assistant> among the unclean markers", () => {
    expect(UNCLEAN_MARKERS).toContain("</assistant>");
  });

  it("flags a stray </assistant> tag in ADDED lines (the laguna-xs.2 failure)", () => {
    expect(scanForUncleanArtifacts(uncleanPatch)).toEqual(["</assistant>"]);
    expect(isCleanPatch(uncleanPatch)).toBe(false);
  });

  it("treats a clean diff as clean", () => {
    expect(scanForUncleanArtifacts(goodPatch)).toEqual([]);
    expect(isCleanPatch(goodPatch)).toBe(true);
  });

  it("ignores junk on REMOVED lines (cleanup is clean)", () => {
    const removesJunk = [
      `--- a/${ownedFile}`,
      `+++ b/${ownedFile}`,
      "@@ -1,2 +1,2 @@",
      "-</assistant>",
      "+export const y = 2;",
      "",
    ].join("\n");
    expect(scanForUncleanArtifacts(removesJunk)).toEqual([]);
    expect(isCleanPatch(removesJunk)).toBe(true);
  });
});

describe("diff budget - size + doc-preservation guard", () => {
  it("counts added/removed lines and classifies removed doc lines", () => {
    expect(computeDiffStats(goodPatch)).toEqual({
      addedLines: 1,
      removedLines: 0,
      removedDocLines: 0,
    });
    expect(computeDiffStats(overEditPatch)).toEqual({
      addedLines: 1,
      removedLines: 3,
      removedDocLines: 3,
    });
  });

  it("rejects an over-edit that deletes a docstring (the glm-4.5-air failure)", () => {
    expect(isWithinDiffBudget(overEditPatch, { forbidDocDeletion: true })).toBe(
      false,
    );
    // Also caught by a removed-line budget.
    expect(isWithinDiffBudget(overEditPatch, { maxRemovedLines: 2 })).toBe(false);
  });

  it("allows an in-budget clean change", () => {
    expect(
      isWithinDiffBudget(goodPatch, {
        maxAddedLines: 5,
        maxRemovedLines: 5,
        forbidDocDeletion: true,
      }),
    ).toBe(true);
  });

  it("enforces total churn via maxChangedLines", () => {
    expect(isWithinDiffBudget(overEditPatch, { maxChangedLines: 3 })).toBe(false);
    expect(isWithinDiffBudget(overEditPatch, { maxChangedLines: 4 })).toBe(true);
  });
});

describe("buildValidationFromPatch + gate (ties helpers to the contract)", () => {
  const budget = { maxRemovedLines: 2, forbidDocDeletion: true } as const;

  it("a clean in-budget patch with passing tests is validated autonomy proof", () => {
    const validation = buildValidationFromPatch(goodPatch, true, budget);
    expect(validation).toEqual({
      testsPassed: true,
      clean: true,
      withinDiffBudget: true,
    });
    expect(
      validateAutonomyProof(successWith(goodPatch), "autonomy", validation),
    ).toEqual({ ok: true });
  });

  it("the </assistant> patch is rejected as unclean even with passing tests", () => {
    const validation = buildValidationFromPatch(uncleanPatch, true, budget);
    expect(validation.clean).toBe(false);
    expect(
      validateAutonomyProof(successWith(uncleanPatch), "autonomy", validation),
    ).toEqual({ ok: false, reason: WRITERLANE_UNCLEAN_OUTPUT });
  });

  it("the docstring-deleting patch is rejected as over budget even with passing tests", () => {
    const validation = buildValidationFromPatch(overEditPatch, true, budget);
    expect(validation.clean).toBe(true);
    expect(validation.withinDiffBudget).toBe(false);
    expect(
      validateAutonomyProof(successWith(overEditPatch), "autonomy", validation),
    ).toEqual({ ok: false, reason: WRITERLANE_DIFF_OVER_BUDGET });
  });
});
