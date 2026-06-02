import { describe, expect, it, vi } from "vitest";
import {
  OPENROUTER_MODELS_URL,
  fetchOpenRouterCatalog,
  isFreeMetaRoute,
  parseOpenRouterCatalog,
  reconcileFreeModelsWithCatalog,
  selectAvailableFreeModel,
  type LiveCatalog,
} from "./writerlane-live-catalog";
import {
  WRITERLANE_FREE_MODELS,
  type WriterLaneFreeModel,
} from "./writerlane-free-models";

// A small fixed registry so tests do not depend on the live priority list.
const REGISTRY: WriterLaneFreeModel[] = [
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

function makeResponse(ok: boolean, body: unknown): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    json: async () => body,
  } as unknown as Response;
}

describe("isFreeMetaRoute", () => {
  it("recognises the openrouter/free meta-route", () => {
    expect(isFreeMetaRoute("openrouter/free")).toBe(true);
  });
  it("does not treat a :free slug as a meta-route", () => {
    expect(isFreeMetaRoute("vendor/alpha:free")).toBe(false);
  });
  it("rejects paid / empty slugs", () => {
    expect(isFreeMetaRoute("vendor/paid")).toBe(false);
    expect(isFreeMetaRoute("")).toBe(false);
  });
});

describe("parseOpenRouterCatalog", () => {
  it("normalizes ids and free flags from pricing", () => {
    const catalog = parseOpenRouterCatalog({
      data: [
        { id: "vendor/alpha:free", pricing: { prompt: "0", completion: "0" } },
        { id: "vendor/paid", pricing: { prompt: "0.001", completion: "0.002" } },
        { id: "vendor/zero", pricing: { prompt: 0, completion: 0 } },
      ],
    });
    expect(catalog).toEqual([
      { id: "vendor/alpha:free", isFree: true },
      { id: "vendor/paid", isFree: false },
      { id: "vendor/zero", isFree: true },
    ]);
  });

  it("treats a :free id as free even without pricing", () => {
    const catalog = parseOpenRouterCatalog({ data: [{ id: "vendor/x:free" }] });
    expect(catalog[0]).toEqual({ id: "vendor/x:free", isFree: true });
  });

  it("returns empty for malformed payloads instead of throwing", () => {
    expect(parseOpenRouterCatalog(null)).toEqual([]);
    expect(parseOpenRouterCatalog({})).toEqual([]);
    expect(parseOpenRouterCatalog({ data: "nope" })).toEqual([]);
    expect(parseOpenRouterCatalog({ data: [null, 3, { noId: true }] })).toEqual([]);
  });
});

describe("reconcileFreeModelsWithCatalog", () => {
  it("keeps live+free rows, flags missing and now-paid, always keeps meta-routes", () => {
    const catalog: LiveCatalog = [
      { id: "vendor/alpha:free", isFree: true },
      { id: "vendor/beta:free", isFree: false }, // flipped to paid
      // vendor/... meta route absent on purpose
    ];
    const { live, drift } = reconcileFreeModelsWithCatalog(catalog, REGISTRY);
    const liveIds = live.map((m) => m.id).sort();
    expect(liveIds).toEqual(["alpha", "meta"]); // beta now-paid, meta always kept
    expect(drift.nowPaid).toEqual(["vendor/beta:free"]);
    expect(drift.missing).toEqual([]);
    expect(drift.liveCount).toBe(2);
  });

  it("flags a registry slug missing from the catalog", () => {
    const catalog: LiveCatalog = [{ id: "vendor/alpha:free", isFree: true }];
    const { live, drift } = reconcileFreeModelsWithCatalog(catalog, REGISTRY);
    expect(drift.missing).toEqual(["vendor/beta:free"]);
    expect(live.map((m) => m.id).sort()).toEqual(["alpha", "meta"]);
  });
});

