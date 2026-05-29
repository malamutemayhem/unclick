import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  WRITERLANE_FREE_MODELS,
  fitScore,
  isFreeModelSlug,
  listFreeModelsByStatus,
  listWriterLaneFreeModels,
  rankFreeModelsForTask,
  selectDefaultFreeChain,
  topFreeModelForTask,
} from "./pinballwake-writerlane-free-models.mjs";

describe("writerlane free-model mirror: registry invariants", () => {
  it("every registry row carries a free OpenRouter slug", () => {
    for (const model of WRITERLANE_FREE_MODELS) {
      assert.equal(isFreeModelSlug(model.openRouterModel), true, model.openRouterModel);
    }
  });

  it("listWriterLaneFreeModels returns copies, not the shared rows", () => {
    const copies = listWriterLaneFreeModels();
    assert.equal(copies.length, WRITERLANE_FREE_MODELS.length);
    assert.notEqual(copies[0], WRITERLANE_FREE_MODELS[0]);
    assert.equal(copies[0].id, WRITERLANE_FREE_MODELS[0].id);
  });

  it("lists models by empirical status", () => {
    const proven = listFreeModelsByStatus("proven").map((m) => m.id);
    assert.deepEqual(proven, ["gpt-oss-120b", "minimax-m2.5", "poolside-laguna-m1"]);
    const flagged = listFreeModelsByStatus("flagged").map((m) => m.id);
    assert.deepEqual(flagged, ["glm-4.5-air", "poolside-laguna-xs2"]);
  });
});

describe("writerlane free-model mirror: isFreeModelSlug", () => {
  it("accepts :free slugs and the free meta-route", () => {
    assert.equal(isFreeModelSlug("openai/gpt-oss-120b:free"), true);
    assert.equal(isFreeModelSlug("openrouter/free"), true);
    assert.equal(isFreeModelSlug("  OPENAI/GPT-OSS-120B:FREE "), true);
  });

  it("rejects paid / unknown slugs", () => {
    assert.equal(isFreeModelSlug("deepseek/deepseek-chat"), false);
    assert.equal(isFreeModelSlug("openai/gpt-5"), false);
    assert.equal(isFreeModelSlug(""), false);
    assert.equal(isFreeModelSlug(null), false);
  });
});

describe("writerlane free-model mirror: fit + ranking", () => {
  it("scores exact affinity above general above none, and proven above trial", () => {
    const codeProven = { id: "a", openRouterModel: "x:free", bestFor: ["code"], contextTokens: 1, bestAt: "", empirical: { status: "proven", note: "" } };
    const generalTrial = { id: "b", openRouterModel: "y:free", bestFor: ["general"], contextTokens: 1, bestAt: "", empirical: { status: "trial", note: "" } };
    const docsOnly = { id: "c", openRouterModel: "z:free", bestFor: ["docs"], contextTokens: 1, bestAt: "", empirical: { status: "proven", note: "" } };
    assert.ok(fitScore(codeProven, "backend") > fitScore(generalTrial, "backend"));
    // docs-only model scores 0 affinity on a code task (no general fallback)
    assert.equal(fitScore(docsOnly, "backend"), 0 + 200);
  });

  it("ranks proven coders first for a code task", () => {
    const ranked = rankFreeModelsForTask("backend").map((m) => m.id);
    assert.equal(ranked[0], "gpt-oss-120b");
    assert.equal(ranked[1], "minimax-m2.5");
    assert.equal(ranked[2], "poolside-laguna-m1");
    // flagged code models sink below all trial coders of equal affinity
    assert.ok(ranked.indexOf("poolside-laguna-xs2") > ranked.indexOf("qwen3-coder"));
  });

  it("ranks a docs-affinity model first for a docs task", () => {
    const ranked = rankFreeModelsForTask("docs");
    // gpt-oss-120b lists docs affinity AND is proven, so it still leads; the
    // docs-only liquid model outranks code-only models that lack docs affinity.
    assert.equal(ranked[0].id, "gpt-oss-120b");
    const liquidIdx = ranked.findIndex((m) => m.id === "liquid-lfm-2.5-1.2b");
    const codeOnlyIdx = ranked.findIndex((m) => m.id === "poolside-laguna-m1");
    assert.ok(liquidIdx < codeOnlyIdx, "docs-affinity model should outrank code-only model on a docs task");
  });

  it("ranking is deterministic and stable across calls", () => {
    const a = rankFreeModelsForTask("backend").map((m) => m.id);
    const b = rankFreeModelsForTask("backend").map((m) => m.id);
    assert.deepEqual(a, b);
  });
});

describe("writerlane free-model mirror: default chain", () => {
  it("excludes reasoner-class models from the default path", () => {
    const reasoner = { id: "reasoner", openRouterModel: "r:free", bestFor: ["code"], contextTokens: 200000, bestAt: "", empirical: { status: "proven", note: "" }, reasonerClass: true, priority: 999 };
    const pool = [...WRITERLANE_FREE_MODELS, reasoner];
    const def = selectDefaultFreeChain("backend", pool).map((m) => m.id);
    assert.equal(def.includes("reasoner"), false);
    const hard = selectDefaultFreeChain("backend", pool, { hardProblem: true }).map((m) => m.id);
    assert.equal(hard.includes("reasoner"), true);
  });

  it("drops models below a minimum context window", () => {
    const def = selectDefaultFreeChain("backend", WRITERLANE_FREE_MODELS, { minContextTokens: 100000 });
    assert.equal(def.some((m) => m.id === "poolside-laguna-xs2"), false, "32768-ctx model dropped");
    assert.equal(def.some((m) => m.id === "gpt-oss-120b"), true);
  });

  it("topFreeModelForTask returns the chain head or null", () => {
    assert.equal(topFreeModelForTask("backend").id, "gpt-oss-120b");
    assert.equal(topFreeModelForTask("backend", []), null);
  });
});
