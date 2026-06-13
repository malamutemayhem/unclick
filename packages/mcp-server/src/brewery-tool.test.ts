import { afterEach, describe, expect, it, vi } from "vitest";
import { brewerySearch } from "./brewery-tool.js";

describe("brewery connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await brewerySearch({ query: "stone" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await brewerySearch({ query: "stone" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required query param", async () => {
    const r = await brewerySearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("maps brewery data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{
        id: "stone-brewing", name: "Stone Brewing", brewery_type: "regional",
        address_1: "1999 Citracado Pkwy", city: "Escondido", state_province: "California",
        country: "United States", phone: "7604711999", website_url: "https://www.stonebrewing.com",
        latitude: "33.1157", longitude: "-117.1201",
      }]),
    })));
    const r = await brewerySearch({ query: "stone" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.breweries[0].name).toBe("Stone Brewing");
    expect(r.breweries[0].latitude).toBe(33.1157);
  });
});
