import { describe, it, expect, vi, afterEach } from "vitest";
import { ripeNetworkInfo, ripeAsnNeighbours } from "./ripe-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("ripe-tool", () => {
  it("returns network info for an IP", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: { asns: ["13335"], prefix: "1.1.1.0/24" }, status: "ok" }),
    }));
    const r = await ripeNetworkInfo({ resource: "1.1.1.1" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns ASN neighbours", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: { neighbours: [{ asn: 15169 }] }, status: "ok" }),
    }));
    const r = await ripeAsnNeighbours({ asn: "AS13335" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing resource", async () => {
    const r = await ripeNetworkInfo({}) as Record<string, unknown>;
    expect(r.error).toMatch(/resource/i);
  });
});
