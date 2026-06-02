import { afterEach, describe, expect, it, vi } from "vitest";
import { findNearestToilets } from "./toilets-tool.js";

// L2 resilience contract for the toilets connector: request timeout on both the
// AU Toilet Map and the OSM Overpass fallback, input validation, source
// fallback, and stable response mapping. (No auth / no per-request 429 surface.)
const COORDS = { latitude: -37.8136, longitude: 144.9631, radius_meters: 1000 };

describe("toilets connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean error when both sources time out", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await findNearestToilets({ ...COORDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/both.*failed/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await findNearestToilets({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/latitude and longitude/i);
  });

  it("maps AU Toilet Map results into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ ToiletID: "1", Name: "Town Hall Loo", Latitude: -37.8136, Longitude: 144.9631 }]),
    })));
    const result = await findNearestToilets({ ...COORDS }) as Record<string, unknown>;
    expect(result.found).toBe(1);
  });

  it("falls back to OSM when the AU source aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("toiletmap.gov.au")) {
        const e = new Error("aborted");
        e.name = "AbortError";
        throw e;
      }
      return { ok: true, status: 200, json: async () => ({ elements: [{ id: 1, lat: -37.8136, lon: 144.9631, tags: { name: "Park WC" } }] }) };
    }));
    const result = await findNearestToilets({ ...COORDS }) as Record<string, unknown>;
    expect(result.found).toBe(1);
  });
});
