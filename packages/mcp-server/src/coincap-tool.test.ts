import { describe, it, expect, vi, afterEach } from "vitest";
import { coincapAssets, coincapAssetDetail, coincapRates } from "./coincap-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("coincap-tool", () => {
  it("coincapAssets returns top assets", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: [{ id: "bitcoin", name: "Bitcoin", priceUsd: "50000" }] }),
    }));
    const r = await coincapAssets({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("coincapAssetDetail returns asset info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: { id: "bitcoin", name: "Bitcoin", priceUsd: "50000" } }),
    }));
    const r = await coincapAssetDetail({ id: "bitcoin" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("coincapRates returns exchange rates", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: [{ id: "bitcoin", rateUsd: "50000" }] }),
    }));
    const r = await coincapRates({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing id for detail", async () => {
    const r = await coincapAssetDetail({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id/i);
  });
});
