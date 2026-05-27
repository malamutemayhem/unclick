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
