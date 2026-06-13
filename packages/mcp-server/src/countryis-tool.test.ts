import { describe, it, expect, vi, afterEach } from "vitest";
import { countryByIp } from "./countryis-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("countryis-tool", () => {
  it("countryByIp returns country for IP", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ ip: "8.8.8.8", country: "US" }),
    }));
    const r = await countryByIp({ ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.country).toBe("US");
    expect(r.unclick_meta).toBeDefined();
  });

  it("countryByIp works without IP (auto-detect)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ ip: "1.2.3.4", country: "AU" }),
    }));
    const r = await countryByIp({}) as Record<string, unknown>;
    expect(r.country).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
