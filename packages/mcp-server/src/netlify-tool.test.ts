import { afterEach, describe, expect, it, vi } from "vitest";

import { netlifyListSites, netlifyListDeploys } from "./netlify-tool.js";

// L2 resilience + L4 proactive + L5 stamp contract for the Netlify connector.
describe("netlify connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(netlifyListSites({ access_token: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(netlifyListSites({ access_token: "k" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no token is supplied", async () => {
    vi.stubEnv("NETLIFY_ACCESS_TOKEN", "");
    const result = await netlifyListSites({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("errors clearly when site_id is missing for deploys", async () => {
    const result = await netlifyListDeploys({ access_token: "k" }) as Record<string, unknown>;
    expect(result.error).toMatch(/site_id is required/i);
  });
});

describe("netlify stamping + proactive signal (L5 / L4)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("stamps source on a deploy listing", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ([{ id: "d1", state: "ready" }]) })));
    const result = await netlifyListDeploys({ access_token: "k", site_id: "s1" }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("Netlify API v1");
  });

  it("stays a safe no-op (no throw) when the latest deploy errored and no API key is set for signalling", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    vi.stubEnv("UNCLICK_API_KEY_HASH", "");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, json: async () => ([{ id: "d1", state: "error", error_message: "build failed" }]),
    })));
    const result = await netlifyListDeploys({ access_token: "k", site_id: "s1" }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("Netlify API v1");
    vi.unstubAllEnvs();
  });
});
