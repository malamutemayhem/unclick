import { describe, expect, it } from "vitest";
import {
  acceptsAsAutonomyProof,
  isWriterLaneFailure,
  isWriterLaneSuccess,
  type WriterLaneInput,
} from "./writerlane-types";
import {
  buildWriterLanePrompt,
  createOpenHandsWriterLaneBackend,
  extractChangedFilesFromPatch,
  gateOpenHandsDiff,
  looksLikeUnifiedDiff,
  OpenHandsWriterLaneBackend,
  type OpenHandsDiffSource,
  type OpenHandsRunner,
  type OpenHandsRunResult,
} from "./openhands-backend";
import {
  isFreeModelSlug,
  rankFreeModelsForTask,
  WRITERLANE_FREE_MODELS,
  type WriterLaneFreeModel,
} from "./writerlane-free-models";

const ownedFile = "api/lib/writerlane/example.ts";

const scopePack = {
  ownedFiles: [ownedFile],
  changeIntent: "add a small helper to example.ts",
  proofRequirements: ["openhands-backend.test.ts passes"],
};

const autonomyInput: WriterLaneInput = { scopePack, proofMode: "autonomy" };
const plumbingInput: WriterLaneInput = { scopePack, proofMode: "plumbing" };

function goodPatchFor(file: string): string {
  return [
    `diff --git a/${file} b/${file}`,
    "index 1111111..2222222 100644",
    `--- a/${file}`,
    `+++ b/${file}`,
    "@@ -1,2 +1,3 @@",
    " export const x = 1;",
    "+export const y = 2;",
    " export const z = 3;",
    "",
  ].join("\n");
}

const goodPatch = goodPatchFor(ownedFile);

function worktreeResult(patch: string): OpenHandsRunResult {
  return { ok: true, patch, changedFiles: [ownedFile], diffSource: "worktree" };
}

// Free models with deterministic ranking for a "backend" task: strongCode wins,
// weakDocs is the fallback.
const strongCode: WriterLaneFreeModel = {
  id: "strong-code",
  openRouterModel: "vendor/strong-code:free",
  paramScale: "70B",
  capabilities: ["code", "reasoning"],
  strengths: ["backend", "tests", "script", "mixed"],
  priority: 10,
};

const weakDocs: WriterLaneFreeModel = {
  id: "weak-docs",
  openRouterModel: "vendor/weak-docs:free",
  paramScale: "1B",
  capabilities: ["docs", "fast"],
  strengths: ["docs"],
  priority: 0,
};

// Runner that answers per model id; unknown ids fail closed.
function runnerByModel(
  byId: Record<string, OpenHandsRunResult>,
): OpenHandsRunner {
  return async ({ model }) =>
    byId[model.id] ?? { ok: false, reason: "no_canned_response" };
}

describe("free-model registry + ranking", () => {
  it("seeds free models only (every slug is :free)", () => {
    expect(WRITERLANE_FREE_MODELS.length).toBeGreaterThan(0);
    for (const model of WRITERLANE_FREE_MODELS) {
      expect(isFreeModelSlug(model.openRouterModel)).toBe(true);
    }
  });

  it("ranks task-fit then id, deterministically", () => {
    const ranked = rankFreeModelsForTask("backend", [weakDocs, strongCode]);
    expect(ranked.map((model) => model.id)).toEqual([
      "strong-code",
      "weak-docs",
    ]);
  });

  it("rejects non-:free slugs", () => {
    expect(isFreeModelSlug("vendor/model")).toBe(false);
    expect(isFreeModelSlug("vendor/model:free")).toBe(true);
  });
});

describe("diff helpers", () => {
  it("recognizes a unified diff and rejects prose", () => {
    expect(looksLikeUnifiedDiff(goodPatch)).toBe(true);
    expect(looksLikeUnifiedDiff("just some text, no diff here")).toBe(false);
  });

  it("extracts owned changed files from the patch", () => {
    expect(extractChangedFilesFromPatch(goodPatch)).toEqual([ownedFile]);
  });
});

