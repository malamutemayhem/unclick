import { afterEach, describe, expect, it, vi } from "vitest";
import { zipLookup, zipByCity } from "./zippopotamus-tool.js";

describe("zippopotamus connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await zipLookup({ code: "90210" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await zipLookup({ code: "90210" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required code for zipLookup", async () => {
    const r = await zipLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/code.*is required/i);
  });

  it("validates required state and city for zipByCity", async () => {
    const r = await zipByCity({}) as Record<string, unknown>;
    expect(r.error).toMatch(/state and city are required/i);
  });

  it("zipLookup returns location data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ "post code": "90210", country: "United States", places: [{ "place name": "Beverly Hills", state: "California" }] }),
    })));
    const r = await zipLookup({ code: "90210" }) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
