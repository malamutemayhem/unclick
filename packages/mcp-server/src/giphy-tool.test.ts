import { afterEach, describe, expect, it, vi } from "vitest";
import { giphySearch, giphyTrending } from "./giphy-tool.js";

describe("giphy connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(giphyTrending({ api_key: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(giphyTrending({ api_key: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("GIPHY_API_KEY", ""); const r = await giphyTrending({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates query", async () => { const r = await giphySearch({ api_key: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/query is required/i); });
  it("passes api_key in query + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: [] }) })); vi.stubGlobal("fetch", f); const r = await giphyTrending({ api_key: "secret" }) as Record<string, any>; expect(String((f.mock.calls[0] as unknown as [string])[0])).toContain("api_key=secret"); expect(r.unclick_meta.source).toMatch(/Giphy/); });
});
