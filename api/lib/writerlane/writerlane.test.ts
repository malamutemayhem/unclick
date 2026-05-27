import { describe, expect, it } from "vitest";
import {
  acceptsAsAutonomyProof,
  isWriterLaneFailure,
  isWriterLaneSuccess,
  type WriterLaneInput,
  type WriterLaneResult,
} from "./writerlane-types";
import {
  FIXTURE_CHANGED_FILES,
  FIXTURE_PATCH,
  fixtureWriterLaneBackend,
} from "./fixture-backend";
import {
  chooseWriterLaneBackend,
  inferWriterLaneTaskKind,
  type WriterLaneBackendProfile,
} from "./writerlane-router";

const scopePack = {
  ownedFiles: ["api/lib/writerlane/example.ts"],
  changeIntent: "example change intent",
  proofRequirements: ["writerlane.test.ts passes"],
};

const autonomyInput: WriterLaneInput = { scopePack, proofMode: "autonomy" };

describe("WriterLaneResult shapes", () => {
  it("success shape: ok true carries patch, changedFiles, and proof", () => {
    const result: WriterLaneResult = {
      ok: true,
      patch: "--- a\n+++ b\n",
      changedFiles: ["a"],
      proof: { autonomyProof: true },
    };
    expect(isWriterLaneSuccess(result)).toBe(true);
    expect(isWriterLaneFailure(result)).toBe(false);
  });

  it("fail-closed: ok false requires a non-empty reason string", () => {
    const failure: WriterLaneResult = { ok: false, reason: "scope pack empty" };
    expect(isWriterLaneFailure(failure)).toBe(true);
    expect(isWriterLaneSuccess(failure)).toBe(false);

    // An empty / whitespace reason does not satisfy the fail-closed contract.
    expect(isWriterLaneFailure({ ok: false, reason: "" })).toBe(false);
    expect(isWriterLaneFailure({ ok: false, reason: "   " })).toBe(false);
  });
});

describe("fixture backend", () => {
  it("is loudly labelled fixture / non-autonomy", () => {
    expect(fixtureWriterLaneBackend.kind).toBe("fixture");
    expect(fixtureWriterLaneBackend.isFixture).toBe(true);
  });

  it("returns its labelled fixture result", async () => {
    const result = await fixtureWriterLaneBackend.produce(autonomyInput);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("fixture backend should succeed");
    expect(result.patch).toBe(FIXTURE_PATCH);
    expect(result.changedFiles).toEqual([...FIXTURE_CHANGED_FILES]);
    expect(result.proof.autonomyProof).toBe(false);
  });
});

describe("acceptsAsAutonomyProof - the contract gate", () => {
  it("REJECTS the fixture result as autonomy proof, even under autonomy mode", async () => {
    const result = await fixtureWriterLaneBackend.produce(autonomyInput);
    expect(acceptsAsAutonomyProof(result, "autonomy")).toBe(false);
    expect(acceptsAsAutonomyProof(result, "plumbing")).toBe(false);
  });

  it("accepts only a genuine success that marks autonomyProof true under autonomy mode", () => {
    const genuine: WriterLaneResult = {
      ok: true,
      patch: "--- a\n+++ b\n",
      changedFiles: ["a"],
      proof: { autonomyProof: true },
    };
    expect(acceptsAsAutonomyProof(genuine, "autonomy")).toBe(true);
    // Same genuine result is still rejected outside autonomy mode.
    expect(acceptsAsAutonomyProof(genuine, "plumbing")).toBe(false);
  });

  it("never accepts a failure as autonomy proof", () => {
    const failure: WriterLaneResult = { ok: false, reason: "no diff produced" };
    expect(acceptsAsAutonomyProof(failure, "autonomy")).toBe(false);
  });
});

