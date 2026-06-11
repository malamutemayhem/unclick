import { afterEach, describe, expect, it, vi } from "vitest";

import { countryByCode, countryByName } from "./restcountries-tool.js";

// Colocated REST Countries connector tests. Exercise the L2 (resilience)
// behaviour so the connector clears the depth-ladder hardening bar.

describe("rest countries connector resilience (L2)", () => {
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
    await expect(countryByCode({ code: "AU" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 15s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(countryByCode({ code: "AU" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNRESET"); }));
    await expect(countryByCode({ code: "AU" })).rejects.toThrow(/network error: ECONNRESET/i);
  });

  it("validates input before any network call", async () => {
    await expect(countryByName({})).rejects.toThrow(/name is required/i);
  });

  it("surfaces the upstream message when the API answers with a non-array body", async () => {
    // Observed live 2026-06-11: HTTP 200 with an object body crashed every
    // list operation as "countries.map is not a function".
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ message: "'fields' query not specified", status: 400 }),
    })));
    await expect(countryByName({ name: "Australia" })).rejects.toThrow(/REST Countries API error.*fields/i);
    await expect(countryByCode({ code: "AU" })).rejects.toThrow(/REST Countries API error/i);
  });

  it("normalizes a returned country", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [{
        name: { common: "Australia", official: "Commonwealth of Australia" },
        cca2: "AU",
        cca3: "AUS",
        capital: ["Canberra"],
        region: "Oceania",
      }],
    })));
    const result = await countryByCode({ code: "AU" }) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.countries[0].name).toBe("Australia");
    expect(result.countries[0].capital).toBe("Canberra");
  });
});
