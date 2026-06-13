import { describe, it, expect, vi, afterEach } from "vitest";
import { nominatimSearch, nominatimReverse } from "./nominatim-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("nominatim-tool", () => {
  it("nominatimSearch returns places", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => [{ place_id: 123, display_name: "London, England", lat: "51.5", lon: "-0.1" }],
    }));
    const r = await nominatimSearch({ query: "London" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("nominatimReverse returns address", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ display_name: "Buckingham Palace", address: { road: "The Mall" } }),
    }));
    const r = await nominatimReverse({ latitude: 51.5014, longitude: -0.1419 }) as Record<string, unknown>;
    expect(r.display_name).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing coords for reverse", async () => {
    const r = await nominatimReverse({}) as Record<string, unknown>;
    expect(r.error).toMatch(/latitude/i);
  });
});
