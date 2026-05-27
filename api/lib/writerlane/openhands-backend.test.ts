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
  isOpenHandsExecutionEnabled,
  looksLikeUnifiedDiff,
  OPENHANDS_EXECUTION_ENABLED_ENV,
  OpenHandsWriterLaneBackend,
  type OpenHandsRunner,
  type OpenHandsRunResult,
} from "./openhands-backend";
import {
  isFreeModelSlug,
  listFreeModelsByStatus,
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

// Test models with deterministic ranking for a "backend" task: strongCode wins
// (higher priority), weakDocs is the fallback. Both trial.
const strongCode: WriterLaneFreeModel = {
  id: "strong-code",
  openRouterModel: "vendor/strong-code:free",
  paramScale: "70B",
  capabilities: ["code", "reasoning"],
  strengths: ["backend", "tests", "script", "mixed"],
  status: "trial",
  priority: 10,
};

const weakDocs: WriterLaneFreeModel = {
  id: "weak-docs",
  openRouterModel: "vendor/weak-docs:free",
  paramScale: "1B",
  capabilities: ["docs", "fast"],
  strengths: ["docs"],
  status: "trial",
  priority: 0,
};

// Runner that answers per model id; unknown ids fail closed.
function runnerByModel(
  byId: Record<string, OpenHandsRunResult>,
): OpenHandsRunner {
  return async ({ model }) =>
    byId[model.id] ?? { ok: false, reason: "no_canned_response" };
}

// The nine verified free OpenRouter candidate ids seeded into the registry.
const VERIFIED_FREE_CANDIDATES = [
  "qwen/qwen3-coder:free",
  "poolside/laguna-m.1:free",
  "poolside/laguna-xs.2:free",
  "deepseek/deepseek-v4-flash:free",
  "openai/gpt-oss-120b:free",
  "z-ai/glm-4.5-air:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "minimax/minimax-m2.5:free",
  "google/gemma-4-31b-it:free",
];

describe("free-model registry: verified candidates + ranking", () => {
  it("seeds every verified free candidate as a TRIAL (not-yet-vetted) row", () => {
    for (const slug of VERIFIED_FREE_CANDIDATES) {
      const row = WRITERLANE_FREE_MODELS.find(
        (model) => model.openRouterModel === slug,
      );
      expect(row, `missing seeded candidate ${slug}`).toBeDefined();
      expect(row?.status).toBe("trial");
    }
  });

  it("treats the whole seed as unproven: zero vetted models until real runs validate", () => {
    expect(listFreeModelsByStatus("vetted")).toEqual([]);
    expect(listFreeModelsByStatus("trial").length).toBe(
      WRITERLANE_FREE_MODELS.length,
    );
  });

  it("ranks qwen/qwen3-coder:free first for a code task", () => {
    const ranked = rankFreeModelsForTask("backend");
    expect(ranked[0].id).toBe("qwen3-coder");
    expect(ranked[0].openRouterModel).toBe("qwen/qwen3-coder:free");
  });

  it("keeps the tiny Liquid model and the meta route as last-ditch, not primary", () => {
    const ranked = rankFreeModelsForTask("backend").map((m) => m.id);
    const liquidIndex = ranked.indexOf("liquid-lfm-2.5-1.2b");
    const metaIndex = ranked.indexOf("openrouter-free-meta");
    expect(liquidIndex).toBeGreaterThan(0);
    expect(metaIndex).toBe(ranked.length - 1);
    expect(ranked[0]).toBe("qwen3-coder");
  });

  it("ranks deterministically (priority primary, stable across calls)", () => {
    const first = rankFreeModelsForTask("backend").map((m) => m.id);
    const second = rankFreeModelsForTask("backend").map((m) => m.id);
    expect(first).toEqual(second);
    expect(first.slice(0, 9)).toEqual([
      "qwen3-coder",
      "poolside-laguna-m1",
      "poolside-laguna-xs2",
      "deepseek-v4-flash",
      "gpt-oss-120b",
      "glm-4.5-air",
      "llama-3.3-70b",
      "minimax-m2.5",
      "gemma-4-31b",
    ]);
  });

  it("recognizes :free slugs and the explicit free meta route; rejects bare slugs", () => {
    expect(isFreeModelSlug("qwen/qwen3-coder:free")).toBe(true);
    expect(isFreeModelSlug("openrouter/free")).toBe(true);
    expect(isFreeModelSlug("vendor/model")).toBe(false);
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

describe("acceptance #1: genuinely OFF BY DEFAULT", () => {
  it("does not execute (no runner call) and fails closed unless explicitly enabled", async () => {
    let runnerCalls = 0;
    const runner: OpenHandsRunner = async () => {
      runnerCalls += 1;
      return worktreeResult(goodPatch);
    };

    const backend = createOpenHandsWriterLaneBackend({
      runner,
      models: [strongCode],
      // enabled intentionally omitted -> default off
    });
    const result = await backend.produce(autonomyInput);

    expect(result).toEqual({
      ok: false,
      reason: "writerlane_openhands_backend_disabled",
    });
    expect(runnerCalls).toBe(0);
    expect(acceptsAsAutonomyProof(result, "autonomy")).toBe(false);
  });

  it("runs only once enabled: true is passed", async () => {
    const backend = createOpenHandsWriterLaneBackend({
      runner: runnerByModel({ "strong-code": worktreeResult(goodPatch) }),
      models: [strongCode],
      enabled: true,
    });
    const result = await backend.produce(autonomyInput);
    expect(result.ok).toBe(true);
  });

  it("env flag is also off by default", () => {
    expect(OPENHANDS_EXECUTION_ENABLED_ENV).toBe(
      "WRITERLANE_OPENHANDS_EXECUTION_ENABLED",
    );
    expect(isOpenHandsExecutionEnabled({})).toBe(false);
    expect(
      isOpenHandsExecutionEnabled({
        WRITERLANE_OPENHANDS_EXECUTION_ENABLED: "1",
      }),
    ).toBe(true);
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
      enabled: true,
    });

    const outcome = await backend.runChain(autonomyInput);
    expect(outcome.taskKind).toBe("backend");
    expect(outcome.modelsTried).toEqual(["strong-code"]);
    expect(outcome.result.ok).toBe(true);
    if (!outcome.result.ok) throw new Error("expected success");
    expect(outcome.result.changedFiles).toEqual([ownedFile]);
    expect(outcome.result.proof.autonomyProof).toBe(true);
    expect(acceptsAsAutonomyProof(outcome.result, "autonomy")).toBe(true);

    const result = await backend.produce(autonomyInput);
    expect(isWriterLaneSuccess(result)).toBe(true);
  });

  it("(c) falls back to the next free model and records why the first was rejected", async () => {
    const backend = createOpenHandsWriterLaneBackend({
      runner: runnerByModel({
        "strong-code": { ok: false, reason: "openhands_reported_failure" },
        "weak-docs": worktreeResult(goodPatch),
      }),
      models: [strongCode, weakDocs],
      enabled: true,
    });

    const outcome = await backend.runChain(autonomyInput);
    expect(outcome.result.ok).toBe(true);
    if (!outcome.result.ok) throw new Error("expected fallback success");
    expect(outcome.modelsTried).toEqual(["strong-code", "weak-docs"]);
    expect(outcome.attempts[0]).toEqual({
      modelId: "strong-code",
      openRouterModel: "vendor/strong-code:free",
      status: "trial",
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
      enabled: true,
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
      enabled: true,
    });

    const result = await backend.produce(autonomyInput);
    expect(isWriterLaneFailure(result)).toBe(true);
    if (result.ok) throw new Error("expected failure");
    expect(result.reason).toBe("writerlane_free_chain_exhausted");
  });

  it("fails closed when no runner is provided", async () => {
    const backend = new OpenHandsWriterLaneBackend({
      runner: undefined as unknown as OpenHandsRunner,
      enabled: true,
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
      enabled: true,
    }).produce(autonomyInput);
    expect(blocked).toEqual({ ok: false, reason: "writerlane_no_free_models" });

    const allowed = await new OpenHandsWriterLaneBackend({
      runner,
      models: [paid],
      allowNonFreeModels: true,
      enabled: true,
    }).produce(autonomyInput);
    expect(allowed.ok).toBe(true);
  });

  it("requireVetted admits only vetted models (promotion path)", async () => {
    const vettedCode: WriterLaneFreeModel = {
      ...strongCode,
      id: "vetted-code",
      openRouterModel: "vendor/vetted-code:free",
      status: "vetted",
    };
    const runner = runnerByModel({ "vetted-code": worktreeResult(goodPatch) });

    const trialOnly = await new OpenHandsWriterLaneBackend({
      runner,
      models: [strongCode],
      requireVetted: true,
      enabled: true,
    }).produce(autonomyInput);
    expect(trialOnly).toEqual({
      ok: false,
      reason: "writerlane_no_vetted_free_models",
    });

    const withVetted = await new OpenHandsWriterLaneBackend({
      runner,
      models: [strongCode, vettedCode],
      requireVetted: true,
      enabled: true,
    }).runChain(autonomyInput);
    expect(withVetted.result.ok).toBe(true);
    expect(withVetted.modelsTried).toEqual(["vetted-code"]);
  });
});

describe("acceptance #2: a failed / no-change writer run can never be autonomy proof", () => {
  // Each case is a single-model chain whose only model returns bad output. In
  // every path: produce() fails closed, the exact per-model reason is logged,
  // and acceptsAsAutonomyProof stays false.
  const cases: Array<{
    name: string;
    runResult: OpenHandsRunResult | "echo";
    reason: string;
  }> = [
    { name: "no diff / empty", runResult: { ok: true, patch: "", diffSource: "worktree" }, reason: "openhands_missing_unified_diff" },
    { name: "whitespace-only", runResult: { ok: true, patch: "   \n  ", diffSource: "worktree" }, reason: "openhands_missing_unified_diff" },
    { name: "echoed prompt", runResult: "echo", reason: "openhands_echoed_prompt_diff" },
    { name: "canned diff", runResult: { ok: true, patch: goodPatch, diffSource: "canned" }, reason: "openhands_untrusted_diff_source" },
    { name: "unowned files", runResult: { ok: true, patch: goodPatchFor("api/lib/writerlane/not-owned.ts"), diffSource: "worktree" }, reason: "openhands_unowned_worktree_diff" },
    { name: "runner reported failure", runResult: { ok: false, reason: "openhands_timeout" }, reason: "openhands_timeout" },
  ];

  for (const testCase of cases) {
    it(`${testCase.name} -> fail, autonomyProof false, exact reason`, async () => {
      const runner: OpenHandsRunner = async ({ prompt }) =>
        testCase.runResult === "echo"
          ? { ok: true, patch: prompt, diffSource: "worktree" }
          : testCase.runResult;

      const backend = createOpenHandsWriterLaneBackend({
        runner,
        models: [strongCode],
        enabled: true,
      });

      const outcome = await backend.runChain(autonomyInput);
      expect(outcome.result.ok).toBe(false);
      expect(acceptsAsAutonomyProof(outcome.result, "autonomy")).toBe(false);
      expect(outcome.attempts).toHaveLength(1);
      expect(outcome.attempts[0].ok).toBe(false);
      expect(outcome.attempts[0].reason).toBe(testCase.reason);
      if (!outcome.result.ok) {
        expect(outcome.result.reason).toBe("writerlane_free_chain_exhausted");
      }
    });
  }
});
