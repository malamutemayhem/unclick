import { describe, expect, it } from "vitest";
import {
  admitModels,
  DEFAULT_WRITERLANE_CONFIG,
  isFreeOnly,
  toSelectionPolicy,
  withWriterLaneConfig,
} from "./writerlane-config";
import {
  isFreeModelSlug,
  WRITERLANE_FREE_MODELS,
  type WriterLaneFreeModel,
} from "./writerlane-free-models";
import {
  chooseWriterLaneBackend,
  type WriterLaneBackendProfile,
} from "./writerlane-router";
import type { WriterLaneInput } from "./writerlane-types";

const scopePack = {
  ownedFiles: ["api/lib/writerlane/example.ts"],
  changeIntent: "wire backend selector",
  proofRequirements: ["writerlane-config.test.ts passes"],
};
const autonomyInput: WriterLaneInput = { scopePack, proofMode: "autonomy" };

// A paid model row (non-":free" slug). Not in the registry; built here to prove
// the default config excludes it.
const paidModel: WriterLaneFreeModel = {
  id: "paid-code",
  openRouterModel: "vendor/paid-code",
  paramScale: "unknown",
  capabilities: ["code", "reasoning"],
  strengths: ["backend", "mixed"],
  status: "trial",
  priority: 999,
};

describe("WriterLane default system config: paid gate closed", () => {
  it("defaults to free-only (paid path off)", () => {
    expect(DEFAULT_WRITERLANE_CONFIG.allowPaidModels).toBe(false);
    expect(isFreeOnly()).toBe(true);
    expect(isFreeOnly(DEFAULT_WRITERLANE_CONFIG)).toBe(true);
    expect(Object.isFrozen(DEFAULT_WRITERLANE_CONFIG)).toBe(true);
  });

  it("admits ONLY :free models by default and excludes a paid model", () => {
    const admitted = admitModels([paidModel, ...WRITERLANE_FREE_MODELS]);
    expect(admitted.find((m) => m.id === "paid-code")).toBeUndefined();
    // Every admitted model is a free slug.
    expect(admitted.every((m) => isFreeModelSlug(m.openRouterModel))).toBe(true);
    // The whole free registry is admitted (it is all-free by construction).
    expect(admitted.length).toBe(WRITERLANE_FREE_MODELS.length);
  });

  it("admits the paid model ONLY when allowPaidModels is explicitly true", () => {
    const opened = withWriterLaneConfig({ allowPaidModels: true });
    expect(isFreeOnly(opened)).toBe(false);
    const admitted = admitModels([paidModel, ...WRITERLANE_FREE_MODELS], opened);
    expect(admitted.find((m) => m.id === "paid-code")).toBeDefined();
    expect(admitted.length).toBe(WRITERLANE_FREE_MODELS.length + 1);
  });

  it("derives a router policy that forbids paid + subscription by default", () => {
    expect(toSelectionPolicy()).toEqual({
      allowPaid: false,
      allowSubscription: false,
      allowFixture: false,
      preferFree: true,
    });
    expect(toSelectionPolicy(withWriterLaneConfig({ allowPaidModels: true }))).toEqual(
      {
        allowPaid: true,
        allowSubscription: true,
        allowFixture: false,
        preferFree: true,
      },
    );
  });

  it("returns copies so the registry rows cannot be mutated through admitModels", () => {
    const admitted = admitModels(WRITERLANE_FREE_MODELS);
    expect(admitted[0]).not.toBe(WRITERLANE_FREE_MODELS[0]);
    expect(admitted[0]).toEqual(WRITERLANE_FREE_MODELS[0]);
  });
});

describe("default config + router: paid backend stays closed unless opted in", () => {
  const freeWriter: WriterLaneBackendProfile = {
    kind: "free-code-writer",
    cost: "free",
    status: "available",
    strengths: ["backend", "script", "tests", "mixed"],
    supportsAutonomyProof: true,
  };
  const paidWriter: WriterLaneBackendProfile = {
    kind: "paid-generalist",
    cost: "paid",
    status: "available",
    strengths: ["backend", "frontend", "script", "tests", "mixed"],
    supportsAutonomyProof: true,
  };
  const subscriptionWriter: WriterLaneBackendProfile = {
    kind: "subscription-warm-seat",
    cost: "subscription",
    status: "available",
    strengths: ["backend", "mixed"],
    supportsAutonomyProof: true,
  };

  it("default policy picks the free backend and never the paid/subscription ones", () => {
    const selection = chooseWriterLaneBackend(
      autonomyInput,
      [paidWriter, subscriptionWriter, freeWriter],
      toSelectionPolicy(),
    );
    expect(selection.ok).toBe(true);
    if (!selection.ok) throw new Error("free backend should win by default");
    expect(selection.selected.kind).toBe("free-code-writer");
  });

  it("default policy fails closed when ONLY paid/subscription backends exist", () => {
    const selection = chooseWriterLaneBackend(
      autonomyInput,
      [paidWriter, subscriptionWriter],
      toSelectionPolicy(),
    );
    expect(selection.ok).toBe(false);
    if (selection.ok) throw new Error("paid must be closed by default");
    expect(selection.reason).toBe("writerlane_no_eligible_backend");
  });

  it("opens the paid backend only when allowPaidModels is explicitly enabled", () => {
    const selection = chooseWriterLaneBackend(
      autonomyInput,
      [paidWriter],
      toSelectionPolicy(withWriterLaneConfig({ allowPaidModels: true })),
    );
    expect(selection.ok).toBe(true);
    if (!selection.ok) throw new Error("paid should be selectable when opted in");
    expect(selection.selected.kind).toBe("paid-generalist");
  });
});
