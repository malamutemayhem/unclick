import { afterEach, describe, expect, it, vi } from "vitest";

import { getAirQuality } from "./openaq-tool.js";

// Colocated OpenAQ connector tests. Exercise the L2 (resilience) behaviour.

describe("openaq connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) },
    })));
    await expect(getAirQuality({ city: "Sydney" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(getAirQuality({ city: "Sydney" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(getAirQuality({})).rejects.toThrow(/either city or lat\+lon is required/i);
  });

  it("maps locations", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ meta: { found: 1 }, results: [{ id: 42, name: "Sydney CBD", coordinates: { latitude: -33.8, longitude: 151.2 } }] }),
    })));
    const r = await getAirQuality({ city: "Sydney" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.locations[0].name).toBe("Sydney CBD");
  });
});
