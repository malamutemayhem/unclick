import { describe, it, expect, vi, afterEach } from "vitest";
import { issFlyover } from "./flyover-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("flyover-tool", () => {
  it("returns ISS flyover times", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ message: "success", request: { latitude: 40.7, longitude: -74 }, response: [{ risetime: 1700000000, duration: 600 }] }),
    }));
    const r = await issFlyover({ lat: 40.7, lon: -74 }) as Record<string, unknown>;
    expect(r.response).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing coordinates", async () => {
    const r = await issFlyover({}) as Record<string, unknown>;
    expect(r.error).toMatch(/lat/i);
  });
});