describe("gateOpenHandsDiff (pure real-diff gate)", () => {
  const base = { ownedFiles: [ownedFile], prompt: "PROMPT", maxPatchBytes: 120_000 };

  it("accepts a real worktree diff under autonomy mode as autonomy proof", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: worktreeResult(goodPatch),
    });
    expect(gate.ok).toBe(true);
    if (!gate.ok) throw new Error("expected accept");
    expect(gate.changedFiles).toEqual([ownedFile]);
    expect(gate.autonomyProof).toBe(true);
  });

  it("fails closed on an empty patch", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: { ok: true, patch: "   ", diffSource: "worktree" },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_missing_unified_diff" });
  });

  it("fails closed when the model echoes the prompt back", () => {
    const prompt = buildWriterLanePrompt(autonomyInput, strongCode);
    const gate = gateOpenHandsDiff({
      ...base,
      prompt,
      proofMode: "autonomy",
      result: { ok: true, patch: prompt, diffSource: "worktree" },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_echoed_prompt_diff" });
  });

  it("rejects a canned diff as autonomy proof and never marks it autonomous", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: { ok: true, patch: goodPatch, changedFiles: [ownedFile], diffSource: "canned" },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_untrusted_diff_source" });
  });

  it("rejects untrusted model_stdout diffs under autonomy mode", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: { ok: true, patch: goodPatch, diffSource: "model_stdout" },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_untrusted_diff_source" });
  });

  it("rejects a diff that touches files outside ownership", () => {
    const strayPatch = goodPatchFor("api/lib/writerlane/not-owned.ts");
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: { ok: true, patch: strayPatch, diffSource: "worktree" },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_unowned_worktree_diff" });
  });

  it("propagates an explicit runner failure reason", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: { ok: false, reason: "openhands_timeout" },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_timeout" });
  });

  it("fails closed on an oversized patch", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      maxPatchBytes: 10,
      proofMode: "autonomy",
      result: worktreeResult(goodPatch),
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_patch_too_large" });
  });

  it("plumbing mode accepts a canned diff but never claims autonomy", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "plumbing",
      result: { ok: true, patch: goodPatch, changedFiles: [ownedFile], diffSource: "canned" },
    });
    expect(gate.ok).toBe(true);
    if (!gate.ok) throw new Error("expected plumbing accept");
    expect(gate.autonomyProof).toBe(false);
  });
});

