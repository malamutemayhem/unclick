import { afterEach, describe, expect, it, vi } from "vitest";

import { estimateFlightEmissions } from "./carboninterface-tool.js";

// Colocated Carbon Interface connector tests. Exercise the L2 (resilience) behaviour.

const leg = { legs: [{ departure_airport: "SFO", destination_airport: "LAX" }] };

describe("carboninterface connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(estimateFlightEmissions({ api_key: "k", ...leg })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(estimateFlightEmissions({ api_key: "k", ...leg })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(estimateFlightEmissions({ api_key: "k" })).rejects.toThrow(/legs is required/i);
  });

  it("maps a flight estimate", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 201, json: async () => ({ data: { id: "est_1", type: "estimate", attributes: { carbon_kg: 120, carbon_mt: 0.12 } } }) })));
    const r = await estimateFlightEmissions({ api_key: "k", ...leg }) as Record<string, any>;
    expect(r.id).toBe("est_1");
    expect(r.carbon_kg).toBe(120);
  });
});
