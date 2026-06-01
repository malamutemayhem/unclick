import { afterEach, describe, expect, it, vi } from "vitest";

import { webflowListSites, webflowListCollections } from "./webflow-tool.js";

describe("webflow connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(webflowListSites({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    await expect(webflowListSites({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no token is supplied", async () => {
    vi.stubEnv("WEBFLOW_ACCESS_TOKEN", "");
    const result = await webflowListSites({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("validates required params before calling the API", async () => {
    const result = await webflowListCollections({ access_token: "k" }) as Record<string, unknown>;
    expect(result.error).toMatch(/site_id is required/i);
  });

  it("stamps source on a site listing", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ sites: [] }) })));
    const result = await webflowListSites({ access_token: "k" }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("Webflow Data API v2");
  });
});
