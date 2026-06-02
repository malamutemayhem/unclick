import { afterEach, describe, expect, it, vi } from "vitest";

import { radioByCountry } from "./radiobrowser-tool.js";

// Colocated Radio Browser connector tests. Exercise the L2 (resilience) behaviour.

describe("radio browser connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "15" : null) },
      text: async () => "rate limited",
    })));
    await expect(radioByCountry({ country: "Australia" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 15s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(radioByCountry({ country: "Australia" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNRESET"); }));
    await expect(radioByCountry({ country: "Australia" })).rejects.toThrow(/network error: ECONNRESET/i);
  });

  it("returns a structured error when no country is given", async () => {
    const result = await radioByCountry({}) as Record<string, unknown>;
    expect(result.error).toMatch(/country is required/i);
  });

  it("normalizes returned stations", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [{ stationuuid: "u1", name: "ABC Jazz", url: "http://stream", countrycode: "AU", votes: 42 }],
    })));
    const result = await radioByCountry({ country: "Australia" }) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.stations[0].name).toBe("ABC Jazz");
  });
});
