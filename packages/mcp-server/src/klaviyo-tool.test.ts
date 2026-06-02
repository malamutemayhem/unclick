import { afterEach, describe, expect, it, vi } from "vitest";

import { klaviyoListLists, klaviyoListProfiles } from "./klaviyo-tool.js";

describe("klaviyo connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(klaviyoListLists({ api_key: "pk_x" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    await expect(klaviyoListLists({ api_key: "pk_x" })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when no api key is supplied", async () => {
    vi.stubEnv("KLAVIYO_API_KEY", "");
    const result = await klaviyoListLists({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("sends the Klaviyo-API-Key auth header and revision, and stamps the result", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await klaviyoListProfiles({ api_key: "pk_secret" }) as Record<string, any>;
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, { headers: Record<string, string> }];
    expect(init.headers.Authorization).toBe("Klaviyo-API-Key pk_secret");
    expect(init.headers.revision).toBeTruthy();
    expect(result.unclick_meta.source).toBe("Klaviyo API");
  });
});
