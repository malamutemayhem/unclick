import { afterEach, describe, expect, it, vi } from "vitest";
import { unsplashSearchPhotos } from "./unsplash-tool.js";

describe("unsplash connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(unsplashSearchPhotos({ access_key: "k", query: "x" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(unsplashSearchPhotos({ access_key: "k", query: "x" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("UNSPLASH_ACCESS_KEY", ""); const r = await unsplashSearchPhotos({ query: "x" }) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates query", async () => { const r = await unsplashSearchPhotos({ access_key: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/query is required/i); });
  it("sends Client-ID header + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ results: [] }) })); vi.stubGlobal("fetch", f); const r = await unsplashSearchPhotos({ access_key: "secret", query: "cats" }) as Record<string, any>; const init = (f.mock.calls[0] as unknown as [string, { headers: Record<string,string> }])[1]; expect(init.headers.Authorization).toBe("Client-ID secret"); expect(r.unclick_meta.source).toMatch(/Unsplash/); });
});
