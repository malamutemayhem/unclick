import { describe, it, expect, vi, afterEach } from "vitest";
import { postcodeLookup, postcodeRandom } from "./postcodes-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("postcodes-tool", () => {
  it("postcodeLookup returns postcode details", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ result: { postcode: "SW1A 1AA", latitude: 51.501, longitude: -0.141 } }),
    }));
    const r = await postcodeLookup({ postcode: "SW1A 1AA" }) as Record<string, unknown>;
    expect(r.result).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("postcodeLookup rejects missing postcode", async () => {
    const r = await postcodeLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/postcode/i);
  });

  it("postcodeRandom returns a random postcode", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ result: { postcode: "EC2R 8AH", latitude: 51.515, longitude: -0.088 } }),
    }));
    const r = await postcodeRandom({}) as Record<string, unknown>;
    expect(r.result).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