describe("writer backend router", () => {
  const docsFree: WriterLaneBackendProfile = {
    kind: "free-docs-writer",
    cost: "free",
    status: "available",
    strengths: ["docs"],
    supportsAutonomyProof: true,
    maxOwnedFiles: 4,
  };

  const codeFree: WriterLaneBackendProfile = {
    kind: "free-code-writer",
    cost: "free",
    status: "available",
    strengths: ["backend", "script", "tests", "mixed"],
    supportsAutonomyProof: true,
    maxOwnedFiles: 8,
  };

  const paidGeneralist: WriterLaneBackendProfile = {
    kind: "paid-generalist",
    cost: "paid",
    status: "available",
    strengths: ["docs", "backend", "frontend", "script", "tests", "mixed"],
    supportsAutonomyProof: true,
  };

  const warmSubscription: WriterLaneBackendProfile = {
    kind: "subscription-warm-seat",
    cost: "subscription",
    status: "available",
    strengths: ["backend", "frontend", "mixed"],
    supportsAutonomyProof: true,
    requiresWarmSeat: true,
  };

  const fixtureProfile: WriterLaneBackendProfile = {
    kind: "fixture",
    cost: "fixture",
    status: "available",
    strengths: ["mixed"],
    supportsAutonomyProof: false,
  };

  it("infers task kind from the ScopePack owned files", () => {
    expect(
      inferWriterLaneTaskKind({
        scopePack: {
          ownedFiles: ["docs/writerlane.md"],
          changeIntent: "add docs",
          proofRequirements: [],
        },
      }),
    ).toBe("docs");

    expect(
      inferWriterLaneTaskKind({
        scopePack: {
          ownedFiles: ["api/lib/writerlane/router.ts"],
          changeIntent: "wire backend selector",
          proofRequirements: [],
        },
      }),
    ).toBe("backend");
  });

  it("chooses the strongest free backend for the job by default", () => {
    const selection = chooseWriterLaneBackend(
      {
        proofMode: "autonomy",
        scopePack: {
          ownedFiles: ["docs/writerlane-free-backends.md"],
          changeIntent: "document free backend routing",
          proofRequirements: ["vitest passes"],
        },
      },
      [codeFree, docsFree, paidGeneralist],
    );

    expect(selection.ok).toBe(true);
    if (!selection.ok) throw new Error("free docs backend should be selected");
    expect(selection.selected.kind).toBe("free-docs-writer");
    expect(selection.taskKind).toBe("docs");
  });

  it("does not use paid, subscription, or fixture backends unless policy allows them", () => {
    const selection = chooseWriterLaneBackend(autonomyInput, [
      paidGeneralist,
      warmSubscription,
      fixtureProfile,
    ]);

    expect(selection.ok).toBe(false);
    expect(selection.reason).toBe("writerlane_no_eligible_backend");
    expect(selection.candidates.map((candidate) => candidate.kind)).toEqual(
      expect.arrayContaining([
        "paid-generalist",
        "subscription-warm-seat",
        "fixture",
      ]),
    );
  });

  it("can fall back across multiple free backends when the best fit is unavailable", () => {
    const disabledDocsFree: WriterLaneBackendProfile = {
      ...docsFree,
      status: "unconfigured",
    };

    const selection = chooseWriterLaneBackend(
      {
        proofMode: "autonomy",
        scopePack: {
          ownedFiles: ["docs/writerlane-routing.md"],
          changeIntent: "small docs update",
          proofRequirements: ["vitest passes"],
        },
      },
      [disabledDocsFree, codeFree],
    );

    expect(selection.ok).toBe(true);
    if (!selection.ok) throw new Error("fallback free backend should win");
    expect(selection.selected.kind).toBe("free-code-writer");
  });

  it("allows a warm subscription backend only when explicitly requested", () => {
    const cold = chooseWriterLaneBackend(
      autonomyInput,
      [warmSubscription, codeFree],
      { allowSubscription: true },
    );

    expect(cold.ok).toBe(true);
    if (!cold.ok) throw new Error("free backend should be selected cold");
    expect(cold.selected.kind).toBe("free-code-writer");

    const warm = chooseWriterLaneBackend(
      autonomyInput,
      [warmSubscription, codeFree],
      {
        allowSubscription: true,
        warmSeatAvailable: true,
        preferredKinds: ["subscription-warm-seat"],
      },
    );

    expect(warm.ok).toBe(true);
    if (!warm.ok) throw new Error("warm subscription should be selectable");
    expect(warm.selected.kind).toBe("subscription-warm-seat");
  });
});
