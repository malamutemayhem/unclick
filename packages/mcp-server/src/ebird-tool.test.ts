import { afterEach, describe, expect, it, vi } from "vitest";

import { getRecentObservations } from "./ebird-tool.js";

// Colocated eBird connector tests. Exercise the L2 (resilience) behaviour.

describe("ebird connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, text: async () => "" })));
    await expect(getRecentObservations({ api_key: "k", region_code: "AU-NSW" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(getRecentObservations({ api_key: "k", region_code: "AU-NSW" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(getRecentObservations({ api_key: "k" })).rejects.toThrow(/region_code is required/i);
  });

  it("maps observations", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ([{ speciesCode: "ausmag1", comName: "Australian Magpie", sciName: "Gymnorhina tibicen", locName: "Park", locId: "L1", obsDt: "2026-01-01", lat: -33.8, lng: 151.2 }]) })));
    const r = await getRecentObservations({ api_key: "k", region_code: "AU-NSW" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.observations[0].common_name).toBe("Australian Magpie");
  });
});
