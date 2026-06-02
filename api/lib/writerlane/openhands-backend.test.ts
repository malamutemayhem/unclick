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
  hasDiffHunks,
  isOpenHandsExecutionEnabled,
  looksLikeUnifiedDiff,
  OPENHANDS_EXECUTION_ENABLED_ENV,
  OpenHandsWriterLaneBackend,
  type OpenHandsRunner,
  type OpenHandsRunResult,
} from "./openhands-backend";
import {
  fitScore,
  isFreeModelSlug,
  listFreeModelsByStatus,
  rankFreeModelsForTask,
  selectDefaultFreeChain,
  topFreeModelForTask,
  WRITERLANE_FREE_MODELS,
  type EmpiricalStatus,
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

// A git header for an owned file with NO unified-diff hunk (mode-only change).
const headerOnlyPatch = [
  `diff --git a/${ownedFile} b/${ownedFile}`,
  "old mode 100644",
  "new mode 100755",
  "",
].join("\n");

function worktreeResult(patch: string): OpenHandsRunResult {
  return { ok: true, patch, changedFiles: [ownedFile], diffSource: "worktree" };
}

// Test models with deterministic ranking for a "backend" (code) task: strongCode
// wins (code affinity), weakDocs is the fallback (no code affinity). Both trial.
const strongCode: WriterLaneFreeModel = {
  id: "strong-code",
  openRouterModel: "vendor/strong-code:free",
  bestFor: ["code", "reasoning"],
  contextTokens: 128000,
  bestAt: "test fixture: code writer",
  empirical: { status: "trial", note: "test fixture" },
  priority: 10,
};

const weakDocs: WriterLaneFreeModel = {
  id: "weak-docs",
  openRouterModel: "vendor/weak-docs:free",
  bestFor: ["docs"],
  contextTokens: 32000,
  bestAt: "test fixture: docs writer",
  empirical: { status: "trial", note: "test fixture" },
  priority: 0,
};

// Runner that answers per model id; unknown ids fail closed.
function runnerByModel(
  byId: Record<string, OpenHandsRunResult>,
): OpenHandsRunner {
  return async ({ model }) =>
    byId[model.id] ?? { ok: false, reason: "no_canned_response" };
}

// The nine verified free OpenRouter candidate ids, with the empirical status each
// now carries from real code-slice run verdicts (see writerlane-free-models.ts):
// proven-clean coders are "proven"; over-editing glm and junk-prone laguna-xs.2
// are "flagged"; the rate-limited-out reals stay "trial" until a clean verdict.
const VERIFIED_FREE_CANDIDATE_STATUS: Record<string, EmpiricalStatus> = {
  "openai/gpt-oss-120b:free": "proven",
  "minimax/minimax-m2.5:free": "proven",
  "poolside/laguna-m.1:free": "proven",
  "qwen/qwen3-coder:free": "trial",
  "deepseek/deepseek-v4-flash:free": "trial",
  "meta-llama/llama-3.3-70b-instruct:free": "trial",
  "google/gemma-4-31b-it:free": "trial",
  "z-ai/glm-4.5-air:free": "flagged",
  "poolside/laguna-xs.2:free": "flagged",
};

describe("free-model registry: verified candidates + ranking", () => {
  it("seeds every verified free candidate with its verdict-based empirical status", () => {
    for (const [slug, status] of Object.entries(VERIFIED_FREE_CANDIDATE_STATUS)) {
      const row = WRITERLANE_FREE_MODELS.find(
        (model) => model.openRouterModel === slug,
      );
      expect(row, `missing seeded candidate ${slug}`).toBeDefined();
      expect(row?.empirical.status).toBe(status);
    }
  });

  it("marks exactly the proven-clean coders proven and flags the bad ones", () => {
    expect(listFreeModelsByStatus("proven").map((m) => m.id).sort()).toEqual([
      "gpt-oss-120b",
      "minimax-m2.5",
      "poolside-laguna-m1",
    ]);
    // glm over-edits, laguna-xs.2 emits junk: both flagged.
    expect(listFreeModelsByStatus("flagged").map((m) => m.id).sort()).toEqual([
      "glm-4.5-air",
      "poolside-laguna-xs2",
    ]);
    // qwen and the other rate-limited-out reals stay trial (unproven, not bad).
    const trialIds = listFreeModelsByStatus("trial").map((m) => m.id);
    expect(trialIds).toContain("qwen3-coder");
    expect(trialIds).toContain("deepseek-v4-flash");
    expect(trialIds).not.toContain("glm-4.5-air");
  });

  it("every row carries the informed metadata the selector relies on", () => {
    for (const model of WRITERLANE_FREE_MODELS) {
      expect(model.bestFor.length, `${model.id} bestFor`).toBeGreaterThan(0);
      expect(typeof model.contextTokens, `${model.id} contextTokens`).toBe(
        "number",
      );
      expect(model.bestAt.trim().length, `${model.id} bestAt`).toBeGreaterThan(0);
      expect(
        model.empirical.note.trim().length,
        `${model.id} empirical.note`,
      ).toBeGreaterThan(0);
      expect(isFreeModelSlug(model.openRouterModel), `${model.id} slug`).toBe(
        true,
      );
    }
  });

  it("ranks openai/gpt-oss-120b:free first for a code task (proven)", () => {
    const ranked = rankFreeModelsForTask("backend");
    expect(ranked[0].id).toBe("gpt-oss-120b");
    expect(ranked[0].openRouterModel).toBe("openai/gpt-oss-120b:free");
    expect(topFreeModelForTask("backend")?.id).toBe("gpt-oss-120b");
  });

  it("ranks by fit then empirical status: proven > trial > flagged for the same affinity", () => {
    const ranked = rankFreeModelsForTask("backend").map((m) => m.id);
    const idx = (id: string) => ranked.indexOf(id);
    // proven coder above a trial coder above a flagged coder.
    expect(idx("gpt-oss-120b")).toBeLessThan(idx("qwen3-coder")); // proven < trial
    expect(idx("qwen3-coder")).toBeLessThan(idx("glm-4.5-air")); // trial < flagged
    expect(idx("gemma-4-31b")).toBeLessThan(idx("poolside-laguna-xs2"));
  });

  it("routes by task-kind affinity: a docs-affinity model outranks a code-only model for docs", () => {
    const codeRanked = rankFreeModelsForTask("backend").map((m) => m.id);
    const docsRanked = rankFreeModelsForTask("docs").map((m) => m.id);
    // gpt-oss is the proven generalist (code AND docs affinity), top of both.
    expect(codeRanked[0]).toBe("gpt-oss-120b");
    expect(docsRanked[0]).toBe("gpt-oss-120b");
    // For docs, the docs-affinity tiny model outranks a code-only specialist;
    // for code it is the reverse. Proves affinity, not a fixed priority, routes.
    expect(docsRanked.indexOf("liquid-lfm-2.5-1.2b")).toBeLessThan(
      docsRanked.indexOf("poolside-laguna-m1"),
    );
    expect(codeRanked.indexOf("poolside-laguna-m1")).toBeLessThan(
      codeRanked.indexOf("liquid-lfm-2.5-1.2b"),
    );
  });

  it("exposes the fit score so a choice is explainable", () => {
    const gptOss = WRITERLANE_FREE_MODELS.find((m) => m.id === "gpt-oss-120b")!;
    const lagunaXs2 = WRITERLANE_FREE_MODELS.find(
      (m) => m.id === "poolside-laguna-xs2",
    )!;
    // Both code-affinity, but proven scores above flagged for a code task.
    expect(fitScore(gptOss, "backend")).toBeGreaterThan(
      fitScore(lagunaXs2, "backend"),
    );
  });

  it("deprioritizes the junk-prone, tiny, and meta models below the proven chain", () => {
    const ranked = rankFreeModelsForTask("backend").map((m) => m.id);
    const flaggedIndex = ranked.indexOf("poolside-laguna-xs2");
    const liquidIndex = ranked.indexOf("liquid-lfm-2.5-1.2b");
    const metaIndex = ranked.indexOf("openrouter-free-meta");
    expect(flaggedIndex).toBeGreaterThan(0);
    expect(liquidIndex).toBeGreaterThan(flaggedIndex);
    expect(metaIndex).toBe(ranked.length - 1);
    expect(ranked[0]).toBe("gpt-oss-120b");
  });

  it("ranks deterministically (fit + status primary, stable across calls)", () => {
    const first = rankFreeModelsForTask("backend").map((m) => m.id);
    const second = rankFreeModelsForTask("backend").map((m) => m.id);
    expect(first).toEqual(second);
    expect(first.slice(0, 9)).toEqual([
      "gpt-oss-120b",
      "minimax-m2.5",
      "poolside-laguna-m1",
      "qwen3-coder",
      "deepseek-v4-flash",
      "llama-3.3-70b",
      "gemma-4-31b",
      "glm-4.5-air",
      "poolside-laguna-xs2",
    ]);
  });

  it("keeps reasoner-class models OFF the default chain unless hardProblem is set", () => {
    const reasoner: WriterLaneFreeModel = {
      id: "reasoner-only",
      openRouterModel: "vendor/reasoner:free",
      bestFor: ["code", "reasoning"],
      contextTokens: 128000,
      bestAt: "test fixture: reasoner",
      empirical: { status: "proven", note: "test fixture" },
      reasonerClass: true,
      priority: 1000, // would rank first if not filtered
    };
    const pool = [reasoner, ...WRITERLANE_FREE_MODELS];

    const defaultChain = selectDefaultFreeChain("backend", pool).map((m) => m.id);
    expect(defaultChain).not.toContain("reasoner-only");
    expect(defaultChain[0]).toBe("gpt-oss-120b");

    const hardChain = selectDefaultFreeChain("backend", pool, {
      hardProblem: true,
    }).map((m) => m.id);
    expect(hardChain[0]).toBe("reasoner-only");
  });

  it("drops models below a stated minimum context window", () => {
    const chain = selectDefaultFreeChain("backend", WRITERLANE_FREE_MODELS, {
      minContextTokens: 150000,
    });
    expect(chain.every((m) => m.contextTokens >= 150000)).toBe(true);
    const ids = chain.map((m) => m.id);
    // minimax (200k) and qwen (262k) clear the bar; gpt-oss (131k) does not.
    expect(ids).toContain("minimax-m2.5");
    expect(ids).toContain("qwen3-coder");
    expect(ids).not.toContain("gpt-oss-120b");
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

  // FIX 1: a header-only diff (git header / mode lines, no @@ hunk) changes no
  // lines and must never pass as autonomy proof.
  it("rejects a header-only diff with no @@ hunks (FIX 1)", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: {
        ok: true,
        patch: headerOnlyPatch,
        changedFiles: [ownedFile],
        diffSource: "worktree",
      },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_no_diff_hunks" });
  });

  // FIX 2: ownership is the union of patch-parsed files and result.changedFiles.
  it("rejects when result.changedFiles declares an unowned file the patch omits (FIX 2)", () => {
    const gate = gateOpenHandsDiff({
      ...base,
      proofMode: "autonomy",
      result: {
        ok: true,
        patch: goodPatch, // touches only the owned file
        changedFiles: [ownedFile, "api/lib/writerlane/secret.ts"],
        diffSource: "worktree",
      },
    });
    expect(gate).toEqual({ ok: false, reason: "openhands_unowned_worktree_diff" });
  });
});

describe("hasDiffHunks", () => {
  it("is true for a patch with a hunk and false for a header-only diff", () => {
    expect(hasDiffHunks(goodPatch)).toBe(true);
    expect(hasDiffHunks(headerOnlyPatch)).toBe(false);
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

  it("requireProven admits only proven models (promotion path)", async () => {
    const provenCode: WriterLaneFreeModel = {
      ...strongCode,
      id: "proven-code",
      openRouterModel: "vendor/proven-code:free",
      empirical: { status: "proven", note: "test fixture" },
    };
    const runner = runnerByModel({ "proven-code": worktreeResult(goodPatch) });

    const trialOnly = await new OpenHandsWriterLaneBackend({
      runner,
      models: [strongCode],
      requireProven: true,
      enabled: true,
    }).produce(autonomyInput);
    expect(trialOnly).toEqual({
      ok: false,
      reason: "writerlane_no_proven_free_models",
    });

    const withProven = await new OpenHandsWriterLaneBackend({
      runner,
      models: [strongCode, provenCode],
      requireProven: true,
      enabled: true,
    }).runChain(autonomyInput);
    expect(withProven.result.ok).toBe(true);
    expect(withProven.modelsTried).toEqual(["proven-code"]);
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
    { name: "unowned files (in patch)", runResult: { ok: true, patch: goodPatchFor("api/lib/writerlane/not-owned.ts"), diffSource: "worktree" }, reason: "openhands_unowned_worktree_diff" },
    { name: "header-only diff, no hunks", runResult: { ok: true, patch: headerOnlyPatch, changedFiles: [ownedFile], diffSource: "worktree" }, reason: "openhands_no_diff_hunks" },
    { name: "unowned file declared in changedFiles", runResult: { ok: true, patch: goodPatch, changedFiles: [ownedFile, "api/lib/writerlane/secret.ts"], diffSource: "worktree" }, reason: "openhands_unowned_worktree_diff" },
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