describe("selectAvailableFreeModel", () => {
  it("auto-falls back to the static chain when catalog is null", () => {
    const pick = selectAvailableFreeModel("backend", null, REGISTRY);
    expect(pick.source).toBe("static-fallback");
    expect(pick.model).not.toBeNull();
    expect(pick.reason).toContain("no live catalog");
    expect(pick.drift).toBeNull();
  });

  it("auto-falls back when catalog is empty", () => {
    const pick = selectAvailableFreeModel("backend", [], REGISTRY);
    expect(pick.source).toBe("static-fallback");
    expect(pick.reason).toContain("empty");
  });

  it("ranks the live subset and returns the first-available model with a reason", () => {
    const catalog: LiveCatalog = [
      { id: "vendor/alpha:free", isFree: true },
      { id: "vendor/beta:free", isFree: true },
    ];
    const pick = selectAvailableFreeModel("backend", catalog, REGISTRY);
    expect(pick.source).toBe("live");
    // alpha is proven + higher priority, so it leads the live chain.
    expect(pick.model?.id).toBe("alpha");
    expect(pick.chain.map((m) => m.id)).toContain("beta");
    expect(pick.reason).toContain("top live free model");
    expect(pick.drift?.nowPaid).toEqual([]);
  });

  it("drops a now-paid top model and picks the next live one", () => {
    const catalog: LiveCatalog = [
      { id: "vendor/alpha:free", isFree: false }, // alpha went paid
      { id: "vendor/beta:free", isFree: true },
    ];
    const pick = selectAvailableFreeModel("backend", catalog, REGISTRY);
    expect(pick.source).toBe("live");
    expect(pick.model?.id).toBe("beta");
    expect(pick.drift?.nowPaid).toEqual(["vendor/alpha:free"]);
  });

  it("falls back to static when no configured model reconciles", () => {
    const catalog: LiveCatalog = [{ id: "someone/else:free", isFree: true }];
    // Use a registry without the meta-route so nothing survives.
    const noMeta = REGISTRY.filter((m) => m.id !== "meta");
    const pick = selectAvailableFreeModel("backend", catalog, noMeta);
    expect(pick.source).toBe("static-fallback");
    expect(pick.reason).toContain("no configured model is live");
    expect(pick.drift?.missing.length).toBeGreaterThan(0);
  });

  it("works against the real registry without throwing", () => {
    const pick = selectAvailableFreeModel("docs", null, WRITERLANE_FREE_MODELS);
    expect(pick.model).not.toBeNull();
    expect(pick.chain.length).toBeGreaterThan(0);
  });
});

describe("fetchOpenRouterCatalog", () => {
  it("returns the parsed catalog on a 200", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      makeResponse(true, { data: [{ id: "vendor/alpha:free" }] }),
    );
    const catalog = await fetchOpenRouterCatalog(fetchImpl as unknown as typeof fetch, {
      timeoutMs: 1000,
    });
    expect(catalog).toEqual([{ id: "vendor/alpha:free", isFree: true }]);
    expect(fetchImpl).toHaveBeenCalledWith(
      OPENROUTER_MODELS_URL,
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("sends an Authorization header only when an apiKey is given (never elsewhere)", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      makeResponse(true, { data: [{ id: "vendor/alpha:free" }] }),
    );
    await fetchOpenRouterCatalog(fetchImpl as unknown as typeof fetch, {
      apiKey: "secret-key",
      timeoutMs: 1000,
    });
    const headers = (fetchImpl.mock.calls[0][1] as { headers: Record<string, string> }).headers;
    expect(headers.Authorization).toBe("Bearer secret-key");
  });

  it("returns null on a non-200", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(makeResponse(false, {}));
    const catalog = await fetchOpenRouterCatalog(fetchImpl as unknown as typeof fetch, {
      timeoutMs: 1000,
    });
    expect(catalog).toBeNull();
  });

  it("returns null when fetch throws (network error / abort)", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));
    const catalog = await fetchOpenRouterCatalog(fetchImpl as unknown as typeof fetch, {
      timeoutMs: 1000,
    });
    expect(catalog).toBeNull();
  });

  it("returns null for an empty catalog body", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(makeResponse(true, { data: [] }));
    const catalog = await fetchOpenRouterCatalog(fetchImpl as unknown as typeof fetch, {
      timeoutMs: 1000,
    });
    expect(catalog).toBeNull();
  });

  it("returns null when no fetch implementation is available", async () => {
    const catalog = await fetchOpenRouterCatalog(undefined as unknown as typeof fetch, {
      timeoutMs: 1000,
    });
    expect(catalog).toBeNull();
  });
});
