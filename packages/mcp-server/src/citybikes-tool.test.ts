import { describe, it, expect, vi, afterEach } from "vitest";
import { citybikesNetworks, citybikesNetwork } from "./citybikes-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("citybikes-tool", () => {
  it("citybikesNetworks returns networks", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ networks: [{ id: "citi-bike-nyc", name: "Citi Bike", location: { city: "New York" } }] }),
    }));
    const r = await citybikesNetworks({}) as Record<string, unknown>;
    expect(r.networks).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("citybikesNetwork returns station details", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ network: { id: "citi-bike-nyc", stations: [{ name: "Broadway", free_bikes: 5 }] } }),
    }));
    const r = await citybikesNetwork({ id: "citi-bike-nyc" }) as Record<string, unknown>;
    expect(r.network).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("citybikesNetwork requires id", async () => {
    const r = await citybikesNetwork({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
