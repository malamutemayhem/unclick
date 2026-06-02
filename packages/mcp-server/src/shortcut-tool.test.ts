import { afterEach, describe, expect, it, vi } from "vitest";
import { shortcutSearchStories, shortcutListProjects } from "./shortcut-tool.js";

describe("shortcut connector (L2/L5)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(shortcutListProjects({ api_token: "k" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(shortcutListProjects({ api_token: "k" })).rejects.toThrow(/timed out/i); });
  it("not connected", async () => { vi.stubEnv("SHORTCUT_API_TOKEN", ""); const r = await shortcutListProjects({}) as Record<string, unknown>; expect(r.not_connected).toBe(true); });
  it("validates query", async () => { const r = await shortcutSearchStories({ api_token: "k" }) as Record<string, unknown>; expect(r.error).toMatch(/query is required/i); });
  it("sends Shortcut-Token header + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ([]) })); vi.stubGlobal("fetch", f); const r = await shortcutListProjects({ api_token: "secret" }) as Record<string, any>; const init = (f.mock.calls[0] as unknown as [string, { headers: Record<string,string> }])[1]; expect(init.headers["Shortcut-Token"]).toBe("secret"); expect(r.unclick_meta.source).toMatch(/Shortcut/); });
});
