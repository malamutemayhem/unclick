// Tests for the runner mirror of the WriterLane live-catalog picker.
// Mirrors api/lib/writerlane/writerlane-live-catalog.test.ts. No network: the
// fetch implementation is injected.

import test from "node:test";
import assert from "node:assert/strict";

import {
  OPENROUTER_MODELS_URL,
  fetchOpenRouterCatalog,
  isFreeMetaRoute,
  isLiveCatalogEnabled,
  parseOpenRouterCatalog,
  reconcileFreeModelsWithCatalog,
  selectAvailableFreeModel,
} from "./pinballwake-writerlane-live-catalog.mjs";

const REGISTRY = [
  {
    id: "alpha",
    openRouterModel: "vendor/alpha:free",
    bestFor: ["code", "general"],
    contextTokens: 131072,
    bestAt: "test coder",
    empirical: { status: "proven", note: "test" },
    priority: 100,
  },
  {
    id: "beta",
    openRouterModel: "vendor/beta:free",
    bestFor: ["code"],
    contextTokens: 131072,
    bestAt: "test coder 2",
    empirical: { status: "trial", note: "test" },
    priority: 50,
  },
  {
    id: "meta",
    openRouterModel: "openrouter/free",
    bestFor: ["general"],
    contextTokens: 0,
    bestAt: "auto route",
    empirical: { status: "trial", note: "test" },
    priority: 0,
  },
];

function makeResponse(ok, body) {
  return { ok, status: ok ? 200 : 500, json: async () => body };
}

test("isFreeMetaRoute recognises the meta route only", () => {
  assert.equal(isFreeMetaRoute("openrouter/free"), true);
  assert.equal(isFreeMetaRoute("vendor/alpha:free"), false);
  assert.equal(isFreeMetaRoute("vendor/paid"), false);
});

test("parseOpenRouterCatalog normalizes free flags and tolerates junk", () => {
  const catalog = parseOpenRouterCatalog({
    data: [
      { id: "vendor/alpha:free", pricing: { prompt: "0", completion: "0" } },
      { id: "vendor/paid", pricing: { prompt: "0.001", completion: "0" } },
    ],
  });
  assert.deepEqual(catalog, [
    { id: "vendor/alpha:free", isFree: true },
    { id: "vendor/paid", isFree: false },
  ]);
  assert.deepEqual(parseOpenRouterCatalog(null), []);
  assert.deepEqual(parseOpenRouterCatalog({ data: "x" }), []);
});

test("reconcile keeps live+free, flags now-paid, always keeps meta", () => {
  const { live, drift } = reconcileFreeModelsWithCatalog(
    [
      { id: "vendor/alpha:free", isFree: true },
      { id: "vendor/beta:free", isFree: false },
    ],
    REGISTRY,
  );
  assert.deepEqual(live.map((m) => m.id).sort(), ["alpha", "meta"]);
  assert.deepEqual(drift.nowPaid, ["vendor/beta:free"]);
});

test("selectAvailableFreeModel falls back to static when catalog is null", () => {
  const pick = selectAvailableFreeModel("backend", null, REGISTRY);
  assert.equal(pick.source, "static-fallback");
  assert.ok(pick.model);
});

test("selectAvailableFreeModel ranks live subset and returns first-available", () => {
  const pick = selectAvailableFreeModel(
    "backend",
    [
      { id: "vendor/alpha:free", isFree: true },
      { id: "vendor/beta:free", isFree: true },
    ],
    REGISTRY,
  );
  assert.equal(pick.source, "live");
  assert.equal(pick.model.id, "alpha");
});

test("selectAvailableFreeModel drops a now-paid top model", () => {
  const pick = selectAvailableFreeModel(
    "backend",
    [
      { id: "vendor/alpha:free", isFree: false },
      { id: "vendor/beta:free", isFree: true },
    ],
    REGISTRY,
  );
  assert.equal(pick.model.id, "beta");
  assert.deepEqual(pick.drift.nowPaid, ["vendor/alpha:free"]);
});

test("fetchOpenRouterCatalog returns parsed catalog on 200", async () => {
  let calledUrl = null;
  const fetchImpl = async (url) => {
    calledUrl = url;
    return makeResponse(true, { data: [{ id: "vendor/alpha:free" }] });
  };
  const catalog = await fetchOpenRouterCatalog(fetchImpl, { timeoutMs: 1000 });
  assert.deepEqual(catalog, [{ id: "vendor/alpha:free", isFree: true }]);
  assert.equal(calledUrl, OPENROUTER_MODELS_URL);
});

test("fetchOpenRouterCatalog returns null on non-200, throw, and empty", async () => {
  assert.equal(await fetchOpenRouterCatalog(async () => makeResponse(false, {}), { timeoutMs: 1000 }), null);
  assert.equal(
    await fetchOpenRouterCatalog(async () => {
      throw new Error("down");
    }, { timeoutMs: 1000 }),
    null,
  );
  assert.equal(await fetchOpenRouterCatalog(async () => makeResponse(true, { data: [] }), { timeoutMs: 1000 }), null);
});

test("isLiveCatalogEnabled is off by default and on for truthy env", () => {
  assert.equal(isLiveCatalogEnabled({}), false);
  assert.equal(isLiveCatalogEnabled({ WRITERLANE_USE_LIVE_CATALOG: "1" }), true);
  assert.equal(isLiveCatalogEnabled({ WRITERLANE_USE_LIVE_CATALOG: "true" }), true);
  assert.equal(isLiveCatalogEnabled({ WRITERLANE_USE_LIVE_CATALOG: "0" }), false);
});
