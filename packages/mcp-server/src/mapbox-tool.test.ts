import { afterEach, describe, expect, it, vi } from "vitest";

import { mapboxGeocodeForward } from "./mapbox-tool.js";

// Colocated Mapbox connector tests. Exercise the L2 (resilience) behaviour.

describe("mapbox connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) } })));
    await expect(mapboxGeocodeForward({ access_token: "t", query: "sydney" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(mapboxGeocodeForward({ access_token: "t", query: "sydney" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(mapboxGeocodeForward({ access_token: "t" })).rejects.toThrow(/query is required/i);
  });

  it("maps forward geocode results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ features: [{ id: "place.1" }], attribution: "(c) Mapbox" }) })));
    const r = await mapboxGeocodeForward({ access_token: "t", query: "sydney" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.features[0].id).toBe("place.1");
  });
});