describe("OpenHandsWriterLaneBackend chain", () => {
  it("is labelled a non-fixture autonomy backend", () => {
    const backend = createOpenHandsWriterLaneBackend({
      runner: runnerByModel({}),
    });
    expect(backend.kind).toBe("openhands");
    expect(backend.isFixture).toBe(false);
    expect(backend).toBeInstanceOf(OpenHandsWriterLaneBackend);
  });

  it("(a) a good diff from the first free model passes as autonomy proof", async () => {
    const backend = createOpenHandsWriterLaneBackend({
      runner: runnerByModel({ "strong-code": worktreeResult(goodPatch) }),
      models: [strongCode, weakDocs],
    });

    const outcome = await backend.runChain(autonomyInput);
    expect(outcome.taskKind).toBe("backend");
    expect(outcome.modelsTried).toEqual(["strong-code"]);
    expect(outcome.result.ok).toBe(true);
    if (!outcome.result.ok) throw new Error("expected success");
    expect(outcome.result.changedFiles).toEqual([ownedFile]);
    expect(outcome.result.proof.autonomyProof).toBe(true);
    expect(acceptsAsAutonomyProof(outcome.result, "autonomy")).toBe(true);

    // produce() returns the same contract result.
    const result = await backend.produce(autonomyInput);
    expect(isWriterLaneSuccess(result)).toBe(true);
  });

  it("(b) canned / no-diff output never counts as autonomy proof", async () => {
    const backend = createOpenHandsWriterLaneBackend({
      runner: runnerByModel({
        "strong-code": { ok: true, patch: goodPatch, diffSource: "canned" },
        "weak-docs": { ok: true, patch: "", diffSource: "worktree" },
      }),
      models: [strongCode, weakDocs],
    });

    const outcome = await backend.runChain(autonomyInput);
    expect(outcome.result.ok).toBe(false);
    expect(acceptsAsAutonomyProof(outcome.result, "autonomy")).toBe(false);
    expect(outcome.attempts).toEqual([
      {
        modelId: "strong-code",
        openRouterModel: "vendor/strong-code:free",
        ok: false,
        reason: "openhands_untrusted_diff_source",
      },
      {
        modelId: "weak-docs",
        openRouterModel: "vendor/weak-docs:free",
        ok: false,
        reason: "openhands_missing_unified_diff",
      },
    ]);
  });

  it("(c) falls back to the next free model and records why the first was rejected", async () => {
    const backend = createOpenHandsWriterLaneBackend({
      runner: runnerByModel({
        "strong-code": { ok: false, reason: "openhands_reported_failure" },
        "weak-docs": worktreeResult(goodPatch),
      }),
      models: [strongCode, weakDocs],
    });

    const outcome = await backend.runChain(autonomyInput);
    expect(outcome.result.ok).toBe(true);
    if (!outcome.result.ok) throw new Error("expected fallback success");
    expect(outcome.modelsTried).toEqual(["strong-code", "weak-docs"]);
    expect(outcome.attempts[0]).toEqual({
      modelId: "strong-code",
      openRouterModel: "vendor/strong-code:free",
      ok: false,
      reason: "openhands_reported_failure",
    });
    expect(outcome.attempts[1].ok).toBe(true);
    expect(outcome.result.proof.autonomyProof).toBe(true);
  });

  it("records openhands_runner_threw and keeps walking when a runner throws", async () => {
    const runner: OpenHandsRunner = async ({ model }) => {
      if (model.id === "strong-code") throw new Error("boom");
      return worktreeResult(goodPatch);
    };
    const backend = createOpenHandsWriterLaneBackend({
      runner,
      models: [strongCode, weakDocs],
    });

    const outcome = await backend.runChain(autonomyInput);
    expect(outcome.attempts[0].reason).toBe("openhands_runner_threw");
    expect(outcome.result.ok).toBe(true);
  });

  it("(d) fails closed with writerlane_free_chain_exhausted when every model fails", async () => {
    const backend = createOpenHandsWriterLaneBackend({
      runner: runnerByModel({
        "strong-code": { ok: true, patch: "", diffSource: "worktree" },
        "weak-docs": { ok: false, reason: "openhands_timeout" },
      }),
      models: [strongCode, weakDocs],
    });

    const result = await backend.produce(autonomyInput);
    expect(isWriterLaneFailure(result)).toBe(true);
    if (result.ok) throw new Error("expected failure");
    expect(result.reason).toBe("writerlane_free_chain_exhausted");
  });

  it("fails closed when no runner is provided", async () => {
    const backend = new OpenHandsWriterLaneBackend({
      runner: undefined as unknown as OpenHandsRunner,
    });
    const result = await backend.produce(autonomyInput);
    expect(result).toEqual({ ok: false, reason: "openhands_runner_not_provided" });
  });

  it("excludes non-free models by default and opts in only explicitly", async () => {
    const paid: WriterLaneFreeModel = {
      ...strongCode,
      id: "paid-code",
      openRouterModel: "vendor/paid-code",
    };
    const runner = runnerByModel({ "paid-code": worktreeResult(goodPatch) });

    const blocked = await new OpenHandsWriterLaneBackend({
      runner,
      models: [paid],
    }).produce(autonomyInput);
    expect(blocked).toEqual({ ok: false, reason: "writerlane_no_free_models" });

    const allowed = await new OpenHandsWriterLaneBackend({
      runner,
      models: [paid],
      allowNonFreeModels: true,
    }).produce(autonomyInput);
    expect(allowed.ok).toBe(true);
  });
});
