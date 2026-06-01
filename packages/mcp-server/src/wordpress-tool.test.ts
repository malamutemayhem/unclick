import { afterEach, describe, expect, it, vi } from "vitest";
import { wordpressListPosts, wordpressGetPost } from "./wordpress-tool.js";
const CREDS = { site_url: "https://blog.example.com", username: "u", app_password: "p" };
describe("wordpress (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(wordpressListPosts({ ...CREDS })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(wordpressListPosts({ ...CREDS })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("WORDPRESS_SITE_URL", ""); vi.stubEnv("WORDPRESS_USERNAME", ""); vi.stubEnv("WORDPRESS_APP_PASSWORD", ""); const r = await wordpressListPosts({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates post_id", async () => { const r = await wordpressGetPost({ ...CREDS }) as Record<string, unknown>; expect(r.error).toMatch(/post_id is required/i); });
  it("targets wp-json + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ([]) })); vi.stubGlobal("fetch", f); const r = await wordpressListPosts({ ...CREDS }) as Record<string, any>; expect(String((f.mock.calls[0] as unknown as [string])[0])).toMatch(/^https:\/\/blog\.example\.com\/wp-json\/wp\/v2\/posts/); expect(r.unclick_meta.source).toMatch(/WordPress/); });
});
