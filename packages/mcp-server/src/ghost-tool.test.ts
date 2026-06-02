import { afterEach, describe, expect, it, vi } from "vitest";
import { ghostListPosts } from "./ghost-tool.js";
const CREDS = { site_url: "https://news.example.com", content_key: "abc123" };
describe("ghost (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(ghostListPosts({ ...CREDS })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(ghostListPosts({ ...CREDS })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("GHOST_SITE_URL", ""); vi.stubEnv("GHOST_CONTENT_KEY", ""); const r = await ghostListPosts({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("passes key in query + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ posts: [] }) })); vi.stubGlobal("fetch", f); const r = await ghostListPosts({ ...CREDS }) as Record<string, any>; expect(String((f.mock.calls[0] as unknown as [string])[0])).toMatch(/\/ghost\/api\/content\/posts\/\?key=abc123/); expect(r.unclick_meta.source).toMatch(/Ghost/); });
});
