import { describe, expect, it } from "vitest";

import {
  acceptCanaryVictory,
  CANARY_CHECKS_NOT_GREEN,
  CANARY_ECHOED_FIXTURE_DIFF,
  CANARY_FIXTURE_BACKEND,
  CANARY_HUMAN_TOUCHED,
  CANARY_NO_APP_PR,
  CANARY_NO_COMMIT_SHA,
  CANARY_NO_REAL_DIFF,
  CANARY_PROOF_GATE_FAILED,
  CANARY_UNPROTECTED_MERGE,
  isCanaryVictory,
  type CanaryVictoryClaim,
} from "./canary-acceptance";
import {
  FIXTURE_CHANGED_FILES,
  FIXTURE_PATCH,
  fixtureWriterLaneBackend,
} from "./fixture-backend";
import {
  WRITERLANE_SCOPE_GATE_FAILED,
  WRITERLANE_TESTS_FAILED,
} from "./writerlane-validator";
import type { WriterLaneResult } from "./writerlane-types";

const realFile = "api/lib/writerlane/example.ts";

// A genuine, clean autonomy diff produced by a (hypothetical) real backend.
const realPatch = [
  `diff --git a/${realFile} b/${realFile}`,
  `--- a/${realFile}`,
  `+++ b/${realFile}`,
  "@@ -1,2 +1,3 @@",
  " export const x = 1;",
  "+export const y = 2;",
  " export const z = 3;",
  "",
].join("\n");

const realSuccess: WriterLaneResult = {
  ok: true,
  patch: realPatch,
  changedFiles: [realFile],
  proof: { autonomyProof: true, notes: "real backend output" },
};

// A claim where EVERYTHING is green: a real non-fixture backend, real diff,
// passing validation, real SHA, App PR, green checks, protected merge, zero
// human touch. Tests override one field at a time to drive each rejection.
function winningClaim(overrides: Partial<CanaryVictoryClaim> = {}): CanaryVictoryClaim {
  return {
    backendKind: "openhands",
    backendIsFixture: false,
    result: realSuccess,
    proofMode: "autonomy",
    validation: { testsPassed: true, clean: true, withinDiffBudget: true },
    commitSha: "a1b2c3d4e5f6",
    appPrUrl: "https://github.com/malamutemayhem/unclick/pull/9999",
    checksGreen: true,
    protectedMerge: true,
    humanTouchCount: 0,
    ...overrides,
  };
}

describe("canary acceptance - fixture is never proof", () => {
  it("accepts a real-backend run that meets every condition", () => {
    const outcome = acceptCanaryVictory(winningClaim());
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.backendKind).toBe("openhands");
      expect(outcome.commitSha).toBe("a1b2c3d4e5f6");
      expect(outcome.appPrUrl).toContain("/pull/9999");
    }
    expect(isCanaryVictory(winningClaim())).toBe(true);
  });

  it("rejects a run from a backend that declares itself fixture", () => {
    const outcome = acceptCanaryVictory(winningClaim({ backendIsFixture: true }));
    expect(outcome).toEqual({ ok: false, reason: CANARY_FIXTURE_BACKEND });
  });

  it('rejects a run whose backendKind is "fixture" even if it lies about isFixture', () => {
    const outcome = acceptCanaryVictory(
      winningClaim({ backendKind: "fixture", backendIsFixture: false }),
    );
    expect(outcome).toEqual({ ok: false, reason: CANARY_FIXTURE_BACKEND });
  });

  it("rejects the actual fixture backend output end-to-end", async () => {
    const result = await fixtureWriterLaneBackend.produce({
      scopePack: { ownedFiles: [], changeIntent: "smoke", proofRequirements: [] },
      proofMode: "plumbing",
    });
    const outcome = acceptCanaryVictory(
      winningClaim({
        backendKind: fixtureWriterLaneBackend.kind,
        backendIsFixture: fixtureWriterLaneBackend.isFixture,
        result,
        // even if a caller wrongly claims autonomy mode and green ops:
        proofMode: "autonomy",
      }),
    );
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) expect(outcome.reason).toBe(CANARY_FIXTURE_BACKEND);
  });

  it("rejects a canned/echoed fixture diff smuggled through a non-fixture backend", () => {
    const echoed: WriterLaneResult = {
      ok: true,
      patch: FIXTURE_PATCH,
      changedFiles: [realFile],
      proof: { autonomyProof: true },
    };
    const outcome = acceptCanaryVictory(winningClaim({ result: echoed }));
    expect(outcome).toEqual({ ok: false, reason: CANARY_ECHOED_FIXTURE_DIFF });
  });

  it("rejects a diff that touches the fixture sentinel file", () => {
    const echoed: WriterLaneResult = {
      ok: true,
      patch: realPatch,
      changedFiles: [...FIXTURE_CHANGED_FILES],
      proof: { autonomyProof: true },
    };
    const outcome = acceptCanaryVictory(winningClaim({ result: echoed }));
    expect(outcome).toEqual({ ok: false, reason: CANARY_ECHOED_FIXTURE_DIFF });
  });

  it("rejects an empty / no-real-diff success", () => {
    const empty: WriterLaneResult = {
      ok: true,
      patch: "   ",
      changedFiles: [],
      proof: { autonomyProof: true },
    };
    const outcome = acceptCanaryVictory(winningClaim({ result: empty }));
    expect(outcome).toEqual({ ok: false, reason: CANARY_NO_REAL_DIFF });
  });
});

describe("canary acceptance - reuses the extended proof gate", () => {
  it("rejects when the tests verdict failed, carrying the validator reason", () => {
    const outcome = acceptCanaryVictory(
      winningClaim({ validation: { testsPassed: false, clean: true, withinDiffBudget: true } }),
    );
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.reason).toBe(CANARY_PROOF_GATE_FAILED);
      expect(outcome.detail).toBe(WRITERLANE_TESTS_FAILED);
    }
  });

  it("rejects a plumbing-mode claim via the scope gate", () => {
    const outcome = acceptCanaryVictory(winningClaim({ proofMode: "plumbing" }));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.reason).toBe(CANARY_PROOF_GATE_FAILED);
      expect(outcome.detail).toBe(WRITERLANE_SCOPE_GATE_FAILED);
    }
  });
});

describe("canary acceptance - operational ship requirements", () => {
  it("requires a real commit SHA", () => {
    expect(acceptCanaryVictory(winningClaim({ commitSha: "  " }))).toEqual({
      ok: false,
      reason: CANARY_NO_COMMIT_SHA,
    });
  });

  it("requires an App PR", () => {
    expect(acceptCanaryVictory(winningClaim({ appPrUrl: "" }))).toEqual({
      ok: false,
      reason: CANARY_NO_APP_PR,
    });
  });

  it("requires green checks", () => {
    expect(acceptCanaryVictory(winningClaim({ checksGreen: false }))).toEqual({
      ok: false,
      reason: CANARY_CHECKS_NOT_GREEN,
    });
  });

  it("requires a protected merge", () => {
    expect(acceptCanaryVictory(winningClaim({ protectedMerge: false }))).toEqual({
      ok: false,
      reason: CANARY_UNPROTECTED_MERGE,
    });
  });

  it("requires ledger human_touch_count === 0", () => {
    expect(acceptCanaryVictory(winningClaim({ humanTouchCount: 1 }))).toEqual({
      ok: false,
      reason: CANARY_HUMAN_TOUCHED,
    });
  });
});
